import Image from "next/image";
import Link from "next/link";
import PostListItem from "@/components/PostListItem";
import TrainingProgress from "@/components/TrainingProgress";
import { POSTS_ON_HOME_PAGE, siteMetadata } from "@/data/siteMetadata";
import { getAllPostsMeta } from "@/lib/posts";

// The rest of the site, besides training (which gets its own section right
// under the hero — that's the site's main thread, not one tile among four).
// Playbooks goes last: reference material, not the front door.
const SITE_SECTIONS = [
  {
    href: "/learn",
    title: "Learn",
    description:
      "A hands-on path through core concepts, with demos that behave differently rather than just describing it.",
    icon: (
      <>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </>
    ),
  },
  {
    href: "/news",
    title: "News",
    description:
      "Posts sourced from the WordPress backend, proving the CMS connection end to end.",
    icon: (
      <>
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    href: "/blog",
    title: "Playbooks",
    description:
      "Runbooks for triage, builds, caching, and escalation — read one when you're stuck on a ticket.",
    icon: (
      <>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14l2 2 4-4" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </>
    ),
  },
];

export default async function Home() {
  const posts = await getAllPostsMeta();
  const recentPosts = posts.slice(0, POSTS_ON_HOME_PAGE);

  return (
    <>
      {/* Hero. The image sits behind a heavy overlay so text stays legible
          in both themes without needing two crops. */}
      <section className="relative -mx-4 mb-16 overflow-hidden sm:-mx-6 sm:rounded-xl">
        <Image
          src="/images/hero-datacenter.jpg"
          alt=""
          width={640}
          height={360}
          priority
          // Full-bleed: the container width plus the negative margins either side.
          sizes="(min-width: 1280px) 1088px, (min-width: 768px) 816px, 100vw"
          className="h-72 w-full object-cover sm:h-[26rem]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-950/85 to-primary-950/70" />
        {/* A faint dot grid over the overlay — reads as a schematic/console
            texture rather than a flat gradient over a stock photo. */}
        <div
          className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] text-primary-200"
          aria-hidden="true"
        />

        <div className="relative flex h-full flex-col justify-center px-6 py-10 sm:px-10">
          <p className="flex items-center font-mono text-xs uppercase tracking-[0.2em] text-primary-200">
            <span className="mr-3 inline-block h-px w-8 bg-primary-400" aria-hidden="true" />
            {siteMetadata.tagline}
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {siteMetadata.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
            {siteMetadata.homeIntro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/training"
              className="group inline-flex items-center gap-2 rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
            >
              Start the Academy
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="rounded-md border border-slate-500 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 active:scale-[0.98]"
            >
              Browse playbooks
            </Link>
          </div>
        </div>
      </section>

      <TrainingProgress />

      <section className="mb-16">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          Explore the site
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:shadow-none dark:hover:border-primary-600"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-300">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {section.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-bold tracking-tight transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {section.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Recent playbooks
          </h2>
          {posts.length > POSTS_ON_HOME_PAGE && (
            <Link
              href="/blog"
              className="text-sm font-medium text-primary-600 transition-colors hover:underline dark:text-primary-400"
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
