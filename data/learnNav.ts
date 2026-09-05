// The learning path, mirroring the Pantheon Next.js training playbook.
// Adding a page here is all it takes to get it into the sidebar and the
// prev/next links at the bottom of every lesson.

export type Lesson = {
  href: string;
  title: string;
  summary: string;
};

export type Level = {
  title: string;
  objective: string;
  lessons: Lesson[];
};

export const levels: Level[] = [
  {
    title: "Level 1 — Foundations",
    objective:
      "Read basic JavaScript, and independently create and deploy a working Next.js site on the platform.",
    lessons: [
      {
        href: "/learn/javascript",
        title: "JavaScript fundamentals",
        summary:
          "Variables, objects and arrays, loops, functions, and array operations — with runnable examples.",
      },
      {
        href: "/learn/async",
        title: "Fetch, promises, and async/await",
        summary:
          "How JavaScript waits for things, and why almost every data-loading bug traces back to it.",
      },
      {
        href: "/learn/package-managers",
        title: "Package managers",
        summary: "npm, yarn, pnpm, and bun — what differs and what to commit.",
      },
      {
        href: "/learn/create-a-site",
        title: "Creating a Next.js site",
        summary:
          "Connect GitHub, create the site from the Dashboard or Terminus, and get the first build green.",
      },
      {
        href: "/learn/environments",
        title: "Environments, multidev, and logs",
        summary:
          "Test and Live, environment locking, multidev branches, and where build and runtime logs live.",
      },
      {
        href: "/learn/platform",
        title: "Platform context",
        summary:
          "Compatibility, requirements, known limitations, an FAQ of recurring gotchas, and how to tell a Next.js site when you see one.",
      },
      {
        href: "/learn/debugging",
        title: "Debugging builds and runtime",
        summary:
          "Tell a build failure from a runtime error, read the trace, and count a workspace's GitHub connections.",
      },
    ],
  },
  {
    title: "Level 2 — Data and platform features",
    objective:
      "Connect a Next.js site to an external CMS, manage secrets and rendering strategy, and configure and validate the Cache Handler.",
    lessons: [
      {
        href: "/learn/cms",
        title: "Sourcing content from a CMS",
        summary:
          "Pull data from a WordPress or Drupal backend and render it in Next.js.",
      },
      {
        href: "/learn/secrets",
        title: "Secrets and environment variables",
        summary:
          "Set secrets on the platform, read them safely, and keep them off the client.",
      },
      {
        href: "/learn/rendering",
        title: "Rendering strategies",
        summary:
          "Static, dynamic, revalidated, and streamed — four live pages you can watch behave differently.",
      },
      {
        href: "/learn/cache-handler",
        title: "The Pantheon Cache Handler",
        summary:
          "Install it, configure it, and prove it is actually doing something. This repo already has it.",
      },
      {
        href: "/learn/debugging-advanced",
        title: "Advanced debugging",
        summary:
          "Identify a page's rendering technique, read logs in GCP, and trace outbound requests in nginx-access.",
      },
    ],
  },
];

/** Flat list, in order — used for the prev/next links on each lesson. */
export const allLessons: Lesson[] = levels.flatMap((level) => level.lessons);
