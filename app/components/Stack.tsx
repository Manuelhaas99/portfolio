"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import TechCircle from "./TechCircle";
import { languages } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

/** `interface` on purpose — see the note in `Projects.tsx`. */
interface StackProps {
  /** currently filtered technology, if any */
  activeTech?: string | null;
  /** toggles the filter and jumps to #d-projects — wire your state here */
  onSelectTech?: (name: string) => void;
}

export default function Stack({ activeTech = null, onSelectTech }: StackProps) {
  const { t } = useLang();

  return (
    <section
      id="d-stack"
      className="border-t border-line/10 px-10 py-[100px] max-mid:px-6 max-mid:py-[72px]"
    >
      <Reveal
        index={0}
        className="mb-10 flex flex-wrap items-baseline justify-between gap-[14px]"
      >
        <SectionHeading>{t.stack.heading}</SectionHeading>
        <span className="font-mono text-[12px] text-fg-66">{t.stack.hint}</span>
      </Reveal>

      <Reveal index={1} className="flex flex-wrap gap-[26px] max-mid:gap-5">
        {languages.map((language) => (
          <TechCircle
            key={language}
            name={language}
            variant="stack"
            selected={activeTech === language}
            onSelect={onSelectTech}
          />
        ))}
      </Reveal>
    </section>
  );
}
