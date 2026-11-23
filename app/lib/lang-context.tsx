"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Lang, type Translations } from "@/app/translations";

const STORAGE_KEY = "lang";
const DEFAULT_LANG: Lang = "es";

type LangContextValue = {
  lang: Lang;
  t: Translations;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue>({
  lang: DEFAULT_LANG,
  t: translations[DEFAULT_LANG],
  setLang: () => {},
  toggleLang: () => {},
});

const isLang = (value: unknown): value is Lang =>
  value === "en" || value === "es";

export function LangProvider({ children }: { children: ReactNode }) {
  // Always starts at DEFAULT_LANG so the client's first render matches the
  // server's; the stored choice is applied in the effect below, after
  // hydration. Reading localStorage during render would desync the two.
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);

  // Reading localStorage during render would make the client's first paint
  // disagree with the server's HTML. One extra render after hydration is the
  // price of a persisted choice without a hydration mismatch.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // oxlint-disable-next-line react/set-state-in-effect
      if (isLang(stored)) setLang(stored);
    } catch {
      // private mode / storage disabled — keep the default
    }
  }, []);

  // Keep <html lang> honest for screen readers, translation prompts and CSS
  // :lang() rules, and remember the choice for the next visit.
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  const toggleLang = useCallback(
    () => setLang((prev) => (prev === "es" ? "en" : "es")),
    [],
  );

  const value = useMemo<LangContextValue>(
    () => ({ lang, t: translations[lang], setLang, toggleLang }),
    [lang, toggleLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// The provider and its hook belong together; splitting them for Fast Refresh
// would buy nothing here.
// oxlint-disable-next-line react/only-export-components
export const useLang = () => useContext(LangContext);
