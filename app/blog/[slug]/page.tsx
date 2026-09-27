import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PrevNextNav from "@/components/PrevNextNav";
import TopicBadge from "@/components/TopicBadge";
import { siteMetadata } from "@/data/siteMetadata";
import { formatDate, getAllPostsMeta, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

// Tells Next which post pages to build ahead of time.
export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.summary || siteMetadata.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  // Find the neighbouring posts so we can link to them at the bottom.
  const posts = await getAllPostsMeta();
  const index = posts.findIndex((p) => p.slug === post.slug);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <article>
      <header className="space-y-4 border-b border-slate-200 pb-8 pt-6 dark:border-slate-800">
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <TopicBadge key={tag} text={tag} />
          ))}
        </div>
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="font-mono text-xs text-slate-500 dark:text-slate-500">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.readingTime} min read
          <span aria-hidden="true"> · </span>
          {siteMetadata.author}
        </p>
      </header>

      {/* The `prose` class styles everything the Markdown produced. */}
      <div
        className="prose prose-slate max-w-none py-8 dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      <PrevNextNav
        previous={older && { href: `/blog/${older.slug}`, title: older.title }}
        next={newer && { href: `/blog/${newer.slug}`, title: newer.title }}
        labels={{ previous: "Previous post", next: "Next post" }}
      />

      <div className="pt-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
        >
          ← All playbooks
        </Link>
      </div>
    </article>
  );
}
