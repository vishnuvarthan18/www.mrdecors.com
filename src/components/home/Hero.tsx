"use client";

import Link from "next/link";
import { motion } from "motion/react";
import PlaceholderImage from "@/components/PlaceholderImage";
import { whatsappLink } from "@/lib/business";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-16 noise-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elev px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted"
        >
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          Custom Decor Manufacturer · Erode · Since 2000
        </motion.p>

        <h1 className="font-display font-semibold text-white text-[13vw] leading-[0.9] sm:text-[10vw] lg:text-[8.5rem]">
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
              decor — every piece cut, shaped, and built in-house. Never off a
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
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            <PlaceholderImage
              label="Signature Wedding Stage Backdrop"
              aspect="aspect-[16/10]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
