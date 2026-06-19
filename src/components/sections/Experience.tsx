"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Users, ChevronRight } from "lucide-react";
import { experiences } from "@/data/experience";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

export function Experience() {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const active = experiences.find((e) => e.id === activeId) ?? experiences[0];

  return (
    <section
      id="experience"
      className="py-24 md:py-32 section-padding border-t border-white/8"
      aria-label="Experience"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Experience"
          title="Where I've built and led."
          description="From telecom R&D to student organization leadership — every role shaped how I approach problems."
        />

        <div className="mt-16 grid lg:grid-cols-[320px_1fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveId(exp.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-4 text-left transition-all duration-200 shrink-0 lg:shrink",
                  activeId === exp.id
                    ? "glass bg-white/8 border-white/15"
                    : "hover:bg-white/5 border border-transparent"
                )}
                aria-pressed={activeId === exp.id}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                    exp.type === "internship"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-violet-500/10 text-violet-400"
                  )}
                >
                  {exp.type === "internship" ? (
                    <Briefcase className="h-5 w-5" />
                  ) : (
                    <Users className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {exp.role}
                  </p>
                  <p className="text-xs text-muted truncate">{exp.company}</p>
                </div>
                <ChevronRight
                  className={cn(
                    "h-4 w-4 text-muted ml-auto shrink-0 transition-transform",
                    activeId === exp.id && "rotate-90 lg:rotate-0"
                  )}
                />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {active.role}
                  </h3>
                  <p className="text-lg text-accent mt-1">{active.company}</p>
                </div>
                <span className="text-sm text-muted font-mono">{active.period}</span>
              </div>

              <ul className="space-y-4">
                {active.highlights.map((highlight, i) => (
                  <motion.li
                    key={highlight}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 text-muted leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
