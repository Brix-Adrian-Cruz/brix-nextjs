/**
 * Prints the moment this component rendered on the server.
 * Comparing this timestamp across refreshes is what makes each rendering
 * strategy visible: frozen means cached, always-changing means dynamic.
 */
export default function RenderStamp({
  label,
  time,
}: {
  label: string;
  time: string;
}) {
  return (
    <div className="my-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
      <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="mt-1 font-mono text-2xl font-bold text-primary-600 dark:text-primary-400">
        {time}
      </p>
    </div>
  );
}
