"use client";

import { useCallback, useSyncExternalStore } from "react";
import { OUTLINE } from "../_data/outline";

export type Progress = {
  done: Record<string, string>; // dayId -> YYYY-MM-DD completed
  lab: Record<string, boolean[]>; // dayId -> checked lab steps
  quiz: Record<string, Record<string, number>>; // dayId -> questionIndex -> chosen option
  notes: Record<string, string>; // dayId -> free text
};

const KEY = "nextjs-support-academy-v1";
const blank = (): Progress => ({ done: {}, lab: {}, quiz: {}, notes: {} });

// Stable object returned during the server render and hydration.
// useSyncExternalStore swaps in the real (localStorage) value right after hydration,
// which avoids hydration mismatches. This is a Day 6 lab topic.
const SERVER_SNAPSHOT: Progress = blank();

let cache: Progress | null = null;
let storageOk = true;
const listeners = new Set<() => void>();

function read(): Progress {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...blank(), ...(JSON.parse(raw) as Partial<Progress>) } : blank();
  } catch {
    storageOk = false;
    cache = blank();
  }
  return cache;
}

function write(next: Progress) {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    storageOk = false;
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress() {
  const p = useSyncExternalStore(subscribe, read, () => SERVER_SNAPSHOT);
  const loaded = p !== SERVER_SNAPSHOT;
  const update = useCallback((fn: (prev: Progress) => Progress) => write(fn(read())), []);
  const replace = useCallback((next: Partial<Progress>) => write({ ...blank(), ...next }), []);
  const reset = useCallback(() => write(blank()), []);
  return { p, loaded, storageOk, update, replace, reset };
}

export type DayStatus = "done" | "prog" | "none";

export function dayStatus(p: Progress, id: number): DayStatus {
  const k = String(id);
  if (p.done[k]) return "done";
  const lab = p.lab[k] ?? [];
  const quiz = p.quiz[k] ?? {};
  if (lab.some(Boolean) || Object.keys(quiz).length > 0 || (p.notes[k] ?? "").trim()) return "prog";
  return "none";
}

export function stats(p: Progress) {
  const done = Object.keys(p.done).length;
  let right = 0;
  let total = 0;
  for (const d of OUTLINE) {
    const a = p.quiz[String(d.id)] ?? {};
    for (const qi of Object.keys(a)) {
      total += 1;
      if (d.answers[Number(qi)] === a[qi]) right += 1;
    }
  }
  return { done, pct: Math.round((done / OUTLINE.length) * 100), quizPct: total ? Math.round((right / total) * 100) : null };
}

export function encodeProgress(p: Progress): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(p))));
}

export function decodeProgress(code: string): Partial<Progress> {
  return JSON.parse(decodeURIComponent(escape(atob(code.trim())))) as Partial<Progress>;
}
