export const BOOKING_STATUS = {
  PENDING_CHECKOUT: "pending_checkout",
  PAID: "paid",
  DUFFEL_PROCESSING: "duffel_processing",
  CONFIRMED: "confirmed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
