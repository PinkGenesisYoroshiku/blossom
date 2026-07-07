import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { templates } from "@/lib/templates";
import { TemplateCard } from "@/components/template-card";

export const metadata: Metadata = {
  title: "Wedding Invitation Website Templates",
  description:
    "Browse all our wedding invitation website templates — classic, rustic garden, modern minimalist, beach, vintage, and evening designs. Each one is personalized with your story, photos, and online RSVP.",
  alternates: {
    canonical: "/templates",
  },
  openGraph: {
    title: `Wedding Invitation Website Templates | ${siteConfig.name}`,
    description:
      "Browse all our wedding invitation website templates and find the design that feels like the two of you.",
    url: `${siteConfig.url}/templates`,
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Wedding Invitation Website Templates",
  itemListElement: templates.map((template, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: template.name,
    url: `${siteConfig.url}/templates/${template.slug}`,
  })),
};

export default function TemplatesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-ink/50">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-rosewood">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-rosewood">Templates</li>
        </ol>
      </nav>
      <div className="mt-8 max-w-2xl">
        <p className="font-script text-3xl text-rosewood">find your style</p>
        <h1 className="mt-2 font-serif text-4xl text-ink sm:text-5xl">
          Wedding Invitation Website Templates
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          Every template below becomes uniquely yours — we personalize the colors,
          wording, photos, and sections to match your motif. Found one you love?
          Message us on social media and mention its name.
        </p>
      </div>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.slug} template={template} />
        ))}
      </div>
      <div className="mt-16 rounded-2xl border border-petal/50 bg-blush/50 px-8 py-10 text-center">
        <h2 className="font-serif text-2xl text-ink">Can&apos;t decide, or want something custom?</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          We also create fully custom designs from scratch. Tell us about your
          theme and motif, and we&apos;ll sketch something just for the two of you.
        </p>
        <Link
          href="/#contact"
          className="mt-6 inline-block rounded-full bg-rosewood px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-rosewood-deep"
        >
          Message Us
        </Link>
      </div>
    </main>
  );
}
