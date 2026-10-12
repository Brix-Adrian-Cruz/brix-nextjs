# SOC Support Training Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 15-day SOC (Security & Compliance / Abuse) training course at `/training/soc` beside the Next.js course, which moves to `/training/nextjs`, with a `/training` course picker.

**Architecture:** A course registry (`_data/courses.ts`) describes each course (id, title, progress key, weeks, light outline). A `CourseProvider` in `app/training/[course]/layout.tsx` gives client components the course id, so the shared Quiz/Lab/Notes/Progress components and a per-course localStorage store work for any course. Full lesson content stays server-only and is loaded per course. SOC content is plain TS data with the same `Day`/`Report` types as Next.js.

**Tech Stack:** Next.js 16 (Cache Components on, `output: 'standalone'`), React 19, TypeScript, Tailwind 4 + `training.css`, `node --test` (Node 24 type stripping) for data/logic tests.

**Spec:** `docs/superpowers/specs/2026-10-13-soc-training-design.md`

## Global Constraints

- Course shape: 15 days over 3 weeks, 30-45 min/day; each day has goal, plan, learn, lab, knowhow, quiz, refs (same `Day` type as Next.js).
- Routes: `/training` picker; `/training/nextjs/...` and `/training/soc/...`; old `/training/day/:n`, `/training/reports`, `/training/field-guide` redirect to `/training/nextjs/...`.
- The Next.js localStorage key `nextjs-support-academy-v1` MUST NOT change. SOC key: `soc-support-academy-v1`.
- Keep `robots: { index: false, follow: false }`; no access gate (internal only).
- Content: never include customer names, individual employee names (use roles), credentials/tokens, ticket numbers, emails, or verbatim Slack quotes. Labs use invented domains (`example.test`), never live malicious URLs.
- Slack-only material is labeled `Field practice, not official policy.` Contradictory/stale playbooks are called out and the learner is told to confirm in #cse-soc.
- Do not describe abuse-scoring rules for automated account blocks.
- Every playbook-derived fact links its Confluence page in `refs` (base `https://getpantheon.atlassian.net/wiki/spaces/CS/pages/<id>`).
- Match existing code style: double quotes, 2-space indent, `"use client"` only where needed.
- Research inputs (read, do not copy verbatim): scratchpad files `playbooks-abuse-dmca.md`, `playbooks-scans-misc.md`, `slack-soc.md` in `/private/tmp/claude-502/-Users-brixadrian-cruz-Repositories-brix-nextjs/b766a90e-bc8b-4f94-8ca3-a783cbf02663/scratchpad/`.

## Review Focus

- Old bookmarks `/training/day/5`, `/training/reports`, `/training/field-guide` must redirect, not 404 (tested by curl in Task 4).
- Existing Next.js learners keep progress: key unchanged and data shape unchanged (Task 2 test).
- Progress in one course must never affect the other (Task 2 test).
- Unknown course id or day (`/training/foo`, `/training/soc/day/99`) returns 404 (Task 4 curl).
- SOC data must not contain emails, tokens, ticket numbers, `getpantheon.zendesk.com/agent/tickets` links, or names (Task 5 test).
- Backup code from one course restored into another must not crash (Task 2: decode ignores unknown shapes safely).

## File Structure

