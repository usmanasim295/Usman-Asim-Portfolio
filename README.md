
# Usman Asim — Portfolio

A production-grade personal portfolio built with Next.js (App Router), TypeScript,
Tailwind CSS v4, Three.js/React Three Fiber, GSAP + ScrollTrigger, and Lenis smooth
scrolling. Every color, every project, and every piece of copy is data-driven from a
handful of config files — see below for how to change each one.

## Tech stack

- **Framework:** Next.js 16 (App Router, Server Components by default)
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS v4 (CSS-variable-driven theme, see [Colors](#how-to-change-colors))
- **3D:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animation:** GSAP + ScrollTrigger, `@gsap/react`, Framer Motion (used sparingly)
- **Smooth scroll:** Lenis, synced to GSAP ScrollTrigger
- **Icons:** lucide-react (+ two hand-drawn brand icons, see `src/components/ui/icons.tsx`)
- **Email:** EmailJS (`@emailjs/browser`) — client-side, no backend required
- **Lint:** ESLint (`eslint-config-next`, `react-hooks` strict rules)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in your EmailJS credentials:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

`.env.local` (and every `.env*` variant) is already git-ignored — never commit real
credentials.

### EmailJS setup

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an **Email Service** (e.g. Gmail) — copy its **Service ID**.
3. Create an **Email Template** with variables `{{from_name}}`, `{{from_email}}`,
   `{{company}}`, `{{project_type}}`, and `{{message}}` — copy its **Template ID**.
4. Copy your **Public Key** from Account → API Keys.
5. Paste all three into `.env.local` as shown above and restart the dev server.

Until these are set, the contact form still validates and shows a clear inline error
telling the visitor (and you) that email isn't configured yet — it never crashes.

## How to change colors

Every color in the app is defined **once**, in [`src/config/theme.ts`](src/config/theme.ts).
Edit the hex values there and the entire site — Tailwind utility classes (`bg-background`,
`text-ink`, `text-accent`, `border-border`, …), the Three.js hero scene, and the AI flow
diagram — all update together. Nothing else needs to change.

How it flows: `RootLayout` (`src/app/layout.tsx`) writes `theme.colors` out as CSS custom
properties on `:root`; `src/app/globals.css` declares Tailwind v4 tokens with `@theme inline`
that simply point at those same custom properties. Client components that need a raw JS
color value (Three.js materials, the SVG flow diagram) import `theme` directly.

## How to add a project

Open [`src/data/projects.ts`](src/data/projects.ts) and append an object to the `projects`
array:

```ts
{
  id: "my-project",
  title: "My Project",
  category: "Full Stack",
  status: "Live",
  description: "One-line summary shown on compact cards.",
  detailedDescription: "Longer paragraph shown on featured projects.",
  technologies: ["Next.js", "PostgreSQL"],
  features: ["Feature one", "Feature two"],
  image: "/projects/my-project.svg",
  imageAlt: "Description of the screenshot for screen readers",
  featured: true, // featured projects get the large alternating layout
  links: { live: "https://...", github: "https://..." }, // both optional — omit either and its button won't render
}
```

The Projects section renders entirely from this array — no component changes required.
Featured projects alternate image-left/image-right automatically; the last featured
project renders full-width if there are more than two.

## How to replace project images

Drop a real screenshot into `public/projects/` and update the matching project's `image`
path in `projects.ts`. The placeholders shipped in this repo are programmatically
generated abstract SVGs — replace them with `.webp`/`.png`/`.jpg` screenshots any time;
`next/image` handles both (SVGs are served unoptimized automatically).

## How to edit personal information

- **Identity, bio, links, CTAs:** [`src/config/site.ts`](src/config/site.ts)
- **Work experience:** [`src/data/experience.ts`](src/data/experience.ts)
- **Skills/categories:** [`src/data/skills.ts`](src/data/skills.ts)
- **Education:** [`src/data/education.ts`](src/data/education.ts)
- **Nav sections:** [`src/data/nav.ts`](src/data/nav.ts)

## How animations are structured

- **`SmoothScrollProvider`** (`src/components/providers/SmoothScrollProvider.tsx`) wires
  up Lenis and syncs it to GSAP's `ScrollTrigger.update` every frame. It also intercepts
  in-page anchor clicks (nav, footer, hero CTAs) so they scroll smoothly. It's skipped
  entirely when `prefers-reduced-motion: reduce` is set — native scrolling takes over.
- **`Reveal`** (`src/components/ui/Reveal.tsx`) is the shared scroll-in animation used
  across every section — fade + slight translate, triggered once via ScrollTrigger.
- **`HeroIntro`** animates the hero headline/subhead in on mount (not scroll-triggered,
  since it's the first thing visible).
- **`AiFlowDiagram`** (`src/components/ai/AiFlowDiagram.tsx`) draws its SVG path length
  and fades in each stage node on scroll, visualizing the User → AI Layer → Backend →
  Database → Automation → Output request lifecycle.
- Every animated component checks `prefers-reduced-motion` and renders its final,
  fully-visible state immediately when it's set.

## The Three.js hero scene

`src/components/three/NetworkScene.tsx` renders an abstract, instanced node graph (not a
rotating primitive) meant to evoke distributed systems/data flow. It's seeded with a
deterministic PRNG (not `Math.random`, to keep the component pure across re-renders),
uses one draw call for all nodes (`InstancedMesh`) and one for all connections
(`LineSegments`), and applies a subtle pointer-based parallax tilt. `HeroScene.tsx`
lazy-loads the Canvas client-side only, reduces node count on mobile, and falls back to a
static CSS gradient when `prefers-reduced-motion` is set or WebGL fails to initialize.

## Accessibility

Skip-to-content link, semantic landmarks, visible focus states, `aria-label`s on
icon-only controls, form labels/`aria-invalid`/inline error text, and full
`prefers-reduced-motion` support across every animated component.

## SEO

Metadata (title template, description, Open Graph, Twitter card), a dynamically
generated OG image (`src/app/opengraph-image.tsx`), `sitemap.ts`, and `robots.ts` are all
driven from `src/config/site.ts`.

## Deployment

Any Next.js-compatible host works (Vercel is the simplest):

```bash
npm run build
```

Set the three `NEXT_PUBLIC_EMAILJS_*` environment variables in your hosting provider's
dashboard before deploying — the contact form reads them at runtime.
