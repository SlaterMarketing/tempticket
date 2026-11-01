/** Indonesian guides, aimed at Indonesian visa applicants and travellers. Same rules as the English ones. */

import type { Guide, GuideUi } from "./types";

const CEK =
  "Setelah reservasi diterima, buka halaman \"kelola pemesanan\" (manage booking) di situs maskapai dan cari dengan kode booking (PNR) dan nama belakang Anda. Jika muncul di sana, petugas check-in dan petugas visa juga bisa melihatnya. Simpan tangkapan layar selain email.";

const WAKTU =
  "Reservasi seperti ini hanya aktif sebentar (biasanya sekitar 48 jam) lalu kedaluwarsa. Pesan sesaat sebelum check-in atau janji temu visa, bukan berminggu-minggu sebelumnya.";

export const ID_GUIDES: Guide[] = [
  {
    key: "dummy-ticket-for-visa",
    slug: "reservasi-tiket-pesawat-untuk-visa",
    title: "Reservasi Tiket Pesawat untuk Visa: Asli atau PDF Palsu?",
    h1: "Reservasi tiket pesawat untuk pengajuan visa",
    description:
      "Apa itu reservasi tiket pesawat untuk visa (dummy ticket), kenapa kedutaan memintanya, cara membedakan reservasi asli dari PDF palsu, dan cara mendapatkan yang bisa diverifikasi.",
    intro:
      "Banyak kedutaan meminta itinerary penerbangan saat Anda mengajukan visa, tetapi menyarankan agar tiket tidak dibeli sebelum visa disetujui. Solusinya adalah reservasi asli yang disimpan sebentar di sistem maskapai.",
    sections: [
      {
        heading: "Kenapa kedutaan memintanya",
        paragraphs: [
          "Petugas visa ingin melihat bahwa perjalanan Anda jelas awal dan akhirnya, dan tanggalnya sesuai dengan formulir. Kedutaan negara Schengen, Jepang, Korea dan banyak negara lain biasanya mencantumkan itinerary atau reservasi penerbangan di daftar dokumen.",
        ],
      },
      {
        heading: "Asli atau PDF palsu",
        paragraphs: [
          "Reservasi asli punya kode booking (PNR) yang bisa dicek di situs maskapai. Dokumen palsu hanya terlihat seperti reservasi, tanpa apa pun di baliknya.",
          "Kedutaan bisa mengeceknya. Dokumen palsu bisa membuat visa ditolak dan memengaruhi pengajuan berikutnya. Gunakan hanya reservasi yang bisa Anda cek sendiri.",
        ],
      },
      {
        heading: "Data harus cocok",
        paragraphs: [
          "Nama harus sama persis dengan paspor. Tanggal harus sama dengan formulir dan bukti akomodasi.",
          WAKTU,
          CEK,
        ],
      },
    ],
    faqs: [
      {
        q: "Apakah ini legal?",
        a: "Reservasi penerbangan asli itu legal dan memang diminta banyak kedutaan. Dokumen yang diedit atau dipalsukan tidak legal.",
      },
      {
        q: "Bagaimana jika reservasi kedaluwarsa sebelum keputusan visa?",
        a: "Itu normal. Kedutaan menilai rencana perjalanan Anda dan menyarankan membeli tiket setelah visa disetujui.",
      },
    ],
  },
  {
    key: "flight-itinerary-for-schengen-visa",
    slug: "reservasi-pesawat-visa-schengen",
    title: "Reservasi Pesawat untuk Visa Schengen (Tanpa Beli Tiket)",
    h1: "Reservasi pesawat untuk pengajuan visa Schengen",
    description:
      "Sebagian besar kedutaan Schengen meminta reservasi penerbangan, bukan tiket yang sudah dibayar. Cara mendapatkan itinerary pulang-pergi yang bisa diverifikasi.",
    intro:
      "Pengajuan visa Schengen biasanya meminta itinerary penerbangan yang menunjukkan kapan Anda masuk dan keluar. Banyak kedutaan menyatakan tiket tidak perlu dibeli sebelum visa diberikan, dan reservasi sudah cukup.",
    sections: [
      {
        heading: "Yang diminta kedutaan",
        paragraphs: [
          "Penerbangan pulang-pergi, atau masuk dan keluar, sesuai tanggal di formulir. Nama harus sama persis dengan paspor.",
          "Persyaratan berbeda tiap negara dan pusat visa (VFS Global, TLScontact, BLS). Baca daftar dokumen dari kedutaan tempat Anda mengajukan.",
        ],
      },
      {
        heading: "Kapan memesan",
        paragraphs: [
          "Pesan satu atau dua hari sebelum janji temu agar reservasi masih aktif saat dokumen diperiksa. Wajar jika kedaluwarsa sebelum keputusan.",
          CEK,
        ],
      },
    ],
    faqs: [
      {
        q: "Perlu pulang-pergi atau sekali jalan?",
        a: "Sebagian besar pengajuan Schengen mengharapkan pulang-pergi, atau setidaknya penerbangan keluar dari kawasan Schengen yang terkonfirmasi.",
      },
    ],
  },
  {
    key: "flight-itinerary-japan-visa",
    slug: "reservasi-pesawat-visa-jepang",
    title: "Reservasi Pesawat untuk Visa Jepang",
    h1: "Reservasi pesawat untuk visa Jepang",
    description:
      "Kedutaan Jepang biasanya meminta jadwal perjalanan dan reservasi penerbangan. Apa yang perlu disiapkan dan cara mendapatkan reservasi yang bisa diverifikasi.",
    intro:
      "Pemegang paspor Indonesia biasanya perlu visa atau visa waiver untuk ke Jepang. Untuk pengajuan visa, Kedutaan Besar Jepang dan pusat visanya umumnya meminta jadwal perjalanan (schedule of stay) beserta bukti penerbangan seperti reservasi tiket.",
    sections: [
      {
        heading: "Yang perlu disiapkan",
        paragraphs: [
          "Reservasi pulang-pergi masuk dan keluar Jepang atas nama Anda sesuai paspor, dengan tanggal yang sama dengan formulir dan jadwal perjalanan.",
          "Persyaratan bisa berubah. Gunakan daftar dokumen terbaru dari Kedutaan Besar Jepang di Indonesia atau pusat visa resminya, dan cek juga apakah Anda memenuhi syarat visa waiver untuk paspor elektronik.",
        ],
      },
      { heading: "Cara yang benar", paragraphs: [WAKTU, CEK] },
    ],
    faqs: [
      {
        q: "Apakah harus membeli tiket untuk visa Jepang?",
        a: "Biasanya tidak. Daftar dokumen umumnya menerima reservasi atau itinerary, tetapi selalu cek daftar dari kedutaan.",
      },
    ],
  },
  {
    key: "proof-of-onward-travel",
    slug: "tiket-keluar-onward-ticket",
    title: "Tiket Keluar (Onward Ticket): Apa Itu dan Cara Mendapatkannya",
    h1: "Tiket keluar (onward ticket), dijelaskan",
    description:
      "Kenapa maskapai dan imigrasi meminta tiket keluar, apa yang dianggap bukti, dan cara mendapatkan reservasi penerbangan yang bisa diverifikasi tanpa membeli tiket.",
    intro:
      "Banyak negara hanya mengizinkan wisatawan masuk jika bisa membuktikan akan keluar lagi. Maskapai mengeceknya saat check-in, karena jika Anda ditolak masuk, maskapai harus menerbangkan Anda kembali. Jika bepergian dengan tiket sekali jalan, Anda perlu bukti penerbangan keluar atau pulang.",
    sections: [
      {
        heading: "Siapa yang meminta",
        paragraphs: [
          "Maskapai saat check-in dan petugas imigrasi saat kedatangan. Dalam praktiknya, yang paling sering meminta adalah maskapai.",
        ],
      },
      {
        heading: "Apa yang dianggap bukti",
        paragraphs: [
          "Penerbangan yang keluar dari negara tersebut, ke mana pun, dengan kode booking yang bisa dilihat petugas. Reservasi asli punya PNR yang bisa dicek di situs maskapai. PDF yang diedit bukan bukti dan bisa membuat Anda ditolak.",
          WAKTU,
          CEK,
        ],
      },
    ],
    faqs: [
      {
        q: "Apakah penerbangan keluar harus kembali ke Indonesia?",
        a: "Tidak. Cukup keluar dari negara yang Anda masuki. Biasanya dipilih penerbangan singkat ke negara tetangga.",
      },
    ],
  },
];

