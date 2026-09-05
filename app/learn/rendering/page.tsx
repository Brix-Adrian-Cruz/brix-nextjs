import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/rendering";

export const metadata: Metadata = {
  title: "Rendering strategies",
  description:
    "Static, dynamic, revalidated, and streamed — with four live demos.",
};

const DEMOS = [
  {
    href: "/learn/rendering/static",
    name: "Static",
    when: "Rendered once at build time",
    behavior: "Timestamp never moves",
    use: "Blog posts, docs, marketing pages",
  },
  {
    href: "/learn/rendering/dynamic",
    name: "Dynamic",
    when: "Rendered on every request",
    behavior: "Timestamp changes every refresh",
    use: "Per-user pages, carts, anything reading cookies",
  },
  {
    href: "/learn/rendering/revalidated",
    name: "Revalidated",
    when: "Cached, refreshed on a timer",
    behavior: "Holds still, then jumps",
    use: "CMS content — the usual right answer",
  },
  {
    href: "/learn/rendering/streaming",
    name: "Streaming",
    when: "Fast parts first, slow parts after",
    behavior: "Skeleton, then content swaps in",
    use: "A fast page with one slow widget",
  },
];

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <p>
          Choosing a rendering strategy is choosing <em>when</em> the HTML is
          produced. That single decision drives your page speed, your build
          time, and how much load reaches your CMS.
        </p>
        <p>
          Each demo below is a real page in this site. Open them and watch the
          timestamps — the difference is much easier to see than to read about.
        </p>
      </div>

      <ul className="my-6 grid gap-3 sm:grid-cols-2">
        {DEMOS.map((demo) => (
          <li key={demo.href}>
            <Link
              href={demo.href}
              className="block h-full rounded-lg border border-slate-200 p-4 hover:border-primary-500 dark:border-slate-800 dark:hover:border-primary-400"
            >
              <span className="block font-semibold">{demo.name}</span>
              <span className="mt-1 block text-sm text-slate-600 dark:text-slate-400">
                {demo.when}
              </span>
              <span className="mt-2 block text-xs font-medium text-primary-600 dark:text-primary-400">
                {demo.behavior} →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-left dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold">Strategy</th>
              <th className="py-2 pr-4 font-semibold">Rendered</th>
              <th className="py-2 font-semibold">Reach for it when</th>
            </tr>
          </thead>
          <tbody className="align-top">
            {DEMOS.map((demo) => (
              <tr
                key={demo.href}
                className="border-b border-slate-200 dark:border-slate-800"
              >
                <td className="py-3 pr-4 font-semibold">{demo.name}</td>
                <td className="py-3 pr-4">{demo.when}</td>
                <td className="py-3">{demo.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>How to choose</h2>
        <p>
          Ask how often the underlying data changes, not how often the page is
          requested. Content edited a few times a week does not need dynamic
          rendering just because it gets a lot of traffic — that is precisely
          the case revalidation exists for.
        </p>

        <h2>How to tell what a page is doing</h2>
        <p>
          This is a Level 2 debugging objective in its own right, and the build
          output answers it directly:
        </p>

        <pre>
          <code>{`Route (app)                      Revalidate  Expire
┌ ○ /                                    5m      1h
├ ○ /about                              15m      1y
├ ◐ /blog/[slug]                         5m      1h

○  (Static)             prerendered as static content
◐  (Partial Prerender)  static shell with dynamic streamed content`}</code>
        </pre>

        <p>
          That is real output from <code>npm run build</code> in this
          repository. The symbol in front of each route is the answer, and the
          Revalidate column tells you which cache profile it picked up.
        </p>
      </div>

      <Callout variant="tip" title="Confirm from outside too">
        <p>
          Response headers on the deployed site show cache status, and the
          simplest behavioral test is the one these demos use: load a page
          twice and see whether anything time-dependent changed.
        </p>
      </Callout>

      <LessonNav href={HREF} />
    </article>
  );
}
