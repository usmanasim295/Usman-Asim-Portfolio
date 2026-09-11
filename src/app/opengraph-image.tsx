import { ImageResponse } from "next/og";
import { theme } from "@/config/theme";
import { site } from "@/config/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: theme.colors.background,
          backgroundImage: `radial-gradient(circle at 75% 20%, ${theme.glow.accent}, transparent 60%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: theme.colors.accent,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 700,
            color: theme.colors.textPrimary,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: theme.colors.textSecondary,
            maxWidth: 900,
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
