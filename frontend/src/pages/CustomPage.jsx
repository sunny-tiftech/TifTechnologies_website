import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { useContent } from "@/lib/content";
import { MaskedLines, Reveal } from "@/components/Motion";
import CtaBand from "@/components/CtaBand";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CustomPage() {
  const { slug } = useParams();
  const { content } = useContent();
  const [page, setPage] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    setPage(undefined);
    axios
      .get(`${API}/pages/${slug}`)
      .then((r) => setPage(r.data))
      .catch(() => setPage(null));
  }, [slug]);

  if (page === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">Loading…</span>
      </main>
    );
  }

  if (page === null) {
    return (
      <main data-testid="custom-page-not-found" className="flex min-h-screen flex-col items-center justify-center gap-5 px-4 text-center">
        <h1 className="font-display text-3xl font-bold text-[#1E1A5E]">Page not found</h1>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600">
          <ArrowLeft size={15} /> Back to home
        </Link>
      </main>
    );
  }

  const paragraphs = (page.body || "").split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean);

  return (
    <main data-testid="custom-page" className="pt-24 md:pt-28">
      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">{content.site.brand}</p>
        <MaskedLines
          delay={0.1}
          as="h1"
          className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#1E1A5E] sm:text-5xl"
          lines={[page.title]}
        />
        {page.intro ? (
          <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">{page.intro}</p>
        ) : null}
        <Reveal delay={0.15}>
          <div className="mt-10 space-y-5 border-t border-slate-200 pt-10">
            {paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-slate-600">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </section>
      <CtaBand />
    </main>
  );
}
