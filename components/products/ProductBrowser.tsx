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
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products">
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
      <div ref={ref} className="mt-14 grid grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 md:gap-x-7 lg:grid-cols-4">
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
        "pill flex items-center gap-2 border-[1.5px] px-4 py-2 text-sm font-semibold transition-colors",
        active ? "border-transparent bg-[var(--sku,var(--color-forest))] text-[var(--sku-ink,#fff)]" : "border-forest/20 hover:border-forest",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
