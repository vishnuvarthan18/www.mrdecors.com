"use client";

import Link from "next/link";
import { motion } from "motion/react";

const projects = [
  { title: "Novaa Wedding Stage", category: "Wedding", year: "2025" },
  { title: "Floral Arch Mandap", category: "Wedding", year: "2025" },
  { title: "Pastel Puberty Set", category: "Puberty Function", year: "2024" },
  { title: "Corporate Launch Wall", category: "Corporate", year: "2024" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturedProjects() {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {projects.map((project, i) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease }}
          className={i % 2 === 1 ? "sm:mt-16" : ""}
        >
          <Link href="/portfolio" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg-elev">
              <div className="absolute inset-0 scale-100 bg-[radial-gradient(circle_at_35%_25%,rgba(236,25,35,0.22),transparent_55%)] transition-transform duration-[1.2s] group-hover:scale-110" />
              <div
                className="absolute inset-0 opacity-[0.06] transition-transform duration-[1.2s] group-hover:scale-110"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="translate-y-4 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-medium text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project →
                </span>
              </div>
              <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
                {project.category}
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <h3 className="font-display text-2xl font-medium text-white transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <span className="text-sm text-muted">{project.year}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
