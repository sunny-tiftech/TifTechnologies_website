import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { MaskedLines, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

const categories = ["All", "News & Publishing", "Websites & Platforms", "Loyalty Programs"];

export default function Portfolio() {
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === cat);

  return (
    <main data-testid="portfolio-page" className="pt-32 md:pt-40">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Portfolio</p>
        <MaskedLines
          delay={0.1}
          as="h1"
          className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          lines={["Work that's already", <>out in the <span className="text-glow text-cyan-300">wild.</span></>]}
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          News platforms with custom CRMs, healthcare and lab portals, streaming, labs, and loyalty — products we
          designed, built, and shipped.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              data-testid={`portfolio-filter-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              onClick={() => setCat(c)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                cat === c ? "text-[#0B0E17]" : "border border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              {cat === c && (
                <motion.span
                  layoutId="portfolio-filter-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:py-16">
          {items.map((p, i) => (
            <motion.article
              key={`${cat}-${p.name}`}
              data-testid={`portfolio-card-${i + 1}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-panel"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17] via-[#0B0E17]/20 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#0B0E17]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-300 backdrop-blur">
                  {p.category}
                </span>
              </div>
              <div className="p-6 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-white">{p.name}</h2>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`portfolio-link-${i + 1}`}
                        className="mt-1 inline-block font-mono text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        {p.domain}
                      </a>
                    ) : (
                      <p className="mt-1 font-mono text-xs text-slate-500">{p.domain}</p>
                    )}
                  </div>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${p.name}`}
                      data-testid={`portfolio-open-${i + 1}`}
                      className="rounded-full border border-white/10 p-2.5 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-400"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-[#0E1424] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <CtaBand
        title={<>Your product could be next. <span className="text-cyan-300">Let's ship it.</span></>}
        sub="From newsrooms to labs to loyalty engines — we build platforms people rely on every day."
      />
    </main>
  );
}
