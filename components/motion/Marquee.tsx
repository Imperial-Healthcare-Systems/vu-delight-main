"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee whose speed and skew respond to scroll velocity (velocity-skew, DESIGN.md §4).
 * Content is repeated `repeat` times per track so the seam never shows on wide screens.
 * Under prefers-reduced-motion it keeps drifting at half speed with no skew or velocity boost.
 *
 * `interactive`: the copies stay hoverable/clickable (no `inert`, which would make them hit-test
 * transparent); duplicates are `aria-hidden`, and `children` may be a function receiving the copy
 * index so the caller can set `tabIndex={-1}` on links in copies > 0.
 */
export function Marquee({
  children,
  className,
  speed = 60, // px per second at rest
  reverse = false,
  repeat = 3,
  skew = true,
  pauseOnHover = false,
  interactive = false,
}: {
  children: ReactNode | ((copy: number) => ReactNode);
  className?: string;
  speed?: number;
  reverse?: boolean;
  repeat?: number;
  skew?: boolean;
  pauseOnHover?: boolean;
  interactive?: boolean;
}) {
  const ref = useGsap<HTMLDivElement>(({ gsap, ScrollTrigger, root, reduced }) => {
    const track = root.querySelector<HTMLElement>(".marquee-track")!;
    const half = track.scrollWidth / 2;
    const dir = reverse ? 1 : -1;
    const wrap = gsap.utils.wrap(-half, 0);
    const base = reduced ? speed * 0.5 : speed;
    const x = { v: 0 };
    let boost = 1;
    let paused = false;
    const tick = (_t: number, dt: number) => {
      if (paused) return;
      x.v += (dir * base * boost * dt) / 1000;
      gsap.set(track, { x: wrap(x.v) });
    };
    gsap.ticker.add(tick);
    const enter = () => (paused = true);
    const leave = () => (paused = false);
    if (pauseOnHover) {
      root.addEventListener("pointerenter", enter);
      root.addEventListener("pointerleave", leave);
    }
    const st = reduced
      ? null
      : ScrollTrigger.create({
          onUpdate: (self) => {
            const v = self.getVelocity();
            boost = 1 + Math.min(Math.abs(v) / 400, 5);
            if (skew) gsap.to(root, { skewX: gsap.utils.clamp(-8, 8, v / -300), duration: 0.4, overwrite: true });
            gsap.to({}, { duration: 0.3, onComplete: () => (boost = 1) });
          },
        });
    return () => {
      gsap.ticker.remove(tick);
      st?.kill();
      root.removeEventListener("pointerenter", enter);
      root.removeEventListener("pointerleave", leave);
    };
  });
  const render = (i: number) => (typeof children === "function" ? children(i) : children);
  return (
    <div ref={ref} className={cn("overflow-hidden", className)} aria-hidden={interactive ? undefined : true}>
      <div className="marquee-track">
        {Array.from({ length: repeat * 2 }).map((_, i) => (
          <div key={i} className="flex shrink-0 items-center" aria-hidden={interactive && i > 0 ? true : undefined}>
            {render(i)}
          </div>
        ))}
      </div>
    </div>
  );
}
