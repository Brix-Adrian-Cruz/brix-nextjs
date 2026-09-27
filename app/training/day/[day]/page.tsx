import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DayControls from "../../_components/DayControls";
import DaySidebar from "../../_components/DaySidebar";
import LabChecklist from "../../_components/LabChecklist";
import Notes from "../../_components/Notes";
import Quiz from "../../_components/Quiz";
import { DAYS, getDay } from "../../_data/course";
import { WEEKS } from "../../_data/outline";

// Pre-render all 30 days at build time (SSG). Any other day number calls notFound() → 404 by design.
// Note: brix-nextjs has Cache Components enabled, which rejects `dynamicParams`, so the
// 404 comes from the notFound() check below instead.
// Lab: compare with Pages Router getStaticPaths + fallback: false (Days 7, 8, 25).

export function generateStaticParams() {
  return DAYS.map((d) => ({ day: String(d.id) }));
}

type Props = { params: Promise<{ day: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { day } = await params;
  const d = getDay(Number(day));
  return { title: d ? `Day ${d.id}: ${d.title}` : "Not found" };
}

export default async function DayPage({ params }: Props) {
  const { day } = await params;
  const d = getDay(Number(day));
  if (!d) notFound();
  const w = WEEKS[d.week - 1];

  return (
    <div className="trn-layout">
      <aside>
        <DaySidebar current={d.id} />
      </aside>
      <main className="trn-day">
        <div className="trn-eyebrow">{`Week ${d.week} · ${w.title} · Day ${d.id} of ${DAYS.length} · ~${d.mins} min`}</div>
        <h2>{d.title}</h2>
        <p className="trn-goal">{d.goal}</p>
        <div className="trn-plan">
          {d.plan.map(([label, mins]) => (
            <span key={label}><b>{label}</b>{` ${mins}m`}</span>
          ))}
        </div>

        <section className="trn-blk">
          <h3><span className="trn-eyebrow">{"01"}</span>{"Learn"}</h3>
          <div className="trn-learn" dangerouslySetInnerHTML={{ __html: d.learn }} />
        </section>

        <section className="trn-blk">
          <h3><span className="trn-eyebrow">{"02"}</span>{"Hands-on lab"}</h3>
          <LabChecklist dayId={d.id} labs={d.lab} />
        </section>

        <section className="trn-blk">
          <div className="trn-knowhow">
            <span className="trn-eyebrow">{"Support know-how"}</span>
            <div dangerouslySetInnerHTML={{ __html: d.knowhow }} />
          </div>
        </section>

        <section className="trn-blk">
          <h3>
            <span className="trn-eyebrow">{"03"}</span>
            {d.quiz.length >= 5 ? "Knowledge check" : "Quick quiz"}
            <span className="trn-muted">{` (${d.quiz.length} questions)`}</span>
          </h3>
          <Quiz dayId={d.id} quiz={d.quiz} />
        </section>

        <section className="trn-blk">
          <h3><span className="trn-eyebrow">{"04"}</span>{"Sources & further reading"}</h3>
          <ul className="trn-refs">
            {d.refs.map((r) => (
              <li key={r.u}><a href={r.u} target="_blank" rel="noopener noreferrer">{r.t}</a></li>
            ))}
          </ul>
        </section>

        <section className="trn-blk">
          <h3><span className="trn-eyebrow">{"05"}</span>{"My notes"}</h3>
          <Notes dayId={d.id} />
        </section>

        <DayControls dayId={d.id} />
      </main>
    </div>
  );
}
