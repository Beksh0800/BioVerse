import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { analyticsKpi, ranking } from "@/content/analytics";
import { PageContainer, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/motion/count-up";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { WeeklyChart } from "@/components/charts/weekly-chart";
import {
  CategoryChart,
  CriteriaRadar,
  GradeChart,
} from "@/components/charts/analytics-charts";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Аналитика",
  description:
    "PBL жобаларының даму динамикасы, сыныптар бойынша статистика және жобалар рейтингі.",
};

const placeStyles = [
  "bg-amber-100 text-amber-700",
  "bg-slate-100 text-slate-600",
  "bg-orange-100 text-orange-700",
];

export default function AnalyticsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Analytics"
        title="Аналитика"
        description="Оқушылардың жобалық жұмысы бойынша жинақталған көрсеткіштер: даму динамикасы, сыныптар кесіндісі және үздік жобалар рейтингі."
      />

      <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {analyticsKpi.map((kpi) => (
          <StaggerItem key={kpi.label}>
            <Card className="h-full p-4 sm:p-5">
              <p className="text-xs font-medium text-muted sm:text-sm">{kpi.label}</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
                <CountUp value={kpi.value} decimals={kpi.decimals ?? 0} />
              </p>
              <p className="mt-1 text-xs text-muted">{kpi.hint}</p>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-3">
        <Reveal className="xl:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Даму динамикасы</CardTitle>
              <p className="mt-1 text-sm text-muted">
                Апталар бойынша орташа BIO SCORE
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <WeeklyChart height={300} />
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Бағыттар бойынша</CardTitle>
              <p className="mt-1 text-sm text-muted">Жобалардың таралуы</p>
            </CardHeader>
            <CardContent className="pt-0">
              <CategoryChart height={300} />
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Сыныптар кесіндісі</CardTitle>
              <p className="mt-1 text-sm text-muted">
                Жоба саны және орташа балл
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <GradeChart height={300} />
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle>Критерийлер профилі</CardTitle>
              <p className="mt-1 text-sm text-muted">
                Барлық жобалар бойынша орташа көрсеткіш
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <CriteriaRadar height={300} />
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <Reveal className="mt-4 block sm:mt-5">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Жобалар рейтингі</CardTitle>
            <p className="mt-1 text-sm text-muted">Оқу жылының үздік жобалары</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-4">
              {ranking.map((item, i) => (
                <li key={item.place} className="flex items-center gap-3 sm:gap-4">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                      placeStyles[item.place - 1] ?? "bg-navy-50 text-brand",
                    )}
                  >
                    {item.place === 1 ? <Trophy className="size-4" /> : item.place}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-sm leading-snug font-semibold text-navy-900">
                        {item.title}
                      </span>
                      <span className="shrink-0 text-sm">
                        <span className="font-bold text-navy-900">{item.score}</span>
                        <span className="text-xs text-muted">/100</span>
                      </span>
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">{item.grade}</span>
                    <Progress value={item.score} delay={i * 0.06} className="mt-2 h-1.5" />
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Reveal>
    </PageContainer>
  );
}
