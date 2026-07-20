import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { demoCertificate } from "@/content/certificate";
import { portfolioProject } from "@/content/portfolio";
import { author } from "@/content/author";
import { PageContainer } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CertificateView } from "@/components/certificate/certificate-view";
import { Reveal } from "@/components/motion/reveal";

type Params = {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

/**
 * Дата выдачи приходит из QR-кода параметром `d`.
 *
 * Значение из адреса попадает на страницу, поэтому принимаем строго формат
 * ДД.ММ.ГГГГ и всё остальное отбрасываем — иначе в «Берілген күні» можно
 * было бы подставить произвольный текст, просто отредактировав ссылку.
 */
function readDate(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return null;
  return /^\d{2}\.\d{2}\.\d{4}$/.test(value) ? value : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { number } = await params;
  return {
    title: `Сертификат № ${decodeURIComponent(number)}`,
    description: "BIOVERSE сертификатының түпнұсқалығын тексеру және жүктеу.",
  };
}

/**
 * Страница, которая открывается сканированием QR-кода с бланка.
 *
 * Базы данных в демо нет, поэтому по любому номеру показывается один и тот же
 * демонстрационный сертификат — номер из адреса подставляется в бланк, чтобы
 * сценарий «сканирую → вижу свой документ → скачиваю» выглядел цельно.
 */
export default async function CertificateVerifyPage({
  params,
  searchParams,
}: Params) {
  const { number } = await params;
  const certificateNumber = decodeURIComponent(number);

  const data = {
    name: demoCertificate.name,
    grade: demoCertificate.grade,
    project: demoCertificate.project,
    number: certificateNumber,
    // Дата с бланка; если ссылку открыли без параметра — демонстрационная.
    date: readDate((await searchParams).d) ?? portfolioProject.date,
  };

  return (
    <PageContainer>
      <Link
        href="/certificate"
        className="no-print mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-brand"
      >
        <ArrowLeft className="size-4" />
        Сертификат бетіне оралу
      </Link>

      {/* Блок подтверждения — первое, что видит человек после сканирования. */}
      <Reveal>
        <Card className="mb-4 overflow-hidden sm:mb-5">
          <div className="flex flex-col gap-4 bg-linear-to-r from-green-50 to-white p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-leaf text-white">
              <BadgeCheck className="size-6" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-extrabold text-navy-900 sm:text-xl">
                Сертификат түпнұсқалығы расталды
              </h1>
              <p className="mt-1 text-sm text-muted">
                № {certificateNumber} — BIOVERSE жүйесінде тіркелген
              </p>
            </div>
            <Badge tone="leaf" className="shrink-0 self-start sm:self-center">
              Жарамды
            </Badge>
          </div>
        </Card>
      </Reveal>

      {/* Паспорт документа: на телефоне читается быстрее, чем сам бланк. */}
      <Reveal delay={0.05}>
        <Card className="mb-4 sm:mb-5">
          <CardHeader className="pb-3">
            <CardTitle>Сертификат туралы мәлімет</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <dl className="grid gap-3 sm:grid-cols-2">
              {[
                ["Оқушы", data.name],
                ["Сынып", data.grade],
                ["Жоба", data.project],
                ["Жетекші", author.fullName],
                ["Берілген күні", data.date],
                ["BIO SCORE", `${demoCertificate.score}/100`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-3 border-b border-hairline pb-2.5 last:border-0"
                >
                  <dt className="shrink-0 text-xs text-muted">{label}</dt>
                  <dd className="text-right text-sm font-semibold text-navy-900">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </Reveal>

      <CertificateView data={data} />
    </PageContainer>
  );
}
