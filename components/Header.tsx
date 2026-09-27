import Link from "next/link";
import { Suspense } from "react";
import { siteMetadata } from "@/data/siteMetadata";
import NavLinks, { NavLinksFallback } from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import MobileNav from "./MobileNav";

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
          <div className="hidden items-center gap-1 sm:gap-2 md:flex">
            <Suspense fallback={<NavLinksFallback />}>
              <NavLinks />
            </Suspense>
          </div>
          <ThemeToggle />
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}
