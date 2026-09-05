import type { Metadata } from "next";
import Callout from "@/components/learn/Callout";
import LessonHeader from "@/components/learn/LessonHeader";
import LessonNav from "@/components/learn/LessonNav";

const HREF = "/learn/environments";

export const metadata: Metadata = {
  title: "Environments, multidev, and logs",
  description:
    "Test and Live, environment locking, multidev branches, and reading logs.",
};

export default function Page() {
  return (
    <article>
      <LessonHeader href={HREF} />

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Environments come from git tags</h2>
        <p>
          This is the part that surprises people arriving from other hosts. You
          do not click &quot;deploy&quot;. You push a tag, and the tag name
          decides which environment builds.
        </p>

        <pre>
          <code>{`# Initialize or deploy to Test
git tag -a pantheon_test_1 -m "Push to Test"
git push origin pantheon_test_1

# Initialize or deploy to Live
git tag -a pantheon_live_1 -m "Push to Live"
git push origin pantheon_live_1`}</code>
        </pre>

        <p>
          The number increments each time. Tags are how this very site&apos;s
          environments were created — <code>pantheon_test_3</code> and{" "}
          <code>pantheon_live_1</code> both point at the commit that added the
          blog.
        </p>
      </div>

      <Callout variant="warning" title="A tag points at a commit, not a branch">
        <p>
          Whatever commit you tag is what gets deployed, merged or not. It is
          entirely possible to run code on Live that exists on no branch at all
          — tag an unmerged commit and Live serves something nobody can find by
          reading <code>main</code>. Tag deliberately.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Locking an environment</h2>
        <p>
          Test environments are publicly reachable by default. Locking one puts
          HTTP basic auth in front of it, so a client preview or a staging build
          is not indexable and not readable by anyone with the URL. Set it in
          the Dashboard security settings for that specific environment — the
          lock applies per environment, so locking Test leaves Live untouched.
        </p>

        <h2>Multidev</h2>
        <p>
          A multidev is a full environment for a branch, so a change can be
          reviewed running rather than only as a diff. The workflow:
        </p>

        <ol>
          <li>
            Branch with the <code>multi-</code> prefix the platform recognises,
            for example <code>multi-nav-redesign</code>.
          </li>
          <li>Push the branch; the environment builds from it.</li>
          <li>
            Open a pull request. Each further push to the branch rebuilds that
            environment.
          </li>
          <li>
            Merge, then deploy onward by tagging for Test and then Live.
          </li>
        </ol>

        <p>
          Changing the Node version is a good first multidev exercise, because
          the result is unambiguous: set it, push, and read the version back out
          of the build log. If the log disagrees with your config, your config is
          not being picked up — which is the actual thing you are testing.
        </p>

        <h2>Build logs vs runtime logs</h2>
        <p>
          Keeping these two apart is most of debugging, so it is worth being
          precise about which is which.
        </p>

        <ul>
          <li>
            <strong>Build logs</strong> cover install, compile, and the static
            generation that happens once, before anything is served. A failure
            here means no new deployment — the previous one keeps serving.
          </li>
          <li>
            <strong>Runtime logs</strong> come from the running Node server
            handling real requests. A failure here means the site deployed fine
            and is now erroring for visitors.
          </li>
        </ul>

        <p>
          Both are in the Dashboard per environment, and both are reachable from
          Terminus for grepping and for following along during a deploy.
        </p>
      </div>

      <Callout variant="verify">
        <p>
          The exact Terminus log commands and their flags differ by CLI version
          and by site type. Check <code>terminus list | grep -i log</code> on
          your install rather than copying a command from memory.
        </p>
      </Callout>

      <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
        <h2>Reading a build log</h2>
        <p>
          Read it top-down and stop at the <em>first</em> error. Later errors
          are usually consequences of the first one, and chasing the last line
          of output is how people end up debugging the wrong thing entirely.
          The order is always: install, then compile, then generate pages.
          Whichever phase the first error lands in tells you where to look.
        </p>
      </div>

      <LessonNav href={HREF} />
    </article>
  );
}
