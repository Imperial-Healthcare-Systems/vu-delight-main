"use client";

import { useEffect } from "react";
import { transition } from "@/lib/transition";

/** Remounts on every navigation: tells the curtain to leave once the new page is on screen. */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const id = requestAnimationFrame(() => transition.emit("in"));
    return () => cancelAnimationFrame(id);
  }, []);
  return <>{children}</>;
}
