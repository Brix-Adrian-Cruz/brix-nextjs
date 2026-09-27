import type { Metadata } from "next";
import Link from "next/link";
import { getTopicAccent } from "@/components/TopicBadge";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse posts by topic.",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="space-y-8 pt-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Tags
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Browse posts by topic.
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="text-slate-600 dark:text-slate-400">No tags yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map(({ tag, slug, count }) => (
            <li key={slug}>
              <Link
                href={`/tags/${slug}`}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-sm font-medium uppercase tracking-wide transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 ${getTopicAccent(tag)}`}
              >
                {tag}
                <span className="normal-case tracking-normal opacity-70">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
