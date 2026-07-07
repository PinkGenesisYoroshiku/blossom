"use client";

import { useState } from "react";
import type { TemplatePalette } from "@/lib/templates";

export function RsvpForm({ palette }: { palette: TemplatePalette }) {
  const [submitted, setSubmitted] = useState(false);

  const fieldStyle = {
    backgroundColor: palette.bg,
    border: `1px solid ${palette.soft}`,
    color: palette.ink,
  };

  if (submitted) {
    return (
      <div
        className="animate-fade-up rounded-xl px-8 py-10 text-center"
        style={{ backgroundColor: palette.bg, border: `1px solid ${palette.soft}` }}
      >
        <p className="font-script text-3xl" style={{ color: palette.accent }}>
          thank you!
        </p>
        <p className="mt-3 text-sm leading-6" style={{ color: palette.ink }}>
          This is a template preview, so no RSVP was recorded. On your live
          wedding website, responses are saved and shared with you regularly.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="flex flex-col gap-1.5 text-left">
        <span className="text-xs uppercase tracking-[0.2em] opacity-80" style={{ color: palette.ink }}>
          Full name
        </span>
        <input
          type="text"
          name="name"
          placeholder="Juan Dela Cruz"
          required
          className="rounded-lg px-4 py-3 text-sm outline-none"
          style={fieldStyle}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-left">
        <span className="text-xs uppercase tracking-[0.2em] opacity-80" style={{ color: palette.ink }}>
          Number of seats
        </span>
        <input
          type="number"
          name="seats"
          min={1}
          max={5}
          defaultValue={2}
          className="rounded-lg px-4 py-3 text-sm outline-none"
          style={fieldStyle}
        />
      </label>
      <label className="flex flex-col gap-1.5 text-left sm:col-span-2">
        <span className="text-xs uppercase tracking-[0.2em] opacity-80" style={{ color: palette.ink }}>
          Will you be attending?
        </span>
        <select name="attending" className="rounded-lg px-4 py-3 text-sm outline-none" style={fieldStyle}>
          <option>Joyfully accepts</option>
          <option>Regretfully declines</option>
        </select>
      </label>
      <label className="flex flex-col gap-1.5 text-left sm:col-span-2">
        <span className="text-xs uppercase tracking-[0.2em] opacity-80" style={{ color: palette.ink }}>
          Message for the couple (optional)
        </span>
        <textarea
          name="message"
          rows={3}
          placeholder="We can't wait to celebrate with you!"
          className="rounded-lg px-4 py-3 text-sm outline-none"
          style={fieldStyle}
        />
      </label>
      <button
        type="submit"
        className="rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] transition-opacity hover:opacity-85 sm:col-span-2"
        style={{ backgroundColor: palette.accent, color: palette.panel }}
      >
        Send RSVP
      </button>
    </form>
  );
}
