"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Scale, FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[400px] mt-20">
        <Image
          src="/images/terms-banner.jpg"
          alt="Terms and Conditions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white"
        >
          <div className="bg-white/10 p-3 rounded-xl mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl max-w-2xl">
            Our Service Agreement and Usage Terms
          </p>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto"
        >
          <div className="prose prose-lg max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-blue-50 p-3 rounded-xl">
                <Scale className="text-blue-600 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 m-0">Agreement to Terms</h2>
            </div>

            <p className="text-gray-600 mb-8">
              By accessing or using the services of Technova Exhibits, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Services</h3>
            <p className="text-gray-600 mb-6">
              Our services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Exhibition stand design and construction</li>
              <li>Event management services</li>
              <li>Display solutions</li>
              <li>Consultation and planning services</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Intellectual Property</h3>
            <p className="text-gray-600 mb-8">
              All content, designs, and materials created by Technova Exhibits remain our exclusive property. You may not use, reproduce, or distribute our intellectual property without explicit written permission.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Terms</h3>
            <p className="text-gray-600 mb-6">
              Our payment terms include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8">
              <li>Advance payment requirements</li>
              <li>Payment schedules for projects</li>
              <li>Accepted payment methods</li>
              <li>Cancellation and refund policies</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Liability</h3>
            <p className="text-gray-600 mb-8">
              While we strive for excellence in all our services, Technova Exhibits shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Modifications</h3>
            <p className="text-gray-600 mb-8">
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this page.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h3>
            <p className="text-gray-600">
              For any questions regarding these Terms & Conditions, please contact us at{' '}
              <a href="mailto:contact@technovaexhibits.com" className="text-blue-600 hover:text-blue-700">
                contact@technovaexhibits.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 