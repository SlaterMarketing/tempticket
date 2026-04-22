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
import type { CohortRow } from "@/lib/analytics/queries";

export function CohortGrid({ rows }: { rows: CohortRow[] }) {
  const maxWeeks = rows[0]?.activeByWeek.length ?? 0;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cohort activity</CardTitle>
        <CardDescription>
          Signups by week (UTC Monday); cells = distinct users with a session
          in week W after cohort start
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No cohorts in window</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cohort</TableHead>
                <TableHead className="text-right">Size</TableHead>
                {Array.from({ length: maxWeeks }, (_, i) => (
                  <TableHead key={i} className="text-right tabular-nums">
                    W{i}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.label}>
                  <TableCell className="font-mono text-xs">{r.label}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {r.size}
                  </TableCell>
                  {r.activeByWeek.map((n, i) => (
                    <TableCell key={i} className="text-right tabular-nums">
                      {n}
                      {r.size > 0 ? (
                        <span className="ml-1 text-[10px] text-muted-foreground">
                          ({((n / r.size) * 100).toFixed(0)}%)
                        </span>
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
