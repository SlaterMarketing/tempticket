/**
 * Brazilian Portuguese guides on official entry schemes (ETIAS, EES, arrival
 * cards, transit visas). Same facts and official sources as en-official.ts
 * (checked 2026-11-01), translated. Keys match the English pages. The UK ETA,
 * Canada eTA and ESTA pages are left out here because pt-BR-more.ts already
 * covers the UK and Canada for Brazilians, and Brazilians need a US visa.
 */

import { PRAZO, VERIFICAR } from "./pt-BR";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nome: string): GuideSource => ({
  label: `Ministério das Relações Exteriores britânico: requisitos de entrada (${nome}) (em inglês)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

const PASSAPORTE =
  "Os prazos de estadia informados pelo Ministério das Relações Exteriores britânico valem para passaportes britânicos. Com passaporte brasileiro podem ser outros, então confirme no site oficial de imigração do país ou no Portal Consular do Itamaraty.";

export const PT_BR_OFFICIAL_GUIDES: Guide[] = [
  {
    key: "etias-explained",
    slug: "etias-autorizacao-viagem-europa",
    title: "ETIAS Explicado: Preço, Quem Precisa e Quando Começa",
    h1: "ETIAS: a nova autorização de viagem para a Europa",
    description: "O que é o ETIAS, a taxa de € 20, quem está isento, quando a UE espera que comece e como ele se encaixa com a passagem de volta e a regra dos 90 dias.",
    intro: "O ETIAS é uma autorização de viagem online que visitantes isentos de visto, como os brasileiros, vão precisar antes de viajar para a maioria dos países europeus, parecida com o ESTA dos EUA. Ele não substitui o visto para quem precisa de um, nem muda a regra de 90 dias em 180.",
    sections: [
      { heading: "Preço e isenções", paragraphs: ["A Comissão Europeia fixou a taxa do ETIAS em € 20, acima dos € 7 previstos no início. Menores de 18 e maiores de 70 anos não pagam."] },
      { heading: "Quando começa", paragraphs: ["Em julho de 2025 a Comissão disse que o ETIAS começaria a funcionar no fim de 2026, depois que o Sistema de Entrada/Saída estivesse em pleno funcionamento. As datas já foram adiadas antes, então confira no site oficial da UE se ele está ativo quando você viajar."] },
      { heading: "O que não muda", paragraphs: ["O ETIAS não muda o que os guardas de fronteira podem pedir, o que inclui comprovar que você vai sair. Quem chega só com ida continua sendo quem mais ouve o pedido de passagem de volta ou de saída.", VERIFICAR] },
    ],
    faqs: [
      { q: "Brasileiro vai precisar de ETIAS?", a: "Sim. Brasileiros não precisam de visto para estadias curtas no Schengen, então entram no grupo que vai precisar do ETIAS quando ele começar." },
      { q: "Quanto custa o ETIAS?", a: "€ 20, com isenção para menores de 18 e maiores de 70, segundo a Comissão Europeia." },
    ],
    sources: [{ label: "Comissão Europeia: o ETIAS vai custar € 20 (em inglês)", url: "https://home-affairs.ec.europa.eu/news/european-travel-authorisation-etias-will-cost-eur-20-2025-07-17_en" }],
    checked: CHECKED,
  },
  {
    key: "ees-entry-exit-system",
    slug: "ees-sistema-entrada-saida-europa",
    title: "EES: o Sistema de Entrada/Saída da Europa e o Fim dos Carimbos",
    h1: "O Sistema de Entrada/Saída (EES) da UE, explicado",
    description: "O Sistema de Entrada/Saída substituiu os carimbos no passaporte para visitantes de fora da UE. Quando começou, o que muda na regra dos 90 dias e por que excesso de estadia aparece na hora.",
    intro: "Desde 12 de outubro de 2025, viajantes de fora da UE em estadias curtas são registrados eletronicamente ao cruzar as fronteiras externas dos países europeus participantes, em vez de receber carimbo. O sistema está em pleno funcionamento desde 10 de abril de 2026.",
    sections: [
      { heading: "O que mudou", paragraphs: ["O EES registra cada entrada e saída digitalmente e substitui o carimbo no passaporte na maior parte da Europa. Vale para viajantes de fora da UE em visitas curtas, precisem ou não de visto, incluindo brasileiros."] },
      { heading: "Por que importa para a regra dos 90 dias", paragraphs: ["Estadias curtas são limitadas a 90 dias em qualquer período de 180 em todo o espaço Schengen. Com carimbos, os agentes contavam à mão; com o EES a conta é automática, e um excesso de estadia aparece na hora da saída ou na próxima viagem.", "Se for fazer uma viagem longa pela Europa, reserve a saída dentro dos seus 90 dias e tenha a reserva à mão. Os guardas de fronteira podem perguntar como e quando você vai sair.", PRAZO] },
    ],
    faqs: [
      { q: "Ainda vou ganhar carimbo no passaporte na Europa?", a: "Na maioria dos países participantes, não. O EES substituiu o carimbo e está em pleno funcionamento desde 10 de abril de 2026." },
      { q: "O EES vale para quem tem visto?", a: "Sim. Ele cobre viajantes de fora da UE em estadias curtas, isentos de visto ou com visto Schengen." },
    ],
    sources: [
      { label: "Comissão Europeia: o novo EES entrou em funcionamento em 12 de outubro de 2025 (em inglês)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
      { label: "Embaixada da Polônia: EES em pleno funcionamento desde 10 de abril de 2026 (em inglês)", url: "https://www.gov.pl/web/usa-en/entryexit-system---full-implementation-from-april-10th-2026" },
      { label: "SEAE: o que fazer e não fazer com o visto Schengen (em inglês)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
    ],
    checked: CHECKED,
  },
  {
    key: "thailand-digital-arrival-card",
    slug: "cartao-digital-chegada-tailandia-tdac",
    title: "Cartão Digital de Chegada da Tailândia (TDAC) e Isenção de Visto",
    h1: "O cartão digital de chegada da Tailândia (TDAC) e os controles de entrada",
    description: "Todo estrangeiro que chega à Tailândia precisa preencher o TDAC online. Quando fazer, a estadia com isenção de visto e os recursos e a passagem de saída que a imigração pode pedir.",
    intro: "Todos os estrangeiros que chegam à Tailândia por ar, terra ou mar precisam preencher online o Thailand Digital Arrival Card (TDAC) antes da chegada. É uma das três coisas que podem complicar a entrada, junto com o comprovante de recursos e a passagem de saída.",
    sections: [
      { heading: "Quando preencher", paragraphs: ["Preencha o TDAC online nos três dias antes da chegada. Use só o site oficial do governo tailandês."] },
      { heading: "A isenção de visto", paragraphs: ["Para visitantes britânicos, o Ministério das Relações Exteriores britânico diz que a entrada com isenção de visto agora permite até 30 dias, só para turismo. As regras da Tailândia mudaram várias vezes e dependem do passaporte.", PASSAPORTE] },
      { heading: "Recursos e passagem de saída", paragraphs: ["A imigração pode pedir comprovante de pelo menos 10.000 bahts por pessoa ou 20.000 por família, e de viagem de saída ou volta. As companhias aéreas conferem a passagem de saída no balcão.", PRAZO, VERIFICAR] },
    ],
    faqs: [
      { q: "O TDAC da Tailândia é gratuito?", a: "Sim, no site oficial. Preencha nos três dias antes da chegada." },
      { q: "Quanto dinheiro preciso para entrar na Tailândia?", a: "A imigração pode pedir pelo menos 10.000 bahts por pessoa ou 20.000 por família, segundo o Ministério das Relações Exteriores britânico." },
    ],
    sources: [fcdo("thailand", "Tailândia")],
    checked: CHECKED,
  },
  {
    key: "malaysia-digital-arrival-card",
    slug: "cartao-digital-chegada-malasia-mdac",
    title: "Cartão Digital de Chegada da Malásia (MDAC): Quando Precisa",
    h1: "O cartão digital de chegada da Malásia (MDAC)",
    description: "Quem entra na Malásia preenche um cartão digital de chegada antes da viagem, e a companhia aérea pode pedir no check-in. Quem precisa e o que mais deixar pronto.",
    intro: "Visitantes da Malásia preenchem online o Malaysia Digital Arrival Card antes de viajar, e a companhia aérea pode pedir no check-in. Se você só estiver em trânsito sem passar pela imigração, não precisa.",
    sections: [
      { heading: "As regras", paragraphs: ["Visitantes britânicos não precisam de visto para turismo e normalmente recebem 90 dias na chegada. O passaporte precisa de seis meses de validade a partir da chegada e deve estar em bom estado, sem páginas faltando.", PASSAPORTE] },
      { heading: "Chegar só com ida", paragraphs: ["O aviso britânico não lista regra de passagem de saída para a Malásia, mas companhias aéreas podem perguntar a passageiros só de ida como vão sair. Voos curtos para Singapura, Bangkok ou Bali são saídas comuns.", PRAZO, VERIFICAR] },
    ],
    faqs: [{ q: "Preciso do MDAC se só fizer trânsito em KLIA?", a: "Não, se não passar pela imigração, segundo o Ministério das Relações Exteriores britânico." }],
    sources: [fcdo("malaysia", "Malásia")],
    checked: CHECKED,
  },
  {
    key: "singapore-arrival-card",
    slug: "sg-arrival-card-singapura",
    title: "SG Arrival Card: Quando Preencher Antes de Voar para Singapura",
    h1: "O SG Arrival Card de Singapura",
    description: "Visitantes de Singapura precisam preencher o SG Arrival Card eletrônico nos três dias antes da chegada. O que ele inclui e quanto tempo você pode ficar.",
    intro: "Visitantes precisam preencher o SG Arrival Card eletrônico, que inclui uma declaração de saúde, nos três dias antes de chegar a Singapura. Fazer declaração falsa é crime.",
    sections: [
      { heading: "Quanto tempo você pode ficar", paragraphs: ["Cidadãos britânicos podem visitar sem visto para turismo ou negócios. O agente de imigração decide o prazo, normalmente entre 30 e 90 dias. O passaporte precisa de seis meses de validade a partir da chegada.", PASSAPORTE] },
      { heading: "Passagem de saída", paragraphs: ["Companhias aéreas que voam para Singapura ainda podem pedir uma reserva de saída a passageiros só de ida. Kuala Lumpur, Bangkok, Bali e Jacarta são saídas curtas comuns.", VERIFICAR] },
    ],
    faqs: [{ q: "Quando devo preencher o SG Arrival Card?", a: "Nos três dias antes da sua chegada a Singapura." }],
    sources: [fcdo("singapore", "Singapura")],
    checked: CHECKED,
  },
  {
    key: "philippines-etravel",
    slug: "etravel-filipinas-registro",
    title: "Registro eTravel das Filipinas e Passagem de Saída",
    h1: "eTravel das Filipinas: registro, QR code e passagem de saída",
    description: "Todo mundo que chega às Filipinas precisa de um QR code do eTravel. Quando se registrar, a estadia sem visto e a passagem de saída que se espera que você mostre.",
    intro: "Quem chega às Filipinas precisa se registrar no sistema gratuito eTravel nos três dias antes da chegada e mostrar o QR code. Também se espera que a maioria dos visitantes tenha comprovante de viagem de volta ou saída.",
    sections: [
      { heading: "eTravel", paragraphs: ["O registro é gratuito e deve ser feito nos três dias antes da chegada. Guarde o QR code no celular e também um print."] },
      { heading: "Prazo de estadia e passagem de saída", paragraphs: ["Visitantes britânicos podem ficar até 30 dias sem visto e pedir prorrogação no país. O Ministério das Relações Exteriores britânico diz que se espera que a maioria tenha comprovante de viagem de volta ou saída, e tanto a imigração quanto as companhias aéreas podem pedir.", PASSAPORTE, PRAZO, VERIFICAR] },
    ],
    faqs: [{ q: "O eTravel é gratuito?", a: "Sim. Registre-se nos três dias antes da chegada e evite sites que cobram." }],
    sources: [fcdo("philippines", "Filipinas")],
    checked: CHECKED,
  },
  {
    key: "indonesia-e-voa-bali-levy",
    slug: "visto-na-chegada-indonesia-taxa-bali",
    title: "Visto na Chegada da Indonésia, e-VOA e Taxa Turística de Bali",
    h1: "O visto na chegada da Indonésia, o e-VOA e a taxa turística de Bali",
    description: "O que você precisa para pousar em Bali ou Jacarta: o visto na chegada de 30 dias e a regra da passagem de saída, a declaração alfandegária online e a taxa de Bali.",
    intro: "A maioria dos visitantes da Indonésia usa um visto na chegada de 30 dias, pedido online com antecedência (e-VOA) ou no aeroporto. Para conseguir, é preciso comprovar viagem de saída ou volta.",
    sections: [
      { heading: "O visto na chegada", paragraphs: ["Para visitantes britânicos, o visto na chegada custa 500.000 rupias, em dinheiro ou cartão, é de entrada única e dura 30 dias. Se pedir o e-VOA online, faça pelo menos uma semana antes de viajar. Confira se o seu passaporte pode usar o visto na chegada.", "Comprovar viagem de saída ou volta é condição do visto, por isso as companhias aéreas que voam para a Indonésia conferem no balcão."] },
      { heading: "Antes de pousar", paragraphs: ["Preencha a declaração gratuita de alfândega e saúde online nas 72 horas antes da chegada. Bali também cobra dos turistas estrangeiros uma taxa de 150.000 rupias, paga online ou na chegada.", PRAZO, VERIFICAR] },
    ],
    faqs: [
      { q: "Preciso de passagem de saída para Bali?", a: "Sim, comprovar viagem de saída ou volta é obrigatório para o visto na chegada." },
      { q: "Quanto é a taxa turística de Bali?", a: "150.000 rupias, pagas online ou na chegada." },
    ],
    sources: [fcdo("indonesia", "Indonésia")],
    checked: CHECKED,
  },
  {
    key: "schengen-airport-transit-visa",
    slug: "visto-transito-aeroportuario-schengen",
    title: "Visto de Trânsito Aeroportuário Schengen: Quem Precisa",
    h1: "Você precisa de visto de trânsito para trocar de avião na Europa?",
    description: "Nacionais de 12 países precisam de visto de trânsito aeroportuário para fazer conexão num aeroporto Schengen. A lista, as isenções comuns e o que conferir antes de comprar.",
    intro: "Trocar de avião num aeroporto Schengen sem sair da área internacional normalmente não exige visto. A exceção são os nacionais de uma lista comum curta da UE, que precisam de visto de trânsito aeroportuário, a menos que tenham certos vistos ou autorizações de residência. Brasileiros não estão nessa lista.",
    sections: [
      { heading: "A lista comum", paragraphs: ["A lista válida em toda a UE inclui nacionais do Afeganistão, Bangladesh, República Democrática do Congo, Eritreia, Etiópia, Gana, Irã, Iraque, Nigéria, Paquistão, Somália e Sri Lanka. Cada país Schengen pode acrescentar outras nacionalidades nos seus aeroportos, então confira o país da conexão."] },
      { heading: "Isenções comuns", paragraphs: ["Costumam estar isentos os titulares de visto ou autorização de residência Schengen válidos, ou de autorização de residência válida de países como EUA, Canadá, Japão, Andorra, Mônaco, San Marino ou Suíça que permita voltar para lá. Tripulantes também estão isentos.", "Se precisar de visto de trânsito, o pedido costuma exigir os dados do voo seguinte, então tenha o itinerário completo pronto.", VERIFICAR] },
    ],
    faqs: [{ q: "Angolanos ou moçambicanos precisam de visto de trânsito em Lisboa ou Frankfurt?", a: "Angola e Moçambique não estão na lista comum da UE, mas cada país Schengen pode acrescentar nacionalidades. Confira as regras do país da conexão antes de comprar." }],
    sources: [{ label: "Escritório de Cidadania e Migração da Letônia: vistos de trânsito aeroportuário (lista comum da UE) (em inglês)", url: "https://www.pmlp.gov.lv/en/airport-transit" }],
    checked: CHECKED,
  },
  {
    key: "uk-transit-visa",
    slug: "visto-transito-reino-unido",
    title: "Visto de Trânsito do Reino Unido: Direct Airside ou Visitor in Transit",
    h1: "Você precisa de visto de trânsito no Reino Unido?",
    description: "Quando você precisa de um visto Direct Airside Transit ou Visitor in Transit para fazer conexão no Reino Unido, e quando um ETA ou outro visto já cobre.",
    intro: "Precisar ou não de visto de trânsito no Reino Unido depende da sua nacionalidade e de a conexão passar pelo controle de fronteira britânico. Use o verificador do GOV.UK para o seu passaporte; veja como as opções se encaixam.",
    sections: [
      { heading: "Os dois vistos de trânsito", paragraphs: ["O Direct Airside Transit visa é para trocar de voo sem passar pelo controle de fronteira britânico. O Visitor in Transit visa é para passar pelo controle e sair em até 48 horas. Estadias mais longas, ou trânsitos frequentes por mais de seis meses, exigem um Standard Visitor visa."] },
      { heading: "Quando não precisa", paragraphs: ["Você não precisa de visto de trânsito se tiver ETA do Reino Unido, Standard Visitor visa, Marriage Visitor visa, autorização familiar do EU Settlement Scheme ou um documento de viagem do Home Office. Brasileiros, que não precisam de visto para visitar o Reino Unido, usam o ETA quando passam pelo controle de fronteira. A companhia aérea pode dizer se a sua conexão passa por ele.", "Em qualquer caso, tenha os dados do voo seguinte prontos: trânsito é, por definição, sair de novo.", VERIFICAR] },
    ],
    faqs: [{ q: "Colombianos precisam de visto de trânsito no Reino Unido?", a: "Desde 26 de novembro de 2024, colombianos precisam de visto de trânsito aeroportuário direto para fazer trânsito no Reino Unido, salvo exceções." }],
    sources: [
      { label: "GOV.UK: vistos de trânsito (em inglês)", url: "https://www.gov.uk/transit-visa" },
      { label: "GOV.UK: memorando explicativo HC 334 (Colômbia) (em inglês)", url: "https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024/explanatory-memorandum-to-the-statement-of-changes-to-the-immigration-rules-hc-334-26-november-2024-accessible" },
    ],
    checked: CHECKED,
  },
];
