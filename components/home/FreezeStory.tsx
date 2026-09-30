"use client";

import Image from "next/image";
import { site } from "@/content/site";
import { splitText, useGsap } from "@/lib/gsap";
import { Hi } from "@/components/ui/Hi";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const packs = ["/products/strawberry.png", "/products/blueberry.png", "/products/mango.png"];
const tones = ["bg-pink text-white", "bg-[#06428A] text-white", "bg-tangerine text-ink"];
const crumbs = ["bg-tangerine h-2 w-2", "bg-pink h-1.5 w-1.5", "bg-cream h-2.5 w-2.5", "bg-tangerine h-1.5 w-1.5", "bg-cream h-1.5 w-1.5", "bg-pink h-2 w-2", "bg-lime h-2 w-2", "bg-cream h-2 w-2", "bg-tangerine h-3 w-3", "bg-pink h-1.5 w-1.5", "bg-lime h-1.5 w-1.5", "bg-cream h-2 w-2", "bg-tangerine h-2 w-2", "bg-pink h-2.5 w-2.5"];

/**
 * Horizontal pinned story of the method (three beats, copy sourced in docs/CONTENT.md), closing on "Snap."
 * which crunches: letters burst in, the word jolts, crumbs scatter, the outline flashes solid. Replays on hover.
 * Reduced motion: the beats stack vertically with no pin and no crunch.
 */
export function FreezeStory() {
  const ref = useGsap<HTMLElement>(({ gsap, ScrollTrigger, root, reduced }) => {
    if (reduced) return;
    const track = root.querySelector<HTMLElement>("[data-track]")!;
    const beats = root.querySelectorAll<HTMLElement>("[data-beat]");
    const dist = () => track.scrollWidth - window.innerWidth;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist() + window.innerHeight}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
    });
    tl.to(track, { x: () => -dist(), ease: "none" });
    beats.forEach((b) => {
      gsap.from(b.querySelector("[data-pack]"), { y: 160, rotate: 16, ease: "none", scrollTrigger: { trigger: b, containerAnimation: tl, start: "left 80%", end: "left 20%", scrub: true } });
    });
    gsap.to(root.querySelector("[data-bar]"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist() + window.innerHeight}`, scrub: true } });

    // the crunch
    const snap = root.querySelector<HTMLElement>("[data-snap]")!;
    const word = snap.querySelector<HTMLElement>("[data-word]")!;
    const chars = splitText(word, "chars");
    const bits = snap.querySelectorAll<HTMLElement>("[data-crumb]");
    let playing = false;
    const play = () => {
      if (playing) return;
      playing = true;
      gsap
        .timeline({ onComplete: () => (playing = false) })
        .fromTo(chars, { scale: 0.3, y: 34, opacity: 0, rotate: () => gsap.utils.random(-40, 40) }, { scale: 1, y: 0, opacity: 1, rotate: 0, duration: 0.5, ease: "back.out(3)", stagger: 0.05 })
        .to(word, { x: 7, duration: 0.04, repeat: 7, yoyo: true, ease: "none" }, "-=0.28")
        .call(() => word.classList.add("stroke-fill"), [], "<")
        .fromTo(
          bits,
          { x: 0, y: 0, scale: 0, opacity: 1 },
          { x: () => gsap.utils.random(-200, 200), y: () => gsap.utils.random(-150, 150), scale: () => gsap.utils.random(0.6, 1.6), rotate: () => gsap.utils.random(-180, 180), opacity: 0, duration: 0.95, ease: "power3.out", stagger: 0.012 },
          "<",
        )
        .call(() => word.classList.remove("stroke-fill"), [], "<+=0.22")
        .set(word, { x: 0 });
    };
    ScrollTrigger.create({ trigger: snap, containerAnimation: tl, start: "left 78%", onEnter: play, onEnterBack: play });
    snap.addEventListener("pointerenter", play);
    snap.addEventListener("click", play);
    return () => {
      snap.removeEventListener("pointerenter", play);
      snap.removeEventListener("click", play);
    };
  });

  return (
    <section ref={ref} className="relative overflow-hidden" aria-labelledby="freeze-title">
      <div className="relative flex min-h-[100svh] flex-col justify-center py-16">
        <div className="container-x mb-8 flex items-end justify-between gap-8">
          <div className="max-w-3xl">
            <h2 id="freeze-title" className="t-h2 font-display">
              {site.freeze.title} <Hi color="pink">{site.freeze.mark}</Hi>
            </h2>
            <p className="t-lead mt-4 max-w-xl opacity-75">{site.freeze.copy}</p>
          </div>
          <div className="hidden flex-col items-end gap-4 md:flex">
            <span className="grid h-14 w-14 -rotate-12 place-items-center rounded-full border border-cream/25" aria-hidden>
              <Logo variant="cream" className="h-6" />
            </span>
            <div className="h-px w-40 bg-cream/20">
              <div data-bar className="h-full origin-left scale-x-0 bg-tangerine" />
            </div>
          </div>
        </div>

        <div data-track className="flex w-max gap-[6vw] px-[var(--gutter)] motion-reduce:w-auto motion-reduce:flex-col">
          {site.freeze.beats.map((b, i) => (
            <article key={b.n} data-beat className="relative flex w-[84vw] max-w-[760px] shrink-0 items-center gap-8 md:w-[60vw]">
              <div className={cn("tile relative aspect-[4/5] w-[42%] shrink-0 overflow-hidden @container", tones[i])}>
                <p className="t-display absolute left-3 top-2 select-none text-[28cqw] leading-none opacity-30" aria-hidden>
                  {b.n}
                </p>
                <Image data-pack src={packs[i]} alt="" width={260} height={420} className="pack-shadow absolute bottom-[-8%] left-1/2 w-[70%] -translate-x-1/2" />
              </div>
              <div>
                <h3 className="t-h3 font-display">{b.title}</h3>
                <p className="mt-4 max-w-sm opacity-80">{b.copy}</p>
              </div>
            </article>
          ))}
          <div className="flex w-[46vw] shrink-0 items-center">
            <button type="button" data-snap className="relative inline-block cursor-pointer select-none text-left" aria-label={`${site.freeze.close} Replay the crunch`}>
              {crumbs.map((c, i) => (
                <span key={i} data-crumb className={cn("pointer-events-none absolute left-1/2 top-1/2 scale-0 rounded-full", c)} aria-hidden />
              ))}
              <span data-word className="t-display stroke relative block font-display text-cream transition-[color] duration-150">
                {site.freeze.close}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
