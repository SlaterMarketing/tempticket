/**
 * French guides for visa applicants in French-speaking countries: flight
 * reservations for a Schengen visa, and for a Canadian visitor visa.
 * EU and Canadian facts are checked against the official sources listed;
 * each page adds where applicants from that country apply and what is
 * specific to them.
 */

import { DELAI, VERIFIER } from "./fr";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const SRC_EEAS: GuideSource = {
  label: "EEAS : conseils officiels de l'UE aux demandeurs de visa Schengen (en anglais)",
  url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf",
};
const SRC_FEE: GuideSource = {
  label: "Ambassade de Suède : nouveaux frais de visa Schengen au 11 juin 2024 (en anglais)",
  url: "https://swedenabroad.se/en/embassies/iran-tehran/current/news/new-schengen-visa-fees",
};
const SRC_LIST: GuideSource = {
  label: "EUR-Lex : règlement (UE) 2018/1806, liste des pays soumis à visa",
  url: "https://eur-lex.europa.eu/eli/reg/2018/1806/oj?locale=fr",
};
const SRC_CASCADE: GuideSource = {
  label: "Service danois de l'immigration : durée des visas et règles « en cascade » (en anglais)",
  url: "https://nyidanmark.dk/en-GB/Words-and-concepts/US/Visum/Visa---Determination-of-validity",
};
const SRC_IRCC: GuideSource = {
  label: "Gouvernement du Canada : demander un visa de visiteur (en anglais)",
  url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html",
};

const CASCADE_GENERALE =
  "Selon la règle « en cascade » de l'UE, si vous avez obtenu et utilisé correctement trois visas au cours des deux dernières années, vous pouvez obtenir un visa à entrées multiples d'un an, puis de deux ans, puis de cinq ans. Le consulat peut toujours délivrer un visa plus court, par exemple si votre passeport expire bientôt.";

const OUTRE_MER =
  "Attention : un visa Schengen ne permet pas d'entrer dans les départements et régions d'outre-mer français (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte). Un visa spécifique est nécessaire, à demander auprès du consulat de France.";

type PaysSchengen = {
  id: string;
  /** "le Maroc", "Haïti" */
  pays: string;
  /** "du Maroc", "d'Haïti" */
  de: string;
  /** "Marocains" */
  habitants: string;
  aeroports: string;
  ou: string;
  cascade?: string;
  outreMer?: boolean;
  faq: GuideFaq;
};

function schengen(p: PaysSchengen): Guide {
  const slug = `reservation-vol-visa-schengen-${p.id}`;
  const Pays = p.pays.charAt(0).toUpperCase() + p.pays.slice(1);
  return {
    key: `fr-schengen-visa-flight-reservation-${p.id}`,
    slug,
    title: `Réservation de vol pour visa Schengen depuis ${p.pays}`,
    h1: `Réservation de vol pour un visa Schengen ${p.de}`,
    description: `Ce que les ${p.habitants} doivent présenter comme réservation de vol pour un visa Schengen, pourquoi une réservation modifiable est recommandée, les frais et les visas à entrées multiples.`,
    intro: `Les ${p.habitants} ont besoin d'un visa pour les courts séjours dans l'espace Schengen, et le dossier demande un itinéraire de vol cohérent avec votre projet. Les conseils officiels de l'UE recommandent une réservation modifiable ou annulable plutôt qu'un billet acheté avant la décision. Voici ce que cela veut dire pour une demande depuis ${p.pays}.`,
    sections: [
      {
        heading: `Les ${p.habitants} ont-ils besoin d'un visa Schengen ?`,
        paragraphs: [
          `Oui. ${Pays} figure sur la liste de l'UE des pays dont les ressortissants doivent avoir un visa pour un court séjour, qui permet de rester jusqu'à 90 jours sur toute période de 180 jours, tous pays Schengen confondus.`,
          "Depuis le 11 juin 2024, les frais de visa sont de 90 € pour les adultes et de 45 € pour les enfants de 6 à 12 ans, payés en général en monnaie locale. Le centre de visas ajoute ses propres frais de service.",
        ],
      },
      {
        heading: "Où déposer la demande",
        paragraphs: [
          "Déposez la demande auprès du pays de votre destination principale ou, si vous partagez votre temps à parts égales, du premier pays d'entrée. Passez uniquement par le centre de visas officiel du consulat : l'UE met en garde contre les intermédiaires qui font payer les rendez-vous.",
          p.ou,
          ...(p.outreMer ? [OUTRE_MER] : []),
        ],
      },
      {
        heading: "La réservation de vol",
        paragraphs: [
          `Présentez un aller-retour, ou une entrée et une sortie, qui correspond aux dates du formulaire et à l'hébergement. Depuis ${p.pays}, les vols partent généralement de ${p.aeroports}. Votre nom doit être identique à celui du passeport.`,
          "Les conseils de l'UE aux demandeurs précisent que les réservations de vol et d'hôtel doivent refléter votre vrai projet, et recommandent des réservations remboursables ou modifiables pour ne pas perdre d'argent en cas de refus ou de retard. Une réservation temporaire avec un vrai numéro fait exactement cela.",
          DELAI,
          VERIFIER,
        ],
      },
      { heading: "Les visas à entrées multiples", paragraphs: [p.cascade ?? CASCADE_GENERALE] },
    ],
    faqs: [
      p.faq,
      {
        q: "Faut-il acheter le billet avant d'avoir le visa ?",
        a: "En général non. Les conseils de l'UE recommandent des réservations remboursables ou modifiables, et la plupart des consulats acceptent une réservation. Achetez le billet une fois le visa obtenu.",
      },
      {
        q: "Quelle validité de passeport faut-il ?",
        a: "Au moins trois mois après la date prévue de sortie de l'espace Schengen, et un passeport délivré il y a moins de dix ans. Vérifiez la liste du consulat pour d'autres conditions.",
      },
    ],
    sources: [SRC_EEAS, SRC_FEE, SRC_LIST, SRC_CASCADE],
    checked: CHECKED,
  };
}

