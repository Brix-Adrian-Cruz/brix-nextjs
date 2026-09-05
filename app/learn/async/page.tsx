import type { Metadata } from "next";
import AsyncDemo from "@/components/learn/AsyncDemo";
import Callout from "@/components/learn/Callout";
import Demo from "@/components/learn/Demo";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/async";

export const metadata: Metadata = {
  title: "Fetch, promises, and async/await",
  description: "How JavaScript waits for things it cannot get instantly.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Why any of this exists</h2>
        <p>
          JavaScript runs on a single thread. If fetching a CMS response blocked
          that thread, nothing else could happen while you waited. So anything
          slow returns a <strong>promise</strong> — a placeholder for a value
          that is not here yet.
        </p>

        <h2>A promise has three states</h2>
        <p>
          <em>Pending</em> while the work is in flight, then either{" "}
          <em>fulfilled</em> with a value or <em>rejected</em> with an error. It
          settles exactly once and never changes after that.
        </p>

        <h2>async/await</h2>
        <p>
          <code>await</code> pauses the function until the promise settles, so
          asynchronous code reads top to bottom like ordinary code. You can only
          use it inside a function marked <code>async</code> — and an{" "}
          <code>async</code> function always returns a promise, whatever you
          return from it.
        </p>

        <pre>
          <code>{`async function getPosts() {
  const response = await fetch("https://example.com/wp-json/wp/v2/posts");

  // fetch does NOT throw on 404 or 500 — you must check this yourself.
  if (!response.ok) {
    throw new Error(\`CMS returned \${response.status}\`);
  }

  return response.json(); // also async, so it needs awaiting too
}`}</code>
        </pre>
      </div>

      <Callout variant="warning" title="fetch only rejects on network failure">
        <p>
          A 404 or a 500 is a <em>successful</em> fetch as far as the promise is
          concerned — the request reached the server and came back. Without the{" "}
          <code>response.ok</code> check you will happily parse an error page as
          if it were your data, and the real failure surfaces much later as
          something confusing like &quot;cannot read property map of
          undefined&quot;.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Sequential vs parallel</h2>
        <p>
          This is the single highest-value thing on this page. Two requests that
          do not depend on each other should not wait for each other. Run the
          demo and compare the totals.
        </p>
      </div>

      <Demo
        title="Awaiting in sequence vs Promise.all"
        hint="Each simulated request takes 600ms. Watch the total time."
      >
        <AsyncDemo />
      </Demo>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <p>
          The trap is a loop. This looks reasonable and is roughly N times
          slower than it needs to be:
        </p>

        <pre>
          <code>{`// Slow: each iteration waits for the previous one
const posts = [];
for (const id of ids) {
  posts.push(await getPost(id));
}

// Fast: start them all, then wait once
const posts = await Promise.all(ids.map((id) => getPost(id)));`}</code>
        </pre>

        <p>
          <code>Promise.all</code> rejects as soon as any one promise rejects.
          When you would rather collect successes and failures together, use{" "}
          <code>Promise.allSettled</code>.
        </p>

        <h2>Where this shows up in Next.js</h2>
        <p>
          Server components can be <code>async</code> and awaited directly,
          which is why data loading in the App Router looks so plain. This
          site&apos;s own post loader in{" "}
          <span><code>lib/posts.ts</code>
          </span>{" "}
          reads every markdown file in parallel for exactly the reason above:
        </p>

        <pre>
          <code>{`const posts = await Promise.all(
  fileNames.map(async (fileName) => {
    const fileContents = await fs.readFile(filePath, "utf8");
    // ...parse it
  }),
);`}</code>
        </pre>
      </div>

      <LessonNav href={HREF} />
    </article>
  );
}
