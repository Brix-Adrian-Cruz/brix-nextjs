"use client";

import { useProgress } from "../_lib/progress";

export default function Notes({ dayId }: { dayId: number }) {
  const { p, update } = useProgress();
  const k = String(dayId);
  return (
    <textarea
      className="trn-notes"
      value={p.notes[k] ?? ""}
      placeholder="What surprised you? Commands to remember? Questions for office hours?"
      onChange={(e) => {
        const v = e.target.value;
        update((prev) => ({ ...prev, notes: { ...prev.notes, [k]: v } }));
      }}
      aria-label={`Notes for day ${dayId}`}
    />
  );
}