- `app/training/_data/types.ts` (create): shared types `Week`, `OutlineDay`, `QuizItem`, `Ref`, `Day`, `Report`, `CourseMeta`.
- `app/training/_data/nextjs/{course,outline,fieldGuide}.ts` (git mv from `_data/`): unchanged content; types imported from `../types`.
- `app/training/_data/soc/{outline,course,fieldGuide}.ts` + `soc/days/week{1,2,3}.ts` + `soc/reports.ts` (create).
- `app/training/_data/courses.ts` (create): light registry, client-safe.
- `app/training/_data/content.ts` (create): server-only `getCourseContent(id)`.
- `app/training/_lib/progressStats.ts` (create): pure functions `dayStatus`, `stats`, `encodeProgress`, `decodeProgress`, type `Progress`.
- `app/training/_lib/progress.ts` (modify): per-course store + `useProgress(courseId?)`.
- `app/training/_components/CourseContext.tsx` (create): `CourseProvider`, `useCourse()`.
- `app/training/_components/*` (modify): read course from context, build links with `base`.
- `app/training/page.tsx` (rewrite): course picker. `app/training/layout.tsx` (modify): generic shell.
- `app/training/[course]/{layout,page}.tsx`, `[course]/day/[day]/page.tsx`, `[course]/reports/page.tsx`, `[course]/field-guide/page.tsx` (create/move).
- `next.config.ts` (modify): redirects. `components/TrainingProgress.tsx`, `app/page.tsx` (modify): links.
- `scripts/tests/*.test.mjs` (create), `package.json` (modify): `"test": "node --test scripts/tests/"`.

---

### Task 1: Types, data relocation, registry

**Files:**
- Create: `app/training/_data/types.ts`, `app/training/_data/courses.ts`, `app/training/_data/content.ts`
- Move: `_data/course.ts`, `_data/outline.ts`, `_data/fieldGuide.ts` -> `_data/nextjs/`
- Modify: `package.json` (add test script), `scripts/tests/courses.test.mjs` (create)

**Interfaces:**
- Produces: `COURSES: CourseMeta[]`, `getCourse(id): CourseMeta | undefined`, `courseBase(id): string`, `getCourseContent(id): Promise<CourseContent>` where `CourseContent = { days: Day[]; reports: Report[]; fieldGuideHtml: string }`.

- [ ] **Step 1: Write the failing test** `scripts/tests/courses.test.mjs`

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { COURSES, getCourse, courseBase } from "../../app/training/_data/courses.ts";

test("registry lists nextjs with unchanged progress key", () => {
  const c = getCourse("nextjs");
  assert.ok(c);
  assert.equal(c.progressKey, "nextjs-support-academy-v1");
  assert.equal(c.outline.length, 30);
  assert.equal(courseBase("nextjs"), "/training/nextjs");
});

test("every course has unique id and progress key", () => {
  assert.equal(new Set(COURSES.map((c) => c.id)).size, COURSES.length);
  assert.equal(new Set(COURSES.map((c) => c.progressKey)).size, COURSES.length);
  assert.equal(getCourse("nope"), undefined);
});
```

Add to `package.json` scripts: `"test": "node --test scripts/tests/"`.

- [ ] **Step 2: Run to verify it fails**: `npm test` -> FAIL (module not found).

- [ ] **Step 3: Implement**
  - `git mv app/training/_data/course.ts app/training/_data/nextjs/course.ts` (mkdir first), same for `outline.ts`, `fieldGuide.ts`.
  - In `nextjs/course.ts` replace the local `QuizItem/Ref/Day/Report` type declarations (lines 3-10) with `import type { QuizItem, Ref, Day, Report } from "../types"; export type { QuizItem, Ref, Day, Report };`. In `nextjs/outline.ts` replace the `Week`/`OutlineDay` type lines with `import type { Week, OutlineDay } from "../types"; export type { Week, OutlineDay };`.
  - `types.ts`:

```ts
export type QuizItem = { q: string; o: string[]; a: number; w: string };
export type Ref = { t: string; u: string };
export type Day = {
  id: number; week: number; mins: number; title: string; goal: string;
  plan: [string, number][]; learn: string; lab: string[]; knowhow: string;
  quiz: QuizItem[]; refs: Ref[];
};
export type Report = { s: string; layer: string; checks: string[]; pb: Ref; tk: Ref[] };
export type Week = { n: number; title: string; sub: string };
export type OutlineDay = { id: number; week: number; mins: number; title: string; labs: number; answers: number[] };
export type CourseMeta = {
  id: string; title: string; description: string; eyebrow: string;
  progressKey: string; weeks: Week[]; outline: OutlineDay[];
  reportsIntro: string; reportsHeading: string[];
};
export type CourseContent = { days: Day[]; reports: Report[]; fieldGuideHtml: string };
```
  - `courses.ts` (light, no content imports):

```ts
import type { CourseMeta } from "./types";
import { OUTLINE as NEXTJS_OUTLINE, WEEKS as NEXTJS_WEEKS } from "./nextjs/outline";

