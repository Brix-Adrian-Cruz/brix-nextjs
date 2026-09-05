import type { Metadata } from "next";
import Link from "next/link";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/platform";

export const metadata: Metadata = {
  title: "Platform context",
  description:
    "Compatibility, requirements, limitations, an FAQ, and identifying a Next.js site.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>How to tell you are on a Next.js site</h2>
        <p>
          Worth being able to do in a few seconds, because it decides which
          runbook applies. Next.js Sites and the classic CMS platform behave
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

        <h2>Limitations worth internalizing</h2>
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

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2 id="faq">Frequently asked questions</h2>
        <p>
          The questions below come up repeatedly, and most of them have an
          answer that is specific to how the platform builds and serves a site
          rather than to Next.js itself. That is why searching the framework
          docs for them tends not to help.
        </p>

        <h3>My build succeeded, but none of my changes are on the site.</h3>
        <p>
          Check which package manager the project uses. A yarn build{" "}
          <strong>silently skips <code>next build</code></strong> unless the
          project defines a <code>gcp-build</code> script — the build reports
          success without having built anything. Add the script and rebuild.
        </p>

        <h3>Can I use Bun?</h3>
        <p>
          To install and build, yes. As the runtime, no — the buildpack does not
          export the Bun binary into the runtime image, so a site configured to
          run on Bun builds cleanly and then fails to start.
        </p>

        <h3>I changed a secret and nothing happened.</h3>
        <p>
          Secrets and environment variables are read <strong>at build time</strong>.
          Changing one does not affect the running deployment until you rebuild.
          This is the single most common false bug report about secrets. See{" "}
          <Link href="/learn/secrets">secrets and environment variables</Link>.
        </p>

        <h3>
          Assets under <code>/_next/static/</code> are 404ing right after a
          deploy.
        </h3>
        <p>
          Expected, briefly. The deploy prunes asset files that are no longer
          part of the new build, while HTML cached from the previous build still
          points at the old chunk names. It clears itself in roughly five to ten
          minutes. <strong>&quot;Clear caches&quot; does not help</strong> — it
          is a different cache layer.
        </p>

        <h3>Why will my private repository not link during site creation?</h3>
        <p>
          The Pantheon GitHub App has to be granted access to{" "}
          <strong>that specific repository</strong>. Installing it on the
          account or organization is not enough for a private repo — grant
          access in the GitHub App settings, then retry.
        </p>

        <h3>My multidev environment still exists after I closed the PR.</h3>
        <p>
          Multidevs are not currently deleted automatically when a pull request
          closes. This is a known bug rather than intended behavior, so delete
          them by hand until it is fixed.
        </p>

        <h3>My build cannot authenticate to a private git submodule.</h3>
        <p>
          The build has no ambient git credentials. Supply one through Secrets
          Manager as an entry with type <code>env</code> and scope{" "}
          <code>web</code>, and the submodule fetch can use it.
        </p>

        <h3>Draft Mode works locally but not on the platform.</h3>
        <p>
          Check whether the <code>__prerender_bypass</code> cookie is actually
          reaching the application. If the CDN strips it, draft requests are
          served the published page and Draft Mode looks silently broken.
        </p>

        <h3>Why did my build break when I did not change anything?</h3>
        <p>
          Almost always a dependency resolving to a newer version than the one
          the project was last built against — which is what happens with a
          caret range and no committed lockfile. Commit the lockfile and pin
          the framework version.
        </p>

        <p>
          For the platform-side causes behind several of these, and how to tell
          a known issue from a new one, see{" "}
          <Link href="/blog/recurring-nextjs-platform-issues">
            recurring platform issues
          </Link>
          .
        </p>
      </div>

      <LessonNav href={HREF} />
    </article>
  );
}
