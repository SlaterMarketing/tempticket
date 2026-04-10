"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type RevealDirection = "up" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  /** Stagger delay in ms (CSS transition-delay once visible) */
  delayMs?: number;
};

const directionHidden: Record<RevealDirection, string> = {
  up: "translate-y-8 opacity-0",
  left: "-translate-x-8 opacity-0",
  right: "translate-x-8 opacity-0",
};

const directionVisible: Record<RevealDirection, string> = {
  up: "translate-y-0 opacity-100",
  left: "translate-x-0 opacity-100",
  right: "translate-x-0 opacity-100",
};

/**
 * Fades and slides children into view when they intersect the viewport.
 * Respects `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delayMs = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion]);

  const style: CSSProperties = reducedMotion
    ? {}
    : { transitionDelay: `${delayMs}ms` };

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-transition will-change-[opacity,transform]",
        visible ? directionVisible[direction] : directionHidden[direction],
        reducedMotion && "reveal-no-motion",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
