import { test } from "node:test";
import assert from "node:assert/strict";
import { blankProgress, dayStatus, stats, encodeProgress, decodeProgress } from "../../app/training/_lib/progressStats.ts";

const outline = [
  { id: 1, week: 1, mins: 30, title: "a", labs: 1, answers: [1, 0] },
  { id: 2, week: 1, mins: 30, title: "b", labs: 1, answers: [2] },
];

test("stats uses the outline passed in", () => {
  const p = { ...blankProgress(), done: { "1": "2026-10-13" }, quiz: { "1": { "0": 1, "1": 3 } } };
  assert.deepEqual(stats(p, outline), { done: 1, pct: 50, quizPct: 50 });
});

test("dayStatus transitions", () => {
  assert.equal(dayStatus(blankProgress(), 1), "none");
  assert.equal(dayStatus({ ...blankProgress(), notes: { "1": "x" } }, 1), "prog");
  assert.equal(dayStatus({ ...blankProgress(), done: { "1": "d" } }, 1), "done");
});

test("encode/decode roundtrip and garbage-safe decode", () => {
  const p = { ...blankProgress(), notes: { "1": "héllo" } };
  assert.deepEqual(decodeProgress(encodeProgress(p)).notes, { "1": "héllo" });
  assert.deepEqual(decodeProgress(btoa(JSON.stringify({ done: 5, lab: [], other: 1 }))), {});
  assert.deepEqual(decodeProgress(btoa(JSON.stringify([1, 2]))), {});
});

test("backup codes are tied to their course", () => {
  const p = { ...blankProgress(), done: { "1": "2026-10-13" } };
  const code = encodeProgress(p, "nextjs");
  assert.deepEqual(decodeProgress(code, "nextjs").done, { "1": "2026-10-13" });
  assert.throws(() => decodeProgress(code, "soc"), /nextjs/);
  // Old backups (no course id) still restore anywhere.
  assert.deepEqual(decodeProgress(encodeProgress(p), "soc").done, { "1": "2026-10-13" });
});

test("stats ignores done days outside the outline", () => {
  const done = Object.fromEntries(Array.from({ length: 30 }, (_, i) => [String(i + 1), "d"]));
  assert.equal(stats({ ...blankProgress(), done }, outline).pct, 100);
});
