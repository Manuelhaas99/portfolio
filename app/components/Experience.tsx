"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { jobKeys } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

export default function Experience() {
  const { t } = useLang();

  return (
    <section
      id="d-work"
      className="border-t border-line/10 px-10 py-[100px] max-mid:px-6 max-mid:py-[72px]"
    >
      <Reveal index={0} className="mb-10">
        <SectionHeading>{t.experience.heading}</SectionHeading>
      </Reveal>

      {jobKeys.map((key, index) => {
        const job = t.experience.jobs[key];

        return (
          <Reveal
            key={key}
            index={index + 1}
            className="grid grid-cols-[190px_90px_minmax(0,1fr)] items-baseline gap-7 border-t border-line/12 py-6 max-mid:grid-cols-1 max-mid:gap-2"
          >
            <span className="font-mono text-[13px] text-amber">
              {job.period}
            </span>
            <span className="font-mono text-[12.5px] text-fg-62">
              {job.length}
            </span>
            <div>
              <div className="text-[21px] font-medium">{job.place}</div>
              <div className="mt-1 text-[14px] text-fg-74">{job.role}</div>
            </div>
          </Reveal>
        );
      })}

      <div className="border-t border-line/12" />
    </section>
  );
}
