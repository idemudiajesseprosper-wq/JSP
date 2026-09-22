"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Temporary editorial previews from assets already supplied for this website.
// Replace these sources with the client's chosen images when they arrive.
const previews = [
  {
    image: "/images/jsp-hero-sunset-landscape.png",
    title: "Architecture to inspire",
  },
  { image: "/images/jsp-hero-interior.jpeg", title: "Spaces to call home" },
  {
    image: "/images/jsp-featured-fireplace.jpeg",
    title: "Warmth in every detail",
  },
];

function getOffset(index, active, count) {
  let offset = index - active;
  if (offset > count / 2) offset -= count;
  if (offset < -count / 2) offset += count;
  return offset;
}

export default function FeaturedPropertyCarousel() {
  const [active, setActive] = useState(0);
  const swipeStart = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll("[data-scroll-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => {
        item.classList.add("is-visible");
      });
      return;
    }
    section.classList.add("reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((item) => {
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, []);

  const move = (direction) => {
    setActive(
      (current) => (current + direction + previews.length) % previews.length,
    );
  };

  const finishSwipe = (clientX) => {
    if (swipeStart.current === null) return;
    const distance = clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(distance) >= 45) move(distance < 0 ? 1 : -1);
  };

  return (
    <section className="property-discovery" id="properties" ref={sectionRef}>
      <div className="shell property-discovery-head">
        <div data-scroll-reveal="left">
          <span className="eyebrow">Property discovery</span>
          <h2>Featured Properties</h2>
        </div>
        <p data-scroll-reveal="right">
          A glimpse of the spaces that inspire us. Browse all published agency
          properties through the JSP catalogue.
        </p>
      </div>
      <div
        className="property-carousel"
        data-scroll-reveal="up"
        onPointerDown={(event) => {
          swipeStart.current = event.clientX;
          event.currentTarget.setPointerCapture?.(event.pointerId);
        }}
        onPointerUp={(event) => finishSwipe(event.clientX)}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        <div className="property-carousel-stage">
          {previews.map((preview, index) => {
            const offset = getOffset(index, active, previews.length);
            const isActive = offset === 0;
            return (
              <article
                className={`editorial-property-slide${isActive ? " active" : ""}`}
                key={preview.image}
                style={{
                  "--desktop-translate": `${-50 + offset * 76}%`,
                  "--mobile-translate": `${-50 + offset * 104}%`,
                  "--slide-scale": isActive ? 1 : 0.88,
                  zIndex: isActive ? 3 : 2,
                }}
                aria-hidden={!isActive}
              >
                <Image
                  src={preview.image}
                  alt={preview.title}
                  fill
                  sizes="(max-width: 740px) 86vw, 62vw"
                  priority={index === 0}
                />
                <div className="editorial-property-shade" />
                <div className="editorial-property-content preview-content">
                  <h3>{preview.title}</h3>
                  <p className="editorial-property-location">
                    See actual available properties in the JSP catalogue.
                  </p>
                  <Link href="/properties">
                    View Properties <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div
        className="shell property-carousel-controls"
        data-scroll-reveal="fade"
      >
        <p aria-live="polite">
          <b>{String(active + 1).padStart(2, "0")}</b>
          <span>/ {String(previews.length).padStart(2, "0")}</span>
        </p>
        <div>
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="Previous image"
          >
            ←
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next image">
            →
          </button>
        </div>
        <Link href="/properties">View All Properties →</Link>
      </div>
    </section>
  );
}
