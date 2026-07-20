"use client";

import type { ReactNode } from "react";

/** Общие настройки осей и сетки, чтобы все графики читались как один набор. */
export const axisProps = {
  stroke: "#94a3b8",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
} as const;

export const gridProps = {
  stroke: "#eef2f7",
  strokeDasharray: "3 3",
  vertical: false,
} as const;

/** Единая подсказка: белая карточка вместо дефолтной серой рамки Recharts. */
export function ChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: { name?: string; value?: number | string; color?: string }[];
  label?: ReactNode;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl bg-white px-3 py-2 shadow-[var(--shadow-lift)] ring-1 ring-hairline">
      {label ? (
        <p className="mb-1 text-xs font-semibold text-navy-900">{label}</p>
      ) : null}
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-2 text-xs text-muted">
          <span
            className="size-2 shrink-0 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.name}</span>
          <span className="font-bold text-navy-900">
            {entry.value}
            {suffix}
          </span>
        </p>
      ))}
    </div>
  );
}
