import type { CertificateData } from "@/content/certificate";

/**
 * Упаковка данных сертификата в адрес QR-кода.
 *
 * Базы данных в проекте нет, поэтому всё, что показывает страница проверки,
 * должно приехать в самой ссылке. Иначе бланк и страница расходятся: на
 * листе одно имя, а после сканирования — демонстрационное.
 *
 * Данные пакуются в base64url, а не раскладываются по обычным параметрам.
 * Причина — размер кода. Казахские буквы в адресе кодируются по 6 символов
 * каждая (`%D3%A8`), и открытый вид давал 69 модулей: на печатном A4 это
 * 0,36 мм на модуль, у самой границы читаемости для телефона. base64url
 * даёт 57 модулей и 0,44 мм — код читается с запасом.
 *
 * Кодирование и разбор держим в одном файле намеренно: они обязаны знать
 * один и тот же формат, а разъехавшись, сломают не сборку, а сценарий
 * «отсканировал и увидел свой документ» — то есть тихо.
 */

/** Порядок полей в упакованной строке. Менять только вместе с разбором. */
const FIELDS = ["date", "name", "grade", "project"] as const;

type Field = (typeof FIELDS)[number];

const SEPARATOR = "|";

/** Ограничение на поле — защита вёрстки страницы проверки от гигантских строк. */
const MAX_FIELD = 120;

/**
 * Убираем управляющие символы: перевод строки внутри поля ломает вёрстку
 * бланка, а невидимые символы делают имя на странице непохожим на имя
 * на листе при визуальном сравнении.
 */
function stripControl(text: string) {
  return [...text].filter((char) => char.charCodeAt(0) >= 32).join("");
}

function toBase64Url(text: string) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

/** Путь для QR: номер в адресе, остальные поля — упакованным параметром. */
export function certificateLink(data: CertificateData) {
  const packed = toBase64Url(
    // Разделитель внутри значения сдвинул бы все поля — заменяем его.
    FIELDS.map((key) => data[key].replace(/\|/g, "/")).join(SEPARATOR),
  );
  return `/certificate/${encodeURIComponent(data.number)}?c=${packed}`;
}

/**
 * Разбор параметра `c`.
 *
 * Значения попадают прямо на страницу, поэтому к содержимому адреса
 * относимся как к чужому вводу: битую строку отбрасываем целиком, а поля
 * подрезаем по длине и чистим от управляющих символов.
 */
export function readCertificateParams(
  raw: string | string[] | undefined,
): Partial<Record<Field, string>> {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string" || !/^[A-Za-z0-9\-_]+$/.test(value)) return {};

  let decoded: string;
  try {
    decoded = fromBase64Url(value);
  } catch {
    return {};
  }

  const parts = decoded.split(SEPARATOR);
  if (parts.length !== FIELDS.length) return {};

  const result: Partial<Record<Field, string>> = {};
  FIELDS.forEach((key, i) => {
    const clean = stripControl(parts[i]).trim();
    if (clean) result[key] = clean.slice(0, MAX_FIELD);
  });
  return result;
}

/**
 * Дата из старого формата `?d=ДД.ММ.ГГГГ`.
 *
 * Нужна только для сертификатов, скачанных до перехода на упакованный
 * параметр: у них в коде лежит лишь дата. Когда такие PDF перестанут
 * встречаться, это можно убрать.
 */
export function readLegacyDate(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return null;
  return /^\d{2}\.\d{2}\.\d{4}$/.test(value) ? value : null;
}
