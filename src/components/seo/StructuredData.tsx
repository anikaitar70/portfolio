import { siteConfig } from "@/data/site";

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: siteConfig.roles.join(", "),
    description: siteConfig.description,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    knowsAbout: siteConfig.keywords,
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Vellore Institute of Technology",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.fullName} — Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.fullName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
