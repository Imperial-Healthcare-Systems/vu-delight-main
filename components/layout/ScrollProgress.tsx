"use client";

import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/lenis";

/** Thin pink progress line along the very top edge, fed by Lenis when it is running, native scroll otherwise. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const paint = (p: number) => (el.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`);
    const native = () => paint(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    const l = getLenis();
    if (l) {
      const fn = ({ progress }: { progress: number }) => paint(progress);
      l.on("scroll", fn);
      return () => l.off("scroll", fn);
    }
    native();
    window.addEventListener("scroll", native, { passive: true });
    return () => window.removeEventListener("scroll", native);
  }, []);
  return <div ref={ref} className="fixed inset-x-0 top-0 z-[61] h-[3px] origin-left scale-x-0 bg-pink" aria-hidden />;
}
