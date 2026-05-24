# Wedding Site Templates Collection

A premium, plug-and-play templates module containing **50 highly diverse, uniquely themed wedding template definitions** designed to be consumed by the main wedding site builder (`wedding-site-Bolt`).

## Integration Instructions

To use these templates in your main wedding website builder repository:

1. **Copy the Registry File**: Copy [registry.ts](file:///Users/ericgagnon/Documents/antigravity/hopeful-tesla/jeanericgagnon-templates/registry.ts) directly into your main repository's templates folder:
   ```bash
   cp registry.ts /path/to/wedding-site-Bolt/src/templates/registry.ts
   ```

2. **Verify Imports**: The relative imports inside `registry.ts` are pre-configured to match the `src/templates/` folder structure:
   - `import { SectionInstance, SectionType } from '../types/layoutConfig';`
   - `import { resolveCanonicalRegistrySectionInput } from '../sections/registry';`

3. **Run Typecheck & Tests**: Verify the integration compiles cleanly:
   ```bash
   npm run typecheck
   npm run test
   ```

---

## Complete Template Catalog (50 Templates)

Each template has custom visual layouts, defined section flows, and default theme presets matching their stylistic identities:

| # | Template ID | Name | Theme Preset | Description |
|---|-------------|------|--------------|-------------|
| 1 | `rustic-barn-romance` | Rustic Barn Romance | `garden` | Warm wood elements, natural tones, sage greens, and handwritten typography. |
| 2 | `vintage-boho-retro` | Vintage Boho Retro | `sunset` | Warm sunset shades, retro elements, wildflower accents, and playful fonts. |
| 3 | `midcentury-palm-springs` | Mid-Century Palm Springs | `ocean` | Breezy desert modernism, architectural styling, ocean teal highlights. |
| 4 | `art-deco-glamour` | Art Deco Glamour | `elegant` | Black-and-gold opulent luxury, striking visual contrasts, geometric layouts. |
| 5 | `gothic-romance-dark` | Gothic Romance & Dark Academe | `editorial` | Moody crimson roses, dark charcoal parchment, bronze accents, literary drama. |
| 6 | `tropical-beach-paradise` | Tropical Beach Paradise | `ocean` | Breezy palm textures, ocean teal waters, warm sand highlights. |
| 7 | `mountain-adventure-alpine` | Mountain Adventure & Alpine | `linen` | Earthy slate, warm linen, forest green details, crisp clean peak layouts. |
| 8 | `winery-estate-vineyard` | Winery Estate Vineyard | `romantic` | Dusty wine tones, warm ivory parchment, vintage elegance, botanical borders. |
| 9 | `industrial-loft-concrete` | Industrial Loft Concrete | `editorial` | Warm copper accents, concrete charcoal, structural steel grid layout. |
| 10 | `fairytale-castle-royal` | Fairytale Castle Royal | `romantic` | Elegant blush, gilded gold flourishes, soft typography, romantic storytelling. |
| 11 | `minimalist-ecogreen-greenhouse` | Minimalist Eco Greenhouse | `garden` | Abundant foliage greens, fresh white linen, clean grids, organic design. |
| 12 | `city-chic-rooftop` | City Chic Rooftop | `elegant` | Sleek dark mode, skyline geometry, luxury gold highlights, urban flow. |
| 13 | `mediterranean-estate-tuscan` | Mediterranean Estate Tuscan | `sunset` | Warm olive branch hues, terracotta tiles, sandy linen paths, coastal air. |
| 14 | `nautical-club-sailor` | Nautical Club Sailor | `classic` | Navy blue stripes, yacht whites, polished brass, classic formal borders. |
| 15 | `celestial-stars-galaxy` | Celestial Stars Midnight | `elegant` | Deep starlight indigo, midnight velvet, sparkling dust, cosmic romance. |
| 16 | `whimsical-garden-secret` | Whimsical Garden Secret | `garden` | Wild ivy arches, watercolor florals, champagne hues, handwritten fonts. |
| 17 | `desert-oasis-saguaro` | Desert Oasis Saguaro | `sunset` | Warm sandy dunes, copper sunsets, tall cacti, minimalist layout. |
| 18 | `winter-wonderland-frozen` | Winter Wonderland Frozen | `ocean` | Icy whites, cool crystalline blues, silver borders, clean geometric grids. |
| 19 | `retro-arcade-neon` | Retro Arcade Neon | `elegant` | Neon pink accents, vintage pixel borders, arcade fonts, high-energy layout. |
| 20 | `bohemian-meadow-prairie` | Bohemian Meadow Prairie | `sunset` | Dried wildflower arrangements, warm pampas grass, warm prairie sun. |
| 21 | `castle-ruins-celtic` | Castle Ruins Celtic | `garden` | Deep stone gray, moss green, ancient Celtic borders, foggy cliffs. |
| 22 | `grand-ballroom-opulence` | Grand Ballroom Opulence | `classic` | Formal black-tie, ballroom gold, deep navy, sophisticated grids. |
| 23 | `moroccan-riad-marrakech` | Moroccan Riad Marrakech | `sunset` | Spice orange, riad tiles, desert mauves, high-contrast borders. |
| 24 | `enchanted-forest-mossy` | Enchanted Forest Mossy | `garden` | Moss forest tones, warm wood bark, fairytale fonts, organic spacing. |
| 25 | `lakeside-cabin-campfire` | Lakeside Cabin Campfire | `linen` | Crisp lake blue, pine green, vintage camp aesthetics, structured grid. |
| 26 | `minimalist-museum-whitebox` | Minimalist Museum Modern | `editorial` | Ultra-clean white space, crisp typography, charcoal tones, minimal. |
| 27 | `autumn-harvest-amber` | Autumn Harvest Amber | `sunset` | Pumpkin orange, amber maple, autumn brown, rustic country borders. |
| 28 | `vegas-chapel-elvis` | Vegas Chapel Elvis | `elegant` | Hot velvet pink, neon retro, casino-inspired typography, animated. |
| 29 | `seaside-cliffs-wildcoast` | Seaside Cliffs Wild Coast | `ocean` | Windblown coast blues, oceanic teal, cliff granite, dramatic flow. |
| 30 | `greenhouse-botanic-palm` | Greenhouse Botanic Palm | `garden` | Conservatory greens, glass architecture, fresh linen, botanical style. |
| 31 | `vintage-library-antique` | Vintage Library Antique | `editorial` | Rich mahogany, aged parchment, classic calligraphy, literary layout. |
| 32 | `southern-belle-savannah` | Southern Belle Savannah | `classic` | Moss gray, ivory lace, champagne gold, southern elegance. |
| 33 | `scandinavian-hygge-cozy` | Scandinavian Hygge Cozy | `linen` | Cozy charcoal gray, light wood details, white space, warm minimalist. |
| 34 | `yacht-deck-horizon` | Yacht Deck Horizon | `classic` | Sailor navy blue, polished brass, sea breeze, formal luxury club. |
| 35 | `sakura-blossom-zen` | Sakura Blossom Zen | `romantic` | Soft blossom pink, zen whites, geometric dividers, peaceful layout. |
| 36 | `chateau-french-lavender` | Chateau French Lavender | `romantic` | Lavender mauve, French stone ivory, gold flourishes, provincial air. |
| 37 | `hightech-cyber-neoneon` | High-Tech Cyber Neo | `elegant` | Sleek dark mode, cyberpunk electric blue, futuristic panels, high-energy. |
| 38 | `folk-art-slavic` | Folk Art Slavic | `romantic` | Traditional folk crimson, linen, geometric dividers, heritage borders. |
| 39 | `island-hammock-tiki` | Island Hammock Tiki | `ocean` | Sandy dunes, tropical palm greens, copper sunsets, coastal air. |
| 40 | `redwood-cathedral-sequoia` | Redwood Cathedral Sequoia | `garden` | Forest greens, bark charcoal, ancient wood layout, dramatic tall scale. |
| 41 | `newyork-jazz-lounge` | New York Jazz Lounge | `elegant` | Midnight black, bronze accents, smoky fonts, urban layout. |
| 42 | `english-tea-garden` | English Tea Garden | `romantic` | Watercolor cottage roses, sage paths, champagne borders, romantic fonts. |
| 43 | `greek-cyclades-whitedome` | Greek Cyclades White Dome | `ocean` | Deep Aegean teal, white dome, sand, cliff destination layouts. |
| 44 | `spanish-hacienda-terracotta` | Spanish Hacienda Terracotta | `sunset` | Terracotta orange, olive green borders, sand, Mediterranean estate. |
| 45 | `nordic-fiord-glacier` | Nordic Fiord Glacier | `ocean` | Glacier blues, fiord slate, cozy scandi linen, clean modern grids. |
| 46 | `ski-chalet-powder` | Ski Chalet Powder Snow | `linen` | Powder white, cedar wood bark, fresh linen, cozy mountain chalet. |
| 47 | `tango-club-crimson` | Tango Club Crimson | `romantic` | Passionate tango crimson, charcoal shadows, bronze, dramatic story. |
| 48 | `steampunk-airship-brass` | Steampunk Airship Brass | `sunset` | Airship brass, deep brown, clockwork layouts, literary retro drama. |
| 49 | `disco-fever-studio54` | Disco Fever Studio 54 | `elegant` | Glistening disco ball, near-black dance floors, sparkling gold, retro. |
| 50 | `glamping-luxury-stargazer` | Glamping Luxury Stargazer | `garden` | Glamping canvas, pine needle greens, campfire accents, stargazer map. |
