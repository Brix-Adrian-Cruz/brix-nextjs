import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import Callout from "@/components/learn/Callout";
import RefreshHint from "@/components/learn/RefreshHint";
import RenderStamp from "@/components/learn/RenderStamp";

export const metadata: Metadata = { title: "Demo — Dynamic rendering" };

/** Runs per request: connection() opts this subtree out of prerendering. */
async function RequestTime() {
  await connection();

  return (
    <RenderStamp
      label="Rendered at"
      time={new Date().toLocaleTimeString("en-US", { hour12: false })}
    />
  );
}

function Skeleton() {
  return (
    <div className="my-4 animate-pulse rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mt-3 h-7 w-32 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export default function Page() {
  return (
    <article className="prose prose-gray max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
      <h1>Dynamic</h1>
      <p>
        This timestamp is generated while the request is being handled. Refresh
        and it changes every single time, because the server produces it again
        for every visitor.
      </p>

      <Suspense fallback={<Skeleton />}>
        <RequestTime />
      </Suspense>

      <RefreshHint note="Changes on every refresh — this part is never cached." />

      <h2>The code</h2>
      <pre>
        <code>{`import { connection } from "next/server";

async function RequestTime() {
  await connection();        // opts this subtree out of prerendering
  return <RenderStamp time={new Date().toLocaleTimeString()} />;
}

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <RequestTime />
    </Suspense>
  );
}`}</code>
      </pre>

      <Callout variant="note" title="Why the Suspense boundary is required">
        <p>
          Writing this page without <code>Suspense</code> fails the build with{" "}
          <code>
            Uncached data was accessed outside of &lt;Suspense&gt;
          </code>{" "}
          — a real error hit while building this very page. With{" "}
          <code>cacheComponents</code> enabled, Next.js will not let one dynamic
          value hold up an entire page that could otherwise be prerendered.
        </p>
        <p>
          The result is better than what was originally written here: the
          heading and prose are static, and only the timestamp is dynamic.
        </p>
      </Callout>

      <Callout variant="warning" title="Dynamic is a cost, not a default">
        <p>
          Anything inside that boundary does full render work on every request.
          Reach for it only when the output genuinely differs per visitor — a
          dashboard, a cart, anything reading cookies or headers. Choosing it
          because it is simpler is how a site ends up slow under load.
        </p>
      </Callout>

      <p>
        Reading <code>cookies()</code>, <code>headers()</code>, or{" "}
        <code>searchParams</code> makes a subtree dynamic in exactly the same
        way, usually without anyone deciding to.
      </p>

      <p>
        <Link href="/learn/rendering">← Back to rendering strategies</Link>
      </p>
    </article>
  );
}
