"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";

/**
 * QR-код портфолио и сертификата.
 *
 * Адрес берётся из `NEXT_PUBLIC_SITE_URL`, если переменная задана, и только
 * иначе — из адреса открытой страницы.
 *
 * Так сделано из-за сертификата. Его QR попадает в PDF, который распечатают
 * и отдадут на руки, поэтому ссылка должна пережить и смену окружения, и
 * следующий деплой. Без явного адреса код наследовал бы тот, откуда PDF
 * скачали: с локальной машины — `localhost` (по такой ссылке не откроется
 * ни у кого), с превью-деплоя Vercel — временный адрес вида
 * `...-git-main-xxx.vercel.app`, который меняется при каждом пуше.
 */
function resolveBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  // Хвостовой слэш убираем: `new URL` его и так учтёт, но в подписи под кодом
  // адрес выглядел бы с двойным слэшем.
  if (configured) return configured.replace(/\/+$/, "");
  return window.location.origin;
}

export function QrCode({
  path = "/portfolio",
  size = 220,
  className,
  showUrl = false,
  showLogo = true,
}: {
  path?: string;
  size?: number;
  className?: string;
  showUrl?: boolean;
  /** На мелких кодах (сертификат) логотип в центре лучше убрать — он съедает
   *  заметную долю площади и усложняет считывание с печатного листа. */
  showLogo?: boolean;
}) {
  // Адрес и картинка кода приходят одной парой: показывать URL раньше, чем
  // отрисован код, незачем, а обновлять состояние только из колбэка промиса
  // избавляет от лишнего каскада рендеров.
  const [code, setCode] = useState<{ dataUrl: string; target: string } | null>(null);

  useEffect(() => {
    let active = true;
    const url = new URL(path, resolveBaseUrl()).toString();

    QRCode.toDataURL(url, {
      // Рисуем сильно крупнее, чем показываем: код печатается в PDF и
      // сканируется камерой с листа, где экранного разрешения не хватает.
      width: Math.max(size * 4, 360),
      margin: 1,
      // Уровень H нужен только под логотипом в центре — он восполняет
      // перекрытую часть. Без логотипа H лишь добавляет модулей, каждый
      // из них становится мельче, и мелкий код читается хуже.
      errorCorrectionLevel: showLogo ? "H" : "M",
      color: { dark: "#0b2a5b", light: "#ffffff" },
    })
      .then((dataUrl) => active && setCode({ dataUrl, target: url }))
      .catch(() => active && setCode(null));

    return () => {
      active = false;
    };
  }, [path, size, showLogo]);

  return (
    <div className={className}>
      <div
        className="relative mx-auto overflow-hidden rounded-xl bg-white ring-1 ring-hairline"
        style={{ width: size, height: size }}
      >
        {code ? (
          <>
            <Image
              src={code.dataUrl}
              alt={`QR код: ${code.target}`}
              width={size}
              height={size}
              unoptimized
              className="size-full"
            />
            {showLogo && (
              <span className="absolute top-1/2 left-1/2 flex size-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-white p-1 ring-2 ring-white">
                <Image
                  src="/images/icon-mark.webp"
                  alt=""
                  width={64}
                  height={64}
                  className="size-full object-contain"
                />
              </span>
            )}
          </>
        ) : (
          <div className="size-full animate-pulse bg-slate-100" />
        )}
      </div>
      {showUrl && code ? (
        <p className="mt-2 text-center text-xs break-all text-muted">{code.target}</p>
      ) : null}
    </div>
  );
}
