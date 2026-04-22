/**
 * Best-effort formatter for Duffel API errors. The SDK throws a `DuffelError`
 * carrying `{ errors: [{ code, title, message, ... }] }`; anything else falls
 * back to the Error message.
 */
export function formatDuffelError(e: unknown): string {
  if (e && typeof e === "object" && "errors" in e) {
    const errs = (e as { errors: unknown }).errors;
    if (Array.isArray(errs) && errs.length > 0) {
      const parts = errs
        .map((err) => {
          if (!err || typeof err !== "object") return null;
          const o = err as {
            code?: string;
            title?: string;
            message?: string;
          };
          const head = o.title ?? o.code ?? "Duffel error";
          return o.message ? `${head}: ${o.message}` : head;
        })
        .filter((s): s is string => Boolean(s));
      if (parts.length > 0) return parts.join("; ");
    }
  }
  if (e instanceof Error) return e.message;
  return "Duffel request failed";
}

export function isExpiredOfferError(e: unknown): boolean {
  if (!e || typeof e !== "object") return false;
  if ("errors" in e) {
    const errs = (e as { errors: unknown }).errors;
    if (Array.isArray(errs)) {
      for (const err of errs) {
        if (!err || typeof err !== "object") continue;
        const o = err as {
          code?: string;
          type?: string;
          message?: string;
        };
        const blob =
          `${o.code ?? ""} ${o.type ?? ""} ${o.message ?? ""}`.toLowerCase();
        if (
          blob.includes("expired") ||
          blob.includes("no_longer_available") ||
          blob.includes("offer_no_longer_available") ||
          blob.includes("not_found")
        ) {
          return true;
        }
      }
    }
  }
  if (e instanceof Error) {
    const m = e.message.toLowerCase();
    return (
      m.includes("expired") ||
      m.includes("no longer available") ||
      m.includes("not_found") ||
      m.includes("not found")
    );
  }
  return false;
}
