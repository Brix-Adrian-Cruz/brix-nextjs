# SOC Support Training: Design

Date: 2026-10-13

## Goal
A training course for new Support/CSE engineers who will staff the Security & Compliance (SOC / Abuse) queue, built into this site next to the existing Next.js Support Academy. It teaches the written SOC playbooks plus real-world field practice from #cse-soc and #security-operations.

## Decisions (from brainstorming)
- **Shape:** 15 days over 3 weeks, 30-45 min/day. Same day anatomy as the Next.js course: goal, plan, lesson, lab, know-how, quiz, refs.
- **Hosting:** `/training` becomes a course picker. Next.js moves to `/training/nextjs` (old URLs redirect). SOC lives at `/training/soc`.
- **Audience/access:** internal only. No access gate; keep `robots: noindex`.
- **Phishing Domain Takedown Playbook** (VULCAN space, page 5153914902) is included in Day 14.
- **Field practice** (Slack-only material with no playbook) is included, labeled "Field practice, not official policy".

## Sources
- Confluence: Security & Compliance (SOC) page 2350580093 and all descendants (30 pages), plus the VULCAN takedown playbook.
- Slack: #cse-soc (about a year), #security-operations (recent posts and keyword searches only).
- Research notes live in the session scratchpad: `playbooks-abuse-dmca.md`, `playbooks-scans-misc.md`, `slack-soc.md`. They are inputs, not deliverables. Content must be re-verified against the notes while writing, and the VULCAN page must be read in full before Day 14.

## Curriculum
Week 1, Intake and abuse triage
1. Orientation: SOC role vs customer responsibility, Acceptance Policy, Abuse queue, channels (#cse-soc, @soc, #security-operations), general-vs-SOC routing rule.
2. Zendesk mechanics: tags (abuse, snc_internal, snc_proactive, no_ratings, skip_ticket_review, subdomain_returned, abuse_blocked_email, incoming-domain-validation), internal vs proactive tickets, macros, S&C issue types.
3. Phishing sites: verify, disable (mass tool or manual path), resolve macro, restore pitfalls.
4. Subdomain hijacking and domain exemption (Method A/B, escalation).
5. Maintenance Mode cases: malware monitor, false-positive waves, paid vs unpaid, check-in flow, restoring.

Week 2, Legal and customer-facing
6. Forwarded S&C reports and content review: two-ticket rule, Legal CC, 10-day SLA, CSAM/NCMEC priority, never paste questionable images in Slack.
7. DMCA: 5 phases, validity checklist, counter-notice.
8. Trademark and response templates.
9. Scans and pen tests: stance, macro, InfoSec approval path, canned technical rebuttals.
10. Compliance requests: SOC 2 (contract customers only), questionnaires, common customer requests, bug reporters, what is not SOC work.

Week 3, Threats, special cases, capstone
11. DoS/DDoS and ransom threats.
12. Compromised sites: cleanup-report pattern, preservation holds, why a redeploy does not remove non-Git artifacts.
13. Legal-adjacent: data erasure, preservation requests from authorities, fraud and billing disputes (field practice).
14. Edge cases: automated account blocks, Russian-entity and SpamCop reports, IP-reputation complaints, look-alike phishing domain takedown (VULCAN).
15. Capstone: simulated queue of about 8 mixed tickets.

Extra views: **Common reports** (symptom -> action -> playbook, mirrors Next.js reports page) and **Field guide** (tags, macros, channels, escalation paths).

## Architecture
- Routes: `app/training/page.tsx` (picker), `app/training/[course]/...` (home, `day/[day]`, `reports`, `field-guide`). Unknown course id -> 404.
- Course registry: `app/training/_data/courses.ts` maps course id -> metadata (title, description, eyebrow, progress key, weeks, outline, loaders for full content).
- Existing Next.js data moves unchanged into a course folder; SOC data is a sibling with the same `Day`/`Report` types.
- Shared components (Quiz, LabChecklist, Notes, DayControls, DaySidebar, ProgressHeader, WeekOverview) and `progress.ts` take a course id. Each course has its own localStorage key. The Next.js key (`nextjs-support-academy-v1`) must stay unchanged so existing progress survives.
- Full lesson content stays server-only (as today); only the lightweight outline reaches client components.
- Redirects in `next.config.ts`: `/training/day/:n`, `/training/reports`, `/training/field-guide` -> `/training/nextjs/...`.
- Labs are simulated tickets (invented domains such as example.test, fake reports, "what do you do next?" decisions) plus read-only checklists for real tools. No live malicious URLs, no real customer data.

## Content rules
- Never include customer names, individual employee names (use roles), credentials, tokens, ticket numbers, or verbatim Slack quotes. Paraphrase.
- Where playbooks contradict or are stale, say so in the lesson and tell the learner to confirm in #cse-soc. Known cases: counter-notice period ("14th day" vs "14 business days"); DMCA Maintenance Mode timing vs Template 5; restore page vs "do not re-enable manually disabled unpaid sandboxes"; domain exemption "two criteria" listing three; empty follow-up sections; blank Diamond/Platinum owner; DMCA/Trademark template names not matching macro names; preservation page still draft.
- Do not describe abuse-scoring rules for automated account blocks; teach that support must not reveal them.
- Slack-only topics carry the label "Field practice, not official policy".
- Every playbook-derived fact links to its Confluence page in `refs`.

## Testing and verification
- `npm run lint` and `npm run build` pass.
- Next.js course renders and behaves as before at `/training/nextjs`, old URLs redirect, and existing localStorage progress still loads.
- SOC course: all 15 days render, quizzes and lab checkboxes persist under the SOC key, picker lists both courses.
- A content check confirms no names, emails, tokens, or ticket numbers appear in SOC data.

## Out of scope
- Access gating, authoring tools, changes to the Next.js lesson content, new Zendesk/Confluence integrations.

## Risks
- Slack research was partial for #security-operations and had no Zendesk access; macro/tag names beyond the playbooks are limited to what appeared in Slack. Flag uncertain names in the lessons.
- The Next.js `course.ts` is marked as generated; its source is unknown, so the move must be a pure relocation.
