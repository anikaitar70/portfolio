"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Command } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";

interface HeaderProps {
  onOpenCommandPalette: () => void;
}

export function Header({ onOpenCommandPalette }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "border-b border-white/8 bg-background/70 backdrop-blur-xl backdrop-saturate-150",
        scrolled ? "py-3 bg-background/85 shadow-sm shadow-black/20" : "py-5"
      )}
    >
      <div className="section-padding mx-auto max-w-7xl flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-md hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette"
            className="hidden sm:inline-flex text-muted"
          >
            <Command className="h-4 w-4" />
            <span className="sr-only">Command palette</span>
          </Button>
          <kbd className="hidden lg:inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-muted font-mono">
            Ctrl+K
          </kbd>
          <Button
            variant="default"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <a href={siteConfig.resumePath} download>
              Resume
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="md:hidden glass border-t border-white/8 mt-3 py-4 section-padding"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-3 text-left text-muted hover:text-foreground transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
            <a
              href={siteConfig.resumePath}
              download
              className="px-3 py-3 text-left text-accent hover:text-accent/80 transition-colors"
            >
              Download Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
