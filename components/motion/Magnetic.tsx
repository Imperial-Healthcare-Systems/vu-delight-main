"use client";

import { useRef, type ReactNode } from "react";
import { ensureGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/utils";

/** Pulls its child toward the cursor; elastic return. Pointer-fine only. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reducedMotion() || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ensureGsap().gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
  };
  const leave = () => {
    if (ref.current) ensureGsap().gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1,0.4)" });
  };
  return (
    <span ref={ref} className="inline-block will-change-transform" onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  );
}
