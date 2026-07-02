"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

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

const projects: { title: string; category: Category }[] = [
  { title: "Royal Red & Gold Stage Backdrop", category: "Wedding" },
  { title: "Floral Arch Mandap", category: "Wedding" },
  { title: "Traditional Puberty Function Set", category: "Puberty Function" },
  { title: "Pastel Theme Puberty Backdrop", category: "Puberty Function" },
  { title: "Superhero Theme Birthday Set", category: "Birthday" },
  { title: "Balloon Arch Birthday Backdrop", category: "Birthday" },
  { title: "Housewarming Entrance Decor", category: "Housewarming" },
  { title: "Traditional Kalash Setup", category: "Housewarming" },
  { title: "Corporate Stage Branding", category: "Corporate" },
  { title: "Product Launch Backdrop", category: "Corporate" },
  { title: "CNC Cut Acrylic Panels", category: "Custom Fabrication" },
  { title: "Laser Cut MDF Jaali Design", category: "Custom Fabrication" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PortfolioGrid() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === category
                ? "border-primary bg-primary text-white"
                : "border-border text-muted hover:border-white hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease }}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-bg-elev">
                <div className="absolute inset-0 scale-100 bg-[radial-gradient(circle_at_35%_25%,rgba(236,25,35,0.2),transparent_55%)] transition-transform duration-[1.2s] group-hover:scale-110" />
                <div
                  className="absolute inset-0 opacity-[0.06] transition-transform duration-[1.2s] group-hover:scale-110"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
                  }}
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur">
                  {project.category}
                </span>
              </div>
              <p className="mt-4 font-display text-lg font-medium text-white transition-colors group-hover:text-primary">
                {project.title}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
