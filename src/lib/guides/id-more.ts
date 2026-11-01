/**
 * More Indonesian guides: flight reservations for UK, US, Canadian and Australian
 * visas for Indonesian applicants. Destination facts are checked against the
 * official sources cited.
 */

import { CEK, WAKTU } from "./id";
import type { Guide, GuideSource } from "./types";

const CHECKED = "2026-11-01";

type Tujuan = {
  id: string;
  negara: string;
  slug: string;
  fakta: string[];
  penerbangan: string;
  faqQ: string;
  faqA: string;
  sumber: GuideSource[];
};

const TUJUAN: Tujuan[] = [
  {
    id: "uk",
    negara: "Inggris",
    slug: "reservasi-pesawat-visa-inggris",
    fakta: [
      "Visa Standard Visitor untuk kunjungan hingga enam bulan biayanya £135. Ada juga visa kunjungan jangka panjang 2, 5 atau 10 tahun, dengan tinggal maksimal enam bulan per kunjungan.",
      "Anda bisa mengajukan hingga tiga bulan sebelum berangkat, dan keputusan biasanya keluar dalam tiga minggu setelah verifikasi identitas dan dokumen.",
    ],
    penerbangan:
      "UK Visas and Immigration meminta bukti bahwa Anda akan meninggalkan Inggris di akhir kunjungan dan mampu membayar perjalanan pulang atau lanjutan. Tiket tidak harus dibeli: reservasi dengan tanggal jelas, ditambah bukti dana, sudah menunjukkan rencana Anda.",
    faqQ: "Apakah harus membeli tiket untuk visa Inggris?",
    faqA: "Tidak. Anda perlu menunjukkan akan pulang di akhir kunjungan dan mampu membayar perjalanan. Reservasi dan bukti dana sudah cukup tanpa mempertaruhkan uang sebelum keputusan.",
    sumber: [
      { label: "GOV.UK: mengajukan Standard Visitor visa (bahasa Inggris)", url: "https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" },
      { label: "GOV.UK: dokumen Standard Visitor visa (bahasa Inggris)", url: "https://www.gov.uk/standard-visitor/documents-you-need" },
    ],
  },
  {
    id: "us",
    negara: "Amerika Serikat",
    slug: "reservasi-pesawat-visa-amerika",
    fakta: [
      "Sebagian besar pemohon mengisi formulir DS-160, membayar biaya visa, lalu wawancara di Kedutaan Besar AS di Jakarta atau Konsulat Jenderal AS di Surabaya. Waktu tunggu wawancara berubah-ubah, jadi cek sebelum menentukan tanggal.",
      "Biaya berubah pada 2025, ketika Kongres AS menambahkan biaya integritas visa. Cek total terbaru di travel.state.gov sebelum membayar.",
    ],
    penerbangan:
      "Departemen Luar Negeri AS menyarankan agar tidak memastikan rencana perjalanan atau membeli tiket sebelum visa terbit. Tiket tidak wajib untuk pengajuan, tetapi itinerary membantu Anda menjawab pertanyaan wawancara secara konsisten, dan reservasi sementara memberikannya tanpa membayar penerbangan.",
    faqQ: "Apakah perlu tiket pesawat untuk wawancara visa AS?",
    faqA: "Tidak. Departemen Luar Negeri AS menyarankan agar tidak membeli tiket sebelum visa terbit. Siapkan tanggal yang jelas; reservasi sementara membantu menjaga konsistensi.",
    sumber: [{ label: "Departemen Luar Negeri AS: visa kunjungan (bahasa Inggris)", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" }],
  },
  {
    id: "canada",
    negara: "Kanada",
    slug: "reservasi-pesawat-visa-kanada",
    fakta: [
      "Biaya visa kunjungan Kanada adalah 100 dolar Kanada per orang, dan sebagian besar pemohon juga membayar 85 dolar Kanada untuk biometrik (sidik jari dan foto) di pusat aplikasi visa.",
      "Waktu proses tergantung negara tempat Anda mengajukan, dan IRCC menerbitkan perkiraan terbaru di situsnya.",
    ],
    penerbangan:
      "IRCC mencantumkan detail penerbangan sebagai dokumen itinerary opsional untuk visa kunjungan. Reservasi yang sesuai tanggal rencana Anda menunjukkan perjalanan itu nyata tanpa membeli tiket sebelum keputusan.",
    faqQ: "Apakah reservasi penerbangan wajib untuk visa Kanada?",
    faqA: "Tidak, IRCC menyebutnya opsional. Tetapi reservasi yang sesuai tanggal tetap membantu menunjukkan rencana Anda nyata.",
    sumber: [{ label: "Pemerintah Kanada: mengajukan visa kunjungan (bahasa Inggris)", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html" }],
  },
  {
    id: "australia",
    negara: "Australia",
    slug: "reservasi-pesawat-visa-australia",
    fakta: [
      "Pemegang paspor Indonesia biasanya mengajukan Visitor visa (subclass 600) secara online lewat ImmiAccount. Biayanya ditetapkan Department of Home Affairs dan berubah hampir setiap tahun, jadi cek di situs resmi.",
    ],
    penerbangan:
      "Perwakilan Australia menyarankan agar tidak memastikan rencana perjalanan sebelum memegang visa yang sah, dan menyatakan Home Affairs tidak bertanggung jawab atas kerugian bila visa ditolak atau terlambat. Reservasi sementara memungkinkan Anda menunjukkan tanggal tanpa risiko itu.",
    faqQ: "Sebaiknya beli tiket sebelum visa Australia keluar?",
    faqA: "Perwakilan Australia menyarankan agar tidak memastikan rencana perjalanan sebelum visa terbit. Gunakan reservasi untuk perencanaan dan beli tiket setelah visa keluar.",
    sumber: [
      { label: "Department of Home Affairs: Visitor visa (subclass 600) (bahasa Inggris)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600" },
      { label: "Kedutaan Australia: setelah mengajukan, soal rencana perjalanan (bahasa Inggris)", url: "https://cambodia.embassy.gov.au/penh/after-you-lodge.html" },
    ],
  },
];

export const ID_MORE_GUIDES: Guide[] = TUJUAN.map((t) => ({
  key: `id-${t.id}-visa-itinerary`,
  slug: t.slug,
  title: `Reservasi Pesawat untuk Visa ${t.negara}: Tanpa Beli Tiket`,
  h1: `Reservasi pesawat untuk pengajuan visa ${t.negara}`,
  description: `Apa yang perlu ditunjukkan pemegang paspor Indonesia soal penerbangan saat mengajukan visa ${t.negara}, apa kata panduan resmi soal membeli tiket, dan cara mendapatkan reservasi yang bisa dicek.`,
  intro: `Pemegang paspor Indonesia perlu visa untuk berkunjung ke ${t.negara}, dan pengajuan lebih mudah dengan itinerary yang jelas. Berikut yang perlu Anda ketahui dan cara mengurus penerbangan tanpa membeli tiket yang mungkin tidak terpakai.`,
  sections: [
    { heading: `Visa ${t.negara}`, paragraphs: t.fakta },
    {
      heading: "Itinerary penerbangan",
      paragraphs: [
        t.penerbangan,
        "Penerbangan dari Indonesia biasanya berangkat dari Jakarta (Soekarno-Hatta), Bali (Ngurah Rai) atau Surabaya. Pastikan tanggal sama dengan formulir dan akomodasi, dan nama sama persis dengan paspor.",
        WAKTU,
        CEK,
      ],
    },
  ],
  faqs: [{ q: t.faqQ, a: t.faqA }],
  sources: t.sumber,
  checked: CHECKED,
}));
