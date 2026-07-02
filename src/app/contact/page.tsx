import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { business, whatsappLink } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact | MR Decors",
  description:
    "Get in touch with MR Decors for custom wedding and event decor in Erode. Call, WhatsApp, or visit us in Veerappanchatram.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your event"
        description="Reach out by phone, WhatsApp, or the form below — we typically respond the same day."
      />

      <section className="pb-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <div>
                <div className="rounded-2xl border border-border overflow-hidden">
                  <iframe
                    title="MR Decors location"
                    src={business.mapsEmbedSrc}
                    className="w-full aspect-[4/3] grayscale invert-[0.92] contrast-[0.9]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Address</dt>
                    <dd className="mt-1.5 text-white">
                      <a href={business.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        {business.address}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Phone</dt>
                    <dd className="mt-1.5 text-white">
                      <a href={business.phoneLink} className="hover:text-primary transition-colors">
                        {business.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Hours</dt>
                    <dd className="mt-1.5 text-white">{business.hours}</dd>
                  </div>
                </dl>

                <a
                  href={whatsappLink("Hi MR Decors, I'd like to enquire about event decor.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="rounded-2xl border border-border bg-bg-elev p-6 sm:p-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
