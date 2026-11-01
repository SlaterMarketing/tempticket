/**
 * German digital nomad visa guides. Same facts and official sources as
 * en-nomad.ts (checked 2026-11-01), translated. Keys match the English pages
 * so hreflang links them. EU programmes carry a note that EU, EEA and Swiss
 * citizens don't need them, since most German-speaking readers have free movement.
 */

import { PRUEFEN, TIMING } from "./de";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Nomade = {
  id: string;
  slug: string;
  land: string;
  /** "in Thailand", "auf Malta"... */
  in: string;
  programm: string;
  einkommen: string;
  dauer: string;
  fakten: string[];
  ankunft: string;
  faq: GuideFaq;
  quellen: GuideSource[];
  eu?: boolean;
};

const ALS_BESUCHER =
  "Reist du als Besucher ein, bevor dein Aufenthaltstitel erteilt ist, bist du am Check-in ein ganz normaler Tourist: Die Airline kann von One-Way-Passagieren einen Nachweis der Weiterreise innerhalb der erlaubten Aufenthaltsdauer verlangen. Eine temporäre Flugreservierung schließt diese Lücke, ohne dass du einen Flug kaufst, den du nicht nimmst.";

const EU_HINWEIS =
  "Wichtig für Leser aus Deutschland, Österreich und der Schweiz: Als Bürger der EU, des EWR oder der Schweiz brauchst du dieses Visum nicht, denn du kannst dich dank Freizügigkeit ohnehin dort aufhalten und arbeiten. Das Programm richtet sich an Staatsangehörige von Drittstaaten.";

const englisch = (label: string, url: string): GuideSource => ({ label: `${label} (auf Englisch)`, url });

