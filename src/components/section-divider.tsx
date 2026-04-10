import { cn } from "@/lib/utils";

type SectionDividerVariant =
  | "hero-to-trust"
  | "trust-to-features"
  | "features-to-how"
  | "social-to-embassy"
  | "embassy-to-faq"
  | "footer";

const presets: Record<
  SectionDividerVariant,
  {
    wrap: string;
    fill: string;
    invert?: boolean;
    /** Solid rect inside SVG under the wave (removes transparent hairlines in browsers) */
    waveBackdropFill?: string;
  }
> = {
  "hero-to-trust": {
    wrap: "bg-transparent",
    fill: "fill-[color:var(--surface-warm)]",
  },
  "trust-to-features": {
    wrap: "bg-transparent",
    fill: "fill-[color:var(--surface-mint)]",
  },
  "features-to-how": {
    wrap: "bg-transparent",
    /* Matches .bg-subtle-how first stop (mint-white handoff) */
    fill: "fill-[rgb(234_246_241)]",
  },
  "social-to-embassy": {
    wrap: "bg-divider-social",
    fill: "fill-[color:var(--surface-warm)]",
  },
  "embassy-to-faq": {
    wrap: "bg-divider-embassy-faq",
    fill: "fill-[rgb(227_238_252)]",
  },
  footer: {
    wrap: "bg-divider-footer",
    fill: "fill-[color:var(--footer-wave-green)]",
  },
};

type SectionDividerProps = {
  variant: SectionDividerVariant;
  className?: string;
};

/**
 * Full-width inline SVG wave between sections (no external asset).
 */
const WAVE_PATH = "M0,32 Q300,8 600,32 T1200,28 L1200,48 L0,48 Z";

export function SectionDivider({ variant, className }: SectionDividerProps) {
  const { wrap, fill, invert, waveBackdropFill } = presets[variant];
  return (
    <div
      className={cn(
        wrap,
        "relative w-full overflow-hidden leading-none",
        (variant === "footer" ||
          variant === "hero-to-trust" ||
          variant === "trust-to-features" ||
          variant === "features-to-how" ||
          variant === "social-to-embassy" ||
          variant === "embassy-to-faq") &&
          "-mt-px",
        className,
      )}
      aria-hidden
    >
      <div className={cn(invert && "origin-center rotate-180")}>
        <svg
          viewBox="0 0 1200 48"
          preserveAspectRatio="none"
          className="block h-10 w-full md:h-14"
          xmlns="http://www.w3.org/2000/svg"
        >
          {waveBackdropFill ? (
            <rect width="1200" height="48" fill={waveBackdropFill} />
          ) : null}
          <path d={WAVE_PATH} className={fill} />
        </svg>
      </div>
    </div>
  );
}
