"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

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
          <div className="mt-8 relative w-full max-w-[320px] aspect-[720/828] rounded-2xl overflow-hidden border border-white/10">
            <Image
              src="/brand/farzad-adalatnia.jpg"
              alt="Farzad Adalatnia, founder of F21 Studio and AI implementation consultant in Dubai"
              fill
              sizes="(min-width: 640px) 320px, 80vw"
              className="object-cover grayscale-[15%]"
            />
          </div>
        </div>

        <div className="about-col space-y-5">
          <div>
            <p className="text-xl font-black text-[#fafafa]">Farzad Adalatnia</p>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.25em] text-[#c084fc]">
              Founder · AI Implementation Consultant
            </p>
          </div>
          <p className="text-[#a3a3a3] leading-relaxed">
            F21 Studio is run by Farzad, an AI implementation consultant based
            in Dubai. He works the way a fractional AI officer does: he gets
            inside a business, finds the jobs AI can take over, then builds and
            runs those systems himself.
          </p>
          <p className="text-[#a3a3a3] leading-relaxed">
            Everything on this site is proof, not a pitch: a therapy practice
            that publishes and ranks on its own, a car-import brand with a
            216-page automated site, and a sourcing desk that tracks more than
            3,000 cars across 8 marketplaces.
          </p>
          <Link
            href="/services/ai-audit-implementation"
            className="inline-block text-sm font-black uppercase tracking-[0.12em] text-[#c084fc] hover:text-[#fafafa] transition-colors"
          >
            Start with an AI audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
