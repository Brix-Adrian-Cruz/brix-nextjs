import Link from "next/link";
import Tag from "./Tag";
import { formatDate, type PostMeta } from "@/lib/posts";

/** One entry in a list of posts — used on the home, blog, and tag pages. */
export default function PostListItem({ post }: { post: PostMeta }) {
  return (
    <article className="py-10">
      <div className="grid gap-4 md:grid-cols-4">
        <dl className="md:col-span-1">
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </dd>
        </dl>

        <div className="space-y-3 md:col-span-3">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
              >
                {post.title}
              </Link>
            </h2>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </div>

          {post.summary && (
            <p className="text-gray-600 dark:text-gray-400">{post.summary}</p>
          )}

          <Link
            href={`/blog/${post.slug}`}
            className="inline-block text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            aria-label={`Read "${post.title}"`}
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
