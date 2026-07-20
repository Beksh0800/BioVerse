import type { Metadata } from "next";
import Image from "next/image";
import { Check, Quote } from "lucide-react";
import { author, aboutSections } from "@/content/author";
import { site } from "@/content/site";
import { PageContainer, PageHeader } from "@/components/layout/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "BIOVERSE туралы",
  description: site.fullTitle,
};

export default function AboutPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="About BIOVERSE"
        title="BIOVERSE туралы"
        description={site.fullTitle}
      />

      {/* Что такое BIOVERSE */}
      <Reveal>
        <Card className="p-5 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Badge tone="brand">{site.competition}</Badge>
              <h2 className="mt-3 text-xl font-extrabold text-balance text-navy-900 sm:text-2xl">
                {aboutSections.what.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {aboutSections.what.text}
              </p>
              <p className="mt-4 text-lg font-bold text-brand">{site.motto}</p>
            </div>
            <Image
              src="/images/projects/photosynthesis.webp"
              alt="BIOVERSE зертханасы"
              width={1500}
              height={1000}
              className="w-full rounded-2xl object-cover ring-1 ring-hairline"
            />
          </div>
        </Card>
      </Reveal>

      {/* Цель и актуальность */}
      <div className="mt-4 grid gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-2">
        {[aboutSections.goal, aboutSections.relevance].map((section, i) => (
          <Reveal key={section.title} delay={i * 0.05}>
            <Card className="h-full p-5 sm:p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-navy-50 text-brand">
                <Icon name={i === 0 ? "target" : "help"} className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy-900">
                {section.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{section.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Задачи */}
      <Reveal className="mt-4 block sm:mt-5">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Жобаның міндеттері</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="grid gap-3 sm:grid-cols-2">
              {aboutSections.tasks.map((task) => (
                <li key={task} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-leaf"
                    strokeWidth={3}
                    aria-hidden
                  />
                  <span className="text-sm leading-snug text-navy-900">{task}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Reveal>

      {/* Инновации */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-navy-900 sm:text-xl">
          Инновациялар
        </h2>
        <Stagger className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {aboutSections.innovations.map((item) => (
            <StaggerItem key={item.title}>
              <Card hover className="h-full p-5">
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy-50 text-brand">
                  <Icon name={item.icon} className="size-5" />
                </span>
                <h3 className="mt-4 font-bold text-navy-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {item.text}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Преимущества */}
      <Reveal className="mt-8 block">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Платформаның артықшылықтары</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="grid gap-3 sm:grid-cols-2">
              {aboutSections.advantages.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3.5 ring-1 ring-hairline"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    strokeWidth={3}
                    aria-hidden
                  />
                  <span className="text-sm leading-snug text-navy-900">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </Reveal>

      {/* Автор */}
      <Reveal className="mt-8 block">
        <Card className="p-5 sm:p-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
            {author.photo ? (
              <Image
                src={author.photo}
                alt={author.fullName}
                width={160}
                height={160}
                className="size-28 shrink-0 rounded-2xl object-cover ring-1 ring-hairline"
              />
            ) : (
              <span
                className="flex size-28 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-navy-600 to-navy-900 text-4xl font-extrabold text-white"
                aria-hidden
              >
                {author.initial}
              </span>
            )}
            <div>
              <p className="text-xs font-bold tracking-[0.12em] text-brand uppercase">
                Жоба авторы
              </p>
              <h3 className="mt-1.5 text-xl font-extrabold text-navy-900 sm:text-2xl">
                {author.fullName}
              </h3>
              <p className="mt-1 text-sm font-medium text-muted">{author.role}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                {author.bio}
              </p>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* Девиз */}
      <Reveal className="mt-4 block sm:mt-5">
        <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-8 text-center sm:p-12">
          <div className="pointer-events-none absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-brand/25 blur-3xl" />
          <div className="relative">
            <Quote className="mx-auto size-8 text-navy-300" />
            <p className="mt-4 text-2xl font-extrabold text-balance text-white sm:text-4xl">
              {site.motto}
            </p>
            <p className="mt-3 text-sm text-navy-200">BIOVERSE</p>
          </div>
        </div>
      </Reveal>
    </PageContainer>
  );
}
