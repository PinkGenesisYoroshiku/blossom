"use client";

import { useEffect, useState } from "react";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

export function Countdown({ date, accent, ink }: { date: string; accent: string; ink: string }) {
  // Rendered as em-dashes on the server; the real numbers appear after
  // hydration so server and client markup never disagree.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(`${date} 15:00:00`).getTime();
    const tick = () => setParts(partsUntil(target));
    const firstTick = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(firstTick);
      clearInterval(id);
    };
  }, [date]);

  const units: { label: string; value: number | null }[] = [
    { label: "Days", value: parts?.days ?? null },
    { label: "Hours", value: parts?.hours ?? null },
    { label: "Minutes", value: parts?.minutes ?? null },
    { label: "Seconds", value: parts?.seconds ?? null },
  ];

  return (
    <div className="flex justify-center gap-6 sm:gap-10">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span
            className="font-serif text-4xl tabular-nums sm:text-5xl"
            style={{ color: accent }}
          >
            {unit.value === null ? "—" : String(unit.value).padStart(2, "0")}
          </span>
          <span
            className="mt-1 text-[10px] uppercase tracking-[0.3em] opacity-70 sm:text-xs"
            style={{ color: ink }}
          >
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
