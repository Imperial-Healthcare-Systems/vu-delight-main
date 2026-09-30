import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Method comparison for the story page. Category columns describe what is typical of dehydrated / candied
 * fruit and vacuum-fried chips, taken from public labels and studies (sources listed under the table).
 * Nothing about VuDelight's own packs goes beyond what the packs print.
 *
 * md+: a table. Phones: one card per row with the three methods listed inside it, so nothing clips off-screen.
 */
export function Compare() {
  const { compare } = site;
  const short = compare.columns.map((c) => c.split(" (")[0]);
  return (
    <section id="compare" className="container-x py-14 md:py-28" aria-labelledby="compare-title">
      <SectionHead id="compare-title" title={compare.title} mark={compare.mark} copy={compare.copy} />

      <Reveal className="mt-14 hidden overflow-x-auto scrollbar-none md:block">
        <table data-item className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-[0.95rem]">
          <thead>
            <tr>
              <th scope="col" className="w-[22%] pb-4 pr-4 align-bottom text-xs font-semibold uppercase tracking-[0.14em] opacity-60">
                What changes
              </th>
              {compare.columns.map((c, i) => (
                <th key={c} scope="col" className={cn("pb-4 pr-4 align-bottom font-display text-xl leading-tight md:text-2xl", i === 0 && "text-forest")}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compare.rows.map((r) => (
              <tr key={r.label} className="group">
                <th scope="row" className="border-t border-forest/15 py-5 pr-4 align-top font-semibold">
                  {r.label}
                </th>
                {r.cells.map((cell, i) => (
                  <td key={i} className={cn("border-t border-forest/15 py-5 pr-4 align-top leading-snug", i === 0 ? "bg-forest/[0.06] font-medium text-forest" : "opacity-80")}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal className="mt-10 flex flex-col gap-4 md:hidden">
        {compare.rows.map((r) => (
          <div key={r.label} data-item className="rounded-3xl border border-forest/15 bg-white/60 p-5">
            <p className="font-display text-xl">{r.label}</p>
            <dl className="mt-3 divide-y divide-forest/10">
              {r.cells.map((cell, i) => (
                <div key={i} className={cn("flex gap-3 py-2.5", i === 0 && "-mx-2 rounded-xl bg-forest/[0.06] px-2 font-medium text-forest")}>
                  <dt className="w-24 shrink-0 text-[0.7rem] font-semibold uppercase leading-snug tracking-wider opacity-60">{short[i]}</dt>
                  <dd className="text-sm leading-snug">{cell}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </Reveal>

      <p className="mt-6 max-w-2xl text-sm opacity-70">{compare.note}</p>
      <ol className="mt-4 grid gap-1 text-xs opacity-60 sm:grid-cols-2" aria-label="Sources">
        {compare.sources.map((s, i) => (
          <li key={s.href}>
            {i + 1}.{" "}
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-forest/30 underline-offset-2 hover:decoration-forest">
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
