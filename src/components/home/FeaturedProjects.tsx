"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";

export type FeaturedItem = {
  id: string;
  title: string;
  category: string;
  image: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function FeaturedProjects({ projects }: { projects: FeaturedItem[] }) {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: (i % 2) * 0.1, ease }}
          className={i % 2 === 1 ? "sm:mt-16" : ""}
        >
          <Link href="/portfolio" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bg-elev">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="translate-y-4 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-medium text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project →
                </span>
              </div>
              <span className="absolute left-5 top-5 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur">
                {project.category}
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl font-medium text-white transition-colors group-hover:text-primary">
                {project.title}
              </h3>
              <span className="shrink-0 text-sm text-muted">{project.category}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
