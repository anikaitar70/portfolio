"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { scrollToSection } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      <div className="absolute inset-0 grid-pattern opacity-50" aria-hidden="true" />
      <div
        className="glow-orb animate-pulse-slow bg-blue-500/30 w-[500px] h-[500px] -top-32 -right-32"
        aria-hidden="true"
      />
      <div
        className="glow-orb animate-pulse-slow bg-violet-500/20 w-[400px] h-[400px] -bottom-32 -left-32"
        style={{ animationDelay: "4s" }}
        aria-hidden="true"
      />

      <div className="section-padding relative z-10 mx-auto max-w-7xl w-full pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="flex flex-wrap gap-2 mb-8">
            {siteConfig.roles.map((role, i) => (
              <motion.span
                key={role}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted"
              >
                {role}
              </motion.span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] max-w-5xl">
            Building systems that{" "}
            <span className="gradient-accent">solve real-world problems.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href={siteConfig.resumePath} download>
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </Button>
          </div>

          <div className="mt-12">
            <SocialLinks links={socialLinks} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-muted">
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
