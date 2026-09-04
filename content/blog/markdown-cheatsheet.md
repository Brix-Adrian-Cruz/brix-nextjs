---
title: "Markdown cheatsheet"
date: "2026-08-04"
tags: ["guide"]
summary: "A reference page showing every piece of Markdown this blog knows how to render."
---

Keep this post around while you write — it doubles as a visual test that your
styling looks right.

## Headings

Use `##` for sections and `###` for sub-sections. Skip `#`, since the post
title is already the page's only top-level heading.

### A sub-section

Text under a sub-heading.

## Text

You can write **bold**, *italic*, `inline code`, and
[links to other pages](/blog).

## Lists

Unordered:

- First item
- Second item
  - A nested item
- Third item

Ordered:

1. Install the dependencies
2. Run the dev server
3. Open the browser

## Quotes

> The best time to plant a tree was twenty years ago.
> The second best time is now.

## Code

```ts
type Post = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

const featured: Post[] = posts.filter((post) => post.tags.includes("guide"));
```

## Tables

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build for production |
| `npm start` | Serve the production build |

## Images

Put images in `public/` and reference them by path:

```markdown
![Alt text describing the image](/my-image.png)
```

## Horizontal rules

---

And that's everything.
