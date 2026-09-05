import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/package-managers";

export const metadata: Metadata = {
  title: "Package managers",
  description: "npm, yarn, pnpm, and bun — what differs and what to commit.",
};

const MANAGERS = [
  {
    name: "npm",
    lockfile: "package-lock.json",
    install: "npm install",
    add: "npm install marked",
    run: "npm run dev",
    note: "Ships with Node, so it is always available. What this repo uses.",
  },
  {
    name: "yarn",
    lockfile: "yarn.lock",
    install: "yarn install",
    add: "yarn add marked",
    run: "yarn dev",
    note: "Common on older projects. Yarn 1 and Yarn 2+ behave quite differently.",
  },
  {
    name: "pnpm",
    lockfile: "pnpm-lock.yaml",
    install: "pnpm install",
    add: "pnpm add marked",
    run: "pnpm dev",
    note: "Hard-links a shared store, so installs are fast and disk-cheap.",
  },
  {
    name: "bun",
    lockfile: "bun.lockb",
    install: "bun install",
    add: "bun add marked",
    run: "bun dev",
    note: "Fastest installs. Newest, so tooling support is the thing to check.",
  },
];

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <p>
          All four read the same <code>package.json</code> and install from the
          same npm registry. They differ in how they lay out{" "}
          <code>node_modules</code>, how fast they are, and which lockfile they
          write.
        </p>
      </div>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-300 text-left dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold">Manager</th>
              <th className="py-2 pr-4 font-semibold">Lockfile</th>
              <th className="py-2 pr-4 font-semibold">Add a package</th>
              <th className="py-2 font-semibold">Run a script</th>
            </tr>
          </thead>
          <tbody>
            {MANAGERS.map((m) => (
              <tr
                key={m.name}
                className="border-b border-slate-200 align-top dark:border-slate-800"
              >
                <td className="py-3 pr-4 font-semibold">{m.name}</td>
                <td className="py-3 pr-4 font-mono text-xs">{m.lockfile}</td>
                <td className="py-3 pr-4 font-mono text-xs">{m.add}</td>
                <td className="py-3 font-mono text-xs">{m.run}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <ul>
          {MANAGERS.map((m) => (
            <li key={m.name}>
              <strong>{m.name}</strong> — {m.note}
            </li>
          ))}
        </ul>

        <h2>Pick one and stay on it</h2>
        <p>
          The rule that actually matters: <strong>one lockfile per repo</strong>
          . Two managers in the same project produce two different dependency
          trees, and the build then installs something other than what you
          tested locally.
        </p>

        <h2>Commit the lockfile</h2>
        <p>
          The lockfile pins the exact version of every package, including
          dependencies of dependencies. Committing it is what makes a build
          reproducible — without it, the platform can install a newer patch
          release than you ever ran, and &quot;works on my machine&quot; becomes
          real.
        </p>

        <h2>install vs ci</h2>
        <p>
          <code>npm install</code> may update the lockfile to satisfy{" "}
          <code>package.json</code>. <code>npm ci</code> refuses to: it installs
          exactly the lockfile or fails outright. That is what you want in a
          build, and it is why a lockfile that has drifted out of sync with{" "}
          <code>package.json</code> fails the build rather than quietly
          resolving.
        </p>
      </div>

      <Callout variant="tip" title="A build failure worth recognizing">
        <p>
          <code>npm ci can only install packages when your package.json and
          package-lock.json are in sync</code> means someone edited{" "}
          <code>package.json</code> by hand, or committed one file without the
          other. Fix it by running an install locally and committing the updated
          lockfile — not by switching the build to <code>npm install</code>.
        </p>
      </Callout>

      <LessonNav href={HREF} />
    </article>
  );
}
