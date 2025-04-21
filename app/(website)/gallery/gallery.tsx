"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Award, Camera } from 'lucide-react';

const images = [
  {
    src: "/images/gallery/image1.jpg",
    alt: "Exhibition Stand Design 1"
  },
  {
    src: "/images/gallery/image2.jpg",
    alt: "Exhibition Stand Design 2"
  },
  {
    src: "/images/gallery/image3.jpg",
    alt: "Exhibition Stand Design 3"
  },
  {
    src: "/images/gallery/image4.jpg",
    alt: "Exhibition Stand Design 4"
  },
  {
    src: "/images/gallery/image5.jpg",
    alt: "Exhibition Stand Design 5"
  },
  {
    src: "/images/gallery/image6.jpg",
    alt: "Exhibition Stand Design 6"
  },
  {
    src: "/images/gallery/image7.jpg",
    alt: "Exhibition Stand Design 7"
  },
  {
    src: "/images/gallery/image8.jpg",
    alt: "Exhibition Stand Design 8"
  },
  {
    src: "/images/gallery/image9.jpg",
    alt: "Exhibition Stand Design 9"
  },
  {
    src: "/images/gallery/image10.jpg",
    alt: "Exhibition Stand Design 10"
  },
  {
    src: "/images/gallery/image11.jpg",
    alt: "Exhibition Stand Design 11"
  },
  {
    src: "/images/gallery/image12.jpg",
    alt: "Exhibition Stand Design 12"
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const closeModal = () => setSelectedImage(null);
  
  const showNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };
  
  const showPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  // Handle keyboard events for modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] mt-20">
        <Image
          src="/images/gallery-banner.jpeg"
          alt="Our Gallery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 p-3 rounded-xl mb-6"
          >
            <Camera className="w-8 h-8" />
          </motion.div>
          <h1 className="text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-xl max-w-2xl">
            Explore Our Creative Exhibition Stand Designs
          </p>
        </motion.div>
      </div>

      {/* Showcase Text */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent inline-block">
            Crafting Extraordinary Exhibition Experiences
          </h2>
          <div className="h-1 w-40 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="relative w-full rounded-xl overflow-hidden group cursor-pointer"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative h-[400px] bg-gradient-to-r from-blue-600 to-purple-600"
      >
        <Image
          src="/images/about-3.jpg"
          alt="Exhibition Stand"
          fill
          className="object-cover mix-blend-overlay"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 p-3 rounded-xl mb-6"
          >
            <Award className="text-white w-8 h-8" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold text-white mb-4"
          >
            Ready to Create Your Exhibition Stand?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-white/90 mb-8 text-lg max-w-2xl"
          >
            Let's bring your vision to life with our expert design team
          </motion.p>
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            href="/contact" 
            className="inline-block bg-white text-blue-600 py-3 px-8 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300"
          >
            Get Started
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl w-full aspect-video"
              onClick={e => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                className="object-contain"
                priority
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); showPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 