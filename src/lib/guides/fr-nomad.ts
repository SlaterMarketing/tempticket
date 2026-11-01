/**
 * French digital nomad visa guides. Same facts and official sources as
 * en-nomad.ts (checked 2026-11-01), translated. Keys match the English pages
 * so hreflang links them.
 */

import { DELAI, VERIFIER } from "./fr";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Nomade = {
  id: string;
  slug: string;
  pays: string;
  /** "en Thaïlande", "au Japon"... */
  en: string;
  /** "de Thaïlande", "du Japon"... */
  de: string;
  programme: string;
  revenus: string;
  duree: string;
  faits: string[];
  arrivee: string;
  faq: GuideFaq;
  sources: GuideSource[];
};

const EN_VISITEUR =
  "Si vous arrivez comme visiteur avant d'avoir obtenu votre titre, vous êtes un touriste comme un autre à l'enregistrement : la compagnie peut demander à un passager en aller simple une preuve de sortie dans la durée de séjour autorisée. Une réservation temporaire comble ce vide sans acheter un vol que vous ne prendrez pas.";

const anglais = (label: string, url: string): GuideSource => ({ label: `${label} (en anglais)`, url });

const NOMADES: Nomade[] = [
  {
    id: "thailand", slug: "visa-nomade-digital-thailande", pays: "Thaïlande", en: "en Thaïlande", de: "de Thaïlande",
    programme: "Destination Thailand Visa (DTV)",
    revenus: "Fonds de 500 000 bahts (environ 12 000 £)", duree: "5 ans, 180 jours par entrée",
    faits: [
      "Le DTV est valable cinq ans avec entrées multiples et permet 180 jours par entrée, prolongeables une fois sur place jusqu'à 180 jours. Ensuite, vous sortez et revenez avec le même visa.",
      "Il couvre les télétravailleurs, nomades digitaux et freelances (la catégorie « workcation »), les activités de « soft power » thaïlandais comme le Muay Thai ou les cours de cuisine, et les personnes à charge. À l'ambassade de Thaïlande à Londres, les frais sont de 300 £ et il faut justifier d'au moins 500 000 bahts ; les frais varient selon l'ambassade où vous déposez la demande.",
    ],
    arrivee: "Avec le DTV dans votre passeport, vous pouvez entrer en aller simple, puisque le visa lui-même permet de longs séjours. Sans lui, l'entrée sans visa est bien plus courte et les compagnies vérifient le billet de sortie. " + EN_VISITEUR,
    faq: { q: "Puis-je travailler pour des clients thaïlandais avec le DTV ?", a: "La catégorie workcation concerne le travail à distance pour des employeurs ou clients à l'étranger. Travailler pour une entreprise thaïlandaise exige un permis de travail." },
    sources: [anglais("Ambassade de Thaïlande à Londres : Destination Thailand Visa", "https://london.thaiembassy.org/en/page/destination-thailand-visa")],
  },
  {
    id: "japan", slug: "visa-nomade-digital-japon", pays: "Japon", en: "au Japon", de: "du Japon",
    programme: "Nomade digital (Activités désignées)",
    revenus: "10 millions de yens par an", duree: "6 mois, sans prolongation",
    faits: [
      "Le visa nomade digital du Japon exige un revenu annuel d'au moins 10 millions de yens, justifié par des documents fiscaux, de revenus ou d'emploi, et une assurance couvrant décès, blessures et maladie avec au moins 10 millions de yens de couverture médicale.",
      "Le séjour est de six mois et ne peut être ni prolongé ni renouvelé. Votre conjoint ou vos enfants peuvent vous accompagner, avec leur propre assurance.",
    ],
    arrivee: "Le visa est délivré avant le départ, vous pouvez donc voyager avec. Six mois est la limite absolue : prévoyez votre vol de sortie dans ce délai.",
    faq: { q: "Peut-on prolonger le visa nomade digital du Japon ?", a: "Non. C'est six mois sans prolongation, selon le ministère japonais des Affaires étrangères." },
    sources: [anglais("Ministère des Affaires étrangères du Japon : Activités désignées (Nomade digital)", "https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html")],
  },
  {
    id: "spain", slug: "visa-nomade-digital-espagne", pays: "Espagne", en: "en Espagne", de: "d'Espagne",
    programme: "Visa de télétravail international",
    revenus: "200 % du salaire minimum mensuel espagnol", duree: "Jusqu'à 1 an, puis carte de séjour",
    faits: [
      "Il faut au moins 200 % du salaire minimum mensuel espagnol, plus 75 % pour le premier membre de la famille et 25 % pour chaque membre supplémentaire. Le travail doit se faire à distance pour une entreprise hors d'Espagne ; les indépendants peuvent travailler pour des clients espagnols jusqu'à 20 % de leur activité.",
      "Il faut un diplôme ou trois ans d'expérience dans votre domaine, au moins trois mois de travail pour l'entreprise étrangère, une assurance santé et un casier judiciaire vierge. Le visa vaut jusqu'à un an, après quoi vous pouvez demander une carte de séjour en Espagne.",
    ],
    arrivee: "Une fois le visa délivré, vous pouvez entrer en aller simple. L'Espagne fait partie de l'espace Schengen : avant cela, vous êtes un visiteur de court séjour limité à 90 jours sur 180.",
    faq: { q: "Quel revenu faut-il pour le visa nomade digital espagnol ?", a: "Au moins 200 % du salaire minimum mensuel espagnol, davantage avec la famille. Vérifiez le montant actuel du salaire minimum, qui évolue." },
    sources: [anglais("Consulat général d'Espagne à Londres : Digital Nomad Visa", "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx")],
  },
  {
    id: "portugal", slug: "visa-nomade-digital-portugal", pays: "Portugal", en: "au Portugal", de: "du Portugal",
    programme: "Visa de séjour temporaire pour travail à distance",
    revenus: "4 fois le salaire minimum mensuel portugais", duree: "Séjour temporaire (visa de résidence aussi possible)",
    faits: [
      "Il faut justifier d'un revenu mensuel moyen sur les trois derniers mois d'au moins quatre fois le salaire minimum portugais, et d'une assurance voyage couvrant les soins médicaux et le rapatriement.",
      "Le Portugal propose aussi un visa de résidence pour travail à distance pour ceux qui veulent s'installer plus longtemps.",
    ],
    arrivee: "La liste de pièces du visa de séjour temporaire demande une copie du billet de retour : c'est l'un des rares visas nomades où la réservation retour fait partie du dossier. Les ressortissants des pays de la CPLP, comme le Cap-Vert, sont dispensés de l'assurance et du billet retour.",
    faq: { q: "Faut-il un billet retour pour le visa nomade digital portugais ?", a: "Pour le visa de séjour temporaire, oui : la liste demande une copie du billet retour, sauf pour les ressortissants de la CPLP." },
    sources: [anglais("Ambassade du Portugal à Tokyo : liste des pièces, visa de séjour temporaire pour travail à distance", "https://toquio.embaixadaportugal.mne.gov.pt/images/vistos/checklists/en/estada_temporaria/temporary_stay_visa_for_remote_work_-_digital_nomads.pdf")],
  },
  {
    id: "croatia", slug: "visa-nomade-digital-croatie", pays: "Croatie", en: "en Croatie", de: "de Croatie",
    programme: "Séjour temporaire des nomades digitaux",
    revenus: "3 622,50 € par mois (ou une somme globale)", duree: "Jusqu'à 18 mois",
    faits: [
      "Il faut au moins 2,5 fois le salaire net mensuel moyen croate, soit actuellement 3 622,50 € par mois, plus 10 % par membre de la famille. Vous pouvez aussi justifier d'une épargne de 43 470 € pour 12 mois ou 65 205 € pour 18 mois.",
      "Le séjour dure jusqu'à 18 mois. Vous devez travailler pour un employeur étranger ou votre propre société non croate, avoir une assurance santé et déclarer votre adresse dans les trois jours suivant votre arrivée.",
    ],
    arrivee: "Les ressortissants dispensés de visa peuvent faire la demande en ligne et entrer comme visiteurs ; ceux qui ont besoin d'un visa passent par une ambassade ou un consulat croate. " + EN_VISITEUR,
    faq: { q: "Peut-on prolonger le titre de nomade digital croate ?", a: "Oui, de six mois maximum, si vous le demandez au moins 60 jours avant l'expiration. Une nouvelle demande est possible six mois après la fin." },
    sources: [anglais("Ministère de l'Intérieur croate : séjour temporaire des nomades digitaux", "https://mup.gov.hr/aliens-281621/temporary-stay-of-digital-nomads-286853/286853")],
  },
  {
    id: "malta", slug: "visa-nomade-digital-malte", pays: "Malte", en: "à Malte", de: "de Malte",
    programme: "Nomad Residence Permit",
    revenus: "42 000 € par an (brut)", duree: "1 an, renouvelable",
    faits: [
      "Le revenu brut minimum est de 42 000 € par an pour les demandes déposées depuis le 1er avril 2024. Vous devez travailler à distance pour un employeur étranger, votre propre société étrangère ou des clients étrangers en freelance.",
      "Il faut aussi une assurance santé couvrant l'UE et le Royaume-Uni, un contrat de location ou d'achat à Malte, un extrait de casier judiciaire et une vérification d'antécédents.",
    ],
    arrivee: EN_VISITEUR,
    faq: { q: "Quel revenu pour le Nomad Residence Permit de Malte ?", a: "42 000 € brut par an pour les demandes depuis le 1er avril 2024, selon Residency Malta." },
    sources: [anglais("Residency Malta Agency : conditions du Nomad Residence Permit", "https://nomad.residencymalta.gov.mt/nomad-eligibility/")],
  },
  {
    id: "italy", slug: "visa-nomade-digital-italie", pays: "Italie", en: "en Italie", de: "d'Italie",
    programme: "Visa nomade digital / travailleur à distance",
    revenus: "Plus de 24 780 € par an", duree: "Visa national de long séjour",
    faits: [
      "Votre revenu de l'année précédente doit dépasser le seuil d'exonération des frais de santé publique, indiqué par l'ambassade d'Italie à Ottawa à 24 780 €. Il faut un diplôme, trois ans d'expérience pertinente, ou une qualification plus cinq ans d'expérience, et une assurance santé pour tout le séjour.",
      "Le traitement peut prendre jusqu'à 120 jours pour les nomades digitaux et 90 jours pour les travailleurs à distance.",
    ],
    arrivee: "L'ambassade précise que les séjours de plus de 90 jours relèvent d'un visa national avec billet aller simple, tandis que ceux de 90 jours maximum relèvent d'un visa Schengen avec billet aller-retour.",
    faq: { q: "Puis-je partir en Italie en aller simple avec le visa nomade digital ?", a: "Oui. Pour le visa national de long séjour, l'ambassade parle d'un billet aller simple ; les courts séjours Schengen exigent un aller-retour." },
    sources: [anglais("Ambassade d'Italie à Ottawa : visa nomade digital / travailleur à distance", "https://ambottawa.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/digital-nomad-remote-worker-visa/")],
  },
  {
    id: "hungary", slug: "visa-nomade-digital-hongrie", pays: "Hongrie", en: "en Hongrie", de: "de Hongrie",
    programme: "White Card",
    revenus: "3 000 € net par mois", duree: "1 an, prolongeable une fois",
    faits: [
      "Il faut au moins 3 000 € net par mois pendant les six mois précédant l'entrée, maintenus pendant le séjour, provenant d'un employeur ou d'une société à l'étranger. Vous ne pouvez pas travailler pour des clients hongrois ni détenir de parts dans une société hongroise.",
      "Le titre dure jusqu'à un an et peut être prolongé une fois d'un an, si vous avez passé au moins 90 des 180 jours précédents en Hongrie.",
    ],
    arrivee: "La demande exige un hébergement, une assurance santé et un document de voyage valide ou un billet de sortie : ayez une réservation prête. " + EN_VISITEUR,
    faq: { q: "Combien de temps dure la White Card hongroise ?", a: "Jusqu'à un an, prolongeable une fois d'un an." },
    sources: [anglais("Direction générale hongroise de la police des étrangers : White Card", "https://oif.gov.hu/factsheets/white-card-residency-for-digital-nomads")],
  },
  {
    id: "estonia", slug: "visa-nomade-digital-estonie", pays: "Estonie", en: "en Estonie", de: "d'Estonie",
    programme: "Digital Nomad Visa",
    revenus: "4 500 € net par mois", duree: "Jusqu'à 1 an",
    faits: [
      "Il faut un revenu net d'au moins 4 500 € par mois provenant d'un employeur ou d'une société enregistrée hors d'Estonie, ou principalement de clients étrangers en freelance, et pouvoir travailler de n'importe où.",
      "La demande se fait à l'ambassade d'Estonie la plus proche ; le traitement prend jusqu'à 30 jours.",
    ],
    arrivee: "Le visa est délivré avant le départ. Si vous êtes dispensé de visa et venez d'abord en visite, la règle Schengen des 90 jours sur 180 s'applique jusqu'à son obtention.",
    faq: { q: "Le visa nomade digital estonien, c'est la même chose que l'e-Residency ?", a: "Non. L'e-Residency est une identité numérique pour gérer une société estonienne ; elle ne permet pas de vivre en Estonie. Le visa nomade, si, jusqu'à un an." },
    sources: [anglais("e-Residency (République d'Estonie) : Digital Nomad Visa et e-Residency", "https://www.e-resident.gov.ee/nomadvisa/")],
  },
  {
    id: "montenegro", slug: "visa-nomade-digital-montenegro", pays: "Monténégro", en: "au Monténégro", de: "du Monténégro",
    programme: "Résidence temporaire des nomades digitaux",
    revenus: "Ressources suffisantes (pas de minimum publié)", duree: "Jusqu'à 2 ans, prolongeable une fois",
    faits: [
      "Le titre dure jusqu'à deux ans et peut être prolongé une fois de deux ans maximum. Il faut justifier de ressources, d'un hébergement, d'une assurance santé, d'un casier vierge et d'un contrat montrant que vous travaillez par voie électronique pour une société étrangère ou votre propre société non monténégrine.",
      "La demande se dépose en personne au ministère de l'Intérieur du lieu où vous résidez ; le titre est délivré sous 40 jours.",
    ],
    arrivee: "Vous devez être entré légalement au Monténégro, ce qui pour la plupart des nomades signifie arriver d'abord comme visiteur. " + EN_VISITEUR,
    faq: { q: "Le titre de nomade monténégrin se demande-t-il depuis l'étranger ?", a: "Non : la demande se fait en personne au ministère de l'Intérieur, au Monténégro, après une entrée légale." },
    sources: [anglais("Gouvernement du Monténégro : statut légal des nomades digitaux", "https://digitalnomads.gov.me/article/legal-status-for-nomads")],
  },
  {
    id: "south-korea", slug: "visa-nomade-digital-coree-du-sud", pays: "Corée du Sud", en: "en Corée du Sud", de: "de Corée du Sud",
    programme: "Visa workation (F-1-D)",
    revenus: "2 fois le RNB par habitant coréen (environ 65 800 $)", duree: "1 an, prolongeable 1 an",
    faits: [
      "Il faut un revenu après impôts supérieur au double du revenu national brut par habitant de la Corée de l'année précédente, soit environ 65 800 $ par an selon la référence actuelle, au moins un an d'emploi dans votre entreprise et une assurance maladie de 70 000 € pour tout le séjour.",
      "Le visa est à entrées multiples pendant un an et peut être prolongé jusqu'à un an dans un bureau d'immigration en Corée.",
    ],
    arrivee: "Le F-1-D est délivré par une ambassade ou un consulat de Corée avant le départ. Sans lui, les visiteurs dispensés de visa doivent avoir un billet de sortie ou de retour, selon le ministère britannique des Affaires étrangères.",
    faq: { q: "Quel revenu faut-il pour le visa workation coréen ?", a: "Plus du double du RNB par habitant de la Corée de l'année précédente, après impôts : environ 65 800 $ par an selon le chiffre actuel." },
    sources: [anglais("Consulat général de Corée à Seattle : visa workation F-1-D", "https://overseas.mofa.go.kr/us-seattle-en/brd/m_23042/view.do?seq=41")],
  },
  {
    id: "malaysia", slug: "visa-nomade-digital-malaisie", pays: "Malaisie", en: "en Malaisie", de: "de Malaisie",
    programme: "DE Rantau Nomad Pass",
    revenus: "24 000 $ par an (tech) ou 60 000 $ (hors tech)", duree: "3 à 12 mois, renouvelable jusqu'à 24",
    faits: [
      "Les profils tech doivent gagner au moins 24 000 $ par an ; les autres, 60 000 $. Le pass dure de 3 à 12 mois et peut être renouvelé de 12 mois, jusqu'à 24 mois au total.",
      "Les frais sont de 1 080 ringgits par demandeur et 540 par personne à charge, plus les frais du titre d'immigration et, si MDEC vous parraine, une caution remboursable. Votre passeport doit être valable plus de 14 mois au moment de la demande.",
    ],
    arrivee: "Beaucoup de demandeurs arrivent d'abord comme visiteurs. " + EN_VISITEUR,
    faq: { q: "Qui peut demander le DE Rantau malaisien ?", a: "Toutes les nationalités sauf israélienne, à partir de 18 ans, si le seuil de revenus du secteur est atteint." },
    sources: [anglais("MDEC : FAQ du DE Rantau Pass (version 10)", "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf")],
  },
  {
    id: "indonesia", slug: "visa-nomade-digital-indonesie-bali", pays: "Indonésie", en: "en Indonésie", de: "d'Indonésie",
    programme: "Visa travailleur à distance (E33G)",
    revenus: "60 000 $ par an", duree: "Jusqu'à 1 an",
    faits: [
      "Il faut un revenu d'au moins 60 000 $ par an, un solde bancaire d'au moins 2 000 $ sur les trois derniers mois et un contrat de travail avec une entreprise hors d'Indonésie. Vous ne pouvez ni vendre de biens ou services ni travailler pour des clients indonésiens.",
      "Le visa permet un séjour jusqu'à un an et doit être utilisé pour entrer dans les 90 jours suivant sa délivrance. Les frais officiels sont indiqués à 7 000 000 de roupies pour un an.",
    ],
    arrivee: "Avec le visa travailleur à distance, vous entrez sans le contrôle de billet de sortie qui s'applique au visa à l'arrivée de 30 jours.",
    faq: { q: "Peut-on vivre à Bali avec le visa travailleur à distance ?", a: "Oui, jusqu'à un an, à condition de travailler pour une entreprise hors d'Indonésie et de ne pas vendre de services sur place." },
    sources: [anglais("Direction générale de l'immigration indonésienne : FAQ de l'eVisa officiel", "https://evisa.imigrasi.go.id/front/faq/e076131c-0d39-469b-afaf-75fc66aff923")],
  },
  {
    id: "costa-rica", slug: "visa-nomade-digital-costa-rica", pays: "Costa Rica", en: "au Costa Rica", de: "du Costa Rica",
    programme: "Séjour nomade digital (Estancia)",
    revenus: "3 000 $ par mois (4 000 $ en famille)", duree: "Voir le site officiel",
    faits: [
      "Il faut un revenu d'au moins 3 000 $ par mois provenant de l'extérieur du Costa Rica, ou 4 000 $ par mois pour inclure la famille, converti au taux officiel de la Banque centrale.",
      "Les frais gouvernementaux sont de 100 $, qui doivent arriver intégralement au ministère des Finances ; la banque destinataire prélève 15 $ en plus.",
    ],
    arrivee: "La plupart des nomades arrivent comme touristes pendant le traitement de la demande, et le Costa Rica est réputé pour les compagnies qui vérifient le billet de sortie. " + EN_VISITEUR,
    faq: { q: "Quel revenu pour le visa nomade digital du Costa Rica ?", a: "3 000 $ par mois pour une personne, ou 4 000 $ pour inclure la famille, de sources hors du Costa Rica." },
    sources: [anglais("Visit Costa Rica (ICT) : conditions pour les nomades digitaux", "https://www.visitcostarica.com/digital-nomads/requirements")],
  },
  {
    id: "panama", slug: "visa-nomade-digital-panama", pays: "Panama", en: "au Panama", de: "du Panama",
    programme: "Visa de court séjour pour travailleurs à distance",
    revenus: "36 000 $ par an", duree: "9 mois, prolongeable 9 mois",
    faits: [
      "Il faut un revenu étranger d'au moins 36 000 $ par an (salariés du privé : plus de 3 000 $ par mois) et une assurance santé internationale pour le séjour. Les frais sont de 250 $.",
      "Le visa est accordé pour neuf mois maximum et peut être prolongé de neuf mois.",
    ],
    arrivee: EN_VISITEUR,
    faq: { q: "Combien de temps rester au Panama comme travailleur à distance ?", a: "Neuf mois, prolongeables une fois de neuf mois." },
    sources: [{ label: "ProPanamá (gouvernement du Panama) : visa pour nomades digitaux (en espagnol)", url: "https://propanama.gob.pa/visa-para-nomadas-digitales/" }],
  },
  {
    id: "barbados", slug: "visa-nomade-digital-barbade", pays: "Barbade", en: "à la Barbade", de: "de la Barbade",
    programme: "Welcome Stamp",
    revenus: "50 000 $ par an", duree: "12 mois, renouvelable sur demande",
    faits: [
      "Le Welcome Stamp permet de télétravailler depuis la Barbade jusqu'à 12 mois si vous gagnez au moins 50 000 $ par an. Les frais sont de 2 000 $ par personne et 3 000 $ par famille, payés après approbation.",
      "Les revenus à distance ne sont pas imposés à la Barbade, mais la TVA de 17,5 % s'applique aux dépenses locales.",
    ],
    arrivee: "La Barbade exige des visiteurs un billet de sortie ou de retour pour entrer, selon le ministère britannique des Affaires étrangères : si vous arrivez avant l'approbation de votre Welcome Stamp, il vous faut cette réservation.",
    faq: { q: "Le Welcome Stamp de la Barbade est-il imposé ?", a: "Les revenus à distance ne sont pas soumis à l'impôt sur le revenu à la Barbade, mais la TVA s'applique aux achats." },
    sources: [
      anglais("Visit Barbados : Barbados Welcome Stamp de 12 mois", "https://www.visitbarbados.org/barbados-welcome-stamp"),
      anglais("Ministère britannique des Affaires étrangères : conditions d'entrée à la Barbade", "https://www.gov.uk/foreign-travel-advice/barbados/entry-requirements"),
    ],
  },
  {
    id: "mauritius", slug: "visa-nomade-digital-maurice", pays: "Maurice", en: "à Maurice", de: "de Maurice",
    programme: "Premium Visa",
    revenus: "Voir EDB Mauritius", duree: "1 an, renouvelable",
    faits: [
      "Le Premium Visa permet de séjourner à Maurice un an, renouvelable, et il est gratuit. Les demandes passent par l'Economic Development Board.",
    ],
    arrivee: "Les visiteurs de Maurice doivent pouvoir présenter une preuve de voyage de sortie ou de retour, selon le ministère britannique des Affaires étrangères : ayez une réservation si vous arrivez avant l'octroi du Premium Visa.",
    faq: { q: "Combien coûte le Premium Visa de Maurice ?", a: "Rien : le Bureau des passeports et de l'immigration indique qu'il est gratuit." },
    sources: [
      anglais("Bureau des passeports et de l'immigration de Maurice : Premium Visa", "https://passport.govmu.org/passport/?page_id=595"),
      anglais("Ministère britannique des Affaires étrangères : conditions d'entrée à Maurice", "https://www.gov.uk/foreign-travel-advice/mauritius/entry-requirements"),
    ],
  },
];

