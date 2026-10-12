"use client";

import Link from "next/link";
import { useCourse } from "./CourseContext";
import { dayStatus, useProgress } from "../_lib/progress";

export default function DaySidebar({ current }: { current?: number }) {
  const { base, weeks, outline } = useCourse();
  const { p, loaded } = useProgress();
  return (
    <nav className="trn-side" aria-label="Course days">
      {weeks.map((w) => (
        <div key={w.n}>
          <h4>{"Week "}{w.n}{" · "}{w.title}</h4>
          {outline.filter((d) => d.week === w.n).map((d) => {
            const st = loaded ? dayStatus(p, d.id) : "none";
            return (
              <Link key={d.id} href={`${base}/day/${d.id}`} className={d.id === current ? "on" : undefined} aria-current={d.id === current ? "page" : undefined}>
                <span className={`dot ${st}`}>{st === "done" ? "✓" : ""}</span>
                <span>
                  <span className="trn-mono trn-muted trn-xs">{`D${d.id} · ${d.mins}m`}</span>
                  <br />
                  {d.title}
                </span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
