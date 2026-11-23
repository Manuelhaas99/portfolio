"use client";

import type { CSSProperties, ReactNode } from "react";
import { techLogo, techMark } from "../lib/tech";

/** `interface` on purpose — see the note in `Projects.tsx`. */
interface TechCircleProps {
  /** full technology name — also the tooltip */
  name: string;
  /** 108px stack circle or 44px card badge */
  variant?: "stack" | "badge";
  selected?: boolean;
  /** filtering hook — wire your state here */
  onSelect?: (name: string) => void;
  href?: string;
  /** overrides the built-in logo lookup with your own node */
  icon?: ReactNode;
}

/**
 * Circular technology mark. Shows the official logo when there is one, falling
 * back to a dotted placeholder monogram. The logo is painted as a mask filled
 * with `currentColor`, not as an `<img>`, so it inherits the circle's colour
 * and follows it into the selected state.
 */
export default function TechCircle({
  name,
  variant = "stack",
  selected = false,
  onSelect,
  href = "#d-projects",
  icon,
}: TechCircleProps) {
  const isStack = variant === "stack";
  const mark = techMark(name, isStack ? 32 : 15, selected);
  const logo = icon ? undefined : techLogo(name);

  const style = {
    background: mark.background,
    color: mark.color,
    borderColor: mark.borderColor,
    boxShadow: mark.boxShadow,
    "--mark-size": mark.fontSize,
  } as CSSProperties;

  const maskStyle = logo
    ? ({
        maskImage: `url("${logo}")`,
        WebkitMaskImage: `url("${logo}")`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      } as CSSProperties)
    : undefined;

  return (
    <a
      href={href}
      title={name}
      aria-label={name}
      aria-pressed={onSelect ? selected : undefined}
      onClick={
        onSelect
          ? (event) => {
              event.preventDefault();
              onSelect(name);
            }
          : undefined
      }
      style={style}
      className={
        isStack
          ? "relative flex size-[108px] items-center justify-center overflow-hidden rounded-full border transition-[transform,border-color,background-color] duration-300 ease-soft hover:-translate-y-[5px] hover:scale-[1.04] hover:border-amber! max-mid:size-[84px]"
          : "flex size-[44px] items-center justify-center rounded-full border font-mono font-bold transition-[transform,border-color,background-color] duration-[250ms] hover:-translate-y-[3px] hover:border-amber!"
      }
    >
      {isStack && mark.dots > 0 && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(0.93_0.006_250/0.12)_1px,transparent_1px)] bg-[length:11px_11px]"
          style={{ opacity: mark.dots }}
        />
      )}
      {icon ??
        (logo ? (
          <span
            aria-hidden
            style={maskStyle}
            className={
              isStack
                ? "relative block size-[46px] bg-current max-mid:size-[36px]"
                : "block size-[20px] bg-current"
            }
          />
        ) : (
          <span
            className={
              isStack
                ? "relative font-mono font-bold tracking-[-0.01em] text-[length:var(--mark-size)] max-mid:text-[calc(var(--mark-size)*0.78)]"
                : "text-[length:var(--mark-size)]"
            }
          >
            {mark.label}
          </span>
        ))}
    </a>
  );
}
