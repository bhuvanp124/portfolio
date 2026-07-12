import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically generated social preview image.
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#09090B",
          backgroundImage:
            "radial-gradient(1000px 500px at 80% -10%, rgba(59,130,246,0.35), transparent), radial-gradient(800px 500px at 0% 110%, rgba(124,58,237,0.35), transparent)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#a1a1aa",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#3B82F6",
            }}
          />
          {siteConfig.url.replace("https://", "")}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: -2,
            lineHeight: 1.05,
          }}
        >
          {siteConfig.name}
        </div>
        <div style={{ marginTop: 8, fontSize: 44, color: "#3B82F6", fontWeight: 700 }}>
          {siteConfig.role}
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#a1a1aa", maxWidth: 900 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
