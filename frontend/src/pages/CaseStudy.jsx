import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { useContent } from "@/lib/content";
import { MaskedLines, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

export default function CaseStudy() {
  const { slug } = useParams();
  const { content } = useContent();
  const portfolio = content.portfolio;
  const p = portfolio.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/portfolio" replace />;
  const num = String(portfolio.indexOf(p) + 1).padStart(2, "0");

  return (
    <main data-testid="case-study-page" className="pt-32 md:pt-40">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/portfolio"
          data-testid="case-study-back"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-[#1E1A5E]"
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600">
            {p.category}
          </span>
          <span className="font-mono text-xs text-slate-300">{num}</span>
        </div>

        <MaskedLines
          delay={0.1}
          as="h1"
          className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#1E1A5E] sm:text-5xl lg:text-6xl"
          lines={[p.name]}
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{p.description}</p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="case-study-live-link"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-[#1E1A5E]"
            >
              Visit live site <ArrowUpRight size={15} />
            </a>
          ) : null}
          {(p.extraLinks || []).map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="case-study-extra-link"
              className="inline-flex items-center gap-1.5 font-mono text-sm text-blue-600 hover:text-blue-500"
            >
              {l.label} <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
            <img src={p.image} alt={p.name} className="aspect-[21/9] w-full object-cover object-top" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Overview</p>
            <p className="mt-5 text-lg font-light leading-relaxed text-slate-700 sm:text-xl">{p.overview}</p>
            <div className="mt-10">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-slate-600"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-5">
          <Reveal delay={0.1} className="h-full">
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:p-8">
              <h2 className="font-display text-lg font-semibold text-[#1E1A5E]">What we built</h2>
              <ul className="mt-5 space-y-3.5">
                {p.built.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check size={15} className="mt-0.5 shrink-0 text-blue-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {p.gallery && p.gallery.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Inside the product</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {p.gallery.map((g, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                >
                  <img src={g} alt={`${p.name} — product view ${i + 1}`} loading="lazy" className="w-full" />
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}

      <CtaBand />
    </main>
  );
}
