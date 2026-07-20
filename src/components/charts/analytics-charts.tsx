"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { byCategory, byGrade, criteriaAverage } from "@/content/analytics";
import { axisProps, gridProps, ChartTooltip } from "./chart-theme";

/** Проекты и средний балл по классам. */
export function GradeChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={byGrade} margin={{ top: 8, right: 0, left: -22, bottom: 0 }}>
        <CartesianGrid {...gridProps} />
        <XAxis dataKey="grade" {...axisProps} />
        {/*
          Две оси намеренно: число проектов измеряется единицами, а средний
          балл — десятками. На общей шкале синие столбцы прижимались бы
          к нулю и выглядели как отсутствие данных.
        */}
        <YAxis yAxisId="count" domain={[0, 8]} {...axisProps} />
        <YAxis
          yAxisId="score"
          orientation="right"
          domain={[0, 100]}
          {...axisProps}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f5f7fa" }} />
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
        />
        <Bar
          yAxisId="count"
          dataKey="projects"
          name="Жоба саны"
          fill="#1d4ed8"
          radius={[6, 6, 0, 0]}
          animationDuration={900}
        />
        <Bar
          yAxisId="score"
          dataKey="average"
          name="Орташа балл"
          fill="#86c440"
          radius={[6, 6, 0, 0]}
          animationDuration={900}
          animationBegin={150}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/** Распределение проектов по направлениям. */
export function CategoryChart({ height = 280 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Tooltip content={<ChartTooltip suffix=" жоба" />} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Pie
          data={byCategory}
          dataKey="value"
          nameKey="name"
          innerRadius="52%"
          outerRadius="80%"
          paddingAngle={3}
          animationDuration={900}
        >
          {byCategory.map((entry) => (
            <Cell key={entry.name} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Средние баллы по критериям BIO SCORE. */
export function CriteriaRadar({ height = 300 }: { height?: number }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={criteriaAverage} outerRadius="72%">
        <PolarGrid stroke="#e6ecf5" />
        <PolarAngleAxis
          dataKey="criterion"
          tick={{ fill: "#64748b", fontSize: 11 }}
        />
        {/* Числовые деления скрыты: они ложатся поверх фигуры и мешают её
            читать, а точные значения показывает подсказка при наведении. */}
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Tooltip content={<ChartTooltip suffix=" балл" />} />
        <Radar
          name="Орташа балл"
          dataKey="score"
          stroke="#1d4ed8"
          fill="#1d4ed8"
          fillOpacity={0.22}
          animationDuration={1000}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
