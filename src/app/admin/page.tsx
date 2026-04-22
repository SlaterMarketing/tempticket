import { AdminDateRangePicker } from "@/app/admin/_components/admin-date-range-picker";
import { RevenueBarChart } from "@/app/admin/_components/bar-chart";
import { CohortGrid } from "@/app/admin/_components/cohort-grid";
import { FunnelChart } from "@/app/admin/_components/funnel-chart";
import { KpiCard } from "@/app/admin/_components/kpi-card";
import { LandingsTable } from "@/app/admin/_components/landings-table";
import { SourcesTable } from "@/app/admin/_components/sources-table";
import {
  getAdminRangeFromSearchParams,
  serializeAdminSearchParams,
} from "@/app/admin/_lib/range";
import { buttonVariants } from "@/components/ui/button";
import {
  getAdminKpis,
  getCohortRetention,
  getFunnel,
  getRevenueByDay,
  getTopLandingPages,
  getTrafficSources,
} from "@/lib/analytics/queries";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export default async function AdminOverviewPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const range = await getAdminRangeFromSearchParams(searchParams);
  const exportQuery = serializeAdminSearchParams(sp);

  const [
    kpis,
    funnel,
    revenueByDay,
    sources,
    landings,
    cohorts,
  ] = await Promise.all([
    getAdminKpis(range),
    getFunnel(range),
    getRevenueByDay(range),
    getTrafficSources(range),
    getTopLandingPages(range),
    getCohortRetention(range),
  ]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1 text-muted-foreground">
            First-party metrics and booking funnel
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            href={`/api/admin/export?kind=sessions&${exportQuery}`}
          >
            Sessions CSV
          </a>
          <a
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            href={`/api/admin/export?kind=analytics_events&${exportQuery}`}
          >
            Analytics events CSV
          </a>
          <a
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            href={`/api/admin/export?kind=bookings&${exportQuery}`}
          >
            Bookings CSV
          </a>
          <a
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            href={`/api/admin/export?kind=booking_events&${exportQuery}`}
          >
            Booking events CSV
          </a>
        </div>
      </div>

      <AdminDateRangePicker
        currentPreset={range.preset}
        customFrom={typeof sp.from === "string" ? sp.from : undefined}
        customTo={typeof sp.to === "string" ? sp.to : undefined}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <KpiCard
          title="Visitors"
          value={kpis.visitors}
          prev={kpis.visitorsPrev}
        />
        <KpiCard
          title="Sessions"
          value={kpis.sessions}
          prev={kpis.sessionsPrev}
        />
        <KpiCard
          title="Signups"
          value={kpis.signups}
          prev={kpis.signupsPrev}
        />
        <KpiCard title="Logins" value={kpis.logins} prev={kpis.loginsPrev} />
        <KpiCard
          title="Checkout started"
          value={kpis.checkoutStarted}
          prev={kpis.checkoutStartedPrev}
        />
        <KpiCard
          title="Bookings paid"
          value={kpis.bookingsPaid}
          prev={kpis.bookingsPaidPrev}
        />
        <KpiCard
          title="Revenue (USD)"
          value={kpis.revenueUsdCents}
          prev={kpis.revenueUsdCentsPrev}
          format="usd"
        />
        <KpiCard
          title="Conversion"
          value={kpis.conversionPct}
          prev={kpis.conversionPctPrev}
          format="percent"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FunnelChart steps={funnel} />
        <RevenueBarChart data={revenueByDay} />
      </div>

      <SourcesTable rows={sources} exportQuery={exportQuery} />
      <LandingsTable rows={landings} exportQuery={exportQuery} />
      <CohortGrid rows={cohorts} />
    </div>
  );
}
