"use client";

import {
  Bar,
  BarChart,
  Cell,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { growthResults } from "@/content/portfolio";
import { axisProps, gridProps, ChartTooltip } from "./chart-theme";

/**
 * Итоговая высота растений по цвету подсветки.
 *
 * Столбцы окрашены в цвет самой лампы, поэтому легенда не нужна — связь
 * «цвет света → результат» читается сразу.
 *
 * Ось начинается с 10, а не с нуля: все растения стартовали с 12 см, и от
 * нуля разница между вариантами почти не видна. Нижняя граница подписана
 * на оси, так что график не вводит в заблуждение.
 */
export function GrowthChart({ height = 300 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={growthResults}
        margin={{ top: 22, right: 8, left: -18, bottom: 0 }}
      >
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="light" {...axisProps} />
        <YAxis domain={[10, 22]} {...axisProps} />
        <Tooltip
          content={<ChartTooltip suffix=" см" />}
          cursor={{ fill: "#f1f5f9" }}
        />
        <Bar
          dataKey="final"
          name="Соңғы биіктік"
          radius={[8, 8, 0, 0]}
          maxBarSize={64}
          animationDuration={1100}
        >
          {growthResults.map((row) => (
            <Cell key={row.light} fill={row.color} />
          ))}
          <LabelList
            dataKey="final"
            position="top"
            offset={10}
            fill="#0b2a5b"
            fontSize={12}
            fontWeight={700}
            /* Единицы не дублируем: они названы в подзаголовке карточки, а на
               узком экране «см» переносится на вторую строку и засоряет график.
               Запятая как разделитель — Recharts отдаёт значение с точкой. */
            formatter={(value) => String(value).replace(".", ",")}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
