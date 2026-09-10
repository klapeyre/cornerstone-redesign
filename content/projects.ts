import {
  galleryImages,
  galleryCovers,
  type GalleryImage,
} from "./gallery-images.generated";

export type { GalleryImage };

export type Project = {
  slug: string;
  name: string;
  featured: boolean;
  images: GalleryImage[];
  cover: GalleryImage | undefined;
};

const project = (name: string, slug: string, featured = false): Project => ({
  name,
  slug,
  featured,
  images: galleryImages[slug] ?? [],
  cover: galleryCovers[slug],
});

export const projects: Project[] = [
  project("5 Points", "5-points"),
  project("Alexandra Court Clubhouse", "alexandra-court-clubhouse", true),
  project("Astoria", "astoria", true),
  project("Athenry", "athenry"),
  project("Aucoin Residence", "aucoin-residence"),
  project("Aviara", "aviara"),
  project("Carrera 1", "carrera-1"),
  project("Carrera 2", "carrera-2"),
  project("Charland", "charland"),
  project("Dominion", "dominion"),
  project("Edgemont", "edgemont"),
  project("Elmstone", "elmstone"),
  project("Gardner", "gardner"),
  project("Hampton Cove", "hampton-cove"),
  project("Kensington", "kensington", true),
  project("Kingston", "kingston"),
  project("Kiwanis", "kiwanis"),
  project("Park and Metro", "park-and-metro"),
  project("Saltaire", "saltaire"),
  project("Stanton House", "stanton-house"),
  project("Storybrook", "storybrook"),
  project("Trafalgar", "trafalgar"),
  project("Union Park", "union-park"),
  project("Vittorio", "vittorio"),
  project("Woodcroft", "woodcroft"),
];

export const projectsBySlug: Record<string, Project | undefined> =
  Object.fromEntries(projects.map((p) => [p.slug, p]));

export const featuredProjects = projects.filter((p) => p.featured);
