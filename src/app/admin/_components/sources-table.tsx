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
import type {
  TrafficSourceGroupBy,
  TrafficSourceRow,
} from "@/lib/analytics/queries";
import { cn } from "@/lib/utils";

const GROUP_LABELS: Record<TrafficSourceGroupBy, string> = {
  source: "UTM source",
  campaign: "UTM campaign",
  medium: "UTM medium",
};

export function SourcesTable({
  rows,
  exportQuery,
  groupBy,
  rangeQuery,
}: {
  rows: TrafficSourceRow[];
  exportQuery: string;
  groupBy: TrafficSourceGroupBy;
  rangeQuery: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div>
          <CardTitle>Traffic sources</CardTitle>
          <CardDescription>
            Grouped by {GROUP_LABELS[groupBy].toLowerCase()} (falls back to
            source or referrer when empty)
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["source", "campaign", "medium"] as const).map((g) => (
            <a
              key={g}
              className={cn(
                buttonVariants({
                  variant: groupBy === g ? "default" : "outline",
                  size: "sm",
                }),
              )}
              href={`/admin?${rangeQuery}&attr=${g}`}
            >
              {GROUP_LABELS[g]}
            </a>
          ))}
          <a
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            href={`/api/admin/export?kind=sources&attr=${groupBy}&${exportQuery}`}
          >
            Export CSV
          </a>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{GROUP_LABELS[groupBy]}</TableHead>
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
