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

function MobileScenes() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6">
      <div className="max-w-lg mx-auto flex flex-col gap-16">
        {scenes.map((scene) => (
          <div key={scene.id}>
            <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#a855f7] block mb-3">
              {String(scene.id).padStart(2, "0")} — {scene.name}
            </span>
            <h2 className="text-3xl font-black text-[#fafafa] leading-[1.1] mb-3 whitespace-pre-line">
              {scene.tagline}
            </h2>
            <p className="text-[#a3a3a3] text-sm leading-relaxed">
              {scene.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [videoReady, setVideoReady] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    if (!video) return;

    let initialized = false;
    let raf: number;

    const setupScroll = () => {
      if (initialized) return;
      initialized = true;
      video.pause();
      video.currentTime = 0;
      setVideoReady(true);

      const duration = video.duration || 20;

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
            video.currentTime = self.progress * duration;
          });
          const progress = self.progress;
          const newIdx = progress < 0.2 ? 0 : progress < 0.4 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;
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

    const supportsWebM = video.canPlayType('video/webm; codecs="vp9"') !== '';
    video.src = supportsWebM ? "/hero-scrub.webm" : "/hero-scrub.mp4";
    video.preload = "auto";
    video.muted = true;
    video.load();

    video.addEventListener("canplaythrough", setupScroll, { once: true });
    const fallback = setTimeout(setupScroll, 4000);

    return () => {
      clearTimeout(fallback);
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile]);

  if (isMobile) return <MobileScenes />;

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
