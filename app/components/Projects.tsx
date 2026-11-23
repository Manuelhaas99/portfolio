"use client";

import Pill from "./Pill";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { projects as allProjects, type Project } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

/**
 * Declared as an `interface`, not a type alias: Next's client-entry check only
 * inspects props written as a type literal, and it reads every function prop as
 * a Server Action that must be renamed. These callbacks are passed from client
 * components only — they never cross the server boundary.
 */
interface ProjectsProps {
  /** already-filtered list; defaults to every project */
  projects?: Project[];
  activeTech?: string | null;
  /** number of projects matching the active technology */
  filterCount?: number;
  onSelectTech?: (name: string) => void;
  onClearTech?: () => void;
}

export default function Projects({
  projects = allProjects,
  activeTech = null,
  filterCount = 0,
  onSelectTech,
  onClearTech,
}: ProjectsProps) {
  const { t } = useLang();
  const noResults = Boolean(activeTech) && projects.length === 0;

  const clear = onClearTech
    ? (event: React.MouseEvent) => {
        event.preventDefault();
        onClearTech();
      }
    : undefined;

  return (
    <section
      id="d-projects"
      className="border-t border-line/10 px-10 py-[100px] max-mid:px-6 max-mid:py-[72px]"
    >
      <Reveal
        index={0}
        className="mb-[44px] flex flex-wrap items-baseline justify-between gap-4"
      >
        <SectionHeading>{t.projects.heading}</SectionHeading>

        {activeTech && (
          <a
            href="#d-projects"
            onClick={clear}
            className="flex items-center gap-[10px] rounded-full border border-amber px-[14px] py-2 font-mono text-[12.5px] text-amber"
          >
            <span>
              {t.projects.filtered} {activeTech} · {filterCount}
            </span>
            <span className="opacity-70">{t.projects.clear}</span>
          </a>
        )}
      </Reveal>

      {noResults && (
        <div className="rounded-[20px] border border-line/14 p-[44px] text-center font-mono text-[13px] text-fg-70">
          {t.projects.empty.replace("{tech}", activeTech ?? "")}{" "}
          <a href="#d-projects" onClick={clear} className="text-amber">
            {t.projects.clearFilter}
          </a>
        </div>
      )}

      {/*
        `grid-cols-1` is `minmax(0, 1fr)`, not a plain `auto` column. It matters:
        each card ends in a marquee whose row is `w-max` + `whitespace-nowrap`,
        so its minimum width is the full technology list laid end to end. An
        `auto` column grows to that minimum and drags the card past the right
        edge of the screen, where `overflow-x: hidden` on the body silently
        clips it. Pinning the track minimum to 0 keeps the card at screen width.
      */}
      <div className="grid grid-cols-1 gap-7">
        {projects.map((project, index) => (
          <Reveal key={project.slug} index={index + 1}>
            <ProjectCard
              project={project}
              index={index}
              activeTech={activeTech}
              onSelectTech={onSelectTech}
            />
          </Reveal>
        ))}
      </div>

      <Reveal index={4} className="mt-14 flex justify-center">
        <Pill href="/projects" className="px-[30px] py-[14px] text-[13px]">
          {t.projects.seeAll}
        </Pill>
      </Reveal>
    </section>
  );
}
