/**
 * French visa run guides. Same facts and official sources as en-visa-runs.ts
 * (checked 2026-11-01), translated. The stay lengths come from the UK Foreign
 * Office for British passports, so pages say so and tell readers with other
 * passports to check their own rules. Keys match the English pages.
 */

import { DELAI, VERIFIER } from "./fr";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nom: string): GuideSource => ({
  label: `Ministère britannique des Affaires étrangères : conditions d'entrée (${nom}) (en anglais)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

type Run = {
  id: string;
  slug: string;
  pays: string;
  /** "en Thaïlande", "au Mexique", "dans l'espace Schengen"... */
  en: string;
  /** "de Thaïlande", "du Mexique"... */
  de: string;
  sejour: string;
  remise: string;
  regles: string[];
  sorties: string;
  retour: string;
  alternative?: string;
  faq: GuideFaq;
  sources: GuideSource[];
  general?: boolean;
};

const PRUDENCE =
  "C'est l'agent d'immigration qui décide de chaque entrée. Les allers-retours enchaînés avec quelques heures seulement hors du pays sont ce qui attire les questions ou les refus : restez dehors un vrai moment, ayez une preuve de ressources et d'hébergement, et soyez honnête sur vos projets.";

const PASSEPORT =
  "Les durées de cette page sont celles indiquées par le ministère britannique des Affaires étrangères pour les passeports britanniques. Avec un passeport français, belge, suisse, canadien ou autre, elles peuvent être différentes : vérifiez sur le site officiel d'immigration du pays ou auprès de son ambassade avant de planifier la sortie.";

const RUNS: Run[] = [
  {
    id: "thailand", slug: "visa-run-thailande", pays: "Thaïlande", en: "en Thaïlande", de: "de Thaïlande",
    sejour: "30 jours sans visa", remise: "Nouvelle entrée, à la discrétion de l'agent",
    regles: [
      "Pour les visiteurs britanniques, l'entrée sans visa en Thaïlande permet désormais jusqu'à 30 jours, pour le tourisme uniquement. L'immigration peut demander une preuve de ressources (10 000 bahts par personne, 20 000 par famille) et de voyage de sortie ou de retour, et tout le monde doit remplir la carte d'arrivée numérique TDAC dans les trois jours précédant l'arrivée.",
    ],
    sorties: "Kuala Lumpur ou Penang en avion, Vientiane par le pont de l'Amitié, Phnom Penh ou Siem Reap",
    retour: "Revenir en Thaïlande en avion compte comme une nouvelle arrivée : la compagnie voudra voir un vol de sortie dans vos 30 nouveaux jours. Réservez-le avant de partir.",
    alternative: "Pour rester plusieurs mois, le Destination Thailand Visa (DTV) permet 180 jours par entrée pendant cinq ans et évite les sorties.",
    faq: { q: "Combien de visa runs puis-je faire en Thaïlande ?", a: "Il n'y a pas de nombre fixe, mais l'agent peut refuser l'entrée sans visa s'il pense que vous vivez en Thaïlande. Pour les longs séjours, le DTV ou un autre visa est plus sûr." },
    sources: [fcdo("thailand", "Thaïlande"), { label: "Ambassade de Thaïlande à Londres : Destination Thailand Visa (en anglais)", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" }],
  },
  {
    id: "vietnam", slug: "visa-run-vietnam", pays: "Vietnam", en: "au Vietnam", de: "du Vietnam",
    sejour: "45 jours sans visa, ou e-visa de 90 jours", remise: "Nouvelle entrée ; l'e-visa est à entrées multiples",
    regles: [
      "Les visiteurs britanniques peuvent entrer au Vietnam sans visa jusqu'à 45 jours, ou obtenir un e-visa de 90 jours à entrées multiples. L'e-visa n'est valable qu'aux points d'entrée et de sortie choisis lors de la demande.",
    ],
    sorties: "Phnom Penh ou Siem Reap, Vientiane ou Luang Prabang, Bangkok, Kuala Lumpur",
    retour: "En revenant par avion, la compagnie peut vérifier que vous repartirez dans votre nouveau séjour. Si vous passez par la route avec un e-visa, vérifiez que ce poste figure sur votre demande.",
    alternative: "Un e-visa de 90 jours à entrées multiples rend souvent la sortie inutile.",
    faq: { q: "Faut-il un visa run avec l'e-visa vietnamien ?", a: "Pas pendant ses 90 jours, puisqu'il est à entrées multiples. Il suffit de sortir et d'entrer par les points indiqués dessus." },
    sources: [fcdo("vietnam", "Vietnam")],
  },
  {
    id: "malaysia", slug: "visa-run-malaisie", pays: "Malaisie", en: "en Malaisie", de: "de Malaisie",
    sejour: "Normalement 90 jours à l'arrivée", remise: "Nouvelle entrée, à la discrétion de l'agent",
    regles: [
      "Les visiteurs britanniques reçoivent normalement 90 jours à l'arrivée sans visa. Remplissez la Malaysia Digital Arrival Card avant le départ ; la compagnie peut la demander à l'enregistrement.",
    ],
    sorties: "Singapour (en bus par la chaussée ou en vol court), Bangkok, Bali, Medan",
    retour: "Une sortie vers Singapour par la route est courante. En revenant en avion, ayez un vol de sortie dans vos 90 prochains jours.",
    alternative: "Les télétravailleurs qui restent plus longtemps peuvent demander le DE Rantau, valable de 3 à 12 mois et renouvelable jusqu'à 24.",
    faq: { q: "Un aller-retour à Singapour remet-il à zéro mon séjour en Malaisie ?", a: "Revenir en Malaisie est une nouvelle entrée et l'agent décide de la durée. Les sorties courtes et fréquentes peuvent susciter des questions." },
    sources: [fcdo("malaysia", "Malaisie"), { label: "MDEC : FAQ du DE Rantau Pass (en anglais)", url: "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf" }],
  },
  {
    id: "bali-indonesia", slug: "visa-run-bali-indonesie", pays: "Indonésie (Bali)", en: "à Bali (Indonésie)", de: "de Bali (Indonésie)",
    sejour: "Visa à l'arrivée de 30 jours", remise: "Nouveau visa à chaque entrée",
    regles: [
      "Pour les visiteurs britanniques, le visa à l'arrivée dure 30 jours, coûte 500 000 roupies et ne permet qu'une entrée. La preuve d'un voyage de sortie ou de retour est une condition pour l'obtenir, et Bali perçoit en plus une taxe touristique de 150 000 roupies.",
    ],
    sorties: "Singapour, Kuala Lumpur, Perth, Darwin",
    retour: "Chaque nouvelle entrée exige un nouveau visa à l'arrivée et donc une preuve de sortie. Les compagnies le vérifient au comptoir avant le vol retour vers Bali.",
    alternative: "Les télétravailleurs qui restent jusqu'à un an peuvent regarder le visa travailleur à distance E33G.",
    faq: { q: "Faut-il un billet de sortie après un visa run à Bali ?", a: "Oui. Chaque nouveau visa à l'arrivée exige une preuve de voyage de sortie ou de retour." },
    sources: [fcdo("indonesia", "Indonésie")],
  },
  {
    id: "philippines", slug: "visa-run-philippines", pays: "Philippines", en: "aux Philippines", de: "des Philippines",
    sejour: "30 jours sans visa", remise: "Mieux vaut prolonger sur place",
    regles: [
      "Les visiteurs britanniques peuvent rester jusqu'à 30 jours sans visa et demander une prolongation sur place. La plupart sont censés avoir une preuve de voyage de retour ou de sortie, et tous doivent s'enregistrer sur eTravel.",
    ],
    sorties: "Hong Kong, Taipei, Kota Kinabalu, Singapour",
    retour: "Comme on peut prolonger aux Philippines, la sortie est souvent inutile. Si vous sortez et revenez, le contrôle du billet de sortie s'applique à nouveau.",
    faq: { q: "Dois-je quitter les Philippines au bout de 30 jours ?", a: "Pas forcément. Vous pouvez demander une prolongation sur place." },
    sources: [fcdo("philippines", "Philippines")],
  },
  {
    id: "mexico", slug: "visa-run-mexique", pays: "Mexique", en: "au Mexique", de: "du Mexique",
    sejour: "Jusqu'à 180 jours, selon le tampon", remise: "Nouveau tampon ; durée à la discrétion de l'agent",
    regles: [
      "Les touristes britanniques n'ont pas besoin de visa. Le passeport est tamponné avec le nombre de jours autorisés, jusqu'à 180. Au contrôle, on peut vous demander un billet de retour ou de sortie et des fonds suffisants pour le séjour. Les arrivées par la route remplissent un formulaire migratoire en ligne.",
    ],
    sorties: "Belize City, Guatemala City, La Havane, ou une ville des États-Unis si vous pouvez y entrer",
    retour: "L'agent mexicain décide du nombre de jours, et une réservation de retour ou de sortie correspondant à la durée demandée aide à l'obtenir.",
    faq: { q: "Peut-on obtenir 180 jours au Mexique ?", a: "C'est possible, mais le tampon indique ce que l'agent accorde. Un billet de retour ou de sortie et une preuve de fonds appuient la demande." },
    sources: [fcdo("mexico", "Mexique")],
  },
  {
    id: "costa-rica", slug: "visa-run-costa-rica", pays: "Costa Rica", en: "au Costa Rica", de: "du Costa Rica",
    sejour: "Jusqu'à 180 jours sans visa", remise: "Nouvelle entrée",
    regles: [
      "Les visiteurs britanniques peuvent rester jusqu'à 180 jours grâce à l'exemption de visa touristique du Costa Rica. En partant par avion, une taxe de départ de 29 $ peut s'appliquer.",
    ],
    sorties: "Panama (Paso Canoas ou vol vers Panama City), Nicaragua, San Andrés",
    retour: "La sortie classique est vers le Panama par la route, mais le Panama peut demander un billet de retour ou de sortie et 1 000 $ de fonds, surtout aux arrivées terrestres depuis le Costa Rica de non-résidents. Au retour, le Costa Rica attend aussi une preuve de sortie.",
    faq: { q: "Le visa run vers le Panama depuis le Costa Rica est-il facile ?", a: "Il est courant, mais le Panama peut demander un billet de retour ou de sortie et une preuve de 1 000 $ ou une carte de crédit, surtout aux arrivées terrestres depuis le Costa Rica." },
    sources: [fcdo("costa-rica", "Costa Rica"), fcdo("panama", "Panama")],
  },
  {
    id: "panama", slug: "visa-run-panama", pays: "Panama", en: "au Panama", de: "du Panama",
    sejour: "Jusqu'à 3 mois", remise: "Nouvelle entrée",
    regles: [
      "Les visiteurs britanniques peuvent rester jusqu'à trois mois sans visa, par voie terrestre ou aérienne. À la frontière, on peut demander un billet de retour ou de sortie et une preuve d'au moins 1 000 $ ou une carte de crédit. Le passeport doit être valable six mois après le départ et avoir une page vierge.",
    ],
    sorties: "San José, Bogotá, Medellín, Carthagène",
    retour: "Ayez une réservation de sortie pour revenir, surtout si vous rentrez par la route depuis le Costa Rica.",
    faq: { q: "Combien d'argent faut-il pour entrer au Panama ?", a: "On peut vous demander au moins 1 000 $ ou une carte de crédit à la frontière." },
    sources: [fcdo("panama", "Panama")],
  },
  {
    id: "colombia", slug: "visa-run-colombie", pays: "Colombie", en: "en Colombie", de: "de Colombie", general: true,
    sejour: "90 jours (max. 180 sur 12 mois)", remise: "Non : plafond de 180 jours par an",
    regles: [
      "Les visiteurs britanniques peuvent rester jusqu'à 90 jours, à la discrétion de l'agent, mais pas plus de 180 jours sur toute période de 12 mois. Il faut pouvoir présenter un billet de sortie ou de retour dans ces 90 jours. Le formulaire Check-MIG est facultatif mais accélère le passage.",
    ],
    sorties: "Panama City, Quito, Lima, Aruba",
    retour: "Sortir ne contourne pas le plafond annuel de 180 jours. Dans cette limite, chaque entrée exige un billet de sortie à moins de 90 jours.",
    faq: { q: "Puis-je rester plus longtemps en Colombie en sortant et en revenant ?", a: "Seulement jusqu'à 180 jours sur toute période de 12 mois en tant que visiteur. Au-delà, il faut un autre visa." },
    sources: [fcdo("colombia", "Colombie")],
  },
  {
    id: "peru", slug: "visa-run-perou", pays: "Pérou", en: "au Pérou", de: "du Pérou", general: true,
    sejour: "90 jours sur 180 (max. 183 par an)", remise: "Non : plafonné",
    regles: [
      "Les visiteurs britanniques reçoivent normalement jusqu'à 90 jours sur une période de 180, comptés depuis la première entrée, et l'agent peut accorder au maximum 183 jours sur 365. Un dépassement entraîne une amende et une possible détention.",
    ],
    sorties: "La Paz, Santiago, Arica, Quito, Bogotá",
    retour: "Revenir ne remet pas à zéro le compte des 90 jours sur 180. La compagnie peut quand même demander une preuve de sortie pour un vol aller simple.",
    faq: { q: "Sortir du Pérou remet-il mes jours à zéro ?", a: "Non. Les limites de 90 sur 180 et 183 sur 365 comptent tout votre temps au Pérou." },
    sources: [fcdo("peru", "Pérou")],
  },
  {
    id: "schengen", slug: "visa-run-schengen", pays: "Espace Schengen", en: "dans l'espace Schengen", de: "de l'espace Schengen", general: true,
    sejour: "90 jours sur toute période de 180", remise: "Non : fenêtre glissante de 180 jours",
    regles: [
      "Les visiteurs de court séjour peuvent passer 90 jours sur toute période de 180 jours, tous pays Schengen confondus. Sortir un week-end ne remet rien à zéro : le calcul regarde 180 jours en arrière à partir de chaque jour de présence.",
      "Depuis le 12 octobre 2025, le système d'entrée/sortie (EES) enregistre les entrées et sorties électroniquement au lieu des tampons, et il est pleinement opérationnel depuis le 10 avril 2026 : le calcul est automatique.",
      "Cette limite ne concerne pas les citoyens de l'UE, de l'EEE et de la Suisse, qui circulent librement.",
    ],
    sorties: "Pays hors Schengen comme le Royaume-Uni, l'Irlande, l'Albanie, le Monténégro, la Serbie, la Turquie, la Géorgie ou le Maroc",
    retour: "Un « visa run » Schengen est en réalité une pause : passez ce temps dehors et revenez quand vous avez des jours disponibles. Les garde-frontières peuvent demander comment vous repartirez.",
    faq: { q: "Peut-on faire un visa run pour remettre à zéro ses 90 jours Schengen ?", a: "Non. Les 90 jours se comptent sur une fenêtre glissante de 180 jours, et le temps passé dehors n'aide qu'en laissant les anciens jours sortir du calcul." },
    sources: [
      { label: "SEAE : ce qu'il faut faire et ne pas faire avec un visa Schengen (règle des 90/180) (en anglais)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
      { label: "Commission européenne : l'EES est entré en service le 12 octobre 2025 (en anglais)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
    ],
  },
  {
    id: "albania", slug: "visa-run-albanie", pays: "Albanie", en: "en Albanie", de: "d'Albanie",
    sejour: "90 jours sur 180", remise: "Compte 90/180 séparé",
    regles: [
      "Les visiteurs britanniques peuvent rester en Albanie jusqu'à 90 jours sur 180, un compte séparé de celui de Schengen, ce qui en fait un endroit prisé pour la pause Schengen.",
    ],
    sorties: "Monténégro, Macédoine du Nord, Kosovo, le ferry vers l'Italie ou la Grèce",
    retour: "Ferries et bus permettent d'arriver et de partir sans prendre l'avion. Si vous arrivez en avion en aller simple, prévoyez une sortie dans les 90 jours.",
    faq: { q: "L'Albanie convient-elle pour la pause Schengen ?", a: "Oui. Sa limite de 90 jours sur 180 est indépendante de celle de Schengen." },
    sources: [fcdo("albania", "Albanie")],
  },
  {
    id: "turkey", slug: "visa-run-turquie", pays: "Turquie", en: "en Turquie", de: "de Turquie",
    sejour: "90 jours sur 180", remise: "Compte 90/180 séparé",
    regles: [
      "Les visiteurs britanniques peuvent rester en Turquie jusqu'à 90 jours sur toute période de 180, indépendamment de Schengen. Le passeport doit être valable 150 jours à compter de l'arrivée et avoir une page vierge.",
    ],
    sorties: "Tbilissi, Athènes, Sofia, Larnaca",
    retour: "Les correspondances d'Istanbul permettent de réserver facilement un vol de sortie vers n'importe où.",
    faq: { q: "La Turquie compte-t-elle dans les jours Schengen ?", a: "Non. Elle a sa propre limite de 90 jours sur 180." },
    sources: [fcdo("turkey", "Turquie")],
  },
  {
    id: "georgia", slug: "visa-run-georgie", pays: "Géorgie", en: "en Géorgie", de: "de Géorgie",
    sejour: "Jusqu'à 1 an", remise: "Rarement nécessaire",
    regles: [
      "Les visiteurs britanniques peuvent rester en Géorgie jusqu'à un an sans visa. Tous les visiteurs doivent avoir une assurance santé et accident, ou des fonds pour couvrir soins et rapatriement.",
    ],
    sorties: "Erevan, Istanbul, Bakou",
    retour: "Avec un an sans visa, les sorties sont rarement nécessaires. En arrivant en aller simple, la compagnie peut quand même demander comment vous repartirez.",
    faq: { q: "Faut-il un visa run en Géorgie ?", a: "En général non : les visiteurs britanniques peuvent rester jusqu'à un an." },
    sources: [fcdo("georgia", "Géorgie")],
  },
  {
    id: "south-korea", slug: "visa-run-coree-du-sud", pays: "Corée du Sud", en: "en Corée du Sud", de: "de Corée du Sud",
    sejour: "90 jours", remise: "Nouvelle entrée, à la discrétion de l'agent",
    regles: [
      "Les visiteurs britanniques peuvent rester jusqu'à 90 jours et doivent avoir un billet de sortie ou de retour. Ils sont exemptés de K-ETA jusqu'au 31 décembre 2026 et doivent remplir une carte d'arrivée.",
    ],
    sorties: "Fukuoka (y compris en ferry depuis Busan), Osaka, Tokyo, Taipei",
    retour: "Chaque entrée exige un billet de sortie ou de retour : réservez la sortie avant de revenir.",
    faq: { q: "Peut-on faire un visa run de la Corée vers le Japon ?", a: "Beaucoup le font, mais chaque retour en Corée est une nouvelle entrée à la discrétion de l'agent et exige un billet de sortie ou de retour." },
    sources: [fcdo("south-korea", "Corée du Sud")],
  },
  {
    id: "central-america-ca4", slug: "visa-run-amerique-centrale-ca4", pays: "Amérique centrale (CA-4)", en: "en Amérique centrale (CA-4)", de: "d'Amérique centrale (CA-4)", general: true,
    sejour: "90 jours partagés entre 4 pays", remise: "Seulement en quittant la zone CA-4",
    regles: [
      "Le Guatemala, le Salvador, le Honduras et le Nicaragua forment la zone CA-4. Pour les visiteurs britanniques, les 90 jours couvrent ensemble le Guatemala, le Salvador et le Nicaragua et ne redémarrent pas à leurs frontières. Le Nicaragua prévient que l'entrée peut être refusée sans billet de sortie.",
    ],
    sorties: "Mexique, Belize ou Costa Rica",
    retour: "Passer d'un pays CA-4 à un autre n'est pas un visa run. Quittez la zone et, au retour, ayez un billet de sortie de la région.",
    faq: { q: "Passer du Guatemala au Salvador remet-il mes jours à zéro ?", a: "Non. Les pays CA-4 partagent une seule période de 90 jours." },
    sources: [fcdo("guatemala", "Guatemala"), fcdo("el-salvador", "Salvador"), fcdo("nicaragua", "Nicaragua")],
  },
];

function build(r: Run): Guide {
  return {
    key: `visa-run-${r.id}`,
    slug: r.slug,
    title: `Visa Run ${r.en} : Règles, Sorties et Billet de Sortie`,
    h1: `Visa run ${r.en} : ce que permettent les règles`,
    description: `Combien de temps vous pouvez rester ${r.en}, si sortir et revenir remet quelque chose à zéro, les sorties habituelles et le billet de sortie qu'il vous faudra au retour.`,
    intro: `Un visa run consiste à quitter un pays puis à y revenir pour commencer un nouveau séjour. Que cela marche ${r.en} dépend de la façon dont les limites sont comptées. Voici ce que disent les sources officielles.`,
    sections: [
      { heading: "Les règles", paragraphs: [...r.regles, ...(r.alternative ? [r.alternative] : []), ...(r.general ? [] : [PASSEPORT])] },
      { heading: "Où vont les voyageurs", paragraphs: [`Les sorties les plus courantes : ${r.sorties}.`, PRUDENCE] },
      { heading: "Au retour : le billet de sortie", paragraphs: [r.retour, DELAI, VERIFIER] },
    ],
    faqs: [r.faq],
    sources: r.sources,
    checked: CHECKED,
  };
}

