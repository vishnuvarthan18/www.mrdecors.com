import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PlaceholderImage from "@/components/PlaceholderImage";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Us | MR Decors",
  description:
    "MR Decors has been designing and fabricating custom wedding and event decor in Erode since 2000.",
};

const values = [
  { title: "Custom, Always", description: "We don't reuse templates — every project is designed from zero." },
  { title: "Made In-House", description: "Our own CNC and laser cutting means full control over quality and detail." },
  { title: "25 Years of Trust", description: "Two decades of weddings and events across Erode, built on repeat referrals." },
];

const stats = [
  { to: 25, suffix: "+", label: "Years" },
  { to: 4.5, suffix: "★", decimals: 1, label: "Rating" },
  { to: 500, suffix: "+", label: "Events" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About MR Decors"
        title="Decor solutions forever, since 2000"
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  MR Decors started in Veerappanchatram, Erode, with a simple
                  idea: event decor shouldn&apos;t look like everyone else&apos;s.
                  Over 25 years, that idea grew into a full decor and fabrication
                  business — one of the few in the region that designs, cuts, and
                  builds everything under one roof.
                </p>
                <p>
                  Today we work across weddings, puberty functions, birthdays,
                  housewarmings, and corporate events, alongside supplying custom
                  CNC and laser-cut panels to other decorators. Every project
                  still starts the same way it did in 2000 — by listening to what
                  the client actually wants, then building it by hand.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-4xl font-semibold text-primary">
                      <AnimatedCounter
                        to={stat.to}
                        suffix={stat.suffix}
                        decimals={stat.decimals ?? 0}
                      />
                    </p>
                    <p className="mt-1 text-xs text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal direction="left">
              <PlaceholderImage label="MR Decors Workshop" aspect="aspect-[4/5]" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-bg-elev">
        <Container>
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-border bg-bg p-8 transition-colors hover:border-primary">
                  <h3 className="font-display text-xl font-medium text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
