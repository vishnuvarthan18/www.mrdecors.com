import Container from "./Container";
import Reveal from "./motion/Reveal";
import AnimatedText from "./motion/AnimatedText";

export default function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48 sm:pb-24 noise-bg">
      <Container>
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elev px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="max-w-4xl font-display text-5xl sm:text-7xl font-semibold text-white leading-[0.95]">
          <AnimatedText text={title} />
        </h1>
        {description && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              {description}
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
