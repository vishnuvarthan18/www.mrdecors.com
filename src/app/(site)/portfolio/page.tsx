import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import InstagramFeed from "@/components/InstagramFeed";
import { getPortfolioItems } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio | MR Decors",
  description:
    "Browse custom wedding, birthday, puberty function, housewarming, corporate, and fabrication work by MR Decors, Erode.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const items = await getPortfolioItems();
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="A portfolio built on custom craft"
        description="Every installation here was designed and fabricated from scratch. No repeated templates, no two events alike."
      />
      <section className="pb-28">
        <Container>
          <PortfolioGrid items={items} />
        </Container>
      </section>

      <section className="section-dark glow-dark py-24 sm:py-28">
        <Container>
          <InstagramFeed />
        </Container>
      </section>
    </>
  );
}
