/**
 * Общие сведения о платформе и сводная статистика дашборда.
 * Данные демонстрационные — правятся здесь, вёрстку трогать не нужно.
 */

export const site = {
  name: "BIOVERSE",
  tagline: "Биология пәнінде PBL жобаларын кешенді бағалау платформасы",
  motto: "Зертте. Жаса. Бағала. Дамы.",
  fullTitle:
    "Биология пәнінде Project-Based Learning (PBL) жобаларын кешенді бағалаудың BIOVERSE авторлық жүйесі",
  competition: "Daryn Teacher Prize",
} as const;

/** Четыре счётчика в верхней части дашборда (см. UI-референс). */
export const dashboardStats = [
  { label: "Жалпы жобалар", value: 18, tone: "ink" },
  { label: "Белсенді жобалар", value: 7, tone: "leaf" },
  { label: "Оқушылар", value: 64, tone: "ink" },
  { label: "Орташа балл", value: 87.4, decimals: 1, tone: "brand" },
] as const;

/** Прогресс активных проектов — блок «Белсенді жобалар». */
export const activeProjects = [
  {
    title: "Өсімдіктердің фотосинтезі",
    group: '7 "А" сынып',
    progress: 76,
    href: "/projects/photosynthesis",
    image: "/images/projects/photosynthesis.webp",
  },
  {
    title: "Микроорганизмдердің әсері",
    group: '8 "В" сынып',
    progress: 45,
    href: "/projects/proteus",
    image: "/images/projects/proteus.webp",
  },
  {
    title: "Ашыту процесі және ашытқы",
    group: '9 "А" сынып',
    progress: 62,
    href: "/projects/fermentation",
    image: "/images/projects/fermentation.webp",
  },
] as const;

/** Каркас PBL-проекта — блок «Жобаңыздың құрылымы». */
export const projectStructure = [
  { step: 1, label: "Мәселе мен мақсат", icon: "target" },
  { step: 2, label: "Зерттеу сұрағы", icon: "help" },
  { step: 3, label: "Күтілетін нәтиже", icon: "sparkles" },
  { step: 4, label: "Бағалау критерийлері", icon: "list" },
  { step: 5, label: "Жоспар және кезеңдер", icon: "shield" },
] as const;

export type StageStatus = "done" | "active" | "waiting";

/** Таймлайн — блок «Жоба кезеңдері». */
export const projectStages: {
  step: number;
  label: string;
  status: StageStatus;
  statusLabel: string;
}[] = [
  { step: 1, label: "Идея және мәселе", status: "done", statusLabel: "Аяқталды" },
  { step: 2, label: "Зерттеу және гипотеза", status: "done", statusLabel: "Аяқталды" },
  { step: 3, label: "Эксперимент", status: "active", statusLabel: "Жүріп жатыр" },
  { step: 4, label: "Нәтижелерді талдау", status: "waiting", statusLabel: "Күтуде" },
  { step: 5, label: "Қорытынды және қорғау", status: "waiting", statusLabel: "Күтуде" },
];

/** Нижняя полоса возможностей на тёмно-синем фоне. */
export const featureStrip = [
  { icon: "clipboard", label: "PBL жобаларын оңай жоспарлау" },
  { icon: "star", label: "Кешенді бағалау және кері байланыс" },
  { icon: "bot", label: "AI көмекшісі арқылы қолдау" },
  { icon: "qr", label: "QR код арқылы портфолио жасау" },
  { icon: "trend", label: "Аналитика және даму динамикасы" },
  { icon: "award", label: "Оқушының ғылыми дамуын қадағалау" },
] as const;
