export default function Marquee({ items, testid = "tech-marquee" }) {
  return (
    <div data-testid={testid} className="marquee relative overflow-hidden border-y border-slate-200 bg-white py-5">
      <div className="animate-marquee flex w-max items-center gap-12 pr-12">
        {[0, 1].map((n) => (
          <div key={n} aria-hidden={n === 1} className="flex items-center gap-12">
            {items.map((t) => (
              <span
                key={t}
                className="flex items-center gap-3 whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em] text-slate-500"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F8FB] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F8FB] to-transparent" />
    </div>
  );
}
