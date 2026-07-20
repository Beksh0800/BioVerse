/**
 * PBL-проекты. Тексты взяты из материалов заказчика (_source/data.md).
 *
 * Все секции кроме базовых — необязательные: шаблон страницы проекта
 * рендерит только заполненные, поэтому короткий «Компост» и подробный
 * «Proteus» используют одну и ту же вёрстку.
 */

export type ProjectCategory = "Microbiology" | "Botany";

export type ProjectStage = {
  title: string;
  items?: string[];
};

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  categoryLabel: string;
  grade: string;
  duration: string;
  score: number;
  image: string;
  gallery?: string[];
  description?: string;
  goal?: string;
  researchQuestion?: string;
  hypothesis?: string;
  practice?: string[];
  studentTasks?: string[];
  stages?: ProjectStage[];
  workflow?: string[];
  research?: string[];
  comparison?: { title: string; items: string[] }[];
  equipment?: string[];
  safety?: string[];
  evaluation?: string[];
  realLife?: string[];
  illustration?: string[];
  expectedResult: string;
};

export const categoryLabels: Record<ProjectCategory, string> = {
  Microbiology: "Микробиология",
  Botany: "Ботаника",
};

export const projects: Project[] = [
  {
    id: "compost",
    title: "Компост жасау зертханасы",
    subtitle:
      "Органикалық қалдықтарды микроорганизмдер арқылы компостқа айналдыру",
    category: "Microbiology",
    categoryLabel: "Микробиология",
    grade: '9 "А" сынып',
    duration: "20 күн",
    score: 89,
    image: "/images/projects/compost.webp",
    description:
      "Бұл жоба органикалық қалдықтарды микроорганизмдердің көмегімен табиғи компостқа айналдыру процесін зерттеуге арналған. Оқушылар органикалық қалдықтардың ыдырауын бақылап, микроорганизмдердің рөлін тәжірибе жүзінде зерттейді.",
    practice: [
      "🥕 Көкөніс қалдықтары",
      "🍂 Жапырақтар",
      "🪱 Жауынқұрттар",
      "🧫 Бактериялар",
    ],
    studentTasks: [
      "Компост жасау",
      "Температураны өлшеу",
      "Ылғалдылықты бақылау",
      "Иісті салыстыру",
      "Ыдырау уақытын есептеу",
    ],
    illustration: ["Қазіргі оқушы", "Ежелгі диқан", "Үлкен компост үйіндісі"],
    expectedResult:
      "Оқушылар микроорганизмдердің органикалық қалдықтарды ыдыратудағы маңызын түсінеді және компост жасау технологиясын меңгереді.",
  },
  {
    id: "seed-storage",
    title: "Ежелгі тұқым сақтау әдісі",
    subtitle: "Тұқымның өнгіштігіне сақтау жағдайының әсері",
    category: "Botany",
    categoryLabel: "Ботаника",
    grade: '7 "Б" сынып',
    duration: "14 күн",
    score: 91,
    image: "/images/projects/seeds.webp",
    description:
      "Бұл жоба ежелгі және қазіргі тұқым сақтау әдістерін салыстыруға арналған.",
    practice: [
      "Ежелгі адамдар тұқымды қыш құмырада сақтайды.",
      "Қазіргі оқушы герметикалық контейнер қолданады.",
      "Екі әдістің нәтижелері салыстырылады.",
    ],
    comparison: [
      { title: "Ежелгі әдіс", items: ["Қыш құмыра", "Табиғи орта"] },
      { title: "Қазіргі әдіс", items: ["Герметикалық контейнер", "Заманауи сақтау"] },
    ],
    expectedResult:
      "Оқушылар тұқым сақтау жағдайының өнгіштікке әсерін анықтайды.",
  },
  {
    id: "fermentation",
    title: "Ашыту процесіндегі микроорганизмдердің рөлі",
    category: "Microbiology",
    categoryLabel: "Микробиология",
    grade: '9 "А" сынып',
    duration: "72 сағат",
    score: 88,
    image: "/images/projects/fermentation.webp",
    gallery: [
      "/images/projects/fermentation-history.webp",
      "/images/projects/fermentation-ancient.webp",
    ],
    description:
      "Ашыту процесінде микроорганизмдердің рөлі тәжірибе арқылы зерттеледі.",
    workflow: [
      "Ежелгі шебер",
      "Қазіргі зертхана",
      "Ашытқы",
      "Газ бөлінуі",
      "Температура",
    ],
    research: [
      "Ашытқының белсенділігі",
      "Газ бөлінуі",
      "Температура өзгерісі",
      "Ашыту процесі",
    ],
    expectedResult:
      "Оқушылар ашыту процесіндегі микроорганизмдердің маңызын түсінеді.",
  },
  {
    id: "proteus",
    title: "Протей микроорганизмінің биологиялық ерекшеліктерін зерттеу",
    subtitle: "Proteus spp.",
    category: "Microbiology",
    categoryLabel: "Микробиология",
    grade: '8 "В" сынып',
    duration: "48 сағат",
    score: 93,
    image: "/images/projects/proteus.webp",
    goal:
      "Протей бактериясының морфологиялық және физиологиялық ерекшеліктерін зерттеу.",
    researchQuestion:
      "Протей бактериясы органикалық заттардың ыдырауына қалай әсер етеді?",
    hypothesis:
      "Егер Proteus бактериясына қолайлы температура мен ылғалдылық қамтамасыз етілсе, онда ол органикалық заттарды жылдам ыдыратады.",
    stages: [
      {
        title: "Үлгіні дайындау",
        items: ["Қоректік орта", "Петри табақшасы", "Стерильді құралдар"],
      },
      { title: "Инкубация", items: ["35–37°C", "24–48 сағат"] },
      {
        title: "Бақылау",
        items: ["Колония саны", "Түсі", "Пішіні", "Иісі", "Өсу жылдамдығы"],
      },
      {
        title: "Микроскоп",
        items: ["Жасуша пішіні", "Қозғалғыштығы", "Орналасуы"],
      },
      { title: "Талдау", items: ["Диаграмма", "Өсу қарқыны", "Қорытынды"] },
    ],
    practice: [
      "Петри табақшасы",
      "Температура бақылауы",
      "Колонияларды салыстыру",
      "Микроскоп",
      "Зерттеу күнделігі",
    ],
    equipment: [
      "Петри табақшасы",
      "Қоректік орта",
      "Инокуляциялық ілмек",
      "Микроскоп",
      "Инкубатор",
      "Қолғап",
      "Спирт",
      "Дезинфекциялау ерітіндісі",
    ],
    safety: [
      "Зертханалық халат",
      "Қолғап",
      "Петри табақшасын ашық қалдырмау",
      "Залалсыздандыру",
      "Қол жуу",
    ],
    realLife: [
      "Органикалық қалдықтарды ыдыратады",
      "Санитарлық микробиологияда қолданылады",
      "Тағам қауіпсіздігі",
      "Медицина",
    ],
    expectedResult:
      "Оқушылар микробиологияны түсінеді, тәжірибе жүргізеді, диаграмма жасайды және ғылыми қорытынды шығарады.",
  },
  {
    id: "photosynthesis",
    title:
      "Өсімдіктерге әртүрлі жарық түстерінің фотосинтез қарқындылығына әсері",
    category: "Botany",
    categoryLabel: "Ботаника",
    grade: '7 "А" сынып',
    duration: "21 күн",
    score: 90,
    image: "/images/projects/photosynthesis.webp",
    goal: "Әртүрлі жарық түстерінің фотосинтезге әсерін зерттеу.",
    researchQuestion: "Қай түсті жарық фотосинтезге тиімді?",
    hypothesis: "Қызыл және көк жарық өсімдіктің өсуін күшейтеді.",
    practice: [
      "Бірдей өсімдіктер",
      "Түрлі түсті LED",
      "Биіктікті өлшеу",
      "Жапырақты бақылау",
      "Күнделік жүргізу",
    ],
    equipment: [
      "Өсімдіктер",
      "LED шамдар",
      "Сызғыш",
      "Су",
      "Құмыралар",
      "Зерттеу дәптері",
      "Смартфон",
    ],
    stages: [
      { title: "Дайындық" },
      { title: "Жарық беру" },
      { title: "Бақылау" },
      { title: "Талдау" },
      { title: "Қорытынды" },
    ],
    evaluation: [
      "Биіктігі",
      "Жапырақ саны",
      "Жапырақ түсі",
      "Сабақ жуандығы",
      "Өсу жылдамдығы",
      "Фотосинтез",
    ],
    realLife: ["Жылыжай", "Гидропоника", "Vertical Farm", "Smart Agriculture"],
    expectedResult:
      "Оқушылар фотосинтезді түсінеді, тәжірибе жүргізеді, нәтижелерді талдайды және ғылыми қорытынды жасайды.",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
