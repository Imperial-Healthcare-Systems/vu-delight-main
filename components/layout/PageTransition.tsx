"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";
import { setCoverPage, transition } from "@/lib/transition";
import { reducedMotion } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const N = 9;

/**
 * Route curtain, "threads": nine thin forest strings draw in from the top and bottom edges (alternating),
 * then each thread widens into a bar until the page is covered. The mark breathes in, the new page mounts
 * underneath, the bars narrow back to threads and the threads retract towards the opposite edge.
 * One colour, no seam, no accent line. Hidden by CSS before hydration; plays only after a TransitionLink
 * covered the page.
 */
export function PageTransition() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const threads = Array.from(el.querySelectorAll<HTMLElement>("[data-thread]"));
    const fills = Array.from(el.querySelectorAll<HTMLElement>("[data-fill]"));
    const mark = el.querySelector<HTMLElement>("[data-mark]")!;
    const { gsap } = ensureGsap();
    const rm = reducedMotion();

    const park = () => {
      threads.forEach((t, i) => gsap.set(t, { scaleY: 0, transformOrigin: i % 2 ? "50% 100%" : "50% 0%" }));
      gsap.set(fills, { scaleX: 0, transformOrigin: "50% 50%" });
      gsap.set(mark, { opacity: 0, scale: 0.92 });
    };
    park();
    let covered = false;

    setCoverPage(
      () =>
        new Promise<void>((res) => {
          covered = true;
          gsap.set(el, { pointerEvents: "auto" });
          if (rm) {
            gsap.set(fills, { scaleX: 1 });
            return res();
          }
          gsap
            .timeline()
            .to(threads, { scaleY: 1, duration: 0.32, ease: "expo.out", stagger: { each: 0.022, from: "center" } })
            .to(fills, { scaleX: 1, duration: 0.42, ease: "power3.inOut", stagger: { each: 0.02, from: "center" }, onComplete: res }, "-=0.14")
            .to(mark, { opacity: 1, scale: 1, duration: 0.28, ease: "power2.out" }, "-=0.16");
        }),
    );

    const off = transition.on((phase) => {
      if (phase !== "in" || !covered) return;
      covered = false;
      const done = () => {
        park();
        gsap.set(el, { pointerEvents: "none" });
      };
      if (rm) return done();
      // threads leave towards the edge they did not come from
      threads.forEach((t, i) => gsap.set(t, { transformOrigin: i % 2 ? "50% 0%" : "50% 100%" }));
      gsap
        .timeline({ onComplete: done })
        .to(mark, { opacity: 0, scale: 1.04, duration: 0.18, ease: "power2.in" })
        .to(fills, { scaleX: 0, duration: 0.4, ease: "power3.inOut", stagger: { each: 0.02, from: "edges" } }, "-=0.08")
        .to(threads, { scaleY: 0, duration: 0.32, ease: "expo.in", stagger: { each: 0.02, from: "edges" } }, "-=0.22");
    });
    return off;
  }, []);

  return (
    <div ref={ref} data-curtain className="pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      {Array.from({ length: N }).map((_, i) => (
        <div key={i} className="absolute inset-y-0" style={{ left: `${(i * 100) / N}%`, width: `${100 / N}%` }}>
          <span data-thread className="absolute inset-y-0 left-1/2 w-[2px] origin-top -translate-x-1/2 scale-y-0 bg-forest" />
          <span data-fill className="absolute -inset-x-px inset-y-0 scale-x-0 bg-forest" />
        </div>
      ))}
      <div data-mark className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0">
        <Logo variant="cream" className="h-16 md:h-24" />
      </div>
    </div>
  );
}
