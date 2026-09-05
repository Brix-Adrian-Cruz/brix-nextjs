// Edit this file to make the site yours. Everything here is used across
// the header, footer, page metadata, and the about page.

export const siteMetadata = {
  title: "Brix's Blog",
  author: "Brix Adrian Cruz",
  headerTitle: "Brix's Blog",
  description:
    "Notes on Next.js, web performance, and building things on the web.",
  language: "en-us",
  siteUrl: "https://example.com",
  locale: "en-US",
  // Shown on the home page hero and the about page.
  occupation: "Web Engineer",
  company: "Pantheon",
  bio: "I build and maintain fast websites. Here I write about Next.js, caching, and the small details that make the web feel quick.",
  // Set any of these to an empty string to hide the icon.
  email: "you@example.com",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  x: "https://x.com/",
};

// Links shown in the site header.
export const headerNavLinks = [
  { href: "/blog", title: "Blog" },
  { href: "/news", title: "News" },
  { href: "/learn", title: "Learn" },
  { href: "/tags", title: "Tags" },
  { href: "/about", title: "About" },
];

// How many posts to show on the home page.
export const POSTS_ON_HOME_PAGE = 5;
