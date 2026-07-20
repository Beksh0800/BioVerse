"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/content/nav";
import { author } from "@/content/author";
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

export function SidebarProfile() {
  return (
    <div className="mx-3 mb-3 flex items-center gap-3 rounded-xl bg-white/8 px-3 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-navy-400 to-brand text-sm font-bold text-white">
        {author.initial}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-white">
          {author.fullName}
        </span>
        <span className="block truncate text-xs text-navy-200">Мұғалім</span>
      </span>
    </div>
  );
}

/** Постоянный сайдбар для больших экранов. */
export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-navy-900 py-6 lg:flex">
      <Link href="/" className="mb-7 px-6">
        <Logo variant="light" size="sm" subtitle="PBL Ecosystem" />
      </Link>
      <SidebarNav />
      <SidebarProfile />
    </aside>
  );
}