const NOMADEN: Nomade[] = [
  {
    id: "thailand", slug: "digital-nomad-visum-thailand", land: "Thailand", in: "in Thailand",
    programm: "Destination Thailand Visa (DTV)",
    einkommen: "Guthaben von 500.000 Baht (ca. 12.000 £)", dauer: "5 Jahre, 180 Tage pro Einreise",
    fakten: [
      "Das DTV gilt fünf Jahre für mehrere Einreisen und erlaubt 180 Tage pro Einreise, einmal vor Ort um bis zu 180 Tage verlängerbar. Danach reist du aus und mit demselben Visum wieder ein.",
      "Es gilt für Remote-Arbeitende, digitale Nomaden und Freelancer (Kategorie „Workcation“), für thailändische „Soft Power“-Aktivitäten wie Muay Thai oder Kochkurse und für Angehörige. Bei der thailändischen Botschaft in London kostet es 300 £, und du musst mindestens 500.000 Baht nachweisen; die Gebühr hängt von der Botschaft ab, bei der du beantragst.",
    ],
    ankunft: "Mit dem DTV im Pass kannst du mit One-Way-Ticket einreisen, weil das Visum selbst lange Aufenthalte erlaubt. Ohne DTV ist die visumfreie Einreise deutlich kürzer und Airlines prüfen das Weiterreiseticket. " + ALS_BESUCHER,
    faq: { q: "Darf ich mit dem DTV für thailändische Kunden arbeiten?", a: "Die Workcation-Kategorie ist für Remote-Arbeit für Arbeitgeber oder Kunden im Ausland. Für thailändische Firmen brauchst du eine Arbeitserlaubnis." },
    quellen: [englisch("Königlich Thailändische Botschaft London: Destination Thailand Visa", "https://london.thaiembassy.org/en/page/destination-thailand-visa")],
  },
  {
    id: "japan", slug: "digital-nomad-visum-japan", land: "Japan", in: "in Japan",
    programm: "Digitaler Nomade (Designated Activities)",
    einkommen: "10 Mio. Yen pro Jahr", dauer: "6 Monate, keine Verlängerung",
    fakten: [
      "Japans Nomadenvisum verlangt ein Jahreseinkommen von mindestens 10 Millionen Yen, belegt durch Steuer-, Einkommens- oder Beschäftigungsnachweise, und eine Versicherung für Tod, Verletzung und Krankheit mit mindestens 10 Millionen Yen medizinischer Deckung.",
      "Der Aufenthalt dauert sechs Monate und kann weder verlängert noch erneuert werden. Ehepartner und Kinder können mitkommen, mit eigener Versicherung.",
    ],
    ankunft: "Das Visum wird vor der Reise erteilt, du kannst also damit fliegen. Sechs Monate sind die harte Grenze, plane deinen Abflug also innerhalb dieser Zeit.",
    faq: { q: "Kann man Japans Nomadenvisum verlängern?", a: "Nein. Es gilt sechs Monate ohne Verlängerung, so das japanische Außenministerium." },
    quellen: [englisch("Außenministerium Japan: Designated Activities (Digital Nomad)", "https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html")],
  },
  {
    id: "spain", slug: "digital-nomad-visum-spanien", land: "Spanien", in: "in Spanien", eu: true,
    programm: "Visum für internationale Telearbeit",
    einkommen: "200 % des spanischen Mindestlohns", dauer: "Bis 1 Jahr, dann Aufenthaltskarte",
    fakten: [
      "Du brauchst mindestens 200 % des spanischen monatlichen Mindestlohns, plus 75 % für das erste Familienmitglied und 25 % für jedes weitere. Die Arbeit muss remote für ein Unternehmen außerhalb Spaniens sein; Selbstständige dürfen bis zu 20 % ihrer Tätigkeit für spanische Kunden arbeiten.",
      "Verlangt werden ein Abschluss oder drei Jahre Berufserfahrung, mindestens drei Monate beim ausländischen Unternehmen, eine Krankenversicherung und ein sauberes Führungszeugnis. Das Visum gilt bis zu einem Jahr, danach kannst du in Spanien eine Aufenthaltskarte beantragen.",
    ],
    ankunft: "Mit erteiltem Visum kannst du mit One-Way-Ticket einreisen. Spanien gehört zum Schengen-Raum: Vorher bist du Kurzzeitbesucher mit 90 Tagen in 180.",
    faq: { q: "Wie viel Einkommen brauche ich für Spaniens Nomadenvisum?", a: "Mindestens 200 % des spanischen Mindestlohns, mehr mit Familie. Prüf den aktuellen Mindestlohn, denn er ändert sich." },
    quellen: [englisch("Generalkonsulat Spaniens in London: Digital Nomad Visa", "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx")],
  },
  {
    id: "portugal", slug: "digital-nomad-visum-portugal", land: "Portugal", in: "in Portugal", eu: true,
    programm: "Visum für vorübergehenden Aufenthalt zur Remote-Arbeit",
    einkommen: "4-facher portugiesischer Mindestlohn", dauer: "Vorübergehender Aufenthalt (auch Aufenthaltsvisum möglich)",
    fakten: [
      "Du musst ein durchschnittliches Monatseinkommen der letzten drei Monate von mindestens dem Vierfachen des portugiesischen Mindestlohns nachweisen, dazu eine Reiseversicherung für medizinische Versorgung und Rücktransport.",
      "Portugal bietet außerdem ein Aufenthaltsvisum für Remote-Arbeit für alle, die länger bleiben wollen.",
    ],
    ankunft: "Die Checkliste für das Visum zum vorübergehenden Aufenthalt verlangt eine Kopie des Rückflugtickets. Damit ist Portugal eines der wenigen Nomadenvisa, bei denen die Rückreisebuchung Teil des Antrags ist. Bürger der CPLP-Staaten sind von Versicherung und Rückflugticket befreit.",
    faq: { q: "Brauche ich für Portugals Nomadenvisum ein Rückflugticket?", a: "Für das Visum zum vorübergehenden Aufenthalt ja: Die Checkliste verlangt eine Kopie des Rückflugtickets, außer für CPLP-Bürger." },
    quellen: [englisch("Botschaft Portugals in Tokio: Checkliste Visum für Remote-Arbeit", "https://toquio.embaixadaportugal.mne.gov.pt/images/vistos/checklists/en/estada_temporaria/temporary_stay_visa_for_remote_work_-_digital_nomads.pdf")],
  },
  {
    id: "croatia", slug: "digital-nomad-visum-kroatien", land: "Kroatien", in: "in Kroatien", eu: true,
    programm: "Vorübergehender Aufenthalt für digitale Nomaden",
    einkommen: "3.622,50 € pro Monat (oder Pauschalbetrag)", dauer: "Bis 18 Monate",
    fakten: [
      "Du brauchst mindestens das 2,5-fache des kroatischen durchschnittlichen Nettomonatslohns, derzeit 3.622,50 € pro Monat, plus 10 % pro Familienmitglied. Alternativ kannst du Ersparnisse von 43.470 € für 12 Monate oder 65.205 € für 18 Monate nachweisen.",
      "Der Aufenthalt dauert bis zu 18 Monate. Du musst für einen ausländischen Arbeitgeber oder deine eigene nicht-kroatische Firma arbeiten, krankenversichert sein und deine Adresse innerhalb von drei Tagen nach Ankunft melden.",
    ],
    ankunft: "Visumfreie Staatsangehörige können online beantragen und als Besucher einreisen; wer ein Visum braucht, beantragt bei einer kroatischen Botschaft oder einem Konsulat. " + ALS_BESUCHER,
    faq: { q: "Kann man die kroatische Nomadengenehmigung verlängern?", a: "Ja, um bis zu sechs Monate, wenn du mindestens 60 Tage vor Ablauf beantragst. Ein neuer Antrag ist sechs Monate nach dem Ende möglich." },
    quellen: [englisch("Kroatisches Innenministerium: vorübergehender Aufenthalt digitaler Nomaden", "https://mup.gov.hr/aliens-281621/temporary-stay-of-digital-nomads-286853/286853")],
  },
  {
    id: "malta", slug: "digital-nomad-visum-malta", land: "Malta", in: "auf Malta", eu: true,
    programm: "Nomad Residence Permit",
    einkommen: "42.000 € pro Jahr (brutto)", dauer: "1 Jahr, verlängerbar",
    fakten: [
      "Das Mindesteinkommen liegt bei 42.000 € brutto pro Jahr für Anträge seit dem 1. April 2024. Du musst remote für einen ausländischen Arbeitgeber, deine eigene ausländische Firma oder als Freelancer für ausländische Kunden arbeiten.",
      "Außerdem brauchst du eine Krankenversicherung für die EU und Großbritannien, einen Miet- oder Kaufvertrag auf Malta, ein Führungszeugnis und eine Hintergrundprüfung.",
    ],
    ankunft: ALS_BESUCHER,
    faq: { q: "Welches Einkommen braucht man für Maltas Nomad Residence Permit?", a: "42.000 € brutto pro Jahr für Anträge seit dem 1. April 2024, laut Residency Malta." },
    quellen: [englisch("Residency Malta Agency: Voraussetzungen Nomad Residence Permit", "https://nomad.residencymalta.gov.mt/nomad-eligibility/")],
  },
  {
    id: "italy", slug: "digital-nomad-visum-italien", land: "Italien", in: "in Italien", eu: true,
    programm: "Visum für digitale Nomaden und Remote-Arbeitende",
    einkommen: "Über 24.780 € pro Jahr", dauer: "Nationales Visum für längere Aufenthalte",
    fakten: [
      "Dein Einkommen im Vorjahr muss über der Grenze für die Befreiung von Gesundheitsgebühren liegen, die die italienische Botschaft in Ottawa mit 24.780 € angibt. Du brauchst einen Abschluss, drei Jahre einschlägige Erfahrung oder eine Qualifikation plus fünf Jahre Erfahrung sowie eine Krankenversicherung für den gesamten Aufenthalt.",
      "Die Bearbeitung kann bei digitalen Nomaden bis zu 120 Tage und bei Remote-Arbeitenden 90 Tage dauern.",
    ],
    ankunft: "Die Botschaft weist darauf hin, dass Aufenthalte über 90 Tage ein nationales Visum mit One-Way-Ticket nutzen, Aufenthalte bis 90 Tage dagegen ein Schengen-Visum mit Hin- und Rückflug.",
    faq: { q: "Kann ich mit dem Nomadenvisum one-way nach Italien fliegen?", a: "Ja. Beim nationalen Visum spricht die Botschaft von einem One-Way-Ticket; kurze Schengen-Aufenthalte brauchen Hin- und Rückflug." },
    quellen: [englisch("Italienische Botschaft Ottawa: Visum für digitale Nomaden", "https://ambottawa.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/digital-nomad-remote-worker-visa/")],
  },
  {
    id: "hungary", slug: "digital-nomad-visum-ungarn", land: "Ungarn", in: "in Ungarn", eu: true,
    programm: "White Card",
    einkommen: "3.000 € netto pro Monat", dauer: "1 Jahr, einmal verlängerbar",
    fakten: [
      "Du brauchst mindestens 3.000 € netto pro Monat in den sechs Monaten vor der Einreise, auch während des Aufenthalts, von einem Arbeitgeber oder einer Firma im Ausland. Arbeit für ungarische Kunden oder Beteiligungen an ungarischen Firmen sind nicht erlaubt.",
      "Die Genehmigung gilt bis zu einem Jahr und kann einmal um ein Jahr verlängert werden, wenn du mindestens 90 der vorherigen 180 Tage in Ungarn warst.",
    ],
    ankunft: "Der Antrag verlangt eine Unterkunft, eine Krankenversicherung und ein gültiges Reisedokument oder Weiterreiseticket, halte also eine Buchung bereit. " + ALS_BESUCHER,
    faq: { q: "Wie lange gilt Ungarns White Card?", a: "Bis zu einem Jahr, einmal um ein weiteres Jahr verlängerbar." },
    quellen: [englisch("Ungarische Generaldirektion für Fremdenpolizei: White Card", "https://oif.gov.hu/factsheets/white-card-residency-for-digital-nomads")],
  },
  {
    id: "estonia", slug: "digital-nomad-visum-estland", land: "Estland", in: "in Estland", eu: true,
    programm: "Digital Nomad Visa",
    einkommen: "4.500 € netto pro Monat", dauer: "Bis 1 Jahr",
    fakten: [
      "Du brauchst ein Nettoeinkommen von mindestens 4.500 € pro Monat von einem Arbeitgeber oder einer Firma außerhalb Estlands oder überwiegend von ausländischen Freelance-Kunden und musst ortsunabhängig arbeiten können.",
      "Beantragt wird bei der nächsten estnischen Botschaft; die Bearbeitung dauert bis zu 30 Tage.",
    ],
    ankunft: "Das Visum wird vor der Reise erteilt. Bist du visumfrei und reist vorher als Besucher, gilt bis zur Erteilung die Schengen-Regel von 90 Tagen in 180.",
    faq: { q: "Ist Estlands Nomadenvisum dasselbe wie e-Residency?", a: "Nein. e-Residency ist eine digitale Identität zum Führen einer estnischen Firma und berechtigt nicht zum Wohnen in Estland. Das Nomadenvisum schon, bis zu einem Jahr." },
    quellen: [englisch("e-Residency (Republik Estland): Digital Nomad Visa vs. e-Residency", "https://www.e-resident.gov.ee/nomadvisa/")],
  },
  {
    id: "montenegro", slug: "digital-nomad-visum-montenegro", land: "Montenegro", in: "in Montenegro",
    programm: "Befristeter Aufenthalt für digitale Nomaden",
    einkommen: "Finanzmittel (kein fester Mindestbetrag veröffentlicht)", dauer: "Bis 2 Jahre, einmal verlängerbar",
    fakten: [
      "Die Genehmigung gilt bis zu zwei Jahre und kann einmal um bis zu zwei weitere verlängert werden. Du brauchst Nachweise über Finanzmittel, Unterkunft, Krankenversicherung, ein sauberes Führungszeugnis und einen Vertrag, der zeigt, dass du elektronisch für eine ausländische oder deine eigene nicht-montenegrinische Firma arbeitest.",
      "Der Antrag wird persönlich beim Innenministerium deines Wohnorts gestellt; die Genehmigung kommt innerhalb von 40 Tagen.",
    ],
    ankunft: "Du musst legal nach Montenegro eingereist sein, was für die meisten Nomaden heißt: zuerst als Besucher. " + ALS_BESUCHER,
    faq: { q: "Beantragt man Montenegros Nomadengenehmigung aus dem Ausland?", a: "Nein: Der Antrag wird persönlich beim Innenministerium in Montenegro gestellt, nach legaler Einreise." },
    quellen: [englisch("Regierung von Montenegro: Rechtsstatus digitaler Nomaden", "https://digitalnomads.gov.me/article/legal-status-for-nomads")],
  },
  {
    id: "south-korea", slug: "digital-nomad-visum-suedkorea", land: "Südkorea", in: "in Südkorea",
    programm: "Workation-Visum (F-1-D)",
    einkommen: "2× Koreas BNE pro Kopf (ca. 65.800 $)", dauer: "1 Jahr, um 1 Jahr verlängerbar",
    fakten: [
      "Du brauchst ein Einkommen nach Steuern von mehr als dem Doppelten des koreanischen Bruttonationaleinkommens pro Kopf des Vorjahres, nach aktuellem Stand etwa 65.800 $ pro Jahr, mindestens ein Jahr Beschäftigung bei deiner Firma und eine Krankenversicherung über 70.000 € für den gesamten Aufenthalt.",
      "Das Visum gilt ein Jahr für mehrere Einreisen und kann bei einer Einwanderungsbehörde in Korea um bis zu ein Jahr verlängert werden.",
    ],
    ankunft: "Das F-1-D erteilt eine koreanische Botschaft oder ein Konsulat vor der Reise. Ohne es brauchen visumfreie Besucher laut britischem Außenministerium ein Weiter- oder Rückreiseticket.",
    faq: { q: "Wie viel muss ich für Koreas Workation-Visum verdienen?", a: "Mehr als das Doppelte des koreanischen BNE pro Kopf des Vorjahres, nach Steuern: aktuell etwa 65.800 $ pro Jahr." },
    quellen: [englisch("Generalkonsulat Korea in Seattle: Workation-Visum F-1-D", "https://overseas.mofa.go.kr/us-seattle-en/brd/m_23042/view.do?seq=41")],
  },
  {
    id: "malaysia", slug: "digital-nomad-visum-malaysia", land: "Malaysia", in: "in Malaysia",
    programm: "DE Rantau Nomad Pass",
    einkommen: "24.000 $ pro Jahr (Tech) oder 60.000 $ (Nicht-Tech)", dauer: "3 bis 12 Monate, verlängerbar auf 24",
    fakten: [
      "Tech-Fachkräfte brauchen mindestens 24.000 $ pro Jahr, andere Berufe 60.000 $. Der Pass gilt 3 bis 12 Monate und kann um 12 Monate verlängert werden, insgesamt bis zu 24 Monate.",
      "Die Gebühren betragen 1.080 Ringgit pro Antragsteller und 540 pro Angehörigen, plus Gebühren für den Einwanderungspass und, falls MDEC dich sponsert, eine rückzahlbare Kaution. Dein Pass muss bei Antragstellung noch mehr als 14 Monate gültig sein.",
    ],
    ankunft: "Viele Antragsteller reisen zuerst als Besucher ein. " + ALS_BESUCHER,
    faq: { q: "Wer kann Malaysias DE Rantau Pass beantragen?", a: "Alle Nationalitäten außer israelischen Staatsbürgern, ab 18 Jahren, wenn die Einkommensgrenze für den Bereich erreicht wird." },
    quellen: [englisch("MDEC: FAQ zum DE Rantau Pass (Version 10)", "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf")],
  },
  {
    id: "indonesia", slug: "digital-nomad-visum-indonesien-bali", land: "Indonesien", in: "in Indonesien",
    programm: "Remote-Worker-Visum (E33G)",
    einkommen: "60.000 $ pro Jahr", dauer: "Bis 1 Jahr",
    fakten: [
      "Du brauchst ein Einkommen von mindestens 60.000 $ pro Jahr, ein Kontoguthaben von mindestens 2.000 $ in den letzten drei Monaten und einen Arbeitsvertrag mit einer Firma außerhalb Indonesiens. Verkauf von Waren oder Dienstleistungen und Arbeit für indonesische Kunden sind nicht erlaubt.",
      "Das Visum erlaubt bis zu einem Jahr Aufenthalt und muss innerhalb von 90 Tagen nach Ausstellung zur Einreise genutzt werden. Die offizielle Gebühr ist mit 7.000.000 Rupiah für ein Jahr angegeben.",
    ],
    ankunft: "Mit dem Remote-Worker-Visum reist du ohne die Weiterreiseticket-Prüfung ein, die beim 30-tägigen Visum bei Ankunft gilt.",
    faq: { q: "Kann ich mit dem Remote-Worker-Visum auf Bali leben?", a: "Ja, bis zu einem Jahr, solange du für eine Firma außerhalb Indonesiens arbeitest und keine Dienstleistungen vor Ort verkaufst." },
    quellen: [englisch("Indonesische Einwanderungsbehörde: FAQ zum offiziellen eVisa", "https://evisa.imigrasi.go.id/front/faq/e076131c-0d39-469b-afaf-75fc66aff923")],
  },
  {
    id: "costa-rica", slug: "digital-nomad-visum-costa-rica", land: "Costa Rica", in: "in Costa Rica",
    programm: "Aufenthalt für digitale Nomaden (Estancia)",
    einkommen: "3.000 $ pro Monat (4.000 $ mit Familie)", dauer: "Siehe offizielle Website",
    fakten: [
      "Du brauchst ein Einkommen von mindestens 3.000 $ pro Monat aus Quellen außerhalb Costa Ricas, oder 4.000 $ pro Monat mit Familie, umgerechnet zum offiziellen Kurs der Zentralbank.",
      "Die staatliche Gebühr beträgt 100 $, die vollständig beim Finanzministerium ankommen müssen; die Empfängerbank berechnet zusätzlich 15 $.",
    ],
    ankunft: "Die meisten Nomaden reisen während der Bearbeitung als Touristen ein, und Costa Rica ist bekannt dafür, dass Airlines das Weiterreiseticket prüfen. " + ALS_BESUCHER,
    faq: { q: "Welches Einkommen braucht man für Costa Ricas Nomadenvisum?", a: "3.000 $ pro Monat für eine Person oder 4.000 $ mit Familie, aus Quellen außerhalb Costa Ricas." },
    quellen: [englisch("Visit Costa Rica (ICT): Voraussetzungen für digitale Nomaden", "https://www.visitcostarica.com/digital-nomads/requirements")],
  },
  {
    id: "panama", slug: "digital-nomad-visum-panama", land: "Panama", in: "in Panama",
    programm: "Kurzzeitvisum für Remote-Arbeitende",
    einkommen: "36.000 $ pro Jahr", dauer: "9 Monate, um 9 verlängerbar",
    fakten: [
      "Du brauchst ein ausländisches Einkommen von mindestens 36.000 $ pro Jahr (Angestellte in der Privatwirtschaft über 3.000 $ pro Monat) und eine internationale Krankenversicherung für den Aufenthalt. Die Gebühr beträgt 250 $.",
      "Das Visum wird für bis zu neun Monate erteilt und kann um weitere neun verlängert werden.",
    ],
    ankunft: ALS_BESUCHER,
    faq: { q: "Wie lange kann ich als Remote-Arbeitender in Panama bleiben?", a: "Neun Monate, einmal um neun Monate verlängerbar." },
    quellen: [{ label: "ProPanamá (Regierung von Panama): Visum für digitale Nomaden (auf Spanisch)", url: "https://propanama.gob.pa/visa-para-nomadas-digitales/" }],
  },
  {
    id: "barbados", slug: "digital-nomad-visum-barbados", land: "Barbados", in: "auf Barbados",
    programm: "Welcome Stamp",
    einkommen: "50.000 $ pro Jahr", dauer: "12 Monate, erneut beantragbar",
    fakten: [
      "Mit dem Welcome Stamp darfst du bis zu 12 Monate remote von Barbados aus arbeiten, wenn du mindestens 50.000 $ pro Jahr verdienst. Die Gebühr beträgt 2.000 $ für Einzelpersonen und 3.000 $ für Familien, zahlbar nach der Genehmigung.",
      "Remote-Einkommen wird auf Barbados nicht besteuert, auf lokale Ausgaben fallen aber 17,5 % Mehrwertsteuer an.",
    ],
    ankunft: "Barbados verlangt laut britischem Außenministerium von Besuchern ein Weiter- oder Rückreiseticket. Kommst du vor der Genehmigung deines Stamps an, brauchst du also diese Buchung.",
    faq: { q: "Wird der Barbados Welcome Stamp besteuert?", a: "Remote-Einkommen unterliegt auf Barbados nicht der Einkommensteuer, Einkäufe aber der Mehrwertsteuer." },
    quellen: [
      englisch("Visit Barbados: 12-monatiger Barbados Welcome Stamp", "https://www.visitbarbados.org/barbados-welcome-stamp"),
      englisch("Britisches Außenministerium: Einreisebestimmungen Barbados", "https://www.gov.uk/foreign-travel-advice/barbados/entry-requirements"),
    ],
  },
  {
    id: "mauritius", slug: "digital-nomad-visum-mauritius", land: "Mauritius", in: "auf Mauritius",
    programm: "Premium Visa",
    einkommen: "Siehe EDB Mauritius", dauer: "1 Jahr, verlängerbar",
    fakten: [
      "Mit dem Premium Visa kannst du ein Jahr auf Mauritius bleiben, verlängerbar, und es ist kostenlos. Anträge laufen über das Economic Development Board.",
    ],
    ankunft: "Besucher auf Mauritius müssen laut britischem Außenministerium eine Weiter- oder Rückreise nachweisen können. Halte also eine Buchung bereit, wenn du vor der Erteilung des Premium Visa ankommst.",
    faq: { q: "Was kostet das Premium Visa von Mauritius?", a: "Nichts: Laut Pass- und Einwanderungsbehörde ist es kostenlos." },
    quellen: [
      englisch("Pass- und Einwanderungsbehörde Mauritius: Premium Visa", "https://passport.govmu.org/passport/?page_id=595"),
      englisch("Britisches Außenministerium: Einreisebestimmungen Mauritius", "https://www.gov.uk/foreign-travel-advice/mauritius/entry-requirements"),
    ],
  },
];

