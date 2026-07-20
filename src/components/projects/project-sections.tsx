import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";

/** Крупная цитата-блок: цель, гипотеза, исследовательский вопрос. */
export function StatementBlock({
  icon,
  label,
  text,
  tone = "brand",
}: {
  icon: string;
  label: string;
  text: string;
  tone?: "brand" | "leaf" | "amber";
}) {
  const tones = {
    brand: "bg-navy-50 text-brand ring-navy-100",
    leaf: "bg-green-50 text-leaf ring-green-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
  }[tone];

  return (
    <Card className="h-full p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ring-1 ${tones}`}
        >
          <Icon name={icon} className="size-5" />
        </span>
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-muted uppercase">
            {label}
          </p>
          <p className="mt-1.5 leading-relaxed font-medium text-navy-900">{text}</p>
        </div>
      </div>
    </Card>
  );
}

/** Список пунктов с галочками — практика, оборудование, критерии. */
export function ChecklistSection({
  title,
  items,
  icon = "list",
  columns = 2,
}: {
  title: string;
  items: readonly string[];
  icon?: string;
  columns?: 1 | 2 | 3;
}) {
  const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" }[columns];

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <Icon name={icon} className="size-[18px] text-brand" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ul className={`grid gap-x-6 gap-y-2.5 ${cols}`}>
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 size-4 shrink-0 text-leaf"
                strokeWidth={3}
                aria-hidden
              />
              <span className="text-sm leading-snug text-navy-900">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

/** Нумерованные этапы исследования с вложенными пунктами. */
export function StagesSection({
  stages,
}: {
  stages: { title: string; items?: string[] }[];
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <Icon name="shield" className="size-[18px] text-brand" />
          Зерттеу кезеңдері
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ol className="relative space-y-5">
          {stages.map((stage, i) => (
            <li key={stage.title} className="relative flex gap-4">
              {i < stages.length - 1 && (
                <span
                  className="absolute top-9 left-[17px] h-[calc(100%+4px)] w-px bg-hairline"
                  aria-hidden
                />
              )}
              <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-1.5">
                <span className="block font-semibold text-navy-900">{stage.title}</span>
                {stage.items?.length ? (
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {stage.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-muted ring-1 ring-hairline"
                      >
                        {item}
                      </span>
                    ))}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

/** Горизонтальная цепочка процесса: ежелгі шебер → ... → температура. */
export function WorkflowSection({ steps }: { steps: readonly string[] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <Icon name="flask" className="size-[18px] text-brand" />
          Процесс
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap items-center gap-2">
          {steps.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-xl bg-navy-50 px-3 py-2 text-sm font-semibold text-navy-900">
                {step}
              </span>
              {i < steps.length - 1 && (
                <span className="text-brand" aria-hidden>
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/** Сравнение двух подходов: ежелгі және қазіргі әдіс. */
export function ComparisonSection({
  groups,
}: {
  groups: { title: string; items: string[] }[];
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2.5 text-base">
          <Icon name="list" className="size-[18px] text-brand" />
          Әдістерді салыстыру
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((group, i) => (
            <div
              key={group.title}
              className={`rounded-xl p-4 ring-1 ${
                i === 0
                  ? "bg-amber-50/60 ring-amber-100"
                  : "bg-navy-50/60 ring-navy-100"
              }`}
            >
              <p className="mb-2.5 text-sm font-bold text-navy-900">{group.title}</p>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/** Итоговый блок — всегда в конце страницы проекта. */
export function ExpectedResult({ text }: { text: string }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl bg-navy-900 p-6 sm:p-8">
        <div className="pointer-events-none absolute -top-16 -right-10 size-56 rounded-full bg-leaf/20 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.12em] text-navy-200 uppercase">
            Күтілетін нәтиже
          </p>
          <p className="mt-3 max-w-3xl leading-relaxed font-medium text-balance text-white sm:text-lg">
            {text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
