export interface EducationEntry {
  id: string;
  institution: string;
  location: string;
  degree: string;
  score: string;
  period: string;
}

export const education: EducationEntry[] = [
  {
    id: "vit",
    institution: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    degree: "Bachelor of Technology (B.Tech), Information Technology",
    score: "7.91 CGPA",
    period: "2022 – 2026",
  },
  {
    id: "dps",
    institution: "Delhi Public School, Gr. Noida",
    location: "Gr. Noida, UP",
    degree: "Class XII (CBSE)",
    score: "83.75%",
    period: "2022",
  },
  {
    id: "vidya-niketan",
    institution: "Vidya Niketan Birla Public School",
    location: "Pilani, Rajasthan",
    degree: "Class X (CBSE)",
    score: "90%",
    period: "2020",
  },
];
