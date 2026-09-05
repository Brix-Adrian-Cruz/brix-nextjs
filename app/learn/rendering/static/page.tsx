import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/learn/Callout";
import RefreshHint from "@/components/learn/RefreshHint";
import RenderStamp from "@/components/learn/RenderStamp";

export const metadata: Metadata = { title: "Demo — Static rendering" };

/**
 * "use cache" with no cacheLife call means this is rendered once, at build
 * time, and the same HTML is served to everyone until the next deploy.
 */
async function BuildTime() {
  "use cache";

  return (
    <RenderStamp
      label="Rendered at"
      time={new Date().toLocaleTimeString("en-US", { hour12: false })}
    />
  );
}

export default function Page() {
  return (
    <article className="prose prose-gray max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
      <h1>Static</h1>
      <p>
        The timestamp below was produced when this page was built. Refresh as
        many times as you like — it will not move until the site is deployed
        again.
      </p>

      <BuildTime />
      <RefreshHint note="This value is frozen until the next build." />

      <h2>The code</h2>
      <pre>
        <code>{`async function BuildTime() {
  "use cache";
  return <RenderStamp time={new Date().toLocaleTimeString()} />;
}`}</code>
      </pre>

      <Callout variant="note" title="Why the directive is needed here">
        <p>
          This project has <code>cacheComponents</code> enabled, so reading the
          clock during render must happen inside a cached function. Without{" "}
          <code>&quot;use cache&quot;</code> the build fails with{" "}
          <code>used `new Date()` before accessing uncached data</code> — a real
          error this repo hit while being built.
        </p>
      </Callout>

      <p>
        <strong>Use it for</strong> marketing pages, documentation, blog posts —
        anything identical for every visitor. It is the fastest option because
        no work happens per request.
      </p>

      <p>
        <Link href="/learn/rendering">← Back to rendering strategies</Link>
      </p>
    </article>
  );
}
