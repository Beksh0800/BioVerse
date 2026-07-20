import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Send, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "@/components/qr-code";
import { Icon } from "@/components/ui/icon";
import { WeeklyChart } from "@/components/charts/weekly-chart";
import { ranking } from "@/content/analytics";
import { portfolioProject } from "@/content/portfolio";
import { author } from "@/content/author";
import { cn } from "@/lib/utils";

/** Подсказки AI-помощника, которые видно с дашборда. */
const aiSuggestions = [
  { icon: "chart", text: "Эксперимент нәтижелерін диаграмма түрінде көрсетіңіз." },
  { icon: "target", text: "Қорытынды бөлімге нақты деректер келтіріңіз." },
  { icon: "sparkles", text: "Гипотезаны дәлелдеп тұжырымдаңыз." },
];

export function AiPreview() {
  return (
    <Card hover className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle>AI көмекшісі</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        <div className="flex items-start gap-2.5 rounded-xl bg-navy-50 p-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
            <Bot className="size-4" />
          </span>
          <p className="text-sm leading-snug text-navy-900">
            Сәлем! Мен сіздің BIOVERSE көмекшіңізбін.
          </p>
        </div>

        <p className="mt-4 mb-2 text-xs font-bold text-navy-900">Ұсыныстар:</p>
        <ul className="flex-1 space-y-2.5">
          {aiSuggestions.map((s) => (
            <li key={s.text} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-navy-50 text-brand">
                <Icon name={s.icon} className="size-3.5" />
              </span>
              <span className="text-xs leading-snug text-muted">{s.text}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/ai"
          className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm text-muted ring-1 ring-hairline transition hover:bg-navy-50 hover:text-navy-900"
        >
          Сұрағыңызды жазыңыз...
          <Send className="size-4 shrink-0 text-brand" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function QrPreview() {
  return (
    <Card hover className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle>QR портфолио</CardTitle>
        <p className="mt-1 text-sm text-muted">{portfolioProject.title}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-center pt-0">
        <QrCode path="/portfolio" size={160} />
        <p className="mt-4 text-center text-xs leading-snug text-muted">
          QR кодты сканерлеп, жоба портфолиосын көріңіз
        </p>
        <Link
          href="/portfolio"
          className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Портфолиоға өту
          <ArrowRight className="size-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}

export function AnalyticsPreview() {
  return (
    <Card hover className="flex h-full flex-col">
      <CardHeader className="flex items-start justify-between gap-3 pb-3">
        <div>
          <CardTitle>Аналитика</CardTitle>
          <p className="mt-1 text-sm text-muted">Барлық жобалар бойынша</p>
        </div>
        <Link
          href="/analytics"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Толығырақ
          <ArrowRight className="size-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <WeeklyChart height={200} />
      </CardContent>
    </Card>
  );
}

const placeStyles = [
  "bg-amber-100 text-amber-700",
  "bg-slate-100 text-slate-600",
  "bg-orange-100 text-orange-700",
];

export function TopProjects() {
  return (
    <Card hover className="h-full">
      <CardHeader className="flex items-start justify-between gap-3 pb-3">
        <CardTitle>Үздік жобалар</CardTitle>
        <Link
          href="/analytics"
          className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Барлығын көру
          <ArrowRight className="size-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <ol className="space-y-3">
          {ranking.slice(0, 4).map((item) => (
            <li key={item.place} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                  placeStyles[item.place - 1] ?? "bg-navy-50 text-brand",
                )}
              >
                {item.place === 1 ? <Trophy className="size-4" /> : item.place}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm leading-snug font-semibold text-navy-900">
                  {item.title}
                </span>
                <span className="block text-xs text-muted">{item.grade}</span>
              </span>
              <span className="shrink-0 text-sm">
                <span className="font-bold text-navy-900">{item.score}</span>
                <span className="text-xs text-muted">/100</span>
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

export function CertificatePreview() {
  return (
    <Card hover className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle>Сертификат</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-linear-to-b from-amber-50 to-white p-5 text-center ring-1 ring-amber-200/70">
          <Image
            src="/images/logo-mark.webp"
            alt="BIOVERSE"
            width={200}
            height={44}
            className="h-6 w-auto"
          />
          <p className="mt-3 text-sm font-extrabold tracking-wide text-navy-900">
            СЕРТИФИКАТ
          </p>
          <p className="mt-3 text-xs text-muted">Бұл сертификат</p>
          <p className="mt-1 text-xs font-bold text-navy-900">
            «{portfolioProject.title}»
          </p>
          <p className="mt-1 text-[11px] leading-snug text-muted">
            PBL жобасын табысты орындағаны үшін беріледі.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-full bg-amber-400/90 text-[10px] font-bold text-white ring-2 ring-amber-200">
              BV
            </span>
            <span className="text-left">
              <span className="block text-[11px] font-semibold text-navy-900">
                {author.fullName}
              </span>
              <span className="block text-[10px] text-muted">
                {portfolioProject.date}
              </span>
            </span>
          </div>
        </div>
        <Link
          href="/certificate"
          className="mt-3 inline-flex items-center justify-center gap-1 text-xs font-semibold text-brand hover:underline"
        >
          Сертификатты ашу
          <ArrowRight className="size-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}
