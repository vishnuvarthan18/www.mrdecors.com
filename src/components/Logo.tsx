import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-display font-bold italic text-lg transition-transform group-hover:scale-105">
        m
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display font-bold tracking-tight text-lg text-white">
          MR <span className="text-primary">DECORS</span>
        </span>
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted mt-1">
          Decor Solutions Forever
        </span>
      </span>
    </Link>
  );
}
