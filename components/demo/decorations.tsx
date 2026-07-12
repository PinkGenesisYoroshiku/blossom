import type { TemplatePalette } from "@/lib/templates";
import type { DemoVariant } from "@/components/demo/variants";

/*
 * Ambient animated layers for the live preview hero. Everything is pure CSS
 * animation with fixed (deterministic) positions so server and client markup
 * always match. All layers are aria-hidden and pointer-transparent, and the
 * `motion-decor` class freezes them under prefers-reduced-motion.
 */

const FALL_SPOTS = [
  { left: "5%", delay: 0, duration: 14, size: 20 },
  { left: "16%", delay: 5, duration: 17, size: 14 },
  { left: "28%", delay: 9, duration: 13, size: 17 },
  { left: "44%", delay: 2, duration: 18, size: 13 },
  { left: "58%", delay: 7, duration: 15, size: 19 },
  { left: "71%", delay: 4, duration: 16, size: 14 },
  { left: "84%", delay: 11, duration: 14, size: 18 },
  { left: "94%", delay: 6, duration: 19, size: 13 },
];

const TWINKLE_SPOTS = [
  { left: "8%", top: "18%", delay: 0, size: 14 },
  { left: "20%", top: "64%", delay: 1.2, size: 10 },
  { left: "31%", top: "30%", delay: 2.4, size: 12 },
  { left: "47%", top: "12%", delay: 0.7, size: 16 },
  { left: "63%", top: "70%", delay: 1.8, size: 10 },
  { left: "74%", top: "24%", delay: 3.1, size: 13 },
  { left: "87%", top: "52%", delay: 0.4, size: 15 },
  { left: "93%", top: "15%", delay: 2.1, size: 11 },
  { left: "14%", top: "84%", delay: 2.8, size: 11 },
  { left: "80%", top: "82%", delay: 1.5, size: 12 },
];

const BUBBLE_SPOTS = [
  { left: "10%", delay: 0, duration: 16, size: 14 },
  { left: "24%", delay: 6, duration: 20, size: 9 },
  { left: "41%", delay: 3, duration: 17, size: 12 },
  { left: "57%", delay: 9, duration: 21, size: 8 },
  { left: "70%", delay: 1, duration: 15, size: 13 },
  { left: "86%", delay: 7, duration: 19, size: 10 },
];

function FallingGlyphs({ glyph, color }: { glyph: string; color: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {FALL_SPOTS.map((spot, i) => (
        <span
          key={i}
          className="motion-decor absolute"
          style={{
            left: spot.left,
            top: "-8vh",
            animation: `drift-fall ${spot.duration}s linear ${spot.delay}s infinite`,
          }}
        >
          <span
            className="motion-decor block"
            style={{
              color,
              fontSize: spot.size,
              opacity: 0.45,
              animation: `sway ${spot.duration / 3}s ease-in-out infinite`,
            }}
          >
            {glyph}
          </span>
        </span>
      ))}
    </div>
  );
}

function TwinklingGlyphs({ glyph, color }: { glyph: string; color: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {TWINKLE_SPOTS.map((spot, i) => (
        <span
          key={i}
          className="motion-decor absolute"
          style={{
            left: spot.left,
            top: spot.top,
            color,
            fontSize: spot.size,
            animation: `twinkle ${2.6 + (i % 3)}s ease-in-out ${spot.delay}s infinite`,
          }}
        >
          {glyph}
        </span>
      ))}
    </div>
  );
}

function ShootingStar({ color }: { color: string }) {
  return (
    <span
      aria-hidden="true"
      className="motion-decor pointer-events-none absolute right-[8%] top-[14%] h-px w-28"
      style={{
        background: `linear-gradient(to left, ${color}, transparent)`,
        rotate: "-24deg",
        animation: "shooting 9s ease-in 2s infinite",
      }}
    />
  );
}

function RisingBubbles({ color }: { color: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {BUBBLE_SPOTS.map((spot, i) => (
        <span
          key={i}
          className="motion-decor absolute bottom-0 rounded-full"
          style={{
            left: spot.left,
            width: spot.size,
            height: spot.size,
            border: `1px solid ${color}`,
            opacity: 0,
            animation: `rise ${spot.duration}s linear ${spot.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function EditorialRings({ color }: { color: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      <span
        className="motion-decor absolute rounded-full border border-dashed opacity-25"
        style={{
          width: "min(38rem, 92vw)",
          height: "min(38rem, 92vw)",
          borderColor: color,
          animation: "spin-slow 90s linear infinite",
        }}
      />
      <span
        className="motion-decor absolute rounded-full border opacity-15"
        style={{
          width: "min(28rem, 70vw)",
          height: "min(28rem, 70vw)",
          borderColor: color,
          animation: "spin-slow 60s linear infinite reverse",
        }}
      />
    </div>
  );
}

const WAVE_PATH =
  "M0 40 Q 120 10 240 40 T 480 40 T 720 40 T 960 40 T 1200 40 T 1440 40 V 80 H 0 Z";

function Waves({ color }: { color: string }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
      <div className="overflow-hidden">
        <div className="motion-decor flex w-[200%]" style={{ animation: "wave-slide 18s linear infinite" }}>
          {[0, 1].map((i) => (
            <svg key={i} className="h-20 w-1/2 shrink-0" viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path d={WAVE_PATH} fill={color} opacity="0.12" />
            </svg>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 overflow-hidden">
        <div className="motion-decor flex w-[200%]" style={{ animation: "wave-slide 11s linear infinite" }}>
          {[0, 1].map((i) => (
            <svg key={i} className="h-12 w-1/2 shrink-0" viewBox="0 0 1440 80" preserveAspectRatio="none">
              <path d={WAVE_PATH} fill={color} opacity="0.2" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

function InvitationCorners({
  color,
  ornament,
}: {
  color: string;
  ornament: string;
}) {
  return (
    <div aria-hidden="true" className="invitation-corners pointer-events-none absolute inset-0">
      {["top-left", "top-right", "bottom-left", "bottom-right"].map((position, index) => (
        <div
          key={position}
          className={`invitation-corner invitation-corner-${position} motion-decor absolute`}
          style={{ color, animationDelay: `${index * -1.4}s` }}
        >
          <span className="invitation-corner-line" />
          <span className="invitation-corner-glyph">{ornament}</span>
          <span className="invitation-corner-dot" />
        </div>
      ))}
    </div>
  );
}

export function HeroDecorations({
  variant,
  palette,
  ornament,
}: {
  variant: DemoVariant;
  palette: TemplatePalette;
  ornament: string;
}) {
  return (
    <>
      <InvitationCorners color={palette.accent} ornament={ornament} />
      {variant.particles === "sparkles" && <TwinklingGlyphs glyph="✦" color={palette.accent} />}
      {variant.particles === "leaves" && <FallingGlyphs glyph={ornament} color={palette.accent} />}
      {variant.particles === "petals" && <FallingGlyphs glyph={ornament} color={palette.accent} />}
      {variant.particles === "stars" && (
        <>
          <TwinklingGlyphs glyph="✦" color={palette.accent} />
          <ShootingStar color={palette.accent} />
        </>
      )}
      {variant.particles === "bubbles" && <RisingBubbles color={palette.accent} />}
      {variant.rings && <EditorialRings color={palette.accent} />}
      {variant.waves && <Waves color={palette.accent} />}
    </>
  );
}
