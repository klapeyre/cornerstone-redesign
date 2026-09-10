import Link from "next/link";
import { DiamondLogo, HammerLogo } from "./icons/logos";

export default function Footer() {
  return (
    <footer className="bg-floor pt-10 pb-8 text-floor-ink md:pt-[52px]">
      <div className="page-shell flex flex-col gap-6 border-b border-floor-line pb-8 md:flex-row md:justify-between md:gap-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-7">
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
        <div className="flex flex-col gap-2 text-[13px] text-floor-muted sm:flex-row sm:gap-8">
          <span>[ADDRESS]</span>
          <span>[PHONE]</span>
          <span>[EMAIL]</span>
        </div>
      </div>
      <div className="page-shell flex flex-col gap-3 pt-5 text-xs text-floor-muted sm:flex-row sm:justify-between">
        <span>
          &copy; 2026 Cornerstone Developments Ltd. &amp; Cornerstone Millwork
          Inc.
        </span>
        <Link
          href="/login"
          className="inline-block py-1 text-floor-muted hover:text-floor-muted"
        >
          Client / Trade Login
        </Link>
      </div>
    </footer>
  );
}
