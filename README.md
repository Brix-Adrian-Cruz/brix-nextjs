# Brix's Blog

A lightweight blog built with Next.js 16, React 19, and Tailwind CSS v4 — in
the spirit of the [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog),
but pared down to the parts a beginner actually needs to read.

Posts are Markdown files. There is no database and no CMS: you add a file, and
the post appears.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Writing a post

Create a Markdown file in `content/blog/`. The file name becomes the URL, so
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

`title` and `date` are required; `tags` and `summary` are optional. Tags get
their own pages automatically at `/tags/<tag>`.

## Making it yours

| What you want to change | Where to go |
| --- | --- |
| Site name, bio, nav links, social links | `data/siteMetadata.ts` |
| The accent color | the `@theme` block in `app/globals.css` |
| Header, footer, dark-mode toggle | `components/` |
| The about page | `app/about/page.tsx` |
| How posts are read and sorted | `lib/posts.ts` |

## Project structure

```
app/
  page.tsx              Home — bio and the latest posts
  blog/page.tsx         All posts
  blog/[slug]/page.tsx  A single post
  tags/page.tsx         All tags
  tags/[tag]/page.tsx   Posts for one tag
  about/page.tsx        About
  not-found.tsx         404
  globals.css           Tailwind theme and dark-mode variant
components/             Header, Footer, ThemeToggle, PostListItem, Tag
content/blog/           Your posts, as Markdown files
data/siteMetadata.ts    Site-wide settings
lib/posts.ts            Reads, parses, and sorts the Markdown files
```

## How it works

- **Markdown** is parsed by [`gray-matter`](https://github.com/jonschlinkert/gray-matter)
  (frontmatter) and [`marked`](https://marked.js.org/) (body → HTML).
- **Styling** uses Tailwind v4, configured entirely in `app/globals.css` — there
  is no `tailwind.config.js`. Post bodies are styled by the
  `@tailwindcss/typography` plugin's `prose` class.
- **Dark mode** is a manual toggle. `@custom-variant dark (&:is(.dark *))` in
  `globals.css` points `dark:` at a class on `<html>`; a small inline script in
  `app/layout.tsx` applies the saved choice before the first paint.
- **Caching** uses the `"use cache"` directive, so the Markdown files are read
  and parsed once rather than on every request. The cache profiles live in
  `next.config.ts`.

## Deploying

The project is configured for Pantheon (`output: 'standalone'` plus the
Pantheon cache handler in `next.config.ts`).

```bash
npm run build
npm start
```
