import { site } from "@/content/site";
import type { Product } from "@/lib/types";

/**
 * The details every PDP is expected to carry, as native accordions: ingredients, nutrition, storage,
 * shipping, returns. Policy copy lives in content/site.ts (pdp.policies) and is marked DRAFT in CONTENT.md
 * until operations confirm it.
 */
export function ProductDetails({ p }: { p: Product }) {
  const items = [
    { title: "Ingredients", body: p.ingredients },
    { title: "Nutrition", body: `${site.pdp.nutrition} Net weight ${p.weight}. FSSAI vegetarian mark on pack.` },
    ...site.pdp.policies,
  ];
  return (
    <div className="divide-y divide-forest/15 border-y border-forest/15">
      {items.map((it, i) => (
        <details key={it.title} className="group" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl">
            {it.title}
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-forest/20 text-lg leading-none transition-transform duration-300 group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <div className="pb-5 pr-12 text-[0.95rem] leading-relaxed opacity-80">{it.body}</div>
        </details>
      ))}
    </div>
  );
}
