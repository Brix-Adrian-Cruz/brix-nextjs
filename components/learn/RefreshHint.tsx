"use client";

import { useRouter } from "next/navigation";

/** A hard refresh button, so the demo does not depend on client-side cache. */
export default function RefreshHint({ note }: { note: string }) {
  const router = useRouter();

  return (
    <div className="my-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => router.refresh()}
        className="rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-primary-700"
      >
        Refresh this page
      </button>
      <p className="text-sm text-slate-600 dark:text-slate-400">{note}</p>
    </div>
  );
}
