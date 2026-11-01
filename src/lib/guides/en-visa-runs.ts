/**
 * Visa run and border run guides. Facts (stay lengths, caps, onward rules) are
 * from the UK Foreign Office entry requirements page for each country, for
 * British passports, as the pages say. They don't promise a run will work:
 * officers decide entry, and repeated runs draw attention.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, name: string): GuideSource => ({
  label: `UK Foreign Office: ${name} entry requirements`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

type Run = {
  id: string;
  country: string;
  the?: boolean;
  /** Visa-free or visa-on-arrival stay, short, for the table. */
  stay: string;
  /** Does a run reset the clock? short, for the table. */
  reset: string;
  rules: string[];
  exits: string;
  onward: string;
  alternative?: string;
  faq: GuideFaq;
  sources: GuideSource[];
};

const CAUTION =
  "Officers decide every entry. Back-to-back runs with only a few hours outside the country are what gets people questioned or refused, so leave a real gap, carry proof of funds and accommodation, and be honest about your plans.";

const RUNS: Run[] = [
  {
    id: "thailand", country: "Thailand", stay: "30 days visa-exempt", reset: "New entry, at the officer's discretion",
    rules: [
      "For British visitors, entry under Thailand's visa exemption scheme now allows up to 30 days, for tourism only. Immigration may ask for proof of funds (10,000 baht per person, 20,000 per family) and evidence of onward or return travel, and everyone must complete the TDAC digital arrival card in the three days before arrival.",
    ],
    exits: "Kuala Lumpur or Penang by air, Vientiane via the Friendship Bridge, Phnom Penh or Siem Reap",
    onward: "Flying back into Thailand counts as a new arrival, so the airline will want to see a flight out within your new 30 days. Book it before you leave for the run.",
    alternative: "If you're staying for months, the Destination Thailand Visa (DTV) allows 180 days per entry over five years and removes the need for runs.",
    faq: { q: "How many visa runs can I do from Thailand?", a: "There's no fixed number in the UK advice, but officers can refuse visa-exempt entry if it looks like you're living in Thailand. For long stays, a DTV or other visa is the safer route." },
    sources: [fcdo("thailand", "Thailand"), { label: "Royal Thai Embassy, London: Destination Thailand Visa", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" }],
  },
  {
    id: "vietnam", country: "Vietnam", stay: "45 days visa-free, or 90-day e-visa", reset: "New entry; e-visa is multiple-entry",
    rules: [
      "British visitors can enter Vietnam visa-free for up to 45 days, or get an e-visa allowing 90 days with multiple entries. An e-visa only works at the entry and exit points you chose when you applied.",
    ],
    exits: "Phnom Penh or Siem Reap, Vientiane or Luang Prabang, Bangkok, Kuala Lumpur",
    onward: "On re-entry by air, airlines can check that you'll leave within your new stay. If you're crossing by land on an e-visa, make sure that crossing is on your application.",
    alternative: "A multiple-entry 90-day e-visa often makes a separate run unnecessary.",
    faq: { q: "Is a visa run needed on a Vietnam e-visa?", a: "Not within its 90 days, since it's multiple-entry. You only need to exit and re-enter through the points listed on it." },
    sources: [fcdo("vietnam", "Vietnam")],
  },
  {
    id: "malaysia", country: "Malaysia", stay: "Normally 90 days on arrival", reset: "New entry, at the officer's discretion",
    rules: [
      "British visitors are normally allowed 90 days on arrival without a visa. Complete the Malaysia Digital Arrival Card before travel; airlines may ask for it at check-in.",
    ],
    exits: "Singapore (by bus over the causeway or a short flight), Bangkok, Bali, Medan",
    onward: "A run to Singapore by land is common. Flying back in, have an onward flight within your next 90 days ready for the airline.",
    alternative: "Remote workers staying longer can apply for the DE Rantau pass, valid for 3 to 12 months and renewable up to 24.",
    faq: { q: "Does a trip to Singapore reset my Malaysia stay?", a: "Re-entering Malaysia is a new entry and the officer decides the length. Frequent short exits can lead to questions." },
    sources: [fcdo("malaysia", "Malaysia"), { label: "MDEC: DE Rantau Pass FAQ", url: "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf" }],
  },
  {
    id: "bali-indonesia", country: "Indonesia", stay: "30-day visa on arrival", reset: "New visa on each entry",
    rules: [
      "For British visitors, the visa on arrival lasts 30 days, costs 500,000 rupiah and is single entry. Proof of an onward or return journey is a condition of getting it, and Bali charges a separate tourist levy of 150,000 rupiah.",
    ],
    exits: "Singapore, Kuala Lumpur, Perth, Darwin",
    onward: "Each re-entry needs a new visa on arrival, and with it proof of onward travel. Airlines check this at the desk before you fly back to Bali.",
    alternative: "Remote workers staying up to a year can look at the E33G remote worker visa.",
    faq: { q: "Do I need an onward ticket after a Bali visa run?", a: "Yes. Every new visa on arrival requires proof of an onward or return journey." },
    sources: [fcdo("indonesia", "Indonesia")],
  },
  {
    id: "philippines", country: "Philippines", the: true, stay: "30 days visa-free", reset: "Extend in country instead",
    rules: [
      "British visitors can stay up to 30 days without a visa and can apply to extend once in the country. Most UK visitors are expected to have proof of return or onward travel, and arrivals must register on eTravel.",
    ],
    exits: "Hong Kong, Taipei, Kota Kinabalu, Singapore",
    onward: "Because extensions are available in the Philippines, a run is often unnecessary. If you do leave and come back, the onward-ticket check applies again.",
    faq: { q: "Do I need to leave the Philippines after 30 days?", a: "Not necessarily. You can apply to extend your stay once in the country." },
    sources: [fcdo("philippines", "Philippines")],
  },
  {
    id: "mexico", country: "Mexico", stay: "Up to 180 days, as stamped", reset: "New stamp, length at the officer's discretion",
    rules: [
      "British tourists don't need a visa. Your passport is stamped with the number of days you may stay, up to 180. At border control you may need to show a return or onward ticket and enough money for your stay. Land arrivals fill in an immigration form online.",
    ],
    exits: "Belize City, Guatemala City, Havana, or a US city if you hold US entry permission",
    onward: "Mexican officers decide how many days to give, and a return or onward booking for the length you ask for helps you get it.",
    faq: { q: "Can I get 180 days in Mexico?", a: "Up to 180 days is possible, but the stamp shows what the officer grants. A return or onward ticket and proof of funds support the request." },
    sources: [fcdo("mexico", "Mexico")],
  },
  {
    id: "costa-rica", country: "Costa Rica", stay: "Up to 180 days visa waiver", reset: "New entry",
    rules: [
      "British visitors can stay up to 180 days under Costa Rica's tourist visa waiver. Leaving by air, you may pay a departure tax of $29.",
    ],
    exits: "Panama (Paso Canoas or a flight to Panama City), Nicaragua, San Andrés",
    onward: "The classic run is to Panama by land, but Panama may ask for a return or onward ticket and $1,000 in funds, particularly from land arrivals from Costa Rica who aren't residents there. Coming back, Costa Rica expects onward travel too.",
    faq: { q: "Is a Panama border run from Costa Rica easy?", a: "It's common, but Panama can ask for a return or onward ticket and proof of $1,000 or a credit card, especially for land arrivals from Costa Rica." },
    sources: [fcdo("costa-rica", "Costa Rica"), fcdo("panama", "Panama")],
  },
  {
    id: "panama", country: "Panama", stay: "Up to 3 months", reset: "New entry",
    rules: [
      "British visitors can stay up to three months without a visa if arriving by land or air. Border control may ask for a return or onward ticket and proof of at least $1,000 or a credit card. Passports need six months' validity beyond departure and one blank page.",
    ],
    exits: "San José, Bogotá, Medellín, Cartagena",
    onward: "Have an onward booking for your re-entry, especially if you come back by land from Costa Rica.",
    faq: { q: "How much money do I need to enter Panama?", a: "At least $1,000 or a credit card may be asked for at the border." },
    sources: [fcdo("panama", "Panama")],
  },
  {
    id: "colombia", country: "Colombia", stay: "90 days (max 180 in 12 months)", reset: "No: capped at 180 days a year",
    rules: [
      "British visitors can stay up to 90 days, at the officer's discretion, but no more than 180 days in any 12-month period. You must be able to show an onward or return ticket valid within the 90 days. The Check-MIG form is optional but speeds things up.",
    ],
    exits: "Panama City, Quito, Lima, Aruba",
    onward: "A run doesn't get around the 180-day annual cap. Within it, every entry needs an onward ticket inside 90 days.",
    faq: { q: "Can I stay in Colombia longer by leaving and coming back?", a: "Only up to 180 days in any 12-month period as a visitor. After that, you need a different visa." },
    sources: [fcdo("colombia", "Colombia")],
  },
  {
    id: "peru", country: "Peru", stay: "90 in 180 days (max 183 a year)", reset: "No: capped",
    rules: [
      "British visitors normally get up to 90 days in a 180-day period, counted from first entry, and officers can grant a maximum of 183 days in 365 days. Overstaying brings a fine and possible detention.",
    ],
    exits: "La Paz, Santiago, Arica, Quito, Bogotá",
    onward: "Re-entering doesn't reset the 90-in-180 count. Airlines can still ask for onward travel on a one-way flight in.",
    faq: { q: "Does leaving Peru reset my days?", a: "No. The 90-in-180 and 183-in-365 limits count all your time in Peru." },
    sources: [fcdo("peru", "Peru")],
  },
  {
    id: "schengen", country: "the Schengen area", stay: "90 days in any 180", reset: "No: rolling 180-day window",
    rules: [
      "Short-stay visitors can spend 90 days in any 180-day period across all Schengen countries combined. Leaving for a weekend doesn't reset it: the count looks back 180 days from each day you're in.",
      "Since 12 October 2025 the Entry/Exit System has recorded entries and exits electronically instead of stamps, fully operational since 10 April 2026, so the count is automatic.",
    ],
    exits: "Non-Schengen countries such as the UK, Ireland, Albania, Montenegro, Serbia, Türkiye, Georgia or Morocco",
    onward: "A 'Schengen run' is really a break: spend the time outside, then come back with days available. Border guards can ask how you'll leave again.",
    faq: { q: "Can I do a visa run to reset my Schengen 90 days?", a: "No. The 90 days are counted over a rolling 180-day window, and time outside only helps by letting old days drop off." },
    sources: [
      { label: "EEAS: Schengen visa dos and don'ts (90 in 180 rule)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
      { label: "European Commission: Entry/Exit System went live on 12 October 2025", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
    ],
  },
  {
    id: "albania", country: "Albania", stay: "90 days in 180", reset: "Own 90/180 count",
    rules: [
      "British visitors can stay in Albania up to 90 days in a 180-day period, separate from the Schengen count, which makes it a popular place to spend a Schengen break.",
    ],
    exits: "Montenegro, North Macedonia, Kosovo, the ferry to Italy or Greece",
    onward: "Ferries and buses make it easy to arrive and leave without flying. If you fly in one-way, have a plan out within 90 days.",
    faq: { q: "Is Albania good for a Schengen break?", a: "Yes. Its 90-in-180 limit is separate from Schengen's." },
    sources: [fcdo("albania", "Albania")],
  },
  {
    id: "turkey", country: "Türkiye", stay: "90 days in 180", reset: "Own 90/180 count",
    rules: [
      "British visitors can stay in Türkiye up to 90 days in any 180-day period, separate from Schengen. Passports need 150 days' validity from arrival and a blank page.",
    ],
    exits: "Tbilisi, Athens, Sofia, Larnaca",
    onward: "Istanbul's connections make it easy to book an onward flight anywhere.",
    faq: { q: "Does Türkiye count toward Schengen days?", a: "No. It has its own 90-in-180 limit." },
    sources: [fcdo("turkey", "Türkiye")],
  },
  {
    id: "georgia", country: "Georgia", stay: "Up to 1 year", reset: "Rarely needed",
    rules: [
      "British visitors can stay in Georgia up to a year without a visa. All visitors must have health and accident insurance, or funds to cover medical treatment and repatriation.",
    ],
    exits: "Yerevan, Istanbul, Baku",
    onward: "With a year visa-free, runs are rarely needed. Flying in one-way, an airline may still ask how you'll leave.",
    faq: { q: "Do I need a visa run in Georgia?", a: "Usually not: British visitors can stay up to a year." },
    sources: [fcdo("georgia", "Georgia")],
  },
  {
    id: "south-korea", country: "South Korea", stay: "90 days", reset: "New entry, at the officer's discretion",
    rules: [
      "British visitors can stay up to 90 days and must have an onward or return ticket. They're exempt from K-ETA until 31 December 2026, and must submit an arrival card.",
    ],
    exits: "Fukuoka (including by ferry from Busan), Osaka, Tokyo, Taipei",
    onward: "Every entry needs an onward or return ticket, so book the exit before flying back in.",
    faq: { q: "Can I do a visa run from Korea to Japan?", a: "Many people do, but each return to Korea is a new entry at the officer's discretion and needs an onward or return ticket." },
    sources: [fcdo("south-korea", "South Korea")],
  },
  {
    id: "central-america-ca4", country: "Central America (CA-4)", stay: "90 days shared across 4 countries", reset: "Only by leaving the CA-4 area",
    rules: [
      "Guatemala, El Salvador, Honduras and Nicaragua form the CA-4 area. For British visitors, 90 days covers travel between Guatemala, El Salvador and Nicaragua combined and doesn't restart at their borders. Nicaragua warns you may be refused entry without an onward ticket.",
    ],
    exits: "Mexico, Belize or Costa Rica",
    onward: "Crossing between CA-4 countries isn't a run. Leave the area, and when you come back have an onward ticket out of the region.",
    faq: { q: "Does crossing from Guatemala to El Salvador reset my days?", a: "No. The CA-4 countries share one 90-day period." },
    sources: [fcdo("guatemala", "Guatemala"), fcdo("el-salvador", "El Salvador"), fcdo("nicaragua", "Nicaragua")],
  },
];

function build(r: Run): Guide {
  const name = r.the ? `the ${r.country}` : r.country;
  return {
    key: `visa-run-${r.id}`,
    slug: `visa-run-${r.id}`,
    title: `Visa Run from ${name}: Rules, Exits and Onward Tickets`,
    h1: `Visa runs from ${name}: what the rules allow`,
    description: `How long you can stay in ${name}, whether leaving and re-entering resets anything, the usual exits, and the onward ticket you'll need coming back.`,
    intro: `A visa run means leaving a country and coming back to start a new stay. Whether that works in ${name} depends on how its limits are counted. Here's what the official advice says.`,
    sections: [
      { heading: "The rules", paragraphs: [...r.rules, ...(r.alternative ? [r.alternative] : [])] },
      { heading: "Where people go", paragraphs: [`Common exits are ${r.exits}.`, CAUTION] },
      { heading: "Coming back: the onward ticket", paragraphs: [r.onward, TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [r.faq],
    sources: r.sources,
    checked: CHECKED,
  };
}

export const EN_VISA_RUN_GUIDES: Guide[] = [
  {
    key: "visa-runs-explained",
    slug: "visa-runs-explained",
    title: "Visa Runs Explained: Which Countries Reset and Which Don't",
    h1: "Visa runs and border runs: which countries reset your stay",
    description:
      "Where a visa run starts a new stay and where rolling limits like 90-in-180 make it pointless, with the onward ticket you need each time you come back.",
    intro:
      "Some countries count each entry separately, so leaving and coming back starts a fresh stay at the officer's discretion. Others use rolling or annual caps, where a run achieves nothing. This table sorts them out, using official UK government advice for British passports.",
    table: {
      caption: "Visa runs by country",
      headers: ["Country", "Visa-free stay", "Does a run reset it?"],
      rows: RUNS.map((r) => [r.country.replace(/^the /, "").replace(/^./, (c) => c.toUpperCase()), r.stay, r.reset]),
      rowLinks: RUNS.map((r) => `visa-run-${r.id}`),
      note: "For British passports, from GOV.UK entry requirements and EU sources. Officers decide every entry.",
    },
    sections: [
      {
        heading: "The one rule that applies everywhere",
        paragraphs: [
          "Every re-entry is a new arrival, and airlines treat you as a one-way passenger if you don't have a flight out. Book the onward leg before you fly back in.",
          CAUTION,
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "Are visa runs legal?", a: "Leaving and re-entering is legal where the rules count entries separately, but officers can refuse entry if they think you're living or working in the country as a tourist." },
    ],
    sources: [
      ...RUNS.flatMap((r) => r.sources.slice(0, 1)),
    ],
    checked: CHECKED,
  },
  ...RUNS.map(build),
];
