/**
 * BIO SCORE — авторская система оценки PBL-проектов.
 * Шесть критериев, каждый до 100 баллов; итог — среднее взвешенное.
 */

export type Criterion = {
  key: string;
  label: string;
  score: number;
  weight: number;
  color: string;
  description: string;
};

export const criteria: Criterion[] = [
  {
    key: "accuracy",
    label: "Ғылыми дәлдік",
    score: 92,
    weight: 20,
    color: "#1d4ed8",
    description:
      "Жобадағы биологиялық ұғымдардың дұрыстығы, дереккөздердің сенімділігі және терминология сауаттылығы.",
  },
  {
    key: "experiment",
    label: "Эксперимент",
    score: 88,
    weight: 20,
    color: "#7c3aed",
    description:
      "Тәжірибенің жоспарлануы, өлшеулердің дәлдігі, бақылау тобының болуы және нәтиженің қайталанғыштығы.",
  },
  {
    key: "creativity",
    label: "Шығармашылық",
    score: 95,
    weight: 15,
    color: "#f59e0b",
    description:
      "Мәселеге деген өзіндік көзқарас, идеяның жаңашылдығы және ұсынылған шешімнің тапқырлығы.",
  },
  {
    key: "teamwork",
    label: "Командалық жұмыс",
    score: 86,
    weight: 15,
    color: "#0ea5e9",
    description:
      "Топ ішіндегі рөлдердің бөлінуі, өзара жауапкершілік және бірлескен жұмыстың тиімділігі.",
  },
  {
    key: "defense",
    label: "Қорғау",
    score: 90,
    weight: 15,
    color: "#16a34a",
    description:
      "Нәтижені көрнекі әрі сенімді жеткізу, сұрақтарға дәлелді жауап беру, презентация сапасы.",
  },
  {
    key: "ecology",
    label: "Экологиялық әсер",
    score: 89,
    weight: 15,
    color: "#84cc16",
    description:
      "Жобаның қоршаған ортаға қатысты практикалық пайдасы және тұрақты дамуға қосқан үлесі.",
  },
];

/** Итоговый балл: среднее с учётом веса критерия. */
export const totalScore = Math.round(
  criteria.reduce((sum, c) => sum + c.score * c.weight, 0) /
    criteria.reduce((sum, c) => sum + c.weight, 0),
);

export const scoredProject = "Өсімдіктердің фотосинтезі";

/** Шкала уровней — как трактовать итоговый балл. */
export const scoreLevels = [
  {
    range: "90–100",
    label: "Үздік",
    tone: "leaf",
    text: "Жоба ғылыми тұрғыда толық негізделген, эксперимент дәл жүргізілген, нәтиже дәлелді.",
  },
  {
    range: "75–89",
    label: "Жақсы",
    tone: "brand",
    text: "Жоба сапалы орындалған, бірақ жекелеген критерийлер бойынша жетілдіру қажет.",
  },
  {
    range: "60–74",
    label: "Қанағаттанарлық",
    tone: "amber",
    text: "Негізгі талаптар орындалған, дегенмен эксперимент немесе талдау бөлігі әлсіз.",
  },
  {
    range: "0–59",
    label: "Жетілдіруді қажет етеді",
    tone: "muted",
    text: "Жобаны қайта қарап, зерттеу бөлігін тереңдету ұсынылады.",
  },
] as const;
