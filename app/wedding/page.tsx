import type { Metadata } from "next";
import { BirthdaySurprise } from "@/components/surprise/birthday-surprise";

export const metadata: Metadata = {
  title: { absolute: "A Little Surprise ✨" },
  description: "Someone has something to tell you.",
  // Personal page — keep it out of search engines
  robots: { index: false, follow: false },
};

export default function WeddingSurprisePage() {
  return <BirthdaySurprise />;
}
