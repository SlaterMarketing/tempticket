/** Spanish guides. Same rules as the English ones: general, cautious, point to official sources. */

import type { Guide, GuideUi } from "./types";

const VERIFICAR =
  "Cuando recibas la reserva, entra en la página de \"gestionar reserva\" de la aerolínea y búscala con el código de reserva (PNR) y tu apellido. Si la ves ahí, el agente de facturación también la verá. Guarda una captura de pantalla además del correo.";

const PLAZO =
  "Estas reservas se mantienen durante un tiempo limitado (normalmente unas 48 horas) y luego caducan. Resérvala poco antes de facturar o de tu cita consular, no con semanas de antelación.";

export const ES_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "boleto-de-salida",
    title: "Boleto de salida: qué es y cómo conseguirlo sin comprar un vuelo",
    h1: "Boleto de salida (prueba de viaje de salida), explicado",
    description:
      "Por qué las aerolíneas y migración piden un boleto de salida, qué cuenta como prueba y cómo obtener una reserva de vuelo verificable sin pagar un billete que no vas a usar.",
    intro:
      "Muchos países solo dejan entrar a los visitantes si pueden demostrar que se irán. Las aerolíneas lo comprueban al facturar, porque si te niegan la entrada tienen que llevarte de vuelta a su cargo. Si viajas con un billete solo de ida, necesitas una forma de mostrar un vuelo de salida o de regreso.",
    sections: [
      {
        heading: "Quién lo pide",
        paragraphs: [
          "Lo piden la aerolínea al facturar y el oficial de migración al llegar. En la práctica, es mucho más habitual que lo pida la aerolínea, porque su sistema marca a los pasajeros con billete de ida a destinos que exigen salida.",
          "Los consulados también piden un itinerario de vuelo en muchas solicitudes de visado, como la visa Schengen. La mayoría aceptan una reserva y desaconsejan comprar el billete antes de que se apruebe el visado.",
        ],
      },
      {
        heading: "Qué cuenta como prueba",
        paragraphs: [
          "Un vuelo que salga del país, a cualquier destino, con un código de reserva que el agente pueda ver. En fronteras terrestres a veces aceptan un boleto de autobús, pero las aerolíneas suelen querer un vuelo.",
          "Una reserva real tiene un PNR que puedes consultar en la web de la aerolínea. Un PDF editado o falso no es una prueba, y presentarlo puede costarte la entrada o algo peor.",
        ],
      },
      {
        heading: "Tus opciones",
        paragraphs: [
          "Comprar una tarifa reembolsable y cancelarla después. Funciona, pero inmovilizas cientos de dólares y el reembolso puede tardar semanas.",
          "Comprar el vuelo de salida más barato y no usarlo. Es sencillo, pero pierdes el dinero.",
          "Usar un servicio de boleto de salida. Pagas una pequeña tarifa por una reserva real que se mantiene poco tiempo y luego se libera. Es lo que hace la mayoría de nómadas digitales y mochileros.",
        ],
      },
      { heading: "Cómo comprobar que es real", paragraphs: [VERIFICAR, PLAZO] },
    ],
    faqs: [
      {
        q: "¿Es legal usar una reserva como boleto de salida?",
        a: "Mantener una reserva de vuelo es una función normal de las aerolíneas y los consulados aceptan reservas a diario. Lo que no es aceptable es un documento falsificado. Consulta siempre las normas de tu destino en una fuente oficial.",
      },
      {
        q: "¿El vuelo de salida tiene que ir a mi país?",
        a: "No. Solo tiene que salir del país al que entras. Lo habitual es un vuelo corto a un país vecino.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "reserva-de-vuelo-para-visa-schengen",
    title: "Reserva de vuelo para la visa Schengen (sin comprar el billete)",
    h1: "Reserva de vuelo para tu solicitud de visa Schengen",
    description:
      "La mayoría de consulados Schengen piden una reserva de vuelo, no un billete pagado. Cómo conseguir un itinerario de ida y vuelta verificable para tu cita.",
    intro:
      "La solicitud de visa Schengen suele pedir un itinerario de vuelo que muestre cómo llegarás y cómo saldrás. Muchos consulados dicen expresamente que no compres el billete antes de que se conceda la visa y que basta con una reserva.",
    sections: [
      {
        heading: "Qué piden los consulados",
        paragraphs: [
          "Un viaje de ida y vuelta, o una entrada y una salida, que coincida con las fechas de tu solicitud. La reserva debe llevar tu nombre exactamente como aparece en el pasaporte.",
          "Los requisitos cambian según el país y el centro de visados, así que revisa la lista del consulado donde presentas la solicitud. Algunos piden más que una reserva.",
        ],
      },
      {
        heading: "Cuándo hacer la reserva",
        paragraphs: [
          "Haz la reserva uno o dos días antes de la cita para que siga activa cuando revisen tus documentos. Es normal que caduque antes de la decisión.",
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "¿Necesito ida y vuelta o solo ida?",
        a: "La mayoría de solicitudes Schengen esperan ida y vuelta, o al menos una salida confirmada del espacio Schengen. Una reserva de ida y vuelta cubre ambas cosas.",
      },
      {
        q: "¿Qué pasa si la reserva caduca antes de la decisión?",
        a: "Es lo normal. Los consulados valoran tu plan de viaje y recomiendan no comprar billetes hasta tener la visa.",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "reserva-de-vuelo-para-visa",
    title: "Reserva de vuelo para visa: reserva real o PDF falso",
    h1: "Reserva de vuelo para solicitar una visa",
    description:
      "Qué es una reserva de vuelo para visa (\"dummy ticket\"), por qué la piden los consulados, cómo distinguir una reserva real de un PDF falso y cómo conseguir una verificable.",
    intro:
      "Muchos consulados piden un itinerario de vuelo con la solicitud de visa, pero desaconsejan comprar el billete antes de tener la decisión. La solución habitual es una reserva real que se mantiene en el sistema de la aerolínea durante poco tiempo.",
    sections: [
      {
        heading: "Reserva real o PDF falso",
        paragraphs: [
          "Una reserva real tiene un código (PNR) que puedes consultar en la web de la aerolínea. Un documento falso solo aparenta ser una reserva y no hay nada detrás.",
          "Los consulados pueden comprobarlo. Presentar un documento falsificado puede provocar la denegación de la visa y perjudicar solicitudes futuras. Usa solo reservas que puedas verificar tú mismo.",
        ],
      },
      {
        heading: "Los datos tienen que cuadrar",
        paragraphs: [
          "Tu nombre debe coincidir exactamente con el pasaporte. Las fechas deben coincidir con el formulario y con el alojamiento.",
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es legal?",
        a: "Una reserva de vuelo real es legal y es lo que piden muchos consulados. Un documento editado o falsificado no lo es.",
      },
    ],
  },
  {
    key: "onward-ticket-costa-rica",
    slug: "boleto-de-salida-costa-rica",
    title: "Boleto de salida para Costa Rica: qué piden",
    h1: "Boleto de salida para Costa Rica",
    description:
      "Costa Rica pide a los visitantes prueba de que saldrán del país y las aerolíneas lo exigen. Qué cuenta como prueba y cómo conseguir una reserva de vuelo verificable.",
    intro:
      "Costa Rica es conocida entre viajeros por pedir prueba de salida. Se espera que los visitantes muestren un boleto que salga del país dentro de la estancia permitida, y las aerolíneas lo revisan antes de dejarte embarcar.",
    sections: [
      {
        heading: "Qué esperar",
        paragraphs: [
          "Las aerolíneas que vuelan a San José y Liberia suelen pedir el boleto de salida al facturar. Migración también puede pedirlo al llegar.",
          "Algunos viajeros usan un boleto de autobús a Nicaragua o Panamá. Que lo acepten depende de la aerolínea y del oficial, así que un vuelo es más seguro.",
          "Confirma las normas vigentes para tu pasaporte con la Dirección General de Migración y Extranjería o con la embajada de Costa Rica.",
        ],
      },
      { heading: "Cómo hacerlo bien", paragraphs: [PLAZO, VERIFICAR] },
    ],
    faqs: [
      {
        q: "¿Vale un boleto de autobús para salir de Costa Rica?",
        a: "A veces, pero no siempre. Las aerolíneas aceptan con más facilidad una reserva de vuelo con un código que puedan comprobar.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "no-me-dejan-embarcar-billete-solo-ida",
    title: "¿No te dejan embarcar con billete solo de ida? Cómo evitarlo",
    h1: "Embarque denegado con billete solo de ida: cómo evitarlo",
    description:
      "Por qué las aerolíneas niegan el embarque a pasajeros con billete de ida, qué destinos lo exigen y cómo resolverlo en minutos desde el aeropuerto.",
    intro:
      "Si una aerolínea te lleva a un país y te niegan la entrada, tiene que devolverte y puede recibir una multa. Por eso en el mostrador piden a los pasajeros con billete de ida que demuestren que saldrán. Si no puedes, pueden negarte el embarque.",
    sections: [
      {
        heading: "Qué viajes activan la revisión",
        paragraphs: [
          "Los vuelos de ida a países que exigen salida, como Filipinas, Tailandia, Indonesia, Costa Rica, Colombia, Perú o Nueva Zelanda, son los más habituales. El sistema de la aerolínea te marca automáticamente.",
        ],
      },
      {
        heading: "Cómo resolverlo en el aeropuerto",
        paragraphs: [
          "Un servicio de boleto de salida puede emitir una reserva real en minutos, desde el móvil, en el mismo mostrador. Enseña al agente el código de reserva y podrá confirmarla en su sistema.",
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "¿La aerolínea puede impedirme embarcar?",
        a: "Sí. Las aerolíneas pueden negarse a transportarte si no cumples los requisitos de entrada del destino, y la prueba de salida es uno de ellos.",
      },
    ],
  },
];

export const ES_UI: GuideUi = {
  home: "Inicio",
  guides: "Guías",
  indexTitle: "Guías de boleto de salida y reservas de vuelo para visa",
  indexDescription:
    "Qué países piden prueba de salida, qué necesitan las solicitudes de visa y cómo conseguir una reserva de vuelo verificable sin comprar un billete.",
  commonQuestions: "Preguntas frecuentes",
  moreGuides: "Más guías",
  disclaimer:
    "Esta guía es información general, no asesoramiento legal ni migratorio. Las normas cambian: confirma siempre con la fuente oficial de tu destino y con tu aerolínea antes de viajar.",
  ctaHeading: (price) =>
    price
      ? `¿Necesitas un boleto de salida verificable? Desde ${price}`
      : "¿Necesitas un boleto de salida verificable?",
  ctaBody:
    "Recibe por correo en minutos una reserva de vuelo real con un código que puedes comprobar en la web de la aerolínea.",
  ctaButton: "Consigue tu boleto de salida",
  destinationsTitle: "Dónde te pedirán prueba de salida",
  destinationsSub:
    "Guías sobre lo que revisan aerolíneas y migración, y sobre reservas de vuelo para visa.",
};
