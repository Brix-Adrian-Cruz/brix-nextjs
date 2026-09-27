"use client";

import { useProgress } from "../_lib/progress";

export default function LabChecklist({ dayId, labs }: { dayId: number; labs: string[] }) {
  const { p, update } = useProgress();
  const k = String(dayId);
  const checked = p.lab[k] ?? [];
  const toggle = (i: number) =>
    update((prev) => {
      const arr = [...(prev.lab[k] ?? [])];
      arr[i] = !arr[i];
      return { ...prev, lab: { ...prev.lab, [k]: arr } };
    });
  return (
    <div className="trn-lab">
      {labs.map((html, i) => (
        <label key={i} className={checked[i] ? "chk" : undefined}>
          <input type="checkbox" checked={!!checked[i]} onChange={() => toggle(i)} />
          <span dangerouslySetInnerHTML={{ __html: html }} />
        </label>
      ))}
    </div>
  );
}
