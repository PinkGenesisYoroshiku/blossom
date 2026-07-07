import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { getTemplate, templates, SHARED_FEATURES } from "@/lib/templates";
import { TemplatePreview } from "@/components/template-preview";
import { TemplateCard } from "@/components/template-card";
import { SocialLinks } from "@/components/social-links";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return {};

  const title = `${template.name} — ${template.style} Wedding Invitation Website`;
  return {
    title,
    description: template.description,
    alternates: {
      canonical: `/templates/${template.slug}`,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: template.description,
      url: `${siteConfig.url}/templates/${template.slug}`,
    },
  };
}

export default async function TemplatePage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  const otherTemplates = templates.filter((t) => t.slug !== template.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: template.name,
    description: template.description,
    url: `${siteConfig.url}/templates/${template.slug}`,
    genre: template.style,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Templates", item: `${siteConfig.url}/templates` },
      {
        "@type": "ListItem",
        position: 3,
        name: template.name,
        item: `${siteConfig.url}/templates/${template.slug}`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-ink/50">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-rosewood">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/templates" className="hover:text-rosewood">Templates</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-rosewood">{template.name}</li>
        </ol>
      </nav>

      <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
        <TemplatePreview template={template} size="hero" />

        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-rosewood">{template.style}</p>
          <h1 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{template.name}</h1>
          <p className="mt-3 font-serif text-xl italic text-ink/70">{template.tagline}</p>
          <p className="mt-6 leading-8 text-ink/80">{template.longDescription}</p>

          <dl className="mt-8 rounded-xl border border-petal/50 bg-blush/40 px-6 py-5">
            <dt className="text-xs uppercase tracking-[0.25em] text-rosewood">Perfect for</dt>
            <dd className="mt-1 font-serif text-lg text-ink">{template.idealFor}</dd>
          </dl>

          <div className="mt-8">
            <h2 className="text-xs uppercase tracking-[0.25em] text-rosewood">Color palette</h2>
            <ul className="mt-3 flex gap-3">
              {[template.palette.bg, template.palette.soft, template.palette.accent, template.palette.ink].map(
                (color) => (
                  <li
                    key={color}
                    className="size-10 rounded-full border border-ink/10"
                    style={{ backgroundColor: color }}
                    title={color}
                  >
                    <span className="sr-only">{color}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={`/preview/${template.slug}`}
              className="rounded-full bg-rosewood px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-rosewood-deep"
            >
              See Live Preview
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-rosewood px-8 py-3.5 text-center text-sm font-medium uppercase tracking-widest text-rosewood transition-colors hover:bg-blush"
            >
              Get This Design
            </Link>
          </div>
          <p className="mt-4 text-sm text-ink/60">
            Message us with the name <span className="font-medium text-rosewood">“{template.name}”</span>
          </p>
        </div>
      </div>

      <section aria-labelledby="sections-heading" className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 id="sections-heading" className="font-serif text-2xl text-ink sm:text-3xl">
            Sections in this design
          </h2>
          <p className="mt-3 text-ink/70">
            Sections can be added, removed, or renamed to fit your celebration.
          </p>
          <ul className="mt-6 space-y-3">
            {template.sections.map((section) => (
              <li key={section} className="flex items-start gap-3 text-ink/80">
                <span aria-hidden="true" className="mt-0.5 text-rosewood">❀</span>
                {section}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-2xl text-ink sm:text-3xl">Included with every template</h2>
          <p className="mt-3 text-ink/70">
            No matter which design you choose, these come standard.
          </p>
          <ul className="mt-6 space-y-3">
            {SHARED_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-ink/80">
                <span aria-hidden="true" className="mt-0.5 text-rosewood">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="cta-heading"
        className="mt-20 rounded-2xl border border-petal/50 bg-gradient-to-b from-blush/60 to-cream px-8 py-12 text-center"
      >
        <p className="font-script text-3xl text-rosewood">love this one?</p>
        <h2 id="cta-heading" className="mt-2 font-serif text-3xl text-ink">
          Make {template.name} yours
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-ink/70">
          Send us a message with your wedding date and the template name — we&apos;ll
          personalize every detail and share a private preview link.
        </p>
        <div className="mt-6 flex justify-center">
          <SocialLinks />
        </div>
      </section>

      <section aria-labelledby="more-heading" className="mt-20">
        <h2 id="more-heading" className="text-center font-serif text-3xl text-ink">
          More designs to explore
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {otherTemplates.map((t) => (
            <TemplateCard key={t.slug} template={t} />
          ))}
        </div>
      </section>
    </main>
  );
}
