"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Toast({
  message,
  type = "error",
  onDismiss,
  duration = 4200,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!message || !onDismiss) return undefined;
    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss, duration]);

  if (!mounted || !message) return null;
  return createPortal(
    <div
      className={`jsp-toast ${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <span className="jsp-toast-mark" aria-hidden="true">
        {type === "success" ? "✓" : "!"}
      </span>
      <p>{message}</p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          ×
        </button>
      ) : null}
    </div>,
    document.body,
  );
}
