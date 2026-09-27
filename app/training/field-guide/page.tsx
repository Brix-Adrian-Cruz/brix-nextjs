import type { Metadata } from "next";
import { FIELD_GUIDE_HTML } from "../_data/fieldGuide";

export const metadata: Metadata = { title: "Field guide" };

export default function FieldGuidePage() {
  return (
    <main>
      <div className="trn-fgwrap" dangerouslySetInnerHTML={{ __html: FIELD_GUIDE_HTML }} />
    </main>
  );
}
