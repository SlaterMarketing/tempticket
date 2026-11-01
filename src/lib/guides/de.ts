/** German guides. Same rules as the English ones: general, cautious, point to official sources. */

import type { Guide, GuideUi } from "./types";

const PRUEFEN =
  "Wenn die Reservierung da ist, öffne auf der Website der Airline „Buchung verwalten“ und suche sie mit Buchungscode (PNR) und Nachnamen. Wenn sie dort erscheint, sieht sie auch der Mitarbeiter am Check-in. Mach zusätzlich zur E-Mail einen Screenshot.";

const TIMING =
  "Solche Reservierungen bleiben nur kurz aktiv (meist etwa 48 Stunden) und verfallen dann. Buch sie kurz vor dem Check-in oder deinem Termin, nicht Wochen vorher.";

export const DE_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "weiterreiseticket",
    title: "Weiterreiseticket: Was es ist und wie du es bekommst",
    h1: "Weiterreisenachweis und Weiterreiseticket erklärt",
    description:
      "Warum Airlines und Einreisebehörden ein Weiterreiseticket verlangen, was als Nachweis zählt und wie du eine überprüfbare Flugreservierung bekommst, ohne ein Ticket zu kaufen.",
    intro:
      "Viele Länder lassen Besucher nur einreisen, wenn sie zeigen können, dass sie wieder ausreisen. Airlines prüfen das beim Check-in, denn wird dir die Einreise verweigert, müssen sie dich auf eigene Kosten zurückfliegen. Wer mit einem One-Way-Ticket reist, braucht deshalb einen Nachweis über einen Weiter- oder Rückflug.",
    sections: [
      {
        heading: "Wer danach fragt",
        paragraphs: [
          "Die Airline beim Check-in und der Grenzbeamte bei der Ankunft. In der Praxis fragt vor allem die Airline, weil ihr System Passagiere mit One-Way-Tickets in Länder mit Ausreisepflicht markiert.",
          "Auch Konsulate verlangen bei vielen Visumanträgen einen Flugplan. Die meisten akzeptieren eine Reservierung und raten davon ab, vor der Visumerteilung ein Ticket zu kaufen.",
        ],
      },
      {
        heading: "Was als Nachweis zählt",
        paragraphs: [
          "Ein Flug, der das Land verlässt, egal wohin, mit einem Buchungscode, den der Mitarbeiter sehen kann. An Landgrenzen reicht manchmal ein Busticket, Airlines wollen aber meist einen Flug.",
          "Eine echte Reservierung hat eine PNR, die du auf der Website der Airline abrufen kannst. Ein bearbeitetes oder gefälschtes PDF ist kein Nachweis und kann dir eine Einreiseverweigerung oder Schlimmeres einbringen.",
        ],
      },
      {
        heading: "Deine Möglichkeiten",
        paragraphs: [
          "Ein erstattbares Ticket kaufen und später stornieren: funktioniert, bindet aber Hunderte Euro, und die Erstattung kann Wochen dauern.",
          "Den billigsten Weiterflug kaufen und verfallen lassen: einfach, aber das Geld ist weg.",
          "Einen Weiterreiseticket-Service nutzen: Für eine kleine Gebühr bekommst du eine echte Reservierung, die kurz gehalten und dann freigegeben wird. So machen es die meisten digitalen Nomaden und Backpacker.",
        ],
      },
      { heading: "So prüfst du, ob sie echt ist", paragraphs: [PRUEFEN, TIMING] },
    ],
    faqs: [
      {
        q: "Ist das legal?",
        a: "Eine Flugreservierung zu halten ist eine normale Funktion von Airlines, und Konsulate akzeptieren Reservierungen täglich. Nicht in Ordnung sind gefälschte Dokumente. Prüfe die Regeln deines Ziellands immer bei einer offiziellen Quelle.",
      },
      {
        q: "Muss der Weiterflug nach Deutschland gehen?",
        a: "Nein. Er muss nur das Land verlassen, in das du einreist. Meist nimmt man einen kurzen Flug in ein Nachbarland.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "flugreservierung-fuer-schengen-visum",
    title: "Flugreservierung für das Schengen-Visum (ohne Ticketkauf)",
    h1: "Flugreservierung für den Schengen-Visumantrag",
    description:
      "Die meisten Schengen-Konsulate verlangen eine Flugreservierung, kein bezahltes Ticket. So bekommst du einen überprüfbaren Hin- und Rückflug für deinen Termin.",
    intro:
      "Für ein Schengen-Visum wird meist ein Flugplan verlangt, der zeigt, wie du ein- und wieder ausreist. Viele Konsulate schreiben ausdrücklich, dass du vor der Visumerteilung kein Ticket kaufen sollst und eine Reservierung genügt.",
    sections: [
      {
        heading: "Was Konsulate verlangen",
        paragraphs: [
          "Hin- und Rückflug, oder eine Ein- und Ausreise, passend zu den Daten im Antrag, auf deinen Namen genau wie im Pass.",
          "Die Anforderungen unterscheiden sich je nach Land und Visazentrum. Lies die Checkliste des Konsulats, bei dem du den Antrag stellst.",
        ],
      },
      {
        heading: "Wann du reservieren solltest",
        paragraphs: [
          "Reserviere ein bis zwei Tage vor deinem Termin, damit die Buchung aktiv ist, wenn deine Unterlagen geprüft werden. Dass sie vor der Entscheidung verfällt, ist normal.",
          PRUEFEN,
        ],
      },
    ],
    faqs: [
      {
        q: "Brauche ich Hin- und Rückflug?",
        a: "Die meisten Schengen-Anträge erwarten Hin- und Rückflug oder zumindest eine bestätigte Ausreise aus dem Schengen-Raum.",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "flugreservierung-fuer-visum",
    title: "Flugreservierung fürs Visum: echte Reservierung oder Fake-PDF",
    h1: "Flugreservierung für einen Visumantrag",
    description:
      "Was eine Flugreservierung fürs Visum („Dummy Ticket“) ist, warum Konsulate sie verlangen, woran du echte Reservierungen erkennst und wie du eine überprüfbare bekommst.",
    intro:
      "Viele Konsulate wollen mit dem Visumantrag einen Flugplan sehen, raten aber davon ab, das Ticket vor der Entscheidung zu kaufen. Die übliche Lösung ist eine echte Reservierung, die kurz im System der Airline gehalten wird.",
    sections: [
      {
        heading: "Echte Reservierung oder Fake-PDF",
        paragraphs: [
          "Eine echte Reservierung hat einen Buchungscode (PNR), den du auf der Website der Airline abrufen kannst. Ein gefälschtes Dokument sieht nur so aus, dahinter steht nichts.",
          "Konsulate können das prüfen. Ein gefälschtes Dokument kann zur Ablehnung führen und künftigen Anträgen schaden. Nutze nur Reservierungen, die du selbst prüfen kannst.",
        ],
      },
      {
        heading: "Die Angaben müssen passen",
        paragraphs: [
          "Dein Name muss exakt mit dem Pass übereinstimmen, die Daten mit Antrag und Unterkunft.",
          TIMING,
          PRUEFEN,
        ],
      },
    ],
    faqs: [
      {
        q: "Ist das legal?",
        a: "Eine echte Flugreservierung ist legal und genau das, was viele Konsulate verlangen. Ein bearbeitetes oder gefälschtes Dokument nicht.",
      },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "weiterreiseticket-thailand",
    title: "Weiterreiseticket für Thailand: Brauchst du eins?",
    h1: "Brauchst du ein Weiterreiseticket für Thailand?",
    description:
      "Die visumfreie Einreise nach Thailand setzt voraus, dass du innerhalb der erlaubten Zeit ausreist, und Airlines fragen beim Check-in oft danach. Was du erwarten kannst.",
    intro:
      "Wer visumfrei nach Thailand einreist, muss innerhalb der erlaubten Aufenthaltsdauer wieder ausreisen, und die Einwanderungsbehörde kann einen Nachweis verlangen. In der Praxis wird meist am Check-in-Schalter der Airline geprüft.",
    sections: [
      {
        heading: "Wo geprüft wird",
        paragraphs: [
          "Airlines nach Thailand, vor allem Billigflieger, fragen Passagiere mit One-Way-Ticket regelmäßig nach einem Ausreiseflug. Ohne kann dir das Boarding verweigert werden.",
          "Die Einreiseregeln für Thailand haben sich in den letzten Jahren mehrfach geändert. Prüfe die erlaubte Aufenthaltsdauer für deinen Pass auf der offiziellen Thai-e-Visa-Website.",
        ],
      },
      {
        heading: "Was du zeigen solltest",
        paragraphs: [
          "Einen Flug aus Thailand innerhalb deiner erlaubten Aufenthaltsdauer. Beliebt sind kurze Flüge nach Kuala Lumpur, Singapur, Ho-Chi-Minh-Stadt oder Phnom Penh.",
          TIMING,
          PRUEFEN,
        ],
      },
    ],
    faqs: [
      {
        q: "Zählt ein Busticket nach Kambodscha oder Laos?",
        a: "An Landgrenzen manchmal, Airlines wollen aber meist einen Flug sehen. Eine Flugreservierung ist die sicherere Wahl.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "boarding-verweigert-one-way-ticket",
    title: "Boarding verweigert wegen One-Way-Ticket? So vermeidest du es",
    h1: "Boarding verweigert mit One-Way-Ticket: so vermeidest du es",
    description:
      "Warum Airlines Passagiere mit One-Way-Ticket abweisen, welche Ziele betroffen sind und wie du das Problem am Flughafen in Minuten löst.",
    intro:
      "Wird dir an deinem Ziel die Einreise verweigert, muss die Airline dich zurückfliegen und kann Strafen zahlen. Deshalb fragen Check-in-Mitarbeiter Passagiere mit One-Way-Ticket nach einem Ausreisenachweis. Ohne kann dir das Boarding verweigert werden.",
    sections: [
      {
        heading: "Welche Reisen betroffen sind",
        paragraphs: [
          "Am häufigsten One-Way-Flüge in Länder mit Ausreisepflicht, etwa die Philippinen, Thailand, Indonesien, Costa Rica, Kolumbien, Peru oder Neuseeland. Das System der Airline markiert dich automatisch.",
        ],
      },
      {
        heading: "Lösung am Flughafen",
        paragraphs: [
          "Ein Weiterreiseticket-Service stellt dir in wenigen Minuten per Handy eine echte Reservierung aus, direkt am Schalter. Zeig dem Mitarbeiter den Buchungscode, dann kann er sie in seinem System prüfen.",
          PRUEFEN,
        ],
      },
    ],
    faqs: [
      {
        q: "Darf die Airline mich wirklich abweisen?",
        a: "Ja. Airlines dürfen die Beförderung verweigern, wenn du die Einreisebedingungen deines Ziels nicht erfüllst, und der Ausreisenachweis gehört dazu.",
      },
    ],
  },
];

export const DE_UI: GuideUi = {
  home: "Startseite",
  guides: "Ratgeber",
  indexTitle: "Ratgeber: Weiterreiseticket und Flugreservierung fürs Visum",
  indexDescription:
    "Welche Länder einen Ausreisenachweis verlangen, was Visumanträge brauchen und wie du eine überprüfbare Flugreservierung bekommst, ohne ein Ticket zu kaufen.",
  commonQuestions: "Häufige Fragen",
  moreGuides: "Weitere Ratgeber",
  disclaimer:
    "Dieser Ratgeber ist eine allgemeine Information, keine Rechts- oder Einwanderungsberatung. Regeln ändern sich: Prüfe vor der Reise immer die offizielle Quelle deines Ziellands und deine Airline.",
  ctaHeading: (price) =>
    price
      ? `Brauchst du ein überprüfbares Weiterreiseticket? Ab ${price}`
      : "Brauchst du ein überprüfbares Weiterreiseticket?",
  ctaBody:
    "Du bekommst in wenigen Minuten per E-Mail eine echte Flugreservierung mit Buchungscode, den du auf der Website der Airline prüfen kannst.",
  ctaButton: "Weiterreiseticket holen",
  destinationsTitle: "Wo du einen Ausreisenachweis brauchst",
  destinationsSub:
    "Ratgeber dazu, was Airlines und Grenzbehörden prüfen, und zu Flugreservierungen fürs Visum.",
  sourcesHeading: "Quellen",
  lastChecked: (date) => `Zuletzt geprüft: ${date}`,
};
