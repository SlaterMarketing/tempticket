/**
 * Dutch guides for travellers from the Netherlands and Belgium. Same rules as
 * the English ones. Country facts from the UK Foreign Office are for British
 * passports, as the pages say; readers are pointed to the Dutch government's
 * travel advice for their own passport.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const CONTROLE =
  "Zodra je de reservering hebt, open je de pagina \"Boeking beheren\" (Manage booking) op de site van de luchtvaartmaatschappij en zoek je hem op met de boekingscode (PNR) en je achternaam. Staat hij daar, dan ziet de incheckbalie hem ook. Bewaar naast de e-mail ook een screenshot.";

export const TIMING =
  "Zulke reserveringen blijven maar kort staan (meestal zo'n 48 uur) en vervallen daarna vanzelf. Boek hem kort voor het inchecken, niet weken van tevoren.";

const ukNote = (body: string) => ({
  heading: "Wat het Britse ministerie van Buitenlandse Zaken zegt (Britse paspoorten)",
  paragraphs: [
    body,
    "Dit geldt voor Britse paspoorten. Controleer de regels voor jouw paspoort in het reisadvies van de Nederlandse of Belgische overheid en bij de ambassade van je bestemming.",
  ],
});

export const NL_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "bewijs-van-doorreis",
    title: "Bewijs van doorreis (onward ticket): wat het is en hoe je het regelt",
    h1: "Bewijs van doorreis of terugreis, uitgelegd",
    description:
      "Waarom luchtvaartmaatschappijen en grenswachten om een retour- of doorreisticket vragen, wat telt als bewijs en hoe je een controleerbare vluchtreservering krijgt zonder een ticket te kopen dat je niet gebruikt.",
    intro:
      "Veel landen laten bezoekers alleen binnen als ze kunnen laten zien dat ze weer vertrekken. Luchtvaartmaatschappijen controleren dat al bij het inchecken, omdat zij je op eigen kosten terug moeten vliegen als je de toegang wordt geweigerd. Reis je met een enkeltje, dan moet je mogelijk een vervolg- of terugvlucht laten zien.",
    sections: [
      {
        heading: "Wie controleert",
        paragraphs: [
          "Er wordt op twee plekken gecontroleerd: bij de incheckbalie door de luchtvaartmaatschappij en bij aankomst door de grenspolitie. In de praktijk vraagt de luchtvaartmaatschappij er veel vaker naar, omdat hun systeem passagiers met een enkeltje naar landen met deze regel automatisch markeert.",
        ],
      },
      {
        heading: "Wat telt als bewijs",
        paragraphs: [
          "Een vlucht het land uit, naar waar dan ook, met een boekingscode die de medewerker kan zien. Bij landgrenzen wordt soms een bus- of bootticket geaccepteerd, maar luchtvaartmaatschappijen willen meestal een vlucht zien.",
          "Een echte reservering heeft een PNR die je op de eigen site van de maatschappij kunt opzoeken. Een bewerkte pdf of nepboeking is geen bewijs, en wie er een laat zien kan worden geweigerd of erger.",
        ],
      },
      {
        heading: "Je opties",
        paragraphs: [
          "Een volledig restitueerbaar ticket kopen en later annuleren. Werkt, maar je zet honderden euro's vast en de terugbetaling kan weken duren.",
          "Het goedkoopste vervolgticket kopen en niet gebruiken. Simpel, maar je bent het geld kwijt.",
          "Een onward-ticketservice gebruiken. Voor een klein bedrag staat er even een echte reservering op jouw naam, die daarna wordt vrijgegeven. Dit doen de meeste digital nomads en langreizigers.",
        ],
      },
      { heading: "Zo check je dat hij echt is", paragraphs: [CONTROLE, TIMING] },
    ],
    faqs: [
      {
        q: "Is een onward-ticketreservering legaal?",
        a: "Een stoel reserveren is een normale handeling van luchtvaartmaatschappijen, en consulaten accepteren reserveringen routinematig bij visumaanvragen. Wat niet mag, is een vervalst document. Check de regels van je bestemming altijd bij een officiële bron.",
      },
      {
        q: "Moet de vervolgvlucht naar huis gaan?",
        a: "Nee. Hij moet alleen het land verlaten waar je binnenkomt. Een korte vlucht naar een buurland is de gebruikelijke keuze.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "geweigerd-aan-boord-enkele-reis",
    title: "Geweigerd aan boord met een enkeltje? Zo voorkom je het",
    h1: "Niet aan boord met een enkele reis: zo voorkom je het",
    description:
      "Waarom luchtvaartmaatschappijen passagiers met een enkeltje weigeren, welke bestemmingen de controle uitlokken en hoe je op het vliegveld binnen minuten een vervolgreservering regelt.",
    intro:
      "Als een luchtvaartmaatschappij je ergens heen vliegt en je wordt de toegang geweigerd, moet zij je terugvliegen en kan ze een boete krijgen. Daarom vraagt het incheckpersoneel passagiers met een enkeltje om bewijs dat ze weer vertrekken. Lukt dat niet, dan mag je misschien niet mee.",
    sections: [
      {
        heading: "Welke reizen de controle uitlokken",
        paragraphs: [
          "Enkele reizen naar landen met een doorreisregel, zoals de Filipijnen, Thailand, Indonesië (Bali), Costa Rica, Colombia, Peru en Nieuw-Zeeland, komen het vaakst voor. Het systeem van de maatschappij markeert je automatisch.",
        ],
      },
      {
        heading: "Oplossen op het vliegveld",
        paragraphs: [
          "Een onward-ticketservice kan binnen minuten een echte reservering regelen, vanaf je telefoon, bij de incheckbalie. Laat de medewerker de boekingscode zien, dan kan die hem in het systeem controleren.",
          CONTROLE,
        ],
      },
    ],
    faqs: [
      {
        q: "Mag de luchtvaartmaatschappij me echt weigeren?",
        a: "Ja. Als je niet voldoet aan de inreisvoorwaarden van je bestemming, mag de maatschappij weigeren je te vervoeren, en bewijs van doorreis is daar één van.",
      },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "retourticket-thailand",
    title: "Retour- of doorreisticket nodig voor Thailand?",
    h1: "Heb je een retour- of doorreisticket nodig voor Thailand?",
    description:
      "Visumvrij inreizen in Thailand betekent vertrekken binnen je toegestane verblijf, en maatschappijen vragen vaak om bewijs bij het inchecken. Wat je moet regelen.",
    intro:
      "Wie zonder visum Thailand inreist, moet binnen de toegestane verblijfsduur vertrekken, en de Thaise immigratie kan om bewijs van doorreis vragen. In de praktijk word je meestal gecontroleerd bij de balie van de luchtvaartmaatschappij voor vertrek.",
    sections: [
      {
        heading: "Waar het gecontroleerd wordt",
        paragraphs: [
          "Maatschappijen die op Thailand vliegen, vooral prijsvechters, vragen passagiers met een enkeltje regelmatig om een vervolgvlucht. Heb je die niet, dan kun je worden geweigerd.",
          "Immigratiebeambten op Thaise luchthavens vragen er minder vaak naar, maar de regel bestaat en ze kunnen hem toepassen.",
        ],
      },
      {
        heading: "Wat je laat zien",
        paragraphs: [
          "Een vlucht uit Thailand binnen je toegestane verblijf, met een boekingscode. Populair zijn korte vluchten naar Kuala Lumpur, Singapore, Ho Chi Minhstad of Phnom Penh.",
          "De Thaise inreisregels zijn op 15 september 2026 opnieuw gewijzigd. Check vóór vertrek hoe lang je met jouw paspoort mag blijven op de officiële Thaise e-Visa-site of bij de Thaise ambassade.",
        ],
      },
      { heading: "Zo doe je het goed", paragraphs: [TIMING, CONTROLE] },
      ukNote(
        "Volgens het Britse ministerie mogen Britten met de visumvrijstelling tot 30 dagen blijven, alleen voor toerisme. Immigratie kan vragen om bewijs van door- of terugreis en om ten minste 10.000 baht per persoon aan middelen. Alle reizigers moeten in de drie dagen voor aankomst online de Thailand Digital Arrival Card (TDAC) invullen.",
      ),
    ],
    faqs: [
      {
        q: "Kan ik met een enkeltje naar Thailand vliegen?",
        a: "Ja, maar zorg dat je bij het inchecken een vervolgvlucht kunt laten zien. Zonder kan je de toegang tot het vliegtuig worden geweigerd.",
      },
    ],
    sources: [
      { label: "UK Foreign Office: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" },
      { label: "Nederlandwereldwijd: reisadvies Thailand", url: "https://www.nederlandwereldwijd.nl/reisadvies/thailand" },
    ],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-philippines",
    slug: "retourticket-filipijnen",
    title: "Retour- of doorreisticket voor de Filipijnen: wat wordt gecontroleerd",
    h1: "Doorreisticket voor de Filipijnen",
    description:
      "Visumvrije bezoekers aan de Filipijnen hebben een ticket het land uit nodig, en zowel maatschappijen als immigratie controleren dat. Zo regel je vooraf een controleerbare reservering.",
    intro:
      "De Filipijnen zijn een van de strengste landen als het om doorreisbewijs gaat. Visumvrije bezoekers moeten een ticket het land uit hebben binnen de toegestane verblijfsduur, en zowel de luchtvaartmaatschappij als het Bureau of Immigration vraagt erom.",
    sections: [
      {
        heading: "Wat je kunt verwachten",
        paragraphs: [
          "Reken erop dat je bij het inchecken voor een vlucht naar Manilla, Cebu of Clark om een vervolg- of terugvlucht wordt gevraagd. Ook de immigratiebeambte bij aankomst kan ernaar vragen.",
          "Je vervolgvlucht moet de Filipijnen verlaten binnen de periode dat je mag blijven. Check de visumvrije termijn voor jouw paspoort bij het Philippine Bureau of Immigration of de Filipijnse ambassade.",
        ],
      },
      {
        heading: "Een vervolgvlucht kiezen",
        paragraphs: ["Korte regionale vluchten naar Hongkong, Taipei, Kuala Lumpur of Singapore zijn gangbaar. De bestemming maakt niet uit, zolang je het land uit gaat."],
      },
      { heading: "Zo doe je het goed", paragraphs: [TIMING, CONTROLE] },
      ukNote(
        "Volgens het Britse ministerie wordt van de meeste Britse bezoekers verwacht dat ze bewijs van terug- of doorreis hebben, en kunnen immigratie en maatschappijen erom vragen. Iedereen moet zich in de drie dagen voor aankomst gratis registreren in het eTravel-systeem en de QR-code laten zien.",
      ),
    ],
    faqs: [
      {
        q: "Word ik geweigerd zonder doorreisticket?",
        a: "Dat risico is reëel. Maatschappijen die op de Filipijnen vliegen weigeren regelmatig passagiers met een enkeltje die geen vertrek kunnen laten zien.",
      },
    ],
    sources: [
      { label: "UK Foreign Office: Philippines entry requirements", url: "https://www.gov.uk/foreign-travel-advice/philippines/entry-requirements" },
    ],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "retourticket-bali-indonesie",
    title: "Retourticket nodig voor Bali en Indonesië?",
    h1: "Heb je een retour- of doorreisticket nodig voor Bali?",
    description:
      "Het visum bij aankomst voor Indonesië vereist een retour- of doorreisticket, en maatschappijen controleren dat vóór het boarden. Wat je laat zien en hoe je een controleerbare reservering regelt.",
    intro:
      "Het visum bij aankomst (VOA), waarmee de meeste reizigers naar Bali gaan, gaat ervan uit dat je binnen de toegestane termijn vertrekt. De Indonesische immigratiedienst noemt als voorwaarden voor het e-VOA en het VOA een paspoort dat nog zes maanden geldig is en een retourticket of ticket naar een ander land.",
    sections: [
      {
        heading: "Waar het gecontroleerd wordt",
        paragraphs: [
          "Op vluchten naar Denpasar en Jakarta wordt bij het inchecken vaak naar een vervolgvlucht gevraagd. Ook de Indonesische immigratie kan erom vragen bij het aanvragen of gebruiken van je visum bij aankomst.",
          "Check vóór vertrek de actuele visumregels voor jouw paspoort op de officiële site van de Indonesische immigratiedienst.",
        ],
      },
      {
        heading: "Een vervolgvlucht kiezen",
        paragraphs: ["Vluchten van Bali naar Singapore, Kuala Lumpur of Perth zijn kort en een veelgebruikte keuze voor een vervolgreservering."],
      },
      { heading: "Zo doe je het goed", paragraphs: [TIMING, CONTROLE] },
      ukNote(
        "Volgens het Britse ministerie kost het visum bij aankomst van 30 dagen voor Britten 500.000 roepia en is bewijs van terug- of doorreis vereist. Bali heft daarnaast een toeristenbelasting van 150.000 roepia.",
      ),
    ],
    faqs: [
      {
        q: "Kan ik met een enkeltje naar Bali?",
        a: "Vliegen kan, maar reken erop dat je bij het inchecken of bij aankomst een terug- of vervolgvlucht moet laten zien. Het is een voorwaarde voor het visum bij aankomst.",
      },
    ],
    sources: [
      { label: "Indonesische immigratiedienst: visum-FAQ (voorwaarden e-VOA)", url: "https://www.imigrasi.go.id/faq/visa?lang=en-US" },
      { label: "UK Foreign Office: Indonesia entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" },
    ],
    checked: CHECKED,
  },
];

export const NL_UI: GuideUi = {
  home: "Home",
  guides: "Gidsen",
  indexTitle: "Gidsen over doorreistickets en vluchtreserveringen voor visa",
  indexDescription:
    "Welke landen bewijs van vertrek vragen, wat visumaanvragen nodig hebben en hoe je een controleerbare vluchtreservering krijgt zonder een ticket te kopen.",
  commonQuestions: "Veelgestelde vragen",
  moreGuides: "Meer gidsen",
  disclaimer:
    "Deze gidsen zijn algemene informatie, geen juridisch of immigratieadvies. Regels kunnen veranderen: controleer voor vertrek altijd de officiële bronnen van je bestemming en je luchtvaartmaatschappij.",
  ctaHeading: (price) =>
    price ? `Een controleerbare vluchtreservering nodig? Vanaf ${price}` : "Een controleerbare vluchtreservering nodig?",
  ctaBody: "Ontvang binnen minuten een echte vluchtreservering per e-mail, met een boekingscode die op de site van de maatschappij te vinden is.",
  ctaButton: "Regel je reservering",
  destinationsTitle: "Wanneer je vluchtbewijs nodig hebt",
  destinationsSub: "Gidsen over vluchtreserveringen voor visa en wat maatschappijen en immigratie controleren.",
  sourcesHeading: "Bronnen",
  lastChecked: (date) => `Laatst gecontroleerd: ${date}`,
};
