import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/cache-handler";

export const metadata: Metadata = {
  title: "The Pantheon Cache Handler",
  description: "Install it, configure it, and prove it is working.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>The problem it solves</h2>
        <p>
          By default Next.js caches in the instance&apos;s own memory and
          filesystem. On the platform that is the wrong place: instances are
          ephemeral and there can be more than one. Two consequences follow
          immediately.
        </p>
        <ul>
          <li>
            A page revalidated on instance A is still stale on instance B, so
            visitors see different content depending on where they land.
          </li>
          <li>
            Every redeploy throws the whole cache away, so the first visitor
            after each deploy pays full render cost for every page.
          </li>
        </ul>
        <p>
          The cache handler moves that storage somewhere shared and durable, so
          the cache is one thing rather than one per instance.
        </p>

        <h2>This repository already has it</h2>
        <p>
          Everything below is live in this project — open the files and read the
          working version rather than trusting the snippets.
        </p>

        <h3>1. Install</h3>
        <pre>
          <code>npm install @pantheon-systems/nextjs-cache-handler</code>
        </pre>

        <h3>
          2. <code>cacheHandler.ts</code>
        </h3>
        <p>
          Handles ISR, route handlers, and the fetch cache — the long-standing
          Next.js caches.
        </p>
        <pre>
          <code>{`import { createCacheHandler } from '@pantheon-systems/nextjs-cache-handler';

const CacheHandler = createCacheHandler({
  type: 'auto', // GCS if CACHE_BUCKET exists, else file-based
});

export default CacheHandler;`}</code>
        </pre>

        <p>
          <code>type: &apos;auto&apos;</code> is what lets the same code work in
          both places: on the platform <code>CACHE_BUCKET</code> is set and it
          uses shared object storage, while locally it falls back to files.
        </p>

        <h3>
          3. <code>use-cache-handler.ts</code>
        </h3>
        <p>
          A second, separate handler for the newer{" "}
          <code>&quot;use cache&quot;</code> directive. Both are needed; they
          serve different caches.
        </p>
        <pre>
          <code>{`import { createUseCacheHandler } from '@pantheon-systems/nextjs-cache-handler';

const UseCacheHandlerClass = createUseCacheHandler({ type: 'auto' });
const handler = new UseCacheHandlerClass();

const useCacheHandler = {
  get: handler.get.bind(handler),
  set: handler.set.bind(handler),
  refreshTags: handler.refreshTags.bind(handler),
  getExpiration: handler.getExpiration.bind(handler),
  updateTags: handler.updateTags.bind(handler),
};

export default useCacheHandler;`}</code>
        </pre>

        <h3>
          4. Wire both into <code>next.config.ts</code>
        </h3>
        <pre>
          <code>{`transpilePackages: ['@pantheon-systems/nextjs-cache-handler'],

// The legacy caches
cacheHandler: path.resolve('./cacheHandler.ts'),

// The "use cache" directive
cacheHandlers: {
  default: path.resolve('./use-cache-handler.ts'),
  remote:  path.resolve('./use-cache-handler.ts'),
},

// Force everything through the handler rather than local memory
cacheMaxMemorySize: 0,`}</code>
        </pre>
      </div>

      <Callout variant="warning" title="cacheMaxMemorySize: 0 is not a typo">
        <p>
          Leaving the in-memory cache enabled means Next.js answers from local
          memory and your handler is bypassed — it looks installed, and does
          nothing. Setting it to <code>0</code> is what actually routes cache
          reads and writes through the handler.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Proving it works</h2>
        <p>
          &quot;It built successfully&quot; is not evidence. Three checks, in
          increasing order of confidence:
        </p>

        <h3>Locally, watch it log</h3>
        <pre>
          <code>{`npm run build

# Lines like this in the output mean the handler is being called:
[UseCacheFileHandler] SET ["...","...",[]]`}</code>
        </pre>
        <p>
          That is genuine output from building this project. If you see no
          handler lines at all, it is not wired up.
        </p>

        <h3>Locally, watch the store fill</h3>
        <pre>
          <code>{`npm run build && ls -la .cache/`}</code>
        </pre>
        <p>
          The file-based fallback writes here. This repo tracks{" "}
          <code>.cache/build-meta.json</code>, so you can see the build id
          change between builds.
        </p>

        <h3>Deployed, check behavior across instances</h3>
        <p>
          The real test is the one that was broken before: load a revalidating
          page repeatedly on the deployed site. If the timestamp bounces
          backwards and forwards between two values, you are hitting separate
          per-instance caches and the handler is not doing its job. A single
          coherent value that advances on schedule is what correct looks like —
          the{" "}
          <a href="/learn/rendering/revalidated">revalidated demo</a> is a
          ready-made page for exactly this test.
        </p>
      </div>

      <Callout variant="tip" title="The Pantheon Site Integration GitHub app">
        <p>
          This is the app that grants the platform access to your repository, on
          a per-repository basis. When a repo does not show up during site
          creation, or builds stop triggering after a repo is renamed or
          transferred, check its installation and repository access on the
          GitHub side before assuming a platform fault.
        </p>
      </Callout>

      <LessonNav href={HREF} />
    </article>
  );
}
