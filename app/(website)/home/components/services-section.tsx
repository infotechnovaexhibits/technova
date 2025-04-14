"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "Custom Exhibitions",
    description: "Tailored exhibition solutions designed to showcase your brand's unique identity and message.",
    icon: "🎪"
  },
  {
    title: "Event Management",
    description: "Comprehensive event planning and execution services for successful corporate and public events.",
    icon: "🎭"
  },
  {
    title: "Brand Activation",
    description: "Creative strategies to bring your brand to life and engage with your target audience.",
    icon: "✨"
  },
  {
    title: "Digital Solutions",
    description: "Cutting-edge digital experiences and interactive installations for modern exhibitions.",
    icon: "💻"
  }
];

export const ServicesSection = () => {
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of exhibition and event services to help you create memorable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 