import type { WeddingTemplate } from "@/lib/templates";

/**
 * Sample content shown on each template's live preview page. Real client
 * sites get their own story, schedule, entourage, and photos — this simply
 * demonstrates every section filled in.
 */
export type DemoContent = {
  storyChapters: { title: string; body: string }[];
  schedule: { time: string; event: string }[];
  ceremony: { venue: string; time: string };
  reception: { venue: string; time: string };
  entourage: {
    principalSponsors: string[];
    bestMan: string;
    maidOfHonor: string;
    bridesmaids: string[];
    groomsmen: string[];
  };
  dressCode: string;
  faqs: { question: string; answer: string }[];
};

export function getDemoContent(template: WeddingTemplate): DemoContent {
  const { partnerA, partnerB, venue } = template.sampleCouple;
  const [ceremonyVenue, area] = venue.split(" · ");

  return {
    storyChapters: [
      {
        title: "How we met",
        body: `${partnerA} and ${partnerB} first crossed paths at a friend's birthday dinner — seated across from each other, arguing (politely) over the last slice of cake. ${partnerB} surrendered the slice. ${partnerA} says that's when she knew.`,
      },
      {
        title: "The adventure",
        body: `Seven years of road trips, burnt pancakes, two rescue cats, and one shared dream board later, they had built a life that felt like home wherever they were — as long as they were together.`,
      },
      {
        title: "The proposal",
        body: `On a quiet evening back where it all began, ${partnerB} got down on one knee with a ring hidden in a box of cake. ${partnerA} said yes before he could finish the question.`,
      },
    ],
    schedule: [
      { time: "2:30 PM", event: "Guests arrive & seating" },
      { time: "3:00 PM", event: "Wedding ceremony" },
      { time: "4:30 PM", event: "Photos & cocktail hour" },
      { time: "6:00 PM", event: "Reception dinner" },
      { time: "8:00 PM", event: "First dance & toasts" },
      { time: "10:00 PM", event: "Dancing till late" },
    ],
    ceremony: { venue: ceremonyVenue, time: "3:00 PM" },
    reception: { venue: `The Garden Pavilion, ${area ?? ceremonyVenue}`, time: "6:00 PM" },
    entourage: {
      principalSponsors: [
        "Mr. & Mrs. Ricardo Santos",
        "Mr. & Mrs. Alfonso Reyes",
        "Dr. & Mrs. Emilio Cruz",
        "Mr. & Mrs. Benigno Ramos",
      ],
      bestMan: "Miguel Torres",
      maidOfHonor: "Andrea Villanueva",
      bridesmaids: ["Carla Mendoza", "Nicole Bautista", "Joanna Lim"],
      groomsmen: ["Patrick Aquino", "Ryan Dela Cruz", "Joshua Tan"],
    },
    dressCode: `We'd love to see you in semi-formal attire in colors that complement our motif. Please avoid white — that's reserved for the bride!`,
    faqs: [
      {
        question: "Can I bring a plus one?",
        answer:
          "We'd love to celebrate with everyone, but our guest list is limited to the names on your invitation. Your RSVP will show the seats reserved for you.",
      },
      {
        question: "Are kids welcome?",
        answer:
          "We adore your little ones, but to let all our guests relax and celebrate, this will be an adults-only occasion — except for children in the entourage.",
      },
      {
        question: "Where should I park?",
        answer:
          "Both venues offer free parking for our guests. Just mention the wedding at the gate and the staff will point you to the reserved area.",
      },
      {
        question: "What about gifts?",
        answer:
          "Your presence is the greatest present. Should you wish to give more, a small envelope would warm our hearts as we build our new home together.",
      },
    ],
  };
}
