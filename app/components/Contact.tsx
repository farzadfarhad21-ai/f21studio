"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-[#0a0a0a]">
      <div ref={containerRef} className="max-w-2xl mx-auto text-center">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#a855f7]">
          Let&apos;s Talk
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] mt-4 mb-4">
          Ready to Grow?
        </h2>
        <p className="text-[#a3a3a3] mb-10 leading-relaxed">
          Start a conversation — we&apos;ll respond within 24 hours.
        </p>

        {/* WhatsApp */}
        <a
          href="https://wa.me/15550000000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#25d366] hover:bg-[#1db954] text-white font-semibold rounded-lg transition-colors duration-200 mb-10 text-sm"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.345.223-.643.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
          </svg>
          Chat on WhatsApp
        </a>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-[#262626]" />
          <span className="text-[#525252] text-xs shrink-0">
            or send a message
          </span>
          <div className="flex-1 h-px bg-[#262626]" />
        </div>

        {/* Form */}
        {sent ? (
          <div className="bg-[#141414] border border-[#a855f7]/40 rounded-2xl p-12 text-center">
            <p className="text-[#a855f7] font-semibold text-lg">
              Message sent!
            </p>
            <p className="text-[#a3a3a3] mt-2 text-sm">
              We&apos;ll be in touch within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-[#141414] border border-[#262626] rounded-2xl p-8 text-left space-y-5"
          >
            <div>
              <label className="block text-[#a3a3a3] text-xs font-medium uppercase tracking-widest mb-2">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full bg-[#0a0a0a] border border-[#262626] focus:border-[#a855f7] rounded-lg px-4 py-3 text-[#fafafa] text-sm outline-none transition-colors duration-200 placeholder:text-[#404040]"
              />
            </div>
            <div>
              <label className="block text-[#a3a3a3] text-xs font-medium uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="w-full bg-[#0a0a0a] border border-[#262626] focus:border-[#a855f7] rounded-lg px-4 py-3 text-[#fafafa] text-sm outline-none transition-colors duration-200 placeholder:text-[#404040]"
              />
            </div>
            <div>
              <label className="block text-[#a3a3a3] text-xs font-medium uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-[#0a0a0a] border border-[#262626] focus:border-[#a855f7] rounded-lg px-4 py-3 text-[#fafafa] text-sm outline-none transition-colors duration-200 resize-none placeholder:text-[#404040]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#a855f7] hover:bg-[#c084fc] text-white font-semibold rounded-lg transition-colors duration-200 text-sm tracking-wide"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
