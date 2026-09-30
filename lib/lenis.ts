"use client";

import Lenis from "lenis";
import { ensureGsap } from "./gsap";

let lenis: Lenis | null = null;

/** Singleton Lenis, stepped by the GSAP ticker so scroll and animation share one rAF. */
export function startLenis() {
  if (lenis || typeof window === "undefined") return lenis;
  const { gsap, ScrollTrigger } = ensureGsap();
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export const getLenis = () => lenis;
export const scrollTo = (target: string | number | HTMLElement, offset = 0) =>
  lenis ? lenis.scrollTo(target, { offset }) : window.scrollTo({ top: typeof target === "number" ? target : 0 });
