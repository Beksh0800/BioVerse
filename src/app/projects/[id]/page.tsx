import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Star, Users } from "lucide-react";
import { getProject, projects } from "@/content/projects";
import { PageContainer } from "@/components/layout/app-shell";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import {
  ChecklistSection,
  ComparisonSection,
  ExpectedResult,
  StagesSection,
  StatementBlock,
  WorkflowSection,
} from "@/components/projects/project-sections";

type Params = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Жоба табылмады" };

  return {
    title: project.title,
    description: project.subtitle ?? project.description ?? project.goal,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  return (
    <PageContainer>
      <Link
        href="/projects"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-brand"
      >
        <ArrowLeft className="size-4" />
        Жобаларға оралу
      </Link>

      {/* Обложка проекта */}
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-navy-900">
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={900}
            className="h-[220px] w-full object-cover sm:h-[320px] lg:h-[420px]"
            priority
          />
          {/* Иллюстрации проектов пёстрые, поэтому подложка под заголовком
              плотная — иначе белый текст теряется на светлых участках. */}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-950 via-navy-950/88 to-transparent p-5 pt-20 sm:p-8 sm:pt-28">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="onDark">{project.categoryLabel}</Badge>
              <Badge tone="onDark">
                <Users className="size-3" />
                {project.grade}
              </Badge>
              <Badge tone="onDark">
                <Clock className="size-3" />
                {project.duration}
              </Badge>
              <Badge tone="onDark">
                <Star className="size-3" />
                BIO SCORE {project.score}/100
              </Badge>
            </div>
            <h1 className="mt-3 max-w-4xl text-xl font-extrabold tracking-tight text-balance text-white sm:text-3xl lg:text-4xl">
              {project.title}
            </h1>
            {project.subtitle ? (
              <p className="mt-2 max-w-2xl text-sm text-navy-100 sm:text-base">
                {project.subtitle}
              </p>
            ) : null}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
        {project.description ? (
          <Reveal>
            <p className="max-w-3xl leading-relaxed text-navy-900 sm:text-lg">
              {project.description}
            </p>
          </Reveal>
        ) : null}

        {/* Ключевые формулировки — рендерятся только те, что заданы у проекта */}
        {(project.goal || project.researchQuestion || project.hypothesis) && (
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            {project.goal ? (
              <Reveal>
                <StatementBlock icon="target" label="Мақсаты" text={project.goal} />
              </Reveal>
            ) : null}
            {project.researchQuestion ? (
              <Reveal delay={0.05}>
                <StatementBlock
                  icon="help"
                  label="Зерттеу сұрағы"
                  text={project.researchQuestion}
                  tone="amber"
                />
              </Reveal>
            ) : null}
            {project.hypothesis ? (
              <Reveal delay={0.1}>
                <StatementBlock
                  icon="sparkles"
                  label="Гипотеза"
                  text={project.hypothesis}
                  tone="leaf"
                />
              </Reveal>
            ) : null}
          </div>
        )}

        {project.workflow ? (
          <Reveal>
            <WorkflowSection steps={project.workflow} />
          </Reveal>
        ) : null}

        {project.stages ? (
          <Reveal>
            <StagesSection stages={project.stages} />
          </Reveal>
        ) : null}

        {project.comparison ? (
          <Reveal>
            <ComparisonSection groups={project.comparison} />
          </Reveal>
        ) : null}

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
          {project.practice ? (
            <Reveal>
              <ChecklistSection
                title="Практикалық бөлім"
                items={project.practice}
                icon="flask"
                columns={1}
              />
            </Reveal>
          ) : null}
          {project.studentTasks ? (
            <Reveal delay={0.05}>
              <ChecklistSection
                title="Оқушының тапсырмалары"
                items={project.studentTasks}
                icon="clipboard"
                columns={1}
              />
            </Reveal>
          ) : null}
          {project.research ? (
            <Reveal delay={0.05}>
              <ChecklistSection
                title="Зерттелетін көрсеткіштер"
                items={project.research}
                icon="chart"
                columns={1}
              />
            </Reveal>
          ) : null}
          {project.equipment ? (
            <Reveal delay={0.05}>
              <ChecklistSection
                title="Қажетті құрал-жабдықтар"
                items={project.equipment}
                icon="flask"
                columns={1}
              />
            </Reveal>
          ) : null}
          {project.safety ? (
            <Reveal delay={0.1}>
              <ChecklistSection
                title="Қауіпсіздік ережелері"
                items={project.safety}
                icon="shield"
                columns={1}
              />
            </Reveal>
          ) : null}
          {project.evaluation ? (
            <Reveal delay={0.1}>
              <ChecklistSection
                title="Бағалау көрсеткіштері"
                items={project.evaluation}
                icon="star"
                columns={1}
              />
            </Reveal>
          ) : null}
          {project.illustration ? (
            <Reveal delay={0.1}>
              <ChecklistSection
                title="Иллюстрация элементтері"
                items={project.illustration}
                icon="sparkles"
                columns={1}
              />
            </Reveal>
          ) : null}
          {project.realLife ? (
            <Reveal delay={0.15}>
              <ChecklistSection
                title="Өмірде қолданылуы"
                items={project.realLife}
                icon="leaf"
                columns={1}
              />
            </Reveal>
          ) : null}
        </div>

        {project.gallery?.length ? (
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  width={1200}
                  height={700}
                  className="w-full rounded-2xl object-cover ring-1 ring-hairline"
                />
              ))}
            </div>
          </Reveal>
        ) : null}

        <ExpectedResult text={project.expectedResult} />
      </div>
    </PageContainer>
  );
}
