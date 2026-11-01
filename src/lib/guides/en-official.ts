/**
 * Guides on official entry schemes (ETIAS, EES, ETAs, arrival cards), transit
 * visas, and reference tables built from the checked country facts. Every fact
 * here comes from the official page cited on that guide.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, name: string): GuideSource => ({
  label: `UK Foreign Office: ${name} entry requirements`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

const SRC_EEAS: GuideSource = {
  label: "EEAS: Schengen visa dos and don'ts (official EU guidance)",
  url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf",
};
const SRC_EES_LIVE: GuideSource = {
  label: "European Commission: the new Entry/Exit System went live on 12 October 2025",
  url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en",
};
const SRC_EES_FULL: GuideSource = {
  label: "Embassy of Poland: EES fully operational from 10 April 2026",
  url: "https://www.gov.pl/web/usa-en/entryexit-system---full-implementation-from-april-10th-2026",
};

/** Countries where the UK Foreign Office states an onward or return ticket rule. */
const ONWARD_ROWS: [string, string, string, string][] = [
  ["Barbados", "Must be able to show an onward or return ticket to enter", "barbados", "onward-ticket-barbados"],
  ["Canada", "Border officials may ask for a return or onward ticket and proof of funds", "canada", "onward-ticket-canada"],
  ["Cuba", "Must show proof of onward or return travel", "cuba", "onward-ticket-cuba"],
  ["Dominican Republic", "May be refused entry without proof of onward or return travel", "dominican-republic", "onward-ticket-dominican-republic"],
  ["Ecuador", "May be asked for proof of a return or onward journey", "ecuador", "onward-ticket-ecuador"],
  ["Indonesia", "Proof of an onward or return journey needed for a visa on arrival", "indonesia", "onward-ticket-bali-indonesia"],
  ["Mauritius", "Must be able to show proof of onward or return travel", "mauritius", "onward-ticket-mauritius"],
  ["Nicaragua", "May be refused entry without an onward ticket", "nicaragua", "onward-ticket-nicaragua"],
  ["Oman", "May need a return or onward ticket, accommodation proof and health insurance", "oman", "onward-ticket-oman"],
  ["Palau", "May need proof of onward or return travel", "palau", "onward-ticket-palau"],
  ["Papua New Guinea", "May need evidence of an onward flight ticket", "papua-new-guinea", "onward-ticket-papua-new-guinea"],
  ["Philippines", "Most UK visitors expected to have proof of return or onward travel", "philippines", "onward-ticket-philippines"],
  ["Samoa", "May need an onward or return ticket, funds and accommodation", "samoa", "onward-ticket-samoa"],
  ["Seychelles", "Return or onward ticket needed for the travel authorisation", "seychelles", "onward-ticket-seychelles"],
  ["South Korea", "Must have an onward or return ticket", "south-korea", "onward-ticket-south-korea"],
  ["Tanzania", "Must be ready to show a return or onward ticket at border control", "tanzania", "onward-ticket-tanzania"],
  ["Thailand", "May need evidence of onward or return travel and funds", "thailand", "onward-ticket-thailand"],
  ["Tonga", "May be asked for an onward or return ticket and funds", "tonga", "onward-ticket-tonga"],
  ["Trinidad and Tobago", "May need an onward or return ticket and proof of funds", "trinidad-and-tobago", "onward-ticket-trinidad-and-tobago"],
];

/** Passport validity rules from the UK Foreign Office, for British passports. */
const VALIDITY_ROWS: [string, string][] = [
  ["Albania", "3 months beyond departure"],
  ["Argentina", "Valid for your stay"],
  ["Australia", "Valid for your stay"],
  ["Bahamas", "6 months beyond departure"],
  ["Belize", "More than 3 months from arrival"],
  ["Bolivia", "6 months from arrival, 2 blank pages"],
  ["Brazil", "6 months from arrival"],
  ["Cambodia", "6 months from arrival"],
  ["Chile", "Valid beyond departure"],
  ["Cuba", "6 months from arrival and 3 months beyond departure"],
  ["Ecuador", "6 months from arrival"],
  ["Egypt", "6 months from arrival, 1 blank page"],
  ["Hong Kong", "1 month beyond departure"],
  ["India", "6 months from arrival, 2 blank pages"],
  ["Indonesia", "6 months from arrival, 2 blank pages"],
  ["Jamaica", "Valid for your stay, 2 blank pages"],
  ["Kenya", "6 months from arrival, 2 blank pages"],
  ["Malaysia", "6 months from arrival, undamaged"],
  ["Montenegro", "3 months beyond departure, issued within 10 years"],
  ["Morocco", "3 months from arrival, undamaged"],
  ["Namibia", "6 months from arrival, 3 blank pages"],
  ["Philippines", "6 months from arrival"],
  ["Singapore", "6 months from arrival"],
  ["South Africa", "30 days beyond departure, 2 blank pages"],
  ["South Korea", "Valid beyond departure (tourist stays)"],
  ["Taiwan", "6 months from arrival"],
  ["Thailand", "6 months from arrival, 1 blank page"],
  ["Türkiye", "150 days from arrival, 1 blank page"],
  ["Vietnam", "6 months from arrival, 2 blank pages"],
];

