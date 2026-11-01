/**
 * Extra pages for Filipino, Arabic, Turkish and Vietnamese: the fake flight
 * confirmation page, onward tickets for Thailand and Bali, and the Japan visa
 * itinerary. Facts and sources match the English versions. Facts from the UK
 * Foreign Office are for British passports, as the pages say.
 */

import { TAHAQQUQ, TAWQEET } from "./ar";
import { ORAS, SURIIN } from "./fil";
import { KONTROL, ZAMANLAMA } from "./tr";
import { KIEMTRA, THOIHAN } from "./vi";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

const FAKE_SOURCES: GuideSource[] = [
  { label: "GOV.UK: Suitability guidance on deception, false representations and false documents", url: "https://www.gov.uk/government/publications/suitability-false-representations-immigration-staff-guidance/part-suitability-deception-false-representations-false-documents-and-non-disclosure-of-relevant-facts-accessible" },
  { label: "US Foreign Affairs Manual 9 FAM 302.9: misrepresentation, INA 212(a)(6)(C)(i)", url: "https://fam.state.gov/fam/09FAM/09FAM030209.html" },
  { label: "EU Visa Code (Regulation 810/2009), Article 32", url: "https://eur-lex.europa.eu/eli/reg/2009/810/oj" },
];
const TH_SRC: GuideSource = { label: "UK Foreign Office: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" };
const ID_SRC: GuideSource[] = [
  { label: "Directorate General of Immigration, Indonesia: visa FAQ (e-VOA requirements)", url: "https://www.imigrasi.go.id/faq/visa?lang=en-US" },
  { label: "UK Foreign Office: Indonesia entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" },
];

/* ---------------------------------- Filipino ---------------------------------- */

