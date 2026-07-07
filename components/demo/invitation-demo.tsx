import type { WeddingTemplate } from "@/lib/templates";
import { getDemoContent } from "@/lib/demo";
import { getVariant, type DemoVariant } from "@/components/demo/variants";
import { HeroDecorations } from "@/components/demo/decorations";
import { Countdown } from "@/components/demo/countdown";
import { RsvpForm } from "@/components/demo/rsvp-form";
import { Reveal } from "@/components/demo/reveal";

function SectionHeading({
  script,
  title,
  template,
  variant,
}: {
  script: string;
  title: string;
  template: WeddingTemplate;
  variant: DemoVariant;
}) {
  return (
    <Reveal className="text-center">
      {variant.headingStyle === "script" ? (
        <p className="font-script text-3xl" style={{ color: template.palette.accent }}>
          {script}
        </p>
      ) : (
        <p
          className="text-xs uppercase tracking-[0.45em]"
          style={{ color: template.palette.accent }}
        >
          {script}
        </p>
      )}
      <h2 className="mt-1 font-serif text-3xl sm:text-4xl" style={{ color: template.palette.ink }}>
        {title}
      </h2>
      <p aria-hidden="true" className="mt-3 text-xl" style={{ color: template.palette.accent }}>
        {template.ornament}
      </p>
    </Reveal>
  );
}

function HeroNames({ template, variant }: { template: WeddingTemplate; variant: DemoVariant }) {
  const { partnerA, partnerB } = template.sampleCouple;
  const accent = template.palette.accent;

  if (variant.nameStyle === "editorial") {
    return (
      <h1 className="font-serif uppercase leading-[1.05] tracking-[0.06em]">
        <span className="block text-5xl sm:text-7xl">{partnerA}</span>
        <span className="block text-5xl sm:text-7xl">
          <span className="lowercase italic" style={{ color: accent }}>
            &amp;
          </span>{" "}
          {partnerB}
        </span>
      </h1>
    );
  }

  return (
    <h1 className="font-script text-6xl leading-tight sm:text-8xl">
      {partnerA}
      <span style={{ color: accent }}> &amp; </span>
      {partnerB}
    </h1>
  );
}

function HeroFrame({
  variant,
  palette,
  children,
}: {
  variant: DemoVariant;
  palette: WeddingTemplate["palette"];
  children: React.ReactNode;
}) {
  switch (variant.frame) {
    case "double":
      return (
        <div
          className="px-8 py-14 sm:px-16 sm:py-16"
          style={{
            backgroundColor: `${palette.panel}99`,
            border: `1px solid ${palette.accent}55`,
            outline: `1px solid ${palette.accent}2e`,
            outlineOffset: 7,
          }}
        >
          {children}
        </div>
      );
    case "arch":
      return (
        <div
          className="rounded-t-[10rem] rounded-b-3xl px-8 pb-14 pt-24 sm:px-16 sm:pt-28"
          style={{
            backgroundColor: `${palette.panel}99`,
            border: `1px solid ${palette.accent}45`,
          }}
        >
          {children}
        </div>
      );
    case "ornate":
      return (
        <div
          className="rounded-[3rem] p-3"
          style={{ backgroundColor: `${palette.panel}99`, border: `2px solid ${palette.accent}50` }}
        >
          <div
            className="rounded-[2.4rem] border border-dashed px-8 py-12 sm:px-14 sm:py-14"
            style={{ borderColor: `${palette.accent}60` }}
          >
            {children}
          </div>
        </div>
      );
    default:
      return <>{children}</>;
  }
}

/**
 * A complete sample wedding invitation website rendered in the template's
 * palette and creative direction — this is what couples receive, filled in
 * with demo content.
 */
