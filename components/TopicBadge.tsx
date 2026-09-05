import Link from "next/link";
import { slugifyTag } from "@/lib/posts";

/** Colour by topic, so severity-ish subjects read differently from process. */
const ACCENTS: Record<string, string> = {
  triage:
    "border-primary-300 bg-primary-50 text-primary-700 dark:border-primary-700 dark:bg-primary-950 dark:text-primary-200",
  builds:
    "border-red-300 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300",
  caching:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  debugging:
    "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  escalation:
    "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
};

const DEFAULT_ACCENT =
  "border-slate-300 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";

export default function TopicBadge({
  text,
  asLink = true,
}: {
  text: string;
  asLink?: boolean;
}) {
  const slug = slugifyTag(text);
  const className = `inline-block rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${
    ACCENTS[slug] ?? DEFAULT_ACCENT
  }`;

  if (!asLink) return <span className={className}>{text}</span>;

  return (
    <Link href={`/tags/${slug}`} className={`${className} hover:opacity-80`}>
      {text}
    </Link>
  );
}
