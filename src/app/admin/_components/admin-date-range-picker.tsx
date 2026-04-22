"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AdminRangePreset } from "@/app/admin/_lib/range";

const presets: { id: AdminRangePreset; label: string }[] = [
  { id: "7d", label: "7d" },
  { id: "30d", label: "30d" },
  { id: "90d", label: "90d" },
  { id: "mtd", label: "MTD" },
];

export function AdminDateRangePicker({
  currentPreset,
  customFrom,
  customTo,
}: {
  currentPreset: AdminRangePreset;
  customFrom?: string;
  customTo?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const sp = useSearchParams();
  const [from, setFrom] = useState(customFrom ?? "");
  const [to, setTo] = useState(customTo ?? "");

  const navigate = useCallback(
    (next: Record<string, string | undefined>) => {
      const p = new URLSearchParams(sp.toString());
      for (const [k, v] of Object.entries(next)) {
        if (v === undefined || v === "") p.delete(k);
        else p.set(k, v);
      }
      router.push(`${pathname}?${p.toString()}`);
    },
    [pathname, router, sp],
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <Button
            key={p.id}
            type="button"
            size="sm"
            variant={currentPreset === p.id ? "default" : "outline"}
            onClick={() =>
              navigate({ range: p.id, from: undefined, to: undefined })
            }
          >
            {p.label}
          </Button>
        ))}
      </div>
      <form
        className="flex flex-wrap items-end gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({
            range: "custom",
            from: from || undefined,
            to: to || undefined,
          });
        }}
      >
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">From</Label>
          <Input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-9 w-[11rem]"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">To</Label>
          <Input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-9 w-[11rem]"
          />
        </div>
        <Button type="submit" size="sm" variant="secondary">
          Apply
        </Button>
      </form>
    </div>
  );
}
