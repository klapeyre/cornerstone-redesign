import type { Metadata } from "next";
import { DoorsIcon, MouldingsIcon, MillworkIcon } from "@/app/components/icons/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Doors, mouldings and millwork built and installed in-house by Cornerstone Developments and Cornerstone Millwork.",
};

const categories = [
  {
    name: "Doors",
    Icon: DoorsIcon,
    items: [
      "Entry Doors",
      "Patio Doors",
      "Interior Doors",
      "Bifold Doors",
      "Bipass Doors",
      "Steel Doors",
      "Custom Doors",
      "Modoporte Doors",
    ],
  },
  {
    name: "Mouldings",
    Icon: MouldingsIcon,
    items: [
      "Door, Window & Bifold Casing",
      "Baseboard",
      "Crown Moulding",
      "Wall Capping",
      "Window Sills",
      "Hand Railing",
    ],
  },
  {
    name: "Millwork",
    Icon: MillworkIcon,
    items: [
      "Fireplace Mantels",
      "Cabinets",
      "Shelving",
      "Wainscotting",
      "Columns",
      "Custom Items",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <section className="page-shell pt-14 pb-2">
        <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          Capabilities
        </span>
        <h1 className="mt-2.5 text-[34px]">Services</h1>
        <p className="mt-3 max-w-[60ch] text-[15px] text-muted">
          Everything below is built and installed in-house, across both
          divisions.
        </p>
      </section>

      <section className="page-shell flex flex-col gap-6 pt-9 pb-14 md:pb-[88px]">
        {categories.map(({ name, Icon, items }) => (
          <div
            key={name}
            className="grid gap-6 border border-line bg-card p-8 md:grid-cols-[220px_1fr] md:gap-8"
          >
            <div className="flex items-center gap-3">
              <Icon className="h-[30px] w-[30px] text-accent" />
              <h2 className="text-xl">{name}</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
