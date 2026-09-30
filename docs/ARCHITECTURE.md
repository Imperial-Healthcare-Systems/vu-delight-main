# VuDelight — Project Architecture

Next.js 16 (App Router, React 19, TypeScript, Tailwind v4). Frontend only for now; every place that
will talk to a backend is isolated in `content/` and `lib/store.ts`.

## Folders

```
app/                     routes only — no business logic
  layout.tsx             fonts, Preloader, PageTransition, SmoothScroll, ScrollProgress, ParallaxLayers, Header, Footer,
                         CartDrawer, SearchOverlay, WelcomeModal, CursorDot
  template.tsx           per-navigation page entrance (curtain out)
  page.tsx               home: sticky Hero + SectionShells (shelves, stroke marquee, manifesto, method, rail, inside/out, bundles, reviews, club)
  shop/page.tsx          all products, filterable by category and tag
  products/[slug]/       product detail (SKU colour takeover, 2.5D gallery, buy box)
  collections/[slug]/    one landing per category
  story/                 belief, method, sourced comparison table, values
  contact/               enquiry form
  not-found.tsx  sitemap.ts  robots.ts
components/
  hero/                  Hero.tsx — the only import site; swap the file to replace the hero
  home/                  CategoryShowcase, StrokeMarquee, Manifesto, FreezeStory, ProductRail, InsideOutside, Testimonials, OfferSlider, DelightClub
  story/                 Compare (table + sources)
  products/              ProductCard (tile + card skins), ProductBrowser, ProductGallery, BuyBox, ProductDetails (accordions)
  layout/                Header (island nav), MobileMenu, MobileBar (phone tab bar), Footer, CartDrawer, SearchOverlay, SmoothScroll,
                         ScrollProgress, Preloader, PageTransition, TransitionLink, PageHero, WelcomeModal
  motion/                TextReveal, Reveal, Marquee, Magnetic, Tilt, SectionShell, ParallaxLayers, Float — generic
  ui/                    Button, Logo, Sticker, SectionHead, Hi (highlighter swash), AmbientBlobs, CursorDot
  forms/                 EnquiryForm (frontend only, field names fixed for the API)
content/                 ALL copy and data. The backend replaces these modules 1:1.
  products.ts            SKUs (accent colours, weights, claims, copy, optional `tag`). Add a SKU = add an object.
  categories.ts          the shelves (two today). Add a category = add an object.
  site.ts                every line of site copy, incl. the comparison table rows and its sources
lib/
  types.ts               Product, Category, Badge, CartLine
  gsap.ts                registers plugins once; useGsap() scoped hook passes `reduced` to every setup
  lenis.ts               Lenis singleton stepped by the GSAP ticker (off under reduced motion); scrollTo()
  store.ts               Zustand: cart (persisted, skipHydration; rehydrated in SmoothScroll after mount so SSR and first paint match) + UI state
  transition.ts          tiny event bus for the route curtain
  utils.ts               cn(), skuVars(), reducedMotion(), colour helpers
  crunch.ts              the crunch language: burstAt (crumbs into one fixed layer), shake, crunchLite, playCrack (the Snap centrepiece), CRACK geometry shared by the SVG path and clip-path halves
public/
  brand/                 logo.png (colour), logo-forest/cream/black.png (mask tints)
  products/              <slug>.png — supplied transparent cut-outs, untouched artwork
docs/                    this file, DESIGN.md, CONTENT.md (copy + research with sources)
```

## Data-driven and category-driven

No product card or category block is hard-coded. Everything derives from `content/products.ts` and
`content/categories.ts`:

| Add… | …and this updates itself |
|---|---|
| a SKU object | showcase conveyor, stroke marquee, rails, shop grid, search, product route, sitemap |
| a category object | home `CategoryShowcase` block, nav (via `site.nav`), filter chips, footer, mobile menu tiles, `/collections/<slug>`, sitemap, hero shelf chips, "Two shelves" heading count |
| a `tag` on a SKU (e.g. "Masala") | sticker on cards, filter chip in shop, search chip, "incl. Masala" chip in showcase and collection |

Categories mirror the client's shelves: Category 01 Freeze Dried (fruit + masala veg, 20g), Category 02
Jaggery Tea (100g). Masala is a `tag` inside Freeze Dried, matching the RFQ.

`PRICING_ENABLED = false` in `content/products.ts`. Price fields exist on the type; no source document
states a price, so nothing is shown and the cart summary says pricing arrives with the backend.

## Backend seam (later)

- `content/products.ts` → `GET /products` (same `Product` shape); `SearchOverlay.results` → `GET /search?q=`
- `lib/store.ts` cart actions → `POST /cart`, `POST /checkout`
- `WelcomeModal` / `DelightClub` / footer forms → `POST /subscribe`
- `contact` form → `POST /enquiry`
Nothing else knows about data origin.

## Libraries and why

| Lib | Used | Reason |
|---|---|---|
| gsap + ScrollTrigger | yes | entrances, orbit, velocity, pins, shells, curtain, cursor, swash draw |
| lenis | yes | smooth scroll, ticks off the GSAP ticker → one rAF; feeds the progress line and the hero scroll cue |
| swiper | yes | infinite autoplay conveyors (showcase, rail), creative-effect bundles slider (mirrored transforms) |
| zustand | yes | cart + UI state, persisted to localStorage |
| three / react-three-fiber | removed | procedural 3D fruit was tried in round 2 and rejected by the client; packs are the only imagery |
| slick / jQuery | no | Swiper covers every slider here; a jQuery-era stack adds ~100 kB for nothing |

