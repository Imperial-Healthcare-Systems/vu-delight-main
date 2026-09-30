"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { displayName } from "@/content/products";
import { useCart, useUI } from "@/lib/store";
import type { Product } from "@/lib/types";
import { cn, reducedMotion, skuVars } from "@/lib/utils";
import { ensureGsap } from "@/lib/gsap";
import { burstAt } from "@/lib/crunch";

/**
 * Two skins from the same data:
 *  "tile"  → Nutraj-style coloured oval box, pack overflowing the top (rails, tiles, grids)
 *  "card"  → white card on dark (Exotic-Nuts style rail), name + weight + quick add
 *
 * Quick-add "+": white with the pack colour on every tile; turns black once that product is in the bag.
 * Tile on phones: the "+" sits top-right and the label spans the full width, so long names never run
 * under the button in a two-column grid. On md+ the button returns to the bottom-right corner.
 */
export function ProductCard({ p, skin = "tile", className, priority }: { p: Product; skin?: "tile" | "card"; className?: string; priority?: boolean }) {
  const add = useCart((s) => s.add);
  const inBag = useCart((s) => s.lines.some((l) => l.slug === p.slug));
  const setCart = useUI((s) => s.setCart);
  const quick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!reducedMotion()) {
      const { gsap } = ensureGsap();
      const r = e.currentTarget.getBoundingClientRect();
      burstAt(gsap, [{ x: r.left + r.width / 2, y: r.top + r.height / 2 }], { count: 12, shards: 2, spread: 100, lift: 80, size: [3, 7], duration: [0.5, 0.9] });
      gsap.fromTo(e.currentTarget, { scale: 0.75 }, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    }
    add(p.slug);
    setCart(true);
  };
  const label = inBag ? `${displayName(p)} is in your bag. Add another` : `Add ${displayName(p)} to bag`;

  if (skin === "card") {
    return (
      <TransitionLink
        href={`/products/${p.slug}`}
        className={cn("group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-4 text-ink shadow-[0_20px_50px_rgba(0,0,0,.18)]", className)}
        style={skuVars(p.accent, p.ink, p.soft)}
      >
        {p.isNew && <span className="sticker sku-bg absolute left-4 top-4 z-10">New</span>}
        {p.tag && <span className="sticker absolute right-4 top-4 z-10 bg-forest text-cream">{p.tag}</span>}
        <div className="sku-soft relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
          <Image src={p.image} alt={displayName(p)} fill sizes="(min-width:1024px) 22vw, 70vw" priority={priority} className="object-contain p-5 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.06] group-hover:-rotate-2" />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[0.72rem] opacity-60">{p.descriptor}</p>
            <p className="font-display text-xl leading-tight">{p.name}</p>
            <p className="mt-1 text-xs opacity-60">{p.weight}</p>
          </div>
          <button
            onClick={quick}
            className={cn("pill h-11 w-11 shrink-0 text-xl leading-none transition-[transform,background-color,color] duration-300 hover:scale-110 md:h-10 md:w-10", inBag ? "bg-ink text-cream" : "sku-bg")}
            aria-label={label}
          >
            +
          </button>
        </div>
      </TransitionLink>
    );
  }

  return (
    <TransitionLink
      href={`/products/${p.slug}`}
      className={cn("group relative block pt-[14%]", className)}
      style={skuVars(p.accent, p.ink, p.soft)}
      aria-label={displayName(p)}
    >
      <div className="tile sku-bg noise relative aspect-[4/5] overflow-visible @container transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
        {p.tag && <span className="sticker absolute left-3 top-3 z-10 bg-white text-forest md:left-auto md:right-4 md:top-4">{p.tag}</span>}
        <p
          className="t-display pointer-events-none absolute inset-x-4 bottom-[24%] select-none whitespace-nowrap leading-none opacity-[0.14]"
          style={{ fontSize: `min(22cqw, ${(88 / (p.name.length * 0.58)).toFixed(1)}cqw)` }}
          aria-hidden
        >
          {p.name}
        </p>
        <Image
          src={p.image}
          alt=""
          width={400}
          height={640}
          sizes="(min-width:1024px) 20vw, 60vw"
          priority={priority}
          className="pack-shadow absolute left-1/2 top-[-14%] w-[58%] -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-3 group-hover:rotate-[-4deg] group-hover:scale-105"
        />
        <div className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5 md:pr-14">
          <p className="text-[0.72rem] opacity-80">{p.descriptor}</p>
          <p className="font-display text-xl leading-none md:text-3xl">{p.name}</p>
        </div>
        <button
          onClick={quick}
          className={cn(
            "pill absolute right-3 top-3 z-20 grid h-10 w-10 place-items-center text-xl leading-none shadow-[0_6px_20px_rgba(1,50,21,.15)] transition-[transform,background-color,color] duration-300 hover:scale-110 md:bottom-5 md:right-5 md:top-auto",
            inBag ? "bg-ink text-cream" : "bg-white text-[var(--sku)]",
          )}
          aria-label={label}
        >
          +
        </button>
      </div>
    </TransitionLink>
  );
}
