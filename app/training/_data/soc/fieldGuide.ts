// Field guide HTML (static reference content) for the SOC course.
// Items marked "Field practice, not official policy" come from team chat, not the playbooks.
export const FIELD_GUIDE_HTML = `
<section class="fg" data-section="fg-channels"><h3>Channels and groups</h3>
<table><thead><tr><th>Where</th><th>What it is for</th></tr></thead><tbody>
<tr><td>Zendesk group <code>Abuse</code></td><td>The SOC queue. Reports sent to abuse@pantheon.io create tickets here. It auto-assigns to individuals, so assigning to Abuse may bounce back to you.</td></tr>
<tr><td>abuse@pantheon.io</td><td>Public intake for phishing, spam, DMCA, trademark, content review and forwarded reports. Also the designated copyright agent address in the notice templates.</td></tr>
<tr><td>#cse-soc, <code>@soc</code></td><td>Team chat for the CSE Security Operations Center: handoffs, queue questions, macro questions.</td></tr>
<tr><td>#security-operations, <code>@security-ops</code></td><td>Security team. Content review cross-shares, scan concerns, sandbox review, what can be disclosed. Do not use @here: the team works in set time zones.</td></tr>
<tr><td>#domain-hijacking, #platform-edgerouting</td><td>Escalation for domain exemption requests, ping <code>@edge-routing</code> after 24 to 48 business hours without resolution.</td></tr>
<tr><td>#cse-support, #cse-handoff, #oncall_handoff</td><td>Engineering notices and handoffs for proactive Maintenance Mode (the source page spells the handoff channels inconsistently).</td></tr>
<tr><td>#csm, #client-sales-feedback</td><td>Reach the CSM or AM, for example after a DDoS or a contract-customer SOC 2 request.</td></tr>
<tr><td>infosec@pantheon.io</td><td>Where bug reporters send their bug bounty account ID. Support does not triage bug reports.</td></tr>
</tbody></table></section>

<section class="fg" data-section="fg-tags"><h3>Zendesk tags</h3>
<table><thead><tr><th>Tag</th><th>Use</th></tr></thead><tbody>
<tr><td><code>abuse</code></td><td>Separates abuse tickets from other departments.</td></tr>
<tr><td><code>snc_internal</code></td><td>Internal tickets: S&amp;C agent disabled a phishing or subdomain takeover site with no complainant.</td></tr>
<tr><td><code>snc_proactive</code></td><td>Proactive notices to a site owner: DMCA or trademark complaint, malicious code on a paid site, content review, spam emails.</td></tr>
<tr><td><code>spam</code></td><td>Spam tickets. Do not set the S&amp;C issue type to Spam Email on these.</td></tr>
<tr><td><code>no_ratings</code></td><td>Internal tickets, bad actors, phishing agency tickets. Field practice, not official policy: chat refers to a hyphenated <code>no-ratings</code> tag, so confirm the exact spelling in #cse-soc. Bad CSAT from third-party complainants on phishing tickets is disregarded.</td></tr>
<tr><td><code>skip_ticket_review</code></td><td>Skips QA review for phishing, spam, spam email and subdomain hijacking tickets.</td></tr>
<tr><td><code>incoming-domain-validation</code></td><td>Domain protection exemption or anything about the subdomain takeover platform update.</td></tr>
<tr><td><code>plat_domain_verification_exemption</code></td><td>Added when you exempt a whole workspace from domain validation (Method A).</td></tr>
<tr><td><code>subdomain_returned</code></td><td>A hijacked subdomain was returned to its legitimate owner.</td></tr>
<tr><td><code>abuse_blocked_email</code></td><td>User account blocked as a terms of service violator.</td></tr>
<tr><td><code>subdomain_takeover</code>, <code>phishing</code>, <code>pantheon_employee</code></td><td>Used with <code>snc_internal</code> and <code>no_ratings</code> on the internal takeover and phishing tickets. Internal tickets are submitted as Open.</td></tr>
<tr><td><code>RU-Fastly-Complaint</code></td><td>Proactive ticket for a Fastly-forwarded complaint from a Russian entity (also tag outbound).</td></tr>
<tr><td><code>proactive</code></td><td>Applied by the Spam Email macro.</td></tr>
</tbody></table></section>

<section class="fg" data-section="fg-macros"><h3>Macros</h3>
<p>Only names confirmed in the playbooks are listed as exact. The DMCA and trademark pages also use a Template N naming scheme that does not match the macro names. Confirm in #cse-soc before relying on a mapping.</p>
<table><thead><tr><th>Situation</th><th>Macro name</th></tr></thead><tbody>
<tr><td>Phishing report with no URL</td><td>[SOC] Need more information about platform abuse notification</td></tr>
<tr><td>Reported site not on Pantheon (phishing)</td><td>[SOC-DMCA] Template 1 - Site Not On Pantheon</td></tr>
<tr><td>Site disabled, notify reporter</td><td>[SOC] Resolve Abuse Email Notification: Site Disabled</td></tr>
<tr><td>Content review request received</td><td>[SOC-CONTENT REVIEW REQUEST] Response to Customer when an Internal Content Review Request is received</td></tr>
<tr><td>DMCA, not hosted here</td><td>DMCA: Response if Pantheon does not host the site</td></tr>
<tr><td>DMCA, notice complete and valid</td><td>DMCA: Response to complaining party if notice is complete and valid</td></tr>
<tr><td>DMCA, incomplete notice</td><td>DMCA: Response to complaining party on incomplete information</td></tr>
<tr><td>DMCA, no reply in 48h</td><td>DMCA: Denial of takedown notice</td></tr>
<tr><td>DMCA, notify the site owner</td><td>DMCA: Notice to Site Owner</td></tr>
<tr><td>Counter notice incomplete</td><td>DMCA: Email to site owner on counter notification with incomplete information</td></tr>
<tr><td>Counter notice complete (sent to the complainant despite the name)</td><td>DMCA: Email to site owner on counter notification</td></tr>
<tr><td>Subdomain takeover, notify customers</td><td>[SOC-SUBDOMAIN_TAKEOVER] Proactive ticket informing customers of a subdomain takeover attack</td></tr>
<tr><td>Malicious code on a paid site</td><td>[SOC-SECURITY] Proactive malicious code notification on PAID site</td></tr>
<tr><td>Customer removed the code</td><td>[SOC-SECURITY] Customer Has Removed Malicious Code</td></tr>
<tr><td>48h check-in</td><td>[SOC-SECURITY] Polite Checkin- Customer Has Not Responded to Malicious Code on Paid Site</td></tr>
<tr><td>Disabling the paid site after silence</td><td>[SOC-SECURITY] Disabling Customer's Paid Site With Malicious Code Due To Non-Response</td></tr>
<tr><td>Scan or pen test permission</td><td>Vulnerability Scan Penetration Testing</td></tr>
<tr><td>Spam email notification</td><td>Spam Email</td></tr>
<tr><td>Trademark notices</td><td>Named by Template number on the page (DMCA Template 1, 2 and 5): confirm in #cse-soc</td></tr>
<tr><td>Russian entity proactive ticket</td><td>Page says TBD: confirm in #cse-soc</td></tr>
<tr><td>DDoS ransom threat, DDoS proactive ticket</td><td>No macro name given: confirm in #cse-soc</td></tr>
<tr><td>Bug reporter canned reply, SOC 2 canned message</td><td>No macro name given: confirm in #cse-soc</td></tr>
</tbody></table></section>

<section class="fg" data-section="fg-sla"><h3>SLA and timer cheat sheet</h3>
<table><thead><tr><th>Case</th><th>Timer</th></tr></thead><tbody>
<tr><td>DMCA, incomplete notice</td><td>Legal due date 5 business days from the day you ask for more information</td></tr>
<tr><td>DMCA or trademark, no complainant reply</td><td>48 hours, then the matter is closed (DMCA: Denial macro)</td></tr>
<tr><td>Trademark legal due date</td><td>5 days from receipt</td></tr>
<tr><td>Counter notice reinstatement</td><td>14th day or 14 business days: playbook and templates disagree, see below</td></tr>
<tr><td>Content review</td><td>10 calendar days from receipt</td></tr>
<tr><td>Malicious code on a paid site</td><td>2 business days, then a 48 hour check-in, then Maintenance Mode on Dev</td></tr>
<tr><td>Domain exemption outside the criteria</td><td>1 business day when the ticket has the justification</td></tr>
<tr><td>Domain exemption escalation</td><td>24 to 48 business hours, then #domain-hijacking or #platform-edgerouting</td></tr>
<tr><td>Proactive Maintenance Mode</td><td>Customer response typically within 24 hours</td></tr>
<tr><td>Malware monitor</td><td>Scans code every 5 minutes; after cleanup wait about 5 minutes before re-checking</td></tr>
<tr><td>Backlog priority (field practice, not official policy)</td><td>Copyright and takedown tickets first, then oldest</td></tr>
</tbody></table></section>

<section class="fg" data-section="fg-escalation"><h3>Escalation paths</h3>
<table><thead><tr><th>Topic</th><th>Who and where</th></tr></thead><tbody>
<tr><td>Scan findings or scan permission</td><td>Short summary with ticket or chat link in #security-operations, no @here, then paste the Slack link in an internal note. Formal approval: Helpdesk ticket assigned to InfoSec.</td></tr>
<tr><td>CSAM or NCMEC notification (field practice, not official policy)</td><td>Top priority. Raise with the SOC lead and security at once. Do not re-enable these sites and do not apply no-malware-found logic. Escalate CSAM/NCMEC reports per the SOC lead and Security.</td></tr>
<tr><td>Legal, DMCA, preservation</td><td>Legal validates authorities and is CC'd on every communication. For preservation, notify InfoSec and Legal and tell nobody else.</td></tr>
<tr><td>Hand-disabled site, restore requests</td><td>Ask SecOps in #security-operations. Field practice, not official policy: whether to lift Maintenance Mode is the SOC or security engineer's call, not front-line support's.</td></tr>
<tr><td>Bug reporters</td><td>Canned reply, then InfoSec through infosec@pantheon.io.</td></tr>
<tr><td>Domain exemption not covered by criteria</td><td>Jira BUGS card for Edge Routing; escalate in the domain channels; urgent items through the on-call escalation, selecting OCE.</td></tr>
<tr><td>DDoS</td><td>Shift manager, CSM or AM, AGCDN SME on shift.</td></tr>
<tr><td>Paid site, Platinum or Diamond</td><td>Notify the team lead or manager BEFORE disabling.</td></tr>
<tr><td>CVE reports, PCI scan findings, pen test results (field practice, not official policy)</td><td>Not SOC queue work: technical support or #security-operations.</td></tr>
<tr><td>Flagged account tickets (field practice, not official policy)</td><td>Follow the Handling flagged account tickets page exactly. Do not describe the scoring system or say that a behavior is allowed without asking security.</td></tr>
</tbody></table></section>

<section class="fg" data-section="fg-inconsistencies"><h3>Playbook inconsistencies to confirm in #cse-soc</h3>
<ul>
<li>Counter notice reinstatement: the process page says the 14th day, Templates 5 and 7 say 14 business days.</li>
<li>DMCA: the process page says put the site in Maintenance Mode immediately on a valid notice; Template 5 says Maintenance Mode only if the owner has not removed content by the deadline.</li>
<li>Restoring a Disabled Site gives a Re-enable button; the maintenance-mode identification page says never re-enable a manually disabled unpaid sandbox. The restore page does not say who approves.</li>
<li>Domain exemption page says two criteria but lists three.</li>
<li>The Follow-Up and Check-In sections on the DMCA and Trademark pages are empty. Trademark has no Maintenance Mode instruction, and Template 5 is DMCA-specific.</li>
<li>Template N names in Confluence do not match Zendesk macro names. Agents report macros they cannot find.</li>
<li>The paid-site page has a blank owner for Diamond and Platinum communication.</li>
<li>Site Information Preservation Requests was still in draft as of June 2026 per team chat (confirm in #cse-soc), with no SLA, tag or macro.</li>
<li>The Russian-entity page lists a macro literally named TBD and a data-location step with no detail.</li>
<li>Several pages were last edited in 2022 or 2023 (maintenance-mode identification, paid-site, restore, DMCA templates, internal tags). The manual banner process in Disabling a Confirmed Malicious Site is reported as replaced by the Mass Maintenance Tool (field practice, not official policy).</li>
<li>No playbook yet for payment disputes and card-fraud accounts (field practice, not official policy).</li>
</ul></section>

<section class="fg" data-section="fg-commands"><h3>Handy commands</h3>
<p>These run in the team's internal tools (Slack bot, ygg, appserver shell), not on your laptop. Replace the placeholders. Never paste real customer data into a ticket note unless the playbook says to.</p>
<pre><code>@sibyl site me &lt;url or domain&gt;
@sibyl user me &lt;email&gt;
&lt;site-url&gt;/pantheon_healthcheck      # OK means hosted on Pantheon, 404 means not

# On the Dev appserver (field practice: run invalidate first if you see platform cache-file hits)
btool check-for-spam
btool invalidate
btool su                              # manual disable path, only if the Mass Maintenance Tool cannot be used

# Domain validation exemption for a whole workspace (Method A)
ygg-start
ygg pan sites.set_domain_validation_exception:WORKSPACE_ID,exempt=true

# Preventive streamlined AGCDN on a hijacked domain
pan sites.enable_agcdn:custom_domain

# Heavy-traffic lookup used for abusive sites
@hubot fastly top miss

# Show a customer the CDN does not support TRACE (expect HTTP 405)
curl -v -XTRACE https://www.example.test</code></pre>
<p>Tag to add alongside the exemption command: <code>plat_domain_verification_exemption</code>. A success reply says the workspace has been successfully updated. Restore validation once the customer finishes adding domains. For reference sources see legal.pantheon.io, trust.pantheon.io and docs.pantheon.io.</p></section>
`;
