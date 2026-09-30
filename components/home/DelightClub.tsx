"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Sticker } from "@/components/ui/Sticker";
import { Hi } from "@/components/ui/Hi";
import { Reveal } from "@/components/motion/Reveal";
import { useGsap } from "@/lib/gsap";
import type { BadgeIcon } from "@/lib/types";

const tones = ["cream", "forest", "white", "tangerine", "cream", "forest", "white", "tangerine", "cream"] as const;
/** Scattered positions for md+; on phones the stickers flow as a wrapped cloud so nothing overlaps. */
const spots = [
  "md:left-[6%] md:top-[12%] md:-rotate-12",
  "md:left-[48%] md:top-[8%] md:rotate-6",
  "md:left-[14%] md:top-[36%] md:rotate-3",
  "md:left-[56%] md:top-[34%] md:-rotate-8",
  "md:left-[8%] md:top-[60%] md:rotate-10",
  "md:left-[44%] md:top-[58%] md:-rotate-4",
  "md:left-[24%] md:top-[80%] md:-rotate-6",
  "md:left-[62%] md:top-[78%] md:rotate-12",
  "md:left-[36%] md:top-[22%] md:rotate-2",
];
const icons: (BadgeIcon | undefined)[] = ["no-palm", "vegan", "no-sugar", "leaf", undefined, undefined, undefined, undefined, undefined];

/** Community block: a floating sticker wall on pink, one field, one button. */
export function DelightClub() {
  const [sent, setSent] = useState(false);
  const wall = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    const items = root.querySelectorAll("[data-stick]");
    if (reduced) return;
    gsap.from(items, { scale: 0, rotate: () => gsap.utils.random(-40, 40), duration: 0.9, ease: "back.out(1.8)", stagger: { each: 0.06, from: "random" }, scrollTrigger: { trigger: root, start: "top 75%", once: true } });
    const amp = window.matchMedia("(min-width: 768px)").matches ? 10 : 3;
    items.forEach((el, i) => gsap.to(el, { y: i % 2 ? amp : -amp, duration: 2.4 + (i % 3) * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: i * 0.15 }));
  });

  return (
    <section className="py-14 md:py-28" aria-labelledby="club-title">
      <div className="container-x">
        <Reveal className="tile noise relative grid overflow-hidden bg-pink text-white md:grid-cols-2">
          <div ref={wall} className="relative flex flex-wrap content-start gap-3 p-6 pb-3 md:block md:min-h-[30rem] md:p-0">
            <span className="t-display pointer-events-none absolute -left-3 bottom-[-0.22em] hidden select-none opacity-20 md:block" aria-hidden>
              Yum
            </span>
            {site.club.stickers.map((s, i) => (
              <span key={s} data-stick className={`inline-block md:absolute ${spots[i % spots.length]}`}>
                <Sticker tone={tones[i % tones.length]} icon={icons[i]} className="text-[0.72rem] md:text-[0.78rem]">
                  {s}
                </Sticker>
              </span>
            ))}
          </div>
          <div className="relative flex flex-col justify-center p-6 md:p-14">
            <h2 id="club-title" className="t-h1 font-display">
              {site.club.title} <Hi color="lime">{site.club.mark}</Hi>
            </h2>
            <p className="t-lead mt-5 max-w-md opacity-90">{site.club.copy}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input type="email" required placeholder="you@somewhere.in" className="field border-white/60 text-white placeholder:text-white/70" aria-label="Email" />
              <button type="submit" className="pill bg-forest px-6 py-3 font-semibold text-cream transition-colors hover:bg-cream hover:text-forest">
                {sent ? "You're in" : site.club.cta}
              </button>
            </form>
            <p className="mt-4 text-xs opacity-75">Unsubscribe whenever. We would rather you stayed for the snacks than the emails.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
