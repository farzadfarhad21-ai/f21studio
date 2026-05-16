"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Static data ──────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01", name: "DISCOVERY",
    tagline: "We start with your story.",
    desc: "We dig into your brand, market, audience, and competitors to find the foundation everything else is built on.",
  },
  {
    num: "02", name: "STRATEGY",
    tagline: "AI finds your edge.",
    desc: "We run your market through our AI systems to identify positioning, messaging, and the exact angle that makes you stand out.",
  },
  {
    num: "03", name: "DESIGN",
    tagline: "Your identity takes shape.",
    desc: "Logo, colour, typography, motion — a complete visual system built around your brand's DNA.",
  },
  {
    num: "04", name: "BUILD",
    tagline: "Coded to perform.",
    desc: "High-performance website and automation infrastructure built to convert visitors into customers.",
  },
  {
    num: "05", name: "LAUNCH",
    tagline: "Live. Visible. Growing.",
    desc: "Full deployment across every platform. We track results and keep optimising so your brand compounds over time.",
  },
];

const CHECKLIST_ITEMS = [
  "Market Research",
  "Brand Audit",
  "Audience Mapping",
  "Competitor Analysis",
  "Growth Opportunities",
];

const AI_LINES = [
  "Positioning → Premium & Distinctive",
  "Audience → 25–45, Growth-focused",
  "Channel → Digital-first",
  "Voice → Confident & Clean",
];

const DESIGN_COLORS = ["#a855f7", "#fafafa", "#0a0a0a", "#c084fc"];

const CODE_SOURCE =
  'const brand = F21Studio.create({\n  website:    "deployed ✓",\n  visuals:    "generated ✓",\n  automation: "running ✓",\n})\n// → Ready to launch.';

const METRICS = [
  { target: 12400, format: (n: number) => n.toLocaleString() + "+",       label: "Website Visitors / Month" },
  { target: 42,    format: (n: number) => (n / 10).toFixed(1) + "%",      label: "Average Conversion Rate" },
  { target: 89,    format: (n: number) => n + "K+",                       label: "Monthly Brand Reach" },
];

// ─── Card sub-components ──────────────────────────────────────────────────────

function ChecklistCard({ active }: { active: boolean }) {
  const [visible, setVisible] = useState<boolean[]>(Array(CHECKLIST_ITEMS.length).fill(false));

  useEffect(() => {
    if (!active) return;
    const timers = CHECKLIST_ITEMS.map((_, i) =>
      setTimeout(() => setVisible(prev => {
        const next = [...prev]; next[i] = true; return next;
      }), i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="p-6 space-y-3">
      {CHECKLIST_ITEMS.map((item, i) => (
        <div
          key={item}
          className="flex items-center gap-3"
          style={{
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <span className="text-[#a855f7] font-bold text-sm leading-none">✓</span>
          <span className="text-[#fafafa] text-sm">{item}</span>
        </div>
      ))}
    </div>
  );
}

function AIOutputCard({ active }: { active: boolean }) {
  const [visibleLines, setVisibleLines] = useState<boolean[]>(Array(AI_LINES.length).fill(false));

  useEffect(() => {
    if (!active) return;
    const timers = AI_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(prev => {
        const next = [...prev]; next[i] = true; return next;
      }), 600 + i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#a855f7] inline-block animate-pulse" />
        <span className="text-[#a3a3a3] text-xs font-mono">Analyzing brand...</span>
      </div>
      <div className="space-y-2">
        {AI_LINES.map((line, i) => (
          <div
            key={line}
            className="text-[#fafafa] text-xs font-mono"
            style={{
              opacity: visibleLines[i] ? 1 : 0,
              transform: visibleLines[i] ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <span className="text-[#a855f7]">›</span> {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignCard({ active }: { active: boolean }) {
  const [showComponents, setShowComponents] = useState(false);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setShowComponents(true), 400);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="p-6 space-y-5">
      <div className="flex gap-3">
        {DESIGN_COLORS.map((color, i) => (
          <div
            key={color}
            className="w-9 h-9 rounded-full"
            style={{
              backgroundColor: color,
              border: color === "#0a0a0a" ? "1px solid #3f3f46" : "none",
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0.5)",
              transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
            }}
          />
        ))}
      </div>
      <div style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }}>
        <div className="text-[#fafafa] text-5xl font-black leading-none">Aa</div>
        <div className="text-[#a3a3a3] text-xs mt-2 tracking-wide">Primary Font</div>
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="h-8 rounded-lg bg-[#1a1a1a] border border-[#262626] flex-1"
            style={{
              opacity: showComponents ? 1 : 0,
              transform: showComponents ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.4s ease ${i * 0.12}s, transform 0.4s ease ${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CodeCard({ active }: { active: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      if (indexRef.current >= CODE_SOURCE.length) {
        clearInterval(interval);
        return;
      }
      indexRef.current++;
      setDisplayed(CODE_SOURCE.slice(0, indexRef.current));
    }, 40);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="p-6">
      <pre className="text-xs font-mono leading-relaxed whitespace-pre-wrap">
        {displayed.split("\n").map((line, i) => (
          <span
            key={i}
            style={{ color: line.startsWith("//") ? "#a855f7" : "#fafafa", display: "block" }}
          >
            {line || " "}
          </span>
        ))}
        {active && displayed.length < CODE_SOURCE.length && (
          <span className="inline-block w-[2px] h-[13px] bg-[#a855f7] animate-pulse align-middle" />
        )}
      </pre>
    </div>
  );
}

function MetricsCard({ active }: { active: boolean }) {
  const [counts, setCounts] = useState([0, 0, 0]);

  useEffect(() => {
    if (!active) return;
    const duration = 1500;
    const start = Date.now();
    let raf: number;

    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(METRICS.map(m => Math.floor(eased * m.target)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <div className="p-6 space-y-5">
      {METRICS.map((m, i) => (
        <div key={m.label}>
          <div className="text-3xl font-black text-[#fafafa] leading-none tabular-nums">
            {active ? m.format(counts[i]) : "0"}
          </div>
          <div className="text-[#a3a3a3] text-xs mt-1">{m.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Process() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCards, setActiveCards] = useState<boolean[]>([false, false, false, false, false]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    stepRefs.current.forEach((el, i) => {
      if (!el) return;

      gsap.set(el, { opacity: 0, y: 60 });

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0 });
          setActiveCards(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        },
      });

      triggers.push(st);
    });

    return () => triggers.forEach(t => t.kill());
  }, []);

  const cards = [
    <ChecklistCard key="c0" active={activeCards[0]} />,
    <AIOutputCard  key="c1" active={activeCards[1]} />,
    <DesignCard    key="c2" active={activeCards[2]} />,
    <CodeCard      key="c3" active={activeCards[3]} />,
    <MetricsCard   key="c4" active={activeCards[4]} />,
  ];

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto mb-20">
        <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#a855f7] block mb-4">
          OUR PROCESS
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-[#fafafa] leading-[1.1]">
          How We Build Brands That Scale
        </h2>
      </div>

      <div className="max-w-6xl mx-auto space-y-24">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            ref={el => { stepRefs.current[i] = el; }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
            style={{ opacity: 0 }}
          >
            <div>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#a855f7] block mb-3">
                {step.num} — {step.name}
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-[#fafafa] leading-[1.1] mb-4">
                {step.tagline}
              </h3>
              <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </div>

            <div className="bg-[#111111] border border-[#262626] rounded-2xl overflow-hidden min-h-[220px]">
              {cards[i]}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
