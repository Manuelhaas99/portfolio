"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Frame for the enlarged shot, mirroring `shotFrames` in `ProjectCard` but
 * sized against the viewport instead of the card. The image inside is
 * `object-contain`, not `object-cover` like the card's: enlarging it is the
 * point, so nothing gets cropped even when a real capture is taller than the
 * 9:18 the frame assumes.
 */
const lightboxFrames = {
  web: {
    frame:
      "w-[min(92vw,1180px)] max-h-[86vh] aspect-[16/10] rounded-[20px] p-[10px]",
    inner: "rounded-[12px]",
    sizes: "(max-width: 1280px) 92vw, 1180px",
  },
  mobile: {
    frame:
      "h-[min(86vh,920px)] max-w-[92vw] aspect-[9/18] rounded-[clamp(24px,5vw,40px)] p-[12px]",
    inner: "rounded-[clamp(18px,4vw,30px)]",
    sizes: "(max-width: 640px) 92vw, 460px",
  },
} as const;

type ShotLightboxProps = {
  src: string;
  alt: string;
  shotType: keyof typeof lightboxFrames;
  closeLabel: string;
  onClose: () => void;
};

/**
 * The selected screenshot, full size over the page. The backdrop stays
 * translucent on purpose — the card underneath should still read through it,
 * so the shot feels lifted off the page rather than opened somewhere else.
 *
 * Rendered through a portal into <body>: cards sit inside `Reveal`, whose rise
 * animation puts a `transform` on the wrapper, and a transform makes an
 * ancestor the containing block for `position: fixed` — the overlay would be
 * trapped inside the card instead of covering the viewport.
 */
export default function ShotLightbox({
  src,
  alt,
  shotType,
  closeLabel,
  onClose,
}: ShotLightboxProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const frame = lightboxFrames[shotType];

  // Escape closes; focus moves to the close button and back to whatever opened
  // the lightbox, so keyboard users don't land at the top of the page.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
    };
  }, [onClose]);

  // Freeze the page behind the overlay. The scrollbar's width is handed back as
  // padding, otherwise hiding it shifts the still-visible page sideways.
  useEffect(() => {
    const { body } = document;
    const previous = { overflow: body.style.overflow, padding: body.style.paddingRight };
    const gap = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    return () => {
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.padding;
    };
  }, []);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="animate-fade fixed inset-0 z-50 flex items-center justify-center bg-ink/55 p-6 backdrop-blur-[3px] max-mid:p-4"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-6 right-6 flex size-11 items-center justify-center rounded-full border border-line/20 bg-surface/80 font-mono text-[15px] text-fg-80 transition-colors duration-200 hover:border-amber/50 hover:text-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber max-mid:top-4 max-mid:right-4"
      >
        ✕
      </button>

      {/* the shot itself — clicks here shouldn't reach the closing backdrop */}
      <figure
        onClick={(event) => event.stopPropagation()}
        className={`animate-pop relative m-0 border border-line/20 bg-surface shadow-[0_30px_80px_oklch(0.17_0.012_250/0.55)] ${frame.frame}`}
      >
        <div className={`relative size-full overflow-hidden bg-ink ${frame.inner}`}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={frame.sizes}
            className="object-contain"
          />
        </div>
        {shotType === "mobile" && (
          <span
            aria-hidden
            className="pointer-events-none absolute top-[1.4%] left-1/2 h-[5px] w-[26%] -translate-x-1/2 rounded-full bg-line/30"
          />
        )}
      </figure>
    </div>,
    document.body,
  );
}
