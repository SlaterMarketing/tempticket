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

export function FunnelChart({ steps }: { steps: FunnelStep[] }) {
  const max = Math.max(1, ...steps.map((s) => s.count));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel</CardTitle>
        <CardDescription>
          Distinct visitors who reached each milestone in this date range (counts
          are not strictly sequential). On the book flow, step 1 is find flights,
          step 2 is the trip preview, step 3 is traveler details before checkout.
          Compare flights returned vs trip preview vs step 3 to see where people
          leave mid-booking; compare search submitted vs search error for supplier
          issues.
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
                <span className="tabular-nums text-muted-foreground shrink-0">
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
          );
        })}
      </CardContent>
    </Card>
  );
}
