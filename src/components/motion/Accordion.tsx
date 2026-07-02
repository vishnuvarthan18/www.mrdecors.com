"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type FaqItem = { q: string; a: string };

export default function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg sm:text-xl font-medium text-text">
                {item.q}
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors ${
                  isOpen ? "bg-primary border-primary text-white" : "text-muted"
                }`}
              >
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl leading-none"
                >
                  +
                </motion.span>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 pr-14 text-muted leading-relaxed">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
