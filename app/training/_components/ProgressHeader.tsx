"use client";

import Link from "next/link";
import { useState } from "react";
import { OUTLINE, WEEKS } from "../_data/outline";
import { dayStatus, decodeProgress, encodeProgress, stats, useProgress } from "../_lib/progress";

export default function ProgressHeader() {
  const { p, loaded, storageOk, replace, reset } = useProgress();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [armReset, setArmReset] = useState(false);
  const s = stats(p);
  const next = OUTLINE.find((d) => !p.done[String(d.id)]) ?? OUTLINE[OUTLINE.length - 1];

  return (
    <section className="trn-progress" aria-label="Course progress">
      <div className="trn-stats">
        <div className="trn-stat"><div className="v">{loaded ? `${s.pct}%` : "—"}</div><div className="l">Course complete</div></div>
        <div className="trn-stat"><div className="v">{loaded ? `${s.done}/${OUTLINE.length}` : "—"}</div><div className="l">Days done</div></div>
        <div className="trn-stat"><div className="v">{loaded && s.quizPct !== null ? `${s.quizPct}%` : "—"}</div><div className="l">Quiz accuracy</div></div>
        <div className="trn-actions">
          <Link className="trn-btn primary" href={`/training/day/${next.id}`}>{"Resume: Day "}{next.id}</Link>
          <button type="button" className="trn-btn" onClick={() => { setOpen(!open); setCode(encodeProgress(p)); setMsg(""); }}>
            {"Backup / restore"}
          </button>
        </div>
      </div>

      <div className="trn-strip">
        {WEEKS.map((w) => (
          <div className="trn-wk" key={w.n}>
            <div className="wl"><b>{"Week "}{w.n}</b>{" · "}{w.title}</div>
            <div className="cells">
              {OUTLINE.filter((d) => d.week === w.n).map((d) => {
                const st = loaded ? dayStatus(p, d.id) : "none";
                return (
                  <Link key={d.id} href={`/training/day/${d.id}`} className={`trn-cell ${st}`} title={`Day ${d.id}: ${d.title}`}>
                    {d.id}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="trn-muted trn-small">
        {storageOk
          ? "Progress saves automatically in this browser. Each environment URL (dev, test, live, pr-N) keeps its own copy, so use Backup / restore to move between them."
          : "This browser is blocking storage. Use Backup / restore to keep your place."}
      </p>

      {open && (
        <div className="trn-savepanel">
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="Progress code" />
          <div className="trn-row">
            <button type="button" className="trn-btn" onClick={() => { void navigator.clipboard?.writeText(code); setMsg("Copied."); }}>{"Copy code"}</button>
            <button type="button" className="trn-btn primary" onClick={() => { try { replace(decodeProgress(code)); setMsg("Restored."); } catch { setMsg("That code is not valid."); } }}>{"Restore from code"}</button>
            <button type="button" className="trn-btn" onClick={() => { if (!armReset) { setArmReset(true); setMsg("Click reset again to confirm."); return; } reset(); setArmReset(false); setMsg("Progress reset."); }}>{"Reset all progress"}</button>
            <span className="trn-muted trn-small">{msg}</span>
          </div>
        </div>
      )}
    </section>
  );
}
