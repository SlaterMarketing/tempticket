/**
 * French guides on official entry schemes (ETIAS, EES, ETAs, arrival cards,
 * transit visas, ESTA). Same facts and official sources as en-official.ts
 * (checked 2026-11-01), translated. Keys match the English pages.
 */

import { DELAI, VERIFIER } from "./fr";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nom: string): GuideSource => ({
  label: `Ministère britannique des Affaires étrangères : conditions d'entrée (${nom}) (en anglais)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

const PASSEPORT =
  "Les durées de séjour indiquées par le ministère britannique des Affaires étrangères valent pour les passeports britanniques. Avec un autre passeport, elles peuvent différer : vérifiez sur le site officiel d'immigration du pays.";

const UE =
  "Les citoyens de l'UE, de l'EEE et de la Suisse ne sont pas concernés : ce dispositif vise les ressortissants de pays tiers, par exemple les voyageurs canadiens ou, pour l'EES, ceux qui ont besoin d'un visa Schengen.";

export const FR_OFFICIAL_GUIDES: Guide[] = [
  {
    key: "etias-explained",
    slug: "etias-autorisation-voyage-europe",
    title: "ETIAS Expliqué : Prix, Qui Doit le Demander et Date de Lancement",
    h1: "ETIAS : la nouvelle autorisation de voyage pour l'Europe",
    description: "Ce qu'est l'ETIAS, les frais de 20 €, qui en est dispensé, quand l'UE prévoit son lancement et comment il s'articule avec le billet retour et la règle des 90 jours.",
    intro: "L'ETIAS est une autorisation de voyage en ligne que les visiteurs dispensés de visa devront obtenir avant de se rendre dans la plupart des pays européens, sur le modèle de l'ESTA américain. Il ne remplace pas le visa pour ceux qui en ont besoin et ne change pas la règle des 90 jours sur 180.",
    sections: [
      { heading: "Prix et dispenses", paragraphs: ["La Commission européenne a fixé les frais de l'ETIAS à 20 €, contre 7 € prévus au départ. Les moins de 18 ans et les plus de 70 ans ne paient pas.", UE] },
      { heading: "Date de lancement", paragraphs: ["En juillet 2025, la Commission a indiqué que l'ETIAS entrerait en service fin 2026, une fois le système d'entrée/sortie pleinement opérationnel. Les dates ont déjà glissé par le passé : vérifiez sur le site officiel de l'UE s'il est actif au moment de votre voyage."] },
      { heading: "Ce qui ne change pas", paragraphs: ["L'ETIAS ne change pas ce que les garde-frontières peuvent vous demander, y compris la preuve que vous repartirez. Les arrivées en aller simple restent les plus exposées à une demande de billet retour ou de sortie.", VERIFIER] },
    ],
    faqs: [
      { q: "Faut-il l'ETIAS si j'ai un visa Schengen ?", a: "Non. L'ETIAS concerne les voyageurs dispensés de visa. Ceux qui ont besoin d'un visa continuent à le demander comme avant." },
      { q: "Combien coûte l'ETIAS ?", a: "20 €, avec dispense pour les moins de 18 ans et les plus de 70 ans, selon la Commission européenne." },
    ],
    sources: [{ label: "Commission européenne : l'ETIAS coûtera 20 € (en anglais)", url: "https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en" }],
    checked: CHECKED,
  },
  {
    key: "ees-entry-exit-system",
    slug: "ees-systeme-entree-sortie-europe",
    title: "EES : le Système d'Entrée/Sortie Européen et la Fin des Tampons",
    h1: "Le système d'entrée/sortie (EES) de l'UE, expliqué",
    description: "Le système d'entrée/sortie a remplacé les tampons sur le passeport pour les visiteurs non européens. Sa date de lancement, son effet sur la règle des 90 jours et pourquoi les dépassements se voient tout de suite.",
    intro: "Depuis le 12 octobre 2025, les voyageurs non européens en court séjour sont enregistrés électroniquement lorsqu'ils franchissent les frontières extérieures des pays européens participants, au lieu de recevoir un tampon. Le système est pleinement opérationnel depuis le 10 avril 2026.",
    sections: [
      { heading: "Ce qui a changé", paragraphs: ["L'EES enregistre chaque entrée et sortie de façon numérique et remplace le tamponnage du passeport dans la plupart des pays européens. Il s'applique aux voyageurs non européens en court séjour, qu'ils aient besoin d'un visa ou non.", UE] },
      { heading: "Pourquoi c'est important pour la règle des 90 jours", paragraphs: ["Les courts séjours sont limités à 90 jours sur toute période de 180 jours dans l'ensemble de l'espace Schengen. Avec les tampons, les agents comptaient à la main ; avec l'EES, le calcul est automatique et un dépassement apparaît immédiatement à la sortie ou lors du voyage suivant.", "Si vous prévoyez un long voyage en Europe, réservez votre sortie dans vos 90 jours et gardez la réservation à portée de main. Les garde-frontières peuvent demander comment et quand vous repartirez.", DELAI] },
    ],
    faqs: [
      { q: "Aurai-je encore un tampon sur mon passeport en Europe ?", a: "Dans la plupart des pays participants, non. L'EES a remplacé le tamponnage et fonctionne pleinement depuis le 10 avril 2026." },
      { q: "L'EES s'applique-t-il si j'ai un visa ?", a: "Oui. Il couvre les voyageurs non européens en court séjour, dispensés de visa ou titulaires d'un visa Schengen." },
    ],
    sources: [
      { label: "Commission européenne : le nouvel EES est entré en service le 12 octobre 2025 (en anglais)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
      { label: "Ambassade de Pologne : EES pleinement opérationnel depuis le 10 avril 2026 (en anglais)", url: "https://www.gov.pl/web/usa-en/entryexit-system---full-implementation-from-april-10th-2026" },
      { label: "SEAE : à faire et à ne pas faire avec un visa Schengen (en anglais)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
    ],
    checked: CHECKED,
  },
  {
    key: "uk-eta",
    slug: "eta-royaume-uni-autorisation-electronique",
    title: "ETA Royaume-Uni : Prix, Qui Doit la Demander et Correspondances",
    h1: "L'autorisation de voyage électronique (ETA) du Royaume-Uni",
    description: "La plupart des visiteurs dispensés de visa ont désormais besoin d'une ETA pour le Royaume-Uni. Son prix, la durée de séjour, qui n'en a pas besoin et quand elle est requise pour une correspondance.",
    intro: "La plupart des visiteurs qui n'ont pas besoin de visa pour le Royaume-Uni, dont les Européens, les Américains, les Canadiens et les Australiens, doivent désormais obtenir une autorisation de voyage électronique (ETA) avant de partir. Elle couvre aussi Jersey, Guernesey et l'île de Man.",
    sections: [
      { heading: "Prix et durée de séjour", paragraphs: ["L'ETA coûte 20 £ sur le service officiel GOV.UK. D'autres sites peuvent facturer davantage. Elle permet des séjours de six mois maximum à chaque fois, mais ne garantit pas l'entrée.", "Chaque voyageur a besoin de la sienne, bébés et enfants compris. Les citoyens britanniques et irlandais, et les personnes autorisées à vivre, travailler ou étudier au Royaume-Uni, n'en ont pas besoin."] },
      { heading: "Correspondances", paragraphs: ["Il faut une ETA si vous passez le contrôle aux frontières britannique pendant votre correspondance. En cas de doute, demandez à votre compagnie."] },
      { heading: "Montrer que vous repartirez", paragraphs: ["L'ETA ne remplace pas les règles habituelles pour les visiteurs : on peut vous demander combien de temps vous restez et comment vous repartirez. Un départ réservé dans les six mois y répond.", VERIFIER] },
    ],
    faqs: [
      { q: "Combien coûte l'ETA britannique ?", a: "20 £ sur le service officiel GOV.UK. Évitez les sites qui facturent plus." },
      { q: "Les enfants ont-ils besoin d'une ETA ?", a: "Oui. Chaque voyageur a besoin de la sienne, bébés et enfants compris." },
    ],
    sources: [{ label: "GOV.UK : demander une autorisation de voyage électronique (ETA) (en anglais)", url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta" }],
    checked: CHECKED,
  },
  {
    key: "canada-eta",
    slug: "ave-canada-autorisation-voyage-electronique",
    title: "AVE Canada (eTA) : Prix, Qui Doit la Demander et Billet Retour",
    h1: "L'AVE du Canada (autorisation de voyage électronique)",
    description: "Les voyageurs dispensés de visa qui prennent l'avion pour le Canada ou y font escale ont besoin d'une AVE. Le prix de 7 $ CA, qui doit la demander et ce que les agents frontaliers peuvent exiger.",
    intro: "Les étrangers dispensés de visa qui se rendent au Canada en avion, ou transitent par un aéroport canadien, ont besoin d'une autorisation de voyage électronique (AVE, ou eTA en anglais). Elle coûte 7 $ CA sur le site officiel du gouvernement du Canada.",
    sections: [
      { heading: "Qui doit la demander", paragraphs: ["Les voyageurs de pays dispensés de visa arrivant par avion ou en correspondance dans un aéroport canadien. Elle n'est pas nécessaire pour les arrivées par voie terrestre ou maritime. Les binationaux canadiens doivent voyager avec un passeport canadien.", "Certaines nationalités soumises au visa peuvent utiliser l'AVE sous conditions, comme les Mexicains ayant eu un visa canadien au cours des dix dernières années ou titulaires d'un visa américain de non-immigrant valide, arrivant par avion."] },
      { heading: "Billet retour et fonds", paragraphs: ["Le ministère britannique des Affaires étrangères prévient que les agents frontaliers canadiens peuvent demander un billet de retour ou de sortie et une preuve de fonds suffisants, même si vous logez chez des amis ou de la famille.", VERIFIER] },
    ],
    faqs: [
      { q: "Combien coûte l'AVE canadienne ?", a: "7 $ CA sur le site officiel du gouvernement du Canada." },
      { q: "Faut-il une AVE pour entrer au Canada en voiture depuis les États-Unis ?", a: "Non. L'AVE concerne les voyages en avion. Les arrivées par la route ou la mer n'en ont pas besoin, mais les règles de visa s'appliquent toujours." },
    ],
    sources: [
      { label: "Gouvernement du Canada : autorisation de voyage électronique (AVE) (en anglais)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html" },
      fcdo("canada", "Canada"),
    ],
    checked: CHECKED,
  },
  {
    key: "thailand-digital-arrival-card",
    slug: "carte-arrivee-numerique-thailande-tdac",
    title: "Carte d'Arrivée Numérique de Thaïlande (TDAC) et Exemption de Visa",
    h1: "La carte d'arrivée numérique thaïlandaise (TDAC) et les contrôles à l'entrée",
    description: "Tout étranger arrivant en Thaïlande doit remplir la TDAC en ligne. Quand le faire, le séjour sans visa, et les fonds et billet de sortie que l'immigration peut demander.",
    intro: "Tous les étrangers arrivant en Thaïlande par avion, par la route ou par la mer doivent remplir en ligne la Thailand Digital Arrival Card (TDAC) avant leur arrivée. C'est l'un des trois points qui peuvent poser problème, avec la preuve de fonds et le billet de sortie.",
    sections: [
      { heading: "Quand la remplir", paragraphs: ["Remplissez la TDAC en ligne dans les trois jours précédant votre arrivée. Utilisez uniquement le site officiel du gouvernement thaïlandais."] },
      { heading: "L'exemption de visa", paragraphs: ["Pour les visiteurs britanniques, le ministère britannique des Affaires étrangères indique que l'entrée sans visa permet désormais jusqu'à 30 jours, pour le tourisme uniquement. Les règles thaïlandaises ont changé plusieurs fois et dépendent du passeport.", PASSEPORT] },
      { heading: "Fonds et billet de sortie", paragraphs: ["L'immigration peut demander une preuve de fonds d'au moins 10 000 bahts par personne ou 20 000 par famille, et une preuve de voyage de sortie ou de retour. Les compagnies vérifient le billet de sortie au comptoir.", DELAI, VERIFIER] },
    ],
    faqs: [
      { q: "La TDAC est-elle gratuite ?", a: "Oui, sur le site officiel. Remplissez-la dans les trois jours précédant l'arrivée." },
      { q: "Combien d'argent faut-il pour entrer en Thaïlande ?", a: "L'immigration peut demander au moins 10 000 bahts par personne ou 20 000 par famille, selon le ministère britannique des Affaires étrangères." },
    ],
    sources: [fcdo("thailand", "Thaïlande")],
    checked: CHECKED,
  },
  {
    key: "malaysia-digital-arrival-card",
    slug: "carte-arrivee-numerique-malaisie-mdac",
    title: "Carte d'Arrivée Numérique de Malaisie (MDAC) : Quand Faut-il la Remplir",
    h1: "La carte d'arrivée numérique de Malaisie (MDAC)",
    description: "Les voyageurs qui entrent en Malaisie remplissent une carte d'arrivée numérique avant le départ, et la compagnie peut la demander à l'enregistrement. Qui est concerné et quoi préparer d'autre.",
    intro: "Les visiteurs de la Malaisie remplissent en ligne la Malaysia Digital Arrival Card avant de partir, et la compagnie peut la demander à l'enregistrement. Si vous êtes seulement en transit sans passer l'immigration, elle n'est pas nécessaire.",
    sections: [
      { heading: "Les règles", paragraphs: ["Les visiteurs britanniques n'ont pas besoin de visa pour le tourisme et reçoivent normalement 90 jours à l'arrivée. Le passeport doit être valable six mois à compter de l'arrivée et en bon état, sans page manquante.", PASSEPORT] },
      { heading: "Arriver en aller simple", paragraphs: ["L'avis britannique ne mentionne pas de règle de billet de sortie pour la Malaisie, mais les compagnies peuvent demander aux passagers en aller simple comment ils repartiront. Singapour, Bangkok ou Bali sont des sorties courantes.", DELAI, VERIFIER] },
    ],
    faqs: [{ q: "Faut-il la MDAC pour un simple transit à KLIA ?", a: "Non, si vous ne passez pas l'immigration, selon le ministère britannique des Affaires étrangères." }],
    sources: [fcdo("malaysia", "Malaisie")],
    checked: CHECKED,
  },
  {
    key: "singapore-arrival-card",
    slug: "sg-arrival-card-singapour",
    title: "SG Arrival Card : Quand la Remplir Avant de Partir à Singapour",
    h1: "La SG Arrival Card de Singapour",
    description: "Les visiteurs de Singapour doivent remplir la SG Arrival Card électronique dans les trois jours précédant l'arrivée. Ce qu'elle contient et combien de temps vous pouvez rester.",
    intro: "Les visiteurs doivent remplir la SG Arrival Card électronique, qui comprend une déclaration de santé, dans les trois jours précédant leur arrivée à Singapour. Une fausse déclaration est une infraction.",
    sections: [
      { heading: "Durée du séjour", paragraphs: ["Les citoyens britanniques peuvent visiter Singapour sans visa pour le tourisme ou les affaires. L'agent d'immigration fixe la durée, généralement entre 30 et 90 jours. Le passeport doit être valable six mois à compter de l'arrivée.", PASSEPORT] },
      { heading: "Billet de sortie", paragraphs: ["Les compagnies desservant Singapour peuvent tout de même demander une réservation de sortie aux passagers en aller simple. Kuala Lumpur, Bangkok, Bali et Jakarta sont des sorties courtes courantes.", VERIFIER] },
    ],
    faqs: [{ q: "Quand remplir la SG Arrival Card ?", a: "Dans les trois jours précédant votre arrivée à Singapour." }],
    sources: [fcdo("singapore", "Singapour")],
    checked: CHECKED,
  },
  {
    key: "philippines-etravel",
    slug: "etravel-philippines-enregistrement",
    title: "Enregistrement eTravel aux Philippines et Billet de Sortie",
    h1: "eTravel aux Philippines : enregistrement, QR code et billet de sortie",
    description: "Toute personne arrivant aux Philippines a besoin d'un QR code eTravel. Quand s'enregistrer, le séjour sans visa et le billet de sortie que l'on attend de vous.",
    intro: "Les voyageurs arrivant aux Philippines doivent s'enregistrer sur le système gratuit eTravel dans les trois jours précédant l'arrivée et présenter le QR code. La plupart des visiteurs sont aussi censés avoir une preuve de voyage de retour ou de sortie.",
    sections: [
      { heading: "eTravel", paragraphs: ["L'enregistrement est gratuit et doit se faire dans les trois jours précédant l'arrivée. Gardez le QR code sur votre téléphone et une capture d'écran."] },
      { heading: "Durée du séjour et billet de sortie", paragraphs: ["Les visiteurs britanniques peuvent rester jusqu'à 30 jours sans visa et demander une prolongation sur place. Le ministère britannique des Affaires étrangères indique que la plupart sont censés avoir une preuve de voyage de retour ou de sortie, que l'immigration comme les compagnies peuvent demander.", PASSEPORT, DELAI, VERIFIER] },
    ],
    faqs: [{ q: "L'eTravel est-il gratuit ?", a: "Oui. Enregistrez-vous dans les trois jours précédant l'arrivée et évitez les sites payants." }],
    sources: [fcdo("philippines", "Philippines")],
    checked: CHECKED,
  },
  {
    key: "indonesia-e-voa-bali-levy",
    slug: "visa-a-l-arrivee-indonesie-taxe-bali",
    title: "Visa à l'Arrivée en Indonésie, e-VOA et Taxe Touristique de Bali",
    h1: "Le visa à l'arrivée en Indonésie, l'e-VOA et la taxe touristique de Bali",
    description: "Ce qu'il faut pour atterrir à Bali ou Jakarta : le visa à l'arrivée de 30 jours et sa règle de billet de sortie, la déclaration douanière en ligne et la taxe de Bali.",
    intro: "La plupart des visiteurs de l'Indonésie utilisent un visa à l'arrivée de 30 jours, demandé en ligne à l'avance (e-VOA) ou à l'aéroport. Pour l'obtenir, il faut une preuve de voyage de sortie ou de retour.",
    sections: [
      { heading: "Le visa à l'arrivée", paragraphs: ["Pour les visiteurs britanniques, le visa à l'arrivée coûte 500 000 roupies, en espèces ou par carte, permet une seule entrée et dure 30 jours. Si vous demandez l'e-VOA en ligne, faites-le au moins une semaine avant le départ. Vérifiez que votre passeport est éligible au visa à l'arrivée.", "La preuve d'un voyage de sortie ou de retour est une condition du visa : les compagnies desservant l'Indonésie la vérifient au comptoir."] },
      { heading: "Avant d'atterrir", paragraphs: ["Remplissez la déclaration gratuite de douane et de santé en ligne dans les 72 heures précédant l'arrivée. Bali perçoit aussi une taxe de 150 000 roupies auprès des touristes étrangers, payable en ligne ou à l'arrivée.", DELAI, VERIFIER] },
    ],
    faqs: [
      { q: "Faut-il un billet de sortie pour Bali ?", a: "Oui, la preuve d'un voyage de sortie ou de retour est exigée pour le visa à l'arrivée." },
      { q: "Combien coûte la taxe touristique de Bali ?", a: "150 000 roupies, payables en ligne ou à l'arrivée." },
    ],
    sources: [fcdo("indonesia", "Indonésie")],
    checked: CHECKED,
  },
  {
    key: "schengen-airport-transit-visa",
    slug: "visa-transit-aeroportuaire-schengen",
    title: "Visa de Transit Aéroportuaire Schengen : Qui en a Besoin",
    h1: "Faut-il un visa de transit pour changer d'avion en Europe ?",
    description: "Les ressortissants de 12 pays ont besoin d'un visa de transit aéroportuaire pour une correspondance dans un aéroport Schengen. La liste, les dispenses courantes et ce qu'il faut vérifier avant de réserver.",
    intro: "Changer d'avion dans un aéroport Schengen sans quitter la zone internationale ne demande normalement pas de visa. L'exception concerne les ressortissants d'une courte liste commune de l'UE, qui ont besoin d'un visa de transit aéroportuaire, sauf s'ils détiennent certains visas ou titres de séjour.",
    sections: [
      { heading: "La liste commune", paragraphs: ["La liste valable dans toute l'UE comprend les ressortissants de l'Afghanistan, du Bangladesh, de la République démocratique du Congo, de l'Érythrée, de l'Éthiopie, du Ghana, de l'Iran, de l'Irak, du Nigeria, du Pakistan, de la Somalie et du Sri Lanka. Chaque pays Schengen peut ajouter d'autres nationalités pour ses propres aéroports : vérifiez celui de votre correspondance."] },
      { heading: "Dispenses courantes", paragraphs: ["Sont en général dispensés les titulaires d'un visa ou d'un titre de séjour Schengen valide, ou d'un titre de séjour valide de pays comme les États-Unis, le Canada, le Japon, Andorre, Monaco, Saint-Marin ou la Suisse leur permettant d'y retourner. Les équipages le sont aussi.", "Si vous avez besoin d'un visa de transit, la demande exige généralement les détails du vol suivant : préparez l'itinéraire complet.", VERIFIER] },
    ],
    faqs: [{ q: "Les Congolais (RDC) ont-ils besoin d'un visa de transit à Paris ou Bruxelles ?", a: "La République démocratique du Congo figure sur la liste commune de l'UE, donc oui, sauf dispense, par exemple un visa Schengen valide ou un titre de séjour américain ou canadien." }],
    sources: [{ label: "Office letton de la citoyenneté et des migrations : visas de transit aéroportuaire (liste commune de l'UE) (en anglais)", url: "https://www.pmlp.gov.lv/en/airport-transit" }],
    checked: CHECKED,
  },
  {
    key: "uk-transit-visa",
    slug: "visa-transit-royaume-uni",
    title: "Visa de Transit Royaume-Uni : Direct Airside ou Visitor in Transit",
    h1: "Faut-il un visa de transit pour le Royaume-Uni ?",
    description: "Quand il faut un visa Direct Airside Transit ou Visitor in Transit pour une correspondance au Royaume-Uni, et quand une ETA ou un autre visa suffit.",
    intro: "Le besoin d'un visa de transit britannique dépend de votre nationalité et du passage ou non par le contrôle aux frontières pendant la correspondance. Utilisez l'outil de vérification de GOV.UK pour votre passeport ; voici comment les options s'articulent.",
    sections: [
      { heading: "Les deux visas de transit", paragraphs: ["Le Direct Airside Transit visa permet de changer de vol sans passer le contrôle aux frontières britannique. Le Visitor in Transit visa permet de passer le contrôle et de repartir dans les 48 heures. Les séjours plus longs, ou des transits fréquents sur plus de six mois, nécessitent un Standard Visitor visa."] },
      { heading: "Quand il n'en faut pas", paragraphs: ["Aucun visa de transit n'est nécessaire si vous avez une ETA britannique, un Standard Visitor visa, un Marriage Visitor visa, un permis familial de l'EU Settlement Scheme ou un document de voyage du Home Office. Votre compagnie peut vous dire si la correspondance passe par le contrôle aux frontières.", "Dans tous les cas, gardez les détails du vol suivant à portée de main : un transit, c'est par définition repartir.", VERIFIER] },
    ],
    faqs: [{ q: "Les Colombiens ont-ils besoin d'un visa de transit au Royaume-Uni ?", a: "Depuis le 26 novembre 2024, les Colombiens ont besoin d'un visa de transit aéroportuaire direct pour transiter par le Royaume-Uni, sauf dispense." }],
    sources: [
      { label: "GOV.UK : visas de transit (en anglais)", url: "https://www.gov.uk/transit-visa" },
      { label: "GOV.UK : mémorandum explicatif HC 334 (Colombie) (en anglais)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024/explanatory-memorandum-to-the-statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024-accessible" },
    ],
    checked: CHECKED,
  },
  {
    key: "esta-cost-and-return-ticket",
    slug: "esta-prix-billet-retour",
    title: "Prix de l'ESTA en 2026 (40 $) et la Règle du Billet Retour",
    h1: "ESTA : les frais de 40 $ et le billet retour obligatoire",
    description: "Les frais de l'ESTA sont passés à 40 $ le 30 septembre 2025. Ce que couvre l'ESTA et pourquoi les voyageurs du programme d'exemption de visa ont besoin d'un billet retour ou de sortie.",
    intro: "Les frais de l'ESTA, l'autorisation en ligne des voyageurs du Visa Waiver Program vers les États-Unis (dont les Français, les Belges et les Suisses), sont passés de 21 $ à 40 $ le 30 septembre 2025. Payez uniquement sur le site officiel du CBP.",
    sections: [
      { heading: "La règle du billet retour", paragraphs: ["Les voyageurs exemptés de visa doivent avoir un billet de retour ou de sortie pour se rendre aux États-Unis, et les compagnies le vérifient avant l'embarquement. Le temps passé au Canada, au Mexique et dans les îles voisines compte en général dans les 90 jours : un saut de l'autre côté de la frontière ne remet pas le séjour à zéro.", DELAI, VERIFIER] },
    ],
    faqs: [{ q: "Combien coûte l'ESTA ?", a: "40 $ depuis le 30 septembre 2025, sur le site officiel du CBP." }],
    sources: [
      { label: "Fragomen : le DHS applique de nouveaux frais pour l'ESTA, l'EVUS et l'I-94 terrestre (en anglais)", url: "https://www.fragomen.com/insights/united-states-dhs-announces-implementation-of-new-fees-for-esta-evus-and-land-border-i-94-forms-starting-september-30.html" },
      { label: "Site officiel de demande d'ESTA (CBP)", url: "https://esta.cbp.dhs.gov/" },
    ],
    checked: CHECKED,
  },
];
