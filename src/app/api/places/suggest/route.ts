import { getDuffel } from "@/lib/duffel";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
  q: z
    .string()
    .min(2, "Type at least 2 characters")
    .max(80)
    .transform((s) => s.trim()),
});

function formatPlaceLabel(p: {
  name: string;
  iata_code: string;
  city_name: string | null;
  country_name: string | null;
  type: string;
}): string {
  const city = p.city_name?.trim();
  const country = p.country_name?.trim();
  if (city && country) return `${p.name} (${p.iata_code}) · ${city}, ${country}`;
  if (country) return `${p.name} (${p.iata_code}) · ${country}`;
  if (city) return `${p.name} (${p.iata_code}) · ${city}`;
  return `${p.name} (${p.iata_code})`;
}

/**
 * City / airport typeahead backed by Duffel Places suggestions.
 * @see https://duffel.com/docs/api/places
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("q") ?? "";
  const parsed = querySchema.safeParse({ q: raw });
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors.q?.[0] ?? "Invalid query" },
      { status: 400 },
    );
  }
  const q = parsed.data.q;

  try {
    const duffel = getDuffel();
    // Duffel API expects `query`; `name` is deprecated and returns no matches.
    const res = await duffel.suggestions.list({ query: q });
    const data = res.data ?? [];
    const places = data.slice(0, 12).map((p) => {
      const label = formatPlaceLabel({
        name: p.name,
        iata_code: p.iata_code,
        city_name: p.city_name,
        country_name: p.country_name,
        type: p.type,
      });
      const subtitle = [p.city_name, p.country_name]
        .filter((x): x is string => Boolean(x?.trim()))
        .join(", ");
      return {
        code: p.iata_code,
        type: p.type,
        name: p.name,
        subtitle: subtitle || null,
        label,
      };
    });

    return NextResponse.json({ places });
  } catch (e) {
    console.error("Duffel places suggest error", e);
    return NextResponse.json(
      { error: "Could not load places. Try again." },
      { status: 502 },
    );
  }
}
