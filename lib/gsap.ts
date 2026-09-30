"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { reducedMotion } from "./utils";

let registered = false;
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: "power3.out", duration: 0.9 });
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export interface GsapCtx {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  root: HTMLElement;
  /** prefers-reduced-motion: ambient motion may continue slower; scroll-jacking and entrances must not run */
  reduced: boolean;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Scoped GSAP context. Markup is authored in its final state and animated *from*
 * a start value, so a failed chunk or reduced-motion leaves the page complete.
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  setup: (ctx: GsapCtx) => void,
  deps: unknown[] = [],
) {
  const scope = useRef<T>(null);
  useIsoLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const { gsap: g, ScrollTrigger: st } = ensureGsap();
    const reduced = reducedMotion();
    const ctx = g.context(() => setup({ gsap: g, ScrollTrigger: st, root: el, reduced }), el);
    return () => ctx.revert();
  }, deps);
  return scope;
}

/** Split a text node into spans. Returns the created spans. */
export function splitText(el: HTMLElement, mode: "chars" | "words" | "lines") {
  if (el.dataset.split === mode) return Array.from(el.querySelectorAll<HTMLElement>("[data-piece]"));
  const text = el.textContent ?? "";
  el.dataset.split = mode;
  el.setAttribute("aria-label", text);
  el.textContent = "";
  const pieces: HTMLElement[] = [];
  const make = (t: string) => {
    const s = document.createElement("span");
    s.dataset.piece = "";
    s.style.display = "inline-block";
    s.textContent = t;
    return s;
  };
  if (mode === "chars") {
    for (const word of text.split(" ")) {
      const w = document.createElement("span");
      w.style.display = "inline-block";
      w.style.whiteSpace = "nowrap";
      for (const ch of word) {
        const s = make(ch);
        pieces.push(s);
        w.appendChild(s);
      }
      el.appendChild(w);
      el.appendChild(document.createTextNode(" "));
    }
  } else {
    for (const word of text.split(" ")) {
      const s = make(word);
      pieces.push(s);
      el.appendChild(s);
      el.appendChild(document.createTextNode(" "));
    }
    if (mode === "lines") {
      // group words by offsetTop into line wrappers
      const lines = new Map<number, HTMLElement[]>();
      for (const p of pieces) {
        const top = p.offsetTop;
        lines.set(top, [...(lines.get(top) ?? []), p]);
      }
      el.textContent = "";
      const out: HTMLElement[] = [];
      for (const ws of lines.values()) {
        const mask = document.createElement("span");
        mask.style.display = "block";
        mask.style.overflow = "hidden";
        const line = document.createElement("span");
        line.dataset.piece = "";
        line.style.display = "block";
        ws.forEach((w, i) => {
          line.appendChild(document.createTextNode(i ? " " + w.textContent : w.textContent ?? ""));
        });
        mask.appendChild(line);
        el.appendChild(mask);
        out.push(line);
      }
      return out;
    }
  }
  return pieces;
}
