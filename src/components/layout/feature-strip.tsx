import { featureStrip } from "@/content/site";
import { Icon } from "@/components/ui/icon";

/** Нижняя тёмно-синяя полоса возможностей — из UI-референса. */
export function FeatureStrip() {
  return (
    <footer className="no-print mt-12 bg-navy-900">
      <div className="mx-auto grid max-w-[1400px] gap-x-6 gap-y-5 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-6">
        {featureStrip.map((feature) => (
          <div key={feature.label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
              <Icon name={feature.icon} className="size-5" />
            </span>
            <span className="text-sm leading-snug font-medium text-navy-100">
              {feature.label}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-5 text-xs text-navy-300 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            BIOVERSE — Зертте. Жаса. Бағала. Дамы.
          </span>
          <span>Daryn Teacher Prize байқауына арналған демонстрациялық платформа</span>
        </div>
      </div>
    </footer>
  );
}
