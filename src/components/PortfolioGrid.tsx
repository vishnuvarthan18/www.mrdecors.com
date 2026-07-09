"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import ImageLightbox from "@/components/ImageLightbox";

const categories = [
  "All",
  "Wedding",
  "Puberty Function",
  "Birthday",
  "Housewarming",
  "Corporate",
  "Custom Fabrication",
] as const;

type Category = (typeof categories)[number];

export type PortfolioGridItem = {
  id: string;
  title: string;
  category: string;
  image: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function PortfolioGrid({ items }: { items: PortfolioGridItem[] }) {
  const [active, setActive] = useState<Category>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered =
    active === "All" ? items : items.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActive(category);
              setSelectedIndex(null);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === category
                ? "border-primary bg-primary text-white"
                : "border-border text-muted hover:border-text hover:text-text"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease }}
              className="group"
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                className="w-full text-left"
                aria-label={`View ${project.title}`}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-bg-elev">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur">
                    {project.category}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      View
                    </span>
                  </div>
                </div>
                <p className="mt-4 font-display text-lg font-medium text-text transition-colors group-hover:text-primary">
                  {project.title}
                </p>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {selectedIndex !== null && (
        <ImageLightbox
          items={filtered}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}
    </div>
  );
}
