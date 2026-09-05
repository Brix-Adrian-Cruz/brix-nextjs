---
title: "Diagnosing Next.js build or deployment failures"
date: "2026-09-02"
tags: ["support", "debugging", "builds"]
summary: "Build failures and deployment failures are different problems with different causes. Identify which stage broke, then work the matching list."
---

A build failure and a deployment failure need different investigation paths, so
the first job is telling them apart.

## Before you continue

1. Open the site dashboard and check the build logs for the affected
   environment.
2. Identify whether the status is **`BUILD_FAILURE`** or
   **`DEPLOYMENT_FAILURE`**. This decides everything that follows.
3. Note the error messages — see
   [accessing logs](/blog/accessing-nextjs-logs).
4. Check earlier entries to see whether *any* build has ever succeeded. A site
   that has never built is a different problem from one that regressed.
5. Check recent activity for code pushes.

## Diagnosing a build failure

Match the error message:

**Missing or invalid environment variables.** Verify the required secrets are
configured for that environment using the Secrets Manager Terminus plugin.

**A dependency failed to install.** Ask the customer to confirm the dependency
named in the error is listed correctly in `package.json` and that its version
is valid.

**A build or start command is missing.** Both must be present in
`package.json`. Point the customer at the compatibility and requirements
documentation for the expected format.

**A GitHub connection issue.** Ask the customer to uninstall and reinstall the
Pantheon GitHub Connection app, and check the GitHub status page for an
ongoing outage.

## Diagnosing a deployment failure

If the build succeeded but deployment did not, check whether they are deploying
to Test or Live — and then check the tag format.

**Tags must contain an integer that increments with each deployment.** A
badly formatted tag fails the deployment.

- Test: `test-<integer>`
- Live: `live-<integer>`

If the failure references the GitHub app — a connection timeout, an
authorization error — have the customer reinstall the Pantheon GitHub
Connection app, and check the GitHub status page.

If neither explains it, use the CSE Chrome extension to reach the GCP logs for
platform-level context around the time of the failure.

## Escalating

Try a Swarm in the CSE channel first. If that does not resolve it, follow
[escalating Next.js issues](/blog/escalating-nextjs-issues).
