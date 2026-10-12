import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "../../_data/courses";
import { getCourseContent } from "../../_data/content";

export const metadata: Metadata = { title: "Common reports" };

export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export default async function ReportsPage({ params }: { params: Promise<{ course: string }> }) {
  const { course: id } = await params;
  const course = getCourse(id);
  const content = await getCourseContent(id);
  if (!course || !content) notFound();
  const REPORTS = content.reports;
  const head = course.reportsHeading;
  return (
    <main>
      <p className="trn-muted">
        {course.reportsIntro}
      </p>
      <div className="trn-tablewrap">
        <table className="trn-table">
          <thead>
            <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
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
