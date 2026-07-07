import type { WeddingTemplate } from "@/lib/templates";

/**
 * A pure-CSS mockup of the template's invitation cover — no images needed,
 * so every template renders its own palette and mood instantly.
 */
export function TemplatePreview({
  template,
  size = "card",
}: {
  template: WeddingTemplate;
  size?: "card" | "hero";
}) {
  const { palette, ornament, sampleCouple } = template;
  const isHero = size === "hero";

  return (
    <div
      aria-hidden="true"
      className={`flex w-full items-center justify-center overflow-hidden ${
        isHero ? "rounded-2xl p-8 sm:p-14" : "rounded-xl p-6"
      }`}
      style={{ backgroundColor: palette.bg }}
    >
      <div
        className={`flex w-full flex-col items-center text-center shadow-sm ${
          isHero ? "max-w-md gap-4 rounded-xl px-8 py-12" : "gap-2.5 rounded-lg px-5 py-8"
        }`}
        style={{
          backgroundColor: palette.panel,
          border: `1px solid ${palette.soft}`,
          color: palette.ink,
        }}
      >
        <span
          className={`uppercase ${isHero ? "text-xs tracking-[0.35em]" : "text-[9px] tracking-[0.3em]"}`}
          style={{ color: palette.accent }}
        >
          Together with their families
        </span>
        <span
          className={`font-script leading-tight ${isHero ? "text-5xl sm:text-6xl" : "text-3xl"}`}
        >
          {sampleCouple.partnerA}
          <span style={{ color: palette.accent }}> &amp; </span>
          {sampleCouple.partnerB}
        </span>
        <span style={{ color: palette.accent }} className={isHero ? "text-2xl" : "text-lg"}>
          {ornament}
        </span>
        <span className={`font-serif ${isHero ? "text-lg" : "text-xs"}`}>
          request the honor of your presence
        </span>
        <span
          className={`font-serif font-semibold ${isHero ? "text-xl" : "text-sm"}`}
          style={{ color: palette.accent }}
        >
          {sampleCouple.date}
        </span>
        <span className={`uppercase opacity-70 ${isHero ? "text-xs tracking-[0.25em]" : "text-[9px] tracking-[0.2em]"}`}>
          {sampleCouple.venue}
        </span>
        <span
          className={`mt-1 rounded-full uppercase ${
            isHero ? "px-5 py-2 text-xs tracking-[0.25em]" : "px-3.5 py-1.5 text-[8px] tracking-[0.2em]"
          }`}
          style={{ backgroundColor: palette.accent, color: palette.panel }}
        >
          RSVP
        </span>
      </div>
    </div>
  );
}
