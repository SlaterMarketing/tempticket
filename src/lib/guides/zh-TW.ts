/**
 * Traditional Chinese guides for travellers from Taiwan and Hong Kong. Same
 * rules as the English ones. Country facts from the UK Foreign Office are for
 * British passports, as the pages say.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const QUEREN =
  "收到訂位後，打開航空公司網站的「管理訂位」(Manage booking) 頁面，用訂位代號 (PNR) 和姓氏查詢。如果查得到，櫃檯人員也查得到。除了電子郵件，也請保留截圖。";

export const SHIXIAO =
  "這類訂位只會保留一小段時間 (通常約 48 小時)，之後自動失效。請在報到或簽證送件前不久再訂，不要提前好幾週。";

const ukNote = (body: string) => ({
  heading: "英國外交部的說明 (英國護照)",
  paragraphs: [
    body,
    "以上是英國護照持有人的條件。您自己護照的規定，請以目的地國大使館、移民機關官網或外交部領事事務局的資訊為準。",
  ],
});

export const ZH_TW_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "proof-of-onward-travel",
    title: "離境機票 (Onward Ticket) 是什麼？為什麼需要、怎麼準備",
    h1: "離境機票證明：一次搞懂",
    description:
      "航空公司和入境審查為什麼要求離境或回程機票、哪些可以當作證明，以及如何不買用不到的機票，就取得可查證的機位訂位。",
    intro:
      "許多國家只讓能證明會在期限內離開的旅客入境。航空公司在報到時就會執行這項規定，因為旅客若被拒絕入境，航空公司必須自費把人載回去。如果您搭單程機票出發，可能需要出示離境或回程航班。",
    sections: [
      {
        heading: "誰會檢查",
        paragraphs: [
          "兩個地方會檢查：報到時的航空公司，以及抵達時的移民官。實際上航空公司問得多得多，因為系統會自動標記前往有離境規定國家的單程旅客。",
          "申根簽證等許多簽證申請也要求提供航班行程。多數領事館表示訂位即可，並建議在簽證核發前不要購買機票。",
        ],
      },
      {
        heading: "什麼算證明",
        paragraphs: [
          "任何離開該國的航班 (目的地不限)，並有櫃檯人員查得到的訂位代號。陸路邊境有時接受巴士或渡輪票，但航空公司通常要看機票。",
          "真正的訂位有可在航空公司官網查詢的 PNR。修改過的 PDF 或假訂位不是證明，出示它可能被拒，甚至更糟。",
        ],
      },
      {
        heading: "您的選擇",
        paragraphs: [
          "買可全額退費的機票，之後再取消。可行，但會壓住一大筆錢，退款可能要好幾週。",
          "買最便宜的離境航班，然後不搭。簡單，但錢就沒了。",
          "使用離境機票服務。付一點費用，就能以您的名字保留一個真實訂位一小段時間，之後釋出。多數長期旅行者都這麼做。",
        ],
      },
      { heading: "如何確認是真的", paragraphs: [QUEREN, SHIXIAO] },
    ],
    faqs: [
      {
        q: "離境機票訂位合法嗎？",
        a: "保留機位訂位是航空公司的正常作業，領事館在簽證申請中也經常接受訂位。不被接受的是偽造文件。請一律以官方資訊確認目的地的規定。",
      },
      {
        q: "離境航班一定要飛回台灣嗎？",
        a: "不用。只要離開您入境的國家即可。飛往鄰近國家的短程航班是常見選擇。",
      },
      {
        q: "移民官真的會檢查嗎？",
        a: "有時會，但多數旅客是在航空公司報到櫃檯被問。兩種情況都請備好訂位代號。",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "one-way-ticket-denied-boarding",
    title: "單程機票被拒絕登機？如何避免",
    h1: "單程機票被拒登機：如何避免",
    description:
      "航空公司為什麼拒絕單程旅客登機、哪些目的地會觸發檢查，以及如何在機場幾分鐘內準備好離境訂位。",
    intro:
      "如果航空公司把您載到某國後您被拒絕入境，航空公司必須把您載回並可能被罰款。所以報到人員會要求單程旅客證明會離境，拿不出來就可能被拒絕登機。",
    sections: [
      {
        heading: "哪些行程會被檢查",
        paragraphs: [
          "飛往菲律賓、泰國、印尼 (峇里島)、哥斯大黎加、哥倫比亞、秘魯、紐西蘭等有離境規定國家的單程航班最常見。航空公司系統會自動標記。",
        ],
      },
      {
        heading: "在機場解決",
        paragraphs: [
          "離境機票服務可以讓您在報到櫃檯前，用手機幾分鐘內取得真實訂位。把訂位代號給櫃檯人員，對方就能在系統中確認。",
          QUEREN,
        ],
      },
    ],
    faqs: [
      {
        q: "航空公司真的可以拒絕我登機嗎？",
        a: "可以。如果您不符合目的地的入境條件，航空公司可以拒絕載運，而離境證明就是條件之一。",
      },
    ],
  },
  {
    key: "onward-ticket-philippines",
    slug: "onward-ticket-philippines",
    title: "菲律賓離境機票：航空公司會檢查什麼",
    h1: "菲律賓入境與離境機票",
    description:
      "免簽前往菲律賓的旅客需要離境機票，航空公司和移民局都會檢查。出發前如何準備可查證的訂位。",
    intro:
      "菲律賓是離境機票檢查最嚴格的國家之一。免簽旅客必須持有在停留期限內離境的機票，航空公司和菲律賓移民局都會要求出示。",
    sections: [
      {
        heading: "會被要求什麼",
        paragraphs: [
          "搭往馬尼拉、宿霧、克拉克的航班，報到時預期會被要求出示離境或回程航班。抵達時移民官也可能查看。",
          "離境航班必須在允許停留期間內離開菲律賓。您護照的免簽天數，請向菲律賓移民局或菲律賓駐外代表處確認。",
        ],
      },
      {
        heading: "怎麼選離境航班",
        paragraphs: ["飛往香港、台北、吉隆坡或新加坡的短程航班是常見選擇。只要離開菲律賓，目的地不限。"],
      },
      { heading: "正確準備", paragraphs: [SHIXIAO, QUEREN] },
      ukNote(
        "英國外交部表示，多數英國旅客會被要求出示回程或離境證明，移民官和航空公司都可能查看。所有旅客都須在抵達前 3 天內完成免費的 eTravel 登記並出示 QR 碼，護照效期須自抵達日起至少 6 個月。",
      ),
    ],
    faqs: [
      {
        q: "沒有離境機票會被拒絕登機嗎？",
        a: "風險很高。飛往菲律賓的航空公司常拒絕無法出示離境方式的單程旅客登機。",
      },
    ],
    sources: [{ label: "UK Foreign Office: Philippines entry requirements", url: "https://www.gov.uk/foreign-travel-advice/philippines/entry-requirements" }],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "onward-ticket-bali-indonesia",
    title: "峇里島、印尼需要離境機票嗎？",
    h1: "去峇里島需要離境機票嗎？",
    description:
      "印尼落地簽 (VOA) 以回程或前往第三國的機票為條件，航空公司登機前會檢查。該出示什麼，以及如何取得可查證的訂位。",
    intro:
      "多數峇里島旅客使用的落地簽 (VOA)，前提是在允許期限內離境。印尼移民總署列出的電子落地簽 (e-VOA) 與落地簽條件，是效期 6 個月以上的護照，以及回程或前往第三國的機票。",
    sections: [
      {
        heading: "在哪裡被檢查",
        paragraphs: [
          "飛往登巴薩和雅加達的航班，報到時常會檢查離境航班。申請或使用落地簽時，印尼移民官也可能要求出示。",
          "出發前請在印尼移民總署官網確認您護照的最新簽證規定。",
        ],
      },
      {
        heading: "怎麼選離境航班",
        paragraphs: ["從峇里島飛新加坡、吉隆坡或伯斯的航班很短，是離境訂位的常見選擇。"],
      },
      { heading: "正確準備", paragraphs: [SHIXIAO, QUEREN] },
      ukNote(
        "英國外交部表示，英國旅客的 30 天落地簽費用為 50 萬印尼盾，並須出示回程或離境證明。峇里島另向外國觀光客收取 15 萬印尼盾的觀光稅。",
      ),
    ],
    faqs: [
      {
        q: "可以用單程機票去峇里島嗎？",
        a: "可以搭單程飛過去，但請準備好在報到或抵達時出示回程或離境航班。這也是落地簽的條件之一。",
      },
    ],
    sources: [
      { label: "印尼移民總署：簽證常見問題 (e-VOA 條件)", url: "https://www.imigrasi.go.id/faq/visa?lang=en-US" },
      { label: "UK Foreign Office: Indonesia entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" },
    ],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-thailand",
    slug: "onward-ticket-thailand",
    title: "去泰國需要離境機票嗎？單程出發前必看",
    h1: "去泰國需要離境機票嗎？",
    description:
      "泰國免簽入境以在允許期限內離境為條件，航空公司報到時常要求證明。該準備什麼。",
    intro:
      "免簽入境泰國的旅客必須在允許期限內離開，泰國移民局可以要求出示離境證明。實際上多數人是在出發前的航空公司櫃檯被檢查。",
    sections: [
      {
        heading: "在哪裡被檢查",
        paragraphs: [
          "飛往泰國的航空公司，尤其是廉航，常要求單程旅客出示離境航班。拿不出來可能被拒絕登機。",
          "泰國機場移民官較少詢問，但這項規定存在，也可以執行。",
        ],
      },
      {
        heading: "要出示什麼",
        paragraphs: [
          "在允許停留期間內離開泰國、有訂位代號的航班。飛往吉隆坡、新加坡、胡志明市或金邊的短程航班是常見選擇。",
          "泰國入境規定在 2026 年 9 月 15 日又有修訂。出發前請在泰國官方 e-Visa 網站或泰國駐外代表處確認您護照可停留的天數。",
        ],
      },
      { heading: "正確準備", paragraphs: [SHIXIAO, QUEREN] },
      ukNote(
        "英國外交部表示，英國旅客依免簽方案最多可停留 30 天、僅限觀光，移民官可能要求出示離境或回程證明，以及每人至少 1 萬泰銖的資金證明。所有旅客都須在抵達前 3 天內線上填寫泰國數位入境卡 (TDAC)。",
      ),
    ],
    faqs: [
      {
        q: "可以用單程機票去泰國嗎？",
        a: "可以，但請準備好在報到時出示離境航班，否則可能被拒絕登機。",
      },
    ],
    sources: [{ label: "UK Foreign Office: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" }],
    checked: CHECKED,
  },
];

export const ZH_TW_UI: GuideUi = {
  home: "首頁",
  guides: "指南",
  indexTitle: "離境機票與簽證機位訂位指南",
  indexDescription: "哪些國家要求離境證明、簽證申請需要什麼，以及如何不買機票就取得可查證的機位訂位。",
  commonQuestions: "常見問題",
  moreGuides: "更多指南",
  disclaimer:
    "本指南為一般資訊，並非法律或移民建議。規定可能變動：出發前請務必向目的地官方來源及航空公司確認。",
  ctaHeading: (price) => (price ? `需要可查證的機位訂位嗎？${price} 起` : "需要可查證的機位訂位嗎？"),
  ctaBody: "幾分鐘內以電子郵件收到真實機位訂位，訂位代號可在航空公司官網查詢。",
  ctaButton: "取得訂位",
  destinationsTitle: "什麼時候需要航班證明",
  destinationsSub: "簽證用機位訂位，以及航空公司和移民官會檢查什麼的指南。",
  sourcesHeading: "資料來源",
  lastChecked: (date) => `最後確認：${date}`,
};
