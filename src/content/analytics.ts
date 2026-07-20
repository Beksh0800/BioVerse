/** Демонстрационные данные раздела «Аналитика». */

/** Динамика среднего балла по неделям (как в UI-референсе). */
export const weeklyProgress = [
  { week: "1 апта", score: 60 },
  { week: "2 апта", score: 75 },
  { week: "3 апта", score: 58 },
  { week: "4 апта", score: 80 },
  { week: "5 апта", score: 90 },
  { week: "6 апта", score: 88 },
  { week: "7 апта", score: 95 },
];

/** Количество проектов и средний балл по классам. */
export const byGrade = [
  { grade: "7 сынып", projects: 5, average: 86 },
  { grade: "8 сынып", projects: 4, average: 89 },
  { grade: "9 сынып", projects: 6, average: 91 },
  { grade: "10 сынып", projects: 2, average: 84 },
  { grade: "11 сынып", projects: 1, average: 93 },
];

/** Распределение по направлениям. */
export const byCategory = [
  { name: "Микробиология", value: 8, color: "#1d4ed8" },
  { name: "Ботаника", value: 6, color: "#16a34a" },
  { name: "Экология", value: 3, color: "#f59e0b" },
  { name: "Физиология", value: 1, color: "#7c3aed" },
];

/** Средние баллы по критериям BIO SCORE — радар. */
export const criteriaAverage = [
  { criterion: "Ғылыми дәлдік", score: 89 },
  { criterion: "Эксперимент", score: 85 },
  { criterion: "Шығармашылық", score: 92 },
  { criterion: "Командалық жұмыс", score: 84 },
  { criterion: "Қорғау", score: 87 },
  { criterion: "Экологиялық әсер", score: 88 },
];

/** Рейтинг — блок «Үздік жобалар». */
export const ranking = [
  { place: 1, title: "Қалдық суды биологиялық тазарту", grade: '9 "А" сынып', score: 95 },
  { place: 2, title: "Пластиктің табиғатқа әсері", grade: '8 "В" сынып', score: 93 },
  { place: 3, title: "Микроорганизмдердің әсері", grade: '8 "В" сынып', score: 91 },
  { place: 4, title: "Өсімдіктердегі фотосинтез", grade: '7 "А" сынып', score: 90 },
  { place: 5, title: "Ежелгі тұқым сақтау әдісі", grade: '7 "Б" сынып', score: 89 },
];

/** Сводные показатели наверху страницы. */
export const analyticsKpi = [
  { label: "Барлық жобалар", value: 18, hint: "Оқу жылы бойынша" },
  { label: "Аяқталған жобалар", value: 11, hint: "Қорғаудан өтті" },
  { label: "Қатысушы оқушылар", value: 64, hint: "7–11 сыныптар" },
  { label: "Орташа BIO SCORE", value: 87.4, decimals: 1, hint: "100 балдық жүйе" },
];
