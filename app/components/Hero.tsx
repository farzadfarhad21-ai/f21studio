"use client";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      {/* ── Cinematic background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60" style={{ zIndex: 1 }} />

      {/* Bottom fade to blend into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" style={{ zIndex: 2 }} />

      {/* Purple ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-[#a855f7]/10 blur-[140px] pointer-events-none" style={{ zIndex: 2 }} />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center gap-6 max-w-4xl"
        style={{ zIndex: 3 }}
      >
        {/* Label */}
        <motion.div variants={fadeUp}>
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[#a855f7] border border-[#a855f7]/30 bg-[#a855f7]/10 px-4 py-1.5 rounded-full">
            AI-Powered Creative Agency
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-black text-[#fafafa] leading-[1.05] tracking-tight"
        >
          We Build Brands
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#c084fc]">
            That Scale
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-[#d4d4d4] text-base md:text-lg max-w-xl leading-relaxed"
        >
          Luxury websites, AI visuals, and automation for small businesses
          ready to grow.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-[#a855f7] hover:bg-[#c084fc] text-white font-semibold rounded-lg transition-colors duration-200 text-sm tracking-wide"
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="px-8 py-3 border border-[#ffffff]/20 hover:border-[#a855f7] text-[#fafafa] hover:text-[#a855f7] font-semibold rounded-lg transition-colors duration-200 text-sm tracking-wide backdrop-blur-sm"
          >
            See Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span className="text-[#a3a3a3] text-xs tracking-[0.2em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[#a855f7] to-transparent"
        />
      </motion.div>
    </section>
  );
}
