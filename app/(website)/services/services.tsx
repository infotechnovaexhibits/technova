"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Building, Loader2, AlertTriangle } from 'lucide-react';
import { TrustedBrands } from '../home/components/trusted-brands';
import { useGetServicesQuery } from '../../../lib/redux/services/servicesApi';
import { Service } from '../../../lib/redux/services/servicesApi';

export default function Services() {
  const { data: services, error, isLoading } = useGetServicesQuery();

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <p className="ml-4 text-xl text-gray-600">Loading Services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col justify-center items-center py-16 px-4 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-xl text-red-600">
              Failed to load services. Please try again later.
            </p>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !error && services && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:place-items-center">
            {services.map((service: Service, index: number) => (
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
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6">
                    {service.shortDescription.length > 100
                      ? `${service.shortDescription.substring(0, 100)}......`
                      : service.shortDescription}
                  </p>
                  <Link 
                    href={`/services/${service.id}`}
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Know More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!services || services.length === 0) && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No services available at the moment.</p>
          </div>
        )}

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