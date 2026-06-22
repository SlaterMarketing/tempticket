import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PG_UUID_RE } from "@/lib/analytics/constants";
import { db } from "@/lib/db";
import { analyticsEvents, bookings, users } from "@/lib/db/schema";
import { desc, eq, and, isNotNull, sql } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

type TimelineRow = {
  ts: Date;
  kind: "analytics" | "booking";
  label: string;
  detail: string;
};

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id || !PG_UUID_RE.test(id)) notFound();

  const urows = await db()
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  const user = urows[0];
  if (!user) notFound();

  const emailLower = user.email.trim().toLowerCase();

  const [evs, bksByUser, bksByEmail] = await Promise.all([
    db()
      .select()
      .from(analyticsEvents)
      .where(eq(analyticsEvents.userId, id))
      .orderBy(desc(analyticsEvents.ts))
      .limit(200),
    db()
      .select()
      .from(bookings)
      .where(eq(bookings.userId, id))
      .orderBy(desc(bookings.createdAt))
      .limit(50),
    db()
      .select()
      .from(bookings)
      .where(
        and(
          isNotNull(bookings.customerEmail),
          sql`lower(${bookings.customerEmail}) = ${emailLower}`,
        ),
      )
      .orderBy(desc(bookings.createdAt))
      .limit(50),
  ]);

  const bookingMap = new Map<string, (typeof bksByUser)[0]>();
  for (const b of [...bksByUser, ...bksByEmail]) {
    bookingMap.set(b.id, b);
  }
  const bks = [...bookingMap.values()].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );

  const visitorIds = [
    ...new Set(
      bks
        .map((b) => {
          const meta = (b.metadata ?? {}) as Record<string, unknown>;
          return typeof meta.analyticsVisitorId === "string"
            ? meta.analyticsVisitorId
            : null;
        })
        .filter((v): v is string => !!v && PG_UUID_RE.test(v)),
    ),
  ];

  const timeline: TimelineRow[] = [
    ...evs.map((e) => ({
      ts: e.ts,
      kind: "analytics" as const,
      label: e.name,
      detail: [e.path, e.payload ? JSON.stringify(e.payload) : ""]
        .filter(Boolean)
        .join(" · "),
    })),
    ...bks.map((b) => {
      const meta = (b.metadata ?? {}) as Record<string, unknown>;
      const vid =
        typeof meta.analyticsVisitorId === "string"
          ? meta.analyticsVisitorId
          : null;
      const guestTag = b.userId ? "" : " · guest checkout";
      return {
        ts: b.createdAt,
        kind: "booking" as const,
        label: `booking ${b.status}`,
        detail: [
          b.duffelOfferId,
          b.customerEmail ?? "",
          vid ? `visitor ${vid}` : "",
          guestTag.trim(),
        ]
          .filter(Boolean)
          .join(" · "),
      };
    }),
  ].sort((a, b) => b.ts.getTime() - a.ts.getTime());

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/users"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Users
        </Link>
        <h1 className="mt-2 text-2xl font-bold tracking-tight">{user.email}</h1>
        <p className="text-muted-foreground">
          Joined {user.createdAt.toISOString()}
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{user.id}</p>
        {visitorIds.length > 0 ? (
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Analytics visitors: {visitorIds.join(", ")}
          </p>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>
            Product analytics events and bookings for this user
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Label</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeline.map((row, i) => (
                <TableRow key={`${row.kind}-${row.ts.toISOString()}-${i}`}>
                  <TableCell className="whitespace-nowrap text-xs">
                    {row.ts.toISOString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.kind}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="max-w-lg truncate text-xs text-muted-foreground">
                    {row.detail}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
