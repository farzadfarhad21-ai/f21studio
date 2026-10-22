"use client";
import { useEffect, useRef } from "react";

type Props = {
  /** 0 = closed sphere, 1 = fully split open. Read every frame, so pass a ref. */
  openRef: React.MutableRefObject<number>;
  onClick?: () => void;
};

const N = 1100;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

// A breathing particle sphere that tilts toward the cursor, scatters around it,
// and splits into two shells as openRef goes from 0 to 1.
export default function AICore({ openRef, onClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = GOLDEN * i;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r, seed: Math.random() * Math.PI * 2 };
    });

    let w = 0, h = 0, dpr = 1, raf = 0, rot = 0, shown = 0;
    const mouse = { x: -9999, y: -9999, tx: 0, ty: 0, sx: 0, sy: 0 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
      mouse.tx = (mouse.x / w - 0.5) * 2;
      mouse.ty = (mouse.y / h - 0.5) * 2;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
      mouse.tx = mouse.ty = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    const frame = (time: number) => {
      const t = time / 1000;
      shown += (openRef.current - shown) * (reduce ? 1 : 0.06);
      const o = shown;
      const ease = o * o * (3 - 2 * o);

      if (!reduce) rot += 0.0025 + ease * 0.002;
      mouse.sx += (mouse.tx - mouse.sx) * 0.05;
      mouse.sy += (mouse.ty - mouse.sy) * 0.05;

      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * (0.3 - ease * 0.04) * (1 + Math.sin(t * 1.4) * 0.015);
      const split = h * 0.34 * ease;
      const ay = rot + mouse.sx * 0.5;
      const ax = 0.25 + mouse.sy * 0.35;
      const cosY = Math.cos(ay), sinY = Math.sin(ay), cosX = Math.cos(ax), sinX = Math.sin(ax);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Inner glow, strongest while closed, fading to a seam of light as it opens.
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.4);
      glow.addColorStop(0, `rgba(168,85,247,${0.28 * (1 - ease) + 0.06})`);
      glow.addColorStop(1, "rgba(168,85,247,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      for (const p of pts) {
        const wob = reduce ? 0 : Math.sin(t * 2 + p.seed) * 0.012;
        let x = p.x * (1 + wob), y = p.y * (1 + wob), z = p.z * (1 + wob);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        x = x1; y = y1; z = z2;

        const persp = 1.6 / (2.6 - z);
        let sx = cx + x * R * persp * 1.6;
        let sy = cy + y * R * persp * 1.6 + Math.sign(p.y) * split;

        const dx = sx - mouse.x, dy = sy - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 9000) {
          const f = (1 - d2 / 9000) * 22;
          const d = Math.sqrt(d2) || 1;
          sx += (dx / d) * f;
          sy += (dy / d) * f;
        }

        const depth = (z + 1) / 2;
        const size = 0.6 + depth * 1.6;
        const alpha = (0.15 + depth * 0.85) * (1 - ease * 0.45);
        const hue = 270 + (1 - depth) * 40 + Math.sign(p.y) * ease * 15;
        ctx.fillStyle = `hsla(${hue},90%,${60 + depth * 18}%,${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (ease > 0.02) {
        const seam = ctx.createLinearGradient(cx - R * 1.6, 0, cx + R * 1.6, 0);
        seam.addColorStop(0, "rgba(192,132,252,0)");
        seam.addColorStop(0.5, `rgba(233,213,255,${0.5 * ease})`);
        seam.addColorStop(1, "rgba(192,132,252,0)");
        ctx.fillStyle = seam;
        ctx.fillRect(cx - R * 1.6, cy - split - 1, R * 3.2, 1);
        ctx.fillRect(cx - R * 1.6, cy + split, R * 3.2, 1);
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [openRef]);

  return (
    <canvas
      ref={canvasRef}
      onClick={onClick}
      className="absolute inset-0 w-full h-full cursor-pointer"
      aria-hidden="true"
    />
  );
}
