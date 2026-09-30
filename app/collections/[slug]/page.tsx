import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/content/categories";
import { byCategory } from "@/content/products";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { TextReveal } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Logo } from "@/components/ui/Logo";
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
  const dark = c.ink === "#FFFFFF";
  const weights = [...new Set(list.map((p) => p.weight))];
  const tags = [...new Set(list.map((p) => p.tag).filter(Boolean))] as string[];

  return (
    <>
      <section className="sku-bg noise relative overflow-hidden pt-[calc(var(--header-h)+5rem)]" style={skuVars(c.accent, c.ink, c.accent)} aria-labelledby="col-title">
        <span className={`absolute right-[var(--gutter)] top-[calc(var(--header-h)+5rem)] z-10 hidden h-16 w-16 -rotate-12 place-items-center rounded-full border md:grid ${dark ? "border-cream/30" : "border-forest/20"}`} aria-hidden>
          <Logo variant={dark ? "cream" : "forest"} className="h-7" />
        </span>
        <div className="container-x relative z-10 pb-24 md:pb-32">
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
        <Reveal className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-end gap-[2vw] pr-[4vw] md:top-[10%]" y={120}>
          {list.slice(0, 4).map((p, i) => (
            <Image
              key={p.slug}
              data-item
              data-speed={1.06 + (i % 2) * 0.06}
              src={p.image}
              alt=""
              width={260}
              height={420}
              priority={i < 2}
              className="pack-shadow h-auto w-[14vw] min-w-[70px] max-w-[220px]"
              style={{ rotate: `${(i - 1.5) * 8}deg`, translate: `0 ${Math.abs(i - 1.5) * 12}px` }}
            />
          ))}
        </Reveal>
        <span className="t-display pointer-events-none absolute -bottom-[0.2em] left-[2vw] select-none whitespace-nowrap opacity-15" aria-hidden>
          {c.short.split(" ")[0]}
        </span>
      </section>
      <section className="py-16 md:py-24" aria-label={`${c.name} products`}>
        <ProductBrowser initial={c.slug} />
      </section>
    </>
  );
}
