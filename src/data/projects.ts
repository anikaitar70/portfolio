export type ProjectCategory =
  | "ai"
  | "automation"
  | "iot"
  | "fullstack"
  | "data";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  problem: string;
  solution: string;
  technologies: string[];
  impact: string;
  architecture: string[];
  github?: string;
  demo?: string;
  featured: boolean;
}

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "automation", label: "Automation" },
  { id: "iot", label: "IoT" },
  { id: "fullstack", label: "Full Stack" },
  { id: "data", label: "Data" },
];

export const projects: Project[] = [
  {
    id: "equipment-health-monitor",
    title: "Industrial Equipment Health Monitor",
    category: "iot",
    featured: true,
    problem:
      "Industrial equipment failures cause costly downtime with no early warning system for vibration and visual anomalies.",
    solution:
      "Built a real-time monitoring system using ESP32 and sensors, computer vision with Eulerian Video Magnification, and sensor fusion to detect equipment degradation before failure.",
    technologies: [
      "ESP32-CAM",
      "FastAPI",
      "Computer Vision",
      "Eulerian Video Magnification",
      "Sensor Fusion",
      "Python",
    ],
    impact:
      "Enables proactive maintenance with real-time anomaly detection, reducing unplanned downtime and maintenance costs.",
    architecture: [
      "ESP32-CAM Edge Nodes",
      "Video Stream Processing",
      "EVM Signal Extraction",
      "Sensor Fusion Layer",
      "FastAPI Backend",
      "Real-time Dashboard",
    ],
    github: "https://github.com/anikaitar70/industrial_equipment_health_monitor",
    demo: "https://ehm.anikait.page/",
  },
  {
    id: "credrank-net",
    title: "CredRank Net",
    category: "ai",
    featured: true,
    problem:
      "Research credibility is hard to assess — traditional citation metrics don't capture expertise-weighted consensus.",
    solution:
      "Built a research credibility platform with reputation scoring, expertise-weighted voting, and real-time discussion threads for academic discourse.",
    technologies: [
      "Next.js",
      "PostgreSQL",
      "Reputation Scoring",
      "Real-time WebSockets",
      "TypeScript",
    ],
    impact:
      "Provides transparent, expertise-driven credibility assessment for research papers and academic claims.",
    architecture: [
      "Next.js Frontend",
      "Reputation Engine",
      "Weighted Voting System",
      "Discussion Service",
      "PostgreSQL",
      "Real-time Layer",
    ],
    github: "https://github.com/anikaitar70/finalproject",
    demo: "https://crn.anikait.page/",
  },
  {
    id: "ai-debug-assistant",
    title: "AI Debug Assistant",
    category: "ai",
    featured: true,
    problem:
      "Developers spend hours tracing bugs across large codebases without contextual understanding of related code.",
    solution:
      "Created a RAG-powered debug assistant with semantic retrieval and code understanding, exposed via FastAPI endpoints for IDE integration.",
    technologies: [
      "RAG Pipeline",
      "Semantic Retrieval",
      "FastAPI",
      "Vector Embeddings",
      "Python",
      "LangChain",
    ],
    impact:
      "Accelerates debugging by surfacing contextually relevant code and explanations, reducing mean time to resolution.",
    architecture: [
      "Code Indexer",
      "Embedding Store",
      "Semantic Retriever",
      "LLM Reasoning Layer",
      "FastAPI Gateway",
      "IDE Plugin",
    ],
    github: "https://github.com/anikaitar70/aidebug",
    demo: "https://ai.anikait.page",

  },
  {
    id: "nirvana-yoga-cms",
    title: "Nirvana Yoga CMS",
    category: "fullstack",
    featured: true,
    problem:
      "A yoga studio needed a flexible content management system supporting multiple user roles and dynamic scheduling.",
    solution:
      "Developed a multi-role CMS with dynamic content management, role-based access control, and a PostgreSQL-backed architecture.",
    technologies: [
      "Next.js",
      "PostgreSQL",
      "Multi-role Auth",
      "CMS Architecture",
      "TypeScript",
      "TailwindCSS",
    ],
    impact:
      "Streamlined studio operations with self-service content management, reducing admin overhead by 60%.",
    architecture: [
      "Next.js App Router",
      "Role-based Access",
      "Content API",
      "PostgreSQL Schema",
      "Admin Dashboard",
      "Public Site",
    ],
    github: "https://github.com/anikaitar70/yoga",
    demo: "https://nirvanayoga.org",
  },
  {
    id: "hotel-analytics",
    title: "Hotel Analytics & Scraping Automation",
    category: "data",
    featured: true,
    problem:
      "Hotel market intelligence required manual data collection across thousands of properties with no unified analytics pipeline.",
    solution:
      "Engineered an automated scraping pipeline processing 10,000+ hotels with API integrations, NLP analysis, and structured data engineering workflows.",
    technologies: [
      "Python",
      "Scraping Pipeline",
      "API Integrations",
      "NLP",
      "Data Engineering",
      "PostgreSQL",
    ],
    impact:
      "Automated competitive intelligence at scale, enabling data-driven pricing and market positioning decisions.",
    architecture: [
      "Distributed Scrapers",
      "Data Normalization",
      "NLP Analysis Engine",
      "API Gateway",
      "Analytics Warehouse",
      "Reporting Dashboard",
    ],
    github: "https://github.com/anikaitar70/hotel_scrapper",
  }
];
