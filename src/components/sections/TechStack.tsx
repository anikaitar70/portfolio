"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { techCategories } from "@/data/tech-stack";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState(techCategories[0].id);
  const active = techCategories.find((c) => c.id === activeCategory) ?? techCategories[0];

  return (
    <section
      id="stack"
      className="py-24 md:py-32 section-padding border-t border-white/8"
      aria-label="Technology Stack"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Stack"
          title="Tools with context."
          description="Technologies aren't the story — what I build with them is. Here's how I apply each layer of the stack."
        />

        <div className="mt-16 grid lg:grid-cols-[240px_1fr] gap-8">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {techCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200 shrink-0",
                  activeCategory === cat.id
                    ? "glass bg-white/8 text-foreground"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                )}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-xl p-8"
          >
            <h3 className="text-2xl font-semibold text-foreground">{active.label}</h3>
            <p className="text-muted mt-2 mb-8">{active.description}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {active.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border border-white/8 bg-white/3 p-4 hover:bg-white/5 transition-colors"
                >
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted mt-1">{item.context}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
