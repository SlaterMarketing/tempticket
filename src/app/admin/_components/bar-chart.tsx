import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RevenueDay } from "@/lib/analytics/queries";

export function RevenueBarChart({ data }: { data: RevenueDay[] }) {
  const max = Math.max(1, ...data.map((d) => d.usdCents));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by day</CardTitle>
        <CardDescription>
          Estimated USD from paid bookings (created in range)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-40 items-end gap-px overflow-x-auto pb-6">
          {data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data</p>
          ) : (
            data.map((d) => (
              <div
                key={d.day}
                className="group flex min-w-[10px] flex-1 flex-col items-center justify-end"
                title={`${d.day}: ${(d.usdCents / 100).toFixed(2)} USD`}
              >
                <div
                  className="w-full min-w-2 max-w-6 rounded-t bg-primary/90 group-hover:bg-primary"
                  style={{
                    height: `${Math.max(4, (d.usdCents / max) * 100)}%`,
                  }}
                />
              </div>
            ))
          )}
        </div>
        {data.length > 0 ? (
          <p className="text-center text-[10px] text-muted-foreground">
            {data[0]?.day} … {data[data.length - 1]?.day}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
