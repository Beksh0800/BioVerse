import { PageContainer } from "@/components/layout/app-shell";
import { DashboardHero } from "@/components/dashboard/hero";
import { StatCards } from "@/components/dashboard/stat-cards";
import { ActiveProjects } from "@/components/dashboard/active-projects";
import {
  ProjectStructure,
  ProjectStages,
} from "@/components/dashboard/project-structure";
import { BioScoreCard } from "@/components/dashboard/bio-score-card";
import {
  AiPreview,
  AnalyticsPreview,
  CertificatePreview,
  QrPreview,
  TopProjects,
} from "@/components/dashboard/previews";
import { Reveal } from "@/components/motion/reveal";

export default function DashboardPage() {
  return (
    <PageContainer>
      <DashboardHero />

      <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
        <StatCards />

        {/* Верхний ряд: приветствие, каркас проекта, кезеңдер, BIO SCORE. */}
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-4">
          <Reveal>
            <ActiveProjects />
          </Reveal>
          <Reveal delay={0.05}>
            <ProjectStructure />
          </Reveal>
          <Reveal delay={0.1}>
            <ProjectStages />
          </Reveal>
          <Reveal delay={0.15}>
            <BioScoreCard />
          </Reveal>
        </div>

        {/* Нижний ряд превью: AI, QR, аналитика, рейтинг, сертификат. */}
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
          <Reveal>
            <AiPreview />
          </Reveal>
          <Reveal delay={0.05}>
            <QrPreview />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-2 xl:col-span-1">
            <AnalyticsPreview />
          </Reveal>
          <Reveal delay={0.15}>
            <TopProjects />
          </Reveal>
          <Reveal delay={0.2}>
            <CertificatePreview />
          </Reveal>
        </div>
      </div>
    </PageContainer>
  );
}
