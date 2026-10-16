"use client";

import { useState } from "react";
import Toast from "@/components/Toast";

export default function AdminPropertyStatus({ id, initialStatus = "available" }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState({ type: "", message: "" });
  async function update(nextStatus) {
    const previousStatus = status;
    setStatus(nextStatus);
    setSaving(true);
    setNotice({ type: "", message: "" });
    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update property status.");
      setNotice({ type: "success", message: `Listing marked as ${nextStatus}.` });
    } catch (error) {
      setStatus(previousStatus);
      setNotice({ type: "error", message: error.message || "Could not update property status." });
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="admin-property-status-control">
      <label><span>Listing status</span><select value={status} disabled={saving} onChange={(event) => update(event.target.value)}><option value="available">Available</option><option value="sold">Sold</option><option value="rented">Rented</option></select></label>
      <Toast message={notice.message} type={notice.type || "error"} onDismiss={() => setNotice({ type: "", message: "" })} />
    </div>
  );
}
