// Pure progress logic: no React, no browser APIs, so it can be unit-tested with node --test.
export type Progress = {
  done: Record<string, string>; // dayId -> YYYY-MM-DD completed
  lab: Record<string, boolean[]>; // dayId -> checked lab steps
  quiz: Record<string, Record<string, number>>; // dayId -> questionIndex -> chosen option
  notes: Record<string, string>; // dayId -> free text
};

type OutlineLike = { id: number; answers: number[] };

export const blankProgress = (): Progress => ({ done: {}, lab: {}, quiz: {}, notes: {} });

export type DayStatus = "done" | "prog" | "none";

export function dayStatus(p: Progress, id: number): DayStatus {
  const k = String(id);
  if (p.done[k]) return "done";
  const lab = p.lab[k] ?? [];
  const quiz = p.quiz[k] ?? {};
  if (lab.some(Boolean) || Object.keys(quiz).length > 0 || (p.notes[k] ?? "").trim()) return "prog";
  return "none";
}

export function stats(p: Progress, outline: OutlineLike[]) {
  const done = Object.keys(p.done).length;
  let right = 0;
  let total = 0;
  for (const d of outline) {
    const a = p.quiz[String(d.id)] ?? {};
    for (const qi of Object.keys(a)) {
      total += 1;
      if (d.answers[Number(qi)] === a[qi]) right += 1;
    }
  }
  return { done, pct: Math.round((done / outline.length) * 100), quizPct: total ? Math.round((right / total) * 100) : null };
}

export function encodeProgress(p: Progress): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(p))));
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

// Keeps only the known keys whose values are plain objects, so a code from another
// course (or garbage) can never put the store into a shape that crashes the UI.
export function decodeProgress(code: string): Partial<Progress> {
  const raw: unknown = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
  const out: Partial<Progress> = {};
  if (!isPlainObject(raw)) return out;
  for (const key of ["done", "lab", "quiz", "notes"] as const) {
    if (isPlainObject(raw[key])) (out as Record<string, unknown>)[key] = raw[key];
  }
  return out;
}
