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
  brandColor: string;
  brandSubColor: string;
  brandLabel: string;
  description?: string;
  tags?: string[];
  href?: string;
  live?: boolean;
};

const projects: Project[] = [
  {
    name: "PulseAI",
    tag: "AI Web App",
    gradient: "from-[#0d1a06] via-[#0a120a] to-[#0a0a0a]",
    accent: "bg-lime-500/20 text-lime-300",
    brandColor: "#a3e635",
    brandSubColor: "#3d5c10",
    brandLabel: "AI Workout Coach",
    description: "AI-powered workout plan generator — personalized weekly training plans with exercise videos and muscle diagrams.",
    tags: ["AI", "Next.js", "Claude API"],
    href: "https://pulseai-alpha-eight.vercel.app",
    live: true,
  },
  {
    name: "Rahil Therapy",
    tag: "Full-Stack Practice Growth",
    gradient: "from-[#1a0a0d] via-[#120a0e] to-[#0a0a0a]",
    accent: "bg-rose-400/20 text-rose-300",
    brandColor: "#C99488",
    brandSubColor: "#6b3c35",
    brandLabel: "روانشناس عمومی · Dubai · Diaspora",
    description: "End-to-end digital practice for a Persian-speaking psychologist serving the Iranian diaspora. Persian RTL site + dedicated /parents hub targeting adult children of aging parents (logotherapy specialty), 11 SEO-optimized articles, daily AI blog automation, PageSpeed 100, Instagram pipeline with ElevenLabs voice cloning + Kling AI video, Telegram channel, Dubai landing page. Booking funnel converts at 4×, fully automated content engine runs 24/7.",
    tags: ["معنادرمانی Niche", "PageSpeed 100", "Voice Clone", "Kling AI Video", "WCAG AA+", "11 Articles"],
    href: "https://rahiltherapy.com",
    live: true,
  },
  {
    name: "Aurora Coffee",
    tag: "Brand Identity + Website",
    gradient: "from-[#1a1006] via-[#120d08] to-[#0a0a0a]",
    accent: "bg-amber-500/20 text-amber-300",
    brandColor: "#f59e0b",
    brandSubColor: "#6b4c10",
    brandLabel: "Specialty Coffee",
  },
  {
    name: "Lumen Yoga",
    tag: "Website + AI Visuals",
    gradient: "from-[#061a16] via-[#08120f] to-[#0a0a0a]",
    accent: "bg-teal-500/20 text-teal-300",
    brandColor: "#2dd4bf",
    brandSubColor: "#0f5c52",
    brandLabel: "Mind & Body",
  },
  {
    name: "Northwind Consulting",
    tag: "Brand Identity + Automation",
    gradient: "from-[#060a1a] via-[#080a12] to-[#0a0a0a]",
    accent: "bg-blue-500/20 text-blue-300",
    brandColor: "#60a5fa",
    brandSubColor: "#1a3a6b",
    brandLabel: "Strategy & Growth",
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
                  className={`h-64 bg-gradient-to-br ${p.gradient} flex flex-col`}
                >
                  {/* Brand visual area */}
                  <div className="flex-1 flex items-center justify-center px-7 pt-7">
                    <div className="text-center">
                      <div
                        className="font-black text-3xl tracking-[-0.03em] leading-none mb-2"
                        style={{ color: p.brandColor }}
                      >
                        {p.name}
                      </div>
                      <div
                        className="text-[10px] font-black tracking-[0.3em] uppercase"
                        style={{ color: p.brandSubColor }}
                      >
                        {p.brandLabel}
                      </div>
                    </div>
                  </div>
                  {/* Bottom info */}
                  <div className="flex flex-col px-7 pb-6 gap-2">
                    {p.live && (
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 bg-[#f97316] text-black w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        Live Project
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`inline-block text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full w-fit ${p.accent}`}>
                        {p.tag}
                      </span>
                      <h3 className="text-[#fafafa] font-black text-sm uppercase tracking-widest">{p.name}</h3>
                    </div>
                  </div>
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
          Rahil Therapy is a live client · PulseAI is a live product · Others are spec projects
        </p>
      </div>
    </section>
  );
}
