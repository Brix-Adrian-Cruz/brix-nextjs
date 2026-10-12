import { test } from "node:test";
import assert from "node:assert/strict";
import { COURSES, getCourse, courseBase } from "../../app/training/_data/courses.ts";

test("registry lists nextjs with unchanged progress key", () => {
  const c = getCourse("nextjs");
  assert.ok(c);
  assert.equal(c.progressKey, "nextjs-support-academy-v1");
  assert.equal(c.outline.length, 30);
  assert.equal(courseBase("nextjs"), "/training/nextjs");
});

test("every course has unique id and progress key", () => {
  assert.equal(new Set(COURSES.map((c) => c.id)).size, COURSES.length);
  assert.equal(new Set(COURSES.map((c) => c.progressKey)).size, COURSES.length);
  assert.equal(getCourse("nope"), undefined);
});
