/**
 * English SEO guides for people searching for onward-ticket and visa-itinerary help.
 * Each guide ends in the affiliate CTA. Keep rules general and point readers at official
 * sources: entry rules change, and these pages must not read as legal advice.
 */

export type GuideSection = { heading: string; paragraphs: string[] };
export type GuideFaq = { q: string; a: string };

export type Guide = {
  slug: string;
  /** <title> and H1 target the search phrase people actually type. */
  title: string;
  h1: string;
  description: string;
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
};

const VERIFY_STEP =
  "Once your reservation arrives, open the airline's manage-booking page and look it up with the booking reference (PNR) and your surname. If you can see it there, so can a check-in agent. Screenshot it as well as keeping the email.";

const TIMING_STEP =
  "Reservations of this kind are held for a limited time (typically around 48 hours) before they lapse. Book it shortly before check-in or your visa appointment, not weeks ahead.";

export const GUIDES: Guide[] = [
  {
    slug: "proof-of-onward-travel",
    title: "Proof of Onward Travel: What It Is and How to Get It",
    h1: "Proof of onward travel, explained",
    description:
      "Why airlines and border officers ask for proof of onward travel, what counts, and how to get a verifiable flight reservation without buying a ticket you won't use.",
    intro:
      "Many countries only let visitors in if they can show they'll leave again. Airlines enforce this at check-in, because they have to fly you home at their own cost if you're refused entry. If you're travelling on a one-way ticket, you need a way to show an onward or return flight.",
    sections: [
      {
        heading: "Who asks for it",
        paragraphs: [
          "Two groups check: the airline at check-in, and the immigration officer on arrival. In practice the airline is far more likely to ask, because their check-in system flags passengers on one-way tickets to destinations with an onward travel rule.",
          "Consulates also ask for a flight itinerary with many visa applications, including Schengen visas. Most say a reservation is fine and advise against buying a ticket before the visa is granted.",
        ],
      },
      {
        heading: "What counts as proof",
        paragraphs: [
          "A flight out of the country, to anywhere, with a booking reference that the agent can see. A bus or ferry ticket is sometimes accepted at land borders, but airlines usually want a flight.",
          "A real reservation has a PNR you can look up on the airline's own website. An edited PDF or a fake booking is not proof, and presenting one can get you refused or worse.",
        ],
      },
      {
        heading: "Your options",
        paragraphs: [
          "Buy a fully refundable fare and cancel it later. This works, but you tie up hundreds of dollars and refunds can take weeks.",
          "Buy the cheapest onward flight and don't use it. Simple, but you lose the money.",
          "Use an onward ticket service. You pay a small fee for a real reservation that's held for a short time and then released. This is what most nomads and long-term travellers do.",
        ],
      },
      { heading: "How to check it's real", paragraphs: [VERIFY_STEP, TIMING_STEP] },
    ],
    faqs: [
      {
        q: "Is an onward ticket reservation legal?",
        a: "Holding a flight reservation is a normal airline function, and consulates routinely accept reservations for visa applications. What isn't acceptable is a forged document. Always check the rules for your destination with an official source.",
      },
      {
        q: "Does the onward flight have to go home?",
        a: "No. It just has to leave the country you're entering. A short hop to a neighbouring country is the usual choice.",
      },
      {
        q: "Will immigration actually check?",
        a: "Sometimes, but the airline check-in desk is where most travellers get asked. Have the booking reference ready either way.",
      },
    ],
  },
  {
    slug: "onward-ticket-thailand",
    title: "Onward Ticket for Thailand: Do You Need One?",
    h1: "Do you need an onward ticket for Thailand?",
    description:
      "Thailand's visa-exempt entry is conditional on leaving within your permitted stay, and airlines often ask for proof at check-in. Here's what to expect and how to get a verifiable onward reservation.",
    intro:
      "Visitors entering Thailand without a visa are expected to leave within their permitted stay, and Thai immigration can ask for evidence of onward travel. In practice, the check that catches most people is at the airline desk before departure.",
    sections: [
      {
        heading: "Where it gets checked",
        paragraphs: [
          "Airlines flying into Thailand, especially budget carriers, regularly ask passengers on one-way tickets to show a flight out. If you can't, they can refuse to board you.",
          "Immigration officers at Thai airports ask less often, but the requirement exists and they can enforce it.",
        ],
      },
      {
        heading: "What to show",
        paragraphs: [
          "A flight leaving Thailand within your permitted stay, with a booking reference. Popular choices are short hops to Kuala Lumpur, Singapore, Ho Chi Minh City or Phnom Penh.",
          "Entry rules for Thailand have changed several times in recent years, so check the length of stay for your passport on the official Thai e-Visa website before you fly.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Can I fly to Thailand on a one-way ticket?",
        a: "Yes, but be ready to show the airline an onward flight at check-in. Without one you may not be allowed to board.",
      },
      {
        q: "Does a bus ticket to Cambodia or Laos count?",
        a: "Sometimes at land crossings, but airlines usually want to see a flight. A flight reservation is the safer option.",
      },
    ],
  },
  {
    slug: "onward-ticket-philippines",
    title: "Onward Ticket for the Philippines: What Airlines Check",
    h1: "Onward ticket for the Philippines",
    description:
      "Visa-free visitors to the Philippines need a ticket out, and airlines and immigration both check. How to get a verifiable onward flight reservation before you fly.",
    intro:
      "The Philippines is one of the strictest countries for onward travel checks. Visa-free visitors are expected to hold a ticket out of the country within their permitted stay, and both airlines and the Bureau of Immigration ask for it.",
    sections: [
      {
        heading: "What to expect",
        paragraphs: [
          "Expect to be asked for an onward or return flight at check-in for any flight into Manila, Cebu or Clark. Immigration officers on arrival may also ask to see it.",
          "Your onward flight needs to leave the Philippines within the period you're allowed to stay. Check the current visa-free period for your passport with the Philippine Bureau of Immigration or your nearest Philippine embassy.",
        ],
      },
      {
        heading: "Choosing an onward flight",
        paragraphs: [
          "Short regional flights to Hong Kong, Taipei, Kuala Lumpur or Singapore are common choices. The destination doesn't matter as long as it leaves the country.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Will I be refused boarding without an onward ticket?",
        a: "It's a real risk. Airlines flying to the Philippines commonly refuse to board passengers on one-way tickets who can't show a way out.",
      },
      {
        q: "Can I extend my stay and still use a short onward reservation?",
        a: "You need a flight within your current permitted stay at the point of entry. Extensions are handled separately with the Bureau of Immigration.",
      },
    ],
  },
  {
    slug: "onward-ticket-bali-indonesia",
    title: "Onward Ticket for Bali and Indonesia",
    h1: "Do you need an onward ticket for Bali?",
    description:
      "Indonesia expects visitors to show a return or onward ticket, and airlines check before boarding. What to show and how to get a verifiable reservation.",
    intro:
      "Indonesia's visitor visas, including the visa on arrival used by most people heading to Bali, come with an expectation that you'll leave within your permitted stay. Airlines and immigration can both ask for a return or onward ticket.",
    sections: [
      {
        heading: "Where it gets checked",
        paragraphs: [
          "Airlines flying to Denpasar and Jakarta often check for an onward flight at the desk. Indonesian immigration can also ask for it when you apply for or use your visa on arrival.",
          "Check the current visa rules for your passport on Indonesia's official immigration website before you travel.",
        ],
      },
      {
        heading: "Choosing an onward flight",
        paragraphs: [
          "Flights from Bali to Singapore, Kuala Lumpur or Perth are short and common choices for an onward reservation.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Can I enter Bali on a one-way ticket?",
        a: "You can fly there on one, but you should expect to show an onward or return flight at check-in or on arrival.",
      },
    ],
  },
  {
    slug: "onward-ticket-costa-rica",
    title: "Onward Ticket for Costa Rica: Proof of Exit Explained",
    h1: "Onward ticket for Costa Rica",
    description:
      "Costa Rica asks visitors for proof they'll leave the country, and airlines enforce it. What counts as proof of exit and how to get a verifiable flight reservation.",
    intro:
      "Costa Rica is well known among travellers for asking for proof of exit. Visitors are expected to show a ticket leaving the country within their permitted stay, and airlines check for it before letting you board.",
    sections: [
      {
        heading: "What to expect",
        paragraphs: [
          "Airlines flying to San José and Liberia regularly ask for an onward ticket at check-in. Immigration officers can also ask on arrival.",
          "Some travellers use bus tickets to Nicaragua or Panama as proof. Whether that's accepted depends on the airline and the officer, so a flight is the safer option.",
          "Confirm the current rules for your passport with Costa Rica's immigration authority (Migración) or your nearest Costa Rican embassy.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Does a bus ticket out of Costa Rica count?",
        a: "Sometimes, but not reliably. Airlines are more likely to accept a flight reservation with a booking reference they can check.",
      },
    ],
  },
  {
    slug: "onward-ticket-colombia-peru",
    title: "Onward Ticket for Colombia and Peru",
    h1: "Onward tickets for Colombia and Peru",
    description:
      "Airlines flying to Colombia and Peru often ask one-way passengers for an onward or return ticket. What to show and how to get a verifiable reservation.",
    intro:
      "Colombia and Peru both expect visitors to leave within their permitted stay, and airlines flying there often ask passengers on one-way tickets for proof of onward travel. It's one of the most common places backpackers get caught out at check-in.",
    sections: [
      {
        heading: "What to expect",
        paragraphs: [
          "The check usually happens at the airline desk, especially when flying in from the US or Europe. Immigration in Bogotá, Medellín or Lima may also ask.",
          "Check the current rules for your passport with Migración Colombia or Peru's Superintendencia Nacional de Migraciones before you fly.",
        ],
      },
      {
        heading: "Choosing an onward flight",
        paragraphs: [
          "A short flight to a neighbouring country, such as Bogotá to Panama City or Lima to Santiago, is a common choice.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Can I show a flight out of a neighbouring country instead?",
        a: "No. The flight needs to leave the country you're entering.",
      },
    ],
  },
  {
    slug: "onward-ticket-new-zealand",
    title: "Onward Ticket for New Zealand",
    h1: "Do you need an onward ticket for New Zealand?",
    description:
      "Visitors to New Zealand need to show they'll leave, and airlines check before boarding. What counts as an onward ticket and how to get a verifiable reservation.",
    intro:
      "New Zealand asks visitors to hold an onward or return ticket to a country they have the right to enter. Airlines check this before you board, and border officers can ask on arrival.",
    sections: [
      {
        heading: "What to expect",
        paragraphs: [
          "Airlines will usually ask one-way passengers for an onward flight at check-in. Most visitors also need an NZeTA or a visa before travelling.",
          "Check the current rules for your passport with Immigration New Zealand before you fly.",
        ],
      },
      {
        heading: "Choosing an onward flight",
        paragraphs: [
          "Auckland to Sydney, Brisbane or Fiji are short, common choices for an onward reservation.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Does the onward flight have to go back to my home country?",
        a: "No, but it needs to go somewhere you're allowed to enter.",
      },
    ],
  },
  {
    slug: "flight-itinerary-for-schengen-visa",
    title: "Flight Itinerary for a Schengen Visa (Without Buying a Ticket)",
    h1: "Flight itinerary for a Schengen visa application",
    description:
      "Most Schengen consulates ask for a flight reservation, not a paid ticket. How to get a verifiable round-trip itinerary for your visa appointment.",
    intro:
      "A Schengen visa application usually asks for a flight itinerary showing how you'll arrive and leave. Many consulates say outright that you shouldn't buy a ticket before the visa is granted, and a reservation is enough.",
    sections: [
      {
        heading: "What consulates want",
        paragraphs: [
          "A round trip, or an entry and exit, that matches the dates on your application. The reservation should show your name exactly as it appears in your passport.",
          "Requirements vary by country and by visa centre, so read the checklist from the consulate you're applying to. Some ask for more than a reservation.",
        ],
      },
      {
        heading: "Timing it to your appointment",
        paragraphs: [
          "Book the reservation a day or two before your appointment so it's still live when your documents are reviewed.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need a return flight or just one way?",
        a: "Most Schengen applications expect a round trip, or at least a confirmed way out of the Schengen area. A round-trip reservation covers both.",
      },
      {
        q: "What if the reservation expires before a decision?",
        a: "That's normal and expected. Consulates assess your plans, and they advise against buying a ticket until the visa is granted.",
      },
    ],
  },
  {
    slug: "one-way-ticket-denied-boarding",
    title: "Denied Boarding on a One-Way Ticket? How to Avoid It",
    h1: "Denied boarding on a one-way ticket: how to avoid it",
    description:
      "Why airlines refuse to board passengers on one-way tickets, which countries trigger the check, and how to sort out an onward ticket in minutes at the airport.",
    intro:
      "If an airline flies you somewhere and you're refused entry, the airline has to fly you back and can be fined. So their check-in staff ask one-way passengers to prove they'll leave. If you can't, they can refuse to board you.",
    sections: [
      {
        heading: "Which trips trigger the check",
        paragraphs: [
          "One-way flights to countries with an onward travel requirement, such as the Philippines, Thailand, Indonesia, Costa Rica, Colombia, Peru and New Zealand, are the most common. The airline's system flags you automatically.",
        ],
      },
      {
        heading: "Fixing it at the airport",
        paragraphs: [
          "An onward ticket service can issue a real reservation within minutes, from your phone, at the check-in desk. Show the agent the booking reference and they can confirm it on their system.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Can the airline really stop me boarding?",
        a: "Yes. Airlines can refuse carriage if you don't meet the entry requirements of your destination, and proof of onward travel is one of them.",
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Guides are written in English only; other locales don't get these pages. */
export const GUIDE_LOCALE = "en";
