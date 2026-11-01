/**
 * Polish guides for travellers from Poland. Same rules as the English ones.
 * Country facts from the UK Foreign Office are for British passports, as the
 * pages say; readers are pointed to the Polish foreign ministry for their own.
 */

import type { Guide, GuideUi } from "./types";

const CHECKED = "2026-11-01";

export const SPRAWDZ =
  "Gdy dostaniesz rezerwację, otwórz na stronie linii lotniczej zakładkę „Zarządzaj rezerwacją” (Manage booking) i wyszukaj ją po kodzie rezerwacji (PNR) i nazwisku. Jeśli tam jest, zobaczy ją też pracownik przy odprawie. Zachowaj zrzut ekranu razem z e-mailem.";

export const CZAS =
  "Takie rezerwacje są utrzymywane krótko (zwykle około 48 godzin), a potem same wygasają. Zrób ją tuż przed odprawą, a nie kilka tygodni wcześniej.";

const ukNote = (body: string) => ({
  heading: "Co podaje brytyjskie MSZ (paszporty brytyjskie)",
  paragraphs: [
    body,
    "To zasady dla paszportów brytyjskich. Zasady dla polskiego paszportu sprawdź w serwisie MSZ „Informacje dla podróżujących” na gov.pl i u ambasady kraju docelowego.",
  ],
});

