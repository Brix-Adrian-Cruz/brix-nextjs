import { test } from "node:test";
import assert from "node:assert/strict";
import { DAYS, REPORTS } from "../../app/training/_data/soc/course.ts";
import { OUTLINE, WEEKS } from "../../app/training/_data/soc/outline.ts";
import { FIELD_GUIDE_HTML } from "../../app/training/_data/soc/fieldGuide.ts";

const everything = JSON.stringify({ DAYS, REPORTS, FIELD_GUIDE_HTML });
const dayText = (d) => JSON.stringify(d);

test("15 days across 3 weeks, ids 1..15", () => {
  assert.equal(DAYS.length, 15);
  assert.deepEqual(DAYS.map((d) => d.id), Array.from({ length: 15 }, (_, i) => i + 1));
  assert.equal(WEEKS.length, 3);
  assert.deepEqual([...new Set(DAYS.map((d) => d.week))], [1, 2, 3]);
});

test("each day is complete and plan minutes add up", () => {
  for (const d of DAYS) {
    const tag = `Day ${d.id}`;
    assert.ok(d.mins >= 30 && d.mins <= 45, `${tag} mins`);
    assert.equal(d.plan.reduce((n, [, m]) => n + m, 0), d.mins, `${tag} plan sums to mins`);
    for (const f of ["title", "goal", "learn", "knowhow"]) assert.ok(d[f]?.trim(), `${tag} ${f}`);
    assert.ok(d.lab.length >= 3, `${tag} lab steps`);
    assert.ok(d.quiz.length >= 3 && d.quiz.length <= 5, `${tag} quiz size`);
    assert.ok(d.refs.length >= 1, `${tag} refs`);
    for (const q of d.quiz) {
      assert.ok(q.o.length >= 3 && q.o.length <= 4, `${tag} option count`);
      assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, `${tag} answer index`);
      assert.ok(q.q.trim() && q.w.trim(), `${tag} question/explanation`);
    }
  }
});

test("outline is in sync with lessons (run node scripts/gen-soc-outline.mjs)", () => {
  assert.equal(OUTLINE.length, DAYS.length);
  for (const d of DAYS) {
    const o = OUTLINE.find((x) => x.id === d.id);
    assert.deepEqual(o, { id: d.id, week: d.week, mins: d.mins, title: d.title, labs: d.lab.length, answers: d.quiz.map((q) => q.a) });
  }
});

test("links: refs are https, Confluence refs point at the wiki", () => {
  for (const d of DAYS) for (const r of d.refs) assert.match(r.u, /^https:\/\//, `Day ${d.id} ref`);
  for (const r of REPORTS) assert.match(r.pb.u, /^https:\/\//);
  assert.ok(DAYS.some((d) => d.refs.some((r) => /getpantheon\.atlassian\.net\/wiki\//.test(r.u))));
});

test("every URL in content is on the allow-list or an invented example.test domain", () => {
  const ALLOWED = /^(getpantheon\.atlassian\.net|docs\.pantheon\.io|legal\.pantheon\.io|trust\.pantheon\.io|status\.pantheon\.io|pantheon\.io|www\.pantheon\.io|(.+\.)?example\.test|www\.missingkids\.org|report\.cybertip\.org|lumendatabase\.org|safebrowsing\.google\.com|support\.google\.com|www\.google\.com|www\.microsoft\.com|www\.drupal\.org|drupal\.org|owasp\.org|www\.cloudflare\.com)$/;
  for (const m of everything.matchAll(/https?:\/\/([^\/"\s\\<>')]+)/g)) {
    assert.match(m[1].toLowerCase(), ALLOWED, `unexpected host in content: ${m[1]}`);
  }
});

test("no sensitive data: emails, tokens, ticket numbers, names", () => {
  const emails = [...everything.matchAll(/[\w.+-]+@[\w-]+\.[\w.-]+/g)].map((m) => m[0].toLowerCase().replace(/[.-]+$/, ""));
  const okEmails = new Set(["abuse@pantheon.io", "infosec@pantheon.io", "security@pantheon.io"]);
  for (const e of emails) assert.ok(okEmails.has(e) || /@example\.test$/.test(e), `unexpected email ${e}`);
  assert.doesNotMatch(everything, /gh[opsu]_[A-Za-z0-9]{20,}/, "github token");
  assert.doesNotMatch(everything, /zendesk\.com\/agent\/tickets\/\d+/, "zendesk ticket link");
  assert.doesNotMatch(everything, /(?:ticket|zd|zendesk)\s*#?\s*\d{5,}/i, "ticket number");
  const FORBIDDEN = ["Exiger", "Sage Publications", "Circle City", "Digizent", "SGA", "IoP.org", "Avid",
    "Valdez", "Hossain", "Delimos", "Nakamura", "Dellinger", "Stanford", "Jake Choi", "Umandal", "Caro",
    "Abquina", "Bresele", "Rajaris", "Kha Nguyen", "Grubb", "Pavlenko", "Walters", "Turbin"];
  for (const n of FORBIDDEN) assert.ok(!new RegExp(`\\b${n}\\b`, "i").test(everything), `forbidden name: ${n}`);
});

test("field-practice label appears on Slack-only topics", () => {
  const label = "Field practice, not official policy";
  const withLabel = DAYS.filter((d) => dayText(d).includes(label)).map((d) => d.id);
  assert.ok(withLabel.length >= 3, `label found on days: ${withLabel}`);
  for (const id of [5, 12, 13]) assert.ok(withLabel.includes(id), `Day ${id} should carry the label`);
});

test("reports cover the main playbook families and have no ticket links", () => {
  assert.ok(REPORTS.length >= 14);
  for (const r of REPORTS) {
    assert.ok(r.s && r.layer && r.checks.length >= 2, `report ${r.s}`);
    assert.deepEqual(r.tk, []);
  }
  assert.ok(FIELD_GUIDE_HTML.length > 2000);
  assert.match(FIELD_GUIDE_HTML, /snc_proactive/);
});
