import type { CourseMeta } from "./types";
import { OUTLINE as NEXTJS_OUTLINE, WEEKS as NEXTJS_WEEKS } from "./nextjs/outline.ts";
import { OUTLINE as SOC_OUTLINE, WEEKS as SOC_WEEKS } from "./soc/outline.ts";

// Light registry: safe to import into Client Components (no lesson content here).
export const COURSES: CourseMeta[] = [
  {
    id: "nextjs",
    title: "Next.js Support Academy",
    description: "6-week Next.js training course for Pantheon Technical Support.",
    eyebrow: "Pantheon CSE · brix-nextjs · 6 weeks · 30 days × 30–60 min",
    intro: "This course covers JavaScript basics through expert triage, including how Next.js runs on Pantheon and Front-End Sites (FES) and migration. The labs use two real sites: brix-nextjs (this Next.js site) and brix-nextjs-cms (its WordPress back end). The course code is part of the lab, too: see app/training/.",
    progressKey: "nextjs-support-academy-v1",
    weeks: NEXTJS_WEEKS,
    outline: NEXTJS_OUTLINE,
    reportsIntro: "These are the recurring Next.js reports in Zendesk (2026). Each row has the first checks, the playbook to follow, and real tickets to read. Work each one using the Day 21 triage framework.",
    reportsHeading: ["Customer says…", "Layer", "First checks", "Playbook", "Real tickets"],
  },
  {
    id: "soc",
    title: "SOC Support Academy",
    description: "3-week training for the Security & Compliance (Abuse) queue: phishing, DMCA, scans, compliance requests, and threats.",
    eyebrow: "Pantheon CSE · Security & Compliance · 3 weeks · 15 days × 30–45 min",
    intro: "This course teaches how to work the Security & Compliance (SOC / Abuse) queue: abuse reports, phishing and hijacked sites, Maintenance Mode, DMCA and trademark claims, security scans, compliance requests, and compromised sites. Labs use simulated tickets with invented domains, so nothing here touches a live customer. Lessons follow the written playbooks and add field practice from #cse-soc and #security-operations; field practice is labeled and is not official policy. Where the playbooks disagree, the lesson says so: confirm in #cse-soc.",
    progressKey: "soc-support-academy-v1",
    weeks: SOC_WEEKS,
    outline: SOC_OUTLINE,
    reportsIntro: "Recurring SOC/Abuse reports and what to do first. Each row names the report type, the first checks, and the playbook to follow. Details are in the daily lessons; the Field guide lists tags, macros, SLAs and channels.",
    reportsHeading: ["Report says…", "Type", "First checks", "Playbook", "Examples"],
  },
];

export const getCourse = (id: string) => COURSES.find((c) => c.id === id);
export const courseBase = (id: string) => `/training/${id}`;
