import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { criteria, totalScore, scoredProject } from "@/content/bioscore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/charts/score-ring";

/** Список критериев с прогресс-барами — используется и на дашборде, и на странице BIO SCORE. */
export function CriteriaList({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "space-y-3" : "space-y-4"}>
      {criteria.map((c, i) => (
        <li key={c.key}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium text-navy-900">{c.label}</span>
            <span className="shrink-0 text-sm">
              <span className="font-bold text-navy-900">{c.score}</span>
              <span className="text-xs text-muted">/100</span>
            </span>
          </div>
          <Progress value={c.score} color={c.color} delay={i * 0.07} />
        </li>
      ))}
    </ul>
  );
}

export function BioScoreCard() {
  return (
    <Card className="h-full">
      <CardHeader className="flex items-start justify-between gap-3 pb-4">
        <div>
          <CardTitle>BIO SCORE</CardTitle>
          <p className="mt-1 text-sm text-muted">{scoredProject}</p>
        </div>
        <Link
          href="/bio-score"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Толығырақ
          <ArrowRight className="size-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        {/*
          Строго вертикально: в колонке дашборда карточка узкая, и кольцо
          рядом со списком не оставляет полосам критериев ширины — они
          вылезают за край карточки.
        */}
        <div className="flex flex-col items-center gap-5">
          <ScoreRing segments={[...criteria]} total={totalScore} size={168} thickness={20} />
          <div className="w-full">
            <CriteriaList compact />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
