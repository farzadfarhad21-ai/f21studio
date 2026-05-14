"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "🌐",
    title: "Luxury Cinematic Websites",
    desc: "High-end, performance-first websites with cinematic design, smooth animations, and flawless UX.",
    price: "$1,500–$5,000",
  },
  {
    icon: "✨",
    title: "AI Visual Content",
    desc: "Stunning AI-generated imagery, graphics, and brand visuals that stop the scroll.",
    price: "$300–$1,500",
  },
  {
    icon: "🎬",
    title: "AI Video Ads",
    desc: "Conversion-optimised video ads powered by AI — fast, scalable, and on-brand.",
    price: "$500–$2,500",
  },
  {
    icon: "🎨",
    title: "Branding & Logo",
    desc: "Complete brand identity systems: logo, colour palette, typography, and usage guidelines.",
    price: "$400–$2,000",
  },
  {
    icon: "🤖",
    title: "Business AI Automation",
    desc: "Automate repetitive workflows, customer service, and lead generation with intelligent AI.",
    price: "$500–$5,000",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50, immediateRender: false },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="services" className="py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#a855f7]">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] mt-4">
            Our Services
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card group bg-[#141414] border border-[#262626] rounded-2xl p-8 flex flex-col gap-4 hover:border-[#a855f7]/60 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(168,85,247,0.12)] transition-all duration-300 cursor-default"
            >
              <span className="text-4xl">{s.icon}</span>
              <h3 className="text-[#fafafa] font-bold text-xl leading-snug">
                {s.title}
              </h3>
              <p className="text-[#a3a3a3] text-sm leading-relaxed flex-1">
                {s.desc}
              </p>
              <div className="pt-4 border-t border-[#262626]">
                <span className="text-[#a855f7] font-semibold text-sm">
                  {s.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
