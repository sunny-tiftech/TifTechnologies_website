import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe, Bot, Sparkles } from "lucide-react";
import { services, portfolioItems, techGroups, approachSteps, allTech } from "@/lib/data";
import CtaBand from "@/components/CtaBand";

import { MaskedLines, Reveal } from "@/components/Motion";
import Marquee from "@/components/Marquee";
import SignalVisual from "@/components/SignalVisual";

const stats = [
  { value: "09", label: "Products shipped" },
  { value: "10", label: "Service lines" },
  { value: "03", label: "Live news platforms" },
];

const highlights = [
  { icon: Globe, title: "Build from scratch", sub: "Digital products engineered end-to-end." },
  { icon: Sparkles, title: "Enhance & scale", sub: "Existing platforms made faster, sharper, stronger." },
  { icon: Bot, title: "Automate with AI", sub: "Intelligent workflows and agents in production." },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const featured = portfolioItems.filter((p) => p.featured);
  const preview = services.slice(0, 4);

  return (
    <main data-testid="home-page">
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-14">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-[#1E1A5E]/50 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[480px] w-[480px] rounded-full bg-[#2563EB]/15 blur-[130px]" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div style={{ opacity: fade }} className="lg:col-span-7">
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-300">Tif — The Ideaz Factory</span>
            </div>

            <MaskedLines
              delay={0.15}
              className="font-display text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
              lines={[
                "Turning Ideas",
                <>
                  Into <span className="text-glow text-cyan-300">Intelligent</span>
                </>,
                "Digital Solutions.",
              ]}
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              We build, scale, and grow businesses through innovative software, modern web experiences,
              mobile applications, AI-powered solutions, and digital strategies.
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
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0B0E17] transition hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(56,189,248,0.4)]"
              >
                Start a Project <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                data-testid="hero-cta-services"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/60 hover:text-white"
              >
                Explore Services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-14 flex gap-10 border-t border-white/5 pt-8 sm:gap-16"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-white sm:text-4xl">{s.value}</div>
                  <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">{s.label}</div>
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
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">About Tif Technologies</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                A factory for ideas, <span className="text-cyan-300">engineered for scale.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <p className="text-lg font-light leading-relaxed text-slate-300 sm:text-2xl">
                We help businesses <span className="text-white">build, scale, and grow</span> through innovative
                software, modern web experiences, mobile applications, AI-powered solutions, and digital strategies.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-2xl leading-relaxed text-slate-400">
                Reliable, scalable, and user-focused solutions tailored to real business needs — from building digital
                products from scratch to enhancing existing platforms, streamlining business processes, managing
                leads, automating workflows, and integrating intelligent technologies.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={0.15 + i * 0.08} className="h-full">
                  <div className="h-full rounded-2xl border border-white/8 bg-panel p-5 transition-colors hover:border-cyan-400/40">
                    <h.icon size={20} className="text-cyan-400" />
                    <h3 className="mt-3 text-sm font-semibold text-white">{h.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{h.sub}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">What we do</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Everything tech, under one roof.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/services"
                data-testid="home-services-link"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-all hover:gap-3"
              >
                All 10 services <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {preview.map((s, i) => (
              <Reveal
                key={s.num}
                delay={(i % 3) * 0.08}
                className={i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <article
                  data-testid={`home-service-card-${s.num}`}
                  className="group h-full rounded-2xl border border-white/8 bg-panel p-7 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_60px_-20px_rgba(6,182,212,0.25)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0E1424] text-cyan-400 transition-colors group-hover:border-cyan-400/40">
                      <s.icon size={20} />
                    </span>
                    <span className="font-mono text-sm text-slate-600">{s.num}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.24} className="md:col-span-2 lg:col-span-1">
              <Link
                to="/services"
                data-testid="home-services-tile"
                className="group flex h-full min-h-[180px] flex-col justify-between rounded-2xl border border-dashed border-white/15 bg-transparent p-7 transition-all hover:border-cyan-400/50 hover:bg-white/[0.03]"
              >
                <span className="font-display text-xl font-semibold text-white">And 6 more capabilities</span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-400 transition-all group-hover:gap-3">
                  View all services <ArrowRight size={15} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Technology stack</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
              The tools we master, the stacks we ship.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {techGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.07} className="h-full">
                <div className="h-full border-t border-white/10 pt-5">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{g.label}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {g.items.map((t) => (
                      <li key={t} className="text-sm text-slate-300">{t}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Selected work</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">Products already in the wild.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/portfolio"
                data-testid="home-portfolio-link"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-400 transition-all hover:gap-3"
              >
                Full portfolio <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.09} className="h-full">
                <article
                  data-testid={`home-portfolio-card-${i + 1}`}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-panel"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E17] via-[#0B0E17]/30 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-[#0B0E17]/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-300 backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6 pt-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
                      <p className="mt-1 font-mono text-xs text-slate-500">{p.domain}</p>
                    </div>
                    {p.url ? (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`home-portfolio-link-${i + 1}`}
                        aria-label={`Visit ${p.name}`}
                        className="rounded-full border border-white/10 p-2.5 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-400"
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
      <section className="border-t border-white/5 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Our approach</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">
              Technology expertise, business-first thinking.
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-slate-400">
              We combine thoughtful execution with a business-first mindset to deliver digital solutions that solve
              real problems and create lasting value.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {approachSteps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.08}>
                <div className="border-t border-white/10 pt-6">
                  <span className="font-mono text-sm text-cyan-400">{s.num}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
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
