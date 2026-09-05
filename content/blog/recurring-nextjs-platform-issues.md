---
title: "Recurring platform issues and what causes them"
date: "2026-09-05"
tags: ["support", "platform", "builds"]
summary: "Six categories that keep coming back in the support channel, with the underlying cause for each — so a repeat report gets recognised rather than re-investigated."
---

The support channel covers Pantheon's Next.js hosting product, so what arrives
there is almost always a **platform** issue rather than a general framework
question. That distinction matters: the answer is usually in how the platform
builds, deploys, or serves the site, not in the customer's Next.js code.

These six categories account for most of what has come in recently. If a report
matches one, you are probably looking at a known cause rather than something
new.

> Statuses change. Confirm anything described here as fixed or open before
> repeating it to a customer.

## 1. Builds stuck "queued", with empty logs

**Symptom.** A build never starts. The status sits at queued and the build log
is empty rather than showing a failure.

**Cause.** A platform-side database behind version-control event processing was
under-provisioned and would saturate under load. Once it did, the callback
handling GitHub's Deployments API would panic on a nil pointer, and the build
event was never processed.

**What to do.** There is nothing in the customer's repository to fix, so do not
send them looking. Capacity has been increased, but this recurred several times
before a lasting fix landed — if you see it again, treat it as a platform
incident and escalate rather than re-diagnosing.

## 2. `ENOENT` on `next-server.js.nft.json`

**Symptom.** The build fails with a missing-file error naming
`next-server.js.nft.json`.

**Cause.** A tracing bug in Next 16.3's Turbopack. Sites picked it up without
changing anything themselves, because the platform starter template floated the
Next version with a caret range and shipped without a lockfile — so a fresh
build resolved to a newer minor than the one the template was tested against.

**What to do.** Pin Next to a known-good version. The template has been pinned
back to 16.2. This is also the clearest argument you have for why a committed
lockfile is a requirement and not a formality — see
[platform context](/learn/platform).

## 3. Package manager gotchas

**Symptom.** A build reports success but the site serves nothing that was
changed, or a site using Bun fails at runtime rather than at build.

**Cause.** Two separate traps:

- **Yarn silently skips `next build`** unless the project defines a
  `gcp-build` script. The build "succeeds" without having built anything.
- **Bun is build-only.** The buildpack never exports the Bun binary into the
  runtime image, so Bun works to install and build but cannot be the runtime.

**What to do.** For yarn, have the customer add the `gcp-build` script. For
Bun, the site must run on a supported runtime even if Bun does the build. See
[package managers](/learn/package-managers).

## 4. Stale `/_next/static/*` 404s after a deploy

**Symptom.** Immediately after a deploy, pages load but assets 404. The paths
are all under `/_next/static/`.

**Cause.** The deploy syncs the new asset set and prunes files that are no
longer part of it. HTML cached from the previous build still references the
old chunk filenames, which are now gone.

**What to do.** It self-heals in roughly five to ten minutes as the cached HTML
ages out. **"Clear caches" does not help** — tell the customer this before they
try it and conclude the platform is broken. There is no force-rebuild control
yet; a tracked platform bug covers that gap. Related reports of 404s from
edge-cache clear or revalidation trace to surrogate-key handling in the proxy
and have been worked around by rebuilding.

## 5. Secret and environment variable changes need a rebuild

**Symptom.** A customer updates a secret, sees no change, and reports that
secrets are broken.

**Cause.** Values are read at build time. Changing one does not affect a
running deployment until the site is rebuilt. This went undocumented for a
long time, which is why it kept arriving as a bug report.

**What to do.** Have them trigger a rebuild after any secret change. See
[secrets and environment variables](/learn/secrets).

## 6. GitHub App and version-control gaps

**Symptom.** An existing private repository cannot be linked during site
creation, or multidev environments accumulate after their pull requests close.

**Cause.** Two known gaps:

- The Pantheon GitHub App must be **explicitly granted access to that
  repository**. Installing it on the account is not sufficient for a private
  repo.
- Multidev environments are **not automatically deleted when a PR closes**.
  This is an open bug, not intended behaviour.

**What to do.** For linking, walk the customer through granting repository
access in the GitHub App settings. For multidevs, delete them manually and set
expectations that this is currently a manual step.

## Seen once, worth recognising

**Draft Mode not working.** The `__prerender_bypass` cookie was not reaching
the application through the CDN, so draft requests were served the published
page instead.

**Private git submodules failing to authenticate at build time.** Resolved with
a Secrets Manager entry — type `env`, scope `web` — carrying the credential the
submodule fetch needs.

## If it does not match any of these

Work the layer-specific playbook rather than guessing: start at
[where to start](/blog/where-to-start-nextjs-problems), then follow
[builds](/blog/diagnosing-nextjs-build-failures),
[caching](/blog/debugging-nextjs-caching-issues), or
[application issues](/blog/investigating-nextjs-application-issues). If it is
genuinely new, [escalate](/blog/escalating-nextjs-issues) with the site name,
environment, and what you have already ruled out.
