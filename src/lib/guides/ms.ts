/**
 * Malay guides for travellers from Malaysia. Same rules as the English ones.
 * Country facts from the UK Foreign Office are for British passports, as the
 * pages say.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const SEMAK =
  "Selepas menerima tempahan, buka halaman \"Urus tempahan\" (Manage booking) di laman web syarikat penerbangan dan cari menggunakan kod tempahan (PNR) dan nama keluarga anda. Jika ia muncul di situ, petugas daftar masuk juga boleh melihatnya. Simpan tangkapan skrin bersama e-mel.";

export const MASA =
  "Tempahan seperti ini hanya dipegang untuk tempoh singkat (biasanya kira-kira 48 jam) sebelum luput sendiri. Buat tempahan sejurus sebelum daftar masuk atau temu janji visa, bukan beberapa minggu awal.";

const notaUK = (isi: string) => ({
  heading: "Kata Pejabat Luar Negeri UK (pasport British)",
  paragraphs: [
    isi,
    "Ini syarat untuk pemegang pasport British. Pemegang pasport Malaysia lazimnya bebas visa di negara ASEAN, tetapi tempoh tinggal dan syarat boleh berbeza. Semak di laman rasmi kedutaan negara destinasi atau Wisma Putra.",
  ],
});

export const MS_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "tiket-keluar-onward-ticket",
    title: "Tiket Keluar (Onward Ticket): Apa Itu dan Cara Mendapatkannya",
    h1: "Bukti perjalanan keluar, diterangkan",
    description:
      "Kenapa syarikat penerbangan dan imigresen meminta tiket pulang atau tiket keluar, apa yang dikira bukti, dan cara mendapatkan tempahan penerbangan yang boleh disahkan tanpa membeli tiket yang tidak digunakan.",
    intro:
      "Banyak negara hanya membenarkan pelawat masuk jika mereka dapat menunjukkan akan keluar semula. Syarikat penerbangan menguatkuasakan peraturan ini semasa daftar masuk, kerana jika anda ditolak masuk, merekalah yang perlu menanggung kos membawa anda pulang. Jika anda terbang dengan tiket sehala, anda mungkin perlu menunjukkan penerbangan keluar atau pulang.",
    sections: [
      {
        heading: "Siapa yang memeriksa",
        paragraphs: [
          "Dua pihak: syarikat penerbangan semasa daftar masuk, dan pegawai imigresen semasa tiba. Secara praktiknya syarikat penerbangan lebih kerap bertanya, kerana sistem mereka menanda penumpang tiket sehala ke negara yang mempunyai peraturan ini secara automatik.",
          "Banyak permohonan visa juga meminta jadual penerbangan. Kebanyakan konsulat menerima tempahan dan menasihatkan supaya tidak membeli tiket sebelum visa diluluskan.",
        ],
      },
      {
        heading: "Apa yang dikira bukti",
        paragraphs: [
          "Penerbangan keluar dari negara itu, ke mana-mana sahaja, dengan kod tempahan yang boleh dilihat petugas. Di sempadan darat, tiket bas atau feri kadangkala diterima, tetapi syarikat penerbangan biasanya mahu melihat penerbangan.",
          "Tempahan sebenar mempunyai PNR yang boleh dicari di laman web syarikat penerbangan itu sendiri. PDF yang disunting atau tempahan palsu bukan bukti, dan menunjukkannya boleh menyebabkan anda ditolak atau lebih teruk.",
        ],
      },
      {
        heading: "Pilihan anda",
        paragraphs: [
          "Beli tiket boleh dikembalikan sepenuhnya dan batalkan kemudian. Berkesan, tetapi wang yang banyak tersekat dan bayaran balik boleh mengambil masa berminggu-minggu.",
          "Beli penerbangan keluar paling murah dan tidak menggunakannya. Mudah, tetapi wang hilang.",
          "Gunakan perkhidmatan tiket keluar. Dengan bayaran kecil, tempahan sebenar atas nama anda dipegang seketika lalu dilepaskan. Inilah yang dilakukan kebanyakan pengembara jangka panjang.",
        ],
      },
      { heading: "Cara menyemak ia tulen", paragraphs: [SEMAK, MASA] },
    ],
    faqs: [
      {
        q: "Adakah tempahan tiket keluar sah di sisi undang-undang?",
        a: "Memegang tempahan ialah fungsi biasa syarikat penerbangan, dan konsulat lazim menerima tempahan dalam permohonan visa. Yang tidak boleh diterima ialah dokumen palsu. Sentiasa semak peraturan destinasi daripada sumber rasmi.",
      },
      {
        q: "Perlukah penerbangan keluar balik ke Malaysia?",
        a: "Tidak. Cukup sekadar keluar dari negara yang anda masuki. Penerbangan singkat ke negara jiran ialah pilihan biasa.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "ditolak-naik-pesawat-tiket-sehala",
    title: "Ditolak Naik Pesawat Kerana Tiket Sehala? Cara Mengelaknya",
    h1: "Ditolak naik pesawat dengan tiket sehala: cara mengelak",
    description:
      "Kenapa syarikat penerbangan menolak penumpang tiket sehala, destinasi mana yang mencetuskan pemeriksaan, dan cara mendapatkan tempahan keluar dalam beberapa minit di lapangan terbang.",
    intro:
      "Jika syarikat penerbangan membawa anda ke sesebuah negara dan anda ditolak masuk, mereka perlu membawa anda pulang dan mungkin didenda. Sebab itu petugas daftar masuk meminta penumpang tiket sehala membuktikan mereka akan keluar. Jika tidak boleh, anda mungkin tidak dibenarkan naik.",
    sections: [
      {
        heading: "Perjalanan yang sering diperiksa",
        paragraphs: [
          "Penerbangan sehala ke negara yang mensyaratkan tiket keluar, seperti Filipina, Indonesia (Bali), Thailand, Costa Rica, Colombia, Peru dan New Zealand, paling kerap. Sistem syarikat penerbangan menanda anda secara automatik.",
        ],
      },
      {
        heading: "Penyelesaian di lapangan terbang",
        paragraphs: [
          "Perkhidmatan tiket keluar boleh mengeluarkan tempahan sebenar dalam beberapa minit, dari telefon anda, di kaunter daftar masuk. Tunjukkan kod tempahan kepada petugas supaya mereka boleh mengesahkannya dalam sistem.",
          SEMAK,
        ],
      },
    ],
    faqs: [
      {
        q: "Bolehkah syarikat penerbangan benar-benar menolak saya?",
        a: "Ya. Jika anda tidak memenuhi syarat masuk destinasi, syarikat penerbangan boleh enggan membawa anda, dan bukti perjalanan keluar ialah salah satu syaratnya.",
      },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "tiket-keluar-thailand",
    title: "Perlukah Tiket Keluar untuk ke Thailand?",
    h1: "Perlukah tiket keluar untuk ke Thailand?",
    description:
      "Masuk Thailand tanpa visa bermakna keluar dalam tempoh yang dibenarkan, dan syarikat penerbangan sering meminta bukti semasa daftar masuk. Apa yang perlu disediakan.",
    intro:
      "Pelawat yang masuk Thailand tanpa visa perlu keluar dalam tempoh tinggal yang dibenarkan, dan imigresen Thailand boleh meminta bukti perjalanan keluar. Secara praktiknya, pemeriksaan paling kerap berlaku di kaunter syarikat penerbangan sebelum berlepas.",
    sections: [
      {
        heading: "Di mana diperiksa",
        paragraphs: [
          "Syarikat penerbangan ke Thailand, terutamanya tambang murah, kerap meminta penumpang tiket sehala menunjukkan penerbangan keluar. Tanpanya, anda mungkin ditolak naik. Jika anda masuk melalui darat dari Malaysia, peraturan sempadan darat pula terpakai.",
        ],
      },
      {
        heading: "Apa yang perlu ditunjukkan",
        paragraphs: [
          "Penerbangan keluar Thailand dalam tempoh tinggal anda, dengan kod tempahan. Pilihan popular ialah penerbangan singkat ke Kuala Lumpur, Penang, Singapura atau Ho Chi Minh.",
          "Peraturan masuk Thailand berubah lagi pada 15 September 2026. Semak tempoh tinggal untuk pasport anda di laman rasmi e-Visa Thailand atau Kedutaan Thailand di Kuala Lumpur sebelum berlepas.",
        ],
      },
      { heading: "Lakukan dengan betul", paragraphs: [MASA, SEMAK] },
      notaUK(
        "Menurut Pejabat Luar Negeri UK, rakyat British boleh tinggal sehingga 30 hari tanpa visa, untuk pelancongan sahaja. Imigresen boleh meminta bukti perjalanan keluar dan dana sekurang-kurangnya 10,000 baht seorang. Semua pelawat mesti mengisi Thailand Digital Arrival Card (TDAC) dalam talian dalam tempoh tiga hari sebelum tiba.",
      ),
    ],
    faqs: [
      { q: "Bolehkah terbang ke Thailand dengan tiket sehala?", a: "Boleh, tetapi bersedia untuk menunjukkan penerbangan keluar semasa daftar masuk. Tanpanya anda mungkin ditolak naik." },
    ],
    sources: [{ label: "UK Foreign Office: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" }],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "tiket-keluar-bali-indonesia",
    title: "Perlukah Tiket Keluar untuk Bali dan Indonesia?",
    h1: "Perlukah tiket keluar untuk ke Bali?",
    description:
      "Indonesia mengharapkan pelawat menunjukkan tiket pulang atau keluar, dan syarikat penerbangan memeriksa sebelum naik. Apa yang perlu ditunjukkan dan cara mendapatkan tempahan yang boleh disahkan.",
    intro:
      "Pelawat ke Indonesia, termasuk ke Bali, dijangka keluar dalam tempoh tinggal yang dibenarkan. Direktorat Jeneral Imigresen Indonesia menyenaraikan pasport sah sekurang-kurangnya enam bulan dan tiket pulang atau tiket ke negara lain sebagai syarat visa semasa ketibaan (VOA dan e-VOA).",
    sections: [
      {
        heading: "Di mana diperiksa",
        paragraphs: [
          "Penerbangan ke Denpasar dan Jakarta sering memeriksa penerbangan keluar di kaunter. Imigresen Indonesia juga boleh memintanya semasa ketibaan.",
          "Semak peraturan masuk terkini untuk pasport anda di laman rasmi imigresen Indonesia sebelum berlepas.",
        ],
      },
      {
        heading: "Memilih penerbangan keluar",
        paragraphs: ["Penerbangan dari Bali ke Kuala Lumpur, Singapura atau Perth singkat dan menjadi pilihan biasa untuk tempahan keluar."],
      },
      { heading: "Lakukan dengan betul", paragraphs: [MASA, SEMAK] },
      notaUK(
        "Menurut Pejabat Luar Negeri UK, visa semasa ketibaan 30 hari untuk rakyat British berharga 500,000 rupiah dan memerlukan bukti perjalanan keluar atau pulang. Bali mengenakan levi pelancong 150,000 rupiah kepada pelancong asing.",
      ),
    ],
    faqs: [
      { q: "Bolehkah ke Bali dengan tiket sehala?", a: "Boleh terbang dengan tiket sehala, tetapi bersedia untuk menunjukkan penerbangan pulang atau keluar semasa daftar masuk atau ketibaan." },
    ],
    sources: [
      { label: "Direktorat Jeneral Imigresen Indonesia: FAQ visa", url: "https://www.imigrasi.go.id/faq/visa?lang=en-US" },
      { label: "UK Foreign Office: Indonesia entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" },
    ],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-philippines",
    slug: "tiket-keluar-filipina",
    title: "Tiket Keluar untuk Filipina: Apa yang Diperiksa",
    h1: "Tiket keluar untuk masuk ke Filipina",
    description:
      "Pelawat bebas visa ke Filipina perlukan tiket keluar, dan syarikat penerbangan serta imigresen sama-sama memeriksa. Cara menyediakan tempahan yang boleh disahkan sebelum terbang.",
    intro:
      "Filipina antara negara paling ketat dalam soal tiket keluar. Pelawat bebas visa perlu memegang tiket keluar dalam tempoh tinggal yang dibenarkan, dan syarikat penerbangan serta Bureau of Immigration sama-sama memintanya.",
    sections: [
      {
        heading: "Apa yang dijangka",
        paragraphs: [
          "Untuk penerbangan ke Manila, Cebu atau Clark, bersedia diminta penerbangan keluar atau pulang semasa daftar masuk. Pegawai imigresen semasa tiba juga boleh memintanya.",
          "Penerbangan keluar mesti meninggalkan Filipina dalam tempoh tinggal anda. Semak tempoh bebas visa untuk pasport anda dengan Bureau of Immigration Filipina atau Kedutaan Filipina di Kuala Lumpur.",
        ],
      },
      {
        heading: "Memilih penerbangan keluar",
        paragraphs: ["Penerbangan serantau singkat ke Kuala Lumpur, Kota Kinabalu, Hong Kong atau Singapura ialah pilihan biasa."],
      },
      { heading: "Lakukan dengan betul", paragraphs: [MASA, SEMAK] },
      notaUK(
        "Menurut Pejabat Luar Negeri UK, kebanyakan pelawat British dijangka mempunyai bukti perjalanan pulang atau keluar, dan pegawai imigresen serta syarikat penerbangan boleh memintanya. Semua pelawat mesti mendaftar percuma di eTravel dalam tiga hari sebelum tiba.",
      ),
    ],
    faqs: [
      { q: "Adakah saya akan ditolak tanpa tiket keluar?", a: "Risikonya nyata. Syarikat penerbangan ke Filipina kerap menolak penumpang tiket sehala yang tidak dapat menunjukkan jalan keluar." },
    ],
    sources: [{ label: "UK Foreign Office: Philippines entry requirements", url: "https://www.gov.uk/foreign-travel-advice/philippines/entry-requirements" }],
    checked: CHECKED,
  },
  {
    key: "flight-itinerary-us-visa",
    slug: "tempahan-penerbangan-visa-amerika",
    title: "Tempahan Penerbangan untuk Temu Duga Visa Amerika (B1/B2)",
    h1: "Perlukah tempahan penerbangan untuk visa Amerika?",
    description:
      "Amerika Syarikat tidak mewajibkan tempahan penerbangan untuk visa B1/B2 dan menasihatkan supaya tidak membeli tiket sebelum visa dikeluarkan. Bila tempahan membantu.",
    intro:
      "Rakyat Malaysia memerlukan visa B1/B2 untuk melawat Amerika Syarikat, tetapi tidak perlu menunjukkan tempahan penerbangan, dan Jabatan Negara AS menasihatkan pemohon supaya tidak membeli tiket sehingga mendapat visa. Borang DS-160 bertanya tarikh perjalanan yang dirancang, dan sesetengah pemohon membawa tempahan ke temu duga untuk menunjukkan rancangan yang jelas.",
    sections: [
      {
        heading: "Bila tempahan membantu",
        paragraphs: [
          "Jika pegawai konsular bertanya tentang rancangan anda, tempahan yang sepadan dengan tarikh dalam DS-160 menunjukkan anda merancang dengan teliti. Tetapi ia tidak menggantikan bukti ikatan anda dengan Malaysia, yang jauh lebih penting.",
          MASA,
          SEMAK,
        ],
      },
    ],
    faqs: [
      { q: "Patutkah saya beli tiket sebelum temu duga visa Amerika?", a: "Tidak. Jabatan Negara AS menasihatkan supaya tidak membeli tiket sehingga visa dikeluarkan. Jika perlu, tempahan sudah memadai." },
    ],
    sources: [
      { label: "US Department of State: Visitor visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
    ],
    checked: CHECKED,
  },
];

export const MS_UI: GuideUi = {
  home: "Laman utama",
  guides: "Panduan",
  indexTitle: "Panduan tiket keluar dan tempahan penerbangan untuk visa",
  indexDescription:
    "Negara mana yang meminta bukti perjalanan keluar, apa yang diperlukan permohonan visa, dan cara mendapatkan tempahan penerbangan yang boleh disahkan tanpa membeli tiket.",
  commonQuestions: "Soalan lazim",
  moreGuides: "Panduan lain",
  disclaimer:
    "Panduan ini maklumat am, bukan nasihat undang-undang atau imigresen. Peraturan boleh berubah: sentiasa sahkan dengan sumber rasmi negara destinasi dan syarikat penerbangan anda sebelum berlepas.",
  ctaHeading: (price) =>
    price ? `Perlukan tempahan penerbangan yang boleh disahkan? Dari ${price}` : "Perlukan tempahan penerbangan yang boleh disahkan?",
  ctaBody: "Dapatkan tempahan penerbangan sebenar melalui e-mel dalam beberapa minit, dengan kod tempahan yang boleh dicari di laman web syarikat penerbangan.",
  ctaButton: "Dapatkan tempahan",
  destinationsTitle: "Bila anda perlukan bukti penerbangan",
  destinationsSub: "Panduan tempahan penerbangan untuk visa dan apa yang diperiksa syarikat penerbangan dan imigresen.",
  sourcesHeading: "Sumber",
  lastChecked: (date) => `Kali terakhir disemak: ${date}`,
};
