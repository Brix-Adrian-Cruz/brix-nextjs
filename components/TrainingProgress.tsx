"use client";

import Link from "next/link";
import { OUTLINE, TOTAL_DAYS } from "@/app/training/_data/outline";
import { stats, useProgress } from "@/app/training/_lib/progress";

/**
 * Home page's answer to "what should I actually do here" — the Academy is
 * the site's main thread, so this reads real progress (via the same
 * localStorage-backed store /training itself uses) rather than just
 * linking to a syllabus. Renders the same "not started" state on the
 * server and on first client paint (see useProgress's `loaded` flag), so
 * there's no hydration mismatch.
 */
export default function TrainingProgress() {
  const { p, loaded } = useProgress();
  const { done, pct } = stats(p);
  const nextDay = OUTLINE.find((d) => !p.done[String(d.id)]) ?? OUTLINE[OUTLINE.length - 1];
  const started = loaded && done > 0;

  return (
    <section className="mb-16 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400">
            Next.js Support Academy
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {started ? `Day ${nextDay.id}: ${nextDay.title}` : "Start the 30-day course"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {started
              ? `You've completed ${done} of ${TOTAL_DAYS} days. Pick up where you left off.`
              : "Six weeks, 30 days, roughly 30–60 minutes each — JavaScript foundations through platform triage and escalation."}
          </p>

          <Link
            href={`/training/day/${nextDay.id}`}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 active:scale-[0.98]"
          >
            {started ? "Resume training" : "Start Day 1"}
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="w-full max-w-[220px] shrink-0">
          <div className="flex items-baseline justify-between font-mono text-xs text-slate-500 dark:text-slate-500">
            <span>
              {done}/{TOTAL_DAYS} days
            </span>
            <span>{pct}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-primary-500 transition-[width]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <Link
            href="/training"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:underline dark:text-primary-400"
          >
            View full syllabus
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
