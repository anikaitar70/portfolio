"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";

const highlights = [
  {
    title: "Information Technology",
    subtitle: "VIT",
    description:
      "Pursuing IT with a focus on building production-grade systems, not just coursework.",
  },
  {
    title: "Full Stack Developer",
    subtitle: "End-to-end ownership",
    description:
      "From database schema to deployment — I own the full lifecycle of what I build.",
  },
  {
    title: "AI, IoT & Automation",
    subtitle: "Systems builder",
    description:
      "Built AI pipelines, IoT monitoring systems, and automation workflows that run in production.",
  },
  {
    title: "Industry Experience",
    subtitle: "C-DOT & Shyam Spectra",
    description:
      "Interned at India's premier telecom R&D center and a leading infrastructure company.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 section-padding" aria-label="About">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="About"
          title="Execution over credentials."
          description="I'm an Information Technology student at VIT who builds things that work — AI systems, IoT solutions, automation pipelines, and full-stack products. I focus on ownership, execution, and solving problems that matter."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-6 hover:bg-white/5 transition-colors"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
                {item.subtitle}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 glass rounded-xl p-8 md:p-10"
        >
          <p className="text-lg md:text-xl text-muted leading-relaxed max-w-4xl">
            Beyond engineering, I&apos;ve led finance for a 500+ member organization,
            directed design for an international student chapter, and co-run a pet
            boarding business growing at{" "}
            <span className="text-foreground font-medium">150% year-over-year</span>.
            I don&apos;t just write code — I build systems, lead teams, and ship outcomes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
