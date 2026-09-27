import type { Metadata } from "next";
import Link from "next/link";
import ProgressHeader from "./_components/ProgressHeader";
import "./training.css";

export const metadata: Metadata = {
  title: { default: "Next.js Support Academy", template: "%s · Next.js Support Academy" },
  description: "6-week Next.js training course for Pantheon Technical Support.",
  // Internal training content: keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function TrainingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Set with: terminus secret:site:set brix-nextjs NEXT_PUBLIC_TRAINING_BANNER "..." --type=env --scope=web
  // NEXT_PUBLIC_ values are inlined at BUILD time, so a rebuild is required (Day 15 lab).
  const banner = process.env.NEXT_PUBLIC_TRAINING_BANNER;
  const env = process.env.PANTHEON_ENVIRONMENT ?? process.env.APP_ENV ?? "local";
  return (
    <div className="trn">
      {banner && <div className="trn-banner">{banner}</div>}
      <div className="trn-wrap">
        <header className="trn-hero">
          <div className="trn-eyebrow">{`Pantheon CSE · brix-nextjs · env: ${env} · 6 weeks · 30 days × 30–60 min`}</div>
          <h1>
            <Link href="/training">{"Next.js Support Academy"}</Link>
          </h1>
          <nav className="trn-views" aria-label="Training sections">
            <Link href="/training">{"Overview"}</Link>
            <Link href="/training/reports">{"Common reports"}</Link>
            <Link href="/training/field-guide">{"Field guide"}</Link>
          </nav>
        </header>
        <ProgressHeader />
        {children}
      </div>
    </div>
  );
}
