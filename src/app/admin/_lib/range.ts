export type AdminRangePreset = "7d" | "30d" | "90d" | "mtd" | "custom";

function endOfUtcDay(d: Date) {
  const x = new Date(d);
  x.setUTCHours(23, 59, 59, 999);
  return x;
}

function startOfUtcDay(d: Date) {
  const x = new Date(d);
  x.setUTCHours(0, 0, 0, 0);
  return x;
}

function parseYmd(s: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(`${s}T00:00:00.000Z`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export type AdminRange = {
  preset: AdminRangePreset;
  from: Date;
  to: Date;
  prevFrom: Date;
  prevTo: Date;
};

export function resolveAdminRange(opts: {
  preset: AdminRangePreset;
  customFrom?: string | null;
  customTo?: string | null;
  now?: Date;
}): AdminRange {
  const now = opts.now ?? new Date();
  const to = endOfUtcDay(now);
  let from: Date;

  switch (opts.preset) {
    case "7d":
      from = startOfUtcDay(new Date(to.getTime() - 6 * 86400000));
      break;
    case "30d":
      from = startOfUtcDay(new Date(to.getTime() - 29 * 86400000));
      break;
    case "90d":
      from = startOfUtcDay(new Date(to.getTime() - 89 * 86400000));
      break;
    case "mtd": {
      from = startOfUtcDay(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)));
      break;
    }
    case "custom": {
      const a = opts.customFrom ? parseYmd(opts.customFrom) : null;
      const b = opts.customTo ? parseYmd(opts.customTo) : null;
      if (a && b) {
        from = startOfUtcDay(a);
        const toDay = endOfUtcDay(b);
        const span = toDay.getTime() - from.getTime();
        if (span < 0) {
          from = startOfUtcDay(b);
          const toFixed = endOfUtcDay(a);
          const duration = toFixed.getTime() - from.getTime();
          const prevTo = new Date(from.getTime() - 1);
          const prevFrom = new Date(prevTo.getTime() - duration);
          return {
            preset: "custom",
            from,
            to: toFixed,
            prevFrom: startOfUtcDay(prevFrom),
            prevTo: endOfUtcDay(prevTo),
          };
        }
        const duration = toDay.getTime() - from.getTime();
        const prevTo = new Date(from.getTime() - 1);
        const prevFrom = new Date(prevTo.getTime() - duration);
        return {
          preset: "custom",
          from,
          to: toDay,
          prevFrom: startOfUtcDay(prevFrom),
          prevTo: endOfUtcDay(prevTo),
        };
      }
      from = startOfUtcDay(new Date(to.getTime() - 29 * 86400000));
      break;
    }
    default:
      from = startOfUtcDay(new Date(to.getTime() - 29 * 86400000));
  }

  const duration = to.getTime() - from.getTime();
  const prevTo = new Date(from.getTime() - 1);
  const prevFrom = new Date(prevTo.getTime() - duration);

  return {
    preset: opts.preset,
    from,
    to,
    prevFrom: startOfUtcDay(prevFrom),
    prevTo: endOfUtcDay(prevTo),
  };
}

export async function getAdminRangeFromSearchParams(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
): Promise<AdminRange> {
  const sp = await searchParams;
  const raw = typeof sp.range === "string" ? sp.range : "30d";
  const preset = (
    ["7d", "30d", "90d", "mtd", "custom"].includes(raw) ? raw : "30d"
  ) as AdminRangePreset;
  const customFrom = typeof sp.from === "string" ? sp.from : null;
  const customTo = typeof sp.to === "string" ? sp.to : null;
  return resolveAdminRange({ preset, customFrom, customTo });
}

/** For Route Handlers (`URLSearchParams` from `req.url`). */
export function getAdminRangeFromUrlParams(
  searchParams: URLSearchParams,
): AdminRange {
  const raw = searchParams.get("range") ?? "30d";
  const preset = (
    ["7d", "30d", "90d", "mtd", "custom"].includes(raw) ? raw : "30d"
  ) as AdminRangePreset;
  return resolveAdminRange({
    preset,
    customFrom: searchParams.get("from"),
    customTo: searchParams.get("to"),
  });
}

export function serializeAdminSearchParams(
  sp: Record<string, string | string[] | undefined>,
): string {
  const o = new URLSearchParams();
  for (const [key, val] of Object.entries(sp)) {
    if (typeof val === "string" && val.length) o.set(key, val);
    else if (Array.isArray(val) && typeof val[0] === "string")
      o.set(key, val[0]);
  }
  return o.toString();
}