export const FR_VISA_RUN_GUIDES: Guide[] = [
  {
    key: "visa-runs-explained",
    slug: "visa-runs-expliques",
    title: "Visa Runs Expliqués : Quels Pays Remettent le Séjour à Zéro",
    h1: "Visa runs et border runs : quels pays remettent votre séjour à zéro",
    description:
      "Où un visa run ouvre un nouveau séjour et où les limites glissantes comme 90 jours sur 180 le rendent inutile, avec le billet de sortie qu'il faut à chaque retour.",
    intro:
      "Certains pays comptent chaque entrée séparément : sortir et revenir ouvre un nouveau séjour, à la discrétion de l'agent. D'autres appliquent des plafonds glissants ou annuels, et là, sortir ne sert à rien. Ce tableau fait le point avec les données officielles du gouvernement britannique pour les passeports britanniques ; avec un autre passeport, les durées peuvent varier.",
    table: {
      caption: "Visa runs par pays",
      headers: ["Pays", "Séjour sans visa", "Sortir remet-il à zéro ?"],
      rows: RUNS.map((r) => [r.pays, r.sejour, r.remise]),
      rowLinks: RUNS.map((r) => r.slug),
      note: "Pour les passeports britanniques, d'après GOV.UK et des sources de l'UE. L'agent décide de chaque entrée.",
    },
    sections: [
      {
        heading: "La règle valable partout",
        paragraphs: [
          "Chaque nouvelle entrée est une nouvelle arrivée, et la compagnie vous traite comme un passager en aller simple si vous n'avez pas de vol de sortie. Réservez le trajet de sortie avant de revenir.",
          PRUDENCE,
          DELAI,
          VERIFIER,
        ],
      },
    ],
    faqs: [
      { q: "Les visa runs sont-ils légaux ?", a: "Sortir et revenir est légal là où les règles comptent chaque entrée séparément, mais l'agent peut refuser l'entrée s'il pense que vous vivez ou travaillez dans le pays sous couvert de tourisme." },
    ],
    sources: RUNS.flatMap((r) => r.sources.slice(0, 1)),
    checked: CHECKED,
  },
  ...RUNS.map(build),
];
