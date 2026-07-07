/*
 * Animated botanical corner decorations for the marketing pages.
 * Fine gold line-art branches draw themselves in on page load, leaves bloom
 * open along the stems, and soft blush silhouette leaves sit behind — echoing
 * classic wedding stationery. Pure CSS animation (see .floral-* in
 * globals.css), deterministic markup, aria-hidden, reduced-motion safe.
 */

const LEAF = "M0 0 C 9 -11, 25 -16, 40 -14 C 28 -4, 12 3, 0 0 Z";

const STEMS = [
  "M 6 -12 C 22 60, 64 122, 134 152",
  "M -12 36 C 42 82, 82 150, 92 214",
  "M 14 -6 C 52 28, 96 56, 158 66",
];

type LeafSpot = {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  delay: number;
  flip?: boolean;
};

const LEAVES: LeafSpot[] = [
  { x: 34, y: 58, rotate: 62, scale: 1.1, delay: 0.7 },
  { x: 58, y: 98, rotate: 40, scale: 0.95, delay: 0.9, flip: true },
  { x: 88, y: 124, rotate: 28, scale: 1.2, delay: 1.1 },
  { x: 116, y: 142, rotate: 12, scale: 0.9, delay: 1.3, flip: true },
  { x: 34, y: 78, rotate: 118, scale: 1.0, delay: 0.8, flip: true },
  { x: 62, y: 130, rotate: 96, scale: 1.15, delay: 1.0 },
  { x: 82, y: 178, rotate: 82, scale: 0.9, delay: 1.2, flip: true },
  { x: 64, y: 34, rotate: 30, scale: 0.85, delay: 0.9, flip: true },
  { x: 108, y: 58, rotate: 12, scale: 1.05, delay: 1.15 },
];

const SILHOUETTES: LeafSpot[] = [
  { x: 4, y: 44, rotate: 56, scale: 3.4, delay: 0.25 },
  { x: 46, y: -4, rotate: 78, scale: 2.6, delay: 0.4, flip: true },
];

const DOTS: [number, number, number][] = [
  [0, 0, 2.6],
  [9, -6, 2],
  [16, 2, 1.6],
  [6, 9, 1.8],
  [22, -8, 1.3],
];

/**
 * Placement lives on a wrapper <g> so the CSS bloom animation (which sets
 * `transform` on the path) can't override the leaf's position.
 */
function Leaf({ spot, baseDelay }: { spot: LeafSpot; baseDelay: number }) {
  return (
    <g
      transform={`translate(${spot.x} ${spot.y}) rotate(${spot.rotate}) scale(${spot.scale} ${
        spot.flip ? -spot.scale : spot.scale
      })`}
    >
      <path
        d={LEAF}
        className="floral-leaf"
        style={{ animationDelay: `${baseDelay + spot.delay}s` }}
      />
    </g>
  );
}

function Sprig({ baseDelay = 0 }: { baseDelay?: number }) {
  return (
    <svg
      viewBox="-20 -24 200 244"
      fill="none"
      className="floral-sway h-full w-full origin-top-left"
      aria-hidden="true"
    >
      {/* blush silhouette leaves behind the line art */}
      <g fill="#e8c4bd" opacity="0.35">
        {SILHOUETTES.map((leaf, i) => (
          <Leaf key={i} spot={leaf} baseDelay={baseDelay} />
        ))}
      </g>
      {/* gold stems drawing in */}
      <g stroke="#b08d3f" strokeWidth="1.1" strokeLinecap="round" opacity="0.75">
        {STEMS.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className="floral-stem"
            style={{ animationDelay: `${baseDelay + i * 0.25}s` }}
          />
        ))}
      </g>
      {/* outlined leaves blooming along the stems */}
      <g stroke="#b08d3f" strokeWidth="0.9" opacity="0.8">
        {LEAVES.map((leaf, i) => (
          <Leaf key={i} spot={leaf} baseDelay={baseDelay} />
        ))}
      </g>
      {/* scattered gold dots */}
      <g fill="#b08d3f" opacity="0.7">
        {DOTS.map(([x, y, r], i) => (
          <circle
            key={i}
            cx={140 + x}
            cy={28 + y}
            r={r}
            className="floral-dot"
            style={{ animationDelay: `${baseDelay + 1.4 + i * 0.12}s` }}
          />
        ))}
        {DOTS.map(([x, y, r], i) => (
          <circle
            key={`b${i}`}
            cx={44 + x}
            cy={186 + y}
            r={r * 0.85}
            className="floral-dot"
            style={{ animationDelay: `${baseDelay + 1.7 + i * 0.12}s` }}
          />
        ))}
      </g>
    </svg>
  );
}

export function FloralBackdrop({ corners = "all" }: { corners?: "all" | "bottom" }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {corners === "all" && (
        <>
          <div className="absolute -left-8 -top-8 h-56 w-56 sm:h-80 sm:w-80">
            <Sprig baseDelay={0.2} />
          </div>
          <div className="absolute -right-8 -top-8 h-56 w-56 -scale-x-100 sm:h-80 sm:w-80">
            <Sprig baseDelay={0.45} />
          </div>
        </>
      )}
      <div className="absolute -bottom-10 -left-10 h-40 w-40 -scale-y-100 sm:h-52 sm:w-52">
        <Sprig baseDelay={0.7} />
      </div>
      <div className="absolute -bottom-10 -right-10 h-40 w-40 -scale-x-100 -scale-y-100 sm:h-52 sm:w-52">
        <Sprig baseDelay={0.95} />
      </div>
    </div>
  );
}
