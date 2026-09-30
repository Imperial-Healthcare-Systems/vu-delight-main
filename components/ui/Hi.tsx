"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const strokes = {
  tangerine: "var(--color-tangerine)",
  pink: "var(--color-pink)",
  lime: "var(--color-lime)",
  cream: "var(--color-cream)",
  sku: "var(--sku)",
};

/**
 * Hand-drawn highlighter swash behind a word or two. The marker draws itself when it scrolls into
 * view. This is the site's one emphasis device: no italics, no bold-vs-regular games.
 */
export function Hi({ children, color = "tangerine", className }: { children: ReactNode; color?: keyof typeof strokes; className?: string }) {
  const ref = useGsap<HTMLSpanElement>(({ gsap, root, reduced }) => {
    const path = root.querySelector("path");
    if (!path || reduced) return;
    const len = path.getTotalLength();
    gsap.fromTo(
      path,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", delay: 0.2, scrollTrigger: { trigger: root, start: "top 88%", once: true } },
    );
  });
  return (
    <span ref={ref} className={cn("relative isolate inline-block whitespace-nowrap", className)}>
      <svg
        className="pointer-events-none absolute -left-[0.12em] top-[0.52em] -z-10 h-[0.5em] w-[calc(100%+0.24em)]"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M2 13 C 18 5, 38 17, 56 9 S 84 3, 98 11" fill="none" stroke={strokes[color]} strokeWidth="9" strokeLinecap="round" opacity="0.8" />
      </svg>
      <span className="relative">{children}</span>
    </span>
  );
}
