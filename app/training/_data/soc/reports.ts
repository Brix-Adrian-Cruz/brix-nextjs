import type { Report } from '../types';

const cs = (id: string) => `https://getpantheon.atlassian.net/wiki/spaces/CS/pages/${id}`;

export const REPORTS: Report[] = [
  {
    s: `A third party reports a login page hosted on a Pantheon URL (phishing or malware report to abuse@pantheon.io)`,
    layer: 'Phishing',
    checks: [
      `Is there a site URL? If not, send the more-information macro and wait`,
      `Is it on Pantheon? Run the Sibyl site lookup (swap hxxp for http)`,
      `Owning org tier, workflow age, Dev-only, login page copying a known site`,
      `Paid plan: Customer Site in Violation of TOS form; otherwise disable the confirmed site`,
    ],
    pb: { t: 'Playbook: Verifying a Phishing or Malicious Site', u: cs('2352481466') },
    tk: [],
  },
  {
    s: `A look-alike login page for our own brand sits on a domain that is not hosted on Pantheon`,
    layer: 'Phishing',
    checks: [
      `Confirm with Sibyl and pantheon_healthcheck that the site is not on the platform`,
      `Check whether SecOps is already handling it in #security-operations`,
      `Follow the domain takedown steps in the playbook rather than the site-disable steps`,
    ],
    pb: { t: 'Playbook: Phishing Domain Takedown Playbook', u: 'https://getpantheon.atlassian.net/wiki/spaces/VULCAN/pages/5153914902' },
    tk: [],
  },
  {
    s: `Reporter says a subdomain of their domain now shows gambling ads or a copy of a real site`,
    layer: 'Hijack',
    checks: [
      `Workflow logs: brand-new site, many random domains added and removed`,
      `Owner email unrelated to the domain, default theme, spoofed branding`,
      `Looker sites explore: hostname ends with the bare domain, org UUID null or different`,
      `Remove domains and set Sandbox with the mass-maintenance tooling; no refund, no notice to the hijacker`,
    ],
    pb: { t: 'Playbook: Handling Subdomain Hijacking', u: cs('2333737404') },
    tk: [],
  },
  {
    s: `Customer cannot add a domain: error says it belongs to another organization`,
    layer: 'Hijack',
    checks: [
      `Is it a once-hijacked domain parked on a security containment site? Sibyl site me on the domain`,
      `Validate the requester: org membership, role, email, authority over the domain`,
      `Prefer an org that owns each site; exemption only for the listed criteria`,
      `Whole-org exemption via the ygg command plus the exemption tag, restore validation afterwards`,
    ],
    pb: { t: 'Playbook: Requests for Domain Exemption (Hijacking)', u: cs('2608627752') },
    tk: [],
  },
  {
    s: `Customer asks why their site shows the blue banner and is in Maintenance Mode`,
    layer: 'Maintenance Mode',
    checks: [
      `Workflow log: Disable site due to platform abuse; hidden disabled_due_to_abuse file in code`,
      `Unpaid sandbox hand-disabled by SecOps: do not re-enable, ask in #security-operations`,
      `Paid live site is never auto-disabled; automatic scan result can be re-checked after about 5 minutes`,
    ],
    pb: { t: 'Playbook: Identifying If a Customer\'s Site Has Been Put into Maintenance Mode for Platform Abuse', u: cs('2353692755') },
    tk: [],
  },
  {
    s: `Engineering put a non-malicious site into Maintenance Mode to protect the platform`,
    layer: 'Maintenance Mode',
    checks: [
      `Acknowledge the request in the engineering thread and clarify remediation steps`,
      `Open a proactive ticket: ACTION REQUIRED, steps to re-enable, typical 24h response window`,
      `Post details in the handoff channels; keep ticket pending until engineering confirms`,
    ],
    pb: { t: 'Playbook: Proactive Maintenance Mode', u: cs('166723588') },
    tk: [],
  },
  {
    s: `Customer says a flagged site is legitimate and asks for it to be restored`,
    layer: 'Maintenance Mode',
    checks: [
      `Be certain the site is legitimate: restoring allow-lists it from future scans`,
      `Check the site was not hand-disabled by SecOps (confirm in #cse-soc or #security-operations)`,
      `Re-enable Site in the debug panel, wait for the workflow, clear cache on Dev`,
    ],
    pb: { t: 'Playbook: Restoring a Disabled Site', u: cs('2353758243') },
    tk: [],
  },
  {
    s: `A security engineer sends malicious code found on a paying customer's site`,
    layer: 'Compromise',
    checks: [
      `Set S&C Issue = Security, Party = Site Owner, legal due date 2 business days BEFORE applying the macro`,
      `Add the follow-up event on the SOC response calendar`,
      `No reply: check if code removed, then 48h polite check-in, then Maintenance Mode on Dev`,
    ],
    pb: { t: 'Playbook: Malicious Content on Paid Site', u: cs('2353038103') },
    tk: [],
  },
  {
    s: `A rights holder sends a copyright takedown notice for content on a Pantheon site`,
    layer: 'DMCA',
    checks: [
      `Hosted on Pantheon? If not, send the not-hosted macro and close`,
      `Notice has all 6 required elements? Incomplete: 5 business days, 48h silence means denial macro`,
      `Valid: proactive ticket to site owner (High), Maintenance Mode, then counter-notice handling`,
    ],
    pb: { t: 'Playbook: DMCA/Copyright Complaint Process', u: cs('2632515677') },
    tk: [],
  },
  {
    s: `A company claims a site is using its trademark or logo`,
    layer: 'Trademark',
    checks: [
      `Trademark is not DMCA: no counter-notice phase, 4 phases only`,
      `Valid needs content URL, contact info and proof of ownership or authority`,
      `Legal due date 5 days; notice to the site owner; no reply in 48h closes it`,
    ],
    pb: { t: 'Playbook: Trademark/Service Mark Complaint Process', u: cs('2632876301') },
    tk: [],
  },
  {
    s: `Email to abuse@pantheon.io about illegal, violent or unethical content on a hosted site`,
    layer: 'Content review',
    checks: [
      `Acknowledge, review, write findings in an internal note (never paste disturbing images in Slack)`,
      `Cross-share in #security-operations with @security-ops`,
      `Legal due date = 10 calendar days; follow up in the same thread; log valid cases in the tracker`,
    ],
    pb: { t: 'Playbook: Content Review Requests', u: cs('2352383819') },
    tk: [],
  },
  {
    s: `A colleague forwards a phishing, DMCA or trademark report that landed in the Abuse queue`,
    layer: 'Legal',
    checks: [
      `Acknowledge the internal ticket, then create a NEW proactive ticket to the external complainant`,
      `CC the internal forwarder and Legal on every communication`,
      `Note the new ticket on the internal one; close internal only after the proactive one is resolved`,
    ],
    pb: { t: 'Playbook: Handling Forwarded Security & Compliance Reports', u: cs('3895132464') },
    tk: [],
  },
  {
    s: `Customer's scanner flags weak ciphers, missing HSTS, ICMP timestamps or a PCI scan failure`,
    layer: 'Scan',
    checks: [
      `Match the finding to the canned answer (weak cipher, SHA-1 HMAC, SNI scan interference, TRACE, ROBOT)`,
      `HSTS is opt-in per site via pantheon.yml; do not promise config changes`,
      `Do not agree to allow-list scanner IPs`,
    ],
    pb: { t: 'Playbook: General Questions about Security Scans', u: cs('47579228') },
    tk: [],
  },
  {
    s: `Customer asks for permission to run a vulnerability scan or penetration test`,
    layer: 'Scan',
    checks: [
      `Send the Vulnerability Scan Penetration Testing macro: no blocking, no allow-listing`,
      `Formal signed approval: Helpdesk ticket assigned to InfoSec, link shared in #security-operations`,
      `Results come back: follow the scan-concerns intake and post in #security-operations without @here`,
    ],
    pb: { t: 'Playbook: Responding to Security Scan/Penetration Test Requests', u: cs('99942409') },
    tk: [],
  },
  {
    s: `Prospect or customer asks for the SOC 2 report or security questionnaire answers`,
    layer: 'Compliance',
    checks: [
      `Point to the Trust Center and its Request Access button first`,
      `Billing tab on the dashboard exists only for non-contract sites`,
      `Contract customer: route to the CSM; non-contract: canned message and the privacy policy`,
    ],
    pb: { t: 'Playbook: SOC2, Compliance, and Security Policy Requests', u: cs('2353398043') },
    tk: [],
  },
  {
    s: `Engineering says a customer site is under a DDoS and destabilizing the platform`,
    layer: 'DDoS',
    checks: [
      `Maintenance Mode in the admin debug panel first to protect other customers`,
      `AGCDN or WAF in place? Pick the rate-limiting playbook; non-AGCDN gets a tracking card`,
      `Find the AM or CSM, send the proactive ticket, notify the sales and CSM channels and your shift manager`,
    ],
    pb: { t: 'Playbook: Handling a DoS/DDoS report', u: cs('2834497538') },
    tk: [],
  },
  {
    s: `Someone found a vulnerability in the platform and writes to support`,
    layer: 'Account',
    checks: [
      `Support does not triage or relay bug reports`,
      `Send the canned reply: sign up for the bug bounty program and email the account ID to infosec@pantheon.io`,
    ],
    pb: { t: 'Playbook: Handling Bug Reporters', u: cs('2721021960') },
    tk: [],
  },
  {
    s: `Police or a state agency asks us to preserve information about a site`,
    layer: 'Legal',
    checks: [
      `Legal validates the authority; Abuse verifies the site is actively hosted`,
      `Notify InfoSec and Legal; do not tell the site owner, do not enable Maintenance Mode, do not revoke access`,
      `Acknowledge to the requester; InfoSec owns all later communication (page is still draft, confirm in #cse-soc)`,
    ],
    pb: { t: 'Playbook: Site Information Preservation Requests', u: cs('4971724804') },
    tk: [],
  },
  {
    s: `Fastly forwards a complaint from a Russian government entity about a hosted site`,
    layer: 'Legal',
    checks: [
      `Verify hosting with pantheon_healthcheck or Sibyl; not hosted: Template 1 and stop`,
      `Proactive ticket to the owner: outbound tag, RU-Fastly-Complaint tag, no action needed, then close`,
      `Reply to Fastly with Template 2 and close`,
    ],
    pb: { t: 'Playbook: S&C Fastly Reports from Russian Entities', u: cs('2353234568') },
    tk: [],
  },
  {
    s: `A person asks us to delete their personal data`,
    layer: 'Account',
    checks: [
      `Look the email up with the Sibyl user lookup`,
      `Found: tell them to delete the dashboard account, then submit the Personal Data Request form`,
      `Set S&C Issue Type to DATA ERASURE REQUEST; paying customers may not be removable`,
    ],
    pb: { t: 'Playbook: Handling Data Erasure Request', u: cs('2434859152') },
    tk: [],
  },
  {
    s: `We confirmed a phishing or malicious site and need it off the platform`,
    layer: 'Phishing',
    checks: [
      `Verify first; open an [Internal] ticket (snc_internal, no_ratings, pantheon_employee) and submit it OPEN`,
      `Disable with the CSE Mass Maintenance Tool or the manual path in the playbook`,
      `Send the Site Disabled resolve macro and set the S&C type`,
    ],
    pb: { t: 'Playbook: Disabling a Confirmed Malicious Site', u: cs('2353332508') },
    tk: [],
  },
  {
    s: `A disabled site's owner asks to have it turned back on`,
    layer: 'Maintenance Mode',
    checks: [
      `Confirm why it was disabled and that the cause is fixed`,
      `Remember the green Re-enable Site button allow-lists the site from future scans: use it sparingly`,
      `Manually disabled unpaid sandboxes: the restore page and the disable rule disagree, so confirm in #cse-soc`,
    ],
    pb: { t: 'Playbook: Restoring a Disabled Site', u: cs('2353758243') },
    tk: [],
  },
  {
    s: `A spam-complaint service (SpamCop-style) forwards a spam email notification`,
    layer: 'Spam',
    checks: [
      `Check whether the sending infrastructure is a customer site on Pantheon`,
      `Use the Spam Email macro and set SOC Issue Type to Spam Email (not the Spam type)`,
      `Tag the ticket proactive when notifying the site owner`,
    ],
    pb: { t: 'Playbook: SpamCop Spam Email Notifications', u: cs('2353659982') },
    tk: [],
  },
  {
    s: `A customer receives a ransom threat: pay or the site gets DDoSed`,
    layer: 'DDoS',
    checks: [
      `Do not reply to the sender and do not pay`,
      `Check for AGCDN/WAF and recommend rate limiting; a stacked CDN is the suggested hardening`,
      `Loop in the CSM per the DDoS playbook; the ransom reply has no confirmed macro name, so confirm in #cse-soc`,
    ],
    pb: { t: 'Playbook: Handling a DoS/DDoS/RDDoS Threat (Ransom Threat)', u: cs('387121159') },
    tk: [],
  },
  {
    s: `A customer asks common security questions (spam blacklisting, encryption, HIPAA, researchers testing their site)`,
    layer: 'Compliance',
    checks: [
      `Use the canned answers: AES256 at rest, TLS 1.2 in transit, Pantheon is not HIPAA compliant`,
      `Researchers are allowed to test; bug reports go to infosec@pantheon.io`,
      `Spam blacklisting: check SPF and Spamhaus, then btool check-for-spam`,
    ],
    pb: { t: 'Playbook: Common Security-related Customer Requests', u: cs('556662909') },
    tk: [],
  },
];
