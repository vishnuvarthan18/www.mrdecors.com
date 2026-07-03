"use client";

import Link from "next/link";
import { motion } from "motion/react";

const services = [
  {
    no: "01",
    title: "Wedding Stage Decor",
    description: "Signature stage backdrops and mandap decor designed around your theme.",
  },
  {
    no: "02",
    title: "Custom & Bespoke Design",
    description: "One of a kind installations built from scratch, nothing off the shelf.",
  },
  {
    no: "03",
    title: "CNC & Laser Cutting",
    description: "In-house fabrication on MDF, acrylic, WPC, ACP and more for decorators.",
  },
  {
    no: "04",
    title: "Birthday & Corporate Events",
    description: "Full themed decor for birthdays, housewarmings, and corporate functions.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceList() {
  return (
    <div className="border-t border-border">
      {services.map((service, i) => (
        <motion.div
          key={service.no}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.06, ease }}
        >
          <Link
            href="/services"
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-border py-8 transition-colors hover:bg-bg-elev/60 sm:py-10 sm:px-4"
          >
            <span className="font-display text-sm text-muted">{service.no}</span>
            <div>
              <h3 className="font-display text-2xl sm:text-4xl font-medium text-text transition-colors group-hover:text-primary">
                {service.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm text-muted">{service.description}</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:rotate-45">
              ↗
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
