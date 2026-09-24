"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/components/Toast";

function EyeIcon({ hidden }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3l18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.9 10.9 0 0 1 12 4c5.5 0 9 5 9 5a17 17 0 0 1-2.1 2.5M6.6 6.6C4.3 8 3 10 3 10s3.5 5 9 5c1.2 0 2.3-.2 3.3-.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function PasswordField({ label, name, value, onChange, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <label>
      {label}
      <span className="admin-security-password">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          aria-pressed={visible}
        >
          <EyeIcon hidden={visible} />
        </button>
      </span>
    </label>
  );
}

export default function AdminPasswordForm() {
  const router = useRouter();
  const [fields, setFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  function update(event) {
    setFields((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    if (fields.newPassword !== fields.confirmPassword) {
      setStatus({ type: "error", message: "The new passwords do not match." });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/admin/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus({
          type: "error",
          message: result.error || "Could not change password.",
        });
        return;
      }
      setFields({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setStatus({
        type: "success",
        message: "Password changed. Sign in again with your new password.",
      });
      window.setTimeout(() => {
        router.replace("/admin/login");
        router.refresh();
      }, 1200);
    } catch {
      setStatus({
        type: "error",
        message: "Unable to connect. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-security-form" onSubmit={submit}>
      <div className="admin-security-form-head">
        <span>ADMIN CREDENTIALS</span>
        <h2>Change your password.</h2>
        <p>
          Use a password that is unique to JSP and has not been used for another
          account.
        </p>
      </div>
      <PasswordField
        label="Current password"
        name="currentPassword"
        value={fields.currentPassword}
        onChange={update}
        autoComplete="current-password"
      />
      <PasswordField
        label="New password"
        name="newPassword"
        value={fields.newPassword}
        onChange={update}
        autoComplete="new-password"
      />
      <PasswordField
        label="Confirm new password"
        name="confirmPassword"
        value={fields.confirmPassword}
        onChange={update}
        autoComplete="new-password"
      />
      <ul className="admin-password-rules">
        <li>At least 12 characters</li>
        <li>Uppercase and lowercase letters</li>
        <li>A number and a symbol</li>
      </ul>
      <Toast
        message={status.message}
        type={status.type || "error"}
        onDismiss={() => setStatus({ type: "", message: "" })}
      />
      <button className="admin-primary-link" type="submit" disabled={loading}>
        {loading ? "Changing password…" : "Change password"}
      </button>
    </form>
  );
}
