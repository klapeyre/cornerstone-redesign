"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Project } from "@/content/projects";
import Lightbox from "./Lightbox";

const tones = ["ph-a", "ph-b", "ph-c", "ph-d"];

type GalleryGridProps = {
  projects: Project[];
};

export default function GalleryGrid({ projects }: GalleryGridProps) {
  const router = useRouter();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("project");
    const match = projects.find(
      (p) => p.slug === slug && p.images.length > 0,
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (match) setActiveProject(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveProject(null);
    if (window.location.search) {
      router.replace("/gallery", { scroll: false });
    }
  }, [router]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {projects.map((project, i) => {
          const hasPhotos = project.images.length > 0;
          const caption = (
            <div className="ph-tag p-[14px] px-4 font-display text-sm">
              {project.name}
            </div>
          );
          const media = project.cover ? (
            <Image
              src={project.cover.src}
              alt={project.name}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className={`ph ${tones[i % tones.length]} absolute inset-0`}>
              <span className="ph-label">Photo coming soon</span>
            </div>
          );

          return (
            <li key={project.slug}>
              {hasPhotos ? (
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  aria-label={`View photos of ${project.name}`}
                  className="group relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-xs text-left ring-1 ring-transparent transition duration-150 hover:-translate-y-0.5 hover:ring-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {media}
                  {caption}
                </button>
              ) : (
                <div className="relative flex aspect-[4/3] items-end overflow-hidden rounded-xs">
                  {media}
                  {caption}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <Lightbox
        key={activeProject?.slug ?? "closed"}
        project={activeProject}
        onClose={closeLightbox}
      />
    </>
  );
}
