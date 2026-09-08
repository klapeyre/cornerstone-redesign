import Link from "next/link";
import { DiamondLogo, HammerLogo } from "./icons/logos";

export default function Footer() {
  return (
    <footer className="bg-floor px-10 pt-[52px] pb-8 text-floor-ink">
      <div className="mx-auto flex max-w-[1200px] justify-between gap-10 border-b border-floor-line px-10 pb-8">
        <div className="flex gap-7">
          <div className="flex items-center gap-[9px]">
            <HammerLogo className="h-[22px] w-[22px] text-floor-ink" />
            <span className="font-display text-[13px] font-bold">
              CORNERSTONE DEVELOPMENTS
            </span>
          </div>
          <div className="flex items-center gap-[9px]">
            <DiamondLogo className="h-5 w-5 text-accent" />
            <span className="font-display text-[13px] font-bold">
              CORNERSTONE MILLWORK
            </span>
          </div>
        </div>
        <div className="flex gap-8 text-[13px] text-floor-muted">
          <span>[ADDRESS]</span>
          <span>[PHONE]</span>
          <span>[EMAIL]</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] justify-between px-10 pt-5 text-xs text-floor-muted">
        <span>
          &copy; 2026 Cornerstone Developments Ltd. &amp; Cornerstone Millwork
          Inc.
        </span>
        <Link href="/login" className="text-floor-muted hover:text-floor-muted">
          Client / Trade Login
        </Link>
      </div>
    </footer>
  );
}
