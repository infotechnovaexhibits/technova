"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  {
    name: "TechCorp",
    logo: "/brands/techcorp.png",
    width: 120,
    height: 40
  },
  {
    name: "Global Events",
    logo: "/brands/global-events.png",
    width: 120,
    height: 40
  },
  {
    name: "Innovate Solutions",
    logo: "/brands/innovate.png",
    width: 120,
    height: 40
  },
  {
    name: "Future Tech",
    logo: "/brands/future-tech.png",
    width: 120,
    height: 40
  },
  {
    name: "Digital Wave",
    logo: "/brands/digital-wave.png",
    width: 120,
    height: 40
  },
  {
    name: "Smart Systems",
    logo: "/brands/smart-systems.png",
    width: 120,
    height: 40
  }
];

export const TrustedBrands = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted By Leading Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We've had the privilege of working with some of the most innovative companies in the industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="relative w-full h-12">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 