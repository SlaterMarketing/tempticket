/**
 * English SEO guides for people searching for onward-ticket and visa-itinerary help.
 * Each guide ends in the affiliate CTA. Keep rules general and point readers at official
 * sources: entry rules change, and these pages must not read as legal advice.
 */

import type { Guide, GuideUi } from "./types";

export const VERIFY_STEP =
  "Once your reservation arrives, open the airline's manage-booking page and look it up with the booking reference (PNR) and your surname. If you can see it there, so can a check-in agent. Screenshot it as well as keeping the email.";

export const TIMING_STEP =
  "Reservations of this kind are held for a limited time (typically around 48 hours) before they lapse. Book it shortly before check-in or your visa appointment, not weeks ahead.";

export const EN_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
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
    key: "onward-ticket-thailand",
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
      {
        heading: "What the UK Foreign Office says",
        paragraphs: [
          "For British visitors, the UK Foreign Office says entry under Thailand's visa exemption scheme allows up to 30 days, for tourism only. Immigration may ask for evidence of onward or return travel and proof of funds of at least 10,000 baht per person or 20,000 baht per family.",
          "All foreign arrivals must also complete the Thailand Digital Arrival Card (TDAC) online in the three days before arrival, and passports need six months' validity from arrival and one blank page.",
        ],
      },
    ],
    sources: [{ label: "UK Foreign Office: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" }],
    checked: "2026-11-01",
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
    key: "onward-ticket-philippines",
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
      {
        heading: "What the UK Foreign Office says",
        paragraphs: [
          "The UK Foreign Office says most UK visitors are expected to have proof of return or onward travel, and that immigration officials and airlines may ask to see it. British visitors can stay up to 30 days without a visa and can extend once in the country.",
          "Everyone arriving must register on the free eTravel system in the three days before arrival and show the QR code. Passports need six months' validity from arrival.",
        ],
      },
    ],
    sources: [{ label: "UK Foreign Office: Philippines entry requirements", url: "https://www.gov.uk/foreign-travel-advice/philippines/entry-requirements" }],
    checked: "2026-11-01",
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
    key: "onward-ticket-bali-indonesia",
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
      {
        heading: "What the UK Foreign Office says",
        paragraphs: [
          "For British visitors, the UK Foreign Office says the 30-day visa on arrival costs 500,000 rupiah and requires proof of an onward or return journey. You can apply online for the e-VOA at least a week ahead instead.",
          "Complete the free online customs and health declaration within 72 hours of arrival. Bali charges foreign tourists a levy of 150,000 rupiah. Passports need six months' validity from arrival and two blank pages.",
        ],
      },
    ],
    sources: [{ label: "UK Foreign Office: Indonesia entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" }],
    checked: "2026-11-01",
    faqs: [
      {
        q: "Can I enter Bali on a one-way ticket?",
        a: "You can fly there on one, but you should expect to show an onward or return flight at check-in or on arrival.",
      },
    ],
  },
  {
    key: "onward-ticket-costa-rica",
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
    key: "onward-ticket-colombia-peru",
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
    key: "onward-ticket-new-zealand",
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
    key: "flight-itinerary-for-schengen-visa",
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
    key: "one-way-ticket-denied-boarding",
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
  {
    key: "dummy-ticket-for-visa",
    slug: "dummy-ticket-for-visa",
    title: "Dummy Ticket for Visa: Real Reservations vs Fake PDFs",
    h1: "Dummy ticket for a visa application",
    description:
      "What a \"dummy ticket\" for a visa really is, why consulates ask for one, how to tell a real reservation from a fake PDF, and how to get one you can verify.",
    intro:
      "A \"dummy ticket\" is the travel industry's name for a flight reservation used to support a visa application. It shows your planned dates and route without you paying for a ticket you might not be able to use. The name is misleading: a good one isn't fake at all. It's a real booking held on the airline's system for a short time.",
    sections: [
      {
        heading: "Why consulates ask for one",
        paragraphs: [
          "Visa officers want to see that your trip has a clear start and end, and that the dates match the rest of your application. Many embassies and visa centres say directly that you should not buy a ticket before the visa is granted, so a reservation is the expected document.",
          "Consulates that commonly list a flight itinerary or reservation include Schengen countries, Japan, and many others. Some, like the UK and the US, don't require one but accept it as supporting evidence.",
        ],
      },
      {
        heading: "Real reservation or fake PDF?",
        paragraphs: [
          "A real reservation has a booking reference (PNR) that you can look up on the airline's own manage-booking page. A fake is a document edited to look like a booking, with nothing behind it.",
          "Consulates and airlines can and do check. Submitting a forged document can get your application refused and may count against you in future applications. Only use a reservation you can verify yourself.",
        ],
      },
      {
        heading: "Getting the details right",
        paragraphs: [
          "Your name must match your passport exactly, including middle names if your passport shows them. Dates should match the dates on your application form and any hotel bookings.",
          "Most visa applications want a round trip. If you're travelling through several countries, the reservation should start in the country of your main stay or first entry, as your consulate's checklist describes.",
        ],
      },
      {
        heading: "Timing",
        paragraphs: [
          "Reservations are held for a limited time, often around 48 hours, before they lapse. Book it a day or two before your appointment or submission so it's live when your documents are first reviewed. It's normal for it to expire before a decision.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Is a dummy ticket legal?",
        a: "A real flight reservation is legal and is what many consulates ask for. A forged or edited booking is not, and can get your visa refused.",
      },
      {
        q: "Will the embassy check the booking?",
        a: "They may, especially at the start of processing. That's why the reservation needs a PNR you can look up on the airline's website.",
      },
      {
        q: "What happens when the reservation expires?",
        a: "Nothing. Consulates expect reservations to lapse and advise against buying tickets until your visa is approved. Book your real flights once you have the decision.",
      },
    ],
  },
  {
    key: "flight-itinerary-uk-visa",
    slug: "flight-itinerary-uk-visa",
    title: "Flight Itinerary for a UK Visitor Visa: Do You Need One?",
    h1: "Do you need a flight booking for a UK visitor visa?",
    description:
      "The UK doesn't require a flight booking for a Standard Visitor visa, but a reservation can support your application. When to include one and how to get a verifiable itinerary.",
    intro:
      "UK Visas and Immigration does not require you to book flights before applying for a Standard Visitor visa, and UK guidance generally advises against paying for travel before you have a decision. Many applicants still include a flight itinerary as supporting evidence of their plans.",
    sections: [
      {
        heading: "Why include one anyway",
        paragraphs: [
          "The decision maker wants to understand your trip: when you'll arrive, how long you'll stay and when you'll leave. A clear itinerary that matches your dates, accommodation and leave from work makes that story easier to follow.",
          "A reservation does this without the risk of losing money on a ticket if the visa is refused or delayed.",
        ],
      },
      {
        heading: "What to show",
        paragraphs: [
          "A return flight, or an arrival and departure, matching the dates in your online application. Your name should appear exactly as in your passport.",
          "Always follow the current guidance on GOV.UK for the visa you're applying for.",
        ],
      },
      {
        heading: "Getting it right",
        paragraphs: [
          "Book the reservation shortly before you submit your application or attend your biometrics appointment. Reservations of this kind are typically held for around 48 hours before they lapse, which is expected.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Is a flight booking mandatory for a UK visitor visa?",
        a: "No. It's optional supporting evidence. What matters is that your plans, funds and ties to home are clear and consistent.",
      },
      {
        q: "Should I buy a ticket before applying?",
        a: "It's generally advised not to, because you could lose the money if your application is refused or takes longer than expected.",
      },
    ],
  },
  {
    key: "flight-itinerary-us-visa",
    slug: "flight-itinerary-us-visa",
    title: "Flight Reservation for a US Visa (B1/B2) Interview",
    h1: "Do you need a flight reservation for a US visa?",
    description:
      "The US doesn't require a flight booking for a B1/B2 visa, and advises against buying tickets before your visa is issued. When a reservation helps and how to get one.",
    intro:
      "For a US B1/B2 visitor visa, you don't need to show a flight booking, and the US Department of State advises applicants not to buy tickets until they have their visa. Your DS-160 asks about your intended travel dates, and some applicants bring a reservation to the interview to show their plans are concrete.",
    sections: [
      {
        heading: "When a reservation helps",
        paragraphs: [
          "If the consular officer asks about your plans, a reservation that matches the dates on your DS-160 is an easy way to show you've thought it through. It isn't a substitute for evidence of your ties to home, which matter far more.",
        ],
      },
      {
        heading: "What to show",
        paragraphs: [
          "A round trip matching the arrival date and length of stay on your DS-160, in your name exactly as on your passport. Check the instructions for your embassy or consulate on travel.state.gov and the appointment site.",
        ],
      },
      {
        heading: "Getting it right",
        paragraphs: [
          "Interview dates can be months away, so book the reservation a day or two before the interview rather than when you file the DS-160.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Will I be refused without a flight booking?",
        a: "No. A flight booking isn't a requirement for a B1/B2 visa.",
      },
      {
        q: "Can I change my travel dates after the interview?",
        a: "Yes. The dates on your DS-160 are your intended plans. You book your real flights once the visa is issued.",
      },
    ],
  },
  {
    key: "flight-itinerary-canada-visa",
    slug: "flight-itinerary-canada-visa",
    title: "Flight Itinerary for a Canada Visitor Visa",
    h1: "Flight itinerary for a Canada visitor visa",
    description:
      "Canada's visitor visa application can ask for a travel itinerary, and IRCC advises against buying tickets before a decision. What to include and how to get a verifiable reservation.",
    intro:
      "When you apply for a Canadian visitor visa (temporary resident visa), you may be asked for a travel itinerary as part of your supporting documents. Immigration, Refugees and Citizenship Canada (IRCC) generally recommends not buying tickets until you have a decision.",
    sections: [
      {
        heading: "What to include",
        paragraphs: [
          "A return flight reservation that matches the dates in your application and your proposed purpose of travel, such as a family visit or tourism, along with any accommodation details.",
          "Check the document checklist that IRCC generates for your application, because requirements depend on your country and circumstances.",
        ],
      },
      {
        heading: "Getting it right",
        paragraphs: [
          "Book the reservation shortly before you upload your documents. It will lapse after a short hold, which is expected.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Does a flight reservation improve my chances?",
        a: "It helps show your plans are clear, but it won't outweigh weak evidence of funds or ties to home.",
      },
      {
        q: "I only need an eTA, not a visa. Do I need this?",
        a: "eTA applications don't ask for an itinerary, but your airline may still ask one-way passengers for proof of onward travel.",
      },
    ],
  },
  {
    key: "flight-itinerary-japan-visa",
    slug: "flight-itinerary-japan-visa",
    title: "Flight Reservation for a Japan Tourist Visa",
    h1: "Flight reservation for a Japan visa",
    description:
      "Many Japanese embassies ask visa applicants for a flight reservation or itinerary. What to include in your schedule of stay and how to get a verifiable reservation.",
    intro:
      "If you need a visa to visit Japan, many Japanese embassies and consulates ask for proof of your travel plans, usually a flight reservation alongside a schedule of stay. You generally don't need to buy the ticket first.",
    sections: [
      {
        heading: "What to include",
        paragraphs: [
          "A round-trip reservation into and out of Japan, in your name as it appears in your passport, matching the dates on your application form and schedule of stay.",
          "Requirements differ between embassies and between nationalities, so use the checklist from the Japanese embassy or consulate that handles your application, or its appointed visa centre.",
        ],
      },
      {
        heading: "Getting it right",
        paragraphs: [
          "Processing usually takes several working days. Book the reservation just before you submit, so it's live when your documents are checked.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to buy a ticket for a Japan visa?",
        a: "Usually not. Most checklists accept a reservation or itinerary, but check the one from your embassy.",
      },
      {
        q: "Can my itinerary include other countries?",
        a: "Yes, but the reservation should clearly show your entry into and exit from Japan.",
      },
    ],
  },
  {
    key: "best-onward-ticket-services",
    slug: "best-onward-ticket-services",
    title: "Best Onward Ticket Services Compared (2026)",
    h1: "Best onward ticket services compared",
    description:
      "Volward, BestOnwardTicket, OnwardTicket and OneWayFly compared on price, group pricing, add-ons and how fast you get your reservation.",
    intro:
      "Onward ticket services all do the same core job: they place a real flight reservation in your name, send you the booking reference, and let it lapse after a short hold. The differences are price, how many travellers you can add, and extras like changing dates or activating the booking later.",
    disclosure:
      "TempTicket earns a commission if you book through our link to Volward. That doesn't change what you pay. Prices below are as advertised on the providers' own sites and comparison pages in late 2026. Check the current price before you buy.",
    table: {
      caption: "Advertised prices (USD)",
      headers: ["Service", "One way", "Return", "Family of 4", "Max travellers"],
      rows: [
        ["Volward", "$14", "$21", "$29", "9"],
        ["BestOnwardTicket", "$14", "$21", "$56", "5"],
        ["OnwardTicket", "$16", "$23", "$64", "5"],
        ["OneWayFly", "$16", "$24", "$64", "5"],
      ],
      note: "All four advertise delivery by email within a few minutes.",
    },
    sections: [
      {
        heading: "Which one should you use?",
        paragraphs: [
          "For one traveller, the cheapest services are within a couple of dollars of each other, so pick the one whose checkout you trust.",
          "For couples, families and groups, the gap gets bigger. Volward prices extra travellers much lower than the others and allows up to nine people on one booking.",
          "If your plans might change, look for a flexibility add-on that lets you change the date or destination. Volward and OnwardTicket offer one. If you're booking ahead for a flight days away, an \"activate later\" option holds off issuing the reservation until you need it.",
        ],
      },
      {
        heading: "What to check with any provider",
        paragraphs: [
          "The reservation should come with a booking reference that you can look up on the airline's own website. If it doesn't show up there, ask for a replacement or a refund.",
          "Check the refund policy before you pay, and make sure your name exactly matches your passport.",
          TIMING_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Are onward ticket services legit?",
        a: "The established ones place real reservations on airline systems. The test is simple: look the booking up on the airline's website.",
      },
      {
        q: "Why not just buy a refundable ticket?",
        a: "You can, but you'll tie up hundreds of dollars, and refunds can take weeks. A reservation costs a fraction of that.",
      },
    ],
  },
];

export const EN_UI: GuideUi = {
  home: "Home",
  guides: "Guides",
  indexTitle: "Onward Ticket and Visa Itinerary Guides",
  indexDescription:
    "Which countries ask for proof of onward travel, what visa applications need, and how to get a verifiable flight reservation without buying a ticket.",
  commonQuestions: "Common questions",
  moreGuides: "More guides",
  disclaimer:
    "This guide is general information, not legal or immigration advice. Entry rules change; always confirm with the official government source for your destination and your airline before you travel.",
  ctaHeading: (price) =>
    price ? `Need a verifiable onward ticket, from ${price}?` : "Need a verifiable onward ticket?",
  ctaBody:
    "Get a real flight reservation with a booking reference you can check on the airline's website, delivered by email in minutes.",
  ctaButton: "Get your onward ticket",
  destinationsTitle: "Where you'll need proof of onward travel",
  destinationsSub:
    "Country guides on what airlines and immigration check, and visa itinerary guides.",
  sourcesHeading: "Sources",
  lastChecked: (date) => `Last checked ${date}`,
};
