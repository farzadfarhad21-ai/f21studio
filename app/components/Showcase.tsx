"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Aurora Coffee",
    tag: "Brand Identity + Website",
    gradient: "from-amber-950 via-orange-900/70 to-purple-950",
    accent: "bg-amber-500/20 text-amber-300",
  },
  {
    name: "Lumen Yoga",
    tag: "Website + AI Visuals",
    gradient: "from-teal-950 via-cyan-900/70 to-indigo-950",
    accent: "bg-teal-500/20 text-teal-300",
  },
  {
    name: "Northwind Consulting",
    tag: "Brand Identity + Automation",
    gradient: "from-slate-900 via-blue-950 to-purple-950",
    accent: "bg-blue-500/20 text-blue-300",
  },
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".showcase-heading",
        { opacity: 0, y: 30, immediateRender: false },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
          },
        }
      );
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 60, immediateRender: false },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="showcase-heading text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#a855f7]">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] mt-4">
            Our Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              className="project-card group relative rounded-2xl overflow-hidden border border-[#262626] hover:border-[#a855f7]/50 hover:-translate-y-1 transition-all duration-300 cursor-default"
            >
              <div
                className={`h-64 bg-gradient-to-br ${p.gradient} flex flex-col justify-end p-7`}
              >
                <span
                  className={`inline-block text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3 w-fit ${p.accent}`}
                >
                  {p.tag}
                </span>
                <h3 className="text-[#fafafa] font-bold text-xl">{p.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#525252] text-xs mt-8 tracking-wide">
          Demonstration projects showcasing our capabilities.
        </p>
      </div>
    </section>
  );
}
