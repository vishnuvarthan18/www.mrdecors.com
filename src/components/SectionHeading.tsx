import Reveal from "./motion/Reveal";
import AnimatedText from "./motion/AnimatedText";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <Reveal>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <h2
        className={`text-4xl sm:text-5xl font-semibold ${
          light ? "text-white" : "text-text"
        }`}
      >
        <AnimatedText text={title} />
      </h2>
      {description && (
        <Reveal delay={0.15}>
          <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
