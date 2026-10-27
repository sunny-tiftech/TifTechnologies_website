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
