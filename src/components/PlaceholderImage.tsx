import Image from "next/image";

export default function PlaceholderImage({
  label,
  src,
  aspect = "aspect-[4/3]",
  className = "",
}: {
  label: string;
  src?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={`group/ph relative ${aspect} w-full overflow-hidden rounded-2xl border border-border bg-bg-elev ${className}`}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={label}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] group-hover/ph:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,25,35,0.18),transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 12px)",
            }}
          />
          <svg
            className="absolute -right-6 -bottom-6 h-40 w-40 text-primary/20 transition-transform duration-700 group-hover/ph:scale-110 group-hover/ph:rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C10 6 7 8 3 9c4 1 7 3 9 7 2-4 5-6 9-7-4-1-7-3-9-7Z" />
          </svg>
        </>
      )}
      <div className="absolute inset-0 flex items-end p-5">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          {label}
        </span>
      </div>
    </div>
  );
}
