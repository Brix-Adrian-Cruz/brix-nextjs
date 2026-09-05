import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-primary-600 dark:text-primary-400">
        404
      </p>
      <h1 className="text-2xl font-bold">This page could not be found.</h1>
      <p className="text-slate-600 dark:text-slate-400">
        The link may be broken, or the post may have been renamed.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md bg-primary-600 px-4 py-2 font-medium text-white hover:bg-primary-700"
      >
        Back to home
      </Link>
    </div>
  );
}
