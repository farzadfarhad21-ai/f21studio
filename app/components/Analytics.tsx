"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Loads GA4 only after the page has finished loading, so it never competes with the hero.
export default function Analytics({ id }: { id: string }) {
  useEffect(() => {
    if (window.gtag) return;
    const start = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // gtag.js expects the arguments object itself, not an array
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag!("js", new Date());
      window.gtag!("config", id);
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(s);
    };
    const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(start, { timeout: 3000 }) : setTimeout(start, 1500));
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  }, [id]);
  return null;
}
