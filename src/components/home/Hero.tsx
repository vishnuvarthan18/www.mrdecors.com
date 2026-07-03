"use client";

import Link from "next/link";
import { motion } from "motion/react";
import PlaceholderImage from "@/components/PlaceholderImage";
import { whatsappLink } from "@/lib/business";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-16 glow-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-between border-b border-border pb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Custom Decor Manufacturer
          </span>
          <span className="hidden sm:inline">Erode · Since 2000</span>
        </motion.div>

        <h1 className="mt-10 font-display font-semibold text-text text-[13vw] leading-[0.9] sm:text-[10vw] lg:text-[8.5rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease }}
            >
              Wedding &amp;
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease }}
            >
              Event Decor,
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block text-primary italic"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.16, ease }}
            >
              Built Custom.
            </motion.span>
          </span>
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
          >
            <p className="max-w-md text-lg text-muted leading-relaxed">
              We design and fabricate one-of-a-kind stage backdrops and event
              decor. Every piece is cut, shaped, and built in house, never off a
              shelf.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={whatsappLink("Hi MR Decors, I'd like a free quote for my event.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Get a Free Quote
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold text-text transition-colors hover:border-text"
              >
                View Our Work
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-5 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <span className="text-primary">★</span> 4.5 / 5
              </span>
              <span className="h-4 w-px bg-border" />
              <span>500+ events</span>
              <span className="h-4 w-px bg-border" />
              <span>25 years</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            <PlaceholderImage
              label="Signature Wedding Stage Backdrop"
              src="/images/hero-stage.jpg"
              aspect="aspect-[16/10]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
