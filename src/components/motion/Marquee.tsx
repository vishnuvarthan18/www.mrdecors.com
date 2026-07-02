"use client";

import type { ReactNode } from "react";

export default function Marquee({
  items,
  duration = 30,
  className = "",
  separator = "✦",
}: {
  items: ReactNode[];
  duration?: number;
  className?: string;
  separator?: ReactNode;
}) {
  const content = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-8">
          <span>{item}</span>
          <span className="text-primary">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`group flex overflow-hidden ${className}`}>
      <div
        className="flex animate-marquee group-hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
