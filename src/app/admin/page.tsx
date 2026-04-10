import { redirect } from "next/navigation";
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
import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { bookingEvents, bookings, users } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || !isAdminEmail(session.email)) {
    redirect("/");
  }

  const rows = await db()
    .select({
      booking: bookings,
      userEmail: users.email,
    })
    .from(bookings)
    .leftJoin(users, eq(bookings.userId, users.id))
    .orderBy(desc(bookings.createdAt))
    .limit(100);

  const events = await db()
    .select()
    .from(bookingEvents)
    .orderBy(desc(bookingEvents.createdAt))
    .limit(80);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin</h1>
        <p className="text-muted-foreground mt-1">
          Booking queue and audit log for support.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>Latest 100</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Offer / order</TableHead>
                <TableHead>Ref</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(({ booking: b, userEmail }) => (
                <TableRow key={b.id}>
                  <TableCell className="whitespace-nowrap text-xs">
                    {b.createdAt.toISOString()}
                  </TableCell>
                  <TableCell className="text-sm">
                    {userEmail ?? b.customerEmail ?? "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{b.status}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs max-w-[200px] truncate">
                    {b.duffelOfferId}
                    {b.duffelOrderId ? ` / ${b.duffelOrderId}` : ""}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {b.duffelBookingRef ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event log</CardTitle>
          <CardDescription>Latest 80 events</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>Booking</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Payload</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((ev) => (
                <TableRow key={ev.id}>
                  <TableCell className="whitespace-nowrap text-xs">
                    {ev.createdAt.toISOString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{ev.bookingId}</TableCell>
                  <TableCell>{ev.event}</TableCell>
                  <TableCell className="font-mono text-xs max-w-md truncate">
                    {ev.payload ? JSON.stringify(ev.payload) : "—"}
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
