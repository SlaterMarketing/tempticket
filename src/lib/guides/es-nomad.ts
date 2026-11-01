/**
 * Spanish digital nomad visa guides. Same facts and official sources as
 * en-nomad.ts (checked 2026-11-01), translated. Keys match the English pages
 * so hreflang links them.
 */

import { PLAZO, VERIFICAR } from "./es";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Nomada = {
  id: string;
  slug: string;
  pais: string;
  /** "en Tailandia", "en Japón"... */
  en: string;
  programa: string;
  ingresos: string;
  duracion: string;
  hechos: string[];
  llegada: string;
  faq: GuideFaq;
  fuentes: GuideSource[];
};

const COMO_VISITANTE =
  "Si entras como visitante antes de que te concedan el permiso, en el mostrador de facturación eres un turista más: la aerolínea puede pedir a un pasajero con billete solo de ida que demuestre su salida dentro de la estancia permitida. Una reserva temporal cubre ese hueco sin comprar un vuelo que no vas a usar.";

const ingles = (label: string, url: string): GuideSource => ({ label: `${label} (en inglés)`, url });

const NOMADAS: Nomada[] = [
  {
    id: "thailand", slug: "visa-nomada-digital-tailandia", pais: "Tailandia", en: "en Tailandia",
    programa: "Destination Thailand Visa (DTV)",
    ingresos: "Fondos de 500.000 bahts (unas 12.000 libras)", duracion: "5 años, 180 días por entrada",
    hechos: [
      "La DTV es válida cinco años con entradas múltiples y permite 180 días por entrada, ampliables una vez dentro de Tailandia hasta 180 días más. Después sales y vuelves a entrar con la misma visa.",
      "Cubre a teletrabajadores, nómadas digitales y freelancers (la categoría 'workcation'), actividades de 'soft power' tailandés como Muay Thai o cursos de cocina, y familiares dependientes. En la Embajada de Tailandia en Londres la tasa es de 300 libras y se piden fondos de al menos 500.000 bahts; la tasa varía según la embajada donde solicites.",
    ],
    llegada: "Con la DTV en el pasaporte puedes entrar solo con ida, porque la propia visa permite estancias largas. Sin ella, la entrada exenta de visa es mucho más corta y las aerolíneas revisan el billete de salida. " + COMO_VISITANTE,
    faq: { q: "¿Puedo trabajar para clientes tailandeses con la DTV?", a: "La categoría workcation es para trabajo remoto para empleadores o clientes en el extranjero. Trabajar para empresas tailandesas requiere permiso de trabajo." },
    fuentes: [ingles("Embajada de Tailandia en Londres: Destination Thailand Visa", "https://london.thaiembassy.org/en/page/destination-thailand-visa")],
  },
  {
    id: "japan", slug: "visa-nomada-digital-japon", pais: "Japón", en: "en Japón",
    programa: "Nómada digital (Actividades Designadas)",
    ingresos: "10 millones de yenes al año", duracion: "6 meses, sin prórroga",
    hechos: [
      "La visa de nómada digital de Japón exige ingresos anuales de al menos 10 millones de yenes, acreditados con documentos fiscales, de ingresos o de empleo, y un seguro que cubra muerte, lesiones y enfermedad con al menos 10 millones de yenes de cobertura médica.",
      "La estancia es de seis meses y no se puede prorrogar ni renovar. Tu cónyuge o hijos pueden acompañarte, con su propio seguro.",
    ],
    llegada: "La visa se emite antes de viajar, así que puedes volar con ella. Seis meses es el límite absoluto, así que planea tu vuelo de salida dentro de ese plazo.",
    faq: { q: "¿Se puede prorrogar la visa de nómada digital de Japón?", a: "No. Son seis meses sin prórroga, según el Ministerio de Asuntos Exteriores de Japón." },
    fuentes: [ingles("Ministerio de Asuntos Exteriores de Japón: Actividades Designadas (Nómada Digital)", "https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html")],
  },
  {
    id: "spain", slug: "visa-nomada-digital-espana", pais: "España", en: "en España",
    programa: "Visado para teletrabajo de carácter internacional",
    ingresos: "200% del salario mínimo mensual español", duracion: "Hasta 1 año, luego tarjeta de residencia",
    hechos: [
      "Necesitas al menos el 200% del salario mínimo interprofesional mensual, más un 75% por el primer familiar y un 25% por cada uno adicional. El trabajo debe ser a distancia para una empresa de fuera de España; los autónomos pueden trabajar para clientes españoles hasta un 20% de su actividad.",
      "Se pide titulación universitaria o tres años de experiencia en tu campo, al menos tres meses trabajando para la empresa extranjera, seguro médico y antecedentes penales limpios. El visado vale hasta un año, y después puedes pedir la tarjeta de residencia en España.",
    ],
    llegada: "Con el visado concedido puedes entrar solo con ida. España está en el espacio Schengen, así que antes de eso eres un visitante de corta estancia limitado a 90 días en 180.",
    faq: { q: "¿Cuántos ingresos necesito para el visado de nómada digital de España?", a: "Al menos el 200% del salario mínimo mensual español, más si llevas familia. Consulta la cifra vigente del salario mínimo, porque cambia." },
    fuentes: [ingles("Consulado General de España en Londres: Digital Nomad Visa", "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx")],
  },
  {
    id: "portugal", slug: "visa-nomada-digital-portugal", pais: "Portugal", en: "en Portugal",
    programa: "Visado de estancia temporal para trabajo remoto",
    ingresos: "4 veces el salario mínimo mensual portugués", duracion: "Estancia temporal (también hay visado de residencia)",
    hechos: [
      "Hay que demostrar ingresos mensuales medios en los últimos tres meses de al menos cuatro veces el salario mínimo portugués, además de un seguro de viaje que cubra asistencia médica y repatriación.",
      "Portugal también ofrece un visado de residencia para trabajo remoto para quien quiera quedarse más tiempo.",
    ],
    llegada: "La lista de documentos del visado de estancia temporal pide copia del billete de regreso, lo que convierte a Portugal en uno de los pocos visados de nómada donde la reserva de vuelta forma parte de la solicitud. Los ciudadanos de países de la CPLP están exentos del seguro y del billete de regreso.",
    faq: { q: "¿Necesito billete de regreso para el visado de nómada digital de Portugal?", a: "Para el visado de estancia temporal, sí: la lista pide copia del billete de regreso, salvo para ciudadanos de la CPLP." },
    fuentes: [ingles("Embajada de Portugal en Tokio: lista de documentos, visado de estancia temporal para trabajo remoto", "https://toquio.embaixadaportugal.mne.gov.pt/images/vistos/checklists/en/estada_temporaria/temporary_stay_visa_for_remote_work_-_digital_nomads.pdf")],
  },
  {
    id: "croatia", slug: "visa-nomada-digital-croacia", pais: "Croacia", en: "en Croacia",
    programa: "Estancia temporal para nómadas digitales",
    ingresos: "3.622,50 € al mes (o una suma global)", duracion: "Hasta 18 meses",
    hechos: [
      "Necesitas al menos 2,5 veces el salario neto medio mensual de Croacia, actualmente 3.622,50 € al mes, más un 10% por cada familiar. También puedes demostrar ahorros de 43.470 € para 12 meses o 65.205 € para 18 meses.",
      "La estancia es de hasta 18 meses. Debes trabajar para un empleador extranjero o tu propia empresa no croata, tener seguro médico y registrar tu domicilio en los tres días siguientes a tu llegada.",
    ],
    llegada: "Los nacionales exentos de visado pueden solicitarlo en línea y entrar como visitantes; quienes necesitan visado lo piden en una embajada o consulado croata. " + COMO_VISITANTE,
    faq: { q: "¿Se puede prorrogar el permiso de nómada digital de Croacia?", a: "Sí, hasta seis meses, si lo solicitas al menos 60 días antes de que caduque. Se puede volver a solicitar seis meses después de que termine." },
    fuentes: [ingles("Ministerio del Interior de Croacia: estancia temporal de nómadas digitales", "https://mup.gov.hr/aliens-281621/temporary-stay-of-digital-nomads-286853/286853")],
  },
  {
    id: "malta", slug: "visa-nomada-digital-malta", pais: "Malta", en: "en Malta",
    programa: "Nomad Residence Permit",
    ingresos: "42.000 € al año (brutos)", duracion: "1 año, renovable",
    hechos: [
      "Los ingresos brutos mínimos son 42.000 € al año para solicitudes desde el 1 de abril de 2024. Debes teletrabajar para un empleador extranjero, tu propia empresa extranjera o clientes extranjeros como freelance.",
      "También necesitas un seguro médico que cubra la UE y el Reino Unido, un contrato de alquiler o compra en Malta, un certificado de antecedentes penales y una verificación de antecedentes.",
    ],
    llegada: COMO_VISITANTE,
    faq: { q: "¿Qué ingresos necesito para el Nomad Residence Permit de Malta?", a: "42.000 € brutos al año para solicitudes desde el 1 de abril de 2024, según Residency Malta." },
    fuentes: [ingles("Residency Malta Agency: requisitos del Nomad Residence Permit", "https://nomad.residencymalta.gov.mt/nomad-eligibility/")],
  },
  {
    id: "italy", slug: "visa-nomada-digital-italia", pais: "Italia", en: "en Italia",
    programa: "Visado para nómadas digitales y trabajadores remotos",
    ingresos: "Más de 24.780 € al año", duracion: "Visado nacional de larga estancia",
    hechos: [
      "Tus ingresos del año anterior deben superar el umbral de exención de las tasas sanitarias públicas, que la embajada italiana en Ottawa fija en 24.780 €. Necesitas titulación universitaria, tres años de experiencia relevante, o una cualificación más cinco años de experiencia, y un seguro médico para toda la estancia.",
      "La tramitación puede tardar hasta 120 días para nómadas digitales y 90 días para trabajadores remotos.",
    ],
    llegada: "La embajada indica que las estancias de más de 90 días usan un visado nacional con billete solo de ida, mientras que las de hasta 90 días usan un visado Schengen con billete de ida y vuelta.",
    faq: { q: "¿Puedo volar a Italia solo con ida con el visado de nómada digital?", a: "Sí. Para el visado nacional de larga estancia la embajada habla de billete de ida; las estancias Schengen cortas requieren ida y vuelta." },
    fuentes: [ingles("Embajada de Italia en Ottawa: visado para nómadas digitales y trabajadores remotos", "https://ambottawa.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/digital-nomad-remote-worker-visa/")],
  },
  {
    id: "hungary", slug: "visa-nomada-digital-hungria", pais: "Hungría", en: "en Hungría",
    programa: "White Card",
    ingresos: "3.000 € netos al mes", duracion: "1 año, prorrogable una vez",
    hechos: [
      "Necesitas al menos 3.000 € netos al mes durante los seis meses anteriores a la entrada, mantenidos durante la estancia, de un empleador o empresa en el extranjero. No puedes trabajar para clientes húngaros ni ser socio de una empresa húngara.",
      "El permiso dura hasta un año y se puede prorrogar una vez por otro año, si has pasado al menos 90 de los 180 días anteriores en Hungría.",
    ],
    llegada: "La solicitud pide alojamiento, seguro médico y un documento de viaje válido o billete de salida, así que ten una reserva preparada. " + COMO_VISITANTE,
    faq: { q: "¿Cuánto dura la White Card de Hungría?", a: "Hasta un año, prorrogable una vez por otro año." },
    fuentes: [ingles("Dirección General de Extranjería de Hungría: White Card", "https://oif.gov.hu/factsheets/white-card-residency-for-digital-nomads")],
  },
  {
    id: "estonia", slug: "visa-nomada-digital-estonia", pais: "Estonia", en: "en Estonia",
    programa: "Digital Nomad Visa",
    ingresos: "4.500 € netos al mes", duracion: "Hasta 1 año",
    hechos: [
      "Necesitas ingresos netos de al menos 4.500 € al mes de un empleador o empresa registrada fuera de Estonia, o mayoritariamente de clientes extranjeros como freelance, y poder trabajar desde cualquier lugar.",
      "Se solicita en la embajada de Estonia más cercana; la tramitación tarda hasta 30 días.",
    ],
    llegada: "El visado se emite antes de viajar. Si estás exento de visado y vas primero de visita, se aplica la regla Schengen de 90 días en 180 hasta que te lo concedan.",
    faq: { q: "¿El visado de nómada digital de Estonia es lo mismo que la e-Residency?", a: "No. La e-Residency es una identidad digital para gestionar una empresa estonia y no permite vivir en Estonia. El visado de nómada sí, hasta un año." },
    fuentes: [ingles("e-Residency (República de Estonia): Digital Nomad Visa frente a e-Residency", "https://www.e-resident.gov.ee/nomadvisa/")],
  },
  {
    id: "montenegro", slug: "visa-nomada-digital-montenegro", pais: "Montenegro", en: "en Montenegro",
    programa: "Residencia temporal para nómadas digitales",
    ingresos: "Medios económicos (sin mínimo fijo publicado)", duracion: "Hasta 2 años, prorrogable una vez",
    hechos: [
      "El permiso dura hasta dos años y se puede prorrogar una vez por hasta dos más. Necesitas acreditar medios económicos, alojamiento, seguro médico, antecedentes limpios y un contrato que demuestre que trabajas por medios electrónicos para una empresa extranjera o tu propia empresa no montenegrina.",
      "Se solicita en persona en el Ministerio del Interior del lugar donde vives; el permiso se emite en 40 días.",
    ],
    llegada: "Debes haber entrado legalmente en Montenegro, lo que para la mayoría de nómadas significa llegar primero como visitante. " + COMO_VISITANTE,
    faq: { q: "¿El permiso de nómada de Montenegro se pide desde el extranjero?", a: "No: se solicita en persona en el Ministerio del Interior en Montenegro, después de entrar legalmente." },
    fuentes: [ingles("Gobierno de Montenegro: situación legal de los nómadas digitales", "https://digitalnomads.gov.me/article/legal-status-for-nomads")],
  },
  {
    id: "south-korea", slug: "visa-nomada-digital-corea-del-sur", pais: "Corea del Sur", en: "en Corea del Sur",
    programa: "Visa workation (F-1-D)",
    ingresos: "2 veces la RNB per cápita de Corea (unos 65.800 $)", duracion: "1 año, prorrogable 1 año",
    hechos: [
      "Necesitas ingresos después de impuestos superiores al doble de la renta nacional bruta per cápita de Corea del año anterior, unos 65.800 $ al año con la referencia actual, al menos un año de empleo en tu empresa y un seguro médico de 70.000 € para toda la estancia.",
      "La visa es de entradas múltiples durante un año y se puede prorrogar hasta un año en una oficina de inmigración en Corea.",
    ],
    llegada: "La F-1-D la emite una embajada o consulado de Corea antes de viajar. Sin ella, los visitantes exentos de visado deben tener billete de salida o de regreso, según el Ministerio de Asuntos Exteriores británico.",
    faq: { q: "¿Cuánto tengo que ganar para la visa workation de Corea?", a: "Más del doble de la RNB per cápita de Corea del año anterior, después de impuestos: unos 65.800 $ al año con la cifra actual." },
    fuentes: [ingles("Consulado General de Corea en Seattle: visa workation F-1-D", "https://overseas.mofa.go.kr/us-seattle-en/brd/m_23042/view.do?seq=41")],
  },
  {
    id: "malaysia", slug: "visa-nomada-digital-malasia", pais: "Malasia", en: "en Malasia",
    programa: "DE Rantau Nomad Pass",
    ingresos: "24.000 $ al año (tecnología) o 60.000 $ (otros sectores)", duracion: "De 3 a 12 meses, renovable hasta 24",
    hechos: [
      "Los profesionales de tecnología necesitan al menos 24.000 $ al año; los de otros sectores, 60.000 $. El pase dura de 3 a 12 meses y se puede renovar otros 12, hasta 24 meses en total.",
      "Las tasas son 1.080 ringgits por solicitante y 540 por dependiente, más las tasas del pase de inmigración y, si te patrocina MDEC, una fianza reembolsable. Tu pasaporte debe tener más de 14 meses de validez al solicitarlo.",
    ],
    llegada: "Muchos solicitantes llegan primero como visitantes. " + COMO_VISITANTE,
    faq: { q: "¿Quién puede solicitar el pase DE Rantau de Malasia?", a: "Todas las nacionalidades excepto la israelí, mayores de 18 años, que cumplan el umbral de ingresos para su sector." },
    fuentes: [ingles("MDEC: preguntas frecuentes del DE Rantau Pass (versión 10)", "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf")],
  },
  {
    id: "indonesia", slug: "visa-nomada-digital-indonesia-bali", pais: "Indonesia", en: "en Indonesia",
    programa: "Visa de trabajador remoto (E33G)",
    ingresos: "60.000 $ al año", duracion: "Hasta 1 año",
    hechos: [
      "Necesitas ingresos de al menos 60.000 $ al año, un saldo bancario de al menos 2.000 $ en los últimos tres meses y un contrato de trabajo con una empresa de fuera de Indonesia. No puedes vender bienes o servicios ni trabajar para clientes indonesios.",
      "La visa permite una estancia de hasta un año y debe usarse para entrar en los 90 días siguientes a su emisión. La tasa oficial figura como 7.000.000 de rupias por un año.",
    ],
    llegada: "Con la visa de trabajador remoto entras sin el control de billete de salida que se aplica a la visa a la llegada de 30 días.",
    faq: { q: "¿Puedo vivir en Bali con la visa de trabajador remoto?", a: "Sí, hasta un año, siempre que trabajes para una empresa de fuera de Indonesia y no vendas servicios localmente." },
    fuentes: [ingles("Dirección General de Inmigración de Indonesia: preguntas frecuentes del eVisa oficial", "https://evisa.imigrasi.go.id/front/faq/e076131c-0d39-469b-afaf-75fc66aff923")],
  },
  {
    id: "costa-rica", slug: "visa-nomada-digital-costa-rica", pais: "Costa Rica", en: "en Costa Rica",
    programa: "Estancia para nómadas digitales",
    ingresos: "3.000 $ al mes (4.000 $ con familia)", duracion: "Ver sitio oficial",
    hechos: [
      "Se piden ingresos de al menos 3.000 $ al mes procedentes de fuera de Costa Rica, o 4.000 $ al mes para incluir a la familia, convertidos al tipo de cambio oficial del Banco Central.",
      "La tasa del gobierno es de 100 $, que debe llegar íntegra al Ministerio de Hacienda; el banco receptor cobra 15 $ adicionales.",
    ],
    llegada: "La mayoría de nómadas llega como turista mientras se tramita la solicitud, y Costa Rica es conocida por las aerolíneas que revisan el billete de salida. " + COMO_VISITANTE,
    faq: { q: "¿Qué ingresos necesito para la visa de nómada digital de Costa Rica?", a: "3.000 $ al mes para una persona, o 4.000 $ para incluir a la familia, de fuentes de fuera de Costa Rica." },
    fuentes: [ingles("Visit Costa Rica (ICT): requisitos para nómadas digitales", "https://www.visitcostarica.com/digital-nomads/requirements")],
  },
  {
    id: "panama", slug: "visa-nomada-digital-panama", pais: "Panamá", en: "en Panamá",
    programa: "Visa de corta estancia para trabajadores remotos",
    ingresos: "36.000 $ al año", duracion: "9 meses, prorrogable 9 más",
    hechos: [
      "Necesitas ingresos del extranjero de al menos 36.000 $ al año (empleados del sector privado, más de 3.000 $ al mes) y un seguro médico internacional para tu estancia. La tasa es de 250 $.",
      "La visa se concede por hasta nueve meses y se puede prorrogar otros nueve.",
    ],
    llegada: COMO_VISITANTE,
    faq: { q: "¿Cuánto tiempo puedo quedarme en Panamá como trabajador remoto?", a: "Nueve meses, prorrogables una vez por otros nueve." },
    fuentes: [{ label: "ProPanamá (Gobierno de Panamá): visa para nómadas digitales", url: "https://propanama.gob.pa/visa-para-nomadas-digitales/" }],
  },
  {
    id: "barbados", slug: "visa-nomada-digital-barbados", pais: "Barbados", en: "en Barbados",
    programa: "Welcome Stamp",
    ingresos: "50.000 $ al año", duracion: "12 meses, se puede volver a solicitar",
    hechos: [
      "El Welcome Stamp te permite teletrabajar desde Barbados hasta 12 meses si ganas al menos 50.000 $ al año. Las tasas son 2.000 $ por persona y 3.000 $ por familia, que se pagan tras la aprobación.",
      "Los ingresos remotos no tributan en Barbados, aunque el gasto local paga un IVA del 17,5%.",
    ],
    llegada: "Barbados exige a los visitantes un billete de salida o de regreso para entrar, según el Ministerio de Asuntos Exteriores británico, así que si llegas antes de que aprueben tu sello necesitas esa reserva.",
    faq: { q: "¿El Welcome Stamp de Barbados paga impuestos?", a: "Los ingresos remotos no pagan impuesto sobre la renta en Barbados, pero las compras pagan IVA." },
    fuentes: [
      ingles("Visit Barbados: Barbados Welcome Stamp de 12 meses", "https://www.visitbarbados.org/barbados-welcome-stamp"),
      ingles("Ministerio de Asuntos Exteriores británico: requisitos de entrada a Barbados", "https://www.gov.uk/foreign-travel-advice/barbados/entry-requirements"),
    ],
  },
  {
    id: "mauritius", slug: "visa-nomada-digital-mauricio", pais: "Mauricio", en: "en Mauricio",
    programa: "Premium Visa",
    ingresos: "Ver EDB Mauritius", duracion: "1 año, renovable",
    hechos: [
      "La Premium Visa permite quedarse en Mauricio un año, renovable, y es gratuita. Las solicitudes se tramitan a través del Economic Development Board.",
    ],
    llegada: "Los visitantes de Mauricio deben poder demostrar viaje de salida o de regreso, según el Ministerio de Asuntos Exteriores británico, así que ten una reserva si llegas antes de que te concedan la Premium Visa.",
    faq: { q: "¿Cuánto cuesta la Premium Visa de Mauricio?", a: "Nada: la Oficina de Pasaportes e Inmigración dice que es gratuita." },
    fuentes: [
      ingles("Oficina de Pasaportes e Inmigración de Mauricio: Premium Visa", "https://passport.govmu.org/passport/?page_id=595"),
      ingles("Ministerio de Asuntos Exteriores británico: requisitos de entrada a Mauricio", "https://www.gov.uk/foreign-travel-advice/mauritius/entry-requirements"),
    ],
  },
];

