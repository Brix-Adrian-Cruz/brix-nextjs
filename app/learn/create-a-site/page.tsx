import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/create-a-site";

export const metadata: Metadata = {
  title: "Creating a Next.js site",
  description:
    "Connect GitHub, create the site, and get the first build green.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <p>
          A Front-End Site on Pantheon is backed by a GitHub repository. You
          connect a GitHub account once per workspace, then each site points at
          one repo. Pushes and tags in that repo drive builds.
        </p>

        <h2>Two routes to the same result</h2>
        <p>
          The Dashboard is the guided path and the one to learn first, because
          its screens name every piece of state involved. Terminus is the same
          operations from the terminal, which is what you want once you are
          doing this repeatedly or scripting it.
        </p>

        <h3>From the Dashboard</h3>
        <ol>
          <li>Connect the GitHub account or organization to the workspace.</li>
          <li>
            Authorize the Pantheon GitHub app for the specific repositories it
            should see. Access is per-repository, so a repo the app was never
            granted simply will not appear in the list.
          </li>
          <li>
            Create the new site, choosing either a fresh repo from a starter or
            an existing repo you already have.
          </li>
          <li>Wait for the first build, then open the build log.</li>
        </ol>

        <h3>From Terminus</h3>
        <pre>
          <code>{`# Confirm the CLI can see you
terminus auth:whoami

# Manage the version-control connection for the workspace
terminus vcs:connection

# Create the site
terminus site:create <site-name> <label> <upstream>`}</code>
        </pre>
      </div>

      <Callout variant="verify">
        <p>
          Terminus subcommands and their exact flags change between releases,
          and Next.js Sites have their own command set. Run{" "}
          <code>terminus list</code> and <code>terminus help &lt;command&gt;</code>{" "}
          against the version you actually have rather than trusting the shapes
          above — they are here to show the workflow, not as a reference.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>What the repo has to provide</h2>
        <p>
          A site will not build just because the code runs locally. Two things
          in this repository are what make it deployable, and both are worth
          opening:
        </p>

        <pre>
          <code>{`// next.config.ts
const nextConfig: NextConfig = {
  // Required for Pantheon deployment: emits a self-contained server
  // in .next/standalone with only the files it actually needs.
  output: 'standalone',

  // The platform's cache handler, so caching survives past one instance
  transpilePackages: ['@pantheon-systems/nextjs-cache-handler'],
  cacheHandler: path.resolve('./cacheHandler.ts'),
};`}</code>
        </pre>

        <p>
          Without <code>output: &apos;standalone&apos;</code> the build produces
          something the platform cannot run. It is the most common reason a site
          that works locally fails to start after deploying.
        </p>

        <h2>A green first build</h2>
        <p>
          Before pushing anything, reproduce the platform&apos;s work locally.
          The build is stricter than the dev server — type errors and lint
          errors that dev tolerates will stop it:
        </p>

        <pre>
          <code>{`npm ci        # install exactly the lockfile, like the build does
npm run build # the step that actually fails in CI
npm start     # serve that build the way the platform does`}</code>
        </pre>

        <p>
          One catch worth knowing before you rely on that last step. With{" "}
          <code>output: &apos;standalone&apos;</code> set, <code>next start</code>{" "}
          does not work — it warns and can serve an earlier build. This project
          points <code>npm start</code> at{" "}
          <code>.next/standalone/server.js</code> instead. On a project that has
          not been set up that way, a passing local check can be showing you
          stale output rather than the build you just made.
        </p>
      </div>

      <Callout variant="tip" title="Check the Node version early">
        <p>
          Set the Node version explicitly rather than inheriting whatever the
          platform defaults to. A local Node that is a major version ahead of
          the build image produces failures with no obvious connection to the
          real cause — a syntax error in a dependency is a classic symptom.
        </p>
      </Callout>

      <LessonNav href={HREF} />
    </article>
  );
}
