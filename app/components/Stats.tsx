const FOUNDED_YEAR = 1983;

// Auto-calculated so the credibility band never goes stale between rebuilds.
const yearsInBusiness = new Date().getFullYear() - FOUNDED_YEAR;

const stats = [
  { value: yearsInBusiness, label: "Years in Business" },
  { value: 25, label: "Completed Projects" },
  { value: 2, label: "Divisions, One Team" },
  { value: 3, label: "Service Categories" },
];

export default function Stats() {
  return (
    <section className="border-y border-line bg-bg-alt">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 px-6 py-10 md:grid-cols-4 md:px-10">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="border-line px-4 text-center max-md:py-5 max-md:[&:nth-child(2n+1)]:border-r max-md:[&:nth-child(n+3)]:border-t md:border-r md:[&:last-child]:border-r-0"
          >
            <div className="font-display text-[34px] text-accent">{value}</div>
            <div className="mt-1.5 text-xs tracking-[0.06em] text-muted uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
