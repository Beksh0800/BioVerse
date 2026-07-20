"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { SidebarNav, SidebarProfile } from "./sidebar";

/** Шапка с выдвижным меню — заменяет сайдбар на планшете и телефоне. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Пока панель открыта, фон скроллиться не должен.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="no-print sticky top-0 z-40 flex h-16 items-center justify-between border-b border-hairline bg-white/85 px-4 backdrop-blur-md lg:hidden">
        <Link href="/">
          <Logo variant="dark" size="sm" />
        </Link>
        <button
          onClick={() => setOpen(true)}
          aria-label="Мәзірді ашу"
          className="flex size-10 items-center justify-center rounded-xl text-navy-900 ring-1 ring-hairline transition hover:bg-navy-50"
        >
          <Menu className="size-5" />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-navy-950/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-50 flex w-[280px] flex-col bg-navy-900 py-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="mb-7 flex items-center justify-between px-5">
                <Logo variant="light" size="sm" subtitle="PBL Ecosystem" />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Мәзірді жабу"
                  className="flex size-9 items-center justify-center rounded-lg text-navy-200 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <SidebarNav onNavigate={() => setOpen(false)} />
              </div>
              <SidebarProfile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
