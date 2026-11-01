/**
 * More Indonesian guides: denied boarding on one-way tickets, the fake flight
 * confirmation page, and onward tickets for Thailand and the Philippines.
 * Facts from the UK Foreign Office are for British passports, as the pages say.
 */

import { CEK, WAKTU } from "./id";
import type { Guide } from "./types";

const CHECKED = "2026-11-01";

const catatanInggris = (isi: string) => ({
  heading: "Kata Kementerian Luar Negeri Inggris (paspor Inggris)",
  paragraphs: [
    isi,
    "Ini aturan untuk pemegang paspor Inggris. Pemegang paspor Indonesia biasanya bebas visa di negara ASEAN, tetapi lama tinggal dan syaratnya bisa berbeda. Cek di situs resmi kedutaan negara tujuan atau portal Kemlu (Safe Travel).",
  ],
});

export const ID_EXTRA_GUIDES: Guide[] = [
  {
    key: "one-way-ticket-denied-boarding",
    slug: "ditolak-naik-pesawat-tiket-sekali-jalan",
    title: "Ditolak Naik Pesawat Karena Tiket Sekali Jalan? Cara Menghindarinya",
    h1: "Ditolak naik pesawat dengan tiket sekali jalan: cara menghindarinya",
    description:
      "Kenapa maskapai menolak penumpang bertiket sekali jalan, negara mana yang memicu pemeriksaan, dan cara mendapatkan reservasi penerbangan lanjutan dalam hitungan menit di bandara.",
    intro:
      "Jika maskapai membawa Anda ke suatu negara lalu Anda ditolak masuk, maskapai wajib memulangkan Anda dan bisa didenda. Karena itu petugas check-in meminta penumpang bertiket sekali jalan membuktikan akan keluar lagi. Jika tidak bisa, Anda bisa tidak diizinkan naik.",
    sections: [
      {
        heading: "Perjalanan yang sering diperiksa",
        paragraphs: [
          "Penerbangan sekali jalan ke negara yang mensyaratkan tiket keluar, seperti Filipina, Thailand, Kosta Rika, Kolombia, Peru dan Selandia Baru, paling sering diperiksa. Sistem maskapai menandai Anda secara otomatis.",
        ],
      },
      {
        heading: "Solusi di bandara",
        paragraphs: [
          "Layanan tiket lanjutan bisa menerbitkan reservasi asli dalam beberapa menit, dari ponsel Anda, langsung di konter check-in. Tunjukkan kode booking ke petugas agar bisa dicek di sistem mereka.",
          CEK,
        ],
      },
    ],
    faqs: [
      {
        q: "Apakah maskapai benar-benar bisa menolak saya naik?",
        a: "Ya. Jika Anda tidak memenuhi syarat masuk negara tujuan, maskapai boleh menolak mengangkut Anda, dan bukti keluar adalah salah satu syaratnya.",
      },
    ],
  },
  {
    key: "fake-flight-confirmation-email",
    slug: "email-konfirmasi-tiket-pesawat-palsu",
    title: "Email Konfirmasi Tiket Pesawat Palsu: Risikonya dan Alternatif Legal",
    h1: "Mau pakai konfirmasi tiket palsu? Baca ini dulu",
    description:
      "Kenapa konfirmasi penerbangan yang diedit atau palsu bisa membuat visa ditolak, larangan 10 tahun di Inggris atau temuan misrepresentasi di AS, dan cara mendapatkan reservasi asli yang bisa dicek.",
    intro:
      "Kalau butuh bukti penerbangan untuk visa atau check-in, menggoda untuk mengedit booking lama atau memakai generator email konfirmasi. Jangan. Mudah ketahuan, dan akibatnya jauh lebih berat dari satu perjalanan yang batal. Ada cara murah dan legal untuk mendapat kode booking asli.",
    sections: [
      {
        heading: "Bagaimana yang palsu ketahuan",
        paragraphs: [
          "Booking asli punya kode (PNR) yang ada di sistem reservasi maskapai. Petugas check-in tinggal memasukkannya, dan booking Anda muncul atau tidak. Kedutaan bisa melakukan hal yang sama. PDF yang diedit atau email buatan punya kode yang tidak mengarah ke mana pun.",
        ],
      },
      {
        heading: "Akibatnya jika ketahuan",
        paragraphs: [
          "Inggris: panduan Home Office menyatakan permohonan wajib ditolak jika lebih mungkin pemohon memakai tipu daya, termasuk dokumen palsu, dan permohonan berikutnya harus ditolak selama 10 tahun.",
          "Amerika Serikat: menurut pasal 212(a)(6)(C)(i) Immigration and Nationality Act, siapa pun yang mencari visa dengan penipuan atau dengan sengaja memberi keterangan palsu tentang fakta penting tidak memenuhi syarat visa. Temuan ini melekat dan hanya bisa diatasi dengan waiver.",
          "Schengen: Kode Visa UE menyatakan visa harus ditolak jika ada keraguan yang wajar tentang keaslian dokumen pendukung atau kebenaran isinya.",
        ],
      },
      {
        heading: "Alternatif yang legal",
        paragraphs: [
          "Reservasi penerbangan yang ditahan atas nama Anda untuk waktu singkat memberi persis apa yang diharapkan dari yang palsu: konfirmasi dengan kode booking asli, dengan biaya jauh di bawah harga tiket. Karena asli, maskapai dan kedutaan bisa menemukannya.",
          WAKTU,
          CEK,
        ],
      },
    ],
    faqs: [
      { q: "Apakah reservasi penerbangan untuk visa itu legal?", a: "Ya. Itu booking asli atas nama Anda. Banyak kedutaan, termasuk negara Schengen, menyarankan tidak membeli tiket sebelum keputusan visa, dan reservasi adalah cara yang umum untuk menunjukkan rencana." },
    ],
    sources: [
      { label: "GOV.UK: panduan suitability tentang tipu daya dan dokumen palsu (bahasa Inggris)", url: "https://www.gov.uk/government/publications/suitability-false-representations-immigration-staff-guidance/part-suitability-deception-false-representations-false-documents-and-non-disclosure-of-relevant-facts-accessible" },
      { label: "US Foreign Affairs Manual 9 FAM 302.9: misrepresentation (bahasa Inggris)", url: "https://fam.state.gov/fam/09FAM/09FAM030209.html" },
      { label: "Kode Visa UE (Regulasi 810/2009), Pasal 32", url: "https://eur-lex.europa.eu/eli/reg/2009/810/oj" },
    ],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-thailand",
    slug: "tiket-keluar-thailand",
    title: "Perlu Tiket Keluar ke Thailand? Sebelum Terbang Sekali Jalan",
    h1: "Apakah perlu tiket keluar untuk ke Thailand?",
    description:
      "Masuk Thailand tanpa visa berarti harus keluar dalam masa tinggal yang diizinkan, dan maskapai sering meminta bukti saat check-in. Apa yang perlu disiapkan.",
    intro:
      "Wisatawan yang masuk Thailand tanpa visa harus keluar dalam masa tinggal yang diizinkan, dan imigrasi Thailand bisa meminta bukti perjalanan keluar. Dalam praktiknya, pemeriksaan paling sering terjadi di konter maskapai sebelum berangkat.",
    sections: [
      {
        heading: "Di mana diperiksa",
        paragraphs: [
          "Maskapai ke Thailand, terutama maskapai berbiaya rendah, sering meminta penumpang bertiket sekali jalan menunjukkan penerbangan keluar. Tanpa itu, Anda bisa ditolak naik.",
          "Petugas imigrasi di bandara Thailand lebih jarang bertanya, tetapi aturannya ada dan bisa diterapkan.",
        ],
      },
      {
        heading: "Apa yang ditunjukkan",
        paragraphs: [
          "Penerbangan keluar Thailand dalam masa tinggal Anda, dengan kode booking. Pilihan populer adalah penerbangan singkat ke Kuala Lumpur, Singapura, Ho Chi Minh atau Jakarta.",
          "Aturan masuk Thailand kembali berubah pada 15 September 2026. Cek lama tinggal untuk paspor Anda di situs resmi e-Visa Thailand atau Kedutaan Thailand di Jakarta sebelum berangkat.",
        ],
      },
      { heading: "Agar benar", paragraphs: [WAKTU, CEK] },
      catatanInggris(
        "Menurut Kemlu Inggris, warga Inggris bisa tinggal hingga 30 hari dengan bebas visa, hanya untuk wisata. Imigrasi bisa meminta bukti perjalanan keluar dan dana minimal 10.000 baht per orang. Semua pendatang wajib mengisi Thailand Digital Arrival Card (TDAC) online dalam tiga hari sebelum tiba.",
      ),
    ],
    faqs: [
      { q: "Bisakah ke Thailand dengan tiket sekali jalan?", a: "Bisa, tetapi siapkan penerbangan keluar untuk ditunjukkan saat check-in. Tanpa itu Anda bisa ditolak naik." },
    ],
    sources: [{ label: "UK Foreign Office: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" }],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-philippines",
    slug: "tiket-keluar-filipina",
    title: "Tiket Keluar untuk Filipina: Apa yang Dicek Maskapai",
    h1: "Tiket keluar untuk masuk Filipina",
    description:
      "Wisatawan bebas visa ke Filipina perlu tiket keluar, dan maskapai serta imigrasi sama-sama memeriksa. Cara menyiapkan reservasi yang bisa dicek sebelum terbang.",
    intro:
      "Filipina termasuk negara paling ketat soal tiket keluar. Wisatawan bebas visa harus memegang tiket keluar dalam masa tinggal yang diizinkan, dan maskapai maupun Bureau of Immigration memintanya.",
    sections: [
      {
        heading: "Yang perlu diantisipasi",
        paragraphs: [
          "Untuk penerbangan ke Manila, Cebu atau Clark, bersiaplah diminta penerbangan lanjutan atau pulang saat check-in. Petugas imigrasi saat tiba juga bisa memintanya.",
          "Penerbangan keluar harus meninggalkan Filipina dalam masa tinggal Anda. Cek masa bebas visa untuk paspor Anda di Bureau of Immigration Filipina atau Kedutaan Filipina di Jakarta.",
        ],
      },
      {
        heading: "Memilih penerbangan keluar",
        paragraphs: ["Penerbangan regional singkat ke Hong Kong, Taipei, Kuala Lumpur, Singapura atau Jakarta adalah pilihan umum. Tujuan tidak penting asalkan keluar dari Filipina."],
      },
      { heading: "Agar benar", paragraphs: [WAKTU, CEK] },
      catatanInggris(
        "Menurut Kemlu Inggris, sebagian besar wisatawan Inggris diharapkan punya bukti perjalanan pulang atau lanjutan, dan petugas imigrasi serta maskapai bisa memintanya. Semua pendatang wajib mendaftar gratis di eTravel dalam tiga hari sebelum tiba dan menunjukkan kode QR.",
      ),
    ],
    faqs: [
      { q: "Apakah saya bisa ditolak naik tanpa tiket keluar?", a: "Risikonya nyata. Maskapai ke Filipina sering menolak penumpang bertiket sekali jalan yang tidak bisa menunjukkan jalan keluar." },
    ],
    sources: [{ label: "UK Foreign Office: Philippines entry requirements", url: "https://www.gov.uk/foreign-travel-advice/philippines/entry-requirements" }],
    checked: CHECKED,
  },
];
