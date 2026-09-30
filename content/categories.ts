import type { Category } from "@/lib/types";

/**
 * The client's two shelves today (RFQ: Category 1 fruit + masala veg, Category 2 jaggery tea).
 * Order here is display order everywhere. Add a category: add an object; the home showcase,
 * nav, filters, footer, mobile menu, sitemap and /collections route follow.
 */
export const categories: Category[] = [
  {
    slug: "freeze-dried",
    name: "Freeze Dried",
    short: "Freeze Dried",
    eyebrow: "Category 01",
    headline: "Fruit and veg, frozen at their ripest. Then made to crunch.",
    copy: "Eight fruits and two masala vegetables, one method. Picked ripe, frozen, dried under vacuum till the water leaves and the flavour stays. Nothing added.",
    accent: "#F65A06",
    ink: "#0B1A10",
  },
  {
    slug: "jaggery-tea",
    name: "Jaggery Tea",
    short: "Jaggery Tea",
    eyebrow: "Category 02",
    headline: "Chai, the way your nani sweetened it.",
    copy: "Tea with jaggery instead of refined sugar, with ginger or cardamom already in the blend. One spoon, one kettle.",
    accent: "#365A06",
    ink: "#FFFFFF",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
