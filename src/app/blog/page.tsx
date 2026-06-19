import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on engineering, AI, and building systems.",
};

/**
 * Blog-ready architecture placeholder.
 * Add MDX or a CMS integration here when ready to publish posts.
 */
export default function BlogPage() {
  return (
    <div className="section-padding mx-auto max-w-3xl py-32">
      <p className="text-sm font-medium tracking-widest uppercase text-accent mb-3">
        Blog
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">
        Coming soon
      </h1>
      <p className="text-lg text-muted leading-relaxed">
        This route is ready for MDX posts or a headless CMS. Add your content
        pipeline and posts will appear here.
      </p>
    </div>
  );
}
