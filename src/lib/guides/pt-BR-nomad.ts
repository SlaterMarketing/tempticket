/**
 * Brazilian Portuguese digital nomad visa guides. Same facts and official
 * sources as en-nomad.ts (checked 2026-11-01), translated. Keys match the
 * English pages so hreflang links them.
 */

import { PRAZO, VERIFICAR } from "./pt-BR";
import type { Guide, GuideFaq, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Nomade = {
  id: string;
  slug: string;
  pais: string;
  /** "na Tailândia", "no Japão"... */
  em: string;
  /** "da Tailândia", "do Japão"... */
  de: string;
  programa: string;
  renda: string;
  duracao: string;
  fatos: string[];
  chegada: string;
  faq: GuideFaq;
  fontes: GuideSource[];
};

const COMO_VISITANTE =
  "Se você entrar como visitante antes de a autorização sair, no check-in você é um turista como qualquer outro: a companhia aérea pode pedir a um passageiro só de ida que comprove a saída dentro do prazo de estadia permitido. Uma reserva temporária cobre essa lacuna sem você comprar um voo que não vai usar.";

const ingles = (label: string, url: string): GuideSource => ({ label: `${label} (em inglês)`, url });

const NOMADES: Nomade[] = [
  {
    id: "thailand", slug: "visto-nomade-digital-tailandia", pais: "Tailândia", em: "na Tailândia", de: "da Tailândia",
    programa: "Destination Thailand Visa (DTV)",
    renda: "Recursos de 500.000 bahts (cerca de 12.000 libras)", duracao: "5 anos, 180 dias por entrada",
    fatos: [
      "O DTV vale por cinco anos, com múltiplas entradas, e permite 180 dias por entrada, prorrogáveis uma vez na Tailândia por até mais 180 dias. Depois disso você sai e entra de novo com o mesmo visto.",
      "Ele cobre trabalhadores remotos, nômades digitais e freelancers (a categoria 'workcation'), atividades de 'soft power' tailandês como Muay Thai ou cursos de culinária, e dependentes. Na Embaixada da Tailândia em Londres a taxa é de 300 libras e é preciso mostrar pelo menos 500.000 bahts em recursos; a taxa varia conforme a embaixada onde você pede.",
    ],
    chegada: "Com o DTV no passaporte você pode entrar só com ida, porque o próprio visto permite estadias longas. Sem ele, a entrada com isenção de visto é bem mais curta e as companhias aéreas conferem a passagem de saída. " + COMO_VISITANTE,
    faq: { q: "Posso trabalhar para clientes tailandeses com o DTV?", a: "A categoria workcation é para trabalho remoto para empregadores ou clientes no exterior. Trabalhar para empresas tailandesas exige autorização de trabalho." },
    fontes: [ingles("Embaixada da Tailândia em Londres: Destination Thailand Visa", "https://london.thaiembassy.org/en/page/destination-thailand-visa")],
  },
  {
    id: "japan", slug: "visto-nomade-digital-japao", pais: "Japão", em: "no Japão", de: "do Japão",
    programa: "Nômade digital (Atividades Designadas)",
    renda: "10 milhões de ienes por ano", duracao: "6 meses, sem prorrogação",
    fatos: [
      "O visto de nômade digital do Japão exige renda anual de pelo menos 10 milhões de ienes, comprovada com documentos fiscais, de renda ou de emprego, e um seguro que cubra morte, lesões e doenças com pelo menos 10 milhões de ienes de cobertura médica.",
      "A estadia é de seis meses e não pode ser prorrogada nem renovada. Cônjuge e filhos podem acompanhar, com seguro próprio.",
    ],
    chegada: "O visto é emitido antes da viagem, então você pode embarcar com ele. Seis meses é o limite absoluto, então planeje o voo de saída dentro desse prazo.",
    faq: { q: "Dá para prorrogar o visto de nômade digital do Japão?", a: "Não. São seis meses sem prorrogação, segundo o Ministério das Relações Exteriores do Japão." },
    fontes: [ingles("Ministério das Relações Exteriores do Japão: Atividades Designadas (Nômade Digital)", "https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html")],
  },
  {
    id: "spain", slug: "visto-nomade-digital-espanha", pais: "Espanha", em: "na Espanha", de: "da Espanha",
    programa: "Visto para teletrabalho de caráter internacional",
    renda: "200% do salário mínimo mensal espanhol", duracao: "Até 1 ano, depois cartão de residência",
    fatos: [
      "É preciso ter pelo menos 200% do salário mínimo mensal espanhol, mais 75% para o primeiro familiar e 25% para cada familiar adicional. O trabalho deve ser remoto para uma empresa de fora da Espanha; autônomos podem trabalhar para clientes espanhóis em até 20% da atividade.",
      "Pede-se diploma universitário ou três anos de experiência na área, pelo menos três meses trabalhando para a empresa estrangeira, seguro saúde e antecedentes criminais limpos. O visto vale até um ano, e depois você pode pedir o cartão de residência na Espanha.",
    ],
    chegada: "Com o visto emitido você pode entrar só com ida. A Espanha faz parte do espaço Schengen, então antes disso você é um visitante de curta duração, limitado a 90 dias em 180.",
    faq: { q: "Quanto preciso ganhar para o visto de nômade digital da Espanha?", a: "Pelo menos 200% do salário mínimo mensal espanhol, mais se levar a família. Confira o valor atual do salário mínimo, porque ele muda." },
    fontes: [ingles("Consulado-Geral da Espanha em Londres: Digital Nomad Visa", "https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/Consular/Digital-Nomad-Visa.aspx")],
  },
  {
    id: "portugal", slug: "visto-nomade-digital-portugal", pais: "Portugal", em: "em Portugal", de: "de Portugal",
    programa: "Visto de estada temporária para trabalho remoto",
    renda: "4 vezes o salário mínimo mensal português", duracao: "Estada temporária (há também visto de residência)",
    fatos: [
      "É preciso comprovar renda média mensal nos últimos três meses de pelo menos quatro vezes o salário mínimo português, além de seguro de viagem que cubra assistência médica e repatriação.",
      "Portugal também oferece um visto de residência para trabalho remoto para quem pretende ficar mais tempo.",
    ],
    chegada: "A lista de documentos do visto de estada temporária pede cópia da passagem de regresso. Mas há uma boa notícia para brasileiros: cidadãos de países da CPLP, como o Brasil, estão dispensados do seguro e da passagem de regresso.",
    faq: { q: "Brasileiro precisa de passagem de volta para o visto de nômade digital de Portugal?", a: "Não. A lista de documentos dispensa cidadãos da CPLP, incluindo brasileiros, do seguro de viagem e da passagem de regresso. Para outras nacionalidades, a cópia da passagem de regresso é exigida." },
    fontes: [ingles("Embaixada de Portugal em Tóquio: lista de documentos, visto de estada temporária para trabalho remoto", "https://toquio.embaixadaportugal.mne.gov.pt/images/vistos/checklists/en/estada_temporaria/temporary_stay_visa_for_remote_work_-_digital_nomads.pdf")],
  },
  {
    id: "croatia", slug: "visto-nomade-digital-croacia", pais: "Croácia", em: "na Croácia", de: "da Croácia",
    programa: "Permanência temporária para nômades digitais",
    renda: "€ 3.622,50 por mês (ou um valor total)", duracao: "Até 18 meses",
    fatos: [
      "É preciso ter pelo menos 2,5 vezes o salário líquido médio mensal da Croácia, hoje € 3.622,50 por mês, mais 10% por familiar. Também é possível comprovar economias de € 43.470 para 12 meses ou € 65.205 para 18 meses.",
      "A permanência é de até 18 meses. Você precisa trabalhar para um empregador estrangeiro ou sua própria empresa não croata, ter seguro saúde e registrar o endereço em até três dias após a chegada.",
    ],
    chegada: "Quem é isento de visto pode pedir online e entrar como visitante; quem precisa de visto pede em uma embaixada ou consulado croata. " + COMO_VISITANTE,
    faq: { q: "Dá para prorrogar a autorização de nômade digital da Croácia?", a: "Sim, por até seis meses, se você pedir pelo menos 60 dias antes do vencimento. Um novo pedido é possível seis meses após o fim." },
    fontes: [ingles("Ministério do Interior da Croácia: permanência temporária de nômades digitais", "https://mup.gov.hr/aliens-281621/temporary-stay-of-digital-nomads-286853/286853")],
  },
  {
    id: "malta", slug: "visto-nomade-digital-malta", pais: "Malta", em: "em Malta", de: "de Malta",
    programa: "Nomad Residence Permit",
    renda: "€ 42.000 por ano (bruto)", duracao: "1 ano, renovável",
    fatos: [
      "A renda bruta mínima é de € 42.000 por ano para pedidos feitos desde 1º de abril de 2024. Você deve trabalhar remotamente para um empregador estrangeiro, sua própria empresa estrangeira ou clientes estrangeiros como freelancer.",
      "Também é preciso ter seguro saúde com cobertura na UE e no Reino Unido, contrato de aluguel ou compra em Malta, certidão de antecedentes criminais e verificação de antecedentes.",
    ],
    chegada: COMO_VISITANTE,
    faq: { q: "Qual a renda exigida para o Nomad Residence Permit de Malta?", a: "€ 42.000 brutos por ano para pedidos desde 1º de abril de 2024, segundo a Residency Malta." },
    fontes: [ingles("Residency Malta Agency: requisitos do Nomad Residence Permit", "https://nomad.residencymalta.gov.mt/nomad-eligibility/")],
  },
  {
    id: "italy", slug: "visto-nomade-digital-italia", pais: "Itália", em: "na Itália", de: "da Itália",
    programa: "Visto para nômades digitais e trabalhadores remotos",
    renda: "Acima de € 24.780 por ano", duracao: "Visto nacional de longa duração",
    fatos: [
      "Sua renda no ano anterior deve superar o limite de isenção das taxas de saúde pública, que a embaixada italiana em Ottawa informa como € 24.780. É preciso ter diploma universitário, três anos de experiência relevante, ou uma qualificação mais cinco anos de experiência, e seguro saúde para toda a estadia.",
      "O processamento pode levar até 120 dias para nômades digitais e 90 dias para trabalhadores remotos.",
    ],
    chegada: "A embaixada explica que estadias acima de 90 dias usam visto nacional com passagem só de ida, enquanto estadias de até 90 dias usam visto Schengen com passagem de ida e volta.",
    faq: { q: "Posso voar para a Itália só com ida com o visto de nômade digital?", a: "Sim. Para o visto nacional de longa duração a embaixada fala em passagem só de ida; estadias Schengen curtas exigem ida e volta." },
    fontes: [ingles("Embaixada da Itália em Ottawa: visto para nômades digitais e trabalhadores remotos", "https://ambottawa.esteri.it/en/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/digital-nomad-remote-worker-visa/")],
  },
  {
    id: "hungary", slug: "visto-nomade-digital-hungria", pais: "Hungria", em: "na Hungria", de: "da Hungria",
    programa: "White Card",
    renda: "€ 3.000 líquidos por mês", duracao: "1 ano, prorrogável uma vez",
    fatos: [
      "É preciso ter pelo menos € 3.000 líquidos por mês nos seis meses anteriores à entrada, mantidos durante a estadia, de um empregador ou empresa no exterior. Não é permitido trabalhar para clientes húngaros nem ser sócio de empresa húngara.",
      "A autorização dura até um ano e pode ser prorrogada uma vez por mais um ano, se você tiver passado pelo menos 90 dos 180 dias anteriores na Hungria.",
    ],
    chegada: "O pedido exige hospedagem, seguro saúde e um documento de viagem válido ou passagem de saída, então tenha uma reserva pronta. " + COMO_VISITANTE,
    faq: { q: "Quanto tempo vale a White Card da Hungria?", a: "Até um ano, prorrogável uma vez por mais um ano." },
    fontes: [ingles("Direção-Geral de Estrangeiros da Hungria: White Card", "https://oif.gov.hu/factsheets/white-card-residency-for-digital-nomads")],
  },
  {
    id: "estonia", slug: "visto-nomade-digital-estonia", pais: "Estônia", em: "na Estônia", de: "da Estônia",
    programa: "Digital Nomad Visa",
    renda: "€ 4.500 líquidos por mês", duracao: "Até 1 ano",
    fatos: [
      "É preciso ter renda líquida de pelo menos € 4.500 por mês de um empregador ou empresa registrada fora da Estônia, ou principalmente de clientes estrangeiros como freelancer, e poder trabalhar de qualquer lugar.",
      "O pedido é feito na embaixada da Estônia mais próxima; o processamento leva até 30 dias.",
    ],
    chegada: "O visto é emitido antes da viagem. Se você for isento de visto e visitar antes, vale a regra Schengen de 90 dias em 180 até a aprovação.",
    faq: { q: "O visto de nômade digital da Estônia é o mesmo que a e-Residency?", a: "Não. A e-Residency é uma identidade digital para administrar uma empresa estoniana e não dá direito de morar na Estônia. O visto de nômade dá, por até um ano." },
    fontes: [ingles("e-Residency (República da Estônia): Digital Nomad Visa versus e-Residency", "https://www.e-resident.gov.ee/nomadvisa/")],
  },
  {
    id: "montenegro", slug: "visto-nomade-digital-montenegro", pais: "Montenegro", em: "em Montenegro", de: "de Montenegro",
    programa: "Residência temporária para nômades digitais",
    renda: "Meios financeiros (sem mínimo fixo publicado)", duracao: "Até 2 anos, prorrogável uma vez",
    fatos: [
      "A autorização dura até dois anos e pode ser prorrogada uma vez por até mais dois. É preciso comprovar meios financeiros, hospedagem, seguro saúde, antecedentes limpos e um contrato mostrando que você trabalha por meios eletrônicos para uma empresa estrangeira ou sua própria empresa não montenegrina.",
      "O pedido é feito pessoalmente no Ministério do Interior da cidade onde você mora; a autorização sai em 40 dias.",
    ],
    chegada: "Você precisa ter entrado legalmente em Montenegro, o que para a maioria dos nômades significa chegar primeiro como visitante. " + COMO_VISITANTE,
    faq: { q: "A autorização de nômade de Montenegro é pedida do exterior?", a: "Não: o pedido é feito pessoalmente no Ministério do Interior em Montenegro, depois de entrar legalmente." },
    fontes: [ingles("Governo de Montenegro: situação legal dos nômades digitais", "https://digitalnomads.gov.me/article/legal-status-for-nomads")],
  },
  {
    id: "south-korea", slug: "visto-nomade-digital-coreia-do-sul", pais: "Coreia do Sul", em: "na Coreia do Sul", de: "da Coreia do Sul",
    programa: "Visto workation (F-1-D)",
    renda: "2 vezes a RNB per capita da Coreia (cerca de US$ 65.800)", duracao: "1 ano, prorrogável por 1 ano",
    fatos: [
      "É preciso ter renda após impostos maior que o dobro da renda nacional bruta per capita da Coreia do ano anterior, cerca de US$ 65.800 por ano no padrão atual, pelo menos um ano de vínculo com sua empresa e seguro saúde de € 70.000 para toda a estadia.",
      "O visto é de múltiplas entradas por um ano e pode ser prorrogado por até um ano em um escritório de imigração na Coreia.",
    ],
    chegada: "O F-1-D é emitido por uma embaixada ou consulado da Coreia antes da viagem. Sem ele, visitantes isentos de visto precisam ter passagem de saída ou de volta, segundo o Ministério das Relações Exteriores britânico.",
    faq: { q: "Quanto preciso ganhar para o visto workation da Coreia?", a: "Mais que o dobro da RNB per capita da Coreia do ano anterior, após impostos: cerca de US$ 65.800 por ano no valor atual." },
    fontes: [ingles("Consulado-Geral da Coreia em Seattle: visto workation F-1-D", "https://overseas.mofa.go.kr/us-seattle-en/brd/m_23042/view.do?seq=41")],
  },
  {
    id: "malaysia", slug: "visto-nomade-digital-malasia", pais: "Malásia", em: "na Malásia", de: "da Malásia",
    programa: "DE Rantau Nomad Pass",
    renda: "US$ 24.000 por ano (tecnologia) ou US$ 60.000 (outras áreas)", duracao: "3 a 12 meses, renovável até 24",
    fatos: [
      "Profissionais de tecnologia precisam de pelo menos US$ 24.000 por ano; de outras áreas, US$ 60.000. O passe dura de 3 a 12 meses e pode ser renovado por mais 12, até 24 meses no total.",
      "As taxas são de 1.080 ringgits por solicitante e 540 por dependente, mais as taxas do passe de imigração e, se a MDEC for sua patrocinadora, uma caução reembolsável. O passaporte precisa ter mais de 14 meses de validade no pedido.",
    ],
    chegada: "Muitos solicitantes chegam primeiro como visitantes. " + COMO_VISITANTE,
    faq: { q: "Quem pode pedir o passe DE Rantau da Malásia?", a: "Todas as nacionalidades, exceto a israelense, maiores de 18 anos, que atinjam o limite de renda da sua área." },
    fontes: [ingles("MDEC: perguntas frequentes do DE Rantau Pass (versão 10)", "https://www.mdec.my/api/media/file/DE-Rantau_Pass_FAQ_v10.pdf")],
  },
  {
    id: "indonesia", slug: "visto-nomade-digital-indonesia-bali", pais: "Indonésia", em: "na Indonésia", de: "da Indonésia",
    programa: "Visto de trabalhador remoto (E33G)",
    renda: "US$ 60.000 por ano", duracao: "Até 1 ano",
    fatos: [
      "É preciso ter renda de pelo menos US$ 60.000 por ano, saldo bancário de pelo menos US$ 2.000 nos últimos três meses e contrato de trabalho com uma empresa de fora da Indonésia. Não é permitido vender bens ou serviços nem trabalhar para clientes indonésios.",
      "O visto permite estadia de até um ano e deve ser usado para entrar em até 90 dias após a emissão. A taxa oficial aparece como 7.000.000 de rupias por um ano.",
    ],
    chegada: "Com o visto de trabalhador remoto você entra sem a conferência de passagem de saída exigida para o visto na chegada de 30 dias.",
    faq: { q: "Posso morar em Bali com o visto de trabalhador remoto?", a: "Sim, por até um ano, desde que trabalhe para uma empresa de fora da Indonésia e não venda serviços localmente." },
    fontes: [ingles("Direção-Geral de Imigração da Indonésia: perguntas frequentes do eVisa oficial", "https://evisa.imigrasi.go.id/front/faq/e076131c-0d39-469b-afaf-75fc66aff923")],
  },
  {
    id: "costa-rica", slug: "visto-nomade-digital-costa-rica", pais: "Costa Rica", em: "na Costa Rica", de: "da Costa Rica",
    programa: "Estadia para nômades digitais",
    renda: "US$ 3.000 por mês (US$ 4.000 com família)", duracao: "Ver site oficial",
    fatos: [
      "É preciso ter renda de pelo menos US$ 3.000 por mês vinda de fora da Costa Rica, ou US$ 4.000 por mês para incluir a família, convertida pelo câmbio oficial do Banco Central.",
      "A taxa do governo é de US$ 100, que deve chegar integralmente ao Ministério da Fazenda; o banco recebedor cobra mais US$ 15.",
    ],
    chegada: "A maioria dos nômades chega como turista enquanto o pedido é processado, e a Costa Rica é conhecida por companhias aéreas que conferem a passagem de saída. " + COMO_VISITANTE,
    faq: { q: "Qual a renda exigida para o visto de nômade digital da Costa Rica?", a: "US$ 3.000 por mês para uma pessoa, ou US$ 4.000 para incluir a família, de fontes fora da Costa Rica." },
    fontes: [ingles("Visit Costa Rica (ICT): requisitos para nômades digitais", "https://www.visitcostarica.com/digital-nomads/requirements")],
  },
  {
    id: "panama", slug: "visto-nomade-digital-panama", pais: "Panamá", em: "no Panamá", de: "do Panamá",
    programa: "Visto de curta duração para trabalhadores remotos",
    renda: "US$ 36.000 por ano", duracao: "9 meses, prorrogável por mais 9",
    fatos: [
      "É preciso ter renda do exterior de pelo menos US$ 36.000 por ano (empregados do setor privado, acima de US$ 3.000 por mês) e seguro saúde internacional para a estadia. A taxa é de US$ 250.",
      "O visto é concedido por até nove meses e pode ser prorrogado por mais nove.",
    ],
    chegada: COMO_VISITANTE,
    faq: { q: "Quanto tempo posso ficar no Panamá como trabalhador remoto?", a: "Nove meses, prorrogáveis uma vez por mais nove." },
    fontes: [{ label: "ProPanamá (Governo do Panamá): visto para nômades digitais (em espanhol)", url: "https://propanama.gob.pa/visa-para-nomadas-digitales/" }],
  },
  {
    id: "barbados", slug: "visto-nomade-digital-barbados", pais: "Barbados", em: "em Barbados", de: "de Barbados",
    programa: "Welcome Stamp",
    renda: "US$ 50.000 por ano", duracao: "12 meses, pode pedir de novo",
    fatos: [
      "O Welcome Stamp permite trabalhar remotamente de Barbados por até 12 meses se você ganhar pelo menos US$ 50.000 por ano. As taxas são de US$ 2.000 por pessoa e US$ 3.000 por família, pagas após a aprovação.",
      "A renda remota não é tributada em Barbados, mas o consumo local paga IVA de 17,5%.",
    ],
    chegada: "Barbados exige que visitantes mostrem passagem de saída ou de volta para entrar, segundo o Ministério das Relações Exteriores britânico. Se você chegar antes da aprovação do selo, precisa dessa reserva.",
    faq: { q: "O Welcome Stamp de Barbados paga imposto?", a: "A renda remota não paga imposto de renda em Barbados, mas as compras pagam IVA." },
    fontes: [
      ingles("Visit Barbados: Barbados Welcome Stamp de 12 meses", "https://www.visitbarbados.org/barbados-welcome-stamp"),
      ingles("Ministério das Relações Exteriores britânico: requisitos de entrada em Barbados", "https://www.gov.uk/foreign-travel-advice/barbados/entry-requirements"),
    ],
  },
  {
    id: "mauritius", slug: "visto-nomade-digital-mauricio", pais: "Maurício", em: "em Maurício", de: "de Maurício",
    programa: "Premium Visa",
    renda: "Ver EDB Mauritius", duracao: "1 ano, renovável",
    fatos: [
      "O Premium Visa permite ficar em Maurício por um ano, renovável, e é gratuito. Os pedidos passam pelo Economic Development Board.",
    ],
    chegada: "Visitantes de Maurício precisam poder comprovar viagem de saída ou de volta, segundo o Ministério das Relações Exteriores britânico, então tenha uma reserva se chegar antes de o Premium Visa ser concedido.",
    faq: { q: "Quanto custa o Premium Visa de Maurício?", a: "Nada: o Escritório de Passaportes e Imigração diz que é gratuito." },
    fontes: [
      ingles("Escritório de Passaportes e Imigração de Maurício: Premium Visa", "https://passport.govmu.org/passport/?page_id=595"),
      ingles("Ministério das Relações Exteriores britânico: requisitos de entrada em Maurício", "https://www.gov.uk/foreign-travel-advice/mauritius/entry-requirements"),
    ],
  },
];

function build(n: Nomade): Guide {
  return {
    key: `digital-nomad-visa-${n.id}`,
    slug: n.slug,
    title: `Visto de Nômade Digital ${n.de}: Renda, Duração e Chegada Só com Ida`,
    h1: `Visto de nômade digital ${n.de}: ${n.programa}`,
    description: `${n.programa}: renda exigida (${n.renda}), quanto tempo dura, as condições e o que mostrar se você viajar só com ida.`,
    intro: `O programa ${n.programa} permite que trabalhadores remotos morem legalmente ${n.em}. Veja os requisitos conferidos em fontes oficiais e como funciona a chegada para nômades que costumam viajar só com ida.`,
    sections: [
      { heading: "Os requisitos", paragraphs: n.fatos },
      { heading: "Chegar só com ida", paragraphs: [n.chegada, PRAZO, VERIFICAR] },
    ],
    faqs: [n.faq],
    sources: n.fontes,
    checked: CHECKED,
  };
}

export const PT_BR_NOMAD_GUIDES: Guide[] = [
  {
    key: "digital-nomad-visas-compared",
    slug: "vistos-nomade-digital-comparados",
    title: "Vistos de Nômade Digital Comparados: Renda e Duração por País",
    h1: "Vistos de nômade digital comparados",
    description:
      "Renda exigida e duração de 17 vistos de nômade digital, do DTV da Tailândia a Espanha, Portugal, Japão e Costa Rica, conferidos em fontes oficiais.",
    intro:
      "Os vistos de nômade digital variam muito: alguns pedem poucos milhares de euros por mês, outros 10 milhões de ienes por ano; alguns duram seis meses, outros cinco anos. Esta tabela compara os principais, com cada número tirado da página do governo ou da embaixada indicada no guia de cada país.",
    table: {
      caption: "Vistos de nômade digital: renda e duração",
      headers: ["País", "Programa", "Renda ou recursos", "Duração"],
      rows: NOMADES.map((n) => [n.pais, n.programa, n.renda, n.duracao]),
      rowLinks: NOMADES.map((n) => n.slug),
      note: "Os valores mudam, muitas vezes todo ano. Confira a fonte oficial no guia de cada país antes de pedir.",
    },
    sections: [
      {
        heading: "O que ninguém conta: como chegar",
        paragraphs: [
          "A maioria dos nômades viaja só com ida, e muitos chegam como visitantes antes de a autorização ser aprovada, ou fazem o pedido de dentro do país. Nessa hora a companhia aérea trata você como turista e pode pedir comprovante de saída. Para brasileiros, Portugal é exceção: cidadãos da CPLP estão dispensados da passagem de regresso no visto de estada temporária.",
          PRAZO,
          VERIFICAR,
        ],
      },
    ],
    faqs: [
      { q: "Qual visto de nômade digital pede a menor renda?", a: "Entre estes, o DE Rantau da Malásia para tecnologia (US$ 24.000 por ano) e a Itália (acima de € 24.780 por ano) são os menores, mas cada um tem outras condições. O DTV da Tailândia pede recursos guardados em vez de renda." },
      { q: "Qual dura mais?", a: "O DTV da Tailândia vale por cinco anos, com 180 dias por entrada." },
    ],
    sources: NOMADES.flatMap((n) => n.fontes.slice(0, 1)),
    checked: CHECKED,
  },
  ...NOMADES.map(build),
];
