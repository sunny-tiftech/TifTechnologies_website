import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content";
import { PageHero } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

export default function Portfolio() {
  const { content } = useContent();
  const { portfolioPage, portfolio } = content;

  const categories = ["All", ...Array.from(new Set(portfolio.map((p) => p.category)))];
  const [cat, setCat] = useState("All");
  const items = cat === "All" ? portfolio : portfolio.filter((p) => p.category === cat);

  return (
    <main data-testid="portfolio-page" className="pt-24 md:pt-28">
      <PageHero
        eyebrow={portfolioPage.eyebrow}
        line1={portfolioPage.line1}
        line2={portfolioPage.line2}
        accent={portfolioPage.accent}
        sub={portfolioPage.sub}
      />

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              data-testid={`portfolio-filter-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              onClick={() => setCat(c)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                cat === c ? "text-white" : "border border-slate-300 text-slate-600 hover:text-[#1E1A5E]"
              }`}
            >
              {cat === c && (
                <motion.span
                  layoutId="portfolio-filter-pill"
                  className="absolute inset-0 rounded-full bg-[#1E1A5E]"
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
              key={`${cat}-${p.slug}`}
              data-testid={`portfolio-card-${i + 1}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(37,99,235,0.18)]"
            >
              <Link to={`/portfolio/${p.slug}`} data-testid={`portfolio-card-link-${i + 1}`} className="relative block aspect-[16/10] overflow-hidden border-b border-slate-100">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600 backdrop-blur">
                  {p.category}
                </span>
              </Link>
              <div className="p-6 pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/portfolio/${p.slug}`}>
                      <h2 className="font-display text-lg font-semibold text-[#1E1A5E] transition-colors hover:text-blue-600">
                        {p.name}
                      </h2>
                    </Link>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`portfolio-link-${i + 1}`}
                        className="mt-1 inline-block font-mono text-xs text-blue-600 hover:text-blue-500"
                      >
                        {p.domain}
                      </a>
                    ) : (
                      <p className="mt-1 font-mono text-xs text-slate-400">{p.domain}</p>
                    )}
                  </div>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${p.name}`}
                      data-testid={`portfolio-open-${i + 1}`}
                      className="rounded-full border border-slate-200 p-2.5 text-slate-400 transition hover:border-blue-400 hover:text-blue-600"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-slate-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/portfolio/${p.slug}`}
                  data-testid={`portfolio-case-study-${i + 1}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 transition-all hover:gap-2.5"
                >
                  View case study <ArrowRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
