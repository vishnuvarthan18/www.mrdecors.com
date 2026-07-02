import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio | MR Decors",
  description:
    "Browse custom wedding, birthday, puberty function, housewarming, corporate, and fabrication work by MR Decors, Erode.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="A portfolio built on custom craft"
        description="Every installation here was designed and fabricated from scratch — no repeated templates, no two events alike."
      />
      <section className="pb-28">
        <Container>
          <PortfolioGrid />
        </Container>
      </section>
    </>
  );
}
