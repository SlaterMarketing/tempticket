/**
 * Vietnamese guides for visa applicants from Vietnam. Same rules as the
 * English ones: general guidance, official sources where facts are specific.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const KIEMTRA =
  "Khi nhận được đặt chỗ, hãy mở trang \"Quản lý đặt chỗ\" (Manage booking) trên website hãng bay và tra bằng mã đặt chỗ (PNR) cùng họ của bạn. Nếu thấy ở đó thì nhân viên làm thủ tục và cán bộ lãnh sự cũng thấy được. Hãy chụp màn hình và giữ cả email.";

export const THOIHAN =
  "Loại đặt chỗ này chỉ được giữ trong thời gian ngắn (thường khoảng 48 giờ) rồi tự hủy. Hãy đặt ngay trước khi làm thủ tục hoặc nộp hồ sơ visa, đừng đặt trước nhiều tuần.";

export const VI_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "ve-may-bay-roi-khoi-quoc-gia",
    title: "Vé rời khỏi quốc gia (Onward Ticket) là gì và cách có được",
    h1: "Bằng chứng rời khỏi quốc gia: giải thích đầy đủ",
    description:
      "Vì sao hãng bay và cửa khẩu yêu cầu vé khứ hồi hoặc vé đi tiếp, giấy tờ nào được chấp nhận, và cách có đặt chỗ máy bay xác minh được mà không phải mua vé sẽ không dùng.",
    intro:
      "Nhiều quốc gia chỉ cho khách vào khi họ chứng minh được sẽ rời đi đúng hạn. Hãng bay áp dụng quy định này ngay khi làm thủ tục, vì nếu bạn bị từ chối nhập cảnh, hãng phải tự chịu chi phí đưa bạn về. Nếu bay vé một chiều, bạn có thể phải xuất trình chuyến bay đi tiếp hoặc chuyến về.",
    sections: [
      {
        heading: "Ai kiểm tra",
        paragraphs: [
          "Có hai nơi kiểm tra: hãng bay lúc làm thủ tục và cán bộ xuất nhập cảnh khi bạn đến nơi. Thực tế hãng bay hỏi nhiều hơn hẳn, vì hệ thống tự đánh dấu hành khách bay một chiều tới nước có quy định này.",
          "Nhiều hồ sơ xin visa, như visa Schengen, cũng yêu cầu lịch trình bay. Phần lớn lãnh sự quán nói đặt chỗ là đủ và khuyên không mua vé trước khi có visa.",
        ],
      },
      {
        heading: "Thế nào là bằng chứng",
        paragraphs: [
          "Một chuyến bay rời khỏi quốc gia đó, đi bất kỳ đâu, có mã đặt chỗ mà nhân viên tra được. Ở cửa khẩu đường bộ đôi khi vé xe khách hoặc phà được chấp nhận, nhưng hãng bay thường muốn thấy vé máy bay.",
          "Đặt chỗ thật có mã PNR tra được trên website của chính hãng bay. File PDF chỉnh sửa hoặc đặt chỗ giả không phải bằng chứng, và dùng nó có thể khiến bạn bị từ chối hoặc tệ hơn.",
        ],
      },
      {
        heading: "Các lựa chọn",
        paragraphs: [
          "Mua vé hoàn tiền toàn phần rồi hủy sau. Cách này được, nhưng giam một khoản tiền lớn và hoàn tiền có thể mất nhiều tuần.",
          "Mua chuyến đi tiếp rẻ nhất rồi bỏ. Đơn giản nhưng mất tiền.",
          "Dùng dịch vụ vé đi tiếp. Bạn trả một khoản phí nhỏ để có đặt chỗ thật mang tên bạn, được giữ trong thời gian ngắn rồi nhả ra. Phần lớn người đi du lịch dài ngày làm cách này.",
        ],
      },
      { heading: "Cách kiểm tra là thật", paragraphs: [KIEMTRA, THOIHAN] },
    ],
    faqs: [
      {
        q: "Đặt chỗ vé đi tiếp có hợp pháp không?",
        a: "Giữ chỗ chuyến bay là nghiệp vụ bình thường của hãng bay, và lãnh sự quán thường xuyên chấp nhận đặt chỗ trong hồ sơ visa. Thứ không được chấp nhận là giấy tờ giả. Luôn kiểm tra quy định của nước bạn đến từ nguồn chính thức.",
      },
      {
        q: "Chuyến đi tiếp có phải bay về Việt Nam không?",
        a: "Không. Chỉ cần rời khỏi nước bạn nhập cảnh. Một chuyến bay ngắn sang nước láng giềng là lựa chọn phổ biến.",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "dat-cho-ve-may-bay-xin-visa",
    title: "Đặt chỗ vé máy bay xin visa: thật hay PDF giả?",
    h1: "Đặt chỗ vé máy bay cho hồ sơ xin visa",
    description:
      "Đặt chỗ vé máy bay để xin visa (dummy ticket) thực chất là gì, vì sao đại sứ quán yêu cầu, cách phân biệt đặt chỗ thật với PDF giả, và cách có đặt chỗ xác minh được.",
    intro:
      "Ngành du lịch gọi đặt chỗ máy bay nộp kèm hồ sơ visa là \"dummy ticket\". Nó thể hiện ngày và hành trình của bạn mà không phải trả tiền vé bạn có thể không dùng được. Cái tên dễ gây hiểu lầm: đặt chỗ tốt không hề giả, mà là đặt chỗ thật được giữ ngắn hạn trên hệ thống hãng bay.",
    sections: [
      {
        heading: "Vì sao đại sứ quán yêu cầu",
        paragraphs: [
          "Cán bộ lãnh sự muốn thấy chuyến đi có điểm bắt đầu và kết thúc rõ ràng, ngày khớp với phần còn lại của hồ sơ. Nhiều đại sứ quán và trung tâm visa nói thẳng là không nên mua vé trước khi có visa, nên đặt chỗ là giấy tờ được mong đợi.",
          "Các nước Schengen, Nhật Bản, Hàn Quốc và nhiều nước khác thường yêu cầu lịch trình hoặc đặt chỗ máy bay. Anh và Mỹ không bắt buộc nhưng chấp nhận như bằng chứng bổ sung.",
        ],
      },
      {
        heading: "Đặt chỗ thật hay PDF giả?",
        paragraphs: [
          "Đặt chỗ thật có mã PNR tra được trên trang quản lý đặt chỗ của hãng bay. Bản giả chỉ là tài liệu chỉnh sửa cho giống đặt chỗ, phía sau không có gì.",
          "Đại sứ quán và hãng bay có thể kiểm tra và thực sự kiểm tra. Nộp giấy tờ giả có thể khiến hồ sơ bị từ chối và ảnh hưởng các lần xin sau. Chỉ dùng đặt chỗ bạn tự xác minh được.",
        ],
      },
      {
        heading: "Thông tin phải khớp",
        paragraphs: [
          "Tên phải khớp hoàn toàn với hộ chiếu (không dấu, đúng thứ tự như trong hộ chiếu). Ngày phải khớp với đơn xin visa và đặt phòng khách sạn.",
          "Phần lớn hồ sơ visa cần vé khứ hồi. Nếu đi nhiều nước, đặt chỗ nên bắt đầu từ nước lưu trú chính hoặc nước nhập cảnh đầu tiên, theo danh mục hồ sơ của lãnh sự quán.",
        ],
      },
      { heading: "Thời điểm", paragraphs: [THOIHAN, KIEMTRA] },
    ],
    faqs: [
      {
        q: "Đặt chỗ vé máy bay xin visa có hợp pháp không?",
        a: "Đặt chỗ thật là hợp pháp và là thứ nhiều lãnh sự quán yêu cầu. Đặt chỗ giả hoặc chỉnh sửa là bất hợp pháp và có thể khiến bạn bị từ chối visa.",
      },
      {
        q: "Đặt chỗ hết hạn trước khi có kết quả thì sao?",
        a: "Không sao. Lãnh sự quán biết đặt chỗ sẽ hết hạn và khuyên không mua vé tới khi visa được duyệt. Có kết quả rồi hãy mua vé thật.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "dat-cho-ve-may-bay-visa-schengen",
    title: "Đặt chỗ vé máy bay xin visa Schengen (không cần mua vé)",
    h1: "Lịch trình bay cho hồ sơ visa Schengen",
    description:
      "Phần lớn lãnh sự quán Schengen yêu cầu đặt chỗ máy bay, không phải vé đã thanh toán. Cách có lịch trình khứ hồi xác minh được cho buổi hẹn nộp hồ sơ.",
    intro:
      "Hồ sơ visa Schengen thường yêu cầu lịch trình bay cho thấy bạn đến và rời đi thế nào. Nhiều lãnh sự quán nói rõ không nên mua vé trước khi có visa, và đặt chỗ là đủ.",
    sections: [
      {
        heading: "Lãnh sự quán cần gì",
        paragraphs: [
          "Chuyến khứ hồi, hoặc chuyến vào và ra, khớp với ngày trong đơn. Tên trên đặt chỗ phải giống hệt hộ chiếu.",
          "Yêu cầu khác nhau tùy nước và trung tâm visa, hãy đọc danh mục hồ sơ của lãnh sự quán bạn nộp. Một số nơi yêu cầu nhiều hơn đặt chỗ.",
        ],
      },
      { heading: "Canh thời gian theo lịch hẹn", paragraphs: ["Đặt chỗ một hai ngày trước buổi hẹn để còn hiệu lực khi hồ sơ được xem xét.", KIEMTRA] },
    ],
    faqs: [
      {
        q: "Cần vé khứ hồi hay một chiều?",
        a: "Phần lớn hồ sơ Schengen cần khứ hồi, hoặc ít nhất một chuyến chắc chắn rời khỏi khu vực Schengen. Đặt chỗ khứ hồi đáp ứng cả hai.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "ve-mot-chieu-bi-tu-choi-len-may-bay",
    title: "Bị từ chối lên máy bay vì vé một chiều? Cách tránh",
    h1: "Bị từ chối lên máy bay vì vé một chiều: cách tránh",
    description:
      "Vì sao hãng bay từ chối hành khách vé một chiều, những nước nào hay bị kiểm tra, và cách có đặt chỗ đi tiếp trong vài phút ngay tại sân bay.",
    intro:
      "Nếu hãng bay chở bạn tới một nước và bạn bị từ chối nhập cảnh, hãng phải đưa bạn về và có thể bị phạt. Vì vậy nhân viên làm thủ tục yêu cầu khách vé một chiều chứng minh sẽ rời đi. Không chứng minh được, bạn có thể không được lên máy bay.",
    sections: [
      {
        heading: "Hành trình nào hay bị kiểm tra",
        paragraphs: [
          "Chuyến một chiều tới các nước có quy định vé đi tiếp như Philippines, Thái Lan, Indonesia, Costa Rica, Colombia, Peru và New Zealand là phổ biến nhất. Hệ thống hãng bay tự đánh dấu bạn.",
        ],
      },
      {
        heading: "Giải quyết tại sân bay",
        paragraphs: [
          "Dịch vụ vé đi tiếp có thể cấp đặt chỗ thật trong vài phút ngay trên điện thoại khi bạn đứng ở quầy. Đưa mã đặt chỗ cho nhân viên để họ xác nhận trên hệ thống.",
          KIEMTRA,
        ],
      },
    ],
    faqs: [
      {
        q: "Hãng bay có thật sự từ chối chở tôi không?",
        a: "Có. Nếu bạn không đáp ứng điều kiện nhập cảnh của nước đến, hãng bay có thể từ chối chở, và bằng chứng rời đi là một trong các điều kiện đó.",
      },
    ],
  },
  {
    key: "flight-itinerary-uk-visa",
    slug: "dat-cho-ve-may-bay-visa-anh",
    title: "Xin visa du lịch Anh có cần đặt chỗ vé máy bay không?",
    h1: "Visa thăm thân, du lịch Anh có cần đặt chỗ máy bay?",
    description:
      "Visa Standard Visitor của Anh không bắt buộc đặt chỗ máy bay, nhưng đặt chỗ có thể hỗ trợ hồ sơ. Lệ phí, thời gian xét và khi nào nên nộp kèm.",
    intro:
      "UK Visas and Immigration không yêu cầu bạn đặt vé trước khi xin visa Standard Visitor. Điều họ cần thấy là bạn sẽ rời Anh khi kết thúc chuyến đi và đủ khả năng chi trả chuyến về hoặc đi tiếp. Dù vậy, nhiều người vẫn nộp kèm lịch trình bay để thể hiện kế hoạch.",
    sections: [
      {
        heading: "Thông tin cơ bản",
        paragraphs: [
          "Lệ phí visa Standard Visitor tối đa sáu tháng là 135 bảng Anh. Bạn có thể nộp sớm nhất ba tháng trước chuyến đi, và thường có kết quả trong ba tuần sau khi xác minh danh tính và nộp giấy tờ.",
        ],
      },
      {
        heading: "Nên xuất trình gì",
        paragraphs: [
          "Chuyến về, hoặc chuyến đến và đi, khớp ngày trong đơn online, tên giống hệt hộ chiếu. Đặt chỗ làm được điều này mà không có rủi ro mất tiền vé nếu visa bị từ chối hay chậm.",
          THOIHAN,
          KIEMTRA,
        ],
      },
    ],
    faqs: [
      {
        q: "Visa Anh có bắt buộc đặt chỗ máy bay không?",
        a: "Không. Đó là bằng chứng bổ sung tùy chọn. Quan trọng hơn là kế hoạch, tài chính và ràng buộc của bạn ở Việt Nam rõ ràng và nhất quán.",
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
    slug: "dat-cho-ve-may-bay-visa-my",
    title: "Phỏng vấn visa Mỹ (B1/B2) có cần đặt chỗ vé máy bay?",
    h1: "Xin visa Mỹ có cần đặt chỗ vé máy bay không?",
    description:
      "Mỹ không yêu cầu đặt chỗ máy bay cho visa B1/B2 và khuyên không mua vé trước khi có visa. Khi nào đặt chỗ hữu ích.",
    intro:
      "Với visa du lịch Mỹ B1/B2, bạn không cần xuất trình đặt chỗ máy bay, và Bộ Ngoại giao Mỹ khuyên người nộp đơn không mua vé cho tới khi có visa. Đơn DS-160 hỏi ngày dự kiến đi, và một số người mang đặt chỗ tới buổi phỏng vấn để cho thấy kế hoạch cụ thể.",
    sections: [
      {
        heading: "Khi nào đặt chỗ hữu ích",
        paragraphs: [
          "Nếu viên chức lãnh sự hỏi về kế hoạch, một đặt chỗ khớp ngày trong DS-160 cho thấy bạn đã tính toán kỹ. Nhưng nó không thay được bằng chứng ràng buộc của bạn ở Việt Nam, điều quan trọng hơn nhiều.",
          THOIHAN,
          KIEMTRA,
        ],
      },
    ],
    faqs: [
      {
        q: "Có nên mua vé trước buổi phỏng vấn visa Mỹ?",
        a: "Không. Bộ Ngoại giao Mỹ khuyên không mua vé tới khi có visa. Nếu cần, đặt chỗ là đủ.",
      },
    ],
    sources: [
      { label: "US Department of State: Visitor visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
    ],
    checked: CHECKED,
  },
];

export const VI_UI: GuideUi = {
  home: "Trang chủ",
  guides: "Hướng dẫn",
  indexTitle: "Hướng dẫn vé đi tiếp và đặt chỗ máy bay xin visa",
  indexDescription:
    "Nước nào yêu cầu bằng chứng rời đi, hồ sơ visa cần gì, và cách có đặt chỗ máy bay xác minh được mà không phải mua vé.",
  commonQuestions: "Câu hỏi thường gặp",
  moreGuides: "Hướng dẫn khác",
  disclaimer:
    "Các hướng dẫn này là thông tin chung, không phải tư vấn pháp lý hay di trú. Quy định có thể thay đổi: luôn xác nhận với nguồn chính thức của nước đến và hãng bay trước khi đi.",
  ctaHeading: (price) =>
    price ? `Cần đặt chỗ máy bay xác minh được? Chỉ từ ${price}` : "Cần đặt chỗ máy bay xác minh được?",
  ctaBody: "Nhận đặt chỗ máy bay thật qua email trong vài phút, với mã đặt chỗ tra được trên website hãng bay.",
  ctaButton: "Nhận đặt chỗ",
  destinationsTitle: "Khi nào cần bằng chứng chuyến bay",
  destinationsSub: "Hướng dẫn đặt chỗ máy bay xin visa và những gì hãng bay, xuất nhập cảnh kiểm tra.",
  sourcesHeading: "Nguồn",
  lastChecked: (date) => `Kiểm tra lần cuối: ${date}`,
};
