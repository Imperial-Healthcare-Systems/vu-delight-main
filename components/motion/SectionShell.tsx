"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const tones = {
  cream: "bg-cream text-ink",
  "cream-2": "bg-cream-2 text-ink",
  forest: "bg-forest text-cream",
  pink: "bg-pink text-white",
};

/**
 * Section transition. Each shell overlaps the previous one with a rounded top edge and a soft shadow, sits
 * one z-index higher, and as it arrives its corners relax from a deep curve to the house radius while the
 * content lifts into place. Pinned sections (`pinned`) skip the content lift, because transforms on an
 * ancestor would break the ScrollTrigger pin inside them. `overlap={false}` for the first shell after the
 * hero, so it never covers the hero's CTA row.
 */
export function SectionShell({
  children,
  i,
  tone = "cream",
  pinned = false,
  overlap = true,
  className,
  id,
}: {
  children: ReactNode;
  i: number;
  tone?: keyof typeof tones;
  pinned?: boolean;
  overlap?: boolean;
  className?: string;
  id?: string;
}) {
  const ref = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    gsap.fromTo(
      root,
      { borderTopLeftRadius: "6rem", borderTopRightRadius: "6rem" },
      { borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem", ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 35%", scrub: true } },
    );
    if (!pinned) {
      gsap.fromTo(root.firstElementChild, { y: 70 }, { y: 0, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 30%", scrub: true } });
    }
  });
  return (
    <div
      ref={ref}
      id={id}
      className={cn("relative overflow-x-clip rounded-t-[2.5rem] shadow-[0_-26px_60px_rgba(1,50,21,.14)]", overlap && "-mt-10 md:-mt-14", tones[tone], className)}
      style={{ zIndex: 10 + i }}
    >
      <div>{children}</div>
    </div>
  );
}
