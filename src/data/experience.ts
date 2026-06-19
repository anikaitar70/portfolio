export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  type: "internship" | "leadership";
}

export const experiences: Experience[] = [
  {
    id: "shyam-spectra",
    role: "Data & Automation Intern",
    company: "Shyam Spectra",
    period: "2024",
    type: "internship",
    highlights: [
      "Automated market and competitor data extraction using JavaScript-based web scraping (Puppeteer) and APIs.",
      "Built Excel tools to streamline internal sales reporting, reducing manual effort by ~70%.",
      "Created dashboards and reports to support lead generation and conversion tracking.",
      "Prepared data-driven presentations for internal reviews and management to provide practical insights.",
      "Tools: FastAPI, Node.js, Selenium, Puppeteer, SQL, Excel Dashboards",
    ],
  },
  {
    id: "cdot",
    role: "Full Stack Developer Intern",
    company: "C-DOT",
    period: "2024",
    type: "internship",
    highlights: [
      "Developed an internal paper publishing management tool, incorporating NLP processing and concurrent file access with role-based controls to streamline research workflows",
      "Upgraded and documented custom Moodle LMS, improving usability by 20 % and reducing friction for internal teams.",
      "Contributed to UI and UX design, improving interface consistency and user flow across key modules.",
      "Collaborated with engineers on backend integration and feature development.",
      "Tools: Next.js, TailwindCSS, PostgreSQL, TypeScript, Moodle LMS, NLP, UI/UX Design",
    ],
  },
  {
    id: "fepsi",
    role: "Head of Finance",
    company: "FEPSI",
    period: "2023 – Present",
    type: "leadership",
    highlights: [
      "Led sponsorship acquisition and partnership negotiations",
      "Managed budget planning and financial strategy for 500+ members",
      "Oversaw inventory management and event cost optimization",
    ],
  },
  {
    id: "sme",
    role: "Head of Design",
    company: "SME International",
    period: "2022 – 2023",
    type: "leadership",
    highlights: [
      "Earned Gold Chapter recognition for design excellence",
      "Led event branding and visual identity across 100+ events",
      "Directed RC Car Build It Race It — large-scale technical event",
    ],
  },
];
