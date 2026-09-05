---
title: "Where to start when a Next.js site has problems"
date: "2026-09-04"
tags: ["support", "triage", "debugging"]
summary: "Work out which layer owns the issue — platform, application, or CMS — before starting any deeper investigation."
---

Use this when a ticket comes in about a Next.js site and you need to decide
where the problem actually lives before digging in.

> If you are not certain whether the site is a Next.js Site or a Front-End
> Site, settle that first. See
> [handling Next.js sites](/blog/handling-nextjs-sites).

## Collect information before responding

Three questions, asked up front, save most of the back and forth:

1. **Which pages are affected?** All of them, or specific ones?
2. **Is it reproducible in every environment, or only one?**
3. **When did it first appear, and what changed?** A new deployment, a content
   publish, a configuration change.

## Identify which layer owns the issue

Open the site dashboard and check the Build and Runtime logs for recent errors
or failure statuses. Combine what you see there with the customer's answers.

### The build or deployment failed

If the logs show a failure status, or the site has never built at all, go to
[diagnosing build or deployment failures](/blog/diagnosing-nextjs-build-failures).

### The site is live but content is stale

Content not updating after a publish points at the cache layer. Go to
[debugging caching issues](/blog/debugging-nextjs-caching-issues).

### Specific pages render wrong, 404, or mishandle API responses

That is the Next.js application layer. It sits outside Pantheon's support
scope, but you can still audit and unblock the customer — see
[investigating application issues](/blog/investigating-nextjs-application-issues).

## If you cannot place it

Post in the Next.js support channel with:

- The site name
- The affected environment
- A description of the issue
- What you have already tried

That last line matters. A post without it usually just gets the same first
questions asked back at you.
