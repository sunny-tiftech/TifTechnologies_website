import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";
import { useContent } from "@/lib/content";

export default function CtaBand() {
  const { content } = useContent();
  const cta = content.cta;

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div
            data-testid="cta-band"
            className="relative overflow-hidden rounded-3xl border border-blue-100 bg-[#EEF2FF] px-6 py-14 text-center md:px-16 lg:py-20"
          >
            <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-200/50 blur-[90px]" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-200/50 blur-[90px]" />
            <h2 className="relative mx-auto max-w-3xl font-display text-3xl font-bold leading-tight text-[#1E1A5E] sm:text-4xl lg:text-5xl">
              {cta.line1} <span className="text-blue-600">{cta.accent}</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-600">{cta.sub}</p>
            <Link
              to="/contact"
              data-testid="cta-band-button"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#1E1A5E] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(30,26,94,0.5)]"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
