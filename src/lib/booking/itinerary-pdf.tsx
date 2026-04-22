import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { Order } from "@duffel/api/dist/booking/Orders/OrdersTypes";
import { createElement } from "react";

const BRAND_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "TempTicket";

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 36,
    paddingHorizontal: 36,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#111",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    gap: 6,
  },
  dateLarge: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  dateSep: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    paddingHorizontal: 4,
  },
  tripToLabel: {
    fontSize: 10,
    letterSpacing: 1,
    color: "#555",
    marginLeft: 8,
  },
  tripToDest: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  sectionRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10,
  },
  smallRule: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginTop: 6,
    marginBottom: 0,
  },
  smallGrayRule: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#bbb",
    marginVertical: 6,
  },
  labelTiny: {
    fontSize: 8.5,
    color: "#555",
    letterSpacing: 0.6,
  },
  valueBold: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
  },
  codeRow: {
    marginTop: 4,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.4,
  },
  departureHeading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.6,
    marginRight: 8,
  },
  departureDate: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  segmentVerifyNote: {
    fontSize: 9,
    color: "#666",
    marginLeft: 10,
  },
  segmentHeadRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 6,
  },
  segmentBox: {
    borderWidth: 1,
    borderColor: "#cfcfcf",
    flexDirection: "row",
    marginTop: 4,
  },
  segmentLeft: {
    width: "28%",
    backgroundColor: "#efefef",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#cfcfcf",
  },
  segmentMid: {
    width: "42%",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#cfcfcf",
  },
  segmentRight: {
    width: "30%",
    padding: 10,
  },
  airlineName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  flightNumber: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
  },
  kv: { marginBottom: 6 },
  kvLabel: { fontSize: 8.5, color: "#555" },
  kvValue: { fontSize: 9.5, marginTop: 1 },
  midGrid: { flexDirection: "row" },
  midCol: { flex: 1 },
  midColRight: { flex: 1, paddingLeft: 8 },
  airportCode: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  airportCity: {
    fontSize: 9,
    color: "#333",
    marginTop: 1,
  },
  midSubRow: {
    flexDirection: "row",
    marginTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: "#cfcfcf",
    paddingTop: 8,
  },
  footerRow: {
    borderTopWidth: 1,
    borderTopColor: "#cfcfcf",
    backgroundColor: "#fafafa",
    flexDirection: "row",
  },
  footerCell: {
    flex: 1,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: "#e4e4e4",
  },
  footerCellLast: { flex: 1, padding: 8 },
  footerLabel: {
    fontSize: 8.5,
    color: "#555",
    letterSpacing: 0.3,
  },
  footerValue: {
    fontSize: 9.5,
    marginTop: 2,
  },
  pageFooter: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#888",
  },
});

function parseIsoDate(iso: string) {
  // "2026-05-11T16:12:00" → local-ish Date; treat as UTC-naive to avoid TZ drift
  const t = iso.replace(/Z$/, "");
  const d = new Date(`${t}Z`);
  if (Number.isNaN(d.getTime())) return new Date();
  return d;
}

function formatDateLong(iso: string) {
  const d = parseIsoDate(iso);
  const day = d.getUTCDate();
  const month = d.toLocaleString("en-GB", {
    month: "short",
    timeZone: "UTC",
  });
  const year = d.getUTCFullYear();
  return `${day} ${month.toUpperCase()} ${year}`;
}

function formatWeekdayLong(iso: string) {
  const d = parseIsoDate(iso);
  const weekday = d.toLocaleString("en-GB", {
    weekday: "long",
    timeZone: "UTC",
  });
  const day = d.getUTCDate();
  const month = d.toLocaleString("en-GB", { month: "long", timeZone: "UTC" });
  return `${weekday.toUpperCase()} ${day} ${month.toUpperCase()}`;
}