export const COURSES: CourseMeta[] = [
  {
    id: "nextjs",
    title: "Next.js Support Academy",
    description: "6-week Next.js training course for Pantheon Technical Support.",
    eyebrow: "Pantheon CSE · brix-nextjs · 6 weeks · 30 days × 30–60 min",
    progressKey: "nextjs-support-academy-v1",
    weeks: NEXTJS_WEEKS,
    outline: NEXTJS_OUTLINE,
    reportsIntro: "These are the recurring Next.js reports in Zendesk (2026). Each row has the first checks, the playbook to follow, and real tickets to read. Work each one using the Day 21 triage framework.",
    reportsHeading: ["Customer says…", "Layer", "First checks", "Playbook", "Real tickets"],
  },
];

export const getCourse = (id: string) => COURSES.find((c) => c.id === id);
export const courseBase = (id: string) => `/training/${id}`;
```
  - `content.ts`:

```ts
import "server-only";
import type { CourseContent } from "./types";

export async function getCourseContent(id: string): Promise<CourseContent | undefined> {
  switch (id) {
    case "nextjs": {
      const [c, f] = await Promise.all([import("./nextjs/course"), import("./nextjs/fieldGuide")]);
      return { days: c.DAYS, reports: c.REPORTS, fieldGuideHtml: f.FIELD_GUIDE_HTML };
    }
    default:
      return undefined;
  }
}
```
  Check `server-only` is installed (`ls node_modules/server-only`); if not, drop the import and rely on the server-only usage convention.

- [ ] **Step 4: Run `npm test`** -> PASS. (Imports under `app/training/**` still reference old paths; fixed in Tasks 3-4, so `npm run build` is expected to fail until Task 4.)
- [ ] **Step 5: Commit** `git add -A app/training scripts package.json && git commit -m "Add course registry, shared types, relocate Next.js data"`

### Task 2: Per-course progress store

**Files:**
- Create: `app/training/_lib/progressStats.ts`, `scripts/tests/progress.test.mjs`
- Modify: `app/training/_lib/progress.ts`

**Interfaces:**
- Produces (`progressStats.ts`, no imports besides `import type`): `type Progress`, `blankProgress()`, `dayStatus(p, id)`, `stats(p, outline)`, `encodeProgress(p)`, `decodeProgress(code)` returning `Partial<Progress>` with only well-formed keys.
- Produces (`progress.ts`): `useProgress(courseId?: string)` returning `{ p, loaded, storageOk, update, replace, reset }`; falls back to `useCourse().id`.

- [ ] **Step 1: Write the failing test**

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { blankProgress, dayStatus, stats, encodeProgress, decodeProgress } from "../../app/training/_lib/progressStats.ts";

const outline = [
  { id: 1, week: 1, mins: 30, title: "a", labs: 1, answers: [1, 0] },
  { id: 2, week: 1, mins: 30, title: "b", labs: 1, answers: [2] },
];

test("stats uses the outline passed in", () => {
  const p = { ...blankProgress(), done: { "1": "2026-10-13" }, quiz: { "1": { "0": 1, "1": 3 } } };
  assert.deepEqual(stats(p, outline), { done: 1, pct: 50, quizPct: 50 });
});

test("dayStatus transitions", () => {
  assert.equal(dayStatus(blankProgress(), 1), "none");
  assert.equal(dayStatus({ ...blankProgress(), notes: { "1": "x" } }, 1), "prog");
  assert.equal(dayStatus({ ...blankProgress(), done: { "1": "d" } }, 1), "done");
});

test("encode/decode roundtrip and garbage-safe decode", () => {
  const p = { ...blankProgress(), notes: { "1": "héllo" } };
  assert.deepEqual(decodeProgress(encodeProgress(p)).notes, { "1": "héllo" });
  assert.deepEqual(decodeProgress(btoa(JSON.stringify({ done: 5, lab: [], other: 1 }))), {});
});
```

- [ ] **Step 2: Run `npm test`** -> FAIL.
- [ ] **Step 3: Implement.** Move `Progress`, `blank`, `dayStatus`, encode/decode out of `progress.ts` into `progressStats.ts` (`stats` now takes `outline: OutlineDay[]` and divides by `outline.length`; `decodeProgress` keeps only keys `done|lab|quiz|notes` whose value is a plain object). In `progress.ts` build one store per key:

```ts
"use client";
import { useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { getCourse } from "../_data/courses";
import { CourseContext } from "../_components/CourseContext";
import { blankProgress, type Progress } from "./progressStats";
export { dayStatus, stats, encodeProgress, decodeProgress, type Progress } from "./progressStats";

const SERVER_SNAPSHOT: Progress = blankProgress();
type Store = { read(): Progress; write(n: Progress): void; subscribe(cb: () => void): () => void; ok(): boolean };
const stores = new Map<string, Store>();

function getStore(courseId: string): Store {
  let s = stores.get(courseId);
  if (s) return s;
  const key = getCourse(courseId)?.progressKey ?? `training-${courseId}-v1`;
  let cache: Progress | null = null;
  let ok = true;
  const listeners = new Set<() => void>();
  s = {
    ok: () => ok,
    read() {
      if (cache) return cache;
      try {
        const raw = window.localStorage.getItem(key);
        cache = raw ? { ...blankProgress(), ...(JSON.parse(raw) as Partial<Progress>) } : blankProgress();
      } catch { ok = false; cache = blankProgress(); }
      return cache;
    },
    write(next) {
      cache = next;
      try { window.localStorage.setItem(key, JSON.stringify(next)); } catch { ok = false; }
      listeners.forEach((l) => l());
    },
    subscribe(cb) {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => { if (e.key === key) { cache = null; cb(); } };
      window.addEventListener("storage", onStorage);
      return () => { listeners.delete(cb); window.removeEventListener("storage", onStorage); };
    },
  };
  stores.set(courseId, s);
  return s;
}

export function useProgress(courseId?: string) {
  const ctx = useContext(CourseContext);
  const id = courseId ?? ctx?.id;
  if (!id) throw new Error("useProgress needs a course id or a CourseProvider");
  const store = getStore(id);
  const p = useSyncExternalStore(store.subscribe, store.read, () => SERVER_SNAPSHOT);
  const loaded = p !== SERVER_SNAPSHOT;
  const update = useCallback((fn: (prev: Progress) => Progress) => store.write(fn(store.read())), [store]);
  const replace = useCallback((next: Partial<Progress>) => store.write({ ...blankProgress(), ...next }), [store]);
  const reset = useCallback(() => store.write(blankProgress()), [store]);
  return { p, loaded, storageOk: store.ok(), update, replace, reset };
}
```
  (Drop unused `useMemo` import.) Note `useSyncExternalStore` needs `store.subscribe`/`store.read` identity-stable: they are object members created once. Test: also add to the test file a check that `getCourse("nextjs").progressKey === "nextjs-support-academy-v1"` (already in Task 1).
- [ ] **Step 4: Run `npm test`** -> PASS.
- [ ] **Step 5: Commit** `git commit -am "Make progress store per-course and extract pure stats"` (include new files).

### Task 3: Course context and shared components

**Files:**
- Create: `app/training/_components/CourseContext.tsx`
- Modify: `DayControls.tsx`, `DaySidebar.tsx`, `ProgressHeader.tsx`, `WeekOverview.tsx` (links + data from context); `LabChecklist.tsx`, `Quiz.tsx`, `Notes.tsx` (only the `useProgress` import path stays; no change needed beyond verifying).

**Interfaces:**
- Produces: `CourseContext`, `CourseProvider({ course, children })`, `useCourse(): { id: string; base: string; weeks: Week[]; outline: OutlineDay[]; totalDays: number }`.

- [ ] **Step 1:** Create `CourseContext.tsx`:

```tsx
"use client";
import { createContext, useContext, useMemo } from "react";
import type { CourseMeta, OutlineDay, Week } from "../_data/types";

export type CourseCtx = { id: string; base: string; weeks: Week[]; outline: OutlineDay[]; totalDays: number };
export const CourseContext = createContext<CourseCtx | null>(null);

export function CourseProvider({ course, children }: { course: CourseMeta; children: React.ReactNode }) {
  const value = useMemo<CourseCtx>(() => ({
    id: course.id, base: `/training/${course.id}`, weeks: course.weeks, outline: course.outline, totalDays: course.outline.length,
  }), [course]);
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse(): CourseCtx {
  const c = useContext(CourseContext);
  if (!c) throw new Error("useCourse must be used inside CourseProvider");
  return c;
}
```
- [ ] **Step 2:** In each of DayControls/DaySidebar/ProgressHeader/WeekOverview: remove imports of `../_data/outline`, add `const { base, outline, weeks, totalDays } = useCourse();`, replace `OUTLINE`->`outline`, `WEEKS`->`weeks`, `TOTAL_DAYS`->`totalDays`, every `/training/day/` -> `` `${base}/day/` ``, and `stats(p)` -> `stats(p, outline)`. ProgressHeader's `OUTLINE.length` -> `outline.length`.
- [ ] **Step 3:** `npx tsc --noEmit` for these files (full build verified in Task 4). Fix type errors.
- [ ] **Step 4: Commit** `git commit -am "Drive shared training components from course context"`.

### Task 4: Routes, picker, redirects, links

**Files:**
- Create: `app/training/[course]/layout.tsx`, `[course]/page.tsx`
- Move: `day/[day]/page.tsx`, `reports/page.tsx`, `field-guide/page.tsx` -> `app/training/[course]/...`
- Rewrite: `app/training/page.tsx`; Modify: `app/training/layout.tsx`, `next.config.ts`, `components/TrainingProgress.tsx`, `app/page.tsx` (check link targets)

**Interfaces:**
- Consumes: `COURSES`, `getCourse`, `getCourseContent`, `CourseProvider`.

- [ ] **Step 1:** `app/training/layout.tsx`: keep banner/env wrapper, generic metadata `title: { default: "Support Academy", template: "%s · Support Academy" }`, remove hero/ProgressHeader (moves to `[course]/layout`). Keep `.trn` + `training.css` import + noindex.
- [ ] **Step 2:** `[course]/layout.tsx` (server): 

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES, getCourse } from "../_data/courses";
import { CourseProvider } from "../_components/CourseContext";
import ProgressHeader from "../_components/ProgressHeader";

export function generateStaticParams() { return COURSES.map((c) => ({ course: c.id })); }

export default async function CourseLayout({ children, params }: { children: React.ReactNode; params: Promise<{ course: string }> }) {
  const { course: id } = await params;
  const course = getCourse(id);
  if (!course) notFound();
  const env = process.env.PANTHEON_ENVIRONMENT ?? process.env.APP_ENV ?? "local";
  return (
    <CourseProvider course={course}>
      <header className="trn-hero">
        <div className="trn-eyebrow">{`${course.eyebrow} · env: ${env}`}</div>
        <h1><Link href={`/training/${course.id}`}>{course.title}</Link></h1>
        <nav className="trn-views" aria-label="Training sections">
          <Link href="/training">{"All courses"}</Link>
          <Link href={`/training/${course.id}`}>{"Overview"}</Link>
          <Link href={`/training/${course.id}/reports`}>{"Common reports"}</Link>
          <Link href={`/training/${course.id}/field-guide`}>{"Field guide"}</Link>
        </nav>
      </header>
      <ProgressHeader />
      {children}
    </CourseProvider>
  );
}
```
  Check how the old layout wrapped hero inside `.trn-wrap`; keep the wrap in `training/layout.tsx` around `{children}`.
- [ ] **Step 3:** `[course]/page.tsx`: course intro (for nextjs reuse the existing intro paragraph text; SOC intro defined via registry field `intro: string` — add `intro: string` to `CourseMeta` and registry, using the old text verbatim for nextjs) + `<WeekOverview />`; `generateStaticParams` returns courses; `notFound()` if unknown.
- [ ] **Step 4:** Move the three pages with `git mv`; adapt: `params` gains `course`; load `getCourseContent(course)` (`notFound()` if undefined); `generateStaticParams` in day page returns `await`-free flat list `COURSES` x days (needs light outline: use `course.outline.map(d => ({ course: course.id, day: String(d.id) }))`); day page uses `course.weeks`, `content.days`, `${base}` links; reports page uses `course.reportsIntro/reportsHeading` and `content.reports`; field-guide uses `content.fieldGuideHtml`. Metadata titles unchanged.
- [ ] **Step 5:** Picker `app/training/page.tsx`: lists `COURSES` as cards (title, description, day count, link to `/training/<id>`), styled with existing `.trn-*` classes (add `.trn-courses` grid rules to `training.css`).
- [ ] **Step 6:** `next.config.ts` add:

```ts
  async redirects() {
    return [
      { source: "/training/day/:day", destination: "/training/nextjs/day/:day", permanent: true },
      { source: "/training/reports", destination: "/training/nextjs/reports", permanent: true },
      { source: "/training/field-guide", destination: "/training/nextjs/field-guide", permanent: true },
    ];
  },
```
- [ ] **Step 7:** `components/TrainingProgress.tsx`: import `OUTLINE, TOTAL_DAYS` from `@/app/training/_data/nextjs/outline`, call `useProgress("nextjs")`, `stats(p, OUTLINE)`, link `/training/nextjs/day/${nextDay.id}`; "View full syllabus" -> `/training/nextjs`. Leave `app/page.tsx` `/training` link as is (picker).
- [ ] **Step 8: Verify.** `npm run lint && npm run build` (must pass). Then `npm run start` in background (or `npx next start` equivalent per `scripts/serve-standalone.mjs`) and:
  - `curl -sI localhost:3000/training/day/5` -> 308 to `/training/nextjs/day/5`; same for reports and field-guide.
  - `curl -s -o /dev/null -w "%{http_code}" localhost:3000/training/nextjs/day/30` -> 200; `/training/foo` -> 404; `/training/nextjs/day/99` -> 404.
  - Kill the server.
- [ ] **Step 9: Commit** `git commit -am "Move training under /training/[course] with picker and redirects"` (use `git add -A app components next.config.ts`).

### Task 5: SOC scaffolding and content validator

**Files:**
- Create: `app/training/_data/soc/outline.ts`, `soc/course.ts`, `soc/days/week1.ts`, `week2.ts`, `week3.ts`, `soc/reports.ts`, `soc/fieldGuide.ts`, `scripts/tests/soc-content.test.mjs`
- Modify: `courses.ts`, `content.ts`

**Interfaces:**
- `soc/days/weekN.ts` each `export const WEEK_N_DAYS: Day[]` (type-only import from `../../types`).
- `soc/course.ts`: `export const DAYS = [...WEEK_1_DAYS, ...WEEK_2_DAYS, ...WEEK_3_DAYS]`, `export { REPORTS } from "./reports"`.
- `soc/outline.ts`: `WEEKS` (3 entries) and `OUTLINE` (15 entries: `{id,week,mins,title,labs,answers}` matching DAYS exactly).
- `soc/fieldGuide.ts`: `export const FIELD_GUIDE_HTML`.
- `soc/reports.ts`: `export const REPORTS: Report[]`.
- Registry entry: id `soc`, title `SOC Support Academy`, progressKey `soc-support-academy-v1`, eyebrow `Pantheon CSE · Security & Compliance · 3 weeks · 15 days × 30–45 min`, `reportsHeading: ["Report says…", "Type", "First checks", "Playbook", "Examples"]`.

- [ ] **Step 1: Write the validator test** (`soc-content.test.mjs`) before content exists. It imports `soc/course.ts`, `soc/outline.ts`, `soc/reports.ts`, `soc/fieldGuide.ts` and asserts:
  - 15 days, ids 1..15, weeks `1|2|3`, `mins` 30-45, every day has non-empty `goal/learn/knowhow`, `lab.length >= 3`, `quiz.length >= 3`, `refs.length >= 1`.
  - Each quiz item: `a` is a valid index of `o`, `o.length` 3-4, `w` non-empty.
  - `OUTLINE[i]` equals `{id,week,mins,title,labs: lab.length, answers: quiz.map(q=>q.a)}` for the day with the same id.
  - Every `refs[].u` and report playbook url starts with `https://` ; Confluence refs match `/getpantheon\.atlassian\.net\/wiki\//`.
  - Over the JSON of all SOC data: no email regex `/[\w.+-]+@[\w-]+\.[\w.-]+/` except an allow-list `abuse@pantheon.io`, `infosec@pantheon.io`; no `/gh[opsu]_[A-Za-z0-9]{20,}/`; no `/zendesk\.com\/agent\/tickets\/\d+/`; no `/#\d{5,}/` ticket numbers; no real malicious indicator strings: `(?<!example\.)test` handled by requiring any `https?://` URL in lab/learn HTML to be either a Confluence/pantheon/docs/legal/trust/status/ NCMEC/ lumen/ google safe-browsing link or `example.test`.
  - Day text includes the exact label `Field practice, not official policy` in at least Day 5, 12, 13 (Slack-only topics) — assert across all days it appears at least 3 times.
  - Forbidden names list from the research (add a list of roles-only check: fail if any of the first names of people named in the research notes appear: the implementer greps the notes and adds them in the test as `FORBIDDEN_NAMES`).
- [ ] **Step 2:** Create `soc/outline.ts`, `soc/course.ts`, week files as empty arrays + `soc/reports.ts`/`fieldGuide.ts` stubs so the test loads; run `npm test` -> FAIL on counts (expected). Register SOC in `courses.ts` and `content.ts` (mirror nextjs case with `./soc/course` and `./soc/fieldGuide`).
- [ ] **Step 3: Commit** `git add -A && git commit -m "Scaffold SOC course data and content validator"`.

### Task 6: Week 1 content (Days 1-5)
### Task 7: Week 2 content (Days 6-10)
### Task 8: Week 3 content (Days 11-15)

Each task fills one `soc/days/weekN.ts` and updates the matching part of `soc/outline.ts` (OUTLINE entries and the `WEEKS` entry; Week titles: 1 "Intake & abuse triage" / "Queue, tags, phishing, hijacking, Maintenance Mode"; 2 "Legal & customer-facing" / "Reports, DMCA, trademark, scans, compliance"; 3 "Threats, special cases & capstone" / "DDoS, compromise, legal-adjacent, edge cases"). Day topics as in the spec Curriculum. Format per day (see `nextjs/course.ts` Day 1 for the shape): `plan` like `[["Learn",15],["Lab",15]]` (sums to `mins`), `learn` HTML (`<p>`, `<table>`, `<ul>`, `<h4>`, `<code>`), `lab` = 3-6 steps each an HTML string; scenario labs embed an invented ticket in a `<blockquote>` and ask "what do you do first, which tags/macros, who do you escalate to?" with the model answer in the know-how box; `knowhow` HTML with the answer key and pitfalls; 3-5 quiz items with a clear `w` explanation; `refs` with the relevant Confluence pages (ids below).

- [ ] **Step 1:** Read the relevant research notes and fetch any Confluence page again when a detail is unclear (cloudId `getpantheon.atlassian.net`).
- [ ] **Step 2:** Write the week file. Day 14 first fetches Confluence page `5153914902` (Phishing Domain Takedown Playbook, VULCAN space) in full.
- [ ] **Step 3:** Update `soc/outline.ts` entries to match.
- [ ] **Step 4:** `npm test` (validator passes for the days present; the 15-day count test passes only after Task 8, so run the per-day checks) and re-read for names/ticket numbers.
- [ ] **Step 5:** Commit `git commit -am "Add SOC week N content"`.

Page ids per day — D1: 2350580093, 2441281662; D2: 2441281662, 3895132464; D3: 2353332519, 2352481466, 2353332508, 2353758243; D4: 2333737404, 2608627752; D5: 2353692755, 2353038103, 166723588; D6: 3895132464, 2352383819; D7: 2632613925, 2632515677, 2705719457; D8: 2632876301, 2705719457; D9: 2352743864, 47579228, 2115010790, 99942409; D10: 2353398043, 556662909, 2721021960; D11: 387121159, 2834497538; D12: 4971724804 and field practice; D13: 2434859152, 4971724804; D14: 2353234568, 2353659982, 5153914902; D15: all.

### Task 9: Reports view and Field guide

**Files:** Modify `soc/reports.ts`, `soc/fieldGuide.ts`.

- [ ] **Step 1:** `REPORTS`: 14-18 rows `{ s: symptom, layer: type pill (Phishing|Hijack|DMCA|Trademark|Scan|Compliance|DDoS|Compromise|Account|Legal), checks: [..], pb: {t:"Playbook: …", u}, tk: [] }` (`tk` stays empty: no ticket links, per content rules). Cover every playbook page at least once.
- [ ] **Step 2:** `FIELD_GUIDE_HTML`: sections (`<section class="fg">` with `<h3>`): channels & groups; Zendesk tags table; macros table (only names confirmed in the research; mark unconfirmed ones `confirm in #cse-soc`); SLA/timer cheat sheet (DMCA 5 business days / 48h denial, content review 10 calendar days, paid-site 2 business days + 48h, exemption 1 business day); escalation paths; "playbook inconsistencies to confirm" list from the spec Content rules.
- [ ] **Step 3:** `npm test`; commit `git commit -am "Add SOC common reports and field guide"`.

### Task 10: Full verification and review

- [ ] **Step 1:** `npm test && npm run lint && npm run build` all pass.
- [ ] **Step 2:** Start the production server and curl: `/training` 200 listing both courses; `/training/soc` 200; `/training/soc/day/1` and `/day/15` 200; `/training/soc/day/16` 404; `/training/soc/reports` and `/field-guide` 200; Next.js redirects from Task 4 still pass; home page `/` 200.
- [ ] **Step 3:** Browser check if the Chrome tools are available: open `/training/soc/day/1`, answer a quiz question, tick a lab step, reload, confirm persistence, and confirm `/training/nextjs` progress is separate.
- [ ] **Step 4:** Run `/code-review`-style fresh review of the diff (use the `superpowers:requesting-code-review` skill) and fix real findings.
- [ ] **Step 5:** Update `README.md` training section if it mentions `/training`; commit. Do NOT push or deploy.
