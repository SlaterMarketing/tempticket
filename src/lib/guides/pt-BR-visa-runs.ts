/**
 * Brazilian Portuguese visa run guides. Same facts and official sources as
 * en-visa-runs.ts (checked 2026-11-01), translated. The stay lengths come from
 * the UK Foreign Office for British passports, so every page says so and tells
 * readers with other passports to check their own rules. Keys match the English pages.
 */

import { PRAZO, VERIFICAR } from "./pt-BR";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const fcdo = (slug: string, nome: string): GuideSource => ({
  label: `Ministério das Relações Exteriores britânico: requisitos de entrada (${nome}) (em inglês)`,
  url: `https://www.gov.uk/foreign-travel-advice/${slug}/entry-requirements`,
});

type Run = {
  id: string;
  slug: string;
  pais: string;
  /** "na Tailândia", "no espaço Schengen"... */
  em: string;
  /** "da Tailândia", "do espaço Schengen"... */
  de: string;
  estadia: string;
  reinicia: string;
  regras: string[];
  saidas: string;
  volta: string;
  alternativa?: string;
  faq: GuideFaq;
  fontes: GuideSource[];
  /** Rules that apply whatever your passport (Schengen, caps). */
  geral?: boolean;
};

const CUIDADO =
  "Cada entrada é decidida pelo agente de imigração. Saídas em sequência, com poucas horas fora do país, são o que leva a perguntas ou recusa. Fique um tempo real fora, leve comprovante de recursos e de hospedagem e seja honesto sobre seus planos.";

const PASSAPORTE =
  "Os prazos desta página são os informados pelo Ministério das Relações Exteriores britânico para passaportes britânicos. Com passaporte brasileiro ou outro, podem ser diferentes: confirme no site oficial de imigração do país, na embaixada ou no Portal Consular do Itamaraty antes de planejar a saída.";

