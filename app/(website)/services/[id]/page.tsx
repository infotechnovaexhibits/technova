"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Award, Loader2, AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useGetServiceQuery } from '../../../../lib/redux/services/servicesApi';
import { Service } from '../../../../lib/redux/services/servicesApi';

export default function ServiceDetail() {
  const params = useParams();
  const serviceId = typeof params.id === 'string' ? params.id : '';

  const { data: service, error, isLoading, isFetching } = useGetServiceQuery(serviceId, {
    skip: !serviceId,
  });

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Service</h2>
        <p className="text-gray-600">Could not load the service details. Please try again later or go back.</p>
        <Link 
          href="/services"
          className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </Link>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4 text-center">
        <Building2 className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Service Not Found</h2>
        <p className="text-gray-600">The service you are looking for does not exist.</p>
        <Link 
          href="/services"
          className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </Link>
      </div>
    );
  }

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
          src={service.image}
          alt={service.title}
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
            <Building2 className="w-8 h-8" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-5xl font-bold mb-4"
          >
            {service.title}
          </motion.h1>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24">
        <Link 
          href="/services"
          className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors mb-12"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Services
        </Link>

        {/* Updated Layout: Top Section (Overview Left + Image Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          {/* Left Column - Short Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {service.shortDescription}
            </p>
          </motion.div>
          
          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg max-h-[350px]"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>

        {/* Bottom Section - Long Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-sm mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-gray-900">Details</h3>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            {service.longDescription.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        {/* Potential CTA Section (Optional) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-2xl"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="inline-block bg-white p-3 rounded-xl mb-6 shadow"
          >
            <Award className="w-8 h-8 text-blue-600" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Interested in {service.title}?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create an outstanding exhibition experience. Contact us today for a consultation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 