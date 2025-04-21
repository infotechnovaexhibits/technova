"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe2, Users2, Target, Award } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Globe2 className="w-5 h-5" />,
    title: "Global Reach",
    description: "Operating in 25+ countries worldwide",
  },
  {
    icon: <Users2 className="w-5 h-5" />,
    title: "Expert Team",
    description: "Skilled professionals at your service",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Custom Solutions",
    description: "Tailored designs for your brand",
  },
  {
    icon: <Award className="w-5 h-5" />,
    title: "Award Winning",
    description: "Recognized for innovation",
  }
];

export const AboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="relative h-[470px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/image4.png"
                alt="Exhibition Stand Design"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Crafting Extraordinary Exhibition Experiences
              </h2>
              
              <p className="text-gray-600">
                Technova is a leading exhibition stand design & construction company. With over 15 years of experience, we create captivating designs that transform your brand presence and boost visitor engagement at international exhibitions. Our innovative approach combines creativity with functionality, ensuring each stand tells your brand's unique story. We've successfully delivered more than 500 projects across various industries, making us your trusted partner for exhibition excellence.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-lg text-white group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <Link
                href="/about"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
