"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminShell({
  title,
  eyebrow,
  description,
  action,
  children,
}) {
  const pathname = usePathname();
  const router = useRouter();
  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }
  return (
    <div className="admin-workspace">
      <aside className="admin-sidebar">
        <Link
          href="/admin"
          className="admin-sidebar-brand"
          aria-label="JSP dashboard"
        >
          <Image
            src="/images/jsp-logo-transparent.png"
            alt="JSP Real Estate"
            width={82}
            height={82}
          />
          <span>
            JSP <small>STAFF PORTAL</small>
          </span>
        </Link>
        <div className="admin-sidebar-label">WORKSPACE</div>
        <nav aria-label="Admin navigation">
          <Link
            href="/admin"
            className={pathname === "/admin" ? "is-active" : ""}
          >
            Overview <span>↗</span>
          </Link>
          <Link
            href="/admin/properties"
            className={
              pathname.startsWith("/admin/properties") ? "is-active" : ""
            }
          >
            Properties <span>↗</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className={
              pathname.startsWith("/admin/inquiries") ? "is-active" : ""
            }
          >
            Inquiries <span>↗</span>
          </Link>
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/properties" target="_blank">
            View public website ↗
          </Link>
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </div>
      </aside>
      <main className="admin-workspace-main">
        <div className="admin-workspace-top">
          <span>JSP REAL ESTATE / ADMIN</span>
          <Link href="/properties" target="_blank">
            View website ↗
          </Link>
        </div>
        <div className="admin-workspace-content">
          <div className="admin-workspace-heading">
            <div>
              <span className="admin-eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              {description ? <p>{description}</p> : null}
            </div>
            {action}
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
