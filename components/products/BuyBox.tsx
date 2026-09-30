"use client";

import Image from "next/image";
import { useState } from "react";
import { BRAND_BADGES, displayName, PRICING_ENABLED } from "@/content/products";
import { useCart, useUI } from "@/lib/store";
import type { Product } from "@/lib/types";
import { BadgeIconSvg } from "@/components/ui/Sticker";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ProductDetails } from "./ProductDetails";

export function BuyBox({ p }: { p: Product }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const setCart = useUI((s) => s.setCart);
  const addToBag = () => {
    add(p.slug, qty);
    setCart(true);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <TextReveal as="h1" mode="chars" immediate className="t-h1 font-display text-forest">
          {p.name}
        </TextReveal>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="sticker sku-bg">{p.descriptor === "Jaggery Tea With" ? "Jaggery tea" : p.descriptor}</span>
          <span className="sticker border border-forest/20 text-forest">{p.weight}</span>
          {p.tag && <span className="sticker bg-forest text-cream">{p.tag}</span>}
          {p.isNew && <span className="sticker bg-tangerine text-ink">New</span>}
        </div>
        <TextReveal mode="words" immediate delay={0.3} className="t-lead mt-5 opacity-85">
          {p.hook}
        </TextReveal>
      </div>

      <Reveal className="flex flex-wrap gap-2">
        {[...p.badges, ...BRAND_BADGES].map((b) => (
          <span key={b.label} data-item className="sticker sku-soft text-forest">
            <BadgeIconSvg icon={b.icon} className="h-3.5 w-3.5" /> {b.label}
          </span>
        ))}
      </Reveal>

      <div className="flex flex-wrap items-center gap-3">
        <div className="pill flex items-center border-[1.5px] border-forest/20">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-12 w-12 text-lg" aria-label="Decrease quantity">
            −
          </button>
          <span className="w-8 text-center font-semibold" aria-live="polite">
            {qty}
          </span>
          <button onClick={() => setQty(qty + 1)} className="h-12 w-12 text-lg" aria-label="Increase quantity">
            +
          </button>
        </div>
        <button onClick={addToBag} className="pill sku-bg flex-1 px-6 py-3.5 font-semibold transition-[filter,transform] hover:brightness-95 active:scale-[0.98] md:px-8">
          Add to bag<span className="hidden sm:inline"> · {displayName(p)}</span>
        </button>
      </div>
      {!PRICING_ENABLED && <p className="-mt-4 text-xs opacity-55">Pricing goes live with the store. Your bag saves on this device.</p>}

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl">About</h2>
          <p className="mt-3 leading-relaxed opacity-85">{p.description}</p>
        </div>
        <div>
          <h2 className="font-display text-xl">How to enjoy</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {p.enjoy.map((e, i) => (
              <li key={e} className="flex gap-3">
                <span className="sku-bg grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold">{i + 1}</span>
                <span className="leading-snug opacity-85">{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProductDetails p={p} />

      {/* Mobile-only sticky bar: the standard D2C pattern so the buy action stays one thumb away while reading. */}
      <div className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex items-center gap-2 rounded-full border border-forest/10 bg-cream/95 p-1.5 pl-2 shadow-[0_12px_40px_rgba(1,50,21,.18)] backdrop-blur-xl md:hidden">
        <span className="sku-soft hidden h-10 w-10 shrink-0 place-items-center rounded-full min-[400px]:grid" aria-hidden>
          <Image src={p.image} alt="" width={28} height={44} className="h-7 w-auto" />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate font-display text-base">{p.name}</p>
          <p className="text-[0.7rem] opacity-60">{p.weight}</p>
        </div>
        <div className="pill flex items-center border border-forest/20" aria-label="Quantity">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 text-base" aria-label="Decrease quantity">
            −
          </button>
          <span className="w-5 text-center text-sm font-semibold">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="h-10 w-10 text-base" aria-label="Increase quantity">
            +
          </button>
        </div>
        <button onClick={addToBag} className="pill sku-bg h-11 shrink-0 px-4 text-sm font-semibold active:scale-[0.98]">
          Add to bag
        </button>
      </div>
    </div>
  );
}
