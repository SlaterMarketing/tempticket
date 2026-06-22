import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  BOOKING_FUNNEL_STEPS,
  FUNNEL_STEPS,
  aggregateSequentialFunnel,
  computeSessionSequentialDepth,
} from "./funnel.ts";

const t = (minute: number) => new Date(`2026-01-01T12:${String(minute).padStart(2, "0")}:00Z`);

describe("computeSessionSequentialDepth", () => {
  it("returns 0 for empty events", () => {
    assert.equal(computeSessionSequentialDepth([], FUNNEL_STEPS), 0);
  });

  it("counts full sequence in order", () => {
    const depth = computeSessionSequentialDepth(
      [
        { name: "page_view", ts: t(0) },
        { name: "book_page_view", ts: t(1) },
        { name: "search_attempted", ts: t(2) },
        { name: "search_performed", ts: t(3) },
      ],
      FUNNEL_STEPS,
    );
    assert.equal(depth, 4);
  });

  it("stops at missing middle step", () => {
    const depth = computeSessionSequentialDepth(
      [
        { name: "page_view", ts: t(0) },
        { name: "book_page_view", ts: t(1) },
        { name: "search_performed", ts: t(3) },
      ],
      FUNNEL_STEPS,
    );
    assert.equal(depth, 2);
  });

  it("stops when earlier funnel steps were skipped", () => {
    const depth = computeSessionSequentialDepth(
      [
        { name: "checkout_started", ts: t(0) },
        { name: "book_page_view", ts: t(5) },
      ],
      FUNNEL_STEPS,
    );
    assert.equal(depth, 0);
  });

  it("uses earliest valid timestamp for duplicates", () => {
    const depth = computeSessionSequentialDepth(
      [
        { name: "page_view", ts: t(0) },
        { name: "book_page_view", ts: t(5) },
        { name: "book_page_view", ts: t(2) },
        { name: "search_attempted", ts: t(3) },
      ],
      FUNNEL_STEPS,
    );
    assert.equal(depth, 3);
  });

  it("works for booking-only steps", () => {
    const depth = computeSessionSequentialDepth(
      [
        { name: "book_page_view", ts: t(0) },
        { name: "search_attempted", ts: t(1) },
        { name: "search_performed", ts: t(2) },
      ],
      BOOKING_FUNNEL_STEPS,
    );
    assert.equal(depth, 3);
  });
});

describe("aggregateSequentialFunnel", () => {
  it("produces cumulative counts and conversion percentages", () => {
    const steps = aggregateSequentialFunnel([3, 1, 2, 0], [
      "a",
      "b",
      "c",
    ]);

    assert.deepEqual(
      steps.map((s) => s.count),
      [3, 2, 1],
    );
    assert.equal(steps[0]!.conversionPct, (2 / 3) * 100);
    assert.equal(steps[1]!.conversionPct, 50);
    assert.equal(steps[2]!.conversionPct, null);
  });
});
