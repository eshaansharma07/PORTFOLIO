"use client";

import { motion } from "framer-motion";

export function Typewriter({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-2 text-sm uppercase tracking-[0.3em] text-[var(--muted)] md:text-base">
      {lines.map((line, index) => (
        <motion.div
          key={line}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.12, duration: 0.55 }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}
