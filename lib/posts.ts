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

/** "2026-08-28" -> "August 28, 2026" */
export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
 * Reads every Markdown file in content/blog and returns them newest first.
 * The "use cache" directive means the files are only read and parsed once,
 * no matter how many pages ask for them.
 */
export async function getAllPosts(): Promise<Post[]> {
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
          html: await marked.parse(content),
        };
      }),
  );

  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns a single post, or null when the slug doesn't match a file. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

/** Every tag used across all posts, with a count, most used first. */
export async function getAllTags(): Promise<
  { tag: string; slug: string; count: number }[]
> {
  const posts = await getAllPosts();
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
export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post.tags.some((tag) => slugifyTag(tag) === tagSlug),
  );
}
