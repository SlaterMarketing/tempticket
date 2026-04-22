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
import type { TrafficSourceRow } from "@/lib/analytics/queries";
import { cn } from "@/lib/utils";

export function SourcesTable({
  rows,
  exportQuery,
}: {
  rows: TrafficSourceRow[];
  exportQuery: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div>
          <CardTitle>Traffic sources</CardTitle>
          <CardDescription>
            Sessions attributed by UTM source or referrer host
          </CardDescription>
        </div>
        <a
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          href={`/api/admin/export?kind=sources&${exportQuery}`}
        >
          Export CSV
        </a>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead className="text-right">Signups</TableHead>
              <TableHead className="text-right">Paid</TableHead>
              <TableHead className="text-right">Revenue (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.source}>
                <TableCell className="font-medium">{r.source}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.sessions}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.signups}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.paidBookings}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {(r.revenueUsdCents / 100).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
