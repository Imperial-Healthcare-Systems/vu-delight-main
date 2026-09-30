"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const tones = {
  cream: "bg-cream text-ink",
  "cream-2": "bg-cream-2 text-ink",
  forest: "bg-forest text-cream",
  pink: "bg-pink text-white",
  /** cream on md+, forest on phones: used under the dark rail so no cream sliver shows between sections */
  rail: "bg-forest text-ink md:bg-cream",
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
    const phone = window.matchMedia("(max-width: 767px)").matches;
    gsap.fromTo(
      root,
      { borderTopLeftRadius: phone ? "3rem" : "6rem", borderTopRightRadius: phone ? "3rem" : "6rem" },
      { borderTopLeftRadius: phone ? "1.75rem" : "2.5rem", borderTopRightRadius: phone ? "1.75rem" : "2.5rem", ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 35%", scrub: true } },
    );
    if (!pinned) {
      gsap.fromTo(root.firstElementChild, { y: 70 }, { y: 0, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top 30%", scrub: true } });
    }
  });
  return (
    <div
      ref={ref}
      id={id}
      className={cn("relative overflow-x-clip rounded-t-[1.75rem] shadow-[0_-26px_60px_rgba(1,50,21,.14)] md:rounded-t-[2.5rem]", overlap && "-mt-10 md:-mt-14", tones[tone], className)}
      style={{ zIndex: 10 + i }}
    >
      <div>{children}</div>
    </div>
  );
}
