"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/content/nav";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

/** Активен ли пункт: «/» строго, остальные — вместе с вложенными маршрутами. */
function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Негізгі мәзір">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition",
              active ? "text-white" : "text-navy-200 hover:bg-white/8 hover:text-white",
            )}
          >
            {active && (
              <motion.span
                layoutId="sidebar-active"
                className="absolute inset-0 rounded-xl bg-brand"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <Icon name={item.icon} className="relative z-10 size-[18px]" />
            <span className="relative z-10">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/*
  Карточки профиля внизу сайдбара здесь нет намеренно, хотя в UI-референсе
  она была. Профиль подразумевает вход в систему, а регистрации и кабинетов
  в проекте нет — на защите это первое, во что упирается взгляд. Автор
  представлен там, где для этого есть место: в разделе «BIOVERSE туралы».
*/

/** Постоянный сайдбар для больших экранов. */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-navy-900 py-6 lg:flex">
      <Link href="/" className="mb-7 px-6">
        <Logo variant="light" size="sm" subtitle="PBL Ecosystem" />
      </Link>
      <SidebarNav />
    </aside>
  );
}