export function InvitationDemo({ template }: { template: WeddingTemplate }) {
  const { palette, ornament, sampleCouple } = template;
  const variant = getVariant(template);
  const demo = getDemoContent(template);
  const initials = `${sampleCouple.partnerA[0]} · ${sampleCouple.partnerB[0]}`;
  const mapsUrl = (query: string) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  const panelStyle = {
    backgroundColor: palette.panel,
    border: `1px solid ${palette.soft}`,
    color: palette.ink,
  };

  // staggered entrance for hero children
  const enter = (step: number) => ({
    className: "animate-fade-up",
    style: { animationDelay: `${step * 140}ms` } as React.CSSProperties,
  });

  return (
    <div style={{ backgroundColor: palette.bg, color: palette.ink }}>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
        <HeroDecorations variant={variant} palette={palette} ornament={ornament} />
        <div className="relative w-full max-w-2xl">
          <HeroFrame variant={variant} palette={palette}>
            {variant.monogram && (
              <div {...enter(0)}>
                <span className="relative mx-auto mb-8 flex size-24 items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="motion-decor absolute inset-0 rounded-full border border-dashed"
                    style={{ borderColor: palette.accent, animation: "spin-slow 45s linear infinite" }}
                  />
                  <span className="font-serif text-2xl" style={{ color: palette.accent }}>
                    {initials}
                  </span>
                </span>
              </div>
            )}
            <p
              {...enter(1)}
              className="animate-fade-up text-xs uppercase tracking-[0.4em] opacity-80"
              style={{ ...enter(1).style, color: palette.accent }}
            >
              Together with their families
            </p>
            <div {...enter(2)}>
              <div className="mt-6">
                <HeroNames template={template} variant={variant} />
              </div>
            </div>
            <div {...enter(3)}>
              {variant.headingStyle === "label" ? (
                <span
                  aria-hidden="true"
                  className="mx-auto mt-8 block h-px w-44 origin-center"
                  style={{
                    backgroundColor: palette.accent,
                    animation: "line-grow 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both",
                  }}
                />
              ) : (
                <p aria-hidden="true" className="mt-6 text-3xl" style={{ color: palette.accent }}>
                  {ornament}
                </p>
              )}
            </div>
            <div {...enter(4)}>
              <p className="mt-6 font-serif text-xl italic sm:text-2xl">
                request the honor of your presence at their wedding
              </p>
              <p
                className="mt-4 font-serif text-2xl font-semibold sm:text-3xl"
                style={{ color: palette.accent }}
              >
                {sampleCouple.date}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] opacity-70">
                {sampleCouple.venue}
              </p>
            </div>
            <div {...enter(5)}>
              <a
                href="#rsvp"
                className="mt-10 inline-block rounded-full px-10 py-4 text-sm font-medium uppercase tracking-[0.25em] transition-all duration-300 hover:scale-105 hover:opacity-90"
                style={{ backgroundColor: palette.accent, color: palette.panel }}
              >
                RSVP Now
              </a>
            </div>
          </HeroFrame>
        </div>
      </section>

      {/* Countdown */}
      <section className="px-4 py-16" style={{ backgroundColor: palette.panel }}>
        <Reveal>
          {variant.headingStyle === "script" ? (
            <p className="mb-8 text-center font-script text-3xl" style={{ color: palette.accent }}>
              counting down to forever
            </p>
          ) : (
            <p
              className="mb-8 text-center text-xs uppercase tracking-[0.45em]"
              style={{ color: palette.accent }}
            >
              counting down to forever
            </p>
          )}
          <Countdown date={sampleCouple.date} accent={palette.accent} ink={palette.ink} />
        </Reveal>
      </section>

      {/* Our story */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <SectionHeading script="every love has a story" title="Our Story" template={template} variant={variant} />
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {demo.storyChapters.map((chapter, i) => (
            <Reveal key={chapter.title} delay={i * 140}>
              <article
                className={`h-full px-6 py-8 text-center transition-transform duration-500 hover:-translate-y-1.5 ${variant.cardClass}`}
                style={panelStyle}
              >
                <h3 className="font-serif text-xl" style={{ color: palette.accent }}>
                  {chapter.title}
                </h3>
                <p className="mt-3 text-sm leading-7 opacity-85">{chapter.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ceremony & reception */}
      <section className="px-4 py-20" style={{ backgroundColor: palette.panel }}>
        <div className="mx-auto max-w-4xl">
          <SectionHeading script="when & where" title="Wedding Details" template={template} variant={variant} />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              { label: "The Ceremony", ...demo.ceremony },
              { label: "The Reception", ...demo.reception },
            ].map((detail, i) => (
              <Reveal key={detail.label} delay={i * 160}>
                <div
                  className={`flex h-full flex-col items-center px-8 py-10 text-center transition-transform duration-500 hover:-translate-y-1.5 ${variant.cardClass}`}
                  style={{ backgroundColor: palette.bg, border: `1px solid ${palette.soft}` }}
                >
                  {variant.headingStyle === "script" ? (
                    <h3 className="font-script text-3xl" style={{ color: palette.accent }}>
                      {detail.label}
                    </h3>
                  ) : (
                    <h3
                      className="text-sm uppercase tracking-[0.35em]"
                      style={{ color: palette.accent }}
                    >
                      {detail.label}
                    </h3>
                  )}
                  <p className="mt-4 font-serif text-xl">{detail.venue}</p>
                  <p className="mt-1 text-sm uppercase tracking-[0.25em] opacity-70">
                    {sampleCouple.date} · {detail.time}
                  </p>
                  <a
                    href={mapsUrl(detail.venue)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105"
                    style={{ border: `1px solid ${palette.accent}`, color: palette.accent }}
                  >
                    View Map
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="mx-auto max-w-2xl px-4 py-20">
        <SectionHeading script="the celebration" title="Schedule of the Day" template={template} variant={variant} />
        <ol className="mt-12">
          {demo.schedule.map((item, index) => (
            <li key={item.event} className="flex gap-6">
              <div className="flex flex-col items-center">
                <span
                  className="flex size-3 shrink-0 rounded-full"
                  style={{ backgroundColor: palette.accent, marginTop: 6 }}
                />
                {index < demo.schedule.length - 1 && (
                  <span className="w-px flex-1" style={{ backgroundColor: palette.soft }} />
                )}
              </div>
              <Reveal delay={index * 90} className="pb-8">
                <p className="font-serif text-lg font-semibold" style={{ color: palette.accent }}>
                  {item.time}
                </p>
                <p className="mt-0.5 opacity-85">{item.event}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Entourage */}
      <section className="px-4 py-20" style={{ backgroundColor: palette.panel }}>
        <div className="mx-auto max-w-4xl">
          <SectionHeading script="with love and gratitude" title="The Entourage" template={template} variant={variant} />
          <div className="mt-12 grid gap-10 text-center sm:grid-cols-2">
            <Reveal>
              <h3 className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.accent }}>
                Principal Sponsors
              </h3>
              <ul className="mt-4 space-y-2 font-serif text-lg">
                {demo.entourage.principalSponsors.map((name) => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160} className="space-y-8">
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.accent }}>
                  Best Man &amp; Maid of Honor
                </h3>
                <ul className="mt-4 space-y-2 font-serif text-lg">
                  <li>{demo.entourage.bestMan}</li>
                  <li>{demo.entourage.maidOfHonor}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-[0.3em]" style={{ color: palette.accent }}>
                  Bridesmaids &amp; Groomsmen
                </h3>
                <ul className="mt-4 space-y-2 font-serif text-lg">
                  {demo.entourage.bridesmaids.map((name, i) => (
                    <li key={name}>
                      {name} · {demo.entourage.groomsmen[i]}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Dress code */}
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <SectionHeading script="what to wear" title="Dress Code" template={template} variant={variant} />
        <Reveal delay={120}>
          <p className="mt-8 leading-8 opacity-85">{demo.dressCode}</p>
          <ul className="mt-8 flex justify-center gap-4">
            {[palette.accent, palette.soft, palette.bg, palette.ink].map((color) => (
              <li
                key={color}
                className="size-12 rounded-full transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: color, border: `1px solid ${palette.soft}` }}
              >
                <span className="sr-only">Motif color {color}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="px-4 py-20" style={{ backgroundColor: palette.panel }}>
        <div className="mx-auto max-w-4xl">
          <SectionHeading script="moments together" title="Our Gallery" template={template} variant={variant} />
          <Reveal delay={100}>
            <p className="mt-4 text-center text-sm opacity-70">
              Your prenup and engagement photos live here on the real site.
            </p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <li key={i}>
                <Reveal delay={i * 90}>
                  <div
                    aria-hidden="true"
                    className={`flex aspect-square items-center justify-center text-3xl transition-all duration-500 hover:scale-[1.04] hover:rotate-1 ${variant.tileClass}`}
                    style={{
                      background: `linear-gradient(${135 + i * 30}deg, ${palette.soft}, ${palette.bg})`,
                      color: palette.accent,
                    }}
                  >
                    {ornament}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="mx-auto max-w-2xl scroll-mt-16 px-4 py-20">
        <SectionHeading script="join us" title="RSVP" template={template} variant={variant} />
        <Reveal delay={120}>
          <p className="mt-4 text-center text-sm leading-7 opacity-80">
            Kindly respond on or before {sampleCouple.date}. We have reserved seats
            in your honor.
          </p>
          <div className={`mt-10 px-6 py-8 sm:px-10 ${variant.cardClass}`} style={panelStyle}>
            <RsvpForm palette={palette} />
          </div>
        </Reveal>
      </section>

      {/* Guest FAQ */}
      <section className="px-4 py-20" style={{ backgroundColor: palette.panel }}>
        <div className="mx-auto max-w-2xl">
          <SectionHeading script="good to know" title="Guest FAQ" template={template} variant={variant} />
          <div className="mt-10 space-y-4">
            {demo.faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 80}>
                <details
                  className={`px-6 py-4 ${variant.cardClass}`}
                  style={{ backgroundColor: palette.bg, border: `1px solid ${palette.soft}` }}
                >
                  <summary className="cursor-pointer list-none font-serif text-lg">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 opacity-85">{faq.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Invite footer */}
      <footer className="px-4 py-16 text-center">
        <Reveal>
          {variant.nameStyle === "editorial" ? (
            <p className="font-serif text-4xl uppercase tracking-[0.06em]">
              {sampleCouple.partnerA}{" "}
              <span className="lowercase italic" style={{ color: palette.accent }}>
                &amp;
              </span>{" "}
              {sampleCouple.partnerB}
            </p>
          ) : (
            <p className="font-script text-5xl">
              {sampleCouple.partnerA}
              <span style={{ color: palette.accent }}> &amp; </span>
              {sampleCouple.partnerB}
            </p>
          )}
          <p className="mt-3 text-xs uppercase tracking-[0.3em] opacity-70">
            {sampleCouple.date} · {sampleCouple.venue}
          </p>
          <p aria-hidden="true" className="mt-4 text-xl" style={{ color: palette.accent }}>
            {ornament}
          </p>
        </Reveal>
      </footer>
    </div>
  );
}
