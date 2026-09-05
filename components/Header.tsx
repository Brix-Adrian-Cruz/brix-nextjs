import Link from "next/link";
import { headerNavLinks, siteMetadata } from "@/data/siteMetadata";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 -mx-4 mb-2 border-b border-slate-200 bg-white/85 px-4 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/85">
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          {/* A small status dot, echoing the runbook vocabulary. */}
          <span
            className="h-2 w-2 rounded-full bg-status-ok"
            aria-hidden="true"
          />
          <span className="font-mono text-sm font-bold tracking-tight">
            {siteMetadata.headerTitle}
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {headerNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-2 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              {link.title}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
