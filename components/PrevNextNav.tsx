import Link from "next/link";

type NavItem = { href: string; title: string };

/** Shared previous/next footer nav — used by playbooks and lessons alike. */
export default function PrevNextNav({
  previous,
  next,
  labels = { previous: "Previous", next: "Next" },
}: {
  previous?: NavItem;
  next?: NavItem;
  labels?: { previous: string; next: string };
}) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-12 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 dark:border-slate-800">
      <div>
        {previous && (
          <>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
              {labels.previous}
            </p>
            <Link
              href={previous.href}
              className="font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
            >
              {previous.title}
            </Link>
          </>
        )}
      </div>
      <div className="sm:text-right">
        {next && (
          <>
            <p className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-500">
              {labels.next}
            </p>
            <Link
              href={next.href}
              className="font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-200"
            >
              {next.title}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
