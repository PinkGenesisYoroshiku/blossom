import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTemplate, templates } from "@/lib/templates";
import { InvitationDemo } from "@/components/demo/invitation-demo";
import { PreviewExperience } from "@/components/demo/preview-experience";

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

  return {
    title: `Live Preview: ${template.name}`,
    description: `See a full live example of the ${template.name} wedding invitation website — ${template.tagline.toLowerCase()}.`,
    // Sample content — keep search engines focused on the real template pages
    robots: { index: false, follow: true },
  };
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) notFound();

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-petal/40 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <p className="min-w-0 truncate text-xs uppercase tracking-[0.2em] text-ink/70">
            <span className="text-rosewood">Previewing</span>
            <span className="hidden sm:inline"> · {template.name} with sample content</span>
          </p>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href={`/templates/${template.slug}`}
              className="rounded-full border border-rosewood px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-rosewood transition-colors hover:bg-blush"
            >
              ← Back
            </Link>
            <Link
              href="/#contact"
              className="rounded-full bg-rosewood px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-rosewood-deep"
            >
              Get This Design
            </Link>
          </div>
        </div>
      </div>
      <PreviewExperience
        couple={`${template.sampleCouple.partnerA} & ${template.sampleCouple.partnerB}`}
        date={template.sampleCouple.date}
        ornament={template.ornament}
        palette={template.palette}
      >
        <main>
          <InvitationDemo template={template} />
        </main>
      </PreviewExperience>
    </>
  );
}
