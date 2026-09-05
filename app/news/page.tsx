import type { Metadata } from "next";
import Link from "next/link";
import SetupNotice from "@/components/wordpress/SetupNotice";
import {
  formatWpDate,
  getWpPosts,
  isWordPressConfigured,
  type WpPost,
} from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "News",
  description: "Posts sourced from the WordPress backend via WPGraphQL.",
};

export default async function NewsPage() {
  if (!isWordPressConfigured()) {
    return (
      <div className="py-6">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
          News
        </h1>
        <SetupNotice />
      </div>
    );
  }

  let posts: WpPost[] = [];
  let error: string | undefined;

  // A CMS being down should render a message, not crash the route.
  try {
    posts = await getWpPosts(20);
  } catch (caught) {
    error = (caught as Error).message;
  }

  return (
    <div className="py-6">
      <header className="mb-8 border-b border-gray-200 pb-6 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          News
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Sourced from WordPress over WPGraphQL.
        </p>
      </header>

      {error && <SetupNotice error={error} />}

      {!error && posts.length === 0 && (
        <p className="text-gray-600 dark:text-gray-400">
          Connected, but the backend returned no published posts yet.
        </p>
      )}

      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {posts.map((post) => (
          <article key={post.slug} className="py-8">
            <div className="grid gap-4 md:grid-cols-4">
              <p className="text-sm text-gray-500 md:col-span-1 dark:text-gray-400">
                <time dateTime={post.date}>{formatWpDate(post.date)}</time>
              </p>

              <div className="space-y-2 md:col-span-3">
                <h2 className="text-2xl font-bold tracking-tight">
                  <Link
                    href={`/news/${post.slug}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {post.title}
                  </Link>
                </h2>

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

                {post.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                )}

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By {post.author}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
