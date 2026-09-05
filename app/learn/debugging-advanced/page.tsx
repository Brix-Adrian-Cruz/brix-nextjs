import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/debugging-advanced";

export const metadata: Metadata = {
  title: "Advanced debugging",
  description:
    "Rendering techniques, GCP logs, nginx-access patterns, and site creation failures.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Identifying a page&apos;s rendering technique</h2>
        <p>Three ways, from most to least authoritative.</p>

        <h3>1. The build output</h3>
        <p>
          The definitive answer, because it is what the build actually decided:
        </p>
        <pre>
          <code>{`Route (app)                      Revalidate  Expire
┌ ○ /                                    5m      1h
├ ○ /about                              15m      1y
├ ◐ /blog/[slug]                         5m      1h

○  (Static)             prerendered as static content
◐  (Partial Prerender)  static shell + dynamic streamed content
ƒ  (Dynamic)            rendered on demand`}</code>
        </pre>
        <p>
          A route you expected to be static showing as dynamic means something
          in it reads request data — <code>cookies()</code>,{" "}
          <code>headers()</code>, <code>searchParams</code>, or{" "}
          <code>connection()</code>. Often it is in a component several levels
          down, not the page file.
        </p>

        <h3>2. Behaviour</h3>
        <p>
          Load the page twice and look for anything time-dependent. Unchanged
          means cached; changed every time means dynamic. This is what the{" "}
          <a href="/learn/rendering">rendering demos</a> are built to make
          obvious.
        </p>

        <h3>3. Response headers</h3>
        <p>
          On the deployed site, cache headers and age indicate whether you were
          served a stored copy. Useful because it needs no repo access — which
          matters when you are debugging someone else&apos;s site.
        </p>

        <h2>Reading logs in GCP</h2>
        <p>
          The Dashboard is the front door, but going to GCP directly gives you
          real query power: structured filters, longer retention, and the
          ability to correlate across services rather than reading one stream at
          a time.
        </p>
        <p>What you are doing there, whatever the exact UI:</p>
        <ul>
          <li>
            Narrow to the right resource — the specific site and environment,
            not the project as a whole.
          </li>
          <li>
            Narrow the time window to the moment of the request. This matters
            more than any filter; a wide window buries the event.
          </li>
          <li>
            Filter by severity to find errors, then <em>widen back out</em>{" "}
            around a hit. The lines just before an error are usually more
            informative than the error itself.
          </li>
        </ul>
      </div>

      <Callout variant="verify">
        <p>
          Exact GCP project names, log bucket layout, and the resource labels
          for a given site are environment-specific and change. Get the current
          mapping from your team rather than guessing — querying the wrong
          project returns an empty result set that looks exactly like &quot;no
          errors&quot;.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Outbound request patterns in nginx-access</h2>
        <p>
          The access log answers a question the application logs cannot: what is
          this site actually asking for, and how often? It is how you catch a
          site hammering its CMS.
        </p>

        <p>Patterns worth recognising:</p>
        <ul>
          <li>
            <strong>A burst at build time, then near silence.</strong> Healthy
            static generation — content fetched once, then served from the
            cache.
          </li>
          <li>
            <strong>Steady requests proportional to visitor traffic.</strong>{" "}
            Pages are rendering dynamically. Correct for personalised content,
            and a bug for a marketing page.
          </li>
          <li>
            <strong>The same URL repeatedly, seconds apart.</strong> Caching is
            not working — often <code>cacheMaxMemorySize</code> left unset, or a
            cache handler that is installed but not wired in.
          </li>
          <li>
            <strong>Requests continuing after the build finished.</strong>{" "}
            Something you thought was build-time is running per request.
          </li>
        </ul>

        <p>
          Because it records timestamps, path, status, and user agent, the log
          also separates &quot;my site is slow&quot; from &quot;the CMS is slow
          and my site is waiting&quot; — a distinction worth establishing before
          optimising anything.
        </p>

        <h2>Site creation failures</h2>
        <p>Work down this list; it is roughly ordered by how often each is the cause.</p>
        <ol>
          <li>
            <strong>The repository is not visible.</strong> The GitHub app was
            installed with access to selected repositories and this one was not
            included. Check the app&apos;s repository access on GitHub.
          </li>
          <li>
            <strong>Missing <code>output: &apos;standalone&apos;</code>.</strong>{" "}
            Builds, then fails to start. A frequent one.
          </li>
          <li>
            <strong>No lockfile, or two.</strong> The install phase fails
            immediately.
          </li>
          <li>
            <strong>Node version mismatch.</strong> Symptoms look like broken
            dependencies rather than a version problem.
          </li>
          <li>
            <strong>The CMS was unreachable at build time.</strong> Static
            generation could not fetch. Look for network errors, not permission
            errors.
          </li>
          <li>
            <strong>A required secret was never set</strong> for that
            environment. The build reaches page generation and then fails on one
            route.
          </li>
        </ol>

        <p>
          In every case, read the <em>first</em> error in the build log rather
          than the last. Later failures are usually downstream of the first, and
          debugging the tail of the log is the single most common way to spend
          an afternoon on the wrong problem.
        </p>
      </div>

      <LessonNav href={HREF} />
    </article>
  );
}
