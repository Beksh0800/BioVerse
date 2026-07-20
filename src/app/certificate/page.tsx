import type { Metadata } from "next";
import { PageContainer, PageHeader } from "@/components/layout/app-shell";
import { Certificate } from "@/components/certificate/certificate";

export const metadata: Metadata = {
  title: "Сертификат",
  description:
    "PBL жобасын табысты орындаған оқушыға берілетін BIOVERSE сертификаты.",
};

export default function CertificatePage() {
  return (
    <PageContainer>
      <div className="no-print">
        <PageHeader
          eyebrow="Certificate"
          title="Электрондық сертификат"
          description="Жобаны табысты аяқтаған оқушыға берілетін BIOVERSE сертификаты. Деректерді толтырып, PDF форматында жүктеп алыңыз."
        />
      </div>
      <Certificate />
    </PageContainer>
  );
}
