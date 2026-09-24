"use client";

import { useEffect } from "react";

export default function ScrollRevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length) return undefined;

    if (
      !window.IntersectionObserver ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      for (const element of elements) element.classList.add("is-revealed");
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return null;
}
