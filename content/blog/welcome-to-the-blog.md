---
title: "Welcome to the blog"
date: "2026-08-28"
tags: ["next-js", "guide"]
summary: "A quick tour of how this blog is put together, where the posts live, and how to write your own."
---

Every post on this site is a plain Markdown file in `content/blog/`. There is no
database, no CMS, and no admin login. To publish, you add a file and deploy.

## Writing a post

Create a file like `content/blog/my-first-post.md`. The file name becomes the
URL, so that file is served at `/blog/my-first-post`.

Start the file with **frontmatter** — the block between the `---` lines:

```markdown
---
title: "My first post"
date: "2026-09-01"
tags: ["next-js"]
summary: "One or two sentences that show up in the post list."
---

Your writing starts here.
```

Only `title` and `date` are required. `tags` and `summary` are optional but
they make the listing pages much nicer.

## What you get for free

- The post appears on the home page and `/blog`, newest first
- Each tag gets its own page at `/tags/your-tag`
- Reading time is estimated from the word count
- Headings, code blocks, quotes, and tables are all styled for you

## Where things live

| Path | What it holds |
| --- | --- |
| `content/blog/` | Your posts, as Markdown files |
| `data/siteMetadata.ts` | Site title, bio, nav links, social links |
| `components/` | Header, footer, theme toggle, post cards |
| `lib/posts.ts` | Reads and sorts the Markdown files |

That's the whole site. Start by opening `data/siteMetadata.ts` and putting your
own name in it.
