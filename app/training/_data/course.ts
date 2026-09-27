// Full lesson content. Imported ONLY by Server Components so it never ships to the browser.
// Generated file: edit the source course, not this file.
export type QuizItem = { q: string; o: string[]; a: number; w: string };
export type Ref = { t: string; u: string };
export type Day = {
  id: number; week: number; mins: number; title: string; goal: string;
  plan: [string, number][]; learn: string; lab: string[]; knowhow: string;
  quiz: QuizItem[]; refs: Ref[];
};
export type Report = { s: string; layer: string; checks: string[]; pb: Ref; tk: Ref[] };

export const DAYS: Day[] = [
 {
  "id": 1,
  "week": 1,
  "mins": 30,
  "title": "Orientation: what exactly are we supporting?",
  "goal": "Tell apart the three things customers mean when they say \"Next.js\", and set up your tools.",
  "plan": [
   [
    "Learn",
    15
   ],
   [
    "Set up",
    15
   ]
  ],
  "learn": "<p>When a ticket mentions Next.js, it can mean three different setups. The playbooks split right away, so figuring out which one you have is always step one.</p><table><thead><tr><th>Setup</th><th>What it is</th><th>Where you debug</th></tr></thead><tbody><tr><td><b>Next.js Site</b> (current product)</td><td>Created by picking Next.js at site creation, like WordPress/Drupal. Dashboard URL contains <code>/node-site/</code>.</td><td>New dashboard, Build &amp; Runtime logs, Terminus, GCP via CSE Booster.</td></tr><tr><td><b>Front-End Site (FES)</b> (legacy, shutting down)</td><td>Pantheon's 2022 decoupled product. It can run Next.js or Gatsby, and it has its own dashboard and pipeline.</td><td>FES dashboard; ask in #cse-decoupled.</td></tr><tr><td><b>Next.js hosted elsewhere</b></td><td>Vercel/Netlify/etc. front end calling a WordPress/Drupal backend on Pantheon.</td><td>Only the Pantheon CMS side is ours.</td></tr></tbody></table><h4>Ground rules</h4><ul><li>Next.js is available on <b>Gold, Platinum, and Diamond</b> workspaces, because it depends on Multidev.</li><li>A decoupled customer pays for <b>two site plans</b>: one for the Next.js front end (sized for most of the traffic) and one for the CMS back end.</li><li>Support is expected to fully support Next.js Sites, front end and back end. The exception is a back end hosted outside Pantheon.</li><li>For application-level problems we audit and guide. <b>The customer always makes the code change</b>, just like with CMS issues.</li></ul>",
  "lab": [
   "Install Node.js LTS, Git, and <b>Terminus 4.2.0+</b> (<code>terminus --version</code>, then <code>terminus self:update</code>). As of 4.2.0, secrets, repository, and log commands are built into core.",
   "Install the <b>Pantheon CSE Booster</b> Chrome extension. It adds a Next.js badge and purple GCP log buttons to dashboards.",
   "Join #ask-nextjs and #cse-decoupled in Slack.",
   "Open the dashboards for <b>brix-nextjs</b> (Next.js) and <b>brix-nextjs-cms</b> (WordPress back end). Confirm that only brix-nextjs has <code>/node-site/</code> in its URL, and write down both site UUIDs.",
   "Run <code>terminus site:info brix-nextjs</code> and <code>terminus site:info brix-nextjs-cms</code>, then compare the framework field."
  ],
  "knowhow": "Your first reply on any \"Next.js\" ticket should settle <i>which product</i> it is. Everything after that (logs, dashboards, channels, scope) depends on the answer. <br><br><b>Your lab pair:</b> brix-nextjs is a Next.js Site (the current product), and brix-nextjs-cms is a WordPress site used as its back end. That gives you both halves of a decoupled setup to break and fix.",
  "quiz": [
   {
    "q": "Which workspace tiers can create Next.js sites?",
    "o": [
     "All tiers",
     "Gold, Platinum, Diamond",
     "Diamond only",
     "Silver and above"
    ],
    "a": 1,
    "w": "Next.js requires Multidev, which is available on Gold, Platinum, and Diamond workspaces."
   },
   {
    "q": "A customer's Front-End Site (FES) is failing to build. Where should you ask for help?",
    "o": [
     "#cse-decoupled",
     "Engineering on-call directly",
     "Tell the customer FES is unsupported",
     "#ask-nextjs"
    ],
    "a": 0,
    "w": "The Handling Next.js sites playbook says to handle FES tickets like normal and post in #cse-decoupled."
   },
   {
    "q": "A customer runs WordPress + Next.js, both on Pantheon. How many site plans?",
    "o": [
     "One: the Next.js plan includes the CMS",
     "None: decoupled is free",
     "Two: one front end, one back end",
     "Depends on the router"
    ],
    "a": 2,
    "w": "Each codebase needs its own plan. The back end can usually be smaller because caching reduces hits to it."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Handling Next.js sites",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4348248146"
   },
   {
    "t": "Docs: Next.js Overview",
    "u": "https://docs.pantheon.io/nextjs"
   },
   {
    "t": "Next.js on Pantheon FAQ (internal)",
    "u": "https://docs.google.com/document/d/13ykQJR9p8lnWPA_gXdpv3G5nN2PEi1oxTTaT_rxqXFk"
   },
   {
    "t": "Pantheon CSE Booster (Chrome)",
    "u": "https://chromewebstore.google.com/detail/pantheon-cse-booster/bcagaciggkfdljobempjhcnhfgfgchka"
   },
   {
    "t": "Slack: #ask-nextjs",
    "u": "https://pantheon.enterprise.slack.com/archives/C09LX4DKH0E"
   },
   {
    "t": "Slack: #cse-decoupled",
    "u": "https://pantheon.enterprise.slack.com/archives/C02KX7929B7"
   }
  ]
 },
 {
  "id": 2,
  "week": 1,
  "mins": 45,
  "title": "JavaScript I: values, objects, arrays, functions",
  "goal": "Read the kind of JavaScript you'll see in customer repos and spot \"undefined data\" bugs.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Practice",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<p>You don't need to become a JS developer. You do need to follow a customer's code from \"fetch data\" to \"render page\". Most of that code uses a small set of building blocks.</p><pre><code>const site = &quot;brix-nextjs&quot;;          // const: can&#x27;t be reassigned\nlet count = 0;                         // let: can change\nconst post = {                         // object\n  id: 12,\n  title: &quot;Hello&quot;,\n  tags: [&quot;news&quot;, &quot;release&quot;],           // array\n  author: { name: &quot;Ana&quot; },\n};\n\nconst { title, author } = post;        // destructuring\nconst label = `${title} by ${author.name}`; // template literal\n\nfunction slugify(text) {               // function declaration\n  return text.toLowerCase().replace(/\\s+/g, &quot;-&quot;);\n}\nconst shout = (s) =&gt; s.toUpperCase();  // arrow function\n\npost.author?.name;      // optional chaining: undefined instead of crashing\npost.summary ?? &quot;none&quot;; // nullish coalescing: fallback for null/undefined\nif (post.tags.length &gt; 0) { count++; } // control flow</code></pre><h4>The error you'll see most often</h4><pre><code>TypeError: Cannot read properties of undefined (reading &#x27;title&#x27;)</code></pre><p>This means the code expected an object, such as a post from the CMS, and got <code>undefined</code>. In a Next.js ticket, the usual cause is that the API returned nothing, returned an error, or returned a different shape than the code expected.</p>",
  "lab": [
   "Open your browser DevTools console and paste the snippet above. Then try <code>post.editor.name</code> and read the error.",
   "Change it to <code>post.editor?.name</code> and see what comes back.",
   "Write a function that takes a post object and returns <code>&quot;Untitled&quot;</code> when there's no title."
  ],
  "knowhow": "When you see \"Cannot read properties of undefined\" in a Next.js runtime log, check the data before the code: did the CMS/API actually return what the code expected?",
  "quiz": [
   {
    "q": "What does `post.author?.name` return when `post.author` is undefined?",
    "o": [
     "undefined",
     "An empty string",
     "null",
     "Throws a TypeError"
    ],
    "a": 0,
    "w": "Optional chaining stops at the missing value and returns undefined instead of throwing."
   },
   {
    "q": "Which declaration can NOT be reassigned?",
    "o": [
     "let",
     "function parameters",
     "const",
     "var"
    ],
    "a": 2,
    "w": "const bindings can't be reassigned, although objects assigned to them can still be mutated."
   },
   {
    "q": "\"Cannot read properties of undefined (reading 'slug')\" most likely points to…",
    "o": [
     "An expired SSL cert",
     "A Pantheon CDN outage",
     "Data the code expected was missing",
     "A DNS problem"
    ],
    "a": 2,
    "w": "The code tried to read .slug on something that was undefined, which usually means missing or malformed API data."
   }
  ],
  "refs": [
   {
    "t": "MDN: JavaScript Guide",
    "u": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
   },
   {
    "t": "Next.js: Training Curriculum (CS)",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/5201264641"
   }
  ]
 },
 {
  "id": 3,
  "week": 1,
  "mins": 40,
  "title": "JavaScript II: map/filter, modules, errors, TypeScript",
  "goal": "Follow imports across files, read a stack trace, and know why TypeScript errors break builds.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Practice",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<h4>Array operations (in nearly every page component)</h4><pre><code>const posts = await getPosts();\nconst published = posts.filter((p) =&gt; p.status === &quot;publish&quot;);\nconst cards = published.map((p) =&gt; ({ href: `/blog/${p.slug}`, title: p.title }));\nconst first = posts.find((p) =&gt; p.featured);</code></pre><h4>Modules</h4><ul><li><code>export default function Page()</code> vs <code>export async function getPosts()</code>. Imports look like <code>import Page from &#x27;./page&#x27;</code> vs <code>import { getPosts } from &#x27;@/lib/api&#x27;</code>.</li><li><code>@/</code> is a path alias, usually pointing to the project root or <code>src/</code>. It's configured in <code>tsconfig.json</code>.</li><li>Older code uses <code>require()</code> (CommonJS), and newer code uses <code>import</code> (ESM). <code>.mjs</code> files are ESM.</li></ul><h4>Errors &amp; stack traces</h4><pre><code>try {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`CMS responded ${res.status}`);\n} catch (err) {\n  console.error(&quot;Failed to load posts&quot;, err); // shows in runtime logs\n}</code></pre><p>In a stack trace, the <b>first frame inside the customer's code</b> (not <code>node_modules</code>) is usually the place to start. Read it as <code>file:line:column</code>.</p><h4>TypeScript</h4><p><code>.ts/.tsx</code> files are JavaScript with types. <code>next dev</code> is forgiving, but <code>next build</code> type-checks. A type error can \"work locally\" and still <b>fail the Pantheon build</b>.</p>",
  "lab": [
   "In your local <b>brix-nextjs</b> clone, open <code>app/page.tsx</code> (or <code>src/app/page.tsx</code>). Follow every import back to its source file.",
   "Open <code>app/training/_components/Quiz.tsx</code> (this course). Find the <code>.map(</code> that renders the answer buttons and explain what it produces.",
   "Run <code>npm run build</code> in brix-nextjs. Add a deliberate type error in <code>app/training/_data/course.ts</code>, build again, compare the output, then revert."
  ],
  "knowhow": "\"It works on my machine\" usually means the customer tested with <code>next dev</code>. Ask them to run <code>npm run build</code> locally with the same Node version. That reproduces most Pantheon build failures.",
  "quiz": [
   {
    "q": "Which command is closest to what Pantheon runs when building the site?",
    "o": [
     "npm start",
     "next dev",
     "node index.js",
     "npm run build"
    ],
    "a": 3,
    "w": "Pantheon runs a clean install, then npm run build."
   },
   {
    "q": "In a stack trace, which frame is usually most useful first?",
    "o": [
     "The first frame inside the customer's code",
     "The Node.js internals",
     "Any frame in node_modules",
     "The last line"
    ],
    "a": 0,
    "w": "Start at the first frame in the customer's own files. Library frames are rarely where the bug is."
   },
   {
    "q": "`.filter()` returns…",
    "o": [
     "true/false",
     "The original array, mutated",
     "A new array of matching elements",
     "The first matching element"
    ],
    "a": 2,
    "w": "filter returns a new array. find returns the first match, and some returns a boolean."
   }
  ],
  "refs": [
   {
    "t": "MDN: JavaScript Guide",
    "u": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
   },
   {
    "t": "nextjs.org: Docs",
    "u": "https://nextjs.org/docs"
   }
  ]
 },
 {
  "id": 4,
  "week": 1,
  "mins": 45,
  "title": "Async JavaScript: promises, async/await, fetch",
  "goal": "Understand how Next.js fetches CMS data, and where a failed fetch shows up (build vs runtime).",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Practice",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<p>Next.js relies heavily on async code. Most pages fetch content from WordPress, Drupal, Content Publisher, or an API.</p><pre><code>export async function getPosts() {\n  const base = process.env.WORDPRESS_API_URL;           // set via Secrets Manager\n  const res = await fetch(`${base}/wp/v2/posts`, {\n    next: { revalidate: 60, tags: [&quot;post-list&quot;] },    // Next.js cache hints\n  });\n  if (!res.ok) throw new Error(`WP ${res.status}`);\n  return res.json();                                   // also async\n}\n\nconst [posts, pages] = await Promise.all([getPosts(), getPages()]);</code></pre><h4>Where the failure shows up</h4><table><thead><tr><th>When the fetch runs</th><th>If it fails you see…</th></tr></thead><tbody><tr><td>During <code>next build</code> (static/SSG pages)</td><td><b>BUILD_FAILURE</b> in the Builds tab</td></tr><tr><td>On a request (SSR/ISR regeneration, route handlers)</td><td>Errors/500s in <b>Runtime Logs</b></td></tr><tr><td>In the browser (client components)</td><td>The browser console/network tab. <b>Not</b> in Pantheon logs.</td></tr></tbody></table><p>Common pitfalls: forgetting <code>await</code> (you get a Promise instead of data), not checking <code>res.ok</code>, and <code>base</code> being <code>undefined</code> because the secret isn't set, which produces a request to <code>undefined/wp/v2/posts</code>.</p>",
  "lab": [
   "In the browser console, run <code>await fetch(&quot;https://dev-brix-nextjs-cms.pantheonsite.io/wp-json/wp/v2/posts&quot;).then(r =&gt; r.status)</code>. That's your WordPress REST API.",
   "In <b>brix-nextjs</b>, find every <code>fetch(</code> and write down whether it runs at build, at request time, or in the browser.",
   "Find which env vars those fetches depend on, and check them with <code>terminus secret:site:list brix-nextjs</code>."
  ],
  "knowhow": "If a static page fetches CMS data during the build, the CMS must be reachable <i>and</i> the env var must exist <i>at build time</i>. A missing secret often shows up as a build failure, not a runtime error.",
  "quiz": [
   {
    "q": "A static page's data fetch fails during next build. What status do you expect?",
    "o": [
     "A 404 at runtime",
     "BUILD_FAILURE",
     "DEPLOYMENT_FAILURE",
     "Nothing, it retries"
    ],
    "a": 1,
    "w": "Build-time data fetching happens during the build step, so the build fails."
   },
   {
    "q": "A fetch in a \"use client\" component fails. Where will you see it?",
    "o": [
     "Build logs",
     "Browser console/network tab",
     "Cloud Build",
     "Runtime Logs"
    ],
    "a": 1,
    "w": "Client-side code runs in the visitor's browser, so Pantheon logs never see it."
   },
   {
    "q": "What does forgetting `await` before fetch() give you?",
    "o": [
     "A Promise instead of the data",
     "undefined",
     "An error",
     "The data, just slower"
    ],
    "a": 0,
    "w": "Without await, you hold an unresolved Promise."
   }
  ],
  "refs": [
   {
    "t": "MDN: Using promises",
    "u": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
   },
   {
    "t": "Docs: Build and Runtime Architecture",
    "u": "https://docs.pantheon.io/nextjs/architecture"
   }
  ]
 },
 {
  "id": 5,
  "week": 1,
  "mins": 45,
  "title": "npm, package.json & lock files + Week 1 check",
  "goal": "Know exactly what Pantheon reads from package.json, and why lock files matter.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Review",
    10
   ],
   [
    "Week check",
    15
   ]
  ],
  "learn": "<pre><code>{\n  &quot;name&quot;: &quot;my-site&quot;,\n  &quot;engines&quot;: { &quot;node&quot;: &quot;22.x&quot; },        // Pantheon picks the Node version from this\n  &quot;scripts&quot;: {\n    &quot;dev&quot;: &quot;next dev&quot;,\n    &quot;build&quot;: &quot;next build&quot;,               // required\n    &quot;start&quot;: &quot;next start&quot;,               // required\n    &quot;gcp-build&quot;: &quot;next build&quot;            // required when using yarn\n  },\n  &quot;dependencies&quot;: { &quot;next&quot;: &quot;16.x&quot;, &quot;react&quot;: &quot;19.x&quot;,\n                    &quot;@pantheon-systems/nextjs-cache-handler&quot;: &quot;^0.7.0&quot; }\n}</code></pre><ul><li><b>Node version</b>: Pantheon provides the latest 3 LTS versions and picks one from <code>engines</code>. Make sure it's set.</li><li><b>Package manager</b> is detected from the lock file: <code>package-lock.json</code> → npm, <code>yarn.lock</code> → yarn, <code>pnpm-lock.yaml</code> → pnpm (bun is also detected). <b>More than one lock file = unpredictable builds.</b></li><li><b>Build</b>: clean install (<code>npm ci --quiet --no-fund --no-audit</code> with <code>NODE_ENV=development</code>), then <code>npm run build</code>. <code>npm ci</code> fails when the lock file is out of sync with package.json.</li><li><b>Yarn</b> sites need a <code>gcp-build</code> script instead of, or in addition to, <code>build</code>.</li><li>Commit the lock file. It keeps builds reproducible.</li></ul>",
  "lab": [
   "Open brix-nextjs's package.json and confirm: engines, build, start, and a single lock file.",
   "Delete <code>node_modules</code>, run <code>npm ci</code>, then <code>npm run build</code>. This mirrors the Pantheon build.",
   "Open brix-nextjs-cms's code. Note that it has <b>no</b> package.json build step, because Pantheon runs WordPress as PHP."
  ],
  "knowhow": "Your \"builds locally, fails on Pantheon\" checklist: <b>engines set? one lock file committed and in sync? build + start scripts (gcp-build for yarn)? every env var set as a secret?</b>",
  "quiz": [
   {
    "q": "Where does Pantheon get the Node.js version for a Next.js site?",
    "o": [
     ".nvmrc",
     "package.json \"engines\"",
     "Dashboard setting",
     "pantheon.yml"
    ],
    "a": 1,
    "w": "Pantheon reads the engines property. pantheon.yml is ignored on Next.js sites."
   },
   {
    "q": "A repo has both package-lock.json and yarn.lock. Risk?",
    "o": [
     "Build uses both",
     "Unpredictable behavior: pick one",
     "Pantheon merges them",
     "None"
    ],
    "a": 1,
    "w": "Multiple lock files can cause unpredictable builds. Commit one."
   },
   {
    "q": "A yarn-based site builds locally but Pantheon doesn't run its build. What's missing?",
    "o": [
     "A start script only",
     "A gcp-build script",
     "pantheon.yml",
     "A Dockerfile"
    ],
    "a": 1,
    "w": "Yarn sites need a gcp-build script instead of, or in addition to, build."
   },
   {
    "q": "(Week 1 review) Your first question on a Next.js ticket is…",
    "o": [
     "Did you clear cache?",
     "Can you send a HAR?",
     "What's the Node version?",
     "Which product: Next.js Site, FES, or external host?"
    ],
    "a": 3,
    "w": "Identifying the product decides which playbook, dashboard, and channel apply."
   },
   {
    "q": "(Week 1 review) `const base = process.env.CMS_URL` is undefined during build. The page fetch will…",
    "o": [
     "Hit \"undefined/...\" and fail the build",
     "Only fail in the browser",
     "Fall back to localhost",
     "Work normally"
    ],
    "a": 0,
    "w": "A missing env var usually breaks build-time fetches."
   }
  ],
  "refs": [
   {
    "t": "Docs: Next.js Overview",
    "u": "https://docs.pantheon.io/nextjs"
   },
   {
    "t": "Docs: Build and Runtime Architecture",
    "u": "https://docs.pantheon.io/nextjs/architecture"
   },
   {
    "t": "Next.js on Pantheon FAQ (internal)",
    "u": "https://docs.google.com/document/d/13ykQJR9p8lnWPA_gXdpv3G5nN2PEi1oxTTaT_rxqXFk"
   }
  ]
 },
 {
  "id": 6,
  "week": 2,
  "mins": 40,
  "title": "React in 40 minutes: components, props, server vs client",
  "goal": "Read JSX, and know which code runs on the server and which runs in the browser.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Practice",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<pre><code>// app/blog/page.tsx  (Server Component by default in the App Router)\nimport PostCard from &quot;@/components/PostCard&quot;;\nexport default async function BlogPage() {\n  const posts = await getPosts();                  // runs on the server\n  return &lt;main&gt;{posts.map((p) =&gt; &lt;PostCard key={p.id} post={p} /&gt;)}&lt;/main&gt;;\n}\n\n// components/LikeButton.tsx\n&quot;use client&quot;;                                      // runs in the browser too\nimport { useState } from &quot;react&quot;;\nexport default function LikeButton() {\n  const [likes, setLikes] = useState(0);\n  return &lt;button onClick={() =&gt; setLikes(likes + 1)}&gt;{likes}&lt;/button&gt;;\n}</code></pre><ul><li><b>Components</b> are functions that return JSX. <b>Props</b> are their inputs.</li><li>In the App Router, components are <b>Server Components</b> by default. <code>&quot;use client&quot;</code> opts a component into the browser (state, clicks, <code>useEffect</code>).</li><li>Only env vars prefixed <code>NEXT_PUBLIC_</code> reach the browser, and they are <b>inlined at build time</b>. Changing them needs a rebuild.</li><li><b>Hydration errors</b> (\"server rendered HTML didn't match the client\") are client-side issues and show in the browser console.</li></ul>",
  "lab": [
   "Open <code>app/training/_lib/progress.ts</code>. Why do the components that use it need <code>&quot;use client&quot;</code>?",
   "Find <code>useSyncExternalStore</code> and its <code>getServerSnapshot</code>. Explain why reading localStorage during the server render would cause a <b>hydration mismatch</b>.",
   "Open https://dev-brix-nextjs.pantheonsite.io/training in DevTools → Console and check for hydration warnings."
  ],
  "knowhow": "Browser console errors never reach Pantheon runtime logs. For \"button doesn't work\" or \"page flickers\" reports, ask for a console screenshot or HAR first.",
  "quiz": [
   {
    "q": "In the App Router, a component without \"use client\" is…",
    "o": [
     "Static HTML only",
     "A Server Component",
     "Invalid",
     "A Client Component"
    ],
    "a": 1,
    "w": "Components are Server Components by default in the App Router."
   },
   {
    "q": "Which env var is visible to browser code?",
    "o": [
     "PANTHEON_ENVIRONMENT",
     "Any env var",
     "NEXT_PUBLIC_SITE_URL",
     "CMS_TOKEN"
    ],
    "a": 2,
    "w": "Only NEXT_PUBLIC_ variables are inlined into the client bundle, at build time."
   },
   {
    "q": "A hydration mismatch error is best investigated with…",
    "o": [
     "Build logs",
     "Grafana",
     "Runtime Logs",
     "Browser DevTools console"
    ],
    "a": 3,
    "w": "Hydration happens in the browser."
   }
  ],
  "refs": [
   {
    "t": "react.dev: Learn React",
    "u": "https://react.dev/learn"
   },
   {
    "t": "nextjs.org: Learn Next.js",
    "u": "https://nextjs.org/learn"
   }
  ]
 },
 {
  "id": 7,
  "week": 2,
  "mins": 45,
  "title": "Routing: App Router vs Pages Router",
  "goal": "Identify which router a repo uses in under a minute, and know where each route lives.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Practice",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<table><thead><tr><th></th><th>App Router (newer)</th><th>Pages Router (older)</th></tr></thead><tbody><tr><td>Folder</td><td><code>app/</code> (or <code>src/app/</code>)</td><td><code>pages/</code> (or <code>src/pages/</code>)</td></tr><tr><td>Home page</td><td><code>app/page.tsx</code></td><td><code>pages/index.tsx</code></td></tr><tr><td>Dynamic route</td><td><code>app/blog/[slug]/page.tsx</code></td><td><code>pages/blog/[slug].tsx</code></td></tr><tr><td>Layout</td><td><code>layout.tsx</code></td><td><code>_app.tsx</code>, <code>_document.tsx</code></td></tr><tr><td>API endpoint</td><td><code>app/api/x/route.ts</code> (Route Handler)</td><td><code>pages/api/x.ts</code></td></tr><tr><td>Static paths</td><td><code>generateStaticParams</code>, <code>dynamicParams</code></td><td><code>getStaticPaths</code> + <code>fallback</code></td></tr><tr><td>Data</td><td><code>await fetch()</code> in components</td><td><code>getStaticProps</code> / <code>getServerSideProps</code></td></tr><tr><td>404 page</td><td><code>not-found.tsx</code></td><td><code>pages/404.tsx</code></td></tr></tbody></table><p>Both routers can exist in one repo. The internal playbook notes that WordPress/Drupal starters use the App Router, while Content Publisher starters used the Pages Router. The current Content Publisher tutorial starter is App Router, so <b>always check the repo</b>.</p><pre><code>ls app pages src/app src/pages 2&gt;/dev/null   # which router(s)?\ngrep -rn &quot;generateStaticParams&quot; --include=*.ts* .\ngrep -rn &quot;getStaticPaths\\|getServerSideProps&quot; --include=*.[jt]s* .</code></pre>",
  "lab": [
   "Identify the router in <b>brix-nextjs</b> (<code>ls app pages src/app src/pages</code>).",
   "The page you're reading is served by <code>app/training/day/[day]/page.tsx</code>. Find <code>generateStaticParams</code> and the <code>notFound()</code> check in it. brix-nextjs has Cache Components on, which rejects <code>dynamicParams</code>, so <code>notFound()</code> does the 404 instead.",
   "Visit <code>/training/day/31</code> on brix-nextjs. It returns 404 by design. Explain why in one sentence, as you would to a customer.",
   "Map three other URLs on brix-nextjs to the files that render them."
  ],
  "knowhow": "Router-specific bugs are different. A 404 on a Pages Router site often comes down to <code>fallback: false</code>. On the App Router, check <code>generateStaticParams</code>, <code>dynamicParams = false</code>, and <code>notFound()</code> calls. With <code>cacheComponents</code> enabled (Next.js 16), <code>dynamicParams</code>, <code>dynamic</code>, <code>revalidate</code> and <code>fetchCache</code> aren't allowed, and the build fails with <i>Route segment config ... is not compatible with nextConfig.cacheComponents</i>. The fix is to remove the setting.",
  "quiz": [
   {
    "q": "A repo has pages/blog/[slug].js with getStaticPaths. Which router?",
    "o": [
     "Pages Router",
     "App Router",
     "Both",
     "Neither"
    ],
    "a": 0,
    "w": "The pages/ directory and getStaticPaths belong to the Pages Router."
   },
   {
    "q": "Where is an App Router API endpoint defined?",
    "o": [
     "app/api/x/route.ts",
     "middleware only",
     "next.config.js",
     "pages/api/x.ts"
    ],
    "a": 0,
    "w": "The App Router uses Route Handlers in route.ts files."
   },
   {
    "q": "What's the App Router equivalent of getStaticPaths?",
    "o": [
     "getStaticProps",
     "generateMetadata",
     "revalidatePath",
     "generateStaticParams"
    ],
    "a": 3,
    "w": "generateStaticParams defines which dynamic params are pre-rendered."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Investigating Next.js application issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
   },
   {
    "t": "nextjs.org: Docs",
    "u": "https://nextjs.org/docs"
   }
  ]
 },
 {
  "id": 8,
  "week": 2,
  "mins": 50,
  "title": "Rendering strategies: SSG, SSR, ISR, CSR",
  "goal": "Look at a page and say how it's rendered, using the build output and response headers.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<table><thead><tr><th>Strategy</th><th>When HTML is made</th><th>Typical code</th></tr></thead><tbody><tr><td><b>SSG</b> (static)</td><td>At build</td><td>No dynamic data, or <code>generateStaticParams</code>/<code>getStaticProps</code></td></tr><tr><td><b>SSR</b> (dynamic)</td><td>Every request</td><td><code>cookies()</code>, <code>headers()</code>, <code>getServerSideProps</code>, <code>dynamic = \"force-dynamic\"</code></td></tr><tr><td><b>ISR</b></td><td>Cached, regenerated after <code>revalidate</code> or on demand</td><td><code>revalidate = 60</code>, <code>revalidateTag()</code></td></tr><tr><td><b>CSR</b></td><td>In the browser</td><td><code>\"use client\"</code> + <code>useEffect</code> fetch</td></tr></tbody></table><h4>Read the build output (Builds tab)</h4><pre><code>Route (app)                    Size\n┌ ○ /                          5.2 kB\n├ ● /blog/[slug]               1.1 kB\n│   ├ /blog/hello-world\n│   └ /blog/release-notes\n└ ƒ /search                    2.0 kB\n○ Static   ● SSG (prerendered with params)   ƒ Dynamic (rendered on request)</code></pre><h4>Read the headers</h4><pre><code>curl -sI https://dev-brix-nextjs.pantheonsite.io/ | grep -iE &quot;x-nextjs-cache|cache-control|x-cache|cf-cache-status|x-powered-by&quot;</code></pre><p><code>x-nextjs-cache: HIT | STALE | MISS</code> comes from the Next.js app cache. <code>x-cache</code> (Fastly) and <code>cf-cache-status</code> (Cloudflare) come from the CDN in front of it. Knowing which layer answered is half of every cache ticket.</p>",
  "lab": [
   "Open the latest successful brix-nextjs build log and find the route table. <code>/training/day/[day]</code> should show as ● with 30 prerendered paths. Classify the rest.",
   "Run the curl above against <code>/training</code> and your home page, and compare the headers."
  ],
  "knowhow": "Pages 404ing on only some URLs: check whether the URL is in the build output's list of prerendered paths. If it isn't there and fallback/dynamicParams is off, Next.js will 404 it by design.",
  "quiz": [
   {
    "q": "In the build route table, ƒ means…",
    "o": [
     "Dynamic (rendered on request)",
     "Failed",
     "Fallback",
     "Static"
    ],
    "a": 0,
    "w": "ƒ marks dynamic routes rendered at request time."
   },
   {
    "q": "`x-cache: MISS` but `x-nextjs-cache: HIT`. Who served the cached page?",
    "o": [
     "The browser",
     "The CDN",
     "The CMS",
     "The Next.js application cache"
    ],
    "a": 3,
    "w": "The CDN missed and passed the request through. Next.js answered from its own cache."
   },
   {
    "q": "ISR means…",
    "o": [
     "Every request re-renders",
     "Cached pages regenerated after an interval or on demand",
     "Only build-time pages",
     "Pages render only in the browser"
    ],
    "a": 1,
    "w": "Incremental Static Regeneration serves cached output and refreshes it later."
   }
  ],
  "refs": [
   {
    "t": "Docs: Build and Runtime Architecture",
    "u": "https://docs.pantheon.io/nextjs/architecture"
   },
   {
    "t": "Playbook: Investigating Next.js application issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
   },
   {
    "t": "Ticket #1114861: stale x-nextjs-cache HIT / build failing with no logs",
    "u": "https://pantheon.zendesk.com/agent/tickets/1114861"
   }
  ]
 },
 {
  "id": 9,
  "week": 2,
  "mins": 45,
  "title": "Next.js caching layers (and why \"clear cache\" doesn't always work)",
  "goal": "Name every cache between the visitor and the CMS, and which action clears each one.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<div class=\"flow\"><div><b>Browser</b><span>Cache-Control from the response</span></div><div><b>Pantheon Global CDN</b><span>Honors s-maxage; cleared by env:clear-cache and surrogate-key purges</span></div><div><b>Next.js app cache</b><span>Full Route Cache + Data Cache, persisted and shared across containers by the Pantheon Cache Handler</span></div><div><b>CMS / API</b><span>WordPress, Drupal, Content Publisher</span></div></div><ul><li><b>Time-based</b>: <code>revalidate: 60</code> means content can be up to 60s stale, by design.</li><li><b>On-demand</b>: <code>revalidateTag(&quot;post-123&quot;)</code> / <code>revalidatePath(&quot;/blog&quot;)</code>, usually triggered by a CMS webhook hitting a revalidation route.</li><li><b>Next.js 16</b>: <code>&#x27;use cache&#x27;</code> + <code>cacheTag()</code> (Cache Components).</li><li>Without the Pantheon Cache Handler, each container has its own cache. Scaled containers can then disagree, and CDN purges won't line up with app-cache invalidation.</li></ul>",
  "lab": [
   "Search brix-nextjs for <code>revalidate</code>, <code>cacheTag</code>, <code>&#x27;use cache&#x27;</code>, and <code>cacheHandler</code>. What's the caching strategy?",
   "Run <code>terminus env:clear-cache brix-nextjs.dev</code> and compare headers before and after."
  ],
  "knowhow": "A real ticket: the CDN showed <code>x-cache: MISS</code> but <code>x-nextjs-cache: HIT</code>, serving stale prerendered pages after a deploy. The CDN clear worked; the stale copy was in the <i>application</i> cache layer. Always check both headers before you blame the CDN.",
  "quiz": [
   {
    "q": "Does `terminus env:clear-cache` clear the Next.js application cache?",
    "o": [
     "Yes, everything",
     "It deletes the build",
     "It clears the CDN; the app cache is a separate layer",
     "It restarts containers only"
    ],
    "a": 2,
    "w": "env:clear-cache clears CDN caches for all frameworks. The Next.js app cache is separate unless the Cache Handler ties them together."
   },
   {
    "q": "revalidate: 300 and an editor says updates take ~5 minutes. This is…",
    "o": [
     "A CDN outage",
     "Expected behavior for time-based ISR",
     "A platform bug",
     "A build failure"
    ],
    "a": 1,
    "w": "Content refreshes after the configured interval. To make it faster, lower the value or add on-demand revalidation (a code change)."
   },
   {
    "q": "What keeps horizontally scaled containers serving the same cached content?",
    "o": [
     "Sticky sessions",
     "A shared persistent cache via the Pantheon Cache Handler",
     "pantheon.yml",
     "Redis"
    ],
    "a": 1,
    "w": "The Cache Handler persists the cache to shared storage used by every container in the environment."
   }
  ],
  "refs": [
   {
    "t": "Docs: Build and Runtime Architecture",
    "u": "https://docs.pantheon.io/nextjs/architecture"
   },
   {
    "t": "Release note: Next.js Cache Handler",
    "u": "https://docs.pantheon.io/release-notes/2026/02/nextjs-cache-handler"
   },
   {
    "t": "Ticket #1114861: stale x-nextjs-cache HIT / build failing with no logs",
    "u": "https://pantheon.zendesk.com/agent/tickets/1114861"
   }
  ]
 },
 {
  "id": 10,
  "week": 2,
  "mins": 45,
  "title": "next.config, middleware/proxy & env vars + Week 2 check",
  "goal": "Know the config files that change site behavior, and how env vars flow into Next.js.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Review",
    10
   ],
   [
    "Week check",
    15
   ]
  ],
  "learn": "<pre><code>// next.config.mjs\nexport default {\n  images: { remotePatterns: [{ hostname: &quot;cms.example.com&quot; }] }, // CMS images\n  async redirects() { return [{ source: &quot;/old&quot;, destination: &quot;/new&quot;, permanent: true }]; },\n  cacheHandler: &quot;./cache-handler.mjs&quot;,   // Pantheon Cache Handler (Next 15 style)\n};</code></pre><ul><li><b>Images</b> from a CMS domain need to be allowed in <code>images</code>. Otherwise <code>next/image</code> refuses them. This is a classic \"images don't show\" ticket.</li><li><b>Middleware</b> (<code>middleware.ts</code>, renamed <code>proxy.ts</code> in Next.js 16) runs before routing. The curriculum exercise \"block an IP or User-Agent\" lives here.</li><li><b>Env vars</b>: server code reads <code>process.env.X</code> at runtime. <code>NEXT_PUBLIC_X</code> is baked in at build time. On Pantheon, both come from Secrets Manager (Week 3).</li><li>Pantheon sets <code>APP_ENV</code>/<code>PANTHEON_ENVIRONMENT</code> (dev, test, live, pr-N), <code>PORT</code>/<code>NODE_PORT</code> = 3000, <code>CACHE_BUCKET</code>, and <code>OUTBOUND_PROXY_ENDPOINT</code>.</li></ul>",
  "lab": [
   "Open brix-nextjs's next.config file and list what it customizes. Does <code>images</code> allow the brix-nextjs-cms host?",
   "On a branch, write <code>middleware.ts</code> (or <code>proxy.ts</code> on Next.js 16) that returns 403 for a test User-Agent. You'll deploy it to a Multidev on Day 13."
  ],
  "knowhow": "Logic that depends on the request host or domain (like homemade http→https redirects) can misbehave behind proxies and CDNs. If redirects loop, look at the host/forwarded headers the code reads.",
  "quiz": [
   {
    "q": "Images from the WordPress backend don't render via next/image. First check?",
    "o": [
     "DNS",
     "Runtime logs only",
     "images config in next.config",
     "Node version"
    ],
    "a": 2,
    "w": "next/image only loads remote hosts allowed in the images config."
   },
   {
    "q": "Which platform variable tells code which Pantheon environment it's in?",
    "o": [
     "PORT",
     "NODE_ENV",
     "APP_ENV / PANTHEON_ENVIRONMENT",
     "CACHE_BUCKET"
    ],
    "a": 2,
    "w": "APP_ENV and PANTHEON_ENVIRONMENT hold dev/test/live/pr-N."
   },
   {
    "q": "(Week 2 review) A Pages Router site 404s on new posts; getStaticPaths has fallback: false. Why?",
    "o": [
     "Paths not generated at build are 404 by design",
     "CDN bug",
     "Missing secret",
     "Node version"
    ],
    "a": 0,
    "w": "With fallback: false, any path not returned at build time 404s."
   },
   {
    "q": "(Week 2 review) Clicking a button does nothing. Best first evidence?",
    "o": [
     "Terminus runtime logs",
     "Grafana",
     "Browser console / HAR",
     "Build log"
    ],
    "a": 2,
    "w": "Interaction bugs are client-side."
   },
   {
    "q": "(Week 1 review) Which file decides the package manager?",
    "o": [
     "engines",
     "next.config",
     "The lock file present",
     "pantheon.yml"
    ],
    "a": 2,
    "w": "Pantheon detects npm, yarn, or pnpm from the lock file."
   }
  ],
  "refs": [
   {
    "t": "Docs: Build and Runtime Architecture",
    "u": "https://docs.pantheon.io/nextjs/architecture"
   },
   {
    "t": "Next.js: Training Curriculum (CS)",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/5201264641"
   },
   {
    "t": "Docs: FES known issues & troubleshooting",
    "u": "https://docs.pantheon.io/guides/decoupled/overview/troubleshooting"
   }
  ]
 },
 {
  "id": 11,
  "week": 3,
  "mins": 45,
  "title": "Architecture: from git push to a live page",
  "goal": "Draw the Next.js pipeline from memory, and know which step each status belongs to.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<div class=\"flow\"><div><b>Git event</b><span>Push to main → Dev · PR → pr-N · multi-* branch → Multidev · tag → Test/Live</span></div><div><b>Pantheon Site Integration GitHub App</b><span>Notifies Pantheon of the event</span></div><div><b>Build</b><span>Clone commit → npm ci → npm run build<br><code>BUILD_QUEUED → BUILD_WORKING → BUILD_SUCCESS / BUILD_FAILURE</code></span></div><div><b>Deploy</b><span>Static assets → shared cache; app → Cloud Run containers<br><code>DEPLOYMENT_QUEUED → DEPLOYMENT_WORKING → DEPLOYMENT_SUCCESS / DEPLOYMENT_FAILURE</code></span></div><div><b>Serve</b><span>Global CDN → Node.js container (Cache Handler → shared GCS cache) → CMS on a cache miss</span></div></div><ul><li>Containers scale horizontally, so any request can land on any container.</li><li>During the build, Pantheon reads only <code>package.json</code> and <code>next.config.*</code> from the repo. <code>pantheon.yml</code> is ignored.</li><li>Environment URL pattern: <code>https://&lt;env&gt;-&lt;site&gt;.pantheonsite.io</code>, e.g. <code>pr-42-mysite</code>.</li></ul>",
  "lab": [
   "Sketch the pipeline on paper without looking.",
   "In the brix-nextjs Builds tab, click through the build that shipped /training and match each status to a box above."
  ],
  "knowhow": "\"BUILD_SUCCESS but my change isn't live\" means the problem is in deploy. Look for a DEPLOYMENT_FAILURE, or a build that never reached DEPLOYMENT_SUCCESS, before you investigate anything else.",
  "quiz": [
   {
    "q": "Which step failed if you see DEPLOYMENT_FAILURE?",
    "o": [
     "npm run build",
     "npm ci",
     "DNS",
     "Shipping the built app/assets to the runtime"
    ],
    "a": 3,
    "w": "DEPLOYMENT_* statuses cover moving the build into the runtime after the build succeeded."
   },
   {
    "q": "Which repo files does the Pantheon build read for config?",
    "o": [
     "Dockerfile",
     "pantheon.yml",
     "package.json and next.config.*",
     ".env.local"
    ],
    "a": 2,
    "w": "package.json and next.config.* only. pantheon.yml is ignored."
   },
   {
    "q": "What serves the request first?",
    "o": [
     "Cloud Run container",
     "Global CDN",
     "The CMS",
     "GitHub"
    ],
    "a": 1,
    "w": "Requests hit the Global CDN first, then a Node.js container."
   }
  ],
  "refs": [
   {
    "t": "Docs: Build and Runtime Architecture",
    "u": "https://docs.pantheon.io/nextjs/architecture"
   },
   {
    "t": "Docs: Comparison to CMS hosting & considerations",
    "u": "https://docs.pantheon.io/nextjs/considerations"
   }
  ]
 },
 {
  "id": 12,
  "week": 3,
  "mins": 60,
  "title": "Lab day: create a Next.js site (Dashboard + Terminus)",
  "goal": "Create a site both ways, and understand the GitHub App rules behind most site-creation tickets.",
  "plan": [
   [
    "Dashboard",
    25
   ],
   [
    "Terminus",
    25
   ],
   [
    "Review",
    10
   ]
  ],
  "learn": "<h4>Dashboard</h4><ul><li>Workspace → <b>Create New Site</b> → <b>Next.js</b> → <b>Connect</b> GitHub → install/authorize the <b>Pantheon Site Integration</b> app.</li><li>Choose all repos or <i>only select repositories</i>. An <b>empty existing repository won't work</b>.</li><li>Enter the site and repo names → <b>Deploy</b> → don't close the tab until the workflow finishes.</li></ul><h4>Terminus</h4><pre><code>terminus site:create &lt;machine-name&gt; &quot;&lt;Label&gt;&quot; nextjs-16 \\\n  --org=&lt;workspace&gt; --vcs-provider=github --vcs-org=&lt;github-org&gt; \\\n  --repository-name=&lt;repo&gt;\nterminus vcs:connection:list &lt;workspace&gt;      # which GitHub connections exist</code></pre><h4>GitHub App rules (the #1 creation blocker)</h4><ul><li>The app must be installed by someone who is <b>both a GitHub org admin and a member of the Pantheon workspace</b>.</li><li>After that, any workspace member can create sites from repos the app can access.</li><li>If the app is already installed for another workspace, the org may not appear in the dropdown. Fix it with <code>terminus vcs:connection:link &lt;dest&gt; --vcs-org=&lt;org&gt; --source-org=&lt;src&gt;</code>.</li><li>GitHub Enterprise Server isn't supported. GitLab (including self-hosted, via <code>--vcs-host</code>) is. Bitbucket is planned.</li></ul>",
  "lab": [
   "Create a throwaway Next.js site from the dashboard in a sandbox workspace.",
   "Create a second one with Terminus using <code>nextjs-16</code>.",
   "Run <code>vcs:connection:list</code> and note how many GitHub connections the workspace has.",
   "Delete the throwaway sites when you're done."
  ],
  "knowhow": "Site creation failed because the repo couldn't be created or accessed? Ask whether the repo belongs to a GitHub org. Usually a non-owner started the install. Have them remove the app and let an org owner configure the connection, or send the install URL to the org admin for approval.",
  "quiz": [
   {
    "q": "Who must install the Pantheon GitHub App on a GitHub org?",
    "o": [
     "Any workspace member",
     "A GitHub org admin who is also a workspace member",
     "Pantheon Support",
     "Any GitHub user"
    ],
    "a": 1,
    "w": "Both conditions are required. After that, any workspace member can create sites."
   },
   {
    "q": "A customer picks an existing but EMPTY repo. Result?",
    "o": [
     "Works fine",
     "Only Dev works",
     "Site creation won't work",
     "Pantheon fills it later"
    ],
    "a": 2,
    "w": "An empty existing repository won't work for site creation."
   },
   {
    "q": "The GitHub org is missing from the dropdown because the app is linked to another workspace. Fix?",
    "o": [
     "Create a new org",
     "Reinstall GitHub",
     "Use pantheon.yml",
     "terminus vcs:connection:link"
    ],
    "a": 3,
    "w": "vcs:connection:link links an existing connection to another workspace."
   }
  ],
  "refs": [
   {
    "t": "Docs: Hello World tutorial",
    "u": "https://docs.pantheon.io/nextjs/hello-world-tutorial"
   },
   {
    "t": "Docs: CLI tools for Next.js",
    "u": "https://docs.pantheon.io/nextjs/cli-tools"
   },
   {
    "t": "Docs: Comparison to CMS hosting & considerations",
    "u": "https://docs.pantheon.io/nextjs/considerations"
   },
   {
    "t": "Ticket #1121319: Next.js site creation failed (GitHub org)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121319"
   }
  ]
 },
 {
  "id": 13,
  "week": 3,
  "mins": 50,
  "title": "Environments & the deploy workflow (Dev, PRs, Multidev, Test, Live)",
  "goal": "Move code through every environment of your site and read the result.",
  "plan": [
   [
    "Learn",
    15
   ],
   [
    "Lab",
    30
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<table><thead><tr><th>Trigger</th><th>Environment</th></tr></thead><tbody><tr><td>Push/merge to default branch</td><td><b>Dev</b></td></tr><tr><td>Open a pull request</td><td><b>pr-&lt;number&gt;</b> Multidev</td></tr><tr><td>Push a branch starting <code>multi-</code></td><td>Branch Multidev</td></tr><tr><td>Push tag <code>pantheon_test_N</code></td><td><b>Test</b></td></tr><tr><td>Push tag <code>pantheon_live_N</code></td><td><b>Live</b></td></tr></tbody></table><pre><code>git tag --list &quot;pantheon_test_*&quot;       # find the latest number\ngit tag pantheon_test_2 &amp;&amp; git push origin pantheon_test_2\nterminus node:logs:build:list &lt;site&gt;.test</code></pre><ul><li>For Next.js, Test and Live deploys <b>can't be triggered from the dashboard</b>. They come from Git tags (local git, GitHub Releases, or GitHub Actions).</li><li>Tag integers must increment.</li><li><b>Locking an environment</b> (Security tab) only takes effect after a <b>new build</b>. Trigger a Rebuild or push a commit afterward.</li><li>Custom domains usually attach to Live.</li></ul><p class=\"warn\"><b>Heads-up:</b> the build-failure playbook says tags are <code>test-&lt;n&gt;</code>/<code>live-&lt;n&gt;</code>. The public docs' screenshot and real customer build histories use <code>pantheon_test_N</code>/<code>pantheon_live_N</code>. Check the customer's actual tags, and ask in #ask-nextjs if a tag format is rejected.</p>",
  "lab": [
   "Open the PR that adds <code>app/training</code> to brix-nextjs and confirm <code>pr-N</code> builds.",
   "Push a <code>multi-training</code> branch and confirm a Multidev appears.",
   "Merge to main → Dev. Push <code>pantheon_test_N</code> → Test. Push <code>pantheon_live_N</code> → Live. Open /training on each environment.",
   "Lock Test (or wherever /training lives) in the Security tab, rebuild, and confirm basic auth appears. This course links to internal Pantheon pages, so keep it locked."
  ],
  "knowhow": "\"Multidev wasn't created for my branch\": check that the prefix is exactly <code>multi-</code>, that the app has access to the repo, and that GitHub shows the event was delivered. Then escalate as a possible webhook delivery issue.",
  "quiz": [
   {
    "q": "How does a Next.js customer deploy to Live?",
    "o": [
     "terminus env:deploy",
     "Push a pantheon_live_N Git tag",
     "Dashboard Deploy button",
     "Merge to main"
    ],
    "a": 1,
    "w": "Live and Test deploys come from Git tags in the connected repo."
   },
   {
    "q": "Customer locked Live in the Security tab but the site is still public. Why?",
    "o": [
     "Needs DNS change",
     "The lock applies after a new build",
     "Bug",
     "Only works for WordPress"
    ],
    "a": 1,
    "w": "On Next.js, lock/unlock takes effect after a new build is deployed."
   },
   {
    "q": "Which branch name creates a Multidev?",
    "o": [
     "pr-5",
     "multi-sprint-1",
     "feature-x",
     "dev-x"
    ],
    "a": 1,
    "w": "Branches prefixed with multi- create Multidevs. PRs create pr-N."
   }
  ],
  "refs": [
   {
    "t": "Docs: Test and Live environments",
    "u": "https://docs.pantheon.io/nextjs/test-and-live-env"
   },
   {
    "t": "Docs: Comparison to CMS hosting & considerations",
    "u": "https://docs.pantheon.io/nextjs/considerations"
   },
   {
    "t": "Ticket #1121994: Multidev not created for multi- branch",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121994"
   }
  ]
 },
 {
  "id": 14,
  "week": 3,
  "mins": 45,
  "title": "Logs: Builds, Runtime, Terminus & GCP",
  "goal": "Get from a symptom to the right log in under two minutes.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Lab",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<ul><li><b>Dashboard</b>: environment tab → <b>Builds</b> (build and deploy logs) or <b>Runtime Logs</b>. Click an entry for the full output.</li><li><b>Runtime logs</b> cover the <b>past 24 hours</b> and only include requests that missed the edge cache. Very static sites produce very few runtime logs, and that's normal.</li><li>Read runtime logs like NGINX logs. Look for <b>patterns</b> and repeated status codes, not one odd line.</li></ul><pre><code>terminus node:logs:build:list &lt;site&gt;.&lt;env&gt;\nterminus node:logs:build:get  &lt;site&gt;.&lt;env&gt; &lt;build-id&gt;\nterminus node:logs:runtime:list &lt;site&gt;.&lt;env&gt;\nterminus node:logs:runtime:get  &lt;site&gt;.&lt;env&gt;\nterminus node:builds:list &lt;site&gt;.&lt;env&gt;</code></pre><h4>Going deeper: CSE Booster → GCP</h4><ul><li>Use the purple <b>Cloud Build</b> button to find entries with a <code>nodejs-trigger-*</code> trigger name. Then look for <code>Running &quot;npm run build&quot;</code> and check before and after it for platform problems.</li><li>Use the purple <b>Runtime Logs</b> button (Cloud Run) to find <code>Next start</code>. Anything before it is the platform, before the customer's code ran.</li></ul>",
  "lab": [
   "Pull build and runtime logs for brix-nextjs from the dashboard <i>and</i> Terminus (<code>terminus node:logs:runtime:list brix-nextjs.dev</code>).",
   "With CSE Booster, open Cloud Build for your last brix-nextjs build and find the <code>npm run build</code> section.",
   "Compare with brix-nextjs-cms: it has NGINX/PHP logs via SFTP, not build/runtime logs. That's the CMS vs Next.js difference in one lab."
  ],
  "knowhow": "Failed builds with <b>no log output</b>, truncated logs, or only a \"This build is queued\" placeholder have repeatedly turned out to be <b>platform bugs</b>, not customer code. Don't ask the customer to debug a log that doesn't exist. Collect the build IDs and escalate via #ask-nextjs.",
  "quiz": [
   {
    "q": "How far back do Next.js runtime logs go?",
    "o": [
     "30 days",
     "1 hour",
     "7 days",
     "24 hours"
    ],
    "a": 3,
    "w": "Runtime logs cover the past 24 hours."
   },
   {
    "q": "A static site shows almost no runtime logs. This is…",
    "o": [
     "A logging outage",
     "A misconfiguration",
     "Expected behavior",
     "A security issue"
    ],
    "a": 2,
    "w": "Low runtime log volume is expected on static sites."
   },
   {
    "q": "In Cloud Run logs via CSE Booster, which line marks where customer code starts?",
    "o": [
     "BUILD_SUCCESS",
     "DEPLOYMENT_QUEUED",
     "npm ci",
     "Next start"
    ],
    "a": 3,
    "w": "\"Next start\" marks where the customer's code begins executing."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Accessing logs for a Next.js site",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4623073304"
   },
   {
    "t": "Docs: CLI tools for Next.js",
    "u": "https://docs.pantheon.io/nextjs/cli-tools"
   },
   {
    "t": "Pantheon CSE Booster (Chrome)",
    "u": "https://chromewebstore.google.com/detail/pantheon-cse-booster/bcagaciggkfdljobempjhcnhfgfgchka"
   },
   {
    "t": "Ticket #1115296: builds with no logs, BUILD_SUCCESS never deployed",
    "u": "https://pantheon.zendesk.com/agent/tickets/1115296"
   },
   {
    "t": "Ticket #1114861: stale x-nextjs-cache HIT / build failing with no logs",
    "u": "https://pantheon.zendesk.com/agent/tickets/1114861"
   }
  ]
 },
 {
  "id": 15,
  "week": 3,
  "mins": 45,
  "title": "Secrets, limitations & CMS parity + Week 3 check",
  "goal": "Set env vars correctly, and know which WordPress/Drupal features don't exist on Next.js.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Review",
    10
   ],
   [
    "Week check",
    15
   ]
  ],
  "learn": "<h4>Secrets Manager (env vars for Next.js)</h4><pre><code>terminus secret:site:set &lt;site&gt; CMS_URL &quot;https://live-cms.pantheonsite.io&quot; --type=env --scope=web\nterminus secret:site:list &lt;site&gt;\n# Dashboard: Site Settings → Secrets (site-owned secrets; org-owned are CLI only)</code></pre><ul><li>Secrets take effect on the <b>next build</b>. They're then available at build time and at runtime.</li><li>Per-environment <b>overrides</b> let Live use a different value (see the docs for syntax).</li><li>Real ticket: secrets created with type <code>runtime</code> didn't appear in <code>process.env</code>. Setting them with type <code>env</code> fixed it.</li></ul><h4>Not available on Next.js sites (yet)</h4><div class=\"chips\"><span>pantheon.yml</span><span>Quicksilver</span><span>New Relic</span><span>Redis</span><span>Autopilot</span><span>Backups (backup:create errors)</span><span>Custom Upstreams</span><span>AGCDN (in development)</span><span>CMS build webhooks</span><span>GitHub Enterprise Server</span></div><p><b>Does</b> work: <code>env:clear-cache</code>, the Security tab (with a rebuild), custom domains, Multidev, and Terminus site and log commands.</p>",
  "lab": [
   "Set a secret: <code>terminus secret:site:set brix-nextjs NEXT_PUBLIC_TRAINING_BANNER &quot;Hello from Secrets&quot; --type=env --scope=web</code>. Rebuild, and the /training header shows it.",
   "Override it only for Test and confirm the two environments differ.",
   "Try <code>terminus backup:create brix-nextjs.dev</code> and read the error. Then run it on brix-nextjs-cms, where it works."
  ],
  "knowhow": "\"I set the secret but it's undefined\" has two usual causes: <b>(1)</b> no rebuild since setting it, or <b>(2)</b> the wrong type (needs <code>env</code>). Check <code>secret:site:list</code>, then the last build time.",
  "quiz": [
   {
    "q": "Customer updated a secret 10 minutes ago; the site still shows the old value. Why?",
    "o": [
     "Secrets apply starting with the next build",
     "Needs DNS",
     "Secrets are Live-only",
     "Cache"
    ],
    "a": 0,
    "w": "New or updated values take effect on the next build."
   },
   {
    "q": "Which Terminus command fails on Next.js sites?",
    "o": [
     "node:logs:build:list",
     "env:clear-cache",
     "site:info",
     "backup:create"
    ],
    "a": 3,
    "w": "Code lives in GitHub/GitLab, so there's nothing to back up on Pantheon."
   },
   {
    "q": "(Week 3 review) Merged to main. Which env builds?",
    "o": [
     "Dev",
     "Live",
     "pr-1",
     "Test"
    ],
    "a": 0,
    "w": "The default branch builds Dev."
   },
   {
    "q": "(Week 3 review) Failed build shows zero log output. Best action?",
    "o": [
     "Ask the customer to fix code",
     "Clear cache",
     "Close as app issue",
     "Gather build IDs and escalate via #ask-nextjs"
    ],
    "a": 3,
    "w": "Missing logs have repeatedly been platform issues."
   },
   {
    "q": "(Week 2 review) NEXT_PUBLIC_ vars change when…",
    "o": [
     "On cache clear",
     "Instantly",
     "At the next build",
     "On container restart"
    ],
    "a": 2,
    "w": "They are inlined into the bundle at build time."
   }
  ],
  "refs": [
   {
    "t": "Docs: Environment variables for Next.js",
    "u": "https://docs.pantheon.io/nextjs/environment-variables"
   },
   {
    "t": "Docs: Secrets Manager",
    "u": "https://docs.pantheon.io/guides/secrets"
   },
   {
    "t": "Docs: Create a new secret",
    "u": "https://docs.pantheon.io/guides/secrets/create"
   },
   {
    "t": "Docs: Comparison to CMS hosting & considerations",
    "u": "https://docs.pantheon.io/nextjs/considerations"
   },
   {
    "t": "Ticket #1109329: secrets missing from process.env",
    "u": "https://pantheon.zendesk.com/agent/tickets/1109329"
   }
  ]
 },
 {
  "id": 16,
  "week": 4,
  "mins": 45,
  "title": "Decoupled backends: WordPress & Drupal behind Next.js",
  "goal": "Trace a page's content back to the CMS, and know when the fault is in the backend.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Lab",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<ul><li>Next.js fetches content over HTTP: WordPress REST (<code>/wp-json/wp/v2/...</code>) or WPGraphQL, and Drupal JSON:API (<code>/jsonapi/...</code>).</li><li>The CMS URL and credentials live in <b>secrets</b> on the Next.js site.</li><li>Good practice is to map environments (Next Dev → CMS Dev, Test → Test, Live → Live) using <code>APP_ENV</code>. This is a Level 3 curriculum exercise.</li><li><b>Backend on Pantheon</b>: debug it like any CMS site (NGINX/PHP logs, plugins/modules, PAPC). <b>Backend elsewhere</b>: the customer asks their host. Pantheon can't audit it.</li><li>In the backend's <code>nginx-access.log</code>, look for requests to the API paths at the time the Next.js build or render ran. That confirms the front end actually reached the CMS.</li></ul>",
  "lab": [
   "Set <code>WORDPRESS_API_URL</code> on brix-nextjs to <code>https://dev-brix-nextjs-cms.pantheonsite.io/wp-json</code> (type env) and rebuild.",
   "Fetch <code>/wp/v2/posts</code> from brix-nextjs-cms in a new page using the WordPress revalidation tutorial, up to the \"fetch posts\" step.",
   "Break the secret (wrong host), rebuild, read the failure in the brix-nextjs logs, and restore it.",
   "In brix-nextjs-cms's <code>nginx-access.log</code>, find the requests from the brix-nextjs build."
  ],
  "knowhow": "A real example: a Next.js page showed <b>502</b>, but the root cause was the CMS edge WAF returning <b>403</b> on an API search query. When Next.js errors on an upstream call, check the backend's response before blaming Next.js.",
  "quiz": [
   {
    "q": "Pages render but are empty; runtime logs show API fetch errors; CMS is on Pantheon. Next?",
    "o": [
     "Clear CDN",
     "Rebuild Next.js",
     "Debug the CMS site like normal (logs, errors)",
     "Tell customer it's app code"
    ],
    "a": 2,
    "w": "The content can't reach Next.js until the CMS stops erroring."
   },
   {
    "q": "CMS backend is hosted elsewhere. What can Pantheon audit?",
    "o": [
     "Only DNS",
     "Everything",
     "Nothing at all",
     "Only the Next.js side; customer contacts their CMS host"
    ],
    "a": 3,
    "w": "Pantheon can't audit backends it doesn't host."
   },
   {
    "q": "Where should the CMS API URL live on a Next.js site?",
    "o": [
     "Hardcoded",
     "pantheon.yml",
     "A cookie",
     "Secrets Manager"
    ],
    "a": 3,
    "w": "Use Secrets Manager for URLs and credentials."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Investigating Next.js application issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
   },
   {
    "t": "Docs: WordPress on-demand revalidation (Next.js 16)",
    "u": "https://docs.pantheon.io/nextjs/wordpress-revalidation-tutorial"
   },
   {
    "t": "Next.js: Training Curriculum (CS)",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/5201264641"
   },
   {
    "t": "Ticket #1121734: WAF false positive surfaces as 502 in Next.js",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121734"
   }
  ]
 },
 {
  "id": 17,
  "week": 4,
  "mins": 50,
  "title": "The Pantheon Cache Handler & on-demand revalidation",
  "goal": "Confirm whether the Cache Handler is installed and working, and map each cache symptom to its fix.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Lab",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<ul><li>Package: <code>@pantheon-systems/nextjs-cache-handler</code>. It persists the cache across deploys and restarts, supports <code>revalidateTag()</code>/<code>revalidatePath()</code>/ISR with <b>automatic CDN invalidation</b>, and supports Next 16 <code>&#x27;use cache&#x27;</code>.</li><li>Set <code>CACHE_DEBUG=true</code> to log cache hit/miss/set activity in runtime logs.</li><li>WordPress flow: a mu-plugin sends a webhook to a Next.js revalidation route, and <code>revalidateTag</code> clears the affected pages. The <b>shared secret must match</b> on both sites (<code>WEBHOOK_SECRET</code> on Next.js = <code>NEXTJS_WEBHOOK_SECRET</code> on WP).</li><li>Test upstreams with this preconfigured: <code>nextjs_15_cache_starter</code>, <code>nextjs_16_cache_starter</code>.</li></ul><h4>Caching playbook: symptom → cause</h4><table><thead><tr><th>Symptom</th><th>Likely cause / action</th></tr></thead><tbody><tr><td>Some pages update after a cache clear, others don't</td><td>Cache Handler missing from package.json → customer installs and configures it</td></tr><tr><td>WP/Drupal content not updating, even after a clear</td><td>PAPC not active on the CMS → install/activate it</td></tr><tr><td>Handler and PAPC fine, still not updating</td><td>Revalidation webhook failing → mismatched secret</td></tr><tr><td>Updates arrive, but late</td><td>Time-based ISR, expected → lower revalidate or add webhooks (app change)</td></tr></tbody></table>",
  "lab": [
   "Check brix-nextjs's package.json for <code>@pantheon-systems/nextjs-cache-handler</code>. If it's missing, add it following the README.",
   "Make sure <b>Pantheon Advanced Page Cache</b> is active on brix-nextjs-cms.",
   "Set <code>CACHE_DEBUG=true</code> on brix-nextjs, rebuild, load a page twice, and find HIT/MISS in the runtime logs.",
   "Publish an edit in brix-nextjs-cms and time how long brix-nextjs takes to show it."
  ],
  "knowhow": "Before you start a cache ticket, collect four facts: latest build is BUILD_SUCCESS, PAPC active on the CMS (ask for a screenshot if it's off-platform), Cache Handler in package.json, and any <code>revalidate</code> values in the code.",
  "quiz": [
   {
    "q": "Env var that turns on Cache Handler debug logging?",
    "o": [
     "CACHE_DEBUG=true",
     "NEXT_DEBUG=1",
     "PANTHEON_CACHE=verbose",
     "DEBUG=*"
    ],
    "a": 0,
    "w": "CACHE_DEBUG=true logs hit/miss/set activity."
   },
   {
    "q": "Handler installed, PAPC active, content still stale. Most common cause?",
    "o": [
     "CDN bug",
     "Mismatched revalidation secret",
     "Node version",
     "Missing start script"
    ],
    "a": 1,
    "w": "The webhook is rejected when the secrets don't match."
   },
   {
    "q": "\"Some pages update after a clear but not others.\" First check?",
    "o": [
     "GitHub App",
     "DNS",
     "Node version",
     "Cache Handler in package.json"
    ],
    "a": 3,
    "w": "Without the handler, the app cache isn't reached by a CDN purge."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Debugging caching issues on Next.js sites",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4735893555"
   },
   {
    "t": "Release note: Next.js Cache Handler",
    "u": "https://docs.pantheon.io/release-notes/2026/02/nextjs-cache-handler"
   },
   {
    "t": "GitHub: pantheon-systems/nextjs-cache-handler",
    "u": "https://github.com/pantheon-systems/nextjs-cache-handler"
   },
   {
    "t": "Docs: WordPress cache integration (Next.js 15)",
    "u": "https://docs.pantheon.io/nextjs/wordpress-revalidation-tutorial-next-15"
   },
   {
    "t": "Docs: WordPress on-demand revalidation (Next.js 16)",
    "u": "https://docs.pantheon.io/nextjs/wordpress-revalidation-tutorial"
   }
  ]
 },
 {
  "id": 18,
  "week": 4,
  "mins": 35,
  "title": "Content Publisher + Next.js",
  "goal": "Understand the Google Docs → Next.js flow and its two required secrets.",
  "plan": [
   [
    "Learn",
    15
   ],
   [
    "Lab",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<ul><li>Content Publisher publishes content from Google Docs (and Word) straight to a Next.js site on Pantheon.</li><li>Setup: create a <b>collection</b> (its URL = the Next.js env URL) → create an access <b>token</b> → set secrets <code>PCC_SITE_ID</code> and <code>PCC_TOKEN</code> on the Next.js site → rebuild.</li><li>The starter comes from the Content Publisher SDK (<code>nextjs-starter-approuter-ts</code>). Older sites may still use the Pages Router, so check the repo.</li><li>A missing or invalid token or collection ID shows up as build or render failures when fetching content.</li></ul>",
  "lab": [
   "Skim the Content Publisher tutorial end to end.",
   "Optional: connect a collection to a Multidev of brix-nextjs and publish a test doc."
  ],
  "knowhow": "For Content Publisher \"content not showing\" tickets, confirm that the collection URL matches the environment being viewed, and that <code>PCC_SITE_ID</code>/<code>PCC_TOKEN</code> exist <i>and</i> a build ran after they were set.",
  "quiz": [
   {
    "q": "Which two secrets connect Next.js to Content Publisher?",
    "o": [
     "WP_URL / WP_TOKEN",
     "PCC_SITE_ID / PCC_TOKEN",
     "CP_ID / CP_KEY",
     "PANTHEON_SITE / TOKEN"
    ],
    "a": 1,
    "w": "The tutorial uses PCC_SITE_ID and PCC_TOKEN."
   },
   {
    "q": "After setting those secrets, what's required?",
    "o": [
     "Nothing",
     "A DNS change",
     "A new build",
     "A support ticket"
    ],
    "a": 2,
    "w": "Secrets apply from the next build."
   }
  ],
  "refs": [
   {
    "t": "Docs: Content Publisher tutorial for Next.js",
    "u": "https://docs.pantheon.io/nextjs/content-publisher-tutorial"
   },
   {
    "t": "Playbook: Investigating Next.js application issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
   }
  ]
 },
 {
  "id": 19,
  "week": 4,
  "mins": 45,
  "title": "Front-End Sites (FES): the legacy product",
  "goal": "Recognize an FES site immediately, and know how its support differs.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Explore",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<table><thead><tr><th></th><th>Next.js Site</th><th>Front-End Site (FES)</th></tr></thead><tbody><tr><td>Workspace Sites tab</td><td>Listed under <b>CMS Sites</b></td><td>Listed under <b>Front-End Sites</b></td></tr><tr><td>Dashboard</td><td>Multidev/Dev/Test/Live tabs, Site Settings, left nav with Code, Merge, Build, Status, Errors, Domains &amp; HTTPS</td><td>No env tabs. \"Add Custom Domain\" + \"View Site\" buttons; left nav Overview + Settings</td></tr><tr><td>Environments</td><td>Dev, Test, Live + Multidev</td><td>Live (default branch) + pr-N / multi- previews</td></tr><tr><td>Platform URLs</td><td><code>env-site.pantheonsite.io</code></td><td><code>live-site.appa.pantheon.site</code></td></tr><tr><td>Env vars</td><td>Secrets Manager</td><td>Dashboard: Settings → Builds → Site Environment Variables</td></tr><tr><td>Domains</td><td>Self-service</td><td>Request form; Pantheon connects it</td></tr><tr><td>Logs</td><td>Build + runtime (dashboard/Terminus)</td><td>Limited</td></tr><tr><td>Help channel</td><td>#ask-nextjs</td><td>#cse-decoupled</td></tr></tbody></table><ul><li>FES sites were managed under a shared \"Decoupled Engineering\" org. Sibyl doesn't detect FES; use the \"find FES dashboard from a domain\" playbook (compute-doc → GCP ID → GraphQL, or <code>nspct decoupled:site:info</code>).</li><li>FES limits: no ISR, one lock file, 3 GB build size cap, one repo per FES site, Node 16/18/20.</li><li><b>Shutdown</b>: the May 2026 release note set October 1, 2026. A Sept 16, 2026 product announcement extended decommissioning to <b>December 1</b>, with a <b>Pantheon-led migration at no cost</b>. Confirm the current date in #eol-planning before quoting it to customers.</li></ul>",
  "lab": [
   "Find one FES site in the admin tools and compare its dashboard with brix-nextjs's.",
   "Practice the \"find FES dashboard from domain\" playbook on one FES domain."
  ],
  "knowhow": "Sibyl links always open the <i>old</i> dashboard, where Next.js Sites look broken. That's intentional. Click the purple Next.js badge from CSE Booster to go to the new dashboard. If there's no badge and no env tabs, you're probably looking at FES.",
  "quiz": [
   {
    "q": "Dashboard has no environment tabs and only Overview + Settings. You're on…",
    "o": [
     "A Front-End Site (FES)",
     "WordPress",
     "A broken dashboard",
     "A Next.js Site"
    ],
    "a": 0,
    "w": "That layout matches the FES dashboard."
   },
   {
    "q": "Where do FES env vars live?",
    "o": [
     "FES dashboard Settings → Builds",
     "pantheon.yml",
     "Secrets Manager",
     "GitHub"
    ],
    "a": 0,
    "w": "FES used its own dashboard env var UI. Next.js uses Secrets Manager."
   },
   {
    "q": "Which URL pattern is FES?",
    "o": [
     "live-site.appa.pantheon.site",
     "site.vercel.app",
     "pr-1-site.pantheonsite.io",
     "dev-site.pantheonsite.io"
    ],
    "a": 0,
    "w": "FES stable URLs used appa.pantheon.site."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Identify sites using Next.js on Pantheon",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4351426657"
   },
   {
    "t": "How to confirm you're dealing with a Front-End site",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/2353234076"
   },
   {
    "t": "How to find a Front-End Site's dashboard from a domain",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/2646933507"
   },
   {
    "t": "Decoupled / Front-End Sites hub (CS)",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/2350514690"
   },
   {
    "t": "Docs: Front-End Sites overview (deprecated)",
    "u": "https://docs.pantheon.io/guides/decoupled/overview"
   },
   {
    "t": "Docs: FES requirements & considerations",
    "u": "https://docs.pantheon.io/guides/decoupled/overview/considerations"
   },
   {
    "t": "Release note: FES shutdown",
    "u": "https://docs.pantheon.io/release-notes/2026/05/fes-shutdown"
   }
  ]
 },
 {
  "id": 20,
  "week": 4,
  "mins": 50,
  "title": "FES → Next.js migration + Week 4 check",
  "goal": "Walk a customer through migration and a no-surprises domain cutover.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Review",
    10
   ],
   [
    "Week check",
    15
   ]
  ],
  "learn": "<ol class=\"steps\"><li>Install/authorize the <b>new</b> GitHub App on the repo (it's a different app from FES).</li><li>Create the site with upstream <b><code>nextjs-16</code></b>, even if the code isn't on Next 16.</li><li>Recreate every FES env var as a <b>secret</b>. Builds often fail until this is done.</li><li>Push or open a PR to rebuild. Confirm Dev works.</li><li>Agree on a Test/Live workflow: <b>Git tags</b>, or GitHub Actions if they want merge-to-Live.</li><li>Domain cutover (below).</li></ol><h4>Domain cutover: what the real tickets taught us</h4><ul><li>A hostname can only belong to one site. FES domains sit on an FES or placeholder config, and <b>releasing them is a Pantheon-side step, not self-service</b>.</li><li>Plan a <b>staffed, low-traffic window</b> with TTL lowered beforehand: release from FES → <code>domain:add</code> on Next.js Live → TXT verify → wait for HTTPS (plan for up to ~60 min) → set primary → verify.</li><li>Rollback: the on-duty CSE can re-attach the domain to FES.</li><li>Code gotchas: FES could run Node 16. Modern Next requires Node ≥ 20.9 (a real build error: \"You are using Node.js 16.20.2… >=20.9.0 is required\"). FES build webhooks don't exist, so switch to ISR or revalidation.</li></ul>",
  "lab": [
   "Read ticket #1119895 end to end and write the cutover plan in your own words."
  ],
  "knowhow": "Customers are getting \"Action Required: Update on Your Front End Sites\" emails and replying to Support asking Pantheon to lead the migration. Loop in their CSM. The Pantheon-led migration is being offered at no cost.",
  "quiz": [
   {
    "q": "Which upstream is used when recreating an FES site on the new platform?",
    "o": [
     "empty-nodejs",
     "nextjs-16 (even if code isn't v16)",
     "nextjs15 always",
     "decoupled-fes"
    ],
    "a": 1,
    "w": "The migration guide says to use nextjs-16 regardless."
   },
   {
    "q": "Can the customer move their domain off FES entirely by themselves?",
    "o": [
     "Only on Diamond",
     "No, the release from FES is a Pantheon-side step",
     "Yes, via terminus domain:remove",
     "Yes, via DNS only"
    ],
    "a": 1,
    "w": "The release isn't self-service, so coordinate a staffed window."
   },
   {
    "q": "(Week 4 review) PAPC inactive on the WP backend causes…",
    "o": [
     "Build failures",
     "Content not updating after publish/clear",
     "404s",
     "Image errors"
    ],
    "a": 1,
    "w": "Surrogate-key purging doesn't fire without PAPC."
   },
   {
    "q": "(Week 3 review) FES env vars must be recreated as…",
    "o": [
     ".env files committed",
     "Secrets (type env)",
     "pantheon.yml entries",
     "GitHub secrets"
    ],
    "a": 1,
    "w": "Next.js uses Secrets Manager."
   },
   {
    "q": "(Week 1 review) Build error: \"You are using Node.js 16… >=20.9.0 required\". Fix?",
    "o": [
     "Change DNS",
     "Update engines.node in package.json",
     "Clear cache",
     "Reinstall GitHub App"
    ],
    "a": 1,
    "w": "Pantheon picks Node from engines."
   }
  ],
  "refs": [
   {
    "t": "Docs: Migrating from Front-End Sites",
    "u": "https://docs.pantheon.io/nextjs/migrating-from-front-end-sites"
   },
   {
    "t": "Ticket #1119895: FES → Next.js domain cutover",
    "u": "https://pantheon.zendesk.com/agent/tickets/1119895"
   },
   {
    "t": "Ticket #1121681: FES customer requests Pantheon-led migration",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121681"
   },
   {
    "t": "Release note: FES shutdown",
    "u": "https://docs.pantheon.io/release-notes/2026/05/fes-shutdown"
   }
  ]
 },
 {
  "id": 21,
  "week": 5,
  "mins": 45,
  "title": "The triage framework",
  "goal": "Use one consistent method on every Next.js ticket.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<ol class=\"steps\"><li><b>Identify the product</b>: Next.js Site, FES, or external host (Day 1/19).</li><li><b>Open the right dashboard</b>: add yourself as <b>Administrator</b> on the owning workspace (via the old dashboard), then use the new workspace UI → Sites → CMS Sites, or a direct URL containing <code>/workspace/{ORG_ID}/node-site/{SITE_UUID}/</code>. Wrong URLs cause false errors (BUGS-10686).</li><li><b>Collect</b>: which pages? which environments? when did it start, and what changed (deploy, publish, config)?</li><li><b>Check logs</b>: Builds, then Runtime.</li><li><b>Pick the layer</b>, then its playbook:<br>build/deploy failure or never built → <i>Build failures</i><br>live but stale → <i>Caching</i><br>wrong render / 404 / API handling → <i>Application issues</i><br>empty data / backend errors → <i>CMS</i><br>many sites at once → <i>Platform incident</i></li><li><b>Classify the root cause</b>: customer code, misconfiguration, or Pantheon platform.</li><li>Still unclear → post in #ask-nextjs with site, env, description, and what you tried.</li></ol>",
  "lab": [
   "Use the <b>Common reports</b> tab in this course. Pick three rows and walk them through the framework out loud."
  ],
  "knowhow": "The \"Where to start\" playbook exists because the same symptom can come from four layers. Don't jump to a fix before you've named the layer.",
  "quiz": [
   {
    "q": "Site is live but content is stale after publishing. Which layer first?",
    "o": [
     "Build",
     "Cache",
     "DNS",
     "GitHub"
    ],
    "a": 1,
    "w": "The playbook routes live-but-stale to caching."
   },
   {
    "q": "Which dashboard URL is correct for a Next.js Site?",
    "o": [
     "/workspace/{ORG}/node-site/{SITE}/",
     "/site/{uuid}/overview",
     "/sites/{uuid}",
     "/workspace/{ORG}/cms-site/{SITE}"
    ],
    "a": 0,
    "w": "The correct URL contains both the ORG_ID and /node-site/."
   },
   {
    "q": "Final classification buckets are…",
    "o": [
     "Front / back",
     "P1/P2/P3",
     "Easy / hard",
     "Customer code / misconfiguration / platform"
    ],
    "a": 3,
    "w": "That classification is the curriculum's diagnostic success criterion."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Where to start when a Next.js site has problems",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737007645"
   },
   {
    "t": "Playbook: Identify sites using Next.js on Pantheon",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4351426657"
   },
   {
    "t": "Next.js: Training Curriculum (CS)",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/5201264641"
   }
  ]
 },
 {
  "id": 22,
  "week": 5,
  "mins": 50,
  "title": "Common report #1: \"My build is failing\"",
  "goal": "Resolve most BUILD_FAILUREs from the log alone.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<table><thead><tr><th>Log says…</th><th>Do this</th></tr></thead><tbody><tr><td>Missing/undefined env var, fetch to <code>undefined/…</code></td><td>Verify secrets (type env), then rebuild</td></tr><tr><td>Dependency failed to install / <code>npm ci</code> lock mismatch</td><td>Customer checks that the dependency and version are valid in package.json, and regenerates and commits the lock file</td></tr><tr><td>Missing build/start script</td><td>Add <code>build</code> and <code>start</code> (plus <code>gcp-build</code> for yarn)</td></tr><tr><td>Node version required ≥ X</td><td>Fix <code>engines.node</code></td></tr><tr><td>TypeScript/compile error</td><td>App code: point to the file:line and have them run <code>npm run build</code> locally</td></tr><tr><td>GitHub connection / authorization error</td><td>Reinstall the Pantheon GitHub app; check githubstatus.com</td></tr><tr><td><code>ENOENT … .next/next-server.js.nft.json</code></td><td>Seen when the Next.js version didn't match the package being pulled. Check versions, then rebuild</td></tr><tr><td>No log / truncated log / \"queued\" placeholder</td><td><b>Likely platform</b>: gather build IDs, CSE Booster Cloud Build, #ask-nextjs</td></tr></tbody></table><p>Before anything else: did <b>any</b> build ever succeed? What changed in the most recent push?</p>",
  "lab": [
   "On a PR branch of brix-nextjs, cause three failures one at a time: remove <code>&quot;start&quot;</code>, set <code>engines.node</code> to <code>&quot;16.x&quot;</code>, and reference a secret that doesn't exist. Read each log. Revert."
  ],
  "knowhow": "Compare the failing build's commit with the last successful one. Most build tickets are solved by the diff between those two commits.",
  "quiz": [
   {
    "q": "Build log: \"Missing script: start\". Fix?",
    "o": [
     "Add a start script to package.json",
     "Escalate",
     "Clear cache",
     "Reinstall GitHub App"
    ],
    "a": 0,
    "w": "Pantheon expects build and start scripts."
   },
   {
    "q": "Two failed builds with no logs at all, builds fine locally and elsewhere. Classification?",
    "o": [
     "Likely platform, escalate with build IDs",
     "Misconfigured DNS",
     "Expected",
     "Customer code"
    ],
    "a": 0,
    "w": "Past no-log builds were resolved as platform bugs."
   },
   {
    "q": "Error references GitHub authorization. First customer step?",
    "o": [
     "Uninstall/reinstall the Pantheon GitHub app",
     "Delete repo",
     "Change Node",
     "Add pantheon.yml"
    ],
    "a": 0,
    "w": "That's the build-failure playbook's step, along with checking GitHub status."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Diagnosing Next.js build or deployment failures",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4736876562"
   },
   {
    "t": "Playbook: Accessing logs for a Next.js site",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4623073304"
   },
   {
    "t": "Ticket #1108320: ENOENT .next/next-server.js.nft.json",
    "u": "https://pantheon.zendesk.com/agent/tickets/1108320"
   },
   {
    "t": "Ticket #1114861: stale x-nextjs-cache HIT / build failing with no logs",
    "u": "https://pantheon.zendesk.com/agent/tickets/1114861"
   },
   {
    "t": "Ticket #1115753: truncated build log (yarn, Node 24)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1115753"
   }
  ]
 },
 {
  "id": 23,
  "week": 5,
  "mins": 45,
  "title": "Common report #2: \"Deploy stuck / Test or Live didn't update\"",
  "goal": "Separate tag, deploy, and platform-queue problems.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Practice",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<ul><li><b>No build at all after a tag</b>: check the tag name pattern and that the integer increments. Confirm the tag was actually pushed (<code>git push origin &lt;tag&gt;</code>).</li><li><b>BUILD_SUCCESS but never deployed</b>: check <code>terminus node:builds:list &lt;site&gt;.live</code> for which build is actually deployed. In one real case, Live had been serving a months-old deployment.</li><li><b>DEPLOYMENT_FAILURE</b>: check the tag format; if the error mentions the GitHub app, reinstall it; then look at GCP logs via CSE Booster.</li><li><b>Everything queued, many customers</b>: build-queue incidents have happened (Aug 2026). Check Grafana and status, then #ask-nextjs.</li><li><b>Rollback</b>: <code>terminus node:builds:rollback &lt;site&gt;.live &lt;build-id&gt;</code>.</li><li>Also remember: lock/unlock and new secrets only apply after a new build.</li></ul>",
  "lab": [
   "Run <code>terminus node:builds:list brix-nextjs.live</code> and identify the build currently deployed.",
   "Push a tag with a wrong pattern to brix-nextjs and observe what happens (then delete it)."
  ],
  "knowhow": "\"My change isn't on Live\" is often just \"no Live tag was pushed\". Ask for the exact tag name and the output of <code>git tag --list</code> before digging deeper.",
  "quiz": [
   {
    "q": "Command to see which build is deployed on Live?",
    "o": [
     "terminus backup:list",
     "terminus node:builds:list <site>.live",
     "git log",
     "terminus env:info"
    ],
    "a": 1,
    "w": "node:builds:list shows the builds and their deployed status."
   },
   {
    "q": "Many customers report builds stuck in queue at the same time. First move?",
    "o": [
     "Tell them to wait a day",
     "Check for a platform incident (Grafana, status page, team channel)",
     "Troubleshoot each site",
     "Reinstall GitHub app"
    ],
    "a": 1,
    "w": "Rule out a platform incident first."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Diagnosing Next.js build or deployment failures",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4736876562"
   },
   {
    "t": "Docs: Test and Live environments",
    "u": "https://docs.pantheon.io/nextjs/test-and-live-env"
   },
   {
    "t": "Ticket #1115296: builds with no logs, BUILD_SUCCESS never deployed",
    "u": "https://pantheon.zendesk.com/agent/tickets/1115296"
   },
   {
    "t": "Ticket #1116489: stuck deployment / build queue",
    "u": "https://pantheon.zendesk.com/agent/tickets/1116489"
   },
   {
    "t": "Ticket #1111396: cannot promote deploy to Live",
    "u": "https://pantheon.zendesk.com/agent/tickets/1111396"
   }
  ]
 },
 {
  "id": 24,
  "week": 5,
  "mins": 50,
  "title": "Common report #3: \"Content is stale / not updating\"",
  "goal": "Prove which cache layer is holding stale content, using headers and config.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    20
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<pre><code>curl -sI https://www.example.com/blog/post | grep -iE &quot;x-nextjs-cache|x-cache|cf-cache-status|cache-control|age&quot;</code></pre><table><thead><tr><th>What you see</th><th>Meaning</th></tr></thead><tbody><tr><td>CDN <b>HIT</b>, old content</td><td>Edge copy; <code>env:clear-cache</code> or a surrogate-key purge should fix it. If it keeps coming back → PAPC or Cache Handler integration</td></tr><tr><td>CDN <b>MISS</b> + <code>x-nextjs-cache: HIT</code>, old content</td><td>App cache is stale → Cache Handler, revalidation, or stale artifacts across deploys</td></tr><tr><td><code>x-nextjs-cache: STALE</code></td><td>Served stale while regenerating (ISR), usually fine on the next request</td></tr><tr><td><code>s-maxage=N</code></td><td>The CDN may keep the page for N seconds unless it's purged</td></tr></tbody></table><ul><li>Then apply the caching playbook map from Day 17: handler present? PAPC active? secrets match? ISR interval?</li><li>After a redeploy, revalidation that used to work stopped working in one real case. Compare what changed in the deploy.</li><li>Known edge behavior (Sep 2026): on Cloudflare-based Next-gen GCDN, HTML responses showed <code>cf-cache-status: DYNAMIC</code> (not cached at the edge) and a fix was in progress. That's the <i>opposite</i> symptom (more origin load, not stale pages), but be ready to recognize it.</li></ul>",
  "lab": [
   "On brix-nextjs, add a page fetching brix-nextjs-cms posts with <code>revalidate = 30</code>. Deploy it, then watch <code>x-nextjs-cache</code> change across MISS/HIT/STALE."
  ],
  "knowhow": "A custom \"invalidate\" route clears the Next.js cache, but the page is still stale for about <code>s-maxage</code> seconds? That's the CDN. The Cache Handler's revalidation is what ties app invalidation to a CDN purge.",
  "quiz": [
   {
    "q": "CDN MISS, x-nextjs-cache HIT, old content. Where's the stale copy?",
    "o": [
     "CDN",
     "CMS",
     "Next.js app cache",
     "Browser"
    ],
    "a": 2,
    "w": "The CDN passed through; Next.js served its cached copy."
   },
   {
    "q": "Customer's own invalidation route works in Next.js but pages stay stale ~180s; header s-maxage=180. Cause?",
    "o": [
     "Node version",
     "DNS",
     "CDN honoring s-maxage without a purge",
     "Build failure"
    ],
    "a": 2,
    "w": "App invalidation alone doesn't purge the CDN."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Debugging caching issues on Next.js sites",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4735893555"
   },
   {
    "t": "Ticket #1114861: stale x-nextjs-cache HIT / build failing with no logs",
    "u": "https://pantheon.zendesk.com/agent/tickets/1114861"
   },
   {
    "t": "Ticket #1116277: page invalidation with s-maxage (Drupal + Next 16)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1116277"
   },
   {
    "t": "Ticket #1106237: Live failing to revalidate (Drupal backend)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1106237"
   }
  ]
 },
 {
  "id": 25,
  "week": 5,
  "mins": 50,
  "title": "Common report #4: 404s, empty pages, 5xx & 403 + Week 5 check",
  "goal": "Work the application-issues playbook and spot when it's really a platform problem.",
  "plan": [
   [
    "Learn",
    20
   ],
   [
    "Review",
    10
   ],
   [
    "Week check",
    20
   ]
  ],
  "learn": "<h4>404 on some pages</h4><ol class=\"steps\"><li>Latest build is BUILD_SUCCESS (if not → build playbook).</li><li>Are the failing URLs in the build output's list of generated pages?</li><li>If not: <b>CSE Booster → \"Clone git repo\"</b>, then <code>grep -r &quot;generateStaticParams&quot; .</code> (App Router) or <code>grep -r &quot;getStaticPaths&quot; .</code> (Pages Router).</li><li><code>fallback: false</code> / <code>dynamicParams = false</code> + slug missing from the paths → 404 by design → the customer's dev team fixes it.</li></ol><h4>Page exists but is empty</h4><p>Runtime logs for fetch errors → audit the CMS (if on Pantheon, NGINX/PHP logs) → content can't render until the CMS stops erroring.</p><h4>5xx / 403</h4><ul><li>Repeated 500s on one route → the customer's route code (runtime logs + stack trace).</li><li>504s, OOM, missing <code>/_next/</code> files → escalate. One real case needed the Next.js team.</li><li>Many sites returning 403 at once → <b>platform incident</b> (INCIDENT 2026-08-20). Tag the ticket to the incident.</li></ul>",
  "lab": [
   "This course is your example: <code>/training/day/[day]</code> calls <code>notFound()</code> for any day outside 1–30. Request <code>/training/day/99</code>, confirm the 404, and explain it as if to a customer.",
   "Temporarily deactivate the REST API on brix-nextjs-cms (or break the secret) and watch the brix-nextjs page render empty. Then restore it."
  ],
  "knowhow": "Support's job on app-layer 404s is to <i>find and explain</i> the cause (point to the file and the setting). The customer's developers make the change.",
  "quiz": [
   {
    "q": "Pages Router: /blog/new-post 404s; getStaticPaths lacks it; fallback: false. Response?",
    "o": [
     "Clear cache",
     "Rebuild will fix",
     "Explain it's app config; dev team adds path or changes fallback",
     "Platform bug"
    ],
    "a": 2,
    "w": "Paths not generated at build 404 by design."
   },
   {
    "q": "Dozens of Next.js sites return 403 simultaneously. Treat as…",
    "o": [
     "WAF misconfig per site",
     "Individual app bugs",
     "A platform incident",
     "Customer DNS"
    ],
    "a": 2,
    "w": "Many sites at once points to the platform."
   },
   {
    "q": "(Week 5 review) BUILD_SUCCESS but Live unchanged. Check…",
    "o": [
     "Node version",
     "Whether the build deployed / Live tag pushed",
     "Cache Handler",
     "DNS"
    ],
    "a": 1,
    "w": "Check the deploy status and tags first."
   },
   {
    "q": "(Week 4 review) Handler + PAPC OK, webhook failing. Look at…",
    "o": [
     "GitHub App",
     "Revalidation secret on both sides",
     "DNS TTL",
     "Node version"
    ],
    "a": 1,
    "w": "Mismatched secrets are the common cause."
   },
   {
    "q": "(Week 3 review) Runtime logs show little activity on a static site. This is…",
    "o": [
     "Normal",
     "A security issue",
     "Broken logging",
     "Platform outage"
    ],
    "a": 0,
    "w": "Static sites generate little runtime activity."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Investigating Next.js application issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
   },
   {
    "t": "Ticket #1107256: 504 / OOM, missing _next files",
    "u": "https://pantheon.zendesk.com/agent/tickets/1107256"
   },
   {
    "t": "Ticket #1113719: INCIDENT Next.js sites returning 403",
    "u": "https://pantheon.zendesk.com/agent/tickets/1113719"
   },
   {
    "t": "Ticket #1121734: WAF false positive surfaces as 502 in Next.js",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121734"
   }
  ]
 },
 {
  "id": 26,
  "week": 6,
  "mins": 45,
  "title": "GitHub, repositories & workspace operations",
  "goal": "Handle repo moves, workspace transfers, and GitHub App edge cases safely.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    15
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<h4>Transfer a Next.js site to another workspace</h4><ol class=\"steps\"><li>The customer (admin of <b>both</b> workspaces) links the VCS connection first:<br><code>terminus vcs:connection:link &lt;dest&gt; --vcs-org=&lt;github-org&gt; --source-org=&lt;source&gt;</code></li><li>They contact Support with the site, source, and destination. <b>Support performs the transfer.</b></li><li>Verify: the site appears in the destination, and a small push triggers a build.</li></ol><ul><li>Site missing a codeserver after a transfer → step 1 was likely skipped.</li><li>App installed on a <b>personal GitHub account</b>: only that user can run the link. A known limitation (DEVX-6652) needs a workaround, so escalate if that user isn't available.</li><li><b>Moving the repo to another GitHub org</b>: plan how to keep the Pantheon build integration (the app must be installed on the new org). Past incidents: a repo transfer broke the eVCS integration and needed engineering.</li><li>GitHub App permissions set to \"only select repositories\" → new repos must be added in GitHub.</li></ul>",
  "lab": [
   "Run <code>terminus vcs:connection:list &lt;your-workspace&gt;</code> and explain every row.",
   "Read ticket #1118565 and draft the steps you'd give that customer."
  ],
  "knowhow": "Never start a Next.js workspace transfer before confirming <code>vcs:connection:link</code> was done. Undoing a half-transferred site is much harder than waiting a day.",
  "quiz": [
   {
    "q": "Who performs the actual Next.js site transfer between workspaces?",
    "o": [
     "Pantheon Support",
     "The customer in the dashboard",
     "GitHub",
     "Automatic"
    ],
    "a": 0,
    "w": "Customers do the VCS link. Support performs the transfer."
   },
   {
    "q": "What must happen before the transfer?",
    "o": [
     "Downgrade plan",
     "Remove domains",
     "Delete Multidevs",
     "vcs:connection:link to the destination workspace"
    ],
    "a": 3,
    "w": "The VCS connection must be linked to the destination first."
   }
  ],
  "refs": [
   {
    "t": "Docs: Transfer a Next.js site between workspaces",
    "u": "https://docs.pantheon.io/nextjs/transfer-site"
   },
   {
    "t": "Playbook: Move a site to a different workspace",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/383549466"
   },
   {
    "t": "Ticket #1118565: transfer connected GitHub repo to another org",
    "u": "https://pantheon.zendesk.com/agent/tickets/1118565"
   }
  ]
 },
 {
  "id": 27,
  "week": 6,
  "mins": 40,
  "title": "Domains, HTTPS, CDN & edge questions",
  "goal": "Answer the edge and domain questions that come with every go-live.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    10
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<ul><li>Custom domains on Next.js are <b>self-service</b> (Live env → Domains &amp; HTTPS), unlike FES. HTTPS usually provisions within about an hour.</li><li><b>Domain masking</b> (serving the app under another site's path/domain) isn't a native feature → route to Professional Services.</li><li><b>AGCDN</b> for Next.js is in development (WAF, edge log streaming, header changes).</li><li>Bots or crawlers blocked by Next-gen GCDN → the User-Agent allowlist playbook. Only approved agents per shift can edit it.</li><li>HTTP streaming and <code>&lt;Suspense&gt;</code> are documented as supported for Next.js. SSE/websockets have had caveats, so check #ask-nextjs for current status before promising.</li></ul><h4>Fingerprint a site from headers</h4><pre><code>curl -sI https://example.com | grep -iE &quot;x-powered-by|is-node|via|x-nextjs-cache|cf-cache-status|x-cache|server&quot;\n# x-powered-by: Next.js   → Next.js app\n# is-node: true           → Pantheon Node runtime\n# via: 1.1 Caddy, 1.1 google → Pantheon Next.js serving path\n# cf-cache-status vs x-cache → Cloudflare vs Fastly edge</code></pre>",
  "lab": [
   "Run the fingerprint curl against https://dev-brix-nextjs.pantheonsite.io, https://dev-brix-nextjs-cms.pantheonsite.io, and docs.pantheon.io. Compare the results."
  ],
  "knowhow": "Before you open a dashboard, <code>curl -I</code> tells you in five seconds whether you're looking at Next.js, which edge served the response, and which cache answered.",
  "quiz": [
   {
    "q": "Customer wants the Next.js app served under a path of another domain (masking). Answer?",
    "o": [
     "Use pantheon.yml",
     "Not native, route to Professional Services",
     "Self-service in dashboard",
     "Impossible anywhere"
    ],
    "a": 1,
    "w": "Domain masking was escalated to PS in a real ticket."
   },
   {
    "q": "Header `is-node: true` suggests…",
    "o": [
     "WordPress",
     "FES static",
     "Vercel",
     "Pantheon's Node/Next.js runtime"
    ],
    "a": 3,
    "w": "It appears on Pantheon Next.js responses."
   }
  ],
  "refs": [
   {
    "t": "Docs: Test and Live environments",
    "u": "https://docs.pantheon.io/nextjs/test-and-live-env"
   },
   {
    "t": "Playbook: Add user agents to the Next-gen GCDN allowlist",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/5060231195"
   },
   {
    "t": "Docs: Comparison to CMS hosting & considerations",
    "u": "https://docs.pantheon.io/nextjs/considerations"
   },
   {
    "t": "Ticket #1121436: domain masking with Next.js",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121436"
   }
  ]
 },
 {
  "id": 28,
  "week": 6,
  "mins": 40,
  "title": "Support scope & escalation paths",
  "goal": "Escalate the right way, with the right evidence, in the right channel.",
  "plan": [
   [
    "Learn",
    25
   ],
   [
    "Practice",
    10
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<h4>Scope</h4><ul><li>We troubleshoot and debug application-level issues across WordPress, Drupal, and Next.js. <b>Remediation stays with the customer.</b></li><li>Application issues (routing config, ISR/Cache Handler behaving as the code configured it, API handling) are the customer's code. We audit, explain, and unblock where we can.</li></ul><h4>Ladder</h4><ol class=\"steps\"><li><b>Rule out a platform incident</b>: Grafana Next.js dashboard, status page, and an @here in the CSE team channel asking if others see it. If yes → incident path (post in #ask-nextjs to alert PDE, then a bug card).</li><li>Follow the relevant playbook and write down <b>repro steps</b>.</li><li>Backend on Pantheon? Rule out the CMS like normal.</li><li><b>Swarm</b> in #ask-cse.</li><li>Post in <b>#ask-nextjs</b>: site, env, description, what you tried, and a link to the Swarm.</li><li>Confirmed platform bug → escalate to PDE / bug card.</li></ol>",
  "lab": [
   "Write a mock #ask-nextjs post for the Day 22 \"no logs\" scenario using the template in the Field Guide."
  ],
  "knowhow": "Escalations move fastest when they include: site + env, build IDs or timestamps, headers or log excerpts, what you ruled out, and whether other sites are affected.",
  "quiz": [
   {
    "q": "First step before escalating a Next.js issue?",
    "o": [
     "Page engineering",
     "Check for a platform-wide incident",
     "Ask customer for code",
     "Close ticket"
    ],
    "a": 1,
    "w": "A site-specific issue and a platform incident can look identical."
   },
   {
    "q": "Where do you create a Swarm?",
    "o": [
     "Email",
     "#ask-cse",
     "#ask-nextjs",
     "#cse-decoupled"
    ],
    "a": 1,
    "w": "Swarm in #ask-cse, then #ask-nextjs if unresolved."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Escalating Next.js issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737466374"
   },
   {
    "t": "Grafana: Next.js tenant pool dashboard",
    "u": "https://pantheon.grafana.net/d/ryhvwhm/tenant-pool?orgId=1&from=now-6h&to=now&timezone=browser&var-project_id=external-provisioner&var-tenant_type=$__all&var-operation=$__all"
   },
   {
    "t": "Slack: #ask-cse (Swarms)",
    "u": "https://pantheon.enterprise.slack.com/archives/C06J7Q565FC"
   },
   {
    "t": "Slack: #ask-nextjs",
    "u": "https://pantheon.enterprise.slack.com/archives/C09LX4DKH0E"
   }
  ]
 },
 {
  "id": 29,
  "week": 6,
  "mins": 50,
  "title": "Ticket craft & simulations",
  "goal": "Write first replies that collect everything needed, and practice full diagnoses.",
  "plan": [
   [
    "Learn",
    15
   ],
   [
    "Simulations",
    30
   ],
   [
    "Check",
    5
   ]
  ],
  "learn": "<h4>First meaningful reply (template)</h4><pre><code>Hi &lt;name&gt;,\n\nThanks for the details. I can see &lt;site&gt; is a Next.js site and I&#x27;m reviewing\nthe build and runtime logs for &lt;env&gt; now. To narrow this down quickly:\n\n1. Which pages/URLs are affected (a couple of examples is perfect)?\n2. Does it happen in Dev/Test/Live, or only one environment?\n3. When did it start, and did anything change right before\n   (a deploy/tag, a content publish, a secret or config change)?\n\nI&#x27;ll update you with what I find by &lt;time&gt;.</code></pre><h4>Telling a customer it's in their code (kindly)</h4><p>Name the file and setting, explain the behavior, offer the doc, and say it's their team's change to make: <i>\"In <code>pages/blog/[slug].js</code>, <code>getStaticPaths</code> returns a fixed list with <code>fallback: false</code>, so new slugs return 404 by design. Your developers can add the path or change the fallback setting. Here's the relevant Next.js doc.\"</i></p><h4>Simulations: diagnose first, then reveal</h4><details><summary><b>Sim A.</b> \"Secrets set yesterday; <code>process.env.API_KEY</code> is undefined. Builds succeed.\"</summary><p>Check <code>secret:site:list</code>. Type should be <code>env</code>, not <code>runtime</code>. Then confirm a build ran after the change. Classification: misconfiguration.</p></details><details><summary><b>Sim B.</b> \"Pushed <code>pantheon_live_7</code>, nothing happened. Last Live tag was <code>pantheon_live_4</code>.\"</summary><p>Tags work, but check that <code>_7</code> was actually pushed, which build is deployed (<code>node:builds:list</code>), and whether a build started. If there's nothing at all and other sites are also quiet, suspect a queue incident. Classification: misconfiguration or platform.</p></details><details><summary><b>Sim C.</b> \"WordPress edits appear on Next.js only ~10 minutes later.\"</summary><p>grep for <code>revalidate</code>. If it's <code>600</code>, that's expected time-based ISR. Offer webhook revalidation with the Cache Handler (an app change). Classification: customer code (working as configured).</p></details><details><summary><b>Sim D.</b> \"Customer can't pick their GitHub org when creating a site; they created one before in another workspace.\"</summary><p>The existing connection is linked to another workspace → <code>terminus vcs:connection:link</code>. Classification: misconfiguration or known UX gap.</p></details>",
  "lab": [
   "Answer all four simulations before you reveal them. Score yourself.",
   "Pick a real closed Next.js ticket from the Common reports tab and rewrite its first reply using the template."
  ],
  "knowhow": "Always state the next update time, and keep to it. Update before your SLA window closes even when the update is just \"still investigating, here's where we are.\"",
  "quiz": [
   {
    "q": "Which three facts does every first reply request?",
    "o": [
     "Browser, OS, ISP",
     "Budget, timeline, owner",
     "Affected pages, environments, when/what changed",
     "Plan, region, CSM"
    ],
    "a": 2,
    "w": "Those are the collection steps in the \"Where to start\" playbook."
   }
  ],
  "refs": [
   {
    "t": "Playbook: Where to start when a Next.js site has problems",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737007645"
   },
   {
    "t": "Playbook: Investigating Next.js application issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
   }
  ]
 },
 {
  "id": 30,
  "week": 6,
  "mins": 60,
  "title": "Capstone: break-your-own-site + final exam",
  "goal": "Diagnose purposely broken setups from logs only, then pass the final exam.",
  "plan": [
   [
    "Break & diagnose",
    35
   ],
   [
    "Final exam",
    20
   ],
   [
    "Next steps",
    5
   ]
  ],
  "learn": "<p>Work on a <b>PR branch</b> of brix-nextjs so Dev/Live stay clean. For each scenario, have a teammate (or future-you) apply the change without telling you which one it is. Then diagnose it using only the dashboard, Terminus, curl, and the repo.</p><ol class=\"steps\"><li>Two lock files committed (package-lock.json + yarn.lock).</li><li><code>engines.node</code> set to an unsupported version.</li><li>A page that fetches <code>process.env.CMS_URL</code> at build, with the secret deleted.</li><li>A dynamic route with <code>dynamicParams = false</code> and a missing slug.</li><li>Cache Handler removed from next.config, and a <code>revalidate</code> of 3600 on the home page.</li></ol><p>For each one, write: <b>symptom → log/evidence → layer → root-cause class → customer-facing explanation</b>.</p><h4>After the course</h4><ul><li>The Support Edition plan uses regional champions, simulations, office hours, and knowledge checks. The team target is independent Tier 1/2 Next.js ticket handling by Day 60.</li><li>Keep the Field Guide open while you work tickets, and add your own notes to each day.</li></ul>",
  "lab": [
   "Complete all five capstone scenarios on a PR branch of brix-nextjs.",
   "Close the PR without merging.",
   "Take the final exam below."
  ],
  "knowhow": "Diagnosing well means you can say <i>where</i> the problem started (build, runtime, client, or browser) and <i>whose</i> it is (customer code, misconfiguration, or platform) before you suggest any fix.",
  "quiz": [
   {
    "q": "Next.js dashboard URLs must contain…",
    "o": [
     "/decoupled/",
     "/cms-site/",
     "/node-site/",
     "/fes/"
    ],
    "a": 2,
    "w": "The correct form is /workspace/{ORG}/node-site/{SITE}/."
   },
   {
    "q": "Test/Live deploys on Next.js are triggered by…",
    "o": [
     "Quicksilver",
     "Dashboard buttons",
     "Git tags",
     "pantheon.yml"
    ],
    "a": 2,
    "w": "Git tags in the connected repo."
   },
   {
    "q": "Secret type required for process.env in Next.js?",
    "o": [
     "composer",
     "runtime",
     "file",
     "env"
    ],
    "a": 3,
    "w": "Type env (as in the #1109329 resolution)."
   },
   {
    "q": "\"Some pages update after a cache clear, others don't\" →",
    "o": [
     "Node version",
     "Missing Cache Handler",
     "GitHub App",
     "DNS"
    ],
    "a": 1,
    "w": "That's the caching playbook's first row."
   },
   {
    "q": "FES env vars were set in…",
    "o": [
     "pantheon.yml",
     "FES dashboard Settings → Builds",
     "GitHub",
     "Secrets Manager"
    ],
    "a": 1,
    "w": "FES had its own UI."
   },
   {
    "q": "Build fails with no logs across two sites in one org. Classification?",
    "o": [
     "Expected",
     "DNS",
     "Customer code",
     "Likely platform"
    ],
    "a": 3,
    "w": "Gather evidence and escalate."
   },
   {
    "q": "Which does NOT work on Next.js sites today?",
    "o": [
     "Quicksilver hooks",
     "Custom domains",
     "Multidev",
     "env:clear-cache"
    ],
    "a": 0,
    "w": "Quicksilver isn't supported."
   },
   {
    "q": "Who installs the GitHub App on an org?",
    "o": [
     "Anyone with a repo",
     "Any member",
     "Support",
     "Org admin who is also a workspace member"
    ],
    "a": 3,
    "w": "Both roles are required."
   },
   {
    "q": "Customer's CMS is hosted off-Pantheon and returns 500s to Next.js. You…",
    "o": [
     "Debug their CMS server",
     "Show evidence; they contact their CMS host",
     "Rebuild Next.js",
     "Close ticket"
    ],
    "a": 1,
    "w": "We can't audit backends we don't host."
   },
   {
    "q": "Before escalating to PDE you should…",
    "o": [
     "Wait 48h",
     "Email the CTO",
     "Skip playbooks",
     "Rule out platform incident, follow playbooks, Swarm, #ask-nextjs"
    ],
    "a": 3,
    "w": "That's the escalation ladder."
   }
  ],
  "refs": [
   {
    "t": "TSE | Next.js In a Box | Support Edition",
    "u": "https://docs.google.com/document/d/1FBQ_pi7Gtuel-EvrYYRaLJZGvFfZNREOj24sYBPB_uM"
   },
   {
    "t": "Next.js: Training Curriculum (CS)",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/5201264641"
   },
   {
    "t": "Playbook: Escalating Next.js issues",
    "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737466374"
   }
  ]
 }
];

export const REPORTS: Report[] = [
 {
  "s": "Build failing (BUILD_FAILURE)",
  "layer": "Build",
  "checks": [
   "Last good build vs failing commit",
   "Secrets present (type env)?",
   "engines / lock file / build+start scripts"
  ],
  "pb": {
   "t": "Playbook: Diagnosing Next.js build or deployment failures",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4736876562"
  },
  "tk": [
   {
    "t": "Ticket #1108320: ENOENT .next/next-server.js.nft.json",
    "u": "https://pantheon.zendesk.com/agent/tickets/1108320"
   }
  ]
 },
 {
  "s": "Build fails with no / truncated logs",
  "layer": "Platform",
  "checks": [
   "Build IDs + timestamps",
   "CSE Booster → Cloud Build nodejs-trigger-*",
   "Other sites in org affected?"
  ],
  "pb": {
   "t": "Playbook: Escalating Next.js issues",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737466374"
  },
  "tk": [
   {
    "t": "Ticket #1114861: stale x-nextjs-cache HIT / build failing with no logs",
    "u": "https://pantheon.zendesk.com/agent/tickets/1114861"
   },
   {
    "t": "Ticket #1115296: builds with no logs, BUILD_SUCCESS never deployed",
    "u": "https://pantheon.zendesk.com/agent/tickets/1115296"
   },
   {
    "t": "Ticket #1115753: truncated build log (yarn, Node 24)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1115753"
   }
  ]
 },
 {
  "s": "Build stuck in queue / deploy stuck",
  "layer": "Platform",
  "checks": [
   "Grafana tenant pool",
   "Status page + team channel @here",
   "#ask-nextjs thread"
  ],
  "pb": {
   "t": "Playbook: Escalating Next.js issues",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737466374"
  },
  "tk": [
   {
    "t": "Ticket #1116489: stuck deployment / build queue",
    "u": "https://pantheon.zendesk.com/agent/tickets/1116489"
   },
   {
    "t": "Ticket #1111396: cannot promote deploy to Live",
    "u": "https://pantheon.zendesk.com/agent/tickets/1111396"
   }
  ]
 },
 {
  "s": "Test/Live not updating after tag",
  "layer": "Deploy",
  "checks": [
   "Tag pattern & increment",
   "Tag actually pushed",
   "node:builds:list: which build deployed?"
  ],
  "pb": {
   "t": "Playbook: Diagnosing Next.js build or deployment failures",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4736876562"
  },
  "tk": [
   {
    "t": "Ticket #1115296: builds with no logs, BUILD_SUCCESS never deployed",
    "u": "https://pantheon.zendesk.com/agent/tickets/1115296"
   }
  ]
 },
 {
  "s": "Stale content after publish",
  "layer": "Cache",
  "checks": [
   "x-cache / cf-cache-status vs x-nextjs-cache",
   "Cache Handler in package.json; PAPC active",
   "Revalidation secret match; revalidate interval"
  ],
  "pb": {
   "t": "Playbook: Debugging caching issues on Next.js sites",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4735893555"
  },
  "tk": [
   {
    "t": "Ticket #1106237: Live failing to revalidate (Drupal backend)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1106237"
   },
   {
    "t": "Ticket #1116277: page invalidation with s-maxage (Drupal + Next 16)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1116277"
   },
   {
    "t": "Ticket #1114861: stale x-nextjs-cache HIT / build failing with no logs",
    "u": "https://pantheon.zendesk.com/agent/tickets/1114861"
   }
  ]
 },
 {
  "s": "Some pages 404",
  "layer": "Application",
  "checks": [
   "Paths in build output?",
   "grep generateStaticParams / getStaticPaths",
   "fallback:false / dynamicParams=false"
  ],
  "pb": {
   "t": "Playbook: Investigating Next.js application issues",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
  },
  "tk": []
 },
 {
  "s": "Pages render empty",
  "layer": "CMS",
  "checks": [
   "Runtime logs for fetch errors",
   "Backend on Pantheon? audit NGINX/PHP",
   "Off-Pantheon → customer's host"
  ],
  "pb": {
   "t": "Playbook: Investigating Next.js application issues",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4753293314"
  },
  "tk": [
   {
    "t": "Ticket #1121734: WAF false positive surfaces as 502 in Next.js",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121734"
   }
  ]
 },
 {
  "s": "Secrets / env vars undefined",
  "layer": "Config",
  "checks": [
   "secret:site:list",
   "Type env, scope web",
   "Build since change?"
  ],
  "pb": {
   "t": "Playbook: Diagnosing Next.js build or deployment failures",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4736876562"
  },
  "tk": [
   {
    "t": "Ticket #1109329: secrets missing from process.env",
    "u": "https://pantheon.zendesk.com/agent/tickets/1109329"
   }
  ]
 },
 {
  "s": "Site creation fails / GitHub org missing",
  "layer": "GitHub App",
  "checks": [
   "Installer = org admin + workspace member?",
   "vcs:connection:list / link",
   "Empty repo?"
  ],
  "pb": {
   "t": "Playbook: Handling Next.js sites",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4348248146"
  },
  "tk": [
   {
    "t": "Ticket #1121319: Next.js site creation failed (GitHub org)",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121319"
   }
  ]
 },
 {
  "s": "Multidev not created for branch",
  "layer": "GitHub App",
  "checks": [
   "Prefix exactly multi-",
   "App has repo access",
   "GitHub event delivered"
  ],
  "pb": {
   "t": "Playbook: Handling Next.js sites",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4348248146"
  },
  "tk": [
   {
    "t": "Ticket #1121994: Multidev not created for multi- branch",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121994"
   }
  ]
 },
 {
  "s": "504 / OOM / missing _next files",
  "layer": "Platform / App",
  "checks": [
   "Runtime logs pattern",
   "Recent deploy?",
   "Escalate via #ask-nextjs"
  ],
  "pb": {
   "t": "Playbook: Escalating Next.js issues",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737466374"
  },
  "tk": [
   {
    "t": "Ticket #1107256: 504 / OOM, missing _next files",
    "u": "https://pantheon.zendesk.com/agent/tickets/1107256"
   }
  ]
 },
 {
  "s": "Many sites 403 / down at once",
  "layer": "Platform incident",
  "checks": [
   "Status page",
   "Incident channel/tag",
   "Link ticket to incident"
  ],
  "pb": {
   "t": "Playbook: Escalating Next.js issues",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/4737466374"
  },
  "tk": [
   {
    "t": "Ticket #1113719: INCIDENT Next.js sites returning 403",
    "u": "https://pantheon.zendesk.com/agent/tickets/1113719"
   }
  ]
 },
 {
  "s": "Move site to another workspace",
  "layer": "Account ops",
  "checks": [
   "vcs:connection:link done?",
   "Personal GitHub account install?",
   "Support performs transfer"
  ],
  "pb": {
   "t": "Playbook: Move a site to a different workspace",
   "u": "https://getpantheon.atlassian.net/wiki/spaces/CS/pages/383549466"
  },
  "tk": [
   {
    "t": "Ticket #1118565: transfer connected GitHub repo to another org",
    "u": "https://pantheon.zendesk.com/agent/tickets/1118565"
   }
  ]
 },
 {
  "s": "FES → Next.js migration / domain move",
  "layer": "FES",
  "checks": [
   "New GitHub App + nextjs-16 site",
   "Env vars → secrets; Node ≥ 20.9",
   "Staffed domain window; FES release is Pantheon-side"
  ],
  "pb": {
   "t": "Docs: Migrating from Front-End Sites",
   "u": "https://docs.pantheon.io/nextjs/migrating-from-front-end-sites"
  },
  "tk": [
   {
    "t": "Ticket #1119895: FES → Next.js domain cutover",
    "u": "https://pantheon.zendesk.com/agent/tickets/1119895"
   },
   {
    "t": "Ticket #1121681: FES customer requests Pantheon-led migration",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121681"
   }
  ]
 },
 {
  "s": "Domain masking / AGCDN request",
  "layer": "Edge",
  "checks": [
   "Masking not native → PS",
   "AGCDN for Next.js in development",
   "Set expectations"
  ],
  "pb": {
   "t": "Docs: Comparison to CMS hosting & considerations",
   "u": "https://docs.pantheon.io/nextjs/considerations"
  },
  "tk": [
   {
    "t": "Ticket #1121436: domain masking with Next.js",
    "u": "https://pantheon.zendesk.com/agent/tickets/1121436"
   }
  ]
 }
];

export function getDay(id: number): Day | undefined {
  return DAYS.find((d) => d.id === id);
}
