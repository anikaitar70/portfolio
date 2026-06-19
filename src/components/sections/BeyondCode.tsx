"use client";

import { motion } from "framer-motion";
import { Heart, GraduationCap, Globe } from "lucide-react";
import { beyondCodeStories } from "@/data/beyond-code";
import { SectionHeader } from "@/components/shared/SectionHeader";

const iconMap = {
  business: Heart,
  teaching: GraduationCap,
  geopolitics: Globe,
};

export function BeyondCode() {
  return (
    <section
      id="beyond"
      className="py-24 md:py-32 section-padding border-t border-white/8"
      aria-label="Beyond Code"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label="Beyond Code"
          title="What makes me different."
          description="The best engineers bring more than technical skills. These stories shape how I think, lead, and solve problems."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {beyondCodeStories.map((story, i) => {
            const Icon = iconMap[story.icon];
            return (
              <motion.article
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-8 flex flex-col hover:bg-white/5 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-white/10 mb-6">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                {story.stat && (
                  <p className="text-2xl font-semibold gradient-accent mb-2">
                    {story.stat}
                  </p>
                )}
                <h3 className="text-xl font-semibold text-foreground">
                  {story.title}
                </h3>
                <p className="text-sm text-accent mt-1">{story.subtitle}</p>
                <p className="text-muted leading-relaxed mt-4 flex-1">
                  {story.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
