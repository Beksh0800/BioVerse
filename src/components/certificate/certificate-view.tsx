"use client";

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CertificateData } from "@/content/certificate";
import { useCertificateSheet } from "./certificate-sheet";

/**
 * Просмотр сертификата по QR-коду: лист плюс кнопка скачивания.
 * Кнопка продублирована сверху — на телефоне лист занимает весь экран,
 * и до нижней кнопки пришлось бы листать.
 */
export function CertificateView({ data }: { data: CertificateData }) {
  const { sheet, download, busy } = useCertificateSheet(data);

  const button = (
    <Button onClick={download} disabled={busy} size="lg" className="w-full sm:w-auto">
      {busy ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Дайындалуда…
        </>
      ) : (
        <>
          <Download className="size-4" />
          Сертификатты PDF жүктеу
        </>
      )}
    </Button>
  );

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="no-print">{button}</div>
      {sheet}
      <div className="no-print flex justify-center">{button}</div>
    </div>
  );
}
