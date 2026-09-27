import Link from "next/link";
import TopicBadge from "./TopicBadge";
import { formatDate, type PostMeta } from "@/lib/posts";

/** A playbook card — used on the home, blog, and topic pages. */
export default function PostListItem({ post }: { post: PostMeta }) {
  return (
    <article className="group relative rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-primary-600">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <TopicBadge key={tag} text={tag} asLink={false} />
        ))}
      </div>

      <h2 className="text-lg font-bold leading-snug tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="rounded after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          {post.title}
        </Link>
      </h2>

      {post.summary && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {post.summary}
        </p>
      )}

      <p className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min</span>
      </p>
    </article>
  );
}
