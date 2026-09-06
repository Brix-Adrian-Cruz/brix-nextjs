import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { cacheLife } from "next/cache";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");

/** A post without its body — enough to render a list item. */
export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingTime: number;
};

/** A post with its body rendered to HTML. */
export type Post = PostMeta & {
  html: string;
};

// Built once. `toLocaleDateString` looks cheap but constructs a fresh
// Intl formatter on every call, and list pages call it once per card.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

/** "2026-08-28" -> "August 28, 2026" */
export function formatDate(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00`));
}

/** "Next JS" -> "next-js", so tags are safe to use in URLs. */
export function slugifyTag(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, "-");
}

/** Rough estimate at an average reading pace of 200 words per minute. */
function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Frontmatter for every post, newest first.
 *
 * This deliberately does not render any Markdown. Every listing — the home
 * page, /blog, /tags, the prev/next links — needs the frontmatter and nothing
 * else, so running the Markdown parser over all of them would be work whose
 * result is thrown away, and it would put every rendered body inside this
 * cache entry for those pages to drag back out on a miss.
 */
export async function getAllPostsMeta(): Promise<PostMeta[]> {
  "use cache";
  cacheLife("blog");

  const fileNames = await fs.readdir(POSTS_DIRECTORY);

  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const filePath = path.join(POSTS_DIRECTORY, fileName);
        const fileContents = await fs.readFile(filePath, "utf8");

        // gray-matter splits the frontmatter block from the body.
        const { data, content } = matter(fileContents);

        return {
          slug: fileName.replace(/\.md$/, ""),
          title: String(data.title ?? "Untitled"),
          date: String(data.date ?? ""),
          tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
          summary: String(data.summary ?? ""),
          readingTime: estimateReadingTime(content),
        };
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Returns a single post with its body rendered, or null when the slug doesn't
 * match a file. This is the only path that runs the Markdown parser, and it
 * runs it over one post rather than all of them.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("blog");

  // Look the slug up instead of trusting it as a filename. It arrives from
  // the URL, and a `..` in a path would otherwise read outside content/blog.
  const meta = (await getAllPostsMeta()).find((post) => post.slug === slug);
  if (!meta) return null;

  const filePath = path.join(POSTS_DIRECTORY, `${slug}.md`);
  const { content } = matter(await fs.readFile(filePath, "utf8"));

  return { ...meta, html: await marked.parse(content) };
}

/** Every tag used across all posts, with a count, most used first. */
export async function getAllTags(): Promise<
  { tag: string; slug: string; count: number }[]
> {
  const posts = await getAllPostsMeta();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: slugifyTag(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** All posts carrying the given tag slug. */
export async function getPostsByTag(tagSlug: string): Promise<PostMeta[]> {
  const posts = await getAllPostsMeta();
  return posts.filter((post) =>
    post.tags.some((tag) => slugifyTag(tag) === tagSlug),
  );
}
