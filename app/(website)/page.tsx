import { HeroSection } from "./home/components/hero-section";
import { ServicesSection } from "./home/components/services-section";
import { StatsSection } from "./home/components/stats-section";
import { TrustedBrands } from "./home/components/trusted-brands";
import { TestimonialsSection } from "./home/components/testimonials-section";
import { OurProcess } from "./home/components/our-process";
import { ContactCTA } from "./home/components/contact-cta";
import { AboutSection } from "./home/components/about-section";
export default function Home() {
  return (
    <main>
      {/* Hero Section with Video Background */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Services We Offer */}
      <ServicesSection />

      {/* Key Statistics */}
      <StatsSection />

      {/* Our Process */}
      <OurProcess />

      {/* Trusted Brands */}
      <TrustedBrands />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  );
} 