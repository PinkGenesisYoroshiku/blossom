import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navItems = [
  { label: "Templates", href: "/templates" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-petal/40 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-script text-3xl text-rosewood" aria-label={`${siteConfig.name} — home`}>
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-4 sm:gap-7">
            {navItems.map((item) => (
              <li key={item.href} className="hidden sm:block">
                <Link
                  href={item.href}
                  className="text-sm uppercase tracking-widest text-ink/80 transition-colors hover:text-rosewood"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="sm:hidden">
              <Link
                href="/templates"
                className="text-sm uppercase tracking-widest text-ink/80 transition-colors hover:text-rosewood"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                className="rounded-full bg-rosewood px-5 py-2 text-sm uppercase tracking-widest text-white transition-colors hover:bg-rosewood-deep"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
