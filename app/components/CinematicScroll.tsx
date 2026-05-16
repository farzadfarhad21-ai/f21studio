"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = [
  {
    id: 1,
    name: "DISCOVER",
    tagline: "We start with\nyour story.",
    desc: "Deep discovery into your brand, market, and goals. Every decision that follows flows from this foundation.",
  },
  {
    id: 2,
    name: "STRATEGIZE",
    tagline: "AI finds\nyour edge.",
    desc: "We process market signals and audience behavior to identify exactly what makes your brand unforgettable.",
  },
  {
    id: 3,
    name: "CREATE",
    tagline: "Design systems built\nto perform.",
    desc: "Visual identity, website architecture, and automation — assembled with precision.",
  },
  {
    id: 4,
    name: "BUILD",
    tagline: "Your brand, coded\nto perfection.",
    desc: "High-performance websites and creative infrastructure built to convert at every touchpoint.",
  },
  {
    id: 5,
    name: "LAUNCH",
    tagline: "The world sees you\ndifferently now.",
    desc: "Live across every platform. Built by F21 Studio to scale.",
  },
];

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const textRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const video = videoRef.current;
    if (!video) return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    let raf = 0;
    let scrollReady = false;

    // Scene 1 visible on mount, rest hidden
    gsap.set(textRefs.current[0], { opacity: 1, y: 0 });
    textRefs.current.slice(1).forEach(el => el && gsap.set(el, { opacity: 0, y: 24 }));
    gsap.set(dotRefs.current[0], { scale: 1.5, backgroundColor: "#a855f7" });
    dotRefs.current.slice(1).forEach(el => el && gsap.set(el, { scale: 1, backgroundColor: "#3f3f46" }));

    const initScroll = () => {
      if (scrollReady) return;
      scrollReady = true;

      video.pause();
      video.currentTime = 0;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            if (isFinite(video.duration) && video.duration > 0) {
              video.currentTime = self.progress * video.duration;
            }
          });

          const p = self.progress;
          const newIdx = p < 0.2 ? 0 : p < 0.4 ? 1 : p < 0.6 ? 2 : p < 0.8 ? 3 : 4;
          setActiveScene(prev => {
            if (prev === newIdx) return prev;
            const prevEl  = textRefs.current[prev];
            const currEl  = textRefs.current[newIdx];
            const prevDot = dotRefs.current[prev];
            const currDot = dotRefs.current[newIdx];
            if (prevEl)  gsap.to(prevEl,  { opacity: 0, y: newIdx > prev ? -20 : 20, duration: 0.3 });
            if (currEl)  gsap.fromTo(currEl, { opacity: 0, y: newIdx > prev ? 24 : -24 }, { opacity: 1, y: 0, duration: 0.4 });
            if (prevDot) gsap.to(prevDot, { scale: 1,   backgroundColor: "#3f3f46", duration: 0.3 });
            if (currDot) gsap.to(currDot, { scale: 1.5, backgroundColor: "#a855f7", duration: 0.3 });
            return newIdx;
          });
        },
      });
    };

    // ── iOS ──────────────────────────────────────────────────────────────────
    if (isIOS) {
      video.src     = "/hero-scrub.mp4";
      video.preload = "none";

      const unlockIOS = () => {
        video.play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
            document.removeEventListener("touchstart", unlockIOS, { capture: true });
            initScroll();
            // Cancel any RAF queued by an immediate onUpdate (section already in
            // view) and force back to frame 0 so scene 1 always shows first.
            cancelAnimationFrame(raf);
            video.currentTime = 0;
          })
          .catch(() => {});
      };

      document.addEventListener("touchstart", unlockIOS, { capture: true, passive: true });

      return () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("touchstart", unlockIOS, { capture: true });
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }

    // ── Desktop ───────────────────────────────────────────────────────────────
    const supportsWebM = video.canPlayType('video/webm; codecs="vp9"') !== "";
    video.src     = supportsWebM ? "/hero-scrub.webm" : "/hero-scrub.mp4";
    video.preload = "auto";
    video.load();

    video.addEventListener("canplaythrough", initScroll, { once: true });
    const fallback = setTimeout(initScroll, 3000);

    return () => {
      clearTimeout(fallback);
      cancelAnimationFrame(raf);
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
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(10,10,10,0.6)_100%)] z-10" />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0a0a0a] z-20" />

        {/* Text overlays */}
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute bottom-32 left-10 md:left-16 z-30 max-w-lg"
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

        {/* Progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 items-center">
          {scenes.map((_, i) => (
            <div
              key={i}
              ref={(el) => { dotRefs.current[i] = el; }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#3f3f46" }}
            />
          ))}
        </div>

        {/* Scene counter */}
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
