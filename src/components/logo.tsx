import { cn } from "@/lib/utils";

export function Logo({
  className,
  mono,
}: {
  className?: string;
  mono?: boolean;
}) {
  if (mono) {
    return <span className={cn("font-bold", className)}>TempTicket</span>;
  }

  return (
    <span className={cn("font-bold", className)}>
      <span className="text-[color:var(--brand-blue)]">Temp</span>
      <span className="text-[color:var(--brand-green)]">Ticket</span>
    </span>
  );
}
