# VuDelight — Design System

Audience: Gen-Z and young women, India-first, mobile-first. Premium, playful, never clinical.
Brand truth (source documents): "Delight in Every Bite" · "Nourishing People. Enriching Lives." ·
"healthy food should never feel like a compromise" · "Premium. Natural. Wholesome." · "Good for you. Good for nature."
Client-supplied positioning (30 Sep 2026): natural, no preservatives, no palm oil, completely vegan.

## 1. Colour

Sampled from the supplied logo PDFs and pack artwork. Nothing invented.

| Token | Hex | Source | Use |
|---|---|---|---|
| `forest` | `#013215` | approved dark lockup | primary ink, dark sections, footer, route curtain |
| `leaf` | `#0A4D12` | "Delight" wordmark green | hover states, secondary ink |
| `lime` | `#6CA800` | logo leaf | micro accents, swash on pink |
| `pink` | `#E40054` | "Vu" wordmark | primary CTA, hero line two, Delight Club |
| `pink-ink` | `#B8003F` | darkened pink | pink text on cream (AA) |
| `tangerine` | `#FC9C00` | "u" wordmark | default swash, sale stickers, progress dots |
| `cream` | `#FBF5E9` | pack logo oval | page background |
| `cream-2` | `#F2E8D3` | derived | alternate shells, cards on cream |
| `ink` | `#0B1A10` | derived | body text |

Per-SKU accents live in `content/products.ts` (`accent`, `ink`). They are sampled from the actual pack artwork.
The page takes on the SKU colour via CSS vars `--sku`, `--sku-ink`, `--sku-soft`. Text on an accent uses
`--sku-ink`, never hard-coded white: Pineapple `#F6AE06` is 1.9:1 against white.

## 2. Type

- Display: **Fraunces** (variable, optical size + SOFT axis), regular weight, upright. No italics anywhere.
- Body / UI: **DM Sans**. Uppercase tracked text only inside stickers and marquees, never as a label above a heading.
- Scale (clamp): `t-display` 12vw→13rem · `t-h1` 2.8–6.5rem · `t-h2` 2.1–4.4rem · `t-h3` 1.4–2rem · body 1rem/1.6.
- **Emphasis device: the highlighter swash** (`components/ui/Hi.tsx`). A hand-drawn marker stroke sits behind the
  emphasised word(s) and draws itself when it scrolls into view. Colours: tangerine (default), pink on dark, lime on pink.
  This replaced the "one italic word per heading" habit and the eyebrow → heading → subtext template.
- Stroke text: `-webkit-text-fill-color: transparent; -webkit-text-stroke: 1.5px currentColor` (`.stroke`), filled with
  the `stroke-fill` utility. Used for the hero third line, the stroke marquee, and the footer wordmark.

## 3. Headings carry the section

