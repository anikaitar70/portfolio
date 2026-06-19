"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { education } from "@/data/education";
import { SectionHeader } from "@/components/shared/SectionHeader";

export function Education() {
  return (
    <section
      id="education"
      className="py-24 md:py-32 section-padding border-t border-white/8"
      aria-label="Education"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Education"
          title="Academic foundation."
          description="Built on strong fundamentals from school through engineering — with a focus on applying what I learn to real systems."
        />

        <div className="mt-16 space-y-4">
          {education.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="glass rounded-xl p-6 md:p-8 hover:bg-white/5 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {entry.institution}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">{entry.location}</p>
                    <p className="text-muted mt-3 leading-relaxed">{entry.degree}</p>
                  </div>
                </div>
                <div className="md:text-right shrink-0 md:pl-4">
                  <p className="text-sm font-medium text-foreground">{entry.score}</p>
                  <p className="text-sm text-muted font-mono mt-1">{entry.period}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
