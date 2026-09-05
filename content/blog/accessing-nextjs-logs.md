---
title: "Accessing logs for a Next.js site"
date: "2026-09-03"
tags: ["support", "logs", "debugging"]
summary: "Where build and runtime logs live, how to reach them from the dashboard, Terminus, or GCP, and how to actually read them."
---

Next.js sites have two kinds of logs, and knowing which one answers your
question is most of the work.

| Log type | Contains |
| --- | --- |
| **Build logs** | Build jobs triggered by pushes to the repository, including `npm` output and anything else that runs at build time |
| **Runtime logs** | Page requests that were not served from the edge cache, including output from the code that generated the page |

Both are available in the dashboard and through Terminus, so customers can
self-service them. When they lack detail, more is available in Google Cloud.

## Find logs in the site dashboard

1. Open the Next.js site dashboard.
2. Click into the affected environment tab.
3. **Builds** on the left for build and deployment logs.
4. **Runtime Logs** on the left for runtime logs.
5. Click any entry to see its full output.

## Find logs using Terminus

Better when you are moving across environments quickly, or scripting.

Requires the Node Logs plugin for Terminus.

```bash
terminus node:logs:build:list <site>.<env>
terminus node:logs:runtime:list <site>.<env>
```

## Advanced logs in GCP

Use this when the dashboard logs are not detailed enough, or you suspect a
platform-level cause.

Install the Pantheon CSE Booster Chrome extension. It adds purple buttons in
the upper right of the environment tab:

- **Runtime Logs** opens the Cloud Run logs for that environment.
- **Cloud Build** opens the Cloud Build logs.

## How to read build logs

Look for the status codes. They tell you which stage broke:

- `BUILD_QUEUED`, `BUILD_WORKING`, `BUILD_SUCCESS`, `BUILD_FAILURE`
- `DEPLOYMENT_QUEUED`, `DEPLOYMENT_WORKING`, `DEPLOYMENT_SUCCESS`,
  `DEPLOYMENT_FAILURE`

On a `BUILD_FAILURE` or `DEPLOYMENT_FAILURE`, open the full entry for the error
message.

**If the build succeeded but the site is not updating, look for a
`DEPLOYMENT_FAILURE` before investigating anything else.** A green build and a
failed deployment look identical from the customer's side.

### Reading build logs in GCP

Each entry on the Cloud Build page is one build job. Find entries labelled
`nodejs-trigger-*` in the Trigger Name column — those built the customer's
code.

Click the build ID, then find the section reading `Running "npm run build"`.
That is where the customer's own build output begins.

Read **before and after** that section. Problems the platform hit while
preparing to run the build show up outside it, and that is exactly what the
dashboard logs will not show you.

## How to read runtime logs

Open the Runtime Logs tab and review entries for errors, unexpected 500s, or
patterns suggesting one page or API call fails consistently.

Treat these like NGINX logs: **diagnose from patterns and repeated response
codes across many entries**, not from single lines.

Expect low volume. Most pages on these sites are prerendered and served from
the edge cache, so comparatively few requests ever reach the application to be
logged. A quiet runtime log is normal here, not evidence of a misconfiguration —
do not read it as the site being down.

### Reading runtime logs in GCP

On the Cloud Run page, find the entry where the Next.js server reports itself
ready. That marks where the customer's code begins executing.

Everything after that point also appears in the dashboard's Runtime Logs tab —
so, as with build logs, what GCP adds is everything *before* it: the container
starting, the image being pulled, and any failure that stopped the application
from booting at all. A site that never gets past this point logs nothing to the
dashboard, which is why it can look like there are no logs rather than a
crash.
