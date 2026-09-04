import Link from "next/link";
import { siteMetadata } from "@/data/siteMetadata";

// Only the links you actually filled in are rendered.
const socialLinks = [
  { title: "Email", href: siteMetadata.email && `mailto:${siteMetadata.email}` },
  { title: "GitHub", href: siteMetadata.github },
  { title: "LinkedIn", href: siteMetadata.linkedin },
  { title: "X", href: siteMetadata.x },
].filter((link): link is { title: string; href: string } => Boolean(link.href));

export default async function Footer() {
  // Reading the current clock during a render has to be cached, otherwise
  // Next.js can't prerender the page. "use cache" makes that explicit.
  "use cache";

  return (
    <footer className="mt-16 border-t border-gray-200 py-8 dark:border-gray-800">
      <div className="flex flex-col items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {link.title}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          <span>© {new Date().getFullYear()}</span>
          <span>·</span>
          <Link href="/" className="hover:underline">
            {siteMetadata.title}
          </Link>
        </div>
      </div>
    </footer>
  );
}
