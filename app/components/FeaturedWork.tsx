import Link from "next/link";
import { featuredProjects } from "@/content/projects";

const tones = ["ph-a", "ph-b", "ph-c", "ph-d"];

export default function FeaturedWork() {
  return (
    <section className="page-shell py-14 md:pt-[72px] md:pb-[88px]">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-[28px]">Recent Work</h2>
        <Link href="/gallery" className="text-[13px] font-semibold">
          View full gallery →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {featuredProjects.map((proj, i) => (
          <Link
            key={proj.slug}
            href="/gallery"
            className={`ph ${tones[i % tones.length]} aspect-[4/3] rounded-xs`}
          >
            <div className="ph-tag">
              <div className="font-display text-[15px]">{proj.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
