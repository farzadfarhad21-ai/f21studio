"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-col",
        { opacity: 0, y: 40, immediateRender: false },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="about" className="relative py-40 px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">

      {/* Big section number */}
      <div
        className="absolute top-16 left-6 text-[180px] font-black leading-none select-none pointer-events-none"
        style={{ color: "rgba(168,85,247,0.06)", letterSpacing: "-0.04em" }}
      >
        02
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="about-col">
          <p className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7] mb-4">
            About F21 Studio
          </p>
          <div className="w-10 h-[3px] bg-[#a855f7] mb-5" />
          <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] leading-[1.05] tracking-[-0.03em]">
            Built by one founder.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#c084fc]">
              Powered by AI.
            </span>
          </h2>
        </div>

        <div className="about-col space-y-5">
          <p className="text-[#a3a3a3] leading-relaxed">
            F21 Studio is a boutique creative agency built at the intersection
            of luxury design and AI innovation. We partner with small businesses
            and ambitious entrepreneurs to craft digital experiences that command
            attention — and automation systems that free up time to focus on
            growth.
          </p>
          <p className="text-[#a3a3a3] leading-relaxed">
            Every project is handled with the precision of a seasoned creative
            team, powered by cutting-edge AI tools that deliver world-class
            results at a fraction of the traditional cost.
          </p>
        </div>
      </div>
    </section>
  );
}
