import Link from "next/link";

export default function Logo({
  href = "/",
  className = "",
  imgClassName = "h-11 w-auto",
}: {
  href?: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="MR Decors home"
      className={`inline-flex items-center ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/MR-logo.svg" alt="MR Decors — Decor Solutions Forever" className={imgClassName} />
    </Link>
  );
}
