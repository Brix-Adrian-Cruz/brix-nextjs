import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES, getCourse } from "../_data/courses";
import { CourseProvider } from "../_components/CourseContext";
import ProgressHeader from "../_components/ProgressHeader";

export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }) {
  const course = getCourse((await params).course);
  return course ? { title: { default: course.title, template: `%s · ${course.title}` }, description: course.description } : {};
}

export default async function CourseLayout({ children, params }: { children: React.ReactNode; params: Promise<{ course: string }> }) {
  const { course: id } = await params;
  const course = getCourse(id);
  if (!course) notFound();
  const env = process.env.PANTHEON_ENVIRONMENT ?? process.env.APP_ENV ?? "local";
  const base = `/training/${course.id}`;
  return (
    <CourseProvider course={course}>
      <header className="trn-hero">
        <div className="trn-eyebrow">{`${course.eyebrow} · env: ${env}`}</div>
        <h1>
          <Link href={base}>{course.title}</Link>
        </h1>
        <nav className="trn-views" aria-label="Training sections">
          <Link href="/training">{"All courses"}</Link>
          <Link href={base}>{"Overview"}</Link>
          <Link href={`${base}/reports`}>{"Common reports"}</Link>
          <Link href={`${base}/field-guide`}>{"Field guide"}</Link>
        </nav>
      </header>
      <ProgressHeader />
      {children}
    </CourseProvider>
  );
}
