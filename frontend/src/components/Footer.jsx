import { Link } from "react-router-dom";
import { services, portfolioItems } from "@/lib/data";

const companyLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src="/assets/tif-logo.webp" alt="Tif Technologies" className="h-14 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Tif — The Ideaz Factory. Turning Ideas Into Intelligent Digital Solutions.
            </p>
            <a
              href="mailto:hello@tiftechnologies.com"
              data-testid="footer-email"
              className="mt-4 inline-block font-mono text-sm text-cyan-400 hover:text-cyan-300"
            >
              hello@tiftechnologies.com
            </a>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Services</h4>
            <ul className="mt-5 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.num}>
                  <Link
                    to="/services"
                    data-testid={`footer-service-${s.num}`}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Company</h4>
            <ul className="mt-5 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">Selected Work</h4>
            <ul className="mt-5 space-y-2.5">
              {portfolioItems.slice(0, 4).map((p) => (
                <li key={p.name} className="font-mono text-sm text-slate-400">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`footer-work-${p.domain}`}
                      className="transition-colors hover:text-cyan-400"
                    >
                      {p.domain}
                    </a>
                  ) : (
                    p.domain
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none px-4" aria-hidden="true">
        <div className="text-outline mx-auto max-w-7xl font-display text-[22vw] font-extrabold leading-[0.75] lg:text-[17rem]">
          tif
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span data-testid="footer-copyright">© {year} Tif Technologies · The Ideaz Factory</span>
          <span className="font-mono">Turning Ideas Into Intelligent Digital Solutions</span>
        </div>
      </div>
    </footer>
  );
}
