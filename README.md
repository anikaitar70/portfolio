# Anikait Portfolio

Premium personal portfolio built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for Production (Static Export)

```bash
npm run build
```

Static files are output to `out/` — deploy to Vercel, Netlify, Cloudflare Pages, or any static host.

## Customization

Edit `src/data/site.ts` to update:

- Name, email, social links
- Domain URL for SEO
- Resume path

Edit content files in `src/data/`:

- `projects.ts` — featured projects
- `experience.ts` — work timeline
- `tech-stack.ts` — technology categories
- `beyond-code.ts` — personal stories

## Features

- Dark mode by default
- Command palette (Ctrl+K)
- Scroll progress indicator
- Project category filtering
- Animated counters
- SEO metadata + OpenGraph
- Structured data (JSON-LD)
- Blog-ready `/blog` route
- Analytics placeholder (`NEXT_PUBLIC_ANALYTICS_ID`)
- Static export compatible

## Deploy to Custom Domain

1. Update `siteConfig.url` in `src/data/site.ts`
2. Build: `npm run build`
3. Deploy `out/` folder or connect repo to Vercel
4. Point your domain DNS to the hosting provider

## Tech Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS v4
- Framer Motion
- shadcn/ui-style components
- Radix UI primitives
