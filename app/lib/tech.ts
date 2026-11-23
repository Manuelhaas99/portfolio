/**
 * Presentation rules for the circular technology marks (stack section + card
 * badges). Purely visual — no filtering logic lives here.
 */

/** Hand-tuned monograms; anything missing falls back to `deriveInitials`. */
const SHORT_LABELS: Record<string, string> = {
  JavaScript: "JS",
  TypeScript: "TS",
  Python: "PY",
  "REST APIs": "API",
  "CSS Modules": "CSSM",
  "Redux Toolkit": "RTK",
  "TanStack Query": "TSQ",
  "React Native": "RN",
  "React Hook Form": "RHF",
  "Next.js": "NEXT",
  Supabase: "SUPA",
  Playwright: "PW",
  Reanimated: "REA",
  Tailwind: "TW",
  // Android side. Without these the fallback spells the whole word out and
  // shrinks it to fit — "KOTLIN" at half size, or "VIEW" for ViewModel.
  Kotlin: "KT",
  "Jetpack Compose": "JC",
  Android: "AND",
  OkHttp: "OKH",
  ViewModel: "VM",
  Gradle: "GRD",
};

/**
 * Official marks, monochrome so they take the circle's own text colour — which
 * means they turn amber along with it when the technology is selected. The
 * files live in `public/logos` rather than coming from a CDN at run time, so
 * the page owes nothing to an external host.
 *
 * Only these seven exist as real logos. Retrofit, OkHttp and Gson are Square
 * libraries with no mark of their own; Room, ViewModel and Navigation Compose
 * are AndroidX components; Kotlinx Serialization has none either. Coil does
 * have an icon in the usual sets, but it belongs to a different company of the
 * same name, so it would be the wrong brand. All of those keep their monogram.
 */
const LOGOS: Record<string, string> = {
  Kotlin: "/logos/kotlin.svg",
  "Jetpack Compose": "/logos/jetpack-compose.svg",
  Android: "/logos/android.svg",
  "Material 3": "/logos/material.svg",
  Gradle: "/logos/gradle.svg",
  Git: "/logos/git.svg",
  "Riot Games API": "/logos/riot-games.svg",
};

/** Path to the technology's logo, or `undefined` when it has no official one. */
export function techLogo(name: string): string | undefined {
  return LOGOS[name];
}

/** Brand fill / text pairs. Drop an entry once a real SVG logo replaces it. */
const BRANDS: Record<string, { bg: string; fg: string; label?: string }> = {
  JavaScript: { bg: "#f7df1e", fg: "#111", label: "JS" },
  TypeScript: { bg: "#3178c6", fg: "#fff", label: "TS" },
};

const AMBER = "oklch(0.78 0.15 60)";
const INK = "oklch(0.17 0.012 250)";
const PLACEHOLDER_BG = "oklch(0.24 0.015 250)";
const PLACEHOLDER_FG = "oklch(0.88 0.01 250)";
const PLACEHOLDER_BORDER = "oklch(0.93 0.006 250 / 0.16)";

export function deriveInitials(name: string): string {
  const short = SHORT_LABELS[name];
  if (short) return short;

  const clean = name.replace(/[^A-Za-z0-9 .]/g, "");
  const parts = clean.split(/[ .]+/).filter(Boolean);
  if (parts.length > 1) return parts.map((p) => p[0]).join("").toUpperCase();
  return clean.length <= 6 ? clean.toUpperCase() : clean.slice(0, 4).toUpperCase();
}

/** Shrink factor so longer monograms still fit the circle. */
export function fitRatio(label: string): number {
  const n = String(label).length;
  if (n <= 2) return 1;
  if (n === 3) return 0.82;
  if (n === 4) return 0.66;
  return 0.52;
}

export function fitFontSize(label: string, base: number): string {
  return `${Math.round(base * fitRatio(label))}px`;
}

export type TechMarkStyle = {
  name: string;
  label: string;
  fontSize: string;
  background: string;
  color: string;
  borderColor: string;
  /** selection ring; `undefined` when the mark is not selected */
  boxShadow?: string;
  /** dotted texture opacity — 0 for brand-filled marks */
  dots: number;
  isBrand: boolean;
};

/**
 * @param name  full technology name
 * @param base  font size for a 2-character monogram (32 in the stack, 15 on badges)
 */
export function techMark(
  name: string,
  base: number,
  selected = false,
): TechMarkStyle {
  const brand = BRANDS[name];
  const label = brand?.label ?? deriveInitials(name);

  if (brand) {
    return {
      name,
      label,
      fontSize: fitFontSize(label, base),
      background: brand.bg,
      color: brand.fg,
      borderColor: selected ? AMBER : brand.bg,
      boxShadow: selected ? `0 0 0 4px ${AMBER}` : undefined,
      dots: 0,
      isBrand: true,
    };
  }

  return {
    name,
    label,
    fontSize: fitFontSize(label, base),
    background: selected ? AMBER : PLACEHOLDER_BG,
    color: selected ? INK : PLACEHOLDER_FG,
    borderColor: selected ? AMBER : PLACEHOLDER_BORDER,
    boxShadow: selected ? "0 0 0 4px oklch(0.78 0.15 60 / 0.35)" : undefined,
    dots: 0.45,
    isBrand: false,
  };
}
