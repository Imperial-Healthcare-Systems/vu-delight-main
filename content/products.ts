import type { Badge, Product } from "@/lib/types";

/** No source document states a price. Flip once the API supplies `price`. */
export const PRICING_ENABLED = false;

/** Printed on every pack (roundels) + client-supplied positioning. */
export const PACK_BADGES: Badge[] = [
  { label: "100% Natural", icon: "leaf" },
  { label: "No Added Sugar", icon: "no-sugar" },
  { label: "No Preservatives", icon: "no-preservative" },
];
export const BRAND_BADGES: Badge[] = [
  { label: "No Palm Oil", icon: "no-palm" },
  { label: "Completely Vegan", icon: "vegan" },
];

const fruit = (
  slug: string,
  name: string,
  accent: string,
  ink: Product["ink"],
  soft: string,
  hook: string,
  description: string,
  enjoy: string[],
  extra: Partial<Product> = {},
): Product => ({
  slug,
  name,
  descriptor: "Freeze Dried",
  category: "freeze-dried",
  accent,
  ink,
  soft,
  weight: "20g",
  hook,
  description,
  enjoy,
  ingredients: `Freeze dried ${name.toLowerCase()}. That is the whole list. The printed label carries the full declaration.`,
  badges: PACK_BADGES,
  image: `/products/${slug}.png`,
  ...extra,
});

/**
 * Accent colours are sampled from the supplied pack artwork (30 Sep 2026 cut-outs).
 * `ink` is the AA-safe text colour on that accent.
 * Add a SKU: add an object. Every rail, filter and route derives from this array.
 */
