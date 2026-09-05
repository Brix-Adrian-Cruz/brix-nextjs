import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/debugging";

export const metadata: Metadata = {
  title: "Debugging builds and runtime",
  description:
    "Tell a build failure from a runtime error and find the real cause.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>First question: did it build, or is it failing to serve?</h2>
        <p>
          Answer this before anything else. The two failure classes have
          different logs, different causes, and different fixes, and most wasted
          debugging time is someone reading the wrong log.
        </p>
      </div>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-left dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold">Symptom</th>
              <th className="py-2 pr-4 font-semibold">Class</th>
              <th className="py-2 font-semibold">Where to look</th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-3 pr-4">
                Deployment never completed; old version still serving
              </td>
              <td className="py-3 pr-4">Build</td>
              <td className="py-3">Build log, first error</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-3 pr-4">
                New version deployed, but pages 500
              </td>
              <td className="py-3 pr-4">Runtime</td>
              <td className="py-3">Runtime log at time of request</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-3 pr-4">
                Some pages fine, one route 500s
              </td>
              <td className="py-3 pr-4">Runtime</td>
              <td className="py-3">Runtime log, filtered to that path</td>
            </tr>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <td className="py-3 pr-4">
                Worked locally, failed in CI immediately
              </td>
              <td className="py-3 pr-4">Build</td>
              <td className="py-3">Install phase — lockfile or Node version</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Root-causing a broken build</h2>
        <p>
          Builds fail in three phases, and naming the phase narrows the cause
          enormously:
        </p>

        <ol>
          <li>
            <strong>Install</strong> — lockfile out of sync, a private package
            with no credentials, a Node version the dependency rejects.
          </li>
          <li>
            <strong>Compile</strong> — TypeScript errors, lint errors, a bad
            import. Reproduce with <code>npm run build</code> locally; it will
            fail the same way.
          </li>
          <li>
            <strong>Page generation</strong> — the code compiled but crashed
            while rendering. Almost always data: a CMS that was unreachable at
            build time, or a field that was <code>undefined</code> for one item.
          </li>
        </ol>

        <p>
          A phase-three failure names the route, which is the fastest clue you
          will get:
        </p>

        <pre>
          <code>{`Error occurred prerendering page "/blog/some-post"`}</code>
        </pre>

        <p>
          That is a real error from this project&apos;s own history. Adding the
          learning pages initially broke the build with{" "}
          <code>
            Route &quot;/about&quot; used `new Date()` before accessing uncached
            data
          </code>{" "}
          — the page named in the message was exactly where the problem was.
        </p>

        <h2>Root-causing a runtime error</h2>
        <p>Line up three things: the time, the path, and the stack.</p>
        <ol>
          <li>Reproduce the request and note the moment you made it.</li>
          <li>Open the runtime log for that environment at that timestamp.</li>
          <li>
            Read the top frame that belongs to <em>your</em> code, not to
            framework internals.
          </li>
        </ol>

        <p>
          If nothing appears in the runtime log at all, the request never
          reached your application — look at routing, the domain, or the
          environment being locked, rather than at your code.
        </p>
      </div>

      <Callout variant="tip" title="Reproduce the production build locally">
        <p>
          <code>npm run dev</code> is far more forgiving than the real build.
          Before concluding that the platform is at fault, run{" "}
          <code>npm ci &amp;&amp; npm run build &amp;&amp; npm start</code>. A
          large share of &quot;only breaks on Pantheon&quot; issues reproduce
          immediately this way.
        </p>
        <p>
          Check what <code>npm start</code> actually runs first. On a build with{" "}
          <code>output: &apos;standalone&apos;</code>, plain{" "}
          <code>next start</code> does not serve the build you just made — it
          warns and can hand back an earlier one. Serve{" "}
          <code>.next/standalone/server.js</code> instead, after copying{" "}
          <code>public/</code> and <code>.next/static</code> into{" "}
          <code>.next/standalone</code>. Otherwise a &quot;cannot reproduce&quot;
          may only mean you were looking at stale output.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Counting GitHub connections in a workspace</h2>
        <p>
          Useful when a repo will not appear during site creation, or when a
          workspace has quietly hit a connection limit. Two places to look:
        </p>
        <ul>
          <li>
            The workspace&apos;s version-control settings in the Dashboard,
            which lists the connected accounts and organizations.
          </li>
          <li>
            GitHub&apos;s own side, under the organization&apos;s installed
            GitHub Apps, which shows which repositories the Pantheon app was
            actually granted.
          </li>
        </ul>
        <p>
          The usual cause of a missing repo is not a limit at all — it is that
          the app was installed with access to selected repositories and this
          one was never added.
        </p>
      </div>

      <LessonNav href={HREF} />
    </article>
  );
}
