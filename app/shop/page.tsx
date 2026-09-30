import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { Marquee } from "@/components/motion/Marquee";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Shop", description: "Every VuDelight pack: freeze dried fruit, masala veg crunch and jaggery tea." };

export default function Shop() {
  return (
    <>
      <PageHero title="Everything, in one" mark="bag." copy="Twelve packs across two shelves. Filter by shelf or tag, or scroll and let a colour pick you." />
      <div className="border-y border-forest/10">
        <Marquee speed={60} className="py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-forest">
          {site.claims.map((c) => (
            <span key={c} className="flex items-center gap-6 pr-6">
              {c} <span className="h-1.5 w-1.5 rounded-full bg-pink" />
            </span>
          ))}
        </Marquee>
      </div>
      <section className="py-10 md:py-20" aria-label="Products">
        <ProductBrowser />
      </section>
    </>
  );
}
