"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "./TransitionLink";
import { useCart, useUI } from "@/lib/store";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Mobile-only floating tab bar (Home · Shop · Search · Bag), the pattern Nutraj and most Indian D2C
 * stores use so the store is one thumb away from anywhere. Hidden on product pages, where the
 * BuyBox renders its own sticky add-to-bag bar in the same spot.
 */
export function MobileBar() {
  const path = usePathname();
  const { setSearch, setCart } = useUI();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  if (path.startsWith("/products/")) return null;

  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.68rem] font-semibold tracking-wide transition-colors";
  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex items-stretch rounded-full bg-forest/95 text-cream shadow-[0_12px_40px_rgba(1,50,21,.28)] backdrop-blur-xl md:hidden"
    >
      <TransitionLink href="/" className={cn(item, active("/") && "text-tangerine")} aria-current={active("/") ? "page" : undefined}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
          <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-9Z" />
        </svg>
        {site.mobileBar.home}
      </TransitionLink>
      <TransitionLink href="/shop" className={cn(item, active("/shop") || active("/collections") ? "text-tangerine" : "")} aria-current={active("/shop") ? "page" : undefined}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="4" y="4" width="7" height="7" rx="2" />
          <rect x="13" y="4" width="7" height="7" rx="2" />
          <rect x="4" y="13" width="7" height="7" rx="2" />
          <rect x="13" y="13" width="7" height="7" rx="2" />
        </svg>
        {site.mobileBar.shop}
      </TransitionLink>
      <button onClick={() => setSearch(true)} className={item} aria-label={site.mobileBar.search}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
        {site.mobileBar.search}
      </button>
      <button onClick={() => setCart(true)} className={cn(item, "relative")} aria-label={`${site.mobileBar.bag}, ${count} items`}>
        <span className="relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6 7h12l1 13H5L6 7Zm3 0a3 3 0 0 1 6 0" strokeLinejoin="round" />
          </svg>
          {count > 0 && <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-tangerine px-1 text-[0.6rem] font-bold text-ink">{count}</span>}
        </span>
        {site.mobileBar.bag}
      </button>
    </nav>
  );
}
