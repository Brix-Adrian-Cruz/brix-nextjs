"use client";

import Link from "next/link";
import { TOTAL_DAYS } from "../_data/outline";
import { useProgress } from "../_lib/progress";

export default function DayControls({ dayId }: { dayId: number }) {
  const { p, update } = useProgress();
  const k = String(dayId);
  const done = !!p.done[k];
  const toggle = () =>
    update((prev) => {
      const next = { ...prev.done };
      if (next[k]) delete next[k];
      else next[k] = new Date().toISOString().slice(0, 10);
      return { ...prev, done: next };
    });
  return (
    <div className="trn-footer-nav">
      {dayId > 1 ? <Link className="trn-btn" href={`/training/day/${dayId - 1}`}>{`← Day ${dayId - 1}`}</Link> : <span />}
      <button type="button" className={`trn-btn ${done ? "good" : "primary"}`} onClick={toggle}>
        {done ? `✓ Completed ${p.done[k]} · undo` : `Mark Day ${dayId} complete`}
      </button>
      {dayId < TOTAL_DAYS ? <Link className="trn-btn" href={`/training/day/${dayId + 1}`}>{`Day ${dayId + 1} →`}</Link> : <span />}
    </div>
  );
}
