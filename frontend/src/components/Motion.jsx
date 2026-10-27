import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const MaskedLines = ({ lines, className = "", delay = 0, as: Tag = "h1" }) => (
  <Tag className={className}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
        <motion.span
          className="block will-change-transform"
          initial={{ y: "112%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.9, delay: delay + i * 0.12, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </Tag>
);

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const AccentLine = ({ text, accent, accentClass = "text-blue-600" }) => {
  if (!accent || !text || !text.includes(accent)) return <>{text}</>;
  const [pre, ...rest] = text.split(accent);
  return (
    <>
      {pre}
      <span className={accentClass}>{accent}</span>
      {rest.join(accent)}
    </>
  );
};

export const PageHero = ({ eyebrow, line1, line2, accent, sub, delay = 0.1 }) => (
  <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-blue-600">{eyebrow}</p>
    <MaskedLines
      delay={delay}
      as="h1"
      className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#1E1A5E] sm:text-5xl lg:text-6xl"
      lines={[line1, <AccentLine text={line2} accent={accent} />]}
    />
    <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{sub}</p>
  </section>
);
