"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { featured } from "@/content/products";
import { useGsap } from "@/lib/gsap";
import { scrollTo } from "@/lib/lenis";
import { Button, Arrow } from "@/components/ui/Button";
import { Sticker } from "@/components/ui/Sticker";
import { Hi } from "@/components/ui/Hi";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { skuVars } from "@/lib/utils";

/**
 * THE FRUIT ORBIT.
 * Six real packs ride a wide ellipse around the three-line headline (filled / pink / outlined with a swash).
 * The ring is sized so no pack ever crosses the type. No copy block: the headline, the ring, two CTAs and a
 * scroll cue. Sticky, so the page slides over it while the ring keeps turning.
 * Reduced motion: the ring turns slower; parallax, velocity and entrances are off.
 * This file is the hero contract: replace it, nothing else changes.
 */
export function Hero() {
  const packs = featured.slice(0, 6);

  const ref = useGsap<HTMLElement>(({ gsap, ScrollTrigger, root, reduced }) => {
    const orbit = root.querySelector<HTMLElement>("[data-orbit]")!;
    const items = root.querySelectorAll<HTMLElement>("[data-pack]");
    const n = items.length;
    const state = { t: -Math.PI / 2 };

    gsap.set(items, { left: "50%", top: "50%", xPercent: -50, yPercent: -50 });
    const place = () => {
      const rx = orbit.clientWidth / 2;
      const ry = orbit.clientHeight / 2;
      items.forEach((el, i) => {
        const a = state.t + (i / n) * Math.PI * 2;
        const depth = (Math.sin(a) + 1) / 2;
        gsap.set(el, { x: Math.cos(a) * rx, y: Math.sin(a) * ry, scale: 0.6 + depth * 0.45, zIndex: Math.round(depth * 10), rotate: Math.cos(a) * 14 });
      });
    };
    place();
    const spin = gsap.to(state, { t: state.t + Math.PI * 2, duration: reduced ? 110 : 50, ease: "none", repeat: -1, onUpdate: place });
    if (reduced) return;

    gsap.from(items, { opacity: 0, scale: 0.2, duration: 1.4, ease: "expo.out", stagger: 0.06, delay: 0.5 });
    gsap.from(root.querySelectorAll("[data-fade]"), { y: 24, opacity: 0, duration: 1, stagger: 0.1, delay: 1.1 });
    gsap.from(root.querySelectorAll("[data-sticker]"), { scale: 0, rotate: -30, duration: 0.8, ease: "back.out(2)", stagger: 0.1, delay: 1.5 });
    gsap.to(root.querySelector("[data-cue-arrow]"), { y: 6, duration: 0.9, yoyo: true, repeat: -1, ease: "sine.inOut" });

    const par = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const dx = e.clientX / window.innerWidth - 0.5;
      const dy = e.clientY / window.innerHeight - 0.5;
      gsap.to(orbit, { x: dx * 30, y: dy * 16, rotateX: -dy * 5, rotateY: dx * 5, duration: 1.2, ease: "power2.out" });
    };
    window.addEventListener("pointermove", par);

    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const v = self.getVelocity();
        spin.timeScale(1 + Math.min(Math.abs(v) / 600, 4));
        gsap.to(orbit, { skewY: gsap.utils.clamp(-5, 5, v / -500), duration: 0.5, overwrite: "auto" });
        gsap.to({}, { duration: 0.4, onComplete: () => spin.timeScale(1) });
      },
    });
    gsap.to(root.querySelector("[data-head]"), { yPercent: -30, opacity: 0.15, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "+=100%", scrub: true } });
    return () => window.removeEventListener("pointermove", par);
  });

  const display = "t-display text-[clamp(3.2rem,13vw,5rem)] md:text-[min(10vw,13vh)]";

  return (
    <section ref={ref} className="sticky top-0 z-0 flex min-h-[100svh] flex-col overflow-hidden pt-[var(--header-h)]" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] rounded-t-[50%_100%] bg-cream-2" aria-hidden />
      <div className="t-display pointer-events-none absolute -bottom-[0.2em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[24vw] leading-none text-cream" aria-hidden>
        Vu Delight
      </div>

      <div className="container-x relative flex flex-1 flex-col">
        <div className="relative flex min-h-[58svh] flex-1 items-center justify-center md:min-h-0">
          <div data-orbit className="pointer-events-none absolute left-1/2 top-[52%] h-[40vh] w-[110vw] max-w-[104rem] -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d] md:h-[72vh]" aria-hidden>
            {packs.map((p, i) => {
              const a = -Math.PI / 2 + (i / packs.length) * Math.PI * 2;
              return (
                <div
                  key={p.slug}
                  data-pack
                  className="absolute w-[9.5vw] min-w-[80px] max-w-[150px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                  style={{ ...skuVars(p.accent, p.ink, p.soft), left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
                >
                  <Image src={p.image} alt="" width={150} height={240} priority className="pack-shadow w-full" />
                </div>
              );
            })}
          </div>

          <div data-head className="relative z-10 text-center">
            <TextReveal as="h1" mode="chars" immediate className={`${display} text-forest`} delay={0.25}>
              {site.hero.lines[0]}
            </TextReveal>
            <TextReveal as="span" mode="chars" immediate className={`${display} block text-pink`} delay={0.4}>
              {site.hero.lines[1]}
            </TextReveal>
            <span className={`${display} block text-forest`}>
              <Hi color="tangerine">
                <TextReveal as="span" mode="chars" immediate className="stroke inline-block" delay={0.55}>
                  {site.hero.lines[2]}
                </TextReveal>
              </Hi>
            </span>
            <span id="hero-title" className="sr-only">
              {site.hero.lines.join(" ")}
            </span>

            <span data-sticker className="absolute -left-28 top-[4%] z-20 hidden md:block">
              <Sticker tone="pink" rotate={-10} icon="no-palm">
                {site.hero.stickers[0]}
              </Sticker>
            </span>
            <span data-sticker className="absolute -right-36 top-[40%] z-20 hidden md:block">
              <Sticker tone="forest" rotate={6} icon="vegan">
                {site.hero.stickers[1]}
              </Sticker>
            </span>
            <span data-sticker className="absolute -left-12 bottom-[8%] z-20 hidden md:block">
              <Sticker tone="white" rotate={-4} icon="no-preservative">
                {site.hero.stickers[2]}
              </Sticker>
            </span>
          </div>
        </div>

        {/* bottom row: scroll cue left, CTAs right. Nothing else. */}
        <div className="relative z-20 flex flex-col gap-5 pb-10 pt-4 md:flex-row md:items-end md:justify-between md:pb-12">
          <div data-fade className="hidden md:block">
            <Magnetic>
              <button onClick={() => scrollTo("#shelves", -80)} className="pill flex items-center gap-2 border border-forest/20 bg-cream/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md transition-colors hover:bg-forest hover:text-cream">
                {site.hero.cue}
                <span data-cue-arrow className="inline-block">
                  ↓
                </span>
              </button>
            </Magnetic>
          </div>

          <div data-fade className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Button href={site.hero.primary.href} size="lg">
                {site.hero.primary.label} <Arrow />
              </Button>
              <Button href={site.hero.secondary.href} size="lg" variant="outline" className="bg-cream/70 text-forest backdrop-blur-md">
                {site.hero.secondary.label}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 md:hidden">
              <Sticker tone="pink" rotate={-3} icon="no-palm">
                {site.hero.stickers[0]}
              </Sticker>
              <Sticker tone="forest" rotate={2} icon="vegan">
                {site.hero.stickers[1]}
              </Sticker>
              <Sticker tone="white" rotate={-2} icon="no-preservative">
                {site.hero.stickers[2]}
              </Sticker>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
