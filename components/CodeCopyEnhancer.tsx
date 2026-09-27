"use client";

import { useEffect } from "react";

/**
 * One delegated click listener for every "Copy" button on the page, rather
 * than a client component per code block — code blocks themselves are plain
 * server-rendered HTML from lib/highlightCode.ts (data-copy-button /
 * data-code-block), so there's nothing to hydrate.
 */
export default function CodeCopyEnhancer() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const button = target.closest<HTMLElement>("[data-copy-button]");
      if (!button) return;

      const block = button.closest<HTMLElement>("[data-code-block]");
      const code = block?.querySelector("code");
      if (!code?.textContent) return;

      const original = button.textContent;

      navigator.clipboard
        .writeText(code.textContent)
        .then(() => {
          button.textContent = "Copied";
        })
        .catch(() => {
          button.textContent = "Couldn't copy";
        })
        .finally(() => {
          window.setTimeout(() => {
            button.textContent = original;
          }, 1500);
        });
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
