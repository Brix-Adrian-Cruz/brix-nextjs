// Lightweight course outline that is safe to import into Client Components.
export type Week = { n: number; title: string; sub: string };
export type OutlineDay = { id: number; week: number; mins: number; title: string; labs: number; answers: number[] };

export const WEEKS: Week[] = [
 {
  "n": 1,
  "title": "Foundations: JavaScript & tooling",
  "sub": "Read customer code without fear"
 },
 {
  "n": 2,
  "title": "React & Next.js core",
  "sub": "Routers, rendering, caching"
 },
 {
  "n": 3,
  "title": "Next.js on the Pantheon platform",
  "sub": "Build pipeline, environments, logs, secrets"
 },
 {
  "n": 4,
  "title": "CMS backends, Cache Handler & FES",
  "sub": "Decoupled setups and the legacy product"
 },
 {
  "n": 5,
  "title": "Triage & common customer reports",
  "sub": "Symptom → layer → cause"
 },
 {
  "n": 6,
  "title": "Advanced ops, escalation & capstone",
  "sub": "Ticket-ready"
 }
];

export const OUTLINE: OutlineDay[] = [{"id": 1, "week": 1, "mins": 30, "title": "Orientation: what exactly are we supporting?", "labs": 5, "answers": [1, 0, 2]}, {"id": 2, "week": 1, "mins": 45, "title": "JavaScript I: values, objects, arrays, functions", "labs": 3, "answers": [0, 2, 2]}, {"id": 3, "week": 1, "mins": 40, "title": "JavaScript II: map/filter, modules, errors, TypeScript", "labs": 3, "answers": [3, 0, 2]}, {"id": 4, "week": 1, "mins": 45, "title": "Async JavaScript: promises, async/await, fetch", "labs": 3, "answers": [1, 1, 0]}, {"id": 5, "week": 1, "mins": 45, "title": "npm, package.json & lock files + Week 1 check", "labs": 3, "answers": [1, 1, 1, 3, 0]}, {"id": 6, "week": 2, "mins": 40, "title": "React in 40 minutes: components, props, server vs client", "labs": 3, "answers": [1, 2, 3]}, {"id": 7, "week": 2, "mins": 45, "title": "Routing: App Router vs Pages Router", "labs": 4, "answers": [0, 0, 3]}, {"id": 8, "week": 2, "mins": 50, "title": "Rendering strategies: SSG, SSR, ISR, CSR", "labs": 2, "answers": [0, 3, 1]}, {"id": 9, "week": 2, "mins": 45, "title": "Next.js caching layers (and why \"clear cache\" doesn't always work)", "labs": 2, "answers": [2, 1, 1]}, {"id": 10, "week": 2, "mins": 45, "title": "next.config, middleware/proxy & env vars + Week 2 check", "labs": 2, "answers": [2, 2, 0, 2, 2]}, {"id": 11, "week": 3, "mins": 45, "title": "Architecture: from git push to a live page", "labs": 2, "answers": [3, 2, 1]}, {"id": 12, "week": 3, "mins": 60, "title": "Lab day: create a Next.js site (Dashboard + Terminus)", "labs": 4, "answers": [1, 2, 3]}, {"id": 13, "week": 3, "mins": 50, "title": "Environments & the deploy workflow (Dev, PRs, Multidev, Test, Live)", "labs": 4, "answers": [1, 1, 1]}, {"id": 14, "week": 3, "mins": 45, "title": "Logs: Builds, Runtime, Terminus & GCP", "labs": 3, "answers": [3, 2, 3]}, {"id": 15, "week": 3, "mins": 45, "title": "Secrets, limitations & CMS parity + Week 3 check", "labs": 3, "answers": [0, 3, 0, 3, 2]}, {"id": 16, "week": 4, "mins": 45, "title": "Decoupled backends: WordPress & Drupal behind Next.js", "labs": 4, "answers": [2, 3, 3]}, {"id": 17, "week": 4, "mins": 50, "title": "The Pantheon Cache Handler & on-demand revalidation", "labs": 4, "answers": [0, 1, 3]}, {"id": 18, "week": 4, "mins": 35, "title": "Content Publisher + Next.js", "labs": 2, "answers": [1, 2]}, {"id": 19, "week": 4, "mins": 45, "title": "Front-End Sites (FES): the legacy product", "labs": 2, "answers": [0, 0, 0]}, {"id": 20, "week": 4, "mins": 50, "title": "FES → Next.js migration + Week 4 check", "labs": 1, "answers": [1, 1, 1, 1, 1]}, {"id": 21, "week": 5, "mins": 45, "title": "The triage framework", "labs": 1, "answers": [1, 0, 3]}, {"id": 22, "week": 5, "mins": 50, "title": "Common report #1: \"My build is failing\"", "labs": 1, "answers": [0, 0, 0]}, {"id": 23, "week": 5, "mins": 45, "title": "Common report #2: \"Deploy stuck / Test or Live didn't update\"", "labs": 2, "answers": [1, 1]}, {"id": 24, "week": 5, "mins": 50, "title": "Common report #3: \"Content is stale / not updating\"", "labs": 1, "answers": [2, 2]}, {"id": 25, "week": 5, "mins": 50, "title": "Common report #4: 404s, empty pages, 5xx & 403 + Week 5 check", "labs": 2, "answers": [2, 2, 1, 1, 0]}, {"id": 26, "week": 6, "mins": 45, "title": "GitHub, repositories & workspace operations", "labs": 2, "answers": [0, 3]}, {"id": 27, "week": 6, "mins": 40, "title": "Domains, HTTPS, CDN & edge questions", "labs": 1, "answers": [1, 3]}, {"id": 28, "week": 6, "mins": 40, "title": "Support scope & escalation paths", "labs": 1, "answers": [1, 1]}, {"id": 29, "week": 6, "mins": 50, "title": "Ticket craft & simulations", "labs": 2, "answers": [2]}, {"id": 30, "week": 6, "mins": 60, "title": "Capstone: break-your-own-site + final exam", "labs": 3, "answers": [2, 2, 3, 1, 1, 3, 0, 3, 1, 3]}];

export const TOTAL_DAYS = OUTLINE.length;
