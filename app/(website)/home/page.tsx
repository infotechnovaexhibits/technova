import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { ServicesSection } from "./components/services-section";
import { StatsSection } from "./components/stats-section";
import { TrustedBrands } from "./components/trusted-brands";
import { TestimonialsSection } from "./components/testimonials-section";
import { OurProcess } from "./components/our-process";
import { ContactCTA } from "./components/contact-cta";

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