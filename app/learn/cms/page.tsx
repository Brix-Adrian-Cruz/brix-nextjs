import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/cms";

export const metadata: Metadata = {
  title: "Sourcing content from a CMS",
  description: "Pull data from a WordPress or Drupal backend into Next.js.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <p>
          Decoupled means the CMS stores and edits content while Next.js renders
          it. The CMS exposes an API; your site is a client of that API. This
          site reads markdown files instead, but the shape of the code is the
          same — swap the file read for a fetch.
        </p>

        <h2>WordPress</h2>
        <p>
          The REST API is available at <code>/wp-json/wp/v2/</code> with no
          plugins. WPGraphQL is the other common option when you want to ask for
          exactly the fields you need.
        </p>

        <pre>
          <code>{`const WP = process.env.WORDPRESS_API_URL; // e.g. https://cms.example.com

export async function getPosts() {
  "use cache";
  cacheLife("blog");

  const response = await fetch(\`\${WP}/wp-json/wp/v2/posts?per_page=10&_embed\`);

  if (!response.ok) {
    throw new Error(\`WordPress returned \${response.status}\`);
  }

  return response.json();
}`}</code>
        </pre>

        <p>
          WordPress returns rendered HTML in nested fields —{" "}
          <code>post.title.rendered</code>, not <code>post.title</code>. That
          trips up everyone once.
        </p>

        <h2>Drupal</h2>
        <p>
          JSON:API ships with core and is enabled per site. It is verbose but
          very regular: attributes and relationships are always in the same
          place.
        </p>

        <pre>
          <code>{`const response = await fetch(
  \`\${DRUPAL}/jsonapi/node/article?include=field_image&page[limit]=10\`,
  { headers: { Accept: "application/vnd.api+json" } },
);

const { data } = await response.json();
const titles = data.map((node) => node.attributes.title);`}</code>
        </pre>

        <h2>Normalize at the boundary</h2>
        <p>
          Do not let CMS-shaped objects spread through your components. Convert
          to your own shape in one place, and the rest of the app stops caring
          which CMS you are on:
        </p>

        <pre>
          <code>{`function toPost(wpPost) {
  return {
    slug: wpPost.slug,
    title: wpPost.title.rendered,
    summary: wpPost.excerpt?.rendered ?? "",
    date: wpPost.date,
  };
}`}</code>
        </pre>

        <p>
          That is the same <code>PostMeta</code> idea this repo uses in{" "}
          <code>lib/posts.ts</code>. Components take a plain post object and
          never learn where it came from.
        </p>
      </div>

      <Callout variant="warning" title="The CMS must be reachable at build time">
        <p>
          If you generate pages statically, the build fetches from the CMS. A
          CMS behind a VPN, an IP allowlist, or basic auth will fail the build
          with a network error that says nothing about permissions. This is one
          of the most common site-creation failures.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Handle missing content deliberately</h2>
        <pre>
          <code>{`import { notFound } from "next/navigation";

const post = await getPostBySlug(slug);
if (!post) notFound();   // a real 404, not a crash`}</code>
        </pre>
        <p>
          Without this, a deleted CMS entry becomes a 500 and an error in your
          runtime logs rather than an honest 404.
        </p>
      </div>

      <LessonNav href={HREF} />
    </article>
  );
}
