"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import type { ReactNode } from "react";

export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  target,
  rel,
  strength = 0.35,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
