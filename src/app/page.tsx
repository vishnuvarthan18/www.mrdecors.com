import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import Accordion from "@/components/motion/Accordion";
import Hero from "@/components/home/Hero";
import ServiceList from "@/components/home/ServiceList";
import FeaturedProjects from "@/components/home/FeaturedProjects";

const materials = [
  "MDF",
  "Acrylic",
  "WPC",
  "Plywood",
  "ACP",
  "Thermocol",
  "PVC Foam Board",
  "Wood",
  "CNC Cutting",
  "Laser Cutting",
];

const stats = [
  { to: 25, suffix: "+", label: "Years in Business" },
  { to: 4.5, suffix: "★", decimals: 1, label: "Justdial Rating" },
  { to: 500, suffix: "+", label: "Events Decorated" },
  { to: 100, suffix: "%", label: "Custom-Fabricated" },
];

const process = [
  { step: "01", title: "Consult", description: "Share your event, theme, date, and vision with our team." },
  { step: "02", title: "Design", description: "We sketch a fully custom concept built around your space and budget." },
  { step: "03", title: "Fabricate", description: "In-house CNC and laser cutting brings the design to life." },
  { step: "04", title: "Install", description: "Our crew sets everything up on-site, ready for your big day." },
];

const faqs = [
  {
    q: "Do you only do weddings?",
    a: "No — alongside weddings we handle puberty functions, birthdays, housewarmings, and corporate events, plus custom CNC and laser-cut fabrication for other decorators.",
  },
  {
    q: "What makes your decor custom?",
    a: "We don't reuse templates. Every backdrop and installation is designed from scratch and cut on our own equipment, so we can build details other decorators can't.",
  },
  {
    q: "Which areas do you serve?",
    a: "We're based in Veerappanchatram, Erode, and take on events across Erode and nearby towns. Reach out with your location and we'll confirm.",
  },
  {
    q: "How do I get a quote?",
    a: "Message us on WhatsApp or use the contact form with your event type, date, and ideas. We typically respond the same day.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-y border-border bg-bg-elev py-6">
        <Marquee
          duration={28}
          className="text-xl sm:text-2xl font-display font-medium uppercase tracking-tight text-white/80"
          items={materials}
        />
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <SectionHeading
            eyebrow="What We Do"
            title="Decor & fabrication, under one roof"
            description="From concept to install — we design it, cut it, build it, and set it up."
          />
          <div className="mt-14">
            <ServiceList />
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32 bg-bg-elev">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Featured Work"
              title="Signature installations"
            />
            <Reveal delay={0.1}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                View Full Portfolio →
              </Link>
            </Reveal>
          </div>
          <div className="mt-16">
            <FeaturedProjects />
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <Reveal key={stat.label} direction="up">
                <div>
                  <p className="font-display text-5xl sm:text-6xl font-semibold text-primary">
                    <AnimatedCounter
                      to={stat.to}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </p>
                  <p className="mt-3 text-sm text-muted">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32 bg-bg-elev">
        <Container>
          <SectionHeading
            eyebrow="Our Process"
            title="How we build something unique"
            center
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-bg p-8 transition-colors hover:border-primary">
                  <span className="font-display text-4xl font-semibold text-primary/40">
                    {item.step}
                  </span>
                  <h3 className="mt-6 font-display text-xl font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading eyebrow="FAQ" title="Good to know" />
            <div>
              <Accordion items={faqs} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
