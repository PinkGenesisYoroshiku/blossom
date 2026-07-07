export type TemplatePalette = {
  /** page background */
  bg: string;
  /** card / panel background */
  panel: string;
  /** main text color */
  ink: string;
  /** decorative accent (ornaments, rules, buttons) */
  accent: string;
  /** soft secondary accent */
  soft: string;
};

export type WeddingTemplate = {
  slug: string;
  name: string;
  style: string;
  tagline: string;
  description: string;
  longDescription: string;
  idealFor: string;
  palette: TemplatePalette;
  /** ornament glyph used in the live preview */
  ornament: string;
  /** sample couple shown in the preview */
  sampleCouple: { partnerA: string; partnerB: string; date: string; venue: string };
  sections: string[];
  featured?: boolean;
};

export const SHARED_FEATURES = [
  "Mobile-first design that looks perfect on any phone",
  "Online RSVP form with guest count and meal choices",
  "Live countdown to your wedding day",
  "Google Maps directions to ceremony and reception",
  "Photo gallery for prenup and engagement shoots",
  "Your own shareable link to send to guests",
];

export const templates: WeddingTemplate[] = [
  {
    slug: "eternal-elegance",
    name: "Eternal Elegance",
    style: "Classic & Timeless",
    tagline: "Ivory, gold, and graceful serifs for a timeless celebration",
    description:
      "A classic ivory-and-gold wedding invitation website with elegant serif typography, a formal program, and refined details for church and ballroom weddings.",
    longDescription:
      "Eternal Elegance is our most requested design for church ceremonies and hotel ballroom receptions. Soft ivory backgrounds, delicate gold rules, and stately serif headings give your invitation the feeling of fine letterpress stationery — while your guests enjoy modern touches like one-tap RSVP and live maps.",
    idealFor: "Church weddings, hotel ballrooms, and formal evening receptions",
    palette: {
      bg: "#faf7f0",
      panel: "#ffffff",
      ink: "#3f3a33",
      accent: "#b08d3f",
      soft: "#e9e0cd",
    },
    ornament: "❦",
    sampleCouple: {
      partnerA: "Isabella",
      partnerB: "Gabriel",
      date: "June 14, 2027",
      venue: "Manila Cathedral · Intramuros",
    },
    sections: [
      "Hero with couple monogram",
      "Our Love Story timeline",
      "Ceremony & reception details",
      "Entourage & principal sponsors",
      "Dress code with color palette",
      "Prenup photo gallery",
      "RSVP form",
      "Gift guide & registry note",
      "FAQ for guests",
    ],
    featured: true,
  },
  {
    slug: "garden-whisper",
    name: "Garden Whisper",
    style: "Rustic Garden",
    tagline: "Sage greens and soft botanicals for outdoor romance",
    description:
      "A rustic garden wedding invitation website with sage green botanicals, warm cream tones, and a relaxed layout perfect for garden and farm venues.",
    longDescription:
      "Garden Whisper wraps your details in trailing greenery and sun-warmed cream. It suits couples celebrating under the trees — garden venues, farm estates, and mountainside lawns. The airy layout keeps everything easy to read outdoors on a phone held in one hand at golden hour.",
    idealFor: "Garden ceremonies, farm venues, and daytime outdoor receptions",
    palette: {
      bg: "#f6f5ee",
      panel: "#ffffff",
      ink: "#414a3b",
      accent: "#7d8f69",
      soft: "#dde3d0",
    },
    ornament: "✿",
    sampleCouple: {
      partnerA: "Sofia",
      partnerB: "Mateo",
      date: "February 20, 2027",
      venue: "Hillcreek Gardens · Tagaytay",
    },
    sections: [
      "Botanical hero with names & date",
      "How We Met story",
      "Countdown timer",
      "Venue details with maps",
      "Entourage list",
      "Attire guide",
      "Engagement gallery",
      "RSVP form",
      "Travel & accommodation tips",
    ],
    featured: true,
  },
  {
    slug: "modern-muse",
    name: "Modern Muse",
    style: "Modern Minimalist",
    tagline: "Clean lines and quiet luxury for the contemporary couple",
    description:
      "A modern minimalist wedding invitation website with editorial typography, generous white space, and a chic neutral palette for contemporary celebrations.",
    longDescription:
      "Modern Muse strips away the ornament and lets your names carry the page. Editorial type, warm taupe neutrals, and gallery-style photo layouts create a quietly luxurious invitation — ideal for city weddings, intimate dinners, and couples who love a fashion-forward look.",
    idealFor: "City weddings, intimate dinners, and modern event spaces",
    palette: {
      bg: "#f5f2ee",
      panel: "#ffffff",
      ink: "#2b2926",
      accent: "#8a7462",
      soft: "#e5ddd3",
    },
    ornament: "—",
    sampleCouple: {
      partnerA: "Camille",
      partnerB: "Andres",
      date: "September 9, 2027",
      venue: "Blackbird · Makati",
    },
    sections: [
      "Editorial hero",
      "The Story in short chapters",
      "Schedule of the day",
      "Venue & directions",
      "Dress code",
      "Photo gallery grid",
      "RSVP form",
      "Registry note",
      "FAQ",
    ],
    featured: true,
  },
  {
    slug: "shoreline-vows",
    name: "Shoreline Vows",
    style: "Beach & Destination",
    tagline: "Seafoam, sand, and sunlight for weddings by the water",
    description:
      "A beach wedding invitation website in seafoam and sand tones with travel guides, itinerary, and accommodation details for destination weddings.",
    longDescription:
      "Shoreline Vows is built for celebrations where guests pack a suitcase. Alongside your story and RSVP, it gives extra room for travel details — flights, ferries, island itineraries, and where to stay — so your guests arrive relaxed and ready to celebrate barefoot on the sand.",
    idealFor: "Beach ceremonies, island resorts, and destination weddings",
    palette: {
      bg: "#f2f7f6",
      panel: "#ffffff",
      ink: "#2f4858",
      accent: "#4f9d9c",
      soft: "#d4e8e5",
    },
    ornament: "〜",
    sampleCouple: {
      partnerA: "Amara",
      partnerB: "Diego",
      date: "April 24, 2027",
      venue: "Amanpulo · Palawan",
    },
    sections: [
      "Ocean-toned hero",
      "Our Story",
      "Weekend itinerary",
      "Travel & flight guide",
      "Where to stay",
      "Things to do nearby",
      "Photo gallery",
      "RSVP with guest details",
      "FAQ for travelers",
    ],
  },
  {
    slug: "vintage-bloom",
    name: "Vintage Bloom",
    style: "Vintage Romance",
    tagline: "Dusty rose and old-world charm, like a love letter kept for years",
    description:
      "A vintage romantic wedding invitation website in dusty rose with ornate flourishes, storybook typography, and nostalgic details.",
    longDescription:
      "Vintage Bloom feels like an heirloom — dusty rose tones, ornate flourishes, and storybook typography that turns your invitation into a keepsake. Perfect for couples drawn to old-world romance, heritage venues, and celebrations with a sentimental heart.",
    idealFor: "Heritage venues, ancestral houses, and romantic candlelit receptions",
    palette: {
      bg: "#f9f2f1",
      panel: "#ffffff",
      ink: "#59404a",
      accent: "#b56576",
      soft: "#eed7d5",
    },
    ornament: "❧",
    sampleCouple: {
      partnerA: "Elena",
      partnerB: "Rafael",
      date: "December 12, 2026",
      venue: "Las Casas Filipinas · Bataan",
    },
    sections: [
      "Storybook hero with flourish",
      "A Love Story in letters",
      "Countdown",
      "Ceremony & reception",
      "Entourage",
      "Dress code & palette",
      "Gallery",
      "RSVP form",
      "Guestbook messages",
    ],
  },
  {
    slug: "midnight-promise",
    name: "Midnight Promise",
    style: "Dramatic Evening",
    tagline: "Deep navy and champagne gold for an unforgettable evening",
    description:
      "A dramatic evening wedding invitation website in deep navy and champagne gold with starlit accents for black-tie and nighttime celebrations.",
    longDescription:
      "Midnight Promise sets the tone for a glamorous night — deep navy skies, champagne-gold accents, and starlit details that make a black-tie invitation feel cinematic. Your names glow against the dark like the first dance under the lights.",
    idealFor: "Black-tie evenings, rooftop receptions, and New Year's Eve weddings",
    palette: {
      bg: "#141c2e",
      panel: "#1d2740",
      ink: "#e9e4d8",
      accent: "#cba660",
      soft: "#31405f",
    },
    ornament: "✦",
    sampleCouple: {
      partnerA: "Bianca",
      partnerB: "Lorenzo",
      date: "December 31, 2026",
      venue: "The Peninsula · Makati",
    },
    sections: [
      "Starlit hero",
      "Our Story",
      "Evening programme",
      "Venue & valet details",
      "Black-tie dress code",
      "Gallery",
      "RSVP form",
      "After-party details",
      "FAQ",
    ],
  },
];

export function getTemplate(slug: string): WeddingTemplate | undefined {
  return templates.find((t) => t.slug === slug);
}

export function getFeaturedTemplates(): WeddingTemplate[] {
  return templates.filter((t) => t.featured);
}
