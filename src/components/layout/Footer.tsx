import { siteConfig, socialLinks } from "@/data/site";
import { SocialLinks } from "@/components/shared/SocialLinks";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 py-12 section-padding">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-foreground">
            {siteConfig.fullName}
          </p>
          <p className="text-sm text-muted mt-1">
            Building systems that solve real-world problems.
          </p>
        </div>
        <SocialLinks links={socialLinks} size="sm" />
        <p className="text-xs text-muted-foreground">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
