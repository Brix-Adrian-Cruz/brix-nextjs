import { createHash } from "node:crypto";
import { createHighlighter, type Highlighter } from "shiki";
import { cacheLife } from "next/cache";

// One highlighter instance per server process, loaded lazily and reused
// across every request/build — createHighlighter() is expensive (it loads
// grammar/theme JSON), so paying that cost once matters far more than the
// marginal memory of keeping languages we don't end up using loaded.
const THEMES = { light: "github-light", dark: "github-dark" } as const;
const LANGS = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "json",
  "bash",
  "css",
  "html",
  "yaml",
  "markdown",
  "diff",
  "text",
];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({
    themes: Object.values(THEMES),
    langs: LANGS,
  });
  return highlighterPromise;
}

const LANG_ALIASES: Record<string, string> = {
  js: "js",
  javascript: "js",
  jsx: "jsx",
  ts: "ts",
  typescript: "ts",
  tsx: "tsx",
  sh: "bash",
  shell: "bash",
  bash: "bash",
  zsh: "bash",
  console: "bash",
  json: "json",
  css: "css",
  html: "html",
  yaml: "yaml",
  yml: "yaml",
  md: "markdown",
  markdown: "markdown",
  diff: "diff",
};

function normalizeLang(lang?: string): string {
  if (!lang) return "text";
  return LANG_ALIASES[lang.toLowerCase()] ?? "text";
}

/** Wraps Shiki's output with a copy button. Read by the click handler in components/CodeCopyEnhancer.tsx. */
function wrapWithCopyButton(shikiHtml: string): string {
  return `<div class="code-block" data-code-block><button type="button" class="code-copy-btn" data-copy-button aria-label="Copy code">Copy</button>${shikiHtml}</div>`;
}

// The cache handler this project uses persists "use cache" entries to disk,
// filed under a name built from the full argument list — fine for short
// arguments, but a multi-line code snippet blows past filesystem filename
// limits (ENAMETOOLONG). So the cached function below takes a short digest
// instead of the source, and looks the source up here rather than through
// its own arguments. That's still safe: the digest is a deterministic
// function of (lang, code), so same digest always means same source.
const sourceByDigest = new Map<string, string>();

function digestFor(lang: string, code: string): string {
  return createHash("sha1").update(lang).update("\0").update(code).digest("hex");
}

/** Renders one code block to highlighted HTML, light+dark themes baked in via CSS vars. */
export async function highlightCodeToHtml(
  code: string,
  lang?: string,
): Promise<string> {
  const resolvedLang = normalizeLang(lang);
  const digest = digestFor(resolvedLang, code);
  sourceByDigest.set(digest, code);
  return highlightByDigest(digest, resolvedLang);
}

async function highlightByDigest(digest: string, lang: string): Promise<string> {
  // Shiki reads the clock internally (perf instrumentation), which Cache
  // Components treats like any other current-time read: it has to happen
  // inside a "use cache" boundary. Highlighted output is a pure function of
  // (code, lang), so caching it indefinitely is exactly right.
  "use cache";
  cacheLife("max");

  const code = sourceByDigest.get(digest);
  if (code === undefined) {
    throw new Error(`highlightCode: no source registered for digest ${digest}`);
  }

  const highlighter = await getHighlighter();
  const html = highlighter.codeToHtml(code, { lang, themes: THEMES });

  return wrapWithCopyButton(html);
}

const ENTITY_MAP: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#39;": "'",
  "&amp;": "&",
};

function decodeEntities(text: string): string {
  return text.replace(/&lt;|&gt;|&quot;|&#x27;|&#39;|&amp;/g, (m) => ENTITY_MAP[m]);
}

/** Cheap heuristic — these snippets have no fenced-code language hint to go on. */
function guessLang(code: string): string {
  const trimmed = code.trim();
  if (/^\{[\s\S]*\}$/.test(trimmed) && /"[\w-]+"\s*:/.test(trimmed)) return "json";
  if (/^(TypeError|Error|ReferenceError|SyntaxError|Route \(app\))/.test(trimmed)) {
    return "text";
  }
  if (
    /^(ls|cd|npm|yarn|pnpm|curl|grep|cat|git|export|echo|bun)\b/m.test(trimmed) ||
    trimmed.split("\n").every((line) => line.startsWith("$") || line.trim() === "")
  ) {
    return "bash";
  }
  return "tsx";
}

/**
 * Highlights bare `<pre><code>...</code></pre>` blocks inside an already
 * -rendered HTML string (the /training and /learn content, authored as
 * hand-written HTML rather than Markdown, so there's no fence language to
 * read — this is used only where that content has no class/lang hint).
 */
export async function highlightRawHtml(html: string): Promise<string> {
  const regex = /<pre><code>([\s\S]*?)<\/code><\/pre>/g;
  const matches = [...html.matchAll(regex)];
  if (matches.length === 0) return html;

  const replacements = await Promise.all(
    matches.map(async (match) => {
      const decoded = decodeEntities(match[1]);
      const highlighted = await highlightCodeToHtml(decoded, guessLang(decoded));
      return { start: match.index, end: match.index + match[0].length, highlighted };
    }),
  );

  let result = "";
  let lastIndex = 0;
  for (const { start, end, highlighted } of replacements) {
    result += html.slice(lastIndex, start) + highlighted;
    lastIndex = end;
  }
  result += html.slice(lastIndex);
  return result;
}
