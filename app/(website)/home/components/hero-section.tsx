"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export const HeroSection = () => {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only run video preload on client side
    if (typeof window !== 'undefined') {
      const videoElement = document.createElement('video');
      videoElement.src = "/banner.mp4";
      videoElement.onloadeddata = () => setIsLoading(false);
      videoElement.onerror = () => {
        setVideoError(true);
        setIsLoading(false);
      };
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden mt-20">
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-10">
        {!videoError ? (
          <video
            key="hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero-fallback.jpg"
            className="h-full w-full object-cover"
            onError={() => setVideoError(true)}
            onLoadedData={() => setIsLoading(false)}
          >
            <source src="/banner.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/images/hero-fallback.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl text-shadow-lg"
          >
            Transform Your Exhibition Presence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-lg sm:text-xl text-shadow-md"
          >
            Create stunning exhibition stands that leave a lasting impression
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
