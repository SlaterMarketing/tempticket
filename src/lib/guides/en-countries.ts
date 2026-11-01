/**
 * More English country guides. Same rules as en.ts: name the official source, keep claims to what
 * that source or the airlines publish, and never promise entry.
 */

import { TIMING_STEP, VERIFY_STEP } from "./en";
import type { Guide } from "./types";

export const EN_COUNTRY_GUIDES: Guide[] = [
  {
    key: "onward-ticket-usa-esta",
    slug: "onward-ticket-usa-esta",
    title: "Onward or Return Ticket for the USA on ESTA",
    h1: "Do you need a return ticket to enter the US on ESTA?",
    description:
      "Visitors entering the US under the Visa Waiver Program (ESTA) must hold a return or onward ticket. What counts, and what to do if you're flying in one-way.",
    intro:
      "Yes. Travellers using the Visa Waiver Program with an approved ESTA must have a return or onward ticket when they travel to the United States. Airlines check this before boarding because the requirement is part of the programme itself.",
    sections: [
      {
        heading: "What counts",
        paragraphs: [
          "A ticket leaving the United States within the 90 days the Visa Waiver Program allows. Be careful with short trips to Canada, Mexico or the Caribbean: time spent in those places generally counts toward your 90 days, so a hop over the border doesn't reset the clock.",
          "Check the current rules with US Customs and Border Protection (CBP) and on the official ESTA website before you fly.",
        ],
      },
      {
        heading: "One-way into the US",
        paragraphs: [
          "If you're arriving one-way, perhaps to start a longer trip through the Americas, show the airline a flight out of the US within your 90 days. A reservation with a booking reference the agent can see is what they'll look for.",
          TIMING_STEP,
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Does a flight to Canada or Mexico count as onward travel?",
        a: "It shows you're leaving the US, but time spent in Canada, Mexico and nearby islands usually counts toward your 90-day Visa Waiver stay. Check CBP guidance for your plans.",
      },
      {
        q: "Do I need a return ticket with a B1/B2 visa?",
        a: "The strict onward-ticket rule is part of the Visa Waiver Program. Visa holders aren't held to it in the same way, but officers can still ask about your plans.",
      },
    ],
  },
  {
    key: "onward-ticket-schengen-europe",
    slug: "onward-ticket-schengen-europe",
    title: "Return Ticket to Enter Europe (Schengen): Do You Need One?",
    h1: "Do you need a return ticket to enter the Schengen area?",
    description:
      "Schengen border guards can ask visitors for a return or onward ticket as proof of their plans. What to carry when you fly into Europe one-way.",
    intro:
      "Under the Schengen Borders Code, border guards can ask visitors to show the purpose of their trip and that they'll leave, and a return or onward ticket is one of the documents listed for this. Most travellers are never asked, but one-way arrivals are the ones who are.",
    sections: [
      {
        heading: "Who gets asked",
        paragraphs: [
          "Visitors arriving on one-way tickets, especially at the start of a long trip, are the most likely to be questioned. Airlines flying into Europe can also ask at check-in.",
          "Your exit has to fit the 90 days in any 180-day period that short-stay visitors are allowed across the whole Schengen area, not per country.",
        ],
      },
      {
        heading: "What to show",
        paragraphs: [
          "A flight out of the Schengen area within your permitted stay. A flight between two Schengen countries doesn't count as leaving. The UK, Ireland, Turkey, Morocco and the Balkans outside Schengen are common short exits.",
          "Check the rules for your passport on the official EU and national immigration websites before you travel.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Does a train or bus ticket out of Schengen count?",
        a: "It can show your plans to a border guard, but if an airline asks at check-in, a flight reservation is easier for them to verify.",
      },
      {
        q: "Is this the same as the flight itinerary for a Schengen visa?",
        a: "It's related. Visa applicants submit an itinerary with their application, and anyone entering may be asked to show onward travel at the border.",
      },
    ],
  },
  {
    key: "onward-ticket-singapore",
    slug: "onward-ticket-singapore",
    title: "Onward Ticket for Singapore: Entry Requirements",
    h1: "Do you need an onward ticket for Singapore?",
    description:
      "Singapore expects visitors to hold a confirmed onward or return ticket. What airlines check and how to get a verifiable reservation.",
    intro:
      "Singapore's Immigration & Checkpoints Authority (ICA) lists a confirmed onward or return ticket among the requirements for visitors, along with enough funds for the stay. Airlines flying to Changi check for it.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A flight leaving Singapore within the stay you're granted on arrival. Short flights to Kuala Lumpur, Bangkok, Jakarta or Bali are common choices, and the bus or train to Johor Bahru is popular for overland exits.",
          "Most visitors also need to submit the SG Arrival Card online before arriving. Check the ICA website for the current requirements for your passport.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Does a bus ticket to Malaysia count?",
        a: "It shows an onward plan, but an airline checking at the desk will usually be happier with a flight reservation it can verify.",
      },
    ],
  },
  {
    key: "onward-ticket-malaysia",
    slug: "onward-ticket-malaysia",
    title: "Onward Ticket for Malaysia: What to Expect",
    h1: "Do you need an onward ticket for Malaysia?",
    description:
      "Malaysia asks visitors to hold a return or onward ticket, and airlines check at the desk. What counts and how to get a verifiable reservation.",
    intro:
      "Malaysia's Immigration Department lists a return or onward ticket among the conditions for visitors, together with enough money for the stay. Budget airlines flying into Kuala Lumpur and Penang check for it.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A flight leaving Malaysia within your permitted stay. Popular short exits are Singapore, Bangkok, Phuket, Jakarta and Ho Chi Minh City.",
          "Most visitors also complete the Malaysia Digital Arrival Card (MDAC) before arriving. Check the Immigration Department of Malaysia website for the current rules for your passport.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Can I do a visa run from Malaysia to Singapore?",
        a: "Many people do, but each entry is assessed on its own. Repeated back-to-back entries can attract questions from immigration.",
      },
    ],
  },
  {
    key: "onward-ticket-japan",
    slug: "onward-ticket-japan",
    title: "Return Ticket to Enter Japan Visa-Free",
    h1: "Do you need a return ticket to enter Japan?",
    description:
      "Short-term visitors to Japan are expected to show a return or onward ticket, and airlines ask one-way passengers for it. What counts and what to do.",
    intro:
      "Visa-exempt visitors to Japan can stay for a limited period as temporary visitors, and immigration officers can ask for proof that you'll leave. Airlines flying into Japan often ask one-way passengers for a return or onward ticket.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A flight leaving Japan within your permitted stay. Seoul, Taipei, Busan by ferry, and Hong Kong are common short exits.",
          "Check the visa exemption rules for your passport on the Ministry of Foreign Affairs of Japan website. If you need a visa, see our Japan visa itinerary guide instead.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Does the ferry to Korea count as an onward ticket?",
        a: "It shows you'll leave, but if an airline asks at check-in, a flight reservation with a booking reference is easier for them to check.",
      },
    ],
  },
  {
    key: "onward-ticket-dubai-uae",
    slug: "onward-ticket-dubai-uae",
    title: "Return Ticket for Dubai and the UAE",
    h1: "Do you need a return ticket for Dubai?",
    description:
      "Visitors to Dubai and the UAE, especially those getting a visa on arrival, are commonly asked for a return or onward ticket. What to show.",
    intro:
      "Visitors to the UAE, especially those eligible for a visa on arrival, are commonly expected to hold a return or onward ticket. Airlines flying to Dubai and Abu Dhabi check for it before boarding.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A flight leaving the UAE within the stay you're granted. Short flights to Oman, Bahrain, Qatar or Saudi Arabia are common exits, as are onward long-haul flights.",
          "Rules depend on your nationality and whether you're getting a visa on arrival or applying in advance. Check with the General Directorate of Residency and Foreigners Affairs (GDRFA) or ICP and your airline.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "I'm transiting Dubai. Do I need this?",
        a: "If you stay airside, your connecting ticket already shows onward travel. This is for people entering the UAE.",
      },
    ],
  },
  {
    key: "onward-ticket-maldives",
    slug: "onward-ticket-maldives",
    title: "Return Ticket for the Maldives: Entry Requirements",
    h1: "Do you need a return ticket for the Maldives?",
    description:
      "The Maldives asks every tourist for confirmed return tickets, a confirmed booking and enough funds. What to show at immigration and check-in.",
    intro:
      "Yes. The Maldives lists a complete travel itinerary as a basic entry requirement for tourists: confirmed return or onward tickets, a confirmed booking at a registered resort, hotel or guesthouse, and enough money for the stay.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A confirmed flight out of the Maldives, plus your accommodation booking. Most visitors also fill in the IMUGA traveller declaration before arrival.",
          "Requirements are set out by Maldives Immigration and the Maldives' missions abroad. Check them before you travel, because meeting them doesn't guarantee entry.",
        ],
      },
      {
        heading: "Getting it right",
        paragraphs: [
          "Because the Maldives asks for a confirmed return, a reservation should only be used where your airline and Maldives Immigration accept one. Many travellers simply book their real return.",
          VERIFY_STEP,
        ],
      },
    ],
    faqs: [
      {
        q: "Is a hotel booking also required?",
        a: "Yes. Maldives guidance asks for a confirmed booking at a registered facility as part of the travel itinerary.",
      },
    ],
  },
  {
    key: "onward-ticket-panama",
    slug: "onward-ticket-panama",
    title: "Onward Ticket for Panama and Proof of Funds",
    h1: "Do you need an onward ticket for Panama?",
    description:
      "Panama asks visitors for a return or onward ticket and proof of at least US$500. What counts and how to get a verifiable reservation.",
    intro:
      "Panama's tourism authority lists two things visitors need besides a valid passport: a return ticket home or a ticket to your next destination, and at least US$500 available to you, by cash, card, bank reference or similar.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A ticket leaving Panama within your permitted stay. Flights from Panama City to Colombia, Costa Rica or Mexico are common, and some overlanders use a bus ticket to Costa Rica.",
          "Some nationalities may need to show more. Check with Panama's immigration service (Servicio Nacional de Migración), a Panamanian consulate or your airline.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "How do I prove US$500?",
        a: "Panama's guidance accepts cash, a credit card, a bank reference, an employment letter or traveller's cheques.",
      },
    ],
  },
  {
    key: "onward-ticket-mexico",
    slug: "onward-ticket-mexico",
    title: "Do You Need a Return Ticket for Mexico?",
    h1: "Do you need a return ticket to enter Mexico?",
    description:
      "Mexican immigration can ask visitors for a return or onward ticket, accommodation and funds. What to carry if you're flying in one-way.",
    intro:
      "Mexico's immigration authority (INM) can ask visitors to show the purpose of their trip, where they're staying, enough money, and a return or onward ticket. Officers decide how many days to grant, so being ready matters more than it used to.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A flight leaving Mexico within the stay you're asking for. Flights to the US, Guatemala, Belize, Colombia or Cuba are common exits.",
          "Keep your accommodation details and a recent bank statement or card handy too. Check the INM website or your nearest Mexican consulate for the current rules for your passport.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "Will I always be asked?",
        a: "No, many visitors aren't. But one-way arrivals and people asking for a long stay are the ones most likely to be asked.",
      },
    ],
  },
  {
    key: "onward-ticket-fiji",
    slug: "onward-ticket-fiji",
    title: "Onward Ticket for Fiji",
    h1: "Do you need an onward ticket for Fiji?",
    description:
      "Fiji asks visitors to hold a return or onward ticket and airlines check before boarding. What counts and how to get a verifiable reservation.",
    intro:
      "Fiji's Immigration Department lists a return or onward ticket among the requirements for visitors, along with a passport valid for at least six months and enough funds. Airlines flying to Nadi check for it.",
    sections: [
      {
        heading: "What to show",
        paragraphs: [
          "A flight leaving Fiji within your permitted stay. Auckland, Sydney, Brisbane and other Pacific islands are common exits.",
          "Check the current requirements for your passport with the Fiji Immigration Department before you travel.",
        ],
      },
      { heading: "Getting it right", paragraphs: [TIMING_STEP, VERIFY_STEP] },
    ],
    faqs: [
      {
        q: "I'm arriving by yacht. Does this apply?",
        a: "Crew and yacht arrivals follow separate procedures. This guide is for people flying in.",
      },
    ],
  },
];
