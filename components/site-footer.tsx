import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-petal/40 bg-blush/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-script text-4xl text-rosewood">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-ink/70">
            {siteConfig.tagline}. Browse a design you love, message us, and
            we&apos;ll handle the rest.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h2 className="font-serif text-lg text-ink">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li>
              <Link href="/templates" className="hover:text-rosewood">
                Wedding Templates
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="hover:text-rosewood">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-rosewood">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-rosewood">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="font-serif text-lg text-ink">Message us anytime</h2>
          <p className="mt-3 text-sm leading-6 text-ink/70">
            No sign-up, no forms. Reach us on the platform you already use —
            we usually reply within the day.
          </p>
          <SocialLinks className="mt-4" />
        </div>
      </div>
      <div className="border-t border-petal/40 py-5 text-center text-xs tracking-wide text-ink/60">
        © {new Date().getFullYear()} {siteConfig.name}. Made with love for every couple.
      </div>
    </footer>
  );
}
