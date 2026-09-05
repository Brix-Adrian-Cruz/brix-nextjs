import Link from "next/link";
import { allLessons } from "@/data/learnNav";

/** Previous/next links, derived from the order in data/learnNav.ts. */
export default function LessonNav({ href }: { href: string }) {
  const index = allLessons.findIndex((lesson) => lesson.href === href);
  const previous = index > 0 ? allLessons[index - 1] : undefined;
  const next =
    index >= 0 && index < allLessons.length - 1
      ? allLessons[index + 1]
      : undefined;

  return (
    <nav className="mt-12 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-2 dark:border-gray-800">
      <div>
        {previous && (
          <>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Previous
            </p>
            <Link
              href={previous.href}
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {previous.title}
            </Link>
          </>
        )}
      </div>
      <div className="sm:text-right">
        {next && (
          <>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Next
            </p>
            <Link
              href={next.href}
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {next.title}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
