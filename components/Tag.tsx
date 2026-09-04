import Link from "next/link";
import { slugifyTag } from "@/lib/posts";

export default function Tag({ text }: { text: string }) {
  return (
    <Link
      href={`/tags/${slugifyTag(text)}`}
      className="text-xs font-medium uppercase tracking-wide text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
    >
      {text}
    </Link>
  );
}
