import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Склеивает классы и разрешает конфликты Tailwind в пользу последнего. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Числа в казахской нотации: неразрывный пробел между разрядами,
 * запятая перед дробной частью.
 *
 * Форматируем вручную, а не через toLocaleString: набор ICU-данных в Node
 * и в браузере может отличаться, из-за чего разметка сервера и клиента
 * расходится и React роняет гидратацию на счётчиках.
 */
export function formatNumber(value: number, decimals = 0) {
  const fixed = Math.abs(value).toFixed(decimals);
  const [whole, fraction] = fixed.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const sign = value < 0 ? "−" : "";
  return fraction ? `${sign}${grouped},${fraction}` : `${sign}${grouped}`;
}
