"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { weeklyProgress } from "@/content/analytics";
import { axisProps, gridProps, ChartTooltip } from "./chart-theme";

/** Динамика среднего балла по неделям. */
export function WeeklyChart({
  height = 260,
  showLabels = true,
}: {
  height?: number;
  showLabels?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={weeklyProgress} margin={{ top: 18, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="weeklyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="week" {...axisProps} />
        <YAxis domain={[0, 100]} {...axisProps} />
        <Tooltip content={<ChartTooltip suffix=" балл" />} cursor={{ stroke: "#cbd5e1" }} />
        <Area
          type="monotone"
          dataKey="score"
          name="Орташа балл"
          stroke="#1d4ed8"
          strokeWidth={2.5}
          fill="url(#weeklyFill)"
          dot={{ r: 4, fill: "#ffffff", stroke: "#1d4ed8", strokeWidth: 2.5 }}
          activeDot={{ r: 6 }}
          animationDuration={1100}
        >
          {showLabels && (
            <LabelList
              dataKey="score"
              position="top"
              offset={10}
              fill="#0b2a5b"
              fontSize={11}
              fontWeight={700}
            />
          )}
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}
