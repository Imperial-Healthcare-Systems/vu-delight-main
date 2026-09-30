"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Marquee } from "@/components/motion/Marquee";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Logo } from "@/components/ui/Logo";
import { byCategory, products } from "@/content/products";
import { categories } from "@/content/categories";
import { site } from "@/content/site";
import { cn, skuVars } from "@/lib/utils";

interface Word {
  key: string;
  label: string;
  href: string;
  accent: string;
  ink: string;
  soft: string;
  image?: string;
}

/** Category names first, then every SKU; the rows are dealt round-robin so each has a mix. */
const words: Word[] = [
  ...categories.map((c) => ({ key: `cat-${c.slug}`, label: c.name, href: `/collections/${c.slug}`, accent: c.accent, ink: c.ink, soft: c.accent, image: byCategory(c.slug)[0]?.image })),
  ...products.map((p) => ({ key: p.slug, label: p.descriptor === "Jaggery Tea With" ? `${p.name} Chai` : p.name, href: `/products/${p.slug}`, accent: p.accent, ink: p.ink, soft: p.soft, image: p.image })),
];
const ROWS = 4;
const rows = Array.from({ length: ROWS }, (_, r) => words.filter((_, i) => i % ROWS === r));
const SPEEDS = [44, 60, 36, 52];

/**
 * Four rows of outlined type moving at different speeds and directions (Ocean Spray reference).
 * Hover or focus a word: the row pauses, the word fills in its pack colour, the section washes with
 * that colour and the pack pops above (even rows) or below (odd rows) the word.
 */
export function StrokeMarquee() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState<{ w: Word; x: number; y: number; below: boolean } | null>(null);

  const hover = (w: Word, el: HTMLElement, row: number) => {
    const r = el.getBoundingClientRect();
    const s = ref.current!.getBoundingClientRect();
    const below = row % 2 === 1;
    setActive({ w, x: r.left - s.left + r.width / 2, y: r.top - s.top + (below ? r.height : 0), below });
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-14 md:py-20"
      aria-labelledby="stroke-title"
      style={active ? skuVars(active.w.accent, active.w.ink, active.w.soft) : undefined}
      onPointerLeave={() => setActive(null)}
    >
      <div
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", active ? "opacity-25" : "opacity-0")}
        style={{ background: "radial-gradient(55% 70% at 50% 50%, var(--sku), transparent 72%)" }}
        aria-hidden
      />

      <div className="container-x relative mb-6 flex items-end justify-between gap-6 md:mb-8">
        <h2 id="stroke-title" className="t-h3 font-display">
          {site.strokeHeading}
        </h2>
        <p className="hidden items-center gap-3 text-sm opacity-60 md:flex">
          {products.length} packs · {categories.length} shelves
          <span className="grid h-10 w-10 -rotate-12 place-items-center rounded-full border border-cream/25" aria-hidden>
            <Logo variant="cream" className="h-4" />
          </span>
        </p>
      </div>

      <div className="relative flex flex-col gap-0 md:gap-1">
        {rows.map((row, ri) => (
          <Marquee key={ri} interactive pauseOnHover speed={SPEEDS[ri]} reverse={ri % 2 === 1} repeat={3} skew={false} className={cn(ri === ROWS - 1 && "hidden md:block")}>
            {(copy) =>
              row.map((w) => {
                const on = active?.w.key === w.key;
                return (
                  <span key={w.key} className="flex items-center" style={skuVars(w.accent, w.ink, w.soft)}>
                    <TransitionLink
                      href={w.href}
                      tabIndex={copy ? -1 : 0}
                      onPointerEnter={(e) => hover(w, e.currentTarget, ri)}
                      onFocus={(e) => hover(w, e.currentTarget, ri)}
                      className={cn(
                        "stroke whitespace-nowrap px-[0.3em] font-display text-[clamp(2.6rem,8vw,7.5rem)] leading-[1.05] tracking-[-0.03em] transition-[color,-webkit-text-fill-color,transform] duration-300",
                        on ? "stroke-fill scale-[1.04] text-[var(--sku)]" : "text-cream/80 hover:text-cream",
                      )}
                    >
                      {w.label}
                    </TransitionLink>
                    <span className="mx-[0.3em] h-[0.6vw] min-h-2 w-[0.6vw] min-w-2 rounded-full bg-tangerine" aria-hidden />
                  </span>
                );
              })
            }
          </Marquee>
        ))}

        {active?.w.image && (
          <Image
            key={active.w.key}
            src={active.w.image}
            alt=""
            width={200}
            height={320}
            className="pack-shadow pointer-events-none absolute z-20 hidden w-[9vw] max-w-[150px] animate-[pop_.5s_var(--ease-out-expo)_both] md:block"
            style={{ left: active.x, top: active.below ? active.y + 6 : active.y - 6, ["--pop-y" as string]: active.below ? "0%" : "-100%" }}
            aria-hidden
          />
        )}
      </div>
    </section>
  );
}
