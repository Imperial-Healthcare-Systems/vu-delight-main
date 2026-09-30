# VuDelight — website

Freeze dried fruit, masala veg crunch and jaggery tea. Frontend for the food-commerce site; the backend
connects later through the seams described in `docs/ARCHITECTURE.md`.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # 23 static routes
npm run lint
```

## Read first

| File | What it holds |
|---|---|
| `docs/ARCHITECTURE.md` | folders, data flow, backend seam, library decisions, motion architecture |
| `docs/DESIGN.md` | colour, type, shape, the motion language, signature components, accessibility floor |
| `docs/CONTENT.md` | every line of copy, where it came from (source doc / client / pack), and the research with sources behind the method copy and comparison table |

## Where things live

- **Add a SKU** → one object in `content/products.ts`. Conveyors, rails, stroke marquee, filters, search, routes and sitemap follow.
- **Add a category** → one object in `content/categories.ts`. Home showcase block, nav, filters, footer, `/collections/<slug>` follow.
- **Change copy** → `content/site.ts`, `content/categories.ts`.
- **Swap the hero** → replace `components/hero/Hero.tsx`. Nothing else imports it.
- **Turn pricing on** → `PRICING_ENABLED` in `content/products.ts` once the API supplies prices.
- **Pack artwork** → `public/products/<slug>.png`, the supplied transparent cut-outs, untouched.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis · Swiper · Zustand. No 3D: the packs are the only imagery.
