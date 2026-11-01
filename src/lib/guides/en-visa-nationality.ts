/**
 * Flight itinerary guides for visitor visas to the UK, US, Canada, Australia and
 * Japan, one page per destination and nationality. Destination facts (fees,
 * timings, official advice on booking travel) are checked against the official
 * sources listed per destination; each page adds where that nationality
 * applies and anything specific to them.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Destination = {
  id: string;
  name: string;
  /** Short label for titles, e.g. "UK". */
  short: string;
  visaName: string;
  /** Facts about the visa itself, checked against sources. */
  facts: string[];
  /** What the authorities say or ask about flights. */
  flights: string;
  sources: GuideSource[];
  faq: GuideFaq;
};

const DESTINATIONS: Record<string, Destination> = {
  uk: {
    id: "uk",
    short: "UK",
    name: "the UK",
    visaName: "UK Standard Visitor visa",
    facts: [
      "A Standard Visitor visa for up to six months costs £135. Long-term visitor visas valid for 2, 5 or 10 years are also available, still with stays of up to six months per visit.",
      "You can apply up to three months before you travel, and you'll usually get a decision within three weeks of proving your identity and providing your documents.",
    ],
    flights:
      "UK Visas and Immigration asks you to show that you'll leave the UK at the end of your visit and that you can pay for your return or onward journey. You don't have to buy the ticket to show this: a reservation with clear dates, alongside proof of funds, sets out the plan.",
    sources: [
      { label: "GOV.UK: Apply for a Standard Visitor visa (fees and decision times)", url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" },
      { label: "GOV.UK: Standard Visitor documents you need", url: "https://www.gov.uk/standard-visitor/documents-you-need" },
    ],
    faq: {
      q: "Do I need a paid ticket for a UK visitor visa?",
      a: "No. You need to show you'll leave at the end of your visit and can pay for the journey. A reservation plus evidence of funds does that without risking money before the decision.",
    },
  },
  us: {
    id: "us",
    short: "US",
    name: "the US",
    visaName: "US B-1/B-2 visitor visa",
    facts: [
      "Most applicants need an interview at a US embassy or consulate after filing the DS-160 form and paying the visa fee. Wait times for interviews vary a lot by post, so check the current wait before you plan dates.",
      "Fees changed in 2025, when Congress added a visa integrity fee on top of the application fee. Check the current total on travel.state.gov before you pay.",
    ],
    flights:
      "The US State Department advises not to make final travel plans or buy tickets until you have the visa. A US visa application doesn't require a ticket, but a planned itinerary helps you answer questions about the trip consistently, and a held reservation gives you one without paying for flights.",
    sources: [
      { label: "US Department of State: Visitor visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
    ],
    faq: {
      q: "Do I need a flight ticket for my US visa interview?",
      a: "No. The State Department advises against buying tickets before you have the visa. Be ready to explain your plans; a held itinerary keeps your dates straight.",
    },
  },
  canada: {
    id: "canada",
    short: "Canada",
    name: "Canada",
    visaName: "Canadian visitor visa",
    facts: [
      "The visitor visa processing fee is CAD 100 per person, and most applicants also pay CAD 85 for biometrics (fingerprints and photo) at a visa application centre.",
      "Processing times depend on the country you apply from, and IRCC publishes the current estimate on its website.",
    ],
    flights:
      "IRCC lists flight details as an optional itinerary document you can include with a visitor visa application. A reservation that matches your planned dates shows the trip is real without paying for a ticket before the decision.",
    sources: [
      { label: "Government of Canada: Apply for a visitor visa (fees and documents)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html" },
    ],
    faq: {
      q: "Is a flight booking required for a Canadian visitor visa?",
      a: "No, IRCC lists flight details as optional. Including a reservation that matches your dates can still help show your plans are genuine.",
    },
  },
  australia: {
    id: "australia",
    short: "Australia",
    name: "Australia",
    visaName: "Australian Visitor visa (subclass 600)",
    facts: [
      "The Visitor visa (subclass 600) tourist stream lets you visit for up to 3, 6 or 12 months, depending on what's granted. The fee is set by the Department of Home Affairs and changes most years, so check it on the official site.",
    ],
    flights:
      "Australian missions recommend that you don't finalise travel arrangements until you have a valid visa, and say Home Affairs isn't liable for losses if a visa is refused or comes late. A held reservation lets you show planned dates without that risk.",
    sources: [
      { label: "Department of Home Affairs: Visitor visa (subclass 600)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600" },
      { label: "Australian Embassy: after you lodge (advice on travel arrangements)", url: "https://cambodia.embassy.gov.au/penh/after-you-lodge.html" },
    ],
    faq: {
      q: "Should I buy flights before my Australian visa is granted?",
      a: "Australian missions recommend not finalising travel arrangements until you hold the visa. Use a reservation for planning and buy the ticket after the grant.",
    },
  },
  japan: {
    id: "japan",
    short: "Japan",
    name: "Japan",
    visaName: "Japanese short-term visa",
    facts: [
      "Japan issues single-entry tourist visas for short stays. For some countries you can now get a JAPAN eVISA instead of a visa sticker; at the airport you show the visa issuance notice on a connected device, since screenshots and printouts aren't accepted.",
    ],
    flights:
      "Japanese visa applications usually include a schedule of stay, and consulates and agencies commonly ask for flight details that match it. A held reservation gives you real flight numbers and dates without buying tickets before the visa.",
    sources: [
      { label: "Ministry of Foreign Affairs of Japan: JAPAN eVISA", url: "https://www.mofa.go.jp/j_info/visit/visa/visaonline.html" },
    ],
    faq: {
      q: "Is a flight reservation enough for a Japan visa?",
      a: "Applications usually accept a reservation or itinerary rather than a paid ticket, but always follow the checklist from the embassy, consulate or accredited agency you apply through.",
    },
  },
};

type Page = {
  dest: keyof typeof DESTINATIONS;
  id: string;
  country: string;
  people: string;
  airports: string;
  where: string;
  faq?: GuideFaq;
};

function build(p: Page): Guide {
  const d = DESTINATIONS[p.dest];
  const slug = `${d.id}-visa-flight-itinerary-${p.id}`;
  return {
    key: slug,
    slug,
    title: `${d.short} Visa Flight Itinerary from ${p.country}: What to Show`,
    h1: `Flight itinerary for a ${d.visaName} from ${p.country}`,
    description: `What ${p.people} applying for a ${d.visaName} need to show for flights, what the official guidance says about buying tickets, and how to get a verifiable reservation.`,
    intro: `${p.people} need a visa to visit ${d.name}, and the application is easier to tell consistently when you have a planned itinerary. Here's what applying from ${p.country} involves and how to handle the flights without buying a ticket you might not use.`,
    sections: [
      { heading: `The ${d.visaName}`, paragraphs: d.facts },
      { heading: `Applying from ${p.country}`, paragraphs: [p.where] },
      {
        heading: "The flight itinerary",
        paragraphs: [
          d.flights,
          `Flights from ${p.country} usually leave from ${p.airports}. Make sure the dates match your application form and accommodation, and that your name matches your passport exactly.`,
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [d.faq, ...(p.faq ? [p.faq] : [])],
    sources: d.sources,
    checked: CHECKED,
  };
}

const PAGES: Page[] = [
  // UK
  {
    dest: "uk", id: "india", country: "India", people: "Indians",
    airports: "Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Ahmedabad or Kochi",
    where: "UK visa applications from India go through visa application centres in many cities. You apply online first, then book an appointment to give your fingerprints and photo. Indians living in another country apply there.",
  },
  {
    dest: "uk", id: "nigeria", country: "Nigeria", people: "Nigerians",
    airports: "Lagos or Abuja",
    where: "Nigerians apply online and then attend a visa application centre, with centres in Lagos and Abuja. Book the appointment early, as slots can fill up before summer and Christmas.",
    faq: { q: "Can I pay for faster processing from Nigeria?", a: "Priority services are offered in many countries for an extra fee. Check what's available at your visa application centre when you apply." },
  },
  {
    dest: "uk", id: "pakistan", country: "Pakistan", people: "Pakistanis",
    airports: "Islamabad, Lahore, Karachi or Sialkot",
    where: "Pakistanis apply online and attend a visa application centre, with centres in Islamabad, Lahore, Karachi and Mirpur. Many applicants are visiting family in the UK, in which case the invitation letter and your itinerary should tell the same story.",
  },
  {
    dest: "uk", id: "ghana", country: "Ghana", people: "Ghanaians",
    airports: "Accra (Kotoka)",
    where: "Ghanaians apply online and then attend the visa application centre in Accra to give biometrics.",
  },
  {
    dest: "uk", id: "china", country: "China", people: "Chinese citizens",
    airports: "Beijing, Shanghai, Guangzhou, Chengdu or Shenzhen",
    where: "Chinese citizens apply online and attend one of the UK visa application centres across mainland China. Long-term visitor visas are popular with frequent travellers. Hong Kong SAR passport holders don't need a visa for short visits.",
  },
  {
    dest: "uk", id: "philippines", country: "the Philippines", people: "Filipinos",
    airports: "Manila or Cebu",
    where: "Filipinos apply online and attend a visa application centre in the Philippines. Overseas Filipino workers apply in the country where they live.",
  },
  {
    dest: "uk", id: "bangladesh", country: "Bangladesh", people: "Bangladeshis",
    airports: "Dhaka or Sylhet",
    where: "Bangladeshis apply online and attend a visa application centre, with the main centre in Dhaka. Family visits are common, so make sure your sponsor's letter and itinerary dates agree.",
  },
  {
    dest: "uk", id: "sri-lanka", country: "Sri Lanka", people: "Sri Lankans",
    airports: "Colombo",
    where: "Sri Lankans apply online and then attend the visa application centre in Colombo.",
  },
  // US
  {
    dest: "us", id: "india", country: "India", people: "Indians",
    airports: "Delhi, Mumbai, Bengaluru, Hyderabad or Chennai",
    where: "US visa interviews in India happen at the embassy in New Delhi and the consulates in Mumbai, Chennai, Hyderabad and Kolkata. Fingerprints are usually taken at a separate visa application centre appointment first. Interview waits have often been long, so check the current wait before planning dates.",
  },
  {
    dest: "us", id: "nigeria", country: "Nigeria", people: "Nigerians",
    airports: "Lagos or Abuja",
    where: "Nigerians interview at the US embassy in Abuja or the consulate general in Lagos. Visa validity for Nigerians has changed in recent years, so check the reciprocity schedule on travel.state.gov for the validity you can expect.",
    faq: { q: "How long is a US visitor visa valid for Nigerians?", a: "It's set by the US reciprocity schedule and has changed in recent years. Check the current entry for Nigeria on travel.state.gov." },
  },
  {
    dest: "us", id: "philippines", country: "the Philippines", people: "Filipinos",
    airports: "Manila or Cebu",
    where: "Filipinos interview at the US embassy in Manila. Overseas Filipino workers can usually apply where they reside.",
  },
  {
    dest: "us", id: "pakistan", country: "Pakistan", people: "Pakistanis",
    airports: "Islamabad, Lahore or Karachi",
    where: "Pakistanis interview at the US embassy in Islamabad or the consulate general in Karachi. Check which post is taking visitor visa appointments when you apply.",
  },
  {
    dest: "us", id: "vietnam", country: "Vietnam", people: "Vietnamese citizens",
    airports: "Hanoi or Ho Chi Minh City",
    where: "Vietnamese applicants interview at the US embassy in Hanoi or the consulate general in Ho Chi Minh City.",
  },
  {
    dest: "us", id: "colombia", country: "Colombia", people: "Colombians",
    airports: "Bogotá, Medellín or Cali",
    where: "Colombians interview at the US embassy in Bogotá, which has some of the busiest visa operations in the world. Interview waits have been long at times, so check before you plan dates.",
  },
  // Canada
  {
    dest: "canada", id: "india", country: "India", people: "Indians",
    airports: "Delhi, Mumbai or Bengaluru",
    where: "Indians apply online with IRCC and give biometrics at a visa application centre, with centres in many Indian cities. Processing times for applications from India are published on the IRCC website and can be long.",
  },
  {
    dest: "canada", id: "nigeria", country: "Nigeria", people: "Nigerians",
    airports: "Lagos or Abuja",
    where: "Nigerians apply online with IRCC and give biometrics at a visa application centre in Lagos or Abuja. Strong ties to home, such as work, property and family, matter as much as the itinerary.",
  },
  {
    dest: "canada", id: "philippines", country: "the Philippines", people: "Filipinos",
    airports: "Manila or Cebu",
    where: "Filipinos apply online with IRCC and give biometrics at a visa application centre in Manila or Cebu. If you've held a Canadian visa in the last ten years or hold a valid US visa, you may be eligible for an electronic travel authorization (eTA) instead when flying; check IRCC's eligibility tool.",
    faq: { q: "Can Filipinos use an eTA instead of a visa?", a: "Some can, if they've held a Canadian visa in the past ten years or hold a valid US nonimmigrant visa and are flying in. IRCC's online tool tells you which you need." },
  },
  {
    dest: "canada", id: "pakistan", country: "Pakistan", people: "Pakistanis",
    airports: "Islamabad, Lahore or Karachi",
    where: "Pakistanis apply online with IRCC and give biometrics at a visa application centre in Islamabad, Lahore or Karachi.",
  },
  // Australia
  {
    dest: "australia", id: "india", country: "India", people: "Indians",
    airports: "Delhi, Mumbai, Bengaluru or Chennai",
    where: "Indians apply online through ImmiAccount and may be asked to give biometrics at a visa application centre. Family visits and tourism are the most common reasons for applying.",
  },
  {
    dest: "australia", id: "philippines", country: "the Philippines", people: "Filipinos",
    airports: "Manila, Cebu or Clark",
    where: "Filipinos apply online through ImmiAccount and may be asked to give biometrics at a visa application centre in the Philippines.",
  },
  {
    dest: "australia", id: "china", country: "China", people: "Chinese citizens",
    airports: "Beijing, Shanghai, Guangzhou or Chengdu",
    where: "Chinese citizens apply online through ImmiAccount. Frequent travellers may be eligible for a longer-validity visitor visa; check what Home Affairs offers for Chinese passport holders.",
  },
  // Japan
  {
    dest: "japan", id: "india", country: "India", people: "Indians",
    airports: "Delhi, Mumbai, Bengaluru or Chennai",
    where: "Since 1 April 2024, people living in India can apply for a single-entry tourist JAPAN eVISA through an accredited travel agency, valid for stays of up to 90 days. Other purposes still go through the embassy or consulates for a visa sticker.",
    faq: { q: "Can Indians get a Japan eVISA?", a: "Yes, for short-term tourism, by applying through an accredited agency in India. Business and other purposes still need a visa from the embassy or a consulate." },
  },
  {
    dest: "japan", id: "philippines", country: "the Philippines", people: "Filipinos",
    airports: "Manila, Cebu or Clark",
    where: "Filipinos usually apply through an accredited travel agency, which submits the application to the Japanese embassy or consulate. Filipinos joining a packaged tour from a designated agency can get a 15-day JAPAN eVISA; independent travellers apply for a visa sticker.",
  },
  {
    dest: "japan", id: "vietnam", country: "Vietnam", people: "Vietnamese citizens",
    airports: "Hanoi, Ho Chi Minh City or Da Nang",
    where: "Vietnamese applicants apply through an accredited agency. Those joining a packaged tour from a designated agency can get a 15-day JAPAN eVISA; others apply for a visa sticker through the embassy or consulate.",
  },
  {
    dest: "japan", id: "china", country: "China", people: "Chinese citizens",
    airports: "Beijing, Shanghai, Guangzhou or Chengdu",
    where: "Chinese nationals living in China can get a single-entry tourist JAPAN eVISA through an accredited agency, usually for 15 or 30 days. Applications are handled by the consulate covering the province where you live.",
  },
];

export const EN_VISA_NATIONALITY_GUIDES: Guide[] = PAGES.map(build);
