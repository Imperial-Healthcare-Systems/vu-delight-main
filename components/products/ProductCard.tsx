"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { displayName } from "@/content/products";
import { useCart, useUI } from "@/lib/store";
import type { Product } from "@/lib/types";
import { cn, skuVars } from "@/lib/utils";

/**
 * Two skins from the same data:
 *  "tile"  → Nutraj-style coloured oval box, pack overflowing the top (rails, tiles)
 *  "card"  → white card on dark (Exotic-Nuts style rail), name + weight + quick add
 */
export function ProductCard({ p, skin = "tile", className, priority }: { p: Product; skin?: "tile" | "card"; className?: string; priority?: boolean }) {
  const add = useCart((s) => s.add);
  const setCart = useUI((s) => s.setCart);
  const quick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(p.slug);
    setCart(true);
  };

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
          <button onClick={quick} className="pill sku-bg h-10 w-10 shrink-0 text-xl leading-none transition-transform hover:scale-110" aria-label={`Add ${displayName(p)} to bag`}>
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
        {p.tag && <span className="sticker absolute right-4 top-4 z-10 bg-[var(--sku-ink)] text-[var(--sku)]">{p.tag}</span>}
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
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
          <div>
            <p className="text-[0.72rem] opacity-80">{p.descriptor}</p>
            <p className="font-display text-2xl leading-none md:text-3xl">{p.name}</p>
          </div>
          <button onClick={quick} className="pill grid h-10 w-10 place-items-center bg-[var(--sku-ink)] text-[var(--sku)] transition-transform hover:scale-110" aria-label={`Add ${displayName(p)} to bag`}>
            +
          </button>
        </div>
      </div>
    </TransitionLink>
  );
}
