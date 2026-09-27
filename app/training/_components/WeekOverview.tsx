"use client";

import Link from "next/link";
import { OUTLINE, WEEKS } from "../_data/outline";
import { dayStatus, useProgress } from "../_lib/progress";

export default function WeekOverview() {
  const { p, loaded } = useProgress();
  return (
    <div className="trn-weeks">
      {WEEKS.map((w) => {
        const days = OUTLINE.filter((d) => d.week === w.n);
        const doneCount = loaded ? days.filter((d) => p.done[String(d.id)]).length : 0;
        return (
          <section key={w.n} className="trn-week">
            <div className="trn-eyebrow">{`Week ${w.n} · ${doneCount}/${days.length} done`}</div>
            <h3>{w.title}</h3>
            <p className="trn-muted">{w.sub}</p>
            <ol>
              {days.map((d) => {
                const st = loaded ? dayStatus(p, d.id) : "none";
                return (
                  <li key={d.id}>
                    <span className={`dot ${st}`}>{st === "done" ? "✓" : ""}</span>
                    <Link href={`/training/day/${d.id}`}>{`Day ${d.id}: ${d.title}`}</Link>
                    <span className="trn-muted trn-xs trn-mono">{` ${d.mins}m`}</span>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
