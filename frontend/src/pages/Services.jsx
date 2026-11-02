import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { useContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { PageHero, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

export default function Services() {
  const { content } = useContent();
  const { servicesPage, services } = content;

  return (
    <main data-testid="services-page" className="pt-32 md:pt-40">
      <PageHero
        eyebrow={servicesPage.eyebrow}
        line1={servicesPage.line1}
        line2={servicesPage.line2}
        accent={servicesPage.accent}
        sub={servicesPage.sub}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.num + s.title} delay={(i % 2) * 0.08} className="h-full">
              <article
                data-testid={`service-card-${s.num}`}
                className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_16px_40px_-16px_rgba(37,99,235,0.18)] lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-[#EEF2FF] text-blue-600">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span className="font-mono text-sm text-slate-300">{s.num}</span>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold text-[#1E1A5E] sm:text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <Check size={15} className="mt-0.5 shrink-0 text-blue-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-5">
                  {s.slug && (
                    <Link
                      to={`/services/${s.slug}`}
                      data-testid={`service-detail-${s.num}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E1A5E] transition-all hover:gap-3"
                    >
                      Explore service <ArrowRight size={15} />
                    </Link>
                  )}
                  <Link
                    to={`/contact?service=${encodeURIComponent(s.title)}`}
                    data-testid={`service-cta-${s.num}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all hover:gap-3"
                  >
                    Request consultation <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
