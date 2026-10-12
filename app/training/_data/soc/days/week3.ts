import type { Day } from "../../types.ts";

const CS = "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/";

export const WEEK_3_DAYS: Day[] = [
  {
    id: 11,
    week: 3,
    mins: 40,
    title: "DoS, DDoS and ransom threats",
    goal: "Protect the platform first, then the customer: know the DDoS report steps, the AGCDN/WAF check, and what to say to a ransom-threat customer.",
    plan: [
      ["Learn: DoS report handling", 15],
      ["Learn: ransom threats and IP blocks", 10],
      ["Lab: two simulated tickets", 15],
    ],
    learn: `<p>There are two different DoS situations on the Abuse queue. In one, <b>Engineering tells Support</b> that a customer site is being attacked and is hurting the platform. In the other, a <b>customer writes in</b> because they received a threat. The playbooks treat them differently, so decide which one you have first.</p>
<h4>Terms</h4>
<ul>
<li><b>DoS</b>: one source overwhelms a site.</li>
<li><b>DDoS</b>: many sources do it together, which makes simple IP blocking ineffective.</li>
<li><b>RDDoS</b>: a ransom DDoS, meaning an attacker demands payment (often cryptocurrency) or the attack starts. The attack is sometimes only a threat.</li>
</ul>
<h4>Handling a DoS/DDoS report (Engineering notified Support)</h4>
<p>This is <b>high priority</b>. Acknowledge promptly and send a proactive ticket. Engineering can block single IPs, but a distributed attack is hard to stop without AGCDN/WAF in front of the site. Engineering finds the target by looking at which hostname takes more than 80% of the origin-miss traffic.</p>
<ol>
<li><b>Maintenance Mode first.</b> Put the site in Maintenance Mode from the admin debug panel, temporarily, to protect other customers on the platform.</li>
<li><b>Check for AGCDN/WAF.</b> Use the "Identify an Organization's Subscription" steps in the AGCDN handling playbook. If the customer has AGCDN/WAF, follow the AGCDN playbook for enabling a rate-limiting policy or profile. If they do not, follow the playbook for adding rate limiting to non-AGCDN customers (DDoS handling) and create a CSEPRO card to track it. The playbook itself says the issue-type part is still "TBD", so confirm in #cse-soc how the card should be labeled.</li>
<li><b>Find the account's AM/CSM</b> using the "Finding an account's AM/CSM" page.</li>
<li><b>Send a proactive ticket</b> to the customer ASAP. The template covers: a surge of malicious traffic, the platform was destabilized, the sustained request rate since a stated UTC time, PHP errors and edge-routing overload, the site is temporarily disabled, the traffic uses rotating IPs and user agents and uncached requests, a recommendation to block IPs or rate-limit at a third-party CDN, and a promise to update on the ticket.</li>
<li><b>Notify the CSM/AM or partner team</b> in #client-sales-feedback and #csm, and tag your shift manager.</li>
</ol>
<p><b>Related case:</b> if a DDoS-attacked site is also reported as phishing, once phishing is confirmed you downgrade the site to Sandbox and put it in Maintenance Mode.</p>
<p>Related: the Proactive Maintenance Mode playbook says that when you find an abusive site via the fastly top-miss tooling and the affected environment is live on a paid plan, you notify your team lead or manager, follow the non-AGCDN rate-limiting playbook, and ask the AGCDN SME on shift to handle AGCDN activation.</p>
<h4>Ransom threats (customer received a threat)</h4>
<p>The customer got an email saying a group will DDoS the site unless a ransom is paid. The playbook has a reply template (no macro name is given in the page, so confirm in #cse-soc which macro to use). The key messages:</p>
<ul>
<li>We do not expect trouble, and we will work with any third party the customer engages.</li>
<li><b>Do not reply and do not pay.</b> Replying shows willingness and invites repeat demands. Many threats are empty.</li>
<li>The Global CDN absorbs a moderate attack but has limits.</li>
<li>If uptime is critical, consider a third-party WAF/CDN in front, often called a <b>stacked CDN</b>. The playbook names a few well-known vendors and links the public docs page.</li>
</ul>
<p><b>Field practice, not official policy.</b> Example from a real thread: a SecOps engineer said they usually do not add IPs to the platform WAF unless the attack affects multiple customers or the platform, and that a customer with AGCDN can block IPs in their own AGCDN WAF. This is one observed answer, not a rule. When unsure, ask #security-operations before changing the site or promising a block.</p>
<p><b>Staleness note:</b> the ransom page was last edited in 2022 and the DoS report page in late 2023. Treat both as a good skeleton and confirm current macro and card names in #cse-soc.</p>`,
    lab: [
      `Open the DoS/DDoS report playbook and the ransom-threat playbook (links in the references). List the five numbered steps of the report handling in your own words, and note which two steps have a "confirm in #cse-soc" gap.`,
      `Read ticket A and write down your first action, the order of your next four actions, and who you notify. <blockquote>Engineering note, forwarded to the Abuse queue: the site shop.example.test, on a paid Live environment, is receiving a flood of uncached requests from thousands of rotating IPs. It now takes most of the traffic hitting the origin and is degrading other sites. The org has no AGCDN according to the first lookup.</blockquote>`,
      `Read ticket B and draft a reply (4-6 sentences) that states what you will and will not do. <blockquote>Customer chat transcript: "We got an email saying our site news.example.test will be taken offline tomorrow unless we send cryptocurrency to a wallet. Should we pay? Can you block them?"</blockquote>`,
      `Compare your answers with the model answers in the know-how section. Note any step where you hesitated.`,
    ],
    knowhow: `<h4>Model answer, ticket A</h4>
<ol>
<li>Acknowledge, then put the site in Maintenance Mode from the admin debug panel (temporary, to protect other customers).</li>
<li>Confirm the AGCDN/WAF status. It is not AGCDN, so follow the non-AGCDN rate-limiting playbook and create a CSEPRO card.</li>
<li>Find the AM/CSM.</li>
<li>Send the proactive ticket with the standard points (surge, platform impact, site temporarily disabled, recommendation for third-party CDN or rate limiting, will update).</li>
<li>Notify CSM/AM in #client-sales-feedback and #csm and tag your shift manager. Because the site is live on a paid plan, also tell your team lead and ask the AGCDN SME on shift about activation.</li>
</ol>
<h4>Model answer, ticket B</h4>
<p>Say: we do not expect trouble, we will work with any provider you bring in, do not reply and do not pay, threats like this are often empty, our Global CDN absorbs moderate attacks but has limits, and if uptime is critical consider a stacked CDN or third-party WAF. Do not promise IP blocking; ask #security-operations first. Offer to update the ticket if anything changes.</p>
<p><b>Field practice, not official policy.</b> If you are unsure what can be done for an attack, ask in #security-operations with the site, the evidence of impact on other sites, and the time the traffic started.</p>`,
    quiz: [
      {
        q: "Engineering reports a DDoS against a customer site that is hurting the platform. What is the first step in the playbook?",
        o: [
          "Email the customer a refund offer",
          "Put the site in Maintenance Mode temporarily to protect other customers",
          "Wait for the CSM to respond",
          "Block the attacking IPs one by one in the dashboard",
        ],
        a: 1,
        w: "Maintenance Mode comes first so other customers are protected. The AGCDN check, CSM lookup, proactive ticket and notifications follow.",
      },
      {
        q: "The attacked customer has no AGCDN. Which action does the playbook add?",
        o: [
          "Nothing, non-AGCDN customers cannot be helped",
          "Follow the non-AGCDN rate-limiting playbook and create a CSEPRO card",
          "Tell the customer to pay the ransom",
          "Enable AGCDN for free without telling anyone",
        ],
        a: 1,
        w: "The DoS report page points to the playbook for adding rate limiting to non-AGCDN customers and asks for a CSEPRO card to track it.",
      },
      {
        q: "A customer asks whether to pay a ransom to stop a threatened DDoS. What is the advice?",
        o: [
          "Pay quickly to avoid downtime",
          "Reply to the attacker to negotiate",
          "Do not reply and do not pay; consider a stacked CDN or third-party WAF",
          "Ignore the ticket until the attack starts",
        ],
        a: 2,
        w: "Replying or paying shows willingness and invites repeat threats. The playbook suggests a stacked CDN if uptime is critical.",
      },
      {
        q: "Which channels do you use to notify the CSM/AM during a DDoS report?",
        o: [
          "#client-sales-feedback and #csm, tagging your shift manager",
          "Only a Zendesk internal note",
          "#general",
          "Direct messages to the customer",
        ],
        a: 0,
        w: "The playbook names #client-sales-feedback and #csm and asks you to tag your shift manager.",
      },
      {
        q: "A single customer on AGCDN is attacked and asks you to get IP blocks added. What is the safe action?",
        o: [
          "Promise that SecOps will add the blocks",
          "Mention that an AGCDN customer can block IPs in their own AGCDN WAF, and ask #security-operations before promising anything on the platform",
          "Support edits the Fastly service directly",
          "The customer must buy Diamond first",
        ],
        a: 1,
        w: "Field practice, not official policy: in one real thread SecOps said they usually do not add platform WAF blocks for a single customer, and an AGCDN customer can use their own WAF. When unsure, escalate to #security-operations and ask.",
      },
    ],
    refs: [
      { t: "Handling a DoS/DDoS report", u: CS + "2834497538" },
      { t: "Handling a DoS/DDoS/RDDoS Threat (Ransom Threat)", u: CS + "387121159" },
      { t: "Proactive Maintenance Mode playbook", u: CS + "166723588" },
    ],
  },
  {
    id: 12,
    week: 3,
    mins: 45,
    title: "Compromised sites and preservation holds",
    goal: "Read a security-engineer cleanup report, explain to a customer why a redeploy is not enough, and know when to stop touching a site.",
    plan: [
      ["Learn: how compromises reach SOC", 10],
      ["Learn: cleanup report pattern", 15],
      ["Lab: read and reply", 20],
    ],
    learn: `<p>A compromised site is different from a malicious site. The owner is usually the victim, so the tone is supportive and the work is guidance. Most of what follows is <b>Field practice, not official policy.</b> There is no single playbook for it, so the shape below comes from how security engineers and SOC worked recent cases in Slack. Confirm details in #cse-soc.</p>
<h4>How SOC learns of a compromise</h4>
<ul>
<li>The <b>malware monitor</b> flags code. Unpaid sandboxes go into Maintenance Mode automatically. Paying sites are never auto-disabled: a security engineer is notified and files a report that becomes a ticket (see the Malicious Content on Paid Site playbook).</li>
<li>A <b>security engineer posts a cleanup report</b> in channel for a site they investigated.</li>
<li>Security tooling flags a web shell or cryptominer on a live site: they post the site, the file path and a note that execute permissions were removed, and Support sends the proactive ticket.</li>
<li>The customer writes in: "my site is in Maintenance Mode" or "I think I was hacked".</li>
</ul>
<h4>The cleanup report pattern</h4>
<p><b>Field practice, not official policy.</b> Reports follow the same four parts:</p>
<ol>
<li><b>Where the attacker files are.</b> Uncommitted on Dev only, or committed to the repository and deployed to Test/Live. This decides urgency.</li>
<li><b>Indicators by location.</b> For example: a rogue plugin folder with a random suffix, many must-use plugin files with generic helper names, look-alike files inside core asset folders, a fake object-cache file, an injected block in the config file, PHP files dropped straight into the uploads folder, hidden folders holding a cryptominer, and a payload in the database (option rows with a suspicious name prefix plus scheduled cron hooks).</li>
<li><b>What was done.</b> Maintenance Mode or not, which files were removed or left alone.</li>
<li><b>Numbered customer steps.</b></li>
</ol>
<h4>The standard customer steps</h4>
<ul>
<li>Do not blindly commit pending Dev changes. Review and commit only what you recognize, because thousands of uncommitted changes can mix real updates with attacker files.</li>
<li>Rotate every credential on every environment: Pantheon account, CMS admin passwords, salts (generate new ones), database password, API and payment keys.</li>
<li>Review CMS users on every environment for unknown administrators. Malware can write admins straight into the database.</li>
<li>Update core, plugins and themes, and remove unused ones.</li>
<li>Check Test and Live for the same files, and check search-console ownership if SEO-spam verification files were dropped.</li>
</ul>
<h4>Why a redeploy does not clean a site</h4>
<p>Pantheon keeps code in Git, but <b>uploads files and the database are not in version control</b>. Discarding SFTP changes or redeploying a good commit does not remove attacker files in uploads, rows in the database, or malicious cron hooks. That is how reinfection happens. Rescans have even found leftover copies in the environment's temp directory that the customer cannot reach over SFTP.</p>
<h4>Committed files come back</h4>
<p>If attacker files were committed (for example inside a "core update" commit) and deployed, removing them on the server is temporary: the next code sync restores them. The customer must remove them with a commit and deploy. If attacker files were only uncommitted on Dev, an engineer's removal sticks. If the attacker deleted platform files, a redeploy from the last good commit restores them.</p>
<h4>Customers running production from Dev</h4>
<p>Some customers serve their live domain from Dev. This complicates cleanup and credit requests. The advice given in channel was to move the domain to the Live environment. A downtime-credit request goes to billing and is decided by finance leadership, not by Support.</p>
<h4>Preservation hold and interim steps</h4>
<p><b>Field practice, not official policy.</b> Example from one real compromised-site escalation: support advised the customer to enable Security Lock (HTTP Basic Auth) and held off restarts and deploys on Live while pulling logs and escalating to #security-operations. That is what happened in one case, not a rule. When unsure, ask #security-operations before changing the site. For formal preservation requests from authorities see Day 13 and the preservation SOP.</p>
<ul>
<li><b>Security Lock</b> (HTTP Basic Auth on the site) was used as an interim containment step in that case. Confirm in #cse-soc before offering it.</li>
<li><b>Log pulling for IOCs</b>: Support does not run audit or cleanup scripts on customer sites. For "what did the attacker do" questions, the Common Security Requests page covers the standard log search by site ID for the last two weeks; deeper digging is a security question.</li>
<li><b>Customer security teams that want a call</b>: loop in SecOps in #security-operations rather than answering technical forensic questions yourself.</li>
<li><b>Holding statements</b>: if an investigation runs long, agree a cadence and wording with security so the customer is not left silent for weeks.</li>
</ul>
<p>Never reveal how the malware monitor detects things. Showing triggering files to a bad actor teaches them to evade it.</p>`,
    lab: [
      `Open the Malicious Content on Paid Site playbook and the Site Information Preservation Requests page (links in references). Write down the 2-business-day plus 48-hour ladder, and which environment you put into Maintenance Mode at the end.`,
      `Read this simulated security-engineer report and answer: where are the files, is removal permanent, what must the customer do? <blockquote>Report for blog.example.test: a rogue plugin folder with a random suffix and several must-use plugin files with helper-style names were found. They are committed in the repository and deployed to Test and Live. PHP files also sit in the uploads folder. Two option rows with a suspicious prefix and a scheduled cron hook were found in the database. No Maintenance Mode set. Files removed from the server for now.</blockquote>`,
      `Draft the numbered customer steps (5 items) for the proactive ticket using the pattern above. Explicitly address why redeploying alone is not enough.`,
      `Read the customer reply and decide what you do. <blockquote>Customer: "We redeployed the last good commit and the plugin is back. Also our legal team wants everything kept as it is and our security team wants a call tomorrow."</blockquote>`,
      `Compare with the know-how model answers.`,
    ],
    knowhow: `<h4>Model answers</h4>
<p><b>Report reading.</b> The files are <b>committed and deployed</b>, so the server-side removal is temporary and they will return on the next sync. Uploads files, database rows and the cron hook are outside Git and survive any redeploy. Because Test and Live are involved, this is urgent. The customer must remove the files via commit and deploy, then clean uploads and the database.</p>
<p><b>Customer steps.</b></p>
<ol>
<li>Remove the attacker files from the repository with a commit and deploy them to Test and Live. Do not commit pending Dev changes you do not recognize.</li>
<li>Delete the PHP files in uploads and the suspicious database rows and cron hook. These are not in Git, so redeploying does not remove them.</li>
<li>Rotate all credentials on every environment (account, admins, salts, database, API and payment keys).</li>
<li>Review CMS users on every environment for unknown administrators.</li>
<li>Update core, plugins and themes, remove unused ones, and tell us when done so security can rescan.</li>
</ol>
<p><b>Customer reply.</b> The redeploy is what restores committed attacker files. Reassure, repeat the commit-and-deploy removal. Because their legal team wants everything kept as is, the safe action is to escalate in #security-operations, ask what to do before changing the site, and loop in SecOps for the call with their security team rather than taking it alone. Do not speculate about the attacker's actions. <b>Field practice, not official policy.</b> In one real case, restarts and deploys on Live were held off while logs were pulled and the case was escalated.</p>`,
    quiz: [
      {
        q: "Why does redeploying a clean commit not fully clean a compromised site?",
        o: [
          "Redeploys are disabled on compromised sites",
          "Uploads files and the database are not in Git, so attacker files, rows and cron hooks survive",
          "Pantheon always keeps a copy of the malware",
          "The customer needs a new site plan",
        ],
        a: 1,
        w: "Only code is in version control. Uploads, database rows and cron hooks persist across redeploys and cause reinfection.",
      },
      {
        q: "Attacker files were committed and deployed to Live. An engineer removes them on the server. What happens?",
        o: [
          "The removal is permanent",
          "The next code sync can restore them, so the customer must remove them via commit and deploy",
          "Maintenance Mode removes them",
          "Nothing, they were never there",
        ],
        a: 1,
        w: "Committed files return after server-side removal. Removal must go through the repository.",
      },
      {
        q: "A customer's legal team says an incident is active and wants evidence kept. What do you do?",
        o: [
          "Restart the site to clear the problem",
          "Redeploy a clean commit immediately",
          "Escalate to #security-operations and ask before changing the site",
          "Delete the logs to protect privacy",
        ],
        a: 2,
        w: "When unsure, escalate to #security-operations and ask before changing the site. In one real case, restarts and deploys on Live were held off while logs were pulled (field practice, not official policy).",
      },
      {
        q: "A customer is serving their live domain from the Dev environment. Which advice fits?",
        o: [
          "Keep it, Dev is fine for production",
          "Advise moving the live domain to Live; credit requests go to billing, not Support",
          "Promise a credit on the ticket",
          "Disable the site",
        ],
        a: 1,
        w: "The channel advice was to move the domain to Live. Credits are decided by billing and finance leadership.",
      },
      {
        q: "A customer's security team wants a call about forensic details. What is the best response?",
        o: [
          "Answer all forensic questions yourself",
          "Refuse to talk to them",
          "Loop in SecOps in #security-operations",
          "Send them the malware monitor signatures",
        ],
        a: 2,
        w: "Technical forensic questions belong to SecOps. Never share how detection works.",
      },
    ],
    refs: [
      { t: "Malicious Content on Paid Site", u: CS + "2353038103" },
      { t: "Site Information Preservation Requests", u: CS + "4971724804" },
      { t: "Common Security-related Customer Requests", u: CS + "556662909" },
      { t: "Identifying a site in Maintenance Mode for Platform Abuse", u: CS + "2353692755" },
    ],
  },
  {
    id: 13,
    week: 3,
    mins: 40,
    title: "Legal-adjacent requests",
    goal: "Handle data erasure, preservation requests from authorities, and fraud or billing disputes without improvising.",
    plan: [
      ["Learn: data erasure", 10],
      ["Learn: preservation and fraud", 15],
      ["Lab: three simulated tickets", 15],
    ],
    learn: `<h4>1. Data erasure requests</h4>
<p>Acknowledgment now goes out automatically through the OneTrust privacy-portal form called <b>Pantheon Personal Data Request</b>. It creates an audit trail, so it is the path every erasure request must end in.</p>
<ol>
<li>In Slack, run Sibyl <code>user me &lt;email&gt;</code> to check whether the person has a platform account.</li>
<li>Found: tell them a dashboard account exists (mention if it has no sites). Point them to the public docs on deleting an account (or resetting the password first if they lost access), then ask them to complete the Pantheon Personal Data Request form for full permanent erasure.</li>
<li>Not found: just forward them to the form.</li>
<li>Set the S&amp;C Issue Type to <b>DATA ERASURE REQUEST</b>.</li>
</ol>
<p>Constraint: we may not be obliged to remove a platform user in some cases, for example when the person is a customer responsible for payment. Do not promise erasure of everything; the form route decides.</p>
<h4>2. Preservation requests from public authorities</h4>
<p>Police, prosecutors or federal agencies may ask us to preserve information about a site, paid or unpaid. It arrives at Abuse directly or through Legal. The SOP was still in draft as of June 2026 per team chat (confirm in #cse-soc), and has <b>no SLA and no Zendesk tag or macro</b>, so confirm in #cse-soc how to track it.</p>
<ol>
<li><b>Acknowledge</b> the external ticket. <b>Legal validates</b> that the requester is a public authority. <b>Abuse verifies</b> the site is actively hosted on Pantheon.</li>
<li>If Abuse received it directly, <b>notify InfoSec and Legal</b> (the InfoSec leads and the Legal mailbox), stating whether the site is hosted with us.</li>
<li>Take <b>no other action</b> unless InfoSec or Legal tell you to. Do <b>not</b> notify the subscriber or site owner in any way, do <b>not</b> enable Maintenance Mode, do <b>not</b> revoke access.</li>
<li>Tell the requester you are working on it and InfoSec will be in contact. All later communication is InfoSec's, copying the relevant Legal contacts.</li>
</ol>
<p><b>The only exception:</b> if Customer Support receives a Zendesk ticket from a <b>federal agency</b>, Support may enable Maintenance Mode on its own and must <b>immediately</b> tell InfoSec and Legal.</p>
<p>Why it matters: tipping off the owner can destroy evidence and break confidentiality duties.</p>
<h4>3. Fraud and billing disputes</h4>
<p>There is <b>no written playbook</b> for "a cardholder disputes charges, are these sites malicious?". The SOC lead said it fit no existing abuse playbook and a knowledge doc was being drafted. <b>Field practice, not official policy.</b> What worked in 2026: billing raises the account in channel and opens a proactive Abuse ticket listing all the site URLs, SOC (or security) reviews the sites, and billing then sandboxes or terminates the plans. Signals mentioned were sites with no domains, Test and Live never initialized, repeated card attempts with a new site each time, and many organizations with no sites. If one site on the account is already confirmed phishing, that is a strong red flag for the rest.</p>
<p>A 2026 payment-dispute case fit no playbook. When you meet that, say so in #cse-soc instead of forcing it into the phishing or content-review flow.</p>
<p><b>Field practice, not official policy.</b> CSAM and NCMEC: in channel, any NCMEC notification was treated as top priority. Do not paste suspicious images in Slack, and do not re-enable such sites. If you meet it, escalate to the SOC lead at once.</p>`,
    lab: [
      `Open the Data Erasure playbook and the Site Information Preservation Requests page (links in references). Find the S&C Issue Type value and the one exception to "do not enable Maintenance Mode".`,
      `Ticket A: write the full reply path. <blockquote>Ticket from a private individual: "Please delete all my personal data from your platform." Sibyl user me returns a dashboard account with no sites.</blockquote>`,
      `Ticket B: list your actions and what you must not do. <blockquote>Email to abuse from a police department at tips.example.test asking us to preserve all data about site case.example.test and not to tell the owner. A forwarded note from Legal says the requester is verified.</blockquote>`,
      `Ticket C: choose a first move. <blockquote>Billing in channel: a cardholder disputes 6 charges on one account. The account has 6 sites, none with domains, Test/Live never initialized. Billing has opened a proactive Abuse ticket with the URLs.</blockquote>`,
      `Compare with the model answers.`,
    ],
    knowhow: `<h4>Model answers</h4>
<p><b>Ticket A.</b> Reply that a dashboard account exists with no sites, link the docs on deleting the account (or resetting the password if no access), and ask them to complete the Pantheon Personal Data Request form for full permanent erasure. Set S&amp;C Issue Type to DATA ERASURE REQUEST. Do not promise more than the form delivers.</p>
<p><b>Ticket B.</b> Acknowledge the requester. Legal already validated; you verify the site is hosted on Pantheon (Sibyl or the healthcheck path). Notify InfoSec and Legal with the hosting result. Then stop: no owner notification, no Maintenance Mode, no access revocation. Tell the requester InfoSec will be in contact. Because the SOP was still in draft as of June 2026 per team chat, with no SLA, tag or macro, confirm tracking in #cse-soc. Only if the ticket came from a federal agency via Zendesk may Support enable Maintenance Mode, and then InfoSec and Legal must hear immediately.</p>
<p><b>Ticket C.</b> Field practice, not official policy: billing's proactive Abuse ticket is the right container. SOC or security reviews the six sites for phishing or credential-harvesting signs, using the indicators from Day 3 (new, never initialized, no domains). Report the result in the ticket and channel. Billing, not Support, sandboxes or terminates the plans. Say clearly that no playbook exists and use the sample outcome as precedent.</p>`,
    quiz: [
      {
        q: "What creates the audit trail for a data erasure request?",
        o: [
          "An internal note",
          "The Pantheon Personal Data Request form (OneTrust)",
          "A Slack thread",
          "A phone call",
        ],
        a: 1,
        w: "Acknowledgment goes out through the OneTrust webform to create an audit trail. You also set the issue type to DATA ERASURE REQUEST.",
      },
      {
        q: "A public authority asks us to preserve site data. Who validates the requester and who verifies hosting?",
        o: [
          "Abuse validates the requester; Legal verifies hosting",
          "Legal validates the requester; Abuse verifies hosting",
          "The site owner validates both",
          "Nobody",
        ],
        a: 1,
        w: "Legal validates that the requester is a public authority. The Abuse team verifies the site is actively hosted.",
      },
      {
        q: "You get a preservation request. Which action is NOT allowed unless InfoSec or Legal say so?",
        o: [
          "Notifying InfoSec and Legal",
          "Acknowledging the requester",
          "Telling the site owner or enabling Maintenance Mode",
          "Checking whether the site is hosted on Pantheon",
        ],
        a: 2,
        w: "Do not notify the owner, enable Maintenance Mode or revoke access. The only exception is a federal-agency Zendesk ticket, with immediate notice to InfoSec and Legal.",
      },
      {
        q: "Billing reports a payment dispute across several suspicious sites. No playbook fits. What is the field-practice flow?",
        o: [
          "Support terminates the plans",
          "Billing opens a proactive Abuse ticket, SOC reviews the sites, billing sandboxes or terminates",
          "Ignore it until the cardholder calls",
          "Treat it as a DMCA case",
        ],
        a: 1,
        w: "Field practice, not official policy. Say there is no playbook and confirm in #cse-soc.",
      },
    ],
    refs: [
      { t: "Handling Data Erasure Request", u: CS + "2434859152" },
      { t: "Site Information Preservation Requests", u: CS + "4971724804" },
      { t: "Handling Forwarded Security & Compliance Reports", u: CS + "3895132464" },
    ],
  },
  {
    id: 14,
    week: 3,
    mins: 45,
    title: "Edge cases: account blocks, Fastly, SpamCop, look-alike domains",
    goal: "Recognize five unusual report types, use only approved wording, and know who owns the decision on each.",
    plan: [
      ["Learn: flagged accounts and Russian-entity reports", 12],
      ["Learn: SpamCop and IP reputation", 8],
      ["Learn: look-alike domain takedown", 10],
      ["Lab: simulated tickets", 15],
    ],
    learn: `<h4>1. Automated account blocks</h4>
<p>Since mid-2026 the platform can automatically disable accounts judged very likely to be malicious. Customers may say "flagged", "blocked", "banned" or "restricted"; the dashboard error reads that the account was flagged for violating the Terms of Service. The rule for Support is simple: <b>follow the "Handling flagged account tickets" page exactly and do nothing beyond it</b>. These tickets usually come from malicious users, so never share operational insight into how the control works.</p>
<ol>
<li><b>Standard case.</b> Send an exact copy of the templated response without changing any wording, then close the ticket immediately. If the customer belongs to a Gold or higher workspace, the page adds one line pointing them to their Customer Success Manager.</li>
<li><b>Do not</b> explain what the security system is or how it works, confirm or deny what triggered the block, suggest creating a new account, or transfer the ticket to another agent or team.</li>
<li><b>Dispute.</b> If the customer claims they did nothing wrong, check with the Sibyl bot whether the person is associated with any paid site or workspace. Not associated: resend the template and close. Associated: keep the ticket open and escalate.</li>
<li><b>Escalating a possible real customer.</b> Collect the account email, the workspace URL and the CSM or PM name if known. File a bug report to the Security team with the Space set to "SecOps (INFOSEC)". Tell the customer only that it was flagged internally for review and they will hear through their account team. Do not unblock anything and do not promise a review.</li>
<li><b>If a CSM or PM brings it to you</b>, they file the bug themselves and no Support ticket should exist. Security reviews the decision: a confirmed false positive is unblocked by Security and communicated by the CSM or PM; a malicious account gets the templated response.</li>
</ol>
<p><b>Field practice, not official policy.</b> In one observed case the false positive was a phishing report that had hit a legitimate account (a group of training students was flagged once), and the ticket had the <code>no_ratings</code> tag added by hand so no satisfaction survey went out. Treat that as an example only: follow the flagged-account page exactly and confirm any tag step in #cse-soc. A site that looked harmless once turned out to be credential harvesting, so do not tell a customer that "no policy prohibits" something; check with security first.</p>
<h4>2. Russian-entity reports forwarded by Fastly</h4>
<p>Complaints from Russian government entities arrive via Fastly. The playbook:</p>
<ol>
<li>Verify the site is hosted on Pantheon (healthcheck path or Sibyl).</li>
<li>Not hosted: send <b>Template 1</b> (we do not host the site) and stop.</li>
<li>Check the customer's data is not hosted in Russia (the page links to instructions but does not detail them; confirm in #cse-soc).</li>
<li>Open a proactive ticket to the owner, tagged <code>outbound</code> and <code>RU-Fastly-Complaint</code>, with the site name and ID and a copy of the complaint. Subject style: content review on your site, no action needed. Tell them there is no obligation to act and no policy violation was found. The page gives the macro name as "TBD", so <b>confirm the macro in #cse-soc</b>.</li>
<li>Reply to Fastly with <b>Template 2</b> (investigation complete, thank you), putting the proactive ticket reference in the internal note first, then close.</li>
</ol>
<h4>3. SpamCop notices</h4>
<p>A BETA process for customers with third-party email. Notices land in the abuse bucket and need no follow-up, but we forward them. Confirm the site is hosted here (Sibyl or healthcheck: OK means Pantheon, 404 means not). Not hosted: close. Hosted: get the owner and recent committers from the dashboard Teams page, create a new ticket, apply the <b>Spam Email</b> macro (sets SOC Issue Type Spam Email and the proactive tag), paste the original notice as a quote and submit as solved, then link it back in the SpamCop ticket and solve that. If the spamvertised URL is a Dev URL, investigate it as phishing instead. Note: tickets tagged <code>spam</code> must not use the "Spam Email" issue type.</p>
<h4>4. IP-reputation complaints</h4>
<p><b>Field practice, not official policy.</b> Sometimes a customer's registration page or email is blocked by an enterprise web filter or spam list because shared Pantheon IP ranges have a poor reputation. Support cannot fix it, and Support does not file false-positive reports on a customer's behalf. Give the customer the facts they need to file with the vendor themselves. If the issue looks platform-wide, ask SecOps to look into delisting. Default platform mail servers are poorly reputed, so recommend a third-party email provider (see the Common Security Requests page).</p>
<h4>5. Look-alike phishing domain takedown (VULCAN playbook)</h4>
<p>Owner: Security Operations, updated August 2026. When a domain <b>impersonates Pantheon</b> (for example a typo-squat of the login page), this is not a hosted-customer case. The playbook:</p>
<ol>
<li><b>Detect.</b> The brand-monitoring tool flags domains containing the literal brand string. Typosquats can slip through, so manual spot-checks are needed.</li>
<li><b>Verify before filing.</b> Confirm a phishing page is actually live (registered alone is not enough). Gather a screenshot, certificate details, hosting provider and IP, registrar, the hosting abuse contact, and the discovery date.</li>
<li><b>Submit in parallel</b>: the brand-monitoring takedown request, Google Safe Browsing (safebrowsing.google.com), Microsoft SmartScreen, the certificate issuer (request revocation), the hosting provider's abuse contact, and the registrar's abuse report. Registrars can suspend a domain outright.</li>
<li><b>Escalate to Legal</b> in #legal if still live 5 business days later or the host is unresponsive. Legal can pursue a cease and desist, a registrar complaint, or UDRP (typically 45-60 days).</li>
<li><b>Document</b> in the INFOSEC Jira ticket. If the site lived long enough to capture credentials, escalate to incident response and notify the relevant CSE team.</li>
</ol>
<p>Do <b>not</b> contact the phishing operator or interact beyond passive verification; all registrant communication goes through Legal.</p>
<p><b>Field practice, not official policy.</b> From one real incident (not in the playbook): customers may ask Support to confirm "was my account affected". Support should not answer from its own knowledge; ask SecOps what can be said and use approved wording as a holding statement. In one case a follow-up cadence for holding statements was agreed because the customer was left waiting weeks.</p>
<p><b>Field practice, not official policy.</b> In one case, registrar-level reports did not take a look-alike down. The security analyst got it removed from the CDN/DNS proxy, with a search-engine support ticket or legal escalation as the next steps.</p>`,
    lab: [
      `Open the flagged-account page and the Russian-entity page (links in references). List the tag and the two template numbers, and note the one macro that is "TBD".`,
      `Ticket A: write your reply plan using the flagged-account page. <blockquote>Customer: "My account is blocked and my agency's sites are down. What rule did I break? Which score did I get?"</blockquote>`,
      `Ticket B: list the five steps. <blockquote>Forwarded Fastly complaint from a Russian government entity about content on portal.example.test. The site is hosted on Pantheon. Customer data is not hosted in Russia.</blockquote>`,
      `Ticket C: decide the takedown channels and owner. <blockquote>A teammate finds pantheon-login.example.test serving a copy of the Pantheon login page, with an issued certificate. It was not caught by brand monitoring.</blockquote>`,
      `Ticket D: choose the next action. <blockquote>Customer: "Our login page is blocked by our enterprise filter. Please whitelist it with your vendor."</blockquote>`,
      `Compare with the model answers.`,
    ],
    knowhow: `<h4>Model answers</h4>
<p><b>A.</b> Follow the flagged-account page exactly. Send the exact templated response without changing wording and close. Do not explain the control, hint at rules, confirm what triggered it, or suggest a new account. Because the customer disputes it, check with Sibyl whether the account is tied to a paid site or workspace. If not, resend the template and close. If yes, keep the ticket open, collect account email, workspace URL and CSM or PM name, file the bug in the SecOps (INFOSEC) space, and say only that it was flagged internally and the account team will be in touch. Do not unblock or promise anything. <b>Field practice, not official policy:</b> in one observed case a manual <code>no_ratings</code> tag was added on a false positive.</p>
<p><b>B.</b> Verified hosted, data not in Russia. Create a proactive ticket tagged <code>outbound</code> and <code>RU-Fastly-Complaint</code> with site name, ID and the complaint copy; text says no obligation, no violation found. Confirm the macro (listed as TBD). Reply to Fastly with Template 2 after adding the proactive ticket reference to the internal note, then close.</p>
<p><b>C.</b> Verify a live page (screenshot, certificate, hosting and registrar). Submit in parallel: brand-monitoring takedown, Google Safe Browsing, Microsoft SmartScreen, certificate issuer, hosting provider, registrar. SecOps owns the playbook. Escalate to Legal via #legal after 5 business days. Document in the INFOSEC Jira ticket. Never interact with the site beyond passive checks.</p>
<p><b>D.</b> Field practice, not official policy: Support does not file false-positive reports for customers. Explain the filter belongs to their organization or vendor, give them the facts to file (the site is hosted on shared ranges; no malware found if the spam check was clean). If it seems platform-wide, ask SecOps about delisting.</p>`,
    quiz: [
      {
        q: "A customer says their account is blocked and asks for the rule. What do you do?",
        o: [
          "Explain the scoring so they can fix it",
          "Follow the flagged-account page exactly and never reveal scoring",
          "Unblock the account yourself",
          "Ask them to open a new account",
        ],
        a: 1,
        w: "These accounts are usually malicious and operational details help them evade controls. Security unblocks false positives.",
      },
      {
        q: "Which tag identifies a Russian-entity Fastly complaint?",
        o: ["spam", "RU-Fastly-Complaint", "snc_internal", "abuse_blocked_email"],
        a: 1,
        w: "Add RU-Fastly-Complaint and outbound on the proactive ticket. The macro name is listed as TBD, so confirm it.",
      },
      {
        q: "A SpamCop notice names a hosted site's domain. Which macro and issue type do you use?",
        o: [
          "Spam Email macro, SOC Issue Type Spam Email",
          "DMCA notice macro, issue type DMCA",
          "Phishing macro",
          "No macro, just ignore",
        ],
        a: 0,
        w: "The Spam Email macro sets the issue type and proactive tag. If the URL is a Dev environment URL, investigate as phishing instead.",
      },
      {
        q: "Field practice: who should confirm whether a customer's account was affected in an incident?",
        o: [
          "Any Support agent",
          "SecOps decides what can be said; Support gives an approved holding statement",
          "The customer's CSM guessing",
          "Nobody",
        ],
        a: 1,
        w: "Field practice, not official policy: Support does not confirm account status on its own. Ask SecOps and use approved holding statements.",
      },
      {
        q: "A look-alike phishing domain is still live 5 business days after takedown requests. What next?",
        o: [
          "Contact the operator directly",
          "Ping Legal in #legal with the evidence and request dates",
          "Wait indefinitely",
          "Disable the real customer's site",
        ],
        a: 1,
        w: "Legal can send a cease and desist, file a registrar complaint or pursue UDRP. Never contact the operator.",
      },
    ],
    refs: [
      { t: "Handling flagged account tickets", u: CS + "4891443216" },
      { t: "S&C Fastly Reports from Russian Entities", u: CS + "2353234568" },
      { t: "SpamCop Spam Email Notifications", u: CS + "2353659982" },
      { t: "Common Security-related Customer Requests", u: CS + "556662909" },
      { t: "Phishing Domain Takedown Playbook (VULCAN)", u: "https://getpantheon.atlassian.net/wiki/spaces/VULCAN/pages/5153914902" },
    ],
  },
  {
    id: 15,
    week: 3,
    mins: 45,
    title: "Capstone: the mixed queue",
    goal: "Triage a simulated queue of eight tickets: set priority, first action, macro or tag, and escalation for each.",
    plan: [
      ["Review: key playbooks", 10],
      ["Lab: triage the queue", 25],
      ["Check the answer key", 10],
    ],
    learn: `<p>Today uses no new material. You will use all three weeks on a queue that resembles a real shift.</p>
<p><b>Field practice, not official policy.</b> No written playbook ranks these ticket types, so the answer key justifies its order on its own: platform harm and legal confidentiality first, then active harm to victims, then legal clocks, then oldest first within a group, and informational or routing requests last. Neighboring priorities can reasonably vary between agents; defend yours. When unsure, ask in #cse-soc. Rules of thumb behind the order:</p>
<ul>
<li><b>Platform harm and legal confidentiality first</b> (DDoS, preservation requests).</li>
<li><b>Active victim harm next</b> (live phishing, active compromise).</li>
<li><b>Legal clocks next</b> (DMCA 48-hour and 5-business-day timers, 10-day content review).</li>
<li><b>Informational or routing requests last</b> (scan permissions, SOC 2).</li>
</ul>
<h4>Quick map</h4>
<table><thead><tr><th>Type</th><th>First move</th><th>Escalate to</th></tr></thead><tbody>
<tr><td>Phishing</td><td>Verify hosting (Sibyl), look at the site, set S&amp;C type Phishing, disable via mass tool</td><td>Security if paid plan</td></tr>
<tr><td>DMCA</td><td>Confirm hosting, check the six elements, incomplete macro</td><td>Legal (CC on all)</td></tr>
<tr><td>Trademark</td><td>Confirm hosting, check three items</td><td>Legal</td></tr>
<tr><td>Scan request</td><td>Scan macro; formal approval via Helpdesk ticket to InfoSec</td><td>InfoSec</td></tr>
<tr><td>SOC 2</td><td>Trust Center; Billing tab check</td><td>CSM for contract customers</td></tr>
<tr><td>DDoS</td><td>Maintenance Mode, AGCDN check, proactive ticket</td><td>CSM channels, shift manager</td></tr>
<tr><td>Compromise</td><td>Read report, proactive ticket with steps</td><td>SecOps</td></tr>
<tr><td>Preservation</td><td>Acknowledge, Legal validates, Abuse verifies hosting</td><td>InfoSec and Legal</td></tr>
</tbody></table>
<p>Remember the confirm-in-#cse-soc list: counter-notice timing, DMCA template and macro names, Maintenance Mode timing for DMCA, trademark macro adaptation, the "TBD" macros, preservation SOP (still in draft as of June 2026 per team chat).</p>`,
    lab: [
      `Read all eight tickets in the next four steps. Number them 1-8 by the order you would work them, with a one-line reason for each. For each, write the first action, any macro or tag, and the escalation path. Then check yourself against the answer key in the know-how section and mark each ticket green, yellow or red.`,
      `<b>Ticket 1.</b> <blockquote>Reporter writes to abuse: "bank-secure-login.example.test copies my bank's sign-in page and is stealing passwords." Sibyl shows it is a Dev environment on a new Sandbox site, owner is a new user.</blockquote><b>Ticket 2.</b> <blockquote>Email: "We are the rights holder of a photo on gallery.example.test. Remove it now. Regards, Studio Example." No signature, no statement of good faith, no statement under penalty of perjury.</blockquote>`,
      `<b>Ticket 3.</b> <blockquote>Email: "Your customer at brand-clone.example.test uses our registered trademark in their store name." It includes the page URL and contact details but no proof of ownership.</blockquote><b>Ticket 4.</b> <blockquote>Customer: "We will run an external vulnerability scan on app.example.test next week. Please allow-list our scanner IPs and confirm in writing that you approve the test."</blockquote>`,
      `<b>Ticket 5.</b> <blockquote>Prospect on a free plan: "We need your SOC 2 Type 2 report before we buy." The site dashboard shows a Billing tab.</blockquote><b>Ticket 6.</b> <blockquote>Engineering: "shop2.example.test on a paid Live plan, no AGCDN, is flooding the origin with uncached requests from rotating IPs. It is degrading other sites."</blockquote>`,
      `<b>Ticket 7.</b> <blockquote>Security engineer report for agency.example.test (paid Live): plugin folder with random suffix and PHP files in uploads, committed and deployed to Live. The customer has not responded yet.</blockquote><b>Ticket 8.</b> <blockquote>Email from a police department (tips.example.test) asking us to preserve all information about hosted.example.test and not to inform the owner. Legal has not yet replied.</blockquote>`,
    ],
    knowhow: `<h4>Answer key (suggested priority)</h4>
<p><b>Field practice, not official policy.</b> This order is justified by platform harm and confidentiality first, active victim harm second, legal clocks (DMCA and trademark timers) third, then oldest first, then informational requests. Neighboring priorities can vary; justify yours.</p>
<ol>
<li><b>Ticket 6, DDoS.</b> Maintenance Mode first; non-AGCDN so follow the rate-limiting playbook and a CSEPRO card; find AM/CSM; proactive ticket; notify #client-sales-feedback and #csm and your shift manager; tell the team lead (paid live) and the AGCDN SME.</li>
<li><b>Ticket 8, preservation.</b> Acknowledge. Legal validates the requester; you verify hosting (Sibyl or healthcheck). Notify InfoSec and Legal. Do not notify the owner, enable Maintenance Mode or revoke access. Tell the requester InfoSec will be in contact. The SOP was still in draft as of June 2026 per team chat, with no tag or macro: confirm in #cse-soc.</li>
<li><b>Ticket 1, phishing.</b> Verify hosting, view the site, confirm it is a credential-harvesting copy. Set S&amp;C Issue Type Phishing for the automation, disable via the CSE Mass Maintenance Tool, close with the "[SOC] Resolve Abuse Email Notification: Site Disabled" macro (adds no-ratings). Sandbox and brand-new, so no manager approval needed. Never paste the live page into Slack.</li>
<li><b>Ticket 7, compromised paid site.</b> Committed files return after removal, so the customer must remove them via commit and deploy. Create a proactive ticket from the report using the macro "[SOC-SECURITY] Proactive malicious code notification on PAID site" after setting fields first (S&amp;C Issue Security, Legal Due Date 2 business days, Party Site Owner, assign to Abuse). Include the numbered steps: uploads, database, credential rotation. Add a follow-up event on the response calendar. If no reply, polite check-in with 48 more hours, then Dev Maintenance Mode. Loop in SecOps if exploitation is active. If a legal hold appears, stop and ask.</li>
<li><b>Ticket 2, DMCA incomplete.</b> Confirm the site is hosted. The notice lacks the signature, the good-faith statement and the perjury statement. Send "DMCA: Response to complaining party on incomplete information", change the legal due date to 5 business days, set Pending. No answer in 48 hours: "DMCA: Denial of takedown notice" and close. Macro names may differ from the template page; confirm in #cse-soc.</li>
<li><b>Ticket 3, trademark.</b> Confirm hosting. It has URL and contact but no proof of ownership, so request the missing item with the incomplete-information template. 5 business days; 48-hour rule. Trademark is not DMCA and has no counter-notice. The templates are DMCA-worded, so confirm adaptation in #cse-soc.</li>
<li><b>Ticket 4, scan request.</b> Use the "Vulnerability Scan Penetration Testing" macro: we do not block scanning and do not allow-list scanner IPs. For formal written approval, open a Helpdesk ticket assigned to InfoSec and share it in #security-operations. Do not use @here.</li>
<li><b>Ticket 5, SOC 2.</b> Non-contract (Billing tab). Reply that SOC 2 reports are for Enterprise Contract customers only; share the Trust Center and the US privacy policy as a statement of controls. If a contract customer: find the CSM.</li>
</ol>`,
    quiz: [
      {
        q: "A DMCA notice has no signature and no perjury statement. What is the right first step after confirming hosting?",
        o: [
          "Disable the site immediately",
          "Send the incomplete-information macro, change the due date to 5 business days, set Pending",
          "Ignore it",
          "Forward it to the site owner unchanged",
        ],
        a: 1,
        w: "The six required elements are missing. After 48 hours with no reply the matter is closed with the denial macro.",
      },
      {
        q: "A police department asks you to preserve data and not tell the owner. Which action is wrong?",
        o: [
          "Notify InfoSec and Legal",
          "Verify hosting",
          "Put the site in Maintenance Mode and email the owner",
          "Acknowledge the requester",
        ],
        a: 2,
        w: "No owner notification, no Maintenance Mode, no revoking access unless InfoSec or Legal say so. The only exception is a federal-agency Zendesk ticket with immediate notice.",
      },
      {
        q: "A prospect on a non-contract site asks for SOC 2. What is correct?",
        o: [
          "Send the report right away",
          "Point to the Trust Center and say SOC 2 reports are for contract customers (Billing tab means non-contract)",
          "Ask InfoSec to sign an NDA",
          "Ignore the request",
        ],
        a: 1,
        w: "Only contract customers are eligible; the non-contract canned reply offers the privacy policy as a statement of security controls.",
      },
      {
        q: "A site hosted on Pantheon is flooding the origin and harming others, no AGCDN, paid Live. What first?",
        o: [
          "Send a ransom reply",
          "Put the site in Maintenance Mode temporarily to protect others",
          "Wait for Monday",
          "Refund the customer",
        ],
        a: 1,
        w: "Maintenance Mode first, then AGCDN check, CSEPRO card, proactive ticket and notifications.",
      },
      {
        q: "A security engineer removed committed attacker files from a paid Live site and the customer is silent. What is the key customer message?",
        o: [
          "Redeploy and you are done",
          "Remove the files with a commit and deploy, clean uploads and the database, rotate credentials",
          "Delete the site",
          "Nothing, the engineer fixed it",
        ],
        a: 1,
        w: "Committed files return on the next sync and uploads or database payloads are not in Git.",
      },
    ],
    refs: [
      { t: "Security & Compliance (SOC) parent page", u: CS + "2350580093" },
      { t: "DMCA/Copyright Complaint Process", u: CS + "2632515677" },
      { t: "Trademark/Service Mark Complaint Process", u: CS + "2632876301" },
      { t: "Disabling a Confirmed Malicious Site", u: CS + "2353332508" },
      { t: "Handling a DoS/DDoS report", u: CS + "2834497538" },
      { t: "Site Information Preservation Requests", u: CS + "4971724804" },
      { t: "SOC2, Compliance, and Security Policy Requests", u: CS + "2353398043" },
      { t: "Responding to Security Scan/Penetration Test Requests", u: CS + "99942409" },
    ],
  },
];
