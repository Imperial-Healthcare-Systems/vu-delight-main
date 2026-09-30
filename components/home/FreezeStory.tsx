"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { splitText, useGsap } from "@/lib/gsap";
import { Hi } from "@/components/ui/Hi";
import { floatAll } from "@/components/motion/Float";
import { cn } from "@/lib/utils";

const packs = ["/products/strawberry.png", "/products/blueberry.png", "/products/mango.png"];
const tones = ["bg-pink text-white", "bg-[#06428A] text-white", "bg-tangerine text-ink"];
const crumbs = ["bg-tangerine h-2 w-2", "bg-pink h-1.5 w-1.5", "bg-cream h-2.5 w-2.5", "bg-tangerine h-1.5 w-1.5", "bg-cream h-1.5 w-1.5", "bg-pink h-2 w-2", "bg-lime h-2 w-2", "bg-cream h-2 w-2", "bg-tangerine h-3 w-3", "bg-pink h-1.5 w-1.5", "bg-lime h-1.5 w-1.5", "bg-cream h-2 w-2", "bg-tangerine h-2 w-2", "bg-pink h-2.5 w-2.5"];
const AUTOPLAY_MS = 3250;

/**
 * The method story, closing on "Snap." which crunches (letters burst in, the word jolts, crumbs scatter,
 * the outline flashes solid; replays on tap/hover).
 *
 * Desktop (md+): horizontal pinned scroll, three beats side by side.
 * Mobile: the same beats as a native swipe carousel with dots, auto-advancing every 3.25s while on screen and
 * pausing whenever a finger is on it. Reduced motion: no pin, no autoplay, no crunch.
 */
