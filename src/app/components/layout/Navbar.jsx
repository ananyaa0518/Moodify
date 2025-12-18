// src/app/components/layout/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { label: "Journal", href: "#journal" },
  { label: "Explore Podcasts", href: "#podcasts" },
  { label: "Community Scrapbook", href: "#scrapbook" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b-4 border-neutral-900/80 bg-neo-yellow/90 backdrop-blur-sm shadow-neo">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border-[3px] border-neutral-900 bg-neo-pink px-3 py-1 text-xs font-black uppercase tracking-[0.18em] shadow-neo hover:-translate-y-[2px] hover:shadow-neo-strong transition-transform"
        >
          <span className="h-5 w-5 rounded-full bg-neo-lilac border-[3px] border-neutral-900 flex items-center justify-center text-[10px]">
            :)
          </span>
          <span>Moodify</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-neutral-900 bg-neo-mint text-sm font-semibold shadow-neo hover:-translate-y-[1px] hover:shadow-neo-strong transition md:hidden"
          aria-label="Toggle navigation menu"
        >
          <span className="flex flex-col gap-[3px]">
            <span className="block h-[2px] w-4 bg-neutral-900" />
            <span className="block h-[2px] w-4 bg-neutral-900" />
          </span>
        </button>

        <div className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full border-[3px] border-neutral-900 bg-neo-cream px-3 py-1 text-xs font-semibold tracking-wide text-neutral-900 shadow-neo hover:bg-neo-lilac hover:-translate-y-[2px] hover:shadow-neo-strong transition"
            >
              {item.label}
            </a>
          ))}

          <button className="inline-flex items-center gap-2 rounded-full border-[3px] border-neutral-900 bg-neutral-900 px-3 py-1 text-xs font-semibold text-neo-cream shadow-neo hover:-translate-y-[2px] hover:shadow-neo-strong transition">
            <span className="h-6 w-6 rounded-full bg-neo-yellow flex items-center justify-center text-xs">
              😊
            </span>
            <span className="hidden sm:inline">Hi, Friend</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t-4 border-neutral-900 bg-neo-cream px-4 py-3 shadow-neo md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border-[3px] border-neutral-900 bg-white px-3 py-2 text-xs font-semibold tracking-wide text-neutral-900 shadow-neo hover:bg-neo-lilac/80 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

