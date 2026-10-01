"use client";

/**
 * Tiny event bus for the route curtain.
 * TransitionLink -> coverPage() -> router.push -> PageTransition sees the pathname change -> "in" (curtain leaves).
 */
type Fn = () => void;
const listeners = new Set<(phase: "out" | "in") => void>();

export const transition = {
  on(fn: (phase: "out" | "in") => void): Fn {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  emit(phase: "out" | "in") {
    listeners.forEach((fn) => fn(phase));
  },
};

/** Set by PageTransition; resolves when the curtain fully covers the page. */
export let coverPage: () => Promise<void> = () => Promise.resolve();
export const setCoverPage = (fn: () => Promise<void>) => {
  coverPage = fn;
};
