"use client";

import { useCallback, useContext, useSyncExternalStore } from "react";
import { getCourse } from "../_data/courses";
import { CourseContext } from "../_components/CourseContext";
import { blankProgress, type Progress } from "./progressStats";

export { dayStatus, stats, encodeProgress, decodeProgress, type Progress, type DayStatus } from "./progressStats";

// Stable object returned during the server render and hydration.
// useSyncExternalStore swaps in the real (localStorage) value right after hydration,
// which avoids hydration mismatches.
const SERVER_SNAPSHOT: Progress = blankProgress();

type Store = {
  read(): Progress;
  write(next: Progress): void;
  subscribe(cb: () => void): () => void;
  ok(): boolean;
};

// One store per course so progress never mixes between courses.
const stores = new Map<string, Store>();

function getStore(courseId: string): Store {
  const existing = stores.get(courseId);
  if (existing) return existing;
  const key = getCourse(courseId)?.progressKey ?? `training-${courseId}-v1`;
  let cache: Progress | null = null;
  let ok = true;
  const listeners = new Set<() => void>();
  const store: Store = {
    ok: () => ok,
    read() {
      if (cache) return cache;
      try {
        const raw = window.localStorage.getItem(key);
        cache = raw ? { ...blankProgress(), ...(JSON.parse(raw) as Partial<Progress>) } : blankProgress();
      } catch {
        ok = false;
        cache = blankProgress();
      }
      return cache;
    },
    write(next) {
      cache = next;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        ok = false;
      }
      listeners.forEach((l) => l());
    },
    subscribe(cb) {
      listeners.add(cb);
      const onStorage = (e: StorageEvent) => {
        if (e.key === key) {
          cache = null;
          cb();
        }
      };
      window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(cb);
        window.removeEventListener("storage", onStorage);
      };
    },
  };
  stores.set(courseId, store);
  return store;
}

export function useProgress(courseId?: string) {
  const ctx = useContext(CourseContext);
  const id = courseId ?? ctx?.id;
  if (!id) throw new Error("useProgress needs a course id or a CourseProvider");
  const store = getStore(id);
  const p = useSyncExternalStore(store.subscribe, store.read, () => SERVER_SNAPSHOT);
  const loaded = p !== SERVER_SNAPSHOT;
  const update = useCallback((fn: (prev: Progress) => Progress) => store.write(fn(store.read())), [store]);
  const replace = useCallback((next: Partial<Progress>) => store.write({ ...blankProgress(), ...next }), [store]);
  const reset = useCallback(() => store.write(blankProgress()), [store]);
  return { p, loaded, storageOk: store.ok(), update, replace, reset };
}
