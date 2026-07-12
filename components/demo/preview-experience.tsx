"use client";

import { useEffect, useState } from "react";
import type { TemplatePalette } from "@/lib/templates";

export function PreviewExperience({
  children,
  couple,
  date,
  ornament,
  palette,
}: {
  children: React.ReactNode;
  couple: string;
  date: string;
  ornament: string;
  palette: TemplatePalette;
}) {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);

  function openInvitation() {
    if (opening) return;
    setOpening(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setOpened(true), reduced ? 50 : 1450);
  }

  return (
    <div
      className={`preview-experience ${opening ? "is-opening" : ""} ${opened ? "is-opened" : ""}`}
      style={{
        "--experience-bg": palette.bg,
        "--experience-panel": palette.panel,
        "--experience-ink": palette.ink,
        "--experience-accent": palette.accent,
        "--experience-soft": palette.soft,
      } as React.CSSProperties}
    >
      {!opened && (
        <div className="experience-gate" role="dialog" aria-modal="true" aria-label="Open wedding invitation">
          <div className="experience-light experience-light-one" aria-hidden="true" />
          <div className="experience-light experience-light-two" aria-hidden="true" />
          <div className="experience-stars" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => <span key={index}>✦</span>)}
          </div>
          <div className="experience-envelope-wrap">
            <p className="experience-kicker">You are invited</p>
            <button className="experience-envelope" type="button" onClick={openInvitation} aria-label={`Open ${couple}'s wedding invitation`}>
              <span className="experience-envelope-back" />
              <span className="experience-letter">
                <span className="experience-letter-ornament">{ornament}</span>
                <strong>{couple}</strong>
                <small>{date}</small>
              </span>
              <span className="experience-envelope-front" />
              <span className="experience-flap" />
              <span className="experience-seal">{ornament}</span>
            </button>
            <button type="button" className="experience-open-button" onClick={openInvitation}>
              Open invitation
              <span aria-hidden="true">→</span>
            </button>
            <p className="experience-hint">A little moment made just for you</p>
          </div>
        </div>
      )}
      <div className="experience-content">{children}</div>
    </div>
  );
}
