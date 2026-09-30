"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { useGsap } from "@/lib/gsap";
import { Sticker } from "@/components/ui/Sticker";

/** Pinned manifesto: the two source lines light up word by word as you scroll; a pack drifts behind. */
export function Manifesto() {
  const ref = useGsap<HTMLElement>(({ gsap, root, reduced }) => {
    if (reduced) return;
    const words = root.querySelectorAll<HTMLElement>("[data-w]");
    gsap.set(words, { opacity: 0.14 });
    gsap.to(words, {
      opacity: 1,
      stagger: 0.5,
      ease: "none",
      scrollTrigger: { trigger: root, start: "top top", end: "+=140%", scrub: 0.4, pin: root.querySelector("[data-pin]"), anticipatePin: 1, invalidateOnRefresh: true },
    });
    gsap.to(root.querySelector("[data-pack]"), { yPercent: -40, rotate: 10, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
  });

  const text = site.manifesto.lines.join(" ");

  return (
    <section ref={ref} className="relative" aria-labelledby="manifesto-title">
      <div data-pin className="relative flex min-h-[100svh] items-center overflow-hidden">
        <Image data-pack src="/products/jamun.png" alt="" width={360} height={580} className="pack-shadow pointer-events-none absolute -right-10 bottom-[-6%] w-[34vw] max-w-[360px] opacity-90 md:right-[3vw] md:w-[26vw]" aria-hidden />
        <div className="container-x relative z-10 py-24">
          <h2 id="manifesto-title" className="t-h1 max-w-6xl font-display text-forest md:max-w-[62vw]">
            {text.split(" ").map((w, i) => (
              <span key={i} data-w className="inline-block">
                {w}&nbsp;
              </span>
            ))}
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {site.manifesto.stickers.map((s, i) => (
              <Sticker key={s} tone={(["pink", "forest", "tangerine"] as const)[i % 3]} rotate={i % 2 ? 4 : -5}>
                {s}
              </Sticker>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
