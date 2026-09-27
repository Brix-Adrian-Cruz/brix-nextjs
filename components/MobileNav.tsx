"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { headerNavLinks } from "@/data/siteMetadata";

/**
 * Header nav collapses into this below `md`. No active-link highlighting
 * here (unlike NavLinks) — that would need usePathname, which under Cache
 * Components has to sit behind its own Suspense boundary, and a hamburger
 * button shouldn't flicker between fallback and real markup just to bold
 * one link. The desktop nav already shows the active page.
 *
 * Positioned via the header's own `position: sticky` (a positioned element),
 * so `absolute inset-x-0 top-full` on the panel lands edge-to-edge right
 * below the header without needing to know its height.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-full z-30 border-b border-slate-200 bg-white px-4 py-3 shadow-lg sm:px-6 dark:border-slate-800 dark:bg-slate-950"
        >
          <nav className="flex flex-col gap-1">
            {headerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
