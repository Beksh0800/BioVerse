"use client";

import { useEffect, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoCertificate } from "@/content/certificate";
import { portfolioProject } from "@/content/portfolio";
import { formatDate, useCertificateSheet } from "./certificate-sheet";

/** Страница выписки сертификата: редактор полей плюс живой предпросмотр. */
export function Certificate() {
  const [fields, setFields] = useState({
    name: demoCertificate.name,
    grade: demoCertificate.grade,
    project: demoCertificate.project,
    number: demoCertificate.number,
  });

  // Дата живёт отдельно от остальных полей: у неё другая логика начального
  // значения — она подставляется уже в браузере (см. эффект ниже).
  const [date, setDate] = useState(portfolioProject.date);

  /*
    Дата выдачи — сегодняшняя: сертификат выписывается в момент показа.
    Подставляем её после монтирования, а не при инициализации состояния:
    на сервере и в браузере «сегодня» может отличаться часовым поясом,
    и React уронил бы гидратацию на несовпадении разметки.
    Поле остаётся редактируемым — дату можно поставить любую.
  */
  useEffect(() => {
    queueMicrotask(() => setDate(formatDate(new Date())));
  }, []);

  const { sheet, download, busy } = useCertificateSheet({ ...fields, date });

  return (
    <div className="grid gap-4 sm:gap-5 xl:grid-cols-[320px_1fr]">
      {/* Редактор полей — на защите сертификат выписывается вживую */}
      <Card className="no-print h-fit">
        <CardHeader className="pb-3">
          <CardTitle>Сертификат деректері</CardTitle>
          <p className="mt-1 text-sm text-muted">
            Өрістерді толтырыңыз — сертификат бірден жаңарады
          </p>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {[
            { key: "name" as const, label: "Оқушының аты-жөні" },
            { key: "grade" as const, label: "Сынып" },
            { key: "project" as const, label: "Жоба атауы" },
            { key: "number" as const, label: "Сертификат нөмірі" },
          ].map((field) => (
            <label key={field.key} className="block">
              <span className="mb-1.5 block text-xs font-semibold text-navy-900">
                {field.label}
              </span>
              <input
                value={fields[field.key]}
                onChange={(e) => {
                  const { value } = e.target;
                  setFields((current) => ({ ...current, [field.key]: value }));
                }}
                className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm text-navy-900 ring-1 ring-hairline transition outline-none focus:bg-white focus:ring-2 focus:ring-brand"
              />
            </label>
          ))}

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-navy-900">
              Берілген күні
            </span>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm text-navy-900 ring-1 ring-hairline transition outline-none focus:bg-white focus:ring-2 focus:ring-brand"
            />
            <span className="mt-1 block text-[11px] text-muted">
              Бетті ашқанда бүгінгі күн қойылады
            </span>
          </label>

          <Button onClick={download} disabled={busy} className="w-full" size="lg">
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Дайындалуда…
              </>
            ) : (
              <>
                <Download className="size-4" />
                PDF жүктеу
              </>
            )}
          </Button>
          <p className="text-center text-[11px] text-muted">
            Бланктегі QR код осы сертификаттың бетіне сілтейді
          </p>
        </CardContent>
      </Card>

      {sheet}
    </div>
  );
}
