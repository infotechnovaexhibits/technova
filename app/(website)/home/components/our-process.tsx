"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PenTool, Layout, Settings } from 'lucide-react';

const processes = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Consultation",
    description: "Understanding your brand vision and exhibition goals",
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: "Design",
    description: "Creating unique concepts that align with your identity",
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Production",
    description: "Building your stand with precision and quality",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Installation",
    description: "Professional setup and event support",
  }
];

export const OurProcess = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            How We Work
          </h2>
          <p className="text-gray-600">
            Simple steps to create your perfect exhibition stand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                  {process.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {process.description}
                </p>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 