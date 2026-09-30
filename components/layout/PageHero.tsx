import { TextReveal } from "@/components/motion/TextReveal";
import { Hi } from "@/components/ui/Hi";
import { cn } from "@/lib/utils";

/** Inner-page opener: chars-up title with a highlighted word, words-blur copy. No eyebrow, no stamp. */
export function PageHero({ title, mark, copy, className, children }: { title: string; mark?: string; copy?: string; className?: string; children?: React.ReactNode }) {
  return (
    <header className={cn("container-x relative pb-8 pt-[calc(var(--header-h)+3rem)] md:pb-16 md:pt-[calc(var(--header-h)+7rem)]", className)}>
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
