"use client";

import Image from "next/image";
import { Tilt } from "@/components/motion/Tilt";
import { Sticker } from "@/components/ui/Sticker";
import { displayName } from "@/content/products";
import type { Product } from "@/lib/types";
import { useGsap } from "@/lib/gsap";

/**
 * 2.5D stage: the pack floats, tilts toward the cursor, and its colour spills across a rounded panel.
 * The word behind is the SKU name in stroke, echoing the hero.
 */
export function ProductGallery({ p }: { p: Product }) {
  const ref = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    gsap.from(root.querySelector("[data-stage]"), { scale: 0.9, opacity: 0, duration: 1, ease: "expo.out" });
    gsap.from(root.querySelector("[data-pack]"), { y: 120, rotate: -12, opacity: 0, duration: 1.3, ease: "expo.out", delay: 0.15 });
    gsap.to(root.querySelector("[data-float]"), { y: -14, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.5 });
    gsap.to(root.querySelector("[data-pack]"), { y: -60, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } });
  });

  return (
    <div ref={ref} className="lg:sticky lg:top-[calc(var(--header-h)+1rem)]">
      <div data-stage className="tile sku-bg noise relative aspect-[4/5] overflow-hidden sm:aspect-square lg:aspect-[4/5] @container">
        <p className="t-display pointer-events-none absolute left-1/2 top-[8%] w-full -translate-x-1/2 select-none text-center text-[22cqw] leading-none opacity-20" aria-hidden>
          {p.name}
        </p>
        <span className="stroke t-display pointer-events-none absolute bottom-[4%] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[18cqw] leading-none opacity-40" aria-hidden>
          {p.descriptor}
        </span>
        <Sticker tone="cream" rotate={-6} className="absolute left-5 top-5 z-20">
          {p.weight}
        </Sticker>
        {p.isNew && (
          <Sticker tone="white" rotate={5} className="absolute right-5 top-5 z-20">
            New
          </Sticker>
        )}
        <Tilt className="absolute inset-0 grid place-items-center" max={9}>
          <div data-pack className="w-[62%] will-change-transform">
            <div data-float>
              <Image src={p.image} alt={displayName(p)} width={520} height={840} priority sizes="(min-width:1024px) 34vw, 70vw" className="pack-shadow w-full" />
            </div>
          </div>
        </Tilt>
      </div>
      <p className="mt-3 text-center text-xs opacity-50">
        Actual pack artwork.<span className="hidden pointer-fine:inline"> Move your cursor over it.</span>
      </p>
    </div>
  );
}
