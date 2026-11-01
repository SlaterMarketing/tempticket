/**
 * Spanish guides on official entry schemes (ETIAS, EES, ETAs, arrival cards,
 * transit visas, ESTA). Same facts and official sources as en-official.ts
 * (checked 2026-11-01), translated. Keys match the English pages.
 */

import { PLAZO, VERIFICAR } from "./es";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nombre: string): GuideSource => ({
  label: `Ministerio de Asuntos Exteriores británico: requisitos de entrada de ${nombre} (en inglés)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

const PASAPORTE =
  "Las cifras de estancia que da el Ministerio de Asuntos Exteriores británico son para pasaportes británicos. Con otro pasaporte pueden variar, así que confírmalas en el sitio oficial de inmigración del país.";

export const ES_OFFICIAL_GUIDES: Guide[] = [
  {
    key: "etias-explained",
    slug: "etias-autorizacion-viaje-europa",
    title: "ETIAS Explicado: Precio, Quién lo Necesita y Cuándo Empieza",
    h1: "ETIAS: la nueva autorización de viaje para Europa",
    description: "Qué es el ETIAS, la tasa de 20 €, quién está exento, cuándo prevé la UE que empiece y cómo encaja con el billete de regreso y la regla de los 90 días.",
    intro: "El ETIAS es una autorización de viaje en línea que necesitarán los visitantes exentos de visado antes de viajar a la mayoría de países europeos, parecida al ESTA de EE. UU. No sustituye al visado para quien lo necesita, ni cambia la regla de 90 días en 180.",
    sections: [
      { heading: "Precio y exenciones", paragraphs: ["La Comisión Europea fijó la tasa del ETIAS en 20 €, frente a los 7 € previstos al principio. Los menores de 18 y los mayores de 70 no pagan."] },
      { heading: "Cuándo empieza", paragraphs: ["En julio de 2025 la Comisión dijo que el ETIAS empezaría a funcionar a finales de 2026, después de que el Sistema de Entradas y Salidas estuviera plenamente operativo. Las fechas ya se han retrasado antes, así que consulta el sitio oficial de la UE para saber si está activo cuando viajes."] },
      { heading: "Lo que no cambia", paragraphs: ["El ETIAS no cambia lo que los guardias fronterizos pueden pedirte, que incluye pruebas de que vas a salir. Quien llega solo con ida sigue siendo quien más probabilidades tiene de que le pidan billete de regreso o de salida.", VERIFICAR] },
    ],
    faqs: [
      { q: "¿Necesito ETIAS si tengo visado Schengen?", a: "No. El ETIAS es para viajeros que no necesitan visado. Quien necesita visado lo sigue pidiendo como siempre." },
      { q: "¿Cuánto cuesta el ETIAS?", a: "20 €, con exención para menores de 18 y mayores de 70, según la Comisión Europea." },
    ],
    sources: [{ label: "Comisión Europea: el ETIAS costará 20 € (en inglés)", url: "https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en" }],
    checked: CHECKED,
  },
  {
    key: "ees-entry-exit-system",
    slug: "ees-sistema-entradas-salidas-europa",
    title: "EES: el Sistema de Entradas y Salidas de Europa y el Fin de los Sellos",
    h1: "El Sistema de Entradas y Salidas (EES) de la UE, explicado",
    description: "El Sistema de Entradas y Salidas sustituyó los sellos del pasaporte para visitantes de fuera de la UE. Cuándo empezó, qué supone para la regla de los 90 días y por qué los excesos de estancia se detectan al instante.",
    intro: "Desde el 12 de octubre de 2025, los viajeros de fuera de la UE en estancias cortas se registran electrónicamente al cruzar las fronteras exteriores de los países europeos participantes, en lugar de recibir un sello. El sistema funciona a pleno rendimiento desde el 10 de abril de 2026.",
    sections: [
      { heading: "Qué ha cambiado", paragraphs: ["El EES registra cada entrada y salida de forma digital y sustituye el sellado del pasaporte en la mayor parte de Europa. Se aplica a los viajeros de fuera de la UE en visitas cortas, necesiten o no visado."] },
      { heading: "Por qué importa para la regla de los 90 días", paragraphs: ["Las estancias cortas están limitadas a 90 días en cualquier periodo de 180 en todo el espacio Schengen. Con sellos, los agentes contaban a mano; con el EES la cuenta es automática, así que un exceso de estancia aparece al momento al salir o en tu siguiente viaje.", "Si planeas un viaje largo por Europa, reserva tu salida dentro de tus 90 días y ten la reserva a mano. Los guardias fronterizos pueden preguntarte cómo y cuándo saldrás.", PLAZO] },
    ],
    faqs: [
      { q: "¿Me seguirán sellando el pasaporte en Europa?", a: "En la mayoría de países participantes, no. El EES sustituyó el sellado y funciona a pleno rendimiento desde el 10 de abril de 2026." },
      { q: "¿El EES se aplica si tengo visado?", a: "Sí. Cubre a los viajeros de fuera de la UE en estancias cortas, estén exentos de visado o tengan visado Schengen." },
    ],
    sources: [
      { label: "Comisión Europea: el nuevo EES entró en funcionamiento el 12 de octubre de 2025 (en inglés)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
      { label: "Embajada de Polonia: EES plenamente operativo desde el 10 de abril de 2026 (en inglés)", url: "https://www.gov.pl/web/usa-en/entryexit-system---full-implementation-from-april-10th-2026" },
      { label: "SEAE: lo que se debe y no se debe hacer con el visado Schengen (en inglés)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
    ],
    checked: CHECKED,
  },
  {
    key: "uk-eta",
    slug: "eta-reino-unido-autorizacion-electronica",
    title: "ETA del Reino Unido: Precio, Quién la Necesita y Tránsitos",
    h1: "La autorización electrónica de viaje (ETA) del Reino Unido",
    description: "La mayoría de visitantes exentos de visado necesitan ahora una ETA para el Reino Unido. Cuánto cuesta, cuánto tiempo puedes quedarte, quién no la necesita y cuándo hace falta para una conexión.",
    intro: "La mayoría de visitantes que no necesitan visado para el Reino Unido, incluidos europeos, estadounidenses, canadienses y australianos, necesitan ahora una autorización electrónica de viaje (ETA) antes de viajar. También cubre Jersey, Guernsey y la Isla de Man.",
    sections: [
      { heading: "Precio y duración de la estancia", paragraphs: ["La ETA cuesta 20 libras si la pides en el servicio oficial de GOV.UK. Otras webs pueden cobrar más. Permite visitas de hasta seis meses cada vez, pero no garantiza la entrada.", "Cada viajero necesita la suya, incluidos bebés y niños. Los ciudadanos británicos e irlandeses, y quienes tienen permiso para vivir, trabajar o estudiar en el Reino Unido, no la necesitan."] },
      { heading: "Conexiones", paragraphs: ["Necesitas ETA si vas a pasar por el control fronterizo británico al cambiar de vuelo. Si no sabes si tu conexión pasa por ese control, pregunta a tu aerolínea."] },
      { heading: "Demostrar que te irás", paragraphs: ["La ETA no sustituye las normas habituales para visitantes: pueden preguntarte cuánto tiempo te quedas y cómo saldrás. Una salida reservada dentro de los seis meses responde a eso.", VERIFICAR] },
    ],
    faqs: [
      { q: "¿Cuánto cuesta la ETA del Reino Unido?", a: "20 libras en el servicio oficial de GOV.UK. Evita las webs que cobran más." },
      { q: "¿Los niños necesitan ETA para el Reino Unido?", a: "Sí. Cada viajero necesita la suya, incluidos bebés y niños." },
    ],
    sources: [{ label: "GOV.UK: solicitar una autorización electrónica de viaje (ETA) (en inglés)", url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta" }],
    checked: CHECKED,
  },
  {
    key: "canada-eta",
    slug: "eta-canada-autorizacion-electronica",
    title: "eTA de Canadá: Precio, Quién la Necesita y Billete de Regreso",
    h1: "La eTA de Canadá (autorización electrónica de viaje)",
    description: "Los viajeros exentos de visado que vuelan a Canadá o hacen escala allí necesitan una eTA. El precio de 7 dólares canadienses, quién la necesita y qué pueden pedir los agentes fronterizos.",
    intro: "Los extranjeros exentos de visado que vuelan a Canadá, o hacen tránsito en un aeropuerto canadiense, necesitan una autorización electrónica de viaje (eTA). Cuesta 7 dólares canadienses en el sitio oficial del Gobierno de Canadá.",
    sections: [
      { heading: "Quién la necesita", paragraphs: ["Los viajeros de países exentos de visado que llegan en avión o hacen conexión en un aeropuerto canadiense. No hace falta para llegadas por tierra o mar. Los ciudadanos con doble nacionalidad canadiense necesitan un pasaporte canadiense.", "Algunas nacionalidades que normalmente necesitan visado pueden usar la eTA con condiciones, como los mexicanos que han tenido un visado canadiense en los últimos diez años o tienen un visado de no inmigrante de EE. UU. vigente y llegan en avión."] },
      { heading: "Billete de regreso y fondos", paragraphs: ["El Ministerio de Asuntos Exteriores británico advierte de que los agentes fronterizos canadienses pueden pedir un billete de regreso o de salida y prueba de fondos suficientes, aunque te alojes con amigos o familia.", VERIFICAR] },
    ],
    faqs: [
      { q: "¿Cuánto cuesta la eTA de Canadá?", a: "7 dólares canadienses en el sitio oficial del Gobierno de Canadá." },
      { q: "¿Necesito eTA para entrar en coche desde EE. UU.?", a: "No. La eTA es para viajes en avión. Las llegadas por tierra o mar no la necesitan, aunque las normas de visado se siguen aplicando." },
    ],
    sources: [
      { label: "Gobierno de Canadá: autorización electrónica de viaje (eTA) (en inglés)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html" },
      fcdo("canada", "Canadá"),
    ],
    checked: CHECKED,
  },
  {
    key: "thailand-digital-arrival-card",
    slug: "tarjeta-digital-llegada-tailandia-tdac",
    title: "Tarjeta Digital de Llegada de Tailandia (TDAC) y Exención de 30 Días",
    h1: "La tarjeta digital de llegada de Tailandia (TDAC) y los controles de entrada",
    description: "Todo extranjero que llega a Tailandia debe rellenar la TDAC en línea. Cuándo hacerlo, la estancia exenta de visado y los fondos y el billete de salida que puede pedir inmigración.",
    intro: "Todos los extranjeros que llegan a Tailandia por aire, tierra o mar deben rellenar en línea la Thailand Digital Arrival Card (TDAC) antes de llegar. Es una de las tres cosas que pueden darte problemas, junto con la prueba de fondos y el billete de salida.",
    sections: [
      { heading: "Cuándo rellenarla", paragraphs: ["Rellena la TDAC en línea en los tres días anteriores a tu llegada. Usa solo el sitio oficial del gobierno tailandés."] },
      { heading: "La exención de visado", paragraphs: ["Para visitantes británicos, el Ministerio de Asuntos Exteriores británico dice que la entrada exenta de visado permite ahora hasta 30 días, solo para turismo. Las normas de Tailandia han cambiado varias veces y dependen del pasaporte, así que consulta lo vigente para el tuyo."] },
      { heading: "Fondos y billete de salida", paragraphs: ["Inmigración puede pedir prueba de fondos de al menos 10.000 bahts por persona o 20.000 por familia, y prueba de viaje de salida o regreso. Las aerolíneas comprueban el billete de salida en el mostrador.", PLAZO, VERIFICAR] },
    ],
    faqs: [
      { q: "¿La TDAC de Tailandia es gratuita?", a: "Sí, en el sitio oficial. Rellénala en los tres días anteriores a la llegada." },
      { q: "¿Cuánto dinero necesito para entrar en Tailandia?", a: "Inmigración puede pedir al menos 10.000 bahts por persona o 20.000 por familia, según el Ministerio de Asuntos Exteriores británico." },
    ],
    sources: [fcdo("thailand", "Tailandia")],
    checked: CHECKED,
  },
  {
    key: "malaysia-digital-arrival-card",
    slug: "tarjeta-digital-llegada-malasia-mdac",
    title: "Tarjeta Digital de Llegada de Malasia (MDAC): Cuándo la Necesitas",
    h1: "La tarjeta digital de llegada de Malasia (MDAC)",
    description: "Quien entra en Malasia rellena una tarjeta digital de llegada antes de viajar, y la aerolínea puede pedirla al facturar. Quién la necesita y qué más tener preparado.",
    intro: "Los visitantes de Malasia rellenan en línea la Malaysia Digital Arrival Card antes de viajar, y la aerolínea puede pedirla al facturar. Si solo haces tránsito sin pasar por inmigración, no la necesitas.",
    sections: [
      { heading: "Las reglas", paragraphs: ["Los visitantes británicos no necesitan visado para turismo y normalmente reciben 90 días a la llegada. El pasaporte debe tener seis meses de validez desde la llegada y estar en buen estado, sin páginas que falten.", PASAPORTE] },
      { heading: "Llegar solo con ida", paragraphs: ["El aviso británico no incluye una regla de billete de salida para Malasia, pero las aerolíneas pueden preguntar a los pasajeros solo de ida cómo van a salir. Los saltos cortos a Singapur, Bangkok o Bali son salidas habituales.", PLAZO, VERIFICAR] },
    ],
    faqs: [{ q: "¿Necesito la MDAC si solo hago tránsito en KLIA?", a: "No si no pasas por inmigración, según el Ministerio de Asuntos Exteriores británico." }],
    sources: [fcdo("malaysia", "Malasia")],
    checked: CHECKED,
  },
  {
    key: "singapore-arrival-card",
    slug: "sg-arrival-card-singapur",
    title: "SG Arrival Card: Cuándo Rellenarla Antes de Volar a Singapur",
    h1: "La SG Arrival Card de Singapur",
    description: "Los visitantes de Singapur deben rellenar la SG Arrival Card electrónica en los tres días anteriores a la llegada. Qué incluye y cuánto tiempo puedes quedarte.",
    intro: "Los visitantes deben rellenar la SG Arrival Card electrónica, que incluye una declaración de salud, en los tres días anteriores a su llegada a Singapur. Hacer una declaración falsa es un delito.",
    sections: [
      { heading: "Cuánto tiempo puedes quedarte", paragraphs: ["Los ciudadanos británicos pueden visitar Singapur sin visado por turismo o negocios. El agente de inmigración decide la duración, normalmente entre 30 y 90 días. El pasaporte debe tener seis meses de validez desde la llegada.", PASAPORTE] },
      { heading: "Billete de salida", paragraphs: ["Las aerolíneas que vuelan a Singapur pueden pedir igualmente una reserva de salida a los pasajeros solo de ida. Kuala Lumpur, Bangkok, Bali y Yakarta son salidas cortas habituales.", VERIFICAR] },
    ],
    faqs: [{ q: "¿Cuándo debo rellenar la SG Arrival Card?", a: "En los tres días anteriores a tu llegada a Singapur." }],
    sources: [fcdo("singapore", "Singapur")],
    checked: CHECKED,
  },
  {
    key: "philippines-etravel",
    slug: "etravel-filipinas-registro",
    title: "Registro eTravel de Filipinas y Billete de Salida",
    h1: "eTravel de Filipinas: registro, código QR y billete de salida",
    description: "Todos los que llegan a Filipinas necesitan un código QR de eTravel. Cuándo registrarse, la estancia sin visado y el billete de salida que se espera que muestres.",
    intro: "Quien llega a Filipinas debe registrarse en el sistema gratuito eTravel en los tres días anteriores a la llegada y mostrar el código QR. También se espera que la mayoría de visitantes tenga prueba de viaje de regreso o salida.",
    sections: [
      { heading: "eTravel", paragraphs: ["El registro es gratuito y debe hacerse en los tres días anteriores a tu llegada. Guarda el código QR en el móvil y también una captura."] },
      { heading: "Duración de la estancia y billete de salida", paragraphs: ["Los visitantes británicos pueden quedarse hasta 30 días sin visado y pedir una prórroga dentro del país. El Ministerio de Asuntos Exteriores británico dice que se espera que la mayoría tenga prueba de viaje de regreso o salida, y tanto inmigración como las aerolíneas pueden pedirla.", PASAPORTE, PLAZO, VERIFICAR] },
    ],
    faqs: [{ q: "¿El eTravel es gratuito?", a: "Sí. Regístrate en los tres días anteriores a la llegada y evita las webs que cobran." }],
    sources: [fcdo("philippines", "Filipinas")],
    checked: CHECKED,
  },
  {
    key: "indonesia-e-voa-bali-levy",
    slug: "visa-a-la-llegada-indonesia-tasa-bali",
    title: "Visa a la Llegada de Indonesia, e-VOA y Tasa Turística de Bali",
    h1: "La visa a la llegada de Indonesia, el e-VOA y la tasa turística de Bali",
    description: "Lo que necesitas para aterrizar en Bali o Yakarta: la visa a la llegada de 30 días y su regla de billete de salida, la declaración de aduanas en línea y la tasa de Bali.",
    intro: "La mayoría de visitantes de Indonesia usa una visa a la llegada de 30 días, pedida en línea por adelantado (e-VOA) o en el aeropuerto. Para obtenerla necesitas prueba de un viaje de salida o regreso.",
    sections: [
      { heading: "La visa a la llegada", paragraphs: ["Para visitantes británicos, la visa a la llegada cuesta 500.000 rupias, en efectivo o con tarjeta, es de una sola entrada y dura 30 días. Si pides el e-VOA en línea, hazlo al menos una semana antes de salir. Comprueba si tu pasaporte puede usar la visa a la llegada.", "La prueba de un viaje de salida o regreso es condición de la visa, por eso las aerolíneas que vuelan a Indonesia la comprueban en el mostrador."] },
      { heading: "Antes de aterrizar", paragraphs: ["Rellena la declaración gratuita de aduanas y salud en línea en las 72 horas anteriores a la llegada. Bali cobra además a los turistas extranjeros una tasa de 150.000 rupias, que se paga en línea o a la llegada.", PLAZO, VERIFICAR] },
    ],
    faqs: [
      { q: "¿Necesito billete de salida para Bali?", a: "Sí, la prueba de un viaje de salida o regreso es obligatoria para la visa a la llegada." },
      { q: "¿Cuánto es la tasa turística de Bali?", a: "150.000 rupias, que se pagan en línea o a la llegada." },
    ],
    sources: [fcdo("indonesia", "Indonesia")],
    checked: CHECKED,
  },
  {
    key: "schengen-airport-transit-visa",
    slug: "visado-transito-aeroportuario-schengen",
    title: "Visado de Tránsito Aeroportuario Schengen: Quién lo Necesita",
    h1: "¿Necesitas visado de tránsito para cambiar de avión en Europa?",
    description: "Los nacionales de 12 países necesitan visado de tránsito aeroportuario para hacer escala en un aeropuerto Schengen. La lista, las exenciones habituales y qué comprobar antes de reservar.",
    intro: "Cambiar de avión en un aeropuerto Schengen sin salir de la zona internacional normalmente no exige visado. La excepción son los nacionales de una lista común corta de la UE, que necesitan visado de tránsito aeroportuario, salvo que tengan ciertos visados o permisos de residencia.",
    sections: [
      { heading: "La lista común", paragraphs: ["La lista de toda la UE incluye a los nacionales de Afganistán, Bangladés, la República Democrática del Congo, Eritrea, Etiopía, Ghana, Irán, Irak, Nigeria, Pakistán, Somalia y Sri Lanka. Cada país Schengen puede añadir otras nacionalidades para sus aeropuertos, así que consulta el país donde harás la conexión."] },
      { heading: "Exenciones habituales", paragraphs: ["Suelen estar exentos quienes tienen un visado o permiso de residencia Schengen vigente, o un permiso de residencia vigente de países como EE. UU., Canadá, Japón, Andorra, Mónaco, San Marino o Suiza que les permita volver. La tripulación aérea también está exenta.", "Si necesitas visado de tránsito, la solicitud suele pedir los datos del vuelo de continuación, así que ten listo el itinerario completo.", VERIFICAR] },
    ],
    faqs: [{ q: "¿Los nigerianos necesitan visado de tránsito para Ámsterdam o Fráncfort?", a: "Nigeria está en la lista común de la UE, así que sí, salvo que se aplique una exención, como un visado Schengen vigente o un permiso de residencia de EE. UU. o Canadá." }],
    sources: [{ label: "Oficina de Ciudadanía y Migración de Letonia: visados de tránsito aeroportuario (lista común de la UE) (en inglés)", url: "https://www.pmlp.gov.lv/en/airport-transit" }],
    checked: CHECKED,
  },
  {
    key: "uk-transit-visa",
    slug: "visado-transito-reino-unido",
    title: "Visado de Tránsito del Reino Unido: Direct Airside o Visitor in Transit",
    h1: "¿Necesitas visado de tránsito para el Reino Unido?",
    description: "Cuándo necesitas un visado Direct Airside Transit o Visitor in Transit para hacer conexión en el Reino Unido, y cuándo te cubre una ETA u otro visado.",
    intro: "Que necesites visado de tránsito para el Reino Unido depende de tu nacionalidad y de si tu conexión pasa por el control fronterizo británico. Usa el comprobador de GOV.UK para tu pasaporte; así encajan las opciones.",
    sections: [
      { heading: "Los dos visados de tránsito", paragraphs: ["El Direct Airside Transit visa es para cambiar de vuelo sin pasar por el control fronterizo británico. El Visitor in Transit visa es para pasar el control y salir en 48 horas. Las estancias más largas, o los tránsitos frecuentes durante más de seis meses, necesitan un Standard Visitor visa."] },
      { heading: "Cuándo no lo necesitas", paragraphs: ["No necesitas visado de tránsito si tienes ETA del Reino Unido, Standard Visitor visa, Marriage Visitor visa, permiso familiar del EU Settlement Scheme o un documento de viaje del Home Office. Tu aerolínea puede decirte si tu conexión pasa por el control fronterizo.", "En cualquier caso, ten preparados los datos del vuelo de continuación: un tránsito consiste precisamente en volver a salir.", VERIFICAR] },
    ],
    faqs: [{ q: "¿Los colombianos necesitan visado de tránsito para el Reino Unido?", a: "Desde el 26 de noviembre de 2024, los colombianos necesitan visado de tránsito aeroportuario directo para hacer tránsito en el Reino Unido, salvo que se aplique una exención." }],
    sources: [
      { label: "GOV.UK: visados de tránsito (en inglés)", url: "https://www.gov.uk/transit-visa" },
      { label: "GOV.UK: memorando explicativo HC 334 (Colombia) (en inglés)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024/explanatory-memorandum-to-the-statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024-accessible" },
    ],
    checked: CHECKED,
  },
  {
    key: "esta-cost-and-return-ticket",
    slug: "esta-precio-billete-de-regreso",
    title: "Precio del ESTA en 2026 (40 $) y la Regla del Billete de Regreso",
    h1: "ESTA: la tasa de 40 $ y el billete de regreso obligatorio",
    description: "La tasa del ESTA subió a 40 $ el 30 de septiembre de 2025. Qué cubre el ESTA y por qué los viajeros del Programa de Exención de Visado necesitan billete de regreso o salida.",
    intro: "La tasa del ESTA, la autorización en línea para viajeros del Programa de Exención de Visado a EE. UU. (como los chilenos o los españoles), pasó de 21 $ a 40 $ el 30 de septiembre de 2025. Págala solo en el sitio oficial de CBP.",
    sections: [
      { heading: "La regla del billete de regreso", paragraphs: ["Los viajeros con exención de visado deben tener billete de regreso o salida al volar a EE. UU., y las aerolíneas lo comprueban antes del embarque. El tiempo en Canadá, México y las islas cercanas suele contar dentro de los 90 días, así que cruzar la frontera no reinicia tu estancia.", PLAZO, VERIFICAR] },
    ],
    faqs: [{ q: "¿Cuánto cuesta el ESTA?", a: "40 $ desde el 30 de septiembre de 2025, en el sitio oficial de CBP." }],
    sources: [
      { label: "Fragomen: el DHS aplica nuevas tasas para ESTA, EVUS e I-94 terrestre (en inglés)", url: "https://www.fragomen.com/insights/united-states-dhs-announces-implementation-of-new-fees-for-esta-evus-and-land-border-i-94-forms-starting-september-30.html" },
      { label: "Sitio oficial de solicitud del ESTA (CBP)", url: "https://esta.cbp.dhs.gov/" },
    ],
    checked: CHECKED,
  },
];
