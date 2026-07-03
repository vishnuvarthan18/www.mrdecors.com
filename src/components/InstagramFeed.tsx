"use client";

import { createElement } from "react";
import Image from "next/image";
import Script from "next/script";
import { motion } from "motion/react";
import { business } from "@/lib/business";

// Once MR Decors connects their Instagram in Behold.so, set
// NEXT_PUBLIC_BEHOLD_FEED_ID in the env and the live feed replaces the
// fallback grid below automatically. No account = styled fallback stays.
const BEHOLD_FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

// Posts render from this array today. Once the Instagram integration is wired
// (Graph API or a widget/CMS sync), replace this with live post data of the
// same shape { image, caption, permalink } and the grid updates automatically.
const posts = [
  { image: "/images/wedding-1.jpg", caption: "Royal red & gold wedding stage", permalink: business.instagram },
  { image: "/images/floral-1.jpg", caption: "Floral arch mandap", permalink: business.instagram },
  { image: "/images/corporate.jpg", caption: "Corporate launch backdrop", permalink: business.instagram },
  { image: "/images/table-decor.jpg", caption: "Pastel themed set", permalink: business.instagram },
  { image: "/images/fabrication.jpg", caption: "In house CNC fabrication", permalink: business.instagram },
  { image: "/images/arch.jpg", caption: "Entrance decor arch", permalink: business.instagram },
];

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function InstagramFeed() {
  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Live from Instagram
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-text">
            Follow @{business.instagramHandle}
          </h2>
          <p className="mt-4 max-w-xl text-muted leading-relaxed">
            We post our latest setups the moment they go live. New work here
            reflects straight from our Instagram feed.
          </p>
        </div>
        <a
          href={business.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <InstagramIcon className="h-5 w-5" />
          Follow on Instagram
        </a>
      </div>

      {BEHOLD_FEED_ID ? (
        <div className="mt-12">
          <Script src="https://w.behold.so/widget.js" type="module" strategy="afterInteractive" />
          {createElement("behold-widget", { "feed-id": BEHOLD_FEED_ID })}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease }}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-bg-elev"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/85 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <InstagramIcon className="h-8 w-8 text-white" />
                <span className="px-4 text-center text-sm font-medium text-white">
                  {post.caption}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
