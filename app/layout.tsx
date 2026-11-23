import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/app/lib/lang-context";
import { translations } from "@/app/translations";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/**
 * Metadata is resolved on the server, before any client state exists, so it
 * cannot follow the in-page toggle. Spanish is the default the page renders in;
 * to make the tab title switch too, the locale has to live in the URL
 * (`/en`, `/es`) or a cookie so the server can read it.
 */
export const metadata: Metadata = {
  title: translations.es.meta.title,
  description: translations.es.meta.description,
};

/**
 * Runs before first paint: opts the page into the scroll-reveal hidden state
 * (see globals.css). If the app has not hydrated 4s later — bundle failed or
 * blocked — the class comes off again so the content shows without animation.
 * `Reveal` sets `data-reveal-live` once it mounts.
 */
const revealBootstrap = `(function(){var d=document.documentElement;d.classList.add("js-reveal");setTimeout(function(){if(!d.hasAttribute("data-reveal-live"))d.classList.remove("js-reveal")},4000)})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      // the bootstrap script edits <html> attributes before hydration
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootstrap }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
