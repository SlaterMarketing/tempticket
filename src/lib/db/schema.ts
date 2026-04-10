import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const loginCodes = pgTable("login_codes", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  codeHash: text("code_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  usedAt: timestamp("used_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  /** Set when the customer was logged in at checkout; guests book with this null. */
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  /** Receipt / contact email (lowercase); used for Stripe, confirmation email, and matching history after sign-in. */
  customerEmail: text("customer_email"),
  status: text("status").notNull(),
  duffelOfferId: text("duffel_offer_id").notNull(),
  orderType: text("order_type").notNull(),
  passengersJson: text("passengers_json").notNull(),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentStatus: text("stripe_payment_status"),
  serviceFeeCents: integer("service_fee_cents").notNull(),
  currency: text("currency").notNull().default("usd"),
  duffelOrderId: text("duffel_order_id"),
  duffelBookingRef: text("duffel_booking_ref"),
  airlineIata: text("airline_iata"),
  failureReason: text("failure_reason"),
  metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const bookingEvents = pgTable("booking_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .references(() => bookings.id, { onDelete: "cascade" })
    .notNull(),
  event: text("event").notNull(),
  payload: jsonb("payload").$type<Record<string, unknown> | null>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
