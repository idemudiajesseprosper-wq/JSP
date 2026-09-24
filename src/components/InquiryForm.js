"use client";
import { useRef, useState } from "react";
import Toast from "@/components/Toast";
export default function InquiryForm({ property }) {
  const [state, setState] = useState({
    loading: false,
    error: "",
    success: "",
  });
  const lastSubmit = useRef(0);
  async function submit(event) {
    event.preventDefault();
    if (state.loading || Date.now() - lastSubmit.current < 3000) return;
    lastSubmit.current = Date.now();
    setState({ loading: true, error: "", success: "" });
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);
    payload.propertyId = property.id;
    payload.propertyTitle = property.title;
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      event.currentTarget.reset();
      setState({ loading: false, error: "", success: result.message });
    } catch (error) {
      setState({ loading: false, error: error.message, success: "" });
    }
  }
  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="eyebrow">Contact JSP</span>
        <h2>Ask About This Property</h2>
        <p>
          Your inquiry is linked automatically to <b>{property.title}</b>.
        </p>
      </div>
      <label>
        Full Name
        <input name="fullName" required minLength="2" autoComplete="name" />
      </label>
      <label>
        Phone Number
        <input
          name="phone"
          required
          type="tel"
          minLength="10"
          autoComplete="tel"
        />
      </label>
      <label>
        Email <small>(optional)</small>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label className="wide">
        Message
        <textarea
          name="message"
          required
          minLength="10"
          rows="5"
          defaultValue={`Hello JSP, I am interested in ${property.title}. Please share more information.`}
        />
      </label>
      <Toast
        message={state.error || state.success}
        type={state.error ? "error" : "success"}
        onDismiss={() =>
          setState((current) => ({ ...current, error: "", success: "" }))
        }
      />
      <button type="submit" className="button wide" disabled={state.loading}>
        {state.loading ? "Sending…" : "Send Inquiry →"}
      </button>
    </form>
  );
}
