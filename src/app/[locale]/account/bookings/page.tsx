import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { redirect } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
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
import { getSession } from "@/lib/auth/session";
import { buildPublicMetadata } from "@/lib/i18n/metadata";
import { db } from "@/lib/db";
import { bookings } from "@/lib/db/schema";
import { and, desc, eq, or, sql, isNotNull } from "drizzle-orm";
import { BookingsSuccessToast } from "./success-toast";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return buildPublicMetadata(
    locale,
    "account/bookings",
    t("bookingsTitle"),
    t("bookingsDescription"),
  );
}

export default async function BookingsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getSession();
  if (!session) {
    redirect({
      href: {
        pathname: "/login",
        query: { next: "/account/bookings" },
      },
      locale,
    });
  }
  const t = await getTranslations("Bookings");
  const { sub: userId, email } = session!;
  const emailLower = email.trim().toLowerCase();
  const paramsSp = await searchParams;

  const rows = await db()
    .select()
    .from(bookings)
    .where(
      or(
        eq(bookings.userId, userId),
        and(
          isNotNull(bookings.customerEmail),
          sql`lower(${bookings.customerEmail}) = ${emailLower}`,
        ),
      ),
    )
    .orderBy(desc(bookings.createdAt));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <BookingsSuccessToast sessionId={paramsSp.session_id} />
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
        <Link href="/book" className="text-sm underline underline-offset-2">
          {t("newBooking")}
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("orders")}</CardTitle>
          <CardDescription>{t("ordersDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t("empty")}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("colCreated")}</TableHead>
                  <TableHead>{t("colStatus")}</TableHead>
                  <TableHead>{t("colAirline")}</TableHead>
                  <TableHead>{t("colReference")}</TableHead>
                  <TableHead>{t("colMode")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="whitespace-nowrap text-sm">
                      {b.createdAt.toISOString().slice(0, 10)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{b.status}</Badge>
                    </TableCell>
                    <TableCell>{b.airlineIata ?? "—"}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {b.duffelBookingRef ?? b.duffelOrderId ?? "—"}
                    </TableCell>
                    <TableCell>{b.orderType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {rows.some((b) => b.failureReason) && (
        <Card className="border-destructive/40">
          <CardHeader>
            <CardTitle>{t("needsAttention")}</CardTitle>
            <CardDescription>{t("needsAttentionDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            {rows
              .filter((b) => b.failureReason)
              .map((b) => (
                <p key={b.id}>
                  <span className="font-mono text-xs">{b.id}</span>:{" "}
                  {b.failureReason}
                </p>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
