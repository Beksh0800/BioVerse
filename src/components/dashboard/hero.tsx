import Image from "next/image";
import { site } from "@/content/site";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/motion/reveal";

/** Возможности платформы справа от hero — как в референсе. */
const highlights = [
  { icon: "clipboard", label: "PBL жобаларын жоспарлау" },
  { icon: "star", label: "Кешенді бағалау" },
  { icon: "bot", label: "AI көмекшісі" },
  { icon: "qr", label: "QR портфолио" },
  { icon: "chart", label: "Аналитика және есептер" },
];

export function DashboardHero() {
  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-3xl bg-navy-900">
        {/* Мягкое свечение, чтобы тёмный блок не читался плоским прямоугольником. */}
        <div className="pointer-events-none absolute -top-24 -left-20 size-80 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 -bottom-28 size-80 rounded-full bg-leaf/15 blur-3xl" />

        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:p-10">
          <div>
            <Logo variant="light" size="lg" />
            <p className="mt-4 max-w-md text-sm leading-relaxed font-medium text-navy-100 text-balance sm:text-base">
              {site.tagline}
            </p>
            <p className="mt-3 text-lg font-bold text-leaf-soft sm:text-xl">
              {site.motto}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/projects" variant="primary">
                Жобаларды көру
              </ButtonLink>
              <ButtonLink href="/about" variant="onDark">
                BIOVERSE туралы
              </ButtonLink>
            </div>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {highlights.map((item) => (
                <li key={item.label} className="flex items-center gap-2.5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white ring-1 ring-white/15">
                    <Icon name={item.icon} className="size-4" />
                  </span>
                  <span className="text-sm text-navy-100">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/15">
            <Image
              src="/images/projects/proteus.webp"
              alt="Микробиология: Протей микроорганизмі"
              width={1600}
              height={1067}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </Reveal>
  );
}
