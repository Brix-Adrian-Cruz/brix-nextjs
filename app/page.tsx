import Link from "next/link";
import PostListItem from "@/components/PostListItem";
import { POSTS_ON_HOME_PAGE, siteMetadata } from "@/data/siteMetadata";
import { getAllPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, POSTS_ON_HOME_PAGE);

  return (
    <>
      <section className="space-y-4 border-b border-gray-200 pb-10 pt-6 dark:border-gray-800">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Hi, I&apos;m {siteMetadata.author}
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          {siteMetadata.bio}
        </p>
      </section>

      <section className="divide-y divide-gray-200 dark:divide-gray-800">
        <h2 className="pt-8 text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Latest posts
        </h2>

        {recentPosts.length === 0 ? (
          <p className="py-10 text-gray-600 dark:text-gray-400">
            No posts yet. Add a Markdown file to{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
              content/blog/
            </code>{" "}
            to get started.
          </p>
        ) : (
          recentPosts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))
        )}
      </section>

      {posts.length > POSTS_ON_HOME_PAGE && (
        <div className="flex justify-end pt-6">
          <Link
            href="/blog"
            className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            All posts →
          </Link>
        </div>
      )}
    </>
  );
}
