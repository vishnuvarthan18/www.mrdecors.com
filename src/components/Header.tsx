"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Logo from "./Logo";
import { business, navLinks, whatsappLink } from "@/lib/business";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div
        className={`mx-auto mt-3 flex h-16 max-w-7xl items-center justify-between rounded-full px-4 sm:px-5 transition-all duration-300 ${
          scrolled
            ? "border border-border bg-bg-elev/80 backdrop-blur-xl mx-3 sm:mx-6"
            : "border border-transparent bg-transparent"
        }`}
      >
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-surface border border-border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={whatsappLink("Hi MR Decors, I'd like a free quote for my event.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Let&apos;s Talk
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="lg:hidden flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg-elev/80 text-white"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mx-3 mt-2 rounded-3xl border border-border bg-bg-elev/95 backdrop-blur-xl p-4"
          >
            {navLinks.map((link, i) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                      active ? "bg-surface text-white" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            <a
              href={whatsappLink("Hi MR Decors, I'd like a free quote for my event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block rounded-full bg-primary px-5 py-3 text-center text-base font-semibold text-white"
            >
              Let&apos;s Talk
            </a>
            <a
              href={business.phoneLink}
              className="mt-2 block rounded-full border border-border px-5 py-3 text-center text-base font-medium text-white"
            >
              Call {business.phoneDisplay}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
