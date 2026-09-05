type Variant = "note" | "tip" | "warning" | "verify";

const styles: Record<Variant, { label: string; className: string }> = {
  note: {
    label: "Note",
    className:
      "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/60",
  },
  tip: {
    label: "Tip",
    className:
      "border-primary-400 bg-primary-50 dark:border-primary-700 dark:bg-primary-900/20",
  },
  warning: {
    label: "Watch out",
    className:
      "border-amber-400 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/30",
  },
  verify: {
    label: "Verify before relying on this",
    className:
      "border-dashed border-gray-400 bg-transparent dark:border-gray-600",
  },
};

export default function Callout({
  variant = "note",
  title,
  children,
}: {
  variant?: Variant;
  title?: string;
  children: React.ReactNode;
}) {
  const style = styles[variant];

  return (
    <aside className={`my-6 rounded-lg border-l-4 p-4 ${style.className}`}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
        {title ?? style.label}
      </p>
      <div className="prose prose-sm prose-gray max-w-none dark:prose-invert prose-p:my-2">
        {children}
      </div>
    </aside>
  );
}
