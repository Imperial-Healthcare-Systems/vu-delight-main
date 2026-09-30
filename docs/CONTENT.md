# VuDelight — Content

Voice: warm, quick, a little cheeky, never preachy. Short lines that say what the section is. No label above a
heading (no "eyebrow"), no italic-word emphasis; the one emphasis device is the hand-drawn highlighter swash.
Never state a number we do not have about our own packs (no nutrition figures, no percentages, no shelf life, no prices).

Source lines (verbatim, from the deck) are marked **[S]**. Client-supplied claims **[C]**: natural · no preservatives ·
no palm oil · completely vegan. On-pack roundels **[P]**: 100% Natural · No Added Sugar · No Preservatives.
Process and category facts **[R]** come from the research section at the end. All live copy sits in `content/site.ts`.

## Global

- Tagline **[S]**: Delight in Every Bite. Used sparingly: page titles, logo alt text, once in the footer bottom bar.
- Signature **[S]**: Nourishing People. Enriching Lives. (footer heading, story page)
- Claims marquee **[C][P][R]**: 100% NATURAL · NO ADDED SUGAR · NO PRESERVATIVES · NO PALM OIL · COMPLETELY VEGAN · FREEZE DRIED, NEVER CANDIED
- Announcement strip (rotates): "New: jaggery tea with ginger, and with cardamom" · "Masala okra and masala zucchini have joined the freeze dried shelf" · "Twelve packs. Ingredient lists you can read in one breath"
- Nav: Shop · Freeze Dried · Jaggery Tea · Our Story · Contact (island nav; search + club icons)
- Search: placeholder "Search mango, chai, crunch…" · empty "Nothing by that name yet. Try mango, jamun or chai."
- Phone tab bar: Home · Shop · Search · Bag · Stroke marquee heading on touch: "Tap a word, meet the pack."

## Home

**Hero** — DELIGHT / in every / BITE (line 3 outlined with a tangerine swash). No copy block by client request.
- CTAs: Shop the crunch → · How it is made · Cue: See the shelves (bottom-left)
- Stickers: NO PALM OIL · 100% VEGAN · NO PRESERVATIVES

**Shelves** — "Two shelves. *Twelve packs.*" (the count follows the data)
- Freeze dried fruit and masala veg on one shelf, jaggery tea on the other. More shelves are coming. The ingredient lists will stay short.
- Category 01 Freeze Dried: "Fruit and veg, frozen at their ripest. Then made to crunch." · chips: 10 packs · 20g · incl. Masala
- Category 02 Jaggery Tea: "Chai, the way your nani sweetened it." · chips: 2 packs · 100g

**Stroke marquee** — heading "Hover a word, meet the pack." · four rows: both shelf names + the twelve SKU names ("Ginger Chai", "Cardamom Chai")

**Manifesto** **[S]** — "We believe healthy food should never feel like a compromise." "We don't simply sell food. We create moments of delight." · stickers Premium · Natural · Wholesome

**Method** **[R]** — "Frozen solid. Then the ice *simply leaves.*"
- Freeze drying is the gentlest way we know to take the water out of fruit. This is the whole method, with nothing hidden in the footnotes.
1. Freeze it hard — Ripe fruit is taken down to around minus 40°C. Every drop of water inside turns to ice, and the cell walls hold their shape instead of collapsing.
2. Pull a vacuum — Chamber pressure drops far below the point where ice can melt. The ice turns straight into vapour and drifts out of the fruit. Skipping the liquid step is why colour, shape and flavour stay exactly where they were.
3. Seal the snap — A final gentle dry takes out the last traces of moisture. What remains is the fruit itself, light enough to snap, sealed before the air can reach it.
- Closer: Snap.

**Start with these.** — Six packs we would hand you first: two teas, and the fruit that converts the doubters.

**What's inside. What *isn't.*** **[C][P]** — Inside: Fruit · Veg + spices · Tea + jaggery. Not inside, ever: palm oil · preservatives · added sugar · anything from an animal.

(Order on the page: Bundles, then Reviews.)

**What people *say.*** — SAMPLE REVIEWS. Eight first-name + city quotes, each tied to a SKU, in `site.testimonials.reviews`.
They are placeholders for the frontend demo and the section prints "Sample reviews shown while the store connects.
Replace with verified customer reviews before launch." under the cards. Do not ship them as real.

**Boxes and duos, *coming soon.*** — A box of everything for the indecisive. Two of the same for the loyal. Watch this space. (Try the fruit box · Two teas, one kettle · Masala crunch duo — COMING SOON, no prices)

