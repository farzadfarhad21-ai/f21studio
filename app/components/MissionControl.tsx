"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AICore from "./AICore";
import { projects } from "@/lib/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

type Line = { id: number; text: string; color: string; time: string };

const stamp = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Dubai" });

function Console() {
  const [lines, setLines] = useState<Line[]>([]);
  const [clock, setClock] = useState("");
  const idx = useRef(0);

  useEffect(() => {
    const push = () => {
      const p = projects[idx.current % projects.length];
      const line = { id: ++idx.current, text: p.log, color: p.color, time: stamp() };
      setLines((prev) => [...prev.slice(-5), line]);
    };
    push();
    push();
    const a = setInterval(push, 2200);
    const b = setInterval(() => setClock(stamp()), 1000);
    setClock(stamp());
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, []);

  return (
    <div className="w-[min(92%,420px)] rounded-xl border border-[#a855f7]/30 bg-[#0c0912]/85 backdrop-blur-md shadow-[0_0_80px_rgba(168,85,247,0.25)] font-mono text-[11px] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5">
        <span className="flex items-center gap-2 text-[#c084fc] tracking-[0.2em] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
          F21 · mission control
        </span>
        <span className="text-[#525252]">DXB {clock}</span>
      </div>
      <ul className="px-4 py-3 h-[168px] flex flex-col justify-end gap-1.5">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <motion.li
              key={l.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex gap-2 whitespace-nowrap overflow-hidden"
            >
              <span className="text-[#3f3f3f] shrink-0">{l.time}</span>
              <span style={{ color: l.color }} className="shrink-0">▸</span>
              <span className="text-[#d4d4d4] truncate">{l.text}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="grid grid-cols-3 border-t border-white/5 text-center">
        {[
          [String(projects.length), "systems"],
          ["24/7", "running"],
          ["EN·FA", "bilingual"],
        ].map(([v, l]) => (
          <div key={l} className="py-2.5 border-r last:border-r-0 border-white/5">
            <div className="text-[#fafafa] text-sm font-sans font-black">{v}</div>
            <div className="text-[#525252] uppercase tracking-[0.15em] text-[9px]">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MissionControl() {
  const openRef = useRef(0);
  const [open, setOpen] = useState(false);

  const toggle = (next: boolean) => {
    openRef.current = next ? 1 : 0;
    setOpen(next);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => toggle(true), reduce ? 0 : 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen pt-24 pb-16 px-6 md:px-12 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(168,85,247,0.12) 0%, transparent 60%)" }}
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col gap-7 z-10">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="show"
            className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7]">
            AI agency · Dubai · Worldwide
          </motion.p>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="show"
            className="text-5xl sm:text-6xl xl:text-[84px] font-black text-[#fafafa] leading-[0.95] tracking-[-0.04em] uppercase">
            AI systems that
            <br />
            grow your business
            <br />
            <span className="text-[#a855f7]">while you sleep</span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="show"
            className="text-[#a3a3a3] text-base md:text-lg max-w-[50ch]">
            Websites, daily AI content, SEO and custom AI agents — designed, built and run by F21 Studio.
            The console on the right is not a mockup: these are our systems working right now.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="flex flex-col sm:flex-row gap-3">
            <a href="#contact"
              className="px-9 py-4 bg-[#a855f7] hover:bg-[#c084fc] active:scale-95 text-white font-black text-sm uppercase tracking-[0.07em] transition-all duration-200 shadow-[0_0_40px_rgba(168,85,247,0.3)] text-center">
              Start a project
            </a>
            <a href="#work"
              className="px-9 py-4 border border-white/15 hover:border-[#a855f7]/50 text-[#fafafa] hover:text-[#c084fc] font-black text-sm uppercase tracking-[0.07em] transition-all duration-200 text-center">
              See live work
            </a>
          </motion.div>

          <motion.ul custom={4} variants={fadeUp} initial="hidden" animate="show"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#525252]">
            <li><span className="text-[#fafafa]">SEO 62 → 92</span> · Rahil Therapy</li>
            <li><span className="text-[#fafafa]">Built &amp; sold</span> · Training Matrix</li>
            <li><span className="text-[#fafafa]">EN / FA</span> bilingual builds</li>
          </motion.ul>
        </div>

        <div className="relative h-[460px] sm:h-[540px] lg:h-[640px]">
          <AICore openRef={openRef} onClick={() => toggle(!open)} />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
              {open && (
                <motion.div
                  key="console"
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.7, filter: "blur(8px)" }}
                  transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-auto w-full flex justify-center"
                >
                  <Console />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => toggle(!open)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.3em] text-[#525252] hover:text-[#c084fc] transition-colors"
          >
            {open ? "Close the core" : "Wake the AI"}
          </button>
        </div>
      </div>
    </section>
  );
}
