/**
 * Italian digital nomad visa guides. Same facts and official sources as
 * en-nomad.ts (checked 2026-11-01), translated. Keys match the English pages
 * so hreflang links them. EU programmes carry a note that EU, EEA and Swiss
 * citizens don't need them.
 */

import { TEMPI, VERIFICA } from "./it";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Nomade = {
  id: string;
  slug: string;
  paese: string;
  /** "in Thailandia", "a Malta"... */
  in: string;
  /** "della Thailandia", "del Giappone"... */
  di: string;
  programma: string;
  reddito: string;
  durata: string;
  fatti: string[];
  arrivo: string;
  faq: GuideFaq;
  fonti: GuideSource[];
  ue?: boolean;
};

const DA_VISITATORE =
  "Se entri come visitatore prima che il permesso sia rilasciato, al check-in sei un turista come gli altri: la compagnia può chiedere a chi viaggia solo andata una prova di uscita entro la durata di soggiorno consentita. Una prenotazione temporanea copre questo vuoto senza comprare un volo che non userai.";

const NOTA_UE =
  "Da sapere per chi ha un passaporto italiano o di un altro paese UE: i cittadini dell'UE, del SEE e della Svizzera non hanno bisogno di questo visto, perché grazie alla libera circolazione possono già soggiornare e lavorare lì. Il programma è pensato per i cittadini di paesi terzi.";

const inglese = (label: string, url: string): GuideSource => ({ label: `${label} (in inglese)`, url });

