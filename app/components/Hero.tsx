"use client";

import Pill from "./Pill";
import Reveal from "./Reveal";
import SocialList from "./SocialList";
import { site, socials } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

export default function Hero() {
  const { t } = useLang();

  return (
    <header
      id="d-top"
      className="relative grid min-h-svh grid-cols-[minmax(0,1fr)_300px] items-center gap-14 px-10 pt-[120px] pb-[60px] max-mid:grid-cols-1 max-mid:gap-12 max-mid:px-6 max-mid:pt-[104px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[14%] right-[6%] size-[420px] animate-float rounded-full bg-[radial-gradient(circle,oklch(0.78_0.15_60/0.14),transparent_68%)] blur-[10px] max-mid:size-[280px]"
      />

      {/*
        `@container` makes the headline scale against this column rather than
        the viewport. Next to the 300px social list the column is far narrower
        than the screen, and viewport units overflowed it — a long word like
        "Desarrollador" ran past the edge and was clipped by the body's
        overflow-x between roughly 900px and 1400px.
      */}
      <div className="relative @container">
        <Reveal index={0} className="mb-[22px] font-mono text-[13px] text-amber">
          const role = &quot;{site.role}&quot;
          <span className="animate-blink">_</span>
        </Reveal>

        <Reveal
          as="h1"
          index={1}
          className="m-0 text-[clamp(40px,13cqw,150px)] leading-[0.88] font-bold tracking-[-0.045em]"
        >
          {t.hero.titleLine1}
        </Reveal>

        <Reveal
          as="h2"
          index={2}
          className="m-0 pl-[0.06em] text-[clamp(34px,10.6cqw,124px)] leading-[0.9] font-normal tracking-[-0.045em] text-dim"
        >
          {t.hero.titleLine2}
        </Reveal>

        <Reveal
          as="p"
          index={3}
          className="mt-[34px] mb-0 max-w-[52ch] text-[16.5px] leading-[1.65] text-pretty text-fg-78"
        >
          {t.hero.tagline}
        </Reveal>

        <Reveal index={4} className="mt-[34px] flex flex-wrap gap-3">
          <Pill
            href="#d-projects"
            variant="primary"
            className="px-[26px] py-[13px] text-[13px]"
          >
            {t.hero.ctaProjects}
          </Pill>
          <Pill href="#d-contact" className="px-[26px] py-[13px] text-[13px]">
            {t.hero.ctaContact}
          </Pill>
        </Reveal>
      </div>

      <Reveal index={4} className="self-end max-mid:self-auto">
        <SocialList socials={socials} />
      </Reveal>
    </header>
  );
}
