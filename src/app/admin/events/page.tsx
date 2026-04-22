import { serializeAdminSearchParams } from "@/app/admin/_lib/range";
import { buttonVariants } from "@/components/ui/button";
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
import { db } from "@/lib/db";
import { bookingEvents } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { desc } from "drizzle-orm";

export const revalidate = 60;

export default async function AdminBookingEventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const exportQuery = serializeAdminSearchParams(sp);

  const events = await db()
    .select()
    .from(bookingEvents)
    .orderBy(desc(bookingEvents.createdAt))
    .limit(80);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Booking events</h1>
          <p className="text-muted-foreground">Latest 80 (support log)</p>
        </div>
        <a
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          href={`/api/admin/export?kind=booking_events&${exportQuery}`}
        >
          Export CSV (range)
        </a>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event log</CardTitle>
          <CardDescription>Audit trail from Duffel / Stripe</CardDescription>
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
                  <TableCell className="font-mono text-xs">
                    {ev.bookingId}
                  </TableCell>
                  <TableCell>{ev.event}</TableCell>
                  <TableCell className="max-w-md truncate font-mono text-xs">
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
