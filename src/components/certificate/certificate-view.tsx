"use client";

import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CertificateData } from "@/content/certificate";
import { useCertificateSheet } from "./certificate-sheet";

/**
 * Просмотр сертификата по QR-коду: лист плюс кнопка скачивания.
 *
 * Кнопка только под бланком, а не продублирована и сверху: скачивают после
 * того, как увидели сам сертификат, а не раньше.
 */
export function CertificateView({ data }: { data: CertificateData }) {
  const { sheet, download, busy } = useCertificateSheet(data);

  return (
    <div className="space-y-4 sm:space-y-5">
      {sheet}
      <div className="no-print flex justify-center">
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
      </div>
    </div>
  );
}
