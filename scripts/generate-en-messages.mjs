import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

/** Keep in sync with src/i18n/config.ts */
const ALL_LOCALES = [
  "en",
  "es",
  "pt-BR",
  "fr",
  "de",
  "it",
  "nl",
  "pl",
  "ru",
  "uk",
  "tr",
  "ar",
  "hi",
  "id",
  "vi",
  "th",
  "ms",
  "fil",
  "ja",
  "ko",
  "zh-CN",
  "zh-TW",
  "bn",
  "ta",
  "te",
  "mr",
  "gu",
  "kn",
  "ml",
  "pa",
  "ur",
  "fa",
  "he",
  "el",
  "cs",
  "sk",
  "hu",
  "ro",
  "bg",
  "hr",
  "sr",
  "sl",
  "sv",
  "da",
  "nb",
  "fi",
  "et",
  "lv",
  "lt",
  "sw",
];

const en = {
  Metadata: {
    defaultTitle: "TempTicket — onward travel proof for nomads",
    defaultDescription:
      "Real, verifiable flight reservations for onward-travel checks. Built for digital nomads.",
    homeTitle: "TempTicket — onward travel proof for nomads",
    homeDescription:
      "Real, verifiable flight reservations for onward-travel checks. Built for digital nomads.",
    bookTitle: "Book a reservation — TempTicket",
    bookDescription:
      "Find a flight hold and complete your onward travel reservation.",
    bookConfirmationTitle: "Payment received — TempTicket",
    bookConfirmationDescription:
      "We are confirming your reservation with the airline.",
    loginTitle: "Sign in — TempTicket",
    loginDescription:
      "Magic link sign-in with a 6-digit code to view your bookings.",
    bookingsTitle: "My bookings — TempTicket",
    bookingsDescription: "Orders and airline references for your account.",
    termsTitle: "Terms of service — TempTicket",
    termsDescription: "Terms of service for TempTicket.",
    privacyTitle: "Privacy — TempTicket",
    privacyDescription: "How TempTicket processes personal data.",
  },
  SiteHeader: {
    brandAlt: "TempTicket",
    myBookings: "My bookings",
    admin: "Admin",
    signOut: "Sign out",
    signIn: "Sign in",
    book: "Book",
  },
  LocaleSwitcher: {
    ariaLabel: "Language",
    language: "Language",
  },
  PlaceAutocomplete: {
    searching: "Searching…",
    empty: "No places found. Try another spelling or city.",
    city: "City",
    airport: "Airport",
    couldNotSearch: "Could not search places.",
  },
  BookingTimeline: {
    stepLabel: "Step {step}",
    steps: [
      {
        label: "01",
        title: "Enter your info",
        body: "Route, dates, and passenger details.",
      },
      {
        label: "02",
        title: "Make a payment",
        body: "Secure checkout—pricing upfront.",
      },
      {
        label: "03",
        title: "Get your reference",
        body: "Verify on the airline when it's live.",
      },
    ],
  },
  BookFlow: {
    toastChoosePlaces: "Choose origin and destination from the suggestions",
    toastSearchFailed: "Search failed",
    toastNoPayLater:
      "No pay-later fares on this search—try other dates or airports.",
    toastOfferExpired: "Offer expired—search again",
    toastPassengerSlots: "Could not load passenger slots for this offer",
    toastLoadOffer: "Could not load offer",
    toastCompleteFields: "Complete all passenger fields",
    toastPhoneInvalid: "Enter a valid phone number",
    toastReceiptEmail: "Enter an email for your booking and receipt",
    toastEmailInvalid: "Enter a valid email address",
    toastCheckoutServerError: "Checkout failed (server error {status})",
    toastCheckoutFailed: "Checkout failed ({status})",
    toastNoPaymentLink: "Checkout did not return a payment link",
    toastCheckoutConnection:
      "Checkout failed—check your connection and try again",
    back: "Back",
    title: "Book your reservation",
    stepFindTitle: "Find a flight",
    stepFindDescription: "Type a city, country or airport name.",
    from: "From",
    to: "To",
    placePlaceholder: "City, country, or airport",
    swapAria: "Swap origin and destination",
    swapTitle: "Swap origin and destination",
    departureDate: "Departure date",
    searchBlurb:
      "We search pay-later fares first—complete the airline booking after you pay our small service fee.",
    searching: "Searching…",
    findingFare: "Finding a fare…",
    searchFlights: "Search flights",
    stepPayTitle: "Passenger details & payment",
    stepPayDescription: "Names must match travel documents.",
    passenger: "Passenger {index}",
    genderLabel: "Gender (as on passport)",
    genderM: "M",
    genderF: "F",
    dob: "Date of birth",
    firstName: "First name(s)",
    lastName: "Last name(s)",
    email: "Email",
    emailPlaceholder: "you@example.com",
    emailHint:
      "Used on your airline booking and for your payment receipt and confirmation.",
    phone: "Phone",
    dialCodeAria: "Country calling code",
    phonePlaceholder: "812 345 678",
    payInLabel: "Pay service fee in",
    preparingCheckout: "Preparing checkout…",
    payButton: "Pay service fee & reserve",
    demoOriginLabel: "Suvarnabhumi Airport (BKK) · Bangkok, Thailand",
    demoDestinationLabel:
      "Kuala Lumpur International Airport (KUL) · Sepang, Malaysia",
  },
  BookConfirmation: {
    backHome: "Back to home",
    badge: "Payment received",
    title: "We're on it",
    body: "We're confirming your flight reservation with the airline. You'll get an email with booking details shortly.",
    detail:
      "Check your inbox (and spam) for the confirmation. Use the airline reference on the carrier site when you need proof of onward travel.",
    bookAnother: "Book another",
    signInHistory: "Sign in for history",
  },
  Login: {
    title: "Sign in",
    description:
      "Sign in to see bookings linked to your account or your email. We send a 6-digit code—no password.",
    email: "Email",
    sendCode: "Send code",
    codeLabel: "6-digit code",
    verify: "Verify",
    differentEmail: "Use a different email",
    toastSendFailed: "Could not send code",
    toastCodeSent: "Check your email for a 6-digit code",
    toastInvalid: "Invalid code",
    toastSignedIn: "Signed in",
  },
  LoginPage: {
    loading: "Loading…",
  },
  Bookings: {
    title: "My bookings",
    subtitle:
      "Bookings tied to your account or made with this email before you signed in. After payment we email you the airline reference.",
    newBooking: "New booking",
    orders: "Orders",
    ordersDescription:
      "Use the airline reference on the carrier site when you need proof of onward travel.",
    empty: "No bookings yet.",
    colCreated: "Created",
    colStatus: "Status",
    colAirline: "Airline",
    colReference: "Reference",
    colMode: "Mode",
    needsAttention: "Needs attention",
    needsAttentionDescription:
      "If a booking failed after payment, contact support with the id and Stripe receipt.",
  },
  Terms: {
    title: "Terms of service",
    lead: "Last updated: April 2026. These terms are a starter template only—have qualified counsel review them before you invite paying customers.",
    serviceHeading: "Service",
    serviceBody:
      "TempTicket provides a paid service to arrange a real flight reservation through our booking partners for travellers who need documentation of onward travel. We do not guarantee any particular immigration or airline outcome. Officers and carriers apply their own rules.",
    legalHeading: "Not legal advice",
    legalBody:
      "Nothing on this site is legal, immigration, or tax advice. Comply with laws and licenses that apply to your business and the jurisdictions where you market and sell.",
    paymentsHeading: "Payments & refunds",
    paymentsBody:
      "Service fees are collected at checkout. If we cannot complete the booked flow after successful payment, we will work with you on a refund or alternate offer per our published policy. Chargebacks may be contested when the service was delivered as described.",
    useHeading: "Acceptable use",
    useBody:
      "You may not use the service to misrepresent travel intent to governments or airlines, to test stolen payment methods, or in any way that violates supplier terms or applicable law.",
    liabilityHeading: "Limited liability",
    liabilityBody:
      "To the maximum extent permitted by law, TempTicket is not liable for denied boarding, denied entry, missed connections, or indirect damages arising from use of the service.",
  },
  Privacy: {
    title: "Privacy",
    summary:
      "Summary: We process email and travel-related personal data to run accounts, bookings, and mandatory receipts. Have counsel align this page with your actual data map (Neon, Resend, Stripe, Duffel, hosting).",
    collectHeading: "What we collect",
    collectItems: [
      "Email address and session tokens for sign-in",
      "Passenger names, birth dates, contact details required by airlines",
      "Payment metadata from our payments processor",
      "Technical logs needed to operate and debug the service",
    ],
    whyHeading: "Why we process it",
    whyBody:
      "To perform our contract with you, comply with legal obligations where they apply, and pursue legitimate interests (security, fraud prevention, product improvement) balanced against your rights.",
    processorsHeading: "Processors",
    processorsBody:
      "Infrastructure and vendors may include database hosting (e.g. Neon), email delivery (e.g. Resend), payments (e.g. Stripe), and flight booking (Duffel and airlines). Their terms also apply to the portions of processing they perform.",
    retentionHeading: "Retention",
    retentionBody:
      "We keep booking and billing records as needed for support, accounting, and legal holds—typically years, not weeks—but exact schedules should match your policy.",
    rightsHeading: "Rights",
    rightsBody:
      "Depending on your region you may have rights to access, correct, delete, or object to certain processing. Contact us at the address you publish for your business; we will verify requests in line with law.",
  },
  Toasts: {
    paymentSuccess: "Payment successful.",
    bookingsSuccess:
      "Payment received. Your booking will update in a moment.",
  },
  BackToTop: {
    ariaLabel: "Back to top",
  },
  Home: {
    bookNow: "Book now",
    heroBadge: "Live reservations",
    heroHeadingLead: "Flight booking ",
    heroHeadingAccent: "verified in minutes",
    heroSub:
      "Real flight reservations you can verify on the airlines' website. Stress free travel for nomads.",
    howItWorks: "How it works",
    trustStats: [
      {
        stat: "Minutes",
        label: "Typical turnaround when airlines cooperate",
      },
      { stat: "Real PNR", label: "Look it up on the carrier when issued" },
      { stat: "24/7", label: "Support when something needs a human" },
    ],
    featuresTitle: "Everything you need for peace of mind",
    featuresSub:
      "Fast, verifiable onward travel proof—without the anxiety of buying a ticket you won't use.",
    features: [
      {
        title: "Authentic reservations",
        body: "A genuine airline record when confirmation comes through—not a decorative PDF.",
      },
      {
        title: "Instant delivery",
        body: "Most flows complete quickly so you can attach proof the same day.",
      },
      {
        title: "Carrier-verifiable",
        body: "Use the airline's tools to pull up the booking when someone asks.",
      },
      {
        title: "Save money",
        body: "Pay a small service fee instead of a refundable long-haul fare.",
      },
      {
        title: "Flexible plans",
        body: "Adjust dates when your itinerary changes—within airline policy windows.",
      },
      {
        title: "Human support",
        body: "Stuck fares and edge cases can escalate to our team from the queue.",
      },
    ],
    processTitle: "Simple booking process",
    commonQuestions: "Common questions",
    personasTitle: "is perfect for",
    personas: [
      {
        title: "Visa applicants",
        body: "When consulates want an itinerary, not necessarily a paid fare.",
      },
      {
        title: "Frequent flyers",
        body: "Repeatable proof for airlines that enforce return/onward rules.",
      },
      {
        title: "Travelers",
        body: "Simple verification story for border and carrier checks.",
      },
      {
        title: "Digital nomads",
        body: "Stay flexible without parking money in unused long-haul fares.",
      },
    ],
    socialTitle: "Trusted by travelers worldwide",
    socialNote:
      "Sample reviews—swap for real testimonials when you have them.",
    testimonials: [
      {
        flag: "🇺🇸",
        name: "Sample · Alex M.",
        quote: "PNR checked out on the airline site the same week I applied.",
        avatar: "AM",
      },
      {
        flag: "🇩🇪",
        name: "Sample · Leni K.",
        quote:
          "Straightforward flow and quick answers when I asked about a route.",
        avatar: "LK",
      },
      {
        flag: "🇬🇧",
        name: "Sample · James T.",
        quote: "Got me through check-in with a one-way ticket policy.",
        avatar: "JT",
      },
    ],
    visaTitle: "Greater flexibility when securing your visa",
    visaBody:
      "Many missions describe accepting an itinerary or reservation rather than a fully paid ticket. Confirm on the official site for your case—we provide a real reservation you can verify while you wait.",
    visaSteps: [
      {
        n: "1",
        title: "Read the official checklist",
        body: "Embassies differ—some want a reservation, others a ticket. Start from their page, not a blog.",
      },
      {
        n: "2",
        title: "Match dates to your story",
        body: "Pick a route and timing that align perfectly with the application you're filing.",
      },
      {
        n: "3",
        title: "Verify on the airline",
        body: "If the record is live, practice pulling it up on the carrier's site before your appointment.",
      },
    ],
    embassyPublish: "What embassies publish",
    embassyFigures: [
      {
        quote:
          "Reservation for return ticket, not necessary to purchase ticket before visa is granted…",
        caption: "Theme from public embassy FAQ (Norway)",
      },
      {
        quote:
          "Airline reservation… with travel reservation number… not necessarily a ticketed reservation.",
        caption: "Theme from public Schengen guidance (Spain)",
      },
      {
        quote: "Verifiable flight reservation… not a purchased ticket.",
        caption: "Theme from public visa information (India)",
      },
    ],
    faqTitle: "Do you need help?",
    faqFooter:
      "More questions? Start a booking—we surface timing and carrier notes as you go.",
    faqItems: [
      {
        q: "What is TempTicket?",
        a: "A service that helps you obtain a real, verifiable flight reservation (with a booking reference when the airline confirms it) for onward-travel and visa scenarios—without paying for a full fare you may not use.",
      },
      {
        q: "How long is the reservation valid?",
        a: "Validity depends on the airline's fare rules, hold policy, or ticketing timeline. We surface what we can during booking; always confirm timing against your embassy or carrier requirements.",
      },
      {
        q: "Can I verify it on the airline website?",
        a: "When the airline issues a live record, you can typically look it up on their manage-booking or check-my-trip flow. If a route isn't eligible for a hold, you may need an instant ticket instead.",
      },
      {
        q: "Is this legal advice or a visa guarantee?",
        a: "No. Immigration rules change by country and officer. We provide a reservation service only—check official sources for your situation.",
      },
    ],
    ctaTitle: "Traveling is hard enough. Make proof of onward easier with",
    ctaPriceLine: "From {price} · minutes, not guesswork",
    footerTagline: "Onward travel proof for nomads",
    footerServices: "Services",
    footerAccount: "Account",
    footerLegal: "Legal",
    footerBook: "Book a reservation",
    footerSignIn: "Sign in",
    footerMyBookings: "My bookings",
    footerTerms: "Terms",
    footerPrivacy: "Privacy",
    footerCopyright: "All rights reserved.",
    footerBackTop: "Back to top",
    ticketFrom: "From {price}",
    ticketDeparture: "Departure",
    ticketArrival: "Arrival",
    ticketBangkok: "Bangkok",
    ticketTokyo: "Tokyo",
    ticketPassenger: "Passenger",
    ticketPassengerVal: "Nomad · 1 adult",
    ticketRecord: "Record locator",
    ticketVerified: "Verified",
  },
};

const messagesDir = join(root, "messages");
mkdirSync(messagesDir, { recursive: true });
writeFileSync(join(messagesDir, "en.json"), JSON.stringify(en, null, 2));
console.log("Wrote messages/en.json");

for (const loc of ALL_LOCALES) {
  if (loc === "en") continue;
  const path = join(messagesDir, `${loc}.json`);
  writeFileSync(path, "{}\n");
}
console.log(`Wrote ${ALL_LOCALES.length - 1} fallback locale JSON files.`);
