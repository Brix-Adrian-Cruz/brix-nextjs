---
title: "Debugging caching issues on Next.js sites"
date: "2026-08-31"
tags: ["support", "debugging", "caching"]
summary: "Stale content is the most commonly misdiagnosed Next.js issue, because several cache layers can each be the culprit. Match the symptom to the layer."
---

Multiple caching layers can each serve outdated content, which is why this gets
misdiagnosed so often. The trick is letting the symptom point you at the layer.

## Before you continue

Gather these first — each one rules out a whole branch:

1. Which pages are stale, and when was the content last published?
2. Does the most recent build show `BUILD_SUCCESS`?
3. For WordPress or Drupal backends, is Pantheon Advanced Page Cache (PAPC)
   installed and active? If the CMS is not on Pantheon, ask the customer for a
   screenshot showing the plugin active.
4. Is `@pantheon-systems/nextjs-cache-handler` a dependency in `package.json`?
5. Is the site using ISR? Look for a `revalidate` value in page-level files
   under `app/` or `pages/`.

## Match the symptom to the layer

### Some pages update after a cache clear, others do not

The Next.js application cache is not being reached by the CDN purge. This
happens when the Cache Handler package is missing.

Confirm `@pantheon-systems/nextjs-cache-handler` is absent from
`package.json`, then direct the development team to install and configure it.

### WordPress or Drupal content not updating after publish, even after a cache clear

Surrogate Key purging is not firing on publish, because PAPC is not active on
the CMS.

Confirm PAPC is not installed or active, then ask the customer to install and
activate it on the backend.

### Cache Handler and PAPC both configured, still not updating

Webhooks are not triggering revalidation. The usual cause is a **mismatched
revalidation secret** between the CMS and the Next.js site.

Ask the customer to confirm the two match. If they do not, their development
team needs to make them identical on both sides.

### Content updates, but only after a long delay

This is expected behaviour for time-based ISR with no webhooks. Content will
not update until the `revalidate` interval expires.

Tell the customer this is working as configured. To make publishes appear
sooner they need a revalidation webhook or a lower `revalidate` value — both
application-level changes outside our scope.

## If the cause is unclear

- If the stale content was seen in a local build rather than on the site, check
  how it was served first — `next start` does not work on a standalone build
  and can hand back an earlier one. See
  [reproducing a build locally](/blog/investigating-nextjs-application-issues).
- Use the CSE Chrome extension to reach GCP runtime logs, and look for failed
  webhook requests or cache errors.
- Check the Next.js Grafana dashboard to see whether other sites on the
  platform are affected.
- If it looks site-specific, create a Swarm in the CSE channel with the site
  name, environment, caching configuration, and what you have tried.
- If the Swarm does not resolve it, follow
  [escalating Next.js issues](/blog/escalating-nextjs-issues).
