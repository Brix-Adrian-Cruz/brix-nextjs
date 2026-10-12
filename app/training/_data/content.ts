// Server-only: full lesson content. Never import this from a Client Component.
import type { CourseContent } from "./types";

export async function getCourseContent(id: string): Promise<CourseContent | undefined> {
  switch (id) {
    case "nextjs": {
      const [c, f] = await Promise.all([import("./nextjs/course"), import("./nextjs/fieldGuide")]);
      return { days: c.DAYS, reports: c.REPORTS, fieldGuideHtml: f.FIELD_GUIDE_HTML };
    }
    default:
      return undefined;
  }
}
