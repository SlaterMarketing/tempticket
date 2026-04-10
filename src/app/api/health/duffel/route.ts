import { getDuffel } from "@/lib/duffel";
import { NextResponse } from "next/server";

/** HEAD/GET: verifies Duffel token works (list airlines, minimal payload). */
export async function GET() {
  try {
    const duffel = getDuffel();
    const res = await duffel.airlines.list({ limit: 1 });
    const row = Array.isArray(res.data) ? res.data[0] : undefined;
    return NextResponse.json({
      ok: true,
      sample: row?.name ?? null,
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        error: e instanceof Error ? e.message : "Duffel unreachable",
      },
      { status: 503 },
    );
  }
}
