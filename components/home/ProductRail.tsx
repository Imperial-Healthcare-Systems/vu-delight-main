"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { featured } from "@/content/products";
import { site } from "@/content/site";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { useGsap } from "@/lib/gsap";

/** Nutraj "Explore the World of Exotic Nuts": dark panel with one huge curved corner, white cards, arrow nav on md+ (swipe on touch). */
export function ProductRail() {
  const swiper = useRef<SwiperType | null>(null);
  const ref = useGsap<HTMLElement>(({ gsap, ScrollTrigger, root, reduced }) => {
    if (reduced) return;
    const track = root.querySelector("[data-track]");
    ScrollTrigger.create({
      trigger: root,
      onUpdate: (s) => gsap.to(track, { skewX: gsap.utils.clamp(-5, 5, s.getVelocity() / -400), duration: 0.5, overwrite: true }),
    });
  });

  return (
    <section ref={ref} className="relative overflow-x-clip pb-16 pt-0 md:pb-32 md:pt-10" aria-labelledby="rail-title">
      <div className="relative ml-0 rounded-t-[1.75rem] bg-ink py-12 text-cream md:ml-[4vw] md:rounded-none md:curve-tr md:py-28">
        <div className="container-x">
          <SectionHead
            id="rail-title"
            title={site.rail.title}
            mark={site.rail.mark}
            copy={site.rail.copy}
            action={
              <div className="hidden gap-2 md:flex">
                <button onClick={() => swiper.current?.slidePrev(600)} className="pill grid h-12 w-12 place-items-center border border-cream/30 transition-colors hover:bg-cream hover:text-ink" aria-label="Previous">
                  ←
                </button>
                <button onClick={() => swiper.current?.slideNext(600)} className="pill grid h-12 w-12 place-items-center border border-cream/30 transition-colors hover:bg-cream hover:text-ink" aria-label="Next">
                  →
                </button>
              </div>
            }
          />
        </div>
        <Reveal className="mt-12">
          <div data-track>
            <Swiper
              modules={[Navigation, Autoplay]}
              onSwiper={(s) => (swiper.current = s)}
              slidesPerView="auto"
              spaceBetween={20}
              loop
              speed={6000}
              autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
              grabCursor
              breakpoints={{ 768: { spaceBetween: 24 } }}
              className="conveyor"
            >
              {featured.map((p) => (
                <SwiperSlide key={p.slug} className="!w-[70vw] sm:!w-[42vw] md:!w-[30vw] lg:!w-[23vw]">
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
