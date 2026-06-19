export interface StoryCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  stat?: string;
  icon: "business" | "teaching" | "geopolitics";
}

export const beyondCodeStories: StoryCard[] = [
  {
    id: "pet-boarding",
    title: "Pet Boarding Business",
    subtitle: "Co-founder & Operations",
    description:
      "Co-run a pet boarding business with my family, handling operations, customer experience, and growth strategy. Built systems for booking, scheduling, and client communication from scratch.",
    stat: "150% YoY Growth",
    icon: "business",
  },
  {
    id: "teaching",
    title: "Teaching Mathematics",
    subtitle: "Community Impact",
    description:
      "Volunteer teaching mathematics to underprivileged students, designing curriculum that makes abstract concepts tangible and building confidence through structured problem-solving.",
    icon: "teaching",
  },
  {
    id: "geopolitics",
    title: "Geopolitics & Global Affairs",
    subtitle: "US, UK & India",
    description:
      "Deeply interested in geopolitics — particularly the strategic dynamics between the United States, United Kingdom, and India. I follow how diplomacy, trade, and security coordination across these powers shapes technology, policy, and opportunity.",
    icon: "geopolitics",
  },
];

export const leadershipHighlights = [
  {
    org: "FEPSI",
    role: "Head of Finance",
    items: [
      "Sponsorship acquisition and partnership development",
      "Budget planning for organization-wide initiatives",
      "Financial strategy across 500+ member community",
    ],
  },
  {
    org: "SME International",
    role: "Head of Design",
    items: [
      "Gold Chapter recognition for design excellence",
      "Event branding across 100+ technical events",
      "Led RC Car Build It Race It — large-scale coordination",
    ],
  },
];
