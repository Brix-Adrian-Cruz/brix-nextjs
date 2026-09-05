import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import Callout from "@/components/learn/Callout";
import RenderStamp from "@/components/learn/RenderStamp";

export const metadata: Metadata = { title: "Demo — Streaming with Suspense" };

/** Deliberately slow, standing in for a sluggish CMS call. */
async function SlowSection() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 2500));

  return (
    <RenderStamp
      label="Slow section finished at"
      time={new Date().toLocaleTimeString("en-US", { hour12: false })}
    />
  );
}

function Skeleton() {
  return (
    <div className="my-4 animate-pulse rounded-lg border border-slate-200 p-4 dark:border-slate-800">
      <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-3 h-7 w-40 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
      <h1>Streaming</h1>
      <p>
        This text appeared immediately. The box below took 2.5 seconds and
        arrived separately — the page did not wait for it before showing you
        anything.
      </p>

      <Suspense fallback={<Skeleton />}>
        <SlowSection />
      </Suspense>

      <p>
        Reload and watch the order: everything fast paints at once, the skeleton
        shows, then the slow part swaps in.
      </p>

      <h2>The code</h2>
      <pre>
        <code>{`<Suspense fallback={<Skeleton />}>
  <SlowSection />
</Suspense>`}</code>
      </pre>

      <p>
        That is the whole API. Anything slow goes inside a{" "}
        <code>Suspense</code> boundary with a fallback, and the rest of the page
        stops waiting for it.
      </p>

      <Callout variant="tip" title="Where this pays off">
        <p>
          A page with fast content and one slow widget — related posts, a
          personalised block, a third-party API — should not be as slow as its
          slowest part. Wrapping just the slow piece is often the largest
          perceived-performance win available, for very little code.
        </p>
      </Callout>

      <Callout variant="note" title="It also satisfies cacheComponents">
        <p>
          With <code>cacheComponents</code> on, uncached async work must either
          be cached or sit inside a <code>Suspense</code> boundary. The error{" "}
          <code>used ... without a Suspense boundary</code> is Next telling you
          to make exactly this choice.
        </p>
      </Callout>

      <p>
        <Link href="/learn/rendering">← Back to rendering strategies</Link>
      </p>
    </article>
  );
}
