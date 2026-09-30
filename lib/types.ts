export type BadgeIcon = "leaf" | "no-sugar" | "no-preservative" | "vegan" | "no-palm";

export interface Badge {
  label: string;
  icon: BadgeIcon;
}

export type Descriptor = "Freeze Dried" | "Masala" | "Jaggery Tea With";

export interface Product {
  slug: string;
  name: string; // "Mango"
  descriptor: Descriptor; // printed above the name on pack
  category: string; // Category.slug
  /** optional line inside a category, shown as a sticker and filter, e.g. "Masala" */
  tag?: string;
  /** sampled from the pack artwork */
  accent: string;
  /** AA-safe text colour on `accent` */
  ink: "#FFFFFF" | "#0B1A10";
  /** pale tint of accent for soft backgrounds */
  soft: string;
  weight: string; // "20g"
  hook: string;
  description: string;
  enjoy: string[];
  /** plain-language ingredient line; the printed label carries the formal declaration */
  ingredients: string;
  badges: Badge[];
  image: string; // /products/<slug>.png
  /** filled by backend later */
  price?: number;
  compareAt?: number;
  featured?: boolean;
  isNew?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  headline: string;
  copy: string;
  accent: string;
  ink: "#FFFFFF" | "#0B1A10";
}

export interface CartLine {
  slug: string;
  qty: number;
}
