import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Логотип BIOVERSE: фирменный лист-знак + набранный текстом вордмарк.
 * Текстом, а не картинкой, потому что вордмарк нужен и белым (тёмный сайдбар),
 * и тёмно-синим (белые страницы) — одна растровая версия оба случая не закрывает.
 */
export function Logo({
  variant = "dark",
  size = "md",
  subtitle,
  className,
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  subtitle?: string;
  className?: string;
}) {
  const marks = {
    sm: { icon: 26, text: "text-lg", gap: "gap-2" },
    md: { icon: 34, text: "text-2xl", gap: "gap-2.5" },
    lg: { icon: 48, text: "text-4xl", gap: "gap-3" },
  }[size];

  const isLight = variant === "light";

  return (
    <div className={cn("flex flex-col", className)}>
      <div className={cn("flex items-center", marks.gap)}>
        {/*
          Знак идёт с белым фоном, поэтому обрезаем его по кругу: марка сама
          круглая, и на тёмно-синем сайдбаре это читается как белый медальон,
          а не как случайный светлый прямоугольник.
        */}
        <span
          className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white"
          style={{ width: marks.icon, height: marks.icon }}
        >
          <Image
            src="/images/icon-mark.webp"
            alt=""
            width={marks.icon}
            height={marks.icon}
            className="size-full object-cover"
            priority
          />
        </span>
        <span
          className={cn(
            "font-extrabold tracking-tight",
            marks.text,
            isLight ? "text-white" : "text-navy-900",
          )}
        >
          BIOVERSE
        </span>
      </div>
      {subtitle ? (
        <span
          className={cn(
            "mt-1 text-[11px] font-medium tracking-wide",
            isLight ? "text-navy-200" : "text-muted",
          )}
        >
          {subtitle}
        </span>
      ) : null}
    </div>
  );
}
