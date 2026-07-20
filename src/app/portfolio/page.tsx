import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  Bot,
  Check,
  FlaskConical,
  Quote,
  ScanLine,
  Sparkles,
} from "lucide-react";
import {
  aiFeedback,
  growthBest,
  growthConclusion,
  growthWorst,
  pblStages,
  portfolioProject,
  projectSummary,
  researchDiary,
  studentReflection,
  teacherReview,
} from "@/content/portfolio";
import { getProject } from "@/content/projects";
import { criteria, totalScore } from "@/content/bioscore";
import { PageContainer, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ButtonLink } from "@/components/ui/button";
import { QrCode } from "@/components/qr-code";
import { GrowthChart } from "@/components/charts/growth-chart";
import { SlideDeck } from "@/components/portfolio/slide-deck";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "QR портфолио",
  description:
    "PBL жобасының толық цифрлық портфолиосы: паспорт, кезеңдер, зерттеу күнделігі, нәтижелер, BIO SCORE, AI кері байланысы және сертификат.",
};

export default function PortfolioPage() {
  /* Паспорт берём из карточки проекта: цель, вопрос и гипотезу писал автор
     методики, дублировать их в portfolio.ts значило бы разойтись при правке. */
  const project = getProject(portfolioProject.projectId);
  if (!project) notFound();

  return (
    <PageContainer>
      <PageHeader
        eyebrow="QR Portfolio"
        title="Цифрлық портфолио"
        description="QR код бір бетте жобаның толық жолын ашады: мәселеден бастап қорғау мен сертификатқа дейін."
      />

      {/* 1. Обложка проекта */}
      <Reveal>
        <div className="overflow-hidden rounded-2xl bg-navy-900 text-white">
          <div className="grid items-center gap-6 lg:grid-cols-[1.35fr_1fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <Badge tone="onDark">{project.categoryLabel}</Badge>
              <h2 className="mt-4 text-2xl leading-tight font-bold sm:text-3xl">
                {project.title}
              </h2>

              <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {[
                  ["Сынып", portfolioProject.grade],
                  ["Орындаған", portfolioProject.student],
                  ["Жетекші", portfolioProject.supervisor],
                  ["Күні", portfolioProject.date],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs tracking-wide text-navy-100 uppercase">
                      {label}
                    </dt>
                    <dd className="mt-1 font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="rounded-xl bg-white/12 px-4 py-2.5 ring-1 ring-white/25">
                  <span className="text-xs text-navy-100">BIO SCORE</span>
                  <span className="ml-2 text-lg font-bold">
                    {portfolioProject.score}/100
                  </span>
                </span>
                <Badge tone="onDark">
                  <Check className="size-3.5" />
                  {portfolioProject.status}
                </Badge>
              </div>
            </div>

            <div className="relative aspect-4/3 lg:h-full lg:aspect-auto">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              {/* Смягчаем стык иллюстрации с тёмным блоком, иначе виден шов. */}
              <span
                className="absolute inset-0 bg-linear-to-r from-navy-900 via-navy-900/35 to-transparent lg:from-navy-900"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* 2. Паспорт проекта + QR */}
      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-[2fr_1fr]">
        <Reveal>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Жоба паспорты</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <dl className="grid gap-5 sm:grid-cols-2">
                {[
                  ["Жоба мақсаты", project.goal],
                  ["Зерттеу сұрағы", project.researchQuestion],
                  ["Гипотеза", project.hypothesis],
                  ["Ұзақтығы", project.duration],
                  ["Пән", portfolioProject.subject],
                  [
                    "Қатысушылар саны",
                    `${portfolioProject.participants} оқушы`,
                  ],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs tracking-wide text-muted uppercase">
                      {label}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed text-navy-900">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5">
                <ScanLine className="size-[18px] text-brand" />
                QR код
              </CardTitle>
              <p className="mt-1 text-sm text-muted">
                Осы бетті ашатын код
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <QrCode path="/portfolio" size={200} showUrl />
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* 3. Этапы PBL */}
      <Reveal>
        <Card className="mt-4 sm:mt-5">
          <CardHeader className="pb-3">
            <CardTitle>PBL кезеңдері</CardTitle>
            <p className="mt-1 text-sm text-muted">
              Оқушы зерттеу жолын толық өтті
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <Stagger className="grid gap-x-8 gap-y-5 md:grid-cols-2">
              {pblStages.map((stage, i) => (
                <StaggerItem key={stage.label}>
                  <div className="flex gap-3.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-700 ring-1 ring-green-100">
                      <Check className="size-4" />
                    </span>
                    <span>
                      <span className="block font-semibold text-navy-900">
                        <span className="text-muted">{i + 1}.</span>{" "}
                        {stage.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">
                        {stage.note}
                      </span>
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </CardContent>
        </Card>
      </Reveal>

      {/* 4. Дневник + 5. Эксперимент */}
      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Зерттеу күнделігі</CardTitle>
              <p className="mt-1 text-sm text-muted">
                Оқушының бақылау жазбалары
              </p>
            </CardHeader>
            <CardContent className="pt-0">
              <ol className="relative space-y-5">
                {researchDiary.map((entry, i) => (
                  <li key={entry.date} className="relative flex gap-4">
                    {i < researchDiary.length - 1 && (
                      <span
                        className="absolute top-10 left-[23px] h-[calc(100%+4px)] w-px bg-hairline"
                        aria-hidden
                      />
                    )}
                    <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-xs font-bold text-brand">
                      {entry.date}
                    </span>
                    <span className="pt-1">
                      <span className="block font-semibold text-navy-900">
                        {entry.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">
                        {entry.text}
                      </span>
                      <span className="mt-2 inline-block rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-semibold text-navy-700 ring-1 ring-hairline">
                        {entry.measure}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2.5">
                <FlaskConical className="size-[18px] text-brand" />
                Практикалық бөлім
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2.5">
                {project.practice?.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                    <span className="text-navy-900">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs tracking-wide text-muted uppercase">
                Жабдықтар
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {project.equipment?.map((item) => (
                  <Badge key={item} tone="muted">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* 6. Результаты */}
      <Reveal>
        <Card className="mt-4 sm:mt-5">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardTitle>Зерттеу нәтижелері</CardTitle>
                <p className="mt-1 text-sm text-muted">
                  Жарық түсіне қарай өсімдік биіктігі, см
                </p>
              </div>
              <Badge>Демо деректер</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
              <GrowthChart />

              <div className="flex flex-col justify-center gap-3">
                {[
                  { caption: "Ең жақсы нәтиже", row: growthBest },
                  { caption: "Ең төмен нәтиже", row: growthWorst },
                ].map(({ caption, row }) => (
                  <div
                    key={caption}
                    className="flex items-center gap-3.5 rounded-xl bg-slate-50 p-4 ring-1 ring-hairline"
                  >
                    <span
                      className="size-4 shrink-0 rounded-full"
                      style={{ backgroundColor: row.color }}
                      aria-hidden
                    />
                    <span>
                      <span className="block text-xs text-muted">{caption}</span>
                      <span className="block font-semibold text-navy-900">
                        {row.light} жарық
                      </span>
                    </span>
                    <span className="ml-auto text-lg font-bold text-navy-900">
                      {String(row.final).replace(".", ",")} см
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 border-t border-hairline pt-4 text-sm leading-relaxed text-muted">
              {growthConclusion}
            </p>
          </CardContent>
        </Card>
      </Reveal>

      {/* 7. BIO SCORE (кратко) + 8. AI Feedback */}
      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle>BIO SCORE бағасы</CardTitle>
                <span className="text-2xl font-bold text-navy-900">
                  {totalScore}
                  <span className="text-base font-semibold text-muted">/100</span>
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3.5">
                {criteria.map((c, i) => (
                  <li key={c.key}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium text-navy-900">
                        {c.label}
                      </span>
                      <span className="text-sm font-bold text-navy-900">
                        {c.score}
                      </span>
                    </div>
                    <Progress value={c.score} color={c.color} delay={i * 0.06} />
                  </li>
                ))}
              </ul>

              {/* Полный разбор критериев живёт на своей странице — здесь
                  только результат, иначе раздел меню теряет смысл. */}
              <ButtonLink
                href="/bio-score"
                variant="ghost"
                size="sm"
                className="mt-5 -ml-3.5"
              >
                Бағалау әдістемесі
                <ArrowRight className="size-4" />
              </ButtonLink>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="flex items-center gap-2.5">
                  <Bot className="size-[18px] text-brand" />
                  AI кері байланысы
                </CardTitle>
                <Badge tone="leaf">AI Confidence {aiFeedback.confidence}%</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="leading-relaxed text-navy-900">
                {aiFeedback.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {aiFeedback.strengths.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-green-600" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-xl bg-navy-50 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-brand uppercase">
                  <Sparkles className="size-3.5" />
                  Ұсыныс
                </p>
                <p className="mt-2 text-sm leading-relaxed text-navy-900">
                  {aiFeedback.suggestion}
                </p>
              </div>

              <ButtonLink
                href="/ai"
                variant="ghost"
                size="sm"
                className="mt-4 -ml-3.5"
              >
                AI көмекшісіне сұрақ қою
                <ArrowRight className="size-4" />
              </ButtonLink>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* 9. Презентация защиты */}
      <Reveal>
        <Card className="mt-4 sm:mt-5">
          <CardHeader className="pb-3">
            <CardTitle>Қорғау презентациясы</CardTitle>
            <p className="mt-1 text-sm text-muted">
              Слайдтарды оқтар арқылы қараңыз
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <SlideDeck />
          </CardContent>
        </Card>
      </Reveal>

      {/* 10. Рефлексия + 11. Отзыв учителя */}
      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Оқушы рефлексиясы</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3">
                {studentReflection.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden
                    />
                    <span className="leading-relaxed text-navy-900">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle>Мұғалімнің пікірі</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Quote className="size-6 text-navy-100" aria-hidden />
              <p className="mt-2 leading-relaxed text-navy-900">
                {teacherReview.text}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-hairline pt-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {portfolioProject.supervisor.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-900">
                    {portfolioProject.supervisor}
                  </span>
                  <span className="block text-xs text-muted">
                    {teacherReview.highlight}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* 12. Итог проекта и сертификат */}
      <Reveal>
        <div className="mt-4 overflow-hidden rounded-2xl bg-navy-900 p-6 text-white sm:mt-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-[0.18em] text-navy-100 uppercase">
                BIOVERSE Summary
              </p>
              <p className="mt-2 text-xl font-bold">Жоба аяқталды</p>
            </div>
            <ButtonLink href="/certificate" variant="onDark">
              <Award className="size-4" />
              Сертификатты ашу
            </ButtonLink>
          </div>

          <dl className="mt-7 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ...projectSummary,
              { label: "BIO SCORE", value: `${portfolioProject.score}/100` },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-xs text-navy-100">{item.label}</dt>
                <dd className="mt-1 text-2xl font-bold">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </PageContainer>
  );
}
