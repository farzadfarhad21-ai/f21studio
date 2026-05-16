"use client";
import { useEffect, useRef, useState } from "react";

const scenes = [
  { id: 1, name: "THE VOID",   tagline: "Before the idea,\nthere is silence.",   desc: "Every brand begins in darkness — a blank canvas waiting for direction.",                                     start: 0,   end: 0.2 },
  { id: 2, name: "THE SPARK",  tagline: "Then intelligence\nignites.",            desc: "AI processes thousands of signals to find the thread that makes your brand unforgettable.",                 start: 0.2, end: 0.4 },
  { id: 3, name: "THE TOOLS",  tagline: "Strategy meets\nexecution.",             desc: "Design systems, automation, and precision tools assembled in real time.",                                   start: 0.4, end: 0.6 },
  { id: 4, name: "THE OUTPUT", tagline: "Your brand,\nmaterialized.",             desc: "Websites, visuals, and assets that command attention across every surface.",                                start: 0.6, end: 0.8 },
  { id: 5, name: "THE RESULT", tagline: "The world sees you\ndifferently now.",  desc: "A brand that scales. A presence that lasts. Built by F21 Studio.",                                         start: 0.8, end: 1.0 },
];

const VIDEO_DURATION = 20;

type TextStyle = { opacity: number; y: number };

function computeStyles(progress: number): { styles: TextStyle[]; active: number } {
  const styles = scenes.map((scene) => {
    const { start, end } = scene;
    const fadeW = (end - start) * 0.25;
    const fadeInEnd = start + fadeW;
    const fadeOutStart = end - fadeW;

    if (progress < start || progress > end) {
      return { opacity: 0, y: progress <= start ? 20 : -20 };
    }
    if (progress < fadeInEnd) {
      const t = (progress - start) / fadeW;
      return { opacity: t, y: 20 * (1 - t) };
    }
    if (progress > fadeOutStart) {
      const t = (progress - fadeOutStart) / fadeW;
      return { opacity: 1 - t, y: -20 * t };
    }
    return { opacity: 1, y: 0 };
  });

  const idx = scenes.findIndex((s) => progress >= s.start && progress < s.end);
  return { styles, active: idx === -1 ? scenes.length - 1 : idx };
}

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [textStyles, setTextStyles] = useState<TextStyle[]>(
    scenes.map((_, i) => ({ opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 }))
  );

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setVideoReady(true);
      return;
    }

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // WebM (VP9) for Chrome/Firefox — faster seek. MP4 fallback for Safari.
    const supportsWebM = video.canPlayType('video/webm; codecs="vp9"') !== '';
    video.src = supportsWebM ? "/hero-scrub.webm" : "/hero-scrub.mp4";
    video.load();
    video.play().then(() => video.pause()).catch(() => {});
    video.currentTime = 0;
    setVideoReady(true);

    let rafId: number;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      video.pause();
      video.currentTime = progress * VIDEO_DURATION;

      const { styles, active } = computeStyles(progress);
      setTextStyles(styles);
      setActiveScene(active);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">

        {/* Scroll-scrubbed video — src set in JS to prevent autoplay */}
        <video
          ref={videoRef}
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.5s" }}
        />

        {/* Dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,10,10,0.6)_100%)] z-10" />

        {/* Text overlays — one per scene */}
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            className="absolute bottom-24 left-10 md:left-16 z-20 max-w-lg"
            style={{
              opacity: textStyles[i].opacity,
              transform: `translateY(${textStyles[i].y}px)`,
              willChange: "opacity, transform",
            }}
          >
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#a855f7] block mb-4">
              {String(scene.id).padStart(2, "0")} — {scene.name}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] leading-[1.1] mb-4 whitespace-pre-line">
              {scene.tagline}
            </h2>
            <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed max-w-sm">
              {scene.desc}
            </p>
          </div>
        ))}

        {/* Progress dots — right side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 items-center">
          {scenes.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width:           i === activeScene ? "10px" : "6px",
                height:          i === activeScene ? "10px" : "6px",
                backgroundColor: i === activeScene ? "#a855f7" : "#3f3f46",
              }}
            />
          ))}
        </div>

        {/* Scene counter — top right */}
        <div className="absolute top-8 right-8 z-30 text-right">
          <span className="text-[#a855f7] font-mono text-sm font-bold">
            {String(activeScene + 1).padStart(2, "0")}
          </span>
          <span className="text-[#3f3f46] font-mono text-sm">
            /{String(scenes.length).padStart(2, "0")}
          </span>
        </div>

        {/* Purple ambient glow */}
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[200px] rounded-full bg-[#a855f7]/8 blur-[100px] pointer-events-none z-10" />
      </div>
    </section>
  );
}
