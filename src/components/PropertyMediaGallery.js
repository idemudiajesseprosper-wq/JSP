"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function PropertyMediaGallery({ property, variant = "page" }) {
  const media = useMemo(
    () => [
      ...(property.images || []).map((url, index) => ({ id: `image-${index}`, type: "image", url, label: `Photo ${index + 1}` })),
      ...(property.videos || []).map((url, index) => ({ id: `video-${index}`, type: "video", url, label: `Video ${index + 1}` })),
    ],
    [property.images, property.videos],
  );
  const fallback = { id: "fallback-image", type: "image", url: "/images/jsp-hero-property.jpeg", label: "Property photo" };
  const items = media.length ? media : [fallback];
  const [activeId, setActiveId] = useState(items[0].id);
  const active = items.find((item) => item.id === activeId) || items[0];

  return (
    <section className={`property-media-gallery property-media-gallery-${variant}`}>
      <div className="property-media-stage">
        {active.type === "video" ? (
          // biome-ignore lint/a11y/useMediaCaption: Captions are unavailable for admin-uploaded property walkthroughs.
          <video controls preload="metadata" src={active.url}>
            Your browser does not support property videos.
          </video>
        ) : (
          <Image src={active.url} alt={`${property.title} — ${active.label}`} fill priority={active.id === items[0].id} sizes={variant === "drawer" ? "(max-width: 740px) 100vw, 52vw" : "100vw"} />
        )}
        <span className="property-media-count">{active.label} · {items.length} {items.length === 1 ? "item" : "items"}</span>
      </div>
      {items.length > 1 ? (
        <div className="property-media-thumbnails">
          {items.map((item) => (
            <button key={item.id} type="button" className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} aria-label={`Show ${item.label}`} aria-pressed={item.id === active.id}>
              {item.type === "image" ? <Image src={item.url} alt="" fill sizes="84px" /> : <span className="property-video-thumb">Video</span>}
              <small>{item.type === "video" ? "Video" : "Photo"}</small>
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
