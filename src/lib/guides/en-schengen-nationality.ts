/**
 * Schengen visa flight reservation guides, one per nationality.
 * Shared facts (fee, 90/180 rule, EEAS advice on bookings) are checked against
 * the sources below; each page adds what is specific to that nationality:
 * any EU cascade decision, reduced fee, where people typically apply from,
 * and the airports their itinerary will usually start from.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const SRC_EEAS: GuideSource = {
  label: "EEAS: Schengen visa dos and don'ts (official EU guidance for applicants)",
  url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf",
};
const SRC_FEE: GuideSource = {
  label: "Embassy of Sweden: new Schengen visa fees from 11 June 2024",
  url: "https://swedenabroad.se/en/embassies/iran-tehran/current/news/new-schengen-visa-fees",
};
const SRC_LIST: GuideSource = {
  label: "EUR-Lex: Regulation (EU) 2018/1806, the EU visa list",
  url: "https://eur-lex.europa.eu/eli/reg/2018/1806/oj",
};
const SRC_CASCADE: GuideSource = {
  label: "Danish Immigration Service: visa validity and the cascade rules, with country-specific decisions",
  url: "https://nyidanmark.dk/en-GB/Words-and-concepts/US/Visum/Visa---Determination-of-validity",
};
const SRC_REDUCED_FEE: GuideSource = {
  label: "Greek Ministry of Foreign Affairs: Schengen visa fee table (reduced fees under facilitation agreements)",
  url: "https://www.mfa.gr/media/sites/20/2026/03/VisaFees.pdf",
};

const GENERAL_CASCADE =
  "Under the standard EU cascade, someone who has obtained and lawfully used three visas within the previous two years can get a one-year multiple-entry visa, then a two-year one, then a five-year one. Consulates can still issue a shorter visa, for example when your passport is close to expiry.";

type Nationality = {
  /** Slug suffix, e.g. "india". */
  id: string;
  country: string;
  /** Plural demonym used in headings, e.g. "Indians". */
  people: string;
  /** Adjective, e.g. "Indian". */
  adj: string;
  airports: string;
  /** Paragraph on where and how people from this country usually apply. */
  where: string;
  /** Paragraph on multiple-entry visas; defaults to the general cascade. */
  cascade?: string;
  /** Fee paragraph override (for reduced-fee nationalities). */
  fee?: string;
  faq: GuideFaq;
  sources?: GuideSource[];
};

const STANDARD_FEE =
  "The standard Schengen visa fee has been €90 for adults and €45 for children aged 6 to 12 since 11 June 2024. It's usually paid in local currency, and the visa centre adds its own service charge on top.";

