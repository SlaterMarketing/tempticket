/**
 * More Portuguese guides: Schengen visa flight reservations for Portuguese-speaking
 * African countries, and entry rules that matter to Brazilian travellers.
 * Facts are checked against the official sources cited on each guide.
 */

import { PRAZO, VERIFICAR } from "./pt-BR";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const SRC_EEAS: GuideSource = {
  label: "EEAS: orientações oficiais da UE para quem pede visto Schengen (em inglês)",
  url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf",
};
const SRC_FEE: GuideSource = {
  label: "Embaixada da Suécia: novas taxas do visto Schengen a partir de 11 de junho de 2024 (em inglês)",
  url: "https://swedenabroad.se/en/embassies/iran-tehran/current/news/new-schengen-visa-fees",
};
const SRC_LIST: GuideSource = {
  label: "EUR-Lex: Regulamento (UE) 2018/1806, lista de países sujeitos a visto",
  url: "https://eur-lex.europa.eu/eli/reg/2018/1806/oj?locale=pt",
};
const SRC_CASCADE: GuideSource = {
  label: "Serviço de Imigração da Dinamarca: validade de vistos e regra em cascata (em inglês)",
  url: "https://nyidanmark.dk/en-GB/Words-and-concepts/US/Visum/Visa---Determination-of-validity",
};

type PaisSchengen = {
  id: string;
  pais: string;
  /** "de Angola", "de Moçambique", "da Guiné-Bissau" */
  de: string;
  povo: string;
  aeroportos: string;
  onde: string;
  taxa?: string;
  faq: GuideFaq;
  fontes?: GuideSource[];
};

const TAXA_PADRAO =
  "Desde 11 de junho de 2024, a taxa do visto Schengen é de 90 € para adultos e 45 € para crianças de 6 a 12 anos, normalmente paga em moeda local. O centro de vistos cobra a sua própria taxa de serviço.";

function schengen(p: PaisSchengen): Guide {
  return {
    key: `pt-schengen-visa-flight-reservation-${p.id}`,
    slug: `reserva-de-voo-visto-schengen-${p.id}`,
    title: `Reserva de voo para visto Schengen ${p.de}`,
    h1: `Reserva de voo para pedir o visto Schengen ${p.de}`,
    description: `O que os ${p.povo} precisam apresentar sobre voos no pedido de visto Schengen, por que uma reserva alterável é recomendada, a taxa e onde pedir.`,
    intro: `Os ${p.povo} precisam de visto para estadias curtas no espaço Schengen, e o pedido exige um itinerário de voo coerente com os seus planos. As orientações oficiais da UE recomendam uma reserva que possa ser alterada ou cancelada, em vez de comprar a passagem antes da decisão.`,
    sections: [
      {
        heading: `Os ${p.povo} precisam de visto Schengen?`,
        paragraphs: [
          `Sim. ${p.pais} está na lista da UE de países cujos cidadãos precisam de visto para estadias curtas, que permitem ficar até 90 dias em qualquer período de 180 dias, somando todos os países Schengen.`,
          p.taxa ?? TAXA_PADRAO,
        ],
      },
      {
        heading: "Onde pedir",
        paragraphs: [
          "Peça ao país do seu destino principal ou, se dividir o tempo por igual, ao primeiro país onde vai entrar. Use apenas o centro de vistos oficial do consulado: a UE alerta contra intermediários que cobram pela marcação.",
          p.onde,
        ],
      },
      {
        heading: "A reserva de voo",
        paragraphs: [
          `Apresente ida e volta, ou entrada e saída, com as mesmas datas do formulário e do alojamento. Os voos ${p.de} costumam partir de ${p.aeroportos}. O nome tem de ser igual ao do passaporte.`,
          "As orientações da UE dizem que as reservas de voo e hotel devem refletir os planos reais e recomendam reservas reembolsáveis ou alteráveis, para não perder dinheiro se o visto for recusado ou atrasar. Uma reserva temporária com código real faz exatamente isso.",
          PRAZO,
          VERIFICAR,
        ],
      },
      {
        heading: "Vistos de entradas múltiplas",
        paragraphs: [
          "Pela regra em cascata da UE, quem obteve e usou corretamente três vistos nos últimos dois anos pode receber um visto de entradas múltiplas de um ano, depois de dois e depois de cinco. O consulado pode emitir um visto mais curto, por exemplo se o passaporte estiver perto do fim.",
        ],
      },
    ],
    faqs: [
      p.faq,
      {
        q: "Devo comprar a passagem antes de ter o visto?",
        a: "Em geral não. As orientações da UE recomendam reservas reembolsáveis ou alteráveis, e a maioria dos consulados aceita uma reserva. Compre a passagem quando tiver o visto.",
      },
    ],
    sources: [SRC_EEAS, SRC_FEE, SRC_LIST, SRC_CASCADE, ...(p.fontes ?? [])],
    checked: CHECKED,
  };
}

