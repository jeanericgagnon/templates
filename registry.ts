import { SectionInstance, SectionType } from '../types/layoutConfig';
import { resolveCanonicalRegistrySectionInput } from '../sections/registry';

type TemplateSection = Omit<SectionInstance, 'id' | 'type'> & {
  // Keep compatibility with imported template artifacts while preserving known section keys.
  type: SectionType | string;
};

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  defaultThemePreset: string;
  defaultLayout: {
    sections: TemplateSection[];
  };
}

function normalizeRegistryTemplateVariant(variant: string): string {
  return resolveCanonicalRegistrySectionInput('registry', variant).variant;
}

function normalizeTemplateIdKey(templateId: unknown): string {
  return typeof templateId === 'string'
    ? templateId.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
    : '';
}

function cloneTemplateValue<T>(value: T): T {
  if (Array.isArray(value)) return value.map((entry) => cloneTemplateValue(entry)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [key, cloneTemplateValue(entry)]),
    ) as T;
  }
  return value;
}

function deepFreezeTemplateValue<T>(value: T): T {
  if (Array.isArray(value)) {
    value.forEach((entry) => deepFreezeTemplateValue(entry));
    return Object.freeze(value) as T;
  }
  if (value && typeof value === 'object') {
    Object.values(value as Record<string, unknown>).forEach((entry) => deepFreezeTemplateValue(entry));
    return Object.freeze(value);
  }
  return value;
}

