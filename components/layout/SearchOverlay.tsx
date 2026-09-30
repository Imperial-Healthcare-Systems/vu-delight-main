"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useUI } from "@/lib/store";
import { displayName, products } from "@/content/products";
import { categories, getCategory } from "@/content/categories";
import { site } from "@/content/site";
import { ProductCard } from "@/components/products/ProductCard";
import { TransitionLink } from "./TransitionLink";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Full-screen search. Local filtering over content/products.ts; swap `results` for the API later. */
export function SearchOverlay() {
  const { searchOpen, setSearch } = useUI();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const close = () => {
    setSearch(false);
    setQ("");
  };

  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => input.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearch(false);
        setQ("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen, setSearch]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products.filter((p) => p.featured).slice(0, 4);
    return products.filter((p) => [displayName(p), p.hook, p.tag ?? "", getCategory(p.category)?.name ?? ""].join(" ").toLowerCase().includes(s));
  }, [q]);
  const tags = [...new Set(products.map((p) => p.tag).filter(Boolean))] as string[];

  return (
    <div
      className={cn("fixed inset-0 z-[75] bg-cream text-ink transition-[opacity,visibility] duration-500 ease-[var(--ease-out-expo)]", searchOpen ? "opacity-100" : "pointer-events-none invisible opacity-0")}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      aria-hidden={!searchOpen}
    >
      <div className="container-x flex h-full flex-col pb-8 pt-24 md:pt-28">
        <div className="flex items-center gap-4 border-b-2 border-forest pb-4">
          <Logo variant="forest" className="h-6 shrink-0" />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={site.search.placeholder}
            className="t-h2 w-full bg-transparent font-display text-forest outline-none placeholder:text-forest/30"
            aria-label="Search products"
            autoComplete="off"
          />
          <button onClick={close} className="pill h-11 w-11 shrink-0 border-[1.5px] border-current text-xl leading-none" aria-label="Close search">
            ×
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm opacity-60">Jump to</span>
          {categories.map((c) => (
            <TransitionLink key={c.slug} href={`/collections/${c.slug}`} className="pill border-[1.5px] border-forest/20 px-4 py-1.5 text-sm font-semibold transition-colors hover:border-forest hover:bg-forest hover:text-cream">
              {c.name}
            </TransitionLink>
          ))}
          {tags.map((t) => (
            <button key={t} onClick={() => setQ(t)} className="pill border-[1.5px] border-forest/20 px-4 py-1.5 text-sm font-semibold transition-colors hover:border-forest hover:bg-forest hover:text-cream">
              {t}
            </button>
          ))}
        </div>

        <p className="mt-10 font-display text-xl">{q ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”` : "Popular right now"}</p>
        {q && !results.length && <p className="t-h3 mt-4 font-display">{site.search.empty}</p>}
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 overflow-y-auto pb-24 pr-1 scrollbar-none sm:grid-cols-3 md:mt-8 md:gap-x-5 md:gap-y-12 md:pb-6 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
