"use client";

import { Button } from "../../../../components/ui/button";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden mt-20">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/hero-section.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
            Welcome to Our Platform
          </h1>
          <p className="mb-8 text-lg sm:text-xl">
            Discover amazing features and services that will transform your experience
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            Get Started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