**Join the *Delight Club*** — First-crunch drops, restocks and the odd recipe. A short email, now and then, and never more than that. Sticker wall: No palm oil · Completely vegan · No added sugar · Freeze dried · Made in India · Snaps, never chews · Tiffin friendly · Zero mess · Nani-approved chai

## Products (per SKU copy lives in content/products.ts)

Name as h1; chips: descriptor · net weight · tag · New. Then hook, claims [P][C], quantity, add to bag, About + How to enjoy,
then accordions: Ingredients (plain-language line per SKU, e.g. "Freeze dried mango. That is the whole list. The printed label
carries the full declaration.") · Nutrition ("printed on every pack") · How to store · Shipping & delivery · Returns & exchange.
No ingredient percentages, no nutrition table, no allergens statement.

**DRAFT policy copy** (`site.pdp.policies`, to be confirmed by operations/legal before launch): ships across India, orders leave
within a couple of working days, tracking by email, charges at checkout; damaged/opened/wrong packs replaced if reported within
two days with a photo; opened or used food packs cannot be returned.

## Story page

- "Made to make healthy feel like a *treat.*" · signature **[S]**
- Belief block **[S]** + intro: Real fruit, picked ripe, frozen and dried so the crunch is the fruit and nothing else. Vegetables that snack like chips. Chai sweetened with jaggery. Nothing hiding in the small print.
- Method **[R]**: "Three moves. No *shortcuts.*" (the three beats above)
- **Comparison table** **[R]**: "Same fruit. Different *method.*" — columns Freeze dried (VuDelight) · Dehydrated or candied fruit · Vacuum-fried chips; rows: how the water leaves · added sugar · oil · preservatives · texture · colour and shape · heat-sensitive vitamins. Note under the table: category descriptions from public labels and studies; our own figures only from our labels. Sources listed and linked.
- Values: Natural · Wholesome · Premium · Kind to nature · Close: "Ready when you are."

## Contact

"Say *hi.*" — Wholesale, gifting, collabs or just a craving. Tell us which and we will write back like humans. Form: topic chips, name, email, message.

## Welcome modal

"First bite's on *us.*" — Join the Delight Club for early drops and the occasional treat in your inbox. · I'm in · Not now

## Footer

Giant stroke wordmark · Nourishing People. Enriching Lives. · Freeze dried fruit, masala veg and jaggery tea, made with care in India. ·
Shop / Brand (Our story, How we compare, Contact) / Help (placeholders) · claims marquee · © VuDelight · Delight in Every Bite · Made with care in India

## Research (30 Sep 2026)

What the process copy and the comparison table rest on. Nothing here is a claim about VuDelight's own packs beyond what the packs print.

- **How freeze drying works.** Three phases: freezing (shelf typically −30 to −40°C), primary drying where pressure drops below ~1–5 mbar and ice sublimes straight to vapour (below the triple point of water), secondary drying that removes bound moisture. Skipping the liquid phase preserves shape, colour and flavour.
  Healthline, "Freeze Drying: How It Works" · PMC10528307 (drying kinetics during lyophilization of fruits).
- **Freeze dried vs dehydrated.** Freeze dried is light and crisp and keeps heat-sensitive vitamins better; heat-dehydrated fruit is dense and chewy and loses some vitamin content; freeze dried keeps far less moisture and stores longer.
  EnWave, "Freeze-Drying vs. Dehydrating" · Chowhound, "Freeze-Dried vs Dehydrated Fruit".
- **What dried fruit labels often add.** Public labels for dried mango list cane sugar and sulphites: Sun-Maid (dried mango, cane sugar, citric acid, sodium metabisulfite); M&S soft eating mango on Open Food Facts; Fresh Life (mango, sugar, acidity regulator 330, preservative 223). E220 is sulphur dioxide; E221–E228 are other sulphites.
- **Vacuum-fried fruit chips.** Popular in South India (jackfruit, banana). Lower oil than deep frying but still absorbs oil; a jackfruit chip study measured about 20.7% oil content. PMC4745527.
- **Who else sells freeze dried fruit in India.** Everaw, FRUDO, NaturDry, The Moon Store all lead with no added sugar / no preservatives. VuDelight's difference on the page is method transparency, the masala veg line, the jaggery tea shelf, and the no-palm-oil / vegan stance stated plainly.
- **Jaggery tea premixes** (Chaayos Gur Chai, Girnar, JarSpices, SK Chai, Sweet Talks) position on "no refined sugar". Our copy stays with what the pack says: tea, jaggery, ginger or cardamom, no added sugar, no preservatives.

Why "never fried" was dropped: dried fruit is not fried, so it was a strawman. The accurate foils are candied/dehydrated fruit (heat, sugar, sulphites) and vacuum-fried chips (oil). The marquee now says "Freeze Dried, Never Candied".
