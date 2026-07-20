import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Users } from "lucide-react";
import type { Project } from "@/content/projects";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-hairline transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3">
          <Badge tone="brand" className="bg-white/95 backdrop-blur-sm">
            {project.categoryLabel}
          </Badge>
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-navy-900/85 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {project.score}/100
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-balance text-navy-900 transition group-hover:text-brand">
          {project.title}
        </h3>
        {project.subtitle ? (
          <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted">
            {project.subtitle}
          </p>
        ) : null}

        <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-3.5" />
            {project.grade}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {project.duration}
          </span>
          <ArrowUpRight className="ml-auto size-4 text-brand transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
