/** French guides. Same rules as the English ones: general, cautious, point to official sources. */

import type { Guide, GuideUi } from "./types";

export const VERIFIER =
  "Quand vous recevez la réservation, ouvrez la page « Gérer ma réservation » de la compagnie et recherchez-la avec le numéro de réservation (PNR) et votre nom. Si elle s'affiche, l'agent d'enregistrement la verra aussi. Gardez une capture d'écran en plus de l'e-mail.";

export const DELAI =
  "Ces réservations restent actives peu de temps (en général environ 48 heures) avant d'expirer. Faites-la peu avant l'enregistrement ou votre rendez-vous, pas des semaines à l'avance.";

export const FR_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "billet-de-continuation",
    title: "Billet de continuation : ce que c'est et comment l'obtenir",
    h1: "Le billet de continuation (preuve de sortie du territoire), expliqué",
    description:
      "Pourquoi les compagnies et l'immigration demandent un billet de continuation, ce qui compte comme preuve, et comment obtenir une réservation de vol vérifiable sans acheter un billet inutile.",
    intro:
      "De nombreux pays n'acceptent les visiteurs que s'ils peuvent prouver qu'ils repartiront. Les compagnies aériennes le vérifient à l'enregistrement, car si l'entrée vous est refusée, elles doivent vous ramener à leurs frais. Si vous voyagez avec un aller simple, il vous faut un moyen de montrer un vol de sortie ou de retour.",
    sections: [
      {
        heading: "Qui le demande",
        paragraphs: [
          "La compagnie aérienne à l'enregistrement et l'agent d'immigration à l'arrivée. En pratique, c'est surtout la compagnie, car son système signale les passagers en aller simple vers les pays qui exigent une sortie.",
          "Les consulats demandent aussi un itinéraire de vol pour de nombreuses demandes de visa, comme le visa Schengen. La plupart acceptent une réservation et déconseillent d'acheter le billet avant l'obtention du visa.",
        ],
      },
      {
        heading: "Ce qui compte comme preuve",
        paragraphs: [
          "Un vol qui quitte le pays, vers n'importe quelle destination, avec un numéro de réservation que l'agent peut voir. Aux frontières terrestres, un billet de bus est parfois accepté, mais les compagnies veulent en général un vol.",
          "Une vraie réservation a un PNR consultable sur le site de la compagnie. Un PDF modifié ou faux n'est pas une preuve, et le présenter peut vous valoir un refus, voire pire.",
        ],
      },
      {
        heading: "Vos options",
        paragraphs: [
          "Acheter un billet remboursable et l'annuler ensuite : ça marche, mais des centaines d'euros sont bloqués et le remboursement peut prendre des semaines.",
          "Acheter le vol de sortie le moins cher sans l'utiliser : simple, mais l'argent est perdu.",
          "Passer par un service de billet de continuation : quelques euros pour une vraie réservation, maintenue peu de temps puis libérée. C'est ce que font la plupart des nomades digitaux et des backpackers.",
        ],
      },
      { heading: "Vérifier qu'elle est réelle", paragraphs: [VERIFIER, DELAI] },
    ],
    faqs: [
      {
        q: "Est-ce légal ?",
        a: "Maintenir une réservation de vol est une fonction normale des compagnies, et les consulats acceptent des réservations tous les jours. Ce qui n'est pas acceptable, c'est un document falsifié. Vérifiez toujours les règles de votre destination auprès d'une source officielle.",
      },
      {
        q: "Le vol de sortie doit-il rentrer en France ?",
        a: "Non. Il doit seulement quitter le pays où vous entrez. Un vol court vers un pays voisin est le choix habituel.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "reservation-de-vol-pour-visa-schengen",
    title: "Réservation de vol pour un visa Schengen (sans acheter le billet)",
    h1: "Réservation de vol pour une demande de visa Schengen",
    description:
      "La plupart des consulats Schengen demandent une réservation de vol, pas un billet payé. Comment obtenir un itinéraire aller-retour vérifiable pour votre rendez-vous.",
    intro:
      "Une demande de visa Schengen demande en général un itinéraire de vol montrant votre arrivée et votre départ. Beaucoup de consulats précisent qu'il ne faut pas acheter le billet avant la délivrance du visa et qu'une réservation suffit.",
    sections: [
      {
        heading: "Ce que demandent les consulats",
        paragraphs: [
          "Un aller-retour, ou une entrée et une sortie, qui correspond aux dates de votre demande. Votre nom doit figurer exactement comme sur votre passeport.",
          "Les exigences varient selon le pays et le centre de visas (VFS, TLScontact…). Lisez la liste du consulat auprès duquel vous déposez votre demande.",
        ],
      },
      {
        heading: "Quand réserver",
        paragraphs: [
          "Faites la réservation un ou deux jours avant votre rendez-vous pour qu'elle soit active quand vos documents seront examinés. Il est normal qu'elle expire avant la décision.",
          VERIFIER,
        ],
      },
    ],
    faqs: [
      {
        q: "Faut-il un aller-retour ou un aller simple ?",
        a: "La plupart des demandes Schengen attendent un aller-retour, ou au moins une sortie confirmée de l'espace Schengen. Une réservation aller-retour couvre les deux.",
      },
      {
        q: "Et si la réservation expire avant la décision ?",
        a: "C'est normal. Les consulats évaluent votre projet de voyage et conseillent de ne pas acheter de billet avant d'avoir le visa.",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "reservation-de-vol-pour-visa",
    title: "Réservation de vol pour visa : vraie réservation ou faux PDF",
    h1: "Réservation de vol pour une demande de visa",
    description:
      "Ce qu'est une réservation de vol pour visa (« dummy ticket »), pourquoi les consulats la demandent, comment distinguer une vraie réservation d'un faux PDF, et comment en obtenir une vérifiable.",
    intro:
      "Beaucoup de consulats demandent un itinéraire de vol avec la demande de visa, mais déconseillent d'acheter le billet avant la décision. La solution habituelle est une vraie réservation, maintenue peu de temps dans le système de la compagnie.",
    sections: [
      {
        heading: "Vraie réservation ou faux PDF",
        paragraphs: [
          "Une vraie réservation a un numéro (PNR) consultable sur le site de la compagnie. Un faux document ressemble à une réservation mais il n'y a rien derrière.",
          "Les consulats peuvent vérifier. Présenter un document falsifié peut entraîner un refus de visa et nuire à vos demandes futures. N'utilisez qu'une réservation que vous pouvez vérifier vous-même.",
        ],
      },
      {
        heading: "Des informations cohérentes",
        paragraphs: [
          "Votre nom doit correspondre exactement au passeport. Les dates doivent correspondre au formulaire et à l'hébergement.",
          DELAI,
          VERIFIER,
        ],
      },
    ],
    faqs: [
      {
        q: "Est-ce légal ?",
        a: "Une vraie réservation de vol est légale et c'est ce que demandent de nombreux consulats. Un document modifié ou falsifié ne l'est pas.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "embarquement-refuse-aller-simple",
    title: "Embarquement refusé avec un aller simple ? Comment l'éviter",
    h1: "Embarquement refusé avec un aller simple : comment l'éviter",
    description:
      "Pourquoi les compagnies refusent l'embarquement aux passagers en aller simple, quelles destinations sont concernées, et comment régler le problème en quelques minutes à l'aéroport.",
    intro:
      "Si une compagnie vous emmène dans un pays et que l'entrée vous est refusée, elle doit vous ramener et peut être sanctionnée. C'est pourquoi les agents d'enregistrement demandent aux passagers en aller simple de prouver qu'ils repartiront. Sinon, ils peuvent refuser l'embarquement.",
    sections: [
      {
        heading: "Les voyages concernés",
        paragraphs: [
          "Les allers simples vers les pays qui exigent une sortie, comme les Philippines, la Thaïlande, l'Indonésie, le Costa Rica, la Colombie, le Pérou ou la Nouvelle-Zélande, sont les plus courants. Le système de la compagnie vous signale automatiquement.",
        ],
      },
      {
        heading: "Régler le problème à l'aéroport",
        paragraphs: [
          "Un service de billet de continuation peut émettre une vraie réservation en quelques minutes, depuis votre téléphone, au comptoir. Montrez le numéro de réservation à l'agent : il pourra la vérifier dans son système.",
          VERIFIER,
        ],
      },
    ],
    faqs: [
      {
        q: "La compagnie peut-elle vraiment refuser l'embarquement ?",
        a: "Oui. Les compagnies peuvent refuser le transport si vous ne remplissez pas les conditions d'entrée de votre destination, et la preuve de sortie en fait partie.",
      },
    ],
  },
];

export const FR_UI: GuideUi = {
  home: "Accueil",
  guides: "Guides",
  indexTitle: "Guides : billet de continuation et réservation de vol pour visa",
  indexDescription:
    "Quels pays demandent une preuve de sortie, ce que demandent les dossiers de visa, et comment obtenir une réservation de vol vérifiable sans acheter de billet.",
  commonQuestions: "Questions fréquentes",
  moreGuides: "Autres guides",
  disclaimer:
    "Ce guide est une information générale, pas un conseil juridique ou en immigration. Les règles changent : vérifiez toujours auprès de la source officielle de votre destination et de votre compagnie avant de partir.",
  ctaHeading: (price) =>
    price
      ? `Besoin d'un billet de continuation vérifiable ? Dès ${price}`
      : "Besoin d'un billet de continuation vérifiable ?",
  ctaBody:
    "Recevez par e-mail, en quelques minutes, une vraie réservation de vol avec un numéro vérifiable sur le site de la compagnie.",
  ctaButton: "Obtenir mon billet de continuation",
  destinationsTitle: "Où l'on vous demandera une preuve de sortie",
  destinationsSub:
    "Guides sur ce que vérifient les compagnies et l'immigration, et sur les réservations de vol pour visa.",
  sourcesHeading: "Sources",
  lastChecked: (date) => `Dernière vérification : ${date}`,
};
