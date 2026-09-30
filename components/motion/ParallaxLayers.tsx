"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ensureGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/utils";

/**
 * Depth for anything marked `data-speed`. 1 = moves with the page; 1.2 drifts 40px against it across its
 * own trip through the viewport; 0.9 lags behind. Re-scans on every route so new pages pick it up.
 */
export function ParallaxLayers() {
  const path = usePathname();
  useEffect(() => {
    if (reducedMotion()) return;
    const { gsap, ScrollTrigger } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const d = (parseFloat(el.dataset.speed ?? "1") - 1) * 200;
        gsap.fromTo(el, { y: -d }, { y: d, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [path]);
  return null;
}