function formatClock(iso: string) {
  const d = parseIsoDate(iso);
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function parseIso8601DurationToHM(duration: string | null | undefined) {
  if (!duration) return null;
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?/.exec(duration);
  if (!m) return null;
  const h = m[1] ? Number(m[1]) : 0;
  const mins = m[2] ? Number(m[2]) : 0;
  return { h, m: mins };
}

function formatDuration(duration: string | null | undefined) {
  const hm = parseIso8601DurationToHM(duration);
  if (!hm) return "—";
  return `${hm.h}hr(s) ${String(hm.m).padStart(2, "0")}min(s)`;
}

function passengerDisplay(p: {
  title?: string | null;
  given_name: string;
  family_name: string;
}) {
  const title = (p.title ?? "").toUpperCase();
  return `${p.family_name.toUpperCase()}/${p.given_name.toUpperCase()}${title ? ` ${title}` : ""}`;
}

type SegmentPassenger = {
  cabin_class?: string | null;
  cabin_class_marketing_name?: string | null;
};

function cabinClassLabel(segmentPassengers: SegmentPassenger[] | undefined) {
  const first = segmentPassengers?.[0];
  if (!first) return "—";
  const raw =
    first.cabin_class_marketing_name ?? first.cabin_class ?? "economy";
  return raw.replace(/_/g, " ").toUpperCase();
}

export type ItineraryEmail = {
  to: string;
  subject: string;
};

export type ItineraryPdfInput = {
  order: Order;
  bookingId: string;
};

function SegmentBlock({
  seg,
  passengerName,
  reservationCode,
  airlineReservationCode,
  isFirst,
}: {
  seg: Order["slices"][number]["segments"][number];
  passengerName: string;
  reservationCode: string;
  airlineReservationCode: string;
  isFirst: boolean;
}) {
  const airlineName = (
    seg.marketing_carrier?.name ?? "—"
  ).toUpperCase();
  const flightCode = `${seg.marketing_carrier?.iata_code ?? ""} ${
    seg.marketing_carrier_flight_number ?? ""
  }`.trim();

  return (
    <View wrap={false} style={{ marginTop: isFirst ? 0 : 14 }}>
      <View style={styles.segmentHeadRow}>
        <Text style={styles.departureHeading}>✈  DEPARTURE:</Text>
        <Text style={styles.departureDate}>
          {formatWeekdayLong(seg.departing_at)}
        </Text>
        <Text style={styles.segmentVerifyNote}>
          Please verify flight times prior to departure
        </Text>
      </View>

      <View style={styles.segmentBox}>
        <View style={styles.segmentLeft}>
          <Text style={styles.airlineName}>{airlineName}</Text>
          <Text style={styles.flightNumber}>{flightCode || "—"}</Text>
          <View style={styles.kv}>
            <Text style={styles.kvLabel}>Duration:</Text>
            <Text style={styles.kvValue}>{formatDuration(seg.duration)}</Text>
          </View>
          <View style={styles.kv}>
            <Text style={styles.kvLabel}>Class:</Text>
            <Text style={styles.kvValue}>
              {cabinClassLabel(
                seg.passengers as unknown as SegmentPassenger[] | undefined,
              )}
            </Text>
          </View>
          <View style={styles.kv}>
            <Text style={styles.kvLabel}>Status:</Text>
            <Text style={styles.kvValue}>Confirmed</Text>
          </View>
        </View>

        <View style={styles.segmentMid}>
          <View style={styles.midGrid}>
            <View style={styles.midCol}>
              <Text style={styles.airportCode}>
                {seg.origin?.iata_code ?? "—"}
              </Text>
              <Text style={styles.airportCity}>
                {seg.origin?.city_name ?? seg.origin?.name ?? ""}
              </Text>
            </View>
            <View style={styles.midColRight}>
              <Text style={styles.airportCode}>
                {seg.destination?.iata_code ?? "—"}
              </Text>
              <Text style={styles.airportCity}>
                {seg.destination?.city_name ?? seg.destination?.name ?? ""}
              </Text>
            </View>
          </View>

          <View style={styles.midSubRow}>
            <View style={styles.midCol}>
              <Text style={styles.kvLabel}>Departing At:</Text>
              <Text style={styles.valueBold}>
                {formatClock(seg.departing_at)}
              </Text>
              <Text style={{ ...styles.kvLabel, marginTop: 6 }}>Terminal:</Text>
              <Text style={styles.kvValue}>
                {seg.origin_terminal || "Not Available"}
              </Text>
            </View>
            <View style={styles.midColRight}>
              <Text style={styles.kvLabel}>Arriving At:</Text>
              <Text style={styles.valueBold}>
                {formatClock(seg.arriving_at)}
              </Text>
              <Text style={{ ...styles.kvLabel, marginTop: 6 }}>Terminal:</Text>
              <Text style={styles.kvValue}>
                {seg.destination_terminal || "Not Available"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.segmentRight}>
          <View style={styles.kv}>
            <Text style={styles.kvLabel}>Aircraft:</Text>
            <Text style={styles.kvValue}>
              {seg.aircraft?.name ?? "Not Available"}
            </Text>
          </View>
          <View style={styles.kv}>
            <Text style={styles.kvLabel}>Distance (in miles):</Text>
            <Text style={styles.kvValue}>Not Available</Text>
          </View>
          <View style={styles.kv}>
            <Text style={styles.kvLabel}>Stop(s):</Text>
            <Text style={styles.kvValue}>
              {Array.isArray(seg.stops) ? seg.stops.length : 0}
            </Text>
          </View>
          <View style={styles.kv}>
            <Text style={styles.kvLabel}>Meals:</Text>
            <Text style={styles.kvValue}>Not Available</Text>
          </View>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View style={styles.footerCell}>
          <Text style={styles.footerLabel}>Passenger Name:</Text>
          <Text style={styles.footerValue}>{passengerName}</Text>
        </View>
        <View style={styles.footerCell}>
          <Text style={styles.footerLabel}>Seats:</Text>
          <Text style={styles.footerValue}>Check-in required</Text>
        </View>
        <View style={styles.footerCellLast}>
          <Text style={styles.footerLabel}>Booking:</Text>
          <Text style={styles.footerValue}>CONFIRMED</Text>
        </View>
      </View>

      <View style={styles.smallGrayRule} />
    </View>
  );
}

function ItineraryDocument({ order }: { order: Order }) {
  const allSegments = order.slices.flatMap((s) => s.segments);
  const firstSeg = allSegments[0];
  const lastSeg = allSegments[allSegments.length - 1];

  const startDate = firstSeg ? formatDateLong(firstSeg.departing_at) : "";
  const endDate = lastSeg ? formatDateLong(lastSeg.arriving_at) : "";
  const tripDestCity =
    lastSeg?.destination?.city_name ??
    lastSeg?.destination?.name ??
    lastSeg?.destination?.iata_code ??
    "";
  const pax = order.passengers?.[0];
  const passengerName = pax
    ? passengerDisplay(pax)
    : "TRAVELLER";
  const reservationCode = order.booking_reference ?? order.id;
  const airlineReservationCode = order.booking_reference ?? reservationCode;

  return (
    <Document
      title={`${BRAND_NAME} Itinerary ${reservationCode}`}
      author={BRAND_NAME}
      creator={BRAND_NAME}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <Text style={styles.dateLarge}>{startDate}</Text>
          <Text style={styles.dateSep}>▶</Text>
          <Text style={styles.dateLarge}>{endDate}</Text>
          <Text style={styles.tripToLabel}>TRIP TO</Text>
          <Text style={styles.tripToDest}>
            {tripDestCity.toUpperCase()}
          </Text>
        </View>
        <View style={styles.smallRule} />

        <View style={{ marginTop: 10 }}>
          <Text style={styles.labelTiny}>PREPARED FOR</Text>
          <Text style={styles.valueBold}>{passengerName}</Text>
        </View>

        <View style={{ marginTop: 14 }}>
          <Text style={styles.codeRow}>
            RESERVATION CODE: {reservationCode}
          </Text>
          <Text style={styles.codeRow}>
            AIRLINE RESERVATION CODE: {airlineReservationCode}
          </Text>
        </View>

        <View style={styles.sectionRule} />

        {order.slices.map((slice, sliceIdx) =>
          slice.segments.map((seg, segIdx) => (
            <SegmentBlock
              key={seg.id}
              seg={seg}
              passengerName={passengerName}
              reservationCode={reservationCode}
              airlineReservationCode={airlineReservationCode}
              isFirst={sliceIdx === 0 && segIdx === 0}
            />
          )),
        )}

        <View style={styles.pageFooter} fixed>
          <Text>{BRAND_NAME} — Onward travel reservation</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

export async function renderItineraryPdf(input: ItineraryPdfInput) {
  const element = createElement(ItineraryDocument, { order: input.order });
  return renderToBuffer(element);
}

export function itineraryFilename(order: Order) {
  const ref = (order.booking_reference ?? order.id)
    .replace(/[^A-Za-z0-9_-]/g, "")
    .slice(0, 30);
  return `itinerary-${ref || "booking"}.pdf`;
}
