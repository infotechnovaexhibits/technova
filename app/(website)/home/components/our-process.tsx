"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Discovery",
    description: "We begin by understanding your vision, goals, and requirements.",
    icon: "🔍"
  },
  {
    title: "Planning",
    description: "Our team creates a detailed plan tailored to your specific needs.",
    icon: "📋"
  },
  {
    title: "Design",
    description: "We develop creative concepts and designs for your event.",
    icon: "🎨"
  },
  {
    title: "Execution",
    description: "Our experienced team brings your vision to life with precision.",
    icon: "⚡"
  }
];

export const OurProcess = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/patterns/circuit.svg')] opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary-900 mb-4">Our Process</h2>
          <p className="text-primary-700 max-w-2xl mx-auto">
            We follow a systematic approach to ensure the success of your event.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary-300 to-primary-500 hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-8 bg-white rounded-xl shadow-[0_0_50px_-12px_rgb(0,160,209,0.1)] hover:shadow-[0_0_50px_-12px_rgb(0,160,209,0.2)] transition-all border border-primary-100 group ${
                  index % 2 === 0 ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"
                }`}
              >
                <div className={`absolute top-8 ${
                  index % 2 === 0 ? "-right-10" : "-left-10"
                } w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl border-4 border-primary-300 group-hover:border-primary-500 transition-colors duration-300 hidden md:flex shadow-lg`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary-900">{step.title}</h3>
                <p className="text-primary-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 