/** Brazilian Portuguese guides. Same rules as the English ones: general, cautious, point to official sources. */

import type { Guide, GuideUi } from "./types";

const VERIFICAR =
  "Quando a reserva chegar, abra a página de \"gerenciar reserva\" da companhia aérea e procure pelo código de reserva (PNR) e pelo seu sobrenome. Se aparecer lá, o atendente do check-in também vai ver. Salve um print além do e-mail.";

const PRAZO =
  "Esse tipo de reserva fica ativo por pouco tempo (normalmente cerca de 48 horas) e depois expira. Faça a reserva pouco antes do check-in ou da entrevista do visto, não semanas antes.";

export const PT_BR_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "passagem-de-saida",
    title: "Passagem de saída: o que é e como conseguir sem comprar um voo",
    h1: "Passagem de saída (comprovante de saída do país), explicada",
    description:
      "Por que companhias aéreas e a imigração pedem passagem de saída, o que vale como comprovante e como conseguir uma reserva de voo verificável sem pagar por uma passagem que você não vai usar.",
    intro:
      "Muitos países só deixam o visitante entrar se ele provar que vai sair. As companhias aéreas conferem isso no check-in, porque se a sua entrada for negada elas precisam levar você de volta por conta própria. Se você vai viajar só com passagem de ida, precisa mostrar um voo de saída ou de volta.",
    sections: [
      {
        heading: "Quem pede",
        paragraphs: [
          "A companhia aérea no check-in e o oficial de imigração na chegada. Na prática, quem mais pede é a companhia aérea, porque o sistema dela sinaliza passageiros só de ida para destinos que exigem saída.",
          "Consulados também pedem itinerário de voo em muitos pedidos de visto, como o visto Schengen. A maioria aceita uma reserva e recomenda não comprar a passagem antes de o visto ser aprovado.",
        ],
      },
      {
        heading: "O que vale como comprovante",
        paragraphs: [
          "Um voo saindo do país, para qualquer destino, com um código de reserva que o atendente consiga ver. Em fronteiras terrestres às vezes aceitam passagem de ônibus, mas as companhias aéreas costumam querer um voo.",
          "Uma reserva de verdade tem um PNR que você consulta no site da companhia aérea. PDF editado ou falso não é comprovante, e apresentar um pode fazer você ser barrado ou coisa pior.",
        ],
      },
      {
        heading: "Suas opções",
        paragraphs: [
          "Comprar uma tarifa reembolsável e cancelar depois. Funciona, mas prende centenas de dólares e o reembolso pode levar semanas.",
          "Comprar o voo de saída mais barato e não usar. É simples, mas você perde o dinheiro.",
          "Usar um serviço de passagem de saída. Você paga uma taxa pequena por uma reserva real que fica ativa por pouco tempo e depois é liberada. É o que a maioria dos nômades digitais e mochileiros faz.",
        ],
      },
      { heading: "Como conferir se é real", paragraphs: [VERIFICAR, PRAZO] },
    ],
    faqs: [
      {
        q: "Usar uma reserva como passagem de saída é legal?",
        a: "Manter uma reserva de voo é uma função normal das companhias aéreas, e consulados aceitam reservas o tempo todo. O que não é aceitável é documento falsificado. Confira sempre as regras do seu destino em uma fonte oficial.",
      },
      {
        q: "O voo de saída precisa voltar para o Brasil?",
        a: "Não. Ele só precisa sair do país em que você está entrando. O mais comum é um voo curto para um país vizinho.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "reserva-de-voo-para-visto-schengen",
    title: "Reserva de voo para o visto Schengen (sem comprar a passagem)",
    h1: "Reserva de voo para o pedido de visto Schengen",
    description:
      "A maioria dos consulados Schengen pede reserva de voo, não passagem paga. Como conseguir um itinerário de ida e volta verificável para o seu atendimento.",
    intro:
      "O pedido de visto Schengen normalmente pede um itinerário de voo mostrando como você vai chegar e sair. Muitos consulados dizem claramente para não comprar a passagem antes de o visto ser concedido, e que uma reserva basta.",
    sections: [
      {
        heading: "O que os consulados pedem",
        paragraphs: [
          "Ida e volta, ou uma entrada e uma saída, batendo com as datas do seu pedido. A reserva precisa estar no seu nome exatamente como no passaporte.",
          "As exigências mudam conforme o país e o centro de vistos, então confira a lista do consulado onde você vai aplicar.",
        ],
      },
      {
        heading: "Quando reservar",
        paragraphs: [
          "Faça a reserva um ou dois dias antes do atendimento para que ela esteja ativa quando os documentos forem analisados. É normal que expire antes da decisão.",
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "Preciso de ida e volta ou só ida?",
        a: "A maioria dos pedidos Schengen espera ida e volta, ou pelo menos uma saída confirmada do espaço Schengen. Uma reserva de ida e volta cobre as duas coisas.",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "reserva-de-voo-para-visto",
    title: "Reserva de voo para visto: reserva real ou PDF falso",
    h1: "Reserva de voo para pedido de visto",
    description:
      "O que é uma reserva de voo para visto, por que os consulados pedem, como diferenciar uma reserva real de um PDF falso e como conseguir uma verificável.",
    intro:
      "Muitos consulados pedem itinerário de voo junto com o pedido de visto, mas recomendam não comprar a passagem antes da decisão. A solução comum é uma reserva real, mantida no sistema da companhia aérea por pouco tempo.",
    sections: [
      {
        heading: "Reserva real ou PDF falso",
        paragraphs: [
          "Uma reserva real tem um código (PNR) que você consulta no site da companhia aérea. Um documento falso só parece uma reserva e não tem nada por trás.",
          "Consulados podem conferir. Apresentar documento falsificado pode levar à recusa do visto e prejudicar pedidos futuros. Use apenas reservas que você mesmo consegue verificar.",
        ],
      },
      {
        heading: "Os dados precisam bater",
        paragraphs: [
          "Seu nome precisa ser igual ao do passaporte. As datas precisam bater com o formulário e com a hospedagem.",
          PRAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "É legal?",
        a: "Uma reserva de voo real é legal e é o que muitos consulados pedem. Um documento editado ou falsificado não é.",
      },
    ],
  },
  {
    key: "flight-itinerary-us-visa",
    slug: "reserva-de-voo-para-visto-americano",
    title: "Reserva de voo para o visto americano (B1/B2)",
    h1: "Precisa de reserva de voo para o visto americano?",
    description:
      "Os EUA não exigem reserva de voo para o visto B1/B2 e recomendam não comprar passagem antes da emissão do visto. Quando uma reserva ajuda e como conseguir.",
    intro:
      "Para o visto americano de turismo e negócios (B1/B2), você não precisa apresentar reserva de voo, e o Departamento de Estado dos EUA recomenda não comprar passagens antes de ter o visto. O DS-160 pergunta as datas pretendidas da viagem, e alguns candidatos levam uma reserva para a entrevista para mostrar que o plano é concreto.",
    sections: [
      {
        heading: "Quando a reserva ajuda",
        paragraphs: [
          "Se o oficial consular perguntar sobre seus planos, uma reserva que bate com as datas do DS-160 mostra que você planejou a viagem. Ela não substitui a comprovação de vínculos com o Brasil, que pesa muito mais.",
        ],
      },
      {
        heading: "Como fazer",
        paragraphs: [
          "Entrevistas podem ser marcadas com meses de antecedência, então faça a reserva um ou dois dias antes da entrevista, não quando preencher o DS-160.",
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      {
        q: "Posso ter o visto negado sem reserva de voo?",
        a: "Não por isso. A reserva de voo não é exigência para o visto B1/B2.",
      },
    ],
  },
];

export const PT_BR_UI: GuideUi = {
  home: "Início",
  guides: "Guias",
  indexTitle: "Guias de passagem de saída e reserva de voo para visto",
  indexDescription:
    "Quais países pedem comprovante de saída, o que os pedidos de visto exigem e como conseguir uma reserva de voo verificável sem comprar passagem.",
  commonQuestions: "Perguntas frequentes",
  moreGuides: "Mais guias",
  disclaimer:
    "Este guia é informação geral, não aconselhamento jurídico ou migratório. As regras mudam: confirme sempre com a fonte oficial do seu destino e com a companhia aérea antes de viajar.",
  ctaHeading: (price) =>
    price
      ? `Precisa de uma passagem de saída verificável? A partir de ${price}`
      : "Precisa de uma passagem de saída verificável?",
  ctaBody:
    "Receba por e-mail, em minutos, uma reserva de voo real com um código que você confere no site da companhia aérea.",
  ctaButton: "Garanta sua passagem de saída",
  destinationsTitle: "Onde vão pedir comprovante de saída",
  destinationsSub:
    "Guias sobre o que companhias aéreas e imigração conferem, e sobre reserva de voo para visto.",
  sourcesHeading: "Fontes",
  lastChecked: (date) => `Última verificação: ${date}`,
};
