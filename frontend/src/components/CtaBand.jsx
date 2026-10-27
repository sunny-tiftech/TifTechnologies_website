import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";

export default function CtaBand({
  title,
  sub = "Tell us where you want to go — we'll engineer the way there.",
}) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            data-testid="cta-band"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1E1A5E] px-6 py-14 text-center md:px-16 lg:py-20"
          >
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#38BDF8]/20 blur-[90px]" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-[90px]" />
            <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {title || (
                <>
                  Have an idea? Let's turn it into an{" "}
                  <span className="text-cyan-300">intelligent digital solution</span>.
                </>
              )}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-300">{sub}</p>
            <Link
              to="/contact"
              data-testid="cta-band-button"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#0B0E17] transition hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(56,189,248,0.4)]"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
