"use client";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">

      <div className="absolute inset-0 bg-[#0a0a0a]" style={{ zIndex: 0 }} />

      {/* Radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(168,85,247,0.1) 0%, transparent 65%)", zIndex: 1 }}
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" style={{ zIndex: 2 }} />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-col items-center gap-7 max-w-4xl"
        style={{ zIndex: 3 }}
      >
        <motion.div variants={fadeUp}>
          <span className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7]">
            AI-Powered Creative Agency
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-6xl sm:text-7xl md:text-[110px] font-black text-[#fafafa] leading-[0.92] tracking-[-0.04em] uppercase"
        >
          We Build Brands
          <br />
          <span className="relative inline-block">
            That Scale
            <span className="absolute bottom-0 left-0 right-0 h-[5px] bg-[#a855f7]" />
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[#a3a3a3] text-base md:text-lg max-w-[52ch] leading-[1.65] font-normal"
        >
          Luxury websites, AI visuals, and automation for small businesses
          ready to grow.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
          <a
            href="#contact"
            className="px-10 py-4 bg-[#a855f7] hover:bg-[#c084fc] active:scale-95 text-white font-black text-sm uppercase tracking-[0.07em] transition-all duration-200 shadow-[0_0_40px_rgba(168,85,247,0.25)]"
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="px-10 py-4 border border-white/15 hover:border-[#a855f7]/50 text-[#fafafa] hover:text-[#a855f7] font-black text-sm uppercase tracking-[0.07em] transition-all duration-200 backdrop-blur-sm"
          >
            See Our Work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#a855f7] to-transparent"
        />
      </motion.div>
    </section>
  );
}
