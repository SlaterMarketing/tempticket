"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCallback, useState } from "react";
import { toast } from "sonner";

type SlimOffer = {
  id: string;
  total_amount: string;
  total_currency: string;
  expires_at: string | null;
  slices: {
    origin: string;
    destination: string;
    departing_at: string | null;
    duration: string | null;
    segments: { marketing_carrier: string; departing_at: string }[];
  }[];
  payment_requirements?: { requires_instant_payment?: boolean } | null;
};

type OfferPassenger = {
  id: string;
  type: string;
};

type CheckoutCurrency = "usd" | "eur" | "gbp" | "thb";

const titles = ["mr", "ms", "mrs", "miss", "dr"] as const;

export function BookFlow({
  receiptEmailDefault,
}: {
  /** When set (signed-in), used for Stripe receipt; guests enter email below. */
  receiptEmailDefault: string | null;
}) {
  const [origin, setOrigin] = useState("BKK");
  const [destination, setDestination] = useState("KUL");
  const [date, setDate] = useState(
    () => new Date(Date.now() + 86400000 * 14).toISOString().slice(0, 10),
  );
  const [offers, setOffers] = useState<SlimOffer[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selected, setSelected] = useState<SlimOffer | null>(null);
  const [fullPassengers, setFullPassengers] = useState<OfferPassenger[]>([]);
  const [currency, setCurrency] = useState<CheckoutCurrency>("usd");
  const [receiptEmail, setReceiptEmail] = useState("");

  const [passengerForms, setPassengerForms] = useState<
    Record<
      string,
      {
        title: (typeof titles)[number];
        given_name: string;
        family_name: string;
        born_on: string;
        gender: "m" | "f";
        email: string;
        phone_number: string;
      }
    >
  >({});

  const refreshPassengerDefaults = useCallback(
    (list: OfferPassenger[]) => {
      const next: typeof passengerForms = {};
      for (const p of list) {
        next[p.id] = {
          title: "mr",
          given_name: "",
          family_name: "",
          born_on: "1990-01-01",
          gender: "m",
          email: "",
          phone_number: "+66",
        };
      }
      setPassengerForms(next);
    },
    [],
  );

  async function runSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoadingSearch(true);
    setSelected(null);
    setOffers([]);
    setFullPassengers([]);
    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slices: [
            {
              origin: origin.toUpperCase(),
              destination: destination.toUpperCase(),
              departure_date: date,
            },
          ],
          passengers: [{ type: "adult" }],
          cabin_class: "economy",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Search failed");
        return;
      }
      setOffers(data.offers ?? []);
      if (!data.offers?.length) toast.message("No offers—try other dates.");
    } finally {
      setLoadingSearch(false);
    }
  }

  async function selectOffer(offer: SlimOffer) {
    setSelected(offer);
    try {
      const res = await fetch(`/api/offers/${offer.id}`);
      const data = await res.json();
      if (!res.ok) {
        toast.error("Offer expired—search again");
        setSelected(null);
        return;
      }
      const pax = data.passengers as OfferPassenger[] | undefined;
      if (!pax?.length) {
        toast.error("Could not load passenger slots for this offer");
        setSelected(null);
        return;
      }
      setFullPassengers(pax);
      refreshPassengerDefaults(pax);
    } catch {
      toast.error("Could not load offer");
      setSelected(null);
    }
  }

  async function startCheckout() {
    if (!selected || !fullPassengers.length) return;
    for (const p of fullPassengers) {
      const f = passengerForms[p.id];
      if (!f?.given_name || !f.family_name || !f.email || !f.phone_number) {
        toast.error("Complete all passenger fields");
        return;
      }
    }
    const passengers = fullPassengers.map((p) => ({
      id: p.id,
      ...passengerForms[p.id]!,
    }));

    const receipt =
      receiptEmailDefault?.trim().toLowerCase() || receiptEmail.trim().toLowerCase();
    if (!receipt) {
      toast.error("Enter an email for your payment receipt");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receipt)) {
      toast.error("Enter a valid email for your receipt");
      return;
    }

    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer_id: selected.id,
          passengers,
          currency,
          receipt_email: receipt,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Checkout failed");
        return;
      }
      if (data.url) {
        window.location.href = data.url as string;
      }
    } catch {
      toast.error("Checkout failed");
    }
  }

  function updatePassenger(
    id: string,
    patch: Partial<(typeof passengerForms)[string]>,
  ) {
    setPassengerForms((prev) => ({
      ...prev,
      [id]: { ...prev[id]!, ...patch },
    }));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book</h1>
        <p className="text-muted-foreground mt-2">
          Search a one-way leg, pick an offer, enter passenger details as on your
          passport, then pay the service fee.{" "}
          <strong>Sign in is optional</strong>—use it to see bookings made with
          your email.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>
            Use 3-letter IATA codes (example: BKK → KUL).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={runSearch} className="grid gap-4 sm:grid-cols-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Input
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                maxLength={3}
              />
            </div>
            <div className="space-y-2">
              <Label>To</Label>
              <Input
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                maxLength={3}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="sm:col-span-4">
              <Button type="submit" disabled={loadingSearch}>
                {loadingSearch ? "Searching…" : "Search flights"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {offers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Offers</CardTitle>
            <CardDescription>
              Instant-payment fares are ticketed via Duffel balance; holds use
              pay-later when the airline allows it.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {offers.map((o) => (
              <button
                type="button"
                key={o.id}
                onClick={() => selectOffer(o)}
                className={`w-full rounded-md border p-4 text-left transition hover:bg-muted/50 ${
                  selected?.id === o.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">
                    {o.slices
                      .map((s) => `${s.origin} → ${s.destination}`)
                      .join(", ")}
                  </span>
                  <span>
                    {o.total_amount} {o.total_currency}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {o.payment_requirements?.requires_instant_payment === false ? (
                    <Badge variant="secondary">Hold possible</Badge>
                  ) : (
                    <Badge variant="outline">Instant payment</Badge>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {selected && fullPassengers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Passengers</CardTitle>
            <CardDescription>
              Must match travel documents. Use E.164 phone (e.g. +66…).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {fullPassengers.map((p, idx) => {
              const f = passengerForms[p.id];
              if (!f) return null;
              return (
                <div key={p.id}>
                  {idx > 0 ? <Separator className="mb-6" /> : null}
                  <p className="text-sm font-medium mb-3">
                    Passenger {idx + 1} ({p.type})
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Select
                        value={f.title}
                        onValueChange={(v) =>
                          updatePassenger(p.id, {
                            title: v as (typeof titles)[number],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {titles.map((t) => (
                            <SelectItem key={t} value={t}>
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select
                        value={f.gender}
                        onValueChange={(v) =>
                          updatePassenger(p.id, { gender: v as "m" | "f" })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m">M</SelectItem>
                          <SelectItem value="f">F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Given names</Label>
                      <Input
                        value={f.given_name}
                        onChange={(e) =>
                          updatePassenger(p.id, { given_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Family name</Label>
                      <Input
                        value={f.family_name}
                        onChange={(e) =>
                          updatePassenger(p.id, { family_name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Born on</Label>
                      <Input
                        type="date"
                        value={f.born_on}
                        onChange={(e) =>
                          updatePassenger(p.id, { born_on: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={f.email}
                        onChange={(e) =>
                          updatePassenger(p.id, { email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label>Phone</Label>
                      <Input
                        value={f.phone_number}
                        onChange={(e) =>
                          updatePassenger(p.id, {
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {!receiptEmailDefault ? (
              <div className="space-y-2 rounded-md border bg-muted/30 p-4">
                <Label htmlFor="receipt-email">Email for receipt</Label>
                <Input
                  id="receipt-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={receiptEmail}
                  onChange={(e) => setReceiptEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Stripe and your booking confirmation go here. Sign in later
                  with the same email to see history.
                </p>
              </div>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="space-y-2">
                <Label>Pay service fee in</Label>
                <Select
                  value={currency}
                  onValueChange={(v) => setCurrency(v as CheckoutCurrency)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                    <SelectItem value="thb">THB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" size="lg" onClick={startCheckout}>
                Pay service fee & reserve
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
