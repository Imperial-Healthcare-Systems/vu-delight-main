"use client";

import Image from "next/image";
import { useEffect } from "react";
import { TransitionLink } from "./TransitionLink";
import { useUI } from "@/lib/store";
import { site } from "@/content/site";
import { categories } from "@/content/categories";
import { byCategory } from "@/content/products";
import { useGsap } from "@/lib/gsap";
import { cn, skuVars } from "@/lib/utils";

export function MobileMenu() {
  const { menuOpen, setMenu } = useUI();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMenu]);

  const ref = useGsap<HTMLDivElement>(
    ({ gsap, root, reduced }) => {
      if (!menuOpen || reduced) return;
      gsap.from(root.querySelectorAll("[data-link]"), { yPercent: 100, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.06, delay: 0.15 });
      gsap.from(root.querySelectorAll("[data-tile]"), { y: 30, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.08, delay: 0.4 });
    },
    [menuOpen],
  );

  return (
    <div
      id="mobile-menu"
      ref={ref}
      className={cn(
        "fixed inset-0 z-[55] flex flex-col bg-forest text-cream transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden",
        menuOpen ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]",
      )}
      aria-hidden={!menuOpen}
    >
      <div className="container-x flex flex-1 flex-col justify-end gap-8 pb-10 pt-32">
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {site.nav.map((n, i) => (
            <span key={n.href} className="line-mask">
              <TransitionLink data-link href={n.href} className="t-h2 block font-display leading-none">
                <span className="mr-4 align-top text-[0.6rem] tracking-widest opacity-50">0{i + 1}</span>
                {n.label}
              </TransitionLink>
            </span>
          ))}
        </nav>
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {categories.map((c) => {
            const p = byCategory(c.slug)[0];
            return (
              <TransitionLink
                key={c.slug}
                data-tile
                href={`/collections/${c.slug}`}
                className="tile sku-bg relative flex h-40 w-36 shrink-0 flex-col justify-end overflow-hidden p-4"
                style={skuVars(c.accent, c.ink, c.accent)}
              >
                <Image src={p.image} alt="" width={120} height={190} className="pack-shadow absolute -right-4 -top-3 w-20 rotate-12" />
                <span className="relative z-10 text-sm font-semibold">{c.short}</span>
              </TransitionLink>
            );
          })}
        </div>
        <p className="text-sm opacity-60">{site.signature}</p>
      </div>
    </div>
  );
}
