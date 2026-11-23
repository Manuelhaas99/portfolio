"use client";

import ContactForm from "./ContactForm";
import Footer from "./Footer";
import Pill from "./Pill";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SocialList from "./SocialList";
import { site, socials } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

export default function Contact() {
  const { t } = useLang();

  return (
    <section
      id="d-contact"
      className="border-t border-line/10 px-10 pt-[100px] pb-[70px] max-mid:px-6 max-mid:pt-[72px]"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-16 max-mid:grid-cols-1 max-mid:gap-10">
        <Reveal index={0}>
          <SectionHeading className="mb-[18px]">
            {t.contact.heading}
          </SectionHeading>
          <p className="mt-0 mb-7 max-w-[44ch] text-[16px] leading-[1.65] text-pretty text-fg-78">
            {t.contact.intro}
          </p>
          <SocialList socials={socials} dense />
          <Pill href={site.cvHref} download className="mt-[26px] px-6 py-3 text-[12.5px]">
            {t.contact.downloadCv}
          </Pill>
        </Reveal>

        <Reveal index={1}>
          <ContactForm />
        </Reveal>
      </div>

      <Footer />
    </section>
  );
}
