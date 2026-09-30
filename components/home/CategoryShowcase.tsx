"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { categories } from "@/content/categories";
import { byCategory } from "@/content/products";
import { site } from "@/content/site";
import type { Category } from "@/lib/types";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button, Arrow } from "@/components/ui/Button";
import { floatAll } from "@/components/motion/Float";
import { TextReveal } from "@/components/motion/TextReveal";
import { useGsap } from "@/lib/gsap";
import { cn, skuVars } from "@/lib/utils";

/**
 * One editorial block per category, straight from categories[]. The fanned packs drop in and keep floating,
 * one rising while its neighbour settles.
 * Shelves with five or more packs get an infinite oval-tile conveyor beneath; smaller shelves show their
 * packs in the block itself. A third category adds itself here with no UI work.
 */
export function CategoryShowcase() {
  return (
    <section id="shelves" className="py-12 md:py-24" aria-labelledby="cats-title">
      <div className="container-x">
        <SectionHead id="cats-title" title={site.shelves.title} mark={site.shelves.mark} copy={site.shelves.copy} />
      </div>
      <div className="mt-10 flex flex-col gap-12 md:mt-16 md:gap-28">
        {categories.map((c, i) => (
          <Block key={c.slug} c={c} i={i} />
        ))}
      </div>
    </section>
  );
}

const FAN: Record<number, string[]> = {
  1: ["left-1/2 w-[52%] -translate-x-1/2"],
  2: ["left-[6%] w-[46%] -rotate-6", "right-[6%] w-[46%] rotate-6 md:-top-[16%]"],
  3: ["left-0 w-[40%] -rotate-10", "left-1/2 z-10 w-[44%] -translate-x-1/2 -translate-y-[10%]", "right-0 w-[40%] rotate-10"],
  4: ["left-0 w-[34%] -rotate-12", "left-[22%] z-10 w-[36%] -rotate-3 -translate-y-[8%]", "right-[22%] z-10 w-[36%] rotate-3 -translate-y-[8%]", "right-0 w-[34%] rotate-12"],
};

function Block({ c, i }: { c: Category; i: number }) {
  const list = byCategory(c.slug);
  const shown = list.slice(0, 4);
  const flip = i % 2 === 1;
  const dark = c.ink === "#FFFFFF";
  const tags = [...new Set(list.map((p) => p.tag).filter(Boolean))] as string[];
  const weights = [...new Set(list.map((p) => p.weight))];

  const ref = useGsap<HTMLDivElement>(({ gsap, root, reduced }) => {
    const packs = root.querySelectorAll<HTMLElement>("[data-pack]");
    // idle float runs on yPercent so it never fights the y entrance below; neighbours out of phase
    floatAll(gsap, packs, reduced ? 2 : 7, "up");
    if (reduced) return;
    gsap.from(packs, {
      y: 140,
      rotate: (k) => (k % 2 ? 18 : -18),
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: { trigger: root, start: "top 72%", once: true },
    });
  });

  return (
    <div ref={ref} style={skuVars(c.accent, c.ink, c.accent)}>
      <div className="container-x">
        <div className={cn("tile sku-bg noise relative grid gap-6 overflow-visible p-6 md:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14", flip && "lg:[&>*:first-child]:order-2")}>
          <div className="relative z-10 flex flex-col justify-center">
            <TextReveal as="h3" mode="lines" className="t-h1 font-display">
              {c.headline}
            </TextReveal>
            <TextReveal mode="words" className="mt-5 max-w-md opacity-85">
              {c.copy}
            </TextReveal>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={`/collections/${c.slug}`} variant={dark ? "cream" : "primary"}>
                Shop {c.short} <Arrow />
              </Button>
              <span className="sticker border border-current/30">{list.length} packs</span>
              {weights.map((w) => (
                <span key={w} className="sticker border border-current/30">
                  {w}
                </span>
              ))}
              {tags.map((t) => (
                <span key={t} className="sticker bg-[var(--sku-ink)] text-[var(--sku)]">
                  incl. {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-60 md:min-h-72 lg:min-h-[26rem]">
            {shown.map((p, k) => (
              <Image key={p.slug} data-pack src={p.image} alt="" width={300} height={480} className={cn("pack-shadow absolute bottom-0 max-w-[260px] will-change-transform", FAN[shown.length][k])} />
            ))}
            <span className="t-display pointer-events-none absolute -right-3 -top-12 hidden select-none opacity-15 md:-top-16 md:block" aria-hidden>
              {c.short.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>

      {list.length >= 5 && (
        <div className="mt-10 overflow-x-clip pt-2">
          <Swiper
            modules={[Autoplay]}
            loop
            slidesPerView="auto"
            spaceBetween={24}
            speed={5500}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            grabCursor
            breakpoints={{ 768: { spaceBetween: 32 } }}
            className="conveyor"
          >
            {list.map((p) => (
              <SwiperSlide key={p.slug} className="!w-[62vw] sm:!w-[40vw] md:!w-[28vw] lg:!w-[21vw]">
                <ProductCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
