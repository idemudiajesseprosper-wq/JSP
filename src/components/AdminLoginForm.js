"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRightIcon } from "@/components/ArrowIcons";
import Toast from "@/components/Toast";

export default function AdminLoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          Object.fromEntries(new FormData(event.currentTarget)),
        ),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Unable to sign in. Please try again.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-layout">
      <aside className="admin-login-visual">
        <Image
          src="/images/jsp-hero-sunset-landscape.png"
          alt="Contemporary home at sunset"
          fill
          sizes="(max-width: 800px) 100vw, 55vw"
          priority
        />
        <div className="admin-login-visual-copy">
          <span className="admin-login-kicker">JSP / STAFF PORTAL</span>
          <p>
            Every property.
            <br />
            One place to care for it.
          </p>
          <span>Real Estate &amp; Property Management Ventures</span>
        </div>
      </aside>
      <div className="admin-login-content">
        <div className="admin-login-top">
          <Link href="/" className="admin-login-brand" aria-label="JSP home">
            <Image
              src="/images/jsp-logo-transparent.png"
              alt="JSP Real Estate"
              width={90}
              height={90}
            />
          </Link>
          <Link href="/" className="admin-login-back">
            Back to website{" "}
            <span aria-hidden="true">
              <ArrowUpRightIcon className="admin-arrow-icon" />
            </span>
          </Link>
        </div>
        <form className="admin-login" onSubmit={submit}>
          <span className="admin-login-kicker">PRIVATE ACCESS / JSP TEAM</span>
          <h1>
            Welcome
            <br />
            back.
          </h1>
          <p>
            Sign in to manage property inquiries and connect with customers.
          </p>
          <label>
            Email address
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              placeholder="you@jsp.com"
            />
          </label>
          <label>
            Password
            <span className="admin-password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m3 3 18 18M10.6 10.7a2 2 0 0 0 2.7 2.7M9.9 4.2A10.9 10.9 0 0 1 12 4c5.5 0 9 5 9 5a17.2 17.2 0 0 1-2.1 2.5M6.6 6.6C4.3 8 3 10 3 10s3.5 5 9 5c1.2 0 2.3-.2 3.3-.6" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 12s3.5-5 9-5 9 5 9 5-3.5 5-9 5-9-5-9-5Z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>
            </span>
          </label>
          <div className="admin-login-options">
            <span>Secure staff access</span>
            <a href="mailto:jsprealestateandpropertymanage@gmail.com?subject=JSP%20Admin%20Password%20Reset%20Request">
              Forgot password?
            </a>
          </div>
          <Toast message={error} type="error" onDismiss={() => setError("")} />
          <button type="submit" disabled={loading}>
            <span>{loading ? "Signing in..." : "Sign in to dashboard"}</span>
            <span aria-hidden="true">
              <ArrowUpRightIcon className="admin-arrow-icon" />
            </span>
          </button>
          <small>
            For authorised JSP staff only. Customers can browse freely without
            an account.
          </small>
        </form>
        <div className="admin-login-bottom">
          JSP REAL ESTATE <span>BENIN CITY, NIGERIA</span>
        </div>
      </div>
    </div>
  );
}
