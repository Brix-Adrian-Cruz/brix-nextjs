// Edit this file to make the site yours. Everything here is used across
// the header, footer, page metadata, and the about page.

export const siteMetadata = {
  title: "Next.js Support Academy",
  shortTitle: "Academy",
  // Shown as the byline on posts. Kept as a team rather than a person, since
  // these are operational runbooks rather than personal writing.
  author: "Support Engineering",
  headerTitle: "NextJS Support",
  description:
    "A hands-on Next.js Support Academy — 30 days, six weeks — plus runbooks for triage, builds, caching, and escalation.",
  language: "en-us",
  siteUrl: "",
  locale: "en-US",
  tagline: "Train first. Triage after.",
  // Used on the /about page, which is specifically about the playbooks —
  // keep this one playbook-flavored. The home page hero uses homeIntro
  // below instead.
  intro:
    "Field guides for Next.js sites on Pantheon. Start with triage to work out which layer owns the problem, then follow the playbook for that layer.",
  homeIntro:
    "A hands-on Next.js Support Academy: 30 days across six weeks, building the skills to triage, diagnose, and escalate real Next.js tickets on Pantheon. The playbooks are here too, for when you just need the answer fast.",
  // Set any of these to an empty string to hide the link.
  email: "",
  github: "",
  linkedin: "",
  x: "",
};

// Links shown in the site header. Training leads since it's the site's
// main thread — the playbooks are reference material, not the front door.
export const headerNavLinks = [
  { href: "/training", title: "Training" },
  { href: "/learn", title: "Learn" },
  { href: "/blog", title: "Playbooks" },
  { href: "/news", title: "News" },
  { href: "/tags", title: "Topics" },
  { href: "/about", title: "About" },
];

// How many playbooks to show on the home page. Kept small — the home page
// leads with training, so this is a "recent" strip, not the main event.
export const POSTS_ON_HOME_PAGE = 4;
