import type { Metadata } from "next";
import PostListItem from "@/components/PostListItem";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      <header className="space-y-2 pb-8 pt-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          All posts
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} />
      ))}
    </div>
  );
}
