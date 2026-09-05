"use client";

import { useState } from "react";

type Post = { title: string; views: number; tag: string };

const POSTS: Post[] = [
  { title: "Welcome to the blog", views: 1240, tag: "guide" },
  { title: "Styling with Tailwind", views: 860, tag: "css" },
  { title: "Caching in Next.js 16", views: 2130, tag: "performance" },
  { title: "Markdown cheatsheet", views: 410, tag: "guide" },
];

type Op = "map" | "filter" | "reduce" | "sort";

const CODE: Record<Op, string> = {
  map: `posts.map((post) => post.title)`,
  filter: `posts.filter((post) => post.views > 800)`,
  reduce: `posts.reduce((total, post) => total + post.views, 0)`,
  sort: `[...posts].sort((a, b) => b.views - a.views)`,
};

const EXPLANATION: Record<Op, string> = {
  map: "One item in, one item out. The array always keeps its length — you are transforming each element.",
  filter:
    "Keeps only the items where your function returns true. Same items, possibly fewer of them.",
  reduce:
    "Boils the whole array down to a single value, carrying a running total from item to item.",
  sort: "Reorders items. Note the [...posts] copy — sort() mutates the array it is given.",
};

function run(op: Op): unknown {
  switch (op) {
    case "map":
      return POSTS.map((post) => post.title);
    case "filter":
      return POSTS.filter((post) => post.views > 800);
    case "reduce":
      return POSTS.reduce((total, post) => total + post.views, 0);
    case "sort":
      return [...POSTS].sort((a, b) => b.views - a.views);
  }
}

export default function ArrayOpsDemo() {
  const [op, setOp] = useState<Op>("map");
  const result = run(op);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(CODE) as Op[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setOp(key)}
            aria-pressed={op === key}
            className={`rounded-md px-3 py-1.5 font-mono text-sm ${
              op === key
                ? "bg-primary-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            .{key}()
          </button>
        ))}
      </div>

      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          The code
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-900 p-3 text-sm text-gray-100">
          <code>{CODE[op]}</code>
        </pre>
      </div>

      <div>
        <p className="mb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
          What comes back
        </p>
        <pre className="overflow-x-auto rounded-md border border-gray-200 p-3 text-sm dark:border-gray-800">
          <code>{JSON.stringify(result, null, 2)}</code>
        </pre>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {EXPLANATION[op]}
      </p>
    </div>
  );
}
