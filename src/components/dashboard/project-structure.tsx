import { projectStructure, projectStages } from "@/content/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** «Жобаңыздың құрылымы» — каркас PBL-проекта из пяти шагов. */
export function ProjectStructure() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Жобаңыздың құрылымы</CardTitle>
        <p className="mt-1 text-sm text-muted">
          PBL жобасын бірнеше қадамға жоспарлаңыз
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-0">
        <ol className="flex-1 space-y-3.5">
          {projectStructure.map((item) => (
            <li key={item.step} className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-brand">
                <Icon name={item.icon} className="size-[18px]" />
              </span>
              <span className="text-sm font-medium text-navy-900">
                {item.step}. {item.label}
              </span>
            </li>
          ))}
        </ol>
        <ButtonLink href="/projects" className="mt-5 w-full">
          Жоба құру
        </ButtonLink>
      </CardContent>
    </Card>
  );
}

const statusStyles = {
  done: { dot: "bg-leaf text-white", text: "text-leaf" },
  active: { dot: "bg-amber-500 text-white", text: "text-amber-600" },
  waiting: { dot: "bg-slate-100 text-slate-400", text: "text-muted" },
} as const;

/** «Жоба кезеңдері» — таймлайн текущего проекта. */
export function ProjectStages() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle>Жоба кезеңдері</CardTitle>
        <p className="mt-1 text-sm text-muted">Өсімдіктердің фотосинтезі</p>
      </CardHeader>
      <CardContent className="pt-0">
        <ol className="relative space-y-4">
          {projectStages.map((stage, i) => {
            const style = statusStyles[stage.status];
            const isLast = i === projectStages.length - 1;
            return (
              <li key={stage.step} className="relative flex items-center gap-3">
                {!isLast && (
                  <span
                    className="absolute top-8 left-[15px] h-[calc(100%-14px)] w-px bg-hairline"
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    style.dot,
                  )}
                >
                  {stage.status === "done" ? (
                    <Check className="size-4" strokeWidth={3} />
                  ) : (
                    stage.step
                  )}
                </span>
                <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                  <span className="text-sm leading-snug font-medium text-navy-900">
                    {stage.step}. {stage.label}
                  </span>
                  <span className={cn("shrink-0 text-xs font-semibold", style.text)}>
                    {stage.statusLabel}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
