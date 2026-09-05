import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/platform";

export const metadata: Metadata = {
  title: "Platform context",
  description:
    "Compatibility, requirements, limitations, and identifying a Next.js site.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>How to tell you are on a Next.js site</h2>
        <p>
          Worth being able to do in a few seconds, because it decides which
          runbook applies. Front-End Sites and the classic CMS platform behave
          nothing alike.
        </p>

        <p>From the repository:</p>
        <ul>
          <li>
            <code>package.json</code> lists <code>next</code> as a dependency
            and has a <code>next build</code> script.
          </li>
          <li>
            There is an <code>app/</code> or <code>pages/</code> directory, and
            a <code>next.config.ts</code> or <code>.js</code>.
          </li>
          <li>
            No <code>index.php</code>, no <code>wp-config.php</code>, no{" "}
            <code>composer.json</code> at the root.
          </li>
        </ul>

        <p>From the outside, without repo access:</p>
        <ul>
          <li>
            Page source contains <code>/_next/static/...</code> asset paths.
          </li>
          <li>
            There is usually a <code>__next</code> or{" "}
            <code>__NEXT_DATA__</code> marker in the HTML.
          </li>
          <li>
            The Dashboard itself labels the site type, which is the reliable
            answer when the others are ambiguous.
          </li>
        </ul>

        <h2>Requirements</h2>
        <ul>
          <li>
            <strong>
              <code>output: &apos;standalone&apos;</code>
            </strong>{" "}
            in <code>next.config.ts</code>. Not optional.
          </li>
          <li>
            <strong>A committed lockfile</strong>, and only one.
          </li>
          <li>
            <strong>A Node version</strong> the platform supports, stated
            explicitly rather than inherited.
          </li>
          <li>
            <strong>A build that passes non-interactively</strong> — anything
            that waits for input hangs forever.
          </li>
        </ul>

        <h2>Limitations worth internalising</h2>
      </div>

      <Callout variant="warning" title="The filesystem is ephemeral">
        <p>
          Anything written at runtime is lost on redeploy and is not shared
          between instances. Uploads, generated files, a JSON file used as a
          database — none of it survives. Durable state belongs in an external
          service. This is the limitation that most often turns a working local
          feature into an unreproducible production bug.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <ul>
          <li>
            <strong>In-memory state does not persist</strong> across requests or
            instances, for the same reason. A module-level cache object is a
            per-instance cache at best. This is exactly the gap the Pantheon
            cache handler exists to fill.
          </li>
          <li>
            <strong>Build time is bounded.</strong> A site generating tens of
            thousands of pages at build time needs a rendering strategy that
            defers some of that work to request time.
          </li>
          <li>
            <strong>Secrets are set on the platform</strong>, not committed.
            Anything prefixed <code>NEXT_PUBLIC_</code> is compiled into the
            browser bundle and is not a secret at all.
          </li>
          <li>
            <strong>Outbound requests go to the public internet.</strong> If the
            CMS you are sourcing from is itself locked or IP-restricted, the
            build fails with a network error rather than anything descriptive.
          </li>
        </ul>
      </div>

      <Callout variant="verify">
        <p>
          Supported Node versions, build time limits, and the specifics of
          platform limits all change. Treat the shape of these constraints as
          durable and the exact numbers as something to confirm in the current
          docs.
        </p>
      </Callout>

      <LessonNav href={HREF} />
    </article>
  );
}
