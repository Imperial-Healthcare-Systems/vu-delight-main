"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/utils";

/** 2.5D cursor tilt with a floating idle. Used for the product gallery pack. */
export function Tilt({ children, max = 10, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ensureGsap().gsap.to(el.firstElementChild, {
      rotateY: px * max * 2,
      rotateX: -py * max * 2,
      x: px * 14,
      y: py * 14,
      duration: 0.6,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };
  const leave = () => {
    if (ref.current) ensureGsap().gsap.to(ref.current.firstElementChild, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 1, ease: "elastic.out(1,0.5)" });
  };
  return (
    <div ref={ref} className={className} onPointerMove={move} onPointerLeave={leave} style={{ perspective: 1200 }}>
      {children}
    </div>
  );
}
