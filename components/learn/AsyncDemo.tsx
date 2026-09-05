"use client";

import { useState } from "react";

type Entry = { at: number; text: string; kind: "start" | "done" | "error" };

/** Resolves after `ms`, or rejects if `fail` is set. Stands in for a network call. */
function fakeRequest(label: string, ms: number, fail = false) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`${label} failed`));
      else resolve(`${label} finished in ${ms}ms`);
    }, ms);
  });
}

export default function AsyncDemo() {
  const [log, setLog] = useState<Entry[]>([]);
  const [running, setRunning] = useState(false);

  function append(text: string, kind: Entry["kind"] = "done") {
    setLog((prev) => [...prev, { at: Date.now(), text, kind }]);
  }

  async function runSequential() {
    setLog([]);
    setRunning(true);
    const started = Date.now();
    append("Starting — awaiting one at a time", "start");

    await fakeRequest("Request A", 600).then((m) => append(m));
    await fakeRequest("Request B", 600).then((m) => append(m));

    append(`Total: ${Date.now() - started}ms`, "start");
    setRunning(false);
  }

  async function runParallel() {
    setLog([]);
    setRunning(true);
    const started = Date.now();
    append("Starting — both at once with Promise.all", "start");

    const results = await Promise.all([
      fakeRequest("Request A", 600),
      fakeRequest("Request B", 600),
    ]);
    results.forEach((m) => append(m));

    append(`Total: ${Date.now() - started}ms`, "start");
    setRunning(false);
  }

  async function runFailing() {
    setLog([]);
    setRunning(true);
    append("Starting — this one rejects", "start");

    try {
      await fakeRequest("Request C", 500, true);
    } catch (error) {
      append((error as Error).message, "error");
      append("Caught it, so the page keeps working", "start");
    }

    setRunning(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={runSequential}
          disabled={running}
          className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
        >
          Await one by one
        </button>
        <button
          type="button"
          onClick={runParallel}
          disabled={running}
          className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50"
        >
          Promise.all
        </button>
        <button
          type="button"
          onClick={runFailing}
          disabled={running}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Handle a rejection
        </button>
      </div>

      <ul className="min-h-24 space-y-1 rounded-md border border-gray-200 p-3 font-mono text-sm dark:border-gray-800">
        {log.length === 0 && (
          <li className="text-gray-500 dark:text-gray-400">
            Press a button — each request takes 600ms.
          </li>
        )}
        {log.map((entry, i) => (
          <li
            key={i}
            className={
              entry.kind === "error"
                ? "text-red-600 dark:text-red-400"
                : entry.kind === "start"
                  ? "text-gray-500 dark:text-gray-400"
                  : ""
            }
          >
            {entry.text}
          </li>
        ))}
      </ul>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Two 600ms requests take about 1200ms when awaited one after the other,
        and about 600ms with <code>Promise.all</code>. Awaiting in a loop when
        the requests do not depend on each other is the most common cause of a
        slow page.
      </p>
    </div>
  );
}
