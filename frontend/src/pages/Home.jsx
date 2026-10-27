import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content";
import { Icon } from "@/lib/icons";
import { MaskedLines, Reveal, AccentLine } from "@/components/Motion";
import Marquee from "@/components/Marquee";
import SignalVisual from "@/components/SignalVisual";
import CtaBand from "@/components/CtaBand";

const cardCls =
  "h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_16px_40px_-16px_rgba(37,99,235,0.18)]";

export default function Home() {
  const { content } = useContent();
  const { hero, about, techGroups, services, portfolio, approach } = content;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const allTech = techGroups.flatMap((g) => g.items);
  const featured = portfolio.filter((p) => p.featured);
  const preview = services.slice(0, 4);
  const moreCount = Math.max(services.length - 4, 0);

  return (
    <main data-testid="home-page">
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-14">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-blue-100/70 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[480px] w-[480px] rounded-full bg-indigo-100/60 blur-[130px]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div style={{ opacity: fade }} className="lg:col-span-7">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-blue-600">{hero.eyebrow}</span>
            </div>

            <MaskedLines
              delay={0.15}
              className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#1E1A5E] sm:text-5xl lg:text-6xl"
              lines={[
                hero.line1,
                <AccentLine text={hero.line2} accent={hero.accent} />,
                hero.line3,
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            >
              {hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                data-testid="hero-cta-start"
                className="inline-flex items-center gap-2 rounded-full bg-[#1E1A5E] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(30,26,94,0.5)]"
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                data-testid="hero-cta-services"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-[#1E1A5E]"
              >
                Explore Services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-14 flex flex-wrap gap-10 border-t border-slate-200 pt-8 sm:gap-16"
            >
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-[#1E1A5E] sm:text-4xl">{s.value}</div>
                  <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div style={{ y: visualY }} className="lg:col-span-5" data-testid="hero-visual">
            <SignalVisual />
          </motion.div>
        </div>
      </section>

      <Marquee items={allTech} />

      {/* ABOUT */}
      <section className="border-b border-slate-200/80 bg-white py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">{about.eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-[#1E1A5E] sm:text-4xl">
                {about.heading} <span className="text-blue-600">{about.headingAccent}</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg font-light leading-relaxed text-slate-700 sm:text-2xl">{about.lead}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl leading-relaxed text-slate-500">{about.body}</p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {about.highlights.map((h, i) => (
                <Reveal key={h.title} delay={0.15 + i * 0.08} className="h-full">
                  <div className="h-full rounded-2xl border border-slate-200 bg-[#F7F8FB] p-5 transition-colors hover:border-blue-300">
                    <Icon name={h.icon} size={20} className="text-blue-600" />
                    <h3 className="mt-3 text-sm font-semibold text-[#1E1A5E]">{h.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{h.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">What we do</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-[#1E1A5E] sm:text-4xl">Everything tech, under one roof.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/services"
                data-testid="home-services-link"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all hover:gap-3"
              >
                All {services.length} services <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {preview.map((s, i) => (
              <Reveal key={s.num + s.title} delay={(i % 3) * 0.08} className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}>
                <article data-testid={`home-service-card-${s.num}`} className={cardCls}>
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-[#EEF2FF] text-blue-600">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <span className="font-mono text-sm text-slate-300">{s.num}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-[#1E1A5E]">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </article>
              </Reveal>
            ))}
            {moreCount > 0 && (
              <Reveal delay={0.24} className="md:col-span-2 lg:col-span-1">
                <Link
                  to="/services"
                  data-testid="home-services-tile"
                  className="group flex h-full min-h-[180px] flex-col justify-between rounded-2xl border border-dashed border-slate-300 bg-transparent p-7 transition-all hover:border-blue-400 hover:bg-white"
                >
                  <span className="font-display text-xl font-semibold text-[#1E1A5E]">And {moreCount} more capabilities</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-all group-hover:gap-3">
                    View all services <ArrowRight size={15} />
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-y border-slate-200/80 bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Technology stack</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-[#1E1A5E] sm:text-4xl">
              The tools we master, the stacks we ship.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {techGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.07} className="h-full">
                <div className="h-full border-t border-slate-200 pt-5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{g.label}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((t) => (
                      <li key={t} className="text-sm text-slate-600">{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Selected work</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-[#1E1A5E] sm:text-4xl">Products already in the wild.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/portfolio"
                data-testid="home-portfolio-link"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-all hover:gap-3"
              >
                Full portfolio <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.09} className="h-full">
                <article
                  data-testid={`home-portfolio-card-${i + 1}`}
                  className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]"
                >
                  <Link to={`/portfolio/${p.slug}`} className="relative block aspect-[4/3] overflow-hidden border-b border-slate-100">
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
                  <div className="flex items-start justify-between gap-4 p-6 pt-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[#1E1A5E]">{p.name}</h3>
                      <p className="mt-1 font-mono text-xs text-slate-400">{p.domain}</p>
                    </div>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`home-portfolio-link-${i + 1}`}
                        aria-label={`Visit ${p.name}`}
                        className="rounded-full border border-slate-200 p-2.5 text-slate-400 transition hover:border-blue-400 hover:text-blue-600"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="border-t border-slate-200/80 bg-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">Our approach</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-[#1E1A5E] sm:text-4xl">
              Technology expertise, business-first thinking.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {approach.map((s, i) => (
              <Reveal key={s.num + s.title} delay={i * 0.08}>
                <div className="border-t border-slate-200 pt-6">
                  <span className="font-mono text-sm text-blue-600">{s.num}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#1E1A5E]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
