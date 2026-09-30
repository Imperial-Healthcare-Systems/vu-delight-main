"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis, startLenis } from "@/lib/lenis";
import { ensureGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/utils";
import { useUI } from "@/lib/store";

/** Boots Lenis once, refreshes ScrollTrigger per route, freezes scroll while overlays are open. */
export function SmoothScroll() {
  const path = usePathname();
  const { cartOpen, menuOpen, searchOpen } = useUI();

  useEffect(() => {
    if (reducedMotion()) return;
    startLenis();
  }, []);

  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const refresh = () => ensureGsap().ScrollTrigger.refresh();
    const timers = [120, 600, 1500].map((ms) => setTimeout(refresh, ms));
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("load", refresh);
    };
  }, [path]);

  useEffect(() => {
    const l = getLenis();
    const locked = cartOpen || menuOpen || searchOpen;
    if (l) {
      if (locked) l.stop();
      else l.start();
    }
    document.documentElement.style.overflow = locked && !l ? "hidden" : "";
  }, [cartOpen, menuOpen, searchOpen]);

  return null;
}
