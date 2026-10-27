import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/data";
import { MaskedLines, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

export default function Services() {
  return (
    <main data-testid="services-page" className="pt-32 md:pt-40">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Services</p>
        <MaskedLines
          delay={0.1}
          as="h1"
          className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          lines={["Capabilities across the", <>full product <span className="text-glow text-cyan-300">lifecycle.</span></>]}
        />
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          From the first wireframe to production scale — web, mobile, backend, AI, marketing, and loyalty. Ten ways
          we turn ideas into working software.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={(i % 2) * 0.08} className="h-full">
              <article
                data-testid={`service-card-${s.num}`}
                className="group relative h-full rounded-2xl border border-white/8 bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_-20px_rgba(6,182,212,0.25)] lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0E1424] text-cyan-400 transition-colors group-hover:border-cyan-400/40">
                    <s.icon size={20} />
                  </span>
                  <span className="font-mono text-sm text-slate-600">{s.num}</span>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold text-white sm:text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check size={15} className="mt-0.5 shrink-0 text-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/contact?service=${encodeURIComponent(s.title)}`}
                  data-testid={`service-cta-${s.num}`}
                  className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-all hover:gap-3"
                >
                  Request consultation <ArrowRight size={15} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title={<>Not sure where to start? <span className="text-cyan-300">Start with a conversation.</span></>}
        sub="Tell us the problem — we'll map the technology, the team, and the timeline."
      />
    </main>
  );
}
