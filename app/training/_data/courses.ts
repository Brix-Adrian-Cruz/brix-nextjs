import type { CourseMeta } from "./types";
import { OUTLINE as NEXTJS_OUTLINE, WEEKS as NEXTJS_WEEKS } from "./nextjs/outline.ts";

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
];

export const getCourse = (id: string) => COURSES.find((c) => c.id === id);
export const courseBase = (id: string) => `/training/${id}`;
