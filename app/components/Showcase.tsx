"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  name: string;
  tag: string;
  gradient: string;
  accent: string;
  description?: string;
  tags?: string[];
  href?: string;
  live?: boolean;
};

const projects: Project[] = [
  {
    name: "PulseAI",
    tag: "AI Web App",
    gradient: "from-orange-950 via-orange-900/60 to-[#0a0a0a]",
    accent: "bg-orange-500/20 text-orange-300",
    description: "AI-powered workout plan generator — personalized weekly training plans with exercise videos and muscle diagrams.",
    tags: ["AI", "Next.js", "Claude API"],
    href: "https://pulseai-alpha-eight.vercel.app",
    live: true,
  },
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
          stagger: 0.12,
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
    <section id="work" className="relative py-40 px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">

      {/* Big section number */}
      <div
        className="absolute top-16 left-6 text-[180px] font-black leading-none select-none pointer-events-none"
        style={{ color: "rgba(168,85,247,0.06)", letterSpacing: "-0.04em" }}
      >
        02
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto">
        <div className="showcase-heading relative mb-20">
          <p className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7] mb-3">
            Portfolio
          </p>
          <div className="w-10 h-[3px] bg-[#a855f7]" />
          <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] mt-5 tracking-[-0.03em] leading-[1.05]">
            Our Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => {
            const CardWrapper = p.href
              ? ({ children }: { children: React.ReactNode }) => (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card group relative rounded-2xl overflow-hidden border border-[#1f1f1f] hover:border-[#f97316]/50 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(249,115,22,0.12)] transition-all duration-300 block"
                  >
                    {children}
                  </a>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <div className="project-card group relative rounded-2xl overflow-hidden border border-[#1f1f1f] hover:border-[#a855f7]/40 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(168,85,247,0.08)] transition-all duration-300 cursor-default">
                    {children}
                  </div>
                );

            return (
              <CardWrapper key={p.name}>
                <div
                  className={`h-64 bg-gradient-to-br ${p.gradient} flex flex-col justify-end p-7`}
                >
                  {p.live && (
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 bg-[#f97316] text-black w-fit mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                      Live Project
                    </span>
                  )}
                  <span className={`inline-block text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full mb-3 w-fit ${p.accent}`}>
                    {p.tag}
                  </span>
                  <h3 className="text-[#fafafa] font-black text-xl uppercase tracking-[-0.01em]">{p.name}</h3>
                </div>

                {p.description && (
                  <div className="bg-[#111111] p-5 flex flex-col gap-3">
                    <p className="text-[#737373] text-sm leading-relaxed" style={{ maxWidth: "none" }}>
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2 flex-wrap">
                        {p.tags?.map(tag => (
                          <span key={tag} className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 bg-[#1a1a1a] text-[#a855f7] border border-[#a855f7]/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[#f97316] text-xs font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-200">
                        View Live →
                      </span>
                    </div>
                  </div>
                )}
              </CardWrapper>
            );
          })}
        </div>

        <p className="text-center text-[#3f3f3f] text-xs mt-8 tracking-wide font-black uppercase">
          Spec projects showcase our capabilities · PulseAI is a live product
        </p>
      </div>
    </section>
  );
}
