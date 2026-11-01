/**
 * Filipino guides for visa applicants and travellers from the Philippines. Same
 * rules as the English ones: general guidance, official sources where facts are
 * specific, never legal advice.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const SURIIN =
  "Pagdating ng reservation, buksan ang \"Manage booking\" page sa website ng airline at hanapin ito gamit ang booking reference (PNR) at apelyido mo. Kung lumalabas doon, makikita rin ito ng check-in agent at ng visa officer. Mag-screenshot din bukod sa email.";

export const ORAS =
  "Ang ganitong reservation ay naka-hold lang nang maikling panahon (karaniwang mga 48 oras), tapos kusa nang mawawala. I-book ito ilang sandali bago ang check-in o visa appointment, hindi ilang linggo bago.";

export const FIL_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "proof-of-onward-travel",
    title: "Onward Ticket: Ano Ito at Paano Kumuha",
    h1: "Proof of onward travel, ipinaliwanag",
    description:
      "Bakit humihingi ang airline at immigration ng return o onward ticket, ano ang tinatanggap na patunay, at paano kumuha ng verifiable na flight reservation nang hindi bumibili ng ticket na hindi mo gagamitin.",
    intro:
      "Maraming bansa ang nagpapapasok lang ng bisita kung maipapakita nilang aalis sila sa takdang panahon. Ipinapatupad ito ng airline mismo sa check-in, dahil sila ang gagastos para ibalik ka kung hindi ka papasukin. Kung one-way ang ticket mo, baka kailangan mong magpakita ng onward o return flight.",
    sections: [
      {
        heading: "Sino ang nagche-check",
        paragraphs: [
          "Dalawa: ang airline sa check-in, at ang immigration officer pagdating. Sa totoo lang, mas madalas magtanong ang airline, dahil awtomatikong naka-flag sa sistema nila ang mga one-way na pasahero papunta sa mga bansang may ganitong patakaran.",
          "Maraming visa application din, gaya ng Schengen, ang humihingi ng flight itinerary. Karamihan ng konsulado ay tumatanggap ng reservation at nagpapayong huwag munang bumili ng ticket hangga't wala pang visa.",
        ],
      },
      {
        heading: "Ano ang tinatanggap na patunay",
        paragraphs: [
          "Isang flight palabas ng bansang iyon, kahit saan papunta, na may booking reference na makikita ng agent. Sa land border, minsan puwede ang bus o ferry ticket, pero karaniwang flight ang hinahanap ng airline.",
          "Ang totoong reservation ay may PNR na mahahanap sa mismong website ng airline. Ang edited na PDF o pekeng booking ay hindi patunay, at kapag ipinakita mo ito, puwede kang ma-deny o mas malala pa.",
        ],
      },
      {
        heading: "Mga option mo",
        paragraphs: [
          "Bumili ng fully refundable na ticket at i-cancel pagkatapos. Gumagana, pero malaking pera ang nakatali at puwedeng abutin ng ilang linggo ang refund.",
          "Bumili ng pinakamurang onward flight at huwag gamitin. Simple, pero sayang ang pera.",
          "Gumamit ng onward ticket service. Sa maliit na bayad, may totoong reservation sa pangalan mo na naka-hold nang maikling panahon bago i-release. Ito ang ginagawa ng karamihan ng long-term travelers.",
        ],
      },
      { heading: "Paano malalaman kung totoo", paragraphs: [SURIIN, ORAS] },
    ],
    faqs: [
      {
        q: "Legal ba ang onward ticket reservation?",
        a: "Normal na gawain ng airline ang mag-hold ng reservation, at karaniwang tinatanggap ng mga konsulado ang reservation sa visa application. Ang hindi tinatanggap ay pekeng dokumento. Laging i-check ang patakaran ng bansang pupuntahan sa opisyal na source.",
      },
      {
        q: "Kailangan bang pauwi ng Pilipinas ang onward flight?",
        a: "Hindi. Basta palabas ng bansang papasukan mo. Karaniwang pinipili ang maikling flight papunta sa kalapit na bansa.",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "dummy-ticket-for-visa",
    title: "Dummy Ticket para sa Visa: Totoong Reservation vs Pekeng PDF",
    h1: "Dummy ticket para sa visa application",
    description:
      "Ano talaga ang \"dummy ticket\" para sa visa, bakit ito hinihingi ng embassy, paano malalaman ang totoong reservation kumpara sa pekeng PDF, at paano kumuha ng puwedeng i-verify.",
    intro:
      "Ang \"dummy ticket\" ay tawag ng travel industry sa flight reservation na isinasama sa visa application. Ipinapakita nito ang petsa at ruta mo nang hindi binabayaran ang ticket na baka hindi mo magamit. Nakakalito ang pangalan: ang magandang dummy ticket ay hindi peke. Totoong booking ito na naka-hold sa sistema ng airline nang maikling panahon.",
    sections: [
      {
        heading: "Bakit hinihingi ng embassy",
        paragraphs: [
          "Gusto ng visa officer na makitang malinaw ang simula at dulo ng biyahe mo, at tugma ang mga petsa sa iba mong dokumento. Maraming embassy at visa center ang nagsasabing huwag munang bumili ng ticket hangga't walang visa, kaya reservation ang inaasahang dokumento.",
          "Ang mga bansang Schengen, Japan, Korea at marami pang iba ay karaniwang humihingi ng flight itinerary o reservation. Ang UK at US ay hindi ito ginagawang required, pero tinatanggap bilang supporting document.",
        ],
      },
      {
        heading: "Totoong reservation o pekeng PDF?",
        paragraphs: [
          "Ang totoong reservation ay may booking reference (PNR) na mahahanap sa Manage booking page ng airline. Ang peke ay dokumentong in-edit para magmukhang booking, pero walang laman.",
          "Kaya at talagang nagche-check ang embassy at airline. Ang pagsumite ng pekeng dokumento ay puwedeng magpa-deny ng application mo at makaapekto sa mga susunod. Sa UK, 10 taong nire-refuse ang mga susunod na application kapag napatunayang may panlilinlang. Gumamit lang ng reservation na kaya mong i-verify.",
        ],
      },
      {
        heading: "Siguraduhing tama ang detalye",
        paragraphs: [
          "Dapat eksaktong tugma ang pangalan sa passport, kasama ang middle name kung nakalagay. Dapat tugma ang mga petsa sa application form at hotel booking.",
          "Karamihan ng visa application ay round trip ang hinihingi. Kung maraming bansa ang pupuntahan, dapat magsimula ang reservation sa bansa ng main stay o first entry, ayon sa checklist ng konsulado.",
        ],
      },
      { heading: "Timing", paragraphs: [ORAS, SURIIN] },
    ],
    faqs: [
      {
        q: "Legal ba ang dummy ticket?",
        a: "Legal ang totoong flight reservation at ito ang hinihingi ng maraming konsulado. Ang peke o in-edit na booking ay hindi legal at puwedeng magpa-deny ng visa.",
      },
      {
        q: "Paano kung ma-expire ang reservation bago lumabas ang resulta?",
        a: "Walang problema. Alam ng konsulado na nag-e-expire ang reservation at nagpapayo silang huwag bumili ng ticket hangga't hindi approved ang visa. Saka ka na bumili ng totoong ticket.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "flight-itinerary-for-schengen-visa",
    title: "Flight Itinerary para sa Schengen Visa (Nang Hindi Bumibili ng Ticket)",
    h1: "Flight itinerary para sa Schengen visa application",
    description:
      "Karamihan ng Schengen consulate ay humihingi ng flight reservation, hindi bayad na ticket. Paano kumuha ng verifiable na round-trip itinerary para sa visa appointment mo.",
    intro:
      "Karaniwang hinihingi sa Schengen visa application ang flight itinerary na nagpapakita kung paano ka darating at aalis. Maraming konsulado ang nagsasabing huwag bumili ng ticket bago ma-grant ang visa, at sapat na ang reservation.",
    sections: [
      {
        heading: "Ano ang hinahanap ng konsulado",
        paragraphs: [
          "Round trip, o entry at exit, na tugma sa mga petsa sa application mo. Dapat eksakto ang pangalan sa reservation gaya ng nasa passport.",
          "Iba-iba ang requirements depende sa bansa at visa center, kaya basahin ang checklist ng konsuladong pag-a-apply-an mo. May ilang humihingi ng higit pa sa reservation.",
        ],
      },
      { heading: "I-timing sa appointment", paragraphs: ["I-book ang reservation isa o dalawang araw bago ang appointment para aktibo pa ito kapag nire-review ang mga dokumento mo.", SURIIN] },
    ],
    faqs: [
      {
        q: "Kailangan ba ng return flight o puwede ang one-way?",
        a: "Karamihan ng Schengen application ay round trip ang hinihingi, o kahit siguradong paraan palabas ng Schengen area. Sakop ng round-trip reservation ang dalawa.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "one-way-ticket-denied-boarding",
    title: "Na-deny sa Boarding Dahil One-Way Ticket? Paano Ito Iiwasan",
    h1: "Na-deny sa boarding dahil one-way ticket: paano iiwasan",
    description:
      "Bakit hindi pinasasakay ng airline ang mga one-way na pasahero, aling mga bansa ang nagti-trigger ng check, at paano kumuha ng onward reservation sa loob ng ilang minuto sa airport.",
    intro:
      "Kapag dinala ka ng airline sa isang bansa at hindi ka pinapasok, ang airline ang magbabalik sa iyo at puwede pang mamultahan. Kaya hinihingan ng check-in staff ang mga one-way na pasahero ng patunay na aalis sila. Kung wala, puwede kang hindi pasakayin.",
    sections: [
      {
        heading: "Aling biyahe ang chine-check",
        paragraphs: [
          "Pinakakaraniwan ang one-way flights papunta sa mga bansang may onward ticket rule, gaya ng Thailand, Indonesia, Costa Rica, Colombia, Peru at New Zealand. Awtomatiko kang naka-flag sa sistema ng airline.",
        ],
      },
      {
        heading: "Ayusin sa airport",
        paragraphs: [
          "Kaya ng onward ticket service na mag-issue ng totoong reservation sa loob ng ilang minuto, mula sa phone mo, habang nasa check-in counter ka. Ipakita sa agent ang booking reference para ma-confirm nila sa sistema.",
          SURIIN,
        ],
      },
    ],
    faqs: [
      {
        q: "Talaga bang puwede akong hindi pasakayin ng airline?",
        a: "Oo. Kung hindi mo natutugunan ang entry requirements ng destinasyon, puwedeng tumanggi ang airline na isakay ka, at isa rito ang proof of onward travel.",
      },
    ],
  },
  {
    key: "flight-itinerary-uk-visa",
    slug: "flight-itinerary-uk-visa",
    title: "Flight Itinerary para sa UK Visitor Visa: Kailangan Ba?",
    h1: "Kailangan ba ng flight booking para sa UK visitor visa?",
    description:
      "Hindi required ng UK ang flight booking para sa Standard Visitor visa, pero puwedeng makatulong ang reservation sa application mo. Bayad, processing time, at kailan ito isasama.",
    intro:
      "Hindi hinihingi ng UK Visas and Immigration na mag-book ka ng flight bago mag-apply ng Standard Visitor visa. Ang gusto nilang makita ay aalis ka ng UK pagkatapos ng biyahe at kaya mong bayaran ang pauwi o onward na biyahe. Gayunman, maraming aplikante ang nagsasama ng flight itinerary para ipakita ang plano nila.",
    sections: [
      {
        heading: "Basic na impormasyon",
        paragraphs: [
          "£135 ang bayad sa Standard Visitor visa na hanggang anim na buwan. Puwede kang mag-apply hanggang tatlong buwan bago bumiyahe, at karaniwang lumalabas ang desisyon sa loob ng tatlong linggo matapos mong patunayan ang identity mo at ibigay ang mga dokumento.",
        ],
      },
      {
        heading: "Ano ang ipapakita",
        paragraphs: [
          "Return flight, o arrival at departure, na tugma sa mga petsa sa online application, at eksaktong pangalan gaya ng nasa passport. Nagagawa ito ng reservation nang walang panganib na masayang ang ticket kung ma-refuse o ma-delay ang visa.",
          ORAS,
          SURIIN,
        ],
      },
    ],
    faqs: [
      {
        q: "Required ba ang flight booking sa UK visitor visa?",
        a: "Hindi. Optional na supporting evidence ito. Mas mahalaga na malinaw at tugma ang plano, pondo, at ugnayan mo sa Pilipinas.",
      },
    ],
    sources: [
      { label: "GOV.UK: Apply for a Standard Visitor visa (fees and decision times)", url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" },
      { label: "GOV.UK: Standard Visitor documents you need", url: "https://www.gov.uk/standard-visitor/documents-you-need" },
    ],
    checked: CHECKED,
  },
  {
    key: "flight-itinerary-us-visa",
    slug: "flight-itinerary-us-visa",
    title: "Flight Reservation para sa US Visa (B1/B2) Interview",
    h1: "Kailangan ba ng flight reservation para sa US visa?",
    description:
      "Hindi required ng US ang flight booking para sa B1/B2 visa, at pinapayuhan ang mga aplikante na huwag munang bumili ng ticket hangga't walang visa. Kailan nakakatulong ang reservation.",
    intro:
      "Para sa US B1/B2 visitor visa, hindi mo kailangang magpakita ng flight booking, at pinapayuhan ng US Department of State ang mga aplikante na huwag bumili ng ticket hangga't wala pa ang visa. Tinatanong ng DS-160 ang inaasahang petsa ng biyahe mo, at may ilang aplikanteng nagdadala ng reservation sa interview para ipakitang konkreto ang plano.",
    sections: [
      {
        heading: "Kailan nakakatulong ang reservation",
        paragraphs: [
          "Kung tanungin ng consular officer ang plano mo, ang reservation na tugma sa mga petsa sa DS-160 ay madaling paraan para ipakitang pinag-isipan mo ito. Pero hindi nito napapalitan ang patunay ng ugnayan mo sa Pilipinas, na mas mahalaga.",
          ORAS,
          SURIIN,
        ],
      },
    ],
    faqs: [
      {
        q: "Dapat bang bumili ng ticket bago ang US visa interview?",
        a: "Hindi. Pinapayuhan ng US Department of State na huwag bumili ng ticket hangga't walang visa. Kung kailangan, sapat na ang reservation.",
      },
    ],
    sources: [
      { label: "US Department of State: Visitor visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
    ],
    checked: CHECKED,
  },
  {
    key: "fake-flight-confirmation-email",
    slug: "fake-flight-confirmation-email",
    title: "Pekeng Flight Confirmation Email: Bakit Hindi, at ang Legal na Alternatibo",
    h1: "Balak gumamit ng pekeng flight confirmation? Basahin muna ito",
    description:
      "Bakit puwedeng magpa-refuse ng visa ang edited o pekeng flight confirmation, magdulot ng 10 taong ban sa UK o misrepresentation finding sa US, at paano kumuha ng totoong reservation.",
    intro:
      "Kapag kailangan mo ng flight para sa visa o check-in, nakakatuksong i-edit ang lumang booking o gumamit ng generator ng confirmation email. Huwag. Madali itong mahuli, at mas mabigat ang kapalit kaysa sa isang nasirang biyahe. May mura at legal na paraan para makakuha ng totoong booking reference.",
    sections: [
      {
        heading: "Paano nahuhuli ang peke",
        paragraphs: [
          "May booking reference (PNR) ang totoong booking na nasa reservation system ng airline. Ita-type lang ito ng check-in agent at lalabas o hindi lalabas ang booking mo. Kaya ring gawin iyon ng embassy. Ang edited na PDF o gawa-gawang email ay may reference na walang patutunguhan.",
        ],
      },
      {
        heading: "Ano ang mangyayari kapag ginamit mo",
        paragraphs: [
          "UK: ayon sa gabay ng Home Office, dapat i-refuse ang application kung mas malamang na gumamit ng panlilinlang ang aplikante, kasama ang pekeng dokumento, at dapat i-refuse ang mga susunod na application sa loob ng 10 taon.",
          "US: sa ilalim ng section 212(a)(6)(C)(i) ng Immigration and Nationality Act, hindi eligible ang sinumang naghahangad ng visa sa pamamagitan ng panloloko o sadyang maling pahayag tungkol sa mahalagang katotohanan. Nananatili ang finding na ito at waiver lang ang paraan para malampasan.",
          "Schengen: sinasabi ng EU Visa Code na dapat i-refuse ang visa kung may makatwirang duda sa pagiging tunay ng supporting documents o sa katotohanan ng laman nito.",
        ],
      },
      {
        heading: "Ang legal na alternatibo",
        paragraphs: [
          "Ang flight reservation na naka-hold sa pangalan mo nang maikling panahon ay nagbibigay ng eksaktong hinahanap mo sa peke: confirmation na may totoong booking reference, sa maliit na bahagi ng presyo ng ticket. Dahil totoo ito, mahahanap ito ng airline at embassy.",
          ORAS,
          SURIIN,
        ],
      },
    ],
    faqs: [
      { q: "Legal ba ang flight reservation para sa visa?", a: "Oo. Totoong booking ito sa pangalan mo. Maraming embassy, kasama ang mga Schengen, ang nagpapayong huwag bumili ng ticket bago ang desisyon sa visa, at reservation ang karaniwang paraan para ipakita ang plano." },
    ],
    sources: [
      { label: "GOV.UK: Suitability guidance on deception, false representations and false documents", url: "https://www.gov.uk/government/publications/suitability-false-representations-immigration-staff-guidance/part-suitability-deception-false-representations-false-documents-and-non-disclosure-of-relevant-facts-accessible" },
      { label: "US Foreign Affairs Manual 9 FAM 302.9: misrepresentation, INA 212(a)(6)(C)(i)", url: "https://fam.state.gov/fam/09FAM/09FAM030209.html" },
      { label: "EU Visa Code (Regulation 810/2009), Article 32", url: "https://eur-lex.europa.eu/eli/reg/2009/810/oj" },
    ],
    checked: CHECKED,
  },
];

export const FIL_UI: GuideUi = {
  home: "Home",
  guides: "Mga Gabay",
  indexTitle: "Mga gabay sa onward ticket at flight reservation para sa visa",
  indexDescription:
    "Aling mga bansa ang humihingi ng proof of onward travel, ano ang kailangan sa visa application, at paano kumuha ng verifiable na flight reservation nang hindi bumibili ng ticket.",
  commonQuestions: "Mga karaniwang tanong",
  moreGuides: "Iba pang gabay",
  disclaimer:
    "Ang mga gabay na ito ay pangkalahatang impormasyon, hindi legal o immigration advice. Puwedeng magbago ang patakaran: laging i-confirm sa opisyal na source ng bansang pupuntahan at sa airline bago bumiyahe.",
  ctaHeading: (price) =>
    price ? `Kailangan ng verifiable na flight reservation? Mula ${price}` : "Kailangan ng verifiable na flight reservation?",
  ctaBody: "Makatanggap ng totoong flight reservation sa email sa loob ng ilang minuto, na may booking reference na makikita sa website ng airline.",
  ctaButton: "Kunin ang reservation",
  destinationsTitle: "Kailan kailangan ng proof of flight",
  destinationsSub: "Mga gabay sa flight reservation para sa visa at kung ano ang chine-check ng airline at immigration.",
  sourcesHeading: "Mga source",
  lastChecked: (date) => `Huling na-check: ${date}`,
};
