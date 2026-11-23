# Manuel Haas — Developer Portfolio

Personal portfolio built with Next.js (App Router), TypeScript and Tailwind v4.
English and Spanish, with a contact form that emails me through Resend.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Environment variables

The contact form needs these in `.env.local` locally and in the host's settings
in production (see `app/actions/contact.ts`):

| variable | |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com |
| `CONTACT_TO_EMAIL` | inbox the messages are sent to |
| `CONTACT_FROM_EMAIL` | optional sender on a domain verified in Resend |

## Structure

```
app/
  globals.css            design tokens (@theme), base layer, keyframes, reduced-motion
  layout.tsx             fonts (Space Grotesk + JetBrains Mono via next/font)
  page.tsx               section composition
  projects/page.tsx      all-projects route
  translations.ts        every visible string, in English and Spanish
  data/portfolio.ts      language-neutral content (projects, jobs, links, tech)
  actions/contact.ts     Server Action behind the contact form
  lib/tech.ts            monogram + brand-fill rules for the circular tech marks
  components/            one file per section, plus shared pieces
public/
  screenshots/<slug>/    project screenshots
  cv/                    downloadable CV
```

## Design tokens

Colors, fonts, breakpoint and animations live in the `@theme` block of
`app/globals.css` and are used as Tailwind utilities:

| token | utility |
| --- | --- |
| `--color-ink` … `--color-surface-3`, `--color-marquee` | `bg-ink`, `bg-surface`, … |
| `--color-fg`, `--color-fg-80` … `--color-fg-60`, `--color-dim` | `text-fg-72`, `text-dim`, … |
| `--color-amber`, `--color-amber-hi` | `text-amber`, `bg-amber-hi` |
| `--color-line` | hairlines with an alpha modifier: `border-line/12` |
| `--breakpoint-mid: 900px` | `max-mid:` collapses every multi-column grid |
| `--animate-rise / blink / float / marquee` | `animate-float`, … |
