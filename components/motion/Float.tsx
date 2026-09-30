"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/lib/gsap";

/**
 * Idle float for anything marked `data-float` inside it. Neighbours run out of phase (one rises while
 * the next settles), on slightly different periods so the group never locks into step.
 * `dir` is the side the packs lift towards: "up" for packs standing on a base line, "down" for packs
 * hanging from an edge. Uses yPercent, so it stacks with entrance and parallax tweens that use y.
 * Ambient motion: keeps going under prefers-reduced-motion at a third of the amplitude.
 */
export function Float({ children, className, amp = 6, dir = "up" }: { children: ReactNode; className?: string; amp?: number; dir?: "up" | "down" }) {
  const ref = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    floatAll(gsap, root.querySelectorAll<HTMLElement>("[data-float]"), reduced ? amp / 3 : amp, dir);
  });
  return (
    <div ref={ref} className={className ?? "contents"}>
      {children}
    </div>
  );
}

/** Shared by components that already own a GSAP context. */
export function floatAll(gsap: typeof import("gsap").gsap, items: Iterable<HTMLElement>, amp: number, dir: "up" | "down" = "up") {
  const s = dir === "up" ? -amp : amp;
  Array.from(items).forEach((el, i) => {
    const from = i % 2 ? s : 0;
    const to = i % 2 ? 0 : s;
    gsap.fromTo(el, { yPercent: from }, { yPercent: to, duration: 2.8 + (i % 3) * 0.45, yoyo: true, repeat: -1, ease: "sine.inOut", delay: (i % 4) * 0.2 });
  });
}
