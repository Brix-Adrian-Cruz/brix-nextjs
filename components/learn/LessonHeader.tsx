import { allLessons } from "@/data/learnNav";

/** Standard lesson title block, so every lesson opens the same way. */
export default function LessonHeader({ href }: { href: string }) {
  const lesson = allLessons.find((l) => l.href === href);

  if (!lesson) return null;

  return (
    <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        {lesson.title}
      </h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
        {lesson.summary}
      </p>
    </header>
  );
}
