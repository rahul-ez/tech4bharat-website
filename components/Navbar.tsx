"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Navbar — the shared site header. Sticky (added previously), now also:
 * - Semi-transparent + `backdrop-blur-md` instead of a solid fill, so the
 *   page's grid-pattern backdrop subtly shows through underneath it.
 * - A bottom border that fades in once scrolled past ~50px, rather than
 *   being present from y=0 — blends into the Hero at the very top of the
 *   homepage, then gives scrolled content a clear separation line. This
 *   is a one-time-per-threshold state flip (`scrolled` crosses `false`→
 *   `true` once, back on scroll-up), driven by a plain `scroll` listener
 *   with a CSS `transition-colors` for the fade — not a continuous/
 *   looping animation.
 *
 * The scroll listener only runs client-side, after mount (`useEffect`),
 * with `scrolled` initialized to `false` — matching this project's
 * established pattern for anything that reads real browser state
 * (`window.scrollY` has no meaningful SSR value): the server and first
 * client paint always agree (unscrolled), the real state fills in
 * immediately after mount, avoiding a hydration mismatch.
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Challenges", href: "/challenges" },
    { name: "Timeline", href: "/timeline" },
    { name: "Prizes", href: "/prizes" },
    { name: "Rules", href: "/rules" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-surface/80 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "border-border-light" : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 md:py-5">

        {/* LOGO */}
        <Link
          href="/"
          className="flex flex-col"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-xl font-bold tracking-wide text-white md:text-2xl">
            TECH4BHARAT
          </span>

          <span className="mt-1 text-xs font-medium tracking-[0.3em] text-orange-400 md:text-sm">
            2026
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-6 text-base text-slate-300 lg:flex xl:gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition hover:text-orange-400"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP REGISTER BUTTON */}
        <Link
          href="/register"
          className="hidden rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-orange-600 lg:block xl:px-8 xl:text-lg"
        >
          Register Now
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-2xl text-white transition hover:bg-white/10 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-surface/95 backdrop-blur-md px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base text-slate-300 transition hover:text-orange-400"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-orange-500 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-orange-600"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
