/**
 * Onward-ticket guides, second set of countries. Entry facts are checked against
 * the UK Foreign Office (FCDO) entry requirements page for each country, which
 * is written for British passport holders; the pages say so and tell other
 * nationalities to check their own rules. Where the FCDO says nothing about an
 * onward ticket, the page says that too, rather than inventing a rule.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide, GuideFaq } from "./types";

const CHECKED = "2026-11-01";

export type Country = {
  id: string;
  name: string;
  /** "in Vietnam" vs "in the Dominican Republic" */
  the?: boolean;
  fcdo: string;
  /** Visa rule for British visitors, as a full sentence. */
  entry: string;
  /** The FCDO's own words on onward travel, if it mentions it. */
  onward?: string;
  passport: string;
  /** Country-specific paragraph: arrival cards, e-visas, quirks. */
  extra: string;
  /** Common short exits for an onward booking. */
  exits: string;
  faq: GuideFaq;
  /** Optional extra official source. */
  source?: { label: string; url: string };
};

export function buildCountryGuide(c: Country): Guide {
  const name = c.the ? `the ${c.name}` : c.name;
  const Name = c.the ? `The ${c.name}` : c.name;
  const official = c.onward
    ? [
        `For British visitors, the UK Foreign Office says: ${c.onward} Other passports often face the same check, so expect it whatever your nationality.`,
      ]
    : [
        `The UK Foreign Office's entry advice for ${name} doesn't list an onward-ticket rule for British visitors. That doesn't mean nobody will ask: airlines apply their own checks to one-way passengers, and rules differ by nationality, so a one-way booking can still be questioned at check-in.`,
      ];
  return {
    key: `onward-ticket-${c.id}`,
    slug: `onward-ticket-${c.id}`,
    title: `Onward Ticket for ${Name}: Do You Need One?`,
    h1: `Do you need an onward ticket for ${name}?`,
    description: `What ${name}'s entry rules say about return or onward tickets, how long you can stay, passport validity, and what to show an airline if you're flying in one-way.`,
    intro: `${c.entry} If you're arriving on a one-way ticket, here's what the official guidance says about proof of onward travel, and what to have ready for the airline and the border.`,
    sections: [
      {
        heading: "What the rules say",
        paragraphs: [...official, c.passport],
      },
      { heading: `Good to know about ${name}`, paragraphs: [c.extra] },
      {
        heading: "If you're flying in one-way",
        paragraphs: [
          `Show a flight leaving ${name} within the time you're allowed to stay. Common short exits are ${c.exits}.`,
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      c.faq,
      {
        q: "Do these rules apply to my passport?",
        a: `The facts here come from the UK government's advice for British passport holders. Visa-free stays and documents differ by nationality, so check ${name}'s official immigration site or embassy for your passport before you fly.`,
      },
    ],
    sources: [
      { label: `UK Foreign Office: ${Name} entry requirements`, url: `https://www.gov.uk/foreign-travel-advice/${c.fcdo}/entry-requirements` },
      ...(c.source ? [c.source] : []),
    ],
    checked: CHECKED,
  };
}

const COUNTRIES: Country[] = [
  {
    id: "vietnam", name: "Vietnam", fcdo: "vietnam",
    entry: "British visitors can enter Vietnam without a visa for up to 45 days, or get an e-visa for up to 90 days with multiple entries.",
    passport: "Your passport needs at least six months' validity from the day you arrive and two blank pages.",
    extra: "An e-visa only lets you use the entry and exit points you chose when applying, so pick your border crossings carefully if you plan to leave overland to Cambodia or Laos.",
    exits: "Bangkok, Kuala Lumpur, Singapore, Phnom Penh or Vientiane",
    faq: { q: "Can I leave Vietnam by bus on an e-visa?", a: "Yes, but only through a crossing you listed on your e-visa application. Airlines may still want to see an onward flight when you fly in one-way." },
  },
  {
    id: "cambodia", name: "Cambodia", fcdo: "cambodia",
    entry: "British visitors need a visa for Cambodia: a 30-day tourist visa, either as an e-visa applied for at least four days ahead or on arrival at airports and land borders.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "If you fly into Phnom Penh, Siem Reap or Sihanoukville, you must submit the free e-Arrival Card within seven days before arrival. Visa-on-arrival fees are paid in US dollars.",
    exits: "Bangkok, Ho Chi Minh City, Kuala Lumpur or Singapore",
    faq: { q: "Is the Cambodian visa on arrival still available?", a: "Yes, at airports and land border crossings, paid in US dollars. An e-visa applied for at least four days ahead is the other option." },
  },
  {
    id: "brazil", name: "Brazil", fcdo: "brazil",
    entry: "British visitors can enter Brazil without a visa for up to 90 days for tourism.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "Brazil's visa rules for some nationalities, including US, Canadian and Australian citizens, changed in 2025 when it reintroduced e-visas for them. If you're not British, check your own requirement before booking.",
    exits: "Buenos Aires, Montevideo, Santiago, Asunción or Lima",
    faq: { q: "Do airlines check onward tickets for Brazil?", a: "They can, especially for one-way long-haul arrivals. Having a flight out within your 90 days avoids an argument at check-in." },
  },
  {
    id: "argentina", name: "Argentina", fcdo: "argentina",
    entry: "British visitors can enter Argentina without a visa for up to 90 days for tourism.",
    passport: "Your passport must be valid for the length of your stay.",
    extra: "Many travellers cross between Argentina and its neighbours by land or ferry, such as Buenos Aires to Montevideo or Colonia. A ferry or bus booking can show onward travel at a land border, but airlines flying you in usually want to see a flight.",
    exits: "Montevideo, Santiago, São Paulo, Asunción or Lima",
    faq: { q: "Does a ferry to Uruguay count as onward travel?", a: "At the border it can, but airlines checking you in for a one-way flight to Argentina usually look for an onward flight." },
  },
  {
    id: "chile", name: "Chile", fcdo: "chile",
    entry: "British visitors can visit Chile for up to 90 days without a visa.",
    passport: "Your passport must be valid beyond the day you plan to leave Chile.",
    extra: "Immigration (PDI) issues a tourist card on arrival; keep it and hand it in when you leave. Rapa Nui (Easter Island) has its own rules: visitors must show a return ticket and a registered accommodation booking or an invitation letter.",
    exits: "Buenos Aires, Lima, Mendoza, La Paz or São Paulo",
    faq: { q: "Do I need a return ticket for Easter Island?", a: "Yes. The UK Foreign Office says visitors to Rapa Nui must show a return ticket plus a registered accommodation booking or an invitation letter." },
  },
  {
    id: "ecuador", name: "Ecuador", fcdo: "ecuador",
    entry: "British visitors can enter Ecuador without a visa for up to 90 days in any 12-month period.",
    onward: "at border control you may be asked to show proof of a return or onward journey.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "The Galápagos have extra rules: a transit control card bought at the departure airport, evidence of a return flight to the mainland, a hotel booking or invitation letter, and mandatory travel health insurance. Stays there are limited to 60 days.",
    exits: "Bogotá, Lima, Panama City or Miami",
    faq: { q: "Do I need a return flight for the Galápagos?", a: "Yes, evidence of a return flight to mainland Ecuador, plus a transit control card, accommodation evidence and travel health insurance." },
  },
  {
    id: "samoa", name: "Samoa", fcdo: "samoa",
    entry: "British visitors can visit Samoa without a visa for up to 60 days.",
    onward: "you may need to show an onward or return ticket, sufficient funds (a bank statement is acceptable) and confirmed accommodation such as a hotel booking or letter of invitation.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "Flights to Samoa are limited, mostly via Auckland, Brisbane, Sydney, Nadi or Honolulu, so airlines check onward plans closely before boarding.",
    exits: "Auckland, Nadi, Brisbane or Sydney",
    faq: { q: "What else might Samoa ask for besides a ticket?", a: "Proof of funds, such as a bank statement, and confirmed accommodation or an invitation letter." },
  },
  {
    id: "tonga", name: "Tonga", fcdo: "tonga",
    entry: "British visitors can visit Tonga without a pre-arranged visa for up to 30 days.",
    onward: "border officials may ask for an onward or return ticket and sufficient funds (a bank statement is acceptable), and confirmed accommodation may also be requested.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "Most international flights to Tonga go via Auckland, Nadi or Sydney, so your onward booking will usually go back through one of those.",
    exits: "Auckland, Nadi or Sydney",
    faq: { q: "How long can I stay in Tonga?", a: "British visitors get up to 30 days without a pre-arranged visa. Your onward flight should fall within that." },
  },
  {
    id: "vanuatu", name: "Vanuatu", fcdo: "vanuatu",
    entry: "Visa rules for Vanuatu are set by its Department of Immigration and Passport Services, and the UK Foreign Office tells British travellers to check with it before travelling.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "Flights into Port Vila mostly come from Brisbane, Sydney, Auckland and Nadi. Check entry rules for your passport directly with Vanuatu's immigration department.",
    exits: "Brisbane, Sydney, Auckland or Nadi",
    faq: { q: "Where do I check Vanuatu's visa rules?", a: "With Vanuatu's Department of Immigration and Passport Services, which the UK Foreign Office points travellers to." },
  },
  {
    id: "belize", name: "Belize", fcdo: "belize",
    entry: "British visitors can visit Belize without a visa for 30 days.",
    passport: "Your passport needs more than three months' validity from the day you arrive.",
    extra: "Leaving by land, you pay a departure tax of 40 Belize dollars or 20 US dollars at the border; for air travellers it's usually included in the fare.",
    exits: "Cancún, Guatemala City, Flores, San Salvador or Miami",
    faq: { q: "Is there an exit fee leaving Belize?", a: "Yes, a departure tax of BZ$40 or US$20 at land borders. Air passengers usually have it included in their ticket." },
  },
  {
    id: "guatemala", name: "Guatemala", fcdo: "guatemala",
    entry: "British visitors can visit Guatemala for up to 90 days without a visa.",
    passport: "Your passport needs at least six months' validity from the day you arrive and two blank pages.",
    extra: "Guatemala is part of the CA-4 arrangement: your 90 days cover travel between Guatemala, El Salvador, Honduras and Nicaragua combined, so a hop between them doesn't reset the clock. Leaving the region, for example to Mexico or Belize, is what counts as exiting.",
    exits: "Mexico City, Cancún, San José, Panama City or Belize City",
    faq: { q: "Does a bus to El Salvador count as leaving Guatemala?", a: "Not for your 90 days, because El Salvador is in the CA-4 area. An onward flight should leave the CA-4 region." },
  },
  {
    id: "nicaragua", name: "Nicaragua", fcdo: "nicaragua",
    entry: "British visitors can visit Nicaragua for up to 90 days without a visa.",
    onward: "you may be refused entry if you do not have an onward ticket.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "Nicaragua is in the CA-4 area with Guatemala, El Salvador and Honduras, so time in those countries counts toward the same 90 days. Your onward ticket should leave the region, for example to Costa Rica or Panama.",
    exits: "San José, Panama City, Mexico City or Miami",
    faq: { q: "Can Nicaragua really refuse entry without an onward ticket?", a: "Yes. The UK Foreign Office warns British visitors they may be refused entry without one." },
  },
  {
    id: "dominican-republic", name: "Dominican Republic", the: true, fcdo: "dominican-republic",
    entry: "British visitors can visit the Dominican Republic for tourism without a visa for 30 days.",
    onward: "you may be refused entry if you do not have proof of onward or return travel when you arrive in the country.",
    passport: "Until the end of 2026, British passport holders can enter for tourism as long as the passport is valid for the whole visit; the rule may change after that.",
    extra: "Everyone must fill in the official e-ticket entry and exit form before arriving and before leaving. It's free on the government's migration website.",
    exits: "San Juan, Miami, Cancún, Bogotá or Panama City",
    faq: { q: "What is the Dominican Republic e-ticket?", a: "A free online entry and exit form that you must complete before arriving and before leaving. It isn't a flight ticket." },
    source: { label: "Dominican Republic e-ticket (official entry and exit form)", url: "https://eticket.migracion.gob.do/" },
  },
  {
    id: "jamaica", name: "Jamaica", fcdo: "jamaica",
    entry: "British visitors don't need a visa for Jamaica and are usually granted entry for up to 90 days.",
    passport: "Your passport must be valid for the length of your stay, with two blank pages for stamps.",
    extra: "Immigration officers decide how long you're admitted for, and an address in Jamaica and a planned departure date make the conversation quick.",
    exits: "Miami, Fort Lauderdale, Cancún, Panama City or Nassau",
    faq: { q: "How long can I stay in Jamaica?", a: "British visitors are usually granted up to 90 days; the officer decides on arrival." },
  },
  {
    id: "south-korea", name: "South Korea", fcdo: "south-korea",
    entry: "British visitors can stay in South Korea for up to 90 days for tourism or short business trips without a visa.",
    onward: "you must have an onward or return ticket.",
    passport: "For a tourist stay, your passport must be valid beyond the day you leave South Korea.",
    extra: "Visa-free visitors normally need a K-ETA before departure, but British nationals are temporarily exempt until 31 December 2026. Foreign visitors must submit an arrival card, which you can file online up to 72 hours before landing.",
    exits: "Tokyo, Osaka, Fukuoka, Taipei or Hong Kong",
    faq: { q: "Do British travellers need a K-ETA for Korea?", a: "Not until 31 December 2026, under a temporary exemption. Other visa-free nationalities may need one; check before you fly." },
  },
  {
    id: "taiwan", name: "Taiwan", fcdo: "taiwan",
    entry: "British visitors can visit Taiwan without a visa for up to 90 days.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "Declare cash over NT$100,000 or US$10,000 on arrival. Short flights to Japan, Hong Kong and Korea make an onward booking easy.",
    exits: "Hong Kong, Tokyo, Osaka, Seoul or Manila",
    faq: { q: "Do airlines ask for an onward ticket to Taiwan?", a: "They can for one-way passengers. A flight out within your permitted stay is the simplest proof." },
  },
  {
    id: "hong-kong", name: "Hong Kong", fcdo: "hong-kong",
    entry: "British visitors can visit Hong Kong for up to six months without a visa.",
    passport: "Your passport must be valid for at least one month after the day you plan to leave Hong Kong.",
    extra: "Many travellers go on to mainland China, Macau or Southeast Asia. Remember that mainland China has its own visa rules, so a trip there needs its own planning.",
    exits: "Taipei, Bangkok, Manila, Singapore or Macau by ferry",
    faq: { q: "Does a ferry to Macau count as leaving Hong Kong?", a: "Yes, Macau is outside Hong Kong's immigration control. Airlines checking you in for Hong Kong may still prefer to see an onward flight." },
  },
  {
    id: "sri-lanka", name: "Sri Lanka", fcdo: "sri-lanka",
    entry: "British visitors need an Electronic Travel Authorization (ETA) for Sri Lanka, issued free of charge and valid for 30 days.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "Apply for the ETA online before you travel. Staying longer than 30 days means an online extension; overstaying risks fines, detention or deportation.",
    exits: "Chennai, Malé, Dubai, Kuala Lumpur or Bangkok",
    faq: { q: "Is the Sri Lanka ETA really free?", a: "For British visitors, the UK Foreign Office says ETAs are issued free of charge and are valid for 30 days." },
  },
  {
    id: "nepal", name: "Nepal", fcdo: "nepal",
    entry: "British visitors need a visa for Nepal, available on arrival for stays of up to 90 days, and extendable online to a total of 150 days a year.",
    passport: "Your passport needs at least six months' validity from the day you arrive.",
    extra: "You can fill in the visa form online up to 15 days before arrival and pay at the airport. Border officials may ask to see travel insurance covering healthcare and repatriation and confirmation of your first night's accommodation.",
    exits: "Delhi, Doha, Dubai, Kuala Lumpur or Bangkok",
    faq: { q: "What might Nepal immigration ask to see?", a: "The UK Foreign Office mentions travel insurance with repatriation cover and confirmation of your first night's accommodation." },
  },
  {
    id: "turkey", name: "Türkiye", fcdo: "turkey",
    entry: "British visitors can visit Türkiye without a visa for up to 90 days in any 180-day period.",
    passport: "Your passport needs at least 150 days' validity from the day you arrive and one blank page.",
    extra: "Türkiye isn't in the Schengen area, so it's a popular exit for travellers managing their Schengen 90 days. Time in Türkiye counts toward its own 90-in-180 limit, not Schengen's.",
    exits: "Athens, Tbilisi, Sofia, Larnaca or anywhere in Europe",
    faq: { q: "Does time in Türkiye count toward my Schengen 90 days?", a: "No. Türkiye has its own 90-in-180-day limit for British visitors, separate from the Schengen area." },
  },
  {
    id: "morocco", name: "Morocco", fcdo: "morocco",
    entry: "British visitors can visit Morocco without a visa for up to 90 days for tourism.",
    passport: "Your passport needs at least three months' validity from the day you arrive, and should be undamaged, since damaged passports have been refused.",
    extra: "Staying beyond 90 days means asking for an extension at a police station. Ferries to Spain make Morocco an easy exit from, or entry to, the Schengen area.",
    exits: "Madrid, Málaga, Lisbon, Paris or the ferry to Spain",
    faq: { q: "Can I extend my stay in Morocco?", a: "Yes, by requesting an extension at a Moroccan police station before your 90 days run out." },
  },
  {
    id: "south-africa", name: "South Africa", fcdo: "south-africa",
    entry: "British visitors can visit South Africa without a visa for up to 90 days for business or tourism.",
    passport: "Your passport must be valid for at least 30 days after you leave South Africa and have at least two blank pages.",
    extra: "The two-blank-pages rule is strictly enforced, and airlines may refuse boarding if you don't have them. Many trips continue overland to Namibia, Botswana or Mozambique.",
    exits: "Windhoek, Gaborone, Maputo, Victoria Falls or Nairobi",
    faq: { q: "Why does South Africa need two blank pages?", a: "The UK Foreign Office lists at least two blank pages as an entry requirement, and travellers without them can be refused." },
  },
  {
    id: "laos", name: "Laos", fcdo: "laos",
    entry: "British visitors need a visa for Laos: a single-entry e-visa applied for at least five days ahead, or a visa on arrival at major airports and many borders. Tourist visas are valid for 30 days from arrival.",
    passport: "Your passport needs at least six months' validity from the day you arrive and two blank pages.",
    extra: "The e-visa is only accepted at major entry points, including Vientiane, Luang Prabang and Pakse airports. Many travellers leave overland to Thailand or Vietnam.",
    exits: "Bangkok, Hanoi, Chiang Mai, Siem Reap or Kuala Lumpur",
    faq: { q: "How long is a Laos tourist visa?", a: "30 days from arrival since 1 January 2025, according to the UK Foreign Office." },
  },
  {
    id: "australia", name: "Australia", fcdo: "australia",
    entry: "British visitors usually need an eVisitor or an Electronic Travel Authority (ETA) before travelling to Australia; neither has a visa application charge, though the ETA may carry a service fee.",
    passport: "Your passport must be valid for the length of your planned stay.",
    extra: "Your eVisitor or ETA must be granted before you board. Airlines check it electronically at check-in, along with your plans if you're flying in one-way.",
    exits: "Auckland, Bali (Denpasar), Singapore, Nadi or Kuala Lumpur",
    faq: { q: "Do I need a visa for Australia as a British citizen?", a: "Usually an eVisitor or ETA, applied for online before you travel. Neither has a visa application charge." },
  },
  {
    id: "uruguay", name: "Uruguay", fcdo: "uruguay",
    entry: "British visitors can visit Uruguay without a visa for up to 90 days.",
    passport: "Your passport must be valid for your whole stay and have at least one blank page for an entry stamp.",
    extra: "The ferry between Buenos Aires and Montevideo or Colonia is one of the most common ways in and out, and land crossings to Brazil are straightforward too.",
    exits: "Buenos Aires, São Paulo, Santiago or the ferry to Argentina",
    faq: { q: "Does a ferry to Buenos Aires count as leaving Uruguay?", a: "Yes, it takes you out of Uruguay. Airlines flying you in one-way may still prefer to see a flight." },
  },
];

export const EN_COUNTRY_GUIDES_2: Guide[] = COUNTRIES.map(buildCountryGuide);
