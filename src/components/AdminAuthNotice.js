"use client";

import { useEffect, useState } from "react";
import Toast from "@/components/Toast";

const flashKey = "jsp-admin-auth-notice";

export function setAdminAuthNotice(notice) {
  window.sessionStorage.setItem(flashKey, JSON.stringify(notice));
}

export default function AdminAuthNotice() {
  const [notice, setNotice] = useState({ type: "", message: "" });

  useEffect(() => {
    try {
      const stored = window.sessionStorage.getItem(flashKey);
      if (!stored) return;
      window.sessionStorage.removeItem(flashKey);
      const parsed = JSON.parse(stored);
      if (parsed?.message) setNotice(parsed);
    } catch {
      window.sessionStorage.removeItem(flashKey);
    }
  }, []);

  return (
    <Toast
      message={notice.message}
      type={notice.type || "success"}
      onDismiss={() => setNotice({ type: "", message: "" })}
    />
  );
}
