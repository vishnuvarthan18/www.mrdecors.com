import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Testimonials | MR Decors",
  description: "What clients say about MR Decors' wedding and event decor work in Erode.",
};

const placeholderReviews = [
  { quote: "Placeholder review — replace with an actual client quote once available (e.g. from Justdial or Google).", name: "Client Name", event: "Wedding, Erode" },
  { quote: "Placeholder review — replace with an actual client quote once available.", name: "Client Name", event: "Puberty Function, Erode" },
  { quote: "Placeholder review — replace with an actual client quote once available.", name: "Client Name", event: "Corporate Event, Erode" },
  { quote: "Placeholder review — replace with an actual client quote once available.", name: "Client Name", event: "Birthday, Erode" },
  { quote: "Placeholder review — replace with an actual client quote once available.", name: "Client Name", event: "Housewarming, Erode" },
  { quote: "Placeholder review — replace with an actual client quote once available.", name: "Client Name", event: "Wedding, Erode" },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Trusted across Erode for 25 years"
        description="4.5★ rating from 34 reviews on Justdial. Real client quotes to be added once shared by MR Decors."
      />

      <section className="pb-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderReviews.map((review, i) => (
              <Reveal key={i} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-border bg-bg-elev p-7 transition-colors hover:border-primary">
                  <div className="flex gap-0.5 text-primary mb-5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <svg key={star} width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L10 1.5Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/90 leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-display font-medium text-white">{review.name}</p>
                    <p className="text-xs text-muted">{review.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