export const PL_GUIDES: Guide[] = [
  {
    key: "proof-of-onward-travel",
    slug: "bilet-powrotny-dowod-wyjazdu",
    title: "Bilet powrotny lub dalszy (onward ticket): co to jest i jak go zdobyć",
    h1: "Dowód wyjazdu z kraju: wszystko, co trzeba wiedzieć",
    description:
      "Dlaczego linie lotnicze i straż graniczna proszą o bilet powrotny lub dalszy, co się liczy jako dowód i jak zdobyć weryfikowalną rezerwację lotu bez kupowania biletu, z którego nie skorzystasz.",
    intro:
      "Wiele krajów wpuszcza turystów tylko wtedy, gdy pokażą, że wyjadą w terminie. Linie lotnicze egzekwują to już przy odprawie, bo jeśli odmówią ci wjazdu, muszą cię odwieźć na własny koszt. Jeśli lecisz w jedną stronę, możesz musieć pokazać lot dalej albo powrotny.",
    sections: [
      {
        heading: "Kto sprawdza",
        paragraphs: [
          "Sprawdzają w dwóch miejscach: linia lotnicza przy odprawie i straż graniczna po przylocie. W praktyce linia pyta dużo częściej, bo jej system sam oznacza pasażerów z biletem w jedną stronę do krajów z takim wymogiem.",
        ],
      },
      {
        heading: "Co się liczy jako dowód",
        paragraphs: [
          "Lot z danego kraju dokądkolwiek, z kodem rezerwacji, który pracownik może sprawdzić. Na granicach lądowych czasem wystarczy bilet na autobus lub prom, ale linie lotnicze zwykle chcą widzieć lot.",
          "Prawdziwa rezerwacja ma PNR, który da się znaleźć na stronie samej linii. Przerobiony PDF czy fałszywa rezerwacja nie są dowodem, a ich okazanie może skończyć się odmową albo gorzej.",
        ],
      },
      {
        heading: "Twoje opcje",
        paragraphs: [
          "Kupić w pełni zwrotny bilet i potem go anulować. Działa, ale zamraża sporą kwotę, a zwrot może trwać tygodniami.",
          "Kupić najtańszy lot dalej i z niego nie skorzystać. Proste, ale pieniądze przepadają.",
          "Skorzystać z usługi onward ticket. Za niewielką opłatą na twoje nazwisko jest przez krótki czas utrzymywana prawdziwa rezerwacja, potem zostaje zwolniona. Tak robi większość długoterminowych podróżników.",
        ],
      },
      { heading: "Jak sprawdzić, że jest prawdziwa", paragraphs: [SPRAWDZ, CZAS] },
    ],
    faqs: [
      {
        q: "Czy taka rezerwacja jest legalna?",
        a: "Rezerwowanie miejsca to zwykła czynność linii lotniczych, a konsulaty rutynowo przyjmują rezerwacje przy wnioskach wizowych. Niedopuszczalny jest sfałszowany dokument. Zawsze sprawdzaj zasady kraju docelowego w oficjalnym źródle.",
      },
      {
        q: "Czy lot dalej musi być do Polski?",
        a: "Nie. Wystarczy, że wylatujesz z kraju, do którego wjeżdżasz. Zwykle wybiera się krótki lot do sąsiedniego kraju.",
      },
    ],
  },
  {
    key: "one-way-ticket-denied-boarding",
    slug: "odmowa-wejscia-na-poklad-bilet-w-jedna-strone",
    title: "Odmowa wejścia na pokład z biletem w jedną stronę? Jak jej uniknąć",
    h1: "Bilet w jedną stronę i odmowa wejścia na pokład: jak uniknąć",
    description:
      "Dlaczego linie lotnicze nie wpuszczają pasażerów z biletem w jedną stronę, które kierunki wywołują kontrolę i jak w kilka minut załatwić rezerwację lotu dalej na lotnisku.",
    intro:
      "Jeśli linia przewiezie cię do kraju, a tam odmówią ci wjazdu, musi cię odwieźć i może dostać karę. Dlatego przy odprawie pasażerowie z biletem w jedną stronę muszą pokazać, że wyjadą. Jeśli nie możesz, mogą cię nie wpuścić na pokład.",
    sections: [
      {
        heading: "Jakie podróże wywołują kontrolę",
        paragraphs: [
          "Najczęściej loty w jedną stronę do krajów z wymogiem biletu dalej, takich jak Filipiny, Tajlandia, Indonezja (Bali), Kostaryka, Kolumbia, Peru i Nowa Zelandia. System linii oznacza cię automatycznie.",
        ],
      },
      {
        heading: "Rozwiązanie na lotnisku",
        paragraphs: [
          "Usługa onward ticket może w kilka minut wystawić prawdziwą rezerwację, z telefonu, przy stanowisku odprawy. Pokaż pracownikowi kod rezerwacji, a sprawdzi go w systemie.",
          SPRAWDZ,
        ],
      },
    ],
    faqs: [
      {
        q: "Czy linia naprawdę może mnie nie wpuścić?",
        a: "Tak. Jeśli nie spełniasz warunków wjazdu do kraju docelowego, linia może odmówić przewozu, a dowód wyjazdu jest jednym z nich.",
      },
    ],
  },
  {
    key: "onward-ticket-thailand",
    slug: "bilet-powrotny-tajlandia",
    title: "Czy do Tajlandii potrzebny jest bilet powrotny?",
    h1: "Bilet powrotny lub dalszy do Tajlandii: czy jest potrzebny?",
    description:
      "Wjazd do Tajlandii bez wizy zakłada wyjazd w dozwolonym terminie, a linie często proszą o dowód przy odprawie. Co przygotować.",
    intro:
      "Turyści wjeżdżający do Tajlandii bez wizy muszą wyjechać w dozwolonym terminie, a tajski urząd imigracyjny może poprosić o dowód wyjazdu. W praktyce najczęściej sprawdza się to przy stanowisku linii przed wylotem. Według petycji opublikowanej przez polskie MSZ obywatele RP mogą przebywać w Tajlandii bez wizy w celach turystycznych do 30 dni.",
    sections: [
      {
        heading: "Gdzie to sprawdzają",
        paragraphs: [
          "Linie latające do Tajlandii, zwłaszcza tanie, regularnie proszą pasażerów z biletem w jedną stronę o lot dalej. Bez niego mogą odmówić wejścia na pokład.",
          "Funkcjonariusze na tajskich lotniskach pytają rzadziej, ale wymóg istnieje i mogą go egzekwować.",
        ],
      },
      {
        heading: "Co pokazać",
        paragraphs: [
          "Lot z Tajlandii w ramach dozwolonego pobytu, z kodem rezerwacji. Popularne są krótkie loty do Kuala Lumpur, Singapuru, Ho Chi Minh lub Phnom Penh.",
          "Zasady wjazdu do Tajlandii znów zmieniły się 15 września 2026 r. Długość pobytu dla swojego paszportu sprawdź przed wylotem na oficjalnej stronie tajskich e-wiz lub w ambasadzie Tajlandii.",
        ],
      },
      { heading: "Jak zrobić to dobrze", paragraphs: [CZAS, SPRAWDZ] },
      ukNote(
        "Według brytyjskiego MSZ Brytyjczycy w ramach zwolnienia z wiz mogą przebywać do 30 dni, wyłącznie turystycznie. Urząd imigracyjny może poprosić o dowód wyjazdu i środki w wysokości co najmniej 10 000 batów na osobę. Wszyscy przyjezdni muszą online wypełnić kartę przylotu TDAC w ciągu trzech dni przed przyjazdem.",
      ),
    ],
    faqs: [
      {
        q: "Czy można polecieć do Tajlandii w jedną stronę?",
        a: "Można, ale przygotuj się na pokazanie lotu dalej przy odprawie. Bez niego mogą cię nie wpuścić na pokład.",
      },
    ],
    sources: [
      { label: "Polskie MSZ (gov.pl): petycja w sprawie okresu pobytu bezwizowego w Tajlandii dla obywateli RP", url: "https://www.gov.pl/web/dyplomacja/petycja-w-sprawie-wydluzenia-maksymalnego-okresu-pobytu-bezwizowego-w-tajlandii-w-celach-turystycznych-dla-obywateli-rp-z-30-do-60-dni" },
      { label: "UK Foreign Office: Thailand entry requirements", url: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements" },
    ],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-philippines",
    slug: "bilet-powrotny-filipiny",
    title: "Bilet powrotny na Filipiny: co sprawdzają linie lotnicze",
    h1: "Bilet dalszy lub powrotny na Filipiny",
    description:
      "Turyści wjeżdżający na Filipiny bez wizy potrzebują biletu wylotowego, a sprawdzają to i linie, i urząd imigracyjny. Jak przed wylotem zdobyć weryfikowalną rezerwację.",
    intro:
      "Filipiny należą do najbardziej rygorystycznych krajów pod względem biletu dalszego. Turyści bez wizy muszą mieć bilet z kraju w ramach dozwolonego pobytu, a pytają o niego i linie lotnicze, i Bureau of Immigration.",
    sections: [
      {
        heading: "Czego się spodziewać",
        paragraphs: [
          "Przy odprawie na lot do Manili, Cebu lub Clark spodziewaj się pytania o lot dalej lub powrotny. Funkcjonariusz po przylocie też może poprosić o niego.",
          "Lot dalej musi opuszczać Filipiny w okresie, w którym możesz zostać. Bezwizowy okres dla swojego paszportu sprawdź w Philippine Bureau of Immigration lub w ambasadzie Filipin.",
        ],
      },
      {
        heading: "Wybór lotu dalej",
        paragraphs: ["Popularne są krótkie loty regionalne do Hongkongu, Tajpej, Kuala Lumpur lub Singapuru. Kierunek nie ma znaczenia, byle był poza krajem."],
      },
      { heading: "Jak zrobić to dobrze", paragraphs: [CZAS, SPRAWDZ] },
      ukNote(
        "Według brytyjskiego MSZ od większości brytyjskich turystów oczekuje się dowodu wyjazdu lub powrotu, a urzędnicy i linie mogą o niego poprosić. Każdy musi w ciągu trzech dni przed przylotem zarejestrować się w bezpłatnym systemie eTravel i okazać kod QR.",
      ),
    ],
    faqs: [
      {
        q: "Czy bez biletu dalej odmówią mi wejścia na pokład?",
        a: "To realne ryzyko. Linie latające na Filipiny często odmawiają przewozu pasażerom z biletem w jedną stronę, którzy nie mogą pokazać wyjazdu.",
      },
    ],
    sources: [{ label: "UK Foreign Office: Philippines entry requirements", url: "https://www.gov.uk/foreign-travel-advice/philippines/entry-requirements" }],
    checked: CHECKED,
  },
  {
    key: "onward-ticket-bali-indonesia",
    slug: "bilet-powrotny-bali-indonezja",
    title: "Czy na Bali i do Indonezji potrzebny jest bilet powrotny?",
    h1: "Bilet powrotny lub dalszy na Bali: czy jest potrzebny?",
    description:
      "Wiza po przylocie do Indonezji (VOA) wymaga biletu powrotnego lub dalszego, a linie sprawdzają go przed wejściem na pokład. Co pokazać i jak zdobyć weryfikowalną rezerwację.",
    intro:
      "Wiza po przylocie (VOA), na której jedzie większość turystów na Bali, zakłada wyjazd w dozwolonym terminie. Indonezyjski urząd imigracyjny podaje jako warunki elektronicznej wizy po przylocie (e-VOA) i zwykłej VOA paszport ważny co najmniej sześć miesięcy oraz bilet powrotny lub do innego kraju.",
    sections: [
      {
        heading: "Gdzie to sprawdzają",
        paragraphs: [
          "Na lotach do Denpasaru i Dżakarty lot dalej często sprawdza się przy odprawie. Indonezyjski urząd imigracyjny może o niego zapytać przy wydawaniu lub użyciu wizy po przylocie.",
          "Aktualne zasady wizowe dla swojego paszportu sprawdź przed wyjazdem na oficjalnej stronie indonezyjskiego urzędu imigracyjnego.",
        ],
      },
      {
        heading: "Wybór lotu dalej",
        paragraphs: ["Loty z Bali do Singapuru, Kuala Lumpur lub Perth są krótkie i często wybierane do rezerwacji dalszej podróży."],
      },
      { heading: "Jak zrobić to dobrze", paragraphs: [CZAS, SPRAWDZ] },
      ukNote(
        "Według brytyjskiego MSZ 30-dniowa wiza po przylocie dla Brytyjczyków kosztuje 500 000 rupii i wymaga dowodu wyjazdu lub powrotu. Bali pobiera od zagranicznych turystów opłatę 150 000 rupii.",
      ),
    ],
    faqs: [
      {
        q: "Czy można polecieć na Bali w jedną stronę?",
        a: "Polecieć można, ale przygotuj się na pokazanie lotu powrotnego lub dalszego przy odprawie albo po przylocie. To jeden z warunków wizy po przylocie.",
      },
    ],
    sources: [
      { label: "Indonezyjski urząd imigracyjny: FAQ wizowe (warunki e-VOA)", url: "https://www.imigrasi.go.id/faq/visa?lang=en-US" },
      { label: "UK Foreign Office: Indonesia entry requirements", url: "https://www.gov.uk/foreign-travel-advice/indonesia/entry-requirements" },
    ],
    checked: CHECKED,
  },
];

export const PL_UI: GuideUi = {
  home: "Strona główna",
  guides: "Poradniki",
  indexTitle: "Poradniki o biletach dalszych i rezerwacjach lotów do wiz",
  indexDescription:
    "Które kraje wymagają dowodu wyjazdu, czego potrzebują wnioski wizowe i jak zdobyć weryfikowalną rezerwację lotu bez kupowania biletu.",
  commonQuestions: "Częste pytania",
  moreGuides: "Więcej poradników",
  disclaimer:
    "Te poradniki to ogólne informacje, a nie porada prawna ani imigracyjna. Zasady mogą się zmieniać: przed podróżą zawsze sprawdź oficjalne źródła kraju docelowego i swoją linię lotniczą.",
  ctaHeading: (price) =>
    price ? `Potrzebujesz weryfikowalnej rezerwacji lotu? Od ${price}` : "Potrzebujesz weryfikowalnej rezerwacji lotu?",
  ctaBody: "Dostań prawdziwą rezerwację lotu e-mailem w kilka minut, z kodem, który znajdziesz na stronie linii lotniczej.",
  ctaButton: "Zdobądź rezerwację",
  destinationsTitle: "Kiedy potrzebny jest dowód lotu",
  destinationsSub: "Poradniki o rezerwacjach lotów do wiz i o tym, co sprawdzają linie i straż graniczna.",
  sourcesHeading: "Źródła",
  lastChecked: (date) => `Ostatnio sprawdzono: ${date}`,
};
