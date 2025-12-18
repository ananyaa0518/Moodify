// src/app/components/layout/Footer.jsx
"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-10 border-t-4 border-neutral-900 bg-neo-cream py-5 shadow-neo-inner">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-xs sm:flex-row sm:text-left">
        <div className="space-y-1">
          <p className="font-semibold text-neutral-900">
            © 2025 Moodify · Made by Ananyaa
          </p>
          <p className="max-w-md text-[11px] text-neutral-700">
            A playful little corner of the internet to notice, name, and nurture
            your mood.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ananyaa0518"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-[3px] border-neutral-900 bg-neo-mint text-neutral-900 shadow-neo hover:-translate-y-[2px] hover:shadow-neo-strong transition"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ananyaa1805/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-[3px] border-neutral-900 bg-neo-pink text-neutral-900 shadow-neo hover:-translate-y-[2px] hover:shadow-neo-strong transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
