"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

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
    <section id="services" className="relative py-40 px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">

      {/* Big section number */}
      <div
        className="absolute top-16 left-6 text-[180px] font-black leading-none select-none pointer-events-none"
        style={{ color: "rgba(168,85,247,0.06)", letterSpacing: "-0.04em" }}
      >
        01
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-20"
        >
          <p className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7] mb-3">
            What We Do
          </p>
          <div className="w-10 h-[3px] bg-[#a855f7]" />
          <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] mt-5 tracking-[-0.03em] leading-[1.05]">
            Our Services
          </h2>
        </motion.div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card group bg-[#141414] border border-[#1f1f1f] rounded-2xl p-8 flex flex-col gap-4 hover:border-[#a855f7]/50 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(168,85,247,0.12)] transition-all duration-300 cursor-default"
            >
              <span className="text-4xl">{s.icon}</span>
              <h3 className="text-[#fafafa] font-black text-lg leading-snug uppercase tracking-[-0.01em]">
                {s.title}
              </h3>
              <p className="text-[#737373] text-sm leading-relaxed flex-1">
                {s.desc}
              </p>
              <div className="pt-4 border-t border-[#1f1f1f]">
                <span className="text-[#a855f7] font-black text-sm tracking-wide">
                  {s.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center mt-16"
        >
          <a
            href="#contact"
            className="px-12 py-5 bg-[#a855f7] hover:bg-[#c084fc] active:scale-95 text-white font-black text-sm uppercase tracking-[0.07em] transition-all duration-200"
          >
            Start a Project →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
