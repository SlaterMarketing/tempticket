"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const HERO_ID = "hero";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    if (!hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" },
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  function goTop() {
    const instant =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: instant ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={goTop}
      className={cn(
        "fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--brand-green)] text-white shadow-lg ring-2 ring-white/90 transition-[opacity,transform,box-shadow] duration-200 hover:brightness-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-blue)] focus-visible:ring-offset-2 md:right-6 md:bottom-6",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
      aria-label="Back to top"
    >
      <ChevronUp className="size-6" aria-hidden />
    </button>
  );
}
