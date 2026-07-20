"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { author } from "@/content/author";
import type { CertificateData } from "@/content/certificate";
import { exportNodeToPdf } from "@/lib/pdf";
import { certificateLink } from "@/lib/certificate-link";
import { QrCode } from "@/components/qr-code";
import { Seal } from "./seal";

/**
 * Бланк сертификата и его выгрузка в PDF.
 *
 * Вынесен отдельно, потому что используется дважды: на странице выписки
 * (с редактором полей) и на странице проверки, которая открывается
 * сканированием QR-кода. Оба места показывают один и тот же лист.
 *
 * Печатная область собрана на инлайновых стилях с hex-цветами: Tailwind v4
 * задаёт палитру в oklch, а html2canvas такой формат не разбирает и падает
 * при экспорте.
 */

/**
 * Замер нужен до первой отрисовки, иначе лист успевает мигнуть в полную
 * ширину. На сервере useLayoutEffect не выполняется и React пишет об этом
 * предупреждение, поэтому там подменяем его на useEffect.
 */
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

const NAVY = "#0b2a5b";
const BRAND = "#1d4ed8";
const GOLD = "#b8860b";
const GOLD_SOFT = "#f0e0b8";
const MUTED = "#64748b";

/** Ширина макета сертификата в px — фиксирована ради предсказуемого PDF. */
const SHEET_WIDTH = 1000;

/**
 * Левый край логотипа в верхней части бланка, в координатах нижней строки
 * (0 = левый край самой этой строки, а не золотой рамки целиком — они не
 * совпадают из-за paddingLeft строки).
 *
 * Логотип центрируется по ширине страницы и имеет фиксированный размер
 * (высота 46px даёт ширину 291px при исходных пропорциях 900×200), поэтому
 * его левый край — постоянное число при неизменной вёрстке, а не то, что
 * выводится из flex-раскладки других элементов. Измерено на отрисованном
 * бланке при масштабе 1:1 (важно — на суженном экране сертификат
 * отображается через CSS-transform: scale, и координаты в devtools там
 * будут другими); если поменяются паддинги золотой рамки или высота
 * логотипа, значение нужно перемерить.
 */
const LOGO_LEFT = 269;

/** Дата в формате 25.05.2026. */
export function formatDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
}

/**
 * Возвращает готовый к вставке лист и функцию скачивания.
 *
 * Хук, а не компонент с ref: кнопке «PDF жүктеу» нужно состояние `busy`,
 * а через императивный handle оно не вызвало бы перерисовку родителя.
 */
