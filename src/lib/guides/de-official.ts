/**
 * German guides on official entry schemes (ETIAS, EES, ETAs, arrival cards,
 * transit visas, ESTA). Same facts and official sources as en-official.ts
 * (checked 2026-11-01), translated. Keys match the English pages.
 */

import { PRUEFEN, TIMING } from "./de";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, name: string): GuideSource => ({
  label: `Britisches Außenministerium: Einreisebestimmungen ${name} (auf Englisch)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

const PASS =
  "Die Aufenthaltsdauer, die das britische Außenministerium nennt, gilt für britische Pässe. Mit deutschem, österreichischem oder Schweizer Pass kann sie abweichen: Prüf die offizielle Einwanderungsseite des Landes oder die Reise- und Sicherheitshinweise des Auswärtigen Amts.";

const EU =
  "Bürger der EU, des EWR und der Schweiz sind nicht betroffen: Das System richtet sich an Staatsangehörige von Drittstaaten, etwa Besucher aus den USA oder Kanada oder Reisende mit Schengen-Visum.";

export const DE_OFFICIAL_GUIDES: Guide[] = [
  {
    key: "etias-explained",
    slug: "etias-reisegenehmigung-europa",
    title: "ETIAS erklärt: Kosten, wer es braucht und wann es startet",
    h1: "ETIAS: die neue Reisegenehmigung für Europa",
    description: "Was ETIAS ist, die Gebühr von 20 €, wer befreit ist, wann die EU den Start plant und wie es mit Rückflugticket und 90-Tage-Regel zusammenhängt.",
    intro: "ETIAS ist eine Online-Reisegenehmigung, die visumfreie Besucher vor der Reise in die meisten europäischen Länder brauchen werden, ähnlich dem US-amerikanischen ESTA. Es ersetzt kein Visum für alle, die eins brauchen, und ändert nichts an der Regel von 90 Tagen in 180.",
    sections: [
      { heading: "Kosten und Befreiungen", paragraphs: ["Die Europäische Kommission hat die ETIAS-Gebühr auf 20 € festgelegt, statt der ursprünglich geplanten 7 €. Unter 18-Jährige und über 70-Jährige zahlen nichts.", EU] },
      { heading: "Wann es startet", paragraphs: ["Im Juli 2025 erklärte die Kommission, ETIAS werde Ende 2026 starten, nachdem das Einreise-/Ausreisesystem voll in Betrieb ist. Starttermine haben sich schon früher verschoben, prüf also auf der offiziellen EU-Seite, ob es bei deiner Reise schon gilt."] },
      { heading: "Was sich nicht ändert", paragraphs: ["ETIAS ändert nichts daran, was Grenzbeamte verlangen dürfen, einschließlich eines Nachweises, dass du wieder ausreist. One-Way-Reisende werden weiterhin am ehesten nach einem Rück- oder Weiterreiseticket gefragt.", PRUEFEN] },
    ],
    faqs: [
      { q: "Brauche ich ETIAS mit Schengen-Visum?", a: "Nein. ETIAS ist für Reisende ohne Visumpflicht. Visumpflichtige beantragen weiterhin ein Visum." },
      { q: "Was kostet ETIAS?", a: "20 €, befreit sind unter 18- und über 70-Jährige, so die Europäische Kommission." },
    ],
    sources: [{ label: "Europäische Kommission: ETIAS wird 20 € kosten (auf Englisch)", url: "https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en" }],
    checked: CHECKED,
  },
  {
    key: "ees-entry-exit-system",
    slug: "ees-einreise-ausreisesystem-europa",
    title: "EES: Europas Einreise-/Ausreisesystem und das Ende der Passstempel",
    h1: "Das Einreise-/Ausreisesystem (EES) der EU, erklärt",
    description: "Das Einreise-/Ausreisesystem hat die Passstempel für Nicht-EU-Besucher ersetzt. Wann es startete, was es für die 90-Tage-Regel bedeutet und warum Überziehungen sofort auffallen.",
    intro: "Seit dem 12. Oktober 2025 werden Nicht-EU-Reisende bei Kurzaufenthalten an den Außengrenzen der teilnehmenden europäischen Länder elektronisch erfasst, statt einen Stempel zu bekommen. Seit dem 10. April 2026 läuft das System im Vollbetrieb.",
    sections: [
      { heading: "Was sich geändert hat", paragraphs: ["Das EES erfasst jede Ein- und Ausreise digital und ersetzt in den meisten europäischen Ländern das Stempeln des Passes. Es gilt für Reisende von außerhalb der EU bei kurzen Besuchen, mit oder ohne Visumpflicht.", EU] },
      { heading: "Warum das für die 90-Tage-Regel wichtig ist", paragraphs: ["Kurzaufenthalte sind auf 90 Tage in jedem Zeitraum von 180 Tagen im gesamten Schengen-Raum begrenzt. Mit Stempeln zählten Beamte von Hand; mit dem EES zählt das System automatisch, und eine Überziehung fällt sofort bei der Ausreise oder der nächsten Reise auf.", "Planst du eine lange Europareise, buch deine Ausreise innerhalb der 90 Tage und halte die Buchung griffbereit. Grenzbeamte können fragen, wie und wann du ausreist.", TIMING] },
    ],
    faqs: [
      { q: "Bekomme ich in Europa noch einen Passstempel?", a: "In den meisten teilnehmenden Ländern nicht. Das EES hat das Stempeln ersetzt und läuft seit dem 10. April 2026 im Vollbetrieb." },
      { q: "Gilt das EES auch mit Visum?", a: "Ja. Es erfasst Nicht-EU-Reisende bei Kurzaufenthalten, ob visumfrei oder mit Schengen-Visum." },
    ],
    sources: [
      { label: "Europäische Kommission: das neue EES startete am 12. Oktober 2025 (auf Englisch)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
      { label: "Botschaft Polens: EES ab 10. April 2026 im Vollbetrieb (auf Englisch)", url: "https://www.gov.pl/web/usa-en/entryexit-system---full-implementation-from-april-10th-2026" },
      { label: "EAD: Do's and Don'ts zum Schengen-Visum (auf Englisch)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
    ],
    checked: CHECKED,
  },
  {
    key: "uk-eta",
    slug: "eta-grossbritannien-elektronische-reisegenehmigung",
    title: "ETA für Großbritannien: Kosten, wer sie braucht und Umsteigen",
    h1: "Die elektronische Reisegenehmigung (ETA) für Großbritannien",
    description: "Die meisten visumfreien Besucher brauchen jetzt eine ETA für Großbritannien, auch Deutsche, Österreicher und Schweizer. Kosten, Aufenthaltsdauer, wer keine braucht und wann sie beim Umsteigen nötig ist.",
    intro: "Die meisten Besucher, die für Großbritannien kein Visum brauchen, darunter Europäer, Amerikaner, Kanadier und Australier, benötigen jetzt vor der Reise eine elektronische Reisegenehmigung (ETA). Sie gilt auch für Jersey, Guernsey und die Isle of Man.",
    sections: [
      { heading: "Kosten und Aufenthaltsdauer", paragraphs: ["Eine ETA kostet 20 £ über den offiziellen GOV.UK-Dienst. Andere Websites verlangen teils mehr. Sie erlaubt Besuche von bis zu sechs Monaten am Stück, garantiert aber keine Einreise.", "Jeder Reisende braucht eine eigene, auch Babys und Kinder. Britische und irische Staatsbürger sowie Personen mit Aufenthalts-, Arbeits- oder Studienerlaubnis in Großbritannien brauchen keine."] },
      { heading: "Umsteigen", paragraphs: ["Du brauchst eine ETA, wenn du beim Umsteigen durch die britische Grenzkontrolle gehst. Wenn du unsicher bist, frag deine Airline."] },
      { heading: "Zeigen, dass du wieder ausreist", paragraphs: ["Die ETA ersetzt nicht die üblichen Regeln für Besucher: Du kannst gefragt werden, wie lange du bleibst und wie du ausreist. Eine gebuchte Ausreise innerhalb von sechs Monaten beantwortet das.", PRUEFEN] },
    ],
    faqs: [
      { q: "Was kostet die britische ETA?", a: "20 £ beim offiziellen GOV.UK-Dienst. Meide Seiten, die mehr verlangen." },
      { q: "Brauchen Kinder eine ETA für Großbritannien?", a: "Ja. Jeder Reisende braucht eine eigene, auch Babys und Kinder." },
    ],
    sources: [{ label: "GOV.UK: elektronische Reisegenehmigung (ETA) beantragen (auf Englisch)", url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta" }],
    checked: CHECKED,
  },
  {
    key: "canada-eta",
    slug: "eta-kanada-elektronische-reisegenehmigung",
    title: "eTA für Kanada: Kosten, wer sie braucht und Rückflugticket",
    h1: "Kanadas eTA (Electronic Travel Authorization)",
    description: "Visumfreie Reisende, die nach Kanada fliegen oder dort umsteigen, brauchen eine eTA. Die Gebühr von 7 kanadischen Dollar, wer sie braucht und was Grenzbeamte verlangen können.",
    intro: "Visumfreie Ausländer, die nach Kanada fliegen oder über einen kanadischen Flughafen reisen, brauchen eine Electronic Travel Authorization. Sie kostet 7 kanadische Dollar auf der offiziellen Seite der kanadischen Regierung.",
    sections: [
      { heading: "Wer sie braucht", paragraphs: ["Reisende aus visumfreien Ländern, die per Flug ankommen oder an einem kanadischen Flughafen umsteigen. Bei Einreise über Land oder See ist sie nicht nötig. Kanadische Doppelstaatler brauchen einen kanadischen Pass.", "Einige sonst visumpflichtige Nationalitäten können unter Bedingungen eine eTA nutzen, etwa Mexikaner, die in den letzten zehn Jahren ein kanadisches Visum hatten oder ein gültiges US-Nichteinwanderungsvisum besitzen und einfliegen."] },
      { heading: "Rückflugticket und Geldmittel", paragraphs: ["Das britische Außenministerium warnt, dass kanadische Grenzbeamte ein Rück- oder Weiterreiseticket und einen Nachweis ausreichender Mittel verlangen können, auch wenn du bei Freunden oder Familie wohnst.", PRUEFEN] },
    ],
    faqs: [
      { q: "Was kostet die kanadische eTA?", a: "7 kanadische Dollar auf der offiziellen Seite der kanadischen Regierung." },
      { q: "Brauche ich eine eTA, wenn ich aus den USA mit dem Auto einreise?", a: "Nein. Die eTA gilt für Flugreisen. Bei Einreise über Land oder See braucht man sie nicht, die Visabestimmungen gelten aber weiterhin." },
    ],
    sources: [
      { label: "Regierung von Kanada: Electronic Travel Authorization (eTA) (auf Englisch)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html" },
      fcdo("canada", "Kanada"),
    ],
    checked: CHECKED,
  },
  {
    key: "thailand-digital-arrival-card",
    slug: "digitale-einreisekarte-thailand-tdac",
    title: "Digitale Einreisekarte Thailand (TDAC) und visumfreie Einreise",
    h1: "Thailands digitale Einreisekarte (TDAC) und die Einreisekontrolle",
    description: "Alle Ausländer müssen vor der Ankunft in Thailand die TDAC online ausfüllen. Wann, wie lange die visumfreie Einreise gilt und welche Geldmittel und Weiterreise die Einwanderungsbehörde verlangen kann.",
    intro: "Alle Ausländer, die per Flug, über Land oder auf dem Seeweg nach Thailand kommen, müssen vor der Ankunft online die Thailand Digital Arrival Card (TDAC) ausfüllen. Sie ist einer von drei Stolpersteinen, neben dem Geldnachweis und dem Weiterreiseticket.",
    sections: [
      { heading: "Wann ausfüllen", paragraphs: ["Füll die TDAC in den drei Tagen vor deiner Ankunft online aus. Nutz nur die offizielle Seite der thailändischen Regierung."] },
      { heading: "Die visumfreie Einreise", paragraphs: ["Für britische Besucher erlaubt die visumfreie Einreise laut britischem Außenministerium jetzt bis zu 30 Tage, nur für Tourismus. Thailands Regeln haben sich mehrfach geändert und hängen vom Pass ab.", PASS] },
      { heading: "Geldmittel und Weiterreise", paragraphs: ["Die Einwanderungsbehörde kann einen Nachweis über mindestens 10.000 Baht pro Person oder 20.000 pro Familie sowie über die Weiter- oder Rückreise verlangen. Airlines prüfen das Weiterreiseticket am Schalter.", TIMING, PRUEFEN] },
    ],
    faqs: [
      { q: "Ist die TDAC kostenlos?", a: "Ja, auf der offiziellen Seite. Füll sie in den drei Tagen vor der Ankunft aus." },
      { q: "Wie viel Geld brauche ich für die Einreise nach Thailand?", a: "Die Einwanderungsbehörde kann mindestens 10.000 Baht pro Person oder 20.000 pro Familie verlangen, so das britische Außenministerium." },
    ],
    sources: [fcdo("thailand", "Thailand")],
    checked: CHECKED,
  },
  {
    key: "malaysia-digital-arrival-card",
    slug: "digitale-einreisekarte-malaysia-mdac",
    title: "Digitale Einreisekarte Malaysia (MDAC): Wann du sie brauchst",
    h1: "Malaysias digitale Einreisekarte (MDAC)",
    description: "Wer nach Malaysia einreist, füllt vor der Reise eine digitale Einreisekarte aus, und Airlines können sie beim Check-in verlangen. Wer sie braucht und was du sonst bereithalten solltest.",
    intro: "Besucher füllen vor der Reise online die Malaysia Digital Arrival Card aus, und Airlines können sie beim Check-in verlangen. Wer nur umsteigt, ohne durch die Einwanderungskontrolle zu gehen, braucht sie nicht.",
    sections: [
      { heading: "Die Regeln", paragraphs: ["Britische Besucher brauchen für Tourismus kein Visum und erhalten bei Ankunft normalerweise 90 Tage. Der Pass muss ab Ankunft noch sechs Monate gültig und unbeschädigt sein, ohne fehlende Seiten.", PASS] },
      { heading: "One-Way-Einreise", paragraphs: ["Die britischen Hinweise nennen für Malaysia keine Weiterreiseticket-Pflicht, aber Airlines können One-Way-Passagiere fragen, wie sie ausreisen. Kurze Flüge nach Singapur, Bangkok oder Bali sind übliche Ausreisen.", TIMING, PRUEFEN] },
    ],
    faqs: [{ q: "Brauche ich die MDAC, wenn ich nur in KLIA umsteige?", a: "Nicht, wenn du nicht durch die Einwanderungskontrolle gehst, so das britische Außenministerium." }],
    sources: [fcdo("malaysia", "Malaysia")],
    checked: CHECKED,
  },
  {
    key: "singapore-arrival-card",
    slug: "sg-arrival-card-singapur",
    title: "SG Arrival Card: Wann du sie vor dem Flug nach Singapur ausfüllst",
    h1: "Singapurs SG Arrival Card",
    description: "Besucher müssen die elektronische SG Arrival Card in den drei Tagen vor der Ankunft in Singapur ausfüllen. Was sie enthält und wie lange du bleiben darfst.",
    intro: "Besucher müssen die elektronische SG Arrival Card mit Gesundheitserklärung in den drei Tagen vor der Ankunft in Singapur ausfüllen. Falsche Angaben sind strafbar.",
    sections: [
      { heading: "Wie lange du bleiben darfst", paragraphs: ["Britische Staatsbürger können Singapur für Tourismus oder Geschäftsreisen ohne Visum besuchen. Der Einwanderungsbeamte legt die Dauer fest, meist zwischen 30 und 90 Tagen. Der Pass muss ab Ankunft noch sechs Monate gültig sein.", PASS] },
      { heading: "Weiterreise", paragraphs: ["Airlines nach Singapur können One-Way-Passagiere trotzdem nach einer Weiterreisebuchung fragen. Kuala Lumpur, Bangkok, Bali und Jakarta sind übliche kurze Ausreisen.", PRUEFEN] },
    ],
    faqs: [{ q: "Wann muss ich die SG Arrival Card ausfüllen?", a: "In den drei Tagen vor deiner Ankunft in Singapur." }],
    sources: [fcdo("singapore", "Singapur")],
    checked: CHECKED,
  },
  {
    key: "philippines-etravel",
    slug: "etravel-philippinen-registrierung",
    title: "eTravel-Registrierung Philippinen und Weiterreiseticket",
    h1: "eTravel auf den Philippinen: Registrierung, QR-Code und Weiterreiseticket",
    description: "Alle Ankommenden auf den Philippinen brauchen einen eTravel-QR-Code. Wann du dich registrierst, der visumfreie Aufenthalt und das Weiterreiseticket, das erwartet wird.",
    intro: "Wer auf den Philippinen ankommt, muss sich in den drei Tagen vor der Ankunft im kostenlosen eTravel-System registrieren und den QR-Code vorzeigen. Von den meisten Besuchern wird außerdem ein Nachweis über Rück- oder Weiterreise erwartet.",
    sections: [
      { heading: "eTravel", paragraphs: ["Die Registrierung ist kostenlos und muss in den drei Tagen vor der Ankunft erfolgen. Speicher den QR-Code auf dem Handy und mach einen Screenshot."] },
      { heading: "Aufenthaltsdauer und Weiterreise", paragraphs: ["Britische Besucher können bis zu 30 Tage ohne Visum bleiben und vor Ort eine Verlängerung beantragen. Laut britischem Außenministerium wird von den meisten ein Nachweis über Rück- oder Weiterreise erwartet, den Einwanderungsbehörde und Airlines verlangen können.", PASS, TIMING, PRUEFEN] },
    ],
    faqs: [{ q: "Ist eTravel kostenlos?", a: "Ja. Registrier dich in den drei Tagen vor der Ankunft und meide kostenpflichtige Seiten." }],
    sources: [fcdo("philippines", "Philippinen")],
    checked: CHECKED,
  },
  {
    key: "indonesia-e-voa-bali-levy",
    slug: "visum-bei-ankunft-indonesien-bali-abgabe",
    title: "Visum bei Ankunft in Indonesien, e-VOA und Bali-Touristenabgabe",
    h1: "Indonesiens Visum bei Ankunft, das e-VOA und die Bali-Touristenabgabe",
    description: "Was du für die Landung auf Bali oder in Jakarta brauchst: das 30-Tage-Visum bei Ankunft und seine Weiterreiseticket-Regel, die Online-Zollerklärung und die Bali-Abgabe.",
    intro: "Die meisten Besucher Indonesiens nutzen ein 30-tägiges Visum bei Ankunft, vorab online (e-VOA) oder am Flughafen. Dafür brauchst du einen Nachweis über die Weiter- oder Rückreise.",
    sections: [
      { heading: "Das Visum bei Ankunft", paragraphs: ["Für britische Besucher kostet das Visum bei Ankunft 500.000 Rupiah, bar oder mit Karte, gilt für eine Einreise und 30 Tage. Wenn du das e-VOA online beantragst, mach das mindestens eine Woche vor der Abreise. Prüf, ob dein Pass für das Visum bei Ankunft berechtigt ist.", "Ein Nachweis über die Weiter- oder Rückreise ist Voraussetzung für das Visum, deshalb prüfen Airlines nach Indonesien ihn am Schalter."] },
      { heading: "Vor der Landung", paragraphs: ["Füll die kostenlose Online-Zoll- und Gesundheitserklärung innerhalb von 72 Stunden vor der Ankunft aus. Bali erhebt außerdem von ausländischen Touristen eine Abgabe von 150.000 Rupiah, online oder bei Ankunft zu zahlen.", TIMING, PRUEFEN] },
    ],
    faqs: [
      { q: "Brauche ich für Bali ein Weiterreiseticket?", a: "Ja, ein Nachweis über die Weiter- oder Rückreise ist für das Visum bei Ankunft Pflicht." },
      { q: "Wie hoch ist die Bali-Touristenabgabe?", a: "150.000 Rupiah, online oder bei Ankunft zu zahlen." },
    ],
    sources: [fcdo("indonesia", "Indonesien")],
    checked: CHECKED,
  },
  {
    key: "schengen-airport-transit-visa",
    slug: "flughafentransitvisum-schengen",
    title: "Schengen-Flughafentransitvisum: Wer es zum Umsteigen braucht",
    h1: "Brauchst du zum Umsteigen in Europa ein Flughafentransitvisum?",
    description: "Staatsangehörige von 12 Ländern brauchen zum Umsteigen an einem Schengen-Flughafen ein Flughafentransitvisum. Die Liste, die üblichen Ausnahmen und was du vor der Buchung prüfen solltest.",
    intro: "Wer an einem Schengen-Flughafen umsteigt, ohne den internationalen Bereich zu verlassen, braucht normalerweise kein Visum. Ausnahme sind Staatsangehörige einer kurzen gemeinsamen EU-Liste, die ein Flughafentransitvisum brauchen, außer sie besitzen bestimmte Visa oder Aufenthaltstitel.",
    sections: [
      { heading: "Die gemeinsame Liste", paragraphs: ["Die EU-weite Liste umfasst Staatsangehörige von Afghanistan, Bangladesch, der Demokratischen Republik Kongo, Eritrea, Äthiopien, Ghana, Iran, Irak, Nigeria, Pakistan, Somalia und Sri Lanka. Einzelne Schengen-Staaten können für ihre Flughäfen weitere Nationalitäten hinzufügen, prüf also das Land, in dem du umsteigst."] },
      { heading: "Übliche Ausnahmen", paragraphs: ["Befreit sind in der Regel Inhaber eines gültigen Schengen-Visums oder Aufenthaltstitels oder eines gültigen Aufenthaltstitels aus Ländern wie den USA, Kanada, Japan, Andorra, Monaco, San Marino oder der Schweiz, der die Rückkehr dorthin erlaubt. Flugpersonal ist ebenfalls befreit.", "Brauchst du ein Transitvisum, verlangt der Antrag meist die Daten des Anschlussflugs, halte also die vollständige Reiseroute bereit.", PRUEFEN] },
    ],
    faqs: [{ q: "Brauchen Nigerianer ein Transitvisum für Frankfurt oder München?", a: "Nigeria steht auf der gemeinsamen EU-Liste, also ja, sofern keine Ausnahme greift, etwa ein gültiges Schengen-Visum oder ein US- oder kanadischer Aufenthaltstitel." }],
    sources: [{ label: "Lettisches Amt für Staatsbürgerschaft und Migration: Flughafentransitvisa (gemeinsame EU-Liste) (auf Englisch)", url: "https://www.pmlp.gov.lv/en/airport-transit" }],
    checked: CHECKED,
  },
  {
    key: "uk-transit-visa",
    slug: "transitvisum-grossbritannien",
    title: "Transitvisum Großbritannien: Direct Airside oder Visitor in Transit",
    h1: "Brauchst du ein Transitvisum für Großbritannien?",
    description: "Wann du ein Direct Airside Transit Visa oder ein Visitor in Transit Visa zum Umsteigen in Großbritannien brauchst und wann eine ETA oder ein anderes Visum genügt.",
    intro: "Ob du ein britisches Transitvisum brauchst, hängt von deiner Staatsangehörigkeit ab und davon, ob dein Umstieg durch die britische Grenzkontrolle führt. Nutz den GOV.UK-Check für deinen Pass; so passen die Optionen zusammen.",
    sections: [
      { heading: "Die zwei Transitvisa", paragraphs: ["Das Direct Airside Transit Visa ist zum Umsteigen ohne britische Grenzkontrolle. Das Visitor in Transit Visa ist für den Gang durch die Grenzkontrolle mit Ausreise innerhalb von 48 Stunden. Längere Aufenthalte oder häufige Transits über mehr als sechs Monate erfordern ein Standard Visitor Visa."] },
      { heading: "Wann du keins brauchst", paragraphs: ["Kein Transitvisum brauchst du mit britischer ETA, Standard Visitor Visa, Marriage Visitor Visa, Familienerlaubnis des EU Settlement Scheme oder einem Reisedokument des Home Office. Deine Airline kann dir sagen, ob dein Umstieg durch die Grenzkontrolle führt.", "So oder so: Halte die Daten deines Anschlussflugs bereit, denn beim Transit geht es per Definition ums Weiterreisen.", PRUEFEN] },
    ],
    faqs: [{ q: "Brauchen Kolumbianer ein Transitvisum für Großbritannien?", a: "Seit dem 26. November 2024 brauchen kolumbianische Staatsangehörige für den Transit durch Großbritannien ein Direct Airside Transit Visa, sofern keine Ausnahme greift." }],
    sources: [
      { label: "GOV.UK: Transitvisa (auf Englisch)", url: "https://www.gov.uk/transit-visa" },
      { label: "GOV.UK: Begründung zu HC 334 (Kolumbien) (auf Englisch)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024/explanatory-memorandum-to-the-statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024-accessible" },
    ],
    checked: CHECKED,
  },
  {
    key: "esta-cost-and-return-ticket",
    slug: "esta-kosten-rueckflugticket",
    title: "ESTA-Kosten 2026 (40 $) und die Rückflugticket-Pflicht",
    h1: "ESTA: die Gebühr von 40 $ und die Rückflugticket-Pflicht",
    description: "Die ESTA-Gebühr stieg am 30. September 2025 auf 40 $. Was ESTA abdeckt und warum Reisende im Visa Waiver Program ein Rück- oder Weiterreiseticket brauchen.",
    intro: "Die Gebühr für ESTA, die Online-Genehmigung für Reisende im Visa Waiver Program in die USA (darunter Deutsche, Österreicher und Schweizer), stieg am 30. September 2025 von 21 $ auf 40 $. Bezahl nur auf der offiziellen CBP-Seite.",
    sections: [
      { heading: "Die Rückflugticket-Regel", paragraphs: ["Reisende ohne Visum müssen bei Flügen in die USA ein Rück- oder Weiterreiseticket haben, und Airlines prüfen es vor dem Boarding. Zeit in Kanada, Mexiko und auf den nahen Inseln zählt in der Regel zu den 90 Tagen, ein Abstecher über die Grenze setzt deinen Aufenthalt also nicht zurück.", TIMING, PRUEFEN] },
    ],
    faqs: [{ q: "Was kostet ESTA?", a: "40 $ seit dem 30. September 2025, auf der offiziellen CBP-Seite." }],
    sources: [
      { label: "Fragomen: DHS führt neue Gebühren für ESTA, EVUS und Land-I-94 ein (auf Englisch)", url: "https://www.fragomen.com/insights/united-states-dhs-announces-implementation-of-new-fees-for-esta-evus-and-land-border-i-94-forms-starting-september-30.html" },
      { label: "Offizielle ESTA-Antragsseite (CBP)", url: "https://esta.cbp.dhs.gov/" },
    ],
    checked: CHECKED,
  },
];
