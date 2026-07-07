import type { WeddingTemplate } from "@/lib/templates";

/**
 * Per-template creative direction for the live preview: hero framing,
 * animated particles, typography treatment, and card/tile shapes.
 */
export type DemoVariant = {
  /** hero name treatment */
  nameStyle: "script" | "editorial";
  /** decorative frame around the hero content */
  frame: "double" | "arch" | "ornate" | "none";
  /** ambient animation layer */
  particles: "sparkles" | "leaves" | "petals" | "stars" | "bubbles" | "none";
  /** animated waves along the hero's bottom edge */
  waves?: boolean;
  /** slow-rotating editorial rings behind the hero */
  rings?: boolean;
  /** rotating monogram badge above the hero text */
  monogram?: boolean;
  /** section headings: flowing script or editorial letterspaced label */
  headingStyle: "script" | "label";
  /** shape of content cards */
  cardClass: string;
  /** shape of gallery tiles */
  tileClass: string;
};

const variants: Record<string, DemoVariant> = {
  "eternal-elegance": {
    nameStyle: "script",
    frame: "double",
    particles: "sparkles",
    monogram: true,
    headingStyle: "script",
    cardClass: "rounded-2xl",
    tileClass: "rounded-xl",
  },
  "garden-whisper": {
    nameStyle: "script",
    frame: "arch",
    particles: "leaves",
    headingStyle: "script",
    cardClass: "rounded-3xl",
    tileClass: "rounded-t-[45%] rounded-b-2xl",
  },
  "modern-muse": {
    nameStyle: "editorial",
    frame: "none",
    particles: "none",
    rings: true,
    headingStyle: "label",
    cardClass: "rounded-none",
    tileClass: "rounded-none",
  },
  "shoreline-vows": {
    nameStyle: "script",
    frame: "none",
    particles: "bubbles",
    waves: true,
    headingStyle: "script",
    cardClass: "rounded-2xl",
    tileClass: "rounded-2xl",
  },
  "vintage-bloom": {
    nameStyle: "script",
    frame: "ornate",
    particles: "petals",
    headingStyle: "script",
    cardClass: "rounded-[2rem]",
    tileClass: "rounded-t-[45%] rounded-b-2xl",
  },
  "midnight-promise": {
    nameStyle: "script",
    frame: "none",
    particles: "stars",
    headingStyle: "script",
    cardClass: "rounded-2xl",
    tileClass: "rounded-xl",
  },
};

const fallback: DemoVariant = {
  nameStyle: "script",
  frame: "none",
  particles: "none",
  headingStyle: "script",
  cardClass: "rounded-2xl",
  tileClass: "rounded-xl",
};

export function getVariant(template: WeddingTemplate): DemoVariant {
  return variants[template.slug] ?? fallback;
}
