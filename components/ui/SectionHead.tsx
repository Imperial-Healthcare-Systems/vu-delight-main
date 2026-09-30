import type { ReactNode } from "react";
import { TextReveal } from "@/components/motion/TextReveal";
import { Hi } from "@/components/ui/Hi";
import { cn } from "@/lib/utils";

/**
 * Section opener: a heading that says what the section is, optional copy, optional action on the right.
 * No eyebrow label, no brand stamp. The emphasised word(s) get the highlighter swash, never italics.
 */
export function SectionHead({
  id,
  title,
  mark,
  markColor = "tangerine",
  copy,
  align = "left",
  className,
  action,
}: {
  id?: string;
  title: string;
  /** word(s) that get the highlighter */
  mark?: string;
  markColor?: "tangerine" | "pink" | "lime" | "cream" | "sku";
  copy?: string;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-6", align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between", className)}>
      <div className={cn("max-w-3xl", align === "center" && "flex flex-col items-center")}>
        <TextReveal as="h2" mode="lines" className="t-h2" id={id}>
          {title}
          {mark && (
            <>
              {" "}
              <Hi color={markColor}>{mark}</Hi>
            </>
          )}
        </TextReveal>
        {copy && (
          <TextReveal mode="words" className="t-lead mt-5 max-w-xl opacity-80">
            {copy}
          </TextReveal>
        )}
      </div>
      {action && <div className={cn("flex items-center gap-4", align === "center" && "justify-center")}>{action}</div>}
    </div>
  );
}
