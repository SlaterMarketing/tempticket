import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmationToast } from "./confirmation-toast";

export default async function BookConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto max-w-lg px-4 py-16 space-y-6">
      <ConfirmationToast sessionId={params.session_id} />
      <Card>
        <CardHeader>
          <CardTitle>Payment received</CardTitle>
          <CardDescription>
            We&apos;re confirming your flight reservation with the airline.
            You&apos;ll get an email with booking details shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Check your inbox (and spam) for the confirmation. Use the airline
            reference on the carrier website when you need proof of onward
            travel.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              href="/book"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Book another
            </Link>
            <Link
              href="/login?next=/account/bookings"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Sign in for booking history
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
