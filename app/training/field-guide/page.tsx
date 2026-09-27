import type { Metadata } from "next";
import { FIELD_GUIDE_HTML } from "../_data/fieldGuide";
import { highlightRawHtml } from "@/lib/highlightCode";

export const metadata: Metadata = { title: "Field guide" };

export default async function FieldGuidePage() {
  const html = await highlightRawHtml(FIELD_GUIDE_HTML);

  return (
    <main>
      <div className="trn-fgwrap" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
