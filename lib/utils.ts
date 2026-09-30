import { clsx, type ClassValue } from "clsx";

export const cn = (...i: ClassValue[]) => clsx(i);

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** CSS vars that let any subtree take on a SKU's colour. */
export const skuVars = (accent: string, ink: string, soft: string) =>
  ({ "--sku": accent, "--sku-ink": ink, "--sku-soft": soft }) as React.CSSProperties;

export const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
};

/** rgba() string from a hex, for shadows and glows */
export const alpha = (hex: string, a: number) => `rgba(${hexToRgb(hex).join(",")},${a})`;
