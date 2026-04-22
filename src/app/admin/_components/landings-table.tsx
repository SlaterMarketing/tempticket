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
import type { LandingRow } from "@/lib/analytics/queries";
import { cn } from "@/lib/utils";

export function LandingsTable({
  rows,
  exportQuery,
}: {
  rows: LandingRow[];
  exportQuery: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
        <div>
          <CardTitle>Top landing pages</CardTitle>
          <CardDescription>By session count</CardDescription>
        </div>
        <a
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          href={`/api/admin/export?kind=landings&${exportQuery}`}
        >
          Export CSV
        </a>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Path</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.path}>
                <TableCell className="max-w-md truncate font-mono text-xs">
                  {r.path}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {r.sessions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
