import { ImageResponse } from "next/og";

export const alt = "F21 Studio — AI systems that grow your business while you sleep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 80% 40%, #3b1764 0%, #0a0a0a 60%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 900, letterSpacing: 6 }}>
          <span style={{ color: "#a855f7" }}>F21</span>&nbsp;STUDIO
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 78, fontWeight: 900, lineHeight: 1, textTransform: "uppercase" }}>
          <span>AI systems that grow</span>
          <span>your business</span>
          <span style={{ color: "#a855f7" }}>while you sleep</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a3a3a3" }}>
          Websites · AI content · SEO · AI agents — Dubai & worldwide
        </div>
      </div>
    ),
    size
  );
}
