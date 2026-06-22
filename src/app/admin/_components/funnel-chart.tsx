import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FUNNEL_STEP_LABELS,
  type FunnelStep,
} from "@/lib/analytics/queries";

const FAILURE_LABELS: Record<string, string> = {
  search_failed: "Search errors",
  booking_failed: "Booking failed (Duffel)",
  checkout_abandoned: "Checkout abandoned",
};

export function FunnelChart({
  steps,
  failures,
}: {
  steps: FunnelStep[];
  failures: { name: string; count: number }[];
}) {
  const max = Math.max(1, ...steps.map((s) => s.count));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel</CardTitle>
        <CardDescription>
          Distinct visitors per milestone (not strict session sequences).
          Step-to-step % is indicative. Offer selected and checkout return
          events improve mid-funnel visibility.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((s) => {
          const label =
            FUNNEL_STEP_LABELS[
              s.name as keyof typeof FUNNEL_STEP_LABELS
            ] ?? s.name.replaceAll("_", " ");
          return (
            <div key={s.name} className="space-y-1">
              <div className="flex justify-between gap-3 text-sm">
                <span className="font-medium leading-snug">{label}</span>
                <span className="shrink-0 text-right tabular-nums text-muted-foreground">
                  {s.count}
                  {s.conversionPct != null ? (
                    <span className="ml-2 text-xs">
                      → {s.conversionPct.toFixed(0)}%
                    </span>
                  ) : null}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-[width]"
                  style={{ width: `${(s.count / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}

        {failures.some((f) => f.count > 0) ? (
          <div className="mt-6 space-y-2 border-t pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Issues (not funnel steps)
            </p>
            {failures.map((f) => (
              <div
                key={f.name}
                className="flex justify-between text-sm text-destructive/90"
              >
                <span>{FAILURE_LABELS[f.name] ?? f.name}</span>
                <span className="tabular-nums">{f.count}</span>
              </div>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
