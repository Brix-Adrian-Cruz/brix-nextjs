import type { Metadata } from "next";
import Link from "next/link";
import { COURSES } from "./_data/courses";

export const metadata: Metadata = { title: "All courses" };

export default function TrainingPicker() {
  return (
    <main>
      <header className="trn-hero">
        <div className="trn-eyebrow">{"Pantheon CSE · Support training"}</div>
        <h1>{"Support Academy"}</h1>
      </header>
      <section className="trn-courses" aria-label="Courses">
        {COURSES.map((c) => (
          <Link key={c.id} href={`/training/${c.id}`} className="trn-course">
            <span className="trn-eyebrow">{`${c.outline.length} days · ${c.weeks.length} weeks`}</span>
            <h3>{c.title}</h3>
            <p className="trn-muted">{c.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