function build(n: Nomada): Guide {
  return {
    key: `digital-nomad-visa-${n.id}`,
    slug: n.slug,
    title: `Visa de Nómada Digital de ${n.pais}: Ingresos, Duración y Llegada Solo con Ida`,
    h1: `Visa de nómada digital de ${n.pais}: ${n.programa}`,
    description: `${n.programa}: ingresos exigidos (${n.ingresos}), cuánto dura, las condiciones y qué mostrar si vuelas solo con ida.`,
    intro: `El programa ${n.programa} permite a los teletrabajadores instalarse legalmente ${n.en}. Estos son los requisitos comprobados en fuentes oficiales y cómo funciona la llegada para nómadas que suelen viajar solo con ida.`,
    sections: [
      { heading: "Los requisitos", paragraphs: n.hechos },
      { heading: "Llegar solo con ida", paragraphs: [n.llegada, PLAZO, VERIFICAR] },
    ],
    faqs: [n.faq],
    sources: n.fuentes,
    checked: CHECKED,
  };
}

export const ES_NOMAD_GUIDES: Guide[] = [
  {
    key: "digital-nomad-visas-compared",
    slug: "visas-nomada-digital-comparadas",
    title: "Visas de Nómada Digital Comparadas: Ingresos y Duración por País",
    h1: "Visas de nómada digital comparadas",
    description:
      "Ingresos exigidos y duración de 17 visas de nómada digital, de la DTV de Tailandia a España, Portugal, Japón y Costa Rica, comprobadas en fuentes oficiales.",
    intro:
      "Las visas de nómada digital varían muchísimo: unas piden unos pocos miles de euros al mes y otras 10 millones de yenes al año; unas duran seis meses y otras cinco años. Esta tabla compara las principales, con cada cifra tomada de la página del gobierno o la embajada enlazada en la guía de cada país.",
    table: {
      caption: "Visas de nómada digital: ingresos y duración",
      headers: ["País", "Programa", "Ingresos o fondos", "Duración"],
      rows: NOMADAS.map((n) => [n.pais, n.programa, n.ingresos, n.duracion]),
      rowLinks: NOMADAS.map((n) => n.slug),
      note: "Los umbrales cambian, a menudo cada año. Consulta la fuente oficial en la guía de cada país antes de solicitar.",
    },
    sections: [
      {
        heading: "Lo que nadie cuenta: cómo llegar",
        paragraphs: [
          "La mayoría de nómadas viaja solo con ida, y muchos llegan como visitantes antes de que les aprueben el permiso, o lo solicitan desde dentro del país. En ese momento la aerolínea te trata como turista y puede pedirte prueba de salida. El visado de estancia temporal de Portugal incluso pide billete de regreso en la solicitud.",
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      { q: "¿Qué visa de nómada digital pide menos ingresos?", a: "Entre estas, el DE Rantau de Malasia para tecnología (24.000 $ al año) e Italia (más de 24.780 € al año) son las más bajas, aunque cada una tiene otras condiciones. La DTV de Tailandia pide ahorros en lugar de ingresos." },
      { q: "¿Cuál dura más?", a: "La DTV de Tailandia es válida cinco años, con 180 días por entrada." },
    ],
    sources: NOMADAS.flatMap((n) => n.fuentes.slice(0, 1)),
    checked: CHECKED,
  },
  ...NOMADAS.map(build),
];
