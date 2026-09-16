"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-[#080d1a] px-4 py-3 sm:px-6 md:px-12">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">

        {/* Logos and Website Brand */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          {/* Logo Group */}
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-2 py-2 sm:gap-3 sm:px-3">

            {/* RVCE Circular Logo */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md sm:h-14 sm:w-14">
              <Image
                src="/rvce-logo.png"
                alt="RV College of Engineering"
                width={80}
                height={80}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            {/* Divider */}
            <div className="h-9 w-px bg-white/25 sm:h-11" />

            {/* GAVS Logo */}
            <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white px-1.5 py-1 shadow-md sm:h-14 sm:w-20">
              <Image
                src="/gavs-logo.png"
                alt="GAVS"
                width={100}
                height={70}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Website Name */}
          <div className="hidden border-l border-white/20 pl-3 sm:block md:pl-4">
            <p className="text-base font-extrabold tracking-wide text-white md:text-lg">
              TECH4BHARAT
            </p>

            <p className="mt-1 text-xs font-semibold tracking-[0.3em] text-orange-400">
              2026
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-4 text-sm font-medium text-gray-300 lg:flex xl:gap-6">
          <Link
            href="/"
            className="transition-colors hover:text-orange-400"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="transition-colors hover:text-orange-400"
          >
            About
          </Link>

          <Link
            href="/challenges"
            className="transition-colors hover:text-orange-400"
          >
            Challenges
          </Link>

          <Link
            href="/rules"
            className="transition-colors hover:text-orange-400"
          >
            Rules
          </Link>

          <Link
            href="/faq"
            className="transition-colors hover:text-orange-400"
          >
            FAQ
          </Link>
        </div>

        {/* Register Button */}
        <Link
          href="/register"
          className="shrink-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-3 py-2 text-xs font-bold text-[#080d1a] shadow-lg shadow-orange-500/20 transition-all hover:scale-105 hover:shadow-orange-500/40 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          Register Now
        </Link>
      </div>
    </nav>
  );
}