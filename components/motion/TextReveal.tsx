"use client";

import { createElement, type ReactNode } from "react";
import { splitText, useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Mode = "chars" | "lines" | "words";

/**
 * The three text entrances from DESIGN.md §4:
 *  chars → chars-up (hero, page titles) · lines → lines-mask (headings) · words → words-blur (paragraphs)
 * Renders final-state markup; JS only animates *from*.
 */
export function TextReveal({
  as = "p",
  mode = "lines",
  children,
  className,
  delay = 0,
  start = "top 85%",
  immediate = false,
  id,
}: {
  id?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  mode?: Mode;
  children: ReactNode;
  className?: string;
  delay?: number;
  start?: string;
  /** play on mount instead of on scroll (hero) */
  immediate?: boolean;
}) {
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const all: HTMLElement[] = [];
    targets.forEach((t) => all.push(...splitText(t, mode)));
    if (!all.length) return;
    const trigger = immediate ? undefined : { trigger: root, start, once: true };
    if (mode === "chars") {
      targets.forEach((t) => (t.style.overflow = "hidden"));
      gsap.from(all, { yPercent: 110, rotate: 4, duration: 1.1, ease: "expo.out", stagger: 0.018, delay, scrollTrigger: trigger });
    } else if (mode === "lines") {
      gsap.from(all, { yPercent: 105, duration: 0.95, ease: "power3.out", stagger: 0.09, delay, scrollTrigger: trigger });
    } else {
      gsap.from(all, { opacity: 0, filter: "blur(8px)", y: 8, duration: 0.7, stagger: 0.018, delay, scrollTrigger: trigger });
    }
  });

  // children may be a string or fragments; each string child gets its own split target
  const kids = Array.isArray(children) ? children : [children];
  return createElement(
    as,
    { ref, id, className: cn(className) },
    kids.map((k, i) =>
      typeof k === "string" ? (
        <span key={i} data-reveal className="inline">
          {k}
        </span>
      ) : (
        k
      ),
    ),
  );
}
