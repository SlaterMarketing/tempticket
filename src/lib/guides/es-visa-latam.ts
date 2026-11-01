/**
 * Spanish guides for Latin American visa applicants: flight itineraries for US,
 * Schengen, Canadian and UK visas, one page per destination and country.
 * Destination facts are checked against the official sources listed; each page
 * adds where that country's applicants apply and anything specific to them.
 */

import { PLAZO, VERIFICAR } from "./es";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Destino = {
  id: string;
  /** "Estados Unidos", used in titles. */
  nombre: string;
  /** "a Estados Unidos" / "al espacio Schengen" */
  a: string;
  visa: string;
  hechos: string[];
  vuelos: string;
  fuentes: GuideSource[];
  faq: GuideFaq;
  slugPart: string;
  /** Short label for titles: "americana", "Schengen"... */
  corto: string;
};

const SRC_EEAS: GuideSource = {
  label: "EEAS: recomendaciones oficiales para solicitantes de visa Schengen (en inglés)",
  url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf",
};

const DESTINOS: Record<string, Destino> = {
  us: {
    id: "us",
    corto: "americana",
    nombre: "Estados Unidos",
    a: "a Estados Unidos",
    visa: "visa de turista B-1/B-2 de Estados Unidos",
    slugPart: "estados-unidos",
    hechos: [
      "La mayoría de los solicitantes completa el formulario DS-160, paga la tarifa y acude a una entrevista en la embajada o un consulado. Los tiempos de espera para la entrevista cambian mucho según el país, así que consúltalos antes de fijar fechas.",
      "Las tarifas cambiaron en 2025, cuando el Congreso añadió una tarifa de integridad de visa a la tarifa de solicitud. Revisa el importe actual en travel.state.gov antes de pagar.",
    ],
    vuelos:
      "El Departamento de Estado aconseja no cerrar los planes de viaje ni comprar boletos hasta tener la visa. La solicitud no exige un boleto, pero tener un itinerario te ayuda a responder con coherencia en la entrevista, y una reserva temporal te da uno sin pagar vuelos.",
    fuentes: [{ label: "Departamento de Estado de EE. UU.: visa de visitante (en inglés)", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" }],
    faq: {
      q: "¿Necesito un boleto de avión para la entrevista de visa americana?",
      a: "No. El Departamento de Estado recomienda no comprar boletos antes de tener la visa. Lleva claras tus fechas; una reserva temporal te ayuda a mantenerlas.",
    },
  },
  schengen: {
    id: "schengen",
    corto: "Schengen",
    nombre: "visa Schengen",
    a: "al espacio Schengen",
    visa: "visa Schengen",
    slugPart: "schengen",
    hechos: [
      "La visa Schengen de corta duración permite estancias de hasta 90 días en cualquier periodo de 180 días, sumando todos los países Schengen. Desde el 11 de junio de 2024 la tarifa es de 90 € para adultos y 45 € para niños de 6 a 12 años, más el cargo del centro de visados.",
      "Solicítala al país que sea tu destino principal o, si repartes el tiempo por igual, al primero al que entres. Si has obtenido y usado correctamente tres visas en los dos últimos años, puedes optar a una visa de entradas múltiples de un año, luego de dos y después de cinco.",
    ],
    vuelos:
      "La guía oficial de la UE para solicitantes dice que las reservas de vuelo y hotel deben reflejar tus planes reales y recomienda reservas reembolsables o modificables, para no perder dinero si la visa se deniega o se retrasa. Una reserva temporal con código real hace justo eso.",
    fuentes: [
      SRC_EEAS,
      { label: "Embajada de Suecia: nuevas tarifas de visa Schengen desde el 11 de junio de 2024 (en inglés)", url: "https://swedenabroad.se/en/embassies/iran-tehran/current/news/new-schengen-visa-fees" },
      { label: "Servicio de Inmigración de Dinamarca: validez de visas y sistema en cascada (en inglés)", url: "https://nyidanmark.dk/en-GB/Words-and-concepts/US/Visum/Visa---Determination-of-validity" },
    ],
    faq: {
      q: "¿Debo comprar el boleto antes de que me den la visa Schengen?",
      a: "Normalmente no. La guía de la UE recomienda reservas reembolsables o modificables, y la mayoría de consulados acepta una reserva. Compra el boleto cuando tengas la visa.",
    },
  },
  canada: {
    id: "canada",
    corto: "canadiense",
    nombre: "Canadá",
    a: "a Canadá",
    visa: "visa de visitante de Canadá",
    slugPart: "canada",
    hechos: [
      "La tarifa de la visa de visitante es de 100 dólares canadienses por persona, y la mayoría paga además 85 dólares canadienses por la biometría (huellas y foto) en un centro de solicitud de visas.",
      "Los tiempos de tramitación dependen del país desde el que solicitas, y el IRCC publica la estimación actual en su web.",
    ],
    vuelos:
      "El IRCC incluye los datos de vuelo como documento opcional del itinerario en la solicitud de visa de visitante. Una reserva que coincida con tus fechas muestra que el viaje es real sin pagar un boleto antes de la decisión.",
    fuentes: [{ label: "Gobierno de Canadá: solicitar una visa de visitante (en inglés)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html" }],
    faq: {
      q: "¿Es obligatorio presentar una reserva de vuelo para la visa canadiense?",
      a: "No, el IRCC la considera opcional. Aun así, incluir una reserva que coincida con tus fechas ayuda a mostrar que tus planes son reales.",
    },
  },
  uk: {
    id: "uk",
    corto: "del Reino Unido",
    nombre: "Reino Unido",
    a: "al Reino Unido",
    visa: "visa de visitante del Reino Unido",
    slugPart: "reino-unido",
    hechos: [
      "La visa Standard Visitor para hasta seis meses cuesta 135 libras. También hay visas de visitante de larga duración de 2, 5 o 10 años, con estancias de hasta seis meses por visita.",
      "Puedes solicitarla hasta tres meses antes de viajar, y normalmente recibes la decisión en tres semanas desde que acreditas tu identidad y entregas los documentos.",
    ],
    vuelos:
      "UK Visas and Immigration pide demostrar que saldrás del Reino Unido al final de la visita y que puedes pagar el viaje de regreso o de continuación. No hace falta comprar el boleto: una reserva con fechas claras, junto con prueba de fondos, muestra el plan.",
    fuentes: [
      { label: "GOV.UK: solicitar una Standard Visitor visa (en inglés)", url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" },
      { label: "GOV.UK: documentos necesarios para la Standard Visitor visa (en inglés)", url: "https://www.gov.uk/standard-visitor/documents-you-need" },
    ],
    faq: {
      q: "¿Necesito un boleto pagado para la visa del Reino Unido?",
      a: "No. Debes demostrar que saldrás al final de la visita y que puedes pagar el viaje. Una reserva y prueba de fondos bastan sin arriesgar dinero antes de la decisión.",
    },
  },
};

type Pagina = {
  dest: keyof typeof DESTINOS;
  id: string;
  /** "México", "la República Dominicana" */
  pais: string;
  gentilicio: string;
  aeropuertos: string;
  donde: string;
  faq?: GuideFaq;
  fuentes?: GuideSource[];
};

function build(p: Pagina): Guide {
  const d = DESTINOS[p.dest];
  const slug = `reserva-de-vuelo-visa-${d.slugPart}-${p.id}`;
  const Pais = p.pais.charAt(0).toUpperCase() + p.pais.slice(1);
  return {
    key: `es-${d.id}-visa-itinerary-${p.id}`,
    slug,
    title: `Reserva de vuelo para visa ${d.corto} desde ${Pais}`,
    h1: `Reserva de vuelo para la ${d.visa} desde ${p.pais}`,
    description: `Qué deben presentar los ${p.gentilicio} sobre vuelos al pedir la ${d.visa}, qué dice la guía oficial sobre comprar boletos y cómo conseguir una reserva verificable.`,
    intro: `Los ${p.gentilicio} necesitan visa para viajar ${d.a}, y la solicitud es más fácil de presentar con un itinerario claro. Esto es lo que implica solicitarla desde ${p.pais} y cómo resolver los vuelos sin comprar un boleto que quizá no uses.`,
    sections: [
      { heading: `La ${d.visa}`, paragraphs: d.hechos },
      { heading: `Solicitar desde ${p.pais}`, paragraphs: [p.donde] },
      {
        heading: "El itinerario de vuelo",
        paragraphs: [
          d.vuelos,
          `Los vuelos desde ${p.pais} suelen salir de ${p.aeropuertos}. Comprueba que las fechas coinciden con el formulario y el alojamiento, y que tu nombre es idéntico al del pasaporte.`,
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [d.faq, ...(p.faq ? [p.faq] : [])],
    sources: [...d.fuentes, ...(p.fuentes ?? [])],
    checked: CHECKED,
  };
}

const PAGINAS: Pagina[] = [
  // Estados Unidos
  {
    dest: "us", id: "mexico", pais: "México", gentilicio: "mexicanos",
    aeropuertos: "Ciudad de México, Guadalajara, Monterrey, Cancún o Tijuana",
    donde: "En México hay entrevistas en la embajada en Ciudad de México y en los consulados de Ciudad Juárez, Guadalajara, Hermosillo, Matamoros, Mérida, Monterrey, Nogales, Nuevo Laredo y Tijuana. Normalmente primero vas a un Centro de Atención a Solicitantes (CAS) para huellas y foto.",
    faq: { q: "¿Sirve la visa láser (tarjeta de cruce) para volar a cualquier parte de EE. UU.?", a: "La tarjeta de cruce fronterizo tiene sus propias condiciones y límites de zona y tiempo. Si vas más allá de la zona fronteriza o por más tiempo, revisa en travel.state.gov qué documento necesitas." },
  },
  {
    dest: "us", id: "colombia", pais: "Colombia", gentilicio: "colombianos",
    aeropuertos: "Bogotá, Medellín, Cali o Cartagena",
    donde: "Los colombianos tienen la entrevista en la embajada de EE. UU. en Bogotá, una de las operaciones de visas más grandes del mundo. Las esperas han sido largas en algunos momentos, así que consulta el tiempo actual antes de planear fechas.",
  },
  {
    dest: "us", id: "peru", pais: "Perú", gentilicio: "peruanos",
    aeropuertos: "Lima, Cusco o Arequipa",
    donde: "Los peruanos tienen la entrevista en la embajada de EE. UU. en Lima.",
  },
  {
    dest: "us", id: "ecuador", pais: "Ecuador", gentilicio: "ecuatorianos",
    aeropuertos: "Quito o Guayaquil",
    donde: "Los ecuatorianos tienen la entrevista en la embajada en Quito o en el consulado general en Guayaquil.",
  },
  {
    dest: "us", id: "argentina", pais: "Argentina", gentilicio: "argentinos",
    aeropuertos: "Buenos Aires (Ezeiza), Córdoba o Mendoza",
    donde: "Los argentinos tienen la entrevista en la embajada de EE. UU. en Buenos Aires. Argentina no forma parte del Programa de Exención de Visas, así que para turismo se necesita la visa B-1/B-2.",
  },
  {
    dest: "us", id: "republica-dominicana", pais: "la República Dominicana", gentilicio: "dominicanos",
    aeropuertos: "Santo Domingo, Punta Cana o Santiago",
    donde: "Los dominicanos tienen la entrevista en la embajada de EE. UU. en Santo Domingo.",
  },
  {
    dest: "us", id: "guatemala", pais: "Guatemala", gentilicio: "guatemaltecos",
    aeropuertos: "Ciudad de Guatemala",
    donde: "Los guatemaltecos tienen la entrevista en la embajada de EE. UU. en Ciudad de Guatemala.",
  },
  {
    dest: "us", id: "honduras", pais: "Honduras", gentilicio: "hondureños",
    aeropuertos: "Tegucigalpa (Palmerola) o San Pedro Sula",
    donde: "Los hondureños tienen la entrevista en la embajada de EE. UU. en Tegucigalpa.",
  },
  {
    dest: "us", id: "el-salvador", pais: "El Salvador", gentilicio: "salvadoreños",
    aeropuertos: "San Salvador",
    donde: "Los salvadoreños tienen la entrevista en la embajada de EE. UU. en San Salvador.",
  },
  {
    dest: "us", id: "bolivia", pais: "Bolivia", gentilicio: "bolivianos",
    aeropuertos: "Santa Cruz (Viru Viru), La Paz (El Alto) o Cochabamba",
    donde: "Los bolivianos tienen la entrevista en la embajada de EE. UU. en La Paz.",
  },
  {
    dest: "us", id: "costa-rica", pais: "Costa Rica", gentilicio: "costarricenses",
    aeropuertos: "San José o Liberia",
    donde: "Los costarricenses tienen la entrevista en la embajada de EE. UU. en San José.",
  },
  {
    dest: "us", id: "panama", pais: "Panamá", gentilicio: "panameños",
    aeropuertos: "Ciudad de Panamá (Tocumen)",
    donde: "Los panameños tienen la entrevista en la embajada de EE. UU. en Ciudad de Panamá.",
  },
  {
    dest: "us", id: "paraguay", pais: "Paraguay", gentilicio: "paraguayos",
    aeropuertos: "Asunción",
    donde: "Los paraguayos tienen la entrevista en la embajada de EE. UU. en Asunción.",
  },
  {
    dest: "us", id: "uruguay", pais: "Uruguay", gentilicio: "uruguayos",
    aeropuertos: "Montevideo (Carrasco)",
    donde: "Los uruguayos tienen la entrevista en la embajada de EE. UU. en Montevideo. Uruguay no está en el Programa de Exención de Visas, así que se necesita visa B-1/B-2 para turismo.",
  },
  {
    dest: "us", id: "venezuela", pais: "Venezuela", gentilicio: "venezolanos",
    aeropuertos: "Caracas, o la ciudad del país donde hagas la entrevista",
    donde: "La embajada de EE. UU. en Caracas no ofrece servicios de visa, así que los venezolanos solicitan en otro país, a menudo en Bogotá. Comprueba qué embajada acepta solicitantes venezolanos antes de pedir la cita, y planifica el itinerario desde ese país si vas a viajar desde allí.",
    faq: { q: "¿Dónde piden la visa americana los venezolanos?", a: "En una embajada de EE. UU. de otro país, ya que en Caracas no hay servicio de visas. Bogotá es una opción habitual; consulta las condiciones de cada embajada." },
  },
  // Schengen
  {
    dest: "schengen", id: "ecuador", pais: "Ecuador", gentilicio: "ecuatorianos",
    aeropuertos: "Quito o Guayaquil",
    donde: "Ecuador está en la lista de la UE de países cuyos ciudadanos necesitan visa. España e Italia, los destinos más habituales, tienen consulados o centros de visados en Quito y Guayaquil; otros países atienden solo en Quito o a través de otro Estado miembro.",
  },
  {
    dest: "schengen", id: "bolivia", pais: "Bolivia", gentilicio: "bolivianos",
    aeropuertos: "Santa Cruz (Viru Viru) o La Paz (El Alto)",
    donde: "Bolivia está en la lista de la UE de países cuyos ciudadanos necesitan visa. Varios países Schengen no tienen servicio de visados en Bolivia y atienden a través de otro Estado miembro o desde un país vecino, así que revisa dónde se presenta la tuya.",
  },
  {
    dest: "schengen", id: "cuba", pais: "Cuba", gentilicio: "cubanos",
    aeropuertos: "La Habana",
    donde: "Cuba está en la lista de la UE de países cuyos ciudadanos necesitan visa. Las solicitudes se presentan en La Habana, en el consulado o centro de visados del país de destino. La demanda de citas es alta, así que planifica con margen.",
  },
  {
    dest: "schengen", id: "republica-dominicana", pais: "la República Dominicana", gentilicio: "dominicanos",
    aeropuertos: "Santo Domingo, Punta Cana o Santiago",
    donde: "La República Dominicana está en la lista de la UE de países cuyos ciudadanos necesitan visa. Los países Schengen atienden en Santo Domingo, directamente o mediante su centro de visados.",
  },
  // Canadá
  {
    dest: "canada", id: "mexico", pais: "México", gentilicio: "mexicanos",
    aeropuertos: "Ciudad de México, Guadalajara, Monterrey o Cancún",
    donde: "Desde el 29 de febrero de 2024, la mayoría de los mexicanos necesita visa de visitante para Canadá. Pueden usar una eTA solo quienes viajen en avión, por una estancia corta, y hayan tenido una visa canadiense en los últimos 10 años o tengan una visa de no inmigrante de EE. UU. vigente. Quien llegue por tierra o mar necesita visa.",
    faq: { q: "¿Puedo ir a Canadá con eTA si tengo visa americana?", a: "Sí, si eres mexicano, viajas en avión, por una estancia corta y tu visa de no inmigrante de EE. UU. está vigente al solicitar y al viajar." },
    fuentes: [{ label: "CIC News: algunos ciudadanos mexicanos necesitan visa para Canadá desde el 29 de febrero de 2024 (en inglés)", url: "https://www.cicnews.com/2024/03/some-citizens-of-mexico-now-require-a-visa-to-visit-canada-0343261.html" }],
  },
  {
    dest: "canada", id: "colombia", pais: "Colombia", gentilicio: "colombianos",
    aeropuertos: "Bogotá, Medellín o Cali",
    donde: "Los colombianos solicitan en línea con el IRCC y dan la biometría en el centro de solicitud de visas de Bogotá.",
  },
  {
    dest: "canada", id: "peru", pais: "Perú", gentilicio: "peruanos",
    aeropuertos: "Lima",
    donde: "Los peruanos solicitan en línea con el IRCC y dan la biometría en el centro de solicitud de visas de Lima.",
  },
  {
    dest: "canada", id: "ecuador", pais: "Ecuador", gentilicio: "ecuatorianos",
    aeropuertos: "Quito o Guayaquil",
    donde: "Los ecuatorianos solicitan en línea con el IRCC y dan la biometría en un centro de solicitud de visas. Comprueba en la web del IRCC cuál atiende a Ecuador.",
  },
  // Reino Unido
  {
    dest: "uk", id: "colombia", pais: "Colombia", gentilicio: "colombianos",
    aeropuertos: "Bogotá, Medellín o Cali",
    donde: "Desde el 26 de noviembre de 2024, los colombianos necesitan visa para visitar el Reino Unido y ya no pueden pedir la ETA. También necesitan visa de tránsito aeroportuario para hacer escala en el Reino Unido. Se solicita en línea y luego se acude al centro de solicitud de visas para la biometría.",
    faq: { q: "¿Necesito visa para hacer escala en Londres?", a: "Sí. Desde el 26 de noviembre de 2024 los colombianos necesitan visa de tránsito aeroportuario para hacer escala en el Reino Unido." },
    fuentes: [{ label: "GOV.UK: memorando explicativo HC 334, visa para ciudadanos colombianos (en inglés)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024/explanatory-memorandum-to-the-statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024-accessible" }],
  },
];

export const ES_VISA_LATAM_GUIDES: Guide[] = PAGINAS.map(build);