const NOMADI: Nomade[] = [
  {
    id: "thailand", slug: "visto-nomade-digitale-thailandia", paese: "Thailandia", in: "in Thailandia", di: "della Thailandia",
    programma: "Destination Thailand Visa (DTV)",
    reddito: "Fondi per 500.000 baht (circa 12.000 £)", durata: "5 anni, 180 giorni per ingresso",
    fatti: [
      "Il DTV vale cinque anni con ingressi multipli e consente 180 giorni per ingresso, prorogabili una volta in Thailandia fino a 180 giorni. Poi esci e rientri con lo stesso visto.",
      "Copre lavoratori da remoto, nomadi digitali e freelance (la categoria «workcation»), attività di «soft power» thailandese come Muay Thai o corsi di cucina, e familiari a carico. All'ambasciata thailandese di Londra la tariffa è di 300 £ e servono almeno 500.000 baht di fondi; la tariffa varia in base all'ambasciata in cui presenti domanda.",
    ],
    arrivo: "Con il DTV sul passaporto puoi entrare con solo andata, perché il visto stesso consente soggiorni lunghi. Senza, l'ingresso in esenzione dal visto è molto più breve e le compagnie controllano il biglietto di uscita. " + DA_VISITATORE,
    faq: { q: "Posso lavorare per clienti thailandesi con il DTV?", a: "La categoria workcation riguarda il lavoro da remoto per datori di lavoro o clienti all'estero. Lavorare per aziende thailandesi richiede un permesso di lavoro." },
    fonti: [inglese("Ambasciata reale thailandese a Londra: Destination Thailand Visa", "https://london.thaiembassy.org/en/page/destination-thailand-visa")],
  },
  {
    id: "japan", slug: "visto-nomade-digitale-giappone", paese: "Giappone", in: "in Giappone", di: "del Giappone",
    programma: "Nomade digitale (Attività designate)",
    reddito: "10 milioni di yen l'anno", durata: "6 mesi, senza proroga",
    fatti: [
      "Il visto per nomadi digitali del Giappone richiede un reddito annuo di almeno 10 milioni di yen, documentato con certificati fiscali, di reddito o di impiego, e un'assicurazione per morte, infortuni e malattia con almeno 10 milioni di yen di copertura sanitaria.",
      "Il soggiorno è di sei mesi e non può essere prorogato né rinnovato. Coniuge e figli possono accompagnarti, con una propria assicurazione.",
    ],
    arrivo: "Il visto viene rilasciato prima della partenza, quindi puoi volare con esso. Sei mesi sono il limite massimo: pianifica il volo di uscita entro quel periodo.",
    faq: { q: "Si può prorogare il visto per nomadi digitali del Giappone?", a: "No. Sono sei mesi senza proroga, secondo il Ministero degli Esteri giapponese." },
    fonti: [inglese("Ministero degli Esteri del Giappone: Attività designate (Nomade digitale)", "https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html")],
  },
  {
    id: "spain", slug: "visto-nomade-digitale-spagna", paese: "Spagna", in: "in Spagna", di: "della Spagna", ue: true,
    programma: "Visto per telelavoro internazionale",
    reddito: "200% del salario minimo mensile spagnolo", durata: "Fino a 1 anno, poi carta di residenza",
    fatti: [
      "Servono almeno il 200% del salario minimo mensile spagnolo, più il 75% per il primo familiare e il 25% per ciascuno in più. Il lavoro deve essere da remoto per un'azienda fuori dalla Spagna; gli autonomi possono lavorare per clienti spagnoli fino al 20% della loro attività.",
      "Servono una laurea o tre anni di esperienza nel settore, almeno tre mesi di lavoro per l'azienda estera, un'assicurazione sanitaria e la fedina penale pulita. Il visto vale fino a un anno, dopodiché puoi chiedere la carta di residenza in Spagna.",
    ],
    arrivo: "Una volta rilasciato il visto puoi entrare con solo andata. La Spagna fa parte dell'area Schengen: prima di allora sei un visitatore di breve durata, con il limite di 90 giorni su 180.",
    faq: { q: "Quanto devo guadagnare per il visto nomadi digitali della Spagna?", a: "Almeno il 200% del salario minimo mensile spagnolo, di più con familiari. Controlla l'importo attuale del salario minimo, perché cambia." },
    fonti: [inglese("Consolato generale di Spagna a Londra: Digital Nomad Visa", "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx")],
  },
  {
    id: "portugal", slug: "visto-nomade-digitale-portogallo", paese: "Portogallo", in: "in Portogallo", di: "del Portogallo", ue: true,
    programma: "Visto di soggiorno temporaneo per lavoro da remoto",
    reddito: "4 volte il salario minimo mensile portoghese", durata: "Soggiorno temporaneo (disponibile anche il visto di residenza)",
    fatti: [
      "Bisogna dimostrare un reddito mensile medio negli ultimi tre mesi pari ad almeno quattro volte il salario minimo portoghese, più un'assicurazione di viaggio per cure mediche e rimpatrio.",
      "Il Portogallo offre anche un visto di residenza per lavoro da remoto per chi vuole stabilirsi più a lungo.",
    ],
    arrivo: "La lista dei documenti per il visto di soggiorno temporaneo chiede una copia del biglietto di ritorno: il Portogallo è uno dei pochi visti per nomadi in cui la prenotazione del ritorno fa parte della domanda. I cittadini dei paesi CPLP sono esentati da assicurazione e biglietto di ritorno.",
    faq: { q: "Serve il biglietto di ritorno per il visto nomadi digitali del Portogallo?", a: "Per il visto di soggiorno temporaneo sì: la lista chiede una copia del biglietto di ritorno, tranne per i cittadini CPLP." },
    fonti: [inglese("Ambasciata del Portogallo a Tokyo: lista documenti, visto di soggiorno temporaneo per lavoro da remoto", "https://toquio.embaixadaportugal.mne.gov.pt/images/vistos/checklists/en/estada_temporaria/temporary_stay_visa_for_remote_work_-_digital_nomads.pdf")],
  },
  {
    id: "croatia", slug: "visto-nomade-digitale-croazia", paese: "Croazia", in: "in Croazia", di: "della Croazia", ue: true,
    programma: "Soggiorno temporaneo per nomadi digitali",
    reddito: "3.622,50 € al mese (o una somma forfettaria)", durata: "Fino a 18 mesi",
    fatti: [
      "Servono almeno 2,5 volte lo stipendio netto medio mensile croato, attualmente 3.622,50 € al mese, più il 10% per ogni familiare. In alternativa puoi dimostrare risparmi di 43.470 € per 12 mesi o 65.205 € per 18 mesi.",
      "Il soggiorno dura fino a 18 mesi. Devi lavorare per un datore di lavoro estero o per la tua società non croata, avere un'assicurazione sanitaria e registrare l'indirizzo entro tre giorni dall'arrivo.",
    ],
    arrivo: "I cittadini esenti da visto possono fare domanda online ed entrare come visitatori; chi ha bisogno del visto lo chiede a un'ambasciata o un consolato croato. " + DA_VISITATORE,
    faq: { q: "Si può prorogare il permesso per nomadi digitali della Croazia?", a: "Sì, fino a sei mesi, se lo chiedi almeno 60 giorni prima della scadenza. Una nuova domanda è possibile sei mesi dopo la fine." },
    fonti: [inglese("Ministero dell'Interno croato: soggiorno temporaneo dei nomadi digitali", "https://mup.gov.hr/aliens-281621/temporary-stay-of-digital-nomads-286853/286853")],
  },
  {
    id: "malta", slug: "visto-nomade-digitale-malta", paese: "Malta", in: "a Malta", di: "di Malta", ue: true,
    programma: "Nomad Residence Permit",
    reddito: "42.000 € l'anno (lordi)", durata: "1 anno, rinnovabile",
    fatti: [
      "Il reddito lordo minimo è di 42.000 € l'anno per le domande presentate dal 1° aprile 2024. Devi lavorare da remoto per un datore di lavoro estero, la tua società estera o clienti esteri come freelance.",
      "Servono anche un'assicurazione sanitaria valida nell'UE e nel Regno Unito, un contratto di affitto o acquisto a Malta, un certificato penale e un controllo dei precedenti.",
    ],
    arrivo: DA_VISITATORE,
    faq: { q: "Che reddito serve per il Nomad Residence Permit di Malta?", a: "42.000 € lordi l'anno per le domande dal 1° aprile 2024, secondo Residency Malta." },
    fonti: [inglese("Residency Malta Agency: requisiti del Nomad Residence Permit", "https://nomad.residencymalta.gov.mt/nomad-eligibility/")],
  },
  {
    id: "italy", slug: "visto-nomade-digitale-italia", paese: "Italia", in: "in Italia", di: "dell'Italia", ue: true,
    programma: "Visto per nomadi digitali e lavoratori da remoto",
    reddito: "Oltre 24.780 € l'anno", durata: "Visto nazionale per soggiorni di lunga durata",
    fatti: [
      "Il reddito dell'anno precedente deve superare la soglia di esenzione dalla partecipazione alla spesa sanitaria, che l'ambasciata d'Italia a Ottawa indica in 24.780 €. Servono una laurea, tre anni di esperienza pertinente, oppure una qualifica più cinque anni di esperienza, e un'assicurazione sanitaria per tutto il soggiorno.",
      "L'esame della domanda può richiedere fino a 120 giorni per i nomadi digitali e 90 giorni per i lavoratori da remoto.",
    ],
    arrivo: "L'ambasciata precisa che i soggiorni oltre i 90 giorni usano un visto nazionale con biglietto di sola andata, mentre quelli fino a 90 giorni usano un visto Schengen con biglietto di andata e ritorno.",
    faq: { q: "Posso volare in Italia con solo andata con il visto per nomadi digitali?", a: "Sì. Per il visto nazionale di lunga durata l'ambasciata parla di biglietto di sola andata; i brevi soggiorni Schengen richiedono andata e ritorno." },
    fonti: [inglese("Ambasciata d'Italia a Ottawa: visto per nomadi digitali e lavoratori da remoto", "https://ambottawa.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/digital-nomad-remote-worker-visa/")],
  },
  {
    id: "hungary", slug: "visto-nomade-digitale-ungheria", paese: "Ungheria", in: "in Ungheria", di: "dell'Ungheria", ue: true,
    programma: "White Card",
    reddito: "3.000 € netti al mese", durata: "1 anno, prorogabile una volta",
    fatti: [
      "Servono almeno 3.000 € netti al mese nei sei mesi precedenti l'ingresso, mantenuti durante il soggiorno, da un datore di lavoro o un'azienda all'estero. Non puoi lavorare per clienti ungheresi né avere quote di società ungheresi.",
      "Il permesso dura fino a un anno e può essere prorogato una volta per un altro anno, se hai trascorso almeno 90 dei 180 giorni precedenti in Ungheria.",
    ],
    arrivo: "La domanda richiede un alloggio, un'assicurazione sanitaria e un documento di viaggio valido o un biglietto di uscita: tieni pronta una prenotazione. " + DA_VISITATORE,
    faq: { q: "Quanto dura la White Card ungherese?", a: "Fino a un anno, prorogabile una volta per un altro anno." },
    fonti: [inglese("Direzione generale ungherese della polizia degli stranieri: White Card", "https://oif.gov.hu/factsheets/white-card-residency-for-digital-nomads")],
  },
  {
    id: "estonia", slug: "visto-nomade-digitale-estonia", paese: "Estonia", in: "in Estonia", di: "dell'Estonia", ue: true,
    programma: "Digital Nomad Visa",
    reddito: "4.500 € netti al mese", durata: "Fino a 1 anno",
    fatti: [
      "Serve un reddito netto di almeno 4.500 € al mese da un datore di lavoro o un'azienda registrata fuori dall'Estonia, o principalmente da clienti esteri come freelance, e la possibilità di lavorare da qualsiasi luogo.",
      "La domanda si presenta all'ambasciata estone più vicina; l'esame richiede fino a 30 giorni.",
    ],
    arrivo: "Il visto viene rilasciato prima della partenza. Se sei esente da visto e arrivi prima come visitatore, vale la regola Schengen dei 90 giorni su 180 fino al rilascio.",
    faq: { q: "Il visto per nomadi digitali dell'Estonia è come la e-Residency?", a: "No. La e-Residency è un'identità digitale per gestire una società estone e non permette di vivere in Estonia. Il visto per nomadi sì, fino a un anno." },
    fonti: [inglese("e-Residency (Repubblica di Estonia): Digital Nomad Visa ed e-Residency", "https://www.e-resident.gov.ee/nomadvisa/")],
  },
  {
    id: "montenegro", slug: "visto-nomade-digitale-montenegro", paese: "Montenegro", in: "in Montenegro", di: "del Montenegro",
    programma: "Residenza temporanea per nomadi digitali",
    reddito: "Mezzi sufficienti (nessun minimo fisso pubblicato)", durata: "Fino a 2 anni, prorogabile una volta",
    fatti: [
      "Il permesso dura fino a due anni e può essere prorogato una volta per altri due al massimo. Servono prove di mezzi finanziari, alloggio, assicurazione sanitaria, fedina penale pulita e un contratto che dimostri che lavori per via elettronica per un'azienda estera o la tua società non montenegrina.",
      "La domanda si presenta di persona al Ministero dell'Interno del luogo in cui vivi; il permesso viene rilasciato entro 40 giorni.",
    ],
    arrivo: "Devi essere entrato legalmente in Montenegro, il che per la maggior parte dei nomadi significa arrivare prima come visitatore. " + DA_VISITATORE,
    faq: { q: "Il permesso per nomadi del Montenegro si chiede dall'estero?", a: "No: la domanda si presenta di persona al Ministero dell'Interno in Montenegro, dopo un ingresso legale." },
    fonti: [inglese("Governo del Montenegro: status legale dei nomadi digitali", "https://digitalnomads.gov.me/article/legal-status-for-nomads")],
  },
  {
    id: "south-korea", slug: "visto-nomade-digitale-corea-del-sud", paese: "Corea del Sud", in: "in Corea del Sud", di: "della Corea del Sud",
    programma: "Visto workation (F-1-D)",
    reddito: "2 volte il RNL pro capite coreano (circa 65.800 $)", durata: "1 anno, prorogabile di 1 anno",
    fatti: [
      "Serve un reddito al netto delle tasse superiore al doppio del reddito nazionale lordo pro capite della Corea dell'anno precedente, circa 65.800 $ l'anno secondo il parametro attuale, almeno un anno di impiego nella tua azienda e un'assicurazione sanitaria da 70.000 € per tutto il soggiorno.",
      "Il visto è a ingressi multipli per un anno e può essere prorogato fino a un anno presso un ufficio immigrazione in Corea.",
    ],
    arrivo: "L'F-1-D viene rilasciato da un'ambasciata o un consolato coreano prima della partenza. Senza, i visitatori esenti da visto devono avere un biglietto di uscita o di ritorno, secondo il Ministero degli Esteri britannico.",
    faq: { q: "Quanto devo guadagnare per il visto workation coreano?", a: "Più del doppio del RNL pro capite coreano dell'anno precedente, al netto delle tasse: circa 65.800 $ l'anno secondo il dato attuale." },
    fonti: [inglese("Consolato generale di Corea a Seattle: visto workation F-1-D", "https://overseas.mofa.go.kr/us-seattle-en/brd/m_23042/view.do?seq=41")],
  },
  {
    id: "malaysia", slug: "visto-nomade-digitale-malesia", paese: "Malesia", in: "in Malesia", di: "della Malesia",
    programma: "DE Rantau Nomad Pass",
    reddito: "24.000 $ l'anno (tech) o 60.000 $ (non tech)", durata: "Da 3 a 12 mesi, rinnovabile fino a 24",
    fatti: [
      "I professionisti tech devono guadagnare almeno 24.000 $ l'anno; gli altri 60.000 $. Il pass dura da 3 a 12 mesi e può essere rinnovato per altri 12, fino a 24 mesi in totale.",
      "Le tariffe sono 1.080 ringgit per richiedente e 540 per familiare a carico, più le tariffe del permesso di immigrazione e, se MDEC ti sponsorizza, una cauzione rimborsabile. Il passaporto deve avere più di 14 mesi di validità al momento della domanda.",
    ],
    arrivo: "Molti richiedenti arrivano prima come visitatori. " + DA_VISITATORE,
    faq: { q: "Chi può chiedere il DE Rantau della Malesia?", a: "Tutte le nazionalità tranne quella israeliana, dai 18 anni in su, se si raggiunge la soglia di reddito del proprio settore." },
    fonti: [inglese("MDEC: FAQ del DE Rantau Pass (versione 10)", "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf")],
  },
  {
    id: "indonesia", slug: "visto-nomade-digitale-indonesia-bali", paese: "Indonesia", in: "in Indonesia", di: "dell'Indonesia",
    programma: "Visto per lavoratori da remoto (E33G)",
    reddito: "60.000 $ l'anno", durata: "Fino a 1 anno",
    fatti: [
      "Serve un reddito di almeno 60.000 $ l'anno, un saldo bancario di almeno 2.000 $ negli ultimi tre mesi e un contratto di lavoro con un'azienda fuori dall'Indonesia. Non puoi vendere beni o servizi né lavorare per clienti indonesiani.",
      "Il visto consente un soggiorno fino a un anno e va usato per entrare entro 90 giorni dal rilascio. La tariffa ufficiale è indicata in 7.000.000 di rupie per un anno.",
    ],
    arrivo: "Con il visto per lavoratori da remoto entri senza il controllo del biglietto di uscita previsto per il visto all'arrivo di 30 giorni.",
    faq: { q: "Posso vivere a Bali con il visto per lavoratori da remoto?", a: "Sì, fino a un anno, purché lavori per un'azienda fuori dall'Indonesia e non venda servizi sul posto." },
    fonti: [inglese("Direzione generale dell'immigrazione indonesiana: FAQ dell'eVisa ufficiale", "https://evisa.imigrasi.go.id/front/faq/e076131c-0d39-469b-afaf-75fc66aff923")],
  },
  {
    id: "costa-rica", slug: "visto-nomade-digitale-costa-rica", paese: "Costa Rica", in: "in Costa Rica", di: "della Costa Rica",
    programma: "Soggiorno per nomadi digitali (Estancia)",
    reddito: "3.000 $ al mese (4.000 $ con famiglia)", durata: "Vedi sito ufficiale",
    fatti: [
      "Serve un reddito di almeno 3.000 $ al mese da fonti fuori dalla Costa Rica, o 4.000 $ al mese per includere la famiglia, convertito al cambio ufficiale della Banca centrale.",
      "La tariffa governativa è di 100 $, che devono arrivare per intero al Ministero delle Finanze; la banca ricevente trattiene altri 15 $.",
    ],
    arrivo: "La maggior parte dei nomadi arriva come turista durante l'esame della domanda, e la Costa Rica è nota per le compagnie che controllano il biglietto di uscita. " + DA_VISITATORE,
    faq: { q: "Che reddito serve per il visto nomadi digitali della Costa Rica?", a: "3.000 $ al mese per una persona, o 4.000 $ per includere la famiglia, da fonti fuori dalla Costa Rica." },
    fonti: [inglese("Visit Costa Rica (ICT): requisiti per nomadi digitali", "https://www.visitcostarica.com/digital-nomads/requirements")],
  },
  {
    id: "panama", slug: "visto-nomade-digitale-panama", paese: "Panama", in: "a Panama", di: "di Panama",
    programma: "Visto di breve durata per lavoratori da remoto",
    reddito: "36.000 $ l'anno", durata: "9 mesi, prorogabile di 9",
    fatti: [
      "Serve un reddito estero di almeno 36.000 $ l'anno (dipendenti del settore privato: oltre 3.000 $ al mese) e un'assicurazione sanitaria internazionale per il soggiorno. La tariffa è di 250 $.",
      "Il visto viene concesso per un massimo di nove mesi e può essere prorogato di altri nove.",
    ],
    arrivo: DA_VISITATORE,
    faq: { q: "Quanto posso restare a Panama come lavoratore da remoto?", a: "Nove mesi, prorogabili una volta di altri nove." },
    fonti: [{ label: "ProPanamá (Governo di Panama): visto per nomadi digitali (in spagnolo)", url: "https://propanama.gob.pa/visa-para-nomadas-digitales/" }],
  },
  {
    id: "barbados", slug: "visto-nomade-digitale-barbados", paese: "Barbados", in: "alle Barbados", di: "delle Barbados",
    programma: "Welcome Stamp",
    reddito: "50.000 $ l'anno", durata: "12 mesi, si può richiedere di nuovo",
    fatti: [
      "Il Welcome Stamp permette di lavorare da remoto dalle Barbados fino a 12 mesi se guadagni almeno 50.000 $ l'anno. Le tariffe sono 2.000 $ a persona e 3.000 $ a famiglia, da pagare dopo l'approvazione.",
      "Il reddito da remoto non è tassato alle Barbados, ma sulle spese locali si paga un'IVA del 17,5%.",
    ],
    arrivo: "Le Barbados chiedono ai visitatori un biglietto di uscita o di ritorno per entrare, secondo il Ministero degli Esteri britannico: se arrivi prima dell'approvazione del Welcome Stamp, ti serve quella prenotazione.",
    faq: { q: "Il Welcome Stamp delle Barbados è tassato?", a: "Il reddito da remoto non paga l'imposta sul reddito alle Barbados, ma gli acquisti pagano l'IVA." },
    fonti: [
      inglese("Visit Barbados: Barbados Welcome Stamp di 12 mesi", "https://www.visitbarbados.org/barbados-welcome-stamp"),
      inglese("Ministero degli Esteri britannico: requisiti di ingresso alle Barbados", "https://www.gov.uk/foreign-travel-advice/barbados/entry-requirements"),
    ],
  },
  {
    id: "mauritius", slug: "visto-nomade-digitale-mauritius", paese: "Mauritius", in: "a Mauritius", di: "di Mauritius",
    programma: "Premium Visa",
    reddito: "Vedi EDB Mauritius", durata: "1 anno, rinnovabile",
    fatti: [
      "Il Premium Visa permette di restare a Mauritius un anno, rinnovabile, ed è gratuito. Le domande passano per l'Economic Development Board.",
    ],
    arrivo: "I visitatori di Mauritius devono poter dimostrare un viaggio di uscita o di ritorno, secondo il Ministero degli Esteri britannico: tieni pronta una prenotazione se arrivi prima del rilascio del Premium Visa.",
    faq: { q: "Quanto costa il Premium Visa di Mauritius?", a: "Niente: l'Ufficio passaporti e immigrazione dice che è gratuito." },
    fonti: [
      inglese("Ufficio passaporti e immigrazione di Mauritius: Premium Visa", "https://passport.govmu.org/passport/?page_id=595"),
      inglese("Ministero degli Esteri britannico: requisiti di ingresso a Mauritius", "https://www.gov.uk/foreign-travel-advice/mauritius/entry-requirements"),
    ],
  },
];

