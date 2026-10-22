"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects, type Project } from "@/lib/projects";

const span: Record<Project["size"], string> = {
  lg: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  sm: "",
};

function useTicker(ms: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setN((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [ms, active]);
  return n;
}

function Gauge({ active }: { active: boolean }) {
  const [v, setV] = useState(62);
  useEffect(() => {
    if (!active) return;
    setV(62);
    const id = setInterval(() => setV((x) => (x >= 92 ? 92 : x + 1)), 45);
    return () => clearInterval(id);
  }, [active]);
  const c = 2 * Math.PI * 52;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 120 120" className="w-28 h-28 md:w-36 md:h-36 -rotate-90">
        <circle cx="60" cy="60" r="52" fill="none" stroke="#1f1f1f" strokeWidth="8" />
        <circle cx="60" cy="60" r="52" fill="none" stroke="#a855f7" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} className="transition-[stroke-dashoffset] duration-75" />
      </svg>
      <div>
        <div className="text-5xl md:text-6xl font-black text-[#fafafa] tabular-nums">{v}</div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-[#737373] font-black">SEO score · was 62</div>
      </div>
    </div>
  );
}

function Demo({ p, active }: { p: Project; active: boolean }) {
  const n = useTicker(1400, active);
  switch (p.slug) {
    case "rahil-therapy":
      return (
        <div className="flex flex-col gap-5">
          <Gauge active={active} />
          <div className="font-mono text-[11px] text-[#a3a3a3] border border-white/5 rounded-lg px-3 py-2 bg-black/30">
            <span className="text-[#34d399]">● 08:00</span> new article published → sitemap → Telegram
          </div>
        </div>
      );
    case "khodro-dubai":
      return (
        <div className="flex gap-2 overflow-hidden">
          {["Intake", "Inspect", "Page", "Reel", "Post"].map((s, i) => (
            <div key={s}
              className={`flex-1 h-16 rounded-md border text-[10px] font-black uppercase tracking-wider flex items-end p-2 transition-all duration-500 ${
                n % 5 === i ? "border-[#f59e0b] bg-[#f59e0b]/15 text-[#fbbf24]" : "border-white/5 text-[#525252]"
              }`}>
              {s}
            </div>
          ))}
        </div>
      );
    case "khodro-sourcing-desk":
      return (
        <div className="font-mono text-[10px] space-y-1">
          {["LC TXL 2022 · 189k AED", "LC GXR 2022 · 172k AED", "LC VXR 2023 · 245k AED"].map((r, i) => (
            <div key={r} className={`transition-opacity duration-500 ${n % 4 > i ? "opacity-100" : "opacity-15"} text-[#fdba74]`}>
              ▸ {r}
            </div>
          ))}
        </div>
      );
    case "pulseai":
      return (
        <div className="flex items-end gap-2 h-40">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
            const h = [70, 40, 85, 0, 60, 90, 0][(i + n) % 7];
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full rounded-sm bg-[#a3e635] transition-all duration-700" style={{ height: `${h}%`, opacity: h ? 0.85 : 0.1 }} />
                <span className="text-[9px] text-[#525252] font-black">{d}</span>
              </div>
            );
          })}
        </div>
      );
    case "deepdive":
      return (
        <div className="relative h-14">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="absolute w-1.5 h-1.5 rounded-full bg-[#57a0e5] transition-all duration-1000"
              style={n % 2 ? { left: "50%", top: "50%" } : { left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }} />
          ))}
        </div>
      );
    case "hyperliquid-bot":
      return (
        <div className="grid grid-cols-5 gap-2">
          {["RSI", "MACD", "EMA", "BB", "VOL"].map((k, i) => (
            <div key={k} className="flex flex-col gap-1 items-center">
              <div className="w-full h-12 rounded-sm bg-[#0f2a1f] overflow-hidden flex items-end">
                <div className="w-full bg-[#34d399] transition-all duration-700" style={{ height: `${25 + ((i * 29 + n * 17) % 70)}%` }} />
              </div>
              <span className="text-[9px] text-[#525252] font-black">{k}</span>
            </div>
          ))}
        </div>
      );
    case "flowcast":
      return (
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider">
          {["Brief", "Script", "Video", "Approve", "Drive"].map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full border transition-colors duration-500 ${
                n % 5 === i ? "border-[#ec4899] text-[#f9a8d4] bg-[#ec4899]/15" : "border-white/5 text-[#525252]"
              }`}>{s}</span>
              {i < 4 && <span className="text-[#3f3f3f]">→</span>}
            </span>
          ))}
        </div>
      );
    default:
      return (
        <div className="font-mono text-[10px] text-[#c084fc]">
          $ ruflow ship <span className="animate-pulse">▍</span>
        </div>
      );
  }
}

function Tile({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-80px" });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current!;
    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width;
    const y = (e.clientY - b.top) / b.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 4}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
      className={span[p.size]}
    >
      <Link
        ref={ref}
        href={`/work/${p.slug}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group relative h-full min-h-[220px] flex flex-col justify-between gap-6 rounded-2xl border border-white/[0.06] bg-[#111] p-6 overflow-hidden transition-[transform,border-color] duration-300 ease-out hover:border-white/15"
        style={{ "--c": p.color } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(400px circle at var(--mx,50%) var(--my,50%), ${p.color}22, transparent 60%)` }}
        />
        <div className={`relative flex gap-3 ${p.size === "sm" || p.size === "tall" ? "flex-col-reverse items-start" : "items-start justify-between"}`}>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: p.color }}>{p.category}</p>
            <h3 className={`mt-2 font-black uppercase text-[#fafafa] tracking-[-0.02em] ${p.size === "lg" ? "text-3xl md:text-4xl" : "text-xl"}`}>
              {p.name}
            </h3>
          </div>
          <span className="shrink-0 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/10 text-[#a3a3a3]">
            {p.status}
          </span>
        </div>

        <div className="relative">
          <Demo p={p} active={inView} />
        </div>

        <div className="relative flex items-end justify-between gap-4">
          <p className={`text-[#737373] text-sm leading-relaxed ${p.size === "sm" ? "line-clamp-2" : ""}`}>{p.tagline}</p>
          <span className="shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#fafafa] group-hover:bg-[var(--c)] group-hover:text-black group-hover:border-transparent transition-all duration-300">
            ↗
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative py-32 px-6 md:px-12 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[11px] font-black tracking-[0.45em] uppercase text-[#a855f7] mb-3">Live work</p>
            <h2 className="text-4xl md:text-6xl font-black text-[#fafafa] uppercase tracking-[-0.03em] leading-[0.95]">
              Systems we built.
              <br />
              <span className="text-[#525252]">Still running.</span>
            </h2>
          </div>
          <p className="text-[#737373] max-w-[42ch]">
            Every tile is a real project — a client, a product or an agent we run ourselves. Open one for the full case study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(220px,auto)] grid-flow-dense gap-4">
          {projects.map((p, i) => (
            <Tile key={p.slug} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
