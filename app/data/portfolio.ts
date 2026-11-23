/**
 * Language-neutral content: hrefs, names, slugs, years, technology lists and
 * numbers. Anything a reader would see in their own language lives in
 * `app/translations.ts` — these entries only carry the *key* that points at it,
 * typed so a missing translation is a compile error rather than blank text.
 *
 * Proper nouns (people, companies, projects, technologies) and industry titles
 * stay here precisely because they are the same in both languages.
 */

import {translations, Translations} from "../translations";

export type Social = {
  /** brand name, shown as-is in both languages */
  label: string;
  href: string;
};

export type NavLink = {
  key: keyof Translations["nav"];
  href: string;
};

export type FooterLink = {
  key: keyof Translations["footer"]["links"];
  href: string;
};

export type Counter = {
  n: string;
  key: keyof typeof translations.en.about.counters
};

export type Certification = {
  title: string;
  meta: string;
};

export type Project = {
  slug: keyof Translations["projects"]["items"];
  title: string;
  year: string;
  /** GitHub repository — the `GitHub` pill on the card; leave it out for closed-source work */
  repo?: string;
  /** live URL; leave it out and the `visit site ↗` pill is not rendered */
  site?: string;
  /** Google Play listing; leave it out and the store pill is not rendered */
  store?: string;
  /** screenshot frame: `web` is 16/10, `mobile` is a 9/18 phone with bezel */
  shotType: "web" | "mobile";
  /**
   * Screenshot paths under `/public`, left to right. Their alt text lives in
   * `translations.ts` under `projects.items[slug].shots`, in the same order.
   */
  shots: string[];
  /** full technology names; the first 6 become badges on the card header */
  tech: string[];
  /**
   * Left over from the design mockup: its technologies were made up to fill the
   * layout, so they are kept off the stack circles. Drop this flag once the
   * entry describes a real project.
   */
  mockup?: boolean;
};

export type EnquiryType = keyof Translations["contact"]["form"]["enquiryOptions"];

export const site = {
  name: "Manuel Haas",
  firstName: "Manuel",
  lastName: "Haas",
  /** job title — not translated */
  role: "Full stack developer",
  location: "Chiapas, MEX",
  timezone: "GMT-6",
  copyright: "© 2026 Manuel Haas",
  /** the PDF lives in `public/cv/` */
  cvHref: "/cv/CV_Manuel_Haas_v5.pdf",
} as const;

export const socials: Social[] = [
  { label: "github", href: "https://github.com/Manuelhaas99" },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/manuel-haas-ba4a62234/",
  },
];

export const navLinks: NavLink[] = [
  { key: "about", href: "#d-about" },
  { key: "work", href: "#d-work" },
  { key: "stack", href: "#d-stack" },
  { key: "projects", href: "#d-projects" },
  { key: "contact", href: "#d-contact" },
];

export const footerLinks: FooterLink[] = [
  { key: "home", href: "#d-top" },
  { key: "about", href: "#d-about" },
  { key: "stack", href: "#d-stack" },
  { key: "experience", href: "#d-work" },
  { key: "featuredProjects", href: "#d-projects" },
  { key: "allProjects", href: "/projects" },
  { key: "contact", href: "#d-contact" },
];

export const certification: Certification = {
  title: "Introduction to Web Development: HTML and CSS",
  meta: "Google Activate",
};

/** Rendered in this order; the copy for each lives under `experience.jobs`. */
export const jobKeys: (keyof Translations["experience"]["jobs"])[] = [
  "espectroBiomedico",
  "logbookPlatform",
  "jfxStudios",
];


/**
 * PLACEHOLDERS — `repo`, `site` and `shots` below are test values.
 * - repo / site: swap in the real URLs (drop `site` if there is no live version).
 * - shots: the SVGs in `public/screenshots/<slug>/` are generated stand-ins.
 *   Drop real captures in the same folder (web 1600×1000, mobile 1080×2160;
 *   .png, .jpg or .webp) and update the paths here.
 */
export const projects: Project[] = [
  {
    slug: "LeagueAPI",
    title: "League API",
    year: "2025",
    repo: "https://github.com/Manuelhaas99/LeagueOfLegendsApi",
    shotType: "mobile",
    shots: [
      "/screenshots/LeagueAPI/MainScreen-OPGG.png",
      "/screenshots/LeagueAPI/Game-OPGG.png",
    ],
    // Taken from the repo's own app/build.gradle.kts and gradle/libs.versions.toml.
    // The first six become the circles on the card header.
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Android",
      "Material 3",
      "Retrofit",
      "Coil",
      "OkHttp",
      "Gson",
      "Navigation Compose",
      "ViewModel",
      "Riot Games API",
      "Gradle",
      "Git",
    ],
  },
  {
    slug: "school-inventory",
    title: "School Inventory",
    year: "2025",
    repo: "https://github.com/Manuelhaas99/School-Inventory",
    shotType: "mobile",
    shots: [
      "/screenshots/school-inventory/MainScreen.png",
      "/screenshots/school-inventory/ProductDetail.png",
      "/screenshots/school-inventory/InventoryPDF.png",
      "/screenshots/school-inventory/EditScreen.png",
      "/screenshots/school-inventory/CreateItem.png",
      "/screenshots/school-inventory/MainScreenButton.png",
    ],
    // From the repo's app/build.gradle.kts. Room and kotlinx.serialization are
    // there but no networking library, so the data lives on the device.
    tech: [
      "Kotlin",
      "Jetpack Compose",
      "Android",
      "Material 3",
      "Room",
      "Coil",
      "Kotlinx Serialization",
      "Navigation Compose",
      "Gradle",
      "Git",
    ],
  },
  {
    slug: "mashuezus",
    title: "Mashuezus",
    year: "2023",
    // built at JFX Studios — closed source, so no repo; published on Google Play
    store: "https://play.google.com/store/apps/details?id=com.mashuezus.app&hl=es_MX",
    shotType: "mobile",
    shots: [
      "/screenshots/mashuezus/1.webp",
      "/screenshots/mashuezus/2.webp",
      "/screenshots/mashuezus/3.webp",
      "/screenshots/mashuezus/4.webp",
      "/screenshots/mashuezus/5.webp",
    ],
    tech: [
      "Kotlin",
      "Android",
      "Firebase",
      "Google Maps API",
      "Git",
    ],
  },
];

/**
 * The circles in the stack section: the technologies from the real projects
 * only, in the order they first appear and without repeats. Entries flagged
 * `mockup` are skipped so nothing invented ends up here. Derived instead of
 * hand-written so a new project updates the stack on its own — which is why it
 * has to be declared after `projects` rather than above it.
 */
export const languages = [
  ...new Set(projects.filter((p) => !p.mockup).flatMap((p) => p.tech)),
];

export const counters: Counter[] = [
  { n: String(projects.length), key: "shippedProjects" },
  { n: "4", key: "yearsBuilding" },
  // every technology across the real projects, same list as the stack circles
  { n: String(languages.length), key: "toolsInRotation" },
];

export const enquiryTypes: EnquiryType[] = [
  "webApp",
  "landingPage",
  "mobileApp",
  "other",
];
