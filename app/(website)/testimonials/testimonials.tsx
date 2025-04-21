"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageSquare, Quote, Send, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Arjun Mehta",
    message: "Technova's innovative designs transformed our exhibition presence. Their attention to detail was exceptional!"
  },
  {
    name: "Riya Sharma",
    message: "The exhibition stand was a masterpiece. Every element perfectly represented our brand vision."
  },
  {
    name: "Dev Patel",
    message: "Outstanding creativity and professionalism. Our stand became the highlight of the event."
  },
  {
    name: "Zara Khan",
    message: "Incredible work by the Technova team. They exceeded all our expectations!"
  },
  {
    name: "Aditya Singh",
    message: "The design was innovative and eye-catching. Best exhibition stand we've ever had!"
  },
  {
    name: "Nisha Verma",
    message: "Brilliant execution from concept to completion. Highly recommend their services!"
  },
  {
    name: "Kabir Malhotra",
    message: "The team's expertise made our exhibition presence truly remarkable and memorable."
  },
  {
    name: "Ananya Reddy",
    message: "Perfect blend of creativity and functionality. Our stand drew massive attention!"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative h-[400px] mt-20">
        <Image
          src="/images/testimonial-banner.jpeg"
          alt="Client Testimonials"
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
          <div className="bg-white/10 p-3 rounded-xl mb-6">
            <Quote className="w-8 h-8" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-xl max-w-2xl">
            Hear What Our Clients Say About Their Experience With Us
          </p>
        </motion.div>
      </div>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                transition: { duration: 0.3 }
              }}
              className="bg-white rounded-3xl p-8 text-center flex flex-col items-center justify-between min-h-[360px] relative group transition-all duration-300"
              style={{
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-3 shadow-lg"
              >
                <Quote className="w-6 h-6 text-white" />
              </motion.div>
              
              <div className="space-y-6 mt-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="flex justify-center gap-1"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-gray-600 text-lg leading-relaxed font-light"
                >
                  "{testimonial.message}"
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="mt-6 relative"
              >
                <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-500">
                  {testimonial.name}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Share Your Experience Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
        >
          <div className="text-center mb-12">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Share Your Experience</h2>
            <p className="text-gray-600">
              We value your feedback. Share your experience working with us.
            </p>
          </div>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your email"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Experience</label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Share your experience working with us..."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <button
                type="submit"
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group hover:scale-105"
              >
                Submit Testimonial
                <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
} 