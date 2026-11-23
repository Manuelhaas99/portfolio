import type { ComponentPropsWithoutRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-mono whitespace-nowrap transition-colors duration-300";

const variants = {
  /** amber fill, ink text */
  primary:
    "bg-amber text-ink font-medium hover:bg-amber-hi hover:text-ink",
  /** hairline outline that warms to amber on hover */
  outline:
    "border border-line/24 hover:border-amber hover:text-amber",
} as const;

type PillProps = ComponentPropsWithoutRef<"a"> & {
  variant?: keyof typeof variants;
};

/** Shared link pill — radius 999px, mono label. */
export default function Pill({
  variant = "outline",
  className = "",
  ...props
}: PillProps) {
  return (
    <a {...props} className={`${base} ${variants[variant]} ${className}`} />
  );
}
