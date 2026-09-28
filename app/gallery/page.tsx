import type { Metadata } from "next";
import GalleryGrid from "@/app/components/GalleryGrid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Completed projects across construction and custom millwork by Cornerstone Developments and Cornerstone Millwork.",
};

type GalleryPageProps = {
  searchParams: Promise<{ project?: string | string[] }>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { project: projectParam } = await searchParams;
  const slug = Array.isArray(projectParam) ? projectParam[0] : projectParam;
  const initialProject =
    projects.find((p) => p.slug === slug && p.images.length > 0) ?? null;

  return (
    <main className="flex-1">
      <section className="page-shell pt-14 pb-2">
        <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          Our Work
        </span>
        <h1 className="mt-2.5 text-[34px]">Project Gallery</h1>
        <p className="mt-3 max-w-[60ch] text-[15px] text-muted">
          {projects.length} completed projects across construction and custom
          millwork. Select any project to step through its full photo set.
        </p>
      </section>

      <section className="page-shell pt-9 pb-14 md:pb-[88px]">
        <GalleryGrid projects={projects} initialProject={initialProject} />
      </section>
    </main>
  );
}
