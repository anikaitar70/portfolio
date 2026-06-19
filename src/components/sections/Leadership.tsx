"use client";

import { motion } from "framer-motion";
import { leadershipStats } from "@/data/site";
import { leadershipHighlights } from "@/data/beyond-code";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";

export function Leadership() {
  return (
    <section
      id="impact"
      className="py-24 md:py-32 section-padding border-t border-white/8"
      aria-label="Leadership and Impact"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Impact"
          title="Leadership beyond the keyboard."
          description="Building communities, securing sponsorships, and coordinating large-scale events — leadership skills that compound in engineering roles."
        />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-semibold text-foreground">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-muted mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {leadershipHighlights.map((item, i) => (
            <motion.div
              key={item.org}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-8"
            >
              <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
                {item.role}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {item.org}
              </h3>
              <ul className="space-y-3">
                {item.items.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm text-muted leading-relaxed"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
