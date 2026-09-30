import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { byCategory, displayName, getProduct, products } from "@/content/products";
import { getCategory } from "@/content/categories";
import { ProductGallery } from "@/components/products/ProductGallery";
import { BuyBox } from "@/components/products/BuyBox";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/motion/Marquee";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { skuVars } from "@/lib/utils";

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: displayName(p), description: p.hook + " " + p.description, openGraph: { images: [p.image] } };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const more = byCategory(p.category).filter((x) => x.slug !== p.slug);
  const others = more.length >= 3 ? more : [...more, ...products.filter((x) => x.category !== p.category)].slice(0, 4);

  return (
    <div style={skuVars(p.accent, p.ink, p.soft)}>
      <nav className="container-x pt-[calc(var(--header-h)+3rem)] text-sm opacity-70" aria-label="Breadcrumb">
        <TransitionLink href="/shop" className="hover:underline">
          Shop
        </TransitionLink>{" "}
        /{" "}
        <TransitionLink href={`/collections/${cat.slug}`} className="hover:underline">
          {cat.name}
        </TransitionLink>{" "}
        / <span className="opacity-100">{displayName(p)}</span>
      </nav>

      <section className="container-x grid gap-10 py-8 lg:grid-cols-12 lg:gap-16 lg:py-12" aria-label={displayName(p)}>
        <div className="lg:col-span-6">
          <ProductGallery p={p} />
        </div>
        <div className="lg:col-span-6 lg:py-6">
          <BuyBox p={p} />
        </div>
      </section>

      <div className="sku-bg mt-10">
        <Marquee speed={80} className="py-4 text-[clamp(1.2rem,2.4vw,2rem)] font-display">
          <span className="flex items-center gap-8 pr-8">
            {p.hook} <span className="h-2 w-2 rounded-full bg-current opacity-60" /> {displayName(p)} <span className="h-2 w-2 rounded-full bg-current opacity-60" />
          </span>
        </Marquee>
      </div>

      <section className="container-x py-20 md:py-28" aria-labelledby="more-title">
        <SectionHead id="more-title" title="Goes well" mark="with." copy={`More from the ${cat.name} shelf.`} />
        <Reveal className="mt-16 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-4 md:gap-x-7">
          {others.slice(0, 4).map((x) => (
            <div key={x.slug} data-item>
              <ProductCard p={x} />
            </div>
          ))}
        </Reveal>
      </section>
    </div>
  );
}
