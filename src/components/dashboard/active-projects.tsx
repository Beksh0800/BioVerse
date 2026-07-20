import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { activeProjects } from "@/content/site";
import { author } from "@/content/author";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/** «Қош келдіңіз» + список активных проектов с прогрессом. */
export function ActiveProjects() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle>Қош келдіңіз, {author.name} апай!</CardTitle>
        <p className="mt-1 text-sm text-muted">Бүгінгі күнге шолу</p>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="text-sm font-bold text-navy-900">Белсенді жобалар</h4>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            Барлығын көру
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <ul className="space-y-3">
          {activeProjects.map((project, i) => (
            <li key={project.title}>
              <Link
                href={project.href}
                className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-navy-50"
              >
                <Image
                  src={project.image}
                  alt=""
                  width={96}
                  height={96}
                  className="size-11 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="line-clamp-2 text-sm leading-snug font-semibold text-navy-900 group-hover:text-brand">
                      {project.title}
                    </span>
                    <span className="shrink-0 text-sm font-bold text-navy-900">
                      {project.progress}%
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {project.group}
                  </span>
                  <Progress
                    value={project.progress}
                    delay={0.1 * i}
                    className="mt-2 h-1.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
