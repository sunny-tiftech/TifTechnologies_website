import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-slate-200 bg-white/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3">
          <img src="/assets/tif-logo.webp" alt="Tif Technologies" className="h-14 w-auto md:h-16" />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                pathname === l.to ? "text-[#1E1A5E]" : "text-slate-500 hover:text-[#1E1A5E]"
              }`}
            >
              {pathname === l.to && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full border border-blue-100 bg-[#EEF2FF]"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative">{l.label}</span>
            </Link>
          ))}
          <Link
            to="/contact"
            data-testid="nav-cta"
            className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-[#1E1A5E] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(30,26,94,0.5)]"
          >
            Start a Project <ArrowUpRight size={16} />
          </Link>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className="p-2 text-[#1E1A5E] md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-2 border-t border-slate-200 bg-white/95 px-6 py-6 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-testid={`nav-mobile-${l.label.toLowerCase()}`}
                className={`block rounded-xl px-4 py-3 text-base ${
                  pathname === l.to ? "bg-[#EEF2FF] text-[#1E1A5E]" : "text-slate-600"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              data-testid="nav-mobile-cta"
              className="block rounded-xl bg-[#1E1A5E] px-4 py-3 text-center font-semibold text-white"
            >
              Start a Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
