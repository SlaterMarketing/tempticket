/** More Spanish country guides, written for travellers from Spain and Latin America. */

import { PLAZO, VERIFICAR } from "./es";
import type { Guide } from "./types";

export const ES_COUNTRY_GUIDES: Guide[] = [
  {
    key: "onward-ticket-schengen-europe",
    slug: "boleto-de-regreso-europa-schengen",
    title: "¿Necesitas boleto de regreso para entrar a Europa (Schengen)?",
    h1: "Boleto de regreso para entrar al espacio Schengen",
    description:
      "Los guardias de frontera Schengen pueden pedir a los viajeros sin visa un boleto de regreso o de salida. Qué llevar si viajas a Europa desde Latinoamérica.",
    intro:
      "Muchos latinoamericanos (de México, Colombia, Perú, Chile, Argentina y otros países) pueden entrar al espacio Schengen sin visa por estancias cortas. Aun así, el Código de Fronteras Schengen permite a los guardias pedir pruebas del propósito del viaje y de que saldrás, y el boleto de regreso o de salida es uno de los documentos que suelen pedir.",
    sections: [
      {
        heading: "Qué te pueden pedir en el control",
        paragraphs: [
          "Además del boleto de regreso o de salida: dónde te alojarás, medios económicos suficientes y, a veces, seguro de viaje o una carta de invitación. Las aerolíneas también pueden revisar el regreso al facturar.",
          "Tu salida tiene que caber en los 90 días dentro de cualquier periodo de 180 días que se permiten en todo el espacio Schengen, no por país.",
        ],
      },
      {
        heading: "Qué cuenta como salida",
        paragraphs: [
          "Un vuelo que salga del espacio Schengen. Un vuelo entre dos países Schengen (por ejemplo, Madrid–París) no cuenta. Reino Unido, Irlanda, Turquía, Marruecos o los Balcanes fuera de Schengen son salidas habituales.",
          "Consulta las condiciones para tu pasaporte en la web del consulado del país por el que entras.",
        ],
      },
      { heading: "Cómo hacerlo bien", paragraphs: [PLAZO, VERIFICAR] },
    ],
    faqs: [
      {
        q: "¿Me pueden negar la entrada sin boleto de regreso?",
        a: "Pueden, si el guardia no está convencido de que saldrás a tiempo. Llevar un regreso que puedan comprobar reduce mucho ese riesgo.",
      },
      {
        q: "¿Es lo mismo que la reserva para la visa Schengen?",
        a: "Es parecido. Quien necesita visa presenta un itinerario con la solicitud. Quien viaja sin visa puede tener que mostrar el regreso en la frontera.",
      },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "boleto-de-salida-tailandia",
    title: "Boleto de salida para Tailandia: ¿lo necesitas?",
    h1: "¿Necesitas boleto de salida para Tailandia?",
    description:
      "La entrada sin visa a Tailandia exige salir dentro del plazo permitido, y las aerolíneas suelen pedir el boleto de salida al facturar. Qué esperar.",
    intro:
      "Si entras a Tailandia sin visa, tienes que salir dentro de la estancia permitida, y migración puede pedirte una prueba. En la práctica, donde más se revisa es en el mostrador de la aerolínea antes de salir.",
    sections: [
      {
        heading: "Dónde lo revisan",
        paragraphs: [
          "Las aerolíneas que vuelan a Tailandia, sobre todo las de bajo coste, suelen pedir a los pasajeros con billete de ida un vuelo de salida. Sin él pueden negarte el embarque.",
          "Las reglas de entrada de Tailandia han cambiado varias veces en los últimos años. Revisa la estancia permitida para tu pasaporte en la web oficial de e-Visa de Tailandia.",
        ],
      },
      {
        heading: "Qué mostrar",
        paragraphs: [
          "Un vuelo que salga de Tailandia dentro de tu estancia. Kuala Lumpur, Singapur, Ho Chi Minh o Phnom Penh son salidas cortas habituales.",
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "¿Sirve un boleto de bus a Camboya o Laos?",
        a: "A veces en la frontera terrestre, pero las aerolíneas suelen querer un vuelo. La reserva de vuelo es la opción segura.",
      },
    ],
  },
  {
    key: "onward-ticket-philippines",
    slug: "boleto-de-salida-filipinas",
    title: "Boleto de salida para Filipinas: lo que revisan",
    h1: "Boleto de salida para Filipinas",
    description:
      "Filipinas exige a los visitantes sin visa un boleto de salida, y lo revisan tanto las aerolíneas como migración. Cómo conseguir una reserva verificable.",
    intro:
      "Filipinas es uno de los países más estrictos con el boleto de salida. Los visitantes sin visa deben tener un boleto para salir del país dentro de la estancia permitida, y lo piden tanto las aerolíneas como el Bureau of Immigration.",
    sections: [
      {
        heading: "Qué esperar",
        paragraphs: [
          "Cuenta con que te lo pidan al facturar cualquier vuelo a Manila, Cebú o Clark. Migración también puede pedirlo al llegar.",
          "Consulta la estancia sin visa vigente para tu pasaporte con el Bureau of Immigration de Filipinas o la embajada filipina.",
        ],
      },
      {
        heading: "Qué vuelo elegir",
        paragraphs: [
          "Vuelos cortos a Hong Kong, Taipéi, Kuala Lumpur o Singapur. El destino da igual mientras salga del país.",
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "¿Me pueden negar el embarque?",
        a: "Es un riesgo real. Las aerolíneas que vuelan a Filipinas suelen negar el embarque a pasajeros con billete de ida que no muestran cómo saldrán.",
      },
    ],
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "boleto-de-salida-bali-indonesia",
    title: "Boleto de salida para Bali e Indonesia",
    h1: "¿Necesitas boleto de salida para Bali?",
    description:
      "Indonesia espera que los visitantes muestren un boleto de regreso o de salida, y las aerolíneas lo revisan antes de embarcar. Qué mostrar.",
    intro:
      "Las visas de visitante de Indonesia, incluida la visa a la llegada que usa la mayoría de quienes van a Bali, llevan la condición de salir dentro de la estancia permitida. Aerolíneas y migración pueden pedirte un boleto de regreso o de salida.",
    sections: [
      {
        heading: "Dónde lo revisan",
        paragraphs: [
          "Las aerolíneas que vuelan a Denpasar y Yakarta suelen revisarlo en el mostrador. Migración también puede pedirlo con la visa a la llegada.",
          "Consulta las reglas vigentes para tu pasaporte en la web oficial de inmigración de Indonesia.",
        ],
      },
      {
        heading: "Qué vuelo elegir",
        paragraphs: [
          "Bali–Singapur, Bali–Kuala Lumpur o Bali–Perth son salidas cortas y habituales.",
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "¿Puedo entrar a Bali con billete solo de ida?",
        a: "Puedes volar con uno, pero espera tener que mostrar un vuelo de salida al facturar o al llegar.",
      },
    ],
  },
  {
    key: "onward-ticket-new-zealand",
    slug: "boleto-de-salida-nueva-zelanda",
    title: "Boleto de salida para Nueva Zelanda",
    h1: "¿Necesitas boleto de salida para Nueva Zelanda?",
    description:
      "Nueva Zelanda pide a los visitantes un boleto de salida o regreso, y las aerolíneas lo revisan antes de embarcar. Qué cuenta y cómo conseguirlo.",
    intro:
      "Nueva Zelanda pide a los visitantes un boleto de salida o de regreso a un país donde tengan derecho a entrar. Las aerolíneas lo revisan antes de embarcar y migración puede pedirlo al llegar.",
    sections: [
      {
        heading: "Qué esperar",
        paragraphs: [
          "Si viajas como visitante con billete de ida, la aerolínea normalmente te pedirá un vuelo de salida. La mayoría de visitantes también necesita una NZeTA o una visa.",
          "Si vas con una visa Working Holiday, las condiciones son distintas: revisa lo que exige tu visa en Immigration New Zealand.",
        ],
      },
      {
        heading: "Qué vuelo elegir",
        paragraphs: [
          "Auckland–Sídney, Auckland–Brisbane o Auckland–Fiyi son salidas cortas habituales.",
          PLAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "¿Con Working Holiday necesito boleto de salida?",
        a: "Depende de las condiciones de tu visa. Consulta Immigration New Zealand y tu aerolínea antes de viajar.",
      },
    ],
  },
  {
    key: "onward-ticket-panama",
    slug: "boleto-de-salida-panama",
    title: "Boleto de salida para Panamá y prueba de fondos",
    h1: "¿Necesitas boleto de salida para Panamá?",
    description:
      "Panamá pide a los visitantes un boleto de regreso o de salida y prueba de al menos 500 dólares. Qué cuenta y cómo conseguir una reserva verificable.",
    intro:
      "La autoridad de turismo de Panamá indica dos requisitos además del pasaporte: un boleto de regreso a tu país o hacia tu siguiente destino, y al menos 500 dólares disponibles, ya sea en efectivo, tarjeta, referencia bancaria u otro medio.",
    sections: [
      {
        heading: "Qué mostrar",
        paragraphs: [
          "Un boleto que salga de Panamá dentro de tu estancia. Vuelos de Ciudad de Panamá a Colombia, Costa Rica o México son habituales, y algunos viajeros por tierra usan un bus a Costa Rica.",
          "Algunas nacionalidades pueden necesitar más. Consulta con el Servicio Nacional de Migración, un consulado panameño o tu aerolínea.",
        ],
      },
      { heading: "Cómo hacerlo bien", paragraphs: [PLAZO, VERIFICAR] },
    ],
    faqs: [
      {
        q: "¿Cómo demuestro los 500 dólares?",
        a: "La guía de Panamá acepta efectivo, tarjeta de crédito, referencia bancaria, carta de trabajo o cheques de viajero.",
      },
    ],
  },
  {
    key: "onward-ticket-japan",
    slug: "boleto-de-regreso-japon",
    title: "Boleto de regreso para entrar a Japón",
    h1: "¿Necesitas boleto de regreso para entrar a Japón?",
    description:
      "Los visitantes de corta estancia en Japón deben poder mostrar un boleto de regreso o de salida, y las aerolíneas lo piden a quien viaja solo de ida.",
    intro:
      "Muchos hispanohablantes pueden visitar Japón sin visa por estancias cortas, y migración puede pedir pruebas de que saldrás. Las aerolíneas que vuelan a Japón suelen pedir a los pasajeros con billete de ida un boleto de regreso o de salida.",
    sections: [
      {
        heading: "Qué mostrar",
        paragraphs: [
          "Un vuelo que salga de Japón dentro de tu estancia permitida. Seúl, Taipéi, Hong Kong o el ferri a Busan son salidas habituales.",
          "Revisa las condiciones de exención de visa para tu pasaporte en la web del Ministerio de Asuntos Exteriores de Japón o de la embajada japonesa.",
        ],
      },
      { heading: "Cómo hacerlo bien", paragraphs: [PLAZO, VERIFICAR] },
    ],
    faqs: [
      {
        q: "¿Sirve el ferri a Corea como boleto de salida?",
        a: "Demuestra que saldrás, pero si la aerolínea lo pide al facturar, le resultará más fácil comprobar una reserva de vuelo con código.",
      },
    ],
  },
];
