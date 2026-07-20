import { portfolioProject } from "./portfolio";

/**
 * Демонстрационный сертификат.
 *
 * Базы данных в проекте нет, поэтому страница проверки по QR показывает
 * именно эту запись — какой бы номер ни стоял в адресе. Для показа
 * методики этого достаточно: посетитель сканирует код и видит рабочий
 * сценарий «проверил подлинность → скачал PDF».
 */
export const demoCertificate = {
  name: "Аружан Серікқызы",
  grade: portfolioProject.grade,
  project: portfolioProject.title,
  number: "BV-2026-0147",
  score: portfolioProject.score,
  supervisor: portfolioProject.supervisor,
};

export type CertificateData = {
  name: string;
  grade: string;
  project: string;
  number: string;
  date: string;
};
