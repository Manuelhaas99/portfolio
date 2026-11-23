"use client";

import Image from "next/image";
import { useState } from "react";
import Pill from "./Pill";
import ShotLightbox from "./ShotLightbox";
import TechCircle from "./TechCircle";
import type { Project } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

/**
 * Screenshot frame per `shotType`. Sized against the card's own width rather
 * than the viewport, so the row keeps its shape wherever the card ends up:
 * - `web` — three across while there is room, then two, then full width.
 * - `mobile` — always three across, each capped at the 170px of the design.
 *   Bezel and corner scale with the frame so a narrow phone stays in
 *   proportion instead of looking like a thick frame around a sliver.
 */
const shotFrames = {
  web: {
    frame: "grow basis-[min(100%,220px)] aspect-[16/10] rounded-[16px] p-0",
    inner: "rounded-[15px]",
    sizes: "(max-width: 700px) calc(100vw - 96px), 33vw",
  },
  mobile: {
    frame:
      "shrink-0 basis-[calc((100%_-_24px)/3)] max-w-[170px] aspect-[9/18] rounded-[clamp(14px,4.5vw,30px)] p-[10px] max-[560px]:p-[6px] max-[400px]:p-[4px]",
    inner: "rounded-[clamp(10px,3.3vw,22px)]",
    sizes: "(max-width: 640px) 30vw, 170px",
  },
} as const;

/** `interface` on purpose — see the note in `Projects.tsx`. */
interface ProjectCardProps {
  project: Project;
  /** position in the *filtered* list — drives the NN counter */
  index: number;
  activeTech?: string | null;
  onSelectTech?: (name: string) => void;
}

export default function ProjectCard({
  project,
  index,
  activeTech = null,
  onSelectTech,
}: ProjectCardProps) {
  const { t } = useLang();
  const copy = t.projects.items[project.slug];
  const num = String(index + 1).padStart(2, "0");
  const shot = shotFrames[project.shotType];
  // index of the screenshot open in the lightbox, null when none is
  const [zoomed, setZoomed] = useState<number | null>(null);
  const shotAlt = (i: number) => `${project.title} — ${copy.shots[i] ?? i + 1}`;

  return (
    <article className="group overflow-hidden rounded-[24px] border border-line/14 transition-colors duration-[400ms] hover:border-amber/40">
      {/* header band */}
      <div className="relative flex items-end justify-between gap-6 overflow-hidden border-b border-line/12 bg-surface px-[30px] pt-[30px] pb-[26px] max-mid:flex-col max-mid:items-start max-mid:gap-5 max-mid:px-6">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,oklch(0.93_0.006_250/0.05)_0_1px,transparent_1px_10px)]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-[-60%] right-[-6%] size-[340px] rounded-full bg-[radial-gradient(circle,oklch(0.78_0.15_60/0.16),transparent_68%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative">
          <div className="mb-[10px] font-mono text-[12px] text-amber">
            {t.projects.projectLabel} {num} · {project.year}
          </div>
          <h3 className="m-0 text-[clamp(30px,4.4vw,58px)] leading-[0.95] font-bold tracking-[-0.035em]">
            {project.title}
          </h3>
        </div>

        <div className="relative flex max-w-[46%] flex-wrap justify-end gap-2 max-mid:max-w-full max-mid:justify-start">
          {project.tech.slice(0, 6).map((tech) => (
            <TechCircle
              key={tech}
              name={tech}
              variant="badge"
              selected={activeTech === tech}
              onSelect={onSelectTech}
            />
          ))}
        </div>
      </div>

      {/* screenshots */}
      <div className="flex flex-wrap gap-3 px-[30px] pt-[26px] max-mid:px-6">
        {project.shots.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setZoomed(i)}
            aria-label={`${shotAlt(i)} — ${t.projects.shotZoom}`}
            className={`relative cursor-zoom-in border border-line/14 bg-surface transition-colors duration-200 hover:border-amber/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber ${shot.frame}`}
          >
            <div className={`relative size-full overflow-hidden ${shot.inner}`}>
              <Image
                src={src}
                alt={shotAlt(i)}
                fill
                sizes={shot.sizes}
                className="object-cover"
              />
            </div>
            {project.shotType === "mobile" && (
              <span
                aria-hidden
                className="pointer-events-none absolute top-[4%] left-1/2 h-[4px] w-[26%] -translate-x-1/2 rounded-full bg-line/30"
              />
            )}
          </button>
        ))}
      </div>

      {/* body */}
      <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-11 px-[30px] pt-[26px] pb-[30px] max-mid:grid-cols-1 max-mid:gap-8 max-mid:px-6">
        <div>
          <p className="mt-0 mb-[22px] max-w-[54ch] text-[15.5px] leading-[1.7] text-pretty text-fg-80">
            {copy.blurb}
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {project.repo && (
              <Pill
                href={project.repo}
                target="_blank"
                rel="noopener"
                className="px-[22px] py-[11px] text-[12.5px]"
              >
                <GitHubMark />
                GitHub
              </Pill>
            )}
            {project.store && (
              <Pill
                href={project.store}
                target="_blank"
                rel="noopener"
                variant="primary"
                className="px-[22px] py-[11px] text-[12.5px]"
              >
                {t.projects.viewOnStore}
              </Pill>
            )}
            {project.site && (
              <Pill
                href={project.site}
                target="_blank"
                rel="noopener"
                variant="primary"
                className="px-[22px] py-[11px] text-[12.5px]"
              >
                {t.projects.visitSite}
              </Pill>
            )}
          </div>
        </div>

        <dl className="m-0 grid content-start">
          {copy.facts.map((fact) => (
            <div
              key={fact.label}
              className="flex justify-between gap-[18px] border-b border-line/10 py-[11px]"
            >
              <dt className="font-mono text-[11.5px] tracking-[0.09em] text-fg-60">
                {fact.label}
              </dt>
              <dd className="m-0 text-right text-[14px] text-fg-88">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {zoomed !== null && (
        <ShotLightbox
          src={project.shots[zoomed]}
          alt={shotAlt(zoomed)}
          shotType={project.shotType}
          closeLabel={t.projects.shotClose}
          onClose={() => setZoomed(null)}
        />
      )}

      {/* footer marquee */}
      <div className="overflow-hidden border-t border-line/12 bg-marquee py-[9px]">
        <div className="flex w-max animate-marquee">
          {[false, true].map((isClone) => (
            <div
              key={String(isClone)}
              aria-hidden={isClone || undefined}
              className="flex gap-[18px] pr-[18px] font-mono text-[11.5px] whitespace-nowrap text-fg-66"
            >
              {project.tech.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/** Octocat mark, 15px, inherits the pill's text color. */
function GitHubMark() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.34c-2.23.49-2.7-1.07-2.7-1.07-.36-.93-.89-1.18-.89-1.18-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .66-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.54-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}
