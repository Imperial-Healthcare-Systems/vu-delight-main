"use client";

import { createElement, type ReactNode } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Scroll entrance for blocks. Children marked with `data-item` stagger; otherwise the root animates. */
export function Reveal({
  children,
  className,
  y = 40,
  stagger = 0.08,
  start = "top 85%",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  start?: string;
  as?: "div" | "section" | "ul" | "li";
}) {
  const ref = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    const items = root.querySelectorAll("[data-item]");
    gsap.from(items.length ? items : root, {
      y,
      opacity: 0,
      duration: 1,
      stagger,
      ease: "power3.out",
      scrollTrigger: { trigger: root, start, once: true },
    });
  });
  return createElement(as, { ref, className: cn(className) }, children);
}
