import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * Method comparison for the story page. Category columns describe what is typical of dehydrated / candied
 * fruit and vacuum-fried chips, taken from public labels and studies (sources listed under the table).
 * Nothing about VuDelight's own packs goes beyond what the packs print.
 */
export function Compare() {
  const { compare } = site;
  return (
    <section id="compare" className="container-x py-20 md:py-28" aria-labelledby="compare-title">
      <SectionHead id="compare-title" title={compare.title} mark={compare.mark} copy={compare.copy} />
      <Reveal className="mt-14 overflow-x-auto scrollbar-none">
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
                  <td
                    key={i}
                    className={cn(
                      "border-t border-forest/15 py-5 pr-4 align-top leading-snug",
                      i === 0 ? "bg-forest/[0.06] font-medium text-forest first:rounded-l-2xl group-first:rounded-t-none" : "opacity-80",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
