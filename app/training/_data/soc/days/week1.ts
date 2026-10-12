import type { Day } from "../../types.ts";

const CS = "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/";

export const WEEK_1_DAYS: Day[] = [
  {
    id: 1,
    week: 1,
    mins: 35,
    title: "Orientation: the SOC role and where tickets come from",
    goal: "Explain what the SOC team owns and what the customer owns, find the Abuse queue and the right Slack channels, and route a request to the right place.",
    plan: [["Learn", 20], ["Lab", 15]],
    learn: `<p>The Security &amp; Compliance (SOC) team, also called the Abuse team, handles reports that something on the platform is malicious, illegal or in breach of policy. Reports arrive at <code>abuse@pantheon.io</code> and become Zendesk tickets in the <b>Abuse</b> group (the Abuse queue). Team chat happens in <b>#cse-soc</b>, and you reach the team there with the <code>@soc</code> Slack group.</p>
<h4>Who owns what</h4>
<table><thead><tr><th>SOC team responsibilities</th><th>Customer responsibilities</th></tr></thead><tbody>
<tr><td>Notify customers about claims made against their sites</td><td>Any code change on their site (removing files, adding plugins)</td></tr>
<tr><td>Disable phishing sites on the platform</td><td>Site security: Pantheon secures the platform, not each individual site</td></tr>
<tr><td>Disable sandbox sites with malicious or illegal content</td><td>Site updates and configuration</td></tr>
<tr><td>Process DMCA, trademark and copyright claims</td><td>DMCA, trademark and copyright compliance</td></tr>
<tr><td>Notify paying customers of malicious code on their sites</td><td>Removing malicious or illegal content from their site</td></tr>
<tr><td>Answer security and compliance questions, provide resources</td><td></td></tr>
</tbody></table>
<p>The practical consequence: we tell customers what was found and what is expected of them, and we help with resources. We do not clean their code for them.</p>
<h4>The Acceptance Policy</h4>
<p>The Acceptance Policy on legal.pantheon.io is marked <b>must read before handling tickets</b> on the SOC landing page. Read it in full before the lab. Nearly every decision in this course (disable, notify, remove content) rests on it.</p>
<h4>Channels and groups</h4>
<ul>
<li><b>#cse-soc</b> and <code>@soc</code>: the SOC team room. Any handoff to the team (a customer in Maintenance Mode, a suspected hijack) goes here.</li>
<li><b>#security-operations</b> and <code>@security-ops</code>: the Security team. SOC cross-shares content review requests here, and scan or security concerns are posted here. Do not use <code>@here</code> there, because the team works in specific time zones.</li>
</ul>
<h4>Routing rule: general support or SOC?</h4>
<p>Ask what the report is about. If the thing is abuse of the platform or a legal or policy claim (phishing, hijacked subdomain, DMCA, trademark, content review, spam, a site disabled for abuse), it belongs to SOC. If it is a general technical or security-hardening question about the customer's own site (a CVE in a plugin, how to harden a CMS, a pen-test finding), it is not SOC work and goes through technical support, or #security-operations when the playbooks say so (Week 2 covers scans). When unsure, ask in #cse-soc before replying to the customer.</p>
<h4>Content Review tracker</h4>
<p>The SOC landing page has a special instruction: every <i>valid</i> Content Review ticket is also logged in a shared Google sheet, with the ticket and customer information, so the interested manager stays informed. The sheet link lives on the landing page. Ask in #cse-soc if you cannot open it.</p>
<p><b>Field practice, not official policy.</b> During backlog drives the lead has also asked agents to log resolved SOC tickets in a shared spreadsheet, and posts a daily count of open Abuse tickets with the age of the oldest. The queue auto-assigns tickets to individuals, so assigning a ticket to Abuse may hand it back to you. Tag the team in #cse-soc instead of relying on reassignment.</p>`,
    lab: [
      `Read the Acceptance Policy on legal.pantheon.io from start to finish. Write down three kinds of content or behaviour it forbids.`,
      `Open the SOC landing page in Confluence (link in refs). Find the Zendesk group name, the Slack channel, the Slack group, and the line about the Content Review Google sheet.`,
      `In Slack, find #cse-soc and #security-operations. Note the group handle you would use in each (<code>@soc</code> and <code>@security-ops</code>). Do not post anything.`,
      `In Zendesk, open the Abuse group view (read-only). Find how many tickets are open and the age of the oldest. Do not change any ticket.`,
      `Routing drill. Decide for each simulated request whether it is SOC or general support, and what you would do first:<blockquote>(a) A visitor writes to abuse@pantheon.io saying shop-login.example.test looks like a copy of a bank login page.<br>(b) A paying customer writes that a scanner reports an outdated plugin on blog.example.test and asks Pantheon to patch it.<br>(c) A customer says their site docs-portal.example.test shows a blue banner and asks why it is in Maintenance Mode.</blockquote>`
    ],
    knowhow: `<p><b>Routing drill answers.</b></p>
<ul>
<li><b>(a) SOC.</b> It is a possible phishing report that arrived at the abuse mailbox. First step: confirm whether the site is hosted on Pantheon (Day 3). If not hosted, close with the not-on-Pantheon macro.</li>
<li><b>(b) Not SOC.</b> Plugin updates are the customer's responsibility. Route it through technical support. If the customer attaches scan results, the scan-concern flow (Week 2) posts a summary in #security-operations.</li>
<li><b>(c) Probably SOC.</b> A site in Maintenance Mode for platform abuse is a SOC matter. Check the debug workflow log for a disable-for-abuse workflow, and post in #cse-soc with the dashboard URL (Day 5). The customer who writes in is most likely a victim, not the bad actor.</li>
</ul>
<p><b>Pitfalls.</b> Do not clean or edit customer code. Do not paste questionable images into Slack. Do not use <code>@here</code> in #security-operations.</p>`,
    quiz: [
      {
        q: "Where do abuse reports sent to abuse@pantheon.io end up?",
        o: ["In the Abuse group of Zendesk", "Directly in #security-operations", "In the general support queue only", "In a Jira board"],
        a: 0,
        w: "Reports to the abuse mailbox create Zendesk tickets in the Abuse group. The team talks in #cse-soc using the @soc group."
      },
      {
        q: "Who is responsible for removing malicious files from a customer's site?",
        o: ["The SOC team", "The customer", "Pantheon platform engineering", "Fastly"],
        a: 1,
        w: "Code changes, site security, updates and removing malicious or illegal content are customer responsibilities. Pantheon secures the platform, not each site."
      },
      {
        q: "A customer asks you to patch a vulnerable plugin on their site. What is the right routing?",
        o: ["SOC queue, because it is security related", "It is not SOC work: plugin updates are the customer's job, and the request goes through technical support", "Ask Fastly to block it", "Disable the site"],
        a: 1,
        w: "General site hardening and CVE questions are not SOC responsibilities. SOC handles platform abuse and legal or policy claims."
      },
      {
        q: "Which Slack group do you tag for Security team questions?",
        o: ["@soc in #cse-soc", "@here in #security-operations", "@security-ops in #security-operations", "@channel in #cse-soc"],
        a: 2,
        w: "Use @security-ops in #security-operations. Avoid @here there because the team works in specific time zones."
      }
    ],
    refs: [
      { t: "Security & Compliance (SOC) landing page", u: CS + "2350580093" },
      { t: "Internal Ticket & Tags", u: CS + "2441281662" }
    ]
  },
  {
    id: 2,
    week: 1,
    mins: 40,
    title: "Zendesk mechanics: tags, internal tickets, proactive tickets",
    goal: "Apply the right tags to abuse tickets, create the internal Phishing and Subdomain Takeover tickets correctly, and know when QA and CSAT do not apply.",
    plan: [["Learn", 20], ["Lab", 20]],
    learn: `<p>Tags drive reporting, automation and QA in the Abuse group. Learn them as a dictionary.</p>
<table><thead><tr><th>Tag</th><th>Meaning</th></tr></thead><tbody>
<tr><td><code>abuse</code></td><td>Marks every abuse ticket, to tell them apart from other departments.</td></tr>
<tr><td><code>snc_internal</code></td><td>Tickets created by SOC agents who disable Phishing or Subdomain Takeover sites directly, with no complainant.</td></tr>
<tr><td><code>snc_proactive</code></td><td>Tickets that notify a site owner: DMCA or trademark complaint, malicious code on a paid site, content review requests, spam emails.</td></tr>
<tr><td><code>spam</code></td><td>Spam tickets. Do not set the S&amp;C issue type to Spam Email on these.</td></tr>
<tr><td><code>no_ratings</code></td><td>Internal tickets, bad actors or malicious users, phishing agency tickets. No satisfaction survey should apply.</td></tr>
<tr><td><code>incoming-domain-validation</code></td><td>Domain protection exemption, or anything about the platform update for subdomain hijacking or takeover.</td></tr>
<tr><td><code>skip_ticket_review</code></td><td>Skips QA review (MaestroQA) for phishing, spam, spam emails and subdomain hijacking tickets.</td></tr>
<tr><td><code>subdomain_returned</code></td><td>A hijacked subdomain was returned to the legitimate owner.</td></tr>
<tr><td><code>abuse_blocked_email</code></td><td>A user account was blocked as a Terms of Service violator (for example a subdomain hijacker or phisher).</td></tr>
</tbody></table>
<h4>Internal tickets (no complainant)</h4>
<p>When a SOC agent disables a confirmed bad site without any report, the ticket is created internally so the action is tracked.</p>
<ul>
<li><b>Phishing:</b> subject is the internal prefix, then "Phishing site for the site". Body says it is a confirmed phishing site, please disable it, with Dashboard, User and Org Dash. Tags: <code>phishing</code>, <code>snc_internal</code>, <code>no_ratings</code>, <code>pantheon_employee</code>. Follow the disabling playbook (Day 3). Solve with Closing Template 2.</li>
<li><b>Subdomain Takeover:</b> subject is the internal prefix, then "Subdomain Takeover for the site". Body says confirmed Terms of Service violator, remove the subdomains and disable the site, with Site Name, Dashboard, User and Org Dash. Tags: <code>subdomain_takeover</code>, <code>snc_internal</code>, <code>no_ratings</code>, <code>pantheon_employee</code>. Follow Handling Subdomain Hijacking (Day 4).</li>
<li>Both are <b>submitted as OPEN</b>, then solved with Closing Template 2 once the site is disabled and the fields are filled in.</li>
</ul>
<h4>Proactive tickets</h4>
<p>A proactive ticket is one you open to the customer: the DMCA notice to a site owner, the malicious-code notice for a paid site, the spam email notice. These carry <code>snc_proactive</code>. For forwarded reports, the proactive ticket goes to the original complainant (Week 2).</p>
<h4>QA and CSAT</h4>
<p><code>skip_ticket_review</code> keeps the QA tool from sampling the ticket types listed above. For CSAT, the team decision is that a bad rating on a phishing ticket, especially from a third-party complainant, is disregarded.</p>
<p><b>Field practice, not official policy.</b> The Resolve macro used on confirmed phishing adds a no-ratings tag so no survey goes out. If the report turns out to be a false positive, add the no-ratings tag by hand so the survey is not sent. Note that the playbook spells the tag <code>no_ratings</code> while Slack discussion writes it with a hyphen. Check the exact spelling in Zendesk before relying on either, and confirm in #cse-soc.</p>
<p>The playbook tag list dates from 2023 and tags can change. If a tag in the Zendesk tag box does not match this table, confirm in #cse-soc.</p>`,
    lab: [
      `In Zendesk (read-only), open any closed abuse ticket and list every tag on it. Match each tag to the table. Mark any you cannot match.`,
      `Open the Internal Ticket &amp; Tags page (link in refs) and compare it with the table in the lesson. Note anything that has changed.`,
      `Simulated case 1:<blockquote>You find, with no complainant, that bank-verify.example.test is a copy of a bank login page running from a sandbox Dev environment. You disable it with the mass tool.<br>Which ticket do you create, what do you put in the subject and tags, and in what status do you submit it?</blockquote>`,
      `Simulated case 2:<blockquote>A security engineer sends you a ticket for a paid site, promo-shop.example.test, where malicious code was found. You open a ticket to the site owner.<br>Which tag family applies, and does the ticket go through QA review?</blockquote>`,
      `Simulated case 3:<blockquote>A third-party anti-phishing agency reports gift-card.example.test. After you disable the site, the agency leaves a bad CSAT rating.<br>What do you do about the rating, and which tag helps prevent it?</blockquote>`
    ],
    knowhow: `<p><b>Case 1.</b> Create the internal Phishing ticket. Subject: internal prefix plus "Phishing site for the site". Tags: <code>phishing</code>, <code>snc_internal</code>, <code>no_ratings</code>, <code>pantheon_employee</code>. Submit as <b>OPEN</b>. Disable via the playbook, fill the required fields, then solve with Closing Template 2.</p>
<p><b>Case 2.</b> A ticket notifying a site owner of malicious code on a paid site is a proactive ticket, so <code>snc_proactive</code>. QA skipping (<code>skip_ticket_review</code>) is listed for phishing, spam, spam emails and subdomain hijacking, not for this type, so assume it is reviewed unless a lead says otherwise.</p>
<p><b>Case 3.</b> Disregard the bad rating on a phishing ticket. Make sure the no-ratings tag is on the ticket so the survey is suppressed. Check the tag spelling (see the lesson note) and confirm in #cse-soc if unsure.</p>
<p><b>Pitfalls.</b> Never set the Spam Email issue type on tickets tagged <code>spam</code>. Never submit an internal ticket as Solved straight away: submit OPEN and solve after the work is done. Always include <code>pantheon_employee</code> on internal tickets.</p>`,
    quiz: [
      {
        q: "Which tag keeps phishing, spam and subdomain hijacking tickets out of QA review?",
        o: ["no_ratings", "skip_ticket_review", "snc_proactive", "abuse"],
        a: 1,
        w: "skip_ticket_review skips MaestroQA for those ticket types. no_ratings is about satisfaction surveys, not QA."
      },
      {
        q: "In what status is an internal Phishing or Subdomain Takeover ticket first submitted?",
        o: ["Solved", "Pending", "Open", "On hold"],
        a: 2,
        w: "Internal tickets are submitted as OPEN and solved with Closing Template 2 after the site is disabled."
      },
      {
        q: "Which tag marks hijacked subdomains returned to the legitimate owner?",
        o: ["subdomain_returned", "incoming-domain-validation", "abuse_blocked_email", "snc_internal"],
        a: 0,
        w: "subdomain_returned is the dedicated tag. incoming-domain-validation is for exemption requests and platform-update related tickets."
      },
      {
        q: "A bad CSAT arrives on a phishing ticket from a third-party complainant. What is the team decision?",
        o: ["Escalate to the manager", "Reopen the ticket", "Disregard the rating", "Refund the complainant"],
        a: 2,
        w: "Bad CSAT on phishing tickets is disregarded. Tag the ticket so the survey is not sent."
      }
    ],
    refs: [
      { t: "Internal Ticket & Tags", u: CS + "2441281662" },
      { t: "Handling Forwarded Security & Compliance Reports", u: CS + "3895132464" }
    ]
  },
  {
    id: 3,
    week: 1,
    mins: 45,
    title: "Phishing sites: verify, disable, resolve, restore",
    goal: "Verify a phishing report, disable the site through the preferred tool, close it with the right macro, and avoid the restore pitfalls.",
    plan: [["Learn", 20], ["Lab", 25]],
    learn: `<p>Phishing reports reach <code>abuse@pantheon.io</code> from sources such as brand-protection and CDN compliance feeds, or from individual users. Your job is to confirm the site is on Pantheon, confirm it is malicious, then disable it fast.</p>
<h4>1. Verify</h4>
<ol>
<li>No site URL in the report? Send the macro <b>[SOC] Need more information about platform abuse notification</b> and wait.</li>
<li>Is it on Pantheon? In Slack use <code>@sibyl site me &lt;link&gt;</code>. Remove any angle brackets and change obfuscated <code>hxxp</code> to <code>http</code> first. Appending <code>pantheon_healthcheck</code> to the URL is another check used in the playbooks.</li>
<li>Not on Pantheon: send <b>[SOC-DMCA] Template 1 - Site Not On Pantheon</b>, close, nothing more.</li>
<li>On Pantheon: open the site dashboard and check whether the owning org has a support tier. Malicious users are generally not on Gold, Platinum or Diamond.</li>
<li>Look at the reported link or the Dev site. Does it copy a known site?</li>
<li>Paid plan? Fill in the <b>Customer Site in Violation of TOS Workflow</b> Google Form and continue with the paid-site flow (Day 5). Otherwise, if you believe it is phishing, disable it.</li>
</ol>
<p><b>Typical indicators:</b> the workflow log shows only basic site setup, very recent (hours or days); Test and Live were never initialised, so it runs only from Dev; a copy of a known site usually shows only a login page (credential harvesting); and it is usually a sandbox.</p>
<h4>2. Disable</h4>
<p>The <b>preferred</b> tool is the <b>CSE Mass Maintenance Tool</b>. It runs scripted actions on sites, users and orgs, singly or in bulk, and logs to the company data lake.</p>
<p>The manual path logs nothing to the data lake, so use it only when absolutely necessary:</p>
<ol>
<li>SSH to the <b>Dev appserver</b>, run <code>btool su</code>, give the reason "Disabling site due to platform abuse" and enter the ticket ID.</li>
<li>Create <code>code/.disabled_due_to_abuse.txt</code> with the minimal content: the fixed hash line from the playbook, a line saying the site was disabled due to abuse, and the path of the malicious file (for example <code>code/index.php</code>). Security engineers asked that the path be included.</li>
<li>Run <code>btool check-for-spam</code> and open the Jenkins-generated link, add bindings and the btool command, then build.</li>
<li>The workflow "Disabled site due to platform abuse" shows on the dashboard. When it finishes, clear the cache.</li>
</ol>
<p>Inside the ticket system, reported phishing tickets have the ticket field <b>SOC Issue Type</b> set to Phishing. Changing the S&amp;C type to <code>Phishing</code> is also what places a confirmed ticket into the <b>phishing automation</b>.</p>
<h4>3. Resolve</h4>
<p>Notify the reporter with the macro <b>[SOC] Resolve Abuse Email Notification: Site Disabled</b>. Day 2 covered the internal ticket and tags.</p>
<h4>4. Restoring: the pitfalls</h4>
<p>The restore playbook is for rare cases: the site was disabled by mistake, or the customer asked for reinstatement after review. In the debug panel the green <b>Re-enable Site</b> button lifts the disable, but it <b>allow-lists the site from future scans</b>. Use it sparingly and only when you are certain the site is legitimate.</p>
<p><b>Playbook inconsistency, confirm in #cse-soc:</b> the page on identifying Maintenance Mode says never to re-enable an <i>unpaid sandbox</i> that was disabled manually (file present) and to ask for review in #security-operations. The restore page does not mention this rule or who approves a restore. Follow the stricter rule and ask first.</p>
<p><b>Field practice, not official policy.</b> The older manual process that placed a dashboard banner on confirmed bad accounts is no longer used in practice; the Mass Maintenance Tool replaced it, so older text may be stale. For sites a security lead disabled by hand, do not re-enable them. Bad actors often write in asking for a restore.</p>`,
    lab: [
      `Simulated report:<blockquote>From: a brand-protection feed to abuse@pantheon.io<br>Subject: Phishing page<br>Body: The page at hxxps://acct-secure.example.test/login imitates a payment provider login and collects credentials.</blockquote>Write the exact lookup you would run to see whether it is on Pantheon. Remember to fix the link.`,
      `The lookup shows a sandbox site created yesterday, running only from Dev. The workflow log shows only setup tasks and the site shows a single login form. List every indicator that supports phishing, and say which tool you would use to disable it.`,
      `Now the same report, but the owning org is on a paid plan with a Platinum support tier and the site looks like a normal business site. What changes?`,
      `Open the admin dashboard debug page of any sandbox site (read-only) and find where the workflow log is shown and where the green Re-enable Site button would appear when a site is disabled. Do not click anything that changes state.`,
      `Restore scenario:<blockquote>A user writes from shop-promo.example.test: "My site was disabled and I am a real shop owner, please turn it back on." It is an unpaid sandbox and the hidden abuse file is present.</blockquote>What do you do, and what is the risk of clicking Re-enable?`
    ],
    knowhow: `<p><b>Lookup:</b> <code>@sibyl site me https://acct-secure.example.test/login</code> (with hxxps converted to https and any brackets removed).</p>
<p><b>Indicators:</b> brand new site (hours or days), setup-only workflow, only Dev in use, sandbox, single login page copying a known brand. Disable with the <b>CSE Mass Maintenance Tool</b>. Manual SSH is the fallback. Then change the S&amp;C type to Phishing for the automation, and resolve with the Site Disabled macro. Create the internal ticket with the tags from Day 2 if there was no complainant.</p>
<p><b>Paid plan, looks legitimate:</b> do not disable straight away. Fill in the Customer Site in Violation of TOS form and follow the paid-site flow on Day 5. Ask in #cse-soc if you are unsure.</p>
<p><b>Restore scenario:</b> do <b>not</b> re-enable. An unpaid sandbox with the manual disable file needs a review in #security-operations. Bad actors often ask for a restore. Clicking Re-enable also allow-lists the site from future scans, so a real phishing site could stay up. Reply that it is under review, and share the dashboard URL with the Security team.</p>
<p><b>Pitfalls:</b> do not forget to fix <code>hxxp</code>; do not tell the site owner how detection works; do not use the manual path when the mass tool is available.</p>`,
    quiz: [
      {
        q: "What is the preferred way to disable a confirmed phishing site?",
        o: ["Manual SSH and the abuse file", "The CSE Mass Maintenance Tool", "Delete the site", "Email the owner"],
        a: 1,
        w: "The mass tool is preferred. It logs to the data lake, which the manual path does not."
      },
      {
        q: "What is the effect of the green Re-enable Site button?",
        o: ["It only clears the cache", "It lifts the disable and allow-lists the site from future scans", "It deletes the abuse file only", "It notifies Legal"],
        a: 1,
        w: "Re-enabling allow-lists the site from future scans, which is why it is used sparingly and only when certain the site is legitimate."
      },
      {
        q: "A report links to a site that is not hosted on Pantheon. What do you do?",
        o: ["Disable the nearest site", "Send the not-on-Pantheon macro and close", "Forward to Legal", "Wait seven days"],
        a: 1,
        w: "Not hosted on Pantheon means no further action: send the Site Not On Pantheon macro and close."
      },
      {
        q: "Which change puts a confirmed phishing ticket into the automation?",
        o: ["Setting the S&C type to Phishing", "Adding the spam tag", "Assigning it to Legal", "Setting the priority to High"],
        a: 0,
        w: "Setting the S&C type to Phishing is the only manual step needed for the phishing automation."
      },
      {
        q: "An unpaid sandbox was manually disabled and the owner asks for a restore. Which is correct?",
        o: ["Re-enable it immediately", "Do not re-enable; ask for a review in #security-operations", "Ask the owner for a bribe", "Upgrade the plan"],
        a: 1,
        w: "The identifying-Maintenance-Mode page says not to re-enable manually disabled unpaid sandboxes. The restore page conflicts with this, so confirm in #cse-soc."
      }
    ],
    refs: [
      { t: "CSE Guide to Malicious or Phishing Sites", u: CS + "2353332519" },
      { t: "Verifying a Phishing or Malicious Site", u: CS + "2352481466" },
      { t: "Disabling a Confirmed Malicious Site", u: CS + "2353332508" },
      { t: "Restoring a Disabled Site", u: CS + "2353758243" }
    ]
  },
  {
    id: 4,
    week: 1,
    mins: 40,
    title: "Subdomain hijacking and domain exemption requests",
    goal: "Spot a hijacked subdomain, remove it using the playbook steps, help a legitimate customer reclaim a domain, and handle exemption requests with the right escalation.",
    plan: [["Learn", 20], ["Lab", 20]],
    learn: `<p>Subdomain hijacking happens when a bad actor claims a <i>dangling</i> subdomain: a DNS entry that still points at a service the customer no longer uses. Customers should remove unused DNS entries. Pantheon has a public guide on avoiding DNS hijacking.</p>
<h4>Signs of a hijacker site</h4>
<ul>
<li>Workflow log shows only basic setup, very recent; many random domains added and removed.</li>
<li>Subdomains unrelated to the site name or account email; the owner uses an unrelated free-mail address.</li>
<li>Default WordPress theme or basic content; suspect commits; copies of the Pantheon maintenance page.</li>
<li>Online gambling advertising, or spoofed copies of real sites (mismatched URL or branding).</li>
</ul>
<h4>Dealing with a hijacked domain</h4>
<ol>
<li>Remove all hijacked domains and set the site plan to <b>Sandbox</b> using the <b>mass-maintenance</b> script in the csm-scripts repository (the mass tool).</li>
<li>Preventive step: enable <b>streamlined AGCDN</b> in YGG (<code>pan sites.enable_agcdn:custom_domain</code>) or use <code>domain-disable.sh</code>. Removing the custom domain removes it from Streamlined AGCDN, so nothing is orphaned.</li>
<li>Optional: SSH to Dev and follow Disabling a Confirmed Malicious Site (Day 3).</li>
</ol>
<p><b>Reporter:</b> tell them the action taken, without specifics about the hijacker (account privacy). <b>Do not notify the hijacker. No refunds to hijackers</b>, who are Terms of Service violators. The internal ticket and tags from Day 2 apply, including <code>abuse_blocked_email</code> for the blocked user and <code>subdomain_returned</code> when the domain is handed back.</p>
<h4>Finding other hijacked subdomains</h4>
<p>In Looker, use the "sites" explore: hostname ends with the bare domain and organization UUID is null (or different from the org's UUID, which may produce false positives). For affected paying customers, find the AM or CSM, reach out in the shared customer channel with a short summary and ask for the best contact; if there is no AM, send the ticket to several org administrators. Then create the proactive ticket with the macro <b>[SOC-SUBDOMAIN_TAKEOVER] Proactive ticket informing customers of a subdomain takeover attack</b>.</p>
<h4>Reclaiming a domain from the containment site</h4>
<p>A real customer who tries to reclaim a once-hijacked domain sees an error that the site does not belong to the same organization. The domain now sits on a containment site named <code>cse-security-compliance-</code> followed by a number. Use <code>@sibyl site me {domain}</code> to find it, then: (a) verify the requester is not another hijacker (org, roles, email); (b) delete the domain from the containment site; (c) add the domain to the customer's intended site <b>on the customer's behalf</b>, so there is no gap for a re-hijack. If the customer instead adds a domain owned by another org, the platform tells them to contact support.</p>
<h4>Domain exemption requests</h4>
<p>Two protections exist: Subdomain Hijacking Protection (March 2023: subdomains of a registered primary domain must be on sites in the same organization) and Domain Validation (April 16, 2024: sites verify the domain by file or DNS record). First try the preferred fix with no exemption: have the customer create or use an org that owns or supports each site.</p>
<p>Standard exemption criteria: WordPress Multisite with subdomain configuration; AGCDN domain masking; a custom certificate for a domain on a site in their org. <b>Playbook inconsistency:</b> the page says "two criteria" but lists three. Treat all three as valid, and confirm in #cse-soc. You must also validate that the requester belongs to the org that owns the domain(s) and is authorized to change them.</p>
<ul>
<li><b>Method A (default), exempt the whole org:</b> add the Zendesk tag <code>plat_domain_verification_exemption</code>, run <code>ygg-start</code>, copy the customer's Workspace UUID, run <code>ygg pan sites.set_domain_validation_exception:WORKSPACE_ID,exempt=true</code>. Success returns a 200 message that the workspace was updated. Restore validation once the customer says they are done adding domains.</li>
<li><b>Method B, platform-level fix (cannot be self-handled):</b> explain the risks and confirm the scope (single site, single top-level domain, or the whole org). Use the Domain Protection Exemption template on the BUGS Jira board, add label <code>domain-hijacking</code>, and CC the Platform Edge Routing team.</li>
<li><b>Not meeting the criteria:</b> case-by-case decision by Edge Routing and Product. Ask why, create a BUGS card with the rationale, assign to the Edge Routing team, add label <code>domain-validation-exemption-req</code>, and inform the customer. SLA: <b>1 business day</b> if the justification is in the ticket.</li>
<li><b>Escalation:</b> no resolution in 24 to 48 business hours: ping <code>@edge-routing</code> in <b>#domain-hijacking</b> and/or <b>#platform-edgerouting</b>. Urgent or blocking: create an escalation through Grafana Oncall and choose OCE.</li>
</ul>
<p>No ygg access or an undocumented error: create a Swarm and debug within Support, otherwise file a bug report for the ygg API. Tickets about exemptions carry the tag <code>incoming-domain-validation</code>.</p>`,
    lab: [
      `Simulated report:<blockquote>A university IT admin writes: "labs.uni-example.example.test is showing a gambling site, but we never built it." Lookup shows the domain attached to a sandbox site made two days ago by an owner with an unrelated free-mail address.</blockquote>List, in order, what you do, which internal ticket and tags you create, and what you tell the reporter.`,
      `Simulated reclaim:<blockquote>The same university now wants labs.uni-example.example.test on its real site. It gets an error that the domain belongs to another organization.</blockquote>What do you check, and what do you do to get the domain onto the right site?`,
      `Simulated exemption:<blockquote>An agency runs a WordPress Multisite on subdomain configuration and has 40 new client domains to attach. Their sites sit in different orgs. They ask for an exemption.</blockquote>Which method, which tag, which command, and what must you do afterwards?`,
      `Simulated edge case:<blockquote>A customer asks for an exemption for one domain on one site, but the domain is on none of the standard criteria and the justification is "we prefer it that way".</blockquote>What do you do, and how fast should it be handled?`,
      `Read-only: in Looker, open the "sites" explore and see which filter fields you would use to find sibling subdomains. Do not export data.`
    ],
    knowhow: `<p><b>Report answer.</b> Verify (signs match), remove the hijacked domains and set Sandbox via the mass tool, preventive streamlined AGCDN step, optional Dev disable. Create the internal Subdomain Takeover ticket (<code>subdomain_takeover</code>, <code>snc_internal</code>, <code>no_ratings</code>, <code>pantheon_employee</code>, OPEN) and tag <code>abuse_blocked_email</code> for the blocked account. Tell the reporter the domain was removed, without details about the hijacker. No refund and no notice to the hijacker. Consider finding sibling subdomains in Looker and a proactive notice if the AM is known.</p>
<p><b>Reclaim answer.</b> Run <code>@sibyl site me</code> on the domain, find the containment site, verify the requester (org, roles, email), delete the domain from the containment site and add it to the customer's real site yourself. Tag <code>subdomain_returned</code>.</p>
<p><b>Exemption answer.</b> Multisite subdomain config is a listed criterion. Use Method A: tag <code>plat_domain_verification_exemption</code>, <code>ygg-start</code>, copy the Workspace UUID, run the set-exception command with exempt=true, and restore validation when the agency finishes. Check the requester belongs to the owning org and is authorized. If the domains sit in different orgs, the preferred no-exemption fix (an org that owns or supports each site) may be simpler. Confirm in #cse-soc.</p>
<p><b>Edge case answer.</b> Ask why, then raise a BUGS card with the rationale and the right label for the Edge Routing team. If the justification is in the ticket, target <b>1 business day</b>; after 24 to 48 business hours, ping the Edge Routing group in the domain channels.</p>
<p><b>Pitfalls.</b> Do not leave the exemption on. Do not name the hijacker's account. The page text says "two criteria" but lists three.</p>`,
    quiz: [
      {
        q: "Does a hijacker get a refund after the site is disabled?",
        o: ["Yes, always", "Yes, pro-rated", "No, hijackers are Terms of Service violators", "Only on paid plans"],
        a: 2,
        w: "No refunds to hijackers, and do not notify them."
      },
      {
        q: "A real customer cannot add their domain because it is on a containment site. What do you do?",
        o: ["Tell them to wait", "Verify them, delete the domain from the containment site, and add it to their site on their behalf", "Disable their site", "Ask them to use a different domain"],
        a: 1,
        w: "Verify the requester is not another hijacker, then remove it from the containment site and add it for them to avoid a re-hijack window."
      },
      {
        q: "What is the SLA for an out-of-criteria exemption request when the justification is already in the ticket?",
        o: ["1 business day", "24 hours calendar", "5 business days", "10 calendar days"],
        a: 0,
        w: "1 business day. If there is no resolution in 24 to 48 business hours, ping the Edge Routing group in the domain channels."
      },
      {
        q: "Which tag do you add before running the Method A exemption command?",
        o: ["subdomain_returned", "plat_domain_verification_exemption", "snc_proactive", "spam"],
        a: 1,
        w: "Method A starts with the plat_domain_verification_exemption tag, then ygg-start and the set_domain_validation_exception command."
      }
    ],
    refs: [
      { t: "Handling Subdomain Hijacking", u: CS + "2333737404" },
      { t: "Requests for Domain Exemption (Hijacking)", u: CS + "2608627752" }
    ]
  },
  {
    id: 5,
    week: 1,
    mins: 45,
    title: "Maintenance Mode cases: the biggest real workload",
    goal: "Explain why a site is in Maintenance Mode, run the paid-site flow, handle false-positive waves, and hand cases to the SOC with the right details.",
    plan: [["Learn", 25], ["Lab", 20]],
    learn: `<p>Maintenance Mode (MM) cases are the most common case type that reaches SOC. A customer writes in because their site shows a blue banner, or because they cannot work on it. First decide whether it is real abuse, a false positive, or an engineering action.</p>
<h4>Recognising platform-abuse MM</h4>
<ul>
<li>A persistent light-blue banner on all environments telling the customer to contact support.</li>
<li>The workflow "Disable site due to platform abuse" appears in both the debug and the customer-facing workflow logs.</li>
<li>A hidden file <code>/code/.disabled_due_to_abuse.txt</code> means it was disabled manually. It shows where the bad code is, and is not an exhaustive list.</li>
</ul>
<p>Mindset: a customer who writes to support is probably the victim. Malicious owners rarely contact support or use valid emails.</p>
<h4>The malware monitor</h4>
<p>An automated scan compares newly introduced code against an internal, non-public set of malicious signatures. The playbook says it runs <code>btool check-for-spam</code> several times an hour, and another page says all platform code is scanned every 5 minutes. After a fix, wait about 5 minutes for the platform to rescan rather than running things by hand. Never share how the detector works with customers or reveal the triggering files. They would learn to evade it.</p>
<table><thead><tr><th></th><th>Unpaid sandbox</th><th>Paid site</th></tr></thead><tbody>
<tr><td>On a hit</td><td>Automatic Maintenance Mode, environments locked</td><td><b>Never</b> automatically disabled</td></tr>
<tr><td>Who acts</td><td>Automation, then SOC handles the customer</td><td>A security engineer is notified, completes the Customer Site in Violation of ToS form, which creates a ticket</td></tr>
</tbody></table>
<h4>Paid-site flow</h4>
<ol>
<li>Open a proactive ticket to the site owner: address the person in charge, CC people who recently worked on the site (check the workflow log), set site ID and label, S&amp;C issue Security, <b>legal due date 2 business days</b>, Party = Site Owner, assign to Abuse.</li>
<li><b>Set the fields before applying the macro</b> <b>[SOC-SECURITY] Proactive malicious code notification on PAID site</b>, or the automation fails. Replace the macro body with the engineering ticket information. Send.</li>
<li>Add a follow-up event on the SOC Response Calendar with the ticket number and dashboard link. Close the engineering ticket with a link to your ticket, and put the engineering ticket link in your ticket's internal note.</li>
<li>At the due date, check whether the code is gone. If so: <b>[SOC-SECURITY] Customer Has Removed Malicious Code</b>, close. If not: <b>[SOC-SECURITY] Polite Checkin- Customer Has Not Responded to Malicious Code on Paid Site</b>, which gives <b>48 more hours</b>.</li>
<li>Still nothing: in the admin dashboard debug page enable Maintenance Mode on the <b>Dev</b> environment, apply <b>[SOC-SECURITY] Disabling Customer's Paid Site With Malicious Code Due To Non-Response</b>, and close. If the customer replies later, guide them in removing the content.</li>
</ol>
<p><b>Gap:</b> the page line for who handles communication with Diamond or Platinum customers is blank. Ask the SOC lead in #cse-soc.</p>
<h4>Proactive Maintenance Mode (engineering-initiated)</h4>
<p><b>Scenario 1.</b> Engineering puts a non-malicious but platform-threatening site into MM and tells the support channel. The CSE who picks it up acknowledges, then sends a proactive ticket to the site owner or org admin with a subject starting "[ACTION REQUIRED]", the steps to re-enable and a response time (typically 24 hours). Post the details in the handoff channel, keep ownership until the end of shift, and keep the ticket Pending until engineering confirms monitoring is fine.</p>
<p><b>Scenario 2.</b> You find an abusive site using the CDN's top-miss report (<code>fastly top miss</code> in the chat tool). Red flags: Dev environment, recently created site and owner, Sandbox, the user has no other sites, no org. Put it in MM. <b>Before</b> disabling, tell the team lead or manager if it is a paid site, the user belongs to an org with any paid site, or the support plan is Platinum or Diamond. If the live environment is on a paid plan without AGCDN, follow the AGCDN rate-limiting playbook and ask the AGCDN SME on shift to handle activation.</p>
<h4>False-positive waves</h4>
<p><b>Field practice, not official policy.</b> False positives are common and arrive in waves.</p>
<ul>
<li>A scanner signature can match the platform's own cache files and flag several unrelated sites at once. The security lead removes the signature and tells SOC to re-enable the sites. Agents have run the spam-check command after invalidating the cache, found nothing and re-enabled, but ask first if you are unsure.</li>
<li>A vendor library bundled inside a popular plugin can match a signature. Updating the plugin does not help. The lead's call was to lift MM anyway. The monitor may keep flagging it but will not put MM back on its own.</li>
<li>If the code cannot be read (external VCS), ask the SOC. Automation errors are the lead's call.</li>
<li>Lifting MM is a decision for the SOC or security lead, not the front-line agent. Sites a security lead shut down by hand must not be re-enabled. A bad actor often asks for it. If the ticket reads "no malware found, why was it disabled?", ask the lead first.</li>
<li>If MM persists after cleanup, check for an unrelated application error such as a failing cache flush.</li>
<li><b>Handoff etiquette:</b> put the <b>dashboard URL</b> in the ticket notes, not just the ticket link, so SOC can act quickly.</li>
</ul>`,
    lab: [
      `Read-only: open the admin dashboard debug page for any sandbox site. Find the workflow log and note which entries would show a platform-abuse disable. Do not enable or lift anything.`,
      `Simulated unpaid case:<blockquote>Customer writes: "My free sandbox portfolio-blog.example.test has a blue banner and I cannot push code. I did nothing wrong." The workflow log shows an automatic abuse disable and no manual file.</blockquote>What do you do first, what do you tell them, and what do you post to #cse-soc?`,
      `Simulated paid case:<blockquote>A security engineer's form creates a ticket: paid site store-front.example.test has a cryptominer file in the Dev environment. The owner has a standard (not Platinum) plan.</blockquote>Walk the full flow with dates. Today is a Monday. When is the legal due date, what happens on a no-reply, and when do you enable MM?`,
      `Simulated wave:<blockquote>Five unrelated customers write in within an hour. Each site was flagged, and a check shows the only hits are platform cache files.</blockquote>Who decides to lift MM, and what do you do in the meantime?`,
      `Simulated proactive case:<blockquote>You spot a Dev site of a brand-new account with no org and no other sites in the top-miss report.</blockquote>Can you disable it, and what must you check first?`
    ],
    knowhow: `<p><b>Unpaid case.</b> Confirm in the debug workflow log that it is a platform-abuse disable, check for the manual file, and review the code only as far as you can. Do not re-enable it yourself. Reply that it is under review (without describing the scanner). Post in #cse-soc tagging <code>@soc</code> with the ticket link <b>and the dashboard URL</b>. SOC or the security lead decides whether to lift MM.</p>
<p><b>Paid case.</b> Proactive ticket, fields first, then the macro; due date is <b>2 business days</b> (Wednesday). Add a calendar follow-up. On Wednesday: removed means the removed-code macro and close; not removed means the polite check-in macro and 48 more hours (Friday). Still no response: enable MM on <b>Dev</b> in the debug page, apply the non-response macro and close. If the owner is Platinum or Diamond, ask the SOC lead before doing anything, because the playbook has a blank owner there.</p>
<p><b>Wave.</b> Lifting MM is not a front-line decision. Group the tickets, post them in #cse-soc with the dashboard URLs, and wait for the lead or security to confirm a false positive.</p>
<p><b>Proactive case.</b> Red flags match (Dev, new, no org, no other sites), so MM is appropriate. Before disabling, check that it is not a paid site, the user is not in an org with paid sites, and the plan is not Platinum or Diamond. Otherwise notify the team lead first.</p>
<p><b>Pitfalls.</b> Applying the macro before setting the fields breaks the automation. Paid sites are never auto-disabled. Do not reveal the triggering files. The playbook pages on this topic are old (2022) and may be stale, so confirm unfamiliar steps in #cse-soc.</p>`,
    quiz: [
      {
        q: "What does the malware monitor do to a PAID site on a signature hit?",
        o: ["Puts it in Maintenance Mode", "Never disables it automatically: a security engineer is notified and files the ToS form", "Deletes the code", "Sends a CSAT survey"],
        a: 1,
        w: "Paid sites are never automatically disabled. Unpaid sandboxes are."
      },
      {
        q: "In the paid-site flow, how long is the legal due date on the first proactive ticket?",
        o: ["2 business days", "5 business days", "10 calendar days", "24 hours"],
        a: 0,
        w: "2 business days, then the polite check-in macro gives 48 more hours, then MM on the Dev environment."
      },
      {
        q: "What must you do before applying the proactive paid-site macro?",
        o: ["Close the ticket", "Set the ticket fields, or the automation fails", "Email Legal", "Re-enable the site"],
        a: 1,
        w: "Set site ID, site label, S&C issue, due date and party first, then apply the macro."
      },
      {
        q: "A wave of unrelated sites is flagged on platform cache files. Who decides to lift MM?",
        o: ["The front-line agent", "The customer", "The SOC or security lead", "Fastly"],
        a: 2,
        w: "Lifting MM is the SOC or security lead's call. Post the cases with dashboard URLs and wait."
      },
      {
        q: "What helps SOC re-enable a site faster when you hand it off?",
        o: ["Only the ticket link", "The dashboard URL in the ticket notes", "A screenshot in Slack", "Tagging @here"],
        a: 1,
        w: "Put the site dashboard URL in the ticket notes. A ticket link alone slows SOC down."
      }
    ],
    refs: [
      { t: "Identifying If a Site Is in Maintenance Mode for Platform Abuse", u: CS + "2353692755" },
      { t: "Malicious Content on Paid Site", u: CS + "2353038103" },
      { t: "Proactive Maintenance Mode playbook", u: CS + "166723588" }
    ]
  }
];
