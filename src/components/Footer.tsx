import Link from "next/link";
import { business, navLinks, whatsappLink } from "@/lib/business";
import Marquee from "./motion/Marquee";
import Reveal from "./motion/Reveal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-bg">
      <div className="border-b border-border py-10 noise-bg">
        <Marquee
          duration={26}
          className="text-4xl sm:text-6xl font-display font-semibold uppercase tracking-tight text-white/90"
          items={[
            "Let's build something unique",
            "Custom Wedding Decor",
            "Since 2000",
            "Erode",
          ]}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <Reveal>
          <div className="space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white max-w-md">
              Ready to design your event?
            </h2>
            <a
              href={whatsappLink("Hi MR Decors, I'd like to enquire about event decor.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Start a Conversation
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <p className="text-sm text-muted max-w-sm">{business.address}</p>
          </div>
        </Reveal>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-5">
            Menu
          </h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/70 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-5">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <a href={business.phoneLink} className="hover:text-primary transition-colors">
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>{business.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} MR Decors. All rights reserved.</p>
          <p className="uppercase tracking-[0.2em]">Decor Solutions Forever</p>
        </div>
      </div>
    </footer>
  );
}
