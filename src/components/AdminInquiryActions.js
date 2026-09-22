"use client";
import { useState } from "react";
export default function AdminInquiryActions({ inquiry }) {
  const [status, setStatus] = useState(inquiry.status);
  const [saving, setSaving] = useState(false);
  async function update(next) {
    setSaving(true);
    const response = await fetch(`/api/admin/inquiries/${inquiry._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (response.ok) setStatus(next);
    setSaving(false);
  }
  const wa = `https://wa.me/${inquiry.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${inquiry.fullName}, JSP Real Estate is responding to your inquiry about ${inquiry.propertyTitle}.`)}`;
  return (
    <div className="admin-actions">
      <select
        value={status}
        disabled={saving}
        onChange={(e) => update(e.target.value)}
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="closed">Closed</option>
      </select>
      <a href={`tel:${inquiry.phone}`}>Call</a>
      <a href={wa} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      {inquiry.email ? <a href={`mailto:${inquiry.email}`}>Email</a> : null}
    </div>
  );
}
