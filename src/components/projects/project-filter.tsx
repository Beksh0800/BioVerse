"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { projects, type ProjectCategory } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Барлығы" },
  { key: "Microbiology", label: "Микробиология" },
  { key: "Botany", label: "Ботаника" },
];

export function ProjectFilter() {
  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <>
      <div
        className="mb-6 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Жобаларды сүзу"
      >
        {filters.map((f) => {
          const isActive = active === f.key;
          const count =
            f.key === "all"
              ? projects.length
              : projects.filter((p) => p.category === f.key).length;

          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.key)}
              className={cn(
                "relative rounded-xl px-4 py-2 text-sm font-semibold transition",
                isActive
                  ? "text-white"
                  : "bg-white text-navy-900 ring-1 ring-hairline hover:bg-navy-50",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-xl bg-brand"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">
                {f.label}
                <span className={cn("ml-1.5", isActive ? "text-white/70" : "text-muted")}>
                  {count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
