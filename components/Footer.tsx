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
    <footer className="mt-20 border-t border-slate-200 py-8 dark:border-slate-800">
      <div className="flex flex-col items-center gap-3 font-mono text-xs text-slate-500 dark:text-slate-500">
        {socialLinks.length > 0 && (
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
        )}
        <div className="flex gap-2">
          <span>© {new Date().getFullYear()}</span>
          <span aria-hidden="true">·</span>
          <Link href="/" className="hover:underline">
            {siteMetadata.title}
          </Link>
        </div>
        <p className="text-center text-slate-400 dark:text-slate-600">
          Internal reference. Verify against current documentation before
          relying on any step.
        </p>
      </div>
    </footer>
  );
}
