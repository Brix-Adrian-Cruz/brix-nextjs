import { createHash } from "node:crypto";
import { cacheLife } from "next/cache";

/**
 * Talks to a WordPress backend through WPGraphQL.
 *
 * Set WORDPRESS_API_URL in .env.local (and in the Pantheon environment
 * variables for Test and Live) to your site's GraphQL endpoint, e.g.
 *   WORDPRESS_API_URL=https://live-your-site.pantheonsite.io/graphql
 */
const endpoint = process.env.WORDPRESS_API_URL;

/** Shapes we hand to components — deliberately not WordPress-shaped. */
export type WpPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  categories: { name: string; slug: string }[];
  featuredImage: { url: string; alt: string } | null;
};

export type WpPostDetail = WpPost & {
  content: string;
};

/** Thrown when the backend is unreachable or returns GraphQL errors. */
export class WordPressError extends Error {}

/**
 * Query documents are sent by ID, not by text.
 *
 * WPGraphQL Smart Cache stores each query document in WordPress under an ID,
 * so a request can name the query instead of carrying it. That is what makes
 * these requests cacheable: Smart Cache deliberately skips its object cache
 * for GET requests and leaves them to the CDN, and an ID is short enough to
 * put in a URL when a whole query is not. A POST is never edge-cached.
 *
 * The ID is the sha256 of the query text below. Editing a query changes its
 * hash, so it registers as a new document instead of colliding with the one
 * the old text registered. WordPress also stores its own hash of the parsed
 * and reprinted query; ours is recorded alongside it as an alias.
 */
const queryIds = new Map<string, string>();

function queryId(query: string): string {
  const known = queryIds.get(query);
  if (known) return known;

  const id = createHash("sha256").update(query).digest("hex");
  queryIds.set(query, id);
  return id;
}

/** WPGraphQL's reply when it does not have a document under that ID yet. */
function isQueryUnknown(body: { errors?: { message?: string }[] }): boolean {
  return Boolean(
    body.errors?.some((error) => error.message === "PersistedQueryNotFound"),
  );
}

/** One fetch, with the failure modes that are not exceptions turned into them. */
async function send(
  url: string,
  init?: RequestInit,
): Promise<{ data?: unknown; errors?: { message?: string }[] }> {
  let response: Response;

  try {
    response = await fetch(url, init);
  } catch (cause) {
    // Network-level failure: wrong host, DNS, TLS, site asleep.
    throw new WordPressError(`Could not reach ${endpoint}`, { cause });
  }

  // fetch does not throw on 4xx/5xx — check this yourself.
  if (!response.ok) {
    throw new WordPressError(
      `WordPress returned ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

/**
 * One place that knows how to talk to WPGraphQL. Everything else calls the
 * typed helpers below.
 */
async function graphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  if (!endpoint) {
    throw new WordPressError(
      "WORDPRESS_API_URL is not set. Add it to .env.local, and to the " +
        "environment variables for each Pantheon environment.",
    );
  }

  const id = queryId(query);
  const params = new URLSearchParams({
    queryId: id,
    variables: JSON.stringify(variables),
  });

  // Ask by ID. This is the request the CDN can answer without waking
  // WordPress, and the one every call after the first should be.
  let body = await send(`${endpoint}?${params}`);

  // The first time a given WordPress environment sees this query text, it has
  // nothing stored under the ID. Sending the text and the ID together both
  // registers the document and returns the result, so the miss costs one round
  // trip rather than two.
  if (isQueryUnknown(body)) {
    body = await send(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryId: id, query, variables }),
    });
  }

  // GraphQL reports its own errors inside a 200 response.
  if (body.errors?.length) {
    throw new WordPressError(body.errors[0].message ?? "GraphQL error");
  }

  return body.data as T;
}

/* -------------------------------------------------------------------------
 * WordPress' response shapes, kept in this file only.
 * ---------------------------------------------------------------------- */

type RawPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  date: string;
  author: { node: { name: string } | null } | null;
  categories: { nodes: { name: string; slug: string }[] } | null;
  featuredImage: { node: { sourceUrl: string; altText: string } | null } | null;
};

const POST_FIELDS = `
  slug
  title
  excerpt
  date
  author { node { name } }
  categories { nodes { name slug } }
  featuredImage { node { sourceUrl altText } }
`;

/** Strips the HTML WordPress wraps around excerpts. */
function toPlainText(html: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

/** Normalize at the boundary, so components never see WordPress' shape. */
function toPost(raw: RawPost): WpPost {
  return {
    slug: raw.slug,
    title: toPlainText(raw.title),
    excerpt: toPlainText(raw.excerpt),
    date: raw.date,
    author: raw.author?.node?.name ?? "Unknown",
    categories: raw.categories?.nodes ?? [],
    featuredImage: raw.featuredImage?.node
      ? {
          url: raw.featuredImage.node.sourceUrl,
          alt: raw.featuredImage.node.altText ?? "",
        }
      : null,
  };
}

/* -------------------------------------------------------------------------
 * The API the rest of the app uses.
 * ---------------------------------------------------------------------- */

/** True when an endpoint is configured at all — used to show setup help. */
export function isWordPressConfigured(): boolean {
  return Boolean(endpoint);
}

/** Most recent published posts. */
export async function getWpPosts(first = 10): Promise<WpPost[]> {
  "use cache";
  cacheLife("blog");

  const data = await graphql<{ posts: { nodes: RawPost[] } }>(
    `query GetPosts($first: Int!) {
       posts(first: $first, where: { status: PUBLISH }) {
         nodes { ${POST_FIELDS} }
       }
     }`,
    { first },
  );

  return data.posts.nodes.map(toPost);
}

/** A single post by slug, or null when it does not exist. */
export async function getWpPost(slug: string): Promise<WpPostDetail | null> {
  "use cache";
  cacheLife("blog");

  const data = await graphql<{ post: (RawPost & { content: string }) | null }>(
    `query GetPost($slug: ID!) {
       post(id: $slug, idType: SLUG) {
         ${POST_FIELDS}
         content
       }
     }`,
    { slug },
  );

  if (!data.post) return null;

  return { ...toPost(data.post), content: data.post.content ?? "" };
}

/** Slugs only — cheap query for generateStaticParams. */
export async function getWpPostSlugs(first = 100): Promise<string[]> {
  "use cache";
  cacheLife("blog");

  const data = await graphql<{ posts: { nodes: { slug: string }[] } }>(
    `query GetSlugs($first: Int!) {
       posts(first: $first, where: { status: PUBLISH }) { nodes { slug } }
     }`,
    { first },
  );

  return data.posts.nodes.map((node) => node.slug);
}

// Built once, for the same reason as the one in lib/posts.ts.
const wpDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/** Formats WordPress' ISO date for display. */
export function formatWpDate(date: string): string {
  return wpDateFormatter.format(new Date(date));
}
