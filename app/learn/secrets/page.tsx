import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import Demo from "@/components/learn/Demo";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/secrets";

export const metadata: Metadata = {
  title: "Secrets and environment variables",
  description: "Set secrets on the platform and keep them off the client.",
};

export default function Page() {
  // Runs on the server only. We show whether it is set — never the value.
  const present = Boolean(process.env.EXAMPLE_API_KEY);

  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>The one rule</h2>
        <p>
          Anything named <code>NEXT_PUBLIC_*</code> is inlined into the
          JavaScript bundle sent to browsers. It is not a secret and cannot be
          made one. Everything else stays on the server.
        </p>

        <pre>
          <code>{`// Server only — safe for tokens
process.env.WORDPRESS_APP_PASSWORD

// Compiled into the browser bundle — assume the world can read it
process.env.NEXT_PUBLIC_SITE_URL`}</code>
        </pre>
      </div>

      <Callout variant="warning" title="Prefixing to fix an error leaks the secret">
        <p>
          When a value reads as <code>undefined</code> in a client component,
          the tempting fix is to rename it with <code>NEXT_PUBLIC_</code>. That
          publishes it. The correct fix is to keep the secret on the server and
          move the work that uses it there too — a server component, a route
          handler, or a server action.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Where they live</h2>
        <ul>
          <li>
            <strong>Locally:</strong> <code>.env.local</code>, which must be
            gitignored.
          </li>
          <li>
            <strong>On the platform:</strong> set per site and per environment,
            so Test can point at a staging CMS while Live points at production.
          </li>
        </ul>

        <p>
          Setting them per environment is the point. Hardcoding a production
          endpoint means every multidev writes to production.
        </p>

        <h2>Setting them with Terminus</h2>
        <p>
          On Next.js Sites the command is <code>secret:site:set</code> — not
          anything under <code>env:</code>, which is where most people look
          first.
        </p>

        <pre>
          <code>{`# 1. The site-level default must exist first
terminus secret:site:set <site> WORDPRESS_API_URL "https://cms.example.com/graphql" \\
  --type=env --scope=web -n

# 2. Then override it per environment
terminus secret:site:set <site>.test WORDPRESS_API_URL "https://test-cms.example.com/graphql" \\
  --type=env --scope=web -n

terminus secret:site:set <site>.live WORDPRESS_API_URL "https://live-cms.example.com/graphql" \\
  --type=env --scope=web -n

# 3. Confirm — per site, or per environment
terminus secret:site:list <site>
terminus secret:site:list <site>.live`}</code>
        </pre>

        <p>
          <code>--type=env</code> makes it an environment variable, and{" "}
          <code>--scope=web</code> exposes it to the running application.{" "}
          <code>-n</code> answers the prompts non-interactively.
        </p>

      </div>

      <Callout variant="tip" title="Three things that will trip you up">
        <ul>
          <li>
            Setting <code>&lt;site&gt;.&lt;env&gt;</code> before the site-level
            default fails with{" "}
            <code>
              Secret &apos;NAME&apos; does not exist. You should create the
              default secret value first
            </code>
            . Set the bare site first, then the environments.
          </li>
          <li>
            The command prompts <em>Do you want to rebuild the
            application?</em> and will hang a script without <code>-n</code>.
            Pass <code>--rebuild</code> when you do want the change applied
            immediately.
          </li>
          <li>
            <code>secret:site:list</code> shows the value as{" "}
            <code>[REDACTED]</code>. You can confirm a secret exists and its
            scope, but not read it back — check the Dashboard if you need to
            see the value.
          </li>
        </ul>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Read them safely</h2>
        <pre>
          <code>{`const apiKey = process.env.CMS_API_KEY;

if (!apiKey) {
  // Fail loudly at startup rather than sending "Bearer undefined"
  throw new Error("CMS_API_KEY is not set");
}`}</code>
        </pre>

        <p>
          A missing secret otherwise surfaces as a confusing 401 from the CMS,
          several layers away from the actual problem.
        </p>
      </div>

      <Demo
        title="Checking a secret from a server component"
        hint="This page reads process.env on the server and reports only whether it is set."
      >
        <p className="text-sm">
          <code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">
            EXAMPLE_API_KEY
          </code>{" "}
          is currently{" "}
          <strong
            className={
              present
                ? "text-green-600 dark:text-green-400"
                : "text-amber-600 dark:text-amber-400"
            }
          >
            {present ? "set" : "not set"}
          </strong>
          .
        </p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Try it: add <code>EXAMPLE_API_KEY=anything</code> to{" "}
          <code>.env.local</code>, restart the dev server, and reload. Note that
          this demo prints the <em>presence</em> of the value and never the
          value itself — that is the habit worth copying.
        </p>
      </Demo>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>If a secret is committed</h2>
        <p>
          Rotate it first. Removing the line in a later commit does nothing —
          the value is still in the git history, and on a public repo you should
          assume it was scraped within minutes. Rotate, then clean up.
        </p>
      </div>

      <LessonNav href={HREF} />
    </article>
  );
}