const SCHENGEN: PaisSchengen[] = [
  {
    id: "angola", pais: "Angola", de: "de Angola", povo: "angolanos",
    aeroportos: "Luanda",
    onde: "Os pedidos são feitos em Luanda. Portugal é o destino mais procurado; alguns países Schengen sem serviço de vistos em Angola são representados por outro Estado-membro.",
    faq: { q: "Posso ir a Portugal e depois a Espanha com o mesmo visto?", a: "Sim. O visto Schengen cobre todos os países Schengen na viagem para a qual foi emitido. Peça ao país onde vai passar mais tempo." },
  },
  {
    id: "mocambique", pais: "Moçambique", de: "de Moçambique", povo: "moçambicanos",
    aeroportos: "Maputo",
    onde: "Os pedidos são feitos em Maputo. Vários países Schengen são representados por outro Estado-membro, por isso confirme onde entregar o seu.",
    faq: { q: "E se o meu destino não tiver embaixada em Maputo?", a: "Os países Schengen representam-se uns aos outros. O site do país de destino indica qual embaixada recebe os pedidos em seu nome." },
  },
  {
    id: "cabo-verde", pais: "Cabo Verde", de: "de Cabo Verde", povo: "cabo-verdianos",
    aeroportos: "Praia, Sal ou Boa Vista",
    taxa: "Cabo Verde tem um acordo de facilitação de vistos com a UE, por isso a taxa para cidadãos cabo-verdianos é de 60 € em vez dos 90 € normais, com algumas categorias isentas. O centro de vistos pode cobrar uma taxa de serviço.",
    onde: "Os pedidos são feitos na Praia. Portugal, que tem a maior ligação aérea com Cabo Verde, é o destino mais comum.",
    faq: { q: "Quanto custa o visto Schengen para cabo-verdianos?", a: "60 € graças ao acordo de facilitação com a UE, com algumas categorias isentas, mais a eventual taxa do centro de vistos." },
    fontes: [{ label: "Ministério dos Negócios Estrangeiros da Grécia: tabela de taxas de visto (em inglês)", url: "https://www.mfa.gr/media/sites/20/2026/03/VisaFees.pdf" }],
  },
  {
    id: "guine-bissau", pais: "A Guiné-Bissau", de: "da Guiné-Bissau", povo: "guineenses (Guiné-Bissau)",
    aeroportos: "Bissau",
    onde: "Poucos países Schengen têm serviço de vistos em Bissau; muitos tratam os pedidos através de Portugal ou de um país vizinho, como o Senegal. Confirme no site do país de destino.",
    faq: { q: "Onde peço o visto se o meu destino não está em Bissau?", a: "O site do país de destino indica a embaixada ou o Estado-membro que recebe pedidos de cidadãos da Guiné-Bissau." },
  },
  {
    id: "sao-tome-e-principe", pais: "São Tomé e Príncipe", de: "de São Tomé e Príncipe", povo: "são-tomenses",
    aeroportos: "São Tomé",
    onde: "Portugal tem embaixada em São Tomé; a maioria dos outros países Schengen é representada por outro Estado-membro ou trata os pedidos a partir de um país vizinho.",
    faq: { q: "Posso fazer escala em Lisboa a caminho de outro país?", a: "Sim, com o visto Schengen. Mostre a entrada e a saída do espaço Schengen com datas que batam com o pedido." },
  },
];

const SRC_SBC: GuideSource = {
  label: "EUR-Lex: Código das Fronteiras Schengen, Regulamento (UE) 2016/399",
  url: "https://eur-lex.europa.eu/eli/reg/2016/399/oj?locale=pt",
};

