import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Hi } from "@/components/ui/Hi";
import { Button, Arrow } from "@/components/ui/Button";
import { Compare } from "@/components/story/Compare";
import { Float } from "@/components/motion/Float";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Our story", description: site.signature };

export default function Story() {
  return (
    <>
      <PageHero title={site.story.title} mark={site.story.mark} copy={site.signature} />

      <section className="container-x grid gap-12 pb-20 md:grid-cols-12 md:pb-28" aria-labelledby="belief">
        <div className="md:col-span-5">
          <div className="tile relative aspect-[4/5] overflow-hidden bg-pink">
            <Float amp={4}>
              <Image data-float data-speed="1.1" src="/products/strawberry.png" alt="" width={420} height={680} priority className="pack-shadow absolute left-1/2 top-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 -rotate-6" />
            </Float>
            <span className="t-display absolute -bottom-6 left-4 select-none text-cream opacity-30" aria-hidden>
              Yay
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center md:col-span-7 md:pl-8">
          <TextReveal as="h2" mode="lines" className="t-h2 font-display text-forest" id="belief">
            {site.manifesto.lines[0]}
          </TextReveal>
          <TextReveal mode="words" className="t-lead mt-6 max-w-xl opacity-80">
            {site.manifesto.lines[1]} {site.story.intro}
          </TextReveal>
        </div>
      </section>

      <section id="method" className="bg-forest py-20 text-cream md:py-28" aria-labelledby="process-title">
        <div className="container-x">
          <SectionHead id="process-title" title={site.story.process.title} mark={site.story.process.mark} markColor="pink" copy={site.freeze.copy} />
          <Reveal className="mt-10 grid md:mt-14 gap-5 md:grid-cols-3">
            {site.freeze.beats.map((b, i) => (
              <div key={b.n} data-item className={cn("tile p-8 md:p-10", ["bg-pink text-white", "bg-[#06428A] text-white", "bg-tangerine text-ink"][i])}>
                <p className="t-display leading-none opacity-40">{b.n}</p>
                <h3 className="t-h3 mt-6 font-display">{b.title}</h3>
                <p className="mt-3 opacity-85">{b.copy}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Compare />

      <section className="bg-cream-2 py-14 md:py-28" aria-labelledby="values-title">
        <div className="container-x">
          <h2 id="values-title" className="t-h2 font-display">
            Four things we <Hi color="pink">won&apos;t bend on.</Hi>
          </h2>
          <Reveal className="mt-10 grid md:mt-14 gap-px overflow-hidden rounded-[2rem] bg-forest/15 sm:grid-cols-2 lg:grid-cols-4">
            {site.story.values.map((v, i) => (
              <div key={v.t} data-item className="flex flex-col gap-4 bg-cream p-8">
                <span className="font-display text-3xl text-pink">0{i + 1}</span>
                <h3 className="t-h3 font-display">{v.t}</h3>
                <p className="opacity-75">{v.c}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="container-x py-24 text-center md:py-32">
        <p className="t-h2 font-display text-forest">Ready when you are.</p>
        <Button href="/shop" size="lg" className="mt-8">
          Shop the crunch <Arrow />
        </Button>
      </section>
    </>
  );
}
