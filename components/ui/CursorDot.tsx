"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";

/** Trailing pink dot that becomes a ring over anything clickable. Pointer-fine devices only. */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const { gsap } = ensureGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
      el.style.opacity = "1";
      const t = (e.target as HTMLElement | null)?.closest?.("a,button,[role=button],input,textarea,select,.swiper");
      el.classList.toggle("is-link", !!t);
    };
    const hide = () => (el.style.opacity = "0");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, []);
  return <div ref={ref} className="cursor-dot opacity-0" aria-hidden />;
}
