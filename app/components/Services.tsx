"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/services";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<string, string> = {
  "ai-growth-system": "🚀",
  "cinematic-websites": "🌐",
  "ai-content-automation": "🤖",
  "seo-growth-setup": "📈",
  "custom-ai-agents": "🧠",
  "ai-video-ads": "🎬",
  "ai-visual-content": "✨",
};

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
            <Link
              href={`/services/${s.slug}`}
              key={s.slug}
              className={`service-card group rounded-2xl p-8 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300 ${
                s.featured
                  ? "bg-[#1a0d2e] border border-[#a855f7]/40 hover:border-[#a855f7] hover:shadow-[0_8px_60px_rgba(168,85,247,0.25)] sm:col-span-2 lg:col-span-3"
                  : "bg-[#141414] border border-[#1f1f1f] hover:border-[#a855f7]/50 hover:shadow-[0_8px_40px_rgba(168,85,247,0.12)]"
              }`}
            >
              {s.featured && (
                <span className="self-start text-[10px] font-black tracking-[0.3em] uppercase text-[#a855f7] bg-[#a855f7]/10 px-3 py-1 rounded-full">
                  ★ Flagship Service
                </span>
              )}
              <span className="text-4xl">{icons[s.slug]}</span>
              <h3 className={`font-black text-lg leading-snug uppercase tracking-[-0.01em] ${s.featured ? "text-white text-xl" : "text-[#fafafa]"}`}>
                {s.title}
              </h3>
              <p className="text-[#737373] text-sm leading-relaxed flex-1">
                {s.answer}
              </p>
              <div className="pt-4 border-t border-[#1f1f1f] flex items-center justify-between">
                <span className="text-[#a855f7] font-black text-sm tracking-wide">
                  {s.price}
                </span>
                <span className="text-[#525252] group-hover:text-[#fafafa] text-xs font-black uppercase tracking-[0.15em] transition-colors">
                  Details →
                </span>
              </div>
            </Link>
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
