"use client";

import { useEffect, useState, useCallback } from "react";
import { Command as CommandIcon, FileText, FolderOpen, Mail, User } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { navLinks, siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { scrollToSection } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  const handleSelect = useCallback(
    (action: () => void) => {
      action();
      onOpenChange(false);
      setQuery("");
    },
    [onOpenChange]
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const navigationItems = navLinks.map((link) => ({
    id: link.href,
    label: link.label,
    icon: User,
    action: () => scrollToSection(link.href.replace("#", "")),
  }));

  const projectItems = projects.map((project) => ({
    id: project.id,
    label: project.title,
    icon: FolderOpen,
    action: () => scrollToSection("projects"),
  }));

  const actionItems = [
    {
      id: "resume",
      label: "Download Resume",
      icon: FileText,
      action: () => {
        const a = document.createElement("a");
        a.href = siteConfig.resumePath;
        a.download = "Anikait_Resume.pdf";
        a.click();
      },
    },
    {
      id: "contact",
      label: "Contact",
      icon: Mail,
      action: () => scrollToSection("contact"),
    },
    {
      id: "email",
      label: `Email ${siteConfig.email}`,
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${siteConfig.email}`;
      },
    },
  ];

  const allItems = [...navigationItems, ...projectItems, ...actionItems];
  const filtered = query
    ? allItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 max-w-lg">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search navigation, projects, and quick actions
        </DialogDescription>
        <div className="flex items-center border-b border-white/10 px-4">
          <CommandIcon className="h-4 w-4 text-muted shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search navigation, projects, actions..."
            className="flex-1 bg-transparent px-3 py-4 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-xs text-muted font-mono">
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">No results found.</p>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.action)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-foreground transition-colors"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
