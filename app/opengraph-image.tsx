import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = `${siteConfig.name} — Wedding Invitation Websites`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #f7ece9 0%, #fdfbf7 100%)",
          color: "#443c36",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid #e8c4bd",
            borderRadius: 24,
            padding: "72px 96px",
            background: "#ffffff",
          }}
        >
          <div style={{ fontSize: 88, fontStyle: "italic", color: "#a05c56" }}>
            {siteConfig.name}
          </div>
          <div style={{ fontSize: 40, marginTop: 24, textAlign: "center" }}>
            Wedding Invitation Websites
          </div>
          <div style={{ fontSize: 26, marginTop: 20, color: "#8a7462" }}>
            Browse a design · Message us · Share your link
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
