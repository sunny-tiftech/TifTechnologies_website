import { motion, useMotionValue, useSpring } from "framer-motion";

const arcs = [
  { r: 48, d: 0 },
  { r: 82, d: 0.45 },
  { r: 116, d: 0.9 },
];

function arcPath(cx, cy, r) {
  const k = 0.62;
  return `M ${cx - r * k} ${cy - r * k} A ${r} ${r} 0 0 1 ${cx + r * k} ${cy - r * k}`;
}

const chips = [
  ["Next.js", "top-4 left-0"],
  ["Flutter", "top-20 right-0"],
  ["AI Agents", "bottom-28 left-0"],
  ["PostgreSQL", "bottom-2 right-6"],
];

export default function SignalVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 14 });
  const sy = useSpring(my, { stiffness: 55, damping: 14 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 26);
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 26);
  };

  return (
    <div
      data-testid="hero-signal-visual"
      onMouseMove={onMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      className="relative mx-auto aspect-square w-full max-w-[440px]"
    >
      <motion.div style={{ x: sx, y: sy }} className="relative h-full w-full">
        <div className="absolute inset-0 rounded-full bg-[#1E1A5E]/60 blur-2xl" />
        <div className="absolute inset-3 rounded-full border border-white/8 bg-[#0E1424]/80 backdrop-blur-sm" />
        <motion.div
          className="absolute inset-3 rounded-full border border-dashed border-cyan-400/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
        />
        <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full">
          {arcs.map((a) => (
            <motion.path
              key={a.r}
              d={arcPath(160, 182, a.r)}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="5"
              strokeLinecap="round"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: a.d, ease: "easeInOut" }}
            />
          ))}
          <circle cx="160" cy="182" r="9" fill="#FFFFFF" />
        </svg>
        {chips.map(([label, pos], i) => (
          <motion.span
            key={label}
            className={`absolute ${pos} rounded-full border border-white/10 bg-[#121829]/90 px-3.5 py-1.5 font-mono text-xs text-slate-300 shadow-lg`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
