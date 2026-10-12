// Full SOC lesson content. Imported ONLY by Server Components so it never ships to the browser.
// After editing days, regenerate the light outline: node scripts/gen-soc-outline.mjs
import { WEEK_1_DAYS } from "./days/week1.ts";
import { WEEK_2_DAYS } from "./days/week2.ts";
import { WEEK_3_DAYS } from "./days/week3.ts";

export const DAYS = [...WEEK_1_DAYS, ...WEEK_2_DAYS, ...WEEK_3_DAYS];
export { REPORTS } from "./reports.ts";
