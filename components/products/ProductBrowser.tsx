"use client";

import { useMemo, useState } from "react";
import { categories } from "@/content/categories";
import { products } from "@/content/products";
import { ProductCard } from "./ProductCard";
import { useGsap } from "@/lib/gsap";
import { cn, skuVars } from "@/lib/utils";

/**
 * Filterable grid. Chips derive from categories[] plus any product `tag` (e.g. Masala).
 * Filter values: "all" | <category slug> | "tag:<Tag>". The grid re-animates on change.
 * On phones the chip row is a single swipeable line that sticks under the header while you browse.
 */
export function ProductBrowser({ initial = "all" }: { initial?: string }) {
  const [f, setF] = useState(initial);
  const tags = useMemo(() => [...new Set(products.map((p) => p.tag).filter(Boolean))] as string[], []);
  const list = useMemo(
    () => (f === "all" ? products : f.startsWith("tag:") ? products.filter((p) => p.tag === f.slice(4)) : products.filter((p) => p.category === f)),
    [f],
  );
  const ref = useGsap<HTMLDivElement>(
    ({ gsap, root, reduced }) => {
      if (reduced) return;
      gsap.from(root.querySelectorAll("[data-card]"), { y: 40, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.05 });
    },
    [f],
  );

  return (
    <div className="container-x">
      <div className="sticky top-[4.25rem] z-30 -mx-[var(--gutter)] bg-cream/90 px-[var(--gutter)] py-3 backdrop-blur-md md:static md:mx-0 md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none">
        <div className="flex gap-2 overflow-x-auto scrollbar-none md:flex-wrap md:overflow-visible" role="tablist" aria-label="Filter products">
          <Chip active={f === "all"} onClick={() => setF("all")}>
            All <span className="opacity-60">{products.length}</span>
          </Chip>
          {categories.map((c) => (
            <Chip key={c.slug} active={f === c.slug} onClick={() => setF(c.slug)} style={skuVars(c.accent, c.ink, c.accent)}>
              {c.name} <span className="opacity-60">{products.filter((p) => p.category === c.slug).length}</span>
            </Chip>
          ))}
          {tags.map((t) => (
            <Chip key={t} active={f === `tag:${t}`} onClick={() => setF(`tag:${t}`)}>
              {t} <span className="opacity-60">{products.filter((p) => p.tag === t).length}</span>
            </Chip>
          ))}
        </div>
      </div>
      <div ref={ref} className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-14 md:grid-cols-3 md:gap-x-7 md:gap-y-14 lg:grid-cols-4">
        {list.map((p, i) => (
          <div key={p.slug} data-card>
            <ProductCard p={p} priority={i < 4} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Chip({ active, children, ...rest }: { active: boolean; children: React.ReactNode } & React.ComponentProps<"button">) {
  return (
    <button
      role="tab"
      aria-selected={active}
      className={cn(
        "pill flex shrink-0 items-center gap-2 border-[1.5px] px-4 py-2.5 text-sm font-semibold transition-colors md:py-2",
        active ? "border-transparent bg-[var(--sku,var(--color-forest))] text-[var(--sku-ink,#fff)]" : "border-forest/20 hover:border-forest",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
