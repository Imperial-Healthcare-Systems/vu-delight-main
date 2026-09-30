import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { BadgeIconSvg } from "@/components/ui/Sticker";
import type { BadgeIcon } from "@/lib/types";

const noIcons: BadgeIcon[] = ["no-palm", "no-preservative", "no-sugar", "vegan"];

/** Let's Try "Why choose us" energy, without inventing competitor claims: what is in the bag, what is not. */
export function InsideOutside() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="inside-title">
      <div className="container-x">
        <SectionHead id="inside-title" title={site.inside.title} mark={site.inside.mark} markColor="pink" copy={site.inside.copy} />
        <Reveal className="mt-14 grid gap-5 md:grid-cols-5">
          <ul data-item className="tile bg-forest p-8 text-cream md:col-span-2 md:p-10">
            <li className="mb-6 font-display text-2xl text-lime">Inside</li>
            {site.inside.yes.map((y, i) => (
              <li key={y} className="flex items-baseline gap-4 border-t border-cream/15 py-4 font-display text-3xl md:text-4xl">
                <span className="text-xs font-sans opacity-50">0{i + 1}</span>
                {y}
              </li>
            ))}
            <li className="mt-6 text-sm opacity-70">That is the list.</li>
          </ul>
          <ul data-item className="tile relative overflow-hidden bg-pink p-8 text-white md:col-span-3 md:p-10">
            <li className="mb-6 font-display text-2xl">Not inside. Ever.</li>
            {site.inside.no.map((n, i) => (
              <li key={n} className="flex items-center gap-5 border-t border-white/20 py-4 font-display text-3xl md:text-5xl">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-white/60">
                  <BadgeIconSvg icon={noIcons[i]} className="h-6 w-6" />
                </span>
                <span className="line-through decoration-white/50 decoration-2">{n}</span>
              </li>
            ))}
            <li className="t-display pointer-events-none absolute -bottom-10 -right-6 select-none opacity-15" aria-hidden>
              Nope
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
