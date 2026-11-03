import { Link } from "react-router-dom";
import { useContent } from "@/lib/content";

const companyLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const { content, pages } = useContent();
  const { site, services, portfolio } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src="/assets/tif-logo.webp" alt={site.brand} className="h-20 w-auto" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-500">
              {site.brand}. {site.tagline}.
            </p>
            <a
              href={`mailto:${site.email}`}
              data-testid="footer-email"
              className="mt-4 inline-block font-mono text-sm text-blue-600 hover:text-blue-500"
            >
              {site.email}
            </a>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">Services</h4>
            <ul className="mt-5 space-y-2.5">
              {services.slice(0, 6).map((s) => (
                <li key={s.num + s.title}>
                  <Link
                    to="/services"
                    data-testid={`footer-service-${s.num}`}
                    className="text-sm text-slate-600 transition-colors hover:text-[#1E1A5E]"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">Company</h4>
            <ul className="mt-5 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.label.toLowerCase()}`}
                    className="text-sm text-slate-600 transition-colors hover:text-[#1E1A5E]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              {pages.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/p/${p.slug}`}
                    data-testid={`footer-page-${p.slug}`}
                    className="text-sm text-slate-600 transition-colors hover:text-[#1E1A5E]"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">Selected Work</h4>
            <ul className="mt-5 space-y-2.5">
              {portfolio.slice(0, 4).map((p) => (
                <li key={p.slug} className="font-mono text-sm text-slate-500">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`footer-work-${p.slug}`}
                      className="transition-colors hover:text-blue-600"
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
        <div className="text-outline mx-auto max-w-7xl font-display text-[18vw] font-extrabold leading-[0.75] lg:text-[12rem]">
          tif tech
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span data-testid="footer-copyright">© {year} {site.brand}</span>
          <span className="font-mono">{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
