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

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
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

  const body = await response.json();

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

/** Normalise at the boundary, so components never see WordPress' shape. */
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

/** Formats WordPress' ISO date for display. */
export function formatWpDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
