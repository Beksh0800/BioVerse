import { cn } from "@/lib/utils";

type Tone = "brand" | "leaf" | "amber" | "muted" | "onDark";

const tones: Record<Tone, string> = {
  brand: "bg-navy-50 text-navy-700 ring-navy-100",
  leaf: "bg-green-50 text-green-700 ring-green-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  muted: "bg-slate-100 text-slate-600 ring-slate-200",
  onDark: "bg-white/12 text-white ring-white/25",
};

export function Badge({
  tone = "brand",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
