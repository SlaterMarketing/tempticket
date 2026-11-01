/**
 * Simplified Chinese guides for visa applicants from mainland China. Same rules
 * as the English ones: general guidance, official sources where facts are
 * specific, never legal advice.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const HESHI =
  "收到预订后，打开航空公司官网的“管理预订”(Manage booking) 页面，用订座记录编号 (PNR) 和姓氏查询。如果能查到，值机人员和签证官也能查到。除了邮件，也请保存截图。";

export const YOUXIAO =
  "这类预订只保留很短时间 (通常约 48 小时)，之后自动失效。请在值机或递签前不久再订，不要提前好几周。";

export const ZH_CN_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "proof-of-onward-travel",
    title: "离境机票 (Onward Ticket) 是什么？为什么需要、如何准备",
    h1: "离境机票证明：一文读懂",
    description:
      "航空公司和边检为什么要求离境或回程机票、哪些可以作为证明，以及如何不买用不上的机票就获得可核实的机票预订。",
    intro:
      "许多国家只允许能证明会按期离开的旅客入境。航空公司在值机时就会执行这项规定，因为旅客如果被拒绝入境，航空公司要自费把人送回。如果您持单程机票出行，可能需要出示离境或回程航班。",
    sections: [
      {
        heading: "谁会检查",
        paragraphs: [
          "两个环节会检查：值机时的航空公司，以及抵达时的移民官。实际上航空公司问得更多，因为系统会自动标记前往有离境要求国家的单程旅客。",
          "申根签证等许多签证申请也要求提供行程单。多数领事馆表示预订即可，并建议签证下来之前不要购买机票。",
        ],
      },
      {
        heading: "什么算证明",
        paragraphs: [
          "任何离开该国的航班 (目的地不限)，并有工作人员能查到的预订编号。陆路口岸有时接受大巴或渡轮票，但航空公司通常要看机票。",
          "真实的预订有可在航空公司官网查询的 PNR。修改过的 PDF 或假预订不是证明，出示它可能被拒，甚至后果更严重。",
        ],
      },
      {
        heading: "您的选择",
        paragraphs: [
          "买可全额退款的机票，之后取消。可行，但会占用一大笔钱，退款可能要好几周。",
          "买最便宜的离境航班，然后不坐。简单，但钱就没了。",
          "使用离境机票服务。支付少量费用，即可以您的名字保留一个真实预订一段时间，之后释放。多数长期旅行者都这么做。",
        ],
      },
      { heading: "如何确认是真的", paragraphs: [HESHI, YOUXIAO] },
    ],
    faqs: [
      {
        q: "离境机票预订合法吗？",
        a: "保留座位预订是航空公司的正常业务，领事馆在签证申请中也普遍接受预订。不被接受的是伪造文件。请始终以官方信息确认目的地的规定。",
      },
      {
        q: "离境航班一定要飞回中国吗？",
        a: "不用。只要离开您入境的国家即可。飞往邻国的短途航班是常见选择。",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "dummy-ticket-for-visa",
    title: "签证机票预订单：真实预订还是假 PDF？",
    h1: "办签证用的机票预订单",
    description:
      "签证用的机票预订单 (dummy ticket) 到底是什么、使领馆为什么要求、如何区分真实预订和假 PDF，以及如何获得可核实的预订。",
    intro:
      "旅游业把随签证申请提交的机票预订称为“dummy ticket”。它显示您的日期和行程，而不用为可能用不上的机票付全款。这个名字有误导性：好的预订单一点也不假，而是在航空公司系统里短期保留的真实预订。",
    sections: [
      {
        heading: "使领馆为什么要求",
        paragraphs: [
          "签证官希望看到您的行程有清楚的起止，日期与申请材料一致。许多使领馆和签证中心明确表示签证下来之前不要买票，所以预订单就是他们期待的材料。",
          "申根国家、日本等许多国家通常要求行程单或机票预订。英国和美国不强制要求，但接受它作为辅助材料。",
        ],
      },
      {
        heading: "真实预订还是假 PDF？",
        paragraphs: [
          "真实预订有可以在航空公司“管理预订”页面查询的 PNR。假的只是改得像预订的文件，背后什么都没有。",
          "使领馆和航空公司能够核查，也确实会核查。提交伪造材料可能导致拒签并影响今后的申请。英国对使用欺骗手段的申请人会在 10 年内拒绝其申请。只使用您自己能核实的预订。",
        ],
      },
      {
        heading: "信息要一致",
        paragraphs: [
          "姓名必须与护照完全一致 (拼音)，护照上有中间名也要一并填写。日期应与申请表和酒店预订一致。",
          "多数签证申请需要往返行程。如果要去多个国家，预订应从主要停留国或首入国开始，按使领馆材料清单的要求准备。",
        ],
      },
      { heading: "时间安排", paragraphs: [YOUXIAO, HESHI] },
    ],
    faqs: [
      {
        q: "签证机票预订单合法吗？",
        a: "真实的机票预订合法，也是许多使领馆要求的材料。伪造或修改的预订不合法，可能导致拒签。",
      },
      {
        q: "使领馆会核查预订吗？",
        a: "可能会，尤其在审理初期。所以预订必须有能在航空公司官网查到的 PNR。",
      },
      {
        q: "预订过期了怎么办？",
        a: "没关系。使领馆知道预订会失效，并建议签证批下来前不要买票。拿到结果后再买正式机票。",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "flight-itinerary-for-schengen-visa",
    title: "申根签证机票预订单 (不用先买票)",
    h1: "申根签证申请的机票行程单",
    description:
      "多数申根领事馆要求机票预订而非已付款机票。如何为签证中心递签准备可核实的往返行程单。",
    intro:
      "申根签证申请通常要求提供行程单，说明您如何入境和离境。许多领事馆明确表示，签证批准前不应购买机票，预订即可。",
    sections: [
      {
        heading: "领事馆要什么",
        paragraphs: [
          "与申请日期一致的往返行程，或入境和离境航班。预订上的姓名必须与护照完全一致。",
          "不同国家和签证中心的要求可能不同，请阅读您递签领事馆的材料清单。有些会要求比预订更多的材料。",
        ],
      },
      {
        heading: "配合递签时间",
        paragraphs: ["在递签前一两天订好，确保材料审核时预订仍然有效。", HESHI],
      },
    ],
    faqs: [
      {
        q: "需要往返机票还是单程就行？",
        a: "多数申根申请需要往返行程，或至少有离开申根区的确定航班。往返预订两者都能满足。",
      },
      {
        q: "结果出来前预订过期了怎么办？",
        a: "这很正常。领事馆评估的是您的行程计划，并建议签证批准前不要买票。",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "one-way-ticket-denied-boarding",
    title: "单程机票被拒登机？如何避免",
    h1: "单程机票被拒登机：如何避免",
    description:
      "航空公司为什么拒绝单程旅客登机、哪些目的地会触发检查，以及如何在机场几分钟内准备好离境预订。",
    intro:
      "如果航空公司把您送到某国而您被拒绝入境，航空公司必须把您送回并可能被罚款。所以值机人员会要求单程旅客证明会离境，拿不出来就可能被拒绝登机。",
    sections: [
      {
        heading: "哪些行程会被检查",
        paragraphs: [
          "飞往菲律宾、泰国、印尼 (巴厘岛)、哥斯达黎加、哥伦比亚、秘鲁、新西兰等有离境要求国家的单程航班最常见。航空公司系统会自动标记。",
        ],
      },
      {
        heading: "在机场解决",
        paragraphs: [
          "离境机票服务可以让您在值机柜台前，用手机几分钟内拿到真实预订。把预订编号给工作人员，对方就能在系统中确认。",
          HESHI,
        ],
      },
    ],
    faqs: [
      {
        q: "航空公司真的可以拒绝我登机吗？",
        a: "可以。如果您不符合目的地的入境条件，航空公司可以拒绝承运，而离境证明就是条件之一。",
      },
    ],
  },
  {
    key: "flight-itinerary-uk-visa",
    slug: "flight-itinerary-uk-visa",
    title: "英国旅游签证需要机票预订吗？",
    h1: "办英国访客签证需要机票预订吗？",
    description:
      "英国标准访客签证不要求机票预订，但预订可以支持您的申请。费用、审理时间以及何时附上预订。",
    intro:
      "UK Visas and Immigration 不要求在申请标准访客签证前订好航班。它要看的是您会在访问结束时离开英国，并有能力支付回程或继续行程的费用。不过很多申请人仍会附上行程单来说明计划。",
    sections: [
      {
        heading: "签证基本信息",
        paragraphs: [
          "最长六个月的标准访客签证费用为 135 英镑。最早可在出行前三个月申请，在完成身份验证并提交材料后，通常三周内出结果。",
        ],
      },
      {
        heading: "出示什么",
        paragraphs: [
          "与在线申请日期一致的回程航班，或入境和离境航班，姓名与护照完全一致。预订可以做到这一点，又不用担心拒签或审理延误时损失机票钱。",
          YOUXIAO,
          HESHI,
        ],
      },
    ],
    faqs: [
      {
        q: "英国访客签证必须提供机票预订吗？",
        a: "不必须。它是可选的辅助材料。更重要的是您的计划、资金和国内约束清楚且前后一致。",
      },
    ],
    sources: [
      { label: "GOV.UK: Apply for a Standard Visitor visa (fees and decision times)", url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" },
      { label: "GOV.UK: Standard Visitor documents you need", url: "https://www.gov.uk/standard-visitor/documents-you-need" },
    ],
    checked: CHECKED,
  },
  {
    key: "flight-itinerary-us-visa",
    slug: "flight-itinerary-us-visa",
    title: "美国签证 (B1/B2) 面签需要机票预订吗？",
    h1: "办美国签证需要机票预订吗？",
    description:
      "美国 B1/B2 签证不要求机票预订，美国国务院建议拿到签证前不要买票。预订什么时候有用。",
    intro:
      "办理美国 B1/B2 访客签证不需要出示机票预订，美国国务院建议申请人在拿到签证前不要购买机票。DS-160 表格会询问您的预计行程日期，有些申请人会带着预订去面签，表明计划已经确定。",
    sections: [
      {
        heading: "预订什么时候有用",
        paragraphs: [
          "如果签证官问起您的行程，与 DS-160 日期一致的预订能说明您认真规划过。但它不能替代您与国内紧密联系的证明，后者重要得多。",
          YOUXIAO,
          HESHI,
        ],
      },
    ],
    faqs: [
      {
        q: "美国签证面签前要先买机票吗？",
        a: "不要。美国国务院建议拿到签证前不要买票。需要的话，预订就够了。",
      },
    ],
    sources: [
      { label: "US Department of State: Visitor visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
    ],
    checked: CHECKED,
  },
];

export const ZH_CN_UI: GuideUi = {
  home: "首页",
  guides: "指南",
  indexTitle: "离境机票与签证机票预订指南",
  indexDescription: "哪些国家要求离境证明、签证申请需要什么，以及如何不买机票就获得可核实的机票预订。",
  commonQuestions: "常见问题",
  moreGuides: "更多指南",
  disclaimer:
    "本指南为一般信息，不构成法律或移民建议。规定可能变化：出行前请务必向目的地官方渠道和航空公司确认。",
  ctaHeading: (price) => (price ? `需要可核实的机票预订？${price} 起` : "需要可核实的机票预订？"),
  ctaBody: "几分钟内通过邮件收到真实机票预订，预订编号可在航空公司官网查询。",
  ctaButton: "获取预订",
  destinationsTitle: "什么时候需要航班证明",
  destinationsSub: "签证机票预订，以及航空公司和边检会检查什么的指南。",
  sourcesHeading: "资料来源",
  lastChecked: (date) => `最后核实：${date}`,
};