const SCHENGEN: PaysSchengen[] = [
  {
    id: "maroc", pays: "le Maroc", de: "du Maroc", habitants: "Marocains",
    aeroports: "Casablanca, Marrakech, Rabat, Tanger, Agadir ou Fès",
    ou: "La France et l'Espagne, les pays Schengen les plus proches, ont plusieurs consulats et centres de visas au Maroc ; les autres pays reçoivent surtout à Rabat ou Casablanca. La demande de rendez-vous est forte : prévoyez large.",
    faq: { q: "Peut-on traverser en ferry vers l'Espagne ?", a: "Oui, mais le dossier doit quand même décrire votre trajet. Une réservation de ferry peut servir pour la traversée ; pour un vol, une réservation temporaire avec numéro est la preuve habituelle." },
  },
  {
    id: "algerie", pays: "l'Algérie", de: "d'Algérie", habitants: "Algériens",
    aeroports: "Alger, Oran ou Constantine",
    ou: "La France et l'Espagne ont des consulats dans plusieurs villes d'Algérie ; les autres pays Schengen reçoivent surtout à Alger. Réservez votre rendez-vous le plus tôt possible.",
    cascade: "L'UE a adopté une décision spécifique pour les demandes déposées en Algérie, qui adapte la règle « en cascade ». C'est votre historique d'utilisation correcte des visas précédents qui permet d'obtenir des visas plus longs. Demandez au consulat comment elle s'applique à vous.",
    faq: { q: "Existe-t-il une règle spéciale pour les visas à entrées multiples en Algérie ?", a: "Oui, l'UE a une décision spécifique pour les demandes déposées en Algérie. La durée dépend de votre historique de visas Schengen." },
  },
  {
    id: "tunisie", pays: "la Tunisie", de: "de Tunisie", habitants: "Tunisiens",
    aeroports: "Tunis, Monastir, Enfidha ou Djerba",
    ou: "La plupart des pays Schengen reçoivent les demandes tunisiennes à Tunis, via leur centre de visas ; la France et l'Italie sont parmi les plus demandées.",
    faq: { q: "Peut-on revenir depuis un autre pays Schengen ?", a: "Oui. Présentez le vrai projet : arriver dans un pays et repartir d'un autre est possible, tant que les dates correspondent au formulaire." },
  },
  {
    id: "senegal", pays: "le Sénégal", de: "du Sénégal", habitants: "Sénégalais",
    aeroports: "Dakar (Blaise-Diagne)",
    ou: "Les pays Schengen reçoivent les demandes à Dakar. Certains pays sans service de visas au Sénégal sont représentés par un autre État membre : vérifiez qui traite votre demande.",
    faq: { q: "Mon pays de destination n'a pas d'ambassade à Dakar. Que faire ?", a: "Les pays Schengen se représentent souvent entre eux. Le site du pays de destination indique l'ambassade qui reçoit les demandes en son nom." },
  },
  {
    id: "cote-d-ivoire", pays: "la Côte d'Ivoire", de: "de Côte d'Ivoire", habitants: "Ivoiriens",
    aeroports: "Abidjan (Félix-Houphouët-Boigny)",
    ou: "Les pays Schengen reçoivent les demandes ivoiriennes à Abidjan, directement ou via leur centre de visas.",
    faq: { q: "Combien de temps à l'avance déposer la demande ?", a: "Une demande Schengen peut être déposée jusqu'à six mois avant le voyage et au plus tard quinze jours avant. Prévoyez plus si les rendez-vous sont rares." },
  },
  {
    id: "cameroun", pays: "le Cameroun", de: "du Cameroun", habitants: "Camerounais",
    aeroports: "Douala ou Yaoundé-Nsimalen",
    ou: "Les pays Schengen reçoivent les demandes à Yaoundé, et certains aussi à Douala. Vérifiez quel bureau couvre votre région.",
    faq: { q: "Les consulats vérifient-ils les réservations ?", a: "Ils peuvent vérifier un numéro de réservation auprès de la compagnie, et les documents incohérents ou faux sont une cause fréquente de refus. Ne présentez qu'une réservation que vous pouvez vérifier vous-même." },
  },
  {
    id: "rd-congo", pays: "la République démocratique du Congo", de: "de RD Congo", habitants: "Congolais (RDC)",
    aeroports: "Kinshasa (N'djili) ou Lubumbashi",
    ou: "Les demandes se déposent à Kinshasa. Plusieurs pays Schengen n'y ont pas de service de visas et sont représentés par un autre État membre : vérifiez avant de prendre rendez-vous.",
    faq: { q: "Où déposer si mon pays de destination n'est pas représenté à Kinshasa ?", a: "Le site du pays de destination indique l'ambassade ou l'État membre qui traite les demandes en son nom." },
  },
  {
    id: "congo-brazzaville", pays: "le Congo", de: "du Congo-Brazzaville", habitants: "Congolais (Brazzaville)",
    aeroports: "Brazzaville (Maya-Maya) ou Pointe-Noire",
    ou: "Peu de pays Schengen ont un service de visas à Brazzaville ; beaucoup sont représentés par la France ou un autre État membre. Vérifiez où déposer votre demande.",
    faq: { q: "Puis-je demander un visa pour l'Allemagne à Brazzaville ?", a: "Cela dépend de la représentation en place. Le site du pays de destination indique où les ressortissants du Congo doivent déposer." },
  },
  {
    id: "mali", pays: "le Mali", de: "du Mali", habitants: "Maliens",
    aeroports: "Bamako (Modibo-Keïta)",
    ou: "Le service des visas Schengen au Mali a beaucoup changé ces dernières années, et certaines demandes doivent être déposées dans un pays voisin. Vérifiez sur le site du consulat de votre destination où déposer aujourd'hui.",
    faq: { q: "Où les Maliens déposent-ils une demande de visa Schengen ?", a: "Cela dépend du pays de destination et de la situation actuelle de ses services à Bamako. Son site officiel indique le bureau compétent." },
  },
  {
    id: "guinee", pays: "la Guinée", de: "de Guinée", habitants: "Guinéens",
    aeroports: "Conakry",
    ou: "Les demandes se déposent à Conakry ; plusieurs pays Schengen sont représentés par un autre État membre ou traitent les demandes depuis un pays voisin.",
    faq: { q: "Faut-il un billet aller-retour pour le dossier ?", a: "Il faut montrer une sortie prévue de l'espace Schengen qui correspond à vos dates. Une réservation temporaire le fait sans acheter le billet avant la décision." },
  },
  {
    id: "burkina-faso", pays: "le Burkina Faso", de: "du Burkina Faso", habitants: "Burkinabè",
    aeroports: "Ouagadougou",
    ou: "Les demandes se déposent à Ouagadougou pour les pays qui y ont un service de visas ; les autres sont représentés par un État membre ou traitent depuis un pays voisin.",
    faq: { q: "Comment savoir quel consulat traite ma demande ?", a: "Consultez le site du pays de destination : il indique le bureau qui reçoit les demandes des ressortissants du Burkina Faso." },
  },
  {
    id: "benin", pays: "le Bénin", de: "du Bénin", habitants: "Béninois",
    aeroports: "Cotonou",
    ou: "Les demandes se déposent à Cotonou ; certains pays Schengen sont représentés par un autre État membre.",
    faq: { q: "Le visa Schengen couvre-t-il tous les pays Schengen ?", a: "Oui, pour le voyage pour lequel il est délivré. Déposez la demande auprès de votre destination principale." },
  },
  {
    id: "togo", pays: "le Togo", de: "du Togo", habitants: "Togolais",
    aeroports: "Lomé",
    ou: "Les demandes se déposent à Lomé pour les pays qui y ont un service de visas ; les autres sont représentés par un autre État membre ou traitent depuis un pays voisin.",
    faq: { q: "Peut-on présenter un itinéraire avec escale ?", a: "Oui. L'important est que l'entrée et la sortie de l'espace Schengen correspondent à vos dates." },
  },
  {
    id: "gabon", pays: "le Gabon", de: "du Gabon", habitants: "Gabonais",
    aeroports: "Libreville",
    ou: "Les demandes se déposent à Libreville ; plusieurs pays Schengen sont représentés par la France ou un autre État membre.",
    faq: { q: "Combien coûte le visa Schengen pour les Gabonais ?", a: "90 € pour un adulte et 45 € pour un enfant de 6 à 12 ans depuis le 11 juin 2024, plus les frais du centre de visas." },
  },
  {
    id: "madagascar", pays: "Madagascar", de: "de Madagascar", habitants: "Malgaches",
    aeroports: "Antananarivo (Ivato) ou Nosy Be",
    ou: "Les demandes se déposent à Antananarivo ; certains pays Schengen sont représentés par un autre État membre.",
    outreMer: true,
    faq: { q: "Mon visa Schengen permet-il d'aller à La Réunion ?", a: "Non. La Réunion et Mayotte demandent un visa spécifique, à demander au consulat de France." },
  },
  {
    id: "haiti", pays: "Haïti", de: "d'Haïti", habitants: "Haïtiens",
    aeroports: "Port-au-Prince ou Cap-Haïtien",
    ou: "La situation à Port-au-Prince a perturbé les services consulaires ces dernières années. Vérifiez sur le site du consulat de votre destination où et comment déposer la demande, y compris depuis un pays voisin.",
    outreMer: true,
    faq: { q: "Un visa Schengen permet-il d'aller en Guadeloupe ou en Martinique ?", a: "Non. Les départements d'outre-mer demandent un visa spécifique délivré par le consulat de France." },
  },
  {
    id: "liban", pays: "le Liban", de: "du Liban", habitants: "Libanais",
    aeroports: "Beyrouth (Rafic-Hariri)",
    ou: "Les pays Schengen reçoivent les demandes libanaises à Beyrouth, directement ou via leur centre de visas.",
    faq: { q: "Les Libanais vivant dans le Golfe déposent-ils au Liban ?", a: "Non, on dépose là où l'on réside légalement. Votre itinéraire peut partir de ce pays." },
  },
  {
    id: "comores", pays: "les Comores", de: "des Comores", habitants: "Comoriens",
    aeroports: "Moroni (Prince Saïd Ibrahim)",
    ou: "Peu de pays Schengen ont un service de visas à Moroni ; vérifiez quel consulat traite votre demande, éventuellement dans un pays voisin.",
    outreMer: true,
    faq: { q: "Faut-il un visa pour Mayotte avec un visa Schengen ?", a: "Oui. Mayotte demande un visa spécifique : le visa Schengen ne suffit pas." },
  },
  {
    id: "mauritanie", pays: "la Mauritanie", de: "de Mauritanie", habitants: "Mauritaniens",
    aeroports: "Nouakchott",
    ou: "Les demandes se déposent à Nouakchott pour les pays qui y ont un service de visas ; les autres sont représentés par un autre État membre.",
    faq: { q: "Mon itinéraire peut-il passer par le Maroc ?", a: "Oui. Ce qui compte pour le dossier, ce sont les dates d'entrée et de sortie de l'espace Schengen." },
  },
];

