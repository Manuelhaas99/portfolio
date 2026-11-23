"use client"

import { useLang } from "@/app/lib/lang-context";

export function LangToggle(){
    const { lang, toggleLang } = useLang()

    return (
        <button onClick={ toggleLang }>
            {lang === "es" ? "EN" : "ES"}
        </button>
    )
}