const VALIDITY_LINKS: Record<string, string> = {"Albania": "onward-ticket-albania", "Argentina": "onward-ticket-argentina", "Australia": "onward-ticket-australia", "Bahamas": "onward-ticket-bahamas", "Belize": "onward-ticket-belize", "Bolivia": "onward-ticket-bolivia", "Brazil": "onward-ticket-brazil", "Cambodia": "onward-ticket-cambodia", "Chile": "onward-ticket-chile", "Cuba": "onward-ticket-cuba", "Ecuador": "onward-ticket-ecuador", "Egypt": "onward-ticket-egypt", "Hong Kong": "onward-ticket-hong-kong", "India": "onward-ticket-india", "Indonesia": "onward-ticket-bali-indonesia", "Jamaica": "onward-ticket-jamaica", "Kenya": "onward-ticket-kenya", "Malaysia": "onward-ticket-malaysia", "Montenegro": "onward-ticket-montenegro", "Morocco": "onward-ticket-morocco", "Namibia": "onward-ticket-namibia", "Philippines": "onward-ticket-philippines", "Singapore": "onward-ticket-singapore", "South Africa": "onward-ticket-south-africa", "South Korea": "onward-ticket-south-korea", "Taiwan": "onward-ticket-taiwan", "Thailand": "onward-ticket-thailand", "Türkiye": "onward-ticket-turkey", "Vietnam": "onward-ticket-vietnam"};

