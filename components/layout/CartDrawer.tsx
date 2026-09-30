"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useCart, useUI } from "@/lib/store";
import { displayName, getProduct, PRICING_ENABLED, products } from "@/content/products";
import { Button, Arrow } from "@/components/ui/Button";
import { TransitionLink } from "./TransitionLink";
import { cn, skuVars } from "@/lib/utils";

/** Nutraj-style drawer: empty state with personality, lines, then an "add these too" rail. */
export function CartDrawer() {
  const { cartOpen, setCart } = useUI();
  const { lines, setQty, remove, add } = useCart();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCart(false);
    window.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCart]);

  const inCart = new Set(lines.map((l) => l.slug));
  const suggest = products.filter((p) => !inCart.has(p.slug)).slice(0, 6);
  const total = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <div className={cn("fixed inset-0 z-[70]", cartOpen ? "" : "pointer-events-none")} aria-hidden={!cartOpen}>
      <button
        className={cn("absolute inset-0 bg-forest/40 backdrop-blur-[2px] transition-opacity duration-500", cartOpen ? "opacity-100" : "opacity-0")}
        onClick={() => setCart(false)}
        aria-label="Close cart"
        tabIndex={cartOpen ? 0 : -1}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Your bag"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream text-ink shadow-2xl transition-transform duration-600 ease-[var(--ease-out-expo)] sm:m-3 sm:h-[calc(100%-1.5rem)] sm:rounded-[2rem]",
          cartOpen ? "translate-x-0" : "translate-x-[110%]",
        )}
      >
        <div className="flex items-center justify-between border-b border-forest/10 px-6 py-5">
          <h2 className="t-h3 font-display">
            Your bag <span className="ml-2 align-middle text-sm font-sans opacity-60">{total} item{total === 1 ? "" : "s"}</span>
          </h2>
          <button onClick={() => setCart(false)} className="pill h-10 w-10 border-[1.5px] border-current text-xl leading-none" aria-label="Close">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="relative mb-6 h-32 w-32">
                <span className="absolute inset-0 rounded-full bg-cream-2" />
                <Image src="/products/mix-fruit.png" alt="" width={90} height={140} className="pack-shadow absolute left-1/2 top-1/2 w-20 -translate-x-1/2 -translate-y-1/2 -rotate-12" />
              </div>
              <p className="t-h3 font-display">Empty. Tragic.</p>
              <p className="mt-2 max-w-xs opacity-70">Room for everything. Start with one bag and see what happens.</p>
              <Button href="/shop" className="mt-6" variant="primary">
                Go shopping <Arrow />
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map((l) => {
                const p = getProduct(l.slug);
                if (!p) return null;
                return (
                  <li key={l.slug} className="flex gap-4 rounded-2xl bg-white/70 p-3" style={skuVars(p.accent, p.ink, p.soft)}>
                    <div className="sku-soft grid h-24 w-20 shrink-0 place-items-center rounded-xl">
                      <Image src={p.image} alt="" width={60} height={95} className="w-14" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <TransitionLink href={`/products/${p.slug}`} className="font-semibold leading-tight hover:underline">
                        {displayName(p)}
                      </TransitionLink>
                      <span className="text-xs opacity-60">{p.weight}</span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="pill flex items-center border border-forest/15">
                          <button onClick={() => setQty(l.slug, l.qty - 1)} className="h-8 w-8" aria-label="Decrease">
                            −
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                          <button onClick={() => setQty(l.slug, l.qty + 1)} className="h-8 w-8" aria-label="Increase">
                            +
                          </button>
                        </div>
                        <button onClick={() => remove(l.slug)} className="text-xs underline opacity-60 hover:opacity-100">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          {suggest.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 font-display text-xl">{lines.length ? "Add these too" : "People start with"}</p>
              <div className="-mx-6 flex gap-3 overflow-x-auto px-6 pb-2 scrollbar-none">
                {suggest.map((p) => (
                  <div key={p.slug} className="tile sku-soft w-36 shrink-0 p-3" style={skuVars(p.accent, p.ink, p.soft)}>
                    <Image src={p.image} alt="" width={80} height={130} className="mx-auto h-24 w-auto" />
                    <p className="mt-2 truncate text-xs font-semibold">{displayName(p)}</p>
                    <button onClick={() => add(p.slug)} className="pill sku-bg mt-2 w-full py-1.5 text-xs font-semibold">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-forest/10 px-6 py-5">
          {PRICING_ENABLED ? null : (
            <p className="mb-3 text-xs opacity-60">Pricing and checkout switch on when the store connects. Your bag is saved on this device.</p>
          )}
          <Button className="w-full" variant="primary" disabled={!PRICING_ENABLED || lines.length === 0} magnetic={false}>
            {PRICING_ENABLED ? "Checkout" : "Checkout, coming soon"}
          </Button>
        </div>
      </div>
    </div>
  );
}
