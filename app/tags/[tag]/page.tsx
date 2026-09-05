import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostListItem from "@/components/PostListItem";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged "${tag}"`,
    description: `All posts tagged ${tag}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = await getPostsByTag(tag);

  if (posts.length === 0) notFound();

  // Show the tag the way it was written in the frontmatter, not the URL slug.
  const displayName =
    posts[0].tags.find((t) => t.toLowerCase().replace(/\s+/g, "-") === tag) ??
    tag;

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-800">
      <header className="space-y-2 pb-8 pt-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {displayName}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"} ·{" "}
          <Link
            href="/tags"
            className="text-primary-600 hover:underline dark:text-primary-400"
          >
            all tags
          </Link>
        </p>
      </header>

      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </div>
  );
}
