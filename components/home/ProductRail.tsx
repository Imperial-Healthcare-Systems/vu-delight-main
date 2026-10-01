"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { featured, products } from "@/content/products";
import { site } from "@/content/site";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { useGsap } from "@/lib/gsap";

/**
 * Nutraj "Explore the World of Exotic Nuts": an inset dark panel with two slow colour glows (the first and
 * last featured pack's accents), a stroke watermark and grain; white cards (three copies of the six featured
 * packs, so the loop never runs short of slides) on an infinite conveyor clipped
 * inside the panel so nothing spills onto the cream. Arrows on md+, swipe on touch. Card width is capped so
 * the rail reads the same on a 1440 laptop and a 1920 monitor. On phones the panel is full-bleed.
 */
export function ProductRail() {
  const swiper = useRef<SwiperType | null>(null);
  const lead = featured[0];
  const tail = featured[featured.length - 1];
  // three copies: Swiper quietly disables looping when the slides barely fill a wide panel (6 × 300px ≈ 1900px)
  const slides = [...featured, ...featured, ...featured];

  const ref = useGsap<HTMLElement>(({ gsap, ScrollTrigger, root, reduced }) => {
    gsap.to(root.querySelectorAll("[data-glow]"), { xPercent: 14, yPercent: -12, duration: reduced ? 18 : 9, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 2 });
    if (reduced) return;
    const track = root.querySelector("[data-track]");
    ScrollTrigger.create({
      trigger: root,
      onUpdate: (s) => gsap.to(track, { skewX: gsap.utils.clamp(-5, 5, s.getVelocity() / -400), duration: 0.5, overwrite: true }),
    });
  });

  return (
    <section ref={ref} className="relative overflow-x-clip pb-16 pt-0 md:pb-28 md:pt-10" aria-labelledby="rail-title">
      <div className="noise relative overflow-hidden rounded-t-[1.75rem] bg-ink py-12 text-cream md:mx-[var(--gutter)] md:rounded-[2.5rem] md:py-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <span data-glow className="absolute -left-[12%] -top-[30%] h-[80%] w-[48%] rounded-full blur-3xl" style={{ background: lead.accent, opacity: 0.22 }} />
          <span data-glow className="absolute -bottom-[40%] right-[-8%] h-[90%] w-[44%] rounded-full blur-3xl" style={{ background: tail.accent, opacity: 0.18 }} />
          <span className="t-display stroke absolute right-[3%] top-[5%] hidden select-none whitespace-nowrap leading-none text-cream/[0.14] md:block">Favourites</span>
        </div>

        <div className="container-x relative">
          <SectionHead
            id="rail-title"
            title={site.rail.title}
            mark={site.rail.mark}
            copy={site.rail.copy}
            action={
              <div className="flex items-center gap-3">
                <TransitionLink href="/shop" className="pill hidden items-center gap-2 border border-cream/30 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-cream hover:text-ink sm:inline-flex">
                  All {products.length} packs
                </TransitionLink>
                <div className="hidden gap-2 md:flex">
                  <button onClick={() => swiper.current?.slidePrev(600)} className="pill grid h-12 w-12 place-items-center border border-cream/30 transition-colors hover:bg-cream hover:text-ink" aria-label="Previous">
                    ←
                  </button>
                  <button onClick={() => swiper.current?.slideNext(600)} className="pill grid h-12 w-12 place-items-center border border-cream/30 transition-colors hover:bg-cream hover:text-ink" aria-label="Next">
                    →
                  </button>
                </div>
              </div>
            }
          />
        </div>

        <Reveal className="relative mt-10 md:mt-12">
          <div data-track>
            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={(s) => (swiper.current = s)}
              slidesPerView="auto"
              spaceBetween={20}
              loop
              loopAdditionalSlides={3}
              speed={6000}
              autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
              grabCursor
              breakpoints={{ 768: { spaceBetween: 24 } }}
              className="conveyor"
            >
              {slides.map((p, i) => (
                <SwiperSlide key={`${p.slug}-${i}`} className="!w-[70vw] sm:!w-[42vw] md:!w-[min(30vw,300px)]">
                  <div data-item className="h-full">
                    <ProductCard p={p} skin="card" className="h-full" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
