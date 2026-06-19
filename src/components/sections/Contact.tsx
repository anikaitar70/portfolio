"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { siteConfig, socialLinks } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SocialLinks } from "@/components/shared/SocialLinks";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    const mailtoLink = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.location.href = mailtoLink;

    setLoading(false);
    setSubmitted(true);
    form.reset();
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-32 section-padding border-t border-white/8"
      aria-label="Contact"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-16 overflow-hidden">
          <div
            className="glow-orb bg-blue-500/20 w-[300px] h-[300px] top-0 right-0"
            aria-hidden="true"
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium tracking-widest uppercase text-accent mb-3">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground">
                Let&apos;s build something{" "}
                <span className="gradient-accent">meaningful.</span>
              </h2>
              <p className="text-lg text-muted mt-6 leading-relaxed">
                Whether it&apos;s a founding engineering role, an AI project, or an
                automation challenge — I&apos;m always open to conversations about
                building things that matter.
              </p>
              <div className="mt-8">
                <SocialLinks links={socialLinks} />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {submitted ? (
                <div className="glass rounded-xl p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground">
                    Message ready to send
                  </h3>
                  <p className="text-muted mt-2">
                    Your email client should open shortly. Feel free to reach out
                    directly at{" "}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-accent hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or opportunity..."
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={loading}>
                    <Send className="h-4 w-4" />
                    {loading ? "Opening email..." : "Send Message"}
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
