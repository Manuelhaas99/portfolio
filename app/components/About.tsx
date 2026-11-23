"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { certification, counters } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

export default function About() {
  const { t } = useLang();

  return (
    <section
      id="d-about"
      className="border-t border-line/10 px-10 py-[100px] max-mid:px-6 max-mid:py-[72px]"
    >
      <Reveal index={0} className="mb-[44px]">
        <SectionHeading>{t.about.heading}</SectionHeading>
      </Reveal>

      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-start gap-16 max-mid:grid-cols-1 max-mid:gap-10">
        <Reveal index={1}>
          <p className="mt-0 mb-4 text-[20px] leading-[1.55] text-pretty">
            {t.about.intro}
          </p>
          <p className="m-0 text-[15.5px] leading-[1.7] text-pretty text-fg-76">
            {t.about.secondary}
          </p>

          <div className="mt-[30px] rounded-[18px] border border-line/14 p-5">
            <div className="mb-3 font-mono text-[11px] tracking-[0.1em] text-fg-60">
              {t.about.certificationsLabel}
            </div>
            <div className="text-[15px]">{certification.title}</div>
            <div className="mt-[3px] text-[12.5px] text-fg-62">
              {certification.meta}
            </div>
          </div>
        </Reveal>

        <Reveal index={2} className="grid content-start gap-4">
          <div className="flex flex-wrap gap-[14px]">
            {counters.map((counter) => (
              <div
                key={counter.key}
                className="flex-[1_1_130px] rounded-[18px] border border-line/14 px-[18px] py-5"
              >
                <div className="text-[38px] leading-none font-bold tracking-[-0.03em] text-amber">
                  {counter.n}
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.1em] text-fg-64">
                  {t.about.counters[counter.key]}
                </div>
              </div>
            ))}
          </div>
          <p className="m-0 text-[14.5px] leading-[1.7] text-pretty text-fg-70">
            {t.about.support}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