function build(n: Nationality): Guide {
  const fee = n.fee ?? STANDARD_FEE;
  const extraSources = n.sources ?? [];
  return {
    key: `schengen-visa-flight-reservation-${n.id}`,
    slug: `schengen-visa-flight-reservation-${n.id}`,
    title: `Schengen Visa Flight Reservation for ${n.people} (${n.country})`,
    h1: `Flight reservation for a Schengen visa from ${n.country}`,
    description: `What ${n.adj} applicants need to show for flights on a Schengen visa application, why a refundable or held booking is recommended, the fee, and how multiple-entry visas work for ${n.people}.`,
    intro: `${n.people} need a visa for short trips to the Schengen area, and the application asks for a flight itinerary that matches your plans. The EU's own guidance recommends a booking you can change or cancel rather than a ticket bought before the visa is decided. Here's what that means for an application from ${n.country}.`,
    sections: [
      {
        heading: `Do ${n.people} need a Schengen visa?`,
        paragraphs: [
          `Yes. ${n.country} is on the EU list of countries whose nationals need a visa for short stays, which allow up to 90 days in any 180-day period across all Schengen countries combined.`,
          fee,
        ],
      },
      {
        heading: "Where to apply",
        paragraphs: [
          "Apply to the country that is your main destination. If your time is split equally, apply to the country you'll enter first. Book through the consulate's official visa centre only; the EU warns against agents who charge extra for appointments.",
          n.where,
        ],
      },
      {
        heading: "The flight reservation",
        paragraphs: [
          `Show a return trip, or an entry and exit, that matches the dates on your form and your accommodation. Most itineraries from ${n.country} start from ${n.airports}. Your name must match your passport exactly.`,
          "The EU's guidance for applicants says flight and hotel bookings should reflect your real plans and recommends refundable or changeable bookings, so you don't lose money if the visa is refused or delayed. A held reservation with a real booking reference does exactly that.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
      {
        heading: `Multiple-entry visas for ${n.people}`,
        paragraphs: [n.cascade ?? GENERAL_CASCADE],
      },
    ],
    faqs: [
      n.faq,
      {
        q: "Should I buy the ticket before my visa is approved?",
        a: "Usually not. EU guidance recommends refundable or changeable bookings, and most consulates accept a reservation. Buy the real ticket once the visa is in your passport.",
      },
      {
        q: "How long must my passport be valid?",
        a: "At least three months beyond the date you plan to leave the Schengen area, and issued within the last ten years. Check the consulate's checklist for any extra conditions.",
      },
    ],
    sources: [SRC_EEAS, SRC_FEE, SRC_LIST, SRC_CASCADE, ...extraSources],
    checked: CHECKED,
  };
}

const NATIONALITIES: Nationality[] = [
  {
    id: "india",
    country: "India",
    people: "Indians",
    adj: "Indian",
    airports: "Delhi, Mumbai, Bengaluru, Chennai, Hyderabad or Kochi",
    where:
      "Applications from India go through each country's visa centres in the major cities, so check which centre covers your state. If you live and work outside India, for example in the Gulf, you apply where you legally reside, not in India.",
    cascade:
      "Since 18 April 2024 the EU has had a specific cascade for Indian nationals living in India. If you've obtained and lawfully used two Schengen visas in the previous three years, you can normally get a two-year multiple-entry visa, usually followed by a five-year one if your passport has enough validity left.",
    faq: {
      q: "Does the Indian cascade apply if I live in Dubai?",
      a: "The India-specific decision covers Indian nationals residing in India. If you apply from elsewhere, the standard cascade rules apply instead.",
    },
    sources: [
      {
        label: "EEAS Delegation to India: EU adopts more favourable Schengen visa rules for Indians",
        url: "https://www.eeas.europa.eu/delegations/india/european-union-adopts-more-favourable-schengen-visa-rules-indians_en",
      },
    ],
  },
  {
    id: "nigeria",
    country: "Nigeria",
    people: "Nigerians",
    adj: "Nigerian",
    airports: "Lagos or Abuja",
    where:
      "Most Schengen countries take Nigerian applications in Lagos and Abuja, and some only in one of the two. Appointment demand is high, so book as early as the consulate allows and keep your documents consistent with each other.",
    faq: {
      q: "Do consulates in Nigeria check flight bookings?",
      a: "Officers can check a booking reference with the airline, and inconsistent or fake documents are a common reason for refusal. Only submit a reservation you can look up yourself on the airline's website.",
    },
  },
  {
    id: "philippines",
    country: "the Philippines",
    people: "Filipinos",
    adj: "Filipino",
    airports: "Manila, Cebu or Clark",
    where:
      "Schengen applications in the Philippines are handled mainly in Manila. Many Filipinos live and work abroad: if you're an overseas worker, you apply in the country where you hold residence, such as the UAE, Saudi Arabia or Hong Kong, not back home.",
    faq: {
      q: "I'm an OFW in the Middle East. Where do I apply?",
      a: "In the country where you legally reside and work, at the consulate or visa centre of your main Schengen destination there. Your flight itinerary can start from that country.",
    },
  },
  {
    id: "pakistan",
    country: "Pakistan",
    people: "Pakistanis",
    adj: "Pakistani",
    airports: "Islamabad, Lahore or Karachi",
    where:
      "Schengen countries take Pakistani applications in Islamabad, and many also in Lahore and Karachi through their visa centres. Some smaller Schengen countries are represented by another member state, so check who handles visas for your destination.",
    faq: {
      q: "What if my destination has no embassy in Pakistan?",
      a: "Schengen countries often represent each other. The destination country's website will name the embassy or visa centre that accepts applications on its behalf.",
    },
  },
  {
    id: "ghana",
    country: "Ghana",
    people: "Ghanaians",
    adj: "Ghanaian",
    airports: "Accra (Kotoka)",
    where:
      "Schengen consulates and visa centres for Ghana are in Accra. Apply in Ghana if you live there; Ghanaians resident elsewhere apply where they live.",
    cascade:
      "The EU has adopted a specific multiple-entry decision for applicants applying from Ghana, which adapts the standard cascade. In practice, a good record of using earlier Schengen visas correctly is what moves you to longer multiple-entry visas. Ask the consulate how the Ghana rules apply to your application.",
    faq: {
      q: "Is there a special multiple-entry rule for Ghana?",
      a: "Yes. The EU has a country-specific cascade decision for applications made in Ghana. Your travel history with earlier Schengen visas decides how long a visa you can get.",
    },
  },
  {
    id: "kenya",
    country: "Kenya",
    people: "Kenyans",
    adj: "Kenyan",
    airports: "Nairobi (Jomo Kenyatta) or Mombasa",
    where:
      "Schengen consulates and visa centres for Kenya are in Nairobi, and several also cover neighbouring countries from there. Apply in Kenya if you live there.",
    faq: {
      q: "Can I apply for a Schengen visa from Nairobi if I live in Uganda?",
      a: "Some consulates in Nairobi cover nearby countries, but normally you apply where you legally reside. Check the destination country's website for the office that covers your country.",
    },
  },
  {
    id: "egypt",
    country: "Egypt",
    people: "Egyptians",
    adj: "Egyptian",
    airports: "Cairo, Alexandria or Hurghada",
    where:
      "Most Schengen countries take Egyptian applications in Cairo, some also in Alexandria. Egyptians living in the Gulf apply in the country where they reside.",
    faq: {
      q: "Can I start my itinerary from the Gulf where I work?",
      a: "Yes, if you apply there as a resident. The itinerary should match where you'll actually fly from.",
    },
  },
  {
    id: "bangladesh",
    country: "Bangladesh",
    people: "Bangladeshis",
    adj: "Bangladeshi",
    airports: "Dhaka or Chittagong",
    where:
      "Several Schengen countries don't take visa applications in Bangladesh and instead accept them at an embassy in a neighbouring country, often New Delhi. Check where your destination accepts Bangladeshi applications before you book an appointment.",
    faq: {
      q: "Why do I have to apply in India for some countries?",
      a: "Some Schengen states have no visa section in Dhaka and cover Bangladesh from their embassy in New Delhi. Their website will say which office handles your application.",
    },
  },
  {
    id: "morocco",
    country: "Morocco",
    people: "Moroccans",
    adj: "Moroccan",
    airports: "Casablanca, Marrakech, Rabat, Tangier, Agadir or Fes",
    where:
      "Spain and France, the closest Schengen countries, have several consulates and visa centres across Morocco, and other countries mostly take applications in Rabat or Casablanca. Demand for appointments is high, so plan well ahead.",
    faq: {
      q: "Can I travel to Spain by ferry instead of flying?",
      a: "Yes, but the visa application still needs your travel plan. A ferry booking can work for the crossing; for flights, a held reservation with a booking reference is the usual proof.",
    },
  },
  {
    id: "turkey",
    country: "Türkiye",
    people: "Turkish citizens",
    adj: "Turkish",
    airports: "Istanbul, Ankara, Izmir or Antalya",
    where:
      "Schengen countries take applications in Istanbul and Ankara, and several also in Izmir, Antalya and other cities through their visa centres.",
    cascade:
      "Since 15 July 2025 the EU has had a specific cascade for Turkish nationals living in Türkiye. After a first visa for your trip, a second visa can be multiple-entry for 90 days within six months; after two visas obtained and lawfully used in three years you can get a one-year visa, then three years, then five. Truck drivers are excluded.",
    faq: {
      q: "Does the new Turkish cascade cover business travellers?",
      a: "It covers Turkish nationals residing in Türkiye with a good travel history, whatever the purpose of the trip, except truck drivers, who have separate rules.",
    },
    sources: [
      {
        label: "EEAS Delegation to Türkiye: more favourable visa rules for Turkish citizens",
        url: "https://www.eeas.europa.eu/delegations/t%C3%BCrkiye/more-favourable-visa-rules-turkish-citizens-applying-schengen-visas_en",
      },
    ],
  },
  {
    id: "china",
    country: "China",
    people: "Chinese citizens",
    adj: "Chinese",
    airports: "Beijing, Shanghai, Guangzhou, Chengdu or Shenzhen",
    where:
      "Schengen countries have visa centres in many Chinese cities, each covering particular provinces. Check which consulate district you belong to before booking. Hong Kong and Macao passport holders don't need a Schengen visa; this guide is for People's Republic of China passports.",
    faq: {
      q: "Do Hong Kong passport holders need this?",
      a: "No. Holders of Hong Kong SAR and Macao SAR passports can visit the Schengen area without a visa for short stays. Mainland Chinese passport holders do need one.",
    },
  },
  {
    id: "indonesia",
    country: "Indonesia",
    people: "Indonesians",
    adj: "Indonesian",
    airports: "Jakarta, Bali (Denpasar) or Surabaya",
    where:
      "Schengen countries take Indonesian applications mainly in Jakarta, with some visa centres in Bali, Surabaya and other cities.",
    cascade:
      "Since 23 July 2025, Indonesian nationals living in Indonesia who have obtained and lawfully used one Schengen visa in the previous three years can be issued a five-year multiple-entry visa, as long as the passport is valid long enough. It still allows 90 days in any 180 and doesn't give the right to work.",
    faq: {
      q: "Can Indonesians get a five-year Schengen visa straight away?",
      a: "Not on a first application. You need one Schengen visa obtained and used correctly in the last three years, plus a passport valid long enough.",
    },
    sources: [
      {
        label: "EEAS Delegation to Indonesia: more favourable Schengen visa rules for Indonesia",
        url: "https://www.eeas.europa.eu/delegations/indonesia/european-union-adopts-more-favourable-schengen-visa-rules-indonesia_en",
      },
    ],
  },
  {
    id: "vietnam",
    country: "Vietnam",
    people: "Vietnamese citizens",
    adj: "Vietnamese",
    airports: "Hanoi, Ho Chi Minh City or Da Nang",
    where:
      "Schengen countries take Vietnamese applications in Hanoi and Ho Chi Minh City. Check which office covers the province you live in.",
    faq: {
      q: "Do I need to show a return flight to Vietnam?",
      a: "You need to show you'll leave the Schengen area. That's usually a return to Vietnam, but a flight on to another country you're allowed to enter also works.",
    },
  },
  {
    id: "south-africa",
    country: "South Africa",
    people: "South Africans",
    adj: "South African",
    airports: "Johannesburg, Cape Town or Durban",
    where:
      "Schengen countries take South African applications in Pretoria, Johannesburg, Cape Town and Durban through their visa centres. Apply in the city that covers your province.",
    faq: {
      q: "Do South Africans need a visa for every Schengen country?",
      a: "One Schengen visa covers all Schengen countries for the trip it's issued for. Apply to your main destination.",
    },
  },
  {
    id: "algeria",
    country: "Algeria",
    people: "Algerians",
    adj: "Algerian",
    airports: "Algiers, Oran or Constantine",
    where:
      "France and Spain have consulates in several Algerian cities; other Schengen countries mostly take applications in Algiers. Demand is high, so book as early as you can.",
    cascade:
      "The EU has adopted a specific multiple-entry decision for applications made in Algeria, adapting the standard cascade. A record of using earlier Schengen visas correctly is what leads to longer visas. Ask the consulate how it applies to you.",
    faq: {
      q: "Is there a special multiple-entry rule for Algeria?",
      a: "Yes. The EU has a country-specific decision for applications lodged in Algeria. Your history with earlier Schengen visas decides the length.",
    },
  },
  {
    id: "saudi-arabia",
    country: "Saudi Arabia",
    people: "Saudi citizens",
    adj: "Saudi",
    airports: "Riyadh, Jeddah or Dammam",
    where:
      "Schengen countries take applications in Riyadh and Jeddah, some also in Al Khobar or Dammam. Saudi citizens apply where they live.",
    cascade:
      "In April 2024 the European Commission adopted rules making five-year multiple-entry Schengen visas available to Saudi citizens with a good travel history, bringing Saudi Arabia in line with other Gulf countries. Each application is still assessed individually.",
    faq: {
      q: "Can Saudi citizens get a five-year Schengen visa?",
      a: "Yes, under the rules the EU adopted in April 2024, eligible travellers with a history of using Schengen visas correctly can get long multiple-entry visas. The consulate decides the length.",
    },
    sources: [
      {
        label: "The National: EU announces five-year Schengen visas for Saudi, Omani and Bahraini citizens",
        url: "https://www.thenationalnews.com/news/gulf/2024/04/23/eu-announces-five-year-schengen-visas-for-saudi-omani-and-bahraini-citizens",
      },
    ],
  },
  {
    id: "thailand",
    country: "Thailand",
    people: "Thais",
    adj: "Thai",
    airports: "Bangkok (Suvarnabhumi), Phuket or Chiang Mai",
    where:
      "Schengen countries take Thai applications in Bangkok, through embassies and their visa centres.",
    cascade:
      "In 2026 the EU adopted a specific cascade for Thai nationals living in Thailand. Bona fide travellers who have obtained and lawfully used a Schengen visa in the previous two years can get a one-year multiple-entry visa, then two-year visas, and eventually five-year visas.",
    faq: {
      q: "What do Thai applicants need for a one-year multiple-entry visa?",
      a: "Under the Thailand cascade, a Schengen visa obtained and used correctly in the previous two years, no overstays, and residence in Thailand.",
    },
    sources: [
      {
        label: "EEAS Delegation to Thailand: EU adopts more favourable Schengen visa rules for Thailand",
        url: "https://www.eeas.europa.eu/delegations/thailand/eu-adopts-more-favourable-schengen-visa-rules-thailand_en",
      },
    ],
  },
  {
    id: "sri-lanka",
    country: "Sri Lanka",
    people: "Sri Lankans",
    adj: "Sri Lankan",
    airports: "Colombo",
    where:
      "Some Schengen countries take Sri Lankan applications in Colombo; others cover Sri Lanka from an embassy in New Delhi or through another member state. Check where your destination accepts applications.",
    faq: {
      q: "Do I have to travel to India to apply?",
      a: "Only if your destination country has no visa service in Sri Lanka. Many applications can be made in Colombo, sometimes through a country that represents your destination.",
    },
  },
  {
    id: "nepal",
    country: "Nepal",
    people: "Nepalis",
    adj: "Nepali",
    airports: "Kathmandu",
    where:
      "Only a few Schengen countries take visa applications in Kathmandu. Many cover Nepal from their embassy in New Delhi, so check before you book. Nepalis working abroad apply where they reside.",
    faq: {
      q: "Can I apply in Kathmandu for any Schengen country?",
      a: "No. Check your destination's embassy website: if it has no visa service in Nepal, it will name the embassy that handles Nepali applications, often in New Delhi.",
    },
  },
  {
    id: "iran",
    country: "Iran",
    people: "Iranians",
    adj: "Iranian",
    airports: "Tehran (Imam Khomeini), Shiraz or Mashhad",
    where:
      "Schengen countries take Iranian applications in Tehran. Waiting times can be long, so start early, and keep the itinerary realistic for the routes currently flying.",
    cascade:
      "The EU has a specific multiple-entry decision for Iranian nationals residing in Iran, adapting the standard cascade. A record of using earlier Schengen visas correctly is what leads to longer visas.",
    faq: {
      q: "Is there a special multiple-entry rule for Iranians?",
      a: "Yes, the EU has a country-specific cascade decision for Iranian nationals living in Iran. Ask the consulate how it applies to your case.",
    },
  },
  {
    id: "tunisia",
    country: "Tunisia",
    people: "Tunisians",
    adj: "Tunisian",
    airports: "Tunis, Monastir, Enfidha or Djerba",
    where:
      "Most Schengen countries take Tunisian applications in Tunis through their visa centres, with France and Italy among the busiest.",
    faq: {
      q: "Can I fly back from a different Schengen country?",
      a: "Yes. Show the real plan: arriving in one Schengen country and leaving from another is fine, as long as the dates match your form.",
    },
  },
  {
    id: "armenia",
    country: "Armenia",
    people: "Armenians",
    adj: "Armenian",
    airports: "Yerevan (Zvartnots) or Gyumri",
    fee: "Armenia has a visa facilitation agreement with the EU, so the fee for Armenian citizens is €35 rather than the standard €90, and some categories of applicant pay nothing. The visa centre's service charge comes on top.",
    where:
      "Schengen countries take Armenian applications in Yerevan. The facilitation agreement also simplifies supporting documents for some groups, such as students and business travellers.",
    faq: {
      q: "How much is a Schengen visa for Armenians?",
      a: "€35 under the EU-Armenia visa facilitation agreement, with some categories exempt, plus any visa centre service charge.",
    },
    sources: [SRC_REDUCED_FEE],
  },
  {
    id: "azerbaijan",
    country: "Azerbaijan",
    people: "Azerbaijanis",
    adj: "Azerbaijani",
    airports: "Baku (Heydar Aliyev)",
    fee: "Azerbaijan has a visa facilitation agreement with the EU, so the fee for Azerbaijani citizens is €35 rather than the standard €90, and some categories pay nothing. The visa centre's service charge comes on top.",
    where:
      "Schengen countries take Azerbaijani applications in Baku, directly or through a visa centre.",
    faq: {
      q: "How much is a Schengen visa for Azerbaijanis?",
      a: "€35 under the EU-Azerbaijan visa facilitation agreement, with some categories exempt, plus any visa centre service charge.",
    },
    sources: [SRC_REDUCED_FEE],
  },
  {
    id: "uzbekistan",
    country: "Uzbekistan",
    people: "Uzbeks",
    adj: "Uzbek",
    airports: "Tashkent, Samarkand or Bukhara",
    where:
      "Only some Schengen countries have a visa service in Tashkent. Others cover Uzbekistan from an embassy in a neighbouring country or through another member state, so check before booking.",
    faq: {
      q: "My destination has no embassy in Tashkent. What now?",
      a: "Its website will name the embassy or member state that handles Uzbek applications. That's where you apply.",
    },
  },
  {
    id: "jordan",
    country: "Jordan",
    people: "Jordanians",
    adj: "Jordanian",
    airports: "Amman (Queen Alia) or Aqaba",
    where:
      "Schengen countries take Jordanian applications in Amman, directly or through their visa centres.",
    faq: {
      q: "Do Jordanians need a return ticket for the visa?",
      a: "You need to show a planned exit from the Schengen area that matches your dates. A held reservation is the usual way to do that without paying for a ticket before the visa is approved.",
    },
  },
];

export const EN_SCHENGEN_NATIONALITY_GUIDES: Guide[] = NATIONALITIES.map(build);