export const ID_UI: GuideUi = {
  home: "Beranda",
  guides: "Panduan",
  indexTitle: "Panduan tiket keluar dan reservasi pesawat untuk visa",
  indexDescription:
    "Negara mana yang meminta bukti keluar, apa yang dibutuhkan pengajuan visa, dan cara mendapatkan reservasi penerbangan yang bisa diverifikasi tanpa membeli tiket.",
  commonQuestions: "Pertanyaan umum",
  moreGuides: "Panduan lainnya",
  disclaimer:
    "Panduan ini adalah informasi umum, bukan nasihat hukum atau imigrasi. Aturan bisa berubah: selalu pastikan ke sumber resmi negara tujuan dan maskapai Anda sebelum berangkat.",
  ctaHeading: (price) =>
    price
      ? `Butuh reservasi penerbangan yang bisa diverifikasi? Mulai ${price}`
      : "Butuh reservasi penerbangan yang bisa diverifikasi?",
  ctaBody:
    "Dapatkan reservasi penerbangan asli lewat email dalam hitungan menit, dengan kode booking yang bisa dicek di situs maskapai.",
  ctaButton: "Dapatkan reservasi Anda",
  destinationsTitle: "Kapan Anda butuh bukti penerbangan",
  destinationsSub:
    "Panduan reservasi pesawat untuk visa dan tentang apa yang dicek maskapai dan imigrasi.",
  sourcesHeading: "Sumber",
  lastChecked: (date) => `Terakhir dicek: ${date}`,
};
