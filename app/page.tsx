import { Hero } from "@/components/hero/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { StrokeMarquee } from "@/components/home/StrokeMarquee";
import { Manifesto } from "@/components/home/Manifesto";
import { FreezeStory } from "@/components/home/FreezeStory";
import { ProductRail } from "@/components/home/ProductRail";
import { InsideOutside } from "@/components/home/InsideOutside";
import { Testimonials } from "@/components/home/Testimonials";
import { OfferSlider } from "@/components/home/OfferSlider";
import { DelightClub } from "@/components/home/DelightClub";
import { AmbientBlobs } from "@/components/ui/AmbientBlobs";
import { SectionShell } from "@/components/motion/SectionShell";
import { Marquee } from "@/components/motion/Marquee";
import { site } from "@/content/site";

/**
 * Home. The hero is sticky; each SectionShell slides over the one before it with a rounded edge and a
 * scroll-linked lift, so every section change reads as a transition. Sections are category-driven.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <SectionShell i={0} overlap={false} className="isolate pt-2">
          <AmbientBlobs />
          <div className="border-b border-forest/10">
            <Marquee speed={70} className="py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-forest">
              {site.claims.map((c, i) => (
                <span key={c} className="flex items-center gap-6 pr-6">
                  {c} <span className={`h-2 w-2 rounded-full ${i % 2 ? "bg-pink" : "bg-tangerine"}`} />
                </span>
              ))}
            </Marquee>
          </div>
          <CategoryShowcase />
        </SectionShell>
        <SectionShell i={1} tone="forest">
          <StrokeMarquee />
        </SectionShell>
        <SectionShell i={2} pinned>
          <Manifesto />
        </SectionShell>
        <SectionShell i={3} tone="forest" pinned>
          <FreezeStory />
        </SectionShell>
        <SectionShell i={4}>
          <ProductRail />
        </SectionShell>
        <SectionShell i={5} tone="cream-2">
          <InsideOutside />
        </SectionShell>
        <SectionShell i={6}>
          <Testimonials />
        </SectionShell>
        <SectionShell i={7} tone="cream-2">
          <OfferSlider />
        </SectionShell>
        <SectionShell i={8} className="isolate">
          <AmbientBlobs />
          <DelightClub />
        </SectionShell>
      </div>
    </>
  );
}
