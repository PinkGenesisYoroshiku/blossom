import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center px-4 py-32 text-center">
      <p className="font-script text-4xl text-rosewood">oops</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">This page said &ldquo;I don&apos;t&rdquo;</h1>
      <p className="mt-4 text-ink/70">
        The page you&apos;re looking for doesn&apos;t exist — but our wedding
        templates are waiting for you.
      </p>
      <Link
        href="/templates"
        className="mt-8 rounded-full bg-rosewood px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-rosewood-deep"
      >
        Browse Templates
      </Link>
      </main>
      <SiteFooter />
    </>
  );
}
