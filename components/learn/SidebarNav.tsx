"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { levels } from "@/data/learnNav";

/** Sidebar for the learning path. Highlights whichever lesson you're on. */
export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 text-sm">
      <Link
        href="/learn"
        className={`block font-semibold ${
          pathname === "/learn"
            ? "text-primary-600 dark:text-primary-400"
            : "hover:text-primary-600 dark:hover:text-primary-400"
        }`}
      >
        Overview
      </Link>

      {levels.map((level) => (
        <div key={level.title}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {level.title}
          </p>
          <ul className="space-y-1 border-l border-slate-200 dark:border-slate-800">
            {level.lessons.map((lesson) => {
              const active = pathname === lesson.href;
              return (
                <li key={lesson.href}>
                  <Link
                    href={lesson.href}
                    aria-current={active ? "page" : undefined}
                    className={`-ml-px block border-l py-1 pl-3 ${
                      active
                        ? "border-primary-500 font-medium text-primary-600 dark:text-primary-400"
                        : "border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    }`}
                  >
                    {lesson.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