export const FIL_MORE_GUIDES: Guide[] = [
  {
    key: "flight-itinerary-japan-visa",
    slug: "flight-itinerary-japan-visa",
    title: "Flight Reservation para sa Japan Tourist Visa",
    h1: "Flight reservation para sa Japan visa",
    description:
      "Karaniwang humihingi ang Japan visa application ng flight reservation o itinerary kasama ang schedule of stay. Ano ang isasama at paano kumuha ng verifiable na reservation.",
    intro:
      "Kailangan ng mga Pilipino ng visa para makapunta sa Japan, at karaniwang humihingi ang embassy at mga accredited agency ng patunay ng travel plans, kadalasan flight reservation kasama ang schedule of stay. Karaniwang hindi mo kailangang bumili muna ng ticket.",
    sections: [
      {
        heading: "Ano ang isasama",
        paragraphs: [
          "Round-trip reservation papasok at palabas ng Japan, sa pangalan mo gaya ng nasa passport, na tugma sa mga petsa sa application form at schedule of stay.",
          "Iba-iba ang requirements depende sa embassy at sa nationality, kaya sundin ang checklist ng Embassy of Japan o ng accredited agency na hahawak ng application mo.",
        ],
      },
      { heading: "Paano gawin nang tama", paragraphs: ["Karaniwang ilang working days ang processing. I-book ang reservation bago mo isumite para aktibo ito kapag chine-check ang mga dokumento.", SURIIN] },
    ],
    faqs: [
      { q: "Kailangan bang bumili ng ticket para sa Japan visa?", a: "Kadalasan hindi. Karamihan ng checklist ay tumatanggap ng reservation o itinerary, pero i-check ang sa embassy o agency mo." },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "onward-ticket-thailand",
    title: "Kailangan ba ng Onward Ticket papuntang Thailand?",
    h1: "Kailangan ba ng onward ticket para sa Thailand?",
    description:
      "Ang visa-free na pagpasok sa Thailand ay nangangahulugang aalis ka sa loob ng pinapayagang stay, at madalas humingi ng patunay ang airline sa check-in. Ano ang ihahanda.",
    intro:
      "Ang mga pumapasok sa Thailand nang walang visa ay inaasahang aalis sa loob ng pinapayagang stay, at puwedeng humingi ang Thai immigration ng patunay ng onward travel. Sa totoo lang, kadalasan sa airline counter bago umalis ka matatanong.",
    sections: [
      {
        heading: "Saan chine-check",
        paragraphs: [
          "Madalas humingi ang mga airline papuntang Thailand, lalo na ang budget carriers, ng onward flight sa mga one-way na pasahero. Kapag wala, puwede kang hindi pasakayin.",
          "Bago umalis, i-check din ang patakaran ng Bureau of Immigration sa pag-alis ng Pilipinas. Bukod pa iyon sa hinihingi ng airline at ng Thailand.",
        ],
      },
      {
        heading: "Ano ang ipapakita",
        paragraphs: [
          "Flight palabas ng Thailand sa loob ng stay mo, may booking reference. Sikat ang maiikling flight papuntang Kuala Lumpur, Singapore, Ho Chi Minh o pabalik ng Manila.",
          "Nagbago ulit ang entry rules ng Thailand noong 15 Setyembre 2026. I-check ang haba ng stay para sa passport mo sa opisyal na Thai e-Visa website o sa Royal Thai Embassy sa Manila bago bumiyahe.",
          ORAS,
          SURIIN,
        ],
      },
      {
        heading: "Sinasabi ng UK Foreign Office (British passport)",
        paragraphs: [
          "Para sa mga British, hanggang 30 araw ang visa-free stay, para sa turismo lang, at puwedeng humingi ang immigration ng patunay ng onward travel at pondong hindi bababa sa 10,000 baht bawat tao. Lahat ng dumarating ay dapat mag-fill out ng Thailand Digital Arrival Card (TDAC) online sa loob ng tatlong araw bago dumating. Para sa British passport ito; i-check ang patakaran para sa Philippine passport sa opisyal na source.",
        ],
      },
    ],
    faqs: [
      { q: "Puwede bang pumunta sa Thailand nang one-way?", a: "Puwede, pero maghanda ng onward flight na maipapakita sa check-in. Kung wala, puwede kang hindi pasakayin." },
    ],
    sources: [TH_SRC],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "onward-ticket-bali-indonesia",
    title: "Kailangan ba ng Onward Ticket papuntang Bali at Indonesia?",
    h1: "Kailangan ba ng onward ticket para sa Bali?",
    description:
      "Inaasahan ng Indonesia na aalis ang mga bisita sa loob ng pinapayagang stay, at chine-check ng airline ang onward o return ticket bago sumakay. Ano ang ipapakita.",
    intro:
      "Inaasahang aalis ang mga bisita sa Indonesia, kasama ang Bali, sa loob ng pinapayagang stay. Para sa visa on arrival at e-VOA, nakalista ng Directorate General of Immigration ng Indonesia ang passport na may bisa nang hindi bababa sa anim na buwan at return o onward ticket bilang requirements.",
    sections: [
      {
        heading: "Saan chine-check",
        paragraphs: [
          "Madalas i-check ng mga flight papuntang Denpasar at Jakarta ang onward flight sa counter. Puwede rin itong hingin ng Indonesian immigration pagdating. I-check ang pinakabagong patakaran para sa passport mo sa opisyal na website ng Indonesian immigration bago bumiyahe.",
        ],
      },
      {
        heading: "Pagpili ng onward flight",
        paragraphs: ["Maiikli ang flight mula Bali papuntang Singapore, Kuala Lumpur o Manila at karaniwang pinipili para sa onward reservation.", ORAS, SURIIN],
      },
    ],
    faqs: [
      { q: "Puwede bang pumunta sa Bali nang one-way?", a: "Puwede kang lumipad nang one-way, pero maghanda ng return o onward flight na maipapakita sa check-in o pagdating." },
    ],
    sources: ID_SRC,
    checked: CHECKED,
  },
];

/* ---------------------------------- Arabic ---------------------------------- */

export const AR_MORE_GUIDES: Guide[] = [
  {
    key: "fake-flight-confirmation-email",
    slug: "fake-flight-confirmation-email",
    title: "تأكيد حجز طيران مزيف: لماذا لا، وما البديل القانوني",
    h1: "تفكر في تأكيد حجز طيران مزيف؟ اقرأ هذا أولًا",
    description:
      "لماذا قد يؤدي تأكيد طيران معدّل أو مزيف إلى رفض التأشيرة وحظر لمدة 10 سنوات في بريطانيا أو قرار بالتضليل في الولايات المتحدة، وكيف تحصل على حجز حقيقي بدلًا منه.",
    intro:
      "إذا احتجت إلى إظهار رحلة لطلب تأشيرة أو عند تسجيل الوصول، فقد يغريك تعديل حجز قديم أو استخدام مولّد لرسائل التأكيد. لا تفعل. اكتشافه سهل، والعواقب أكبر بكثير من رحلة واحدة ضائعة. هناك طريقة رخيصة وقانونية للحصول على رقم حجز حقيقي.",
    sections: [
      {
        heading: "كيف يُكتشف المزيف",
        paragraphs: [
          "للحجز الحقيقي رقم (PNR) موجود في نظام حجوزات شركة الطيران. يكتبه موظف تسجيل الوصول فيظهر حجزك أو لا يظهر. والسفارة تستطيع فعل الشيء نفسه. أما ملف PDF المعدّل أو الرسالة المولّدة فرقمها لا يقود إلى شيء.",
        ],
      },
      {
        heading: "ماذا يحدث إذا استخدمته",
        paragraphs: [
          "المملكة المتحدة: تنص إرشادات وزارة الداخلية على وجوب رفض الطلب إذا كان من المرجح أن المتقدم استخدم الخداع، بما في ذلك المستندات المزورة، وعلى رفض الطلبات اللاحقة لمدة 10 سنوات.",
          "الولايات المتحدة: بموجب المادة 212(a)(6)(C)(i) من قانون الهجرة والجنسية، يُعد غير مؤهل كل من يسعى للحصول على تأشيرة بالاحتيال أو بتحريف متعمد لواقعة جوهرية. ويبقى هذا القرار معك ولا يُتجاوز إلا بإعفاء.",
          "شنغن: ينص قانون التأشيرات الأوروبي على وجوب رفض التأشيرة إذا وُجدت شكوك معقولة في صحة المستندات الداعمة أو في صدق محتواها.",
        ],
      },
      {
        heading: "البديل القانوني",
        paragraphs: [
          "حجز طيران محفوظ باسمك لفترة قصيرة يعطيك بالضبط ما كنت تريده من المزيف: تأكيدًا برقم حجز حقيقي، بجزء صغير من سعر التذكرة. ولأنه حقيقي، تستطيع شركة الطيران والسفارة العثور عليه.",
          TAWQEET,
          TAHAQQUQ,
        ],
      },
    ],
    faqs: [
      { q: "هل حجز الطيران للتأشيرة قانوني؟", a: "نعم. إنه حجز حقيقي باسمك. وكثير من السفارات، ومنها سفارات شنغن، تنصح بعدم شراء التذكرة قبل قرار التأشيرة، والحجز هو الطريقة المعتادة لإظهار خطتك." },
    ],
    sources: FAKE_SOURCES,
    checked: CHECKED,
  },
  {
    key: "onward-ticket-thailand",
    slug: "onward-ticket-thailand",
    title: "هل تحتاج تذكرة مغادرة للسفر إلى تايلاند؟",
    h1: "هل تحتاج تذكرة مغادرة لدخول تايلاند؟",
    description:
      "الدخول إلى تايلاند دون تأشيرة مشروط بالمغادرة خلال المدة المسموحة، وشركات الطيران تطلب الإثبات غالبًا عند تسجيل الوصول. ما الذي تجهّزه.",
    intro:
      "يُتوقع من الزوار الداخلين إلى تايلاند دون تأشيرة أن يغادروا خلال المدة المسموحة، ويمكن لهيئة الهجرة التايلاندية أن تطلب إثبات المغادرة. وفي الواقع يحدث الفحص غالبًا عند مكتب شركة الطيران قبل السفر.",
    sections: [
      {
        heading: "أين يتم الفحص",
        paragraphs: [
          "شركات الطيران المتجهة إلى تايلاند، خاصة منخفضة التكلفة، تطلب كثيرًا من المسافرين بتذكرة ذهاب فقط إظهار رحلة مغادرة، وقد ترفض صعودهم دونها. موظفو الجوازات في مطارات تايلاند يسألون أقل، لكن القاعدة موجودة ويمكن تطبيقها.",
        ],
      },
      {
        heading: "ما الذي تُظهره",
        paragraphs: [
          "رحلة تغادر تايلاند خلال مدة إقامتك برقم حجز. الخيارات الشائعة رحلات قصيرة إلى كوالالمبور أو سنغافورة أو هو تشي منه.",
          "تغيّرت قواعد دخول تايلاند مجددًا في 15 سبتمبر 2026. تحقق من مدة الإقامة لجواز سفرك على موقع التأشيرات الإلكترونية التايلاندي الرسمي أو لدى السفارة التايلاندية قبل السفر.",
          TAWQEET,
          TAHAQQUQ,
        ],
      },
      {
        heading: "ما تقوله الخارجية البريطانية (للجوازات البريطانية)",
        paragraphs: [
          "للمسافرين البريطانيين، الإعفاء من التأشيرة يسمح بالإقامة حتى 30 يومًا للسياحة فقط، وقد تطلب الهجرة إثبات المغادرة وأموالًا لا تقل عن 10,000 بات للشخص. وعلى جميع القادمين تعبئة بطاقة الوصول الرقمية التايلاندية (TDAC) عبر الإنترنت خلال الأيام الثلاثة السابقة للوصول. هذه شروط الجواز البريطاني؛ تحقق من شروط جوازك من مصدر رسمي.",
        ],
      },
    ],
    faqs: [
      { q: "هل يمكنني السفر إلى تايلاند بتذكرة ذهاب فقط؟", a: "نعم، لكن جهّز رحلة مغادرة لإظهارها عند تسجيل الوصول، وإلا قد يُرفض صعودك." },
    ],
    sources: [TH_SRC],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "onward-ticket-bali-indonesia",
    title: "هل تحتاج تذكرة مغادرة للسفر إلى بالي وإندونيسيا؟",
    h1: "هل تحتاج تذكرة مغادرة للسفر إلى بالي؟",
    description:
      "تأشيرة الوصول إلى إندونيسيا مشروطة بتذكرة عودة أو مغادرة، وشركات الطيران تتحقق منها قبل الصعود. ما الذي تُظهره وكيف تحصل على حجز يمكن التحقق منه.",
    intro:
      "يُتوقع من زوار إندونيسيا، ومنها بالي، المغادرة خلال المدة المسموحة. وتذكر المديرية العامة للهجرة الإندونيسية أن تأشيرة الوصول والتأشيرة الإلكترونية عند الوصول (e-VOA) تتطلبان جواز سفر صالحًا ستة أشهر على الأقل وتذكرة عودة أو تذكرة إلى بلد آخر.",
    sections: [
      {
        heading: "أين يتم الفحص",
        paragraphs: [
          "على الرحلات إلى دنپاسار وجاكرتا تُفحص رحلة المغادرة غالبًا عند المكتب، وقد تطلبها الهجرة الإندونيسية عند الوصول. تحقق من القواعد الحالية لجوازك على موقع الهجرة الإندونيسية الرسمي قبل السفر.",
        ],
      },
      {
        heading: "اختيار رحلة المغادرة",
        paragraphs: ["الرحلات من بالي إلى سنغافورة أو كوالالمبور أو بيرث قصيرة وشائعة لحجز المغادرة.", TAWQEET, TAHAQQUQ],
      },
    ],
    faqs: [
      { q: "هل يمكنني السفر إلى بالي بتذكرة ذهاب فقط؟", a: "يمكنك الطيران بها، لكن استعد لإظهار رحلة عودة أو مغادرة عند تسجيل الوصول أو عند الوصول. وهي من شروط تأشيرة الوصول." },
    ],
    sources: ID_SRC,
    checked: CHECKED,
  },
];

/* ---------------------------------- Turkish ---------------------------------- */

export const TR_MORE_GUIDES: Guide[] = [
  {
    key: "fake-flight-confirmation-email",
    slug: "sahte-ucus-onay-e-postasi",
    title: "Sahte Uçuş Onay E-postası: Neden Olmaz ve Yasal Alternatif",
    h1: "Sahte uçuş onayı mı düşünüyorsunuz? Önce bunu okuyun",
    description:
      "Düzenlenmiş veya sahte bir uçuş onayı neden vize reddine, İngiltere'de 10 yıllık yasağa ya da ABD'de yanlış beyan kararına yol açabilir ve bunun yerine gerçek rezervasyon nasıl alınır.",
    intro:
      "Vize başvurusu ya da check-in için uçuş göstermeniz gerekiyorsa, eski bir rezervasyonu düzenlemek veya onay e-postası üreten bir site kullanmak cazip gelebilir. Yapmayın. Kolayca anlaşılır ve sonuçları kaçan bir seyahatten çok daha ağırdır. Gerçek bir rezervasyon kodu almanın ucuz ve yasal bir yolu var.",
    sections: [
      {
        heading: "Sahtesi nasıl anlaşılır",
        paragraphs: [
          "Gerçek bir rezervasyonun havayolunun sisteminde kayıtlı bir kodu (PNR) vardır. Check-in görevlisi kodu yazar, rezervasyonunuz ya çıkar ya çıkmaz. Konsolosluk da aynısını yapabilir. Düzenlenmiş PDF'in ya da üretilmiş e-postanın kodu hiçbir yere çıkmaz.",
        ],
      },
      {
        heading: "Kullanırsanız ne olur",
        paragraphs: [
          "İngiltere: İçişleri Bakanlığı rehberine göre başvuru sahibinin sahte belge dahil aldatmaya başvurmuş olması kuvvetle muhtemelse başvuru reddedilmek zorundadır ve sonraki başvurular 10 yıl boyunca reddedilir.",
          "ABD: Göç ve Vatandaşlık Yasası'nın 212(a)(6)(C)(i) maddesine göre dolandırıcılıkla ya da önemli bir olguyu kasıtlı olarak yanlış beyan ederek vize almaya çalışan kişi vize alamaz. Bu karar kalıcıdır ve ancak muafiyetle aşılabilir.",
          "Schengen: AB Vize Kodu, destekleyici belgelerin gerçekliği ya da içeriğinin doğruluğu konusunda makul şüphe varsa vizenin reddedilmesi gerektiğini söyler.",
        ],
      },
      {
        heading: "Yasal alternatif",
        paragraphs: [
          "Adınıza kısa süreliğine tutulan bir uçuş rezervasyonu, sahtesinden beklediğiniz şeyi verir: gerçek bir rezervasyon kodu olan onay, bilet fiyatının küçük bir kısmına. Gerçek olduğu için havayolu ve konsolosluk onu bulabilir.",
          ZAMANLAMA,
          KONTROL,
        ],
      },
    ],
    faqs: [
      { q: "Vize için uçuş rezervasyonu yasal mı?", a: "Evet. Adınıza yapılmış gerçek bir rezervasyondur. Schengen dahil birçok konsolosluk vize kararından önce bilet alınmamasını tavsiye eder ve planınızı göstermenin olağan yolu rezervasyondur." },
    ],
    sources: FAKE_SOURCES,
    checked: CHECKED,
  },
  {
    key: "onward-ticket-thailand",
    slug: "tayland-donus-bileti",
    title: "Tayland'a Gitmek İçin Dönüş veya Devam Bileti Gerekir mi?",
    h1: "Tayland için devam bileti gerekir mi?",
    description:
      "Tayland'a vizesiz giriş, izin verilen süre içinde çıkmayı gerektirir ve havayolları check-in'de sık sık kanıt ister. Neler hazırlanmalı.",
    intro:
      "Tayland'a vizesiz girenlerin izin verilen süre içinde çıkması beklenir ve Tayland göç idaresi çıkış kanıtı isteyebilir. Pratikte kontrol çoğunlukla kalkıştan önce havayolu bankosunda yapılır.",
    sections: [
      {
        heading: "Nerede kontrol edilir",
        paragraphs: [
          "Tayland'a uçan havayolları, özellikle düşük maliyetliler, tek yön biletli yolculardan sık sık çıkış uçuşu ister; yoksa uçağa almayabilirler. Tayland havalimanlarındaki pasaport memurları daha seyrek sorar, ama kural vardır ve uygulayabilirler.",
        ],
      },
      {
        heading: "Ne gösterilmeli",
        paragraphs: [
          "Kalış süreniz içinde Tayland'dan çıkan, rezervasyon kodlu bir uçuş. Kuala Lumpur, Singapur, Ho Chi Minh veya İstanbul'a dönüş yaygın seçeneklerdir.",
          "Tayland'ın giriş kuralları 15 Eylül 2026'da yeniden değişti. Pasaportunuz için kalış süresini yola çıkmadan önce Tayland'ın resmi e-Vize sitesinden veya Tayland Büyükelçiliği'nden kontrol edin.",
          ZAMANLAMA,
          KONTROL,
        ],
      },
      {
        heading: "İngiltere Dışişleri ne diyor (İngiliz pasaportu)",
        paragraphs: [
          "İngiliz ziyaretçiler vize muafiyetiyle yalnızca turizm için 30 güne kadar kalabilir; göç idaresi çıkış kanıtı ve kişi başı en az 10.000 baht para isteyebilir. Tüm yolcular varıştan önceki üç gün içinde Thailand Digital Arrival Card'ı (TDAC) çevrimiçi doldurmalıdır. Bunlar İngiliz pasaportu için geçerli; kendi pasaportunuzun kurallarını resmi kaynaktan kontrol edin.",
        ],
      },
    ],
    faqs: [
      { q: "Tayland'a tek yön biletle gidebilir miyim?", a: "Evet, ama check-in'de gösterebileceğiniz bir çıkış uçuşu hazırlayın; yoksa uçağa alınmayabilirsiniz." },
    ],
    sources: [TH_SRC],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "bali-endonezya-donus-bileti",
    title: "Bali ve Endonezya İçin Dönüş Bileti Gerekir mi?",
    h1: "Bali için dönüş veya devam bileti gerekir mi?",
    description:
      "Endonezya'nın varışta vizesi dönüş ya da devam bileti şartına bağlıdır ve havayolları bunu uçağa binmeden kontrol eder. Ne gösterilmeli, doğrulanabilir rezervasyon nasıl alınır.",
    intro:
      "Bali dahil Endonezya'ya gelenlerin izin verilen süre içinde çıkması beklenir. Endonezya Göç Genel Müdürlüğü, varışta vize ve elektronik varışta vize (e-VOA) için en az altı ay geçerli pasaport ile dönüş ya da başka bir ülkeye devam biletini şart olarak sayar.",
    sections: [
      {
        heading: "Nerede kontrol edilir",
        paragraphs: [
          "Denpasar ve Cakarta uçuşlarında çıkış uçuşu bankoda sık sık kontrol edilir; Endonezya göç idaresi de varışta isteyebilir. Pasaportunuz için güncel kuralları yola çıkmadan önce Endonezya göç idaresinin resmi sitesinden kontrol edin.",
        ],
      },
      {
        heading: "Devam uçuşu seçmek",
        paragraphs: ["Bali'den Singapur, Kuala Lumpur veya Perth'e uçuşlar kısadır ve devam rezervasyonu için sık seçilir.", ZAMANLAMA, KONTROL],
      },
    ],
    faqs: [
      { q: "Bali'ye tek yön biletle gidebilir miyim?", a: "Uçabilirsiniz, ama check-in'de veya varışta dönüş ya da devam uçuşu göstermeye hazır olun. Varışta vizenin şartlarından biridir." },
    ],
    sources: ID_SRC,
    checked: CHECKED,
  },
];

/* --------------------------------- Vietnamese --------------------------------- */

export const VI_MORE_GUIDES: Guide[] = [
  {
    key: "fake-flight-confirmation-email",
    slug: "email-xac-nhan-ve-may-bay-gia",
    title: "Email xác nhận vé máy bay giả: vì sao không nên và cách hợp pháp",
    h1: "Định dùng xác nhận vé máy bay giả? Hãy đọc điều này trước",
    description:
      "Vì sao xác nhận chuyến bay chỉnh sửa hoặc giả có thể khiến bị từ chối visa, bị cấm 10 năm ở Anh hoặc bị kết luận khai man ở Mỹ, và cách có đặt chỗ thật thay thế.",
    intro:
      "Khi cần xuất trình chuyến bay cho hồ sơ visa hay lúc làm thủ tục, nhiều người muốn sửa một đặt chỗ cũ hoặc dùng công cụ tạo email xác nhận. Đừng làm vậy. Rất dễ bị phát hiện, và hậu quả nặng hơn nhiều so với một chuyến đi bị hủy. Có cách rẻ và hợp pháp để có mã đặt chỗ thật.",
    sections: [
      {
        heading: "Đồ giả bị phát hiện thế nào",
        paragraphs: [
          "Đặt chỗ thật có mã (PNR) nằm trong hệ thống đặt chỗ của hãng bay. Nhân viên làm thủ tục gõ mã vào, đặt chỗ của bạn hiện ra hoặc không. Lãnh sự quán cũng làm được như vậy. File PDF sửa hoặc email tự tạo có mã chẳng dẫn tới đâu.",
        ],
      },
      {
        heading: "Hậu quả nếu dùng",
        paragraphs: [
          "Anh: hướng dẫn của Bộ Nội vụ nói hồ sơ phải bị từ chối nếu nhiều khả năng người nộp đã gian dối, kể cả dùng giấy tờ giả, và các hồ sơ sau phải bị từ chối trong 10 năm.",
          "Mỹ: theo điều 212(a)(6)(C)(i) Luật Di trú và Quốc tịch, ai tìm cách xin visa bằng gian lận hoặc cố ý khai sai một sự việc quan trọng sẽ không đủ điều kiện. Kết luận này đi theo bạn và chỉ có thể vượt qua bằng miễn trừ.",
          "Schengen: Bộ luật Visa EU quy định visa phải bị từ chối nếu có nghi ngờ hợp lý về tính xác thực của giấy tờ hoặc độ chính xác của nội dung.",
        ],
      },
      {
        heading: "Cách hợp pháp",
        paragraphs: [
          "Đặt chỗ máy bay được giữ trong thời gian ngắn mang tên bạn cho đúng thứ bạn cần từ bản giả: xác nhận với mã đặt chỗ thật, với giá chỉ bằng một phần nhỏ giá vé. Vì là thật nên hãng bay và lãnh sự quán tra được.",
          THOIHAN,
          KIEMTRA,
        ],
      },
    ],
    faqs: [
      { q: "Đặt chỗ máy bay để xin visa có hợp pháp không?", a: "Có. Đó là đặt chỗ thật mang tên bạn. Nhiều lãnh sự quán, kể cả các nước Schengen, khuyên không mua vé trước khi có kết quả visa, và đặt chỗ là cách thông thường để thể hiện kế hoạch." },
    ],
    sources: FAKE_SOURCES,
    checked: CHECKED,
  },
  {
    key: "flight-itinerary-japan-visa",
    slug: "dat-cho-ve-may-bay-visa-nhat-ban",
    title: "Đặt chỗ vé máy bay xin visa du lịch Nhật Bản",
    h1: "Đặt chỗ vé máy bay cho visa Nhật Bản",
    description:
      "Hồ sơ visa Nhật Bản thường yêu cầu đặt chỗ hoặc lịch trình bay cùng lịch trình lưu trú. Cần những gì và cách có đặt chỗ xác minh được.",
    intro:
      "Người Việt cần visa để đi Nhật, và Đại sứ quán, Tổng lãnh sự quán Nhật cùng các đại lý được chỉ định thường yêu cầu bằng chứng kế hoạch đi lại, thường là đặt chỗ máy bay kèm lịch trình lưu trú. Thông thường bạn không cần mua vé trước.",
    sections: [
      {
        heading: "Cần gồm những gì",
        paragraphs: [
          "Đặt chỗ khứ hồi vào và ra Nhật Bản, mang tên bạn như trong hộ chiếu, khớp ngày với đơn xin visa và lịch trình lưu trú.",
          "Yêu cầu khác nhau theo cơ quan lãnh sự, nên hãy theo danh mục hồ sơ của Đại sứ quán, Tổng lãnh sự quán Nhật hoặc đại lý được chỉ định nhận hồ sơ của bạn.",
        ],
      },
      { heading: "Làm cho đúng", paragraphs: ["Thời gian xét thường vài ngày làm việc. Đặt chỗ ngay trước khi nộp để còn hiệu lực khi hồ sơ được kiểm tra.", KIEMTRA] },
    ],
    faqs: [
      { q: "Xin visa Nhật có cần mua vé không?", a: "Thường là không. Phần lớn danh mục hồ sơ chấp nhận đặt chỗ hoặc lịch trình, nhưng hãy kiểm tra danh mục của nơi bạn nộp." },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "ve-roi-khoi-thai-lan",
    title: "Đi Thái Lan có cần vé khứ hồi hoặc vé đi tiếp không?",
    h1: "Có cần vé rời khỏi Thái Lan không?",
    description:
      "Nhập cảnh Thái Lan miễn visa đồng nghĩa phải rời đi trong thời gian cho phép, và hãng bay thường đòi bằng chứng khi làm thủ tục. Cần chuẩn bị gì.",
    intro:
      "Khách nhập cảnh Thái Lan không cần visa phải rời đi trong thời gian lưu trú cho phép, và cơ quan xuất nhập cảnh Thái có thể yêu cầu bằng chứng rời đi. Trên thực tế, việc kiểm tra thường diễn ra ở quầy hãng bay trước khi khởi hành.",
    sections: [
      {
        heading: "Kiểm tra ở đâu",
        paragraphs: [
          "Các hãng bay sang Thái Lan, nhất là hãng giá rẻ, hay yêu cầu khách vé một chiều xuất trình chuyến bay rời đi; không có thì có thể bị từ chối lên máy bay. Cán bộ xuất nhập cảnh ở sân bay Thái ít hỏi hơn, nhưng quy định có tồn tại và có thể áp dụng.",
        ],
      },
      {
        heading: "Xuất trình gì",
        paragraphs: [
          "Chuyến bay rời Thái Lan trong thời gian lưu trú của bạn, có mã đặt chỗ. Lựa chọn phổ biến là các chuyến ngắn tới Kuala Lumpur, Singapore hoặc về TP.HCM, Hà Nội.",
          "Quy định nhập cảnh Thái Lan lại thay đổi từ 15/9/2026. Hãy kiểm tra thời gian lưu trú cho hộ chiếu của bạn trên trang e-Visa chính thức của Thái Lan hoặc Đại sứ quán Thái Lan trước khi đi.",
          THOIHAN,
          KIEMTRA,
        ],
      },
      {
        heading: "Bộ Ngoại giao Anh nói gì (hộ chiếu Anh)",
        paragraphs: [
          "Với khách mang hộ chiếu Anh, diện miễn visa cho phép ở tới 30 ngày, chỉ để du lịch; xuất nhập cảnh có thể đòi bằng chứng rời đi và ít nhất 10.000 baht mỗi người. Mọi hành khách phải khai Thailand Digital Arrival Card (TDAC) trực tuyến trong ba ngày trước khi đến. Đây là quy định cho hộ chiếu Anh; hãy kiểm tra quy định cho hộ chiếu của bạn từ nguồn chính thức.",
        ],
      },
    ],
    faqs: [
      { q: "Có thể bay sang Thái Lan bằng vé một chiều không?", a: "Có, nhưng hãy chuẩn bị chuyến bay rời đi để xuất trình khi làm thủ tục; không có thì có thể bị từ chối lên máy bay." },
    ],
    sources: [TH_SRC],
    checked: CHECKED,
  },
];
