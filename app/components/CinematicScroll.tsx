"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scenes = [
  {
    id: 1,
    name: "The Void",
    tagline: "Before the idea,\nthere is silence.",
    description:
      "Every brand begins in darkness — a blank canvas waiting for direction.",
    timeStart: 0,
    timeEnd: 4,
  },
  {
    id: 2,
    name: "The Spark",
    tagline: "Then intelligence\nignites.",
    description:
      "AI processes thousands of signals to find the thread that makes your brand unforgettable.",
    timeStart: 4,
    timeEnd: 8,
  },
  {
    id: 3,
    name: "The Tools",
    tagline: "Strategy meets\nexecution.",
    description:
      "Design systems, automation, and precision tools assembled in real time.",
    timeStart: 8,
    timeEnd: 12,
  },
  {
    id: 4,
    name: "The Output",
    tagline: "Your brand,\nmaterialized.",
    description:
      "Websites, visuals, and assets that command attention across every surface.",
    timeStart: 12,
    timeEnd: 16,
  },
  {
    id: 5,
    name: "The Result",
    tagline: "The world sees you\ndifferently now.",
    description:
      "A brand that scales. A presence that lasts. Built by F21 Studio.",
    timeStart: 16,
    timeEnd: 20,
  },
];

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScene, setActiveScene] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    if (!video) return;

    // Pause & rewind — we drive playback with scroll
    video.pause();
    video.currentTime = 0;

    const duration = 20; // known length of hero-video.mp4

    const init = () => {
      setVideoReady(true);

      const ctx = gsap.context(() => {
        // Set all texts invisible except first
        textRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
        });
        dotRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            scale: i === 0 ? 1.5 : 1,
            backgroundColor: i === 0 ? "#a855f7" : "#3f3f46",
          });
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            // Scrub video
            video.currentTime = self.progress * duration;

            // Determine active scene
            const t = self.progress * duration;
            const idx = scenes.findIndex(
              (s) => t >= s.timeStart && t < s.timeEnd
            );
            const newIdx = idx === -1 ? scenes.length - 1 : idx;

            setActiveScene((prev) => {
              if (prev === newIdx) return prev;

              // Animate text out → in
              const prevEl = textRefs.current[prev];
              const currEl = textRefs.current[newIdx];
              const prevDot = dotRefs.current[prev];
              const currDot = dotRefs.current[newIdx];

              if (prevEl)
                gsap.to(prevEl, {
                  opacity: 0,
                  y: newIdx > prev ? -20 : 20,
                  duration: 0.35,
                  ease: "power2.in",
                });
              if (currEl)
                gsap.fromTo(
                  currEl,
                  { opacity: 0, y: newIdx > prev ? 24 : -24 },
                  { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
                );
              if (prevDot)
                gsap.to(prevDot, {
                  scale: 1,
                  backgroundColor: "#3f3f46",
                  duration: 0.3,
                });
              if (currDot)
                gsap.to(currDot, {
                  scale: 1.5,
                  backgroundColor: "#a855f7",
                  duration: 0.3,
                });

              return newIdx;
            });
          },
        });
      }, containerRef);

      return () => ctx.revert();
    };

    if (video.readyState >= 2) {
      init();
    } else {
      video.addEventListener("canplay", init, { once: true });
    }

    return () => {
      video.removeEventListener("canplay", init);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${scenes.length * 120}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0a0a0a]">

        {/* Scroll-scrubbed video */}
        <video
          ref={videoRef}
          src="/hero-video.mp4"
          preload="auto"
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.5s" }}
        />

        {/* Dark gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#0a0a0a/60_100%)] z-10" />

        {/* Text overlays — one per scene, stacked */}
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
              {scene.description}
            </p>
          </div>
        ))}

        {/* Progress dots — right side */}
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
