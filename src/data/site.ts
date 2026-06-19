export const siteConfig = {
  name: "Anikait",
  fullName: "Anikait Agrawal",
  title: "Software Engineer · AI Builder · Automation Engineer",
  description:
    "I build software, AI systems, automation workflows, and IoT solutions that turn complex ideas into reliable products.",
  url: "https://anikait.page",
  ogImage: "/og-image.png",
  email: "anikaitar@gmail.com",
  github: "https://github.com/anikaitar70",
  linkedin: "https://www.linkedin.com/in/anikait-agrawal",
  resumePath: "/resume/Anikait_Resume.pdf",
  roles: [
    "Software Engineer",
    "AI Builder",
    "Automation Engineer",
    "IoT Developer",
    "Problem Solver",
  ],
  keywords: [
    "Software Engineer",
    "AI Engineer",
    "Automation Engineer",
    "IoT Developer",
    "Full Stack Developer",
    "Solutions Engineer",
    "Product Engineer",
    "VIT",
    "FastAPI",
    "Next.js",
    "Computer Vision",
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: "linkedin" as const,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: "mail" as const,
  },
];

export const leadershipStats = [
  { value: 500, suffix: "+", label: "Community Members" },
  { value: 100, suffix: "+", label: "Events Organized" },
  { value: 10, suffix: "+", label: "Sponsorships Secured" },
  { value: 150, suffix: "%", label: "Pet Business YoY Growth" },
];