function build(n: Nomade): Guide {
  return {
    key: `digital-nomad-visa-${n.id}`,
    slug: n.slug,
    title: `Digital-Nomad-Visum ${n.land}: Einkommen, Dauer und Einreise mit One-Way-Ticket`,
    h1: `Digital-Nomad-Visum ${n.land}: ${n.programm}`,
    description: `${n.programm}: Einkommensgrenze (${n.einkommen}), Dauer, Bedingungen und was du zeigen musst, wenn du one-way fliegst.`,
    intro: `Mit dem Programm ${n.programm} können Remote-Arbeitende legal ${n.in} leben. Hier sind die anhand offizieller Quellen geprüften Voraussetzungen und wie die Einreise für Nomaden funktioniert, die meist one-way reisen.`,
    sections: [
      { heading: "Die Voraussetzungen", paragraphs: n.eu ? [...n.fakten, EU_HINWEIS] : n.fakten },
      { heading: "Einreise mit One-Way-Ticket", paragraphs: [n.ankunft, TIMING, PRUEFEN] },
    ],
    faqs: [n.faq],
    sources: n.quellen,
    checked: CHECKED,
  };
}

export const DE_NOMAD_GUIDES: Guide[] = [
  {
    key: "digital-nomad-visas-compared",
    slug: "digital-nomad-visa-vergleich",
    title: "Digital-Nomad-Visa im Vergleich: Einkommen und Dauer nach Land",
    h1: "Digital-Nomad-Visa im Vergleich",
    description:
      "Einkommensgrenzen und Dauer von 17 Digital-Nomad-Visa, vom thailändischen DTV bis Spanien, Portugal, Japan und Costa Rica, geprüft anhand offizieller Quellen.",
    intro:
      "Digital-Nomad-Visa unterscheiden sich enorm: Manche verlangen ein paar Tausend Euro im Monat, andere 10 Millionen Yen im Jahr; manche gelten sechs Monate, andere fünf Jahre. Diese Tabelle vergleicht die wichtigsten, jede Zahl stammt von der Regierungs- oder Botschaftsseite, die im jeweiligen Länderguide verlinkt ist.",
    table: {
      caption: "Digital-Nomad-Visa: Einkommen und Dauer",
      headers: ["Land", "Programm", "Einkommen oder Guthaben", "Dauer"],
      rows: NOMADEN.map((n) => [n.land, n.programm, n.einkommen, n.dauer]),
      rowLinks: NOMADEN.map((n) => n.slug),
      note: "Die Grenzwerte ändern sich, oft jährlich. Prüf vor dem Antrag die offizielle Quelle im jeweiligen Länderguide.",
    },
    sections: [
      {
        heading: "Was keiner erwähnt: die Anreise",
        paragraphs: [
          "Die meisten Nomaden reisen one-way, und viele kommen als Besucher an, bevor ihr Aufenthaltstitel genehmigt ist, oder beantragen ihn vor Ort. Dann behandelt dich die Airline wie einen Touristen und kann einen Weiterreisenachweis verlangen. Portugals Visum für vorübergehenden Aufenthalt verlangt sogar ein Rückflugticket im Antrag.",
          "Als Bürger der EU, des EWR oder der Schweiz brauchst du für Spanien, Portugal, Kroatien, Malta, Italien, Ungarn und Estland kein Nomadenvisum: Dort gilt für dich die Freizügigkeit.",
          TIMING,
          PRUEFEN,
        ],
      },
    ],
    faqs: [
      { q: "Welches Nomadenvisum hat die niedrigste Einkommensgrenze?", a: "Unter diesen haben Malaysias DE Rantau für Tech (24.000 $ pro Jahr) und Italien (über 24.780 € pro Jahr) die niedrigsten Grenzen, jeweils mit weiteren Bedingungen. Thailands DTV verlangt Ersparnisse statt Einkommen." },
      { q: "Welches gilt am längsten?", a: "Thailands DTV gilt fünf Jahre, mit 180 Tagen pro Einreise." },
    ],
    sources: NOMADEN.flatMap((n) => n.quellen.slice(0, 1)),
    checked: CHECKED,
  },
  ...NOMADEN.map(build),
];
