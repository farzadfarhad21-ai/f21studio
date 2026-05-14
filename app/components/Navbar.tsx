"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#262626]"
          : "bg-[#0a0a0a]/60 backdrop-blur-sm border-b border-[#262626]"
      }`}
    >
      <span className="text-[#fafafa] font-black text-lg tracking-[0.2em]">
        F21 STUDIO
      </span>
      <ul className="hidden md:flex items-center gap-8">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-[#a3a3a3] hover:text-[#fafafa] text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
