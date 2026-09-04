---
title: "Styling with Tailwind CSS v4"
date: "2026-08-20"
tags: ["tailwind", "css", "guide"]
summary: "Tailwind v4 drops the JavaScript config file. Here is where the theme now lives and how dark mode is wired up."
---

Tailwind v4 changed how configuration works. There is no `tailwind.config.js`
in this project, and that is on purpose — everything lives in CSS now.

## The theme lives in CSS

Open `app/globals.css`. The whole setup is three ideas:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-primary-500: oklch(0.62 0.19 259);
}
```

`@theme` defines design tokens. Every token you add becomes a utility class —
`--color-primary-500` gives you `text-primary-500`, `bg-primary-500`, and
`border-primary-500` without touching a config file.

To change the accent color of this entire site, edit that one line.

## Dark mode

By default Tailwind v4 follows the operating system. This site uses a manual
toggle instead, which takes one extra line:

```css
@custom-variant dark (&:is(.dark *));
```

That teaches `dark:` to look for a `.dark` class on a parent element instead of
the OS setting. The toggle in the header adds and removes that class on
`<html>`, and remembers the choice in `localStorage`.

## Prose styling

Long-form writing is handled by the typography plugin. The post body is wrapped
in a single class:

```jsx
<article className="prose dark:prose-invert">{content}</article>
```

That one class styles every heading, list, blockquote, table, and code block
inside it. You almost never need to style Markdown output by hand.
