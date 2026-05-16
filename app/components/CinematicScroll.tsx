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
    src: "/scenes/scene-1-void.png",
    fallback: "linear-gradient(135deg, #0a0a0a 0%, #160a2e 60%, #0a0a0a 100%)",
  },
  {
    id: 2,
    name: "The Spark",
    tagline: "Then intelligence\nignites.",
    description:
      "AI processes thousands of signals to find the thread that makes your brand unforgettable.",
    src: "/scenes/scene-2-spark.png",
    fallback: "linear-gradient(135deg, #0a0a0a 0%, #2e0a1a 40%, #1a0535 100%)",
  },
  {
    id: 3,
    name: "The Tools",
    tagline: "Strategy meets\nexecution.",
    description:
      "Design systems, automation, and precision tools assembled in real time.",
    src: "/scenes/scene-3-tools.png",
    fallback: "linear-gradient(135deg, #080820 0%, #0a1535 50%, #1a0535 100%)",
  },
  {
    id: 4,
    name: "The Output",
    tagline: "Your brand,\nmaterialized.",
    description:
      "Websites, visuals, and assets that command attention across every surface.",
    src: "/scenes/scene-4-output.png",
    fallback: "linear-gradient(135deg, #0a0a0a 0%, #1a0535 40%, #2d0a4e 100%)",
  },
  {
    id: 5,
    name: "The Result",
    tagline: "The world sees you\ndifferently now.",
    description:
      "A brand that scales. A presence that lasts. Built by F21 Studio.",
    src: "/scenes/scene-5-result.png",
    fallback: "linear-gradient(135deg, #0a0010 0%, #1a0535 30%, #a855f7 200%)",
  },
];

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const images = imageRefs.current;
      const texts = textRefs.current;
      const dots = dotRefs.current;

      // Set initial state: only first scene visible
      gsap.set(images.slice(1), { opacity: 0 });
      gsap.set(texts.slice(1), { opacity: 0, y: 30 });
      gsap.set(dots, { scale: 1, backgroundColor: "#3f3f46" });
      gsap.set(dots[0], { scale: 1.4, backgroundColor: "#a855f7" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      scenes.forEach((_, i) => {
        if (i === 0) return;

        const prev = images[i - 1];
        const curr = images[i];
        const prevText = texts[i - 1];
        const currText = texts[i];
        const prevDot = dots[i - 1];
        const currDot = dots[i];

        tl.to(prevText, { opacity: 0, y: -24, duration: 0.25, ease: "power2.in" })
          .to(prev, { opacity: 0, duration: 0.4, ease: "power1.inOut" }, "<0.1")
          .to(prevDot, { scale: 1, backgroundColor: "#3f3f46", duration: 0.3 }, "<")
          .to(curr, { opacity: 1, duration: 0.4, ease: "power1.inOut" }, "<0.15")
          .to(currDot, { scale: 1.4, backgroundColor: "#a855f7", duration: 0.3 }, "<")
          .to(currText, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "<0.1")
          // Hold at this scene for some scrolling distance
          .to({}, { duration: 0.5 });
      });

      // Track active scene for the label
      scenes.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top+=${(i / scenes.length) * 80}% top`,
          end: `top+=${((i + 1) / scenes.length) * 80}% top`,
          onEnter: () => setActiveScene(i),
          onEnterBack: () => setActiveScene(i),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${scenes.length * 120}vh` }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* Scene images stacked */}
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => { imageRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Try real image, fallback to gradient */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${scene.src}), ${scene.fallback}`,
              }}
            />
            {/* Bottom gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-transparent" />
            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#0a0a0a_100%)]" />
          </div>
        ))}

        {/* Text overlays stacked */}
        {scenes.map((scene, i) => (
          <div
            key={`text-${scene.id}`}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute bottom-24 left-10 md:left-16 z-20 max-w-lg"
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
          {scenes.map((scene, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                ref={(el) => { dotRefs.current[i] = el; }}
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: "#3f3f46" }}
              />
            </div>
          ))}
        </div>

        {/* Scene counter top-right */}
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
