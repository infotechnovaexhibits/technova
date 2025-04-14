"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Expert Team",
    description: "Our experienced professionals bring creativity and expertise to every project.",
    icon: "👥"
  },
  {
    title: "Custom Solutions",
    description: "We tailor our services to meet your specific needs and objectives.",
    icon: "🎯"
  },
  {
    title: "Quality Assurance",
    description: "We maintain the highest standards of quality in all our services.",
    icon: "✨"
  },
  {
    title: "Innovative Approach",
    description: "We use cutting-edge technology and creative solutions for your events.",
    icon: "💡"
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
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
          <h2 className="text-4xl font-bold text-primary-900 mb-4">Why Choose Us</h2>
          <p className="text-primary-700 max-w-2xl mx-auto">
            We stand out from the competition with our unique approach and commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-[0_0_50px_-12px_rgb(0,160,209,0.1)] hover:shadow-[0_0_50px_-12px_rgb(0,160,209,0.2)] transition-all border border-primary-100 group"
            >
              <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-900">{feature.title}</h3>
              <p className="text-primary-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 