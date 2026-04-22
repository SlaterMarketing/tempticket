"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  bookingId: string;
  status: string;
  stripePaymentStatus: string | null;
  duffelOrderId: string | null;
};

type ActionResponse = {
  ok?: boolean;
  error?: string;
  order_id?: string;
  booking_reference?: string | null;
  refund_id?: string;
  amount?: number;
  currency?: string;
};

async function callAction(
  url: string,
  success: (data: ActionResponse) => string,
): Promise<"ok" | "error"> {
  const res = await fetch(url, { method: "POST" });
  const data = (await res.json().catch(() => ({}))) as ActionResponse;
  if (res.ok && data.ok) {
    toast.success(success(data));
    return "ok";
  }
  toast.error(data.error ?? `Request failed (${res.status})`);
  return "error";
}

export function BookingActions({
  bookingId,
  status,
  stripePaymentStatus,
  duffelOrderId,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState<"retry" | "refund" | null>(null);

  const canRetry =
    (status === "failed" || status === "paid") &&
    (stripePaymentStatus === "paid" ||
      stripePaymentStatus === "partially_refunded") &&
    !duffelOrderId;

  const canRefund =
    stripePaymentStatus === "paid" &&
    status !== "cancelled" &&
    !duffelOrderId;

  async function onRetry() {
    if (!confirm("Retry this booking? Duffel will be asked to create the order again.")) {
      return;
    }
    setBusy("retry");
    const result = await callAction(
      `/api/admin/bookings/${bookingId}/retry`,
      (d) => `Order created${d.booking_reference ? `: ${d.booking_reference}` : ""}`,
    );
    setBusy(null);
    if (result === "ok") router.refresh();
  }

  async function onRefund() {
    if (
      !confirm(
        "Refund the service fee for this booking? This cancels the booking in the DB. Any Duffel order must be cancelled separately.",
      )
    ) {
      return;
    }
    setBusy("refund");
    const result = await callAction(
      `/api/admin/bookings/${bookingId}/refund`,
      (d) =>
        d.amount != null && d.currency
          ? `Refunded ${(d.amount / 100).toFixed(2)} ${d.currency.toUpperCase()}`
          : "Refund issued",
    );
    setBusy(null);
    if (result === "ok") router.refresh();
  }

  if (!canRetry && !canRefund) return <span className="text-muted-foreground text-xs">—</span>;

  return (
    <div className="flex flex-wrap gap-2">
      {canRetry && (
        <Button
          size="sm"
          variant="outline"
          disabled={busy !== null}
          onClick={onRetry}
        >
          {busy === "retry" ? "Retrying…" : "Retry"}
        </Button>
      )}
      {canRefund && (
        <Button
          size="sm"
          variant="destructive"
          disabled={busy !== null}
          onClick={onRefund}
        >
          {busy === "refund" ? "Refunding…" : "Refund"}
        </Button>
      )}
    </div>
  );
}
