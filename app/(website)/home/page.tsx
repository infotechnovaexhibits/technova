import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { ServicesSection } from "./components/services-section";
import { StatsSection } from "./components/stats-section";
import { WhyChooseUs } from "./components/why-choose-us";
import { FeaturedProjects } from "./components/featured-projects";
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

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Featured Projects/Recent Work */}
      <FeaturedProjects />

      {/* Trusted Brands */}
      <TrustedBrands />

      {/* Client Testimonials */}
      <TestimonialsSection />

      {/* Our Process */}
      <OurProcess />

      {/* Contact CTA */}
      <ContactCTA />
    </main>
  );
} 