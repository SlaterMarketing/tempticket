import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FunnelStep } from "@/lib/analytics/queries";

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const max = Math.max(1, ...steps.map((s) => s.count));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel</CardTitle>
        <CardDescription>
          Distinct visitors who reached each step (current range)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((s) => (
          <div key={s.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-medium capitalize">
                {s.name.replaceAll("_", " ")}
              </span>
              <span className="tabular-nums text-muted-foreground">
                {s.count}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${(s.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
