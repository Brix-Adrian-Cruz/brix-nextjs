import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  formatWpDate,
  getWpPost,
  isWordPressConfigured,
} from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

/**
 * No generateStaticParams on purpose. Posts render on demand and are then
 * cached by getWpPost's "use cache", so the build never depends on WordPress
 * being reachable — a CMS that is down delays a page, it does not fail a
 * deploy. New posts also appear without redeploying.
 *
 * The tradeoff: because the shell streams before the lookup resolves, a slug
 * that does not exist renders the 404 page with a 200 status. Readers see the
 * right thing; crawlers see the wrong status. If strict 404s matter more than
 * the above, add generateStaticParams returning every slug and set
 * `export const dynamicParams = false` — at the cost of needing WordPress up
 * at build time and a redeploy for each new post.
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Metadata must not throw when the CMS is briefly unavailable, or a
  // transient outage turns real posts into errors.
  try {
    const post = await getWpPost(slug);
    if (!post) return {};
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

async function PostBody({ params }: Props) {
  // Awaiting params inside the boundary keeps the page shell static.
  const { slug } = await params;

  if (!isWordPressConfigured()) notFound();

  const post = await getWpPost(slug);

  if (!post) notFound();

  return (
    <>
      <header className="space-y-3 border-b border-gray-200 pb-6 dark:border-gray-800">
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {post.categories.map((category) => (
              <span
                key={category.slug}
                className="text-xs font-medium uppercase tracking-wide text-primary-600 dark:text-primary-400"
              >
                {category.name}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.date}>{formatWpDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.author}
        </p>
      </header>

      {/* WordPress returns rendered HTML, which we style with `prose`. */}
      <div
        className="prose prose-gray max-w-none py-8 dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </>
  );
}

function LoadingPost() {
  return (
    <div className="animate-pulse space-y-4 py-6">
      <div className="h-9 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-800" />
      <div className="space-y-2 pt-6">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}

export default function NewsPostPage({ params }: Props) {
  return (
    <article className="py-6">
      <Suspense fallback={<LoadingPost />}>
        <PostBody params={params} />
      </Suspense>

      <Link
        href="/news"
        className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      >
        ← Back to news
      </Link>
    </article>
  );
}
