import { dashboardStats } from "@/content/site";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const toneClass = {
  ink: "text-navy-900",
  leaf: "text-leaf",
  brand: "text-brand",
} as const;

/** Четыре счётчика в верхней части дашборда. */
export function StatCards() {
  return (
    <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StaggerItem key={stat.label}>
          <Card className="h-full p-4 sm:p-5">
            <p className="text-xs font-medium text-muted sm:text-sm">{stat.label}</p>
            <p
              className={`mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl ${
                toneClass[stat.tone]
              }`}
            >
              <CountUp
                value={stat.value}
                decimals={"decimals" in stat ? stat.decimals : 0}
              />
            </p>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
