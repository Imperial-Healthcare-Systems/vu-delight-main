"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/content/site";

const KEY = "vud-loaded";

/**
 * Rendered by the server so the page never flashes before it: first visit plays the full intro
 * (logo, three claims, split); later loads in the session get a 0.5s split; reduced motion removes it at once.
 */
export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const el = ref.current!;
    const { gsap } = ensureGsap();
    const done = () => {
      sessionStorage.setItem(KEY, "1");
      document.documentElement.dataset.loaded = "1";
      window.dispatchEvent(new Event("vud:loaded"));
      setShow(false);
    };
    if (reducedMotion()) {
      done();
      return;
    }
    const words = el.querySelectorAll<HTMLElement>("[data-w]");
    const tl = gsap.timeline({ onComplete: done });
    if (sessionStorage.getItem(KEY)) {
      gsap.set(words, { opacity: 0 });
      tl.to(el.querySelector("[data-top]"), { yPercent: -100, duration: 0.55, ease: "expo.inOut", delay: 0.05 }, "split")
        .to(el.querySelector("[data-bot]"), { yPercent: 100, duration: 0.55, ease: "expo.inOut" }, "split");
      return () => {
        tl.kill();
      };
    }
    gsap.set(words, { y: 0, yPercent: 110 });
    tl.fromTo(el.querySelector("[data-logo]"), { opacity: 0, scale: 0.85, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "expo.out" });
    words.forEach((w, i) => {
      const at = 0.45 + i * 0.55;
      tl.to(w, { yPercent: 0, duration: 0.3, ease: "power3.out" }, at).to(w, { yPercent: -110, duration: 0.25, ease: "power3.in" }, at + 0.3);
    });
    tl.to("[data-logo]", { opacity: 0, y: -20, duration: 0.3 }, ">-0.05")
      .to(el.querySelector("[data-top]"), { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "split")
      .to(el.querySelector("[data-bot]"), { yPercent: 100, duration: 0.8, ease: "expo.inOut" }, "split");
    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;
  return (
    <div ref={ref} className="fixed inset-0 z-[100] text-cream" aria-hidden>
      <div data-top className="absolute inset-x-0 top-0 h-1/2 bg-forest" />
      <div data-bot className="absolute inset-x-0 bottom-0 h-1/2 bg-forest" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <div data-logo>
          <Logo variant="cream" className="h-20 md:h-28" priority />
        </div>
        <div className="line-mask relative h-6 w-72 text-center">
          {site.claims.slice(0, 3).map((c) => (
            <span key={c} data-w className="t-eyebrow absolute left-1/2 -translate-x-1/2 translate-y-[110%] whitespace-nowrap opacity-80">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
