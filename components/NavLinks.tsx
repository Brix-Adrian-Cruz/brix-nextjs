"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerNavLinks } from "@/data/siteMetadata";

const BASE =
  "rounded px-2 py-1 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1";
const INACTIVE =
  "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100";
const ACTIVE = "text-primary-600 dark:text-primary-400";

/**
 * Reads the current route to highlight the active nav item, so it has to be
 * a client leaf wrapped in <Suspense> — usePathname is a dynamic API, and
 * Cache Components requires isolating dynamic reads from the static shell.
 */
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {headerNavLinks.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={`${BASE} ${isActive ? ACTIVE : INACTIVE}`}
          >
            {link.title}
          </Link>
        );
      })}
    </>
  );
}

/** Static fallback rendered while NavLinks resolves — same markup, no active state. */
export function NavLinksFallback() {
  return (
    <>
      {headerNavLinks.map((link) => (
        <Link key={link.href} href={link.href} className={`${BASE} ${INACTIVE}`}>
          {link.title}
        </Link>
      ))}
    </>
  );
}
