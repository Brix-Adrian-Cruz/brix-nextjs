import type { Metadata } from "next";
import ArrayOpsDemo from "@/components/learn/ArrayOpsDemo";
import Callout from "@/components/learn/Callout";
import Demo from "@/components/learn/Demo";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/javascript";

export const metadata: Metadata = {
  title: "JavaScript fundamentals",
  description:
    "Variables, objects and arrays, loops, functions, and array operations.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Variables and data types</h2>
        <p>
          Use <code>const</code> by default and <code>let</code> only when you
          genuinely reassign. <code>var</code> has scoping rules that surprise
          people; there is no reason to reach for it in new code.
        </p>

        <pre>
          <code>{`const title = "Welcome to the blog";  // string
const views = 1240;                   // number
const published = true;               // boolean
const tags = ["guide", "next-js"];    // array
const author = { name: "Brix" };      // object
let draft;                            // undefined until assigned`}</code>
        </pre>

        <p>
          <code>const</code> stops the <em>variable</em> from being pointed at
          something else. It does not freeze the value: you can still push to a{" "}
          <code>const</code> array or change an object&apos;s properties. That
          distinction catches almost everyone once.
        </p>

        <h2>Objects and arrays</h2>
        <p>
          An object holds named values; an array holds ordered ones. Nearly all
          data you get from a CMS is some nesting of these two.
        </p>

        <pre>
          <code>{`const post = {
  title: "Caching in Next.js 16",
  views: 2130,
  tags: ["next-js", "performance"],
  author: { name: "Brix", role: "Web Engineer" },
};

post.title;            // "Caching in Next.js 16"
post.author.name;      // "Brix"
post.tags[0];          // "next-js"
post.author?.email;    // undefined — no crash, thanks to ?.`}</code>
        </pre>

        <p>
          That <code>?.</code> is optional chaining, and it matters more than it
          looks. CMS responses are full of fields that are sometimes missing;{" "}
          <code>post.author.name</code> throws when <code>author</code> is
          absent, while <code>post.author?.name</code> quietly gives{" "}
          <code>undefined</code>.
        </p>

        <h2>Loops and control flow</h2>
        <p>
          You will write far fewer explicit loops in React than you might
          expect, because the array methods below usually read better. Still,
          the basics:
        </p>

        <pre>
          <code>{`for (const tag of post.tags) {
  console.log(tag);
}

if (post.views > 1000) {
  console.log("popular");
} else {
  console.log("quiet");
}

// A common shorthand for "use this, or fall back"
const summary = post.summary ?? "No summary yet";`}</code>
        </pre>

        <p>
          <code>??</code> falls back only for <code>null</code> and{" "}
          <code>undefined</code>, while <code>||</code> also falls back for{" "}
          <code>0</code> and <code>&quot;&quot;</code>. For a view count,{" "}
          <code>views || 100</code> would wrongly replace a real zero.
        </p>

        <h2>Functions</h2>
        <pre>
          <code>{`// Declaration
function formatViews(views) {
  return views.toLocaleString();
}

// Arrow function — what you'll see most in React code
const formatViews = (views) => views.toLocaleString();

// Default parameter
const truncate = (text, max = 80) => text.slice(0, max);`}</code>
        </pre>

        <h2>Array operations</h2>
        <p>
          These four cover most day-to-day data work. Press a button to run each
          one against the same small array and see exactly what comes back.
        </p>
      </div>

      <Demo
        title="Array methods, running live"
        hint="This is a client component — the code below really executes in your browser."
      >
        <ArrayOpsDemo />
      </Demo>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <p>
          The one to internalise is <code>map</code>, because JSX uses it
          constantly. Rendering a list of posts is just mapping each post to
          some markup — exactly what{" "}
          <span><code>app/blog/page.tsx</code>
          </span>{" "}
          in this repo does:
        </p>

        <pre>
          <code>{`{posts.map((post) => (
  <PostListItem key={post.slug} post={post} />
))}`}</code>
        </pre>
      </div>

      <Callout variant="warning" title="The key prop">
        <p>
          Every element produced by a <code>map</code> in JSX needs a stable,
          unique <code>key</code>. Use an id or slug — not the array index,
          which changes when items are reordered and causes React to reuse the
          wrong element.
        </p>
      </Callout>

      <LessonNav href={HREF} />
    </article>
  );
}
