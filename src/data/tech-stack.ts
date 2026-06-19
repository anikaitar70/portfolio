export interface TechCategory {
  id: string;
  label: string;
  description: string;
  items: {
    name: string;
    context: string;
  }[];
}

export const techCategories: TechCategory[] = [
  {
    id: "languages",
    label: "Languages",
    description: "Core languages I write production code in across web, backend, and embedded systems.",
    items: [
      { name: "Python", context: "APIs, AI pipelines, automation, data engineering" },
      { name: "JavaScript", context: "Full-stack scripting, browser and Node runtimes" },
      { name: "TypeScript", context: "Type-safe React and Next.js applications" },
      { name: "Java", context: "Object-oriented backend and application logic" },
      { name: "SQL", context: "Relational queries, schema design, analytics" },
      { name: "HTML & CSS", context: "Semantic markup and responsive styling" },
      { name: "Embedded C", context: "Firmware for ESP32 and Arduino microcontrollers" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces that feel fast, intentional, and accessible.",
    items: [
      { name: "Next.js", context: "App Router, SSR, static export" },
      { name: "React", context: "Component architecture, hooks, state management" },
      { name: "TailwindCSS", context: "Utility-first design systems" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "APIs and services built for reliability at scale.",
    items: [
      { name: "FastAPI", context: "High-performance Python APIs" },
      { name: "Node.js", context: "Event-driven server-side JavaScript" },
      { name: "Express.js", context: "RESTful routing and middleware" },
      { name: "REST APIs", context: "Clean contract design and integration" },
      { name: "OpenAPI", context: "API documentation and schema contracts" },
      { name: "Prisma", context: "Type-safe ORM and database migrations" },
      { name: "Puppeteer", context: "Headless browser automation and scraping" },
    ],
  },
  {
    id: "ai-data",
    label: "AI / Data",
    description: "Intelligent systems that extract signal from noise.",
    items: [
      { name: "RAG", context: "Retrieval-augmented generation for code and document Q&A" },
      { name: "Prompt Engineering", context: "Structured LLM inputs for reliable outputs" },
      { name: "NLP Workflows", context: "Text classification, analysis, and extraction" },
      { name: "Semantic Search", context: "Embedding-based retrieval over code and text" },
      { name: "OpenCV", context: "Computer vision, EVM, and image processing" },
      { name: "Real-Time Data Processing", context: "Streaming pipelines and live analytics" },
      { name: "LangChain", context: "LLM orchestration and tool chaining" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    description: "Data layers designed for query patterns and integrity.",
    items: [
      { name: "PostgreSQL", context: "Relational modeling, CMS backends" },
      { name: "MySQL", context: "Relational storage for web applications" },
      { name: "MongoDB", context: "Document-oriented NoSQL data stores" },
      { name: "ChromaDB", context: "Vector storage for semantic search and RAG" },
    ],
  },
  {
    id: "iot",
    label: "IoT & Embedded",
    description: "Edge devices that bridge physical and digital systems.",
    items: [
      { name: "ESP32", context: "Wi-Fi microcontrollers for edge compute" },
      { name: "ESP32-CAM", context: "Video streaming and visual monitoring" },
      { name: "Arduino", context: "Rapid prototyping and sensor interfacing" },
      { name: "Sensor Integration", context: "Multi-sensor data collection and fusion" },
      { name: "UDP / HTTP", context: "Device-to-server communication protocols" },
    ],
  },
  {
    id: "tools",
    label: "Cloud, APIs & Tools",
    description: "Infrastructure, integrations, and workflow accelerators.",
    items: [
      { name: "Git & GitHub", context: "Version control and collaborative development" },
      { name: "Docker", context: "Containerized deployments" },
      { name: "Linux", context: "Server environments and CLI tooling" },
      { name: "Google Places API", context: "Location and place data integration" },
      { name: "RapidAPI", context: "Third-party API marketplace integrations" },
      { name: "Apify", context: "Web scraping and automation at scale" },
      { name: "Vercel", context: "Edge deployment and CI/CD" },
    ],
  },
];