function build(n: Nomade): Guide {
  return {
    key: `digital-nomad-visa-${n.id}`,
    slug: n.slug,
    title: `Visa Nomade Digital ${n.de} : Revenus, Durée et Arrivée en Aller Simple`,
    h1: `Visa nomade digital ${n.de} : ${n.programme}`,
    description: `${n.programme} : revenus exigés (${n.revenus}), durée, conditions et ce qu'il faut présenter si vous partez en aller simple.`,
    intro: `Le programme ${n.programme} permet aux télétravailleurs de s'installer légalement ${n.en}. Voici les conditions vérifiées auprès des sources officielles, et comment se passe l'arrivée pour les nomades qui voyagent souvent en aller simple.`,
    sections: [
      { heading: "Les conditions", paragraphs: n.faits },
      { heading: "Arriver en aller simple", paragraphs: [n.arrivee, DELAI, VERIFIER] },
    ],
    faqs: [n.faq],
    sources: n.sources,
    checked: CHECKED,
  };
}

export const FR_NOMAD_GUIDES: Guide[] = [
  {
    key: "digital-nomad-visas-compared",
    slug: "visas-nomade-digital-comparatif",
    title: "Visas Nomade Digital : Comparatif des Revenus et Durées par Pays",
    h1: "Visas nomade digital : le comparatif",
    description:
      "Revenus exigés et durée de 17 visas nomade digital, du DTV thaïlandais à l'Espagne, au Portugal, au Japon et au Costa Rica, vérifiés auprès des sources officielles.",
    intro:
      "Les visas nomade digital varient énormément : certains demandent quelques milliers d'euros par mois, d'autres 10 millions de yens par an ; certains durent six mois, d'autres cinq ans. Ce tableau compare les principaux, chaque chiffre venant de la page du gouvernement ou de l'ambassade citée dans le guide du pays.",
    table: {
      caption: "Visas nomade digital : revenus et durée",
      headers: ["Pays", "Programme", "Revenus ou fonds", "Durée"],
      rows: NOMADES.map((n) => [n.pays, n.programme, n.revenus, n.duree]),
      rowLinks: NOMADES.map((n) => n.slug),
      note: "Les seuils changent, souvent chaque année. Vérifiez la source officielle dans le guide de chaque pays avant de déposer votre demande.",
    },
    sections: [
      {
        heading: "Ce dont personne ne parle : y arriver",
        paragraphs: [
          "La plupart des nomades voyagent en aller simple, et beaucoup arrivent comme visiteurs avant l'approbation de leur titre, ou font la demande sur place. À ce moment-là, la compagnie vous traite comme un touriste et peut demander une preuve de sortie. Le visa de séjour temporaire portugais demande même un billet retour dans le dossier.",
          DELAI,
          VERIFIER,
        ],
      },
    ],
    faqs: [
      { q: "Quel visa nomade digital demande le revenu le plus bas ?", a: "Parmi ceux-ci, le DE Rantau malaisien pour la tech (24 000 $ par an) et l'Italie (plus de 24 780 € par an) sont les plus bas, mais chacun a d'autres conditions. Le DTV thaïlandais demande une épargne plutôt qu'un revenu." },
      { q: "Lequel dure le plus longtemps ?", a: "Le DTV thaïlandais est valable cinq ans, avec 180 jours par entrée." },
    ],
    sources: NOMADES.flatMap((n) => n.sources.slice(0, 1)),
    checked: CHECKED,
  },
  ...NOMADES.map(build),
];
