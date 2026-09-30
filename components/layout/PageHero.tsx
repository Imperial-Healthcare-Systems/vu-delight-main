import { TextReveal } from "@/components/motion/TextReveal";
import { Hi } from "@/components/ui/Hi";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/** Inner-page opener: chars-up title with a highlighted word, words-blur copy, brand stamp. No eyebrow. */
export function PageHero({ title, mark, copy, className, children }: { title: string; mark?: string; copy?: string; className?: string; children?: React.ReactNode }) {
  return (
    <header className={cn("container-x relative pb-12 pt-[calc(var(--header-h)+5rem)] md:pb-16 md:pt-[calc(var(--header-h)+7rem)]", className)}>
      <span className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+5rem)] hidden h-16 w-16 -rotate-12 place-items-center rounded-full border border-forest/15 md:grid" aria-hidden>
        <Logo variant="forest" className="h-7" />
      </span>
      <TextReveal as="h1" mode="chars" immediate className="t-h1 max-w-5xl font-display">
        {title}
        {mark && (
          <>
            {" "}
            <Hi>{mark}</Hi>
          </>
        )}
      </TextReveal>
      {copy && (
        <TextReveal mode="words" immediate delay={0.4} className="t-lead mt-6 max-w-2xl opacity-80">
          {copy}
        </TextReveal>
      )}
      {children}
    </header>
  );
}
