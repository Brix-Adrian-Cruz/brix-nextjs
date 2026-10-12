"use client";

import { createContext, useContext, useMemo } from "react";
import type { CourseMeta, OutlineDay, Week } from "../_data/types";

export type CourseCtx = { id: string; base: string; weeks: Week[]; outline: OutlineDay[]; totalDays: number };

export const CourseContext = createContext<CourseCtx | null>(null);

export function CourseProvider({ course, children }: { course: CourseMeta; children: React.ReactNode }) {
  const value = useMemo<CourseCtx>(
    () => ({ id: course.id, base: `/training/${course.id}`, weeks: course.weeks, outline: course.outline, totalDays: course.outline.length }),
    [course],
  );
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse(): CourseCtx {
  const c = useContext(CourseContext);
  if (!c) throw new Error("useCourse must be used inside CourseProvider");
  return c;
}
