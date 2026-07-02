"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

export default function AnimatedCounter({
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.8,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        node.textContent = prefix + value.toFixed(decimals) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, prefix, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
