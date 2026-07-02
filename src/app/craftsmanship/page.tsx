import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Materials & Craftsmanship | MR Decors",
  description:
    "MR Decors fabricates custom decor in-house using MDF, WPC, plywood, acrylic, ACP, PVC foam board, thermocol and wood, with precision CNC and laser cutting.",
};

const materials = [
  { name: "MDF", note: "Sturdy base panels for backdrops and cutout designs" },
  { name: "WPC", note: "Weather-resistant boards for outdoor installations" },
  { name: "Plywood", note: "Structural framing for large stage builds" },
  { name: "Acrylic", note: "Sharp, modern cutouts and illuminated signage" },
  { name: "ACP", note: "Sleek panels for corporate and branding decor" },
  { name: "PVC Foam Board", note: "Lightweight boards for detailed cutwork" },
  { name: "Thermocol", note: "Sculptable forms for 3D decor pieces" },
  { name: "Wood", note: "Natural-finish structural and decorative elements" },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Craftsmanship"
        title="Manufactured in-house, not outsourced"
        description="MR Decors isn't just a decorator — we're fabricators. Every backdrop, panel, and cutout is CNC or laser-cut on our own equipment, which is why our designs can be entirely custom."
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal className="lg:col-span-2 lg:row-span-2">
              <PlaceholderImage
                label="CNC Cutting in Progress"
                aspect="aspect-[4/3] lg:aspect-[16/12]"
                className="h-full"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <PlaceholderImage label="Laser-Cut Detail Work" aspect="aspect-[4/3]" />
            </Reveal>
            <Reveal delay={0.2}>
              <PlaceholderImage label="Raw Material Prep" aspect="aspect-[4/3]" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-bg-elev">
        <Container>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white">
              Materials we work with
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((material, i) => (
              <Reveal key={material.name} delay={(i % 4) * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-bg p-6 transition-colors hover:border-primary">
                  <h3 className="font-display text-lg font-medium text-white">
                    {material.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{material.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-border bg-bg-elev p-8 sm:p-14 noise-bg">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                Why it matters
              </h2>
              <p className="mt-4 max-w-2xl text-muted leading-relaxed">
                Because we cut and shape everything ourselves, we can build
                designs other decorators simply can&apos;t — custom lettering,
                intricate jaali patterns, layered dimensional pieces — all sized
                exactly to your stage. We also fabricate panels and backdrops for
                other event decorators who need custom-cut work.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