export const EN_OFFICIAL_GUIDES: Guide[] = [
  {
    key: "countries-that-require-onward-ticket",
    slug: "countries-that-require-onward-ticket",
    title: "Which Countries Require an Onward Ticket? (Official Sources)",
    h1: "Which countries require proof of onward travel?",
    description:
      "A list of countries where official UK government travel advice says visitors need, or may be asked for, a return or onward ticket, with the exact rule and a link to each source.",
    intro:
      "Plenty of websites list countries that \"require\" an onward ticket, usually without saying where the rule comes from. This list only includes countries where the UK Foreign Office's entry requirements page says it, and gives the wording for each one. It's written for British passports, but most of these checks apply to other visa-free visitors too.",
    table: {
      caption: "Countries where the UK Foreign Office mentions an onward or return ticket rule",
      headers: ["Country", "What the official advice says"],
      rows: ONWARD_ROWS.map(([c, rule]) => [c, rule]),
      rowLinks: ONWARD_ROWS.map(([, , , slug]) => slug),
      note: "Checked against each country's GOV.UK entry requirements page. Airlines can also ask for onward travel to countries not on this list.",
    },
    sections: [
      {
        heading: "\"Must\" versus \"may\"",
        paragraphs: [
          "Some countries say visitors must have an onward ticket (Barbados, Cuba, South Korea, Tanzania); others say you may be asked for one, or may be refused entry without it. In practice both get enforced at airline check-in, because an airline that flies in a passenger who's refused entry has to fly them back.",
          "Countries not on this list can still be checked. Airlines use their own document databases, and one-way passengers to places like Costa Rica, Peru or New Zealand are regularly asked even where the UK advice is silent.",
        ],
      },
      {
        heading: "What counts as onward travel",
        paragraphs: [
          "A booking that leaves the country within the time you're allowed to stay, with a reference the agent can look up. It doesn't have to go home.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Is this list the same for every passport?",
        a: "No. It comes from UK government advice for British passport holders. Other nationalities can face the same checks or stricter ones, so check the destination's official site for your passport.",
      },
      {
        q: "Why isn't Costa Rica or New Zealand on the list?",
        a: "Because this list only includes countries where the UK advice explicitly mentions an onward ticket. Those countries do expect visitors to show onward travel, and airlines check it; see their own guides.",
      },
    ],
    sources: ONWARD_ROWS.map(([c, , slug]) => fcdo(slug, c)),
    checked: CHECKED,
  },
  {
    key: "passport-validity-by-country",
    slug: "passport-validity-by-country",
    title: "Passport Validity Rules by Country: the 6-Month Rule Explained",
    h1: "How much passport validity do you need? Rules by country",
    description:
      "Which countries need six months on your passport, which only need it valid for your stay, and which want blank pages, from official UK government travel advice.",
    intro:
      "\"Six months' validity\" is the rule most people have heard of, but it isn't universal. Some countries count from arrival, some from departure, some only need the passport valid for your stay, and several want blank pages too. Airlines check this at the desk, so it can stop you boarding just like a missing onward ticket.",
    table: {
      caption: "Passport validity for British passport holders, by country",
      headers: ["Country", "Requirement"],
      rows: VALIDITY_ROWS,
      rowLinks: VALIDITY_ROWS.map(([c]) => VALIDITY_LINKS[c] ?? null),
      note: "From each country's GOV.UK entry requirements page. Other passports can have different rules.",
    },
    sections: [
      {
        heading: "From arrival or from departure?",
        paragraphs: [
          "Read the wording carefully. Türkiye wants 150 days from the date you arrive; the Bahamas wants six months from the date you leave; Hong Kong wants one month after you leave. If you're close to the limit, the difference matters.",
          "For the Schengen area, the EU's rule for visa applicants is at least three months beyond the date you plan to leave, with a passport issued within the last ten years.",
        ],
      },
      {
        heading: "Blank pages",
        paragraphs: [
          "South Africa, Kenya, India, Vietnam, Bolivia and Jamaica want two blank pages; Namibia wants three. Airlines can refuse boarding if you don't have them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does the 6-month rule apply everywhere?",
        a: "No. Many countries only need the passport valid for your stay, and some use three months or 150 days. Check the specific country.",
      },
    ],
    sources: [
      ...VALIDITY_ROWS.map(([c]) => fcdo(c === "Türkiye" ? "turkey" : c.toLowerCase().replace(/ /g, "-"), c)),
      SRC_EEAS,
    ],
    checked: CHECKED,
  },
  {
    key: "etias-explained",
    slug: "etias-europe-travel-authorisation",
    title: "ETIAS Explained: Cost, Who Needs It and When It Starts",
    h1: "ETIAS: the new travel authorisation for Europe",
    description:
      "What ETIAS is, the €20 fee and who's exempt, when the EU expects it to start, and how it fits with return tickets and the 90-day rule.",
    intro:
      "ETIAS is an online travel authorisation that visa-free visitors will need before travelling to most European countries, similar to the US ESTA. It doesn't replace a visa for people who need one, and it doesn't change the 90-days-in-180 rule.",
    sections: [
      {
        heading: "Cost and exemptions",
        paragraphs: [
          "The European Commission set the ETIAS fee at €20, up from the €7 first planned. Travellers under 18 or over 70 are exempt from paying.",
        ],
      },
      {
        heading: "When it starts",
        paragraphs: [
          "In July 2025 the Commission said ETIAS would start operating at the end of 2026, after the Entry/Exit System was fully running. Launch dates have slipped before, so check the official EU travel site for whether it's live when you travel.",
        ],
      },
      {
        heading: "What it doesn't change",
        paragraphs: [
          "ETIAS doesn't change what border guards can ask you for at the border, which can include proof of your plans to leave. One-way arrivals are still the ones most likely to be asked for a return or onward ticket.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need ETIAS if I have a Schengen visa?",
        a: "No. ETIAS is for travellers who don't need a visa. Visa holders keep applying for visas as before.",
      },
      {
        q: "How much does ETIAS cost?",
        a: "€20, with under-18s and over-70s exempt, according to the European Commission.",
      },
    ],
    sources: [
      { label: "European Commission: ETIAS will cost €20", url: "https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en" },
    ],
    checked: CHECKED,
  },
  {
    key: "ees-entry-exit-system",
    slug: "ees-entry-exit-system-europe",
    title: "EES: Europe's Entry/Exit System and the End of Passport Stamps",
    h1: "The EU Entry/Exit System (EES), explained",
    description:
      "Europe's Entry/Exit System replaced passport stamps for non-EU visitors. When it started, what it means for the 90-day rule, and why it makes overstays easy to spot.",
    intro:
      "Since 12 October 2025, non-EU travellers on short stays have been registered electronically when they cross the external borders of participating European countries, instead of getting a stamp. The system has been fully operational since 10 April 2026.",
    sections: [
      {
        heading: "What changed",
        paragraphs: [
          "EES records each entry and exit digitally and replaces passport stamping in most of Europe. It applies to travellers from outside the EU on short visits, whether or not they need a visa.",
        ],
      },
      {
        heading: "Why it matters for the 90-day rule",
        paragraphs: [
          "Short stays are limited to 90 days in any 180-day period across the whole Schengen area. With stamps, officers counted by hand; with EES the count is automatic, so an overstay shows up immediately at exit or on your next trip.",
          "If you're planning a long trip through Europe, book your exit within your 90 days and keep the booking to hand. Border guards can still ask how and when you'll leave.",
          TIMING_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Will I still get a passport stamp in Europe?",
        a: "In most participating countries, no. EES replaced stamping and has been fully operational since 10 April 2026.",
      },
      {
        q: "Does EES apply if I have a visa?",
        a: "Yes. It covers non-EU short-stay travellers whether they're visa-free or hold a Schengen visa.",
      },
    ],
    sources: [SRC_EES_LIVE, SRC_EES_FULL, SRC_EEAS],
    checked: CHECKED,
  },
  {
    key: "uk-eta",
    slug: "uk-eta-electronic-travel-authorisation",
    title: "UK ETA: Cost, Who Needs It and Transit Rules",
    h1: "The UK Electronic Travel Authorisation (ETA)",
    description:
      "Most visa-free visitors to the UK now need an ETA. What it costs, how long you can stay, who doesn't need one, and when you need it for a connection.",
    intro:
      "Most visitors who don't need a UK visa, including Europeans, Americans, Canadians and Australians, now need an Electronic Travel Authorisation (ETA) before they travel. It also covers Jersey, Guernsey and the Isle of Man.",
    sections: [
      {
        heading: "Cost and length of stay",
        paragraphs: [
          "An ETA costs £20 when you apply through the official GOV.UK service. Other websites may charge more. It lets you visit for up to six months at a time, but doesn't guarantee entry.",
          "Everyone travelling needs their own ETA, including babies and children. British and Irish citizens, and people with permission to live, work or study in the UK, don't need one.",
        ],
      },
      {
        heading: "Connections",
        paragraphs: [
          "You need an ETA if you'll pass through UK border control while changing flights. If you're not sure whether your connection goes through border control, ask your airline.",
        ],
      },
      {
        heading: "Showing you'll leave",
        paragraphs: [
          "An ETA doesn't replace the usual visitor rules: you may be asked how long you're staying and how you'll leave. A booked departure within six months answers that.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "How much is a UK ETA?", a: "£20 on the official GOV.UK service. Avoid sites that charge more." },
      { q: "Do children need a UK ETA?", a: "Yes. Every traveller needs their own, including babies and children." },
    ],
    sources: [{ label: "GOV.UK: apply for an electronic travel authorisation (ETA)", url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta" }],
    checked: CHECKED,
  },
  {
    key: "canada-eta",
    slug: "canada-eta-electronic-travel-authorization",
    title: "Canada eTA: Cost, Who Needs It and Onward Tickets",
    h1: "Canada's eTA (Electronic Travel Authorization)",
    description:
      "Visa-exempt travellers flying to or through Canada need an eTA. The CAD 7 cost, who needs one, and what Canadian border officers can ask for.",
    intro:
      "Visa-exempt foreign nationals who fly to Canada, or transit through a Canadian airport, need an Electronic Travel Authorization. It costs CAD 7 on the official Government of Canada site.",
    sections: [
      {
        heading: "Who needs it",
        paragraphs: [
          "Travellers from visa-exempt countries arriving by air or connecting through a Canadian airport. It isn't needed for arrivals by land or sea. Dual Canadian citizens need a Canadian passport instead.",
          "Some nationalities that otherwise need a visa can use an eTA under conditions, such as Mexicans who have held a Canadian visa in the past ten years or hold a valid US nonimmigrant visa and are flying in.",
        ],
      },
      {
        heading: "Return tickets and funds",
        paragraphs: [
          "The UK Foreign Office warns that Canadian border officials may ask to see a return or onward ticket and proof of sufficient funds, even if you're staying with friends or family.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "How much is a Canada eTA?", a: "CAD 7 on the official Government of Canada website." },
      { q: "Do I need an eTA to drive into Canada from the US?", a: "No. The eTA is for air travel. Land and sea arrivals don't need one, though visa rules still apply." },
    ],
    sources: [
      { label: "Government of Canada: Electronic Travel Authorization (eTA)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html" },
      fcdo("canada", "Canada"),
    ],
    checked: CHECKED,
  },
  {
    key: "thailand-digital-arrival-card",
    slug: "thailand-digital-arrival-card-tdac",
    title: "Thailand Digital Arrival Card (TDAC) and the 30-Day Visa Exemption",
    h1: "Thailand's Digital Arrival Card (TDAC) and entry checks",
    description:
      "Every foreign arrival in Thailand must fill in the TDAC online. When to do it, the 30-day visa-exempt stay, and the funds and onward travel immigration can ask for.",
    intro:
      "All foreign nationals arriving in Thailand by air, land or sea must complete the Thailand Digital Arrival Card (TDAC) online before arrival. It's one of three things that can trip you up, alongside proof of funds and onward travel.",
    sections: [
      {
        heading: "When to fill it in",
        paragraphs: ["Complete the TDAC online within the three days before you arrive. Use the official Thai government site only."],
      },
      {
        heading: "The 30-day visa exemption",
        paragraphs: [
          "For British visitors, the UK Foreign Office says entry under the visa exemption scheme now allows up to 30 days, for tourism only. Thailand's rules have changed several times, so check the current allowance for your passport.",
        ],
      },
      {
        heading: "Funds and onward travel",
        paragraphs: [
          "Immigration may ask for proof of funds of at least 10,000 baht per person or 20,000 baht per family, and for evidence of onward or return travel. Airlines check the onward part at the desk.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "Is the Thailand Digital Arrival Card free?", a: "Yes, on the official site. Fill it in within three days before arrival." },
      { q: "How much money do I need to enter Thailand?", a: "Immigration can ask for at least 10,000 baht per person or 20,000 baht per family, according to the UK Foreign Office." },
    ],
    sources: [fcdo("thailand", "Thailand")],
    checked: CHECKED,
  },
  {
    key: "malaysia-digital-arrival-card",
    slug: "malaysia-digital-arrival-card-mdac",
    title: "Malaysia Digital Arrival Card (MDAC): When You Need It",
    h1: "Malaysia's Digital Arrival Card (MDAC)",
    description:
      "Travellers entering Malaysia complete a digital arrival card before they travel, and airlines may ask for it at check-in. Who needs it and what else to have ready.",
    intro:
      "Visitors to Malaysia complete the Malaysia Digital Arrival Card online before travelling, and airlines may ask to see it at check-in. If you're only transiting without passing through immigration, you don't need one.",
    sections: [
      {
        heading: "The rules",
        paragraphs: [
          "British visitors don't need a visa for tourism and are normally allowed 90 days on arrival. Passports need six months' validity from arrival and must be undamaged, with no missing pages.",
        ],
      },
      {
        heading: "Flying in one-way",
        paragraphs: [
          "The UK advice doesn't list an onward-ticket rule for Malaysia, but airlines can still ask one-way passengers how they'll leave. Short hops to Singapore, Bangkok or Bali are common exits.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [{ q: "Do I need the MDAC if I'm only transiting KLIA?", a: "Not if you don't pass through immigration, according to the UK Foreign Office." }],
    sources: [fcdo("malaysia", "Malaysia")],
    checked: CHECKED,
  },
  {
    key: "singapore-arrival-card",
    slug: "sg-arrival-card-singapore",
    title: "SG Arrival Card: When to Fill It In Before Flying to Singapore",
    h1: "Singapore's SG Arrival Card",
    description:
      "Visitors to Singapore must complete the electronic SG Arrival Card in the three days before arrival. What it includes and how long you can stay.",
    intro:
      "Visitors must complete the electronic SG Arrival Card, which includes a health declaration, in the three days before arriving in Singapore. Submitting a false declaration is an offence.",
    sections: [
      {
        heading: "How long you can stay",
        paragraphs: [
          "British citizens can visit without a visa for tourism or business. The immigration officer decides the length of stay, normally between 30 and 90 days. Passports need six months' validity from arrival.",
        ],
      },
      {
        heading: "Onward travel",
        paragraphs: [
          "Airlines flying into Singapore may still ask one-way passengers for an onward booking. Kuala Lumpur, Bangkok, Bali and Jakarta are common short exits.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [{ q: "When should I complete the SG Arrival Card?", a: "In the three days before you arrive in Singapore." }],
    sources: [fcdo("singapore", "Singapore")],
    checked: CHECKED,
  },
  {
    key: "philippines-etravel",
    slug: "philippines-etravel-registration",
    title: "Philippines eTravel Registration and Onward Ticket Rules",
    h1: "Philippines eTravel: registration, QR code and onward tickets",
    description:
      "Everyone arriving in the Philippines needs an eTravel QR code. When to register, the 30-day visa-free stay, and the onward ticket most visitors are expected to show.",
    intro:
      "Arrivals in the Philippines must register on the free eTravel system in the three days before arrival and show the QR code. Most visitors are also expected to have proof of return or onward travel.",
    sections: [
      {
        heading: "eTravel",
        paragraphs: ["Registration is free and must be done in the three days before you arrive. Keep the QR code on your phone and a screenshot."],
      },
      {
        heading: "Stay length and onward travel",
        paragraphs: [
          "British visitors can stay up to 30 days without a visa and can apply to extend once in the country. The UK Foreign Office says most UK visitors are expected to have proof of return or onward travel, and both immigration and airlines may ask.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [{ q: "Is eTravel free?", a: "Yes. Register in the three days before arrival and avoid sites that charge." }],
    sources: [fcdo("philippines", "Philippines")],
    checked: CHECKED,
  },
  {
    key: "indonesia-e-voa-bali-levy",
    slug: "indonesia-visa-on-arrival-bali-levy",
    title: "Indonesia Visa on Arrival, e-VOA and Bali Tourist Levy",
    h1: "Indonesia's visa on arrival, e-VOA and the Bali tourist levy",
    description:
      "What you need to land in Bali or Jakarta: the 30-day visa on arrival and its onward ticket rule, the online customs declaration, and the Bali levy.",
    intro:
      "Most visitors to Indonesia use a 30-day visa on arrival, either online in advance (e-VOA) or at the airport. To get it you need proof of an onward or return journey.",
    sections: [
      {
        heading: "The visa on arrival",
        paragraphs: [
          "For British visitors, the visa on arrival costs 500,000 rupiah, payable by cash or card, is single entry and lasts 30 days. If you apply online for the e-VOA, do it at least a week before you leave.",
          "Proof of an onward or return journey is a condition of the visa, so airlines flying to Indonesia check it at the desk.",
        ],
      },
      {
        heading: "Before you land",
        paragraphs: [
          "Complete the free online customs and health declaration within 72 hours of arrival. Bali also charges foreign tourists a levy of 150,000 rupiah, paid online or on arrival.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "Do I need an onward ticket for Bali?", a: "Yes, proof of an onward or return journey is required for the visa on arrival." },
      { q: "How much is the Bali tourist levy?", a: "150,000 rupiah, paid online or on arrival." },
    ],
    sources: [fcdo("indonesia", "Indonesia")],
    checked: CHECKED,
  },
  {
    key: "schengen-airport-transit-visa",
    slug: "schengen-airport-transit-visa",
    title: "Schengen Airport Transit Visa: Who Needs One to Change Planes",
    h1: "Do you need an airport transit visa to change planes in Europe?",
    description:
      "Nationals of 12 countries need an airport transit visa to change flights in a Schengen airport. The list, the common exemptions, and what to check before booking.",
    intro:
      "Changing planes in a Schengen airport without leaving the international zone normally needs no visa. The exception is nationals of a short common EU list, who need an airport transit visa, unless they hold certain visas or residence permits.",
    sections: [
      {
        heading: "The common list",
        paragraphs: [
          "The EU-wide list covers nationals of Afghanistan, Bangladesh, the Democratic Republic of the Congo, Eritrea, Ethiopia, Ghana, Iran, Iraq, Nigeria, Pakistan, Somalia and Sri Lanka. Individual Schengen countries can add more nationalities for their own airports, so check the country where you'll connect.",
        ],
      },
      {
        heading: "Common exemptions",
        paragraphs: [
          "Holders of a valid Schengen visa or residence permit, or a valid residence permit from countries such as the US, Canada, Japan, Andorra, Monaco, San Marino or Switzerland that lets them return, are typically exempt. Air crew are exempt too.",
          "If you need a transit visa, the application usually asks for the onward flight details, so have the full itinerary ready.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "Do Nigerians need a transit visa for Amsterdam or Frankfurt?", a: "Nigeria is on the common EU airport transit visa list, so yes, unless an exemption applies, such as a valid Schengen visa or a US or Canadian residence permit." },
    ],
    sources: [{ label: "Latvian Office of Citizenship and Migration Affairs: airport transit visas (common EU list)", url: "https://www.pmlp.gov.lv/en/airport-transit" }],
    checked: CHECKED,
  },
  {
    key: "uk-transit-visa",
    slug: "uk-transit-visa-direct-airside",
    title: "UK Transit Visa: Direct Airside vs Visitor in Transit",
    h1: "Do you need a UK transit visa?",
    description:
      "When you need a Direct Airside Transit visa or a Visitor in Transit visa to connect through the UK, and when an ETA or another visa covers you instead.",
    intro:
      "Whether you need a UK transit visa depends on your nationality and whether your connection takes you through UK border control. Use the GOV.UK checker for your passport; here's how the options fit together.",
    sections: [
      {
        heading: "The two transit visas",
        paragraphs: [
          "A Direct Airside Transit visa is for changing flights without going through UK border control. A Visitor in Transit visa is for going through border control and leaving within 48 hours. Longer stays, or frequent transits over more than six months, need a Standard Visitor visa.",
        ],
      },
      {
        heading: "When you don't need one",
        paragraphs: [
          "You don't need a transit visa if you hold a UK ETA, a Standard Visitor visa, a Marriage Visitor visa, an EU Settlement Scheme family permit, or a Home Office travel document. Your airline can tell you whether your connection goes through border control.",
          "Either way, have your onward flight details ready: transit is by definition about leaving again.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "Do Colombians need a UK transit visa?", a: "Since 26 November 2024, Colombian nationals need a direct airside transit visa to transit the UK, unless an exemption applies." },
    ],
    sources: [
      { label: "GOV.UK: transit visas", url: "https://www.gov.uk/transit-visa" },
      { label: "GOV.UK: explanatory memorandum HC 334 (Colombia)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024/explanatory-memorandum-to-the-statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024-accessible" },
    ],
    checked: CHECKED,
  },
  {
    key: "esta-cost-and-return-ticket",
    slug: "esta-cost-and-return-ticket",
    title: "ESTA Cost in 2026 ($40) and the Return Ticket Rule",
    h1: "ESTA: the $40 fee and the return ticket requirement",
    description:
      "The ESTA fee rose to $40 on 30 September 2025. What ESTA covers, and why Visa Waiver travellers need a return or onward ticket.",
    intro:
      "The fee for an ESTA, the online authorisation for Visa Waiver Program travellers to the US, went up from $21 to $40 on 30 September 2025. Pay it only on the official CBP site.",
    sections: [
      {
        heading: "The return ticket rule",
        paragraphs: [
          "Visa Waiver travellers must hold a return or onward ticket when they fly to the US, and airlines check it before boarding. Time in Canada, Mexico and nearby islands generally counts toward the 90 days, so a hop across the border doesn't reset your stay.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [{ q: "How much does ESTA cost?", a: "$40 since 30 September 2025, on the official CBP site." }],
    sources: [
      { label: "Fragomen: DHS implements new fees for ESTA, EVUS and land-border I-94", url: "https://www.fragomen.com/insights/united-states-dhs-announces-implementation-of-new-fees-for-esta-evus-and-land-border-i-94-forms-starting-september-30.html" },
      { label: "Official ESTA application site (CBP)", url: "https://esta.cbp.dhs.gov/" },
    ],
    checked: CHECKED,
  },
];