## Motion architecture

- `useGsap(setup, deps)` creates a `gsap.context` scoped to a ref and reverts on unmount. The setup receives
  `{ gsap, ScrollTrigger, root, reduced }`.
- **Reduced-motion policy**: ambient loops keep running slower (orbit ring, marquees, conveyors); Lenis is off and
  every entrance, pin, parallax, shell lift and velocity effect is skipped. The page is never frozen or half-hidden.
- **Section transitions**: `SectionShell` wraps each home section with a rounded top, a soft upward shadow and an
  ascending z-index; a scrubbed tween relaxes the corner radius and lifts the content as the shell slides over the
  previous section. Shells around pinned sections (`pinned`) skip the content lift, since a transform on an ancestor
  would break the ScrollTrigger pin inside.
- **ScrollTrigger refresh**: `SmoothScroll` refreshes at 120/600/1500ms after each route, on `document.fonts.ready` and on
  `load`, because web fonts and the sticky hero shift pin positions after first paint (this is what made the manifesto
  reveal look "removed" when measured too early).
- **Parallax**: `ParallaxLayers` scans `[data-speed]` per route and scrubs each element ±(speed−1)·200px.
- **Page transition** (`PageTransition`, "threads"): nine thin strings draw in from the top and bottom edges, widen into bars
  to cover, then reverse; single colour, no seam. Hidden by CSS before hydration and only played after a `TransitionLink`
  covered the page (no sweep on fresh loads). `template.tsx` remounts per route.
- The first `SectionShell` after the hero uses `overlap={false}` so it never covers the hero CTA row.
- Hero is `sticky top-0`; the shells are `relative z-10+`. The footer is sticky-revealed on `lg` only.

## Mobile strategy

One breakpoint matters: `md` (768px). Below it the site is "phone"; at and above it the design is the desktop design.
Phone behaviour is expressed three ways, in this order of preference:

1. **Responsive classes** (`md:` / `lg:` prefixes, `min-[400px]:`, `pointer-fine:`) — layout, sizes, what is shown.
2. **`gsap.matchMedia()`** inside `useGsap` setups when the *motion* differs (FreezeStory: pin vs native carousel;
   Manifesto: shorter pin; SectionShell: gentler radius). Cleanup returns `mm.revert()`.
3. **Phone-only components** (`MobileBar`, the sticky bar inside `BuyBox`) rendered with `md:hidden`.

`ScrollTrigger.config({ ignoreMobileResize: true })` stops address-bar resizes from re-measuring pins. Fixed bottom
bars use `bottom-[max(0.75rem,env(safe-area-inset-bottom))]` and the viewport is `viewport-fit=cover`.

Verified widths: 360 (small Android), 390 (iPhone 14/15), 430 (Pro Max), 768 (tablet), 1440 (desktop). The mobile
suite (`mobile.js` in the session scratchpad) checks overflow, tap-target size, text under 11px, the hero ring vs the
header, tile label vs button, sticky bars, the carousel dots, the compare cards and that desktop still hides all of it.

## Cascade note (Tailwind v4)

Base resets live in `@layer base`, brand utilities in `@layer components`. Unlayered CSS beats all layers
regardless of specificity, so overrides of third-party CSS (Swiper, `.conveyor` linear easing) are unlayered on
purpose and nothing else is.

Rules learnt the hard way:
- A component-layer class that sets `color` loses to any Tailwind colour utility. Stroke text therefore uses
  `-webkit-text-fill-color: transparent` (`.stroke`); `stroke-fill` is declared with `@utility` so variants exist.
- `.swiper { overflow: visible }` lets packs poke above tiles, so every section holding a Swiper is `overflow-x-clip`.
- Marquee copies must not be `inert` (hit-test transparent); duplicates are `aria-hidden` and their links get `tabIndex={-1}`.
- Images in a flex row with a fixed height stretch unless the row is `items-end` (this is what squashed the
  collection-page packs in round 2).
- Elements hidden before hydration get the hidden state from CSS classes as well as `gsap.set`; GSAP parses an
  existing CSS translate into `y`, so setups zero it. Under React StrictMode a killed `gsap.from` leaves its start
  value behind, so intros use `fromTo` with explicit end values.

## Verification done (30 Sep 2026, round 4)

- Hero CTAs fully visible (nothing covers them); copy card removed; showcase packs float; tile watermark is the full name.
- Testimonials: 8-card deck plus 2 moving columns; PDP: 5 accordions, first open; 4-bar curtain lands on the target route.

Round 3:

- `next build`: 23 static routes, no type or lint errors.
- Headless Chrome at 1440×900 and 390×844: no console errors, no horizontal overflow, scroll-throughs on both.
- Hero ring vs headline: 0 intersections across 12 timed samples; ring still turns under reduced motion.
- Bundles slider: active slide centred with mirrored neighbours; route curtain is a single forest sheet;
  comparison table renders its 7 rows; collection packs keep their natural aspect.
- Dev server: `npm run dev` on port 3000 (Next falls back to 3001 if a stale process holds it).
