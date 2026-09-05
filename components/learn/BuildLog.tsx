/**
 * The actual sequence this site was built in. Kept short on purpose — each
 * step links to the lesson that covers it properly.
 */
const STEPS: {
  title: string;
  detail: string;
  artifact?: string;
  lesson?: { href: string; label: string };
}[] = [
  {
    title: "Start from the Pantheon Next.js starter",
    detail:
      "A minimal create-next-app scaffold with Next.js 16, React 19, Tailwind v4, and the Pantheon cache handler already wired in.",
    artifact: "next.config.ts",
    lesson: { href: "/learn/create-a-site", label: "Creating a site" },
  },
  {
    title: "Build the blog",
    detail:
      "Markdown files in content/blog/ parsed with gray-matter and marked, plus tag pages, a dark-mode toggle, and typography styling.",
    artifact: "lib/posts.ts",
    lesson: { href: "/learn/javascript", label: "JavaScript fundamentals" },
  },
  {
    title: "Fix the ESLint config",
    detail:
      "Linting crashed on every run. eslint-config-next v16 ships flat configs, but the scaffold piped them through FlatCompat, which expects the old format.",
    artifact: "eslint.config.mjs",
    lesson: { href: "/learn/debugging", label: "Debugging" },
  },
  {
    title: "Push to GitHub",
    detail:
      "Work went to a branch rather than straight to main, so the change stays reviewable before it ships.",
    lesson: { href: "/learn/create-a-site", label: "Creating a site" },
  },
  {
    title: "Create Test and Live with git tags",
    detail:
      "No deploy button: pushing a tag named pantheon_test_* or pantheon_live_* is what builds an environment.",
    artifact: "git push origin pantheon_test_3",
    lesson: { href: "/learn/environments", label: "Environments" },
  },
  {
    title: "Add this learning section",
    detail:
      "Seventeen lessons, four of them live demos that behave differently rather than describing the difference.",
    artifact: "data/learnNav.ts",
    lesson: { href: "/learn/rendering", label: "Rendering strategies" },
  },
  {
    title: "Write the README",
    detail:
      "Setup, structure, the Cache Components rules that bite newcomers, and how tag-based deploys work.",
    artifact: "README.md",
  },
  {
    title: "Connect WordPress over WPGraphQL",
    detail:
      "A decoupled backend feeding /news. One file talks to the CMS and normalizes the response, so components never see WordPress-shaped data.",
    artifact: "lib/wordpress.ts",
    lesson: { href: "/learn/cms", label: "Sourcing from a CMS" },
  },
  {
    title: "Set environment variables per environment",
    detail:
      "terminus secret:site:set, so Test reads the test CMS and Live reads the live one. A site-level default must exist before per-environment overrides work.",
    artifact: "terminus secret:site:set <site>.live WORDPRESS_API_URL ...",
    lesson: { href: "/learn/secrets", label: "Secrets" },
  },
];

export default function BuildLog() {
  return (
    <ol className="mt-4 space-y-4">
      {STEPS.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          <span
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900 dark:text-primary-100"
            aria-hidden="true"
          >
            {i + 1}
          </span>

          <div className="min-w-0">
            <p className="font-semibold">{step.title}</p>
            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">
              {step.detail}
            </p>

            {(step.artifact || step.lesson) && (
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                {step.artifact && (
                  <code className="break-all rounded bg-slate-100 px-1.5 py-0.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {step.artifact}
                  </code>
                )}
                {step.lesson && (
                  <a
                    href={step.lesson.href}
                    className="text-primary-600 hover:underline dark:text-primary-400"
                  >
                    {step.lesson.label} →
                  </a>
                )}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