export const PT_BR_MORE_GUIDES: Guide[] = [
  ...SCHENGEN.map(schengen),
  {
    key: "pt-brazil-schengen-entry-return-ticket",
    slug: "passagem-de-volta-europa-brasileiros",
    title: "Brasileiro precisa de passagem de volta para entrar na Europa?",
    h1: "Passagem de volta para entrar na Europa (Schengen): o que o brasileiro precisa",
    description:
      "Brasileiros não precisam de visto para o espaço Schengen, mas a polícia de fronteira pode pedir passagem de volta, meios de subsistência e alojamento. O que levar.",
    intro:
      "Brasileiros podem visitar o espaço Schengen sem visto por até 90 dias em qualquer período de 180. Mas isenção de visto não é entrada garantida: pelo Código das Fronteiras Schengen, o guarda pode pedir que você comprove o motivo da viagem, meios de subsistência e que vai sair.",
    sections: [
      {
        heading: "O que pode ser pedido na fronteira",
        paragraphs: [
          "O Código das Fronteiras Schengen lista, entre os documentos que comprovam o motivo e a duração da estadia, a passagem de volta ou de continuação e o comprovante de alojamento, além de meios de subsistência para o período e para o regresso.",
          "Quem chega só com passagem de ida, sobretudo para estadias longas, é quem mais recebe perguntas. Ter uma saída marcada dentro dos 90 dias resolve a conversa.",
        ],
      },
      {
        heading: "Os 90 dias e o novo controle eletrônico",
        paragraphs: [
          "Os 90 dias contam para o espaço Schengen inteiro, não por país. Desde 12 de outubro de 2025, o Sistema de Entrada/Saída (EES) registra entradas e saídas eletronicamente, no lugar do carimbo, e está em pleno funcionamento desde 10 de abril de 2026. Excesso de estadia aparece na hora.",
          PRAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      { q: "Brasileiro precisa de visto para Portugal?", a: "Não para turismo de até 90 dias em 180 no espaço Schengen. Mas a fronteira pode pedir passagem de volta, alojamento e meios de subsistência." },
      { q: "Um voo para Londres conta como saída do espaço Schengen?", a: "Sim, o Reino Unido não faz parte do espaço Schengen. Lembre que o Reino Unido tem regras próprias de entrada." },
    ],
    sources: [
      SRC_SBC,
      { label: "Comissão Europeia: o Sistema de Entrada/Saída entrou em funcionamento em 12 de outubro de 2025 (em inglês)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
      { label: "Embaixada da Polônia: EES em pleno funcionamento desde 10 de abril de 2026 (em inglês)", url: "https://www.gov.pl/web/usa-en/entryexit-system---full-implementation-from-april-10th-2026" },
    ],
    checked: CHECKED,
  },
  {
    key: "pt-brazil-canada-eta",
    slug: "canada-eta-ou-visto-brasileiros",
    title: "Canadá para brasileiros: eTA ou visto? Regras e passagem de volta",
    h1: "Brasileiro precisa de visto para o Canadá ou basta o eTA?",
    description:
      "Brasileiros podem usar o eTA para voar ao Canadá se tiveram visto canadense nos últimos 10 anos ou têm visto americano válido. Caso contrário, precisam de visto.",
    intro:
      "O Brasil está entre os países cujos cidadãos podem pedir o eTA em vez do visto, mas só em certas condições. Veja quem se encaixa, quanto custa e o que levar.",
    sections: [
      {
        heading: "Quem pode usar o eTA",
        paragraphs: [
          "Você precisa cumprir as três condições: viajar de avião para o Canadá ou fazer conexão num aeroporto canadense; ir para uma estadia temporária, normalmente de até seis meses; e ter tido um visto de visitante canadense nos últimos 10 anos ou ter um visto americano de não imigrante válido no momento do pedido.",
          "O eTA custa 7 dólares canadenses no site oficial do governo do Canadá. Ele não vale para entrar por terra ou mar, inclusive em cruzeiros; nesses casos é preciso visto.",
        ],
      },
      {
        heading: "Quem precisa de visto",
        paragraphs: [
          "Quem não cumpre as condições pede o visto de visitante: 100 dólares canadenses, mais 85 de biometria na maioria dos casos. O IRCC considera os detalhes de voo um documento opcional do itinerário.",
          PRAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      { q: "Meu visto americano está em outro passaporte. Posso pedir o eTA?", a: "Sim. Peça com o passaporte em que vai viajar, explique a situação no campo de perguntas e informe o número do passaporte que tem o visto americano." },
    ],
    sources: [
      { label: "Governo do Canadá: eTA para cidadãos de alguns países que exigem visto (em inglês)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/eligibility/eta-x.html" },
      { label: "Governo do Canadá: eTA (em inglês)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html" },
      { label: "Governo do Canadá: pedir visto de visitante (em inglês)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html" },
    ],
    checked: CHECKED,
  },
  {
    key: "pt-brazil-japan-visa-exemption",
    slug: "japao-isencao-de-visto-brasileiros",
    title: "Japão sem visto para brasileiros: 90 dias e o que levar",
    h1: "Brasileiro precisa de visto para o Japão?",
    description:
      "Desde 30 de setembro de 2023, brasileiros com passaporte eletrônico comum podem visitar o Japão sem visto por até 90 dias. O que vale e o que levar.",
    intro:
      "Desde 30 de setembro de 2023, brasileiros com passaporte comum com chip (IC) estão isentos de visto para estadias curtas no Japão, de até 90 dias seguidos.",
    sections: [
      {
        heading: "O que a isenção cobre",
        paragraphs: [
          "Estadias de curta duração, de até 90 dias consecutivos, com passaporte comum com chip. Trabalho e estadias longas continuam exigindo visto.",
        ],
      },
      {
        heading: "Passagem de saída",
        paragraphs: [
          "Isenção de visto não dispensa mostrar que você vai sair. Companhias aéreas e a imigração podem pedir a passagem de volta ou de continuação, então tenha uma reserva de saída dentro dos 90 dias.",
          PRAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      { q: "Meu passaporte é antigo, sem chip. Preciso de visto?", a: "A isenção é para passaportes comuns com chip (IC). Confirme com o consulado do Japão se o seu passaporte se qualifica." },
    ],
    sources: [{ label: "Ministério das Relações Exteriores do Japão: isenção de visto para cidadãos brasileiros (em inglês)", url: "https://www.mofa.go.jp/press/release/press4e_003290.html" }],
    checked: CHECKED,
  },
  {
    key: "pt-brazil-uk-eta",
    slug: "reino-unido-eta-brasileiros",
    title: "Reino Unido para brasileiros: ETA de £20 e passagem de volta",
    h1: "Brasileiro precisa de ETA para o Reino Unido?",
    description:
      "Brasileiros não precisam de visto para turismo no Reino Unido, mas precisam da autorização eletrônica ETA. Custo, validade e o que mostrar na chegada.",
    intro:
      "A maioria dos visitantes que não precisa de visto para o Reino Unido, incluindo brasileiros, agora precisa de uma Electronic Travel Authorisation (ETA) antes de viajar. Ela custa £20 no site oficial GOV.UK.",
    sections: [
      {
        heading: "Como funciona a ETA",
        paragraphs: [
          "Com a ETA você pode visitar o Reino Unido, Jersey, Guernsey e a Ilha de Man por até seis meses de cada vez, mas ela não garante a entrada. Cada viajante precisa da sua, inclusive bebês e crianças. Outros sites podem cobrar mais caro.",
          "Você também precisa de ETA se a conexão no Reino Unido passar pelo controle de fronteira.",
        ],
      },
      {
        heading: "Na chegada",
        paragraphs: [
          "O oficial pode perguntar por quanto tempo você vai ficar e como vai sair. Uma saída marcada dentro dos seis meses responde a isso.",
          VERIFICAR,
        ],
      },
    ],
    faqs: [{ q: "Quanto custa a ETA do Reino Unido?", a: "£20 no serviço oficial GOV.UK." }],
    sources: [{ label: "GOV.UK: pedir a electronic travel authorisation (ETA) (em inglês)", url: "https://www.gov.uk/guidance/apply-for-an-electronic-travel-authorisation-eta" }],
    checked: CHECKED,
  },
];