const RUNS: Run[] = [
  {
    id: "thailand", slug: "visa-run-tailandia", pais: "Tailândia", em: "na Tailândia", de: "da Tailândia",
    estadia: "30 dias com isenção de visto", reinicia: "Nova entrada, a critério do agente",
    regras: [
      "Para visitantes britânicos, a entrada com isenção de visto na Tailândia agora permite até 30 dias, só para turismo. A imigração pode pedir comprovante de recursos (10.000 bahts por pessoa, 20.000 por família) e de viagem de saída ou volta, e todos precisam preencher o cartão digital de chegada TDAC nos três dias antes da chegada.",
    ],
    saidas: "Kuala Lumpur ou Penang de avião, Vientiane pela Ponte da Amizade, Phnom Penh ou Siem Reap",
    volta: "Voltar para a Tailândia de avião conta como nova chegada, então a companhia aérea vai querer ver um voo de saída dentro dos seus novos 30 dias. Reserve antes de sair.",
    alternativa: "Se for ficar meses, o Destination Thailand Visa (DTV) permite 180 dias por entrada durante cinco anos e dispensa as saídas.",
    faq: { q: "Quantos visa runs posso fazer na Tailândia?", a: "Não há número fixo, mas o agente pode recusar a entrada com isenção se parecer que você mora na Tailândia. Para estadias longas, o DTV ou outro visto é o caminho mais seguro." },
    fontes: [fcdo("thailand", "Tailândia"), { label: "Embaixada da Tailândia em Londres: Destination Thailand Visa (em inglês)", url: "https://london.thaiembassy.org/en/page/destination-thailand-visa" }],
  },
  {
    id: "vietnam", slug: "visa-run-vietna", pais: "Vietnã", em: "no Vietnã", de: "do Vietnã",
    estadia: "45 dias sem visto, ou e-visa de 90 dias", reinicia: "Nova entrada; o e-visa é de múltiplas entradas",
    regras: [
      "Visitantes britânicos podem entrar no Vietnã sem visto por até 45 dias, ou tirar um e-visa de 90 dias com múltiplas entradas. O e-visa só vale nos pontos de entrada e saída escolhidos no pedido.",
    ],
    saidas: "Phnom Penh ou Siem Reap, Vientiane ou Luang Prabang, Bangkok, Kuala Lumpur",
    volta: "Na volta de avião, a companhia aérea pode conferir se você vai sair dentro da nova estadia. Se cruzar por terra com e-visa, confirme que essa fronteira está no seu pedido.",
    alternativa: "Um e-visa de 90 dias com múltiplas entradas costuma tornar a saída desnecessária.",
    faq: { q: "Preciso de visa run com o e-visa do Vietnã?", a: "Não dentro dos 90 dias, porque ele é de múltiplas entradas. Basta sair e entrar pelos pontos indicados nele." },
    fontes: [fcdo("vietnam", "Vietnã")],
  },
  {
    id: "malaysia", slug: "visa-run-malasia", pais: "Malásia", em: "na Malásia", de: "da Malásia",
    estadia: "Normalmente 90 dias na chegada", reinicia: "Nova entrada, a critério do agente",
    regras: [
      "Visitantes britânicos normalmente recebem 90 dias na chegada sem visto. Preencha o Malaysia Digital Arrival Card antes da viagem; a companhia aérea pode pedir no check-in.",
    ],
    saidas: "Singapura (de ônibus pela ponte ou num voo curto), Bangkok, Bali, Medan",
    volta: "Ir a Singapura por terra é o mais comum. Se voltar de avião, tenha um voo de saída dentro dos próximos 90 dias.",
    alternativa: "Trabalhadores remotos que ficam mais tempo podem pedir o passe DE Rantau, válido de 3 a 12 meses e renovável até 24.",
    faq: { q: "Uma viagem a Singapura reinicia minha estadia na Malásia?", a: "Voltar à Malásia é uma nova entrada e o agente decide a duração. Saídas curtas frequentes podem gerar perguntas." },
    fontes: [fcdo("malaysia", "Malásia"), { label: "MDEC: perguntas frequentes do DE Rantau Pass (em inglês)", url: "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf" }],
  },
  {
    id: "bali-indonesia", slug: "visa-run-bali-indonesia", pais: "Indonésia (Bali)", em: "em Bali (Indonésia)", de: "de Bali (Indonésia)",
    estadia: "Visto na chegada de 30 dias", reinicia: "Novo visto a cada entrada",
    regras: [
      "Para visitantes britânicos, o visto na chegada dura 30 dias, custa 500.000 rupias e é de entrada única. Comprovar viagem de saída ou volta é condição para obtê-lo, e Bali cobra à parte uma taxa turística de 150.000 rupias.",
    ],
    saidas: "Singapura, Kuala Lumpur, Perth, Darwin",
    volta: "Cada nova entrada exige um novo visto na chegada e, com ele, comprovante de saída. As companhias aéreas conferem no balcão antes do voo de volta a Bali.",
    alternativa: "Trabalhadores remotos que ficam até um ano podem ver o visto de trabalhador remoto E33G.",
    faq: { q: "Preciso de passagem de saída depois de um visa run em Bali?", a: "Sim. Todo novo visto na chegada exige comprovante de viagem de saída ou volta." },
    fontes: [fcdo("indonesia", "Indonésia")],
  },
  {
    id: "philippines", slug: "visa-run-filipinas", pais: "Filipinas", em: "nas Filipinas", de: "das Filipinas",
    estadia: "30 dias sem visto", reinicia: "Melhor prorrogar no país",
    regras: [
      "Visitantes britânicos podem ficar até 30 dias sem visto e pedir prorrogação no país. Espera-se que a maioria tenha comprovante de viagem de volta ou saída, e todos precisam se registrar no eTravel.",
    ],
    saidas: "Hong Kong, Taipé, Kota Kinabalu, Singapura",
    volta: "Como dá para prorrogar nas Filipinas, muitas vezes a saída é desnecessária. Se sair e voltar, a conferência da passagem de saída vale de novo.",
    faq: { q: "Preciso sair das Filipinas depois de 30 dias?", a: "Não necessariamente. Você pode pedir prorrogação no país." },
    fontes: [fcdo("philippines", "Filipinas")],
  },
  {
    id: "mexico", slug: "visa-run-mexico", pais: "México", em: "no México", de: "do México",
    estadia: "Até 180 dias, conforme o carimbo", reinicia: "Novo carimbo; os dias ficam a critério do agente",
    regras: [
      "Turistas britânicos não precisam de visto. O passaporte é carimbado com o número de dias permitido, até 180. No controle de fronteira podem pedir passagem de volta ou saída e dinheiro suficiente para a estadia. Quem chega por terra preenche um formulário migratório online.",
    ],
    saidas: "Cidade de Belize, Cidade da Guatemala, Havana, ou uma cidade dos EUA se você tiver permissão para entrar lá",
    volta: "O agente mexicano decide quantos dias dar, e uma reserva de volta ou saída para o prazo que você pede ajuda a conseguir.",
    faq: { q: "Consigo 180 dias no México?", a: "É possível, mas o carimbo mostra o que o agente concede. Passagem de volta ou saída e comprovante de recursos reforçam o pedido." },
    fontes: [fcdo("mexico", "México")],
  },
  {
    id: "costa-rica", slug: "visa-run-costa-rica", pais: "Costa Rica", em: "na Costa Rica", de: "da Costa Rica",
    estadia: "Até 180 dias sem visto", reinicia: "Nova entrada",
    regras: [
      "Visitantes britânicos podem ficar até 180 dias com a isenção de visto turístico da Costa Rica. Saindo de avião, pode haver taxa de embarque de US$ 29.",
    ],
    saidas: "Panamá (Paso Canoas ou voo para a Cidade do Panamá), Nicarágua, San Andrés",
    volta: "A saída clássica é para o Panamá por terra, mas o Panamá pode pedir passagem de volta ou saída e US$ 1.000 em recursos, principalmente de quem chega por terra da Costa Rica sem ser residente lá. Na volta, a Costa Rica também espera ver a saída.",
    faq: { q: "O visa run para o Panamá saindo da Costa Rica é fácil?", a: "É comum, mas o Panamá pode pedir passagem de volta ou saída e comprovante de US$ 1.000 ou cartão de crédito, principalmente de quem chega por terra da Costa Rica." },
    fontes: [fcdo("costa-rica", "Costa Rica"), fcdo("panama", "Panamá")],
  },
  {
    id: "panama", slug: "visa-run-panama", pais: "Panamá", em: "no Panamá", de: "do Panamá",
    estadia: "Até 3 meses", reinicia: "Nova entrada",
    regras: [
      "Visitantes britânicos podem ficar até três meses sem visto, chegando por terra ou ar. Na fronteira podem pedir passagem de volta ou saída e comprovante de pelo menos US$ 1.000 ou cartão de crédito. O passaporte precisa de seis meses de validade após a saída e uma página em branco.",
    ],
    saidas: "San José, Bogotá, Medellín, Cartagena",
    volta: "Tenha uma reserva de saída para entrar de novo, principalmente se voltar por terra da Costa Rica.",
    faq: { q: "Quanto dinheiro preciso para entrar no Panamá?", a: "Na fronteira podem pedir pelo menos US$ 1.000 ou um cartão de crédito." },
    fontes: [fcdo("panama", "Panamá")],
  },
  {
    id: "colombia", slug: "visa-run-colombia", pais: "Colômbia", em: "na Colômbia", de: "da Colômbia", geral: true,
    estadia: "90 dias (máx. 180 em 12 meses)", reinicia: "Não: teto de 180 dias por ano",
    regras: [
      "Visitantes britânicos podem ficar até 90 dias, a critério do agente, mas não mais de 180 dias em qualquer período de 12 meses. É preciso mostrar passagem de saída ou volta dentro desses 90 dias. O formulário Check-MIG é opcional, mas agiliza.",
    ],
    saidas: "Cidade do Panamá, Quito, Lima, Aruba",
    volta: "Sair não contorna o teto anual de 180 dias. Dentro dele, cada entrada precisa de passagem de saída em até 90 dias.",
    faq: { q: "Posso ficar mais tempo na Colômbia saindo e voltando?", a: "Só até 180 dias em qualquer período de 12 meses como visitante. Depois disso, é preciso outro tipo de visto." },
    fontes: [fcdo("colombia", "Colômbia")],
  },
  {
    id: "peru", slug: "visa-run-peru", pais: "Peru", em: "no Peru", de: "do Peru", geral: true,
    estadia: "90 em 180 dias (máx. 183 por ano)", reinicia: "Não: há teto",
    regras: [
      "Visitantes britânicos normalmente recebem até 90 dias num período de 180, contados da primeira entrada, e o máximo que pode ser concedido é 183 dias em 365. Ficar além do prazo gera multa e possível detenção.",
    ],
    saidas: "La Paz, Santiago, Arica, Quito, Bogotá",
    volta: "Entrar de novo não zera a contagem de 90 em 180. A companhia aérea ainda pode pedir comprovante de saída num voo só de ida.",
    faq: { q: "Sair do Peru zera meus dias?", a: "Não. Os limites de 90 em 180 e 183 em 365 contam todo o seu tempo no Peru." },
    fontes: [fcdo("peru", "Peru")],
  },
  {
    id: "schengen", slug: "visa-run-schengen", pais: "Espaço Schengen", em: "no espaço Schengen", de: "do espaço Schengen", geral: true,
    estadia: "90 dias em qualquer período de 180", reinicia: "Não: janela móvel de 180 dias",
    regras: [
      "Visitantes de curta duração podem passar 90 dias em qualquer período de 180 somando todos os países Schengen. Sair num fim de semana não zera a conta: ela olha 180 dias para trás a partir de cada dia em que você está lá.",
      "Desde 12 de outubro de 2025 o Sistema de Entrada/Saída (EES) registra entradas e saídas eletronicamente no lugar dos carimbos, em pleno funcionamento desde 10 de abril de 2026, então a contagem é automática.",
    ],
    saidas: "Países fora do Schengen, como Reino Unido, Irlanda, Albânia, Montenegro, Sérvia, Turquia, Geórgia ou Marrocos",
    volta: "Um \"visa run\" Schengen é na verdade uma pausa: passe esse tempo fora e volte quando tiver dias disponíveis. Os guardas de fronteira podem perguntar como você vai sair.",
    faq: { q: "Posso fazer visa run para zerar meus 90 dias Schengen?", a: "Não. Os 90 dias são contados numa janela móvel de 180, e o tempo fora só ajuda porque os dias antigos vão saindo da conta." },
    fontes: [
      { label: "SEAE: o que fazer e não fazer com o visto Schengen (regra 90/180) (em inglês)", url: "https://www.eeas.europa.eu/sites/default/files/2025/documents/Schengen_PDF%20Eng%20Dos_Dont_1206_0.pdf" },
      { label: "Comissão Europeia: o EES entrou em funcionamento em 12 de outubro de 2025 (em inglês)", url: "https://home-affairs.ec.europa.eu/news/new-entryexit-system-went-live-12-october-2025-10-13_en" },
    ],
  },
  {
    id: "albania", slug: "visa-run-albania", pais: "Albânia", em: "na Albânia", de: "da Albânia",
    estadia: "90 dias em 180", reinicia: "Contagem própria de 90/180",
    regras: [
      "Visitantes britânicos podem ficar na Albânia até 90 dias num período de 180, contagem separada da do Schengen, por isso é um lugar popular para passar a pausa Schengen.",
    ],
    saidas: "Montenegro, Macedônia do Norte, Kosovo, o ferry para a Itália ou a Grécia",
    volta: "Ferries e ônibus permitem chegar e sair sem voar. Se chegar de avião só com ida, tenha um plano de saída dentro de 90 dias.",
    faq: { q: "A Albânia serve para a pausa Schengen?", a: "Sim. O limite de 90 em 180 dela é separado do Schengen." },
    fontes: [fcdo("albania", "Albânia")],
  },
  {
    id: "turkey", slug: "visa-run-turquia", pais: "Turquia", em: "na Turquia", de: "da Turquia",
    estadia: "90 dias em 180", reinicia: "Contagem própria de 90/180",
    regras: [
      "Visitantes britânicos podem ficar na Turquia até 90 dias em qualquer período de 180, separado do Schengen. O passaporte precisa de 150 dias de validade a partir da chegada e uma página em branco.",
    ],
    saidas: "Tbilisi, Atenas, Sófia, Lárnaca",
    volta: "As conexões de Istambul facilitam reservar um voo de saída para qualquer lugar.",
    faq: { q: "A Turquia conta para os dias Schengen?", a: "Não. Ela tem seu próprio limite de 90 em 180." },
    fontes: [fcdo("turkey", "Turquia")],
  },
  {
    id: "georgia", slug: "visa-run-georgia", pais: "Geórgia", em: "na Geórgia", de: "da Geórgia",
    estadia: "Até 1 ano", reinicia: "Raramente necessário",
    regras: [
      "Visitantes britânicos podem ficar na Geórgia até um ano sem visto. Todos os visitantes precisam de seguro saúde e contra acidentes, ou recursos para cobrir tratamento médico e repatriação.",
    ],
    saidas: "Yerevan, Istambul, Baku",
    volta: "Com um ano sem visto, raramente é preciso sair. Se chegar só com ida, a companhia aérea ainda pode perguntar como você vai sair.",
    faq: { q: "Preciso de visa run na Geórgia?", a: "Normalmente não: visitantes britânicos podem ficar até um ano." },
    fontes: [fcdo("georgia", "Geórgia")],
  },
  {
    id: "south-korea", slug: "visa-run-coreia-do-sul", pais: "Coreia do Sul", em: "na Coreia do Sul", de: "da Coreia do Sul",
    estadia: "90 dias", reinicia: "Nova entrada, a critério do agente",
    regras: [
      "Visitantes britânicos podem ficar até 90 dias e precisam ter passagem de saída ou volta. Estão isentos do K-ETA até 31 de dezembro de 2026 e precisam entregar um cartão de chegada.",
    ],
    saidas: "Fukuoka (inclusive de ferry saindo de Busan), Osaka, Tóquio, Taipé",
    volta: "Cada entrada exige passagem de saída ou volta, então reserve a saída antes de voltar.",
    faq: { q: "Posso fazer visa run da Coreia para o Japão?", a: "Muita gente faz, mas cada volta à Coreia é uma nova entrada a critério do agente e exige passagem de saída ou volta." },
    fontes: [fcdo("south-korea", "Coreia do Sul")],
  },
  {
    id: "central-america-ca4", slug: "visa-run-america-central-ca4", pais: "América Central (CA-4)", em: "na América Central (CA-4)", de: "da América Central (CA-4)", geral: true,
    estadia: "90 dias compartilhados entre 4 países", reinicia: "Só saindo da área CA-4",
    regras: [
      "Guatemala, El Salvador, Honduras e Nicarágua formam a área CA-4. Para visitantes britânicos, os 90 dias cobrem a viagem por Guatemala, El Salvador e Nicarágua juntos e não recomeçam nas fronteiras entre eles. A Nicarágua avisa que a entrada pode ser recusada sem passagem de saída.",
    ],
    saidas: "México, Belize ou Costa Rica",
    volta: "Cruzar entre países CA-4 não é visa run. Saia da área e, na volta, tenha uma passagem de saída da região.",
    faq: { q: "Passar da Guatemala para El Salvador zera meus dias?", a: "Não. Os países CA-4 compartilham um único período de 90 dias." },
    fontes: [fcdo("guatemala", "Guatemala"), fcdo("el-salvador", "El Salvador"), fcdo("nicaragua", "Nicarágua")],
  },
];

