import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getFeaturedTemplates, SHARED_FEATURES } from "@/lib/templates";
import { TemplateCard } from "@/components/template-card";
import { SocialLinks } from "@/components/social-links";
import { FloralBackdrop } from "@/components/floral-backdrop";

const steps = [
  {
    title: "Browse our designs",
    body: "Explore the template gallery and pick the style that feels like the two of you — classic, garden, minimalist, beach, vintage, or evening glam.",
  },
  {
    title: "Message us on social media",
    body: "No sign-up, no account. Send us a message on Facebook, Instagram, TikTok, or Messenger with the template name and your wedding date.",
  },
  {
    title: "We personalize everything",
    body: "We add your names, love story, photos, entourage, venues, dress code, and RSVP form — and send you a private preview to approve.",
  },
  {
    title: "Share your link with guests",
    body: "Once you love it, you get your own website link to send by chat, text, or printed QR code. Guests RSVP right from their phones.",
  },
];

const faqs = [
  {
    question: "What is a wedding invitation website?",
    answer:
      "A wedding invitation website is a personal web page that replaces or complements a paper invitation. It shares your love story, ceremony and reception details, dress code, photo gallery, and maps — and lets guests RSVP online from any phone, with no app to install.",
  },
  {
    question: "How do I order a wedding invitation website from Blossom?",
    answer:
      "Simply browse our templates, pick a design you love, and message us on Facebook, Instagram, TikTok, or Messenger. There is no sign-up or account needed — we handle everything through chat and send you a preview link before your site goes live.",
  },
  {
    question: "Can guests RSVP through the wedding website?",
    answer:
      "Yes. Every template includes an online RSVP form where guests confirm attendance, indicate their number of seats, and note meal preferences or allergies. We compile the responses and share them with you regularly.",
  },
  {
    question: "Can the design be customized to match my wedding theme?",
    answer:
      "Absolutely. Every template's colors, fonts, wording, photos, and sections are customized to your motif. You can also mix elements from different templates — just tell us what you have in mind when you message us.",
  },
  {
    question: "How long does it take to create my wedding invitation website?",
    answer:
      "Most wedding invitation websites are ready for preview within 3 to 5 days after we receive your details and photos. Rush timelines are possible — message us with your date and we will confirm availability.",
  },
  {
    question: "Do wedding invitation websites work on mobile phones?",
    answer:
      "Yes. All our designs are mobile-first, so your invitation looks beautiful on any phone, tablet, or computer. Most guests open their invitation from a chat message, so we design for that experience first.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Home() {
  const featured = getFeaturedTemplates();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush via-cream to-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-petal/30 blur-3xl"
        />
        <FloralBackdrop />
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
          <p className="font-script text-3xl text-rosewood sm:text-4xl">
            Your love story, beautifully told
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-6xl">
            Wedding Invitation Websites
            <span className="block italic text-rosewood">your guests will adore</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
            Choose a template, message us on social media, and we&apos;ll craft a
            personal wedding website with your story, photos, venue maps, and
            online RSVP — no sign-up ever needed.
          </p>
          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/templates"
              className="rounded-full bg-rosewood px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-rosewood-deep"
            >
              Browse Templates
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-rosewood px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-rosewood transition-colors hover:bg-blush"
            >
              Message Us
            </Link>
            <Link
              href="/wedding"
              className="rounded-full bg-white/70 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-rosewood shadow-sm ring-1 ring-petal transition hover:bg-white hover:shadow-md"
            >
              A Little Surprise ✨
            </Link>
          </div>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm uppercase tracking-[0.2em] text-ink/60">
            <li>Online RSVP</li>
            <li aria-hidden="true" className="text-petal">✦</li>
            <li>Countdown</li>
            <li aria-hidden="true" className="text-petal">✦</li>
            <li>Photo Gallery</li>
            <li aria-hidden="true" className="text-petal">✦</li>
            <li>Venue Maps</li>
          </ul>
        </div>
      </section>

      {/* Featured templates */}
      <section aria-labelledby="featured-heading" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-rosewood">handpicked for you</p>
          <h2 id="featured-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Featured Wedding Templates
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/70">
            Every design is fully personalized with your names, colors, story, and
            photos. These are our couples&apos; favorites.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/templates"
            className="inline-block rounded-full border border-rosewood px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-rosewood transition-colors hover:bg-blush"
          >
            See All Templates
          </Link>
        </div>
      </section>

      {/* What's included */}
      <section aria-labelledby="included-heading" className="bg-blush/50 py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="font-script text-2xl text-rosewood">everything you need</p>
            <h2 id="included-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
              What Every Wedding Website Includes
            </h2>
          </div>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SHARED_FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-petal/50 bg-white px-5 py-4 text-sm leading-6 text-ink/80"
              >
                <span aria-hidden="true" className="mt-0.5 text-rosewood">❀</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        aria-labelledby="how-heading"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6"
      >
        <div className="text-center">
          <p className="font-script text-2xl text-rosewood">simple &amp; personal</p>
          <h2 id="how-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink/70">
            No accounts, no logins, no complicated builders. Just a conversation
            with people who care about your day.
          </p>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-2xl border border-petal/50 bg-white px-6 py-8">
              <span
                aria-hidden="true"
                className="font-serif text-5xl italic text-petal"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="testimonials-heading" className="bg-blush/50 py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <p className="font-script text-2xl text-rosewood">kind words</p>
            <h2 id="testimonials-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
              From Our Couples
            </h2>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              {
                quote:
                  "Our guests kept saying it was the most beautiful invitation they'd ever received. The RSVP list saved us weeks of follow-ups.",
                names: "Patricia & James",
                detail: "Garden wedding, Tagaytay",
              },
              {
                quote:
                  "We messaged them on Instagram on a Monday and had our preview by Thursday. Everything was so easy — exactly what we needed while planning.",
                names: "Kristine & Paolo",
                detail: "Church wedding, Manila",
              },
              {
                quote:
                  "Half our guests were flying in, and the travel guide section answered every question before anyone even asked. Worth every peso.",
                names: "Danielle & Marco",
                detail: "Destination wedding, Palawan",
              },
            ].map((t) => (
              <figure key={t.names} className="rounded-2xl border border-petal/50 bg-white px-7 py-8">
                <blockquote className="font-serif text-lg italic leading-8 text-ink/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <p className="font-medium text-rosewood">{t.names}</p>
                  <p className="text-sm text-ink/60">{t.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — visible answers, question-formatted headings for AEO */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="mx-auto w-full max-w-3xl scroll-mt-20 px-4 py-20 sm:px-6"
      >
        <div className="text-center">
          <p className="font-script text-2xl text-rosewood">good to know</p>
          <h2 id="faq-heading" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-petal/50 bg-white px-6 py-4 open:pb-6"
            >
              <summary className="cursor-pointer list-none font-serif text-lg text-ink transition-colors group-open:text-rosewood">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span aria-hidden="true" className="text-rosewood transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 leading-7 text-ink/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-cream to-blush py-24"
      >
        <FloralBackdrop corners="bottom" />
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <p className="font-script text-3xl text-rosewood">let&apos;s begin</p>
          <h2 id="contact-heading" className="mt-3 font-serif text-3xl text-ink sm:text-5xl">
            Ready to start yours?
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink/75">
            Message us on any of our social pages with your wedding date and the
            template you love. We&apos;ll take it from there — and reply within
            the day.
          </p>
          <SocialLinks className="mt-8" />
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-ink/50">
            {siteConfig.name} · no sign-up needed
          </p>
        </div>
      </section>
    </main>
  );
}
