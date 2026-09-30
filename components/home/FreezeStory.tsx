"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/content/site";
import { splitText, useGsap } from "@/lib/gsap";
import { CRACK_PATH, playCrack, polys } from "@/lib/crunch";
import { Hi } from "@/components/ui/Hi";
import { floatAll } from "@/components/motion/Float";
import { cn } from "@/lib/utils";

const packs = ["/products/strawberry.png", "/products/blueberry.png", "/products/mango.png"];
const tones = ["bg-pink text-white", "bg-[#06428A] text-white", "bg-tangerine text-ink"];
const AUTOPLAY_MS = 3250;
/** the last card holds long enough for the whole Crack to play */
const HOLD_MS = 6500;
const WORD = "t-display stroke block font-display text-[24vw] text-cream md:text-[min(19vw,21rem)]";

/**
 * The method story, closing on "Snap." — the Crack (lib/crunch.ts): pressure, a glowing crack drawn across
 * the word, the word splits along it with a shockwave, crumb storm and shake, holds, then rejoins. ~4.5s.
 * Replays on hover/tap.
 *
 * Desktop (md+): horizontal pinned scroll; the last card is full width so the pin ends on the word, centred,
 * and the pin holds for an extra 1.5 viewports while it plays.
 * Mobile: native swipe carousel with dots, auto-advancing every 3.25s and holding 6.5s on the Snap card.
 * Reduced motion: no pin, no autoplay, no crack.
 */
export function FreezeStory() {
  const [dot, setDot] = useState(0);

  const ref = useGsap<HTMLElement>(({ gsap, ScrollTrigger, root, reduced }) => {
    const inner = root.firstElementChild as HTMLElement;
    const track = root.querySelector<HTMLElement>("[data-track]")!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const beats = root.querySelectorAll<HTMLElement>("[data-beat]");
    const snap = root.querySelector<HTMLElement>("[data-snap]")!;
    snap.querySelectorAll<HTMLElement>("[data-word], [data-top], [data-bot]").forEach((el) => splitText(el, "chars"));
    gsap.set(snap.querySelector("[data-shock]"), { xPercent: -50, yPercent: -50, scale: 0.2, opacity: 0 });
    floatAll(gsap, root.querySelectorAll<HTMLElement>("[data-pack]"), reduced ? 2 : 5, "up");

    let playing = false;
    const play = () => {
      if (playing || reduced) return;
      playing = true;
      playCrack(gsap, snap, inner).eventCallback("onComplete", () => (playing = false));
    };
    snap.addEventListener("pointerenter", play);
    snap.addEventListener("click", play);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (reduced) return;
      const dist = () => track.scrollWidth - window.innerWidth;
      const hold = () => window.innerHeight * 1.5;
      // The track moves over the first `dist` px of scroll, then the pin holds for `hold` px while the Crack
      // plays. `move` stays a plain linear tween so it can serve as the containerAnimation for the beats.
      const move = gsap.to(track, { x: () => -dist(), ease: "none", duration: dist() });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist() + hold()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      tl.add(move, 0).to({}, { duration: hold() });
      beats.forEach((b) => {
        gsap.from(b.querySelector("[data-pack]"), { y: 160, rotate: 16, ease: "none", scrollTrigger: { trigger: b, containerAnimation: move, start: "left 80%", end: "left 20%", scrub: true } });
      });
      gsap.to(root.querySelector("[data-bar]"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist()}`, scrub: true } });
      ScrollTrigger.create({ trigger: snap, containerAnimation: move, start: "left 45%", onEnter: play, onEnterBack: play });
    });

    mm.add("(max-width: 767px)", () => {
      let idx = 0;
      let timer: ReturnType<typeof setTimeout> | undefined;
      let hold = false;
      let onScreen = false;
      const goTo = (i: number) => {
        const card = cards[i];
        if (card) track.scrollTo({ left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
      };
      const stop = () => {
        if (timer) clearTimeout(timer);
        timer = undefined;
      };
      // autoplay: only while the section is on screen and no finger is on the track; longer on the last card
      const schedule = () => {
        stop();
        if (reduced || !onScreen || hold) return;
        timer = setTimeout(() => goTo((idx + 1) % cards.length), idx === cards.length - 1 ? HOLD_MS : AUTOPLAY_MS);
      };
      // which card is showing → dots + clock; the last card → the Crack
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const i = cards.indexOf(e.target as HTMLElement);
            if (i >= 0) {
              idx = i;
              setDot(i);
              schedule();
            }
            if (e.target.contains(snap)) play();
          });
        },
        { root: track, threshold: 0.6 },
      );
      cards.forEach((c) => io.observe(c));
      const vis = new IntersectionObserver(
        (e) => {
          onScreen = e[0].isIntersecting;
          schedule();
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
        schedule();
      };
      track.addEventListener("pointerdown", down);
      track.addEventListener("pointerup", up);
      track.addEventListener("pointercancel", up);
      return () => {
        stop();
        io.disconnect();
        vis.disconnect();
        track.removeEventListener("pointerdown", down);
        track.removeEventListener("pointerup", up);
        track.removeEventListener("pointercancel", up);
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

          {/* the Crack */}
          <div data-card className="flex w-[84vw] shrink-0 snap-center items-center justify-center py-8 md:w-[calc(100vw-2*var(--gutter))] md:py-0">
            <button type="button" data-snap className="relative inline-block cursor-pointer select-none" aria-label={`${site.freeze.close} Replay the crack`}>
              <span data-shock className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[140%] rounded-full border-[3px] border-tangerine opacity-0" aria-hidden />
              <svg data-crack viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-0" aria-hidden>
                <path
                  d={CRACK_PATH}
                  fill="none"
                  stroke="var(--color-tangerine)"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ filter: "drop-shadow(0 0 6px rgba(252,156,0,.9))" }}
                />
              </svg>
              <span data-word className={WORD}>
                {site.freeze.close}
              </span>
              <span data-top aria-hidden className={cn(WORD, "absolute inset-0 opacity-0")} style={{ clipPath: polys.top }}>
                {site.freeze.close}
              </span>
              <span data-bot aria-hidden className={cn(WORD, "absolute inset-0 opacity-0")} style={{ clipPath: polys.bot }}>
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