function build(r: Run): Guide {
  return {
    key: `visa-run-${r.id}`,
    slug: r.slug,
    title: `Visa Run ${r.em}: Regras, Saídas e Passagem de Saída`,
    h1: `Visa run ${r.em}: o que as regras permitem`,
    description: `Quanto tempo você pode ficar ${r.em}, se sair e entrar de novo zera algo, as saídas mais comuns e a passagem de saída que vai precisar na volta.`,
    intro: `Visa run é sair de um país e voltar para começar uma nova estadia. Se isso funciona ${r.em} depende de como os limites são contados. Veja o que dizem as fontes oficiais.`,
    sections: [
      { heading: "As regras", paragraphs: [...r.regras, ...(r.alternativa ? [r.alternativa] : []), ...(r.geral ? [] : [PASSAPORTE])] },
      { heading: "Para onde as pessoas vão", paragraphs: [`As saídas mais comuns são ${r.saidas}.`, CUIDADO] },
      { heading: "Na volta: a passagem de saída", paragraphs: [r.volta, PRAZO, VERIFICAR] },
    ],
    faqs: [r.faq],
    sources: r.fontes,
    checked: CHECKED,
  };
}

export const PT_BR_VISA_RUN_GUIDES: Guide[] = [
  {
    key: "visa-runs-explained",
    slug: "visa-runs-explicados",
    title: "Visa Runs Explicados: Quais Países Zeram a Estadia e Quais Não",
    h1: "Visa runs e border runs: quais países zeram sua estadia",
    description:
      "Onde um visa run começa uma nova estadia e onde limites móveis como 90 em 180 o tornam inútil, com a passagem de saída que você precisa a cada volta.",
    intro:
      "Alguns países contam cada entrada separadamente, então sair e voltar começa uma nova estadia a critério do agente. Outros usam tetos móveis ou anuais, e aí sair não adianta nada. Esta tabela organiza tudo com os dados oficiais do governo britânico para passaportes britânicos; com passaporte brasileiro, os prazos podem ser outros.",
    table: {
      caption: "Visa runs por país",
      headers: ["País", "Estadia sem visto", "Sair zera a contagem?"],
      rows: RUNS.map((r) => [r.pais, r.estadia, r.reinicia]),
      rowLinks: RUNS.map((r) => r.slug),
      note: "Para passaportes britânicos, segundo o GOV.UK e fontes da UE. O agente decide cada entrada.",
    },
    sections: [
      {
        heading: "A regra que vale em todo lugar",
        paragraphs: [
          "Cada nova entrada é uma nova chegada, e a companhia aérea trata você como passageiro só de ida se não tiver voo de saída. Reserve o trecho de saída antes de voltar.",
          CUIDADO,
          PRAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      { q: "Visa run é legal?", a: "Sair e entrar de novo é legal onde as regras contam cada entrada separadamente, mas o agente pode recusar a entrada se achar que você mora ou trabalha no país como turista." },
    ],
    sources: RUNS.flatMap((r) => r.fontes.slice(0, 1)),
    checked: CHECKED,
  },
  ...RUNS.map(build),
];
