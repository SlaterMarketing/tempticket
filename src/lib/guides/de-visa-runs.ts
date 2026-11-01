/**
 * German visa run guides. Same facts and official sources as en-visa-runs.ts
 * (checked 2026-11-01), translated. The stay lengths come from the UK Foreign
 * Office for British passports, so pages say so and tell readers with other
 * passports to check their own rules. Keys match the English pages.
 */

import { PRUEFEN, TIMING } from "./de";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, name: string): GuideSource => ({
  label: `Britisches Außenministerium: Einreisebestimmungen ${name} (auf Englisch)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

type Run = {
  id: string;
  slug: string;
  land: string;
  /** "in Thailand", "im Schengen-Raum"... */
  in: string;
  aufenthalt: string;
  reset: string;
  regeln: string[];
  ziele: string;
  rueckkehr: string;
  alternative?: string;
  faq: GuideFaq;
  quellen: GuideSource[];
  allgemein?: boolean;
};

const VORSICHT =
  "Über jede Einreise entscheidet der Grenzbeamte. Ausreisen im Schnelldurchlauf mit nur ein paar Stunden außer Landes führen zu Nachfragen oder Zurückweisung. Bleib also wirklich eine Weile draußen, hab Nachweise über Geld und Unterkunft dabei und sei ehrlich zu deinen Plänen.";

const PASS =
  "Die Fristen auf dieser Seite gibt das britische Außenministerium für britische Pässe an. Mit deutschem, österreichischem, Schweizer oder anderem Pass können sie abweichen: Prüf sie auf der offiziellen Einwanderungsseite des Landes, bei seiner Botschaft oder in den Reise- und Sicherheitshinweisen des Auswärtigen Amts, bevor du die Ausreise planst.";

const RUNS: Run[] = [
  {
    id: "thailand", slug: "visa-run-thailand", land: "Thailand", in: "in Thailand",
    aufenthalt: "30 Tage visumfrei", reset: "Neue Einreise, nach Ermessen des Beamten",
    regeln: [
      "Für britische Besucher erlaubt die visumfreie Einreise nach Thailand jetzt bis zu 30 Tage, nur für Tourismus. Die Einwanderungsbehörde kann einen Nachweis über Geldmittel (10.000 Baht pro Person, 20.000 pro Familie) und über die Weiter- oder Rückreise verlangen, und alle müssen in den drei Tagen vor Ankunft die digitale Einreisekarte TDAC ausfüllen.",
    ],
    ziele: "Kuala Lumpur oder Penang per Flug, Vientiane über die Freundschaftsbrücke, Phnom Penh oder Siem Reap",
    rueckkehr: "Der Rückflug nach Thailand zählt als neue Ankunft, also will die Airline einen Weiterflug innerhalb deiner neuen 30 Tage sehen. Buch ihn, bevor du losfährst.",
    alternative: "Wer monatelang bleibt, ist mit dem Destination Thailand Visa (DTV) besser bedient: 180 Tage pro Einreise über fünf Jahre, ohne Visa Runs.",
    faq: { q: "Wie viele Visa Runs kann ich in Thailand machen?", a: "Eine feste Zahl gibt es nicht, aber der Beamte kann die visumfreie Einreise verweigern, wenn es so aussieht, als würdest du in Thailand leben. Für lange Aufenthalte ist das DTV oder ein anderes Visum sicherer." },
    quellen: [fcdo("thailand", "Thailand"), { label: "Königlich Thailändische Botschaft London: Destination Thailand Visa (auf Englisch)", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" }],
  },
  {
    id: "vietnam", slug: "visa-run-vietnam", land: "Vietnam", in: "in Vietnam",
    aufenthalt: "45 Tage visumfrei oder 90-Tage-E-Visum", reset: "Neue Einreise; E-Visum für mehrere Einreisen",
    regeln: [
      "Britische Besucher können bis zu 45 Tage visumfrei nach Vietnam einreisen oder ein E-Visum für 90 Tage mit mehreren Einreisen beantragen. Das E-Visum gilt nur an den Ein- und Ausreisepunkten, die du im Antrag gewählt hast.",
    ],
    ziele: "Phnom Penh oder Siem Reap, Vientiane oder Luang Prabang, Bangkok, Kuala Lumpur",
    rueckkehr: "Beim Rückflug kann die Airline prüfen, ob du innerhalb deines neuen Aufenthalts ausreist. Reist du mit E-Visum über Land ein, achte darauf, dass dieser Grenzübergang im Antrag steht.",
    alternative: "Ein 90-Tage-E-Visum mit mehreren Einreisen macht einen Visa Run oft überflüssig.",
    faq: { q: "Brauche ich mit dem vietnamesischen E-Visum einen Visa Run?", a: "Nicht innerhalb der 90 Tage, da es für mehrere Einreisen gilt. Du musst nur über die darin genannten Übergänge aus- und einreisen." },
    quellen: [fcdo("vietnam", "Vietnam")],
  },
  {
    id: "malaysia", slug: "visa-run-malaysia", land: "Malaysia", in: "in Malaysia",
    aufenthalt: "Normalerweise 90 Tage bei Ankunft", reset: "Neue Einreise, nach Ermessen des Beamten",
    regeln: [
      "Britische Besucher erhalten bei Ankunft normalerweise 90 Tage ohne Visum. Füll vor der Reise die Malaysia Digital Arrival Card aus; Airlines können sie beim Check-in verlangen.",
    ],
    ziele: "Singapur (per Bus über den Damm oder kurzer Flug), Bangkok, Bali, Medan",
    rueckkehr: "Ein Abstecher nach Singapur über Land ist üblich. Fliegst du zurück, halte einen Weiterflug innerhalb der nächsten 90 Tage bereit.",
    alternative: "Remote-Arbeitende, die länger bleiben, können den DE Rantau Pass beantragen: 3 bis 12 Monate, verlängerbar auf bis zu 24.",
    faq: { q: "Setzt ein Trip nach Singapur meinen Malaysia-Aufenthalt zurück?", a: "Die Rückkehr nach Malaysia ist eine neue Einreise, und der Beamte entscheidet über die Dauer. Häufige kurze Ausreisen können Fragen auslösen." },
    quellen: [fcdo("malaysia", "Malaysia"), { label: "MDEC: FAQ zum DE Rantau Pass (auf Englisch)", url: "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf" }],
  },
  {
    id: "bali-indonesia", slug: "visa-run-bali-indonesien", land: "Indonesien (Bali)", in: "auf Bali (Indonesien)",
    aufenthalt: "30-Tage-Visum bei Ankunft", reset: "Neues Visum bei jeder Einreise",
    regeln: [
      "Für britische Besucher gilt das Visum bei Ankunft 30 Tage, kostet 500.000 Rupiah und erlaubt eine Einreise. Ein Nachweis über die Weiter- oder Rückreise ist Voraussetzung, und Bali erhebt zusätzlich eine Touristenabgabe von 150.000 Rupiah.",
    ],
    ziele: "Singapur, Kuala Lumpur, Perth, Darwin",
    rueckkehr: "Jede neue Einreise braucht ein neues Visum bei Ankunft und damit einen Weiterreisenachweis. Airlines prüfen das am Schalter vor dem Rückflug nach Bali.",
    alternative: "Remote-Arbeitende, die bis zu einem Jahr bleiben, können sich das Remote-Worker-Visum E33G ansehen.",
    faq: { q: "Brauche ich nach einem Bali-Visa-Run ein Weiterreiseticket?", a: "Ja. Jedes neue Visum bei Ankunft setzt einen Nachweis über die Weiter- oder Rückreise voraus." },
    quellen: [fcdo("indonesia", "Indonesien")],
  },
  {
    id: "philippines", slug: "visa-run-philippinen", land: "Philippinen", in: "auf den Philippinen",
    aufenthalt: "30 Tage visumfrei", reset: "Besser vor Ort verlängern",
    regeln: [
      "Britische Besucher können bis zu 30 Tage ohne Visum bleiben und vor Ort eine Verlängerung beantragen. Von den meisten wird ein Nachweis über Rück- oder Weiterreise erwartet, und alle müssen sich bei eTravel registrieren.",
    ],
    ziele: "Hongkong, Taipeh, Kota Kinabalu, Singapur",
    rueckkehr: "Da man auf den Philippinen verlängern kann, ist ein Visa Run oft unnötig. Reist du aus und wieder ein, gilt die Weiterreiseticket-Prüfung erneut.",
    faq: { q: "Muss ich die Philippinen nach 30 Tagen verlassen?", a: "Nicht unbedingt. Du kannst vor Ort eine Verlängerung beantragen." },
    quellen: [fcdo("philippines", "Philippinen")],
  },
  {
    id: "mexico", slug: "visa-run-mexiko", land: "Mexiko", in: "in Mexiko",
    aufenthalt: "Bis 180 Tage, laut Stempel", reset: "Neuer Stempel; Dauer nach Ermessen des Beamten",
    regeln: [
      "Britische Touristen brauchen kein Visum. In den Pass wird die erlaubte Anzahl Tage gestempelt, bis zu 180. An der Grenze kann ein Rück- oder Weiterreiseticket und genug Geld für den Aufenthalt verlangt werden. Bei Einreise über Land füllst du ein Online-Einreiseformular aus.",
    ],
    ziele: "Belize City, Guatemala-Stadt, Havanna oder eine US-Stadt, wenn du in die USA einreisen darfst",
    rueckkehr: "Der mexikanische Beamte entscheidet, wie viele Tage du bekommst, und eine Rück- oder Weiterreisebuchung für die gewünschte Dauer hilft dabei.",
    faq: { q: "Bekomme ich 180 Tage in Mexiko?", a: "Möglich ist es, aber der Stempel zeigt, was der Beamte gewährt. Ein Rück- oder Weiterreiseticket und ein Geldnachweis unterstützen den Wunsch." },
    quellen: [fcdo("mexico", "Mexiko")],
  },
  {
    id: "costa-rica", slug: "visa-run-costa-rica", land: "Costa Rica", in: "in Costa Rica",
    aufenthalt: "Bis 180 Tage visumfrei", reset: "Neue Einreise",
    regeln: [
      "Britische Besucher können mit Costa Ricas Befreiung vom Touristenvisum bis zu 180 Tage bleiben. Bei der Ausreise per Flug kann eine Ausreisesteuer von 29 $ anfallen.",
    ],
    ziele: "Panama (Paso Canoas oder Flug nach Panama-Stadt), Nicaragua, San Andrés",
    rueckkehr: "Der klassische Run geht über Land nach Panama, doch Panama kann ein Rück- oder Weiterreiseticket und 1.000 $ Geldmittel verlangen, besonders von Nicht-Residenten, die über Land aus Costa Rica kommen. Bei der Rückkehr erwartet auch Costa Rica einen Weiterreisenachweis.",
    faq: { q: "Ist der Border Run von Costa Rica nach Panama einfach?", a: "Er ist üblich, aber Panama kann ein Rück- oder Weiterreiseticket und einen Nachweis über 1.000 $ oder eine Kreditkarte verlangen, vor allem bei Einreise über Land aus Costa Rica." },
    quellen: [fcdo("costa-rica", "Costa Rica"), fcdo("panama", "Panama")],
  },
  {
    id: "panama", slug: "visa-run-panama", land: "Panama", in: "in Panama",
    aufenthalt: "Bis 3 Monate", reset: "Neue Einreise",
    regeln: [
      "Britische Besucher können bis zu drei Monate ohne Visum bleiben, bei Einreise über Land oder per Flug. An der Grenze kann ein Rück- oder Weiterreiseticket und ein Nachweis über mindestens 1.000 $ oder eine Kreditkarte verlangt werden. Der Pass muss nach der Ausreise noch sechs Monate gültig sein und eine leere Seite haben.",
    ],
    ziele: "San José, Bogotá, Medellín, Cartagena",
    rueckkehr: "Halte für die Wiedereinreise eine Weiterreisebuchung bereit, besonders wenn du über Land aus Costa Rica zurückkommst.",
    faq: { q: "Wie viel Geld brauche ich für die Einreise nach Panama?", a: "An der Grenze können mindestens 1.000 $ oder eine Kreditkarte verlangt werden." },
    quellen: [fcdo("panama", "Panama")],
  },
  {
    id: "colombia", slug: "visa-run-kolumbien", land: "Kolumbien", in: "in Kolumbien", allgemein: true,
    aufenthalt: "90 Tage (max. 180 in 12 Monaten)", reset: "Nein: Obergrenze 180 Tage pro Jahr",
    regeln: [
      "Britische Besucher können bis zu 90 Tage bleiben, nach Ermessen des Beamten, aber nicht mehr als 180 Tage in einem Zeitraum von 12 Monaten. Du musst ein Weiter- oder Rückreiseticket innerhalb der 90 Tage vorzeigen können. Das Check-MIG-Formular ist freiwillig, beschleunigt aber die Einreise.",
    ],
    ziele: "Panama-Stadt, Quito, Lima, Aruba",
    rueckkehr: "Ein Visa Run umgeht die jährliche Obergrenze von 180 Tagen nicht. Innerhalb davon braucht jede Einreise ein Weiterreiseticket innerhalb von 90 Tagen.",
    faq: { q: "Kann ich durch Aus- und Wiedereinreise länger in Kolumbien bleiben?", a: "Als Besucher nur bis zu 180 Tage in einem Zeitraum von 12 Monaten. Danach brauchst du ein anderes Visum." },
    quellen: [fcdo("colombia", "Kolumbien")],
  },
  {
    id: "peru", slug: "visa-run-peru", land: "Peru", in: "in Peru", allgemein: true,
    aufenthalt: "90 in 180 Tagen (max. 183 pro Jahr)", reset: "Nein: Obergrenze",
    regeln: [
      "Britische Besucher erhalten normalerweise bis zu 90 Tage in einem Zeitraum von 180 Tagen, gerechnet ab der ersten Einreise, und höchstens 183 Tage in 365. Überziehen führt zu einer Geldstrafe und möglicher Festnahme.",
    ],
    ziele: "La Paz, Santiago, Arica, Quito, Bogotá",
    rueckkehr: "Eine Wiedereinreise setzt die 90-in-180-Zählung nicht zurück. Bei einem One-Way-Flug kann die Airline trotzdem einen Weiterreisenachweis verlangen.",
    faq: { q: "Setzt eine Ausreise aus Peru meine Tage zurück?", a: "Nein. Die Grenzen von 90 in 180 und 183 in 365 zählen deine gesamte Zeit in Peru." },
    quellen: [fcdo("peru", "Peru")],
  },
  {
    id: "schengen", slug: "visa-run-schengen", land: "Schengen-Raum", in: "im Schengen-Raum", allgemein: true,
    aufenthalt: "90 Tage in jedem Zeitraum von 180", reset: "Nein: rollierendes 180-Tage-Fenster",
    regeln: [
      "Kurzzeitbesucher dürfen 90 Tage in jedem Zeitraum von 180 Tagen im gesamten Schengen-Raum verbringen. Ein Wochenende außerhalb setzt nichts zurück: Gezählt wird von jedem Aufenthaltstag aus 180 Tage rückwärts.",
      "Seit dem 12. Oktober 2025 erfasst das Einreise-/Ausreisesystem (EES) Ein- und Ausreisen elektronisch statt mit Stempeln, seit dem 10. April 2026 im Vollbetrieb. Die Zählung läuft also automatisch.",
      "Für Bürger der EU, des EWR und der Schweiz gilt diese Grenze nicht: Sie genießen Freizügigkeit.",
    ],
    ziele: "Nicht-Schengen-Länder wie Großbritannien, Irland, Albanien, Montenegro, Serbien, die Türkei, Georgien oder Marokko",
    rueckkehr: "Ein Schengen-„Visa Run“ ist in Wahrheit eine Pause: Verbring die Zeit draußen und komm zurück, wenn du wieder Tage frei hast. Grenzbeamte können fragen, wie du wieder ausreist.",
    faq: { q: "Kann ich mit einem Visa Run meine 90 Schengen-Tage zurücksetzen?", a: "Nein. Die 90 Tage werden in einem rollierenden 180-Tage-Fenster gezählt, und Zeit außerhalb hilft nur, weil alte Tage aus der Zählung fallen." },
    quellen: [
      { label: "EAD: Do's and Don'ts zum Schengen-Visum (90/180-Regel) (auf Englisch)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
      { label: "Europäische Kommission: EES seit 12. Oktober 2025 in Betrieb (auf Englisch)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
    ],
  },
  {
    id: "albania", slug: "visa-run-albanien", land: "Albanien", in: "in Albanien",
    aufenthalt: "90 Tage in 180", reset: "Eigene 90/180-Zählung",
    regeln: [
      "Britische Besucher können bis zu 90 Tage in einem Zeitraum von 180 Tagen in Albanien bleiben, getrennt von der Schengen-Zählung. Deshalb ist Albanien ein beliebter Ort für die Schengen-Pause.",
    ],
    ziele: "Montenegro, Nordmazedonien, Kosovo, die Fähre nach Italien oder Griechenland",
    rueckkehr: "Mit Fähren und Bussen kommst du ohne Flug hin und weg. Fliegst du one-way ein, plane die Ausreise innerhalb von 90 Tagen.",
    faq: { q: "Eignet sich Albanien für die Schengen-Pause?", a: "Ja. Die 90-in-180-Grenze dort ist von Schengen getrennt." },
    quellen: [fcdo("albania", "Albanien")],
  },
  {
    id: "turkey", slug: "visa-run-tuerkei", land: "Türkei", in: "in der Türkei",
    aufenthalt: "90 Tage in 180", reset: "Eigene 90/180-Zählung",
    regeln: [
      "Britische Besucher können bis zu 90 Tage in jedem Zeitraum von 180 Tagen in der Türkei bleiben, unabhängig von Schengen. Der Pass muss ab Ankunft noch 150 Tage gültig sein und eine leere Seite haben.",
    ],
    ziele: "Tiflis, Athen, Sofia, Larnaka",
    rueckkehr: "Über Istanbul lässt sich leicht ein Weiterflug wohin auch immer buchen.",
    faq: { q: "Zählt die Türkei zu den Schengen-Tagen?", a: "Nein. Sie hat ihre eigene 90-in-180-Grenze." },
    quellen: [fcdo("turkey", "Türkei")],
  },
  {
    id: "georgia", slug: "visa-run-georgien", land: "Georgien", in: "in Georgien",
    aufenthalt: "Bis 1 Jahr", reset: "Selten nötig",
    regeln: [
      "Britische Besucher können bis zu einem Jahr ohne Visum in Georgien bleiben. Alle Besucher brauchen eine Kranken- und Unfallversicherung oder Geld für Behandlung und Rücktransport.",
    ],
    ziele: "Jerewan, Istanbul, Baku",
    rueckkehr: "Mit einem Jahr visumfrei sind Visa Runs selten nötig. Fliegst du one-way ein, kann die Airline trotzdem fragen, wie du wieder ausreist.",
    faq: { q: "Brauche ich in Georgien einen Visa Run?", a: "Meist nicht: Britische Besucher dürfen bis zu einem Jahr bleiben." },
    quellen: [fcdo("georgia", "Georgien")],
  },
  {
    id: "south-korea", slug: "visa-run-suedkorea", land: "Südkorea", in: "in Südkorea",
    aufenthalt: "90 Tage", reset: "Neue Einreise, nach Ermessen des Beamten",
    regeln: [
      "Britische Besucher können bis zu 90 Tage bleiben und brauchen ein Weiter- oder Rückreiseticket. Bis zum 31. Dezember 2026 sind sie von der K-ETA befreit und müssen eine Einreisekarte abgeben.",
    ],
    ziele: "Fukuoka (auch per Fähre ab Busan), Osaka, Tokio, Taipeh",
    rueckkehr: "Jede Einreise braucht ein Weiter- oder Rückreiseticket, buch die Ausreise also vor dem Rückflug.",
    faq: { q: "Kann ich einen Visa Run von Korea nach Japan machen?", a: "Viele machen das, aber jede Rückkehr nach Korea ist eine neue Einreise nach Ermessen des Beamten und braucht ein Weiter- oder Rückreiseticket." },
    quellen: [fcdo("south-korea", "Südkorea")],
  },
  {
    id: "central-america-ca4", slug: "visa-run-zentralamerika-ca4", land: "Zentralamerika (CA-4)", in: "in Zentralamerika (CA-4)", allgemein: true,
    aufenthalt: "90 Tage für 4 Länder zusammen", reset: "Nur durch Verlassen der CA-4-Zone",
    regeln: [
      "Guatemala, El Salvador, Honduras und Nicaragua bilden die CA-4-Zone. Für britische Besucher gelten die 90 Tage für Guatemala, El Salvador und Nicaragua zusammen und beginnen an deren Grenzen nicht neu. Nicaragua warnt, dass die Einreise ohne Weiterreiseticket verweigert werden kann.",
    ],
    ziele: "Mexiko, Belize oder Costa Rica",
    rueckkehr: "Der Wechsel zwischen CA-4-Ländern ist kein Visa Run. Verlass die Zone, und hab bei der Rückkehr ein Ticket aus der Region heraus.",
    faq: { q: "Setzt der Grenzübertritt von Guatemala nach El Salvador meine Tage zurück?", a: "Nein. Die CA-4-Länder teilen sich einen 90-Tage-Zeitraum." },
    quellen: [fcdo("guatemala", "Guatemala"), fcdo("el-salvador", "El Salvador"), fcdo("nicaragua", "Nicaragua")],
  },
];

function build(r: Run): Guide {
  return {
    key: `visa-run-${r.id}`,
    slug: r.slug,
    title: `Visa Run ${r.in}: Regeln, Ziele und Weiterreiseticket`,
    h1: `Visa Run ${r.in}: was die Regeln erlauben`,
    description: `Wie lange du ${r.in} bleiben darfst, ob Aus- und Wiedereinreise etwas zurücksetzt, die üblichen Ziele und das Weiterreiseticket, das du bei der Rückkehr brauchst.`,
    intro: `Bei einem Visa Run verlässt du ein Land und kommst zurück, um einen neuen Aufenthalt zu beginnen. Ob das ${r.in} funktioniert, hängt davon ab, wie die Fristen gezählt werden. Das sagen die offiziellen Quellen.`,
    sections: [
      { heading: "Die Regeln", paragraphs: [...r.regeln, ...(r.alternative ? [r.alternative] : []), ...(r.allgemein ? [] : [PASS])] },
      { heading: "Wohin es die Leute zieht", paragraphs: [`Übliche Ziele sind ${r.ziele}.`, VORSICHT] },
      { heading: "Die Rückkehr: das Weiterreiseticket", paragraphs: [r.rueckkehr, TIMING, PRUEFEN] },
    ],
    faqs: [r.faq],
    sources: r.quellen,
    checked: CHECKED,
  };
}

export const DE_VISA_RUN_GUIDES: Guide[] = [
  {
    key: "visa-runs-explained",
    slug: "visa-runs-erklaert",
    title: "Visa Runs erklärt: Welche Länder den Aufenthalt zurücksetzen",
    h1: "Visa Runs und Border Runs: Welche Länder deinen Aufenthalt zurücksetzen",
    description:
      "Wo ein Visa Run einen neuen Aufenthalt startet und wo rollierende Grenzen wie 90 in 180 ihn sinnlos machen, plus das Weiterreiseticket, das du bei jeder Rückkehr brauchst.",
    intro:
      "Manche Länder zählen jede Einreise einzeln, sodass Aus- und Wiedereinreise einen neuen Aufenthalt startet, nach Ermessen des Beamten. Andere nutzen rollierende oder jährliche Obergrenzen, dann bringt ein Run nichts. Diese Tabelle sortiert das anhand offizieller Angaben der britischen Regierung für britische Pässe; mit anderem Pass können die Fristen abweichen.",
    table: {
      caption: "Visa Runs nach Land",
      headers: ["Land", "Visumfreier Aufenthalt", "Setzt ein Run zurück?"],
      rows: RUNS.map((r) => [r.land, r.aufenthalt, r.reset]),
      rowLinks: RUNS.map((r) => r.slug),
      note: "Für britische Pässe, laut GOV.UK und EU-Quellen. Über jede Einreise entscheidet der Beamte.",
    },
    sections: [
      {
        heading: "Die eine Regel, die überall gilt",
        paragraphs: [
          "Jede Wiedereinreise ist eine neue Ankunft, und ohne Weiterflug behandelt dich die Airline als One-Way-Passagier. Buch die Weiterreise, bevor du zurückfliegst.",
          VORSICHT,
          TIMING,
          PRUEFEN,
        ],
      },
    ],
    faqs: [
      { q: "Sind Visa Runs legal?", a: "Aus- und Wiedereinreise ist legal, wo jede Einreise einzeln zählt, aber der Beamte kann die Einreise verweigern, wenn er glaubt, dass du als Tourist im Land lebst oder arbeitest." },
    ],
    sources: RUNS.flatMap((r) => r.quellen.slice(0, 1)),
    checked: CHECKED,
  },
  ...RUNS.map(build),
];
