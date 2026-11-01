/**
 * Italian guides on official entry schemes (ETIAS, EES, ETAs, arrival cards,
 * transit visas, ESTA). Same facts and official sources as en-official.ts
 * (checked 2026-11-01), translated. Keys match the English pages.
 */

import { TEMPI, VERIFICA } from "./it";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nome: string): GuideSource => ({
  label: `Ministero degli Esteri britannico: requisiti di ingresso (${nome}) (in inglese)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

const PASSAPORTO =
  "La durata del soggiorno indicata dal Ministero degli Esteri britannico vale per i passaporti britannici. Con un passaporto italiano o svizzero può essere diversa: verifica sul sito ufficiale dell'immigrazione del paese o su Viaggiare Sicuri della Farnesina.";

const UE =
  "I cittadini dell'UE, del SEE e della Svizzera non sono interessati: il sistema riguarda i cittadini di paesi terzi, per esempio i visitatori statunitensi o canadesi o chi viaggia con un visto Schengen.";

export const IT_OFFICIAL_GUIDES: Guide[] = [
  {
    key: "etias-explained",
    slug: "etias-autorizzazione-viaggio-europa",
    title: "ETIAS Spiegato: Costo, Chi Deve Richiederlo e Quando Parte",
    h1: "ETIAS: la nuova autorizzazione di viaggio per l'Europa",
    description: "Cos'è l'ETIAS, la tariffa di 20 €, chi è esente, quando l'UE prevede la partenza e come si combina con il biglietto di ritorno e la regola dei 90 giorni.",
    intro: "L'ETIAS è un'autorizzazione di viaggio online che i visitatori esenti da visto dovranno ottenere prima di recarsi nella maggior parte dei paesi europei, simile all'ESTA statunitense. Non sostituisce il visto per chi ne ha bisogno e non cambia la regola dei 90 giorni su 180.",
    sections: [
      { heading: "Costo ed esenzioni", paragraphs: ["La Commissione europea ha fissato la tariffa ETIAS a 20 €, invece dei 7 € previsti inizialmente. Chi ha meno di 18 o più di 70 anni non paga.", UE] },
      { heading: "Quando parte", paragraphs: ["A luglio 2025 la Commissione ha detto che l'ETIAS sarebbe entrato in funzione a fine 2026, dopo la piena operatività del sistema di ingressi/uscite. Le date sono già slittate in passato: controlla sul sito ufficiale dell'UE se è attivo quando viaggi."] },
      { heading: "Cosa non cambia", paragraphs: ["L'ETIAS non cambia ciò che le guardie di frontiera possono chiederti, compresa la prova che ripartirai. Chi arriva con solo andata resta il più esposto alla richiesta di un biglietto di ritorno o di uscita.", VERIFICA] },
    ],
    faqs: [
      { q: "Serve l'ETIAS se ho un visto Schengen?", a: "No. L'ETIAS è per chi non ha bisogno del visto. Chi ne ha bisogno continua a richiederlo come prima." },
      { q: "Quanto costa l'ETIAS?", a: "20 €, con esenzione per under 18 e over 70, secondo la Commissione europea." },
    ],
    sources: [{ label: "Commissione europea: l'ETIAS costerà 20 € (in inglese)", url: "https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en" }],
    checked: CHECKED,
  },
  {
    key: "ees-entry-exit-system",
    slug: "ees-sistema-ingressi-uscite-europa",
    title: "EES: il Sistema di Ingressi/Uscite Europeo e la Fine dei Timbri",
    h1: "Il sistema di ingressi/uscite (EES) dell'UE, spiegato",
    description: "Il sistema di ingressi/uscite ha sostituito i timbri sul passaporto per i visitatori extra UE. Quando è partito, cosa cambia per la regola dei 90 giorni e perché i soggiorni oltre il limite si vedono subito.",
    intro: "Dal 12 ottobre 2025 i viaggiatori extra UE per soggiorni brevi vengono registrati elettronicamente quando attraversano le frontiere esterne dei paesi europei aderenti, invece di ricevere un timbro. Il sistema è pienamente operativo dal 10 aprile 2026.",
    sections: [
      { heading: "Cosa è cambiato", paragraphs: ["L'EES registra digitalmente ogni ingresso e uscita e sostituisce la timbratura del passaporto nella maggior parte dei paesi europei. Si applica ai viaggiatori extra UE per brevi visite, con o senza obbligo di visto.", UE] },
      { heading: "Perché conta per la regola dei 90 giorni", paragraphs: ["I soggiorni brevi sono limitati a 90 giorni in qualsiasi periodo di 180 in tutta l'area Schengen. Con i timbri gli agenti contavano a mano; con l'EES il conteggio è automatico, e un soggiorno oltre il limite emerge subito all'uscita o al viaggio successivo.", "Se pianifichi un lungo viaggio in Europa, prenota l'uscita entro i tuoi 90 giorni e tieni la prenotazione a portata di mano. Le guardie di frontiera possono chiederti come e quando ripartirai.", TEMPI] },
    ],
    faqs: [
      { q: "Riceverò ancora il timbro sul passaporto in Europa?", a: "Nella maggior parte dei paesi aderenti, no. L'EES ha sostituito la timbratura ed è pienamente operativo dal 10 aprile 2026." },
      { q: "L'EES vale anche con il visto?", a: "Sì. Riguarda i viaggiatori extra UE per soggiorni brevi, esenti da visto o con visto Schengen." },
    ],
    sources: [
      { label: "Commissione europea: il nuovo EES è operativo dal 12 ottobre 2025 (in inglese)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
      { label: "Ambasciata di Polonia: EES pienamente operativo dal 10 aprile 2026 (in inglese)", url: "https://www.gov.pl/web/usa-en/entryexit-system---full-implementation-from-april-10th-2026" },
      { label: "SEAE: cosa fare e non fare con il visto Schengen (in inglese)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
    ],
    checked: CHECKED,
  },
  {
    key: "uk-eta",
    slug: "eta-regno-unito-autorizzazione-elettronica",
    title: "ETA Regno Unito: Costo, Chi Deve Richiederla e Scali",
    h1: "L'autorizzazione elettronica di viaggio (ETA) per il Regno Unito",
    description: "La maggior parte dei visitatori esenti da visto, italiani compresi, ora ha bisogno di un'ETA per il Regno Unito. Costo, durata del soggiorno, chi non ne ha bisogno e quando serve per uno scalo.",
    intro: "La maggior parte dei visitatori che non hanno bisogno del visto per il Regno Unito, tra cui europei, statunitensi, canadesi e australiani, deve ora ottenere un'autorizzazione elettronica di viaggio (ETA) prima di partire. Copre anche Jersey, Guernsey e l'Isola di Man.",
    sections: [
      { heading: "Costo e durata del soggiorno", paragraphs: ["L'ETA costa 20 £ sul servizio ufficiale GOV.UK. Altri siti possono chiedere di più. Consente visite fino a sei mesi alla volta, ma non garantisce l'ingresso.", "Ogni viaggiatore ha bisogno della propria, neonati e bambini compresi. I cittadini britannici e irlandesi e chi ha un permesso per vivere, lavorare o studiare nel Regno Unito non ne hanno bisogno."] },
      { heading: "Scali", paragraphs: ["Serve l'ETA se durante lo scalo passi il controllo di frontiera britannico. Se non sei sicuro, chiedi alla compagnia aerea."] },
      { heading: "Dimostrare che ripartirai", paragraphs: ["L'ETA non sostituisce le normali regole per i visitatori: possono chiederti quanto resti e come ripartirai. Una partenza prenotata entro sei mesi risponde a questa domanda.", VERIFICA] },
    ],
    faqs: [
      { q: "Quanto costa l'ETA britannica?", a: "20 £ sul servizio ufficiale GOV.UK. Evita i siti che chiedono di più." },
      { q: "I bambini hanno bisogno dell'ETA per il Regno Unito?", a: "Sì. Ogni viaggiatore ha bisogno della propria, neonati e bambini compresi." },
    ],
    sources: [{ label: "GOV.UK: richiedere un'autorizzazione elettronica di viaggio (ETA) (in inglese)", url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta" }],
    checked: CHECKED,
  },
  {
    key: "canada-eta",
    slug: "eta-canada-autorizzazione-elettronica",
    title: "eTA Canada: Costo, Chi Deve Richiederla e Biglietto di Ritorno",
    h1: "L'eTA del Canada (Electronic Travel Authorization)",
    description: "I viaggiatori esenti da visto che volano in Canada o vi fanno scalo hanno bisogno dell'eTA. Il costo di 7 dollari canadesi, chi deve richiederla e cosa possono chiedere gli agenti di frontiera.",
    intro: "Gli stranieri esenti da visto che volano in Canada, o transitano in un aeroporto canadese, hanno bisogno di una Electronic Travel Authorization. Costa 7 dollari canadesi sul sito ufficiale del governo del Canada.",
    sections: [
      { heading: "Chi deve richiederla", paragraphs: ["I viaggiatori di paesi esenti da visto che arrivano in aereo o fanno scalo in un aeroporto canadese. Non serve per gli arrivi via terra o via mare. I cittadini con doppia cittadinanza canadese devono usare un passaporto canadese.", "Alcune nazionalità normalmente soggette a visto possono usare l'eTA a determinate condizioni, come i messicani che hanno avuto un visto canadese negli ultimi dieci anni o hanno un visto statunitense di non immigrante valido e arrivano in aereo."] },
      { heading: "Biglietto di ritorno e fondi", paragraphs: ["Il Ministero degli Esteri britannico avverte che gli agenti di frontiera canadesi possono chiedere un biglietto di ritorno o di uscita e la prova di fondi sufficienti, anche se alloggi da amici o parenti.", VERIFICA] },
    ],
    faqs: [
      { q: "Quanto costa l'eTA canadese?", a: "7 dollari canadesi sul sito ufficiale del governo del Canada." },
      { q: "Serve l'eTA per entrare in Canada in auto dagli Stati Uniti?", a: "No. L'eTA riguarda i viaggi in aereo. Gli arrivi via terra o via mare non ne hanno bisogno, anche se le regole sui visti restano valide." },
    ],
    sources: [
      { label: "Governo del Canada: Electronic Travel Authorization (eTA) (in inglese)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html" },
      fcdo("canada", "Canada"),
    ],
    checked: CHECKED,
  },
  {
    key: "thailand-digital-arrival-card",
    slug: "carta-arrivo-digitale-thailandia-tdac",
    title: "Carta di Arrivo Digitale della Thailandia (TDAC) ed Esenzione dal Visto",
    h1: "La carta di arrivo digitale thailandese (TDAC) e i controlli all'ingresso",
    description: "Ogni straniero che arriva in Thailandia deve compilare la TDAC online. Quando farlo, il soggiorno senza visto e i fondi e il biglietto di uscita che l'immigrazione può chiedere.",
    intro: "Tutti gli stranieri che arrivano in Thailandia in aereo, via terra o via mare devono compilare online la Thailand Digital Arrival Card (TDAC) prima dell'arrivo. È uno dei tre punti che possono creare problemi, insieme alla prova di fondi e al biglietto di uscita.",
    sections: [
      { heading: "Quando compilarla", paragraphs: ["Compila la TDAC online nei tre giorni prima dell'arrivo. Usa solo il sito ufficiale del governo thailandese."] },
      { heading: "L'esenzione dal visto", paragraphs: ["Per i visitatori britannici, il Ministero degli Esteri britannico indica che l'ingresso in esenzione dal visto consente ora fino a 30 giorni, solo per turismo. Le regole thailandesi sono cambiate più volte e dipendono dal passaporto.", PASSAPORTO] },
      { heading: "Fondi e biglietto di uscita", paragraphs: ["L'immigrazione può chiedere la prova di almeno 10.000 baht a persona o 20.000 a famiglia, e di un viaggio di uscita o ritorno. Le compagnie controllano il biglietto di uscita al banco.", TEMPI, VERIFICA] },
    ],
    faqs: [
      { q: "La TDAC è gratuita?", a: "Sì, sul sito ufficiale. Compilala nei tre giorni prima dell'arrivo." },
      { q: "Quanti soldi servono per entrare in Thailandia?", a: "L'immigrazione può chiedere almeno 10.000 baht a persona o 20.000 a famiglia, secondo il Ministero degli Esteri britannico." },
    ],
    sources: [fcdo("thailand", "Thailandia")],
    checked: CHECKED,
  },
  {
    key: "malaysia-digital-arrival-card",
    slug: "carta-arrivo-digitale-malesia-mdac",
    title: "Carta di Arrivo Digitale della Malesia (MDAC): Quando Serve",
    h1: "La carta di arrivo digitale della Malesia (MDAC)",
    description: "Chi entra in Malesia compila una carta di arrivo digitale prima di partire, e la compagnia può chiederla al check-in. Chi deve farlo e cos'altro tenere pronto.",
    intro: "I visitatori compilano online la Malaysia Digital Arrival Card prima di partire, e la compagnia può chiederla al check-in. Se sei solo in transito senza passare l'immigrazione, non serve.",
    sections: [
      { heading: "Le regole", paragraphs: ["I visitatori britannici non hanno bisogno del visto per turismo e di norma ricevono 90 giorni all'arrivo. Il passaporto deve avere sei mesi di validità dall'arrivo ed essere integro, senza pagine mancanti.", PASSAPORTO] },
      { heading: "Arrivare con solo andata", paragraphs: ["Le indicazioni britanniche non prevedono un obbligo di biglietto di uscita per la Malesia, ma le compagnie possono chiedere a chi viaggia con solo andata come ripartirà. Voli brevi verso Singapore, Bangkok o Bali sono uscite comuni.", TEMPI, VERIFICA] },
    ],
    faqs: [{ q: "Serve la MDAC se faccio solo scalo a KLIA?", a: "No, se non passi l'immigrazione, secondo il Ministero degli Esteri britannico." }],
    sources: [fcdo("malaysia", "Malesia")],
    checked: CHECKED,
  },
  {
    key: "singapore-arrival-card",
    slug: "sg-arrival-card-singapore",
    title: "SG Arrival Card: Quando Compilarla Prima del Volo per Singapore",
    h1: "La SG Arrival Card di Singapore",
    description: "I visitatori di Singapore devono compilare la SG Arrival Card elettronica nei tre giorni prima dell'arrivo. Cosa contiene e quanto puoi restare.",
    intro: "I visitatori devono compilare la SG Arrival Card elettronica, che include una dichiarazione sanitaria, nei tre giorni prima dell'arrivo a Singapore. Una dichiarazione falsa è un reato.",
    sections: [
      { heading: "Quanto puoi restare", paragraphs: ["I cittadini britannici possono visitare Singapore senza visto per turismo o affari. L'agente di immigrazione decide la durata, di solito tra 30 e 90 giorni. Il passaporto deve avere sei mesi di validità dall'arrivo.", PASSAPORTO] },
      { heading: "Biglietto di uscita", paragraphs: ["Le compagnie che volano a Singapore possono comunque chiedere una prenotazione di uscita a chi viaggia con solo andata. Kuala Lumpur, Bangkok, Bali e Giacarta sono uscite brevi comuni.", VERIFICA] },
    ],
    faqs: [{ q: "Quando devo compilare la SG Arrival Card?", a: "Nei tre giorni prima del tuo arrivo a Singapore." }],
    sources: [fcdo("singapore", "Singapore")],
    checked: CHECKED,
  },
  {
    key: "philippines-etravel",
    slug: "etravel-filippine-registrazione",
    title: "Registrazione eTravel Filippine e Biglietto di Uscita",
    h1: "eTravel nelle Filippine: registrazione, codice QR e biglietto di uscita",
    description: "Chiunque arrivi nelle Filippine ha bisogno di un codice QR eTravel. Quando registrarsi, il soggiorno senza visto e il biglietto di uscita che ci si aspetta tu mostri.",
    intro: "Chi arriva nelle Filippine deve registrarsi sul sistema gratuito eTravel nei tre giorni prima dell'arrivo e mostrare il codice QR. Dalla maggior parte dei visitatori ci si aspetta anche una prova di viaggio di ritorno o uscita.",
    sections: [
      { heading: "eTravel", paragraphs: ["La registrazione è gratuita e va fatta nei tre giorni prima dell'arrivo. Tieni il codice QR sul telefono e fai uno screenshot."] },
      { heading: "Durata del soggiorno e biglietto di uscita", paragraphs: ["I visitatori britannici possono restare fino a 30 giorni senza visto e chiedere una proroga sul posto. Il Ministero degli Esteri britannico indica che dalla maggior parte ci si aspetta una prova di viaggio di ritorno o uscita, che possono chiedere sia l'immigrazione sia le compagnie.", PASSAPORTO, TEMPI, VERIFICA] },
    ],
    faqs: [{ q: "L'eTravel è gratuito?", a: "Sì. Registrati nei tre giorni prima dell'arrivo ed evita i siti a pagamento." }],
    sources: [fcdo("philippines", "Filippine")],
    checked: CHECKED,
  },
  {
    key: "indonesia-e-voa-bali-levy",
    slug: "visto-all-arrivo-indonesia-tassa-bali",
    title: "Visto all'Arrivo in Indonesia, e-VOA e Tassa Turistica di Bali",
    h1: "Il visto all'arrivo in Indonesia, l'e-VOA e la tassa turistica di Bali",
    description: "Cosa serve per atterrare a Bali o Giacarta: il visto all'arrivo di 30 giorni e la regola del biglietto di uscita, la dichiarazione doganale online e la tassa di Bali.",
    intro: "La maggior parte dei visitatori dell'Indonesia usa un visto all'arrivo di 30 giorni, richiesto online in anticipo (e-VOA) o in aeroporto. Per ottenerlo serve la prova di un viaggio di uscita o ritorno.",
    sections: [
      { heading: "Il visto all'arrivo", paragraphs: ["Per i visitatori britannici, il visto all'arrivo costa 500.000 rupie, in contanti o con carta, è a ingresso singolo e dura 30 giorni. Se richiedi l'e-VOA online, fallo almeno una settimana prima della partenza. Verifica che il tuo passaporto possa usare il visto all'arrivo.", "La prova di un viaggio di uscita o ritorno è una condizione del visto, per questo le compagnie che volano in Indonesia la controllano al banco."] },
      { heading: "Prima di atterrare", paragraphs: ["Compila la dichiarazione doganale e sanitaria online gratuita nelle 72 ore prima dell'arrivo. Bali applica inoltre ai turisti stranieri una tassa di 150.000 rupie, da pagare online o all'arrivo.", TEMPI, VERIFICA] },
    ],
    faqs: [
      { q: "Serve un biglietto di uscita per Bali?", a: "Sì, la prova di un viaggio di uscita o ritorno è obbligatoria per il visto all'arrivo." },
      { q: "Quanto costa la tassa turistica di Bali?", a: "150.000 rupie, da pagare online o all'arrivo." },
    ],
    sources: [fcdo("indonesia", "Indonesia")],
    checked: CHECKED,
  },
  {
    key: "schengen-airport-transit-visa",
    slug: "visto-transito-aeroportuale-schengen",
    title: "Visto di Transito Aeroportuale Schengen: Chi Ne Ha Bisogno",
    h1: "Serve un visto di transito per cambiare aereo in Europa?",
    description: "I cittadini di 12 paesi hanno bisogno di un visto di transito aeroportuale per uno scalo in un aeroporto Schengen. La lista, le esenzioni comuni e cosa verificare prima di prenotare.",
    intro: "Cambiare aereo in un aeroporto Schengen senza uscire dalla zona internazionale normalmente non richiede visto. L'eccezione riguarda i cittadini di una breve lista comune dell'UE, che hanno bisogno di un visto di transito aeroportuale, a meno che non abbiano determinati visti o permessi di soggiorno.",
    sections: [
      { heading: "La lista comune", paragraphs: ["La lista valida in tutta l'UE comprende i cittadini di Afghanistan, Bangladesh, Repubblica Democratica del Congo, Eritrea, Etiopia, Ghana, Iran, Iraq, Nigeria, Pakistan, Somalia e Sri Lanka. Ogni paese Schengen può aggiungere altre nazionalità per i propri aeroporti, quindi verifica il paese in cui fai scalo."] },
      { heading: "Esenzioni comuni", paragraphs: ["Di solito sono esenti i titolari di un visto o permesso di soggiorno Schengen valido, o di un permesso di soggiorno valido di paesi come Stati Uniti, Canada, Giappone, Andorra, Monaco, San Marino o Svizzera che consenta di rientrarvi. Anche gli equipaggi sono esenti.", "Se hai bisogno del visto di transito, la domanda di solito chiede i dati del volo successivo, quindi tieni pronto l'itinerario completo.", VERIFICA] },
    ],
    faqs: [{ q: "I cittadini del Bangladesh hanno bisogno del visto di transito a Roma o Milano?", a: "Il Bangladesh è nella lista comune dell'UE, quindi sì, salvo esenzioni come un visto Schengen valido o un permesso di soggiorno statunitense o canadese." }],
    sources: [{ label: "Ufficio lettone per la cittadinanza e le migrazioni: visti di transito aeroportuale (lista comune UE) (in inglese)", url: "https://www.pmlp.gov.lv/en/airport-transit" }],
    checked: CHECKED,
  },
  {
    key: "uk-transit-visa",
    slug: "visto-transito-regno-unito",
    title: "Visto di Transito Regno Unito: Direct Airside o Visitor in Transit",
    h1: "Serve un visto di transito per il Regno Unito?",
    description: "Quando serve un Direct Airside Transit visa o un Visitor in Transit visa per uno scalo nel Regno Unito, e quando basta un'ETA o un altro visto.",
    intro: "Se ti serve un visto di transito britannico dipende dalla tua nazionalità e dal fatto che lo scalo passi o meno dal controllo di frontiera. Usa lo strumento di verifica di GOV.UK per il tuo passaporto; ecco come si combinano le opzioni.",
    sections: [
      { heading: "I due visti di transito", paragraphs: ["Il Direct Airside Transit visa serve per cambiare volo senza passare il controllo di frontiera britannico. Il Visitor in Transit visa serve per passare il controllo e ripartire entro 48 ore. Soggiorni più lunghi, o transiti frequenti per oltre sei mesi, richiedono uno Standard Visitor visa."] },
      { heading: "Quando non serve", paragraphs: ["Non serve un visto di transito se hai un'ETA britannica, uno Standard Visitor visa, un Marriage Visitor visa, un permesso familiare dell'EU Settlement Scheme o un documento di viaggio dell'Home Office. La compagnia aerea può dirti se lo scalo passa dal controllo di frontiera.", "In ogni caso, tieni pronti i dati del volo successivo: un transito, per definizione, significa ripartire.", VERIFICA] },
    ],
    faqs: [{ q: "I colombiani hanno bisogno del visto di transito per il Regno Unito?", a: "Dal 26 novembre 2024 i cittadini colombiani hanno bisogno di un visto di transito aeroportuale diretto per transitare nel Regno Unito, salvo esenzioni." }],
    sources: [
      { label: "GOV.UK: visti di transito (in inglese)", url: "https://www.gov.uk/transit-visa" },
      { label: "GOV.UK: memorandum esplicativo HC 334 (Colombia) (in inglese)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024/explanatory-memorandum-to-the-statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024-accessible" },
    ],
    checked: CHECKED,
  },
  {
    key: "esta-cost-and-return-ticket",
    slug: "esta-costo-biglietto-di-ritorno",
    title: "Costo dell'ESTA nel 2026 (40 $) e l'Obbligo del Biglietto di Ritorno",
    h1: "ESTA: la tariffa di 40 $ e il biglietto di ritorno obbligatorio",
    description: "La tariffa dell'ESTA è salita a 40 $ il 30 settembre 2025. Cosa copre l'ESTA e perché chi viaggia con il Visa Waiver Program ha bisogno di un biglietto di ritorno o di uscita.",
    intro: "La tariffa dell'ESTA, l'autorizzazione online per chi viaggia negli Stati Uniti con il Visa Waiver Program (italiani compresi), è passata da 21 $ a 40 $ il 30 settembre 2025. Paga solo sul sito ufficiale del CBP.",
    sections: [
      { heading: "La regola del biglietto di ritorno", paragraphs: ["Chi viaggia senza visto deve avere un biglietto di ritorno o di uscita per volare negli Stati Uniti, e le compagnie lo controllano prima dell'imbarco. Il tempo trascorso in Canada, Messico e nelle isole vicine di solito conta nei 90 giorni, quindi un salto oltre confine non azzera il soggiorno.", TEMPI, VERIFICA] },
    ],
    faqs: [{ q: "Quanto costa l'ESTA?", a: "40 $ dal 30 settembre 2025, sul sito ufficiale del CBP." }],
    sources: [
      { label: "Fragomen: il DHS applica nuove tariffe per ESTA, EVUS e I-94 terrestre (in inglese)", url: "https://www.fragomen.com/insights/united-states-dhs-announces-implementation-of-new-fees-for-esta-evus-and-land-border-i-94-forms-starting-september-30.html" },
      { label: "Sito ufficiale per la richiesta ESTA (CBP)", url: "https://esta.cbp.dhs.gov/" },
    ],
    checked: CHECKED,
  },
];
