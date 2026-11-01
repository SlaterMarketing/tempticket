/**
 * Turkish guides for visa applicants and travellers in Turkey. Same rules as
 * the English ones: general guidance, official sources where facts are
 * specific, never legal advice.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const KONTROL =
  "Rezervasyon elinize ulaştığında havayolunun sitesinde \"Rezervasyonu yönet\" (Manage booking) sayfasını açın ve rezervasyon kodu (PNR) ile soyadınızla arayın. Orada görünüyorsa check-in görevlisi ve vize memuru da görebilir. E-postanın yanında ekran görüntüsünü de saklayın.";

export const ZAMANLAMA =
  "Bu tür rezervasyonlar kısa bir süre (genellikle 48 saat civarı) tutulur, sonra kendiliğinden düşer. Check-in'den veya vize randevunuzdan kısa süre önce alın, haftalar önce değil.";

export const TR_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "devam-bileti-nedir",
    title: "Devam Bileti (Onward Ticket) Nedir, Nasıl Alınır?",
    h1: "Devam bileti ve çıkış kanıtı: bilmeniz gerekenler",
    description:
      "Havayolları ve sınır görevlileri neden devam ya da dönüş bileti ister, ne kanıt sayılır ve kullanmayacağınız bir bileti almadan doğrulanabilir uçuş rezervasyonu nasıl alınır.",
    intro:
      "Birçok ülke, ziyaretçiyi ancak tekrar çıkacağını gösterebilirse içeri alır. Havayolları bu kuralı check-in'de uygular, çünkü ülkeye girişiniz reddedilirse sizi geri getirmenin masrafı onlara kalır. Tek yön biletle seyahat ediyorsanız bir devam ya da dönüş uçuşu göstermeniz gerekebilir.",
    sections: [
      {
        heading: "Kim ister",
        paragraphs: [
          "İki yerde kontrol edilir: check-in'de havayolu ve varışta pasaport polisi. Pratikte havayolunun sorma ihtimali çok daha yüksektir, çünkü sistemi bu kuralı olan ülkelere tek yön bilet alan yolcuları otomatik olarak işaretler.",
          "Schengen vizesi dahil birçok vize başvurusunda da uçuş planı istenir. Konsoloslukların çoğu rezervasyonun yeterli olduğunu söyler ve vize çıkmadan bilet alınmamasını tavsiye eder.",
        ],
      },
      {
        heading: "Ne kanıt sayılır",
        paragraphs: [
          "Ülkeden herhangi bir yere çıkan, görevlinin görebileceği bir rezervasyon kodu olan uçuş. Kara sınırlarında bazen otobüs veya feribot bileti kabul edilir, ama havayolları genellikle uçuş ister.",
          "Gerçek bir rezervasyonun havayolunun kendi sitesinde sorgulanabilen bir PNR'ı vardır. Düzenlenmiş bir PDF veya sahte rezervasyon kanıt değildir ve sunulması reddedilmenize, hatta daha kötüsüne yol açabilir.",
        ],
      },
      {
        heading: "Seçenekleriniz",
        paragraphs: [
          "Tamamen iade edilebilir bir bilet alıp sonra iptal etmek. İşe yarar, ama yüksek bir tutar bağlanır ve iade haftalar sürebilir.",
          "En ucuz devam uçuşunu alıp kullanmamak. Basit, ama para gider.",
          "Devam bileti hizmeti kullanmak. Küçük bir ücret karşılığında adınıza gerçek bir rezervasyon kısa süreliğine tutulur, sonra serbest bırakılır. Uzun süre gezenlerin çoğu bunu yapar.",
        ],
      },
      { heading: "Gerçek olduğunu nasıl kontrol edersiniz", paragraphs: [KONTROL, ZAMANLAMA] },
    ],
    faqs: [
      {
        q: "Devam bileti rezervasyonu yasal mı?",
        a: "Uçuş rezervasyonu tutmak havayollarının olağan bir işlemidir ve konsolosluklar vize başvurularında rezervasyonu rutin olarak kabul eder. Kabul edilmeyen, sahte belgedir. Gideceğiniz ülkenin kurallarını her zaman resmi kaynaktan kontrol edin.",
      },
      {
        q: "Devam uçuşu Türkiye'ye dönüş olmak zorunda mı?",
        a: "Hayır. Girdiğiniz ülkeden çıkması yeterli. Komşu bir ülkeye kısa bir uçuş en yaygın seçenektir.",
      },
      {
        q: "Pasaport polisi gerçekten kontrol eder mi?",
        a: "Bazen, ama yolcuların çoğuna check-in bankosunda sorulur. Her iki durum için de rezervasyon kodunu hazır tutun.",
      },
    ],
  },
  {
    key: "dummy-ticket-for-visa",
    slug: "vize-icin-ucak-bileti-rezervasyonu",
    title: "Vize İçin Uçak Bileti Rezervasyonu: Gerçek mi, Sahte PDF mi?",
    h1: "Vize başvurusu için uçak bileti rezervasyonu",
    description:
      "Vize için \"dummy ticket\" denen uçuş rezervasyonu aslında nedir, konsolosluklar neden ister, gerçek rezervasyonu sahte PDF'ten nasıl ayırırsınız ve doğrulanabilir olanı nasıl alırsınız.",
    intro:
      "Seyahat sektöründe \"dummy ticket\" denen şey, vize başvurusuna eklenen uçuş rezervasyonudur. Kullanamayabileceğiniz bir biletin parasını ödemeden tarihlerinizi ve güzergahınızı gösterir. Adı yanıltıcıdır: iyi bir rezervasyon hiç de sahte değildir, havayolunun sisteminde kısa süre tutulan gerçek bir kayıttır.",
    sections: [
      {
        heading: "Konsolosluklar neden ister",
        paragraphs: [
          "Vize memuru seyahatinizin net bir başlangıcı ve sonu olduğunu, tarihlerin başvurunun geri kalanıyla uyuştuğunu görmek ister. Birçok konsolosluk ve vize merkezi, vize çıkmadan bilet alınmamasını açıkça söyler, bu yüzden beklenen belge rezervasyondur.",
          "Schengen ülkeleri, Japonya ve diğer birçok ülke genellikle uçuş planı veya rezervasyon ister. Birleşik Krallık ve ABD zorunlu tutmaz ama destekleyici belge olarak kabul eder.",
        ],
      },
      {
        heading: "Gerçek rezervasyon mu, sahte PDF mi?",
        paragraphs: [
          "Gerçek rezervasyonun, havayolunun rezervasyon yönetimi sayfasında sorgulayabileceğiniz bir kodu (PNR) vardır. Sahtesi ise rezervasyona benzeyecek şekilde düzenlenmiş, arkasında hiçbir şey olmayan bir belgedir.",
          "Konsolosluklar ve havayolları kontrol edebilir ve eder. Sahte belge sunmak başvurunuzun reddedilmesine ve sonraki başvurularınızın etkilenmesine yol açabilir. Yalnızca kendiniz doğrulayabildiğiniz bir rezervasyon kullanın.",
        ],
      },
      {
        heading: "Bilgileri doğru verin",
        paragraphs: [
          "İsim pasaportla birebir aynı olmalı, pasaportta ikinci ad varsa o da. Tarihler başvuru formu ve otel rezervasyonlarıyla uyuşmalı.",
          "Vize başvurularının çoğu gidiş-dönüş ister. Birden fazla ülke geziyorsanız rezervasyon, konsolosluğun listesinde yazdığı gibi ana kalış veya ilk giriş ülkesinden başlamalı.",
        ],
      },
      { heading: "Zamanlama", paragraphs: [ZAMANLAMA, KONTROL] },
    ],
    faqs: [
      {
        q: "Vize için uçuş rezervasyonu yasal mı?",
        a: "Gerçek bir uçuş rezervasyonu yasaldır ve birçok konsolosluğun istediği budur. Sahte veya düzenlenmiş bir rezervasyon yasal değildir ve vizenizin reddedilmesine yol açabilir.",
      },
      {
        q: "Konsolosluk rezervasyonu kontrol eder mi?",
        a: "Edebilir, özellikle işlemin başında. Bu yüzden rezervasyonun havayolu sitesinde görünen bir PNR'ı olmalı.",
      },
      {
        q: "Rezervasyon süresi dolarsa ne olur?",
        a: "Hiçbir şey. Konsolosluklar rezervasyonların düşmesini bekler ve vize onaylanana kadar bilet alınmamasını tavsiye eder. Karar çıktıktan sonra gerçek biletinizi alın.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "schengen-vizesi-ucak-rezervasyonu",
    title: "Schengen Vizesi İçin Uçak Rezervasyonu (Bilet Almadan)",
    h1: "Schengen vizesi başvurusu için uçuş rezervasyonu",
    description:
      "Schengen konsolosluklarının çoğu ücretli bilet değil uçuş rezervasyonu ister. Vize merkezi randevunuz için doğrulanabilir gidiş-dönüş rezervasyonu nasıl alınır.",
    intro:
      "Schengen vizesi başvurusu genellikle nasıl gelip nasıl ayrılacağınızı gösteren bir uçuş planı ister. Birçok konsolosluk vize çıkmadan bilet alınmaması gerektiğini ve rezervasyonun yeterli olduğunu açıkça belirtir.",
    sections: [
      {
        heading: "Konsolosluklar ne ister",
        paragraphs: [
          "Başvurunuzdaki tarihlerle uyuşan bir gidiş-dönüş, ya da giriş ve çıkış. Rezervasyondaki isim pasaportunuzdakiyle birebir aynı olmalı.",
          "Gereklilikler ülkeye ve vize merkezine göre değişir, bu yüzden başvurduğunuz konsolosluğun belge listesini okuyun. Bazıları rezervasyondan fazlasını ister.",
        ],
      },
      {
        heading: "Randevuya göre zamanlama",
        paragraphs: [
          "Rezervasyonu randevunuzdan bir iki gün önce alın, böylece belgeleriniz incelendiğinde hâlâ geçerli olur.",
          KONTROL,
        ],
      },
    ],
    faqs: [
      {
        q: "Dönüş uçuşu mu lazım, tek yön yeterli mi?",
        a: "Schengen başvurularının çoğu gidiş-dönüş, ya da en azından Schengen bölgesinden kesin bir çıkış bekler. Gidiş-dönüş rezervasyonu ikisini de karşılar.",
      },
      {
        q: "Karar çıkmadan rezervasyon düşerse?",
        a: "Bu normal ve beklenen bir durum. Konsolosluklar planınızı değerlendirir ve vize verilene kadar bilet alınmamasını tavsiye eder.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "tek-yon-bilet-ucaga-alinmama",
    title: "Tek Yön Biletle Uçağa Alınmadınız mı? Nasıl Önlenir",
    h1: "Tek yön biletle uçağa alınmama: nasıl önlenir",
    description:
      "Havayolları tek yön bileti olan yolcuları neden uçağa almaz, hangi ülkeler bu kontrolü tetikler ve havalimanında dakikalar içinde devam biletini nasıl ayarlarsınız.",
    intro:
      "Bir havayolu sizi bir ülkeye götürür ve girişiniz reddedilirse, sizi geri götürmek zorunda kalır ve ceza ödeyebilir. Bu yüzden check-in personeli tek yön yolculardan çıkacaklarını kanıtlamalarını ister. Kanıtlayamazsanız uçağa alınmayabilirsiniz.",
    sections: [
      {
        heading: "Hangi yolculuklarda kontrol yapılır",
        paragraphs: [
          "Filipinler, Tayland, Endonezya, Kosta Rika, Kolombiya, Peru ve Yeni Zelanda gibi devam bileti şartı olan ülkelere tek yön uçuşlar en yaygın olanlarıdır. Havayolunun sistemi sizi otomatik olarak işaretler.",
        ],
      },
      {
        heading: "Havalimanında çözüm",
        paragraphs: [
          "Bir devam bileti hizmeti, check-in bankosundayken telefonunuzdan dakikalar içinde gerçek bir rezervasyon çıkarabilir. Görevliye rezervasyon kodunu gösterin, kendi sisteminden doğrulayabilir.",
          KONTROL,
        ],
      },
    ],
    faqs: [
      {
        q: "Havayolu beni gerçekten uçağa almayabilir mi?",
        a: "Evet. Gideceğiniz ülkenin giriş şartlarını karşılamıyorsanız havayolu sizi taşımayı reddedebilir ve çıkış kanıtı bu şartlardan biridir.",
      },
    ],
  },
  {
    key: "flight-itinerary-uk-visa",
    slug: "ingiltere-vizesi-ucak-rezervasyonu",
    title: "İngiltere Turist Vizesi İçin Uçak Rezervasyonu Gerekli mi?",
    h1: "İngiltere ziyaretçi vizesi için uçuş rezervasyonu gerekir mi?",
    description:
      "İngiltere Standard Visitor vizesi için uçuş rezervasyonu zorunlu değildir ama başvurunuzu destekleyebilir. Ücret, süre ve ne zaman eklemeniz gerektiği.",
    intro:
      "UK Visas and Immigration, Standard Visitor vizesine başvurmadan önce uçuş almanızı istemez. Görmek istediği, ziyaretin sonunda İngiltere'den ayrılacağınız ve dönüş ya da devam yolculuğunu karşılayabileceğinizdir. Yine de birçok başvuru sahibi planını göstermek için uçuş rezervasyonu ekler.",
    sections: [
      {
        heading: "Vize hakkında temel bilgiler",
        paragraphs: [
          "Altı aya kadar Standard Visitor vizesinin ücreti 135 sterlindir. Seyahatten en fazla üç ay önce başvurabilirsiniz ve kimliğinizi kanıtlayıp belgelerinizi verdikten sonra karar genellikle üç hafta içinde çıkar.",
        ],
      },
      {
        heading: "Ne göstermeli",
        paragraphs: [
          "Çevrimiçi başvurunuzdaki tarihlerle uyuşan bir dönüş uçuşu, ya da varış ve ayrılış, isim pasaportla birebir aynı. Rezervasyon, vize reddedilir veya gecikirse bilet parasını kaybetme riski olmadan bunu sağlar.",
          ZAMANLAMA,
          KONTROL,
        ],
      },
    ],
    faqs: [
      {
        q: "İngiltere vizesi için uçak rezervasyonu zorunlu mu?",
        a: "Hayır. İsteğe bağlı destekleyici bir belgedir. Önemli olan planınızın, mali durumunuzun ve Türkiye'deki bağlarınızın açık ve tutarlı olması.",
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
    slug: "amerika-vizesi-ucak-rezervasyonu",
    title: "Amerika Vizesi (B1/B2) Mülakatı İçin Uçak Rezervasyonu",
    h1: "Amerika vizesi için uçuş rezervasyonu gerekir mi?",
    description:
      "ABD, B1/B2 vizesi için uçuş rezervasyonu şartı koymaz ve vize çıkmadan bilet alınmamasını tavsiye eder. Rezervasyonun ne zaman işe yaradığı.",
    intro:
      "ABD B1/B2 ziyaretçi vizesi için uçuş rezervasyonu göstermeniz gerekmez ve ABD Dışişleri Bakanlığı başvuru sahiplerine vize çıkana kadar bilet almamalarını tavsiye eder. DS-160 formu tahmini seyahat tarihlerinizi sorar ve bazı başvuru sahipleri planlarının net olduğunu göstermek için mülakata rezervasyon götürür.",
    sections: [
      {
        heading: "Rezervasyon ne zaman işe yarar",
        paragraphs: [
          "Konsolosluk görevlisi planınızı sorarsa, DS-160'taki tarihlerle uyuşan bir rezervasyon seyahatinizi düşündüğünüzü göstermenin kolay bir yoludur. Ama Türkiye'deki bağlarınızın kanıtının yerini tutmaz; asıl önemli olan odur.",
          ZAMANLAMA,
          KONTROL,
        ],
      },
    ],
    faqs: [
      {
        q: "Amerika vizesi mülakatından önce bilet almalı mıyım?",
        a: "Hayır. ABD Dışişleri Bakanlığı vize çıkana kadar bilet alınmamasını tavsiye eder. Gerekirse rezervasyon yeterli.",
      },
    ],
    sources: [
      { label: "US Department of State: Visitor visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
    ],
    checked: CHECKED,
  },
];

export const TR_UI: GuideUi = {
  home: "Ana sayfa",
  guides: "Rehberler",
  indexTitle: "Devam bileti ve vize için uçuş rezervasyonu rehberleri",
  indexDescription:
    "Hangi ülkeler çıkış kanıtı ister, vize başvuruları ne gerektirir ve bilet almadan doğrulanabilir uçuş rezervasyonu nasıl alınır.",
  commonQuestions: "Sık sorulan sorular",
  moreGuides: "Diğer rehberler",
  disclaimer:
    "Bu rehberler genel bilgidir, hukuki veya göç danışmanlığı değildir. Kurallar değişebilir: seyahatten önce gideceğiniz ülkenin resmi kaynaklarından ve havayolunuzdan mutlaka teyit edin.",
  ctaHeading: (price) =>
    price ? `Doğrulanabilir bir uçuş rezervasyonu mu lazım? ${price}'dan başlayan fiyatlarla` : "Doğrulanabilir bir uçuş rezervasyonu mu lazım?",
  ctaBody: "Havayolu sitesinde görünen bir rezervasyon koduyla, dakikalar içinde e-postanıza gerçek bir uçuş rezervasyonu gelsin.",
  ctaButton: "Rezervasyonunu al",
  destinationsTitle: "Uçuş kanıtı ne zaman gerekir",
  destinationsSub: "Vize için uçuş rezervasyonu ve havayollarıyla pasaport polisinin neyi kontrol ettiği üzerine rehberler.",
  sourcesHeading: "Kaynaklar",
  lastChecked: (date) => `Son kontrol: ${date}`,
};
