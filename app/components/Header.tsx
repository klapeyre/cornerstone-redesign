"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DiamondLogo, HammerLogo } from "./icons/logos";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // While the mobile menu is open: lock body scroll, move focus into the
  // overlay, and wire Escape-to-close. Full focus-trapping is deferred to the
  // accessibility pass (CDL-22).
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="border-b border-line">
      <div className="page-shell flex items-center justify-between py-[22px]">
        {/* Desktop brand: both wordmark lockups side by side, divided */}
        <div className="hidden items-center gap-[18px] md:flex">
          <div className="flex items-center gap-2.5">
            <HammerLogo className="h-[26px] w-[26px] text-ink" />
            <div className="leading-[1.15]">
              <div className="font-display text-[15px] font-bold">CORNERSTONE</div>
              <div className="text-[10px] tracking-[0.12em] text-muted uppercase">
                Developments Ltd.
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-line" />
          <div className="flex items-center gap-2.5">
            <DiamondLogo className="h-6 w-6 text-accent" />
            <div className="leading-[1.15]">
              <div className="font-display text-[15px] font-bold">CORNERSTONE</div>
              <div className="text-[10px] tracking-[0.12em] text-accent uppercase">
                Millwork Inc.
              </div>
            </div>
          </div>
        </div>

        {/* Mobile brand: both marks + a single wordmark; sublabel drops below 480px */}
        <div className="flex items-center gap-2.5 md:hidden">
          <div className="flex items-center gap-1.5">
            <HammerLogo className="h-[22px] w-[22px] text-ink" />
            <DiamondLogo className="h-5 w-5 text-accent" />
          </div>
          <div className="leading-[1.15]">
            <div className="font-display text-[15px] font-bold">CORNERSTONE</div>
            <div className="hidden text-[10px] tracking-[0.12em] text-muted uppercase min-[480px]:block">
              Developments Ltd. + Millwork Inc.
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[34px] md:flex">
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
          <Link href="/login" className="text-xs tracking-[0.04em] text-muted">
            Client Login
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Full-screen overlay menu (mobile only) */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-[22px]">
            <div className="flex items-center gap-2.5">
              <HammerLogo className="h-[22px] w-[22px] text-ink" />
              <DiamondLogo className="h-5 w-5 text-accent" />
              <span className="font-display text-[15px] font-bold">
                CORNERSTONE
              </span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5 L19 19 M19 5 L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col px-6 py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-line py-4 font-display text-2xl ${
                  pathname === link.href ? "text-accent" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="py-4 text-sm tracking-[0.04em] text-muted uppercase"
            >
              Client / Trade Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
