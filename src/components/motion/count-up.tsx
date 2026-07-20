"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { formatNumber } from "@/lib/utils";

/**
 * Счётчик, который «доезжает» до значения при появлении на экране.
 * Число форматируется по kk-KZ, чтобы разряды и дробная часть выглядели
 * привычно для казахского текста.
 */
export function CountUp({
  value,
  decimals = 0,
  duration = 1400,
  className,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // При включённом «уменьшении движения» просто обнуляем длительность:
    // первый же кадр выставит итоговое число. Так значение всегда приходит
    // из колбэка кадра, а не присваивается прямо в теле эффекта.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const span = reduced ? 0 : duration;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = span === 0 ? 1 : Math.min(1, (now - start) / span);
      // easeOutCubic — быстрый разгон и мягкая остановка на итоговом числе.
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(display, decimals)}
      {suffix}
    </span>
  );
}
