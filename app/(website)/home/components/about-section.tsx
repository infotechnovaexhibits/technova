"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../../../../components/ui/button";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/about-image.jpg"
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Stats Card */}
            <div className="absolute -right-8 bottom-12 bg-white p-6 rounded-xl shadow-lg">
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600">10+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600">500+</p>
                  <p className="text-sm text-gray-600">Projects Done</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block rounded-lg bg-primary-100/50 px-4 py-2">
              <p className="text-primary-700 font-medium">About Our Company</p>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900">
              Transforming Ideas into{" "}
              <span className="text-primary-600">Digital Excellence</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              We are passionate about creating innovative digital solutions that help businesses thrive in the modern world. Our team of experts combines creativity with technical expertise to deliver exceptional results.
            </p>

            <div className="space-y-4">
              {/* Feature Points */}
              {[
                "Expert Team with Years of Experience",
                "Cutting-edge Technology Solutions",
                "Customer-centric Approach",
                "Proven Track Record of Success"
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg
                      className="h-4 w-4 text-primary-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white"
              >
                Learn More
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-600 text-primary-600 hover:bg-primary-50"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
