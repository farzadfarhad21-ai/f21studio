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
        <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 34, fontWeight: 900, letterSpacing: 6, color: "#F5F1E8" }}>
          <svg width="84" height="50" viewBox="0 0 335 200" fill="#F5F1E8">
            <path d="M0 0H173V36H44V76H132L96 111H44V200H0Z" />
            <path d="M145 0H202C246 0 264 45 240 78L141 160H267V200H76L204 73C218 59 212 36 193 36H145Z" />
            <path d="M259 36L306 0H335V200H291V58L259 85Z" />
          </svg>
          F21 STUDIO
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
