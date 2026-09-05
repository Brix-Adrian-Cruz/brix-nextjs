# Brix's Blog

A lightweight Next.js blog with a built-in course on running Next.js sites on
Pantheon. Posts are Markdown files — no database, no CMS. The `/learn` section
teaches the platform training playbook and demonstrates the concepts with pages
that actually behave differently.

Built on Next.js 16, React 19, and Tailwind CSS v4, in the spirit of the
[Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)
but pared down to the parts a beginner can read in one sitting.

## Getting started

Requires Node 20 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build — stricter than dev, this is what CI runs |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

Before pushing, run `npm run build`. The dev server tolerates type and lint
errors that will fail the build.

## What's in it

### The blog

| Route | Page |
| --- | --- |
| `/` | Bio and the latest posts |
| `/blog` | All posts |
| `/blog/[slug]` | A post, with tags, reading time, and prev/next links |
| `/tags` · `/tags/[tag]` | Tag index and per-tag listings |
| `/about` | About page |

### The course

`/learn` covers the Pantheon Next.js training playbook across 17 pages —
JavaScript foundations through to platform debugging. Four of them are live
demonstrations rather than descriptions:

| Demo | What you observe |
| --- | --- |
| `/learn/rendering/static` | Timestamp frozen at build time |
| `/learn/rendering/dynamic` | Timestamp changes on every request |
| `/learn/rendering/revalidated` | Holds still, then jumps on the cache window |
| `/learn/rendering/streaming` | First byte in ~4ms, slow section arrives 2.5s later |

The JavaScript lessons run their examples in the browser: array methods print
real output, and the async lesson times sequential `await` against
`Promise.all` so the difference is visible rather than asserted.

## Writing a post

Add a Markdown file to `content/blog/`. The filename becomes the URL, so
`content/blog/my-first-post.md` is served at `/blog/my-first-post`.

```markdown
---
title: "My first post"
date: "2026-09-01"
tags: ["next-js", "guide"]
summary: "One or two sentences that show up in the post list."
---

Your writing starts here.
```

`title` and `date` are required. `tags` and `summary` are optional; tags get
their own pages automatically.

## Adding a lesson

1. Create the page under `app/learn/`.
2. Add an entry to `data/learnNav.ts`.

That single entry drives the sidebar, the overview page, and the prev/next
links. Use `LessonHeader` and `LessonNav` so the lesson matches the others, and
`Callout` for asides.

## Making it yours

| What to change | Where |
| --- | --- |
| Site name, bio, nav, social links | `data/siteMetadata.ts` |
| Accent color | the `@theme` block in `app/globals.css` |
| Lesson order and titles | `data/learnNav.ts` |
| Header, footer, theme toggle | `components/` |

## Project structure

```
app/
  page.tsx              Home
  blog/                 Post list and individual posts
  tags/                 Tag index and per-tag pages
  learn/                The course, including the rendering demos
  about/  not-found.tsx
  globals.css           Tailwind theme and the dark-mode variant
components/             Header, Footer, ThemeToggle, PostListItem, Tag
  learn/                Lesson chrome and the interactive demos
content/blog/           Posts, as Markdown files
data/
  siteMetadata.ts       Site-wide settings
  learnNav.ts           The learning path
lib/posts.ts            Reads, parses, and sorts the Markdown
cacheHandler.ts         Pantheon cache handler (ISR, route handlers, fetch)
use-cache-handler.ts    Pantheon cache handler for the "use cache" directive
```

## How it works

**Markdown** is parsed by [`gray-matter`](https://github.com/jonschlinkert/gray-matter)
for frontmatter and [`marked`](https://marked.js.org/) for the body.

**Styling** is Tailwind v4, configured entirely in `app/globals.css` — there is
no `tailwind.config.js`. Post bodies use the typography plugin's `prose` class.

**Dark mode** is a manual toggle. `@custom-variant dark (&:is(.dark *))` points
`dark:` at a class on `<html>`, and an inline script in `app/layout.tsx` applies
the saved choice before first paint. The toggle holds no React state — both
icons render and CSS picks one — so server and client markup always match.

**Caching** uses the `"use cache"` directive, so Markdown files are read once
rather than per request. Cache profiles live in `next.config.ts`.

### A note on Cache Components

`cacheComponents: true` is enabled in `next.config.ts`. It changes two rules
that will otherwise surprise you:

- Reading the clock during render (`new Date()`, `Date.now()`) must happen
  inside a `"use cache"` function, or the build fails.
- Uncached async work must sit inside a `<Suspense>` boundary.

Both rules are explained, with the real error messages, in
`/learn/rendering`.

## Connecting the WordPress backend

Content under `/news` comes from a WordPress site over
[WPGraphQL](https://www.wpgraphql.com/). Next.js needs one variable — the
GraphQL endpoint, which is the WordPress URL plus `/graphql`.

Set it **per environment**, so each Next.js environment reads the matching
WordPress environment:

| Next.js | Reads from | Set where |
| --- | --- | --- |
| Local | `https://dev-brix-nextjs-cms.pantheonsite.io/graphql` | `.env.local` |
| Test | `https://test-brix-nextjs-cms.pantheonsite.io/graphql` | Pantheon Dashboard |
| Live | `https://live-brix-nextjs-cms.pantheonsite.io/graphql` | Pantheon Dashboard |

Locally, copy `.env.example` to `.env.local` and restart the dev server.
`.env.local` is gitignored — never commit it.

If a deployed environment shows the "WordPress is not connected" notice after
you have set the variable, suspect a cached pre-configuration render before
suspecting the config.

All WordPress access goes through `lib/wordpress.ts`, which normalises
responses so components never see CMS-shaped objects. See `/learn/cms` for the
reasoning.

## Deploying to Pantheon

The project is configured for Pantheon Front-End Sites: `output: 'standalone'`
plus both cache handlers wired up in `next.config.ts`.

**Deployment is driven by git tags, not by pushing a branch.** The tag name
picks the environment, and the number increments each time:

```bash
# Deploy to Test
git tag -a pantheon_test_5 -m "Push to Test"
git push origin pantheon_test_5

# Deploy to Live
git tag -a pantheon_live_3 -m "Push to Live"
git push origin pantheon_live_3
```

A tag points at a **commit**, not a branch — whatever you tag is what deploys,
merged or not. Verify the Test build in the Dashboard before tagging Live.

Multidev environments build from branches prefixed `multi-`.

See `/learn/environments` for
environment locking and reading build versus runtime logs.

## Known gaps

The Pantheon lessons carry dashed **"Verify before relying on this"** callouts
wherever a detail could not be confirmed against a live Dashboard or CLI —
exact Terminus flags, GCP resource labels, and supported Node versions. Confirm
those against current docs before treating them as reference.
