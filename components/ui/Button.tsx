"use client";

import { cn } from "@/lib/utils";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { Magnetic } from "@/components/motion/Magnetic";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "cream" | "sku" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-pink text-white hover:bg-pink-ink",
  outline: "border-[1.5px] border-current hover:bg-forest hover:text-cream hover:border-forest",
  cream: "bg-cream text-forest hover:bg-white",
  sku: "bg-[var(--sku)] text-[var(--sku-ink)] hover:brightness-95",
  ghost: "underline underline-offset-4 decoration-1 hover:decoration-2 px-0",
};

interface Base {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  magnetic?: boolean;
}

const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-[0.95rem]", lg: "px-8 py-4 text-base" };

function inner(children: ReactNode) {
  return (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  magnetic = true,
  href,
  ...rest
}: Base & { href?: string } & Omit<ComponentProps<"button">, "children">) {
  const cls = cn(
    "pill inline-flex items-center justify-center font-semibold tracking-tight transition-[background-color,color,transform] duration-300 will-change-transform",
    styles[variant],
    variant !== "ghost" && sizes[size],
    className,
  );
  const el = href ? (
    <TransitionLink href={href} className={cls}>
      {inner(children)}
    </TransitionLink>
  ) : (
    <button className={cls} {...rest}>
      {inner(children)}
    </button>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export const Arrow = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
    <path d="M2 8h11M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
