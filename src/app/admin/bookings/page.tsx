import { serializeAdminSearchParams } from "@/app/admin/_lib/range";
import { Badge } from "@/components/ui/badge";
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
import { bookings, users } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { desc, eq } from "drizzle-orm";

export const revalidate = 60;

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const exportQuery = serializeAdminSearchParams(sp);

  const rows = await db()
    .select({
      booking: bookings,
      userEmail: users.email,
    })
    .from(bookings)
    .leftJoin(users, eq(bookings.userId, users.id))
    .orderBy(desc(bookings.createdAt))
    .limit(100);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Latest 100</p>
        </div>
        <a
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          href={`/api/admin/export?kind=bookings&${exportQuery}`}
        >
          Export CSV (range)
        </a>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Queue</CardTitle>
          <CardDescription>Most recent first</CardDescription>
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
                  <TableCell className="max-w-[200px] truncate font-mono text-xs">
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
    </div>
  );
}
