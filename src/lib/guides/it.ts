/** Italian guides. Same rules as the English ones: general, cautious, point to official sources. */

import type { Guide, GuideUi } from "./types";

const VERIFICA =
  "Quando ricevi la prenotazione, apri la pagina «Gestisci prenotazione» della compagnia e cercala con il codice di prenotazione (PNR) e il cognome. Se la vedi lì, la vedrà anche l'addetto al check-in. Fai uno screenshot oltre a conservare l'e-mail.";

const TEMPI =
  "Queste prenotazioni restano attive per poco tempo (di solito circa 48 ore) e poi scadono. Falla poco prima del check-in o dell'appuntamento, non settimane prima.";

export const IT_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "biglietto-di-uscita",
    title: "Biglietto di uscita: cos'è e come ottenerlo senza comprare un volo",
    h1: "Il biglietto di uscita (prova di proseguimento del viaggio), spiegato",
    description:
      "Perché compagnie aeree e immigrazione chiedono un biglietto di uscita, cosa vale come prova e come ottenere una prenotazione aerea verificabile senza comprare un biglietto inutile.",
    intro:
      "Molti paesi fanno entrare i visitatori solo se possono dimostrare che ripartiranno. Le compagnie aeree lo controllano al check-in, perché se ti viene negato l'ingresso devono riportarti indietro a proprie spese. Se viaggi con un biglietto di sola andata, ti serve un modo per mostrare un volo di uscita o di ritorno.",
    sections: [
      {
        heading: "Chi lo chiede",
        paragraphs: [
          "La compagnia al check-in e l'agente dell'immigrazione all'arrivo. In pratica lo chiede soprattutto la compagnia, perché il suo sistema segnala i passeggeri di sola andata verso paesi che richiedono l'uscita.",
          "Anche i consolati chiedono un itinerario di volo per molte domande di visto. Di solito accettano una prenotazione e sconsigliano di comprare il biglietto prima del rilascio del visto.",
        ],
      },
      {
        heading: "Cosa vale come prova",
        paragraphs: [
          "Un volo che lascia il paese, verso qualsiasi destinazione, con un codice di prenotazione che l'addetto può vedere. Alle frontiere terrestri a volte basta un biglietto dell'autobus, ma le compagnie aeree di solito vogliono un volo.",
          "Una vera prenotazione ha un PNR consultabile sul sito della compagnia. Un PDF modificato o falso non è una prova e presentarlo può costarti l'ingresso o peggio.",
        ],
      },
      {
        heading: "Le tue opzioni",
        paragraphs: [
          "Comprare un biglietto rimborsabile e cancellarlo dopo: funziona, ma blocchi centinaia di euro e il rimborso può richiedere settimane.",
          "Comprare il volo di uscita più economico e non usarlo: semplice, ma perdi i soldi.",
          "Usare un servizio di biglietto di uscita: con una piccola tariffa ottieni una vera prenotazione, tenuta per poco tempo e poi rilasciata. È quello che fa la maggior parte di nomadi digitali e backpacker.",
        ],
      },
      { heading: "Come verificare che sia reale", paragraphs: [VERIFICA, TEMPI] },
    ],
    faqs: [
      {
        q: "È legale?",
        a: "Tenere una prenotazione aerea è una funzione normale delle compagnie e i consolati accettano prenotazioni ogni giorno. Non è accettabile un documento falsificato. Controlla sempre le regole della tua destinazione su una fonte ufficiale.",
      },
      {
        q: "Il volo di uscita deve tornare in Italia?",
        a: "No. Deve solo lasciare il paese in cui entri. Di solito si sceglie un volo breve verso un paese vicino.",
      },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "biglietto-di-uscita-thailandia",
    title: "Biglietto di uscita per la Thailandia: serve?",
    h1: "Serve un biglietto di uscita per la Thailandia?",
    description:
      "L'ingresso senza visto in Thailandia richiede di uscire entro il periodo consentito, e le compagnie spesso lo chiedono al check-in. Cosa aspettarsi.",
    intro:
      "Chi entra in Thailandia senza visto deve uscire entro il soggiorno consentito, e l'immigrazione può chiedere una prova. In pratica il controllo più frequente avviene al banco della compagnia aerea prima della partenza.",
    sections: [
      {
        heading: "Dove lo controllano",
        paragraphs: [
          "Le compagnie che volano in Thailandia, soprattutto le low cost, chiedono spesso ai passeggeri di sola andata un volo di uscita. Senza, possono negarti l'imbarco.",
          "Le regole di ingresso in Thailandia sono cambiate più volte negli ultimi anni. Controlla il soggiorno consentito per il tuo passaporto sul sito ufficiale Thai e-Visa.",
        ],
      },
      {
        heading: "Cosa mostrare",
        paragraphs: [
          "Un volo in uscita dalla Thailandia entro il soggiorno consentito. Kuala Lumpur, Singapore, Ho Chi Minh o Phnom Penh sono uscite brevi comuni.",
          TEMPI,
          VERIFICA,
        ],
      },
    ],
    faqs: [
      {
        q: "Vale un biglietto dell'autobus per la Cambogia o il Laos?",
        a: "A volte alla frontiera terrestre, ma le compagnie aeree di solito vogliono vedere un volo. La prenotazione aerea è la scelta più sicura.",
      },
    ],
  },
  {
    key: "onward-ticket-usa-esta",
    slug: "biglietto-di-ritorno-usa-esta",
    title: "Biglietto di ritorno per gli USA con ESTA",
    h1: "Serve un biglietto di ritorno per entrare negli USA con l'ESTA?",
    description:
      "Chi entra negli Stati Uniti con il Visa Waiver Program (ESTA) deve avere un biglietto di ritorno o di proseguimento. Cosa vale e cosa fare se voli di sola andata.",
    intro:
      "Sì. Chi viaggia con il Visa Waiver Program e un ESTA approvato deve avere un biglietto di ritorno o di proseguimento quando vola negli Stati Uniti. Le compagnie lo controllano prima dell'imbarco, perché è un requisito del programma.",
    sections: [
      {
        heading: "Cosa vale",
        paragraphs: [
          "Un biglietto in uscita dagli Stati Uniti entro i 90 giorni concessi. Attenzione: il tempo trascorso in Canada, Messico o Caraibi in genere conta nei 90 giorni, quindi un salto oltre confine non azzera il conteggio.",
          "Controlla le regole aggiornate su CBP e sul sito ufficiale ESTA prima di partire.",
        ],
      },
      { heading: "Come fare", paragraphs: [TEMPI, VERIFICA] },
    ],
    faqs: [
      {
        q: "Un volo per il Messico conta come uscita?",
        a: "Dimostra che lasci gli USA, ma il tempo in Messico e Canada di solito conta nei 90 giorni del Visa Waiver Program. Verifica le indicazioni di CBP.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "imbarco-negato-solo-andata",
    title: "Imbarco negato con biglietto di sola andata? Come evitarlo",
    h1: "Imbarco negato con biglietto di sola andata: come evitarlo",
    description:
      "Perché le compagnie negano l'imbarco ai passeggeri di sola andata, quali destinazioni lo richiedono e come risolvere in pochi minuti in aeroporto.",
    intro:
      "Se una compagnia ti porta in un paese e ti viene negato l'ingresso, deve riportarti indietro e può essere multata. Per questo al check-in chiedono ai passeggeri di sola andata di dimostrare che ripartiranno. Se non puoi, possono negarti l'imbarco.",
    sections: [
      {
        heading: "Quali viaggi sono a rischio",
        paragraphs: [
          "I voli di sola andata verso paesi che richiedono l'uscita, come Filippine, Thailandia, Indonesia, Costa Rica, Colombia, Perù o Nuova Zelanda. Il sistema della compagnia ti segnala in automatico.",
        ],
      },
      {
        heading: "Come risolvere in aeroporto",
        paragraphs: [
          "Un servizio di biglietto di uscita emette una vera prenotazione in pochi minuti, dal telefono, direttamente al banco. Mostra il codice all'addetto e potrà verificarla nel suo sistema.",
          VERIFICA,
        ],
      },
    ],
    faqs: [
      {
        q: "La compagnia può davvero negarmi l'imbarco?",
        a: "Sì. Le compagnie possono rifiutare il trasporto se non rispetti i requisiti di ingresso della destinazione, e la prova di uscita è tra questi.",
      },
    ],
  },
];

export const IT_UI: GuideUi = {
  home: "Home",
  guides: "Guide",
  indexTitle: "Guide al biglietto di uscita e alla prenotazione aerea per il visto",
  indexDescription:
    "Quali paesi chiedono una prova di uscita, cosa serve per le domande di visto e come ottenere una prenotazione aerea verificabile senza comprare un biglietto.",
  commonQuestions: "Domande frequenti",
  moreGuides: "Altre guide",
  disclaimer:
    "Questa guida è un'informazione generale, non una consulenza legale o sull'immigrazione. Le regole cambiano: verifica sempre con la fonte ufficiale della destinazione e con la compagnia prima di partire.",
  ctaHeading: (price) =>
    price
      ? `Ti serve un biglietto di uscita verificabile? Da ${price}`
      : "Ti serve un biglietto di uscita verificabile?",
  ctaBody:
    "Ricevi via e-mail in pochi minuti una vera prenotazione aerea con un codice verificabile sul sito della compagnia.",
  ctaButton: "Ottieni il biglietto di uscita",
  destinationsTitle: "Dove ti chiederanno una prova di uscita",
  destinationsSub:
    "Guide su cosa controllano compagnie aeree e immigrazione, e sulle prenotazioni aeree per il visto.",
  sourcesHeading: "Fonti",
  lastChecked: (date) => `Ultima verifica: ${date}`,
};
