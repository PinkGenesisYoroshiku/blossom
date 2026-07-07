import Link from "next/link";
import type { WeddingTemplate } from "@/lib/templates";
import { TemplatePreview } from "@/components/template-preview";

export function TemplateCard({ template }: { template: WeddingTemplate }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-petal/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/templates/${template.slug}`} className="flex flex-1 flex-col">
        <TemplatePreview template={template} />
        <div className="flex flex-1 flex-col gap-2 px-6 pt-5">
          <p className="text-xs uppercase tracking-[0.25em] text-rosewood">{template.style}</p>
          <h3 className="font-serif text-2xl text-ink group-hover:text-rosewood">
            {template.name}
          </h3>
          <p className="text-sm leading-6 text-ink/70">{template.tagline}</p>
        </div>
      </Link>
      <div className="mt-4 flex items-center gap-4 border-t border-petal/40 px-6 py-4">
        <Link
          href={`/preview/${template.slug}`}
          className="rounded-full bg-rosewood px-5 py-2 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-rosewood-deep"
        >
          Live Preview
        </Link>
        <Link
          href={`/templates/${template.slug}`}
          className="text-xs font-medium uppercase tracking-widest text-rosewood hover:text-rosewood-deep"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}
