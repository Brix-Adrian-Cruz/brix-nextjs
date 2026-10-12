import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES } from "../../_data/courses";
import { getCourseContent } from "../../_data/content";
import { highlightRawHtml } from "@/lib/highlightCode";

export const metadata: Metadata = { title: "Field guide" };

export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export default async function FieldGuidePage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const content = await getCourseContent(course);
  if (!content) notFound();
  const html = await highlightRawHtml(content.fieldGuideHtml);

  return (
    <main>
      <div className="trn-fgwrap" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
