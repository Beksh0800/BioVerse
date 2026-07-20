/**
 * Экспорт сертификата в PDF.
 *
 * Через растеризацию DOM, а не текстом jsPDF: встроенные шрифты jsPDF не
 * содержат казахских глифов (ә, ғ, қ, ң, ө, ұ, ү, і) и печатают их пустыми
 * квадратами. html2canvas отдаёт текст, уже отрисованный браузером, поэтому
 * шрифт сохраняется полностью.
 */
export async function exportNodeToPdf(node: HTMLElement, filename: string) {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(node, {
    scale: 2, // печатное качество вместо экранного
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
  });

  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Вписываем макет в лист целиком и центрируем — пропорции не искажаем.
  const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
  const width = canvas.width * ratio;
  const height = canvas.height * ratio;

  pdf.addImage(
    canvas.toDataURL("image/jpeg", 0.95),
    "JPEG",
    (pageWidth - width) / 2,
    (pageHeight - height) / 2,
    width,
    height,
  );

  pdf.save(filename);
}
