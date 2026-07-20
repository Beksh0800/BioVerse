import type { Metadata } from "next";
import { criteria, totalScore, scoredProject, scoreLevels } from "@/content/bioscore";
import { PageContainer, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/charts/score-ring";
import { CriteriaList } from "@/components/dashboard/bio-score-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "BIO SCORE",
  description:
    "BIO SCORE — PBL жобаларын алты критерий бойынша кешенді бағалайтын авторлық жүйе.",
};

const levelTones = {
  leaf: "leaf",
  brand: "brand",
  amber: "amber",
  muted: "muted",
} as const;

export default function BioScorePage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Бағалау жүйесі"
        title="BIO SCORE"
        description="BIO SCORE — жобаны алты критерий бойынша 100 балдық жүйемен бағалайтын авторлық әдістеме. Әр критерийдің өз салмағы бар, сондықтан қорытынды балл жобаның нақты сапасын көрсетеді."
      />

      {/* Итоговая оценка проекта */}
      <Reveal>
        <Card className="p-5 sm:p-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12">
            <div className="text-center lg:text-left">
              <Badge tone="brand">Бағаланған жоба</Badge>
              <h2 className="mt-3 text-xl font-extrabold text-balance text-navy-900 sm:text-2xl">
                {scoredProject}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Жоба барлық кезеңнен өтіп, қорғауға ұсынылды. Төмендегі кестеде әр
                критерий бойынша алынған балл көрсетілген.
              </p>
            </div>

            <ScoreRing
              segments={[...criteria]}
              total={totalScore}
              size={224}
              thickness={26}
            />

            <div className="w-full flex-1">
              <CriteriaList />
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Расшифровка критериев */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-navy-900 sm:text-xl">
          Бағалау критерийлері
        </h2>
        <Stagger className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {criteria.map((c) => (
            <StaggerItem key={c.key}>
              <Card hover className="h-full p-5">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="mt-1 size-3 shrink-0 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-900">{c.label}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {c.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
                  <span className="text-xs font-medium text-muted">
                    Салмағы: {c.weight}%
                  </span>
                  <span className="text-sm">
                    <span className="font-bold text-navy-900">{c.score}</span>
                    <span className="text-xs text-muted">/100</span>
                  </span>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Шкала уровней */}
      <section className="mt-8">
        <Reveal>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Балл шкаласы</CardTitle>
              <p className="mt-1 text-sm text-muted">
                Қорытынды баллды қалай түсіндіру керек
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="divide-y divide-hairline">
                {scoreLevels.map((level) => (
                  <li
                    key={level.range}
                    className="flex flex-col gap-2 py-3.5 sm:flex-row sm:items-center sm:gap-5"
                  >
                    <span className="flex shrink-0 items-center gap-2.5 sm:w-56">
                      <Badge tone={levelTones[level.tone]}>{level.label}</Badge>
                      <span className="font-mono text-sm font-semibold text-navy-900">
                        {level.range}
                      </span>
                    </span>
                    <span className="text-sm leading-snug text-muted">{level.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </PageContainer>
  );
}