type PaysCanada = {
  id: string;
  pays: string;
  habitants: string;
  aeroports: string;
  ou: string;
};

function canada(p: PaysCanada): Guide {
  const slug = `reservation-vol-visa-canada-${p.id}`;
  return {
    key: `fr-canada-visa-itinerary-${p.id}`,
    slug,
    title: `Réservation de vol pour visa canadien depuis ${p.pays}`,
    h1: `Réservation de vol pour un visa de visiteur canadien depuis ${p.pays}`,
    description: `Ce que les ${p.habitants} doivent savoir sur les vols pour une demande de visa de visiteur canadien : frais, biométrie, et comment montrer un itinéraire sans acheter de billet.`,
    intro: `Les ${p.habitants} ont besoin d'un visa de visiteur pour le Canada. Voici ce que demande le dossier pour les vols et comment présenter un itinéraire crédible sans payer un billet avant la décision.`,
    sections: [
      {
        heading: "Le visa de visiteur canadien",
        paragraphs: [
          "Les frais de traitement sont de 100 dollars canadiens par personne, et la plupart des demandeurs paient aussi 85 dollars canadiens pour la biométrie (empreintes et photo) dans un centre de réception des demandes de visa.",
          "Les délais dépendent du pays d'où vous déposez ; IRCC publie l'estimation à jour sur son site.",
        ],
      },
      { heading: `Déposer depuis ${p.pays}`, paragraphs: [p.ou] },
      {
        heading: "L'itinéraire de vol",
        paragraphs: [
          "IRCC classe les détails de vol parmi les documents d'itinéraire facultatifs. Une réservation qui correspond à vos dates montre que le voyage est réel, sans acheter de billet avant la décision.",
          `Depuis ${p.pays}, les vols partent généralement de ${p.aeroports}. Vérifiez que votre nom est identique à celui du passeport.`,
          DELAI,
          VERIFIER,
        ],
      },
    ],
    faqs: [
      {
        q: "Une réservation de vol est-elle obligatoire pour le visa canadien ?",
        a: "Non, IRCC la considère comme facultative. Une réservation qui correspond à vos dates peut quand même aider à montrer que votre projet est réel.",
      },
    ],
    sources: [SRC_IRCC],
    checked: CHECKED,
  };
}

