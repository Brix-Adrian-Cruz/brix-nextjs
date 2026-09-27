import type { Metadata } from "next";
import { REPORTS } from "../_data/course";

export const metadata: Metadata = { title: "Common reports" };

export default function ReportsPage() {
  return (
    <main>
      <p className="trn-muted">
        {"These are the recurring Next.js reports in Zendesk (2026). Each row has the first checks, the playbook to follow, and real tickets to read. Work each one using the Day 21 triage framework."}
      </p>
      <div className="trn-tablewrap">
        <table className="trn-table">
          <thead>
            <tr><th>{"Customer says…"}</th><th>{"Layer"}</th><th>{"First checks"}</th><th>{"Playbook"}</th><th>{"Real tickets"}</th></tr>
          </thead>
          <tbody>
            {REPORTS.map((r) => (
              <tr key={r.s}>
                <td><b>{r.s}</b></td>
                <td><span className="trn-pill">{r.layer}</span></td>
                <td><ul>{r.checks.map((c) => <li key={c}>{c}</li>)}</ul></td>
                <td><a href={r.pb.u} target="_blank" rel="noopener noreferrer">{r.pb.t.replace(/^(Playbook|Docs): /, "")}</a></td>
                <td>
                  {r.tk.length === 0 ? <span className="trn-muted">{"—"}</span> : r.tk.map((t, i) => (
                    <span key={t.u}>
                      {i > 0 && ", "}
                      <a href={t.u} target="_blank" rel="noopener noreferrer" title={t.t}>{t.t.match(/#\d+/)?.[0] ?? "ticket"}</a>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
