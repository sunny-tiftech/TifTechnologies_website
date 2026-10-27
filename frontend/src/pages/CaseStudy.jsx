import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { portfolioItems } from "@/lib/data";
import { MaskedLines, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

export default function CaseStudy() {
  const { slug } = useParams();
  const p = portfolioItems.find((x) => x.slug === slug);
  if (!p) return <Navigate to="/portfolio" replace />;
  const num = String(portfolioItems.indexOf(p) + 1).padStart(2, "0");

  return (
    <main data-testid="case-study-page" className="pt-32 md:pt-40">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/portfolio"
          data-testid="case-study-back"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-300">
            {p.category}
          </span>
          <span className="font-mono text-xs text-slate-600">{num}</span>
        </div>

        <MaskedLines
          delay={0.1}
          as="h1"
          className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          lines={[p.name]}
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">{p.description}</p>

        {p.url ? (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="case-study-live-link"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
          >
            Visit live site <ArrowUpRight size={15} />
          </a>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/8">
            <img src={p.image} alt={p.name} className="aspect-[21/9] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17]/70 via-transparent to-transparent" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Overview</p>
            <p className="mt-5 text-lg font-light leading-relaxed text-slate-300 sm:text-xl">{p.overview}</p>
            <div className="mt-10">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-[#0E1424] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-slate-300"
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
            <div className="h-full rounded-2xl border border-white/8 bg-panel p-7 lg:p-8">
              <h2 className="font-display text-lg font-semibold text-white">What we built</h2>
              <ul className="mt-5 space-y-3.5">
                {p.built.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check size={15} className="mt-0.5 shrink-0 text-cyan-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={<>Want a result like this? <span className="text-cyan-300">Tell us your idea.</span></>}
        sub="We bring the same engineering care to every project — from first wireframe to launch."
      />
    </main>
  );
}
