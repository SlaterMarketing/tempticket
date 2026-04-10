"use client";

import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Search,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  PlaceAutocomplete,
  type SelectedPlace,
} from "@/components/place-autocomplete";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  COUNTRY_DIAL_CODES,
  formatE164,
  getNavigatorDialLocale,
  nationalDigitCount,
  orderedDialCodesForLocale,
} from "@/lib/phone/country-dial-codes";

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

const fieldShell =
  "rounded-xl border-2 border-[color:var(--brand-blue)]/12 bg-white/90 shadow-sm transition focus-within:border-[color:var(--brand-blue)]/35 focus-within:shadow-md";

const STEP_TOTAL = 2;

function TypeformStep({
  title,
  description,
  panelClass,
  children,
}: {
  title: string;
  description?: string;
  panelClass: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[color:var(--brand-blue)]/12 shadow-[0_20px_50px_-14px_rgba(34,98,187,0.14)] ring-1 ring-[color:var(--brand-blue)]/8 md:rounded-3xl",
        panelClass,
      )}
    >
      <div className="flex shrink-0 flex-col gap-2 px-5 pb-2 pt-5 md:px-8 md:pt-7">
        <h2 className="text-[1.65rem] font-semibold leading-snug tracking-tight text-[color:var(--brand-blue)] md:text-3xl md:leading-tight">
          {title}
        </h2>
        {description ? (
          <p className="max-w-lg text-[0.9375rem] leading-relaxed text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 md:px-8 md:pb-8">
        <div className="pt-4">{children}</div>
      </div>
    </section>
  );
}

