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
import type { RouteConversionRow } from "@/lib/analytics/queries";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RoutesTable({
  rows,
  exportQuery,
}: {
  rows: RouteConversionRow[];
  exportQuery: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div>
          <CardTitle>Routes</CardTitle>
          <CardDescription>
            Search → checkout → confirmed by origin–destination pair
          </CardDescription>
        </div>
        <a
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          href={`/api/admin/export?kind=route_conversion&${exportQuery}`}
        >
          Export CSV
        </a>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Route</TableHead>
              <TableHead className="text-right">Searches</TableHead>
              <TableHead className="text-right">Checkouts</TableHead>
              <TableHead className="text-right">Confirmed</TableHead>
              <TableHead className="text-right">Search→Checkout</TableHead>
              <TableHead className="text-right">Checkout→Confirmed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-muted-foreground text-sm">
                  No route data in this range yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.slice(0, 20).map((r) => (
                <TableRow key={r.route}>
                  <TableCell className="font-mono text-sm">{r.route}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.searches}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.checkouts}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.confirmed}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.searchToCheckoutPct.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.checkoutToConfirmedPct.toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
