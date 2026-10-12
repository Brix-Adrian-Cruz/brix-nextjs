export type QuizItem = { q: string; o: string[]; a: number; w: string };
export type Ref = { t: string; u: string };
export type Day = {
  id: number; week: number; mins: number; title: string; goal: string;
  plan: [string, number][]; learn: string; lab: string[]; knowhow: string;
  quiz: QuizItem[]; refs: Ref[];
};
export type Report = { s: string; layer: string; checks: string[]; pb: Ref; tk: Ref[] };
export type Week = { n: number; title: string; sub: string };
export type OutlineDay = { id: number; week: number; mins: number; title: string; labs: number; answers: number[] };
export type CourseMeta = {
  id: string; title: string; description: string; eyebrow: string; intro: string;
  progressKey: string; weeks: Week[]; outline: OutlineDay[];
  reportsIntro: string; reportsHeading: string[];
};
export type CourseContent = { days: Day[]; reports: Report[]; fieldGuideHtml: string };
