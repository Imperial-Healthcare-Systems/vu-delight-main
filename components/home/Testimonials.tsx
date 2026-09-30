"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay } from "swiper/modules";
import "swiper/css/effect-cards";
import { site } from "@/content/site";
import { getProduct } from "@/content/products";
import { SectionHead } from "@/components/ui/SectionHead";
import { Sticker } from "@/components/ui/Sticker";
import { useGsap } from "@/lib/gsap";
import { skuVars } from "@/lib/utils";

type Review = (typeof site.testimonials.reviews)[number];

/**
 * What people say. Left: a swipeable deck of review cards (Swiper cards effect, each in its pack's colour).
 * Right: two columns of mini reviews scrolling in opposite directions, pausing on hover.
 * Reviews are samples until the store connects; `site.testimonials.note` says so under the section.
 */
export function Testimonials() {
  const t = site.testimonials;

  const wall = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    const ticks: ((time: number, dt: number) => void)[] = [];
    root.querySelectorAll<HTMLElement>("[data-col]").forEach((col, i) => {
      const inner = col.firstElementChild as HTMLElement;
      const half = inner.scrollHeight / 2;
      const dir = i % 2 ? 1 : -1;
      const speed = reduced ? 10 : 24;
      const wrap = gsap.utils.wrap(-half, 0);
      let y = 0;
      let paused = false;
      const tick = (_t: number, dt: number) => {
        if (paused) return;
        y += (dir * speed * dt) / 1000;
        gsap.set(inner, { y: wrap(y) });
      };
      col.addEventListener("pointerenter", () => (paused = true));
      col.addEventListener("pointerleave", () => (paused = false));
      gsap.ticker.add(tick);
      ticks.push(tick);
    });
    return () => ticks.forEach((fn) => gsap.ticker.remove(fn));
  });

  return (
    <section className="py-20 md:py-28" aria-labelledby="say-title">
      <div className="container-x">
        <SectionHead id="say-title" title={t.title} mark={t.mark} markColor="pink" copy={t.copy} />
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Swiper
              modules={[EffectCards, Autoplay]}
              effect="cards"
              cardsEffect={{ perSlideOffset: 10, perSlideRotate: 3, slideShadows: false }}
              grabCursor
              loop
              speed={650}
              autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
              className="!mx-auto !w-[78vw] max-w-[380px] md:!w-full md:max-w-[420px]"
            >
              {t.reviews.map((r, i) => (
                <SwiperSlide key={i}>
                  <Card r={r} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div ref={wall} className="hidden h-[34rem] gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] md:col-span-7 md:grid md:grid-cols-2">
            {[0, 1].map((c) => {
              const items = t.reviews.filter((_, i) => i % 2 === c);
              return (
                <div key={c} data-col className="relative">
                  <div className="flex flex-col gap-4">
                    {[...items, ...items].map((r, i) => (
                      <Mini key={i} r={r} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-6 text-xs opacity-55">{t.note}</p>
      </div>
    </section>
  );
}

function Card({ r }: { r: Review }) {
  const p = getProduct(r.sku)!;
  return (
    <figure className="tile sku-bg noise relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-7 md:p-8" style={skuVars(p.accent, p.ink, p.soft)}>
      <div className="flex items-start justify-between">
        <Sticker tone="cream" rotate={-4} aria-label={`${r.stars} out of 5 stars`}>
          {"★".repeat(r.stars)}
          <span className="opacity-40">{"★".repeat(5 - r.stars)}</span>
        </Sticker>
        <Image src={p.image} alt="" width={90} height={144} className="pack-shadow w-16 rotate-12" />
      </div>
      <blockquote className="font-display text-[clamp(1.5rem,2.3vw,2.1rem)] leading-tight">“{r.quote}”</blockquote>
      <figcaption className="text-sm opacity-85">
        {r.name} · {r.city}
      </figcaption>
    </figure>
  );
}

function Mini({ r }: { r: Review }) {
  const p = getProduct(r.sku)!;
  return (
    <div className="rounded-2xl border border-forest/10 bg-white/80 p-5" style={skuVars(p.accent, p.ink, p.soft)}>
      <div className="flex items-center justify-between">
        <span className="text-xs tracking-wider text-tangerine">{"★".repeat(r.stars)}</span>
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--sku)]" aria-hidden />
      </div>
      <p className="mt-3 font-display text-lg leading-snug">“{r.quote}”</p>
      <p className="mt-3 text-xs opacity-60">
        {r.name} · {r.city} · {p.name}
      </p>
    </div>
  );
}