const templateRegistry: TemplateDefinition[] = [
  // 1. RUSTIC BARN & COUNTRY ROMANCE
  {
    id: 'rustic-barn-romance',
    name: 'Rustic Barn Romance',
    description: 'Warm wood elements, natural tones, sage greens, and handwritten typography for countryside weddings',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'stacked', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 2. VINTAGE BOHO & RETRO GROOVY
  {
    id: 'vintage-boho-retro',
    name: 'Vintage Boho Retro',
    description: 'Warm sunset shades, retro elements, wildflower accents, and playful fonts for boho couples',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'dress-code', variant: 'creative', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'polaroid', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'playful', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 3. MID-CENTURY MODERN & PALM SPRINGS
  {
    id: 'midcentury-palm-springs',
    name: 'Mid-Century Palm Springs',
    description: 'Breezy desert modernism, architectural styling, ocean teal highlights, and clean shapes',
    defaultThemePreset: 'ocean',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'fullscreen', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'flip', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'cinematic', enabled: true, bindings: {}, settings: {} },
        { type: 'travel', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'extended', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 4. ART DECO GLAMOUR & GATSBY NIGHT
  {
    id: 'art-deco-glamour',
    name: 'Art Deco Glamour',
    description: 'Black-and-gold opulent luxury, striking visual contrasts, geometric layouts, and refined elegance',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'wedding-party', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 5. GOTHIC ROMANCE & DARK ACADEME
  {
    id: 'gothic-romance-dark',
    name: 'Gothic Romance & Dark Academe',
    description: 'Moody crimson roses, dark charcoal parchment, bronze accents, and historic literary drama',
    defaultThemePreset: 'editorial',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'detailed', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'minimal', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'fullwidth', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 6. TROPICAL BEACH PARADISE & HAWAIIAN BREEZE
  {
    id: 'tropical-beach-paradise',
    name: 'Tropical Beach Paradise',
    description: 'Breezy palm textures, ocean teal waters, warm sand highlights, and exotic destination flows',
    defaultThemePreset: 'ocean',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'travel', variant: 'map', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'itinerary', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 7. MOUNTAIN ADVENTURE & ALPINE LODGE
  {
    id: 'mountain-adventure-alpine',
    name: 'Mountain Adventure & Alpine',
    description: 'Earthy slate, warm linen, forest green details, and crisp clean layouts suited for mountain peaks',
    defaultThemePreset: 'linen',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'centered', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'modern', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 8. WINERY ESTATE & VINEYARD CHIC
  {
    id: 'winery-estate-vineyard',
    name: 'Winery Estate Vineyard',
    description: 'Dusty wine tones, warm ivory parchment, vintage elegance, and classic botanical borders',
    defaultThemePreset: 'romantic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 9. INDUSTRIAL LOFT & CONCRETE MINIMALIST
  {
    id: 'industrial-loft-concrete',
    name: 'Industrial Loft Concrete',
    description: 'Warm copper accents, concrete charcoal, structural steel grid layout, and raw modern beauty',
    defaultThemePreset: 'editorial',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'bold', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 10. FAIRYTALE CASTLE & ROYAL WHIMSY
  {
    id: 'fairytale-castle-royal',
    name: 'Fairytale Castle Royal',
    description: 'Elegant blush, gilded gold flourishes, soft typography, and ethereal romantic storytelling',
    defaultThemePreset: 'romantic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'stacked', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'elegant', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 11. MINIMALIST ECO-GREEN & GREENHOUSE ORGANIC
  {
    id: 'minimalist-ecogreen-greenhouse',
    name: 'Minimalist Eco Greenhouse',
    description: 'Abundant foliage greens, fresh white linen, clean grids, and organic eco-friendly design',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 12. CITY CHIC ROOFTOP & MANHATTAN SKYLINE
  {
    id: 'city-chic-rooftop',
    name: 'City Chic Rooftop',
    description: 'Sleek dark mode, skyline geometry, luxury gold highlights, and contemporary urban flow',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'magazine', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'detailed', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'magazine', enabled: true, bindings: {}, settings: {} },
        { type: 'wedding-party', variant: 'magazine', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'magazine', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'program', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 13. MEDITERRANEAN ESTATE & TUSCAN SUN
  {
    id: 'mediterranean-estate-tuscan',
    name: 'Mediterranean Estate Tuscan',
    description: 'Warm olive branch hues, terracotta tiles, sandy linen paths, and breezy coastal air',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'coastal', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'travel', variant: 'map', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 14. NAUTICAL CLUB & SAILOR CHIC
  {
    id: 'nautical-club-sailor',
    name: 'Nautical Club Sailor',
    description: 'Navy blue stripes, yacht whites, polished brass elements, and classic formal borders',
    defaultThemePreset: 'classic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'travel', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 15. CELESTIAL STARS & MIDNIGHT GALAXY
  {
    id: 'celestial-stars-galaxy',
    name: 'Celestial Stars Midnight',
    description: 'Deep starlight indigo, midnight velvet backgrounds, sparkling dust accents, and cosmic romance',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 16. WHIMSICAL GARDEN & SECRET PATH
  {
    id: 'whimsical-garden-secret',
    name: 'Whimsical Garden Secret',
    description: 'Wild ivy arches, watercolor florals, champagne hues, and dreamy handwritten fonts',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 17. DESERT OASIS & SAGUARO SUNSET
  {
    id: 'desert-oasis-saguaro',
    name: 'Desert Oasis Saguaro',
    description: 'Warm sandy dunes, copper sunsets, tall cacti silhouettes, and elegant minimalist layout',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'coastal', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 18. WINTER WONDERLAND & FROZEN ELEGANCE
  {
    id: 'winter-wonderland-frozen',
    name: 'Winter Wonderland Frozen',
    description: 'Icy whites, cool crystalline blues, silver borders, and elegant clean geometric grids',
    defaultThemePreset: 'ocean',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'fullscreen', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'flip', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'cinematic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'extended', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 19. RETRO ARCADE & NEON LOVE
  {
    id: 'retro-arcade-neon',
    name: 'Retro Arcade Neon',
    description: 'Neon pink accents, vintage pixel borders, arcade fonts, and high-energy modern layout',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'polaroid', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'playful', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 20. BOHEMIAN MEADOW & PRAIRIE WILDFLOWER
  {
    id: 'bohemian-meadow-prairie',
    name: 'Bohemian Meadow Prairie',
    description: 'Dried wildflower arrangements, warm pampas grass grass, cozy linen grids, and warm prairie sun',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'stacked', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 21. CASTLE RUINS & CELTIC MIST
  {
    id: 'castle-ruins-celtic',
    name: 'Castle Ruins Celtic',
    description: 'Deep stone gray, moss green, ancient Celtic borders, and dramatic foggy cliff landscape flow',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'minimal', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'fullwidth', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 22. GRAND BALLROOM & BLACK TIE OPULENCE
  {
    id: 'grand-ballroom-opulence',
    name: 'Grand Ballroom Opulence',
    description: 'Formal black-tie layouts, gilded ballroom gold, deep navy accents, and sophisticated high-end grids',
    defaultThemePreset: 'classic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'wedding-party', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 23. MOROCCAN RIAD & MARRAKECH NIGHTS
  {
    id: 'moroccan-riad-marrakech',
    name: 'Moroccan Riad Marrakech',
    description: 'Vibrant spice orange, geometric riad tiles, warm desert mauves, and high-contrast dramatic borders',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'coastal', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 24. ENCHANTED FOREST & MOSSY CANOPY
  {
    id: 'enchanted-forest-mossy',
    name: 'Enchanted Forest Mossy',
    description: 'Lush moss forest tones, warm wood bark accents, romantic fairytale fonts, and organic spacing',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 25. LAKESIDE CABIN & CAMPFIRE GLOW
  {
    id: 'lakeside-cabin-campfire',
    name: 'Lakeside Cabin Campfire',
    description: 'Crisp lake blue, warm pine green, vintage camp aesthetics, and clean structured grid layouts',
    defaultThemePreset: 'linen',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'centered', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'modern', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 26. MINIMALIST MUSEUM & WHITE BOX MODERN
  {
    id: 'minimalist-museum-whitebox',
    name: 'Minimalist Museum Modern',
    description: 'Ultra-clean white space, architectural crisp typography, raw charcoal tones, and high minimalist style',
    defaultThemePreset: 'editorial',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'bold', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 27. AUTUMN HARVEST & AMBER GLOW
  {
    id: 'autumn-harvest-amber',
    name: 'Autumn Harvest Amber',
    description: 'Cozy pumpkin orange, amber maple leaves, crisp autumn brown details, and rustic country borders',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'stacked', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 28. VEGAS CHAPEL & ELVIS VELVET
  {
    id: 'vegas-chapel-elvis',
    name: 'Vegas Chapel Elvis',
    description: 'Hot velvet pink, neon retro details, casino-inspired typography, and playful animated elements',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'polaroid', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'playful', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 29. SEASIDE CLIFFS & WILD COAST
  {
    id: 'seaside-cliffs-wildcoast',
    name: 'Seaside Cliffs Wild Coast',
    description: 'Windblown coast blues, deep oceanic teal, cliff granite slate, and dramatic visual flow',
    defaultThemePreset: 'ocean',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'fullscreen', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'flip', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'cinematic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'extended', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 30. GREENHOUSE BOTANIC & PALM CONSERVATORY
  {
    id: 'greenhouse-botanic-palm',
    name: 'Greenhouse Botanic Palm',
    description: 'Abundant conservatory greens, glass architecture accents, fresh linen grids, and botanical style',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 31. VINTAGE LIBRARY & ANTIQUE INK
  {
    id: 'vintage-library-antique',
    name: 'Vintage Library Antique',
    description: 'Rich mahogany tones, aged parchment, classic gothic calligraphy, and literary-style layouts',
    defaultThemePreset: 'editorial',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'detailed', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'minimal', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'fullwidth', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 32. SOUTHERN BELLE & SAVANNAH OAKS
  {
    id: 'southern-belle-savannah',
    name: 'Southern Belle Savannah',
    description: 'Spanish moss gray, warm ivory lace, champagne gold flourishes, and grand classic southern elegance',
    defaultThemePreset: 'classic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 33. SCANDINAVIAN HYGGE & COZY WARMTH
  {
    id: 'scandinavian-hygge-cozy',
    name: 'Scandinavian Hygge Cozy',
    description: 'Cozy charcoal gray, clean light wood details, fresh white space, and warm minimalist layout',
    defaultThemePreset: 'linen',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'centered', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'modern', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 34. YACHT DECK & BLUE HORIZON
  {
    id: 'yacht-deck-horizon',
    name: 'Yacht Deck Horizon',
    description: 'Sailor navy blue, polished yacht brass, breezy white sea air, and formal luxury club layout',
    defaultThemePreset: 'classic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'luxury', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 35. SAKURA BLOSSOM & ZEN SIMPLICITY
  {
    id: 'sakura-blossom-zen',
    name: 'Sakura Blossom Zen',
    description: 'Soft blossom pink, architectural zen whites, clean geometric dividers, and peaceful minimalist layout',
    defaultThemePreset: 'romantic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'stacked', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'elegant', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 36. CHATEAU FRENCH & LAVENDER FIELDS
  {
    id: 'chateau-french-lavender',
    name: 'Chateau French Lavender',
    description: 'Elegant lavender mauve, warm French stone ivory, gold flourishes, and romantic provincial air',
    defaultThemePreset: 'romantic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'coastal', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 37. HIGH-TECH CYBER & NEO-NEON
  {
    id: 'hightech-cyber-neoneon',
    name: 'High-Tech Cyber Neo',
    description: 'Sleek dark mode, cyberpunk electric blue, futuristic geometric panels, and high-energy style',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'magazine', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'detailed', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'magazine', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'magazine', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'program', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 38. FOLK ART & SLAVIC EMBROIDERY
  {
    id: 'folk-art-slavic',
    name: 'Folk Art Slavic',
    description: 'Traditional folk crimson, cozy linen accents, intricate geometric dividers, and heritage borders',
    defaultThemePreset: 'romantic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'stacked', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 39. ISLAND HAMMOCK & TIKI SUNSET
  {
    id: 'island-hammock-tiki',
    name: 'Island Hammock Tiki',
    description: 'Warm sandy dunes, tropical palm greens, copper sunsets, and breezy coastal air layouts',
    defaultThemePreset: 'ocean',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'coastal', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 40. REDWOOD CATHEDRAL & GIANT SEQUOIA
  {
    id: 'redwood-cathedral-sequoia',
    name: 'Redwood Cathedral Sequoia',
    description: 'Lush redwood forest greens, warm bark charcoal, elegant ancient wood layout, and dramatic tall scale',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 41. NEW YORK JAZZ & SAXOPHONE LOUNGE
  {
    id: 'newyork-jazz-lounge',
    name: 'New York Jazz Lounge',
    description: 'Sleek midnight black, warm brassy bronze accents, sophisticated smoky fonts, and urban layouts',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'bold', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'bold', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 42. ENGLISH TEA GARDEN & ROSE COTTAGE
  {
    id: 'english-tea-garden',
    name: 'English Tea Garden',
    description: 'Watercolor cottage roses, dusty sage paths, champagne gold borders, and elegant romantic fonts',
    defaultThemePreset: 'romantic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'stacked', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'elegant', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 43. GREEK CYCLADES & WHITE DOME
  {
    id: 'greek-cyclades-whitedome',
    name: 'Greek Cyclades White Dome',
    description: 'Deep sea Aegean teal, bright white dome plaster, warm sand, and breezy cliff destination layouts',
    defaultThemePreset: 'ocean',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'coastal', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'travel', variant: 'map', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 44. SPANISH HACIENDA & TERRACOTTA TILE
  {
    id: 'spanish-hacienda-terracotta',
    name: 'Spanish Hacienda Terracotta',
    description: 'Warm terracotta orange, olive green borders, sandy white space, and Mediterranean estate flows',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'coastal', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'timeline', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'carousel', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 45. NORDIC FIORD & GLACIER ICE
  {
    id: 'nordic-fiord-glacier',
    name: 'Nordic Fiord Glacier',
    description: 'Icy glacier blues, deep fiord slate gray, cozy scandi linen, and clean modern grid designs',
    defaultThemePreset: 'ocean',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'centered', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'modern', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 46. SKI CHALET & POWDER SNOW
  {
    id: 'ski-chalet-powder',
    name: 'Ski Chalet Powder Snow',
    description: 'Clean powder white, warm cedar wood bark accents, fresh linen grids, and cozy mountain cabin layout',
    defaultThemePreset: 'linen',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'centered', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'modern', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'modern', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 47. TANGO CLUB & CRIMSON NIGHT
  {
    id: 'tango-club-crimson',
    name: 'Tango Club Crimson',
    description: 'Passionate tango crimson, moody charcoal shadows, elegant bronze accents, and dramatic storytelling',
    defaultThemePreset: 'romantic',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'detailed', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'minimal', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'fullwidth', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 48. STEAMPUNK AIRSHIP & BRASS CLOCKWORK
  {
    id: 'steampunk-airship-brass',
    name: 'Steampunk Airship Brass',
    description: 'Polished airship brass, deep velvet brown, intricate clockwork layouts, and literary retro drama',
    defaultThemePreset: 'sunset',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'editorial', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'detailed', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'split', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'minimal', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'fullwidth', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'form', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'expanded', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 49. DISCO FEVER & STUDIO 54
  {
    id: 'disco-fever-studio54',
    name: 'Disco Fever Studio 54',
    description: 'Glistening disco ball silver, near-black dance floors, sparkling gold lights, and retro-party style',
    defaultThemePreset: 'elegant',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'polaroid', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'playful', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'playful', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
  // 50. GLAMPING LUXURY & STARGAZER
  {
    id: 'glamping-luxury-stargazer',
    name: 'Glamping Luxury Stargazer',
    description: 'Clean glamping canvas ivory, deep pine needle greens, warm campfire accents, and stargazing map design',
    defaultThemePreset: 'garden',
    defaultLayout: {
      sections: [
        { type: 'hero', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'story', variant: 'cards', enabled: true, bindings: {}, settings: {} },
        { type: 'venue', variant: 'garden', enabled: true, bindings: {}, settings: {} },
        { type: 'gallery', variant: 'masonry', enabled: true, bindings: {}, settings: {} },
        { type: 'countdown', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'schedule', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'rsvp', variant: 'classic', enabled: true, bindings: {}, settings: {} },
        { type: 'footer-cta', variant: 'classic', enabled: true, bindings: {}, settings: {} },
      ],
    },
  },
];

function cloneTemplateSection(section: TemplateSection): TemplateSection {
  const canonicalRegistrySection = resolveCanonicalRegistrySectionInput(section.type, section.variant);
  const isRegistryTemplateSection = canonicalRegistrySection.type === 'registry';
  return {
    ...section,
    type: isRegistryTemplateSection ? canonicalRegistrySection.type : section.type,
    variant: isRegistryTemplateSection
      ? canonicalRegistrySection.variant
      : section.variant,
    bindings: cloneTemplateValue(section.bindings ?? {}),
    settings: cloneTemplateValue(section.settings ?? {}),
    overrides: cloneTemplateValue(section.overrides ?? undefined),
  };
}

function cloneTemplateDefinition(template: TemplateDefinition): TemplateDefinition {
  const clonedTemplate = cloneTemplateValue(template);
  return {
    ...clonedTemplate,
    defaultLayout: {
      ...clonedTemplate.defaultLayout,
      sections: clonedTemplate.defaultLayout.sections.map(cloneTemplateSection),
    },
  };
}

const templateById: Record<string, TemplateDefinition> = Object.fromEntries(
  templateRegistry.map((template) => [template.id, cloneTemplateDefinition(template)])
) as Record<string, TemplateDefinition>;

const TEMPLATE_ALIAS_TARGETS: Record<string, string> = {
  base: 'grand-ballroom-opulence',
  modern: 'midcentury-palm-springs',
  editorial: 'gothic-romance-dark',
  classic: 'grand-ballroom-opulence',
  rustic: 'rustic-barn-romance',
};

function getCanonicalTemplateSource(templateId: string | undefined): TemplateDefinition {
  return templateById[templateId ?? '']
    || templateById[TEMPLATE_ALIAS_TARGETS.base]
    || templateRegistry[0];
}

export function getCanonicalTemplateSourceId(templateId: unknown): string {
  const canonicalTemplateId = resolveCanonicalTemplateId(templateId);
  return TEMPLATE_ALIAS_TARGETS[canonicalTemplateId] ?? canonicalTemplateId;
}

function getCanonicalTemplateDefinition(templateId: unknown): TemplateDefinition {
  return getCanonicalTemplateSource(getCanonicalTemplateSourceId(templateId));
}

export const TEMPLATE_REGISTRY: Record<string, TemplateDefinition> = deepFreezeTemplateValue({
  ...templateById,
  // Back-compat aliases used by older flows
  base: cloneTemplateDefinition(getCanonicalTemplateDefinition('base')),
  modern: cloneTemplateDefinition(getCanonicalTemplateDefinition('modern')),
  editorial: cloneTemplateDefinition(getCanonicalTemplateDefinition('editorial')),
  classic: cloneTemplateDefinition(getCanonicalTemplateDefinition('classic')),
  rustic: cloneTemplateDefinition(getCanonicalTemplateDefinition('rustic')),
});

const templateIdAliases = new Map<string, string>(
  [
    ...Object.entries(templateById).flatMap(([templateId, template]) => {
      const keys = new Set([normalizeTemplateIdKey(templateId), normalizeTemplateIdKey(template.name)]);
      return Array.from(keys).filter(Boolean).map((key): [string, string] => [key, templateId]);
    }),
    ...Object.entries(TEMPLATE_ALIAS_TARGETS).map(([aliasId, canonicalId]): [string, string] => [normalizeTemplateIdKey(aliasId), canonicalId]),
  ],
);

export function resolveCanonicalTemplateId(templateId: unknown): string {
  const templateIdValue = typeof templateId === 'string' ? templateId : '';
  const resolvedTemplateId = templateById[templateIdValue]
    ? templateIdValue
    : TEMPLATE_ALIAS_TARGETS[templateIdValue]
      ? templateIdValue
    : templateIdAliases.get(normalizeTemplateIdKey(templateId)) ?? 'base';
  return TEMPLATE_ALIAS_TARGETS[resolvedTemplateId] ?? resolvedTemplateId;
}

export function getTemplate(templateId: unknown): TemplateDefinition {
  return cloneTemplateDefinition(getCanonicalTemplateDefinition(templateId));
}

export function getAllTemplates(): TemplateDefinition[] {
  return templateRegistry.map((template) => cloneTemplateDefinition(getCanonicalTemplateDefinition(template.id)));
}
