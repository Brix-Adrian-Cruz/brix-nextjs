import type { Metadata } from "next";
import PostListItem from "@/components/PostListItem";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Playbooks",
  description: "Every runbook for handling Next.js sites on Pantheon.",
};

export default async function BlogPage() {
  const posts = await getAllPostsMeta();

  return (
    <div className="py-6">
      <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {posts.length} {posts.length === 1 ? "playbook" : "playbooks"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Playbooks
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Work top to bottom, or jump straight to the layer you have already
          isolated.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
