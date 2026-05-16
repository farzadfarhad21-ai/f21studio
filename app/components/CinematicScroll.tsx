"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = [
  { id: 1, name: "THE VOID",   tagline: "Before the idea,\nthere is silence.",   desc: "Every brand begins in darkness — a blank canvas waiting for direction." },
  { id: 2, name: "THE SPARK",  tagline: "Then intelligence\nignites.",            desc: "AI processes thousands of signals to find the thread that makes your brand unforgettable." },
  { id: 3, name: "THE TOOLS",  tagline: "Strategy meets\nexecution.",             desc: "Design systems, automation, and precision tools assembled in real time." },
  { id: 4, name: "THE OUTPUT", tagline: "Your brand,\nmaterialized.",             desc: "Websites, visuals, and assets that command attention across every surface." },
  { id: 5, name: "THE RESULT", tagline: "The world sees you\ndifferently now.",  desc: "A brand that scales. A presence that lasts. Built by F21 Studio." },
];

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoReady, setVideoReady] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // iOS Safari's momentum scroll doesn't fire synchronous JS scroll events —
    // ScrollTrigger.onUpdate misses the coasting phase entirely without this.
    try { ScrollTrigger.normalizeScroll(true); } catch { /* ignore if Observer unavailable */ }

    const video = videoRef.current;
    if (!video) return;

    let scrollInitialized = false;
    let raf: number;

    // ── Scroll init ─────────────────────────────────────────────────────────
    // Sets up GSAP ScrollTrigger. Independent of video load state so it can
    // run as early as possible (desktop: on canplaythrough, iOS: on first touch).
    const initScroll = () => {
      if (scrollInitialized) return;
      scrollInitialized = true;

      gsap.set(textRefs.current[0], { opacity: 1, y: 0 });
      textRefs.current.slice(1).forEach(el => el && gsap.set(el, { opacity: 0, y: 24 }));
      gsap.set(dotRefs.current[0], { scale: 1.5, backgroundColor: "#a855f7" });
      dotRefs.current.slice(1).forEach(el => el && gsap.set(el, { scale: 1, backgroundColor: "#3f3f46" }));

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            video.currentTime = self.progress * (video.duration || 20);
          });
          const p = self.progress;
          const newIdx = p < 0.2 ? 0 : p < 0.4 ? 1 : p < 0.6 ? 2 : p < 0.8 ? 3 : 4;
          setActiveScene(prev => {
            if (prev === newIdx) return prev;
            const prevEl = textRefs.current[prev];
            const currEl = textRefs.current[newIdx];
            const prevDot = dotRefs.current[prev];
            const currDot = dotRefs.current[newIdx];
            if (prevEl) gsap.to(prevEl, { opacity: 0, y: newIdx > prev ? -20 : 20, duration: 0.3 });
            if (currEl) gsap.fromTo(currEl, { opacity: 0, y: newIdx > prev ? 24 : -24 }, { opacity: 1, y: 0, duration: 0.4 });
            if (prevDot) gsap.to(prevDot, { scale: 1, backgroundColor: "#3f3f46", duration: 0.3 });
            if (currDot) gsap.to(currDot, { scale: 1.5, backgroundColor: "#a855f7", duration: 0.3 });
            return newIdx;
          });
        },
      });
    };

    // ── Video visibility ─────────────────────────────────────────────────────
    // Show the video only when it actually has frame data. On desktop this fires
    // shortly after load. On iOS it fires after play() is called (below).
    const onVideoData = () => {
      video.pause();
      video.currentTime = 0;
      setVideoReady(true);
    };
    video.addEventListener("loadeddata", onVideoData, { once: true });

    // ── iOS Safari unlock ────────────────────────────────────────────────────
    // iOS ignores preload and won't fetch any video data until play() is called
    // inside a user gesture. We listen on every touchstart (not `once`) and retry
    // until play() succeeds — it can fail if the src hasn't resolved yet.
    let iosUnlocked = false;
    const unlockIOS = () => {
      if (iosUnlocked) return;
      video.play().then(() => {
        iosUnlocked = true;
        document.removeEventListener("touchstart", unlockIOS);
        video.pause();
        video.currentTime = 0;
        // Ensure scroll is ready now that iOS has given us a user gesture
        initScroll();
      }).catch(() => {});
    };
    document.addEventListener("touchstart", unlockIOS, { passive: true });

    // ── Video load ────────────────────────────────────────────────────────────
    const supportsWebM = video.canPlayType('video/webm; codecs="vp9"') !== '';
    video.src = supportsWebM ? "/hero-scrub.webm" : "/hero-scrub.mp4";
    video.preload = "auto";
    video.muted = true;
    video.load();

    // Desktop: set up scroll once the browser has enough data
    video.addEventListener("canplaythrough", initScroll, { once: true });

    // Fallback: set up scroll after 2 s regardless of load state
    const fallback = setTimeout(initScroll, 2000);

    return () => {
      clearTimeout(fallback);
      cancelAnimationFrame(raf);
      document.removeEventListener("touchstart", unlockIOS);
      video.removeEventListener("loadeddata", onVideoData);
      video.removeEventListener("canplaythrough", initScroll);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">
        <video
          ref={videoRef}
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.5s" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,10,10,0.6)_100%)] z-10" />
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute bottom-24 left-10 md:left-16 z-20 max-w-lg"
            style={{ opacity: 0 }}
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
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 items-center">
          {scenes.map((_, i) => (
            <div key={i} ref={(el) => { dotRefs.current[i] = el; }} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#3f3f46" }} />
          ))}
        </div>
        <div className="absolute top-8 right-8 z-30 text-right">
          <span className="text-[#a855f7] font-mono text-sm font-bold">{String(activeScene + 1).padStart(2, "0")}</span>
          <span className="text-[#3f3f46] font-mono text-sm">/{String(scenes.length).padStart(2, "0")}</span>
        </div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[200px] rounded-full bg-[#a855f7]/8 blur-[100px] pointer-events-none z-10" />
      </div>
    </section>
  );
}
