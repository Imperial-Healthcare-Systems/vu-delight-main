import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Supplied logo artwork, never redrawn.
 * variant "colour" = the colour lockup; "forest"/"cream"/"black" = tinted exports of the mono PDF.
 */
export function Logo({
  variant = "colour",
  className,
  priority,
}: {
  variant?: "colour" | "forest" | "cream" | "black";
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "colour" ? "/brand/logo.png" : `/brand/logo-${variant}.png`;
  const ratio = variant === "colour" ? 1317 / 900 : 1203 / 900;
  return (
    <Image
      src={src}
      alt="Vu Delight, Delight in Every Bite"
      width={Math.round(240 * ratio)}
      height={240}
      priority={priority}
      className={cn("w-auto object-contain", className ?? "h-10")}
    />
  );
}
