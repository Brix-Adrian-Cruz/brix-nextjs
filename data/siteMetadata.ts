// Edit this file to make the site yours. Everything here is used across
// the header, footer, page metadata, and the about page.

export const siteMetadata = {
  title: "Next.js Support Playbooks",
  shortTitle: "Playbooks",
  // Shown as the byline on posts. Kept as a team rather than a person, since
  // these are operational runbooks rather than personal writing.
  author: "Support Engineering",
  headerTitle: "Next.js Playbooks",
  description:
    "Runbooks for handling Next.js sites on Pantheon: triage, logs, build failures, caching, and escalation.",
  language: "en-us",
  siteUrl: "",
  locale: "en-US",
  tagline: "Triage, diagnose, escalate.",
  intro:
    "Field guides for Next.js sites on Pantheon. Start with triage to work out which layer owns the problem, then follow the playbook for that layer.",
  // Set any of these to an empty string to hide the link.
  email: "",
  github: "",
  linkedin: "",
  x: "",
};

// Links shown in the site header.
export const headerNavLinks = [
  { href: "/blog", title: "Playbooks" },
  { href: "/news", title: "News" },
  { href: "/learn", title: "Learn" },
  { href: "/tags", title: "Topics" },
  { href: "/about", title: "About" },
];

// How many playbooks to show on the home page.
export const POSTS_ON_HOME_PAGE = 8;
