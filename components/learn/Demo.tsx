/** A labelled box around anything that actually runs, so demos read as demos. */
export default function Demo({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="my-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
      <header className="border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-sm font-semibold">{title}</h3>
        {hint && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {hint}
          </p>
        )}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
