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
    <section className="my-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <header className="border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-800 dark:bg-gray-900">
        <h3 className="text-sm font-semibold">{title}</h3>
        {hint && (
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {hint}
          </p>
        )}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
