"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/count-up";

type Segment = { label: string; score: number; weight: number; color: string };

/**
 * Кольцевая диаграмма BIO SCORE из референса: сегменты по критериям и
 * крупный итоговый балл в центре.
 *
 * Сделано на SVG, а не на Recharts: нужен точный контроль над зазорами между
 * сегментами и над анимацией отрисовки по кругу, что через stroke-dasharray
 * получается прямее, чем через настройки библиотеки.
 */
export function ScoreRing({
  segments,
  total,
  size = 200,
  thickness = 22,
  caption = "Жалпы нәтиже",
}: {
  segments: Segment[];
  total: number;
  size?: number;
  thickness?: number;
  caption?: string;
}) {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const gap = 3; // градусов между сегментами, чтобы критерии читались раздельно

  const weightSum = segments.reduce((s, x) => s + x.weight, 0);

  // Начало каждого сегмента — сумма долей всех предыдущих. Считаем от
  // исходного массива, а не накоплением во внешней переменной: та при
  // повторном рендере продолжила бы расти от прошлого значения.
  const arcs = segments.map((seg, i) => {
    const startDeg = segments
      .slice(0, i)
      .reduce((sum, prev) => sum + (prev.weight / weightSum) * 360, 0);
    const sweep = (seg.weight / weightSum) * 360;
    return {
      label: seg.label,
      color: seg.color,
      startDeg,
      sweepDeg: Math.max(0, sweep - gap),
    };
  });

  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${caption}: ${total} / 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#eef2f7"
          strokeWidth={thickness}
        />
        {arcs.map((arc, i) => (
          <motion.circle
            key={arc.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ transform: `rotate(${arc.startDeg}deg)`, transformOrigin: "center" }}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{
              strokeDashoffset: circumference * (1 - arc.sweepDeg / 360),
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl leading-none font-extrabold text-navy-900">
          <CountUp value={total} />
        </span>
        <span className="mt-0.5 text-sm font-semibold text-muted">/100</span>
        <span className="mt-1 text-[11px] font-medium text-muted">{caption}</span>
      </div>
    </div>
  );
}
