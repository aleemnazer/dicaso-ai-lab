"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/leads", label: "Leads" },
  { href: "/history", label: "History" },
];

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function linkClass(active: boolean): string {
  const state = active
    ? "bg-gray-900 text-white"
    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900";
  return `block rounded-md px-3 py-2 text-sm font-medium transition-colors ${state} ${FOCUS_RING}`;
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = NAV_LINKS.map(({ href, label }) => {
    const active = isActive(pathname, href);
    return (
      <li key={href}>
        <Link
          href={href}
          className={linkClass(active)}
          aria-current={active ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          {label}
        </Link>
      </li>
    );
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
      >
        <Link href="/" className={`rounded text-lg font-bold tracking-tight ${FOCUS_RING}`}>
          Dicaso Lab
        </Link>

        <ul className="hidden items-center gap-1 sm:flex">{links}</ul>

        <button
          type="button"
          className={`rounded-md p-2 text-gray-700 hover:bg-gray-100 sm:hidden ${FOCUS_RING}`}
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((prev) => !prev)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="space-y-1 border-t border-gray-200 px-6 py-3 sm:hidden">
          {links}
        </ul>
      )}
    </header>
  );
}
