import type { Metadata } from "next";
import Link from "next/link";
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
        <p className="text-gray-600 dark:text-gray-400">
          Browse posts by topic.
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No tags yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map(({ tag, slug, count }) => (
            <li key={slug}>
              <Link
                href={`/tags/${slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium hover:border-primary-500 hover:text-primary-600 dark:border-gray-800 dark:hover:border-primary-400 dark:hover:text-primary-400"
              >
                {tag}
                <span className="text-gray-500 dark:text-gray-400">
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
