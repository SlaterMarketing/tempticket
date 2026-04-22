import {
  index,
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
  /** SHA-256 hash of the opaque magic-link token. Null for legacy rows. */
  tokenHash: text("token_hash"),
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

/** First-party analytics: one row per browser (tt_vid cookie). */
export const analyticsVisitors = pgTable("analytics_visitors", {
  id: uuid("id").primaryKey(),
  firstSeenAt: timestamp("first_seen_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  firstUtmSource: text("first_utm_source"),
  firstUtmMedium: text("first_utm_medium"),
  firstUtmCampaign: text("first_utm_campaign"),
  firstUtmTerm: text("first_utm_term"),
  firstUtmContent: text("first_utm_content"),
  firstGclid: text("first_gclid"),
  firstReferrerHost: text("first_referrer_host"),
  firstLandingPath: text("first_landing_path"),
  country: text("country"),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
});

/** Sliding session (tt_sid cookie); attribution captured on first hit of session. */
export const analyticsSessions = pgTable(
  "analytics_sessions",
  {
    id: uuid("id").primaryKey(),
    visitorId: uuid("visitor_id")
      .references(() => analyticsVisitors.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    startedAt: timestamp("started_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    lastActivityAt: timestamp("last_activity_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    utmTerm: text("utm_term"),
    utmContent: text("utm_content"),
    gclid: text("gclid"),
    referrerHost: text("referrer_host"),
    landingPath: text("landing_path"),
    sessionCountry: text("session_country"),
    userAgent: text("user_agent"),
    device: text("device").notNull().default("unknown"),
  },
  (t) => [
    index("analytics_sessions_visitor_idx").on(t.visitorId),
    index("analytics_sessions_started_idx").on(t.startedAt),
  ],
);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ts: timestamp("ts", { withTimezone: true }).defaultNow().notNull(),
    visitorId: uuid("visitor_id").references(() => analyticsVisitors.id, {
      onDelete: "set null",
    }),
    sessionId: uuid("session_id").references(() => analyticsSessions.id, {
      onDelete: "set null",
    }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    name: text("name").notNull(),
    path: text("path"),
    payload: jsonb("payload").$type<Record<string, unknown> | null>(),
  },
  (t) => [
    index("analytics_events_name_ts_idx").on(t.name, t.ts),
    index("analytics_events_session_idx").on(t.sessionId),
    index("analytics_events_visitor_ts_idx").on(t.visitorId, t.ts),
    index("analytics_events_user_ts_idx").on(t.userId, t.ts),
  ],
);

export type User = typeof users.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
