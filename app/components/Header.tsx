"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiamondLogo, HammerLogo } from "./icons/logos";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-line px-10 py-[22px]">
      <div className="flex items-center gap-[18px]">
        <div className="flex items-center gap-2.5">
          <HammerLogo className="h-[26px] w-[26px] text-ink" />
          <div className="leading-[1.15]">
            <div className="font-display text-[15px] font-bold">
              CORNERSTONE
            </div>
            <div className="text-[10px] tracking-[0.12em] text-muted uppercase">
              Developments Ltd.
            </div>
          </div>
        </div>
        <div className="h-8 w-px bg-line" />
        <div className="flex items-center gap-2.5">
          <DiamondLogo className="h-6 w-6 text-accent" />
          <div className="leading-[1.15]">
            <div className="font-display text-[15px] font-bold">
              CORNERSTONE
            </div>
            <div className="text-[10px] tracking-[0.12em] text-accent uppercase">
              Millwork Inc.
            </div>
          </div>
        </div>
      </div>
      <nav className="flex items-center gap-[34px]">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium ${
              pathname === link.href ? "text-accent" : "text-ink"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <div className="h-[18px] w-px bg-line" />
        <Link
          href="/login"
          className="text-xs tracking-[0.04em] text-muted"
        >
          Client Login
        </Link>
      </nav>
    </header>
  );
}
