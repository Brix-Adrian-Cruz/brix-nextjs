import PrevNextNav from "@/components/PrevNextNav";
import { allLessons } from "@/data/learnNav";

/** Previous/next links, derived from the order in data/learnNav.ts. */
export default function LessonNav({ href }: { href: string }) {
  const index = allLessons.findIndex((lesson) => lesson.href === href);
  const previous = index > 0 ? allLessons[index - 1] : undefined;
  const next =
    index >= 0 && index < allLessons.length - 1
      ? allLessons[index + 1]
      : undefined;

  return <PrevNextNav previous={previous} next={next} />;
}
