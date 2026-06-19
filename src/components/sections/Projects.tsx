"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { projects, projectCategories, type ProjectCategory } from "@/data/projects";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";

function ArchitectureDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="mt-6 rounded-lg border border-white/8 bg-black/30 p-4 overflow-x-auto">
      <p className="text-xs font-medium tracking-widest uppercase text-muted mb-4">
        Architecture
      </p>
      <div className="flex items-center gap-2 min-w-max">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-foreground whitespace-nowrap">
              {step}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="h-3 w-3 text-muted shrink-0" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass rounded-xl p-6 md:p-8 hover:bg-white/5 transition-colors group"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-medium tracking-widest uppercase text-accent">
            {projectCategories.find((c) => c.id === project.category)?.label}
          </span>
          <h3 className="text-xl md:text-2xl font-semibold text-foreground mt-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted hover:text-foreground hover:bg-white/10 transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted hover:text-foreground hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-muted mb-2">
            Problem
          </p>
          <p className="text-sm text-muted leading-relaxed">{project.problem}</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-muted mb-2">
            Solution
          </p>
          <p className="text-sm text-muted leading-relaxed">{project.solution}</p>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg border border-accent/20 bg-accent/5">
        <p className="text-xs font-medium tracking-widest uppercase text-accent mb-1">
          Impact
        </p>
        <p className="text-sm text-foreground leading-relaxed">{project.impact}</p>
      </div>

      <ArchitectureDiagram steps={project.architecture} />

      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered =
    filter === "all"
      ? projects.filter((p) => p.featured)
      : projects.filter((p) => p.featured && p.category === filter);

  return (
    <section
      id="projects"
      className="py-24 md:py-32 section-padding border-t border-white/8"
      aria-label="Featured Projects"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Projects"
          title="Systems I've shipped."
          description="Each project started with a real problem. Here's how I solved them — with architecture, impact, and ownership."
        />

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {projectCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={filter === cat.id ? "default" : "secondary"}
              size="sm"
              onClick={() => setFilter(cat.id)}
              role="tab"
              aria-selected={filter === cat.id}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        <div className="mt-12 space-y-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-12">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
