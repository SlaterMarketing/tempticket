import Link from "next/link";
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
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { and, desc, eq, or, sql, isNotNull } from "drizzle-orm";
import { BookingsSuccessToast } from "./success-toast";

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login?next=/account/bookings");
  }
  const userId = session.sub;
  const emailLower = session.email.trim().toLowerCase();
  const params = await searchParams;

  const rows = await db()
    .select()
    .from(bookings)
    .where(
      or(
        eq(bookings.userId, userId),
        and(
          isNotNull(bookings.customerEmail),
          sql`lower(${bookings.customerEmail}) = ${emailLower}`,
        ),
      ),
    )
    .orderBy(desc(bookings.createdAt));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <BookingsSuccessToast sessionId={params.session_id} />
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My bookings</h1>
          <p className="text-muted-foreground mt-1">
            Bookings tied to your account or made with this email before you
            signed in. After payment we email you the airline reference.
          </p>
        </div>
        <Link href="/book" className="text-sm underline underline-offset-2">
          New booking
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Use the airline reference on the carrier site when you need
            proof of onward travel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-muted-foreground text-sm">No bookings yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Airline</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {b.createdAt.toISOString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{b.status}</Badge>
                    </TableCell>
                    <TableCell>{b.airlineIata ?? "—"}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {b.duffelBookingRef ?? b.duffelOrderId ?? "—"}
                    </TableCell>
                    <TableCell>{b.orderType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {rows.some((b) => b.failureReason) && (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>Needs attention</CardTitle>
            <CardDescription>
              If a booking failed after payment, contact support with the id
              and Stripe receipt.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            {rows
              .filter((b) => b.failureReason)
              .map((b) => (
                <p key={b.id}>
                  <span className="font-mono text-xs">{b.id}</span>:{" "}
                  {b.failureReason}
                </p>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
