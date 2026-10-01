"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { site } from "@/content/site";
import { getProduct } from "@/content/products";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Sticker } from "@/components/ui/Sticker";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Float } from "@/components/motion/Float";
import { cn, skuVars } from "@/lib/utils";

const COPIES = 4;

/**
 * Bundles carousel. Swiper's creative effect places neighbours by explicit, mirrored transforms, so left and
 * right always match: one card each side at 86% offset, a second at 172%, pushed back and scaled, all fully
 * opaque so nothing bleeds through where cards overlap. The three bundles are repeated so loop mode always has
 * slides on both sides of the active card; the dots below map back to the three real bundles.
 * No prices (none in any source).
 */
export function OfferSlider() {
  const items = site.offers.items;
  const slides = Array.from({ length: COPIES }, () => items).flat();
  const swiper = useRef<SwiperType | null>(null);
  const [current, setCurrent] = useState(0);
  const goTo = (k: number) => {
    const s = swiper.current;
    if (!s) return;
    const base = s.realIndex - (s.realIndex % items.length);
    s.slideToLoop(base + k, 700);
  };

  return (
    <section className="overflow-x-clip py-14 md:py-28" aria-labelledby="offers-title">
      <div className="container-x">
        <SectionHead id="offers-title" align="center" title={site.offers.title} mark={site.offers.mark} copy={site.offers.copy} />
      </div>
      <Reveal className="mx-auto mt-12 w-[78vw] max-w-[540px]">
        <Swiper
          modules={[EffectCreative, Autoplay]}
          effect="creative"
          creativeEffect={{
            limitProgress: 2,
            perspective: true,
            prev: { translate: ["-86%", 0, -200], rotate: [0, 0, -3], scale: 0.9 },
            next: { translate: ["86%", 0, -200], rotate: [0, 0, 3], scale: 0.9 },
          }}
          onSwiper={(s) => (swiper.current = s)}
          onSlideChange={(s) => setCurrent(s.realIndex % items.length)}
          slidesPerView={1}
          centeredSlides
          loop
          loopAdditionalSlides={3}
          speed={700}
          grabCursor
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        >
          {slides.map((o, i) => {
            const packs = o.skus.map(getProduct).filter(Boolean);
            const lead = packs[0]!;
            return (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <TransitionLink
                    href={`/collections/${lead.category}`}
                    className={cn("tile sku-bg noise relative block aspect-square overflow-hidden p-7 transition-shadow duration-700 md:p-9", isActive && "shadow-[0_40px_80px_rgba(1,50,21,.28)]")}
                    style={skuVars(lead.accent, lead.ink, lead.soft)}
                    tabIndex={isActive ? 0 : -1}
                    aria-hidden={!isActive}
                  >
                    <Sticker tone="cream" rotate={-5} className="absolute right-6 top-6">
                      {o.tag}
                    </Sticker>
                    <p className="text-sm font-semibold opacity-80">Bundle 0{(i % items.length) + 1}</p>
                    <h3 className="t-h2 mt-3 max-w-[70%] font-display">{o.title}</h3>
                    <p className="mt-2 max-w-[60%] opacity-85">{o.copy}</p>
                    <Float className="absolute -bottom-6 right-0 flex items-end" amp={4}>
                      {packs.map((p, j) => (
                        <Image
                          key={p!.slug}
                          data-float
                          src={p!.image}
                          alt=""
                          width={200}
                          height={320}
                          className={cn("pack-shadow w-[30%] min-w-[84px] transition-transform duration-700 md:min-w-[110px]", j === 0 && "translate-x-8 -rotate-6", j === 1 && "z-10 -translate-y-4", j === 2 && "-translate-x-8 rotate-6", isActive && "translate-y-[-6px]")}
                        />
                      ))}
                    </Float>
                  </TransitionLink>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="mt-8 flex justify-center" role="tablist" aria-label="Bundles">
          {items.map((o, k) => (
            <button key={o.title} role="tab" aria-selected={current === k} aria-label={o.title} onClick={() => goTo(k)} className="grid h-8 min-w-8 place-items-center px-1">
              <span className={cn("block h-2.5 rounded-full transition-[width,background-color] duration-300", current === k ? "w-6 bg-forest" : "w-2.5 bg-forest/25")} />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
