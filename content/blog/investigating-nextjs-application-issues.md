---
title: "Investigating Next.js application issues"
date: "2026-09-01"
tags: ["support", "debugging", "application"]
summary: "404s, stale pages, missing content, and empty pages that originate in the customer's own code — and how far our scope extends."
---

Use this when the problem is in the Next.js application layer rather than
Pantheon infrastructure or the CMS.

**On scope:** Pantheon does not formally offer application support for Next.js.
We can still audit and point the customer in the right direction. Either way,
making the code change is the customer's responsibility, exactly as with CMS
issues.

## Pages returning 404

404s on *some* pages usually means a configuration issue in the site's routing.

1. Confirm the most recent build shows `BUILD_SUCCESS`. If it failed, stop and
   go to
   [diagnosing build failures](/blog/diagnosing-nextjs-build-failures).
2. Check the build logs for the list of pages generated. Are the 404ing pages
   in it?
3. If they are not, clone the repo (the CSE extension has a "Clone git repo"
   button on the environment dashboard) and check:

**Is the file in the right place?** WordPress and Drupal backends use the App
Router, which expects files in `app/`. Content Publisher uses the Pages Router,
which expects `pages/`.

**Is the site using static rendering?**

```bash
# WordPress / Drupal backends
grep -r "generateStaticParams" .

# Content Publisher
grep -r "getStaticPaths" .
```

Find the file whose path matches the 404ing page. For `/my-blog/post-1234`,
look for something like `pages/my-blog/[slug].js`.

```js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'post-1' } },
      { params: { slug: 'post-2' } },
    ],
    fallback: false,
  }
}
```

If the affected slug is **not** in `paths` and `fallback` is `false`, Next.js
never generated that page at build time, and any request for it returns a 404.
That is the whole explanation.

Tell the customer the issue is in their application code and direct them to
their development team. The fix might be adding the URL to `paths`, or changing
the `fallback` setting — but it is theirs to make.

## Pages show old content after a cache clear

1. Check whether `@pantheon-systems/nextjs-cache-handler` is a dependency in
   `package.json`. If it is missing, a CDN purge cannot reach the Next.js
   application cache. Ask them to add it.
2. If it is installed, confirm the revalidation secret matches between the CMS
   and the Next.js site. **A mismatched secret silently prevents webhooks from
   triggering revalidation** — no error, just nothing happening.
3. If both are correct, go to
   [debugging caching issues](/blog/debugging-nextjs-caching-issues).

## Published content is missing

1. Confirm the content actually published in the CMS. If the CMS is not on
   Pantheon, ask for a screenshot.
2. For WordPress or Drupal backends, confirm Pantheon Advanced Page Cache is
   installed and active.
3. Clone the repo and run `grep -r "revalidate" .` to find time-based ISR
   intervals.

If a `revalidate` value exists, the content will not appear until that interval
expires. Revalidation webhooks are not currently supported, so the only lever
is lowering the value — an application-level change outside our scope.

If ISR is not configured, or the interval has passed, go to
[debugging caching issues](/blog/debugging-nextjs-caching-issues).

## Pages exist but are empty

1. Check the runtime logs for errors around API calls or data fetching.
2. Then check where the CMS is hosted.

**On Pantheon:** audit the NGINX logs and debug the CMS as you would any normal
site. Content cannot reach Next.js while the CMS is returning errors.

**Elsewhere:** ask the customer to contact their CMS host. We cannot audit
backends we do not host.

## Reproducing a build locally

Cloning the repo and running the build yourself is the fastest way to separate
a code problem from a platform one. There is one trap in that workflow worth
knowing about before it costs you an hour.

Next.js Sites build with `output: 'standalone'` in `next.config.ts`, and
`next start` does not support that mode. It does not fail loudly — it prints a
warning and can serve output from an earlier build:

```
⚠ "next start" does not work with "output: standalone" configuration.
  Use "node .next/standalone/server.js" instead.
```

So `npm ci && npm run build && npm start` can show you a page that has nothing
to do with the build that just ran. If a customer says a change is not
appearing and their local check "proves" the build is wrong, ask how they are
serving it before you accept that.

Serve the standalone output instead. The build deliberately omits `public/` and
`.next/static` because the platform serves those from its CDN, so copy them in
first:

```bash
npm ci
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
node .next/standalone/server.js
```

If that renders correctly and the deployed site does not, the build is fine and
the problem is in delivery — caching, routing, or the environment. Go to
[debugging caching issues](/blog/debugging-nextjs-caching-issues).
