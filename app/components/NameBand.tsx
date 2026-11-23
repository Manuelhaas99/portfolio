"use client";

import Pill from "./Pill";
import Reveal from "./Reveal";
import { site } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

export default function NameBand() {
  const { t } = useLang();

  return (
    <section className="overflow-hidden border-t border-line/10 px-10 py-[90px] max-mid:px-6 max-mid:py-16">
      <Reveal
        index={0}
        className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8 max-mid:grid-cols-1 max-mid:justify-items-center max-mid:gap-6 max-mid:text-center"
      >
        <div className="text-[clamp(40px,7.4vw,116px)] leading-[0.9] font-bold tracking-[-0.045em]">
          {site.firstName}
        </div>

        <div className="flex flex-col items-center gap-[14px]">
          <div className="text-center font-mono text-[12.5px] leading-[1.7] tracking-[0.1em] text-amber">
            {t.nameBand.line1}
            <br />
            {t.nameBand.line2}
          </div>
          <Pill href={site.cvHref} download className="px-[22px] py-[11px] text-[12.5px]">
            {t.nameBand.downloadCv}
          </Pill>
        </div>

        <div className="text-right text-[clamp(40px,7.4vw,116px)] leading-[0.9] font-bold tracking-[-0.045em] text-dim max-mid:text-center">
          {site.lastName}
        </div>
      </Reveal>
    </section>
  );
}