export function BookFlow({
  receiptEmailDefault,
}: {
  receiptEmailDefault: string | null;
}) {
  const [originPlace, setOriginPlace] = useState<SelectedPlace | null>({
    code: "BKK",
    label: "Suvarnabhumi Airport (BKK) · Bangkok, Thailand",
  });
  const [destinationPlace, setDestinationPlace] = useState<SelectedPlace | null>(
    {
      code: "KUL",
      label:
        "Kuala Lumpur International Airport (KUL) · Sepang, Malaysia",
    },
  );
  const [date, setDate] = useState(
    () => new Date(Date.now() + 86400000 * 14).toISOString().slice(0, 10),
  );
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingOffer, setLoadingOffer] = useState(false);
  const [selected, setSelected] = useState<SlimOffer | null>(null);
  const [fullPassengers, setFullPassengers] = useState<OfferPassenger[]>([]);
  const [currency, setCurrency] = useState<CheckoutCurrency>("usd");

  const [wizardStep, setWizardStep] = useState<1 | 2>(1);

  const [dialCodeOptions, setDialCodeOptions] =
    useState(COUNTRY_DIAL_CODES);

  useEffect(() => {
    const { region, language } = getNavigatorDialLocale();
    const lang =
      language ??
      (typeof navigator !== "undefined"
        ? navigator.language.split("-")[0]
        : undefined);
    setDialCodeOptions(orderedDialCodesForLocale(region, lang));
  }, []);

  const [passengerForms, setPassengerForms] = useState<
    Record<
      string,
      {
        given_name: string;
        family_name: string;
        born_on: string;
        gender: "m" | "f";
        email: string;
        phoneDialCode: string;
        phoneNational: string;
      }
    >
  >({});

  const refreshPassengerDefaults = useCallback(
    (list: OfferPassenger[]) => {
      const next: typeof passengerForms = {};
      const defaultEmail = receiptEmailDefault?.trim() ?? "";
      for (const p of list) {
        next[p.id] = {
          given_name: "",
          family_name: "",
          born_on: "1990-01-01",
          gender: "m",
          email: defaultEmail,
          phoneDialCode: "+66",
          phoneNational: "",
        };
      }
      setPassengerForms(next);
    },
    [receiptEmailDefault],
  );

  function wizardGoBack() {
    if (wizardStep === 2) {
      setWizardStep(1);
      setSelected(null);
      setFullPassengers([]);
      setPassengerForms({});
    }
  }

  async function runSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!originPlace?.code?.trim() || !destinationPlace?.code?.trim()) {
      toast.error("Choose origin and destination from the suggestions");
      return;
    }
    setLoadingSearch(true);
    setSelected(null);
    setFullPassengers([]);
    setWizardStep(1);
    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slices: [
            {
              origin: originPlace.code.toUpperCase(),
              destination: destinationPlace.code.toUpperCase(),
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
      const list = (data.offers ?? []) as SlimOffer[];
      if (!list.length) {
        toast.message(
          "No pay-later fares on this search—try other dates or airports.",
        );
        return;
      }
      setLoadingOffer(true);
      await loadOfferDetails(list[0]!);
    } finally {
      setLoadingSearch(false);
      setLoadingOffer(false);
    }
  }

  async function loadOfferDetails(offer: SlimOffer) {
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
      setWizardStep(2);
    } catch {
      toast.error("Could not load offer");
      setSelected(null);
    }
  }

  async function startCheckout() {
    if (!selected || !fullPassengers.length) return;
    for (const p of fullPassengers) {
      const f = passengerForms[p.id];
      if (
        !f?.given_name ||
        !f.family_name ||
        !f.email ||
        nationalDigitCount(f.phoneNational) < 6
      ) {
        toast.error("Complete all passenger fields");
        return;
      }
      const e164 = formatE164(f.phoneDialCode, f.phoneNational);
      if (e164.length < 8 || e164.replace(/\D/g, "").length > 15) {
        toast.error("Enter a valid phone number");
        return;
      }
    }
    const passengers = fullPassengers.map((p) => {
      const f = passengerForms[p.id]!;
      return {
        id: p.id,
        given_name: f.given_name,
        family_name: f.family_name,
        born_on: f.born_on,
        gender: f.gender,
        email: f.email,
        phone_number: formatE164(f.phoneDialCode, f.phoneNational),
      };
    });

    const firstId = fullPassengers[0]?.id;
    const guestReceipt =
      firstId && passengerForms[firstId]?.email?.trim().toLowerCase();
    const receipt =
      receiptEmailDefault?.trim().toLowerCase() || guestReceipt || "";
    if (!receipt) {
      toast.error("Enter an email for your booking and receipt");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receipt)) {
      toast.error("Enter a valid email address");
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
      let data: { error?: string; url?: string } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        toast.error(`Checkout failed (server error ${res.status})`);
        return;
      }
      if (!res.ok) {
        toast.error(data.error ?? `Checkout failed (${res.status})`);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Checkout did not return a payment link");
      }
    } catch {
      toast.error("Checkout failed—check your connection and try again");
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

  const primaryButtonClass = cn(
    buttonVariants({ size: "lg" }),
    "inline-flex h-11 min-w-[11rem] items-center justify-center gap-2 rounded-xl border-0 bg-[color:var(--brand-green)] px-6 text-base font-semibold text-white shadow-md transition duration-200 hover:bg-[color:var(--brand-green)]/90 hover:shadow-lg active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-subtle-how pt-4 md:pt-6">
      <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-4 pb-4 md:max-w-4xl">
        <div className="flex shrink-0 flex-col gap-3 pt-2 md:pt-2">
          <div className="grid min-h-[2.75rem] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
            <div className="flex items-center justify-start">
              {wizardStep > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="-ml-2 gap-1 text-[color:var(--brand-blue)] hover:bg-[color:var(--brand-blue)]/8"
                  onClick={wizardGoBack}
                >
                  <ChevronLeft className="size-4" aria-hidden />
                  Back
                </Button>
              ) : null}
            </div>
            <h1 className="min-w-0 px-1 text-center text-2xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-3xl">
              Book your reservation
            </h1>
            <div className="flex items-center justify-end">
              <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.2em] text-[color:var(--brand-blue)]/55">
                {wizardStep} / {STEP_TOTAL}
              </p>
            </div>
          </div>
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--brand-blue)]/12"
            role="progressbar"
            aria-valuenow={wizardStep}
            aria-valuemin={1}
            aria-valuemax={STEP_TOTAL}
          >
            <div
              className="h-full rounded-full bg-[color:var(--brand-green)] transition-[width] duration-500 ease-out"
              style={{ width: `${(wizardStep / STEP_TOTAL) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex min-h-0 flex-1 flex-col md:mt-6">
          {wizardStep === 1 ? (
            <TypeformStep
              title="Find a flight"
              description="Type a city, country or airport name."
              panelClass="bg-feature-card-sky"
            >
              <form
                onSubmit={runSearch}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6"
              >
                <div className="sm:col-span-2 lg:col-span-2">
                  <PlaceAutocomplete
                    id="book-origin"
                    label="From"
                    value={originPlace}
                    onValueChange={setOriginPlace}
                    placeholder="City, country, or airport"
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-2">
                  <PlaceAutocomplete
                    id="book-destination"
                    label="To"
                    value={destinationPlace}
                    onValueChange={setDestinationPlace}
                    placeholder="City, country, or airport"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2 lg:col-span-2">
                  <Label className="text-[color:var(--brand-blue)]">
                    Departure date
                  </Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={cn("h-11", fieldShell)}
                  />
                </div>
                <div className="sm:col-span-2 lg:col-span-6">
                  <Button
                    type="submit"
                    disabled={loadingSearch || loadingOffer}
                    className={primaryButtonClass}
                  >
                    {loadingSearch
                      ? "Searching…"
                      : loadingOffer
                        ? "Finding a fare…"
                        : "Search flights"}
                    <Search className="size-4 opacity-90" aria-hidden />
                  </Button>
                </div>
              </form>
            </TypeformStep>
          ) : null}

          {wizardStep === 2 && selected && fullPassengers.length > 0 ? (
            <TypeformStep
              title="Passenger details & payment"
              description="Names must match travel documents."
              panelClass="bg-feature-card-mint"
            >
              <div className="space-y-6">
                {fullPassengers.map((p, idx) => {
                  const f = passengerForms[p.id];
                  if (!f) return null;
                  return (
                    <div key={p.id}>
                      {idx > 0 ? (
                        <Separator className="mb-6 bg-[color:var(--brand-blue)]/10" />
                      ) : null}
                      <p className="mb-4 text-sm font-bold text-[color:var(--brand-blue)]">
                        Passenger {idx + 1}{" "}
                        <span className="font-normal text-muted-foreground">
                          ({p.type})
                        </span>
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            Gender (as on passport)
                          </Label>
                          <Select
                            value={f.gender}
                            onValueChange={(v) =>
                              updatePassenger(p.id, { gender: v as "m" | "f" })
                            }
                          >
                            <SelectTrigger
                              className={cn(
                                "h-11 px-2.5 py-0 shadow-sm",
                                fieldShell,
                              )}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="m">M</SelectItem>
                              <SelectItem value="f">F</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            Date of birth
                          </Label>
                          <Input
                            type="date"
                            value={f.born_on}
                            onChange={(e) =>
                              updatePassenger(p.id, {
                                born_on: e.target.value,
                              })
                            }
                            className={cn("h-11", fieldShell)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            First name(s)
                          </Label>
                          <Input
                            value={f.given_name}
                            onChange={(e) =>
                              updatePassenger(p.id, {
                                given_name: e.target.value,
                              })
                            }
                            className={cn("h-11", fieldShell)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            Last name(s)
                          </Label>
                          <Input
                            value={f.family_name}
                            onChange={(e) =>
                              updatePassenger(p.id, {
                                family_name: e.target.value,
                              })
                            }
                            className={cn("h-11", fieldShell)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            Email
                          </Label>
                          <Input
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={f.email}
                            onChange={(e) =>
                              updatePassenger(p.id, { email: e.target.value })
                            }
                            className={cn("h-11", fieldShell)}
                          />
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            Used on your airline booking and for your payment receipt
                            and confirmation.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            Phone
                          </Label>
                          <div className="flex gap-2">
                            <Select
                              value={f.phoneDialCode}
                              onValueChange={(v) => {
                                if (v)
                                  updatePassenger(p.id, { phoneDialCode: v });
                              }}
                            >
                              <SelectTrigger
                                className={cn(
                                  "h-11 w-[5.75rem] shrink-0 px-2 py-0 shadow-sm sm:w-[6.25rem]",
                                  fieldShell,
                                )}
                                aria-label="Country calling code"
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="max-h-64">
                                {dialCodeOptions.map((opt) => (
                                  <SelectItem key={opt.dial + opt.country} value={opt.dial}>
                                    <span className="font-mono text-xs sm:text-sm">
                                      {opt.dial}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {" "}
                                      {opt.country}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Input
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel-national"
                              placeholder="812 345 678"
                              value={f.phoneNational}
                              onChange={(e) =>
                                updatePassenger(p.id, {
                                  phoneNational: e.target.value,
                                })
                              }
                              className={cn("h-11 min-w-0 flex-1", fieldShell)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex flex-col gap-4 border-t border-[color:var(--brand-blue)]/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="space-y-2">
                    <Label className="text-[color:var(--brand-blue)]">
                      Pay service fee in
                    </Label>
                    <Select
                      value={currency}
                      onValueChange={(v) => setCurrency(v as CheckoutCurrency)}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-11 w-full px-2.5 py-0 shadow-sm sm:w-[200px]",
                          fieldShell,
                        )}
                      >
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
                  <Button
                    type="button"
                    className={cn(primaryButtonClass, "gap-2 self-stretch sm:self-auto")}
                    onClick={startCheckout}
                  >
                    <CreditCard className="size-4 opacity-90" aria-hidden />
                    Pay service fee & reserve
                    <ChevronRight className="size-4 opacity-90" aria-hidden />
                  </Button>
                </div>
              </div>
            </TypeformStep>
          ) : null}
        </div>
      </div>
    </div>
  );
}
