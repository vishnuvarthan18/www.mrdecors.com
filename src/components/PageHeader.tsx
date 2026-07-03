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
    <section className="relative overflow-hidden pt-36 pb-14 sm:pt-44 sm:pb-20 glow-light">
      <Container>
        <Reveal>
          <div className="flex items-center justify-between border-b border-border pb-5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-muted">
            <span className="flex items-center gap-2 text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </span>
            <span className="hidden sm:inline">MR Decors · Erode</span>
          </div>
        </Reveal>

        <h1 className="mt-10 max-w-4xl font-display text-5xl sm:text-7xl lg:text-8xl font-semibold text-text leading-[0.92]">
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
