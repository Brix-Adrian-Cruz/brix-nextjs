import Link from "next/link";
import { headerNavLinks, siteMetadata } from "@/data/siteMetadata";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-8">
      <Link href="/" className="text-lg font-bold tracking-tight">
        {siteMetadata.headerTitle}
      </Link>

      <nav className="flex items-center gap-2 sm:gap-5">
        {headerNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-2 py-1 text-sm font-medium text-gray-600 hover:text-primary-600 sm:text-base dark:text-gray-300 dark:hover:text-primary-400"
          >
            {link.title}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
