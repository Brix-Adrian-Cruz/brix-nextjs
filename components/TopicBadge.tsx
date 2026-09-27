import Link from "next/link";
import { slugifyTag } from "@/lib/posts";

/** Color by topic, so severity-ish subjects read differently from process. */
const ACCENTS: Record<string, string> = {
  triage:
    "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-700 dark:bg-primary-950 dark:text-primary-200",
  builds:
    "border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
  caching:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  debugging:
    "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  escalation:
    "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
};

export const DEFAULT_ACCENT =
  "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";

/** Exposed so other chips (e.g. the /tags index) can share the same topic colors. */
export function getTopicAccent(text: string) {
  return ACCENTS[slugifyTag(text)] ?? DEFAULT_ACCENT;
}

// Same topic-color mapping as ACCENTS, isolated to just a left-border color
// so PostListItem can use it as a card accent bar without also pulling in a
// background/text color meant for a small pill.
const BORDER_ACCENTS: Record<string, string> = {
  triage: "border-l-primary-400 dark:border-l-primary-600",
  builds: "border-l-red-400 dark:border-l-red-700",
  caching: "border-l-amber-400 dark:border-l-amber-700",
  debugging: "border-l-violet-400 dark:border-l-violet-700",
  escalation: "border-l-orange-400 dark:border-l-orange-700",
};

export const DEFAULT_BORDER_ACCENT = "border-l-slate-300 dark:border-l-slate-700";

export function getTopicBorderAccent(text: string) {
  return BORDER_ACCENTS[slugifyTag(text)] ?? DEFAULT_BORDER_ACCENT;
}

export default function TopicBadge({
  text,
  asLink = true,
}: {
  text: string;
  asLink?: boolean;
}) {
  const slug = slugifyTag(text);
  const className = `inline-block rounded border px-2 py-0.5 font-mono text-xs uppercase tracking-wider transition-colors ${
    ACCENTS[slug] ?? DEFAULT_ACCENT
  }`;

  if (!asLink) return <span className={className}>{text}</span>;

  return (
    <Link
      href={`/tags/${slug}`}
      className={`${className} hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1`}
    >
      {text}
    </Link>
  );
}
