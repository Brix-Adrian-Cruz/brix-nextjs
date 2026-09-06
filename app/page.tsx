import Image from "next/image";
import Link from "next/link";
import PostListItem from "@/components/PostListItem";
import { POSTS_ON_HOME_PAGE, siteMetadata } from "@/data/siteMetadata";
import { getAllPostsMeta } from "@/lib/posts";

export default async function Home() {
  const posts = await getAllPostsMeta();
  const recentPosts = posts.slice(0, POSTS_ON_HOME_PAGE);

  return (
    <>
      {/* Hero. The image sits behind a heavy overlay so text stays legible
          in both themes without needing two crops. */}
      <section className="relative -mx-4 mb-12 overflow-hidden sm:-mx-6 sm:rounded-xl">
        <Image
          src="/images/hero-datacenter.jpg"
          alt=""
          width={640}
          height={360}
          priority
          // Full-bleed: the container width plus the negative margins either side.
          sizes="(min-width: 1280px) 1088px, (min-width: 768px) 816px, 100vw"
          className="h-64 w-full object-cover sm:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-950/85 to-primary-950/70" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-300">
            {siteMetadata.tagline}
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {siteMetadata.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {siteMetadata.intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog/where-to-start-nextjs-problems"
              className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-400"
            >
              Start with triage
            </Link>
            <Link
              href="/blog"
              className="rounded-md border border-slate-500 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
            >
              All playbooks
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Playbooks
          </h2>
          {posts.length > POSTS_ON_HOME_PAGE && (
            <Link
              href="/blog"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
            >
              View all
            </Link>
          )}
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-slate-600 dark:text-slate-400">
            No playbooks yet. Add a Markdown file to <code>content/blog/</code>.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {recentPosts.map((post) => (
              <PostListItem key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
