/**
 * Central design-token configuration.
 *
 * This is the SINGLE SOURCE OF TRUTH for every color used across the app —
 * Tailwind utility classes, raw CSS, and the Three.js hero scene all read
 * from these values. To re-skin the entire site, edit the hex values below;
 * nothing else needs to change.
 *
 * How it flows into the app:
 * 1. `RootLayout` (src/app/layout.tsx) writes these values out as CSS custom
 *    properties (`--color-*`) on `:root`.
 * 2. `src/app/globals.css` declares Tailwind v4 tokens with `@theme inline`
 *    that simply point at those same custom properties, which is what makes
 *    utilities like `bg-background`, `text-ink`, `text-accent`, `border-border`
 *    available everywhere.
 * 3. Client components that need raw JS color values (Three.js materials,
 *    GSAP tweens, inline SVG) import `theme` directly from this file.
 */

export const theme = {
  colors: {
    // Foundation
    background: "#0a0c0e",
    backgroundSecondary: "#0e1114",
    surface: "#14171b",
    surfaceElevated: "#1a1e23",

    // Typography
    textPrimary: "#f2f4f5",
    textSecondary: "#a3adb6",
    textMuted: "#69737d",

    // Accents
    accent: "#3fd6b8",
    accentSecondary: "#5c8df7",

    // Structure
    border: "rgba(242, 244, 245, 0.09)",
    borderStrong: "rgba(242, 244, 245, 0.18)",

    // Status
    success: "#4ade80",
    error: "#f87171",
  },

  /** Soft glow colors used for box-shadows, radial gradients and the 3D scene. */
  glow: {
    accent: "rgba(63, 214, 184, 0.35)",
    accentSecondary: "rgba(92, 141, 247, 0.3)",
  },

  font: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },

  radius: {
    sm: "0.5rem",
    md: "0.875rem",
    lg: "1.25rem",
    xl: "1.75rem",
  },
} as const;

export type Theme = typeof theme;
export type ColorToken = keyof Theme["colors"];

/**
 * Maps each `theme.colors` key to the CSS custom-property name it is
 * published under (without the leading `--color-` prefix). Kept explicit
 * (rather than auto-derived) so the generated class names stay short and
 * intentional, e.g. `textPrimary` -> `--color-ink` -> `text-ink`.
 */
export const COLOR_CSS_VAR_NAMES: Record<ColorToken, string> = {
  background: "background",
  backgroundSecondary: "background-secondary",
  surface: "surface",
  surfaceElevated: "surface-elevated",
  textPrimary: "ink",
  textSecondary: "ink-secondary",
  textMuted: "ink-muted",
  accent: "accent",
  accentSecondary: "accent-secondary",
  border: "border",
  borderStrong: "border-strong",
  success: "success",
  error: "error",
};

/** Serializes the theme into a `--color-*: value;` declaration block for `:root`. */
export function buildThemeCssVariables(activeTheme: Theme = theme): string {
  const colorVars = (Object.keys(activeTheme.colors) as ColorToken[])
    .map((key) => `--color-${COLOR_CSS_VAR_NAMES[key]}: ${activeTheme.colors[key]};`)
    .join("\n");

  const glowVars = Object.entries(activeTheme.glow)
    .map(
      ([key, value]) =>
        `--glow-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${value};`
    )
    .join("\n");

  return `${colorVars}\n${glowVars}`;
}
