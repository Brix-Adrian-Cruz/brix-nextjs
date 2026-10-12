import { notFound } from "next/navigation";
import { COURSES, getCourse } from "../_data/courses";
import WeekOverview from "../_components/WeekOverview";

export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export default async function CourseHome({ params }: { params: Promise<{ course: string }> }) {
  const course = getCourse((await params).course);
  if (!course) notFound();
  return (
    <main>
      <section className="trn-intro">
        <p>{course.intro}</p>
      </section>
      <WeekOverview />
    </main>
  );
}