No eyebrow labels. Every section heading states what the section is ("Two shelves. Twelve packs.", "Hover a word,
meet the pack.", "What's inside. What isn't."). Metadata that used to sit in eyebrows now lives in chips/stickers
(pack count, weight, tag) or the brand stamp.

**No stamps.** The logo lives in the header island, the footer, the preloader and the route curtain only. Sections
carry the brand through colour, type and the packs themselves.

## 4. Shape

- Cards: `rounded-[2rem]` (32px) — the Nutraj "oval box" tile. Pack at 58% width overflowing the top edge by 14%, full product name as a watermark sized to fit, label zone kept clear.
- Buttons: full pill. Primary = pink fill / cream text. Secondary = 1.5px forest outline. Dark = cream fill.
- Section shells: rounded top corners (6rem relaxing to 2.5rem as the shell arrives) with a soft upward shadow.
- Stickers: rotated 2–12°, pill, uppercase 11px. Tones: cream, forest, pink, tangerine, white, SKU.

## 5. Motion language

Rule: every entrance is `gsap.from`, so markup is final-state without JS.

| Name | Where | Spec |
|---|---|---|
| `chars-up` | hero headline, page titles | chars y 110%→0, stagger 0.018, 1.1s expo.out |
| `lines-mask` | section headings | lines y 100%→0 inside overflow-hidden, stagger 0.08 |
| `words-blur` | paragraphs | words opacity 0 / blur 8px → clear, stagger 0.02 |
| `swash` | emphasised words | marker path draws over 0.9s on entering the viewport |
| `reveal` | cards, images | y 40 / opacity 0 → 0, stagger 0.08 |
| `orbit` | hero | six packs on a ring wider than the headline, 50s loop, cursor parallax, scroll velocity spin |
| `shell` | every home section | rounded top relaxes and content lifts 70px→0 as the section slides over the previous one |
| `parallax` | pack imagery | `data-speed` elements drift ±(speed−1)·200px across their trip through the viewport |
| `velocity-skew` | marquees, rails | skewX from scroll velocity (±8°), marquee speed doubles with velocity |
| `conveyor` | category tiles, start-with-these rail | Swiper loop + autoplay delay 0, linear, pauses on hover |
| `stroke-marquee` | Hover a word section | 4 rows (3 on mobile), hover pauses the row, fills the word, pops the pack: top rows pop it below, bottom rows above, so it never leaves the section; all packs are pre-mounted so the first hover is instant |
| `creative-slider` | bundles | mirrored prev/next transforms (±92%, z −180, scale 0.9), autoplay 3s, packs float inside each card |
| `curtain` | route change | "threads": nine 2px forest strings draw in from top/bottom (0.32s), widen into bars (0.42s) until covered; the route starts loading as soon as the page is covered while the mark breathes; exit mirrors it in ~0.6s |
| `crack` | "Snap." closing the method story | the centrepiece (~4.5s): letters land → pressure squash + tremor → a glowing tangerine crack draws across the word → the word splits along the crack into two clip-path halves, fills solid with a flash, shockwave ring, 54-crumb storm, section shake → the halves breathe apart for a beat → elastic rejoin, fill fades back to outline. Full-width and centred at the end of the desktop pin (which holds 1.5 viewports for it); held 6.5s on the phone carousel. Replays on hover/tap |
| `nibble` | hero "Bite" | `crunchLite`: squash, instant fill, 24-crumb burst, jolt, elastic settle, fill fades; once after the headline lands (after the preloader), again on hover |
| `burst` | every add-to-bag ("+" on tiles, product page, sticky bar) | 12–19 crumbs from the button on gravity arcs plus an elastic pop of the button |
| `float` | showcase packs, footer rail, Freeze Dried header, bundle cards, method tiles, story tile | `Float` / `floatAll`: neighbours out of phase (one rises while the next settles), 2.8–3.7s sine loops on yPercent; "down" variant for packs hanging from an edge |
| `deck` | testimonials | Swiper cards effect, autoplay 3.5s; two side columns of mini reviews scroll in opposite directions, pause on hover |
| `magnetic` | nav links, CTAs | translate toward cursor ×0.15–0.35, elastic return |
| `cursor` | pointer-fine devices | trailing pink dot that rings over anything clickable |
| `progress` | top edge | 3px pink line driven by Lenis scroll progress |

Smooth scroll: Lenis, `lerp 0.09`, driven by the GSAP ticker (single rAF).

**Reduced motion policy.** `prefers-reduced-motion: reduce` (also what Windows reports with Animation effects off)
turns off Lenis and every entrance, pin, parallax, shell lift and velocity effect. Ambient loops keep going at half
speed (orbit ring, marquees, conveyors), so the page still feels alive and is never left half-hidden.

## 6. Signature components

- **Header — island nav**: floating glass pill, logo always visible, links centre, search / club / bag right. The
  announcement strip (three rotating product lines, not the tagline) folds away on scroll.
- **Hero — The Fruit Orbit**: three-line display type (filled / pink / outlined with a swash), six real packs on a ring
  sized so they never cross the type, two CTAs and a "See the shelves" cue that scrolls via Lenis. No copy block.
  Sticky: the page slides over it. Swappable: `components/hero/Hero.tsx` is the only import site.
- **CategoryShowcase**: one editorial block per category (colour panel, headline, fanned packs, CTA, pack-count /
  weight / tag chips, brand stamp) plus an infinite oval-tile conveyor when the shelf has five or more packs.
- **StrokeMarquee**: four rows of outlined type (Ocean Spray reference); hover pauses, fills, washes, pops the pack.
- **FreezeStory**: horizontal pinned method story, three beats with research-backed copy.
- **Compare**: sourced comparison table on the story page (freeze dried vs dehydrated/candied vs vacuum-fried).
- **Testimonials**: card deck in pack colours plus two counter-scrolling review columns. Sample reviews until the store connects.
- **DelightClub**: floating sticker wall on pink, one field, one button.
- **Footer — The Big Sign-off**: sticky reveal (lg+), stroke wordmark that fills on hover, hanging pack rail that keeps floating, signature line. On phones the Shop / Brand / Help columns are dropdowns.
- **WelcomeModal**: after the preloader on first visit, and from the header club icon any time.

## 7. Mobile (under 768px)

Same design, phone-native behaviour. Studied against Nutraj, Let's Try, Pureely and Gelato La Boca on a 390px viewport.
Everything below is phone-only; md+ is untouched.

- **Bottom tab bar** (`MobileBar`): floating forest pill with Home · Shop · Search · Bag, safe-area aware. Hidden on
  product pages, where the **sticky add-to-bag bar** (name, weight, stepper, Add) takes the same spot. The footer and
  the hero keep clearance for it.
- **Hero**: ring lowered and narrowed so packs never sit behind the header; CTAs stack full width; stickers row centred;
  no copy card; scroll cue hidden.
- **Type floors**: `t-h1` and `t-h2` minimums drop to 2.4rem / 1.85rem so display type fits a 326px column; the vw
  midpoint keeps tablet and desktop exactly as before.
- **Category blocks**: single column (two columns only from lg), tighter padding, watermark and stamp hidden.
- **Method story**: native swipe carousel of stacked cards with dots instead of the pinned horizontal scroll, auto-advancing
  every 3.25s while on screen and pausing under a finger; the Snap. crunch fires when the last card settles.
- **Rail**: no arrow buttons on touch (swipe); the dark panel grows straight out of the method section, no cream sliver.
- **Menu**: links start under the header, shelf tiles follow, signature and Contact sit at the foot. No dead space.
- **Manifesto**: the jamun pack floats above the text on phones instead of jamming into the next section.
- **Stroke marquee** says "Tap a word" and drops the fourth row.
- **Product tiles**: quick-add "+" top-right, label full width, name at 1.25rem, so two-up grids never overlap.
  The "+" is white with the pack colour everywhere and turns black once that product is in the bag.
- **Filters**: one swipeable chip row that sticks under the header while browsing.
- **Comparison table** becomes one card per row with the three methods listed inside.
- **Delight Club** stickers flow as a level wrapped cloud (rotation is an md+ flourish).
- **Rhythm**: section padding 3.5rem instead of 5–7rem; grid gaps tightened; page tops start 3rem under the header.
- **Touch**: all controls at least 40×40 (most 44); no text under 11px; `pointer-fine:` variant hides cursor-only hints;
  bigger Swiper bullets; `-webkit-tap-highlight-color` off; `viewport-fit=cover` for notches.

## 8. Accessibility floor

AA contrast on every text pair (checked per SKU). Visible focus rings (`outline: 2px solid pink`).
All motion optional. Keyboard-reachable menus, drawer, search and modal (Esc closes). Marquee duplicates are
`aria-hidden` with `tabIndex -1` links.
