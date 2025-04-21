"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Building2, Globe2, Target, Users, Lightbulb, Award, Eye, CheckCircle2 } from 'lucide-react';
import { TrustedBrands } from '../home/components/trusted-brands';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[400px] mt-20"
      >
        <Image
          src="/images/about-banner.jpeg"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/10 p-3 rounded-xl mb-6"
          >
            <Users className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-5xl font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-xl max-w-2xl"
          >
            Crafting Extraordinary Exhibition Experiences Since 2010
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24">
        {/* Who We Are Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/images/image1.png"
              alt="Exhibition Stand Design"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:pl-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Building2 className="text-blue-600 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-800">Who We Are</h2>
            </div>
            <div className="space-y-8 text-gray-600">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed"
              >
                Technova is one of the best exhibition stand design & Construction Company which provides complete exhibition stand solutions worldwide. We build the most enthralling designs for our clients that not only attract audiences to your exhibits but increase your visitor engagement too.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed"
              >
                We provide unique and innovative exhibition stand design services across worldwide. With the help of our captivating exhibition stand designs, you not only attract your target audience in an event but also get the best return of investment.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg leading-relaxed"
              >
                We focus mainly on the goals and objectives of your business and provide captivating and outstanding exhibition stand services that enhance your brand recognition.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 mt-12"
            >
              {[
                "Complete Solutions",
                "Global Presence",
                "Innovative Designs",
                "ROI Focused"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-blue-600">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-gray-700 text-lg">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Our Vision */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 lg:pr-6"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-purple-50 p-3 rounded-xl">
                <Eye className="text-purple-600 w-6 h-6" />
              </div>
              <h2 className="text-3xl font-semibold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Our vision is to be the global leader in exhibition stand design and construction, setting new standards for creativity, innovation, and client satisfaction. We strive to create immersive experiences that leave lasting impressions.
            </p>
            <div className="grid grid-cols-1 gap-6">
              {[
                "Pushing boundaries in design innovation",
                "Delivering exceptional client experiences",
                "Creating sustainable exhibition solutions",
                "Building long-term client relationships"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 bg-purple-600 rounded-full" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-2xl overflow-hidden order-1 lg:order-2 shadow-lg"
          >
            <Image
              src="/images/image2.png"
              alt="Our Vision"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We combine creativity, expertise, and dedication to deliver exceptional exhibition experiences
            </p>
          </motion.div>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: <Globe2 className="w-7 h-7" />,
                title: "Global Reach",
                desc: "Serving clients worldwide with local expertise",
                bgColor: "bg-blue-50",
                lightBg: "bg-blue-50/30",
                iconColor: "text-blue-600"
              },
              {
                icon: <Target className="w-7 h-7" />,
                title: "Client Focus",
                desc: "Your success is our priority",
                bgColor: "bg-purple-50",
                lightBg: "bg-purple-50/30",
                iconColor: "text-purple-600"
              },
              {
                icon: <Lightbulb className="w-7 h-7" />,
                title: "Innovation",
                desc: "Cutting-edge design solutions",
                bgColor: "bg-orange-50",
                lightBg: "bg-orange-50/30",
                iconColor: "text-orange-600"
              },
              {
                icon: <Building2 className="w-7 h-7" />,
                title: "Experience",
                desc: "12+ years of excellence",
                bgColor: "bg-emerald-50",
                lightBg: "bg-emerald-50/30",
                iconColor: "text-emerald-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`${feature.lightBg} p-8 text-center group rounded-xl shadow-[0_2px_8px_rgb(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgb(0,0,0,0.07)] transition-shadow duration-300`}
              >
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${feature.bgColor} w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                >
                  <div className={feature.iconColor}>
                    {feature.icon}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-base">{feature.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Trusted Brands Section */}
        <TrustedBrands />
      </div>

      {/* CTA Section - Full Width */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative h-[400px]  bg-gradient-to-r from-blue-600 to-purple-600"
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
            Ready to Transform Your Exhibition Presence?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-white/90 mb-8 text-lg max-w-2xl"
          >
            Let's create an extraordinary exhibition experience together
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
    </div>
  );
} 