export function useCertificateSheet(data: CertificateData) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [scale, setScale] = useState(1);

  /*
    Лист всегда рисуется в 1000 px, иначе пропорции рамки и подписей поплывут,
    а PDF будет разного размера при разной ширине окна. Поэтому вписываем его
    трансформацией под ширину колонки, а на экспорт уходит исходный
    неотмасштабированный узел.

    Масштаб не ограничен единицей сверху: на широком экране колонка (а на
    странице проверки — та же ширина, что у карточки с данными над листом)
    шире 1000px, и без масштабирования вверх лист выглядел бы мельче своего
    контейнера, а его правый край не совпадал бы с правым краем соседних
    карточек. Верхнего предела масштабу нарочно не ставим: сама колонка
    ограничена шириной страницы (PageContainer, 1400px), так что безудержно
    вырасти на сверхширoких мониторах листу всё равно негде.
  */
  useIsomorphicLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const fit = () => {
      const available = frame.clientWidth;
      setScale(available > 0 ? available / SHEET_WIDTH : 1);
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  async function download() {
    if (!sheetRef.current || busy) return;
    setBusy(true);

    // html2canvas читает геометрию с учётом transform родителя и снял бы лист
    // в экранном масштабе, а обрезка обёртки могла бы срезать его края.
    // На время съёмки возвращаем 1:1 и снимаем клип, затем восстанавливаем.
    const scaler = scalerRef.current;
    const frame = frameRef.current;
    const prevTransform = scaler?.style.transform ?? "";
    const prevOverflow = frame?.style.overflow ?? "";
    if (scaler) scaler.style.transform = "scale(1)";
    if (frame) frame.style.overflow = "visible";

    try {
      const safeName = data.name.trim().replace(/\s+/g, "-") || "sertifikat";
      await exportNodeToPdf(sheetRef.current, `BIOVERSE-${safeName}.pdf`);
    } catch {
      alert("PDF жасау кезінде қате шықты. Бетті жаңартып, қайта көріңіз.");
    } finally {
      if (scaler) scaler.style.transform = prevTransform;
      if (frame) frame.style.overflow = prevOverflow;
      setBusy(false);
    }
  }

  /*
    transform: scale уменьшает лист только визуально — в потоке он
    по-прежнему занимает свои 1000 px и растягивает страницу вбок.
    Поэтому обёртке задаём реальную высоту после масштаба, minWidth: 0
    (иначе элемент грида растянется под содержимое) и прячем вылет.
  */
  const sheet = (
    <div
      ref={frameRef}
      style={{
        height: (SHEET_WIDTH / 1.414) * scale,
        width: "100%",
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      <div
        ref={scalerRef}
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <div
          ref={sheetRef}
          style={{
            width: SHEET_WIDTH,
            aspectRatio: "1.414 / 1",
            backgroundColor: "#ffffff",
            padding: 18,
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            boxShadow: "0 8px 40px rgba(11,42,91,0.14)",
          }}
        >
          <SheetBody data={data} />
        </div>
      </div>
    </div>
  );

  return { sheet, download, busy };
}

function SheetBody({ data }: { data: CertificateData }) {
  return (
    /* Двойная рамка */
    <div
      style={{
        height: "100%",
        border: `3px solid ${NAVY}`,
        padding: 8,
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          border: `1px solid ${GOLD}`,
          /*
            Высота листа фиксирована пропорцией, а контейнер клипует вылет.
            Поэтому нижний отступ — компромисс: слишком маленький прижимает
            QR к краю, слишком большой съедает высоту, и код обрезается
            снизу вместе с угловым маркером (тогда он перестаёт читаться).
            Значение подобрано и проверено сканированием растра PDF.

            Вертикальный бюджет здесь тесный: печать увеличена, а нижняя
            строка (номер/девиз/QR) отодвинута ниже по просьбе с демо-данными
            (data.name = «Аружан Серікқызы», demoCertificate.project) запас
            около нуля. У заметно более длинных ФИО или названия проекта
            (2 строки вместо 1) этого запаса уже не хватает, и лишнее будет
            обрезано вместе с overflow: hidden ниже — включая, в худшем
            случае, QR. Проверять командой из README после правки любых
            размеров или самих демо-данных:
              node _source/test-render.mjs && node _source/test-qr-print.mjs
          */
          padding: "18px 62px 62px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Золотые уголки по всем четырём углам. */}
        {[
          { top: 16, left: 16, borderWidth: "2px 0 0 2px" },
          { top: 16, right: 16, borderWidth: "2px 2px 0 0" },
          { bottom: 16, left: 16, borderWidth: "0 0 2px 2px" },
          { bottom: 16, right: 16, borderWidth: "0 2px 2px 0" },
        ].map((pos, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              width: 36,
              height: 36,
              borderStyle: "solid",
              borderColor: GOLD,
              ...pos,
            }}
          />
        ))}

        <Image
          src="/images/logo-mark.webp"
          alt="BIOVERSE"
          width={900}
          height={200}
          style={{ height: 42, width: "auto" }}
          priority
        />

        <p
          style={{
            marginTop: 6,
            fontSize: 11,
            letterSpacing: "0.16em",
            color: MUTED,
            textTransform: "uppercase",
          }}
        >
          PBL Ecosystem
        </p>

        <h2
          style={{
            marginTop: 8,
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: "0.14em",
            color: NAVY,
          }}
        >
          СЕРТИФИКАТ
        </h2>

        <div
          style={{
            marginTop: 8,
            width: 120,
            height: 3,
            backgroundColor: GOLD,
            borderRadius: 999,
          }}
        />

        <p style={{ marginTop: 10, fontSize: 15, color: MUTED }}>Бұл сертификат</p>

        <p
          style={{
            marginTop: 8,
            fontSize: 32,
            fontWeight: 800,
            color: BRAND,
            borderBottom: `2px solid ${GOLD_SOFT}`,
            paddingBottom: 8,
            minWidth: 420,
          }}
        >
          {data.name || "—"}
        </p>

        <p style={{ marginTop: 8, fontSize: 14, color: MUTED }}>{data.grade}</p>

        <p
          style={{
            marginTop: 8,
            fontSize: 15,
            color: NAVY,
            maxWidth: 660,
            lineHeight: 1.6,
          }}
        >
          «<strong>{data.project}</strong>» атты PBL жобасын BIOVERSE әдістемесі
          бойынша табысты орындағаны және ғылыми-зерттеу дағдыларын меңгергені
          үшін беріледі.
        </p>

        {/* Реквизиты: учитель, печать, дата */}
        <div
          style={{
            marginTop: "auto",
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* Имя учителя над линией, должность — подписью под ней.
              Устроено так же, как блок даты справа. */}
          <div style={{ textAlign: "center", minWidth: 210 }}>
            <div
              style={{
                height: 42,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
              }}
            >
              <span style={{ fontSize: 17, fontWeight: 700, color: NAVY }}>
                {author.fullName}
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: MUTED,
                borderTop: `1px solid ${MUTED}`,
                paddingTop: 6,
              }}
            >
              {author.role}
            </p>
          </div>

          {/* Печать чуть приподнята — так она читается как оттиск
              поверх бланка, а не как элемент строки с реквизитами. */}
          <div style={{ marginBottom: 8 }}>
            <Seal size={100} />
          </div>

          <div style={{ textAlign: "center", minWidth: 210 }}>
            <div
              style={{
                height: 42,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                paddingBottom: 4,
              }}
            >
              <span style={{ fontSize: 17, fontWeight: 700, color: NAVY }}>
                {data.date}
              </span>
            </div>
            <p
              style={{
                fontSize: 12,
                color: MUTED,
                borderTop: `1px solid ${MUTED}`,
                paddingTop: 6,
              }}
            >
              Берілген күні
            </p>
          </div>
        </div>

        {/* Нижняя строка: номер, девиз и QR проверки подлинности.

            position: relative — точка отсчёта для девиза ниже: он выровнен
            не по центру строки, а строго по левому краю логотипа сверху,
            для чего его позиция задана в тех же координатах контентной
            области, что и у логотипа (см. LOGO_LEFT). */}
        <div
          style={{
            marginTop: 18,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            position: "relative",
          }}
        >
          <span
            style={{
              fontSize: 13,
              letterSpacing: "0.06em",
              color: MUTED,
              minWidth: 150,
              textAlign: "left",
            }}
          >
            № {data.number}
          </span>

          {/* Логотип наверху рендерится по центру страницы своей фиксированной
              шириной (291px при высоте 46px), поэтому его левый край — число
              постоянное для этой вёрстки, а не то, что можно выразить через
              text-align/margin у соседних flex-элементов. Измерено один раз
              и зафиксировано, как и остальные пиксельные размеры бланка. */}
          <span
            style={{
              position: "absolute",
              left: LOGO_LEFT,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 13,
              color: MUTED,
              whiteSpace: "nowrap",
            }}
          >
            BIOVERSE — Зертте. Жаса. Бағала. Дамы.
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 170,
              justifyContent: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: 11,
                lineHeight: 1.35,
                color: MUTED,
                textAlign: "right",
                maxWidth: 100,
              }}
            >
              Сертификатты тексеру және жүктеу үшін сканерлеңіз
            </span>
            {/* Код ведёт на страницу этого же сертификата: посетитель
                сканирует, видит документ и скачивает PDF.

                Все поля бланка едут в самом адресе (см. certificate-link):
                базы данных нет, и без этого страница проверки показывала бы
                демонстрационные имя, класс и проект, а не те, что напечатаны
                на листе.

                Размер выбран так, чтобы на печатном A4 модули оставались
                различимыми для камеры телефона. Запас проверяется в
                _source/test-qr-print.mjs — его стоит прогонять после любой
                правки состава полей. */}
            <QrCode path={certificateLink(data)} size={116} showLogo={false} />
          </span>
        </div>
      </div>
    </div>
  );
}
