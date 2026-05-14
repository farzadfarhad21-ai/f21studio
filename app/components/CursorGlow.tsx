"use client";
import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    const onMove = (e: MouseEvent) => {
      glow.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(168,85,247,0.07), transparent 80%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-50"
      aria-hidden
    />
  );
}
