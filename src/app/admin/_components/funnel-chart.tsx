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
          Distinct visitors who triggered each step in this date range. Rows are
          independent counts—not everyone who searched necessarily reached offers.
          Compare Book → Submitted search to see browsing without searching;
          compare Submitted vs Offers returned vs Search error to see supplier or
          server failures.
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
