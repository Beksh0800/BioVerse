import type { Metadata } from "next";
import { PageContainer, PageHeader } from "@/components/layout/app-shell";
import { ProjectFilter } from "@/components/projects/project-filter";

export const metadata: Metadata = {
  title: "Жобалар",
  description:
    "BIOVERSE платформасындағы биология пәні бойынша PBL жобаларының каталогы.",
};

export default function ProjectsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="PBL Projects"
        title="Жобалар"
        description="Биология пәні бойынша орындалған жобалық жұмыстар. Әр жобаның мақсаты, гипотезасы, кезеңдері және күтілетін нәтижесі толық сипатталған."
      />
      <ProjectFilter />
    </PageContainer>
  );
}
