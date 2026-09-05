import type { Metadata } from "next";
import Image from "next/image";
import { siteMetadata } from "@/data/siteMetadata";

export const metadata: Metadata = {
  title: "About",
  description: siteMetadata.description,
};

export default function AboutPage() {
  return (
    <div className="py-6">
      <header className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          About these playbooks
        </h1>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="prose prose-slate max-w-none dark:prose-invert prose-a:text-primary-600 dark:prose-a:text-primary-400">
            <p>{siteMetadata.intro}</p>

            <h2>How to use them</h2>
            <p>
              Start with triage. It asks the three questions worth asking before
              any investigation, then points at the playbook for whichever layer
              owns the problem — platform, application, or CMS.
            </p>
            <p>
              Each playbook is written to be worked top to bottom. The ordering
              is deliberate: the checks near the top are the ones that most
              often turn out to be the answer.
            </p>

            <h2>Scope</h2>
            <p>
              Support fully covers Next.js Sites, front-end and back-end, except
              where the back-end is hosted off-platform. Application-layer
              issues sit outside formal scope, but auditing and pointing the
              customer in the right direction is still expected.
            </p>

            <h2>A caution</h2>
            <p>
              Platform behaviour changes. Where a step here disagrees with what
              the Dashboard or CLI actually does, the platform is right and this
              page is stale — raise it rather than working around it.
            </p>
          </div>
        </div>

        <aside>
          <Image
            src="/images/patch-panel.jpg"
            alt="A network patch panel with structured cabling"
            width={720}
            height={1280}
            className="rounded-lg border border-slate-200 object-cover dark:border-slate-800"
          />
          <p className="mt-2 font-mono text-[11px] text-slate-500 dark:text-slate-500">
            Image: Pixabay
          </p>
        </aside>
      </div>
    </div>
  );
}
