import Link from "next/link";
import { DoorsIcon, MouldingsIcon, MillworkIcon } from "./icons/services";

const categories = [
  {
    name: "Doors",
    Icon: DoorsIcon,
    blurb:
      "Entry, patio, interior, bifold, bipass & steel doors, including custom and Modoporte lines.",
  },
  {
    name: "Mouldings",
    Icon: MouldingsIcon,
    blurb:
      "Casing, baseboard, crown moulding, wall capping, window sills and hand railing.",
  },
  {
    name: "Millwork",
    Icon: MillworkIcon,
    blurb:
      "Fireplace mantels, cabinets, shelving, wainscotting, columns and custom items.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="page-shell py-14 md:pt-[72px] md:pb-2">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-[28px]">What We Do</h2>
        <Link href="/services" className="text-[13px] font-semibold">
          View all services →
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {categories.map(({ name, Icon, blurb }) => (
          <Link
            key={name}
            href="/services"
            className="flex flex-col gap-[14px] border border-line bg-card p-7"
          >
            <Icon className="h-[26px] w-[26px] text-accent" />
            <h3 className="text-[17px] text-ink">{name}</h3>
            <p className="text-[13.5px] leading-[1.6] text-muted">{blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
