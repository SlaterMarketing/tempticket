/**
 * Digital nomad visa guides. Each programme's facts (income, length, fees,
 * conditions) are checked against the official government or embassy page cited.
 * The onward-ticket angle: nomads often arrive one-way, and many enter as
 * visitors first, which is when airlines ask for proof of onward travel.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Nomad = {
  id: string;
  country: string;
  programme: string;
  /** For the comparison table. */
  income: string;
  length: string;
  facts: string[];
  /** How arrival works, and where onward tickets come in. */
  arrival: string;
  faq: GuideFaq;
  sources: GuideSource[];
  /** Existing onward-ticket guide slug for this country, if any. */
  related?: string;
};

const VISITOR_FIRST =
  "If you fly in as a visitor before your permit is issued, you're treated like any other tourist at check-in: airlines can ask a one-way passenger for proof of onward travel within the visa-free stay. A held reservation covers that gap without buying a flight you won't take.";

const NOMADS: Nomad[] = [
  {
    id: "thailand", country: "Thailand", programme: "Destination Thailand Visa (DTV)",
    income: "Funds of 500,000 baht (about £12,000)", length: "5 years, 180 days per entry",
    facts: [
      "The DTV is valid for five years with multiple entries, allowing 180 days per entry, extendable once in Thailand by up to 180 days. After that you leave and re-enter on the same visa.",
      "It covers remote workers, digital nomads and freelancers (the 'workcation' category), Thai soft-power activities such as Muay Thai or cooking courses, and dependants. At the Royal Thai Embassy in London the fee is £300 and applicants show at least £12,000 (500,000 baht) in funds.",
    ],
    arrival: "With a DTV in your passport you can enter one-way, since the visa itself allows long stays. Without it, visa-exempt entry is much shorter and airlines check onward travel. " + VISITOR_FIRST,
    faq: { q: "Can I work for Thai clients on a DTV?", a: "The workcation category is for remote work for employers or clients abroad. Working for Thai companies needs a work permit." },
    sources: [{ label: "Royal Thai Embassy, London: Destination Thailand Visa", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" }],
    related: "onward-ticket-thailand",
  },
  {
    id: "japan", country: "Japan", programme: "Digital Nomad (Designated Activities)",
    income: "¥10 million a year", length: "6 months, no extension",
    facts: [
      "Japan's digital nomad visa needs annual income of at least ¥10 million, shown with tax, income or employment documents, and insurance covering death, injury and illness with at least ¥10 million of medical cover.",
      "The stay is six months and can't be extended or renewed. A spouse or child can come with you, with their own insurance.",
    ],
    arrival: "The visa is issued before travel, so you can fly in on it. Six months is the hard limit, so plan your exit flight within it.",
    faq: { q: "Can I extend Japan's digital nomad visa?", a: "No. It's six months with no extension, according to Japan's Ministry of Foreign Affairs." },
    sources: [{ label: "Ministry of Foreign Affairs of Japan: Designated activities (Digital Nomad)", url: "https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html" }],
    related: "onward-ticket-japan",
  },
  {
    id: "spain", country: "Spain", programme: "International telework visa",
    income: "200% of Spain's monthly minimum wage", length: "Up to 1 year, then a residence card",
    facts: [
      "You need at least 200% of the Spanish monthly minimum wage, plus 75% for the first family member and 25% for each additional one. The work must be remote for a company outside Spain; self-employed applicants can work for Spanish clients for up to 20% of their activity.",
      "You need a degree or three years' experience in your field, at least three months working for the foreign company, health insurance and a clean criminal record. The visa is valid for up to a year, after which you can apply for a residence card in Spain.",
    ],
    arrival: "Once the visa is issued you can enter one-way. Spain is in the Schengen area, so before that you're a short-stay visitor limited to 90 days in 180.",
    faq: { q: "How much income do I need for Spain's digital nomad visa?", a: "At least 200% of the Spanish monthly minimum wage, more with family members. Check the current minimum wage figure, as it changes." },
    sources: [{ label: "Consulate General of Spain in London: Digital Nomad Visa", url: "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx" }],
    related: "onward-ticket-schengen-europe",
  },
  {
    id: "portugal", country: "Portugal", programme: "Temporary stay visa for remote work",
    income: "4× Portugal's monthly minimum wage", length: "Temporary stay (residency visa also available)",
    facts: [
      "Applicants show average monthly income over the last three months of at least four times the Portuguese minimum wage, plus travel insurance covering medical care and repatriation.",
      "Portugal also offers a residency visa for remote work for those planning to settle longer.",
    ],
    arrival: "The temporary stay checklist asks for a copy of the return transport ticket, which makes Portugal one of the few nomad visas where the return booking is part of the application itself. Citizens of CPLP countries are exempt from the insurance and return ticket requirements.",
    faq: { q: "Do I need a return ticket for Portugal's digital nomad visa?", a: "For the temporary stay visa, yes: the checklist asks for a copy of the return transport ticket, unless you're a CPLP citizen." },
    sources: [{ label: "Embassy of Portugal in Tokyo: temporary stay visa for remote work checklist", url: "https://toquio.embaixadaportugal.mne.gov.pt/images/vistos/checklists/en/estada_temporaria/temporary_stay_visa_for_remote_work_-_digital_nomads.pdf" }],
    related: "onward-ticket-schengen-europe",
  },
  {
    id: "croatia", country: "Croatia", programme: "Temporary stay for digital nomads",
    income: "€3,622.50 a month (or a lump sum)", length: "Up to 18 months",
    facts: [
      "You need at least 2.5 times Croatia's average monthly net salary, currently €3,622.50 a month, plus 10% for each family member. You can instead show €43,470 in savings for 12 months or €65,205 for 18 months.",
      "Stays are up to 18 months. You must work for a foreign employer or your own non-Croatian company, have health insurance and register your address within three days of arriving.",
    ],
    arrival: "Visa-exempt nationals can apply online and enter as visitors; nationals who need a visa apply at a Croatian embassy or consulate. " + VISITOR_FIRST,
    faq: { q: "Can I extend a Croatian digital nomad permit?", a: "Yes, by up to six months, if you apply at least 60 days before it expires. A new application is possible six months after it ends." },
    sources: [{ label: "Croatian Ministry of the Interior: temporary stay of digital nomads", url: "https://mup.gov.hr/aliens-281621/temporary-stay-of-digital-nomads-286853/286853" }],
    related: "onward-ticket-schengen-europe",
  },
  {
    id: "malta", country: "Malta", programme: "Nomad Residence Permit",
    income: "€42,000 a year (gross)", length: "1 year, renewable",
    facts: [
      "The minimum gross income is €42,000 a year for applications since 1 April 2024. You must work remotely for a foreign employer, your own foreign company, or foreign clients as a freelancer.",
      "You also need health insurance covering the EU and the UK, a rental or purchase agreement in Malta, a police conduct certificate and a background check.",
    ],
    arrival: VISITOR_FIRST,
    faq: { q: "What income do I need for Malta's Nomad Residence Permit?", a: "€42,000 gross a year for applications since 1 April 2024, according to Residency Malta." },
    sources: [{ label: "Residency Malta Agency: Nomad Residence Permit eligibility", url: "https://nomad.residencymalta.gov.mt/nomad-eligibility/" }],
    related: "onward-ticket-schengen-europe",
  },
  {
    id: "italy", country: "Italy", programme: "Digital nomad / remote worker visa",
    income: "Above €24,780 a year", length: "National long-stay visa",
    facts: [
      "Your income in the previous year must exceed the level for exemption from public health charges, given by the Italian embassy in Ottawa as €24,780. You need a degree, three years' relevant experience, or a qualification plus five years' experience, and health insurance for the whole stay.",
      "Processing can take up to 120 days for digital nomad visas and 90 days for remote workers.",
    ],
    arrival: "Interestingly, the embassy notes that stays over 90 days use a national visa with a one-way ticket, while stays of up to 90 days use a Schengen visa with a round-trip ticket.",
    faq: { q: "Can I fly to Italy one-way on a digital nomad visa?", a: "Yes. For the national long-stay visa the embassy refers to a one-way ticket; short Schengen stays need a round trip." },
    sources: [{ label: "Embassy of Italy in Ottawa: digital nomad / remote worker visa", url: "https://ambottawa.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/digital-nomad-remote-worker-visa/" }],
    related: "onward-ticket-schengen-europe",
  },
  {
    id: "hungary", country: "Hungary", programme: "White Card",
    income: "€3,000 net a month", length: "1 year, extendable once",
    facts: [
      "You need at least €3,000 net a month for the six months before entry, kept up during your stay, from an employer or company abroad. You can't work for Hungarian clients or own part of a Hungarian company.",
      "The permit lasts up to a year and can be extended once for another year, if you've spent at least 90 of the previous 180 days in Hungary.",
    ],
    arrival: "The application asks for a place to stay, health insurance, and a valid travel document or onward ticket, so have a booking ready. " + VISITOR_FIRST,
    faq: { q: "How long is Hungary's White Card valid?", a: "Up to one year, extendable once for another year." },
    sources: [{ label: "Hungarian National Directorate-General for Aliens Policing: White Card", url: "https://oif.gov.hu/factsheets/white-card-residency-for-digital-nomads" }],
    related: "onward-ticket-schengen-europe",
  },
  {
    id: "estonia", country: "Estonia", programme: "Digital Nomad Visa",
    income: "€4,500 net a month", length: "Up to 1 year",
    facts: [
      "You need net income of at least €4,500 a month from an employer or company registered outside Estonia, or mostly foreign freelance clients, and must be able to work location-independently.",
      "Apply at your nearest Estonian embassy; processing takes up to 30 days.",
    ],
    arrival: "The visa is issued before travel. If you're visa-exempt and visiting first, the Schengen 90-in-180 rule applies until it's granted.",
    faq: { q: "Is Estonia's digital nomad visa the same as e-Residency?", a: "No. e-Residency is a digital identity for running an Estonian company; it doesn't let you live in Estonia. The nomad visa does, for up to a year." },
    sources: [{ label: "e-Residency (Republic of Estonia): Digital Nomad Visa vs e-Residency", url: "https://www.e-resident.gov.ee/nomadvisa/" }],
    related: "onward-ticket-schengen-europe",
  },
  {
    id: "montenegro", country: "Montenegro", programme: "Digital nomad temporary residence",
    income: "Proof of means (no fixed minimum published)", length: "Up to 2 years, extendable once",
    facts: [
      "The permit lasts up to two years and can be extended once for up to two more. You need proof of financial means, accommodation, health insurance, a clean record and a contract showing you work electronically for a foreign company or your own non-Montenegrin company.",
      "Apply in person at the Ministry of Internal Affairs where you live; the permit is issued within 40 days.",
    ],
    arrival: "You must have entered Montenegro lawfully, which for most nomads means arriving as a visitor first. " + VISITOR_FIRST,
    faq: { q: "Do I apply for Montenegro's nomad permit from abroad?", a: "You apply in person at the Ministry of Internal Affairs in Montenegro after entering lawfully." },
    sources: [{ label: "Government of Montenegro: digital nomads legal status", url: "https://digitalnomads.gov.me/article/legal-status-for-nomads" }],
    related: "onward-ticket-montenegro",
  },
  {
    id: "south-korea", country: "South Korea", programme: "Workation visa (F-1-D)",
    income: "2× Korea's GNI per capita (about $65,800)", length: "1 year, extendable 1 year",
    facts: [
      "You need after-tax income of more than twice Korea's previous-year GNI per capita, about $65,800 a year on the current standard, at least a year's employment with your company, and medical insurance of €70,000 for the whole stay.",
      "The visa is multiple-entry for a year and can be extended by up to a year at an immigration office in Korea.",
    ],
    arrival: "The F-1-D is issued before travel by a Korean embassy or consulate. Without it, visa-free visitors must have an onward or return ticket, according to the UK Foreign Office.",
    faq: { q: "How much do I need to earn for Korea's workation visa?", a: "More than twice Korea's previous-year GNI per capita after tax, about $65,800 a year on the current figure." },
    sources: [{ label: "Consulate General of Korea in Seattle: F-1-D workation visa", url: "https://overseas.mofa.go.kr/us-seattle-en/brd/m_23042/view.do?seq=41" }],
    related: "onward-ticket-south-korea",
  },
  {
    id: "malaysia", country: "Malaysia", programme: "DE Rantau Nomad Pass",
    income: "$24,000 a year (tech) or $60,000 (non-tech)", length: "3 to 12 months, renewable to 24",
    facts: [
      "Tech professionals need at least $24,000 a year; non-tech professionals $60,000. The pass lasts 3 to 12 months and can be renewed for another 12, up to 24 months in total.",
      "Fees are RM1,080 per applicant and RM540 per dependant, plus immigration pass fees and, if MDEC sponsors you, a refundable bond. Your passport needs more than 14 months' validity when you apply.",
    ],
    arrival: "Many applicants arrive as visitors first, normally with 90 days on arrival for British passports. " + VISITOR_FIRST,
    faq: { q: "Who can apply for Malaysia's DE Rantau pass?", a: "All nationalities except Israeli citizens, aged over 18, meeting the income threshold for tech or non-tech roles." },
    sources: [{ label: "MDEC: DE Rantau Pass FAQ (version 10)", url: "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf" }],
    related: "onward-ticket-malaysia",
  },
  {
    id: "indonesia", country: "Indonesia", programme: "Remote worker visa (E33G)",
    income: "$60,000 a year", length: "Up to 1 year",
    facts: [
      "You need income of at least $60,000 a year, a bank balance of at least $2,000 over the last three months, and an employment contract with a company outside Indonesia. You can't sell goods or services or work for Indonesian clients.",
      "The visa allows a stay of up to a year and must be used to enter within 90 days of issue. The official fee is listed as 7,000,000 rupiah for a year.",
    ],
    arrival: "With the remote worker visa you can enter without the onward-ticket check that applies to the 30-day visa on arrival.",
    faq: { q: "Can I live in Bali on a remote worker visa?", a: "Yes, for up to a year, as long as you work for a company outside Indonesia and don't sell services locally." },
    sources: [{ label: "Indonesian Directorate General of Immigration: official eVisa FAQ", url: "https://evisa.imigrasi.go.id/front/faq/e076131c-0d39-469b-afaf-75fc66aff923" }],
    related: "onward-ticket-bali-indonesia",
  },
  {
    id: "costa-rica", country: "Costa Rica", programme: "Digital nomad stay (Estancia)",
    income: "$3,000 a month ($4,000 with family)", length: "See official site",
    facts: [
      "Applicants need at least $3,000 a month from outside Costa Rica, or $4,000 a month to include family, converted at the Central Bank's official rate.",
      "The government fee is $100, which must arrive in full at the Ministry of Finance; the receiving bank charges $15 on top.",
    ],
    arrival: "Most nomads arrive as tourists while the application is processed, and Costa Rica is known for airlines checking onward tickets. " + VISITOR_FIRST,
    faq: { q: "What income do I need for Costa Rica's digital nomad visa?", a: "$3,000 a month for one person, or $4,000 to include family, from sources outside Costa Rica." },
    sources: [{ label: "Visit Costa Rica (ICT): digital nomad requirements", url: "https://www.visitcostarica.com/digital-nomads/requirements" }],
    related: "onward-ticket-costa-rica",
  },
  {
    id: "panama", country: "Panama", programme: "Short-stay visa for remote workers",
    income: "$36,000 a year", length: "9 months, extendable 9 more",
    facts: [
      "You need foreign income of at least $36,000 a year (private-sector employees over $3,000 a month) and international health insurance for your stay. The fee is $250.",
      "The visa is granted for up to nine months and can be extended for nine more.",
    ],
    arrival: VISITOR_FIRST,
    faq: { q: "How long can I stay in Panama as a remote worker?", a: "Nine months, extendable once for another nine." },
    sources: [{ label: "ProPanamá (Government of Panama): visa for digital nomads", url: "https://propanama.gob.pa/visa-para-nomadas-digitales/" }],
    related: "onward-ticket-panama",
  },
  {
    id: "barbados", country: "Barbados", programme: "Welcome Stamp",
    income: "$50,000 a year", length: "12 months, can reapply",
    facts: [
      "The Welcome Stamp lets you work remotely from Barbados for up to 12 months if you earn at least $50,000 a year. Fees are $2,000 for an individual and $3,000 for a family, paid after approval.",
      "Remote income isn't taxed in Barbados, though 17.5% VAT applies to local spending.",
    ],
    arrival: "Barbados requires visitors to show an onward or return ticket to enter, according to the UK Foreign Office, so arriving before your stamp is approved means having that booking.",
    faq: { q: "Is the Barbados Welcome Stamp taxed?", a: "Remote income isn't subject to Barbados income tax, but VAT applies to purchases." },
    sources: [
      { label: "Visit Barbados: 12-month Barbados Welcome Stamp", url: "https://www.visitbarbados.org/barbados-welcome-stamp" },
      { label: "UK Foreign Office: Barbados entry requirements", url: "https://www.gov.uk/foreign-travel-advice/barbados/entry-requirements" },
    ],
    related: "onward-ticket-barbados",
  },
  {
    id: "mauritius", country: "Mauritius", programme: "Premium Visa",
    income: "See EDB Mauritius", length: "1 year, renewable",
    facts: [
      "The Premium Visa lets you stay in Mauritius for a year, renewable, and is free of charge. Applications go through the Economic Development Board.",
    ],
    arrival: "Visitors to Mauritius must be able to show proof of onward or return travel, according to the UK Foreign Office, so have a booking if you arrive before the Premium Visa is granted.",
    faq: { q: "How much does the Mauritius Premium Visa cost?", a: "Nothing: the Passport and Immigration Office says it's free of cost." },
    sources: [
      { label: "Mauritius Passport and Immigration Office: Premium Visa", url: "https://passport.govmu.org/passport/?page_id=595" },
      { label: "UK Foreign Office: Mauritius entry requirements", url: "https://www.gov.uk/foreign-travel-advice/mauritius/entry-requirements" },
    ],
    related: "onward-ticket-mauritius",
  },
];

function build(n: Nomad): Guide {
  return {
    key: `digital-nomad-visa-${n.id}`,
    slug: `digital-nomad-visa-${n.id}`,
    title: `${n.country} Digital Nomad Visa: Income, Length and Arriving One-Way`,
    h1: `${n.country} digital nomad visa: ${n.programme}`,
    description: `The ${n.programme}: income requirement (${n.income}), how long it lasts, the conditions, and what to show if you fly to ${n.country} one-way.`,
    intro: `${n.country}'s ${n.programme} lets remote workers base themselves there legally. Here are the checked requirements, and how arrival works for nomads who usually travel one-way.`,
    sections: [
      { heading: "The requirements", paragraphs: n.facts },
      { heading: "Arriving one-way", paragraphs: [n.arrival, TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [n.faq],
    sources: n.sources,
    checked: CHECKED,
  };
}

export const EN_NOMAD_GUIDES: Guide[] = [
  {
    key: "digital-nomad-visas-compared",
    slug: "digital-nomad-visas-compared",
    title: "Digital Nomad Visas Compared: Income and Length by Country",
    h1: "Digital nomad visas compared",
    description:
      "Income requirements and length of stay for 17 digital nomad visas, from Thailand's DTV to Spain, Portugal, Japan and Costa Rica, each checked against official sources.",
    intro:
      "Digital nomad visas vary wildly: some want a few thousand euros a month, others ¥10 million a year; some last six months, others five years. This table compares the main ones, with each figure taken from the government or embassy page linked on that country's guide.",
    table: {
      caption: "Digital nomad visas: income and length",
      headers: ["Country", "Programme", "Income or funds", "Length"],
      rows: NOMADS.map((n) => [n.country, n.programme, n.income, n.length]),
      rowLinks: NOMADS.map((n) => `digital-nomad-visa-${n.id}`),
      note: "Thresholds change, often yearly. Check the official source on each country's guide before applying.",
    },
    sections: [
      {
        heading: "The part nobody mentions: getting there",
        paragraphs: [
          "Most nomads travel one-way, and many arrive as visitors before their permit is approved, or apply from inside the country. At that point airlines treat you as a tourist and can ask for proof of onward travel. Portugal's temporary stay visa even asks for a return ticket as part of the application.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      { q: "Which digital nomad visa has the lowest income requirement?", a: "Among these, Malaysia's DE Rantau for tech workers ($24,000 a year) and Italy (above €24,780 a year) are lowest, but each has other conditions. Thailand's DTV uses a savings requirement instead." },
      { q: "Which lasts longest?", a: "Thailand's DTV is valid for five years, with 180 days per entry." },
    ],
    sources: NOMADS.flatMap((n) => n.sources.slice(0, 1)),
    checked: CHECKED,
  },
  ...NOMADS.map(build),
];
