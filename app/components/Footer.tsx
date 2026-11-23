"use client";

import { footerLinks, site, socials } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

export default function Footer() {
  const { t } = useLang();

  return (
    <>
      <div className="mt-[72px] flex flex-wrap justify-between gap-7 border-t border-line/12 pt-[26px]">
        <div className="flex flex-wrap gap-x-[22px] gap-y-2 font-mono text-[12px] text-fg-72">
          {footerLinks.map((link) => (
            <a key={link.key} href={link.href}>
              {t.footer.links[link.key]}
            </a>
          ))}
        </div>
        <div className="flex gap-[18px] font-mono text-[12px] text-fg-72">
          {socials.map((social) => (
            <a key={social.label} href={social.href}>
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-[26px] flex flex-wrap justify-between gap-[14px] border-t border-line/12 pt-5 font-mono text-[11.5px] text-fg-60">
        <span>{site.copyright}</span>
        <span>
          {site.location} · {site.timezone}
        </span>
        <span>{t.footer.buildNote}</span>
      </div>
    </>
  );
}
