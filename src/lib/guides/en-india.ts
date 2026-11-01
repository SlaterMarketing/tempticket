/**
 * Guides for Indian passport holders: entry rules and onward tickets for the
 * destinations Indians fly to most, plus a hub that links these to the existing
 * India visa itinerary pages. Facts come from each country's own official pages
 * for Indian nationals (embassies in New Delhi, immigration departments). Where
 * a rule is changing, the page says so and points readers to the source.
 *
 * Also the "fake flight confirmation" page, which answers that search honestly:
 * don't forge one, here's what happens if you do, here's the legal alternative.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Dest = {
  id: string;
  country: string;
  /** Short entry status, for the hub table. */
  status: string;
  /** Short answer to "is an onward ticket asked for?", for the hub table. */
  ticket: string;
  /** H1 suffix and title hook, e.g. "30 days visa-free". */
  hook: string;
  rules: string[];
  ticketText: string[];
  tips?: string[];
  faqs: GuideFaq[];
  sources: GuideSource[];
  /** Existing general onward ticket guide for this country, if any. */
  related?: string;
};

const fcdo = (slug: string, name: string): GuideSource => ({
  label: `UK Foreign Office: ${name} entry requirements (for comparison)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

const DESTS: Dest[] = [
  {
    id: "thailand",
    country: "Thailand",
    status: "30 days visa-exempt (tourism) from 15 Sep 2026",
    ticket: "Can be asked at check-in and on arrival",
    hook: "30 days visa-free from September 2026",
    rules: [
      "Thailand revised its visa exemption schemes from 15 September 2026. The Royal Thai Embassy in New Delhi says Indian ordinary passport holders can now enter visa-free for up to 30 days for tourism. That replaces the earlier 60-day exemption, so anything you read about 60 days is out of date.",
      "If you were admitted before 15 September 2026, you keep the stay you were given at entry. For anything other than tourism, or for a longer stay, apply for a visa on Thailand's official e-Visa website before you travel.",
    ],
    ticketText: [
      "Visa-exempt visitors can be asked to show they'll leave within their permitted stay. Airlines check this at check-in on one-way tickets, and the immigration officer can ask on arrival too, along with proof of funds and your accommodation. The UK Foreign Office's summary of the same scheme lists 10,000 baht per person as the funds figure, and the TDAC digital arrival card, filled in during the three days before you arrive.",
      "With only 30 days now, your onward flight needs to leave within that window. Book a reservation dated inside your 30 days, out to anywhere: Kuala Lumpur, Singapore, Colombo and back home to India all work.",
    ],
    faqs: [
      { q: "Is Thailand still visa-free for Indians?", a: "Yes, for tourism, but the stay is now 30 days from 15 September 2026, not 60. Check the Royal Thai Embassy in New Delhi before you fly." },
      { q: "Do Indians need a return ticket for Thailand?", a: "Proof that you'll leave within your 30 days can be asked for, by the airline at check-in or by immigration on arrival. A return flight or an onward flight to another country both count." },
    ],
    sources: [
      { label: "Royal Thai Embassy, New Delhi: revision of Thailand's visa exemption and VoA schemes (from 15 September 2026)", url: "https://newdelhi.thaiembassy.org/en/content/the-revision-of-thailand-s-visa-exemption-and-voa" },
      { label: "Royal Thai Embassy, New Delhi: visa information", url: "https://newdelhi.thaiembassy.org/en/page/visa" },
      fcdo("thailand", "Thailand"),
    ],
    related: "onward-ticket-thailand",
  },
  {
    id: "malaysia",
    country: "Malaysia",
    status: "30 days visa-free until 31 Dec 2026",
    ticket: "Yes: confirmed return ticket listed",
    hook: "30 days visa-free, return ticket required",
    rules: [
      "Malaysia's High Commission in New Delhi says Indian nationals can enter visa-free for up to 30 days until 31 December 2026, for tourism, business, social visits and transit.",
      "The conditions it lists are a passport valid for at least six months, a confirmed return flight, a confirmed hotel booking, and the Malaysia Digital Arrival Card (MDAC) submitted online before you arrive. General entry rules also ask for enough money for your stay.",
    ],
    ticketText: [
      "This is one of the few places where the official page for Indians names a confirmed return ticket outright, so expect the airline to ask before you board. A flight out within your 30 days, either home to India or onward to another country, is what you need to show.",
      "If you're heading on from Malaysia, an onward flight to Singapore, Thailand, Indonesia or Vietnam covers it. Book it before you leave India, alongside your hotel confirmation.",
    ],
    tips: [
      "The waiver runs until 31 December 2026. If you're travelling after that, check the High Commission's page for an extension before you book.",
    ],
    faqs: [
      { q: "Is Malaysia visa-free for Indians?", a: "Yes, for up to 30 days until 31 December 2026, with a confirmed return ticket, a hotel booking, a passport valid for six months and the MDAC submitted before arrival." },
      { q: "Does the return ticket have to go back to India?", a: "It has to show you leaving Malaysia within 30 days. An onward flight to another country does that just as well." },
    ],
    sources: [
      { label: "Ministry of Foreign Affairs Malaysia, New Delhi: entry requirements for foreigners", url: "https://www.kln.gov.my/web/ind_new-delhi/requirement_foreigner" },
    ],
    related: "onward-ticket-malaysia",
  },
  {
    id: "indonesia-bali",
    country: "Indonesia",
    status: "Visa on arrival / e-VOA",
    ticket: "Yes: return or onward ticket is a condition",
    hook: "visa on arrival and the onward ticket rule",
    rules: [
      "India is on Indonesia's list of countries eligible for the electronic visa on arrival (e-VOA), and the visa on arrival is also issued at designated airports, including Bali.",
      "Indonesia's immigration directorate lists two requirements for both: a passport valid for at least six months, and a return ticket or onward ticket to another country. The UK Foreign Office, describing the same visa for British visitors, gives 30 days, single entry, for 500,000 rupiah, and Bali charges a separate tourist levy.",
    ],
    ticketText: [
      "The onward ticket isn't optional here. It's one of only two listed conditions for the visa itself, so the airline will check it before you board for Bali or Jakarta, and immigration can check it again on arrival.",
      "Show a flight out of Indonesia dated within your stay. Singapore, Kuala Lumpur and back home to India are the usual choices.",
    ],
    faqs: [
      { q: "Can Indians get a visa on arrival in Bali?", a: "Yes. India is on the e-VOA list, and you can also get the visa on arrival at Bali airport. Either way you need a passport valid for six months and a return or onward ticket." },
      { q: "Will they really check my return ticket for Bali?", a: "Yes. It's a listed condition of the visa, so airlines check it at check-in. Have it ready before you get to the airport." },
    ],
    sources: [
      { label: "Directorate General of Immigration, Indonesia: visa FAQ (e-VOA countries and requirements)", url: "https://www.imigrasi.go.id/faq/visa?lang=en-US" },
      fcdo("indonesia", "Indonesia"),
    ],
    related: "onward-ticket-bali-indonesia",
  },
  {
    id: "vietnam",
    country: "Vietnam",
    status: "e-visa, up to 90 days, multiple entry",
    ticket: "Airlines may check on one-way tickets",
    hook: "90-day e-visa and flights",
    rules: [
      "Since 15 August 2023 citizens of every country can apply for a Vietnam e-visa, valid for up to 90 days with multiple entries. Apply only on the official government portal, not on look-alike sites that charge extra.",
      "Your e-visa is tied to the entry and exit points you choose when you apply, so pick the airport you'll actually land at and the one you'll leave from.",
    ],
    ticketText: [
      "The e-visa form asks for your intended dates. Having a flight out that matches them keeps your application and your trip consistent, and gives you something to show if the airline checks a one-way passenger at check-in.",
      "A reservation dated within your e-visa validity, leaving from the exit point on your e-visa, is the cleanest way to do it.",
    ],
    faqs: [
      { q: "Do Indians need a visa for Vietnam?", a: "Yes, but you can get an e-visa online for up to 90 days, multiple entry. Use the official portal." },
      { q: "Can I enter Vietnam at a different airport than on my e-visa?", a: "The e-visa is linked to the entry and exit points you chose. Choose carefully when you apply and check the official portal if your plans change." },
    ],
    sources: [
      { label: "Vietnam National Authority of Tourism: official guide to e-visas", url: "https://www.vietnam.travel/plan-your-trip/official-vietnam-evisa-application" },
      { label: "Vietnam Immigration Department: official e-visa portal", url: "https://evisa.xuatnhapcanh.gov.vn/web/guest/trang-chu-ttdt" },
    ],
  },
  {
    id: "philippines",
    country: "the Philippines",
    status: "14 days visa-free, or 30 days with a US/UK/Schengen etc. visa",
    ticket: "Yes: return or onward ticket listed",
    hook: "14 or 30 days visa-free",
    rules: [
      "The Philippines lets Indian nationals in visa-free for tourism in two ways. Anyone can get 14 days, which can't be extended or converted, with a passport valid for at least six months beyond the stay, a confirmed hotel booking, proof of funds and a return or onward ticket.",
      "If you hold a valid visa or residence permit from the US, Japan, Australia, Canada, a Schengen country, Singapore or the UK, you can get 30 days instead, also not extendable, with a valid passport and a return or onward ticket.",
    ],
    ticketText: [
      "Both options list a return or onward ticket to your next destination, so the airline will ask for it in India before you board. Date it within your 14 or 30 days, because neither stay can be extended.",
      "If you need longer than 30 days, apply for a visa at a Philippine embassy or consulate before you go instead.",
    ],
    faqs: [
      { q: "How long can Indians stay in the Philippines without a visa?", a: "14 days for tourism, or 30 days if you hold a valid visa or residence permit from the US, Japan, Australia, Canada, Schengen, Singapore or the UK. Neither can be extended." },
      { q: "Is a return ticket required for the Philippines?", a: "Yes. A return or onward ticket is listed for both visa-free options." },
    ],
    sources: [
      { label: "Philippine Embassy, The Hague: visa-free entry for Indian nationals", url: "https://thehaguepe.dfa.gov.ph/index.php/visa/indian-nationals" },
    ],
    related: "onward-ticket-philippines",
  },
  {
    id: "singapore",
    country: "Singapore",
    status: "Visa required, through authorised agents",
    ticket: "Not to apply; confirmed onward/return at the border",
    hook: "applying and the onward ticket at the border",
    rules: [
      "Indian passport holders need a visa for Singapore. Singapore's High Commission in New Delhi says you apply through one of its authorised visa agents, with Form 14A, a passport valid for at least six months on the date you enter, and two recent photographs. Processing is generally 3 to 5 working days.",
      "Visa validity is only the period in which you can seek entry. The officer at the checkpoint decides how long you can stay, and you get that in an e-Pass emailed after you submit the SG Arrival Card.",
    ],
    ticketText: [
      "The High Commission says plainly that you don't need to buy a flight ticket before you apply for the visa. At the border, though, it lists a confirmed onward or return air ticket among the entry requirements.",
      "So there are two moments. For the application, a reservation that shows your plan is enough. Before you fly, have a booking out of Singapore that the airline and the officer can see.",
    ],
    faqs: [
      { q: "Do I need a flight ticket to apply for a Singapore visa from India?", a: "No. Singapore's High Commission says applicants don't need to buy a ticket before applying. You'll need a confirmed onward or return ticket when you actually enter." },
      { q: "How long does a Singapore visa take for Indians?", a: "Generally 3 to 5 working days through an authorised agent, not counting the day you submit, weekends and holidays." },
    ],
    sources: [
      { label: "High Commission of Singapore, New Delhi: visa information", url: "https://new-delhi.mfa.gov.sg/consular-services/visa-information/" },
    ],
    related: "onward-ticket-singapore",
  },
  {
    id: "sri-lanka",
    country: "Sri Lanka",
    status: "Free 30-day ETA, double entry, from 25 May 2026",
    ticket: "Not listed in the notice; airlines may ask",
    hook: "free 30-day ETA",
    rules: [
      "From 25 May 2026 India is one of 40 countries whose nationals get a free tourist visa for Sri Lanka. You still have to get an Electronic Travel Authorization (ETA) before you arrive. It's valid for 30 days, with a second entry allowed within those 30 days, and extensions are available for a fee.",
    ],
    ticketText: [
      "Sri Lanka's notice on the free visa doesn't list a return ticket. A booking out within 30 days is still the simplest proof that you'll leave inside your ETA if an airline or an officer asks, especially if you're flying in one-way.",
      "Because the ETA allows a second entry, a common plan is Sri Lanka, then the Maldives, then back to Sri Lanka. Make sure your final departure is within 30 days of first arrival.",
    ],
    faqs: [
      { q: "Is Sri Lanka visa free for Indians?", a: "The tourist visa is free from 25 May 2026, but you must still apply for an ETA before you arrive. It's valid for 30 days with double entry." },
    ],
    sources: [
      { label: "Department of Immigration and Emigration, Sri Lanka: free tourist visas for nationals of 40 countries", url: "https://www.immigration.gov.lk/content/files/visa/Free%20Tourist%20Visas%20for%20Nationals%20of%2040%20Selected%20Countries.pdf" },
      { label: "Sri Lanka ETA: official site", url: "https://eta.gov.lk/" },
    ],
  },
  {
    id: "dubai-uae",
    country: "the UAE",
    status: "Visa needed; 14-day visa on arrival with a US green card or UK/EU residence",
    ticket: "Not listed for visa on arrival; airlines may ask",
    hook: "visa on arrival rules and flights",
    rules: [
      "Most Indian passport holders need a UAE visa arranged before travel. The exception is a visa on arrival for 14 days, extendable once for another 14, for Indians with an ordinary passport who also hold a US green card or a residence visa from the UK or an EU country. Dubai's residency authority (GDRFA) requires both the passport and that permit to be valid for at least six months.",
      "These rules have been changing. In July 2026 Indian media reported, citing the federal authority (ICP), that UK residence alone would stop qualifying and that a US visit visa or EU visit visa would count. Check with ICP or your airline in the week you fly.",
    ],
    ticketText: [
      "The GDRFA's visa on arrival page doesn't list a return ticket. Airlines flying you to Dubai on a one-way ticket can still ask how you'll leave, and if you're applying for a visa in advance, the sponsor or agent may want your flight dates.",
      "A reservation out of the UAE within your 14 days answers both. If you plan to extend, date it inside the first 14 days anyway and change it later.",
    ],
    faqs: [
      { q: "Can Indians get a visa on arrival in Dubai?", a: "Only if you also hold a qualifying permit: the GDRFA lists a US green card or a UK or EU residence visa, valid for six months. Reported changes in 2026 add US and EU visit visas and drop UK residence alone, so check before flying." },
    ],
    sources: [
      { label: "GDRFA Dubai: visa on arrival for citizens of the Republic of India", url: "https://gdrfad.gov.ae/en/services/727c91b1-52eb-11ea-0320-0050569629e8" },
      { label: "Business Standard (July 2026): UAE changes visa-on-arrival rules for Indians", url: "https://www.business-standard.com/immigration/uae-changes-visa-rules-for-indians-who-can-still-get-visa-on-arrival-126070100476_1.html" },
    ],
    related: "onward-ticket-dubai-uae",
  },
  {
    id: "turkey",
    country: "Turkey",
    status: "e-visa only with a valid Schengen/US/UK/Ireland visa or permit; otherwise sticker visa",
    ticket: "Itinerary needed for a sticker visa application",
    hook: "e-visa conditions and flight itinerary",
    rules: [
      "The Turkish Embassy in New Delhi says Indian nationals can get an e-visa only if they hold a supporting document: a valid visa or residence permit from a Schengen country, the US, the UK or Ireland. Used or unused visas count, as long as they're valid on the day you enter Turkey. Visas issued through those countries' own e-visa systems don't count.",
      "The e-visa is for tourism or business only, and airlines won't board you if your supporting document doesn't meet the rules. Without one, you need a sticker visa, applied for through Turkey's visa application centres in India (Gateway).",
    ],
    ticketText: [
      "For a sticker visa you're asked to set out your trip, and a flight itinerary that matches your dates and hotel bookings is the usual way to show it. As with most visas, buying the ticket before you have the visa risks losing the money if it's refused or delayed. A held reservation shows the plan without that risk.",
      "If you're travelling on an e-visa, carry the supporting visa or permit itself. That's what the airline checks.",
    ],
    faqs: [
      { q: "Can Indians get a Turkey e-visa?", a: "Only with a valid visa or residence permit from a Schengen country, the US, the UK or Ireland. Otherwise you need a sticker visa from a Turkish visa centre in India." },
      { q: "Do I need a flight booking for a Turkey visa from India?", a: "For a sticker visa, a flight itinerary that matches your plans is part of showing your trip. A reservation does that without paying for flights before the decision." },
    ],
    sources: [
      { label: "Embassy of Türkiye, New Delhi: e-visa of the Republic of Türkiye", url: "https://newdelhi-emb.mfa.gov.tr/Mission/ShowAnnouncement/361514" },
      { label: "Embassy of Türkiye, New Delhi: visa and consular announcement (Gateway visa centres)", url: "https://newdelhi-emb.mfa.gov.tr/Mission/ShowAnnouncement/359720" },
    ],
  },
];

function slugFor(d: Dest): string {
  return `${d.id}-visa-for-indians`;
}

function name(d: Dest): string {
  return d.country.replace(/^the /, "");
}

function build(d: Dest): Guide {
  const short = name(d);
  const sections = [
    { heading: `Entry rules for Indian passport holders`, paragraphs: d.rules },
    { heading: "Return or onward ticket", paragraphs: d.ticketText },
    {
      heading: "Getting a reservation instead of a ticket",
      paragraphs: [
        "If you don't want to buy a flight you may change or not use, a held flight reservation in your name gives you a real booking reference that the airline can look up. It's the legitimate version of what people search for as a dummy ticket.",
        TIMING_STEP,
        VERIFY_STEP,
      ],
    },
  ];
  if (d.tips) sections.splice(2, 0, { heading: "Before you book", paragraphs: d.tips });
  return {
    key: slugFor(d),
    slug: slugFor(d),
    title: `${short} Visa for Indians (2026): Entry Rules and Onward Ticket`,
    h1: `${short} for Indian passport holders: ${d.hook}`,
    description: `What Indians need to enter ${d.country} in 2026, from the official sources: ${d.status.toLowerCase()}, and whether you need a return or onward ticket.`,
    intro: `Here's what an Indian passport holder needs to enter ${d.country}, taken from ${d.country}'s own official pages, and how to handle the return or onward ticket that airlines check before you board in India.`,
    sections,
    faqs: d.faqs,
    sources: d.sources,
    checked: CHECKED,
  };
}

const EXISTING_INDIA: { label: string; status: string; ticket: string; slug: string }[] = [
  { label: "Schengen area", status: "Visa required", ticket: "Flight itinerary with the application", slug: "schengen-visa-flight-reservation-india" },
  { label: "UK", status: "Visa required", ticket: "Show you'll leave; ticket not required", slug: "uk-visa-flight-itinerary-india" },
  { label: "US", status: "Visa required (interview)", ticket: "Don't buy until you have the visa", slug: "us-visa-flight-itinerary-india" },
  { label: "Canada", status: "Visa required", ticket: "Itinerary helps show your plan", slug: "canada-visa-flight-itinerary-india" },
  { label: "Australia", status: "Visa required", ticket: "Itinerary helps show your plan", slug: "australia-visa-flight-itinerary-india" },
  { label: "Japan", status: "eVISA (tourism) via agencies", ticket: "Itinerary with the application", slug: "japan-visa-flight-itinerary-india" },
];

const HUB: Guide = {
  key: "onward-ticket-for-indian-passport-holders",
  slug: "onward-ticket-for-indian-passport-holders",
  title: "Onward Ticket for Indian Passport Holders: Country by Country (2026)",
  h1: "Onward and return tickets for Indian passport holders",
  description:
    "Which countries ask Indian passport holders for a return or onward ticket, what the entry rules are in 2026, and how to show a flight out without buying one.",
  intro:
    "Indian travellers get asked for a return or onward ticket more often than most, because many popular destinations make it a condition of visa-free entry or a visa on arrival, and airlines check it at check-in in India. This table sums up the rules from each country's official pages. Click a country for the details and sources.",
  table: {
    caption: "Entry rules and ticket checks for Indian passports",
    headers: ["Destination", "Entry for Indian passports", "Return or onward ticket"],
    rows: [
      ...DESTS.map((d) => [name(d), d.status, d.ticket]),
      ...EXISTING_INDIA.map((e) => [e.label, e.status, e.ticket]),
    ],
    rowLinks: [...DESTS.map(slugFor), ...EXISTING_INDIA.map((e) => e.slug)],
    note: "Rules change, sometimes at short notice. Each linked page cites the official source and the date we last checked it.",
  },
  sections: [
    {
      heading: "Why Indians get asked so often",
      paragraphs: [
        "Visa-free stays and visas on arrival usually come with a condition that you leave within the permitted stay. Malaysia, Indonesia and the Philippines list a return or onward ticket in their official conditions for Indians. Airlines enforce it before you board, because they have to fly you back at their own cost if you're refused entry.",
        "For visas you apply for in advance, like Schengen, the UK, the US and Turkey, the itinerary is part of showing a believable plan. Most official guidance advises against buying tickets before the visa is decided.",
      ],
    },
    {
      heading: "What counts",
      paragraphs: [
        "A flight out of the country, to anywhere, dated within your permitted stay, with a booking reference the airline can find. Going on to a second country is as good as flying home.",
        "A reservation held in your name does this without paying for a ticket you might not use. An edited PDF or a fake confirmation does not, and can get you refused or banned. See our page on fake flight confirmation emails for why.",
      ],
    },
    {
      heading: "How to do it",
      paragraphs: [TIMING_STEP, VERIFY_STEP],
    },
  ],
  faqs: [
    { q: "Which countries need a return ticket for Indians?", a: "Among popular destinations, Malaysia, Indonesia (Bali) and the Philippines list a return or onward ticket in their official conditions for Indians. Singapore asks for one at the border. Elsewhere airlines and officers can ask too." },
    { q: "Does the onward ticket have to go back to India?", a: "No. It has to show you leaving that country within your permitted stay. A flight to another country counts." },
  ],
  checked: CHECKED,
};

const FAKE: Guide = {
  key: "fake-flight-confirmation-email",
  slug: "fake-flight-confirmation-email",
  title: "Fake Flight Confirmation Email: Why Not, and the Legal Alternative",
  h1: "Thinking of a fake flight confirmation? Read this first",
  description:
    "Why an edited or fake flight confirmation can get your visa refused and lead to a 10-year UK ban or a US misrepresentation finding, and how to get a real, verifiable reservation instead.",
  intro:
    "If you need to show a flight for a visa application or an airline check-in, it's tempting to edit an old booking or use a generator that makes a confirmation email. Don't. It's easy to spot, and the consequences go far beyond one refused trip. There's a cheap, legal way to get a real booking reference instead.",
  sections: [
    {
      heading: "How fakes get caught",
      paragraphs: [
        "A real booking has a reference (PNR) that exists in the airline's reservation system. A check-in agent types it in and either finds your booking or doesn't. A consulate can do the same. An edited PDF or a generated email has a reference that leads nowhere.",
      ],
    },
    {
      heading: "What happens if you use one",
      paragraphs: [
        "UK: Home Office guidance says an application must be refused if it's more likely than not that the applicant used deception, which includes false documents, and that future applications must then be refused for 10 years.",
        "US: under section 212(a)(6)(C)(i) of the Immigration and Nationality Act, anyone who seeks a visa by fraud or by wilfully misrepresenting a material fact is ineligible. That finding stays with you and can only be overcome with a waiver.",
        "Schengen: the EU Visa Code says a visa must be refused if there are reasonable doubts about the authenticity of the supporting documents or the truth of what they say.",
        "At the airport, an agent who can't find your booking won't check you in. At best you miss the flight. At worst you're reported.",
      ],
    },
    {
      heading: "The legal alternative",
      paragraphs: [
        "A flight reservation held in your name for a short time gives you exactly what the fake was meant to: a confirmation with a real booking reference, for a fraction of a ticket's price. Because it's real, the airline and the consulate can find it.",
        TIMING_STEP,
        VERIFY_STEP,
      ],
    },
  ],
  faqs: [
    { q: "Is a flight reservation for a visa legal?", a: "Yes. It's a real booking held in your name. Many consulates, including Schengen ones, advise against buying a ticket before the visa decision, and a reservation is the usual way to show your plan." },
    { q: "Can a consulate tell if my flight booking is fake?", a: "Yes. Real bookings can be looked up with the reference and surname. A fake reference won't show anything, and false documents are grounds for refusal, and in the UK a 10-year ban." },
  ],
  sources: [
    { label: "GOV.UK: Suitability guidance on deception, false representations and false documents", url: "https://www.gov.uk/government/publications/suitability-false-representations-immigration-staff-guidance/part-suitability-deception-false-representations-false-documents-and-non-disclosure-of-relevant-facts-accessible" },
    { label: "US Foreign Affairs Manual 9 FAM 302.9: misrepresentation, INA 212(a)(6)(C)(i)", url: "https://fam.state.gov/fam/09FAM/09FAM030209.html" },
    { label: "EU Visa Code (Regulation 810/2009), Article 32: refusal of a visa", url: "https://eur-lex.europa.eu/eli/reg/2009/810/oj" },
  ],
  checked: CHECKED,
};

export const EN_INDIA_GUIDES: Guide[] = [HUB, ...DESTS.map(build), FAKE];
