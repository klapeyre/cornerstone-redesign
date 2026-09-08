import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-14 md:grid-cols-2 md:gap-16 md:px-10 md:pt-[72px] md:pb-16">
      <div className="flex flex-col gap-[22px]">
        <span className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
          Since 1983
        </span>
        <h1 className="text-[34px] leading-[1.12] md:text-[44px]">
          Custom construction &amp; millwork, built to last.
        </h1>
        <p className="max-w-[46ch] text-base leading-[1.6] text-muted">
          Cornerstone Developments and Cornerstone Millwork bring design-build
          construction and custom architectural millwork together under one
          roof — from entry doors to full lobby panelling.
        </p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row">
          <Link className="btn btn-primary" href="/gallery">
            View Our Work
          </Link>
          <Link className="btn btn-outline" href="/services">
            Our Services
          </Link>
        </div>
      </div>

      <div className="ph aspect-[6/5] rounded-xs">
        <span className="ph-label">Photo placeholder</span>
        <div className="ph-tag">
          <div className="font-display text-[18px]">5 Points</div>
          <div className="text-xs opacity-85">
            Mixed-use residential · Vancouver, BC
          </div>
        </div>
      </div>
    </section>
  );
}
