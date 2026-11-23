"use client";

import { useState } from "react";
import { navLinks, site } from "../data/portfolio";
import { useLang } from "@/app/lib/lang-context";

/**
 * Fixed top bar. Below 900px the centre links collapse into a menu panel.
 * The EN / ES badge toggles the language for the whole page.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const { lang, t, toggleLang } = useLang();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-line/9 bg-ink/78 backdrop-blur-[10px]">
      <div className="flex items-center justify-between px-10 py-[18px] max-mid:px-6">
        <a
          href="#d-top"
          className="font-mono text-[14px] tracking-[0.02em] max-[420px]:text-[12px]"
        >
          <span className="text-amber">&lt;</span> {site.name}{" "}
          <span className="text-amber">/&gt;</span>
        </a>

        <div className="flex gap-6 font-mono text-[12.5px] text-fg-72 max-mid:hidden">
          {navLinks.map((link) => (
            <a key={link.key} href={link.href}>
              {t.nav[link.key]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
            className="rounded-full border border-line/20 px-[11px] py-[5px] font-mono text-[12px] text-fg-72 transition-colors duration-300 hover:border-amber hover:text-amber"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label="Menu"
            onClick={() => setOpen((value) => !value)}
            className="hidden rounded-full border border-line/20 px-[11px] py-[5px] font-mono text-[12px] text-fg-72 transition-colors duration-300 hover:border-amber hover:text-amber max-mid:block"
          >
            {open ? "✕" : "menu"}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="nav-menu"
          className="hidden border-t border-line/9 px-6 pb-5 max-mid:grid"
        >
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/10 py-[13px] font-mono text-[13px] text-fg-72"
            >
              {t.nav[link.key]}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