export function FreezeStory() {
  const [dot, setDot] = useState(0);

  const ref = useGsap<HTMLElement>(({ gsap, ScrollTrigger, root, reduced }) => {
    const track = root.querySelector<HTMLElement>("[data-track]")!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const beats = root.querySelectorAll<HTMLElement>("[data-beat]");
    const snap = root.querySelector<HTMLElement>("[data-snap]")!;
    const word = snap.querySelector<HTMLElement>("[data-word]")!;
    const chars = splitText(word, "chars");
    const bits = snap.querySelectorAll<HTMLElement>("[data-crumb]");
    floatAll(gsap, root.querySelectorAll<HTMLElement>("[data-pack]"), reduced ? 2 : 5, "up");

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
          { x: () => gsap.utils.random(-160, 160), y: () => gsap.utils.random(-120, 120), scale: () => gsap.utils.random(0.6, 1.6), rotate: () => gsap.utils.random(-180, 180), opacity: 0, duration: 0.95, ease: "power3.out", stagger: 0.012 },
          "<",
        )
        .call(() => word.classList.remove("stroke-fill"), [], "<+=0.22")
        .set(word, { x: 0 });
    };
    snap.addEventListener("pointerenter", play);
    snap.addEventListener("click", play);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (reduced) return;
      const dist = () => track.scrollWidth - window.innerWidth;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist() + window.innerHeight}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      tl.to(track, { x: () => -dist(), ease: "none" });
      beats.forEach((b) => {
        gsap.from(b.querySelector("[data-pack]"), { y: 160, rotate: 16, ease: "none", scrollTrigger: { trigger: b, containerAnimation: tl, start: "left 80%", end: "left 20%", scrub: true } });
      });
      gsap.to(root.querySelector("[data-bar]"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist() + window.innerHeight}`, scrub: true } });
      ScrollTrigger.create({ trigger: snap, containerAnimation: tl, start: "left 78%", onEnter: play, onEnterBack: play });
    });

    mm.add("(max-width: 767px)", () => {
      let idx = 0;
      const goTo = (i: number) => {
        const card = cards[i];
        if (card) track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
      };
      // which card is showing → dots; the last card → crunch
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const i = cards.indexOf(e.target as HTMLElement);
            if (i >= 0) {
              idx = i;
              setDot(i);
            }
            if (e.target.contains(snap) && !reduced) play();
          });
        },
        { root: track, threshold: 0.6 },
      );
      cards.forEach((c) => io.observe(c));
      if (reduced) return () => io.disconnect();

      // autoplay: only while the section is on screen and no finger is on the track
      let timer: ReturnType<typeof setInterval> | undefined;
      let hold = false;
      let onScreen = false;
      const stop = () => {
        if (timer) clearInterval(timer);
        timer = undefined;
      };
      const start = () => {
        stop();
        if (onScreen && !hold) timer = setInterval(() => goTo((idx + 1) % cards.length), AUTOPLAY_MS);
      };
      const vis = new IntersectionObserver(
        (e) => {
          onScreen = e[0].isIntersecting;
          start();
        },
        { threshold: 0.35 },
      );
      vis.observe(root);
      const down = () => {
        hold = true;
        stop();
      };
      const up = () => {
        hold = false;
        start();
      };
      const onScroll = () => start(); // a manual swipe restarts the clock so it never jumps mid-read
      track.addEventListener("pointerdown", down);
      track.addEventListener("pointerup", up);
      track.addEventListener("pointercancel", up);
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        stop();
        io.disconnect();
        vis.disconnect();
        track.removeEventListener("pointerdown", down);
        track.removeEventListener("pointerup", up);
        track.removeEventListener("pointercancel", up);
        track.removeEventListener("scroll", onScroll);
      };
    });

    return () => {
      mm.revert();
      snap.removeEventListener("pointerenter", play);
      snap.removeEventListener("click", play);
    };
  });

  const go = (i: number) => {
    const track = ref.current?.querySelector<HTMLElement>("[data-track]");
    const card = track?.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (track && card) track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative overflow-hidden" aria-labelledby="freeze-title">
      <div className="relative flex flex-col justify-center pb-16 pt-12 md:min-h-[100svh] md:py-16">
        <div className="container-x mb-6 flex items-end justify-between gap-8 md:mb-8">
          <div className="max-w-3xl">
            <h2 id="freeze-title" className="t-h2 font-display">
              {site.freeze.title} <Hi color="pink">{site.freeze.mark}</Hi>
            </h2>
            <p className="t-lead mt-4 max-w-xl opacity-75">{site.freeze.copy}</p>
          </div>
          <div className="hidden h-px w-40 bg-cream/20 md:block">
            <div data-bar className="h-full origin-left scale-x-0 bg-tangerine" />
          </div>
        </div>

        <div
          data-track
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-hidden px-[var(--gutter)] pb-2 scrollbar-none md:w-max md:snap-none md:gap-[6vw] md:overflow-visible md:pb-0 md:motion-reduce:w-auto md:motion-reduce:flex-col"
        >
          {site.freeze.beats.map((b, i) => (
            <article key={b.n} data-beat data-card className="relative flex w-[84vw] max-w-[760px] shrink-0 snap-center flex-col gap-5 md:w-[60vw] md:flex-row md:items-center md:gap-8">
              <div className={cn("tile relative aspect-[16/10] w-full shrink-0 overflow-hidden @container md:aspect-[4/5] md:w-[42%]", tones[i])}>
                <p className="t-display absolute left-3 top-1 select-none text-[18cqw] leading-none opacity-30 md:top-2 md:text-[28cqw]" aria-hidden>
                  {b.n}
                </p>
                <Image data-pack src={packs[i]} alt="" width={260} height={420} className="pack-shadow absolute bottom-[-16%] right-5 w-[32%] md:bottom-[-8%] md:left-1/2 md:right-auto md:w-[70%] md:-translate-x-1/2" />
              </div>
              <div>
                <h3 className="t-h3 font-display">{b.title}</h3>
                <p className="mt-3 max-w-sm opacity-80 md:mt-4">{b.copy}</p>
              </div>
            </article>
          ))}
          <div data-card className="flex w-[84vw] shrink-0 snap-center items-center justify-center md:w-[46vw] md:justify-start">
            <button type="button" data-snap className="relative inline-block cursor-pointer select-none py-10 text-left md:py-0" aria-label={`${site.freeze.close} Replay the crunch`}>
              {crumbs.map((c, i) => (
                <span key={i} data-crumb className={cn("pointer-events-none absolute left-1/2 top-1/2 scale-0 rounded-full", c)} aria-hidden />
              ))}
              <span data-word className="t-display stroke relative block font-display text-cream transition-[color] duration-150">
                {site.freeze.close}
              </span>
            </button>
          </div>
        </div>

        {/* mobile dots */}
        <div className="mt-2 flex justify-center md:hidden" role="tablist" aria-label="Story steps">
          {[...site.freeze.beats, { n: "snap" }].map((b, i) => (
            <button key={b.n} role="tab" aria-selected={dot === i} aria-label={`Step ${i + 1}`} onClick={() => go(i)} className="grid h-8 min-w-8 place-items-center px-1">
              <span className={cn("block h-2.5 rounded-full transition-[width,background-color] duration-300", dot === i ? "w-6 bg-tangerine" : "w-2.5 bg-cream/30")} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
