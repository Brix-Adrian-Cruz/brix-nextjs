---
title: "Escalating Next.js issues"
date: "2026-08-30"
tags: ["support", "escalation", "process"]
summary: "What to rule out before involving other teams, and the three escalation paths depending on what you found."
---

Use this only after working through the other Next.js playbooks and collecting
the information they ask for. Escalating early costs other teams time and
usually gets the same questions asked back.

## Rule out a platform incident first

A site-specific issue and a platform-wide incident look identical from the
customer's side. Checking this first prevents unnecessary escalations.

1. Open the Grafana dashboards and look for unusual activity across Next.js
   sites.
2. Check the Pantheon status page for active incidents.
3. Post in `#ask-nextjs` with an `@here` asking whether colleagues are
   seeing similar reports. This is the fastest way to confirm whether several
   customers are hitting the same thing.

If multiple sites are affected, treat it as a platform incident and skip to
that path below.

## Escalating a site-specific issue

1. Confirm the issue is reproducible, and write down the exact steps so someone
   else can see it themselves.
2. Verify it is not an application issue —
   [where to start](/blog/where-to-start-nextjs-problems).
3. If the backend is on Pantheon, rule out a CMS problem by auditing its logs
   as normal.
4. Create a Swarm in the CSE channel and get a colleague's help **before**
   reaching out to other teams or filing a bug.
5. If the Swarm does not solve it, post in `#ask-nextjs` with the issue
   and context, linking back to the Swarm.
6. If it is confirmed as a platform-level bug, escalate to PDE.

## Escalating a Next.js application issue

These originate in the customer's own code — routing misconfigurations, ISR or
Cache Handler behavior not matching the application config, API responses not
handled as expected. They are outside Pantheon's support scope, though guidance
is available internally during the launch phase.

1. Try to identify the cause from the Build and Runtime logs.
2. Optionally clone the repository with the CSE extension to review the code.
3. If you need help, post with the site name, environment, a description, and
   what you have already tried.
4. If it cannot be resolved internally, tell the customer the issue is in their
   application code and direct them to their development team.

## Escalating a platform incident

1. Post to alert PDE and get confirmation from a Support or Engineering
   colleague that the incident is real.
2. File a bug report in Jira using the standard bug reporting process.
