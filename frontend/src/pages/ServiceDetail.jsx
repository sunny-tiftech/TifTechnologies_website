import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { MaskedLines, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-testid="faq-toggle"
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-sm font-semibold text-[#1E1A5E] sm:text-base">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-blue-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm leading-relaxed text-slate-500">{a}</p>
        </div>
      </div>
    </div>
  );
}

const SectionLabel = ({ children }) => (
  <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">{children}</p>
);

export default function ServiceDetail() {
  const { slug } = useParams();
  const { content } = useContent();
  const services = content.services || [];
  const s = services.find((x) => x.slug === slug);
  if (!s) return <Navigate to="/services" replace />;
  const idx = services.indexOf(s);
  const next = services[(idx + 1) % services.length];

  return (
    <main data-testid="service-detail-page" className="pt-32 md:pt-40">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/services"
          data-testid="service-back"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-[#1E1A5E]"
        >
          <ArrowLeft size={14} /> Back to services
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-[#EEF2FF] text-blue-600">
            <Icon name={s.icon} size={20} />
          </span>
          <span className="font-mono text-xs text-slate-300">{s.num}</span>
        </div>

        <MaskedLines
          delay={0.1}
          as="h1"
          className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#1E1A5E] sm:text-5xl lg:text-6xl"
          lines={[s.title]}
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{s.desc}</p>

        {s.stats && s.stats.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {s.stats.map((st) => (
              <Reveal key={st.label}>
                <div
                  data-testid="service-stat"
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                >
                  <p className="font-display text-3xl font-bold text-[#1E1A5E]">{st.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{st.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Overview + Deliverables */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24 lg:px-8">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel>Overview</SectionLabel>
            <p className="mt-5 text-lg font-light leading-relaxed text-slate-700 sm:text-xl">{s.overview}</p>
            <div className="mt-10">
              <SectionLabel>Technologies</SectionLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {(s.technologies || []).map((t) => (
                  <span
                    key={t}
                    data-testid="service-tech"
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
              <h2 className="font-display text-lg font-semibold text-[#1E1A5E]">What we deliver</h2>
              <ul className="mt-5 space-y-3.5">
                {(s.deliverables || []).map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check size={15} className="mt-0.5 shrink-0 text-blue-600" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      {s.process && s.process.length > 0 && (
        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
            <Reveal>
              <SectionLabel>Our process</SectionLabel>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#1E1A5E] sm:text-4xl">
                How we work, start to finish.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {s.process.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.08} className="h-full">
                  <div
                    data-testid="process-step"
                    className="h-full rounded-2xl border border-slate-200 bg-[#F7F8FB] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300"
                  >
                    <span className="font-mono text-sm text-blue-600">{step.num}</span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-[#1E1A5E]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      {s.whyUs && s.whyUs.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
          <Reveal>
            <SectionLabel>Why choose us</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-[#1E1A5E] sm:text-4xl">
              Why teams pick Tif Technologies.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {s.whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.08} className="h-full">
                <div
                  data-testid="why-card"
                  className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300"
                >
                  <h3 className="font-display text-lg font-semibold text-[#1E1A5E]">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {s.faq && s.faq.length > 0 && (
        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24 lg:px-8">
            <Reveal>
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-[#1E1A5E] sm:text-4xl">
                Common questions.
              </h2>
            </Reveal>
            <div className="mt-10 space-y-4">
              {s.faq.map((f) => (
                <FaqItem key={f.q} q={f.q} a={f.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next service + CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to={`/services/${next.slug}`}
          data-testid="next-service-link"
          className="group flex items-center justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:border-blue-300 hover:shadow-[0_20px_50px_-20px_rgba(37,99,235,0.2)] sm:p-10"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">Next service</p>
            <p className="mt-3 font-display text-2xl font-bold text-[#1E1A5E] sm:text-3xl">{next.title}</p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-blue-500 group-hover:bg-blue-600 group-hover:text-white">
            <ArrowRight size={18} />
          </span>
        </Link>
      </section>

      <CtaBand />
    </main>
  );
}
