import Link from "next/link";
import TopicBadge, { DEFAULT_BORDER_ACCENT, getTopicBorderAccent } from "./TopicBadge";
import { formatDate, type PostMeta } from "@/lib/posts";

/** A playbook card — used on the home, blog, and topic pages. */
export default function PostListItem({
  post,
  featured = false,
}: {
  post: PostMeta;
  featured?: boolean;
}) {
  const accent = post.tags[0] ? getTopicBorderAccent(post.tags[0]) : DEFAULT_BORDER_ACCENT;
  const tags = featured ? post.tags : post.tags.slice(0, 3);

  return (
    <article
      className={`group relative rounded-lg border-y border-r border-l-4 border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none ${accent} ${
        featured ? "p-6 sm:col-span-2 sm:p-8" : "p-5"
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {tags.map((tag) => (
          <TopicBadge key={tag} text={tag} asLink={false} />
        ))}
      </div>

      <h2
        className={`font-bold leading-snug tracking-tight ${
          featured ? "text-2xl sm:text-3xl" : "text-lg"
        }`}
      >
        <Link
          href={`/blog/${post.slug}`}
          className="rounded after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
        >
          {post.title}
        </Link>
      </h2>

      {post.summary && (
        <p
          className={`mt-2 leading-relaxed text-slate-600 dark:text-slate-400 ${
            featured ? "max-w-2xl text-base" : "text-sm"
          }`}
        >
          {post.summary}
        </p>
      )}

      <p className="mt-4 flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} min</span>
        <span
          className="ml-auto flex items-center gap-1 text-primary-600 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-primary-400"
          aria-hidden="true"
        >
          Read
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </p>
    </article>
  );
}
