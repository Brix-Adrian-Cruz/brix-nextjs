import type { Metadata } from "next";
import Link from "next/link";
import BuildLog from "@/components/learn/BuildLog";
import Callout from "@/components/learn/Callout";
import { levels } from "@/data/learnNav";

export const metadata: Metadata = {
  title: "Learn Next.js on Pantheon",
  description:
    "A hands-on path through the Next.js training playbook, with runnable demos.",
};

export default function LearnPage() {
  return (
    <div>
      <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Learn Next.js on Pantheon
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          A hands-on path through the training playbook. Where a concept can be
          shown running rather than described, this site runs it.
        </p>
      </header>

      <Callout variant="tip" title="This site is the example">
        <p>
          You are reading these lessons on a real Next.js site deployed to
          Pantheon. It has the cache handler installed,{" "}
          <code>output: &apos;standalone&apos;</code> set, and Test and Live
          environments created from git tags. Lessons link to the actual files
          so you can read the working version of whatever is being described.
        </p>
      </Callout>

      <div className="space-y-10">
        {levels.map((level) => (
          <section key={level.title}>
            <h2 className="text-xl font-bold tracking-tight">{level.title}</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              <span className="font-medium">Objective:</span> {level.objective}
            </p>

            <ul className="mt-4 space-y-3">
              {level.lessons.map((lesson, i) => (
                <li key={lesson.href}>
                  <Link
                    href={lesson.href}
                    className="flex gap-4 rounded-lg border border-slate-200 p-4 hover:border-primary-500 dark:border-slate-800 dark:hover:border-primary-400"
                  >
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-semibold">
                        {lesson.title}
                      </span>
                      <span className="block text-sm text-slate-600 dark:text-slate-400">
                        {lesson.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
        <h2 className="text-xl font-bold tracking-tight">
          How this site was built
        </h2>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Every step taken to get from an empty starter to what you are reading,
          in order. The lessons above cover each one properly.
        </p>

        <BuildLog />
      </section>

      <Callout variant="note" title="Getting unstuck">
        <p>
          If something here does not match what you see in the Dashboard, the
          platform is right and this page is stale — say so in a Slack thread
          rather than working around it.
        </p>
      </Callout>
    </div>
  );
}
