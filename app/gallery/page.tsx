import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Completed projects across construction and custom millwork by Cornerstone Developments and Cornerstone Millwork.",
};

const tones = ["ph-a", "ph-b", "ph-c", "ph-d"];

export default function GalleryPage() {
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
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <article className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-xs transition-transform duration-150 hover:-translate-y-0.5">
                {project.cover ? (
                  <Image
                    src={project.cover.src}
                    alt={project.name}
                    fill
                    sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className={`ph ${tones[i % tones.length]} absolute inset-0`}
                  >
                    <span className="ph-label">Photo coming soon</span>
                  </div>
                )}
                <div className="ph-tag p-[14px] px-4 font-display text-sm">
                  {project.name}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
