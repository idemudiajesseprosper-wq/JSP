"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
            Back to website <span aria-hidden="true">↗</span>
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
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </label>
          {error ? (
            <p className="form-error" role="alert">
              {error}
            </p>
          ) : null}
          <button type="submit" disabled={loading}>
            <span>{loading ? "Signing in..." : "Sign in to dashboard"}</span>
            <span aria-hidden="true">↗</span>
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
