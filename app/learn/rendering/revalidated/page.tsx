import type { Metadata } from "next";
import Link from "next/link";
import { cacheLife } from "next/cache";
import Callout from "@/components/learn/Callout";
import RefreshHint from "@/components/learn/RefreshHint";
import RenderStamp from "@/components/learn/RenderStamp";

export const metadata: Metadata = { title: "Demo — Revalidated rendering" };

/**
 * Cached, but only for a while. The "short" profile is defined in
 * next.config.ts as stale 30s / revalidate 60s / expire 5min.
 */
async function CachedTime() {
  "use cache";
  cacheLife("short");

  return (
    <RenderStamp
      label="Cached copy produced at"
      time={new Date().toLocaleTimeString("en-US", { hour12: false })}
    />
  );
}

export default function Page() {
  return (
    <article className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
      <h1>Revalidated</h1>
      <p>
        The middle ground, and the one most content sites should be using.
        Refresh a few times: the timestamp holds still, then jumps, then holds
        still again.
      </p>

      <CachedTime />
      <RefreshHint note="Hold still for ~60s, then refresh again — it will have moved." />

      <h2>The code</h2>
      <pre>
        <code>{`import { cacheLife } from "next/cache";

async function CachedTime() {
  "use cache";
  cacheLife("short");   // a profile from next.config.ts
  return <RenderStamp time={new Date().toLocaleTimeString()} />;
}`}</code>
      </pre>

      <h2>What the profile means</h2>
      <pre>
        <code>{`// next.config.ts
cacheLife: {
  short: {
    stale: 30,        // a client may reuse its copy for 30s
    revalidate: 60,   // after 60s, refresh in the background
    expire: 300,      // after 5min, must be regenerated before serving
  },
}`}</code>
      </pre>

      <p>
        The important part is <code>revalidate</code>: the first visitor after
        the window still gets the <em>old</em> copy instantly, and the refresh
        happens behind them. Nobody waits for the regeneration. That is why this
        is usually the right default for CMS-sourced content.
      </p>

      <Callout variant="tip" title="Name profiles, do not scatter numbers">
        <p>
          Defining <code>short</code> and <code>blog</code> centrally means
          retuning caching for the whole site is one edit. Numbers sprinkled
          through page files are impossible to reason about later.
        </p>
      </Callout>

      <p>
        <Link href="/learn/rendering">← Back to rendering strategies</Link>
      </p>
    </article>
  );
}