const CANADA: PaysCanada[] = [
  { id: "maroc", pays: "le Maroc", habitants: "Marocains", aeroports: "Casablanca ou Marrakech", ou: "Les Marocains déposent en ligne auprès d'IRCC puis donnent leurs données biométriques dans un centre de réception des demandes de visa au Maroc." },
  { id: "algerie", pays: "l'Algérie", habitants: "Algériens", aeroports: "Alger ou Oran", ou: "Les Algériens déposent en ligne auprès d'IRCC puis donnent leurs données biométriques dans un centre de réception des demandes de visa à Alger." },
  { id: "tunisie", pays: "la Tunisie", habitants: "Tunisiens", aeroports: "Tunis", ou: "Les Tunisiens déposent en ligne auprès d'IRCC puis donnent leurs données biométriques au centre de réception des demandes de visa de Tunis." },
  { id: "senegal", pays: "le Sénégal", habitants: "Sénégalais", aeroports: "Dakar", ou: "Les Sénégalais déposent en ligne auprès d'IRCC puis donnent leurs données biométriques au centre de réception des demandes de visa de Dakar." },
  { id: "cote-d-ivoire", pays: "la Côte d'Ivoire", habitants: "Ivoiriens", aeroports: "Abidjan", ou: "Les Ivoiriens déposent en ligne auprès d'IRCC puis donnent leurs données biométriques au centre de réception des demandes de visa d'Abidjan." },
  { id: "cameroun", pays: "le Cameroun", habitants: "Camerounais", aeroports: "Douala ou Yaoundé", ou: "Les Camerounais déposent en ligne auprès d'IRCC puis donnent leurs données biométriques dans un centre de réception des demandes de visa au Cameroun." },
];

export const FR_VISA_AFRIQUE_GUIDES: Guide[] = [...SCHENGEN.map(schengen), ...CANADA.map(canada)];
