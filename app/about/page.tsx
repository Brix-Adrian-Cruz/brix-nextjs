import type { Metadata } from "next";
import { siteMetadata } from "@/data/siteMetadata";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteMetadata.author}.`,
};

export default function AboutPage() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      <header className="pb-8 pt-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          About
        </h1>
      </header>

      <div className="grid gap-8 py-8 md:grid-cols-3">
        <aside className="space-y-1 text-center md:text-left">
          {/* Swap this circle for an <Image /> when you have a photo. */}
          <div
            className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-primary-100 text-4xl font-bold text-primary-700 md:mx-0 dark:bg-primary-900 dark:text-primary-100"
            aria-hidden="true"
          >
            {siteMetadata.author.charAt(0)}
          </div>
          <h2 className="text-xl font-bold">{siteMetadata.author}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {siteMetadata.occupation}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {siteMetadata.company}
          </p>
        </aside>

        <div className="prose prose-gray max-w-none md:col-span-2 dark:prose-invert">
          <p>{siteMetadata.bio}</p>
          <p>
            This is your about page. Edit it in{" "}
            <code>app/about/page.tsx</code>, and update your name, role, and bio
            in <code>data/siteMetadata.ts</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
