import type { Day } from "../../types.ts";

const CONF = "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/";

export const WEEK_2_DAYS: Day[] = [
  {
    id: 6,
    week: 2,
    mins: 40,
    title: "Forwarded reports and content review",
    goal: "Handle a report forwarded by another team with the two-ticket rule, run a content review inside its 10-day SLA, and know the hard stops around CSAM and re-enabling sites.",
    plan: [
      ["Learn", 15],
      ["Lab", 20],
      ["Quiz", 5],
    ],
    learn: `<p>Not every report arrives from the outside. Colleagues in other departments forward phishing, DMCA, trademark, copyright and content complaints to abuse@pantheon.io, and each one lands in the Abuse queue as an <b>internal</b> ticket. The complainant, though, is still waiting for an answer, so the playbook asks for two tickets.</p>
<h4>The two-ticket rule</h4>
<ol>
<li><b>Acknowledge the internal ticket</b> with an internal note.</li>
<li><b>Create a new proactive ticket</b> addressed to the original external complainant. CC the employee or department that forwarded it. Keep the tone professional.</li>
<li>Investigate and respond using the normal Abuse procedures and SLAs. Keep the internal contact on CC, and <b>CC Legal on every communication</b>.</li>
<li>Go back to the internal ticket and add an internal note that points to the proactive ticket. Close the internal ticket only after the proactive one is addressed.</li>
</ol>
<h4>Content review requests</h4>
<p>Content review covers reports about illegal content, violence, pornographic material, or content judged unethical. The Platform Content Review Policy governs it, and the SLA is <b>10 calendar days</b> from receipt.</p>
<ol>
<li>Acknowledge the external ticket and check that the site is hosted on Pantheon. Reply with the SOC content review request macro (its name starts with <code>[SOC-CONTENT REVIEW REQUEST]</code>). The info panel and tags fill in automatically.</li>
<li>Write your findings in an internal note: a screenshot of the content, the site owner contact, and what you observed.</li>
<li>Cross-share the ticket in <b>#security-operations</b> and tag the security-ops group.</li>
<li>Add an internal note that references the Slack post, so there is an audit trail. Set the <b>legal due date to 10 calendar days</b> after receipt.</li>
<li>If Security has not responded by the due date, follow up in the same Slack thread. When they reply, do what they say. That may be asking the owner to take content down, or putting the site in Maintenance Mode.</li>
</ol>
<p>Valid content review tickets are also logged in the team tracker spreadsheet.</p>
<h4>Hard stops</h4>
<ul>
<li><b>Never paste questionable images into Slack.</b> They can be upsetting for colleagues. Describe them in words in an internal note and keep screenshots on the ticket.</li>
<li><b>CSAM and NCMEC reports are top priority.</b> Handle them at policy level only: follow the lead's instructions, escalate immediately, and do not discuss the material beyond what the process needs.</li>
<li>A site that a security lead shut down by hand is <b>never re-enabled by the SOC</b>. For an unpaid sandbox that was disabled manually, route the request to #security-operations for review. The "no malware found" logic does not apply, because the problem is content, not code.</li>
</ul>
<p><b>Field practice, not official policy.</b> In recent months the SOC lead has asked that any NCMEC notification be actioned on the first report. People who run these campaigns often write in to support asking for their site to come back, so a ticket that reads "no malware found, why was it disabled?" on a hand-disabled site should go to the security lead before you answer.</p>`,
    lab: [
      `Open the Content Review Requests playbook (link in References). Write down, in your own words, the five steps and the due date rule. Note which Slack channel and which group you tag.`,
      `Open the Handling Forwarded Security and Compliance Reports playbook. Find the line that says who must be copied on every communication, and the line that says when the internal ticket may be closed.`,
      `Scenario A. A colleague in another department forwards this to abuse@pantheon.io: <blockquote>Forwarded: a person writes that the site <code>shop.blog-demo.example.test</code> copies their artwork without permission and asks for removal. They want a reply by the end of the week.</blockquote> List every ticket you create, who is on CC, and what internal note goes where. Which process also applies: DMCA or content review? (Hint: you will refine this on Day 7.)`,
      `Scenario B. A new ticket reaches your queue: <blockquote>Hello, my site <code>fresh-news.example.test</code> was disabled. I do not understand why, the scan found nothing. Please turn it back on today.</blockquote> The dashboard shows the site was disabled manually by a security lead. What do you do first, and what do you tell the customer? Write your answer, then compare it with the Know-how tab.`,
      `Scenario C. Someone on your team wants to paste a screenshot of a reported page into #security-operations to show the problem. What do you tell them, and what do you do instead?`,
    ],
    knowhow: `<p><b>Scenario A model answer.</b> Two tickets. First, acknowledge the internal ticket with an internal note. Second, open a new proactive ticket to the original complainant, CC the colleague who forwarded it and Legal. Once the proactive ticket exists, add an internal note on the original: "Acknowledgment ticket created" with a pointer to it. Because the complaint is about copied artwork, it is a copyright matter, so follow the DMCA process (Day 7) and not content review. Close the internal ticket only after the proactive one is resolved.</p>
<p><b>Scenario B model answer.</b> Do not re-enable the site, and do not promise a date. A manually disabled site is the security lead's decision, and you cannot rule out that this is content abuse rather than malware. Ask in #security-operations (or the SOC lead in #cse-soc) for a review, add the dashboard link to the ticket notes, and give the customer a neutral holding reply that the site is under review. Do not explain what triggered the disabling.</p>
<p><b>Scenario C model answer.</b> No. Keep the image on the Zendesk ticket as an internal note if the process needs it, and in Slack write a short text description plus the ticket link. Colleagues who need to see it can open the ticket on purpose.</p>
<p><b>Field practice, not official policy.</b> Posts that contain only a ticket link slow the reviewer down. Add the site or dashboard link and a one-line summary in the ticket notes so the person acting does not have to dig.</p>`,
    quiz: [
      {
        q: "A colleague forwards an external complaint to abuse@pantheon.io. How many tickets does the playbook expect you to end up with?",
        o: [
          "One, the internal ticket, answered by replying to the colleague",
          "Two: the internal ticket and a new proactive ticket to the original complainant",
          "Two, but both addressed to the colleague",
          "Three: internal, complainant and site owner, always",
        ],
        a: 1,
        w: "The internal ticket is acknowledged, and a new proactive ticket goes to the original external complainant with the internal contact on CC. A site-owner ticket is created only if the process for that report type calls for it.",
      },
      {
        q: "Who must be copied on every communication for a forwarded report?",
        o: ["The customer's CSM", "Legal", "The whole Abuse team", "Nobody, to keep the thread short"],
        a: 1,
        w: "The playbook says Legal should be CC'd in every communication. The forwarding internal contact is also kept on CC.",
      },
      {
        q: "What is the SLA for processing a content review request, and where do you cross-share it?",
        o: [
          "48 hours, #cse-soc",
          "5 business days, #cse-support",
          "10 calendar days, #security-operations",
          "14 days, #security-operations",
        ],
        a: 2,
        w: "Content review requests are processed within 10 calendar days and cross-shared in #security-operations. Set the legal due date to 10 calendar days from receipt.",
      },
      {
        q: "A hand-disabled sandbox site's owner asks you to turn it back on because no malware was found. What do you do?",
        o: [
          "Re-enable it once the owner confirms the code is clean",
          "Re-enable it after the next automated scan passes",
          "Do not re-enable it, and request a review in #security-operations",
          "Move it to a paid plan so it cannot be disabled",
        ],
        a: 2,
        w: "The SOC does not re-enable a site that was manually disabled by a security lead. Route the request to #security-operations for review. For content problems, a clean code scan proves nothing.",
      },
      {
        q: "Why should you not paste screenshots of questionable content into Slack?",
        o: [
          "Slack compresses images",
          "It can be upsetting for colleagues, so keep it on the ticket and describe it in text",
          "Screenshots are not allowed on Zendesk either",
          "It breaks the audit trail",
        ],
        a: 1,
        w: "The playbook explicitly warns against attaching photos of questionable content in Slack because they may be triggering. Write a text description and link the ticket instead.",
      },
    ],
    refs: [
      { t: "Playbook: Handling Forwarded Security and Compliance Reports", u: CONF + "3895132464" },
      { t: "Playbook: Content Review Requests", u: CONF + "2352383819" },
    ],
  },
  {
    id: 7,
    week: 2,
    mins: 45,
    title: "DMCA and copyright complaints",
    goal: "Run a DMCA complaint through all five phases, validate a notice and a counter-notice against their checklists, and know where the written process is inconsistent.",
    plan: [
      ["Learn", 18],
      ["Lab", 22],
      ["Quiz", 5],
    ],
    learn: `<p>The Digital Millennium Copyright Act (DMCA) lets a copyright owner send a takedown notice to a hosting provider. If the provider acts quickly once notified, it keeps its safe-harbor protection. That is why this process is driven by legal deadlines. Acknowledge immediately and tell the customer as soon as possible.</p>
<h4>The five phases</h4>
<ol>
<li><b>Verification.</b> Confirm that Pantheon hosts the site (Looker, Sibyl, DNS lookup, or the <code>pantheon_healthcheck</code> path). If it does not, use the "Pantheon does not host the site" macro and close.</li>
<li><b>Complainant communication.</b> Tell the complainant whether the notice is complete.</li>
<li><b>Pantheon customer communication.</b> Notify the site owner (valid notices only).</li>
<li><b>Counter notification</b> (if the owner disputes it).</li>
<li><b>Follow-up and check-in.</b></li>
</ol>
<h4>Six elements of a valid notice</h4>
<table><thead><tr><th>#</th><th>Element</th></tr></thead><tbody>
<tr><td>1</td><td>A physical or electronic signature of an authorized person</td></tr>
<tr><td>2</td><td>Identification of the copyrighted work (or a representative list)</td></tr>
<tr><td>3</td><td>Identification and location of the infringing material on the Pantheon site</td></tr>
<tr><td>4</td><td>Contact information of the complainant</td></tr>
<tr><td>5</td><td>A good-faith belief statement that the use is unauthorized</td></tr>
<tr><td>6</td><td>A statement of accuracy and authority, under penalty of perjury</td></tr>
</tbody></table>
<h4>Complainant side</h4>
<ul>
<li><b>Valid:</b> use the macro for "response to complaining party if notice is complete and valid", add a screenshot of the copyright notice on the site as an internal note, set Pending, and go on to the customer.</li>
<li><b>Incomplete:</b> use the macro for "response to complaining party on incomplete information", list what is missing, and move the legal due date to <b>5 business days</b> from today.</li>
<li><b>No reply in 48 hours:</b> the matter is closed. Send the "Denial of takedown notice" macro and close the ticket.</li>
</ul>
<h4>Customer side</h4>
<p>For a valid notice, create a proactive ticket: requester is the site owner and team members, assignee Abuse, priority High, S&amp;C Issue checked with Issue Type DMCA, and Party set to Site Owner. Apply the "DMCA: Notice to Site Owner" macro and fill in the reporting entity, domain, due date and a copy of the notice. Link the two tickets in internal notes. The page says to put the reported site in <b>Maintenance Mode right away, paid or unpaid</b>, because the law expects expeditious action.</p>
<h4>Counter notification</h4>
<p>The owner may counter-notify when content was removed by mistake or misidentification (fair use is one example). A valid counter-notice has four elements:</p>
<ol>
<li>A signature (physical, or a typed full legal name)</li>
<li>Identification and location of the removed material</li>
<li>A statement under penalty of perjury of a good-faith belief that it was a mistake or misidentification</li>
<li>Full legal name, address and phone, with consent to US Federal District Court jurisdiction and acceptance of service of process from the complainant</li>
</ol>
<p>Incomplete: use the counter-notification incomplete-information macro. Complete: send it to the <i>complaining party</i> (the macro name says "to site owner", which is a misnomer). Content is reinstated after the reinstatement period unless the complainant says it will take legal action.</p>
<h4>Known inconsistencies, so confirm before you act</h4>
<ul>
<li><b>Reinstatement period.</b> The process page says the 14th day after the counter-notice is delivered. The response templates say 14 <i>business</i> days. Those are different dates.</li>
<li><b>Maintenance Mode timing.</b> The process page says immediately. The site-owner template says the site goes to Maintenance Mode if the owner does not remove the content by the deadline.</li>
<li><b>Follow-up phase.</b> The Follow-Up/Check-In section of the process page is empty, so there is no written step for it.</li>
<li><b>Names.</b> The templates page uses numbered names (Template 1 to 8) while the process page uses descriptive macro names. The mapping is not written down.</li>
<li><b>Stale page.</b> The process page is being revised.</li>
</ul>
<p><b>Field practice, not official policy.</b> Agents have reported that they could not find some of the templates or macros named in the DMCA page. The SOC lead has said the page is being revised, and in the meantime the ticket may be handed to a senior queue. DMCA and copyright tickets are among the first the lead asks people to work on in a backlog. When any of the above blocks you, ask in #cse-soc before you send anything with a date in it.</p>`,
    lab: [
      `Open the DMCA/Copyright Complaint Process page (link in References). Build your own one-page flowchart of the five phases and mark every number and time limit on it.`,
      `Open the DMCA/Trademark Response Templates page and find the text that gives the reinstatement period for a counter-notice. Then find the same period on the process page. Write down both values and what they imply.`,
      `Scenario A. You receive: <blockquote>To the hosting provider: the page <code>https://gallery.demo-host.example.test/photos</code> shows our photographs without license. Please remove them. Signed, the Studio team.</blockquote> Check each of the six elements. Which are present, which are missing, which macro do you send, and what due date do you set?`,
      `Scenario B. You sent the incomplete-information macro to the complainant in Scenario A. Two days later there is still no answer. What happens next?`,
      `Scenario C. A complete, valid notice arrives for <code>portfolio.demo-studio.example.test</code>, which sits on a free sandbox site. Walk through the customer ticket: requester, assignee, priority, issue type, macro, and what you do with the site. What would change if the site were on a paid plan?`,
      `Scenario D. The site owner replies with a letter that has a typed full name and says "I believe this was a mistake because it is my own photo", and nothing else. Check it against the four counter-notice elements. Which macro do you use, and which date do you not state until you have checked in #cse-soc?`,
    ],
    knowhow: `<p><b>Scenario A.</b> Present: the contact is partly there (a team name only), the location of the material (the URL) and a rough signature (a team name, which may not count as the signature of an authorized person). Missing or unclear: identification of the copyrighted work, the good-faith statement and the statement under penalty of perjury. So the notice is incomplete. Send the incomplete-information macro, list what is missing, set Pending and move the legal due date to 5 business days from today.</p>
<p><b>Scenario B.</b> If there is no response for 48 hours the matter is treated as closed. Send the "Denial of takedown notice" macro and close the ticket. (If the complainant replies later with a complete notice, start again from verification.)</p>
<p><b>Scenario C.</b> Create a proactive ticket: requester is the site owner and team members, assignee Abuse, priority High, S&amp;C Issue = DMCA, Party = Site Owner, plus the site UUID, label and support tier. Apply the "DMCA: Notice to Site Owner" macro and fill in the fields. Add the complainant ticket reference to an internal note. Per the written process, put the site in Maintenance Mode right away. That applies to a paid site as well as an unpaid one. Before you do it on a paid site, check #cse-soc, because the template wording (Maintenance Mode only if the owner misses the deadline) disagrees with the process text, and tell your team lead.</p>
<p><b>Scenario D.</b> Signature: a typed name is acceptable. Identification and location of the removed material: missing. Penalty of perjury statement: missing, because "I believe" is not enough on its own. Contact details and consent to jurisdiction: missing. So it is incomplete. Use the counter-notification incomplete-information macro. Do not tell anyone the content will return on a given date, because the 14th day versus 14 business days question is unresolved. Confirm it in #cse-soc.</p>
<p><b>Field practice, not official policy.</b> If a macro or template named in the playbook does not exist in Zendesk, do not improvise legal wording. Post in #cse-soc, say which macro you looked for, and let the lead decide whether Legal should answer directly.</p>`,
    quiz: [
      {
        q: "How many elements make a DMCA notice valid, and what does the owner of the work have to state under penalty of perjury?",
        o: [
          "Four; that the site is hosted on Pantheon",
          "Six; the accuracy of the notice and their authority to act for the owner",
          "Six; that the site owner is a repeat infringer",
          "Five; that they will file a lawsuit",
        ],
        a: 1,
        w: "The notice needs six elements. The last one is a statement of accuracy and authority, made under penalty of perjury.",
      },
      {
        q: "A DMCA notice arrives with missing elements. What do you do?",
        o: [
          "Send the incomplete-information macro, list what is missing, and move the legal due date to 5 business days",
          "Close the ticket immediately",
          "Put the site in Maintenance Mode anyway",
          "Forward the ticket to the site owner as-is",
        ],
        a: 0,
        w: "Incomplete notices get the incomplete-information macro with the gaps listed, and a new legal due date of 5 business days from today.",
      },
      {
        q: "The complainant has not answered the incomplete-information reply for 48 hours. What is next?",
        o: [
          "Wait another 5 business days, with no action",
          "Treat the matter as closed, send the Denial of takedown notice macro, and close the ticket",
          "Escalate to the site owner",
          "Put the site in Maintenance Mode",
        ],
        a: 1,
        w: "No complainant response in 48 hours means the matter is closed, so send the Denial of takedown notice macro and close.",
      },
      {
        q: "Which statement about the counter-notice reinstatement period is true?",
        o: [
          "The process page and the templates agree, so you can quote either",
          "The process page says the 14th day, the templates say 14 business days, so confirm in #cse-soc",
          "It is always 48 hours",
          "Reinstatement is never allowed",
        ],
        a: 1,
        w: "The two sources disagree (14th day versus 14 business days). Do not state a date to anyone until it has been confirmed in #cse-soc.",
      },
      {
        q: "A valid DMCA notice arrives for a paid site. According to the process page, what happens to the site?",
        o: [
          "Nothing until the owner replies",
          "It goes into Maintenance Mode, paid or unpaid",
          "Only unpaid sites are put into Maintenance Mode",
          "It is deleted",
        ],
        a: 1,
        w: "The process page says to put the reported site in Maintenance Mode immediately, whether paid or unpaid. The site-owner template ties it to the deadline, which is another reason to confirm in #cse-soc.",
      },
    ],
    refs: [
      { t: "Primer: DMCA, Copyright and Trademark Complaints", u: CONF + "2632613925" },
      { t: "Process: DMCA/Copyright Complaint Process", u: CONF + "2632515677" },
      { t: "Templates: DMCA/Trademark Response Templates", u: CONF + "2705719457" },
    ],
  },
  {
    id: 8,
    week: 2,
    mins: 35,
    title: "Trademark complaints and choosing the right process",
    goal: "Handle a trademark complaint with its four phases, and pick between DMCA, trademark and content review for a new report.",
    plan: [
      ["Learn", 12],
      ["Lab", 18],
      ["Quiz", 5],
    ],
    learn: `<p>A trademark is a sign, design or expression that identifies a company's goods. A service mark does the same for services. <b>Trademark complaints do not fall under the DMCA.</b> The DMCA is about copyright. Something that is trademarkable usually cannot be copyrighted and vice versa, although a logo can be both. Because of that, trademark has its own, shorter process.</p>
<h4>Four phases</h4>
<ol>
<li><b>Verification.</b> Confirm Pantheon hosts the site. If not, send the "site not hosted" macro and close.</li>
<li><b>Complainant communication.</b></li>
<li><b>Pantheon customer communication.</b></li>
<li><b>Follow-up and check-in.</b> This section is empty in the written process.</li>
</ol>
<p>There is <b>no counter-notice phase</b>. That is the main structural difference from DMCA.</p>
<h4>Three-element checklist</h4>
<ol>
<li>The specific URL where the content is located</li>
<li>Contact information of the complainant</li>
<li>Proof of trademark ownership, or authority to enforce it</li>
</ol>
<p>If anything is missing, send the incomplete-information response, list what is missing, and set the legal due date to 5 business days. If the complainant does not reply within 48 hours, the matter is closed and you close the ticket.</p>
<h4>Customer ticket</h4>
<p>Create a new ticket: requester is the site owner, assignee Abuse, priority High, S&amp;C Issue checked with Issue Type = <b>Trademark</b>, Party = Site Owner, and a legal due date of 5 days from receipt. Send the "Notice to Site Owner" response and set Pending.</p>
<h4>Cautions</h4>
<ul>
<li>The trademark page uses numbered names ("Template 1", "Template 2", "Template 5"), while the DMCA page uses descriptive macro names. The mapping is not written down.</li>
<li>The "Notice to Site Owner" template is written for the DMCA. It mentions counter-notices and the copyright statute. The process page does not say how to adapt it for trademark, and it has no Maintenance Mode instruction for trademark. Confirm the wording and any Maintenance Mode step in #cse-soc before sending.</li>
</ul>
<h4>Compare the three processes</h4>
<table><thead><tr><th></th><th>DMCA (copyright)</th><th>Trademark</th><th>Content review</th></tr></thead><tbody>
<tr><td>What it is about</td><td>Copied creative work</td><td>Misuse of a brand name or mark</td><td>Illegal, violent, pornographic or unethical content</td></tr>
<tr><td>Phases</td><td>5</td><td>4</td><td>5 steps</td></tr>
<tr><td>Checklist</td><td>6 elements</td><td>3 elements</td><td>Not a checklist, you review the content</td></tr>
<tr><td>Counter-notice</td><td>Yes</td><td>No</td><td>No</td></tr>
<tr><td>Clock</td><td>48h no reply closes, 5 business days for missing info</td><td>Same 48h and 5 business days, plus 5 days from receipt</td><td>10 calendar days</td></tr>
<tr><td>Decision maker after intake</td><td>Written process, Legal on CC</td><td>Written process, Legal on CC</td><td>Security, via #security-operations</td></tr>
</tbody></table>
<p><b>Field practice, not official policy.</b> Legal sometimes forwards priority complaint tickets to the Abuse queue, and the lead may allow you to contact the complainant directly when Legal says so. When you cannot tell whether a complaint is copyright or trademark (for example, a logo), ask Legal or #cse-soc rather than guessing.</p>`,
    lab: [
      `Open the Trademark/Service Mark Complaint Process page (link in References). Find the three-item checklist and the due date rule. Then open the DMCA process page and write down two things the trademark process does not have.`,
      `Scenario A. Choose a process (DMCA, trademark or content review) for each report, and say why: <blockquote>1. "The site <code>cheap-sneakers.example.test</code> uses our brand name and logo to sell fakes." 2. "The page <code>blog.news-demo.example.test/story</code> copies my article word for word." 3. "The page <code>forum.chat-demo.example.test/post</code> hosts content that glorifies violence."</blockquote>`,
      `Scenario B. You receive this: <blockquote>We represent the owner of the ExampleBrand brand. The website <code>examplebrand-deals.example.test</code> is infringing our trademark. Regards, the Brand Protection team.</blockquote> Check against the three-item checklist. What is missing, which response do you send, and which due date do you set?`,
      `Scenario C. In Scenario B the complainant sends everything the next day. Describe the customer ticket you create and say which parts of the "Notice to Site Owner" template need a second look before sending.`,
    ],
    knowhow: `<p><b>Scenario A.</b> 1: trademark, because it is about a brand name and logo (if the logo is also copyrighted, confirm with Legal or in #cse-soc). 2: DMCA, because it is copied text, a copyrighted work. 3: content review, handled through #security-operations with the 10-calendar-day clock.</p>
<p><b>Scenario B.</b> The URL of the content is present only as the domain, so it is acceptable, but there is no clear contact information beyond a team name and no proof of ownership or authority to enforce. Send the incomplete-information response, list what is missing (contact details and proof of trademark ownership), and move the legal due date to 5 business days. If nothing arrives in 48 hours the matter is closed.</p>
<p><b>Scenario C.</b> New ticket: requester is the site owner, assignee Abuse, priority High, S&amp;C Issue = Trademark, Party = Site Owner, legal due date 5 days from receipt, with site UUID, org UUID if relevant, site plan and label. Send the notice to the site owner and set Pending. Before sending, check the template: it is written for the DMCA, so references to counter-notices and the copyright statute do not apply to trademark. Also there is no written Maintenance Mode step for trademark. Confirm both in #cse-soc.</p>`,
    quiz: [
      {
        q: "Which statement about trademark complaints is correct?",
        o: [
          "They are handled under the DMCA with the same six elements",
          "They are not covered by the DMCA and have their own 4-phase process",
          "They are handled as content review",
          "They never need verification of hosting",
        ],
        a: 1,
        w: "Trademark does not fall under the DMCA. Its process has four phases and a three-element checklist.",
      },
      {
        q: "What are the three elements of a valid trademark complaint?",
        o: [
          "Signature, contact information, penalty of perjury",
          "URL of the content, contact information, proof of trademark ownership or authority",
          "Screenshot, invoice, legal letter",
          "Site UUID, org UUID, plan",
        ],
        a: 1,
        w: "The checklist is: the specific URL of the content, contact information, and proof of ownership or authority to enforce.",
      },
      {
        q: "What does the trademark process have that DMCA has not, and what does it lack?",
        o: [
          "It has a counter-notice phase and lacks verification",
          "It has nothing extra and lacks the 48-hour rule",
          "It has no counter-notice phase, so four phases instead of five",
          "It has a 14-day reinstatement window",
        ],
        a: 2,
        w: "Trademark has four phases and no counter-notice phase.",
      },
      {
        q: "A report says a page copies someone's article word for word. Which process?",
        o: ["Trademark", "DMCA", "Content review", "Data erasure"],
        a: 1,
        w: "Copied creative work is a copyright matter, so it follows the DMCA process.",
      },
    ],
    refs: [
      { t: "Process: Trademark/Service Mark Complaint Process", u: CONF + "2632876301" },
      { t: "Templates: DMCA/Trademark Response Templates", u: CONF + "2705719457" },
      { t: "Primer: DMCA, Copyright and Trademark Complaints", u: CONF + "2632613925" },
    ],
  },
  {
    id: 9,
    week: 2,
    mins: 45,
    title: "Security scans and penetration tests",
    goal: "Answer a scan or pen-test permission request with the right macro, route formal approvals and scan findings correctly, and use the canned technical answers without over-promising.",
    plan: [
      ["Learn", 18],
      ["Lab", 22],
      ["Quiz", 5],
    ],
    learn: `<p>Customers scan their own sites, and sometimes ask permission first. Pantheon's position is simple: <b>Pantheon does not directly handle or facilitate these tests.</b> They are application-level assessments run by the customer with third-party tools. The customer owns the security of their own application: core, modules, themes, plugins, custom code, configuration and content.</p>
<h4>Permission requests</h4>
<ol>
<li>Reply with the Zendesk macro <b>"Vulnerability Scan Penetration Testing"</b>. The key points are that they may proceed when convenient, that Pantheon <b>does not block scanning activity and does not allowlist scanner IP addresses</b>, that the platform blocks malicious traffic so occasional false positives are possible, and that they should tell you if the scan returns an actionable issue.</li>
<li>If the customer needs <b>formal approval</b> (an authorization signature), submit a ticket in the Pantheon Helpdesk, attach their documents, assign it to the <b>InfoSec</b> team, and share the ticket link in <b>#security-operations</b>.</li>
<li>If the customer comes back with scan results, follow the scan-concern procedure below.</li>
</ol>
<h4>Scan-concern procedure</h4>
<ol>
<li>Identify and validate the concern. Make sure the scan report is attached.</li>
<li>Make sure the report has valid IP addresses and ports.</li>
<li>With a detailed summary, the scan report, and the IPs and ports, post in <b>#security-operations</b> with a short summary and the ticket or chat link. The team works in specific time zones, so <b>do not use @here</b>.</li>
<li>Paste the Slack message link into an internal note on the ticket.</li>
<li>Update the customer: it has been forwarded to the security team and is being investigated.</li>
</ol>
<p>For other security concerns you do not fully understand, check with a senior colleague or manager, who will point you to the right channel.</p>
<h4>Canned technical answers</h4>
<p>The General Questions about Security Scans page keeps standard answers. It says plainly that it does not cover every case. Match the finding, then reply with the idea behind it. Do not promise configuration changes.</p>
<table><thead><tr><th>Finding</th><th>Gist of the answer</th></tr></thead><tbody>
<tr><td>Weak ciphers, no forward secrecy</td><td>Kept for older clients. They are never negotiated with clients that can do better, and SSL Labs does not penalize them.</td></tr>
<tr><td>Weak ciphers due to SHA-1</td><td>SHA-1 is approved for HMAC, which is its role in those suites (NIST SP 800-57). The certificate itself is signed with SHA-256.</td></tr>
<tr><td>PCI "scan interference", with a request to allowlist scanner IPs</td><td>Do not allowlist. The CDN uses SNI to present the right certificate, so scanning by IP address alone gets a different response. Scan the domain name as well.</td></tr>
<tr><td>No HSTS</td><td>Not on by default because it does not suit every domain. Customers enable it with <code>enforce_https</code> in <code>pantheon.yml</code>, or through a Drupal module or WordPress plugin.</td></tr>
<tr><td>HTTP TRACE / reverse-proxy CVEs</td><td>The global CDN does not support TRACE, and it returns HTTP 405.</td></tr>
<tr><td>Slow HTTP POST</td><td>The CDN terminates connections, so incomplete ones never reach the site. Dev and Test have the same protection, so customers can test there.</td></tr>
<tr><td>ROBOT</td><td>The CDN does not use a vulnerable TLS RSA implementation. Suggest the customer dispute the finding.</td></tr>
<tr><td>ICMP timestamp response</td><td>Acknowledge it. It is low risk and there are no plans to change it.</td></tr>
<tr><td>Certificate CN does not match</td><td>The hostname is in the certificate's SAN, so the intent of the PCI guide is met. Suggest the customer dispute it.</td></tr>
</tbody></table>
<p><b>Field practice, not official policy.</b> A customer's pen test that says server software (such as nginx or MariaDB) is behind the latest version is not a SOC ticket and not something to answer from this table. It goes to #security-operations, where the security lead decides what can be disclosed. Replies can take days, so set that expectation with the customer and keep the Slack link in the ticket.</p>`,
    lab: [
      `Open the Responding to Security Scan/Penetration Test Requests page (link in References). Copy the key phrases of the macro into your notes in your own words. Which two things does Pantheon say it does not do?`,
      `Open the General Questions about Security Scans page and find the answers for HSTS, TRACE and "scan interference". Write each in one sentence you would be comfortable sending to a customer.`,
      `Scenario A. <blockquote>We are the security team at <code>bank-demo.example.test</code>. We plan to run a penetration test next week from these IP ranges. Please allowlist them so our scanner is not blocked, and confirm that Pantheon approves.</blockquote> What do you send, what do you refuse, and what do you do if they then say their auditor needs a signed authorization?`,
      `Scenario B. <blockquote>Our PCI scan failed with "scan interference". It reports that we should allowlist the scanner at your side. Can you do that?</blockquote> Which canned answer applies, and what do you ask them to change?`,
      `Scenario C. <blockquote>Our pen test report says your platform runs an outdated nginx and an old MariaDB. Please confirm when they will be upgraded.</blockquote> Do you answer from the canned table? Where does it go, and what do you tell the customer?`,
      `Scenario D. A customer sends scan results with a list of findings but no IP addresses or ports. What do you do before posting in Slack?`,
    ],
    knowhow: `<p><b>Scenario A.</b> Send the "Vulnerability Scan Penetration Testing" macro: they may proceed, Pantheon does not block scanning and does not allowlist scanner IPs. Refuse the allowlist request and do not give approval yourself. If they need a signed authorization, submit a Helpdesk ticket assigned to InfoSec with their documents attached, then share that ticket link in #security-operations (no @here), and tell the customer InfoSec will follow up.</p>
<p><b>Scenario B.</b> The PCI "scan interference" answer: the CDN uses SNI, so a request by IP address without a domain gets a different response. The customer should scan the domain name in addition to the IP. Do not allowlist anything.</p>
<p><b>Scenario C.</b> Do not answer from the table. Post a short summary and the ticket link in #security-operations, paste the Slack link into an internal note, and tell the customer it has been forwarded to the security team and is being investigated. Do not promise upgrade dates or disclose version details.</p>
<p><b>Scenario D.</b> Ask for the missing information. The procedure needs valid IP addresses and ports in the report before you escalate. Once you have the summary, the report, and the IPs and ports, post in #security-operations and add the Slack link to an internal note.</p>
<p><b>Field practice, not official policy.</b> Write the summary so a reader who has never seen the ticket understands it: what the customer asked, what you already told them, what you need from Security.</p>`,
    quiz: [
      {
        q: "A customer asks Pantheon to allowlist their scanner IP addresses before a pen test. What is the correct answer?",
        o: [
          "Allowlist them for 24 hours",
          "Pantheon does not block scanning and does not allowlist scanner IPs, and the macro says so",
          "Forward the IPs to the CDN team",
          "Ask the customer to scan from Pantheon IPs",
        ],
        a: 1,
        w: "The macro states that Pantheon does not block scanning activity and does not allowlist scanner IP addresses.",
      },
      {
        q: "A customer needs a signed authorization for a pen test. What do you do?",
        o: [
          "Sign it yourself as Support",
          "Submit a Helpdesk ticket assigned to InfoSec and share the link in #security-operations",
          "Post it in #cse-soc with @here",
          "Tell them Pantheon cannot help",
        ],
        a: 1,
        w: "Formal approval goes through a ticket in the Helpdesk assigned to InfoSec, with the link shared in #security-operations.",
      },
      {
        q: "When posting a scan concern in #security-operations, which is correct?",
        o: [
          "Use @here so it is seen quickly",
          "Do not use @here, and paste the Slack link into an internal note",
          "Post only the customer name",
          "Post it in a DM",
        ],
        a: 1,
        w: "The security team works in specific time zones, so no @here. The Slack message link goes into an internal note so everyone can follow.",
      },
      {
        q: "A scanner says HSTS is missing. What is the right response?",
        o: [
          "Pantheon will enable it for you",
          "It is not on by default, and the customer can enable it through enforce_https in pantheon.yml",
          "HSTS cannot be used on Pantheon",
          "Disable HTTPS",
        ],
        a: 1,
        w: "HSTS is opt-in per site, available through the enforce_https directive in pantheon.yml, or through a Drupal module or WordPress plugin.",
      },
      {
        q: "A pen test says the platform's nginx is out of date. Where does this go?",
        o: [
          "Answer from the canned scan table",
          "#security-operations, because it is a version finding the security lead decides on",
          "Close it as out of scope",
          "The account manager only",
        ],
        a: 1,
        w: "This is field practice. Version-string findings are handled in #security-operations, since the security lead decides what can be disclosed.",
      },
    ],
    refs: [
      { t: "Playbook: Security Scans/Penetration Tests (index)", u: CONF + "2352743864" },
      { t: "Playbook: General Questions about Security Scans", u: CONF + "47579228" },
      { t: "Playbook: How to handle vulnerability/security scan concerns", u: CONF + "2115010790" },
      { t: "Playbook: Responding to Security Scan/Penetration Test Requests", u: CONF + "99942409" },
    ],
  },
  {
    id: 10,
    week: 2,
    mins: 40,
    title: "Compliance requests and what is not SOC work",
    goal: "Answer SOC 2, questionnaire and common security requests correctly, handle bug reporters, and recognise asks that belong elsewhere.",
    plan: [
      ["Learn", 15],
      ["Lab", 20],
      ["Quiz", 5],
    ],
    learn: `<h4>SOC 2 and compliance documents</h4>
<p>SOC 2 reports go <b>only to contract customers</b>. They require an NDA, and only contract customers are eligible for one.</p>
<ol>
<li>Point the requester to the Pantheon Trust Center at <code>trust.pantheon.io</code>. Some documents are behind an NDA: the requester clicks <b>Request Access</b> and the compliance team sends a copy.</li>
<li>If self-service does not work, decide whether the customer is contract or non-contract. Open the site dashboard: a <b>Billing tab appears only for non-contract sites</b>.</li>
<li>Contract customer who cannot get access: find their <b>CSM</b> (through the Salesforce widget in the Zendesk ticket, or ask in #csm) and send the request to the CSM.</li>
<li>Non-contract or pre-sale: use the canned reply. Pantheon cannot provide SOC 2 reports for accounts that are not on an Enterprise Contract, and the privacy policy at <code>legal.pantheon.io</code> is offered as a statement of security controls.</li>
</ol>
<p><b>Security questionnaires.</b> Support does not fill them in. Forward the request to the customer's account manager and share the public trust site. If an agency manages the site, tell the customer to go through the agency's AM or CSM.</p>
<h4>Common security requests</h4>
<table><thead><tr><th>Request</th><th>Answer</th></tr></thead><tbody>
<tr><td>Blacklisted on spam services</td><td>Ask for specifics (the actual rejection). It is rarely Pantheon's fault. A common cause is bad SPF records. The default platform mail servers have a poor reputation and are always on Spamhaus lists, so recommend a third-party email provider. For Spamhaus DBL, use A or AAAA records instead of CNAMEs for subdomains such as www.</td></tr>
<tr><td>Site in Maintenance Mode for malware</td><td>The automatic detector matched a signature, and the platform rescans after the code is removed. If it looks legitimate, run <code>btool check-for-spam</code> on the Dev appserver to list the files. Do not reveal triggering files to customers. Paid sites are not shut down automatically.</td></tr>
<tr><td>Unknown change to a site</td><td>Search Logz.io (login through Okta) by site ID, over the last two weeks.</td></tr>
<tr><td>Security researchers testing the platform</td><td>Allowed. They are on our side. See bug reporters below.</td></tr>
<tr><td>Remove the .well-known/acme-challenge path</td><td>Cannot. It is required for Let's Encrypt issuance and renewal, and it is served by the platform, not the customer's CMS.</td></tr>
<tr><td>Encryption</td><td>AES256 at rest, TLS 1.2 in transit. For field-level encryption on Drupal, use the Encrypt module with key management.</td></tr>
<tr><td>HIPAA</td><td>Pantheon is <b>not HIPAA compliant</b>. No plugin makes it so.</td></tr>
<tr><td>CCPA</td><td>Point to the contract language at legal.pantheon.io.</td></tr>
<tr><td>Response to a named attack or vulnerability</td><td>Check the Public Vulnerability Disclosures page. If it is not listed, ask #security-operations.</td></tr>
</tbody></table>
<h4>Bug reporters</h4>
<p><b>Support does not review or relay bug reports to InfoSec.</b> Send the canned BugCrowd reply: the reporter creates a BugCrowd account and emails the account ID to infosec@pantheon.io, and InfoSec invites them to the program.</p>
<h4>What is NOT SOC work</h4>
<p><b>Field practice, not official policy.</b> The SOC lead has said that CVE impact questions and general technical security tickets are not SOC responsibilities and should go to technical support or Security. Questions about breach-notification timelines, data residency, government cloud approvals, PCI scan findings and pen test results are handled in #security-operations, not in the SOC queue. For an upcoming embargoed advisory (for example a Drupal core release), you cannot disclose details before the official advisory. Tell the customer that details cannot be shared before it is published, and that Pantheon communicates through its release notes. Ask the security lead what you may say, and expect replies to take days.</p>`,
    lab: [
      `Open the SOC2, Compliance, and Security Policy Requests page (link in References). Write the four steps as a checklist, and note where the Billing tab rule comes in. Then open the Common Security-related Customer Requests page and find the answers for encryption, HIPAA and the .well-known path. Write one sentence for each.`,
      `Scenario A. <blockquote>Hi, we are evaluating Pantheon for <code>retail-demo.example.test</code>. Please send us your latest SOC 2 report today.</blockquote> The dashboard of their sandbox site shows a Billing tab. What is your reply?`,
      `Scenario B. <blockquote>We are an existing enterprise customer at <code>health-demo.example.test</code> and cannot open the report on the trust site. Also, can you confirm you are HIPAA compliant?</blockquote> Who gets the request, and what do you say about HIPAA?`,
      `Scenario C. <blockquote>Our emails to <code>mail-demo.example.test</code> recipients bounce. The mail provider says we are on a blacklist. Please remove us.</blockquote> What do you ask for first and what do you check?`,
      `Scenario D. <blockquote>I am a researcher. I found a way to read other tenants' data on your platform. Please escalate to your security team and confirm the bounty.</blockquote> What do you send, and what do you not do?`,
      `Scenario E. <blockquote>A Drupal security advisory is announced for next week. Which Pantheon sites are affected and what will you do?</blockquote> Is this a SOC ticket? What do you say?`,
    ],
    knowhow: `<p><b>Scenario A.</b> The Billing tab means non-contract. Send the canned reply: Pantheon cannot provide SOC 2 reports for accounts that are not on an Enterprise Contract. Point them to <code>trust.pantheon.io</code> for the public documents and to the privacy policy at <code>legal.pantheon.io</code> as a statement of security controls. If they are in a sales cycle, the account manager is the next contact.</p>
<p><b>Scenario B.</b> Contract customer, so first send the Trust Center link and the Request Access step. If that does not work, find their CSM through the Salesforce widget or ask in #csm, and send the request to the CSM. On HIPAA: Pantheon is not HIPAA compliant, no plugin changes that, and do not make any promise or date.</p>
<p><b>Scenario C.</b> Ask for the exact rejection message or the report from the blacklist service. Pantheon is rarely the cause of a single-site listing. Check the domain's SPF records. If the problem is the default platform mail servers, recommend a third-party email service. If the listing involves Spamhaus DBL, check that subdomains use A or AAAA records rather than CNAMEs.</p>
<p><b>Scenario D.</b> Send the canned bug reporter reply: sign up for BugCrowd and email the account ID to infosec@pantheon.io so InfoSec can invite them. Support does not triage the finding, does not relay it, and does not confirm any bounty. Researchers testing the platform are allowed to test.</p>
<p><b>Scenario E.</b> Not SOC work. This is a question for #security-operations. The customer reply is that details cannot be disclosed before the official advisory, and that updates come through Pantheon's release notes. Do not speculate about affected sites.</p>
<p><b>Field practice, not official policy.</b> If you are unsure whether something is SOC work, ask in #cse-soc before you promise anything. A one-line question there is cheaper than a wrong reply.</p>`,
    quiz: [
      {
        q: "Who can receive a SOC 2 report?",
        o: [
          "Anyone who asks",
          "Only contract customers, under an NDA",
          "Any paying customer",
          "Only agencies",
        ],
        a: 1,
        w: "SOC 2 reports are given only to contract customers, for legal reasons, and an NDA is required.",
      },
      {
        q: "How do you tell contract from non-contract on the site dashboard?",
        o: [
          "The Billing tab shows only for non-contract sites",
          "The Billing tab shows only for contract sites",
          "A banner at the top",
          "The plan name",
        ],
        a: 0,
        w: "A Billing tab appears only for non-contract sites. Contract customers go through their CSM.",
      },
      {
        q: "A customer says their email domain is on a spam blacklist. What is the most common cause and first action?",
        o: [
          "Pantheon's infrastructure, so escalate to engineering",
          "Bad SPF records or poor-reputation default mail servers, so ask for the specific rejection details",
          "A malware scan, so run btool",
          "Expired certificate",
        ],
        a: 1,
        w: "Pantheon is rarely the cause. SPF problems and the reputation of the default platform mail servers are the usual causes, so start by asking for the rejection details.",
      },
      {
        q: "What do you tell a customer who asks whether Pantheon is HIPAA compliant?",
        o: [
          "Yes, with the right plugin",
          "Pantheon is not HIPAA compliant, and no plugin makes it so",
          "Yes, on Gold and above",
          "It will be compliant next quarter",
        ],
        a: 1,
        w: "Pantheon is not HIPAA compliant. Do not give dates.",
      },
      {
        q: "A security researcher reports a bug in Support chat. What is the right move?",
        o: [
          "Triage it and send it to InfoSec",
          "Send the BugCrowd reply: create an account and email the account ID to infosec@pantheon.io",
          "Ask for proof of concept",
          "Close the chat",
        ],
        a: 1,
        w: "Support does not triage bug reports. The canned reply sends the reporter to BugCrowd through infosec@pantheon.io.",
      },
    ],
    refs: [
      { t: "Playbook: SOC2, Compliance, and Security Policy Requests", u: CONF + "2353398043" },
      { t: "Playbook: Common Security-related Customer Requests", u: CONF + "556662909" },
      { t: "Playbook: Handling Bug Reporters", u: CONF + "2721021960" },
    ],
  },
];
