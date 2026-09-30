/**
 * All site copy. Verbatim source lines are marked [S] in docs/CONTENT.md; process facts come from the
 * sources listed under `compare.sources` (see docs/CONTENT.md → Research).
 */
export const site = {
  name: "VuDelight",
  tagline: "Delight in Every Bite",
  signature: "Nourishing People. Enriching Lives.",
  url: "https://vudelight.in",
  description:
    "Freeze dried fruit, masala veg crunch and jaggery tea. 100% natural, no palm oil, no preservatives, no added sugar, completely vegan.",
  announcements: [
    "New: jaggery tea with ginger, and with cardamom",
    "Masala okra and masala zucchini have joined the freeze dried shelf",
    "Twelve packs. Ingredient lists you can read in one breath",
  ],
  claims: ["100% Natural", "No Added Sugar", "No Preservatives", "No Palm Oil", "Completely Vegan", "Freeze Dried, Never Candied"],
  search: { placeholder: "Search mango, chai, crunch…", empty: "Nothing by that name yet. Try mango, jamun or chai." },
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Freeze Dried", href: "/collections/freeze-dried" },
    { label: "Jaggery Tea", href: "/collections/jaggery-tea" },
    { label: "Our Story", href: "/story" },
    { label: "Contact", href: "/contact" },
  ],
  hero: {
    lines: ["Delight", "in every", "Bite"],
    primary: { label: "Shop the crunch", href: "/shop" },
    secondary: { label: "How it is made", href: "/story#method" },
    stickers: ["No palm oil", "100% vegan", "No preservatives"],
    cue: "See the shelves",
  },
  shelves: {
    title: "Two shelves.",
    mark: "Twelve packs.",
    copy: "Freeze dried fruit and masala veg on one shelf, jaggery tea on the other. More shelves are coming. The ingredient lists will stay short.",
  },
  strokeHeading: "Hover a word, meet the pack.",
  manifesto: {
    lines: ["We believe healthy food should never feel like a compromise.", "We don't simply sell food. We create moments of delight."],
    stickers: ["Premium", "Natural", "Wholesome"],
  },
  freeze: {
    title: "Frozen solid. Then the ice",
    mark: "simply leaves.",
    copy: "Freeze drying is the gentlest way we know to take the water out of fruit. This is the whole method, with nothing hidden in the footnotes.",
    beats: [
      {
        n: "01",
        title: "Freeze it hard",
        copy: "Ripe fruit is taken down to around minus 40°C. Every drop of water inside turns to ice, and the cell walls hold their shape instead of collapsing.",
      },
      {
        n: "02",
        title: "Pull a vacuum",
        copy: "Chamber pressure drops far below the point where ice can melt. The ice turns straight into vapour and drifts out of the fruit. Skipping the liquid step is why colour, shape and flavour stay exactly where they were.",
      },
      {
        n: "03",
        title: "Seal the snap",
        copy: "A final gentle dry takes out the last traces of moisture. What remains is the fruit itself, light enough to snap, sealed before the air can reach it.",
      },
    ],
    close: "Snap.",
  },
  inside: {
    title: "What's inside. What",
    mark: "isn't.",
    copy: "The ingredient list fits in one breath. The list of what we leave out is longer, and honestly we are prouder of that one.",
    yes: ["Fruit", "Veg + spices", "Tea + jaggery"],
    no: ["Palm oil", "Preservatives", "Added sugar", "Anything from an animal"],
  },
  rail: {
    title: "Start with",
    mark: "these.",
    copy: "Six packs we would hand you first: two teas, and the fruit that converts the doubters.",
  },
  offers: {
    title: "Boxes and duos,",
    mark: "coming soon.",
    copy: "A box of everything for the indecisive. Two of the same for the loyal. Watch this space.",
    items: [
      { title: "Try the fruit box", copy: "Eight fruits in one drop.", tag: "Coming soon", skus: ["mango", "strawberry", "blueberry"] },
      { title: "Two teas, one kettle", copy: "Ginger and cardamom, side by side.", tag: "Coming soon", skus: ["jaggery-tea-ginger", "jaggery-tea-cardamom"] },
      { title: "Masala crunch duo", copy: "Okra meets zucchini.", tag: "Coming soon", skus: ["masala-okra", "masala-zucchini"] },
    ],
  },
  club: {
    title: "Join the",
    mark: "Delight Club",
    copy: "First-crunch drops, restocks and the odd recipe. A short email, now and then, and never more than that.",
    cta: "Count me in",
    stickers: ["No palm oil", "Completely vegan", "No added sugar", "Freeze dried", "Made in India", "Snaps, never chews", "Tiffin friendly", "Zero mess", "Nani-approved chai"],
  },
  testimonials: {
    title: "What people",
    mark: "say.",
    copy: "Straight from the tasting table. Sample reviews stand in here until the store connects and the real ones start arriving.",
    note: "Sample reviews shown while the store connects. Replace with verified customer reviews before launch.",
    reviews: [
      { quote: "Opened the mango at 4pm. Finished it by 4:06. Zero regrets.", name: "Aanya", city: "Bengaluru", sku: "mango", stars: 5 },
      { quote: "The jamun tastes exactly like the tree behind my nani's house.", name: "Rhea", city: "Pune", sku: "jamun", stars: 5 },
      { quote: "Masala okra in my tiffin. My colleagues now raid it.", name: "Priya", city: "Delhi", sku: "masala-okra", stars: 5 },
      { quote: "Gur chai with ginger and no sugar guilt. Mornings sorted.", name: "Meera", city: "Jaipur", sku: "jaggery-tea-ginger", stars: 5 },
      { quote: "Blueberries that crunch. My kids think it is candy. It isn't.", name: "Sana", city: "Mumbai", sku: "blueberry", stars: 4 },
      { quote: "Strawberry over curd. Breakfast has never looked this pink.", name: "Ishita", city: "Hyderabad", sku: "strawberry", stars: 5 },
      { quote: "Pineapple with chaat masala is my new personality.", name: "Tara", city: "Kochi", sku: "pineapple", stars: 5 },
      { quote: "Finally a snack where I can pronounce every ingredient.", name: "Nidhi", city: "Ahmedabad", sku: "mix-fruit", stars: 5 },
    ],
  },
  pdp: {
    nutrition: "Nutrition facts, the ingredient declaration and best-before are printed on every pack. We publish the same figures here once the store connects, straight from the label.",
    policies: [
      {
        title: "How to store",
        body: "Keep the pack sealed and away from moisture. Once opened, fold it shut and finish it soon; freeze dried fruit drinks in humidity fast. Best-before is printed on the pack.",
      },
      {
        title: "Shipping & delivery",
        body: "We ship across India. Orders leave us within a couple of working days and tracking lands in your inbox the moment they do. Charges show at checkout.",
      },
      {
        title: "Returns & exchange",
        body: "If a pack arrives damaged, opened or wrong, write to us within two days with a photo and we replace it, no questions asked. Because these are foods, opened or used packs cannot be returned.",
      },
    ],
  },
  modal: {
    title: "First bite's on",
    mark: "us.",
    copy: "Join the Delight Club for early drops and the occasional treat in your inbox.",
    cta: "I'm in",
    dismiss: "Not now",
  },
  story: {
    title: "Made to make healthy feel like a",
    mark: "treat.",
    intro:
      "Real fruit, picked ripe, frozen and dried so the crunch is the fruit and nothing else. Vegetables that snack like chips. Chai sweetened with jaggery. Nothing hiding in the small print.",
    values: [
      { t: "Natural", c: "Fruit, veg, tea, jaggery, spice. Nothing that needs a chemistry degree to pronounce." },
      { t: "Wholesome", c: "Freeze drying keeps the fruit's colour, shape and flavour. We only take the water out." },
      { t: "Premium", c: "Small batches, real fruit, packaging that looks good on a desk. Treat energy, snack habit." },
      { t: "Kind to nature", c: "Plant-based by default, palm-oil free by principle. Good for you. Good for nature." },
    ],
    process: { title: "Three moves. No", mark: "shortcuts." },
  },
  compare: {
    title: "Same fruit. Different",
    mark: "method.",
    copy: "Most dried fruit on Indian shelves gets there by heat, sugar or oil. Freeze drying gets there by cold and vacuum. Here is what that changes.",
    columns: ["Freeze dried (VuDelight)", "Dehydrated or candied fruit", "Vacuum-fried chips"],
    rows: [
      { label: "How the water leaves", cells: ["Frozen solid, then the ice sublimes under vacuum", "Warm air over many hours", "Fried in oil under vacuum"] },
      { label: "Added sugar", cells: ["None. Printed on every pack", "Common. Cane sugar or syrup infusion is on many labels", "Varies by brand"] },
      { label: "Oil", cells: ["None", "None", "Absorbed while frying. A jackfruit chip study measured about 20%"] },
      { label: "Preservatives", cells: ["None. Printed on every pack", "Sulphur dioxide and sulphites (E220 to E228) are common on labels", "Varies by brand"] },
      { label: "Texture", cells: ["Light, crisp, melts on the tongue", "Dense and chewy", "Crisp and oily"] },
      { label: "Colour and shape", cells: ["Kept, because the water never turns liquid", "Darkens and shrinks", "Browns at the edges"] },
      { label: "Heat-sensitive vitamins", cells: ["Largely kept at low temperature", "Partly lost to heat", "Partly lost to heat"] },
    ],
    note: "Category descriptions come from public labels and the studies linked below. Figures about our own packs come only from our own labels.",
    sources: [
      { label: "Healthline: freeze drying, how it works", href: "https://www.healthline.com/nutrition/freeze-drying" },
      { label: "PMC: drying kinetics during lyophilization of fruits", href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10528307/" },
      { label: "EnWave: freeze drying vs dehydrating", href: "https://www.enwave.net/freeze-drying-vs-dehydrating-whats-the-difference/" },
      { label: "Sun-Maid dried mango ingredients", href: "https://www.sunmaid.com/products/dried-mango/" },
      { label: "Open Food Facts: M&S soft eating mango", href: "https://world.openfoodfacts.org/product/00431644/soft-eating-mango-m-s" },
      { label: "PMC: vacuum frying of jackfruit bulb slices", href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4745527/" },
    ],
  },
  footer: {
    line: "Freeze dried fruit, masala veg and jaggery tea, made with care in India.",
    help: ["Shipping & returns", "FAQ", "Wholesale", "Privacy"],
    madeIn: "Made with care in India",
  },
};
