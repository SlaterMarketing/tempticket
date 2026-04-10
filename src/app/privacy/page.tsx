export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-sm leading-relaxed text-foreground space-y-4">
      <h1 className="text-2xl font-bold mb-6">Privacy</h1>
      <p>
        <strong>Summary:</strong> We process email and travel-related personal
        data to run accounts, bookings, and mandatory receipts. Have counsel
        align this page with your actual data map (Neon, Resend, Stripe,
        Duffel, hosting).
      </p>
      <h2 className="text-lg font-semibold mt-8">What we collect</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Email address and session tokens for sign-in</li>
        <li>Passenger names, birth dates, contact details required by airlines</li>
        <li>Payment metadata from our payments processor</li>
        <li>Technical logs needed to operate and debug the service</li>
      </ul>
      <h2 className="text-lg font-semibold mt-8">Why we process it</h2>
      <p>
        To perform our contract with you, comply with legal obligations where
        they apply, and pursue legitimate interests (security, fraud
        prevention, product improvement) balanced against your rights.
      </p>
      <h2 className="text-lg font-semibold mt-8">Processors</h2>
      <p>
        Infrastructure and vendors may include database hosting (e.g. Neon),
        email delivery (e.g. Resend), payments (e.g. Stripe), and flight
        booking (Duffel and airlines). Their terms also apply to the portions
        of processing they perform.
      </p>
      <h2 className="text-lg font-semibold mt-8">Retention</h2>
      <p>
        We keep booking and billing records as needed for support, accounting,
        and legal holds—typically years, not weeks—but exact schedules should
        match your policy.
      </p>
      <h2 className="text-lg font-semibold mt-8">Rights</h2>
      <p>
        Depending on your region you may have rights to access, correct,
        delete, or object to certain processing. Contact us at the address you
        publish for your business; we will verify requests in line with law.
      </p>
    </div>
  );
}
