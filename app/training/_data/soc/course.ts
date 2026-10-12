// Full SOC lesson content. Imported ONLY by Server Components so it never ships to the browser.
// After editing days, regenerate the light outline: node scripts/gen-soc-outline.mjs
import type { Day } from "../types.ts";
import { WEEK_1_DAYS } from "./days/week1.ts";
import { WEEK_2_DAYS } from "./days/week2.ts";
import { WEEK_3_DAYS } from "./days/week3.ts";

// Authoring order tends to put the right answer second. Move each correct option to a
// position that cycles through the slots (deterministic, so builds are reproducible and
// the generated outline's answer key always matches). Other options keep their order.
function spreadAnswers(days: Day[]): Day[] {
  let n = 0;
  return days.map((d) => ({
    ...d,
    quiz: d.quiz.map((q) => {
      const target = n++ % q.o.length;
      const rest = q.o.filter((_, i) => i !== q.a);
      rest.splice(target, 0, q.o[q.a]);
      return { ...q, o: rest, a: target };
    }),
  }));
}

export const DAYS = spreadAnswers([...WEEK_1_DAYS, ...WEEK_2_DAYS, ...WEEK_3_DAYS]);
export { REPORTS } from "./reports.ts";