export const products: Product[] = [
  fruit(
    "mango", "Mango", "#F65A06", "#0B1A10", "#FFE3D0",
    "Alphonso-season sunshine, all year.",
    "Ripe mango, frozen and dried till each piece shatters. Sweet, tangy, and honest, because there is nothing in the bag but mango.",
    ["Straight from the pack on a 4pm slump", "Crushed over curd or oats", "Dropped into sparkling water for instant aam panna vibes"],
    { featured: true },
  ),
  fruit(
    "strawberry", "Strawberry", "#D2061E", "#FFFFFF", "#FFD9DE",
    "Loud, red, and gone in a minute.",
    "Whole strawberries that stay bright red because they were never cooked. Sharp, sweet, and ridiculously light.",
    ["Over cereal or pancakes", "Blitzed into a smoothie without watering it down", "As is, with a film"],
    { featured: true },
  ),
  fruit(
    "jamun", "Jamun", "#661272", "#FFFFFF", "#EAD6EE",
    "The purple tongue, preserved.",
    "Monsoon jamun with its sweet-sour punch locked in. Deep purple, a little tannic, entirely nostalgic.",
    ["With a pinch of black salt", "Steeped into iced tea", "Crumbled over vanilla ice cream"],
    { featured: true },
  ),
  fruit(
    "pink-guava", "Pink Guava", "#DE3642", "#FFFFFF", "#FBDCDF",
    "Pink inside. Crunchy outside.",
    "Blush-pink guava, freeze dried so the perfume stays. Floral, sweet, with that guava tartness at the end.",
    ["On its own, obviously", "With chilli and salt, the street-cart way", "Over a bowl of chia pudding"],
  ),
  fruit(
    "blueberry", "Blueberry", "#06428A", "#FFFFFF", "#D6E4F7",
    "Tiny. Tart. Terribly moreish.",
    "Whole blueberries turned into crisp little pops. Sweet-tart and inky blue, with no syrup anywhere near them.",
    ["Folded into pancake batter", "Over granola", "In a desk drawer, for emergencies"],
    { featured: true },
  ),
  fruit(
    "chiku", "Chiku", "#C64E06", "#FFFFFF", "#F7DECB",
    "Caramel from a tree.",
    "Sapota, freeze dried into malty, brown-sugar-tasting chips. Naturally sweet, so it needs nothing else.",
    ["With black coffee", "Crushed into a milkshake", "As a dessert that is not really a dessert"],
  ),
  fruit(
    "pineapple", "Pineapple", "#F6AE06", "#0B1A10", "#FFF0C7",
    "Golden, zingy, zero soggy.",
    "Pineapple rings gone crunchy. Tropical and bright, with the acidity that makes your mouth water.",
    ["With chaat masala", "Over coconut yoghurt", "In trail mix, to wake it up"],
  ),
  fruit(
    "mix-fruit", "Mix Fruit", "#EA1212", "#FFFFFF", "#FBD8D8",
    "Can't decide? Don't.",
    "A handful of the range in one pack. Different colours, different crunches, one bag.",
    ["Party bowls", "Kids' tiffins", "The 'one of everything' order"],
    { featured: true, isNew: true },
  ),
  {
    slug: "masala-okra",
    name: "Okra",
    descriptor: "Masala",
    category: "freeze-dried",
    tag: "Masala",
    accent: "#064E1E",
    ink: "#FFFFFF",
    soft: "#D8E8DB",
    weight: "20g",
    hook: "Bhindi, but it snaps.",
    description: "Okra freeze dried till it crisps, then dusted with masala. The chip you did not know bhindi could be.",
    enjoy: ["Instead of chips with a film", "Crumbled over dal-chawal", "With a cold drink at 6pm"],
    ingredients: "Freeze dried okra with our masala blend. The printed label carries the full declaration.",
    badges: PACK_BADGES,
    image: "/products/masala-okra.png",
    isNew: true,
  },
  {
    slug: "masala-zucchini",
    name: "Zucchini",
    descriptor: "Masala",
    category: "freeze-dried",
    tag: "Masala",
    accent: "#36721E",
    ink: "#FFFFFF",
    soft: "#DDEBD5",
    weight: "20g",
    hook: "Green, spiced, gone.",
    description: "Zucchini coins, freeze dried and masala-dusted. Light, savoury and strangely addictive.",
    enjoy: ["Straight from the pack", "As a salad crunch", "Next to a sandwich instead of fries"],
    ingredients: "Freeze dried zucchini with our masala blend. The printed label carries the full declaration.",
    badges: PACK_BADGES,
    image: "/products/masala-zucchini.png",
    isNew: true,
  },
  {
    slug: "jaggery-tea-ginger",
    name: "Ginger",
    descriptor: "Jaggery Tea With",
    category: "jaggery-tea",
    accent: "#D24E12",
    ink: "#FFFFFF",
    soft: "#F8DDCF",
    weight: "100g",
    hook: "Adrak chai, sweetened the old way.",
    description: "Tea, jaggery and ginger in one blend. Warming, a little fiery, with the round sweetness only gur gives.",
    enjoy: ["One spoon per cup, simmer with milk or water", "Rainy evenings", "The first cup of the day"],
    ingredients: "Tea, jaggery and ginger. The printed label carries the full declaration.",
    badges: PACK_BADGES,
    image: "/products/jaggery-tea-ginger.png",
    featured: true,
  },
  {
    slug: "jaggery-tea-cardamom",
    name: "Cardamom",
    descriptor: "Jaggery Tea With",
    category: "jaggery-tea",
    accent: "#365A06",
    ink: "#FFFFFF",
    soft: "#E1EAD1",
    weight: "100g",
    hook: "Elaichi chai, no refined sugar.",
    description: "Tea and jaggery with whole-cardamom aroma. Fragrant, soft and sweet without a grain of white sugar.",
    enjoy: ["After dinner", "With something buttery", "Iced, with a squeeze of lime"],
    ingredients: "Tea, jaggery and cardamom. The printed label carries the full declaration.",
    badges: PACK_BADGES,
    image: "/products/jaggery-tea-cardamom.png",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byCategory = (slug: string) => products.filter((p) => p.category === slug);
export const featured = products.filter((p) => p.featured);
export const displayName = (p: Product) =>
  p.descriptor === "Jaggery Tea With" ? `Jaggery Tea with ${p.name}` : `${p.descriptor} ${p.name}`;
