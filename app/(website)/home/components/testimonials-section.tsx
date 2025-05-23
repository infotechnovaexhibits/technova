"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

export const testimonials = [
  {
    id: 1,
    name: "Rohit Mehra",
    content: "Technova created an outstanding exhibition stall for us at Auto Expo. The execution was flawless, and it attracted a lot of attention from visitors.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya Nair",
    content: "We hired Technova for the India International Trade Fair, and their design sense was truly impressive. The team was professional and delivered right on time.",
    rating: 5
  },
  {
    id: 3,
    name: "Arjun Reddy",
    content: "What Technova delivered was more than just a stall — it was a full brand experience. We saw a significant increase in leads during the exhibition.",
    rating: 5
  },
  {
    id: 4,
    name: "Anita Sharma",
    content: "The design aesthetics, attention to detail, and timely delivery were top-notch. Technova helped our FMCG brand stand out beautifully at the trade show.",
    rating: 5
  },
  {
    id: 5,
    name: "Karan Patel",
    content: "At the Vibrant Gujarat Summit, the stall designed by Technova truly stood out. We had great client interactions and saw double the usual footfall.",
    rating: 5
  },
  {
    id: 6,
    name: "Neha Sood",
    content: "Our experience with Technova at the AgriTech Expo was fantastic. They captured our concept perfectly and brought it to life with stunning visuals.",
    rating: 5
  },
  {
    id: 7,
    name: "Siddharth Jain",
    content: "Technova’s innovative booth design at the Jewellery Expo made us the talk of the event. Their creative team really understands luxury branding.",
    rating: 5
  },
  {
    id: 8,
    name: "Varun Krishnan",
    content: "We partnered with Technova for a marine tech exhibition. The entire process was smooth, and the end result was nothing short of spectacular.",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="w-[400px] flex-shrink-0 mx-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">

        {/* Content */}
        <div className="space-y-6">
          {/* Rating */}
          <div className="flex gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-600 leading-relaxed">
            "{testimonial.content}"
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 pt-4">
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Hear from our satisfied clients about their experience working with us
          </motion.p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-10" />

          {/* First Row */}
          <div className="flex animate-marquee p-10">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/testimonials"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            View All Testimonials
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}; 