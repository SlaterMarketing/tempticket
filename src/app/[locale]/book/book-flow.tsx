"use client";

import {
  ArrowDownUp,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  Plane,
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
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  CHECKOUT_CURRENCY_OPTIONS,
  type CheckoutCurrencyCode,
} from "@/lib/pricing";
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


const fieldShell =
  "rounded-xl border-2 border-[color:var(--brand-blue)]/12 bg-white/90 shadow-sm transition focus-within:border-[color:var(--brand-blue)]/35 focus-within:shadow-md";

const STEP_TOTAL = 2;

function TypeformStep({
  title,
  description,
  panelClass,
  /** Applied to the inner wrapper around children (e.g. flex column that grows to fill the card). */
  contentClassName,
  children,
}: {
  title: string;
  description?: string;
  panelClass: string;
  contentClassName?: string;
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
        <div className={cn("pt-4", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}

export function BookFlow({
  receiptEmailDefault,
  locale,
}: {
  receiptEmailDefault: string | null;
  locale: string;
}) {
  const t = useTranslations("BookFlow");
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
  useEffect(() => {
    setOriginPlace((o) =>
      o?.code === "BKK" ? { ...o, label: t("demoOriginLabel") } : o,
    );
    setDestinationPlace((d) =>
      d?.code === "KUL" ? { ...d, label: t("demoDestinationLabel") } : d,
    );
  }, [t]);
  const [date, setDate] = useState(
    () => new Date(Date.now() + 86400000 * 14).toISOString().slice(0, 10),
  );
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingOffer, setLoadingOffer] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [selected, setSelected] = useState<SlimOffer | null>(null);
  const [fullPassengers, setFullPassengers] = useState<OfferPassenger[]>([]);
  const [currency, setCurrency] = useState<CheckoutCurrencyCode>("usd");

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

  function swapOriginAndDestination() {
    setOriginPlace(destinationPlace);
    setDestinationPlace(originPlace);
  }

  async function runSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!originPlace?.code?.trim() || !destinationPlace?.code?.trim()) {
      toast.error(t("toastChoosePlaces"));
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
        toast.error(data.error ?? t("toastSearchFailed"));
        return;
      }
      const list = (data.offers ?? []) as SlimOffer[];
      if (!list.length) {
        toast.message(t("toastNoPayLater"));
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
        toast.error(t("toastOfferExpired"));
        setSelected(null);
        return;
      }
      const pax = data.passengers as OfferPassenger[] | undefined;
      if (!pax?.length) {
        toast.error(t("toastPassengerSlots"));
        setSelected(null);
        return;
      }
      setFullPassengers(pax);
      refreshPassengerDefaults(pax);
      setWizardStep(2);
    } catch {
      toast.error(t("toastLoadOffer"));
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
        toast.error(t("toastCompleteFields"));
        return;
      }
      const e164 = formatE164(f.phoneDialCode, f.phoneNational);
      if (e164.length < 8 || e164.replace(/\D/g, "").length > 15) {
        toast.error(t("toastPhoneInvalid"));
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
      toast.error(t("toastReceiptEmail"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(receipt)) {
      toast.error(t("toastEmailInvalid"));
      return;
    }

    setLoadingCheckout(true);
    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offer_id: selected.id,
          passengers,
          currency,
          receipt_email: receipt,
          locale,
        }),
      });
      let data: { error?: string; url?: string } = {};
      try {
        data = (await res.json()) as typeof data;
      } catch {
        toast.error(t("toastCheckoutServerError", { status: res.status }));
        setLoadingCheckout(false);
        return;
      }
      if (!res.ok) {
        toast.error(
          data.error ?? t("toastCheckoutFailed", { status: res.status }),
        );
        setLoadingCheckout(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      toast.error(t("toastNoPaymentLink"));
      setLoadingCheckout(false);
    } catch {
      toast.error(t("toastCheckoutConnection"));
      setLoadingCheckout(false);
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
                  {t("back")}
                </Button>
              ) : null}
            </div>
            <h1 className="min-w-0 px-1 text-center text-2xl font-bold tracking-tight text-[color:var(--brand-blue)] md:text-3xl">
              {t("title")}
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
              title={t("stepFindTitle")}
              description={t("stepFindDescription")}
              panelClass="bg-feature-card-sky"
              contentClassName="flex min-h-0 flex-1 flex-col"
            >
              <form
                onSubmit={runSearch}
                className="grid min-h-0 flex-1 grid-cols-1 gap-6 min-[520px]:grid-cols-2 min-[520px]:gap-8 min-[520px]:items-stretch"
              >
                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex min-w-0 items-end gap-2">
                    <div className="min-w-0 flex-1">
                      <PlaceAutocomplete
                        id="book-origin"
                        label={t("from")}
                        value={originPlace}
                        onValueChange={setOriginPlace}
                        placeholder={t("placePlaceholder")}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className={cn(
                        "mb-px h-11 w-11 shrink-0 rounded-xl border-2 border-[color:var(--brand-blue)]/20 bg-white/90 text-[color:var(--brand-blue)] shadow-sm hover:bg-[color:var(--brand-blue)]/8",
                        "focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2",
                      )}
                      onClick={swapOriginAndDestination}
                      aria-label={t("swapAria")}
                      title={t("swapTitle")}
                    >
                      <ArrowDownUp className="size-4" aria-hidden />
                    </Button>
                  </div>
                  <PlaceAutocomplete
                    id="book-destination"
                    label={t("to")}
                    value={destinationPlace}
                    onValueChange={setDestinationPlace}
                    placeholder={t("placePlaceholder")}
                  />
                  <div className="space-y-2">
                    <Label className="text-[color:var(--brand-blue)]">
                      {t("departureDate")}
                    </Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={cn("h-11", fieldShell)}
                    />
                  </div>
                </div>

                <div className="flex min-h-[14rem] min-w-0 flex-col gap-4 min-[520px]:min-h-0">
                  <div className="flex min-h-0 flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[color:var(--brand-blue)]/20 bg-white/45 px-5 py-8 text-center sm:px-6">
                    <Plane
                      className="size-12 shrink-0 text-[color:var(--brand-blue)]/30 sm:size-16"
                      aria-hidden
                    />
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem]">
                      {t("searchBlurb")}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={loadingSearch || loadingOffer}
                    className={cn(primaryButtonClass, "w-full shrink-0")}
                  >
                    {loadingSearch
                      ? t("searching")
                      : loadingOffer
                        ? t("findingFare")
                        : t("searchFlights")}
                    <Search className="size-4 opacity-90" aria-hidden />
                  </Button>
                </div>
              </form>
            </TypeformStep>
          ) : null}

          {wizardStep === 2 && selected && fullPassengers.length > 0 ? (
            <TypeformStep
              title={t("stepPayTitle")}
              description={t("stepPayDescription")}
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
                        {t("passenger", { index: idx + 1 })}{" "}
                        <span className="font-normal text-muted-foreground">
                          ({p.type})
                        </span>
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            {t("genderLabel")}
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
                              <SelectItem value="m">{t("genderM")}</SelectItem>
                              <SelectItem value="f">{t("genderF")}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            {t("dob")}
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
                            {t("firstName")}
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
                            {t("lastName")}
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
                            {t("email")}
                          </Label>
                          <Input
                            type="email"
                            autoComplete="email"
                            placeholder={t("emailPlaceholder")}
                            value={f.email}
                            onChange={(e) =>
                              updatePassenger(p.id, { email: e.target.value })
                            }
                            className={cn("h-11", fieldShell)}
                          />
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {t("emailHint")}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[color:var(--brand-blue)]">
                            {t("phone")}
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
                                aria-label={t("dialCodeAria")}
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
                              placeholder={t("phonePlaceholder")}
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
                      {t("payInLabel")}
                    </Label>
                    <Select
                      value={currency}
                      onValueChange={(v) =>
                        setCurrency(v as CheckoutCurrencyCode)
                      }
                    >
                      <SelectTrigger
                        className={cn(
                          "h-11 w-full min-w-[14rem] px-2.5 py-0 font-medium shadow-sm sm:max-w-none sm:w-[min(100%,20rem)]",
                          fieldShell,
                        )}
                      >
                        <SelectValue>
                          {currency.toUpperCase()}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="max-h-72">
                        {CHECKOUT_CURRENCY_OPTIONS.map((opt) => (
                          <SelectItem
                            key={opt.value}
                            value={opt.value}
                            title={opt.name}
                          >
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="button"
                    className={cn(primaryButtonClass, "gap-2 self-stretch sm:self-auto")}
                    disabled={loadingCheckout}
                    aria-busy={loadingCheckout}
                    onClick={startCheckout}
                  >
                    {loadingCheckout ? (
                      <>
                        {t("preparingCheckout")}
                        <Loader2
                          className="size-4 shrink-0 animate-spin opacity-90"
                          aria-hidden
                        />
                      </>
                    ) : (
                      <>
                        <CreditCard className="size-4 opacity-90" aria-hidden />
                        {t("payButton")}
                        <ChevronRight className="size-4 opacity-90" aria-hidden />
                      </>
                    )}
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