function build(n: Nomade): Guide {
  return {
    key: `digital-nomad-visa-${n.id}`,
    slug: n.slug,
    title: `Visto Nomadi Digitali ${n.di}: Reddito, Durata e Arrivo con Solo Andata`,
    h1: `Visto per nomadi digitali ${n.di}: ${n.programma}`,
    description: `${n.programma}: reddito richiesto (${n.reddito}), durata, condizioni e cosa mostrare se voli con solo andata.`,
    intro: `Il programma ${n.programma} permette a chi lavora da remoto di stabilirsi legalmente ${n.in}. Ecco i requisiti verificati sulle fonti ufficiali e come funziona l'arrivo per i nomadi che di solito viaggiano con solo andata.`,
    sections: [
      { heading: "I requisiti", paragraphs: n.ue ? [...n.fatti, NOTA_UE] : n.fatti },
      { heading: "Arrivare con solo andata", paragraphs: [n.arrivo, TEMPI, VERIFICA] },
    ],
    faqs: [n.faq],
    sources: n.fonti,
    checked: CHECKED,
  };
}

export const IT_NOMAD_GUIDES: Guide[] = [
  {
    key: "digital-nomad-visas-compared",
    slug: "visti-nomadi-digitali-confronto",
    title: "Visti per Nomadi Digitali a Confronto: Reddito e Durata per Paese",
    h1: "Visti per nomadi digitali a confronto",
    description:
      "Reddito richiesto e durata di 17 visti per nomadi digitali, dal DTV thailandese a Spagna, Portogallo, Giappone e Costa Rica, verificati sulle fonti ufficiali.",
    intro:
      "I visti per nomadi digitali cambiano moltissimo: alcuni chiedono poche migliaia di euro al mese, altri 10 milioni di yen l'anno; alcuni durano sei mesi, altri cinque anni. Questa tabella confronta i principali, con ogni cifra presa dalla pagina del governo o dell'ambasciata citata nella guida di ciascun paese.",
    table: {
      caption: "Visti per nomadi digitali: reddito e durata",
      headers: ["Paese", "Programma", "Reddito o fondi", "Durata"],
      rows: NOMADI.map((n) => [n.paese, n.programma, n.reddito, n.durata]),
      rowLinks: NOMADI.map((n) => n.slug),
      note: "Le soglie cambiano, spesso ogni anno. Controlla la fonte ufficiale nella guida di ciascun paese prima di fare domanda.",
    },
    sections: [
      {
        heading: "Quello che nessuno dice: arrivarci",
        paragraphs: [
          "La maggior parte dei nomadi viaggia con solo andata, e molti arrivano come visitatori prima che il permesso sia approvato, o fanno domanda sul posto. In quel momento la compagnia ti tratta come un turista e può chiederti una prova di uscita. Il visto di soggiorno temporaneo del Portogallo chiede addirittura un biglietto di ritorno nella domanda.",
          "Con un passaporto UE, SEE o svizzero non ti serve un visto per nomadi in Spagna, Portogallo, Croazia, Malta, Italia, Ungheria o Estonia: lì vale la libera circolazione.",
          TEMPI,
          VERIFICA,
        ],
      },
    ],
    faqs: [
      { q: "Quale visto per nomadi digitali chiede il reddito più basso?", a: "Tra questi, il DE Rantau della Malesia per il settore tech (24.000 $ l'anno) e l'Italia (oltre 24.780 € l'anno) hanno le soglie più basse, ciascuno con altre condizioni. Il DTV thailandese chiede risparmi invece di un reddito." },
      { q: "Quale dura di più?", a: "Il DTV thailandese vale cinque anni, con 180 giorni per ingresso." },
    ],
    sources: NOMADI.flatMap((n) => n.fonti.slice(0, 1)),
    checked: CHECKED,
  },
  ...NOMADI.map(build),
];
