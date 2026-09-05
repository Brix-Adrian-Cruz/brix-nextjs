---
title: "Handling Next.js sites"
date: "2026-09-05"
tags: ["support", "nextjs-sites", "triage"]
summary: "Next.js Sites and Front-End Sites are two different products. Telling them apart is the first thing to do on any ticket."
---

"Next.js on Pantheon" is the product customers use to create a new site with
Next.js selected as the framework, the same way they would pick WordPress or
Drupal. These are usually called **Next.js Sites**.

## Next.js Sites are not Front-End Sites

This is the distinction that causes the most confusion, and getting it wrong
sends you down the wrong runbook entirely.

Front-End Sites (FES) can *also* be built with Next.js, but an FES site's build
process runs **outside** Pantheon. That leaves two separate products that both
involve Next.js:

| | Next.js Sites | Front-End Sites |
| --- | --- | --- |
| Build runs | On Pantheon | Externally |
| Ticket handling | This playbook | Normal FES process |

If the customer has an **FES site**, handle the ticket as you normally would
and post in the FES support channel for help.

If the customer has a **Next.js Site**, continue with these playbooks.

When you cannot tell the two apart, stop and work through the separate
guidance on identifying sites using Next.js on Pantheon before doing anything
else. Every later step assumes you got this right.

## Scope of support

We handle **the platform layer of Next.js Sites in full** — builds, deployments,
environments, caching, secrets, and the CMS back-end when it is hosted here.

Two things fall outside that:

- **The customer's application code.** Routing, rendering strategy, and how the
  app handles API responses are not formally supported. We can still audit the
  code and point the customer in the right direction, but making the change is
  theirs to do.
- **A back-end hosted somewhere other than Pantheon.** We cannot audit what we
  do not host, so the customer needs to work with their own CMS host.

To begin any investigation, start with
[where to start when a Next.js site has problems](/blog/where-to-start-nextjs-problems).

## Questions

Post in `#ask-nextjs`. There is a named SME contact for the project who can be
tagged if needed.
