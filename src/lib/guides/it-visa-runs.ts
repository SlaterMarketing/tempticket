/**
 * Italian visa run guides. Same facts and official sources as en-visa-runs.ts
 * (checked 2026-11-01), translated. The stay lengths come from the UK Foreign
 * Office for British passports, so pages say so and tell readers with other
 * passports to check their own rules. Keys match the English pages.
 */

import { TEMPI, VERIFICA } from "./it";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nome: string): GuideSource => ({
  label: `Ministero degli Esteri britannico: requisiti di ingresso (${nome}) (in inglese)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

type Run = {
  id: string;
  slug: string;
  paese: string;
  /** "in Thailandia", "nell'area Schengen"... */
  in: string;
  soggiorno: string;
  azzera: string;
  regole: string[];
  mete: string;
  rientro: string;
  alternativa?: string;
  faq: GuideFaq;
  fonti: GuideSource[];
  generale?: boolean;
};

const CAUTELA =
  "Ogni ingresso lo decide l'agente di frontiera. Le uscite a raffica con poche ore fuori dal paese sono quelle che portano a domande o respingimenti: resta fuori per un periodo vero, porta prove di fondi e alloggio e sii sincero sui tuoi piani.";

const PASSAPORTO =
  "I termini di questa pagina sono quelli indicati dal Ministero degli Esteri britannico per i passaporti britannici. Con un passaporto italiano, svizzero o di un altro paese possono essere diversi: verificali sul sito ufficiale dell'immigrazione del paese, presso la sua ambasciata o su Viaggiare Sicuri della Farnesina prima di pianificare l'uscita.";

const RUNS: Run[] = [
  {
    id: "thailand", slug: "visa-run-thailandia", paese: "Thailandia", in: "in Thailandia",
    soggiorno: "30 giorni senza visto", azzera: "Nuovo ingresso, a discrezione dell'agente",
    regole: [
      "Per i visitatori britannici, l'ingresso in esenzione dal visto in Thailandia consente ora fino a 30 giorni, solo per turismo. L'immigrazione può chiedere prova di fondi (10.000 baht a persona, 20.000 a famiglia) e di un viaggio di uscita o ritorno, e tutti devono compilare la carta di arrivo digitale TDAC nei tre giorni prima dell'arrivo.",
    ],
    mete: "Kuala Lumpur o Penang in aereo, Vientiane dal Ponte dell'Amicizia, Phnom Penh o Siem Reap",
    rientro: "Rientrare in Thailandia in aereo conta come un nuovo arrivo, quindi la compagnia vorrà vedere un volo di uscita entro i tuoi nuovi 30 giorni. Prenotalo prima di partire.",
    alternativa: "Se resti per mesi, il Destination Thailand Visa (DTV) consente 180 giorni per ingresso per cinque anni ed evita le uscite.",
    faq: { q: "Quanti visa run posso fare in Thailandia?", a: "Non c'è un numero fisso, ma l'agente può negare l'ingresso in esenzione se sembra che tu viva in Thailandia. Per soggiorni lunghi, il DTV o un altro visto è la strada più sicura." },
    fonti: [fcdo("thailand", "Thailandia"), { label: "Ambasciata reale thailandese a Londra: Destination Thailand Visa (in inglese)", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" }],
  },
  {
    id: "vietnam", slug: "visa-run-vietnam", paese: "Vietnam", in: "in Vietnam",
    soggiorno: "45 giorni senza visto, o e-visa da 90 giorni", azzera: "Nuovo ingresso; l'e-visa è a ingressi multipli",
    regole: [
      "I visitatori britannici possono entrare in Vietnam senza visto fino a 45 giorni, oppure ottenere un e-visa da 90 giorni a ingressi multipli. L'e-visa vale solo nei punti di ingresso e uscita scelti nella domanda.",
    ],
    mete: "Phnom Penh o Siem Reap, Vientiane o Luang Prabang, Bangkok, Kuala Lumpur",
    rientro: "Rientrando in aereo, la compagnia può controllare che uscirai entro il nuovo soggiorno. Se attraversi via terra con l'e-visa, verifica che quel valico sia nella domanda.",
    alternativa: "Un e-visa da 90 giorni a ingressi multipli spesso rende inutile l'uscita.",
    faq: { q: "Serve un visa run con l'e-visa del Vietnam?", a: "Non entro i suoi 90 giorni, perché è a ingressi multipli. Devi solo uscire e rientrare dai punti indicati." },
    fonti: [fcdo("vietnam", "Vietnam")],
  },
  {
    id: "malaysia", slug: "visa-run-malesia", paese: "Malesia", in: "in Malesia",
    soggiorno: "Di solito 90 giorni all'arrivo", azzera: "Nuovo ingresso, a discrezione dell'agente",
    regole: [
      "Ai visitatori britannici di solito vengono concessi 90 giorni all'arrivo senza visto. Compila la Malaysia Digital Arrival Card prima di partire; la compagnia può chiederla al check-in.",
    ],
    mete: "Singapore (in autobus sulla diga o con un volo breve), Bangkok, Bali, Medan",
    rientro: "L'uscita via terra verso Singapore è la più comune. Se rientri in aereo, tieni pronto un volo di uscita entro i successivi 90 giorni.",
    alternativa: "Chi lavora da remoto e resta più a lungo può chiedere il DE Rantau, valido da 3 a 12 mesi e rinnovabile fino a 24.",
    faq: { q: "Un viaggio a Singapore azzera il mio soggiorno in Malesia?", a: "Rientrare in Malesia è un nuovo ingresso e l'agente decide la durata. Uscite brevi e frequenti possono suscitare domande." },
    fonti: [fcdo("malaysia", "Malesia"), { label: "MDEC: FAQ del DE Rantau Pass (in inglese)", url: "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf" }],
  },
  {
    id: "bali-indonesia", slug: "visa-run-bali-indonesia", paese: "Indonesia (Bali)", in: "a Bali (Indonesia)",
    soggiorno: "Visto all'arrivo di 30 giorni", azzera: "Nuovo visto a ogni ingresso",
    regole: [
      "Per i visitatori britannici, il visto all'arrivo dura 30 giorni, costa 500.000 rupie ed è a ingresso singolo. La prova di un viaggio di uscita o ritorno è una condizione per ottenerlo, e Bali applica a parte una tassa turistica di 150.000 rupie.",
    ],
    mete: "Singapore, Kuala Lumpur, Perth, Darwin",
    rientro: "Ogni nuovo ingresso richiede un nuovo visto all'arrivo e quindi una prova di uscita. Le compagnie la controllano al banco prima del volo di ritorno a Bali.",
    alternativa: "Chi lavora da remoto e resta fino a un anno può valutare il visto per lavoratori da remoto E33G.",
    faq: { q: "Serve un biglietto di uscita dopo un visa run a Bali?", a: "Sì. Ogni nuovo visto all'arrivo richiede la prova di un viaggio di uscita o ritorno." },
    fonti: [fcdo("indonesia", "Indonesia")],
  },
  {
    id: "philippines", slug: "visa-run-filippine", paese: "Filippine", in: "nelle Filippine",
    soggiorno: "30 giorni senza visto", azzera: "Meglio prorogare sul posto",
    regole: [
      "I visitatori britannici possono restare fino a 30 giorni senza visto e chiedere una proroga sul posto. Dalla maggior parte ci si aspetta una prova di viaggio di ritorno o uscita, e tutti devono registrarsi su eTravel.",
    ],
    mete: "Hong Kong, Taipei, Kota Kinabalu, Singapore",
    rientro: "Visto che nelle Filippine si può prorogare, spesso l'uscita non serve. Se esci e rientri, il controllo del biglietto di uscita si applica di nuovo.",
    faq: { q: "Devo lasciare le Filippine dopo 30 giorni?", a: "Non per forza. Puoi chiedere una proroga sul posto." },
    fonti: [fcdo("philippines", "Filippine")],
  },
  {
    id: "mexico", slug: "visa-run-messico", paese: "Messico", in: "in Messico",
    soggiorno: "Fino a 180 giorni, secondo il timbro", azzera: "Nuovo timbro; durata a discrezione dell'agente",
    regole: [
      "I turisti britannici non hanno bisogno del visto. Sul passaporto viene timbrato il numero di giorni consentiti, fino a 180. Al controllo possono chiederti un biglietto di ritorno o uscita e denaro sufficiente per il soggiorno. Chi arriva via terra compila un modulo migratorio online.",
    ],
    mete: "Belize City, Città del Guatemala, L'Avana, o una città degli Stati Uniti se puoi entrarci",
    rientro: "L'agente messicano decide quanti giorni darti, e una prenotazione di ritorno o uscita per la durata richiesta aiuta a ottenerli.",
    faq: { q: "Posso ottenere 180 giorni in Messico?", a: "È possibile, ma il timbro indica ciò che concede l'agente. Un biglietto di ritorno o uscita e una prova di fondi sostengono la richiesta." },
    fonti: [fcdo("mexico", "Messico")],
  },
  {
    id: "costa-rica", slug: "visa-run-costa-rica", paese: "Costa Rica", in: "in Costa Rica",
    soggiorno: "Fino a 180 giorni senza visto", azzera: "Nuovo ingresso",
    regole: [
      "I visitatori britannici possono restare fino a 180 giorni con l'esenzione dal visto turistico della Costa Rica. Partendo in aereo può essere applicata una tassa di uscita di 29 $.",
    ],
    mete: "Panama (Paso Canoas o un volo per Panama City), Nicaragua, San Andrés",
    rientro: "L'uscita classica è verso Panama via terra, ma Panama può chiedere un biglietto di ritorno o uscita e 1.000 $ di fondi, soprattutto ai non residenti che arrivano via terra dalla Costa Rica. Al rientro, anche la Costa Rica si aspetta una prova di uscita.",
    faq: { q: "Il visa run verso Panama dalla Costa Rica è facile?", a: "È comune, ma Panama può chiedere un biglietto di ritorno o uscita e la prova di 1.000 $ o una carta di credito, soprattutto a chi arriva via terra dalla Costa Rica." },
    fonti: [fcdo("costa-rica", "Costa Rica"), fcdo("panama", "Panama")],
  },
  {
    id: "panama", slug: "visa-run-panama", paese: "Panama", in: "a Panama",
    soggiorno: "Fino a 3 mesi", azzera: "Nuovo ingresso",
    regole: [
      "I visitatori britannici possono restare fino a tre mesi senza visto, arrivando via terra o in aereo. Alla frontiera possono chiedere un biglietto di ritorno o uscita e la prova di almeno 1.000 $ o una carta di credito. Il passaporto deve avere sei mesi di validità dopo la partenza e una pagina libera.",
    ],
    mete: "San José, Bogotá, Medellín, Cartagena",
    rientro: "Tieni pronta una prenotazione di uscita per rientrare, soprattutto se torni via terra dalla Costa Rica.",
    faq: { q: "Quanti soldi servono per entrare a Panama?", a: "Alla frontiera possono chiederti almeno 1.000 $ o una carta di credito." },
    fonti: [fcdo("panama", "Panama")],
  },
  {
    id: "colombia", slug: "visa-run-colombia", paese: "Colombia", in: "in Colombia", generale: true,
    soggiorno: "90 giorni (max 180 in 12 mesi)", azzera: "No: tetto di 180 giorni l'anno",
    regole: [
      "I visitatori britannici possono restare fino a 90 giorni, a discrezione dell'agente, ma non più di 180 giorni in qualsiasi periodo di 12 mesi. Devi poter mostrare un biglietto di uscita o ritorno entro quei 90 giorni. Il modulo Check-MIG è facoltativo ma velocizza i controlli.",
    ],
    mete: "Panama City, Quito, Lima, Aruba",
    rientro: "Uscire non aggira il tetto annuale di 180 giorni. Al suo interno, ogni ingresso richiede un biglietto di uscita entro 90 giorni.",
    faq: { q: "Posso restare di più in Colombia uscendo e rientrando?", a: "Solo fino a 180 giorni in qualsiasi periodo di 12 mesi come visitatore. Oltre serve un altro visto." },
    fonti: [fcdo("colombia", "Colombia")],
  },
  {
    id: "peru", slug: "visa-run-peru", paese: "Perù", in: "in Perù", generale: true,
    soggiorno: "90 su 180 giorni (max 183 l'anno)", azzera: "No: c'è un tetto",
    regole: [
      "I visitatori britannici ricevono di norma fino a 90 giorni in un periodo di 180, contati dal primo ingresso, e il massimo concedibile è 183 giorni su 365. Restare oltre comporta una multa e un possibile fermo.",
    ],
    mete: "La Paz, Santiago, Arica, Quito, Bogotá",
    rientro: "Rientrare non azzera il conteggio dei 90 su 180. La compagnia può comunque chiedere una prova di uscita su un volo di sola andata.",
    faq: { q: "Uscire dal Perù azzera i miei giorni?", a: "No. I limiti di 90 su 180 e 183 su 365 contano tutto il tuo tempo in Perù." },
    fonti: [fcdo("peru", "Perù")],
  },
  {
    id: "schengen", slug: "visa-run-schengen", paese: "Area Schengen", in: "nell'area Schengen", generale: true,
    soggiorno: "90 giorni in qualsiasi periodo di 180", azzera: "No: finestra mobile di 180 giorni",
    regole: [
      "I visitatori per soggiorni brevi possono trascorrere 90 giorni in qualsiasi periodo di 180 sommando tutti i paesi Schengen. Uscire per un fine settimana non azzera nulla: il conteggio guarda 180 giorni indietro da ogni giorno di presenza.",
      "Dal 12 ottobre 2025 il sistema di ingressi/uscite (EES) registra ingressi e uscite elettronicamente al posto dei timbri, ed è pienamente operativo dal 10 aprile 2026: il conteggio è automatico.",
      "Questo limite non riguarda i cittadini dell'UE, del SEE e della Svizzera, che godono della libera circolazione.",
    ],
    mete: "Paesi fuori Schengen come Regno Unito, Irlanda, Albania, Montenegro, Serbia, Turchia, Georgia o Marocco",
    rientro: "Un «visa run» Schengen è in realtà una pausa: passa quel tempo fuori e rientra quando hai di nuovo giorni disponibili. Le guardie di frontiera possono chiederti come ripartirai.",
    faq: { q: "Posso fare un visa run per azzerare i miei 90 giorni Schengen?", a: "No. I 90 giorni si contano su una finestra mobile di 180, e il tempo fuori aiuta solo perché i giorni vecchi escono dal conteggio." },
    fonti: [
      { label: "SEAE: cosa fare e non fare con il visto Schengen (regola 90/180) (in inglese)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
      { label: "Commissione europea: l'EES è operativo dal 12 ottobre 2025 (in inglese)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
    ],
  },
  {
    id: "albania", slug: "visa-run-albania", paese: "Albania", in: "in Albania",
    soggiorno: "90 giorni su 180", azzera: "Conteggio 90/180 separato",
    regole: [
      "I visitatori britannici possono restare in Albania fino a 90 giorni in un periodo di 180, con un conteggio separato da quello Schengen, ed è per questo una meta popolare per la pausa Schengen.",
    ],
    mete: "Montenegro, Macedonia del Nord, Kosovo, il traghetto per l'Italia o la Grecia",
    rientro: "Traghetti e autobus permettono di arrivare e partire senza volare. Se arrivi in aereo con solo andata, pianifica l'uscita entro 90 giorni.",
    faq: { q: "L'Albania va bene per la pausa Schengen?", a: "Sì. Il suo limite di 90 su 180 è separato da quello Schengen." },
    fonti: [fcdo("albania", "Albania")],
  },
  {
    id: "turkey", slug: "visa-run-turchia", paese: "Turchia", in: "in Turchia",
    soggiorno: "90 giorni su 180", azzera: "Conteggio 90/180 separato",
    regole: [
      "I visitatori britannici possono restare in Turchia fino a 90 giorni in qualsiasi periodo di 180, separatamente da Schengen. Il passaporto deve essere valido 150 giorni dall'arrivo e avere una pagina libera.",
    ],
    mete: "Tbilisi, Atene, Sofia, Larnaca",
    rientro: "I collegamenti di Istanbul rendono facile prenotare un volo di uscita verso qualsiasi destinazione.",
    faq: { q: "La Turchia conta per i giorni Schengen?", a: "No. Ha un proprio limite di 90 giorni su 180." },
    fonti: [fcdo("turkey", "Turchia")],
  },
  {
    id: "georgia", slug: "visa-run-georgia", paese: "Georgia", in: "in Georgia",
    soggiorno: "Fino a 1 anno", azzera: "Raramente necessario",
    regole: [
      "I visitatori britannici possono restare in Georgia fino a un anno senza visto. Tutti i visitatori devono avere un'assicurazione sanitaria e infortuni, o fondi per coprire cure e rimpatrio.",
    ],
    mete: "Erevan, Istanbul, Baku",
    rientro: "Con un anno senza visto, le uscite servono raramente. Se arrivi con solo andata, la compagnia può comunque chiederti come ripartirai.",
    faq: { q: "Serve un visa run in Georgia?", a: "Di solito no: i visitatori britannici possono restare fino a un anno." },
    fonti: [fcdo("georgia", "Georgia")],
  },
  {
    id: "south-korea", slug: "visa-run-corea-del-sud", paese: "Corea del Sud", in: "in Corea del Sud",
    soggiorno: "90 giorni", azzera: "Nuovo ingresso, a discrezione dell'agente",
    regole: [
      "I visitatori britannici possono restare fino a 90 giorni e devono avere un biglietto di uscita o ritorno. Sono esenti dalla K-ETA fino al 31 dicembre 2026 e devono presentare una carta di arrivo.",
    ],
    mete: "Fukuoka (anche in traghetto da Busan), Osaka, Tokyo, Taipei",
    rientro: "Ogni ingresso richiede un biglietto di uscita o ritorno: prenota l'uscita prima di rientrare.",
    faq: { q: "Posso fare un visa run dalla Corea al Giappone?", a: "In molti lo fanno, ma ogni rientro in Corea è un nuovo ingresso a discrezione dell'agente e richiede un biglietto di uscita o ritorno." },
    fonti: [fcdo("south-korea", "Corea del Sud")],
  },
  {
    id: "central-america-ca4", slug: "visa-run-america-centrale-ca4", paese: "America centrale (CA-4)", in: "in America centrale (CA-4)", generale: true,
    soggiorno: "90 giorni condivisi tra 4 paesi", azzera: "Solo uscendo dall'area CA-4",
    regole: [
      "Guatemala, El Salvador, Honduras e Nicaragua formano l'area CA-4. Per i visitatori britannici, i 90 giorni coprono insieme Guatemala, El Salvador e Nicaragua e non ripartono alle loro frontiere. Il Nicaragua avverte che l'ingresso può essere negato senza biglietto di uscita.",
    ],
    mete: "Messico, Belize o Costa Rica",
    rientro: "Passare da un paese CA-4 all'altro non è un visa run. Esci dall'area e, al rientro, porta un biglietto di uscita dalla regione.",
    faq: { q: "Passare dal Guatemala a El Salvador azzera i miei giorni?", a: "No. I paesi CA-4 condividono un unico periodo di 90 giorni." },
    fonti: [fcdo("guatemala", "Guatemala"), fcdo("el-salvador", "El Salvador"), fcdo("nicaragua", "Nicaragua")],
  },
];

function build(r: Run): Guide {
  return {
    key: `visa-run-${r.id}`,
    slug: r.slug,
    title: `Visa Run ${r.in}: Regole, Mete e Biglietto di Uscita`,
    h1: `Visa run ${r.in}: cosa permettono le regole`,
    description: `Quanto puoi restare ${r.in}, se uscire e rientrare azzera qualcosa, le mete più comuni e il biglietto di uscita che ti servirà al rientro.`,
    intro: `Un visa run significa lasciare un paese e rientrare per iniziare un nuovo soggiorno. Se funziona ${r.in} dipende da come vengono contati i limiti. Ecco cosa dicono le fonti ufficiali.`,
    sections: [
      { heading: "Le regole", paragraphs: [...r.regole, ...(r.alternativa ? [r.alternativa] : []), ...(r.generale ? [] : [PASSAPORTO])] },
      { heading: "Dove vanno i viaggiatori", paragraphs: [`Le mete più comuni sono ${r.mete}.`, CAUTELA] },
      { heading: "Al rientro: il biglietto di uscita", paragraphs: [r.rientro, TEMPI, VERIFICA] },
    ],
    faqs: [r.faq],
    sources: r.fonti,
    checked: CHECKED,
  };
}

export const IT_VISA_RUN_GUIDES: Guide[] = [
  {
    key: "visa-runs-explained",
    slug: "visa-run-spiegati",
    title: "Visa Run Spiegati: Quali Paesi Azzerano il Soggiorno e Quali No",
    h1: "Visa run e border run: quali paesi azzerano il tuo soggiorno",
    description:
      "Dove un visa run apre un nuovo soggiorno e dove i limiti mobili come 90 su 180 lo rendono inutile, con il biglietto di uscita che serve a ogni rientro.",
    intro:
      "Alcuni paesi contano ogni ingresso separatamente, quindi uscire e rientrare apre un nuovo soggiorno a discrezione dell'agente. Altri usano tetti mobili o annuali, e lì uscire non serve a niente. Questa tabella fa chiarezza con i dati ufficiali del governo britannico per i passaporti britannici; con un altro passaporto i termini possono cambiare.",
    table: {
      caption: "Visa run per paese",
      headers: ["Paese", "Soggiorno senza visto", "Uscire azzera?"],
      rows: RUNS.map((r) => [r.paese, r.soggiorno, r.azzera]),
      rowLinks: RUNS.map((r) => r.slug),
      note: "Per i passaporti britannici, secondo GOV.UK e fonti UE. L'agente decide ogni ingresso.",
    },
    sections: [
      {
        heading: "La regola che vale ovunque",
        paragraphs: [
          "Ogni rientro è un nuovo arrivo, e senza volo di uscita la compagnia ti tratta come passeggero di sola andata. Prenota la tratta di uscita prima di rientrare.",
          CAUTELA,
          TEMPI,
          VERIFICA,
        ],
      },
    ],
    faqs: [
      { q: "I visa run sono legali?", a: "Uscire e rientrare è legale dove le regole contano ogni ingresso separatamente, ma l'agente può negare l'ingresso se pensa che tu viva o lavori nel paese come turista." },
    ],
    sources: RUNS.flatMap((r) => r.fonti.slice(0, 1)),
    checked: CHECKED,
  },
  ...RUNS.map(build),
];
