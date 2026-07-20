"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Тонкий прогресс-бар из референса: синяя заливка на светло-сером треке.
 * Заполняется при попадании в область просмотра.
 */
export function Progress({
  value,
  color = "#1d4ed8",
  className,
  delay = 0,
}: {
  value: number;
  color?: string;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn("h-2 w-full overflow-hidden rounded-full bg-slate-100", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
