import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/motion/Reveal";
import { whatsappLink } from "@/lib/business";

export const metadata: Metadata = {
  title: "Services | MR Decors",
  description:
    "Wedding stage decor, bespoke custom design, CNC & laser cutting, and full event decor services from MR Decors, Erode.",
};

const services = [
  {
    title: "Wedding Stage Decor",
    description:
      "From mandap to reception stage, we design and build backdrops around your colors, theme, and venue — florals, drapery, lighting accents, and structural pieces, all fabricated in-house.",
    points: ["Mandap & stage backdrops", "Floral and fabric styling", "Entrance & walkway decor"],
  },
  {
    title: "Custom & Bespoke Design",
    description:
      "This is where we do our best work. No catalog, no repeats — every bespoke piece starts with your idea and is built to match it exactly, in any material or scale.",
    points: ["One-on-one design consultation", "Fully custom structures", "Built for your exact venue"],
  },
  {
    title: "CNC & Laser Cutting",
    description:
      "In-house fabrication on MDF, WPC, plywood, acrylic, ACP, PVC foam board, thermocol, and wood — for our own installations and for other decorators sourcing custom-cut panels.",
    points: ["Precision CNC & laser cutting", "Bulk panel fabrication for decorators", "Multiple material options"],
  },
  {
    title: "Birthday, Housewarming & Corporate Events",
    description:
      "Full decor for birthdays, puberty functions, housewarmings, and corporate functions — themed setups designed to fit the occasion.",
    points: ["Theme-based birthday decor", "Traditional housewarming setups", "Corporate stage & branding decor"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Decor built around your event, not a catalog"
        description="Every service below is backed by our own in-house fabrication — we design it, we cut it, we build it, we install it."
      />

      <div className="space-y-20 sm:space-y-28 pb-28">
        {services.map((service, index) => (
          <Container key={service.title}>
            <div
              className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal direction={index % 2 === 1 ? "left" : "right"}>
                <PlaceholderImage label={service.title} aspect="aspect-[4/3]" />
              </Reveal>
              <Reveal direction={index % 2 === 1 ? "right" : "left"}>
                <div>
                  <span className="font-display text-5xl font-semibold text-primary/30">
                    0{index + 1}
                  </span>
                  <h2 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-white">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-muted leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-sm text-white/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(`Hi MR Decors, I'd like to enquire about ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                  >
                    Enquire About This
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </Container>
        ))}
      </div>
    </>
  );
}
