import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function deltaLabel(cur: number, prev: number): { text: string; up: boolean } {
  if (prev === 0) {
    if (cur === 0) return { text: "—", up: true };
    return { text: "new", up: true };
  }
  const pct = ((cur - prev) / prev) * 100;
  const text = `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`;
  return { text, up: pct >= 0 };
}

export function KpiCard({
  title,
  value,
  prev,
  format = "number",
}: {
  title: string;
  value: number;
  prev: number;
  format?: "number" | "usd" | "percent";
}) {
  const { text, up } = deltaLabel(value, prev);
  let display: string;
  if (format === "usd") {
    display = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value / 100);
  } else if (format === "percent") {
    display = `${value.toFixed(1)}%`;
  } else {
    display = new Intl.NumberFormat("en-US").format(value);
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold tabular-nums">{display}</p>
        <p
          className={cn(
            "mt-1 text-xs font-medium tabular-nums",
            up ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400",
          )}
        >
          vs prev: {text}
        </p>
      </CardContent>
    </Card>
  );
}
