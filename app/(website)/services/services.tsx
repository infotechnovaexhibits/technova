"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building } from 'lucide-react';
import { TrustedBrands } from '../home/components/trusted-brands';

const services = [
  {
    id: 1,
    name: "Custom Exhibition Stands",
    description: "Transform your business presence with our bespoke exhibition stands designed to make a lasting impression.",
    image: "/images/service1.jpg",
    slug: "custom-exhibition-stands"
  },
  {
    id: 2,
    name: "Mezzanine Stands",
    description: "Maximize your exhibition space with our innovative double-decker stands for substantial driven spaces.",
    image: "/images/service2.jpg",
    slug: "mezzanine-stands"
  },
  {
    id: 3,
    name: "Country Pavilion",
    description: "Showcase your nation's excellence with our expertly designed and managed country pavilions.",
    image: "/images/service3.jpg",
    slug: "country-pavilion"
  },
  {
    id: 4,
    name: "Interior/Exterior Design",
    description: "Create stunning spaces that reflect your brand's personality with our flamboyant design solutions.",
    image: "/images/service4.jpg",
    slug: "interior-exterior-design"
  },
  {
    id: 5,
    name: "Exhibition Management",
    description: "End-to-end exhibition management services ensuring seamless execution of your event.",
    image: "/images/service5.jpg",
    slug: "exhibition-management"
  }
];


export default function Services() {
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
          src="/images/services-banner.jpeg"
          alt="Our Services"
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
            <Building className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-xl max-w-2xl"
          >
            Transforming Visions into Reality
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-14">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Elevate Your Exhibition Experience
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Technova, we specialize in creating unforgettable exhibition experiences that help your brand stand out. Our comprehensive range of services is designed to transform your vision into reality, ensuring maximum impact and engagement at every event.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:place-items-center">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 w-full max-w-[400px]"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.name}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Know More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trusted Brands Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <TrustedBrands />
        </motion.div>
      </div>
    </div>
  );
} 