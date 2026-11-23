"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  /** element to render — defaults to a div */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** position in its group; stagger is (index % 5) * 0.07s */
  index?: number;
};

/**
 * Scroll reveal: opacity 0 → 1 with a 24px rise, fired once.
 *
 * Content is only hidden under `html.js-reveal` (set by the inline script in
 * `layout.tsx`), so a page that never hydrates stays visible. Anything already
 * on screen at mount is revealed right away instead of waiting for the
 * observer's first callback, which can lag. Each instance handles itself on
 * mount, so cards that appear after a filter change are picked up too.
 * `prefers-reduced-motion` skips the observer here and the animation in
 * globals.css.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  index = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // tells the inline script's failsafe that the app hydrated
    document.documentElement.setAttribute("data-reveal-live", "");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;

    if (reduced || inView) {
      node.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ animationDelay: `${(index % 5) * 0.07}s`, ...style }}
    >
      {children}
    </Tag>
  );
}
