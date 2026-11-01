/**
 * Spanish visa run guides. Same facts and official sources as en-visa-runs.ts
 * (checked 2026-11-01), translated. The stay lengths come from the UK Foreign
 * Office for British passports, so every page says so and tells readers with
 * other passports to check their own rules. Keys match the English pages.
 */

import { PLAZO, VERIFICAR } from "./es";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nombre: string): GuideSource => ({
  label: `Ministerio de Asuntos Exteriores británico: requisitos de entrada de ${nombre} (en inglés)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

type Run = {
  id: string;
  slug: string;
  /** Name for the table. */
  pais: string;
  /** "Tailandia", "el espacio Schengen"... used after "de" and "en". */
  nombre: string;
  estancia: string;
  reinicia: string;
  reglas: string[];
  salidas: string;
  regreso: string;
  alternativa?: string;
  faq: GuideFaq;
  fuentes: GuideSource[];
  /** Rules that apply whatever your passport (Schengen, caps). */
  general?: boolean;
};

const PRUDENCIA =
  "Cada entrada la decide el agente de inmigración. Las salidas encadenadas con solo unas horas fuera del país son las que acaban en preguntas o en una denegación, así que deja un tiempo real fuera, lleva prueba de fondos y alojamiento, y explica tus planes con sinceridad.";

const PASAPORTE =
  "Los plazos de esta página son los que da el Ministerio de Asuntos Exteriores británico para pasaportes británicos. Con otro pasaporte pueden ser distintos: confírmalos en el sitio oficial de inmigración del país o en su embajada antes de planear la salida.";

const RUNS: Run[] = [
  {
    id: "thailand", slug: "visa-run-tailandia", pais: "Tailandia", nombre: "Tailandia",
    estancia: "30 días exento de visado", reinicia: "Nueva entrada, a criterio del agente",
    reglas: [
      "Para visitantes británicos, la entrada con la exención de visado de Tailandia permite ahora hasta 30 días, solo para turismo. Inmigración puede pedir prueba de fondos (10.000 bahts por persona, 20.000 por familia) y de viaje de salida o regreso, y todos deben rellenar la tarjeta digital de llegada TDAC en los tres días anteriores a la llegada.",
    ],
    salidas: "Kuala Lumpur o Penang en avión, Vientián por el Puente de la Amistad, Phnom Penh o Siem Reap",
    regreso: "Volver a Tailandia en avión cuenta como una llegada nueva, así que la aerolínea querrá ver un vuelo de salida dentro de tus nuevos 30 días. Resérvalo antes de salir.",
    alternativa: "Si vas a quedarte meses, la Destination Thailand Visa (DTV) permite 180 días por entrada durante cinco años y evita las salidas.",
    faq: { q: "¿Cuántos visa runs puedo hacer en Tailandia?", a: "No hay un número fijo, pero el agente puede denegar la entrada exenta de visado si parece que vives en Tailandia. Para estancias largas, la DTV u otro visado es lo más seguro." },
    fuentes: [fcdo("thailand", "Tailandia"), { label: "Embajada de Tailandia en Londres: Destination Thailand Visa (en inglés)", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" }],
  },
  {
    id: "vietnam", slug: "visa-run-vietnam", pais: "Vietnam", nombre: "Vietnam",
    estancia: "45 días sin visado, o e-visa de 90 días", reinicia: "Nueva entrada; el e-visa es de entradas múltiples",
    reglas: [
      "Los visitantes británicos pueden entrar en Vietnam sin visado hasta 45 días, o pedir un e-visa de 90 días con entradas múltiples. El e-visa solo vale en los puntos de entrada y salida que elegiste al solicitarlo.",
    ],
    salidas: "Phnom Penh o Siem Reap, Vientián o Luang Prabang, Bangkok, Kuala Lumpur",
    regreso: "Al volver en avión, la aerolínea puede comprobar que saldrás dentro de tu nueva estancia. Si cruzas por tierra con e-visa, asegúrate de que ese paso figura en tu solicitud.",
    alternativa: "Un e-visa de 90 días con entradas múltiples suele hacer innecesaria la salida.",
    faq: { q: "¿Hace falta un visa run con el e-visa de Vietnam?", a: "No dentro de sus 90 días, porque es de entradas múltiples. Solo tienes que salir y entrar por los puntos que figuran en él." },
    fuentes: [fcdo("vietnam", "Vietnam")],
  },
  {
    id: "malaysia", slug: "visa-run-malasia", pais: "Malasia", nombre: "Malasia",
    estancia: "Normalmente 90 días a la llegada", reinicia: "Nueva entrada, a criterio del agente",
    reglas: [
      "A los visitantes británicos normalmente se les dan 90 días a la llegada sin visado. Rellena la Malaysia Digital Arrival Card antes de viajar; la aerolínea puede pedirla en la facturación.",
    ],
    salidas: "Singapur (en autobús por el paso elevado o en un vuelo corto), Bangkok, Bali, Medan",
    regreso: "Salir a Singapur por tierra es lo habitual. Si vuelves en avión, ten preparado un vuelo de salida dentro de tus siguientes 90 días.",
    alternativa: "Los teletrabajadores que se quedan más tiempo pueden pedir el pase DE Rantau, válido de 3 a 12 meses y renovable hasta 24.",
    faq: { q: "¿Un viaje a Singapur reinicia mi estancia en Malasia?", a: "Volver a Malasia es una entrada nueva y el agente decide la duración. Las salidas cortas frecuentes pueden generar preguntas." },
    fuentes: [fcdo("malaysia", "Malasia"), { label: "MDEC: preguntas frecuentes del DE Rantau Pass (en inglés)", url: "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf" }],
  },
  {
    id: "bali-indonesia", slug: "visa-run-bali-indonesia", pais: "Indonesia (Bali)", nombre: "Bali (Indonesia)",
    estancia: "Visa a la llegada de 30 días", reinicia: "Visa nueva en cada entrada",
    reglas: [
      "Para visitantes británicos, la visa a la llegada dura 30 días, cuesta 500.000 rupias y es de una sola entrada. La prueba de viaje de salida o regreso es condición para obtenerla, y Bali cobra aparte una tasa turística de 150.000 rupias.",
    ],
    salidas: "Singapur, Kuala Lumpur, Perth, Darwin",
    regreso: "Cada nueva entrada necesita una nueva visa a la llegada y, con ella, prueba de salida. Las aerolíneas lo comprueban en el mostrador antes de volar de vuelta a Bali.",
    alternativa: "Los teletrabajadores que se quedan hasta un año pueden mirar la visa de trabajador remoto E33G.",
    faq: { q: "¿Necesito billete de salida después de un visa run en Bali?", a: "Sí. Cada nueva visa a la llegada exige prueba de viaje de salida o regreso." },
    fuentes: [fcdo("indonesia", "Indonesia")],
  },
  {
    id: "philippines", slug: "visa-run-filipinas", pais: "Filipinas", nombre: "Filipinas",
    estancia: "30 días sin visado", reinicia: "Mejor prorrogar dentro del país",
    reglas: [
      "Los visitantes británicos pueden quedarse hasta 30 días sin visado y pedir una prórroga dentro del país. Se espera que la mayoría tenga prueba de viaje de regreso o salida, y todos deben registrarse en eTravel.",
    ],
    salidas: "Hong Kong, Taipéi, Kota Kinabalu, Singapur",
    regreso: "Como en Filipinas se puede prorrogar, muchas veces la salida no hace falta. Si sales y vuelves, el control del billete de salida se aplica de nuevo.",
    faq: { q: "¿Tengo que salir de Filipinas a los 30 días?", a: "No necesariamente. Puedes pedir una prórroga dentro del país." },
    fuentes: [fcdo("philippines", "Filipinas")],
  },
  {
    id: "mexico", slug: "visa-run-mexico", pais: "México", nombre: "México",
    estancia: "Hasta 180 días, según el sello", reinicia: "Sello nuevo; los días los decide el agente",
    reglas: [
      "Los turistas británicos no necesitan visado. El pasaporte se sella con los días que puedes quedarte, hasta 180. En el control fronterizo pueden pedirte billete de regreso o salida y dinero suficiente para tu estancia. Quien llega por tierra rellena un formulario migratorio en línea.",
    ],
    salidas: "Ciudad de Belice, Ciudad de Guatemala, La Habana, o una ciudad de EE. UU. si tienes permiso para entrar allí",
    regreso: "El agente mexicano decide cuántos días te da, y una reserva de regreso o salida para el plazo que pides ayuda a conseguirlo.",
    faq: { q: "¿Me pueden dar 180 días en México?", a: "Es posible, pero el sello muestra lo que concede el agente. Un billete de regreso o salida y prueba de fondos respaldan la petición." },
    fuentes: [fcdo("mexico", "México")],
  },
  {
    id: "costa-rica", slug: "visa-run-costa-rica", pais: "Costa Rica", nombre: "Costa Rica",
    estancia: "Hasta 180 días sin visado", reinicia: "Nueva entrada",
    reglas: [
      "Los visitantes británicos pueden quedarse hasta 180 días con la exención de visado turístico de Costa Rica. Al salir en avión puede cobrarse un impuesto de salida de 29 $.",
    ],
    salidas: "Panamá (Paso Canoas o un vuelo a Ciudad de Panamá), Nicaragua, San Andrés",
    regreso: "La salida clásica es a Panamá por tierra, pero Panamá puede pedir billete de regreso o salida y 1.000 $ en fondos, sobre todo a quien llega por tierra desde Costa Rica sin ser residente allí. Al volver, Costa Rica también espera ver la salida.",
    faq: { q: "¿Es fácil el visa run a Panamá desde Costa Rica?", a: "Es habitual, pero Panamá puede pedir billete de regreso o salida y prueba de 1.000 $ o una tarjeta de crédito, sobre todo a quien llega por tierra desde Costa Rica." },
    fuentes: [fcdo("costa-rica", "Costa Rica"), fcdo("panama", "Panamá")],
  },
  {
    id: "panama", slug: "visa-run-panama", pais: "Panamá", nombre: "Panamá",
    estancia: "Hasta 3 meses", reinicia: "Nueva entrada",
    reglas: [
      "Los visitantes británicos pueden quedarse hasta tres meses sin visado si llegan por tierra o aire. En frontera pueden pedir billete de regreso o salida y prueba de al menos 1.000 $ o una tarjeta de crédito. El pasaporte debe tener seis meses de validez después de la salida y una página en blanco.",
    ],
    salidas: "San José, Bogotá, Medellín, Cartagena",
    regreso: "Ten una reserva de salida para volver a entrar, sobre todo si vuelves por tierra desde Costa Rica.",
    faq: { q: "¿Cuánto dinero necesito para entrar en Panamá?", a: "En frontera pueden pedirte al menos 1.000 $ o una tarjeta de crédito." },
    fuentes: [fcdo("panama", "Panamá")],
  },
  {
    id: "colombia", slug: "visa-run-colombia", pais: "Colombia", nombre: "Colombia", general: true,
    estancia: "90 días (máx. 180 en 12 meses)", reinicia: "No: tope de 180 días al año",
    reglas: [
      "Los visitantes británicos pueden quedarse hasta 90 días, a criterio del agente, pero no más de 180 días en cualquier periodo de 12 meses. Debes poder mostrar un billete de salida o regreso dentro de esos 90 días. El formulario Check-MIG es opcional pero agiliza el trámite.",
    ],
    salidas: "Ciudad de Panamá, Quito, Lima, Aruba",
    regreso: "Salir no evita el tope anual de 180 días. Dentro de él, cada entrada necesita un billete de salida en menos de 90 días.",
    faq: { q: "¿Puedo quedarme más en Colombia saliendo y volviendo?", a: "Solo hasta 180 días en cualquier periodo de 12 meses como visitante. Después necesitas otro tipo de visa." },
    fuentes: [fcdo("colombia", "Colombia")],
  },
  {
    id: "peru", slug: "visa-run-peru", pais: "Perú", nombre: "Perú", general: true,
    estancia: "90 en 180 días (máx. 183 al año)", reinicia: "No: hay tope",
    reglas: [
      "Los visitantes británicos suelen recibir hasta 90 días en un periodo de 180, contados desde la primera entrada, y el máximo que se puede conceder es 183 días en 365. Quedarse más tiempo conlleva multa y posible detención.",
    ],
    salidas: "La Paz, Santiago, Arica, Quito, Bogotá",
    regreso: "Volver a entrar no reinicia la cuenta de 90 en 180. La aerolínea puede pedirte igualmente prueba de salida si llegas con billete solo de ida.",
    faq: { q: "¿Salir de Perú reinicia mis días?", a: "No. Los límites de 90 en 180 y 183 en 365 cuentan todo tu tiempo en Perú." },
    fuentes: [fcdo("peru", "Perú")],
  },
  {
    id: "schengen", slug: "visa-run-schengen", pais: "Espacio Schengen", nombre: "el espacio Schengen", general: true,
    estancia: "90 días en cualquier periodo de 180", reinicia: "No: ventana móvil de 180 días",
    reglas: [
      "Los visitantes de corta estancia pueden pasar 90 días en cualquier periodo de 180 sumando todos los países Schengen. Salir un fin de semana no lo reinicia: la cuenta mira 180 días hacia atrás desde cada día que estás dentro.",
      "Desde el 12 de octubre de 2025 el Sistema de Entradas y Salidas (EES) registra electrónicamente las entradas y salidas en lugar de sellar el pasaporte, y funciona a pleno rendimiento desde el 10 de abril de 2026, así que la cuenta es automática.",
    ],
    salidas: "Países fuera de Schengen como Reino Unido, Irlanda, Albania, Montenegro, Serbia, Turquía, Georgia o Marruecos",
    regreso: "Un \"visa run\" Schengen es en realidad una pausa: pasa ese tiempo fuera y vuelve cuando tengas días disponibles. Los guardias fronterizos pueden preguntarte cómo vas a salir.",
    faq: { q: "¿Puedo hacer un visa run para reiniciar mis 90 días Schengen?", a: "No. Los 90 días se cuentan en una ventana móvil de 180, y el tiempo fuera solo ayuda porque los días antiguos van saliendo de la cuenta." },
    fuentes: [
      { label: "SEAE: lo que se debe y no se debe hacer con el visado Schengen (regla de 90/180) (en inglés)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
      { label: "Comisión Europea: el EES entró en funcionamiento el 12 de octubre de 2025 (en inglés)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
    ],
  },
  {
    id: "albania", slug: "visa-run-albania", pais: "Albania", nombre: "Albania",
    estancia: "90 días en 180", reinicia: "Cuenta propia de 90/180",
    reglas: [
      "Los visitantes británicos pueden quedarse en Albania hasta 90 días en un periodo de 180, una cuenta separada de la de Schengen, por eso es un lugar popular para pasar la pausa Schengen.",
    ],
    salidas: "Montenegro, Macedonia del Norte, Kosovo, el ferri a Italia o Grecia",
    regreso: "Ferris y autobuses permiten llegar y salir sin volar. Si llegas en avión solo con ida, ten un plan de salida dentro de 90 días.",
    faq: { q: "¿Albania sirve para la pausa Schengen?", a: "Sí. Su límite de 90 en 180 es independiente del de Schengen." },
    fuentes: [fcdo("albania", "Albania")],
  },
  {
    id: "turkey", slug: "visa-run-turquia", pais: "Turquía", nombre: "Turquía",
    estancia: "90 días en 180", reinicia: "Cuenta propia de 90/180",
    reglas: [
      "Los visitantes británicos pueden quedarse en Turquía hasta 90 días en cualquier periodo de 180, aparte de Schengen. El pasaporte necesita 150 días de validez desde la llegada y una página en blanco.",
    ],
    salidas: "Tiflis, Atenas, Sofía, Lárnaca",
    regreso: "Las conexiones de Estambul facilitan reservar un vuelo de salida a cualquier parte.",
    faq: { q: "¿Turquía cuenta para los días Schengen?", a: "No. Tiene su propio límite de 90 en 180." },
    fuentes: [fcdo("turkey", "Turquía")],
  },
  {
    id: "georgia", slug: "visa-run-georgia", pais: "Georgia", nombre: "Georgia",
    estancia: "Hasta 1 año", reinicia: "Rara vez hace falta",
    reglas: [
      "Los visitantes británicos pueden quedarse en Georgia hasta un año sin visado. Todos los visitantes deben tener seguro médico y de accidentes, o fondos para cubrir tratamiento médico y repatriación.",
    ],
    salidas: "Ereván, Estambul, Bakú",
    regreso: "Con un año sin visado, rara vez hace falta salir. Si llegas solo con ida, la aerolínea puede preguntarte igualmente cómo vas a salir.",
    faq: { q: "¿Necesito un visa run en Georgia?", a: "Normalmente no: los visitantes británicos pueden quedarse hasta un año." },
    fuentes: [fcdo("georgia", "Georgia")],
  },
  {
    id: "south-korea", slug: "visa-run-corea-del-sur", pais: "Corea del Sur", nombre: "Corea del Sur",
    estancia: "90 días", reinicia: "Nueva entrada, a criterio del agente",
    reglas: [
      "Los visitantes británicos pueden quedarse hasta 90 días y deben tener billete de salida o regreso. Están exentos de la K-ETA hasta el 31 de diciembre de 2026 y deben presentar una tarjeta de llegada.",
    ],
    salidas: "Fukuoka (también en ferri desde Busan), Osaka, Tokio, Taipéi",
    regreso: "Cada entrada necesita billete de salida o regreso, así que reserva la salida antes de volver.",
    faq: { q: "¿Puedo hacer un visa run de Corea a Japón?", a: "Mucha gente lo hace, pero cada regreso a Corea es una entrada nueva a criterio del agente y necesita billete de salida o regreso." },
    fuentes: [fcdo("south-korea", "Corea del Sur")],
  },
  {
    id: "central-america-ca4", slug: "visa-run-centroamerica-ca4", pais: "Centroamérica (CA-4)", nombre: "Centroamérica (CA-4)", general: true,
    estancia: "90 días compartidos entre 4 países", reinicia: "Solo saliendo de la zona CA-4",
    reglas: [
      "Guatemala, El Salvador, Honduras y Nicaragua forman la zona CA-4. Para visitantes británicos, los 90 días cubren el viaje por Guatemala, El Salvador y Nicaragua en conjunto y no se reinician en sus fronteras. Nicaragua advierte que pueden negarte la entrada sin billete de salida.",
    ],
    salidas: "México, Belice o Costa Rica",
    regreso: "Cruzar entre países CA-4 no es un visa run. Sal de la zona y, al volver, lleva un billete de salida de la región.",
    faq: { q: "¿Pasar de Guatemala a El Salvador reinicia mis días?", a: "No. Los países CA-4 comparten un único periodo de 90 días." },
    fuentes: [fcdo("guatemala", "Guatemala"), fcdo("el-salvador", "El Salvador"), fcdo("nicaragua", "Nicaragua")],
  },
];

function build(r: Run): Guide {
  return {
    key: `visa-run-${r.id}`,
    slug: r.slug,
    title: `Visa Run en ${r.nombre}: Reglas, Salidas y Billete de Salida`,
    h1: `Visa run en ${r.nombre}: lo que permiten las reglas`,
    description: `Cuánto tiempo puedes quedarte en ${r.nombre}, si salir y volver a entrar reinicia algo, las salidas habituales y el billete de salida que necesitarás al volver.`,
    intro: `Un visa run consiste en salir de un país y volver para empezar una estancia nueva. Que funcione en ${r.nombre} depende de cómo se cuenten sus límites. Esto es lo que dicen las fuentes oficiales.`,
    sections: [
      { heading: "Las reglas", paragraphs: [...r.reglas, ...(r.alternativa ? [r.alternativa] : []), ...(r.general ? [] : [PASAPORTE])] },
      { heading: "Adónde va la gente", paragraphs: [`Las salidas más comunes son ${r.salidas}.`, PRUDENCIA] },
      { heading: "Al volver: el billete de salida", paragraphs: [r.regreso, PLAZO, VERIFICAR] },
    ],
    faqs: [r.faq],
    sources: r.fuentes,
    checked: CHECKED,
  };
}

export const ES_VISA_RUN_GUIDES: Guide[] = [
  {
    key: "visa-runs-explained",
    slug: "visa-runs-explicados",
    title: "Visa Runs Explicados: Qué Países Reinician la Estancia y Cuáles No",
    h1: "Visa runs y border runs: qué países reinician tu estancia",
    description:
      "Dónde un visa run inicia una estancia nueva y dónde los límites móviles como 90 en 180 lo hacen inútil, con el billete de salida que necesitas cada vez que vuelves.",
    intro:
      "Algunos países cuentan cada entrada por separado, así que salir y volver inicia una estancia nueva a criterio del agente. Otros usan topes móviles o anuales, y ahí salir no sirve de nada. Esta tabla lo aclara con los datos oficiales del gobierno británico para pasaportes británicos; con otro pasaporte, los plazos pueden variar.",
    table: {
      caption: "Visa runs por país",
      headers: ["País", "Estancia sin visado", "¿Salir la reinicia?"],
      rows: RUNS.map((r) => [r.pais, r.estancia, r.reinicia]),
      rowLinks: RUNS.map((r) => r.slug),
      note: "Para pasaportes británicos, según GOV.UK y fuentes de la UE. El agente decide cada entrada.",
    },
    sections: [
      {
        heading: "La regla que vale en todas partes",
        paragraphs: [
          "Cada nueva entrada es una llegada nueva, y la aerolínea te trata como pasajero solo de ida si no tienes vuelo de salida. Reserva el tramo de salida antes de volver a entrar.",
          PRUDENCIA,
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      { q: "¿Son legales los visa runs?", a: "Salir y volver a entrar es legal donde las reglas cuentan cada entrada por separado, pero el agente puede negarte la entrada si cree que vives o trabajas en el país como turista." },
    ],
    sources: RUNS.flatMap((r) => r.fuentes.slice(0, 1)),
    checked: CHECKED,
  },
  ...RUNS.map(build),
];
