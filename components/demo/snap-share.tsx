"use client";

import { useState } from "react";

export function SnapShare({ hashtag, accent }: { hashtag: string; accent: string }) {
  const [copied, setCopied] = useState(false);

  async function copyHashtag() {
    try {
      await navigator.clipboard.writeText(hashtag);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="snap-hashtag" onClick={copyHashtag} style={{ borderColor: `${accent}55` }}>
      <span style={{ color: accent }}>{hashtag}</span>
      <small>{copied ? "Copied!" : "Tap to copy"}</small>
    </button>
  );
}
