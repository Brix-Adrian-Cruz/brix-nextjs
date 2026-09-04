---
title: "Caching in Next.js 16"
date: "2026-08-12"
tags: ["next-js", "performance"]
summary: "The 'use cache' directive, cache profiles, and why this blog reads Markdown files exactly once."
---

Reading files from disk on every request would be wasteful for content that
changes a few times a month. Next.js 16 has a clean answer: the `use cache`
directive.

## Marking work as cacheable

Put the directive at the top of an async function and Next caches whatever it
returns:

```ts
export async function getAllPosts() {
  "use cache";
  cacheLife("blog");

  // read and parse the Markdown files...
}
```

Now the filesystem work happens once. Every page that calls `getAllPosts()`
gets the cached result.

## Cache profiles

`cacheLife("blog")` refers to a named profile in `next.config.ts`:

```ts
cacheLife: {
  blog: {
    stale: 60,      // browser may reuse for 60s
    revalidate: 300, // refresh in the background after 5min
    expire: 3600,   // must refetch after 1hr
  },
}
```

Naming profiles instead of scattering numbers through your code means you can
retune caching for the whole site in one place.

## The practical takeaway

Think about *how often the underlying data changes*, not about how often the
page is requested. Blog posts change rarely, so they get a long profile. A
stock ticker would get a short one, or none at all.
