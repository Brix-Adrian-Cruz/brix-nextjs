import type { Metadata } from "next";
import "./training.css";

export const metadata: Metadata = {
  title: { default: "Support Academy", template: "%s · Support Academy" },
  description: "Training courses for Pantheon Technical Support.",
  // Internal training content: keep it out of search engines.
  robots: { index: false, follow: false },
};

export default function TrainingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Set with: terminus secret:site:set brix-nextjs NEXT_PUBLIC_TRAINING_BANNER "..." --type=env --scope=web
  // NEXT_PUBLIC_ values are inlined at BUILD time, so a rebuild is required (Day 15 lab).
  const banner = process.env.NEXT_PUBLIC_TRAINING_BANNER;
  return (
    <div className="trn">
      {banner && <div className="trn-banner">{banner}</div>}
      <div className="trn-wrap">{children}</div>
    </div>
  );
}
