import type { Metadata } from "next";
import { PageContainer, PageHeader } from "@/components/layout/app-shell";
import { AiChat } from "@/components/ai/chat";

export const metadata: Metadata = {
  title: "AI көмекшісі",
  description:
    "Биология және PBL жобалары бойынша қазақ тілінде жауап беретін AI көмекшісі.",
};

export default function AiPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="AI Assistant"
        title="AI көмекшісі"
        description="Биология бойынша сұрақ қойыңыз, гипотеза құрыңыз, зерттеу жоспарын жасаңыз немесе жоба қорытындысын тексертіңіз. Көмекші қазақ тілінде жауап береді."
      />
      <AiChat />
    </PageContainer>
  );
}
