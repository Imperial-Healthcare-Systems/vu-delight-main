import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/content/categories";
import { byCategory } from "@/content/products";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Float } from "@/components/motion/Float";
import { skuVars } from "@/lib/utils";

export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  return c ? { title: c.name, description: c.copy } : {};
}

export default async function Collection({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  const list = byCategory(c.slug);
  const weights = [...new Set(list.map((p) => p.weight))];
  const tags = [...new Set(list.map((p) => p.tag).filter(Boolean))] as string[];

  return (
    <>
      <section className="sku-bg noise relative overflow-hidden pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+5rem)]" style={skuVars(c.accent, c.ink, c.accent)} aria-labelledby="col-title">
        <div className="container-x relative z-10 pb-4 md:pb-32">
          <TextReveal as="h1" mode="chars" immediate className="t-h1 max-w-4xl font-display" id="col-title">
            {c.headline}
          </TextReveal>
          <TextReveal mode="words" immediate delay={0.4} className="t-lead mt-6 max-w-xl opacity-85">
            {c.copy}
          </TextReveal>
          <div className="mt-8 flex flex-wrap gap-2">
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
        {/* items-end: a flex row with a fixed height would otherwise stretch the images */}
        <Reveal className="pointer-events-none relative mt-4 flex items-end justify-center gap-3 px-[var(--gutter)] pb-6 md:absolute md:inset-x-0 md:bottom-0 md:top-[10%] md:mt-0 md:justify-end md:gap-[2vw] md:px-0 md:pb-0 md:pr-[4vw]" y={120}>
          <Float amp={5}>
          {list.slice(0, 4).map((p, i) => (
            <Image
              key={p.slug}
              data-item
              data-float
              data-speed={1.06 + (i % 2) * 0.06}
              src={p.image}
              alt=""
              width={260}
              height={420}
              priority={i < 2}
              className="pack-shadow h-auto w-[20vw] max-w-[220px] md:w-[14vw] md:min-w-[70px]"
              style={{ rotate: `${(i - 1.5) * 8}deg`, translate: `0 ${Math.abs(i - 1.5) * 12}px` }}
            />
          ))}
          </Float>
        </Reveal>
        <span className="t-display pointer-events-none absolute -bottom-[0.2em] left-[2vw] hidden select-none whitespace-nowrap opacity-15 md:block" aria-hidden>
          {c.short.split(" ")[0]}
        </span>
      </section>
      <section className="py-12 md:py-24" aria-label={`${c.name} products`}>
        <ProductBrowser initial={c.slug} />
      </section>
    </>
  );
}
