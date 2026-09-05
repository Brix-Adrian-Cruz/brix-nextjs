import SidebarNav from "@/components/learn/SidebarNav";

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="gap-10 py-6 lg:grid lg:grid-cols-[14rem_1fr]">
      {/* Sticky on large screens, inline above the content on small ones. */}
      <aside className="mb-8 lg:sticky lg:top-8 lg:mb-0 lg:self-start">
        <SidebarNav />
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
