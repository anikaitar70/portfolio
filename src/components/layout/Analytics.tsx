"use client";

/**
 * Analytics integration placeholder.
 * Replace NEXT_PUBLIC_ANALYTICS_ID with your provider (Plausible, Vercel Analytics, GA4, etc.)
 */
export function Analytics() {
  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  if (!analyticsId) return null;

  return (
    <>
      {/* Example: Vercel Analytics or custom script */}
      <script
        defer
        data-domain={analyticsId}
        src="https://plausible.io/js/script.js"
      />
    </>
  );
}
