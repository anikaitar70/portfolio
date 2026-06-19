import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

interface SocialLinksProps {
  links: {
    label: string;
    href: string;
    icon: keyof typeof iconMap;
  }[];
  className?: string;
  size?: "sm" | "md";
}

export function SocialLinks({ links, className, size = "md" }: SocialLinksProps) {
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const buttonSize = size === "sm" ? "h-9 w-9" : "h-11 w-11";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.icon !== "mail" ? "_blank" : undefined}
            rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className={cn(
              buttonSize,
              "inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted transition-all duration-200 hover:bg-white/10 hover:text-foreground hover:border-white/20"
            )}
          >
            <Icon className={iconSize} />
          </a>
        );
      })}
    </div>
  );
}
